// main.ts

import "../../style.css";

// 1. 팀원 정보 타입 정의
//    이름, 역할, 코멘트, 이미지 경로를 포함합니다.
type Member = {
  name: string;
  role: string;
  comment: string;
  imageSrc: string;
};

// 2. 실제 팀원 데이터 배열
const teamMembers: Member[] = [
  {
    name: "김용오",
    role: "사운드를 담당했습니다.",
    comment: "안녕하세요, 11팀의 목소리 김용오입니다.",
    imageSrc: "/assets/images/intro.svg",
  },
  {
    name: "박상희",
    role: "PL을 담당했습니다.",
    comment: "안녕하세요, 11팀의 프로젝트 리더 박상희입니다.",
    imageSrc: "/assets/images/intro.svg",
  },
  {
    name: "정원식",
    role: "문서화를 담당했습니다.",
    comment: "안녕하세요, 11팀의 문서담당 정원식입니다.",
    imageSrc: "/assets/images/intro.svg",
  },
  {
    name: "황수곤",
    role: "PM을 담당했습니다.",
    comment: "안녕하세요, 11팀의 프로젝트 매니저 황수곤입니다.",
    imageSrc: "/assets/images/intro.svg",
  },
];

// 3. 모바일 리스트 렌더링
const mobileListContainer = document.getElementById("mobile-member-list");
if (mobileListContainer) {
  teamMembers.forEach(member => {
    // 각 팀원 카드의 HTML을 문자열로 생성
    const memberHTML = `
      <div class="flex items-start gap-4">
        <img src="${member.imageSrc}" alt="${member.name}" class="w-14 h-14 rounded-full" />
        <div class="text-sm text-black space-y-1">
          <p><strong>이름:</strong> ${member.name}</p>
          <p><strong>직책:</strong> ${member.role}</p>
          <p><strong>Comment:</strong> ${member.comment}</p>
        </div>
      </div>
    `;
    // 컨테이너에 순서대로 추가
    mobileListContainer.innerHTML += memberHTML;
  });
}

// 4. 데스크탑 슬라이드 로직
let currentIndex = 0;
const memberImage = document.getElementById("member-image") as HTMLDivElement;
const memberInfo = document.getElementById("member-info") as HTMLDivElement;
const prevBtn = document.getElementById("prev-btn") as HTMLButtonElement;
const nextBtn = document.getElementById("next-btn") as HTMLButtonElement;

/**
 * index에 해당하는 팀원 정보를 슬라이드 영역에 렌더링
 * @param index teamMembers 배열의 현재 인덱스
 */
function renderSlide(index: number): void {
  const member = teamMembers[index];
  // 이미지 영역 갱신
  memberImage.innerHTML = `
    <img src="${member.imageSrc}" alt="${member.name}"
         class="w-48 h-48 object-contain rounded-full" />
  `;
  // 텍스트 정보 영역 갱신
  memberInfo.innerHTML = `
    <p><strong>이름:</strong> ${member.name}</p>
    <p><strong>역할:</strong> ${member.role}</p>
    <p><strong>Comment:</strong> ${member.comment}</p>
  `;
}

prevBtn?.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    renderSlide(currentIndex);
  }
});

nextBtn?.addEventListener("click", () => {
  if (currentIndex < teamMembers.length - 1) {
    currentIndex++;
    renderSlide(currentIndex);
  }
});

// 초기 로드 시 첫 번째 팀원 표시
if (memberImage && memberInfo) {
  renderSlide(currentIndex);
}

// 5. GAME START 버튼 클릭 시 페이지 이동
const gameStartBtn = document.getElementById("game-start-btn") as HTMLButtonElement;
if (gameStartBtn) {
  gameStartBtn.addEventListener("click", () => {
    // 실제 게임 메인 페이지 경로로 수정하세요
    window.location.href = "/src/pages/main/index.html";
  });
}

// 6. 폴더 트리 호버 및 터치 이미지 미리보기 로직

// data-file 속성 값 ↔ 이미지 경로 매핑 객체
const previewMap: Record<string, string> = {
  "cleaning/index.html": "/assets/images/cleaning_intro.svg",
  "health/index.html": "/assets/images/health_intro.svg",
  "main/index.html": "/assets/images/main_gosu.svg",
  "study/index.html": "/assets/images/study_intro.svg",
};

// 호버 대상 스팬과 미리보기 컨테이너 선택
const hoverFiles = document.querySelectorAll<HTMLSpanElement>(".hover-file");
const previewContainer = document.getElementById("file-preview") as HTMLDivElement;

/**
 * 지정한 파일 경로에 맞는 이미지를 로드해서 보여줌
 * @param filePath data-file 속성값
 */
function showPreview(filePath: string) {
  const imgSrc = previewMap[filePath];
  if (!imgSrc) return;

  // 기존 내용 초기화
  previewContainer.innerHTML = "";

  // 이미지 요소 생성
  const img = document.createElement("img");
  img.src = imgSrc;
  img.alt = filePath;
  img.className = "max-w-full max-h-full object-contain";

  // 컨테이너에 추가 후 opacity 토글
  previewContainer.appendChild(img);
  previewContainer.classList.replace("opacity-0", "opacity-100");
}

/**
 * 미리보기 이미지를 숨김
 */
function hidePreview() {
  previewContainer.classList.replace("opacity-100", "opacity-0");
}

// 이벤트 바인딩: 데스크탑 호버, 모바일 터치, 클릭 외부 취소
hoverFiles.forEach(span => {
  const filePath = span.dataset.file!;
  // 데스크탑: 마우스 올리면
  span.addEventListener("mouseenter", () => showPreview(filePath));
  span.addEventListener("mouseleave", () => hidePreview());
  // 모바일: 터치 또는 클릭하면
  span.addEventListener("click", e => {
    e.stopPropagation(); // 이벤트 버블링 방지
    if (previewContainer.classList.contains("opacity-100")) {
      hidePreview();
    } else {
      showPreview(filePath);
    }
  });
});

// 페이지 빈 공간 클릭 시 미리보기 숨김 (모바일 편의)
document.addEventListener("click", e => {
  if (!previewContainer.contains(e.target as Node)) {
    hidePreview();
  }
});
