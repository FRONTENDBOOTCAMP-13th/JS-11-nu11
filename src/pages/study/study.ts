import "/src/style.css";

// 문제 객체 타입 지정
type Question = {
  question: string;
  answer: boolean;
};
// 문제 객체
const quizArr: Question[] = [
  /* index[0] */ { question: "JavaScript는 대소문자를 구분한다.", answer: true },
  /* index[1] */ { question: "const로 선언한 변수는 재할당이 가능하다.", answer: false },
  /* index[2] */ { question: "'=='는 값만 비교하고 타입은 무시한다.", answer: true },
  /* index[3] */ { question: "'==='는 값과 타입 모두 비교한다.", answer: true },
  /* index[4] */ { question: "typeof null의 결과는 'null'이다.", answer: false },
  /* index[5] */ { question: "아래 코드를 실행하면 'number'가 된다.\n\nconst x = +'123'; console.log(typeof x);", answer: true },
  /* index[6] */ { question: `화살표 함수는 항상 this를 바인딩한다.`, answer: false },
  /* index[7] */ { question: `아래 코드를 실행하면 'number'가 출력된다.\nconsole.log(typeof NaN);`, answer: true },
  /* index[8] */ { question: `JavaScript에서 객체의 키는 반드시 문자열이어야 한다.`, answer: false },
  /* index[9] */ { question: "'try-catch' 구문에서는 try 블록에서 발생한 모든 에러를 catch 블록에서 잡을 수 있다.", answer: true },
  /* index[10] */ { question: "TypeScript에서 변수에 타입을 명시하지 않으면 자동으로 'any' 타입이 된다.", answer: true },
  /* index[11] */ { question: "TypeScript에서는 타입 단언(as)은 타입을 강제로 바꾸기 때문에 위험할 수 있다.", answer: true },
  /* index[12] */ { question: "addEventListener의 세 번째 인자에 true를 넣으면 캡처 단계에서 이벤트가 처리된다.", answer: true },
  /* index[13] */ { question: "아래 코드는 try-catch로 비동기 에러를 잡을 수 있다.\ntry \t \t{\n  const res = await fetch('/api');\n} catch (e) {\n  console.error('에러 발생');\n}", answer: false }, // await는 async 함수 안에서만 가능
  /* index[14] */ { question: "TypeScript는 런타임 타입 체크 기능을 제공한다.", answer: false }, // TypeScript는 컴파일 타임에만 타입 검사함
];

