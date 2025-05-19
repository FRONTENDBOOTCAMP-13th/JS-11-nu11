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
  /* index[8] */ { question: `JavaScript에서 객체의 키는 반드시 문자열이어야 한다.`, answer: true },
  /* index[9] */ { question: "'try-catch' 구문에서는 try 블록에서 발생한 모든 에러를 catch 블록에서 잡을 수 있다.", answer: true },
  /* index[10] */ { question: "TypeScript에서 변수에 타입을 명시하지 않으면 자동으로 'any' 타입이 된다.", answer: true },
  /* index[11] */ { question: "TypeScript에서는 타입 단언(as)은 타입을 강제로 바꾸기 때문에 위험할 수 있다.", answer: true },
  /* index[12] */ { question: "addEventListener의 세 번째 인자에 true를 넣으면 캡처 단계에서 이벤트가 처리된다.", answer: true },
  /* index[13] */ { question: "아래 코드는 try-catch로 비동기 에러를 잡을 수 있다.\ntry \t \t{\n  const res = await fetch('/api');\n} catch (e) {\n  console.error('에러 발생');\n}", answer: false }, // await는 async 함수 안에서만 가능
  /* index[14] */ { question: "TypeScript는 런타임 타입 체크 기능을 제공한다.", answer: false }, // TypeScript는 컴파일 타임에만 타입 검사함
];

// 메인화면의 요소들을 가져옴
document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const introScreen = document.getElementById("intro-screen");
  const playScreen = document.getElementById("play-screen");

  // 메인화면에서 GAME START 버튼 클릭 시 게임화면으로 넘어감
  startBtn?.addEventListener("click", () => {
    introScreen.classList.add("hidden"); // classList: 테윌윈드CSS로 예시를 들자면 class="hidden"을 추가하는 코드, 인트로 화면을 숨김
    playScreen.classList.remove("hidden"); // classList: 테윌윈드CSS로 예시를 들자면 class="hidden"을 제거하는 코드, 플레이 화면을 출력
  });
  showCurrentQuestion(); // GAME START 버튼을 눌러 게임이 시작되면 바로 첫 문제가 보이도록 문제출력함수 호출
});

// 문제 배열(quizArr)에서 랜덤하게 5문제를 추출하여 새 배열 생성
// [...quizArr]는 원본 배열을 얕은 복사함
// sort()로 배열을 섞고 slice(0, 5)로 배열의 앞에서 5개 선택
// const showQuiz: Question[] = quizArr.sort(() => 0.5 - Math.random()); // 이 코드는 실제 원본인 quizArr의 인덱스를 바꾸게 되어 현재 문제 객체의 인덱스가 달라질 수 있음
const showQuiz: Question[] = [...quizArr].sort(() => Math.random() - 0.5).slice(0, 5); // 이렇게 변경하면 원본은 유지한채로 새로운 배열[...quizArr]을 만들어 랜덤하게 섞고 5문제를 추출함 -> 얕은 복사

// 현재 퀴즈 인덱스를 추적할 변수(0부터 시작)
let quizIndex: number = 0;

// 맞힌 문제 수(경험치)
let exPoint: number = 0;

// 각 문제의 정답 여부 상태를 저장하는 배열 (초기에는 전부 null)
// 맞추면 true, 틀리면 false로 바뀜
const progressState: (boolean | null)[] = Array(showQuiz.length).fill(null);

// DOM 요소 가져오기
const questionEl = document.getElementById("quiz-question"); // 문제 텍스트가 표시될 HTML 요소
const answerObtn = document.getElementById("o-btn"); // OX 버튼요소 가져오기
const answerXbtn = document.getElementById("x-btn"); // OX 버튼요소 가져오기
const progressBar = document.getElementById("score"); // 진행바 컨테이너

/**
 * 현재 문제를 화면에 출력하는 함수
 * - 현재 인덱스(quizIndex)에 해당 하는 문제를 표시
 */
function showCurrentQuestion() {
  // 현재 문제 객체
  const currentQuiz = showQuiz[quizIndex];

  // 문제를 보여줄 DOM 요소가 존재할 경우
  if (questionEl) {
    // 문제 번호와 문제 내용을 텍스트로 설정
    // ex) [문제1] typeof null의 결과는 'null'이다.
    questionEl.textContent = `[문제 ${quizIndex + 1}] ${currentQuiz.question}`; // quizIndex는 0부터 시작하므로 1번 무제를 표시해주기 위해 +1을 했고, showQuiz 배열의 객체 중 question의 값을 같이 출력
  }
}

/**
 * 진행바 랜더링 함수 (HTML에 있는 score 하위 div 5개 사용)
 * 문제를 푼 결과에 따라 O, X 또는 회색으로 미답 표시
 */
function renderProgressBar(): void {
  const boxs = progressBar?.children;
  if (!boxs) return;

  progressState.forEach((status, i) => {
    const box = boxs[i] as HTMLElement;
    if (!box) return;
    // 기존 텍스트 초기화
    box.textContent = "";
    box.className = "w-10 h-10 border border-gray-400 rounded-full flex items-center justify-center text-xl font-bold";

    // 정답이면 파란색 O, 틀리면 빨간색 X, 아직 안 푼 문제는 회색으로 스타일링
    if (status === true) {
      box.textContent = "O";
      box.classList.add("text-blue-500");
    } else if (status === false) {
      box.textContent = "X";
      box.classList.add("text-red-500");
    } else {
      box.classList.add("bg-gray-200");
    }
  });
}

/**
 * 정답/오답 처리 함수
 * 문제에 따라 O가 정답일수도 있고 X가 정답일수 있으므로 해당 문제에 대한 정답일때, 오답일때 처리해줘야함
 */
function handleAnswer(userAnswer: boolean): void {
  // 현재 문제 가져오기
  const currentQuiz = showQuiz[quizIndex];

  // 유저의 선택이 실제 정답과 같은지 비교
  const isCorrect = userAnswer === currentQuiz.answer;

  // 진행 상태 배열에 정답 여부 저장 (true or false)
  progressState[quizIndex] = isCorrect;

  // 정답일 경우 경험치 증가
  if (isCorrect) {
    exPoint++;
  }

  // 다음 문제로 넘어가기 위해 quizIndex 증가
  quizIndex++;

  // 진행바 갱신
  renderProgressBar();

  // 다음 문제 표시
  showCurrentQuestion();
}

// O 버튼 클릭 시 true 전달 (정답 처리)
answerObtn?.addEventListener("click", () => handleAnswer(true));

// X 버튼 클릭 시 false 전달 (정답 처리)
answerXbtn?.addEventListener("click", () => handleAnswer(false));
