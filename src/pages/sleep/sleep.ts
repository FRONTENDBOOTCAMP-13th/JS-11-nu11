import "/src/style.css";

const currentPage = document.querySelector("[data-page]") as HTMLElement;

if (currentPage?.dataset.page) {
  localStorage.setItem("page", currentPage.dataset.page);
}
