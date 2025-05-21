import "/src/style.css";

document.addEventListener("DOMContentLoaded", function () {
  const pageWrap = document.querySelector("[data-page-wrap]");
  const hpBar = document.querySelectorAll(".hp_bar span");
  const hpBarTime = 100; //체력감소 시간 설정 (d:1000)

  let level = 1;
  let exPoint = 0;
  let hpPoint = 100; //(d:100)
  const hpPointLow = 30; //(d:30)
  let hpBarInterval = null;

  /**
   * 체력 감소, 증가 함수
   * @param {string} type
   * @description 체력 감소 또는 증가를 설정합니다.
   * @returns {void}
   */
  function startHpBarInterval(type) {
    const bgGreen = "bg-mdev-green";
    const bgOrange = "bg-mdev-orange";

    if (hpBarInterval) {
      clearInterval(hpBarInterval);
    }

    hpBarInterval = setInterval(() => {
      if (type === "minus") {
        hpPoint = Math.max(hpPoint - 1, 0);
      } else if (type === "plus") {
        hpPoint = Math.min(hpPoint + 1, 100);
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
        clearInterval(hpBarInterval);
        hpBarInterval = null;
        pageWrap.dataset.pageWrap = "dying";
        initFnc();
      }
    }, hpBarTime);
  }

  /**
   * 체력 감소 중지 함수
   * @description 체력 감소를 중지하고, hpBarInterval을 null로 설정합니다.
   * @returns {void}
   */
  function stopHpBarInterval() {
    if (hpBarInterval) {
      clearInterval(hpBarInterval);
      hpBarInterval = null;
    }
  }

  //페이지별 체력 감소,중지 설정
  const pageWrapObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === "attributes" && mutation.attributeName === "data-page-wrap") {
        const currentPageState = pageWrap.dataset.pageWrap;
        const currentLevel = JSON.parse(localStorage.getItem("level"));

        localStorage.setItem("page", currentPageState);
        localStorage.setItem("hpPoint", hpPoint);

        if (currentPageState === "intro") {
          stopHpBarInterval();
        } else if (currentPageState === "eat") {
          const food1 = document.querySelector("[data-eat='drink']");
          const food2 = document.querySelector("[data-eat='hamburger']");
          const food3 = document.querySelector("[data-eat='piza']");

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
          if (exPoint >= 100) {
            pageWrap.dataset.pageWrap = "ending";
          }
          startHpBarInterval("minus");
        }
      }
    });
  });
  //페이지 변경 감지
  pageWrapObserver.observe(pageWrap, { attributes: true });

  //----------------------------- [buttons] -----------------------------
  const playButtons = document.querySelectorAll("[data-page-wrap] [data-btn]");
  for (const button of playButtons) {
    button.addEventListener("click", event => {
      const btn = event.currentTarget.dataset.btn;

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

  const eatButtons = document.querySelectorAll("[data-eat-wrap='food_sel'] [data-eat]");
  const foodValues = {
    drink: 30,
    hamburger: 60,
    piza: 100,
  };

  for (const button of eatButtons) {
    button.addEventListener("click", event => {
      const foodType = event.currentTarget.dataset.eat;

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
    });
  }

  //----------------------------- [study - 공부하기] -----------------------------
  //공부하기 함수 - exPoint증가 (+5)
  function studyFnc() {
    console.log("공부하기 함수 연결");
    //ox퀴즈 맞추기 - 총문제(5문제), 맞춘 갯수에 따라 exPoint 증가
    window.location.href = "/src/pages/study/index.html";
  }

  //----------------------------- [health - 운동하기] -----------------------------
  //운동하기 함수 - exPoint증가 (+2)
  function healthFnc() {
    console.log("운동하기 함수 연결");
    //스페이스바 채우기 - 제한시간(1분)
    window.location.href = "/src/pages/health/index.html";
  }

  //----------------------------- [cleaning - 청소하기] -----------------------------
  //청소하기 함수 - 방 쓰레기만 없애기
  function cleaningFnc() {
    console.log("청소하기 함수 연결");
    //쓰레기 클릭해서 없애기
    window.location.href = "/src/pages/cleaning/index.html";
  }

  //----------------------------- [init] -----------------------------
  /**
   * 초기화 함수
   * @description 페이지를 초기화하고, 체력, 경험치, 레벨을 설정합니다.
   * @returns {void}
   */
  function initFnc() {
    hpPoint = 100;

    localStorage.setItem("page", pageWrap.dataset.pageWrap);
    localStorage.setItem("level", 1);
    localStorage.setItem("hpPoint", 100);
    localStorage.setItem("exPoint", 0);
  }
  initFnc();
});
