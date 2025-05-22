import "/src/style.css";

localStorage.setItem("page", "cleaning");

// 기본 요소
const cleaningWrap = document.querySelector("[data-cleaning-wrap]") as HTMLBodyElement;

// 메인 게임 시작 버튼 및 돌아가기 버튼
// const gameStartBtn = document.querySelector('[data-btn="mainGameStartBtn"]') as HTMLButtonElement | null;
// const returnBtn = document.querySelector('[data-btn="mainReturnBtn"]') as HTMLButtonElement | null;

// 게임 관련 DOM
const gameArea = document.getElementById("gameArea") as HTMLElement | null;
const scoreDisplay = document.getElementById("score") as HTMLElement | null;

// 게임 관련 변수
let currentScore = 0; // 현재 점수
const maxScore = 10; // 최대 점수
let spawnedCanCount = 0; // 생성된 캔 개수
const maxCanCount = 10; // 최대 캔 개수
const spawnIntervalMs = 600; // 캔 생성 간격 (밀리초)
let removedCanCount = 0; // 사라진 캔 개수 (클릭 or 바닥 도달)

// 점수 증가 함수
function increaseScore(): void {
  if (!scoreDisplay) return;

  if (currentScore < maxScore) {
    currentScore++;
    scoreDisplay.textContent = `${currentScore}/${maxScore}`;
  }

  // 성공 조건 달성 시 화면 전환
  if (currentScore === maxScore) {
    cleaningWrap.dataset.cleaningWrap = "success";

    localStorage.setItem("trash", "off");
  }
}

// 게임 종료 확인
function checkGameEnd(): void {
  // 모든 캔이 제거됐고, 점수가 부족하면 실패 화면으로 전환 + 실패 사운드 재생
  if (removedCanCount === maxCanCount && currentScore < maxScore) {
    cleaningWrap.dataset.cleaningWrap = "fail";

    // // 실패 사운드 재생
    // const failSound = new Audio("/src/assets/failsound.mp3");
    // failSound.play().catch(err => {
    //   console.error("오디오 재생 실패:", err);
    // });
  }
}

// 캔 생성 함수
function createFallingCan(): void {
  if (!gameArea) return;

  const canImage = document.createElement("img");
  canImage.src = "/public/assets/images/cleaning_redbull.svg"; // 캔 이미지 경로
  canImage.width = 40;
  canImage.height = 160;
  canImage.style.cursor = "pointer";
  canImage.style.position = "absolute";
  canImage.style.zIndex = "10";

  // 시작 위치 설정
  let posY = 0;
  const startX = Math.random() * (gameArea.clientWidth - canImage.width);
  canImage.style.left = `${startX}px`;
  canImage.style.top = `${posY}px`;

  gameArea.appendChild(canImage);
  let isClicked = false;

  // 캔 클릭 시 점수 증가 및 제거
  canImage.addEventListener("click", () => {
    if (!isClicked) {
      isClicked = true;
      increaseScore();
      canImage.remove();
      removedCanCount++;
      checkGameEnd();
    }
  });

  // 캔 낙하 애니메이션 (interval로 Y값 증가)
  const fallSpeed = 2;
  const fallInterval = setInterval(() => {
    posY += fallSpeed;
    canImage.style.top = `${posY}px`;

    // 캔이 화면 아래로 나가면 제거
    if (posY > gameArea.clientHeight) {
      clearInterval(fallInterval);
      if (!isClicked) {
        canImage.remove();
        removedCanCount++;
        checkGameEnd();
      }
    }
  }, 10);
}

// 게임 시작 이벤트 등록
// gameStartBtn?.addEventListener("click", () => {
//   // 게임 화면으로 전환
//   cleaningWrap.dataset.cleaningWrap = "game";

//   // 일정 간격으로 캔 생성
//   const spawnInterval = setInterval(() => {
//     if (spawnedCanCount < maxCanCount) {
//       createFallingCan();
//       spawnedCanCount++;
//     } else {
//       clearInterval(spawnInterval);
//     }
//   }, spawnIntervalMs);
// });

// cleaning main 화면에서 main 폴더의 index로 돌아가기 버튼
// returnBtn?.addEventListener("click", () => {
//   window.location.href = "/src/pages/main/index.html";
// });

// 공통 return-btn (data-href 기반 이동 또는 cleaningWrap 제어)
// document.querySelectorAll<HTMLButtonElement>(".return-btn").forEach(btn => {
//   btn.addEventListener("click", () => {
//     const targetUrl = btn.getAttribute("data-href"); // 외부 링크 이동
//     const action = btn.getAttribute("data-action"); // 내부 페이지 전환

//     if (targetUrl) {
//       window.location.href = targetUrl;
//     } else if (action === "success") {
//       cleaningWrap.dataset.cleaningWrap = "index-main";
//     } else if (action === "fail") {
//       cleaningWrap.dataset.cleaningWrap = "cleaing-main";
//     }
//   });
// });

const cleaningButtons = cleaningWrap.querySelectorAll("[data-btn]");
for (const button of cleaningButtons) {
  button.addEventListener("click", event => {
    const target = event.currentTarget as HTMLElement;
    const btn = target.dataset.btn as string;

    if (btn === "cleaning_start") {
      cleaningWrap.dataset.cleaningWrap = "play";

      // 일정 간격으로 캔 생성
      const spawnInterval = setInterval(() => {
        if (spawnedCanCount < maxCanCount) {
          createFallingCan();
          spawnedCanCount++;
        } else {
          clearInterval(spawnInterval);
        }
      }, spawnIntervalMs);
    } else if (btn === "back_main") {
      localStorage.setItem("page", "play");
      window.location.href = "../main/index.html";
    }
  });
}
