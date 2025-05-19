import "./style.css";
import "/src/style.css";

// 💡 "data-cleaning-wrap" 속성을 가진 최상위 요소를 가져옴 (화면 전환의 기준)
const root = document.querySelector("[data-cleaning-wrap]") as HTMLElement;

// "GAME START" 버튼과 "돌아가기" 버튼 요소 참조
const startGameBtn = document.getElementById("startGameBtn") as HTMLButtonElement;
const returnMainBtn = document.getElementById("returnMainBtn") as HTMLButtonElement;

// ✅ "GAME START" 버튼 클릭 시: 게임 화면으로 전환 + 캔 생성 시작
startGameBtn.addEventListener("click", () => {
  root.setAttribute("data-cleaning-wrap", "play"); // 일정 시간 간격으로 캔 생성 (최대 10개까지)

  const spawnInterval: number = window.setInterval(() => {
    if (spawnedCanCount < maxCanCount) {
      createFallingCan();
      spawnedCanCount++; // 캔 생성 함수 호출
    } else {
      clearInterval(spawnInterval); // 10개 생성 후 중단
    }
  }, spawnIntervalMs); // 캔 생성 간격(ms)
});

// ✅ "돌아가기" 버튼 클릭 시: 메인 페이지로 이동
returnMainBtn.addEventListener("click", () => {
  window.location.href = "../main/index.html";
});

// ✅ 게임 종료 후 등장하는 여러 "돌아가기" 버튼 처리 (공통 클래스 사용)
document.querySelectorAll<HTMLButtonElement>(".return-game-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    root.setAttribute("data-cleaning-wrap", "intro"); // 인트로 화면으로 전환
  });
});

// ✅ 게임 관련 변수 설정
const gameArea = document.getElementById("gameArea") as HTMLElement; // 게임이 진행될 영역
const scoreDisplay = document.getElementById("score") as HTMLElement; // 점수 표시 영역
let currentScore: number = 0; // 현재 점수
const maxScore: number = 10; // 목표 점수
let spawnedCanCount: number = 0; // 생성된 캔 개수
const maxCanCount: number = 10; // 최대 캔 개수
const spawnIntervalMs: number = 600; // 캔 생성 간격(ms)
let removedCanCount: number = 0; // 제거된 캔 개수 (성공/실패 판단용)

// ✅ 점수를 증가시키는 함수
function increaseScore(): void {
  if (currentScore < maxScore) {
    currentScore++; // 점수 1 증가
    scoreDisplay.textContent = `${currentScore}/${maxScore}`; // 점수 표시 업데이트
  } // 최대 점수 도달 시 성공 화면으로 전환
  if (currentScore === maxScore) {
    root.setAttribute("data-cleaning-wrap", "success");
  }
}

// ✅ 캔을 생성하고 떨어뜨리는 함수
function createFallingCan(): void {
  const canImage: HTMLImageElement = document.createElement("img"); // 이미지 태그 생성
  canImage.src = "img/redbull.svg"; // 이미지 경로 설정
  canImage.width = 60;
  canImage.height = 161;
  canImage.style.cursor = "pointer"; // 마우스 오버 시 포인터
  canImage.style.position = "absolute"; // 떨어지는 위치 지정
  canImage.style.zIndex = "10";

  let posY: number = 0; // y 위치 초기값 (화면 맨 위)
  const startX: number = Math.random() * (gameArea.clientWidth - canImage.width); // 랜덤한 x 위치

  canImage.style.left = `${startX}px`;
  canImage.style.top = `${posY}px`;

  gameArea.appendChild(canImage); // 게임 영역에 추가

  let isClicked = false; // 클릭 여부 추적

  // ✅ 캔 클릭 시 점수 증가 + 캔 제거
  canImage.addEventListener("click", () => {
    if (!isClicked) {
      isClicked = true;
      increaseScore(); // 점수 증가
      canImage.remove(); // 캔 제거
      removedCanCount++;
      checkGameEnd(); // 게임 종료 여부 확인
    }
  }); // ✅ 캔 떨어뜨리기 (애니메이션)

  const fallSpeed: number = 2; // 속도 조절 (픽셀 단위)

  const fallInterval: number = window.setInterval(() => {
    posY += fallSpeed;
    canImage.style.top = `${posY}px`; // 화면 아래로 벗어나면 제거
    if (posY > gameArea.clientHeight) {
      clearInterval(fallInterval);
      if (!isClicked) {
        canImage.remove(); // 클릭 안 된 캔 제거
        removedCanCount++;
        checkGameEnd(); // 게임 종료 여부 확인
      }
    }
  }, 5); // 거의 60fps로 작동
}

// 실패 효과음 오디오 객체 생성
const failSound = new Audio("../../assets/failsound.mp3");

// ✅ 게임 종료 조건 확인 함수
function checkGameEnd(): void {
  // 모든 캔이 사라졌을 때
  if (removedCanCount === maxCanCount) {
    // 모든 캔이 사라졌을 때
    if (currentScore < maxScore) {
      root.setAttribute("data-cleaning-wrap", "fail"); // 실패 오디오 재생

      failSound.play();
    }
  }
}