// 메인화면의 요소들을 가져옴
document.addEventListener("DOMContentLoaded", () => {
  localStorage.setItem("page", "study");

  const studyWrap = document.querySelector("[data-study-wrap]") as HTMLElement;
  const studyEndWrap = document.querySelector("[data-study-end-wrap]") as HTMLElement;
  // const startBtn = document.querySelector("[data-btn='study_start']");

  const studyButtons = studyWrap.querySelectorAll("[data-btn]");

  // const returnBtn = document.getElementById("return-btn");
  // const introScreen = document.getElementById("intro-screen");
  // const playScreen = document.getElementById("play-screen");
  // const resultBtn = document.getElementById("go-back-btn-result");
  // const failBtn = document.getElementById("go-back-btn-fail");
  // const partBtn = document.getElementById("go-back-btn-part");

  // 메인화면에서 GAME START 버튼 클릭 시 게임화면으로 넘어감
  // startBtn?.addEventListener("click", () => {
  //   studyWrap.dataset.studyWrap = "play";
  // if (introScreen && playScreen) {
  //   introScreen.classList.add("hidden"); // classList: 테윌윈드CSS로 예시를 들자면 class="hidden"을 추가하는 코드, 인트로 화면을 숨김
  //   playScreen.classList.remove("hidden"); // classList: 테윌윈드CSS로 예시를 들자면 class="hidden"을 제거하는 코드, 플레이 화면을 출력
  // }
  // });

  // 게임 시작 화면에서 메인으로 되돌아가기
  // returnBtn?.addEventListener("click", () => {
  //   window.location.href = "../main/index.html";
  // });

  // 모두 정답일 때 메인으로 되돌아가기 버튼 이벤트
  // resultBtn?.addEventListener("click", () => {
  //   window.location.href = "../main/index.html";
  // });

  // 모두 오답일 때 메인으로 되돌아가기 버튼 이벤트
  // failBtn?.addEventListener("click", () => {
  //   window.location.href = "../main/index.html";
  // });

  // 일부만 정답일 때 메인으로 되돌아가기 이벤트 버튼
  // partBtn?.addEventListener("click", () => {
  //   window.location.href = "../main/index.html";
  // });

  // 문제 배열(quizArr)에서 랜덤하게 5문제를 추출하여 새 배열 생성
  // [...quizArr]는 원본 배열을 얕은 복사함
  // sort()로 배열을 섞고 slice(0, 5)로 배열의 앞에서 5개 선택
  // const showQuiz: Question[] = quizArr.sort(() => 0.5 - Math.random()); // 이 코드는 실제 원본인 quizArr의 인덱스를 바꾸게 되어 현재 문제 객체의 인덱스가 달라질 수 있음
  const showQuiz: Question[] = [...quizArr].sort(() => Math.random() - 0.5).slice(0, 5); // 이렇게 변경하면 원본은 유지한채로 새로운 배열[...quizArr]을 만들어 랜덤하게 섞고 5문제를 추출함 -> 얕은 복사

  // 현재 퀴즈 인덱스를 추적할 변수(0부터 시작)
  let quizIndex: number = 0;

  // 정답을 맞힌 수(경험치로도 사용)
  let successCnt: number = 0;

  // 각 문제의 정답 여부 상태를 저장하는 배열 (초기에는 전부 null)
  // 맞추면 true, 틀리면 false로 바뀜
  const progressState: (boolean | null)[] = Array(showQuiz.length).fill(null);

  // DOM 요소 가져오기
  const questionEl = document.getElementById("quiz-question"); // 문제 텍스트가 표시될 HTML 요소
  const answerObtn = document.getElementById("o-btn"); // OX 버튼요소 가져오기
  const answerXbtn = document.getElementById("x-btn"); // OX 버튼요소 가져오기

  /**
   * 현재 문제를 화면에 출력하는 함수
   * - 현재 인덱스(quizIndex)에 해당 하는 문제를 표시
   */
  function showCurrentQuestion() {
    // 현재 문제 객체
    const currentQuiz = showQuiz[quizIndex];

    // 문제를 보여줄 DOM 요소가 존재할 경우
    // 문제 번호와 문제 내용을 텍스트로 설정
    // ex) [문제1] typeof null의 결과는 'null'이다.
    if (questionEl) {
      questionEl.textContent = `[문제 ${quizIndex + 1}] ${currentQuiz.question}`; // quizIndex는 0부터 시작하므로 1번 무제를 표시해주기 위해 +1을 했고, showQuiz 배열의 객체 중 question의 값을 같이 출력
    }
  }
  // GAME START 버튼을 눌러 게임이 시작되면 바로 첫 문제가 보이도록 문제출력함수 호출
  showCurrentQuestion();

  /**
   * 진행바 랜더링 함수 (HTML에 있는 score 하위 div 5개 사용)
   * 문제를 푼 결과에 따라 O, X 또는 회색으로 미답 표시
   */
  function renderProgressBar(): void {
    const progressBar = document.querySelectorAll(".score"); // 진행바 컨테이너

    // NodeList의 모든 요소에 대해 반복
    progressBar.forEach(bar => {
      const boxs = bar.children;
      if (!boxs) return;

      progressState.forEach((status, i) => {
        if (i >= boxs.length) return;
        const box = boxs[i] as HTMLElement;
        if (!box) return;

        if (status === true) {
          box.textContent = "O";
          box.classList.add("on_o");
        } else if (status === false) {
          box.textContent = "X";
          box.classList.add("on_x");
        }
      });
    });
  }

  /**
   * 정답/오답 처리 함수
   * 문제에 따라 O가 정답일수도 있고 X가 정답일수 있으므로 해당 문제에 대한 정답일때, 오답일때 처리해줘야함
   * @param userAnswer 유저의 선택(true or false)
   */
  function handleAnswer(userAnswer: boolean): void {
    const currentQuiz = showQuiz[quizIndex]; // 현재 문제 가져오기
    const isCorrect = userAnswer === currentQuiz.answer; // 유저의 선택이 실제 정답과 같은지 비교
    progressState[quizIndex] = isCorrect; // 진행 상태 배열에 정답 여부 저장 (true or false)

    // 정답일 경우 경험치 1 증가
    if (isCorrect) {
      successCnt++;
    }

    // 다음 문제로 넘어가기 위해 quizIndex 증가
    quizIndex++;

    // 진행바 갱신
    renderProgressBar();

    if (quizIndex === showQuiz.length) {
      getExp(successCnt); // 퀴즈 종료 후 경험치 누적 저장

      // 5문제를 다 풀었다면 결과 화면을 보여주기 위한 요소를 가져옴
      // const quizGame = document.getElementById("quiz-game"); // 퀴즈 문제 화면 요소
      // const oxBtns = document.getElementById("ox-btn"); // OX 버튼을 감싸는 요소
      const partialResultText = document.getElementById("partial-result-text"); // n개 맞힌 텍스트

      // 사용자가 모든 문제를 정답으로 맞췄는지 확인(모든 요소가 true인지 검사)
      const allCorrect = progressState.every(state => state === true);

      // 사용자가 모든 문제를 틀렸는지 확인(모든 요소가 false인지 검사)
      const allWrong = progressState.every(state => state === false);

      // 퀴즈 영역과 OX 버튼을 숨김(display: none)
      // if (quizGame) {
      //   quizGame.classList.add("hidden");
      //   quizGame.classList.remove("flex");
      // }
      // if (oxBtns) {
      //   oxBtns.classList.add("hidden");
      //   oxBtns.classList.remove("flex");
      // }

      const successSound = new Audio("/assets/sounds/success.mp3");
      const failSound = new Audio("/assets/sounds/study_fail.mp3");
      // 전부 정답일 경우 정답 화면 표시
      if (allCorrect) {
        studyWrap.dataset.studyWrap = "end";
        studyEndWrap.dataset.studyEndWrap = "end_success";

        successSound.currentTime = 0;
        successSound.volume = 1;
        successSound.play().catch(error => {
          console.error("사운드 재생 실패:", error);
        });
      }
      // 전부 오답일 경우 오답 화면 표시
      else if (allWrong) {
        studyWrap.dataset.studyWrap = "end";
        studyEndWrap.dataset.studyEndWrap = "end_fail";

        failSound.currentTime = 0;
        failSound.volume = 1;
        failSound.play().catch(error => {
          console.error("사운드 재생 실패:", error);
        });
      }
      // 일부만 맞은 경우
      else if (partialResultText) {
        studyWrap.dataset.studyWrap = "end";
        studyEndWrap.dataset.studyEndWrap = "end_partial";
        partialResultText.textContent = `총 ${successCnt}문제 정답입니다.`; // 정답 갯수(score)를 텍스트로 표시(ex. "총 3문제 정답입니다.")

        successSound.currentTime = 0;
        successSound.volume = 1;
        successSound.play().catch(error => {
          console.error("사운드 재생 실패:", error);
        });
      }

      return; // 결과 화면 보여주고 함수 종료
    }
    showCurrentQuestion(); // 퀴즈가 남아 있으면 다음 문제 표시
  }
  answerObtn?.addEventListener("click", () => handleAnswer(true)); // O 버튼 클릭 시 true 전달 (정답 처리)
  answerXbtn?.addEventListener("click", () => handleAnswer(false)); // X 버튼 클릭 시 false 전달 (정답 처리)

  /**
   * 로컬스토리지에 누적 경험치를 저장하는 함수
   * @param amount 이번 퀴즈에허 획득한 경험치(successCnt)
   */
  function getExp(amount: number): void {
    const storegedExp = localStorage.getItem("exPoint") || "0"; // 기존 경험치 값을 가져온다. 없으면 기본 값 "0"
    const currentExp = parseInt(storegedExp, 10); // 문자열로 저장된 값을 정수(10진수)로 전환
    const updateExp = currentExp + amount; // 기본 값에 새 경험치(amount) 더함

    localStorage.setItem("exPoint", updateExp.toString()); // 얻은 경험치는 정수형이므로 로컬스토리지에 저장하기 위해 문자열로 다시 변환
  }

  for (const button of studyButtons) {
    button.addEventListener("click", event => {
      const target = event.currentTarget as HTMLElement;
      const btn = target.dataset.btn as string;

      if (btn === "study_start") {
        studyWrap.dataset.studyWrap = "play";
      } else if (btn === "back_main") {
        localStorage.setItem("page", "play");
        window.location.href = "../main/index.html";
      }
    });
  }
});
