import "./style.css";
const root = document.querySelector("[data-cleaning-wrap]") as HTMLElement;
const startGameBtn = document.getElementById("startGameBtn")!;
const returnMainPageBtn = document.getElementById("returnMainPageBtn")!;

// 게임 시작 버튼 → 같은 페이지 내 화면 전환
startGameBtn.addEventListener("click", () => {
  root.setAttribute("data-cleaning-wrap", "play");
});

// 돌아가기 버튼 → 실제 다른 페이지로 이동
returnMainPageBtn.addEventListener("click", () => {
  window.location.href = "../main/index.html";
});

// Game Page
const gameArea = document.getElementById("gameArea") as HTMLElement;
const scoreDisplay = document.getElementById("score") as HTMLElement;
let currentScore = 0;
const maxScore = 10;
let spawnedCanCount = 0;
const maxCanCount = 10;
const spawnIntervalMs = 600; // 캔 생성 간격 (ms)
let removedCanCount = 0;

// 점수를 증가시키는 함수
function increaseScore() {
  if (currentScore < maxScore) {
    currentScore++;
    scoreDisplay.textContent = `${currentScore}/${maxScore}`;
  }

  if (currentScore == 10) {
    root.setAttribute("data-cleaning-wrap", "success");
  }
}

function createFallingCan() {
  // 캔 이미지 생성
  const canImage = document.createElement("img");
  canImage.src = "img/redbull.svg"; // 이미지 경로
  canImage.width = 60;
  canImage.height = 161;
  canImage.style.cursor = "pointer"; // 마우스 오버 시 포인터 표시
  canImage.style.position = "absolute"; // 떨어지게 하려면 absolute 필수
  canImage.style.zIndex = "10"; // 시작 위치 설정
  let posY = 0;
  const startX = Math.random() * (gameArea.clientWidth - canImage.width); // 랜덤한 x 위치
  canImage.style.left = `${startX}px`;
  canImage.style.top = `${posY}px`; // 게임 영역에 추가
  gameArea.appendChild(canImage);
  let isClicked = false; // 클릭 여부 추적

  // 클릭 이벤트 연결
  canImage.addEventListener("click", () => {
    if (!isClicked) {
      isClicked = true;
      increaseScore();
      canImage.remove(); // 클릭 후 즉시 제거
      removedCanCount++;
      checkGameEnd();
    }
  }); // 떨어지도록 애니메이션 실행

  const fallSpeed = 2; // 속도 조절 (픽셀 단위)
  const fallInterval = setInterval(() => {
    posY += fallSpeed;
    canImage.style.top = `${posY}px`; // 게임 에어리어를 벗어났다면 제거
    if (posY > gameArea.clientHeight) {
      clearInterval(fallInterval);
      if (!isClicked) {
        canImage.remove(); // 클릭되지 않은 캔은 그냥 사라짐
        removedCanCount++;
        checkGameEnd();
      }
    }
  }, 5); // 약 60fps
}

// 일정 간격으로 캔 생성

const spawnInterval = setInterval(() => {
  if (spawnedCanCount < maxCanCount) {
    createFallingCan();
    spawnedCanCount++;
  } else {
    clearInterval(spawnInterval);
  }
}, spawnIntervalMs);

function checkGameEnd() {
  if (removedCanCount == maxCanCount) {
    if (currentScore < maxScore) {
      root.setAttribute("data-cleaning-wrap", "fail");
    }
  }
}
