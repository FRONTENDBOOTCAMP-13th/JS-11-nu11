import "./style.css";

// START 버튼 요소 가져오기
const startBtn = document.getElementById("start-btn");

if (startBtn) {
  startBtn.addEventListener("click", () => {
    // quiz.html로 이동
    window.location.href = "ox-quiz-1.html";
  });
}
