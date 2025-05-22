import "/src/style.css";

const maxGaugeValue = 63; // 게임 난이도 조절 값
let gaugeValue = 0; // 게이지 값
let isGameActive = false; // 초기 게임 상태 값
const healthExp = 2; // 경험치 값

localStorage.setItem("page", "health");

// 경험치 추가 함수
function addHealthExp() {
  const currentExp: number = parseInt(localStorage.getItem("exPoint") || "0") || 0;
  const newExp: number = currentExp + healthExp;
  localStorage.setItem("exPoint", newExp.toString());
}

// 카운트다운 함수
function countdown() {
  const time = document.querySelector("[data-health='play'] .time");

  // 가드
  if (!time) {
    console.error("에러 발생 ! 타이머 요소가 없습니다. 마크업을 확인해주세요");
    return;
  }

  // TODO 1초 느리게 뜨는 이유 찾기
  // 게임 시작 시 초기 카운트 값 설정 ( 언제든지 수정 가능 )
  let count = 20;
  isGameActive = true; // 시작 되었을 때 값
  time.textContent = `${count}s`;

  const startCountDown = setInterval(() => {
    count--;

    // 화면에 남은 시간 표시
    time.textContent = `${count}s`;

    // 타이머 종료
    if (count < 1) {
      isGameActive = false;
      clearInterval(startCountDown);
      gameResult(); // 페이지 이동
    }
  }, 1000);
}

// 인 게임 페이지로 이동 시키는 함수
// function startBtn() {
//   const startBtn = document.querySelector("#startBtn");
//   const healthWrapper = document.querySelector("[data-health-wrap]");

//   startBtn?.addEventListener("click", () => {
//     if (healthWrapper instanceof HTMLElement) {
//       healthWrapper.setAttribute("data-health-wrap", "play");
//     }
//     countdown();
//   });
// }

// startBtn();

/**
 * 게이지 달성 값에 따른 결과 페이지로 이동하는 함수
 */
function gameResult() {
  const healthWrapper = document.querySelector("[data-health-wrap]");
  // 게이지 값 계산
  const achievementPercentage = (gaugeValue / maxGaugeValue) * 100;

  // 부모 태그 못찾을 때 에러 발생
  if (!healthWrapper) {
    console.error("에러 발생 ! 요소 값이 없습니다. 마크업 확인 해주세요");
    return;
  }

  // 타입 체크 추가
  // 게이지가 100일 때 성공 페이지로 이동
  if (healthWrapper instanceof HTMLElement) {
    if (achievementPercentage >= 100) {
      healthWrapper.setAttribute("data-health-wrap", "success");
      addHealthExp();
    } else {
      // 달성하지 못했을 때 실패 페이지로 이동
      healthWrapper.setAttribute("data-health-wrap", "fail");
    }
  }
}

// 스페이스바를 누르면 이벤트 발생 시키는 함수
// 게이지 업데이트 , 캐릭터 이동 , 스페이스바 이미지 전환
function spacebarEvent() {
  // 변수 정리
  const gaugeFill = document.querySelector("#sprintGauge") as HTMLDivElement;
  const spacebar2D = document.querySelector("#spacebar2d") as HTMLImageElement;
  const spacebar3D = document.querySelector("#spacebar3d") as HTMLImageElement;
  const character = document.querySelector("#character") as HTMLImageElement;
  const celebrateImg = document.querySelector("#celebrate") as HTMLImageElement;
  const gaugeContainer = document.querySelector("#gauage-container") as HTMLDivElement;
  let spacebarChange = true;

  // 타입 체크 추가
  if (spacebar2D instanceof HTMLImageElement && spacebar3D instanceof HTMLImageElement) {
    // 2D 키보드가 먼저 나오게
    spacebar3D.classList.add("hidden");
    spacebar2D.classList.remove("hidden");
  }

  function updateGuage() {
    if (gaugeValue > maxGaugeValue) {
      gaugeValue = maxGaugeValue;
    }
    const fillPercentage = (gaugeValue / maxGaugeValue) * 100;

    // 타입체크 추가
    if (gaugeFill instanceof HTMLElement) {
      gaugeFill.style.width = `${fillPercentage}%`;
    }

    // TODO 나중에 삭제하기
    console.log(`현재 게이지: ${gaugeValue}/${maxGaugeValue}`);

    if (character instanceof HTMLImageElement && gaugeContainer instanceof HTMLElement) {
      // 컨테이너 너비와 캐릭터 너비를 기준으로 최대 이동 거리 계산
      const containerWidth = gaugeContainer.clientWidth;
      const characterWidth = character.clientWidth || 180;
      const maxMoveDistance = containerWidth - characterWidth;

      // 게이지 비율에 따라 이동 거리 계산
      const moveDistance = (fillPercentage / 100) * maxMoveDistance;
      character.style.transform = `translateX(${moveDistance}px)`;
    }
    if (celebrateImg instanceof HTMLImageElement && fillPercentage >= 100) {
      celebrateImg.classList.remove("hidden");
    }
    if (fillPercentage >= 100) {
      isGameActive = false;
      if (celebrateImg instanceof HTMLImageElement) {
        celebrateImg.classList.remove("hidden");
      }
      setTimeout(() => {
        gameResult();
      }, 1000);
    }
  }

  document.addEventListener("keyup", event => {
    if (event.code === "Space" && isGameActive) {
      if (gaugeValue < maxGaugeValue) {
        ++gaugeValue;
        updateGuage();

        // 타입 가드 추가
        // 이미지 전환
        if (spacebar2D instanceof HTMLImageElement && spacebar3D instanceof HTMLImageElement) {
          if (spacebarChange) {
            spacebar2D.classList.add("hidden");
            spacebar3D.classList.remove("hidden");
          } else {
            spacebar2D.classList.remove("hidden");
            spacebar3D.classList.add("hidden");
          }
        }

        // 스페이스바 전환 변수 업데이트
        spacebarChange = !spacebarChange;
      }
    }
  });
}
spacebarEvent();

const healthWrap = document.querySelector("[data-health-wrap]") as HTMLElement;
const healthButtons = healthWrap.querySelectorAll("[data-btn]");
for (const button of healthButtons) {
  button.addEventListener("click", event => {
    const target = event.currentTarget as HTMLElement;
    const btn = target.dataset.btn as string;

    if (btn === "health_start") {
      healthWrap.dataset.healthWrap = "play";
      countdown();
    } else if (btn === "back_main") {
      localStorage.setItem("page", "play");
      window.location.href = "../main/index.html";
    }
  });
}
