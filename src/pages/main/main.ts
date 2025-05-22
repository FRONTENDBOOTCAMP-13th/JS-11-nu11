import "/src/style.css";

document.addEventListener("DOMContentLoaded", function () {
  const currentPage = localStorage.getItem("page") || "intro";
  const pageWrap = document.querySelector("[data-page-wrap]") as HTMLElement;
  const hpBar = document.querySelectorAll(".hp_bar span") as NodeListOf<HTMLElement>;
  const hpBarTime = 100; // 체력감소 시간 설정 (d:1000)

  // let level = 1;
  let exPoint = parseInt(localStorage.getItem("exPoint") || "0", 10);
  const maxExPoint = 30; // 최대 경험치 (d:100)
  let hpPoint = parseInt(localStorage.getItem("hpPoint") || "100", 10);

  const hpPointLow = 30; // (d:30)
  let hpBarInterval: number | null = null;

  /**
   * 체력 감소, 증가 함수
   * @param {string} type - "minus" 또는 "plus"
   * @description 체력 감소 또는 증가를 설정합니다.
   * @returns {void}
   */
  function startHpBarInterval(type: "minus" | "plus"): void {
    const bgGreen = "bg-mdev-green";
    const bgOrange = "bg-mdev-orange";

    if (hpBarInterval) {
      clearInterval(hpBarInterval);
    }

    hpBarInterval = window.setInterval(() => {
      if (type === "minus") {
        hpPoint = Math.max(hpPoint - 1, 0);
        localStorage.setItem("hpPoint", hpPoint.toString());
      } else if (type === "plus") {
        hpPoint = Math.min(hpPoint + 5, 100);
        localStorage.setItem("hpPoint", hpPoint.toString());

        if (hpPoint >= 100) {
          pageWrap.dataset.pageWrap = "play";
        }
      }

      const isLowHp = hpPoint <= hpPointLow;
      hpBar.forEach(bar => {
        bar.style.width = `${hpPoint}%`;

        if (isLowHp && bar.classList.contains(bgGreen)) {
          bar.classList.replace(bgGreen, bgOrange);
        } else if (!isLowHp && bar.classList.contains(bgOrange)) {
          bar.classList.replace(bgOrange, bgGreen);
        }
      });

      if (hpPoint <= 0) {
        clearInterval(hpBarInterval!);
        hpBarInterval = null;
        pageWrap.dataset.pageWrap = "dying";
      }
    }, hpBarTime);
  }

  /**
   * 체력 감소 중지 함수
   * @description 체력 감소를 중지하고, hpBarInterval을 null로 설정합니다.
   * @returns {void}
   */
  function stopHpBarInterval(): void {
    if (hpBarInterval) {
      clearInterval(hpBarInterval);
      hpBarInterval = null;
    }
  }

  // 페이지 변화 감지
  const pageWrapObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === "attributes" && mutation.attributeName === "data-page-wrap") {
        const currentPageState = pageWrap.dataset.pageWrap;
        let currentLevel = JSON.parse(localStorage.getItem("level") || "1");
        const currentExPoint = JSON.parse(localStorage.getItem("exPoint") || "0");

        const level1 = Math.floor(maxExPoint / 3);
        const level2 = Math.floor((maxExPoint * 2) / 3);

        if (currentExPoint >= 0 && currentExPoint <= level1) {
          localStorage.setItem("level", "1");
        } else if (currentExPoint > level1 && currentExPoint <= level2) {
          localStorage.setItem("level", "2");
        } else if (currentExPoint > level2 && currentExPoint <= maxExPoint) {
          localStorage.setItem("level", "3");
        }

        currentLevel = parseInt(localStorage.getItem("level") || "1", 10);
        localStorage.setItem("page", currentPageState || "");
        localStorage.setItem("hpPoint", hpPoint.toString());

        if (currentPageState === "intro") {
          stopHpBarInterval();
          initFnc();
        } else if (currentPageState === "eat") {
          const food1 = document.querySelector("[data-food='drink']") as HTMLElement;
          const food2 = document.querySelector("[data-food='hamburger']") as HTMLElement;
          const food3 = document.querySelector("[data-food='piza']") as HTMLElement;

          if (currentLevel === 1) {
            food1.classList.remove("hidden");
            food2.classList.add("hidden");
            food3.classList.add("hidden");
          } else if (currentLevel === 2) {
            food1.classList.remove("hidden");
            food2.classList.remove("hidden");
            food3.classList.add("hidden");
          } else if (currentLevel === 3) {
            food1.classList.remove("hidden");
            food2.classList.remove("hidden");
            food3.classList.remove("hidden");
          }

          stopHpBarInterval();
        } else if (currentPageState === "eat_result") {
          setTimeout(() => {
            pageWrap.dataset.pageWrap = "play";
          }, 3000);
        } else if (currentPageState === "sleep") {
          startHpBarInterval("plus");
        } else if (currentPageState === "play") {
          const playWrap = document.querySelector("[data-play-wrap]") as HTMLElement;

          if (currentLevel === 1) {
            playWrap.dataset.playWrap = "hasu";
          } else if (currentLevel === 2) {
            playWrap.dataset.playWrap = "joongsu";
          } else if (currentLevel === 3) {
            playWrap.dataset.playWrap = "gosu";
          }

          if (exPoint >= maxExPoint) {
            pageWrap.dataset.pageWrap = "ending";
          }
          startHpBarInterval("minus");
        }
      }
    });
  });
  // 페이지 변경 감지
  pageWrapObserver.observe(pageWrap, { attributes: true });

  //----------------------------- [buttons] -----------------------------
  const playButtons = document.querySelectorAll("[data-page-wrap] [data-btn]");
  for (const button of playButtons) {
    button.addEventListener("click", event => {
      const target = event.currentTarget as HTMLElement;
      const btn = target.dataset.btn as string;

      localStorage.setItem("hpPoint", hpPoint.toString());

      if (btn === "start") {
        pageWrap.dataset.pageWrap = "play";
      } else if (btn === "eat") {
        pageWrap.dataset.pageWrap = "eat";
      } else if (btn === "eat_back") {
        pageWrap.dataset.pageWrap = "play";
      } else if (btn === "sleep") {
        pageWrap.dataset.pageWrap = "sleep";
      } else if (btn === "wakeup") {
        pageWrap.dataset.pageWrap = "play";
      } else if (btn === "study") {
        studyFnc();
      } else if (btn === "health") {
        healthFnc();
      } else if (btn === "cleaning") {
        cleaningFnc();
      } else if (btn === "restart") {
        pageWrap.dataset.pageWrap = "intro";
      }
    });
  }

  const foodButtons = document.querySelectorAll("[data-food-wrap='food_sel'] [data-food]");
  const foodValues: Record<string, number> = {
    drink: 30,
    hamburger: 60,
    piza: 100,
  };

  for (const button of foodButtons) {
    button.addEventListener("click", event => {
      const target = event.currentTarget as HTMLElement;
      const foodType = target.dataset.food as string;

      if (foodValues[foodType]) {
        hpPoint += foodValues[foodType];
      }

      hpPoint = Math.min(hpPoint, 100);

      const isLowHp = hpPoint <= 30;
      hpBar.forEach(bar => {
        bar.classList.toggle("bg-mdev-orange", isLowHp);
        bar.classList.toggle("bg-mdev-green", !isLowHp);
        bar.style.width = `${hpPoint}%`;
      });

      pageWrap.dataset.pageWrap = "eat_result";

      const eatWrap = document.querySelector("[data-eat-wrap]") as HTMLElement;
      if (foodType === "drink") {
        eatWrap.dataset.eatWrap = "drink";
      } else if (foodType === "hamburger") {
        eatWrap.dataset.eatWrap = "hamburger";
      } else if (foodType === "piza") {
        eatWrap.dataset.eatWrap = "piza";
      }
    });
  }

  //----------------------------- [study - 공부하기] -----------------------------
  /**
   * 공부하기 함수 - exPoint증가 (+5)
   * ox퀴즈 맞추기 - 총문제(5문제), 맞춘 갯수에 따라 exPoint 증가
   * @description 공부하기 페이지로 이동합니다.
   * @returns {void}
   */
  function studyFnc(): void {
    console.log("공부하기 함수 연결");
    window.location.href = "/src/pages/study/index.html";
  }

  //----------------------------- [health - 운동하기] -----------------------------
  /**
   * 운동하기 함수 - exPoint증가 (+2)
   * 스페이스바 채우기 - 제한시간(1분)
   * @description 운동하기 페이지로 이동합니다.
   * @returns {void}
   */
  function healthFnc(): void {
    console.log("운동하기 함수 연결");
    window.location.href = "/src/pages/health/index.html";
  }

  //----------------------------- [cleaning - 청소하기] -----------------------------
  /**
   * 청소하기 함수 - 방 쓰레기만 없애기
   * 쓰레기 클릭해서 없애기
   * @description 청소하기 페이지로 이동합니다.
   * @returns {void}
   */
  function cleaningFnc(): void {
    console.log("청소하기 함수 연결");
    window.location.href = "/src/pages/cleaning/index.html";
  }

  //----------------------------- [init] -----------------------------
  /**
   * 초기화 함수
   * @description 페이지를 초기화하고, 체력, 경험치, 레벨을 설정합니다.
   * @returns {void}
   */
  function initFnc(): void {
    localStorage.clear();
    localStorage.setItem("level", "1");
    localStorage.setItem("exPoint", "0");
    localStorage.setItem("hpPoint", "100");
    localStorage.setItem("page", "intro");

    hpPoint = parseInt(localStorage.getItem("hpPoint") || "100", 10);
    hpBar.forEach(bar => {
      bar.classList.replace("bg-mdev-orange", "bg-mdev-green");
      bar.style.width = `${hpPoint}%`;
    });
  }

  if (currentPage === "intro") {
    console.log("인트로 페이지");
    initFnc();
  } else if (currentPage === "play") {
    pageWrap.dataset.pageWrap = "play";
  }

  //초기화 버튼
  document.querySelector("#reset")?.addEventListener("click", () => {
    initFnc();
    location.reload();
  });
});
