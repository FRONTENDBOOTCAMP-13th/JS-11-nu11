import "./style.css";

// 돌아가기 버튼을 눌렀을 때 메인 화면으로 이동하는 함수
function backBtnFnc(): void {
  document.addEventListener("click", (event: MouseEvent) => {
    if (!(event.target instanceof Element)) return;
    const btn = event.target.closest(".backBtn");

    if (btn) {
      window.location.href = "/index.html";
    }
  });
}

// 돌아가기 호출
backBtnFnc();

// 카운트다운 함수
function countdown(): void {
  const time = document.querySelector(".time");

  // 가드
  if (!time) {
    console.error("Timer element not found");
    return;
  }

  // 초기 카운트 값 설정 ( 언제든지 수정 가능 )
  let count: number = 10;

  const startCountDown: number = setInterval(() => {
    count--;

    // 화면에 남은 시간 표시
    time.textContent = `${count}s`;

    // 타이머 종료
    if (count < 1) {
      clearInterval(startCountDown);
    }
  }, 1000);
}

// 스타트 버튼을 누르면 넘어가는 기능 ( 함수에 넣을 예정 )

const startBtn = document.querySelector("#startBtn");
const healthWrapper = document.querySelector("[data-health-wrap]");

startBtn?.addEventListener("click", () => {
  if (healthWrapper instanceof HTMLElement) {
    healthWrapper.setAttribute("data-health-wrap", "play");
  }
  countdown();
});
