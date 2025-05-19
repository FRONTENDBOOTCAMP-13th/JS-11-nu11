import "./style.css";

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
  /* index[5] */ { question: "아래 코드를 실해앟면 'number'가 된다.\n\nconst x = +'123'; console.log(typeof x);", answer: true },
  /* index[6] */ { question: `화살표 함수는 항상 this를 바인딩한다.`, answer: false },
  /* index[7] */ { question: `아래 코드를 실행하면 'number'가 출력된다.\nconsole.log(typeof NaN);`, answer: true },
  /* index[8] */ { question: `JavaScript에서 객체의 키는 반드시 문자열이어야 한다.`, answer: true },
  /* index[9] */ { question: "'try-catch' 구문에서는 try 블록에서 발생한 모든 에러를 catch 블록에서 잡을 수 있다.", answer: true },
  /* index[10] */ { question: "TypeScript에서 변수에 타입을 명시하지 않으면 자동으로 'any' 타입이 된다.", answer: true },
  /* index[11] */ { question: "TypeScript에서는 타입 단언(as)은 타입을 강제로 바꾸기 때문에 위험할 수 있다.", answer: true },
  /* index[12] */ { question: "addEventListener의 세 번째 인자에 true를 넣으면 캡처 단계에서 이벤트가 처리된다.", answer: true },
  /* index[13] */ { question: "아래 코드는 try-catch로 비동기 에러를 잡을 수 있다.\ntry \t \t{\n  const res = await fetch('/api');\n} catch (e) {\n  console.error('에러 발생');\n}", answer: false }, // await는 async 함수 안에서만 가능
  /* index[14] */ { question: "TypeScript는 런타임 타입 체크 기능을 제공한다.", answer: false }, // TypeScript는 컴파일 타임에만 타입 검사함
];

// 메인화면에서 GAME START 버튼 클릭 시 게임화면으로 넘어감
document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const introScreen = document.getElementById("intro-screen");
  const playScreen = document.getElementById("play-screen");
  showCurrentQuestion();

  startBtn?.addEventListener("click", () => {
    introScreen.classList.add("hidden");
    playScreen.classList.remove("hidden");
  });
});

// quizArr 랜덤으로 섞기 + 랜덤하게 섞인 5개 문제 추출
// const showQuiz: Question[] = quizArr.sort(() => 0.5 - Math.random()); // 이 코드는 실제 원본인 quizArr의 인덱스를 바꾸게 되어 현재 문제 객체의 인덱스가 달라질 수 있음
const showQuiz: Question[] = [...quizArr].sort(() => Math.random() - 0.5).slice(0, 5); // 이렇게 변경하면 원본은 유지한채로 새로운 배열[...quizArr]을 만들어 랜덤하게 섞고 5문제를 추출함

// 현재 퀴즈 인덱스를 추적할 변수(0부터 시작)
let quizIndex: number = 0;

// 맞힌 문제 수(점수)
let score: number = 0;

// 문제 텍스트가 표시될 HTML 요소
const questionEl = document.getElementById("quiz-question");

/**
 * 문제를 랜덤하게 화면에 표시하는 함수
 */
function showCurrentQuestion() {
  // 현재 문제 객체
  const currentQuiz = showQuiz[quizIndex];

  // 문제 번호와 문제 내용을 화면에 출력
  if (questionEl) {
    questionEl.textContent = `[문제 ${quizIndex + 1}] ${currentQuiz.question}`; // quizIndex는 0부터 시작하므로 1번 무제를 표시해주기 위해 +1을 했고, showQuiz 배열의 객체 중 question의 값을 같이 출력
  }
}

// OX 버튼요소 가져오기
const answerObtn = document.getElementById("o-btn");
const answerXbtn = document.getElementById("x-btn");
