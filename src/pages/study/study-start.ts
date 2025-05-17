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
  /* index[5] */ { question: "const x = +'123'; console.log(typeof x);", answer: true },
  /* index[6] */ { question: `화살표 함수는 항상 this를 바인딩한다.`, answer: false },
  /* index[7] */ { question: `아래 코드를 실행하면 'number'가 출력된다.\n\nconsole.log(typeof NaN);`, answer: true },
  /* index[8] */ { question: `JavaScript에서 객체의 키는 반드시 문자열이어야 한다.`, answer: true },
  /* index[9] */ { question: "'try-catch' 구문에서는 try 블록에서 발생한 모든 에러를 catch 블록에서 잡을 수 있다.", answer: true },
  /* index[10] */ { question: "TypeScript에서 변수에 타입을 명시하지 않으면 자동으로 'any' 타입이 된다.", answer: true },
  /* index[11] */ { question: "TypeScript에서는 타입 단언(as)은 타입을 강제로 바꾸기 때문에 위험할 수 있다.", answer: true },
  /* index[12] */ { question: "addEventListener의 세 번째 인자에 true를 넣으면 캡처 단계에서 이벤트가 처리된다.", answer: true },
  /* index[13] */ { question: "아래 코드는 try-catch로 비동기 에러를 잡을 수 있다.\n\ntry \t \t{\n  const res = await fetch('/api');\n} catch (e) {\n  console.error('에러 발생');\n}", answer: false }, // await는 async 함수 안에서만 가능
  /* index[14] */ { question: "TypeScript는 런타임 타입 체크 기능을 제공한다.", answer: false }, // TypeScript는 컴파일 타임에만 타입 검사함
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

// 현재 문제의 인덱스 번호
const currentQuestionIndex: number = 0;
const showQuiz = quizArr[currentQuestionIndex];

const quizText = document.getElementById("quiz-text");
if (quizText) {
  quizText.innerHTML = showQuiz.question.replace(/\n/g, "<br>");
}

// OX 버튼 가져오기
const btnTrue = document.getElementById("btn-true");
const btnFalse = document.getElementById("btn-false");

/**
 * 유저가 고른 답과 실제 문제의 답이 같으면 true 반
 * 유저가 고른 답과 실제 문제의 답이 틀리면 false 반환
 * @param userAnswer
 * @param correctAnswer
 */
export function checkAnswer(userAnswer: boolean, correctAnswer: boolean): boolean {
  if (userAnswer === correctAnswer) {
    return true;
  } else {
    return false;
  }
}

btnTrue?.addEventListener("click", () => {
  const currentQuizInfo = quizArr[currentQuestionIndex];

  // 정답이 맞는지 확인을 한다.
  const result = checkAnswer(true, currentQuizInfo.answer);

  // 결과를 우측 상단에 표기한다.
  if (result === true) {
    const scoreElement = document.getElementById("score-" + currentQuestionIndex);

    if (scoreElement) {
      scoreElement.innerText = "O";
    }
  } else if (result === false) {
    const scoreElement = document.getElementById("score-" + currentQuestionIndex);
    if (scoreElement) {
      scoreElement.innerText = "X";
    }
  }

  // 이전에 제출한 문제는 제외 해야한다.

  // 다음 문제를 출력한다.
  if (quizText) {
    quizText.innerText = quizArr[3].question;
  }

  // 출제 되는 문제는 랜덤으로 출제되도록 구현
});

btnFalse?.addEventListener("click", () => {
  const currentQuizInfo = quizArr[currentQuestionIndex];
  checkAnswer(false, currentQuizInfo.answer);
  if (quizText) {
    quizText.innerText = quizArr[14].question;
  }
});
