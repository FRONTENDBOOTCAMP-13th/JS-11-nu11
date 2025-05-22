import "/src/style.css";
document.addEventListener("DOMContentLoaded", function () {
    const currentPage = localStorage.getItem("page") || "intro";
    const pageWrap = document.querySelector("[data-page-wrap]");
    const playWrap = document.querySelector("[data-play-wrap]");
    const sleepWrap = document.querySelector("[data-sleep-wrap]");
    const trash = document.querySelector("#main_trash");
    const food1 = document.querySelector("[data-food='drink']");
    const food2 = document.querySelector("[data-food='hamburger']");
    const food3 = document.querySelector("[data-food='piza']");
    let currentLevel = JSON.parse(localStorage.getItem("level") || "1");
    const exPoint = parseInt(localStorage.getItem("exPoint") || "0", 10);
    const maxExPoint = 30; // 최대 경험치 (d:100)
    let hpPoint = parseInt(localStorage.getItem("hpPoint") || "100", 10);
    const hpPointLow = 30; // (d:30)
    const hpBar = document.querySelectorAll(".hp_bar span");
    const hpBarTime = 500; // 체력감소 시간 설정 (d:1000)
    let hpBarInterval = null;
    //----------------------------------------------------------
    // let trashInterval: number | null = null;
    setInterval(() => {
        trash.classList.remove("hidden");
        localStorage.setItem("trash", "on");
    }, 1000 * 20);
    //----------------------------- [reload] -----------------------------
    /**
     * 페이지 새로고침 시 로컬스토리지 값대로 체력바를 설정
     * @description 페이지를 새로고침할 때 로컬스토리지에 저장된 값으로 체력바를 설정합니다.
     * @returns {void}
     */
    function hpBarSet() {
        hpPoint = parseInt(localStorage.getItem("hpPoint") || "100", 10);
        hpBar.forEach(bar => {
            bar.classList.replace("bg-mdev-orange", "bg-mdev-green");
            bar.style.width = `${hpPoint}%`;
        });
        if (currentPage === "play") {
            startHpBarInterval("minus");
        }
        else if (currentPage === "sleep") {
            startHpBarInterval("plus");
        }
    }
    hpBarSet();
    function pageWrapSet() {
        pageWrap.dataset.pageWrap = currentPage;
    }
    pageWrapSet();
    function levelSet(page, level) {
        if (page === "play") {
            if (level === 1) {
                playWrap.dataset.playWrap = "hasu";
            }
            else if (level === 2) {
                playWrap.dataset.playWrap = "joongsu";
            }
            else if (level === 3) {
                playWrap.dataset.playWrap = "gosu";
            }
        }
        else if (page === "sleep") {
            if (level === 1) {
                sleepWrap.dataset.sleepWrap = "hasu";
            }
            else if (level === 2) {
                sleepWrap.dataset.sleepWrap = "joongsu";
            }
            else if (level === 3) {
                sleepWrap.dataset.sleepWrap = "gosu";
            }
        }
        else if (page === "eat") {
            if (level === 1) {
                food1.classList.remove("hidden");
                food2.classList.add("hidden");
                food3.classList.add("hidden");
            }
            else if (level === 2) {
                food1.classList.remove("hidden");
                food2.classList.remove("hidden");
                food3.classList.add("hidden");
            }
            else if (level === 3) {
                food1.classList.remove("hidden");
                food2.classList.remove("hidden");
                food3.classList.remove("hidden");
            }
        }
    }
    levelSet(currentPage, currentLevel);
    //----------------------------- [init] -----------------------------
    /**
     * 초기화 함수
     * @description 페이지를 초기화하고, 체력, 경험치, 레벨을 설정합니다.
     * @returns {void}
     */
    function initFnc() {
        localStorage.clear();
        localStorage.setItem("level", "1");
        localStorage.setItem("exPoint", "0");
        localStorage.setItem("hpPoint", "100");
        localStorage.setItem("page", "intro");
        localStorage.setItem("trash", "off");
        hpBarSet();
    }
    if (currentPage === "intro") {
        console.log("인트로 페이지 / 초기화");
        initFnc();
    }
    //----------------------------------------------------------
    /**
     * 체력 감소, 증가 함수
     * @param {string} type - "minus" 또는 "plus"
     * @description 체력 감소 또는 증가를 설정합니다.
     * @returns {void}
     */
    const sleepSound = new Audio("/assets/sounds/sleep.m4a");
    function startHpBarInterval(type) {
        const bgGreen = "bg-mdev-green";
        const bgOrange = "bg-mdev-orange";
        if (hpBarInterval) {
            clearInterval(hpBarInterval);
        }
        hpBarInterval = setInterval(() => {
            if (type === "minus") {
                hpPoint = Math.max(hpPoint - 1, 0);
                localStorage.setItem("hpPoint", hpPoint.toString());
            }
            else if (type === "plus") {
                hpPoint = Math.min(hpPoint + 5, 100);
                localStorage.setItem("hpPoint", hpPoint.toString());
                sleepSound.volume = 1;
                sleepSound.loop = true;
                sleepSound.play().catch(error => {
                    console.error("사운드 재생 실패:", error);
                });
                if (hpPoint >= 100) {
                    sleepSound.pause();
                    sleepSound.loop = false;
                    sleepSound.currentTime = 0;
                    pageWrap.dataset.pageWrap = "play";
                }
            }
            const isLowHp = hpPoint <= hpPointLow;
            hpBar.forEach(bar => {
                bar.style.width = `${hpPoint}%`;
                if (isLowHp && bar.classList.contains(bgGreen)) {
                    bar.classList.replace(bgGreen, bgOrange);
                }
                else if (!isLowHp && bar.classList.contains(bgOrange)) {
                    bar.classList.replace(bgOrange, bgGreen);
                }
            });
            if (hpPoint <= 0) {
                clearInterval(hpBarInterval);
                hpBarInterval = null;
                pageWrap.dataset.pageWrap = "dying";
            }
        }, hpBarTime);
    }
    /**
     * 체력 감소 중지 함수
     * @description 체력 감소를 중지하고, hpBarInterval을 null로 설정합니다.
     * @returns {void}
     */
    function stopHpBarInterval() {
        if (hpBarInterval) {
            clearInterval(hpBarInterval);
            hpBarInterval = null;
        }
    }
    //----------------------------------------------------------
    // 페이지 변화 감지
    const pageWrapObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === "attributes" && mutation.attributeName === "data-page-wrap") {
                const currentPageState = pageWrap.dataset.pageWrap;
                const currentExPoint = JSON.parse(localStorage.getItem("exPoint") || "0");
                const level1 = Math.floor(maxExPoint / 3);
                const level2 = Math.floor((maxExPoint * 2) / 3);
                if (currentExPoint >= 0 && currentExPoint <= level1) {
                    localStorage.setItem("level", "1");
                }
                else if (currentExPoint > level1 && currentExPoint <= level2) {
                    localStorage.setItem("level", "2");
                }
                else if (currentExPoint > level2 && currentExPoint <= maxExPoint) {
                    localStorage.setItem("level", "3");
                }
                currentLevel = parseInt(localStorage.getItem("level") || "1", 10);
                localStorage.setItem("page", currentPageState || "");
                localStorage.setItem("hpPoint", hpPoint.toString());
                stopHpBarInterval();
                if (currentPageState === "intro") {
                    initFnc();
                }
                else if (currentPageState === "eat") {
                    levelSet(currentPageState, currentLevel);
                }
                else if (currentPageState === "eat_result") {
                    setTimeout(() => {
                        pageWrap.dataset.pageWrap = "play";
                    }, 8000);
                }
                else if (currentPageState === "sleep") {
                    levelSet(currentPageState, currentLevel);
                    startHpBarInterval("plus");
                }
                else if (currentPageState === "play") {
                    if (currentLevel === 1) {
                        playWrap.dataset.playWrap = "hasu";
                    }
                    else if (currentLevel === 2) {
                        playWrap.dataset.playWrap = "joongsu";
                    }
                    else if (currentLevel === 3) {
                        playWrap.dataset.playWrap = "gosu";
                    }
                    if (exPoint >= maxExPoint) {
                        pageWrap.dataset.pageWrap = "ending";
                    }
                    startHpBarInterval("minus");
                }
            }
        });
    });
    // 페이지 변경 감지
    pageWrapObserver.observe(pageWrap, { attributes: true });
    //----------------------------- [buttons] -----------------------------
    const playButtons = document.querySelectorAll("[data-page-wrap] [data-btn]");
    for (const button of playButtons) {
        button.addEventListener("click", event => {
            const target = event.currentTarget;
            const btn = target.dataset.btn;
            localStorage.setItem("hpPoint", hpPoint.toString());
            if (btn === "start") {
                pageWrap.dataset.pageWrap = "play";
            }
            else if (btn === "eat") {
                pageWrap.dataset.pageWrap = "eat";
            }
            else if (btn === "eat_back") {
                pageWrap.dataset.pageWrap = "play";
            }
            else if (btn === "sleep") {
                pageWrap.dataset.pageWrap = "sleep";
            }
            else if (btn === "wakeup") {
                pageWrap.dataset.pageWrap = "play";
            }
            else if (btn === "study") {
                window.location.href = "/src/pages/study/index.html";
            }
            else if (btn === "health") {
                window.location.href = "/src/pages/health/index.html";
            }
            else if (btn === "cleaning") {
                window.location.href = "/src/pages/cleaning/index.html";
            }
            else if (btn === "restart") {
                pageWrap.dataset.pageWrap = "intro";
            }
        });
    }
    const foodButtons = document.querySelectorAll("[data-food-wrap='food_sel'] [data-food]");
    const foodValues = {
        drink: 30,
        hamburger: 60,
        piza: 100,
    };
    for (const button of foodButtons) {
        button.addEventListener("click", event => {
            const target = event.currentTarget;
            const foodType = target.dataset.food;
            if (foodValues[foodType]) {
                hpPoint += foodValues[foodType];
            }
            hpPoint = Math.min(hpPoint, 100);
            const isLowHp = hpPoint <= 30;
            hpBar.forEach(bar => {
                bar.classList.toggle("bg-mdev-orange", isLowHp);
                bar.classList.toggle("bg-mdev-green", !isLowHp);
                bar.style.width = `${hpPoint}%`;
            });
            pageWrap.dataset.pageWrap = "eat_result";
            const eatWrap = document.querySelector("[data-eat-wrap]");
            const drinkSound = new Audio("/assets/sounds/eat_drink.mp3");
            const foodSound = new Audio("/assets/sounds/eat_food.m4a");
            if (foodType === "drink") {
                eatWrap.dataset.eatWrap = "drink";
                drinkSound.currentTime = 0;
                drinkSound.volume = 1;
                drinkSound.play().catch(error => {
                    console.error("사운드 재생 실패:", error);
                });
            }
            else if (foodType === "hamburger") {
                eatWrap.dataset.eatWrap = "hamburger";
                foodSound.currentTime = 0;
                foodSound.volume = 1;
                foodSound.loop = true;
                foodSound.play().catch(error => {
                    console.error("사운드 재생 실패:", error);
                });
                setTimeout(() => {
                    foodSound.loop = false;
                    foodSound.pause();
                    foodSound.currentTime = 0;
                }, 8000);
            }
            else if (foodType === "piza") {
                eatWrap.dataset.eatWrap = "piza";
                foodSound.currentTime = 0;
                foodSound.volume = 1;
                foodSound.loop = true;
                foodSound.play().catch(error => {
                    console.error("사운드 재생 실패:", error);
                });
                setTimeout(() => {
                    foodSound.loop = false;
                    foodSound.pause();
                    foodSound.currentTime = 0;
                }, 8000);
            }
        });
    }
    //----------------------------------------------------------
    //초기화 버튼
    document.querySelector("#reset")?.addEventListener("click", () => {
        initFnc();
        location.reload();
    });
});
