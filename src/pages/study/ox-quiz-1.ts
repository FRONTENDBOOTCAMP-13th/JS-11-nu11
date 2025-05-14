import "./style.css";
const btnTrue = document.getElementById("btn-true");
const btnFalse = document.getElementById("btn-false");

/**
 * O 버튼 선택 시 다음 페이지 이동
 * X 버튼 선택 시 해당 페이지 유지
 * @param isCorrect
 */
export function choiceBtn(isCorrect: boolean): void {
  if (isCorrect) {
    window.location.href = "ox-quiz-2.html";
  } else {
    alert("겠냐? 문제 다시 푸셈");
  }
}
btnTrue?.addEventListener("click", () => choiceBtn(true));
btnFalse?.addEventListener("click", () => choiceBtn(false));
