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

const MAX_SCORE = 10;
let score = 0;

const canImageSrc = "img/redbull.svg"; // 레드불 캔 이미지 경로 (본인 이미지 경로로 바꾸세요)
const canWidth = 50; // 캔 이미지 너비(px)
const canHeight = 100; // 캔 이미지 높이(px)

const fallSpeed = 5; // 떨어지는 속도 (픽셀/frame)

function createCan() {
  const can = document.createElement("img");
  can.src = canImageSrc;
  can.style.width = canWidth + "px";
  can.style.height = canHeight + "px";
  can.style.position = "absolute";

  // gameArea 너비 내에서 캔 이미지가 완전히 보이도록 랜덤 위치 설정
  const maxX = gameArea.clientWidth - canWidth;
  const startX = Math.random() * maxX; // 캔이 게임 영역 밖으로 안 나가게

  can.style.left = `${startX}px`;
  can.style.top = `-${canHeight}px`; // 위 화면 밖에서 시작

  gameArea.appendChild(can);

  return can;
}

// 캔 떨어지는 애니메이션 관리
function animateFall(can: HTMLImageElement) {
  let top = -canHeight;

  const fallInterval = setInterval(() => {
    top += fallSpeed;
    can.style.top = `${top}px`;

    // 캔이 아래 화면 밖으로 나가면 제거
    if (top > gameArea.clientHeight) {
      clearInterval(fallInterval);
      can.remove();
      spawnCan(); // 떨어진 캔 다시 생성
    }
  }, 16); // 약 60fps
}

// 캔 클릭 시 점수 올리고 캔 제거
function handleClick(can: HTMLImageElement) {
  can.addEventListener("click", () => {
    score++;
    scoreDisplay.textContent = `${score}/${MAX_SCORE}`;
    can.remove();

    if (score >= MAX_SCORE) {
      alert("게임 종료! 축하합니다 🎉");
      // 게임 종료 처리 (필요하면 초기화 등 추가)
      // 여기서는 간단히 리로드 처리
      window.location.reload();
    } else {
      spawnCan();
    }
  });
}

function spawnCan() {
  const can = createCan();
  handleClick(can);
  animateFall(can);
}

// 게임 시작 시 캔 여러개 동시에 떨어지도록 초기화
const initialCans = 3;
for (let i = 0; i < initialCans; i++) {
  setTimeout(spawnCan, i * 1000); // 1초 간격으로 시작
}
