import "./style.css";

function goRulePage(): void {
  const btn = document.getElementById("ruleBtn");

  if (btn) {
    btn.addEventListener("click", () => {
      window.location.href = "rule.html";
    });
  }
}

function returnMainPage(): void {
  const btn = document.getElementById("returnMainPageBtn");

  if (btn) {
    btn.addEventListener("click", () => {
      window.location.href = "../../../index.html";
    });
  }
}

function goGamePage(): void {
  const btn = document.getElementById("gameStartBtn");

  if (btn) {
    btn.addEventListener("click", () => {
      window.location.href = "game.html";
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  goRulePage();
  returnMainPage();
  goGamePage();
});
