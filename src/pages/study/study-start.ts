import "./style.css";

// 문제 객체 타입 지정
type Question = {
  question: string;
  answer: boolean;
};

// 문제 객체
const questions: Question[] = [
  { question: "Quiz 1. JavaScript는 대소문자를 구분한다.", answer: true },
  { question: "Quiz 2. const로 선언한 변수는 재할당이 가능하다.", answer: false },
  { question: "Quiz 3. '=='는 값만 비교하고 타입은 무시한다.", answer: true },
  { question: "Quiz 4. '==='는 값과 타입 모두 비교한다.", answer: true },
  { question: "Quiz 5. typeof null의 결과는 'null'이다.", answer: false },
  { question: "Quiz 6. const x = +'123'; console.log(typeof x);", answer: true },
  { question: `Quiz 7. 화살표 함수는 항상 this를 바인딩한다.`, answer: false },
  { question: `Quiz.8. 아래 코드를 실행하면 'number'가 출력된다.\n\nconsole.log(typeof NaN);`, answer: true },
  { question: `Quiz 9. JavaScript에서 객체의 키는 반드시 문자열이어야 한다.`, answer: true },
  { question: "Quiz 10. 'try-catch' 구문에서는 try 블록에서 발생한 모든 에러를 catch 블록에서 잡을 수 있다.", answer: true },
  { question: "Quiz 11. TypeScript에서 변수에 타입을 명시하지 않으면 자동으로 'any' 타입이 된다.", answer: true },
  { question: "Quiz 12. TypeScript에서는 타입 단언(as)은 타입을 강제로 바꾸기 때문에 위험할 수 있다.", answer: true },
  { question: "Quiz 13. addEventListener의 세 번째 인자에 true를 넣으면 캡처 단계에서 이벤트가 처리된다.", answer: true },
  { question: "Quiz 14. 아래 코드는 try-catch로 비동기 에러를 잡을 수 있다.\n\ntry {\n  const res = await fetch('/api');\n} catch (e) {\n  console.error('에러 발생');\n}", answer: false }, // await는 async 함수 안에서만 가능
  { question: "Quiz 15. TypeScript는 런타임 타입 체크 기능을 제공한다.", answer: false }, // TypeScript는 컴파일 타임에만 타입 검사함
];

// START 버튼 요소 가져오기
const startBtn = document.getElementById("start-btn");

// 래퍼 요소 가져오기
const studyWrap = document.querySelector("[data-study-wrap]");

/**
 * START 버튼 눌렀을 때 퀴즈 문제로 이동하는 이벤트
 */
startBtn?.addEventListener("click", () => {
  if (studyWrap) {
    studyWrap.setAttribute("data-study-wrap", "play");
  }
});

// OX 버튼 가져오기
const btnTrue = document.getElementById("btn-true");
const btnFalse = document.getElementById("btn-false");

// 현재 문제 위치 추적 상태 변수
const currentQuestionIndex = 0;

/**
 * 정답여부와 상관없이 문제를 풀면 다음 문제로 넘어감
 * @param userAnswer
 * @param correctAnswer
 */
export function checkAnswer(userAnswer: boolean, correctAnswer: boolean): void {
  if (userAnswer === correctAnswer) {
    // studyWrap?.setAttribute("data-study-wrap", "play-02");
  }
}

btnTrue?.addEventListener("click", () => {
  const current = questions[currentQuestionIndex];
  checkAnswer(true, current.answer);
});
btnFalse?.addEventListener("click", () => {
  const current = questions[currentQuestionIndex];
  checkAnswer(false, current.answer);
});
