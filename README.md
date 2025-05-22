<div>
  <img src="https://github.com/FRONTENDBOOTCAMP-13th/JS-11-nu11/blob/develop/public/assets/images/intro.svg" alt="프로젝트 인트로 이미지" width="450" />
</div>
<br />

## ✔️ 프로젝트 개요

- 주제 : 개발자 키우기 게임

- 목적 : JavaScript 수업에서 배운 내용을 실습하고 응용해 보기 위해 본 게임을 개발하였습니다.

- 프로젝트 기간 : 2025.05.09 ~ 05.22

<br />

## ✨ 주요 기능

- 체력바 : 화면 상단에 있고 유저가 확인할 수 있다.

- 기본 패시브 : 초가 지날 때마다 체력이 감소 , 활동 변경 후 20초 경과 시 메인 화면에 쓰레기 노출

- 경험치 : 유저에게 공개되지 않는다. 수치에 따라 4단계로 분류한다. ( 하수 → 중수 → 고수 → 엔딩 )

- 밥 먹기: 체력 회복

- 잠자기: 자동으로 체력 회복

- 공부하기: JavaScript 언어 관련 OX 퀴즈 ( 맞춘 갯수에 따라 경험치 증가 )

- 운동하기: 스페이스바 연타하여 캐릭터를 이동시키는 게임 ( 10초 내 성공 시 경험치 증가 )

- 청소하기: 떨어지는 캔을 클릭해서 제거하는 게임 ( 실패 시 메인 화면에 쓰레기 노출 )

<br />

🎮 게임 흐름 🎮

```
인트로
  ↓
게임 시작 (시간이 흐를 때 마다 체력 감소)
활동 선택시 패시브(체력 감소)가 일시정지
  ↓
[활동 선택]
 ├─ 밥먹기 → 체력 회복
 ├─ 잠자기 → 체력 회복
 ├─ 공부하기 → 경험치 획득 ( 맞춘 갯수에 따라 경험치 증가 )
 ├─ 운동하기 → 경험치 획득 ( 성공시 경험치 2 증가 )
 └─ 청소하기 → 일정 시간이 지나면 메인 화면에 쓰레기 쌓임 그때 청소하기를 해야 함
  ↓
체력이 0이 된다면 사망 화면이 출력 → 경험치 리셋
경험치가 10을 넘을 경우 -> 중수 단계 ( 스타일 변화 )
경험치가 20을 넘을 경우 -> 고수 단계 ( 스타일 변화 )
경험치가 36을 넘을 경우 -> 엔딩 화면 ( 개발자가 되었습니다. )
```

<br />

## 🛠️ 기술 스택

| 분류      | Tool                                                                                                                                                                                                                                                                                                                                                                                    |
| :-------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 언어      | ![HTML](https://img.shields.io/badge/HTML-%23E34F26.svg?logo=html5&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff) |
| 개발 환경 | ![Visual Studio Code](https://custom-icon-badges.demolab.com/badge/Visual%20Studio%20Code-0078d7.svg?logo=vsc&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff)                                                                                                                                                                                |
| 협업      | ![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?&logo=discord&logoColor=white) ![Notion](https://img.shields.io/badge/Notion-000?logo=notion&logoColor=fff) ![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?logo=github&logoColor=white)                                                                                                                      |
| 디자인    | ![Figma](https://img.shields.io/badge/Figma-F24E1E?logo=figma&logoColor=white)                                                                                                                                                                                                                                                                                                          |
| 배포      | ![Netlify](https://img.shields.io/badge/Netlify-%23000000.svg?logo=netlify&logoColor=#00C7B7)                                                                                                                                                                                                                                                                                           |

<br />

## 📚 더 자세한 정보

팀 구성원 및 역할 ,프로젝트의 개발 가이드, 협업 방식, 데일리 스크럼 등
주요 기록은 Wiki에서 확인하실 수 있습니다.

➡️ [TEAM nu11 프로젝트 Wiki 바로가기](https://github.com/FRONTENDBOOTCAMP-13th/JS-11-nu11/wiki)
