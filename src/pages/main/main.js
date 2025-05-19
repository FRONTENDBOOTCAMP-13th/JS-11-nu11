import "/src/style.css";

document.addEventListener("DOMContentLoaded", function () {
  const pageWrap = document.querySelector("[data-page-wrap]");

  //----------------------------- [exPoint - 경험치] -----------------------------
  //경험치 포인트(0~100), 3단계: 공부하기(study), 운동하기(health) 진행 시
  //0~30: 하수단계
  //31~60: 중수단계
  //61~99: 고수단계
  //100이상: ending
  let exPoint = 0;

  //----------------------------- [hpPoint - 체력] -----------------------------
  const hpBar = document.querySelectorAll(".hp_bar span");
  const hpBarTime = 100; //체력감소 시간 설정 (d:1000)

  let hpPoint = 100; //(d:100)
  let hpBarInterval = null;

  //체력 감소 진행 함수
  function startHpBarInterval(type) {
    const bgGreen = "bg-mdev-green";
    const bgOrange = "bg-mdev-orange";

    if (hpBarInterval) {
      clearInterval(hpBarInterval);
    }

    hpBarInterval = setInterval(() => {
      if (type === "minus") {
        //체력 감소
        hpPoint -= 1;
      } else if (type === "plus") {
        //체력 증가
        hpPoint += 1;

        if (hpPoint > 100) {
          hpPoint = 100;
        }
      }

      hpBar.forEach(bar => {
        bar.style.width = `${hpPoint}%`;

        if (hpPoint <= 30) {
          if (bar.classList.contains(bgGreen)) {
            bar.classList.remove(bgGreen);
            bar.classList.add(bgOrange);
          }
        } else {
          if (bar.classList.contains(bgOrange)) {
            bar.classList.remove(bgOrange);
            bar.classList.add(bgGreen);
          }
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

  //체력 감소 중지 함수
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

        localStorage.setItem("page", currentPageState);

        if (currentPageState === "intro") {
          localStorage.setItem("hpPoint", 100);
          stopHpBarInterval();
        } else if (currentPageState === "play") {
          if (exPoint >= 100) {
            pageWrap.dataset.pageWrap = "ending";
          }
          startHpBarInterval("minus");
        } else if (currentPageState === "sleep") {
          localStorage.setItem("hpPoint", hpPoint);
          startHpBarInterval("plus");
        }
      }
    });
  });
  //페이지 변경 감지
  pageWrapObserver.observe(pageWrap, { attributes: true });

  //----------------------------- [init] -----------------------------
  //초기화 함수
  function initFnc() {
    hpPoint = 100;

    localStorage.setItem("page", pageWrap.dataset.pageWrap);
    localStorage.setItem("hpPoint", 100);
    localStorage.setItem("exPoint", 0);
  }
  initFnc();

  //----------------------------- [buttons] -----------------------------
  const playButtons = document.querySelectorAll("[data-page-wrap] [data-btn]");
  for (const button of playButtons) {
    button.addEventListener("click", event => {
      if (event.target.dataset.btn === "start") {
        pageWrap.dataset.pageWrap = "play";
      } else if (event.target.dataset.btn === "eat") {
        eatFnc();
      } else if (event.target.dataset.btn === "sleep") {
        pageWrap.dataset.pageWrap = "sleep";
      } else if (event.target.dataset.btn === "wakeup") {
        pageWrap.dataset.pageWrap = "play";
      } else if (event.target.dataset.btn === "study") {
        studyFnc();
      } else if (event.target.dataset.btn === "health") {
        healthFnc();
      } else if (event.target.dataset.btn === "cleaning") {
        cleaningFnc();
      } else if (event.target.dataset.btn === "restart") {
        pageWrap.dataset.pageWrap = "intro";
      }
    });
  }

  //----------------------------- [eat - 밥먹기] -----------------------------
  //밥먹기 함수 - hpPoint증가
  function eatFnc() {
    console.log("밥먹기 함수 연결");
    //에너지 음료 - 하수단계 (+30)
    //햄버거 - 중수단계 (+60)
    //피자 - 고수단계 (+100)
    window.location.href = "/src/pages/eat/index.html";
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
});
