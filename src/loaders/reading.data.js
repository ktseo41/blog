/// <reference path="typedefs.js" />
import axios from "axios";
import { loadEnv } from "vitepress";
const env = loadEnv("", process.cwd());

const bookLogs = [
  {
    name: "모래알만 한 진실이라도",
    startedAt: "2020-05",
    endAt: "2022-06",
    progressValue: 100,
  },
  {
    name: "한 권으로 읽는 컴퓨터 구조와 프로그래밍",
    startedAt: "2020-10",
    progressValue: 18,
    inProgress: false,
  },
  {
    name: "일 잘하는 사람은 단순하게 합니다",
    startedAt: "2020-09",
    progressValue: 29,
    inProgress: false,
  },
  {
    name: "불안의 책",
    startedAt: "2020-11",
    progressValue: 28,
    logs: [
      {
        date: "2023-03-24",
        progressValue: 13,
      },
      {
        date: "2024-05-19",
        progressValue: 28,
      },
    ],
  },
  {
    name: "리얼리티 버블",
    startedAt: "2021-01",
    progressValue: 8,
    inProgress: false,
  },
  {
    name: "쌤 코끼리 그려주세요",
    startedAt: "2020-12",
    progressValue: 100,
  },
  {
    name: "편집자는 편집을 하지 않는다 7",
    startedAt: "2020-12",
    progressValue: 100,
  },
  {
    name: "자기 앞의 생",
    startedAt: "2021-01",
    progressValue: 100,
  },
  {
    name: "함께자라기",
    startedAt: "2020-07",
    progressValue: 100,
  },
  {
    name: "눈물을 마시는 새",
    startedAt: "2021-12",
    endAt: "2021-01",
    progressValue: (388 / 400) * 100,
  },
  {
    name: "실격당한 자들을 위한 변론",
    startedAt: "2022-01",
    progressValue: 100,
  },
  {
    name: "산책과 연애",
    startedAt: "2022-01",
    progressValue: 100,
  },
  {
    name: "신호와 소음",
    startedAt: "2022-02",
    progressValue: (180 / 731) * 100,
    inProgress: false,
  },
  {
    name: "멀고도 가까운",
    startedAt: "2022-03",
    endAt: "2022-04",
    progressValue: (129 / 370) * 100,
    inProgress: false,
  },
  {
    name: "세상을 바꾸는 행동경제학",
    startedAt: "2022-03",
    progressValue: (11 / 100) * 100,
    inProgress: false,
  },
  {
    name: "쥐",
    startedAt: "2022-03",
    progressValue: 100,
  },
  {
    name: "아무튼, 메모",
    startedAt: "2022-03",
    progressValue: 100,
  },
  {
    name: "거의 모든 것의 역사",
    startedAt: "2022-04",
    progressValue: (58 / 537) * 100,
    inProgress: false,
  },
  {
    name: "책 읽는 삶",
    startedAt: "2022-04",
    progressValue: 78,
    inProgress: false,
  },
  {
    name: "작별인사",
    startedAt: "2022-05",
    progressValue: 100,
  },
  {
    name: "게으름에 대한 찬양",
    startedAt: "2022-05",
    progressValue: 12,
    inProgress: false,
  },
  {
    name: "쓰고 싶다 쓰고 싶지 않다",
    startedAt: "2022-05",
    progressValue: 100,
  },
  {
    name: "오직 두사람",
    startedAt: "2022-06",
    progressValue: 100,
  },
  {
    name: "읽지 않은 책에 대해 말하는 법",
    startedAt: "2022-06",
    progressValue: (196 / 237) * 100,
    inProgress: false,
  },
  {
    name: "깨끗한 존경",
    startedAt: "2022-06",
    progressValue: (153 / 243) * 100,
    inProgress: false,
  },
  {
    name: "H마트에서 울다",
    startedAt: "2022-07",
    progressValue: 100,
  },
  {
    name: "시드 마이어",
    startedAt: "2022-08",
    progressValue: 13,
    inProgress: false,
  },
  {
    name: "가벼운 책임",
    startedAt: "2022-09",
    progressValue: (152 / 198) * 100,
    inProgress: false,
  },
  {
    name: "누구나 자료구조와 알고리즘",
    startedAt: "2022-09",
    progressValue: 66,
  },
  {
    name: "가벼운 마음",
    startedAt: "2022-10",
    endAt: "2022-10",
    progressValue: (193 / 193) * 100,
  },
  {
    name: "나의 아름다운 할머니",
    startedAt: "2022-10",
    progressValue: (86 / 220) * 100,
    inProgress: false,
  },
  {
    name: "시선으로부터",
    startedAt: "2022-10",
    progressValue: (13 / 335) * 100,
    inProgress: false,
  },
  {
    name: "재수사1",
    startedAt: "2022-11",
    endAt: "2022-11",
    progressValue: 100,
  },
  {
    name: "재수사2",
    startedAt: "2022-11",
    endAt: "2022-11",
    progressValue: (400 / 400) * 100,
  },
  {
    name: "당신 인생의 이야기",
    startedAt: "2022-12",
    progressValue: (424 / 424) * 100,
  },
  {
    name: "이토록 평범한 미래",
    startedAt: "2023-01",
    progressValue: (100 / 100) * 100,
  },
  {
    name: "호밀밭의 파수꾼",
    startedAt: "2023-03",
    progressValue: (100 / 100) * 100,
  },
  {
    name: "스토너",
    startedAt: "2023-05",
    endAt: "2023-08",
    progressValue: (100 / 100) * 100,
  },
  {
    name: "가난의 문법",
    startedAt: "2023-05",
    progressValue: (53 / 100) * 100,
    inProgress: false,
  },
  {
    name: "너무나 많은 여름이",
    startedAt: "2023-06",
    endAt: "2023-07",
    progressValue: (100 / 100) * 100,
  },
  {
    name: "리팩터링",
    startedAt: "2023-08",
    endAt: "2023-10",
    progressValue: (100 / 100) * 100,
  },
  {
    name: "무의미의 축제",
    startedAt: "2023-10",
    endAt: "2023-10",
    progressValue: (100 / 100) * 100,
  },
  {
    name: "아무튼, 계속",
    startedAt: "2023-10",
    endAt: "2023-10",
    progressValue: (100 / 100) * 100,
  },
  {
    name: "모순",
    startedAt: "2023-10",
    endAt: "2023-12",
    progressValue: (100 / 100) * 100,
  },
  {
    name: "0원으로 사는 삶",
    startedAt: "2023-12",
    inProgress: false,
    progressValue: (60 / 100) * 100,
  },
  {
    name: "소크라테스 익스프레스",
    startedAt: "2023-12",
    endAt: "2024-03",
    progressValue: (100 / 100) * 100,
  },
  {
    name: "잘 그리기 금지",
    startedAt: "2023-12",
    progressValue: (100 / 100) * 100,
  },
  {
    name: "개발자 원칙",
    startedAt: "2024-01",
    progressValue: (100 / 100) * 100,
  },
  {
    name: "소프트 스킬",
    startedAt: "2024-01",
    progressValue: (450 / 581) * 100,
    inProgress: false,
    logs: [
      {
        date: "2024-03-24",
        progressValue: (40 / 100) * 100,
      },
      {
        date: "2024-04-14",
        progressValue: (343 / 581) * 100,
      },
      {
        date: "2024-04-24",
        progressValue: (366 / 581) * 100,
      },
      {
        date: "2024-05-02",
        progressValue: (450 / 581) * 100,
      },
    ],
  },
  {
    name: "일곱 해의 마지막",
    startedAt: "2024-02",
    endAt: "2024-03",
    progressValue: (100 / 100) * 100,
  },
  {
    name: "세상을 어떻게 이해할 것인가",
    startedAt: "2024-03",
    progressValue: (76 / 279) * 100,
    logs: [
      {
        date: "2024-03-24",
        progressValue: (10 / 100) * 100,
      },
      {
        date: "2024-04-14",
        progressValue: (76 / 279) * 100,
      },
    ],
  },
  {
    name: "우리 본성의 선한 천사",
    startedAt: "2024-03",
    progressValue: (318 / 1180) * 100,
    logs: [
      {
        date: "2024-03-24",
        progressValue: (5 / 100) * 100,
      },
      {
        date: "2024-04-14",
        progressValue: (126 / 1180) * 100,
      },
      {
        date: "2024-04-24",
        progressValue: (226 / 1180) * 100,
      },
      {
        date: "2024-04-28",
        progressValue: (288 / 1180) * 100,
      },
      {
        date: "2024-05-02",
        progressValue: (318 / 1180) * 100,
      },
    ],
  },
  {
    name: "그렇게 작가가 된다",
    startedAt: "2024-03",
    progressValue: (100 / 241) * 100,
    logs: [
      {
        date: "2024-03-24",
        progressValue: (46 / 241) * 100,
      },
      {
        date: "2024-04-14",
        progressValue: (52 / 241) * 100,
      },
      {
        date: "2024-04-28",
        progressValue: (100 / 241) * 100,
      },
    ],
  },
  {
    name: "10개의 시점으로 보는 영화감상법",
    startedAt: "2024-03",
    endAt: "2024-04",
    progressValue: (237 / 237) * 100,
    logs: [
      {
        date: "2024-03-24",
        progressValue: (84 / 237) * 100,
      },
      {
        date: "2024-04-14",
        progressValue: (194 / 237) * 100,
      },
      {
        date: "2024-04-24",
        progressValue: (237 / 237) * 100,
      },
    ],
  },
  {
    name: "슬픈 세상의 기쁜 말",
    startedAt: "2024-03",
    progressValue: (263 / 263) * 100,
    logs: [
      {
        date: "2024-04-04",
        progressValue: (20 / 100) * 100,
      },
      {
        date: "2024-04-14",
        progressValue: (128 / 263) * 100,
      },
      {
        date: "2024-04-17",
        progressValue: (200 / 263) * 100,
      },
    ],
  },
  {
    name: "원숭이도 이해하는 자본론",
    startedAt: "2024-04",
    endAt: "2024-07",
    progressValue: (317 / 317) * 100,
    logs: [
      {
        date: "2024-05-19",
        progressValue: (98 / 317) * 100,
      },
      {
        date: "2024-07-02",
        progressValue: (307 / 317) * 100,
      },
    ],
  },
  {
    name: "1페이지 한국사 365",
    startedAt: "2024-04",
    progressValue: (34 / 365) * 100,
    logs: [
      {
        date: "2024-05-19",
        progressValue: (15 / 365) * 100,
      },
      {
        date: "2024-07-02",
        progressValue: (34 / 365) * 100,
      },
    ],
  },
  {
    name: "구글 엔지니어는 이렇게 일한다",
    startedAt: "2024-06",
    progressValue: (5 / 25) * 100,
    logs: [
      {
        date: "2024-07-02",
        progressValue: (5 / 25) * 100,
      },
    ],
  },
  {
    name: "지지 않는다는 말",
    startedAt: "2024-06",
    endAt: "2024-07",
    progressValue: (291 / 291) * 100,
    logs: [
      {
        date: "2024-07-02",
        progressValue: (184 / 291) * 100,
      },
    ],
  },
  {
    name: "세계의 끝 여자친구",
    startedAt: "2024-06",
    endAt: "2024-07",
    progressValue: (315 / 315) * 100,
    logs: [
      {
        date: "2024-07-02",
        progressValue: (91 / 315) * 100,
      },
    ],
  },
  {
    name: "서사의 위기",
    startedAt: "2024-07",
    progressValue: (60 / 100) * 100,
    inProgress: false,
  },
  {
    name: "나의 문화유산 답사기 일본편 1",
    startedAt: "2024-07",
    endAt: "2024-07",
    progressValue: (60 / 100) * 100,
    inProgress: false,
  },
  {
    name: "나의 문화유산 답사기 일본편 2",
    startedAt: "2024-07",
    endAt: "2024-08",
    progressValue: (40 / 100) * 100,
    inProgress: false,
  },
  {
    name: "나의 문화유산 답사기 일본편 3",
    startedAt: "2024-07",
    endAt: "2024-08",
    progressValue: (30 / 100) * 100,
    inProgress: false,
  },
  {
    name: "이야기 일본사",
    startedAt: "2024-07",
    endAt: "2024-07",
    progressValue: (15 / 100) * 100,
    inProgress: false,
  },
  {
    name: "일본사 여행",
    startedAt: "2024-07",
    endAt: "2024-08",
    progressValue: (20 / 100) * 100,
    inProgress: false,
  },
  {
    name: "이즈의 무희 천 마리 학 호수",
    startedAt: "2024-07",
    endAt: "2024-07",
    progressValue: (10 / 100) * 100,
  },
  {
    name: "수역",
    startedAt: "2024-08",
    endAt: "2024-08",
    progressValue: (100 / 100) * 100,
  },
  {
    name: "역사의 쓸모",
    startedAt: "2024-08",
    endAt: "2024-08",
    progressValue: (45 / 100) * 100,
    inProgress: false,
  },
  {
    name: "청춘유감",
    startedAt: "2024-08",
    endAt: "2024-09",
    progressValue: (100 / 100) * 100,
  },
  {
    name: "동경일일",
    startedAt: "2024-08",
    endAt: "2024-09",
    progressValue: (100 / 100) * 100,
  },
  {
    name: "사물의 소멸",
    startedAt: "2024-09",
    progressValue: (20 / 100) * 100,
  },
  {
    name: "아무튼, SF게임",
    startedAt: "2024-09",
    endAt: "2024-09",
    progressValue: (100 / 100) * 100,
  },
  {
    name: "동네서점 베스트 컬렉션 김연수",
    startedAt: "2024-09",
    endAt: "2024-09",
    progressValue: (100 / 100) * 100,
    logs: [
      {
        date: "2024-09-10",
        progressValue: (75 / 100) * 100,
      },
      {
        date: "2024-09-11",
        progressValue: (100 / 100) * 100,
      },
    ],
  },
  {
    name: "느리게 사는 것의 의미",
    startedAt: "2024-09",
    progressValue: (116 / 290) * 100,
    inProgress: false,
    logs: [
      {
        date: "2024-09-10",
        progressValue: (91 / 290) * 100,
      },
      {
        date: "2024-09-10",
        progressValue: (116 / 290) * 100,
      },
    ],
  },
  {
    name: "역사 문해력 수업",
    startedAt: "2024-09",
    progressValue: (122 / 365) * 100,
    inProgress: false,
    logs: [
      {
        date: "2024-09-10",
        progressValue: (66 / 365) * 100,
      },
      {
        date: "2024-09-11",
        progressValue: (122 / 365) * 100,
      },
      {
        date: "2024-09-12",
        progressValue: (124 / 365) * 100,
      },
    ],
  },
  {
    name: "지적 대화를 위한 넓고 얕은 지식 - 철학, 과학, 종교, 예술, 신비",
    startedAt: "2024-09",
    progressValue: (372 / 372) * 100,
    logs: [
      {
        date: "2024-09-12",
        progressValue: (80 / 372) * 100,
      },
      {
        date: "2024-09-13",
        progressValue: (137 / 372) * 100,
      },
      {
        date: "2024-09-14",
        progressValue: (215 / 372) * 100,
      },
      {
        date: "2024-09-18",
        progressValue: (372 / 372) * 100,
      },
    ],
  },
  {
    name: "한국단편문학선 1",
    startedAt: "2024-09",
    progressValue: (4 / 19) * 100,
    logs: [
      {
        date: "2024-09-13",
        progressValue: (5 / 100) * 100,
      },
      {
        date: "2024-09-16",
        progressValue: (1 / 19) * 100,
      },
      {
        date: "2024-09-19",
        progressValue: (2 / 19) * 100,
      },
      {
        date: "2024-09-22",
        progressValue: (4 / 19) * 100,
      },
    ],
  },
  {
    name: "지적 대화를 위한 넓고 얕은 지식 - 제로",
    startedAt: "2024-09",
    endAt: "2024-09-24",
    progressValue: (553 / 553) * 100,
    logs: [
      {
        date: "2024-09-19",
        progressValue: (216 / 553) * 100,
      },
      {
        date: "2024-09-22",
        progressValue: (346 / 553) * 100,
      },
      {
        date: "2024-09-24",
        progressValue: (553 / 553) * 100,
      },
    ],
  },
  {
    name: "유리알 유희 1",
    inProgress: false,
    startedAt: "2024-09-22",
    endAt: "2024-09-26",
    progressValue: (189 / 420) * 100,
    logs: [
      {
        date: "2024-09-22",
        progressValue: (98 / 420) * 100,
      },
      {
        date: "2024-09-25",
        progressValue: (189 / 420) * 100,
      },
      {
        date: "2024-09-26",
        progressValue: (196 / 420) * 100,
      },
    ],
  },
  {
    name: "서점 일기",
    startedAt: "2024-09-25",
    endAt: "2024-10-05",
    progressValue: (436 / 436) * 100,
    logs: [
      {
        date: "2024-09-25",
        progressValue: (61 / 436) * 100,
      },
      {
        date: "2024-09-29",
        progressValue: (160 / 436) * 100,
      },
      {
        date: "2024-09-29",
        progressValue: (268 / 436) * 100,
      },
      {
        date: "2024-10-05",
        progressValue: (436 / 436) * 100,
      },
    ],
  },
  {
    name: "귀한 서점에 누추하신 분이",
    startedAt: "2024-09-26",
    endAt: "2024-09-26",
    progressValue: (100 / 100) * 100,
    logs: [
      {
        date: "2024-09-26",
        progressValue: (100 / 100) * 100,
      },
    ],
  },
  {
    name: "사브리나",
    startedAt: "2024-09-26",
    endAt: "2024-09-29",
    progressValue: (203 / 203) * 100,
    logs: [
      {
        date: "2024-09-26",
        progressValue: (56 / 203) * 100,
      },
      {
        date: "2024-09-29",
        progressValue: (203 / 203) * 100,
      },
    ],
  },
  {
    name: "옛날 영화, 이 좋은 걸 이제 알았다니",
    startedAt: "2024-09",
    endAt: "2024-10",
    progressValue: (104 / 243) * 100,
    inProgress: false,
    logs: [
      {
        date: "2024-09-29",
        progressValue: (34 / 243) * 100,
      },
      {
        date: "2024-09-30",
        progressValue: (104 / 243) * 100,
      },
      {
        date: "2024-10-05",
        progressValue: (112 / 243) * 100,
      },
    ],
  },
  {
    name: "사랑의 생애",
    startedAt: "2024-10-04",
    endAt: "2024-10-08",
    progressValue: (292 / 292) * 100,
    logs: [
      {
        date: "2024-10-04",
        progressValue: (112 / 292) * 100,
      },
      {
        date: "2024-10-07",
        progressValue: (210 / 292) * 100,
      },
      {
        date: "2024-10-08",
        progressValue: (292 / 292) * 100,
      },
    ],
  },
  {
    name: "세상에서 가장 짧은 한국사",
    startedAt: "2024-10-08",
    endAt: "2024-10-16",
    progressValue: (374 / 374) * 100,
    logs: [
      {
        date: "2024-10-08",
        progressValue: (56 / 374) * 100,
      },
      {
        date: "2024-10-09",
        progressValue: (82 / 374) * 100,
      },
      {
        date: "2024-10-10",
        progressValue: (146 / 374) * 100,
      },
      {
        date: "2024-10-11",
        progressValue: (205 / 374) * 100,
      },
      {
        date: "2024-10-15",
        progressValue: (302 / 374) * 100,
      },
      {
        date: "2024-10-16",
        progressValue: (374 / 374) * 100,
      },
    ],
  },
  {
    name: "목소리들",
    startedAt: "2024-10-08",
    endAt: "2024-10-18",
    progressValue: (240 / 240) * 100,
    logs: [
      {
        date: "2024-10-08",
        progressValue: (1 / 10) * 100,
      },
      {
        date: "2024-10-10",
        progressValue: (118 / 240) * 100,
      },
      {
        date: "2024-10-11",
        progressValue: (162 / 240) * 100,
      },
      {
        date: "2024-10-18",
        progressValue: (240 / 240) * 100,
      },
    ],
  },
  {
    name: "영화 인문학 콘서트",
    startedAt: "2024-10-13",
    endAt: "2024-10-14",
    progressValue: (102 / 187) * 100,
    inProgress: false,
    logs: [
      {
        date: "2024-10-13",
        progressValue: (32 / 187) * 100,
      },
      {
        date: "2024-10-14",
        progressValue: (102 / 187) * 100,
      },
    ],
  },
  {
    name: "OTT로 만나는 명작 영화 51선",
    startedAt: "2024-10-13",
    endAt: "2024-10-18",
    inProgress: false,
    progressValue: (15 / 51) * 100,
    logs: [
      {
        date: "2024-10-14",
        progressValue: (6 / 51) * 100,
      },
      {
        date: "2024-10-16",
        progressValue: (10 / 51) * 100,
      },
      {
        date: "2024-10-18",
        progressValue: (15 / 51) * 100,
      },
    ],
  },
  {
    name: "지적 대화를 위한 넓고 얕은 지식 1",
    startedAt: "2024-10-16",
    inProgress: false,
    progressValue: (3 / 100) * 100,
    logs: [
      {
        date: "2024-10-16",
        progressValue: (3 / 100) * 100,
      },
    ],
  },
  {
    name: "보이지 않는 경제학",
    startedAt: "2024-10-16",
    endAt: "2024-10-30",
    progressValue: (349 / 349) * 100,
    logs: [
      {
        date: "2024-10-16",
        progressValue: (0 / 100) * 100,
      },
      {
        date: "2024-10-20",
        progressValue: (107 / 349) * 100,
      },
      {
        date: "2024-10-22",
        progressValue: (173 / 349) * 100,
      },
      {
        date: "2024-10-27",
        progressValue: (194 / 349) * 100,
      },
      {
        date: "2024-10-28",
        progressValue: (233 / 349) * 100,
      },
      {
        date: "2024-10-29",
        progressValue: (330 / 349) * 100,
      },
      {
        date: "2024-10-29",
        progressValue: (349 / 349) * 100,
      },
    ],
  },
  {
    name: "죄와 벌 1",
    startedAt: "2024-10-19",
    endAt: "2024-10-27",
    progressValue: (502 / 502) * 100,
    logs: [
      {
        date: "2024-10-19",
        progressValue: (183 / 502) * 100,
      },
      {
        date: "2024-10-19",
        progressValue: (298 / 502) * 100,
      },
      {
        date: "2024-10-22",
        progressValue: (368 / 502) * 100,
      },
      {
        date: "2024-10-25",
        progressValue: (434 / 502) * 100,
      },
      {
        date: "2024-10-27",
        progressValue: (502 / 502) * 100,
      },
    ],
  },
  {
    name: "전국 책방 여행기",
    startedAt: "2024-10-22",
    endAt: "2024-10-24",
    progressValue: (300 / 300) * 100,
    logs: [
      {
        date: "2024-10-24",
        progressValue: (300 / 300) * 100,
      },
    ],
  },
  {
    name: "죄와 벌 2",
    startedAt: "2024-10-27",
    endAt: "2024-11-06",
    progressValue: (499 / 499) * 100,
    logs: [
      {
        date: "2024-10-27",
        progressValue: (53 / 499) * 100,
      },
      {
        date: "2024-10-28",
        progressValue: (103 / 499) * 100,
      },
      {
        date: "2024-10-29",
        progressValue: (153 / 499) * 100,
      },
      {
        date: "2024-10-30",
        progressValue: (169 / 499) * 100,
      },
      {
        date: "2024-11-01",
        progressValue: (334 / 499) * 100,
      },
      {
        date: "2024-11-03",
        progressValue: (376 / 499) * 100,
      },
      {
        date: "2024-11-06",
        progressValue: (499 / 499) * 100,
      },
    ],
  },
  {
    name: "장하준의 경제학 강의",
    startedAt: "2024-11-01",
    endAt: "2024-11-18",
    inProgress: false,
    progressValue: (374 / 445) * 100,
    logs: [
      {
        date: "2024-11-01",
        progressValue: (83 / 445) * 100,
      },
      {
        date: "2024-11-06",
        progressValue: (111 / 445) * 100,
      },
      {
        date: "2024-11-08",
        progressValue: (136 / 445) * 100,
      },
      {
        date: "2024-11-12",
        progressValue: (171 / 445) * 100,
      },
      {
        date: "2024-11-17",
        progressValue: (304 / 445) * 100,
      },
      {
        date: "2024-11-18",
        progressValue: (374 / 445) * 100,
      },
    ],
  },
  {
    name: "작은 땅의 야수들",
    startedAt: "2024-11-06",
    endAt: "2024-11-17",
    progressValue: (603 / 603) * 100,
    logs: [
      {
        date: "2024-11-06",
        progressValue: (56 / 603) * 100,
      },
      {
        date: "2024-11-07",
        progressValue: (118 / 603) * 100,
      },
      {
        date: "2024-11-10",
        progressValue: (228 / 603) * 100,
      },
      {
        date: "2024-11-11",
        progressValue: (278 / 603) * 100,
      },
      {
        date: "2024-11-12",
        progressValue: (386 / 603) * 100,
      },
      {
        date: "2024-11-13",
        progressValue: (432 / 603) * 100,
      },
      {
        date: "2024-11-15",
        progressValue: (540 / 603) * 100,
      },
      {
        date: "2024-11-17",
        progressValue: (603 / 603) * 100,
      },
    ],
  },
  {
    name: "헤르만 헤세의 책이라는 세계",
    inProgress: false,
    startedAt: "2024-11-13",
    endAt: "2024-12-03",
    progressValue: (211 / 325) * 100,
    logs: [
      {
        date: "2024-11-13",
        progressValue: (51 / 325) * 100,
      },
      {
        date: "2024-11-21",
        progressValue: (86 / 325) * 100,
      },
      {
        date: "2024-11-27",
        progressValue: (118 / 325) * 100,
      },
      {
        date: "2024-12-03",
        progressValue: (211 / 325) * 100,
      },
    ],
  },
  {
    name: "프롬프트 엔지니어의 업무일지",
    startedAt: "2024-11-27",
    progressValue: (290 / 362) * 100,
    logs: [
      {
        date: "2024-11-27",
        progressValue: (87 / 362) * 100,
      },
      {
        date: "2024-12-05",
        progressValue: (165 / 362) * 100,
      },
      {
        date: "2024-12-07",
        progressValue: (222 / 362) * 100,
      },
      {
        date: "2024-12-08",
        progressValue: (260 / 362) * 100,
      },
      {
        date: "2024-12-09",
        progressValue: (290 / 362) * 100,
      },
    ],
  },
  {
    name: "소수의 고독",
    startedAt: "2024-12-02",
    endAt: "2024-12-05",
    progressValue: (415 / 415) * 100,
    logs: [
      {
        date: "2024-12-02",
        progressValue: (130 / 415) * 100,
      },
      {
        date: "2024-12-03",
        progressValue: (170 / 415) * 100,
      },
      {
        date: "2024-12-04",
        progressValue: (287 / 415) * 100,
      },
      {
        date: "2024-12-05",
        progressValue: (415 / 415) * 100,
      },
    ],
  },
  {
    name: "한국단편문학선 2",
    startedAt: "2024-12-08",
    progressValue: (26 / 383) * 100,
    logs: [
      {
        date: "2024-12-08",
        progressValue: (26 / 383) * 100,
      },
    ],
  },
  {
    name: "두려움은 소문일 뿐이다",
    startedAt: "2024-12-08",
    endAt: "2024-12-20",
    progressValue: (355 / 355) * 100,
    logs: [
      {
        date: "2024-12-08",
        progressValue: (94 / 355) * 100,
      },
      {
        date: "2024-12-10",
        progressValue: (121 / 355) * 100,
      },
      {
        date: "2024-12-13",
        progressValue: (164 / 355) * 100,
      },
      {
        date: "2024-12-15",
        progressValue: (200 / 355) * 100,
      },
      {
        date: "2024-12-18",
        progressValue: (251 / 355) * 100,
      },
      {
        date: "2024-12-19",
        progressValue: (286 / 355) * 100,
      },
      {
        date: "2024-12-20",
        progressValue: (355 / 355) * 100,
      },
    ],
  },
  {
    name: "연년세세",
    startedAt: "2024-12-08",
    endAt: "2024-12-10",
    progressValue: (183 / 183) * 100,
    logs: [
      {
        date: "2024-12-08",
        progressValue: (44 / 183) * 100,
      },
      {
        date: "2024-12-10",
        progressValue: (183 / 183) * 100,
      },
    ],
  },
  {
    name: "인문학 거저보기 서양철학편",
    inProgress: false,
    startedAt: "2024-12-13",
    endAt: "2024-12-13",
    progressValue: (40 / 380) * 100,
    logs: [
      {
        date: "2024-12-13",
        progressValue: (40 / 380) * 100,
      },
    ],
  },
  {
    name: "사는 게 힘드냐고 니체가 물었다",
    startedAt: "2024-12-13",
    endAt: "2024-12-18",
    progressValue: (266 / 266) * 100,
    logs: [
      {
        date: "2024-12-13",
        progressValue: (70 / 266) * 100,
      },
      {
        date: "2024-12-15",
        progressValue: (122 / 266) * 100,
      },
      {
        date: "2024-12-16",
        progressValue: (199 / 266) * 100,
      },
      {
        date: "2024-12-17",
        progressValue: (244 / 266) * 100,
      },
      {
        date: "2024-12-18",
        progressValue: (266 / 266) * 100,
      },
    ],
  },
  {
    name: "자유로부터의 도피",
    startedAt: "2024-12-18",
    endAt: "2024-12-27",
    inProgress: false,
    progressValue: (39 / 341) * 100,
    logs: [
      {
        date: "2024-12-18",
        progressValue: (28 / 341) * 100,
      },
      {
        date: "2024-12-23",
        progressValue: (39 / 341) * 100,
      },
      {
        date: "2024-12-27",
        progressValue: (48 / 341) * 100,
      },
    ],
  },
  {
    name: "참을 수 없이 불안할 때, 에리히 프롬",
    startedAt: "2024-12-21",
    endAt: "2024-12-27",
    inProgress: false,
    progressValue: (130 / 265) * 100,
    logs: [
      {
        date: "2024-12-21",
        progressValue: (57 / 265) * 100,
      },
      {
        date: "2024-12-23",
        progressValue: (94 / 265) * 100,
      },
      {
        date: "2024-12-24",
        progressValue: (127 / 265) * 100,
      },
      {
        date: "2024-12-27",
        progressValue: (130 / 265) * 100,
      },
    ],
  },
  {
    name: "타자철학",
    startedAt: "2024-12-27",
    inProgress: false,
    endAt: "2025-01-03",
    progressValue: (48 / 597) * 100,
    logs: [
      {
        date: "2024-12-27",
        progressValue: (39 / 597) * 100,
      },
      {
        date: "2024-12-28",
        progressValue: (48 / 597) * 100,
      },
      {
        date: "2024-12-29",
        progressValue: (56 / 597) * 100,
      },
    ],
  },
  {
    name: "우리는 왜 끊임없이 곁눈질을 하는가",
    inProgress: false,
    startedAt: "2025-01-03",
    endAt: "2025-01-07",
    progressValue: (75 / 415) * 100,
    logs: [
      {
        date: "2025-01-03",
        progressValue: (32 / 415) * 100,
      },
      {
        date: "2025-01-05",
        progressValue: (34 / 415) * 100,
      },
      {
        date: "2025-01-06",
        progressValue: (56 / 415) * 100,
      },
      {
        date: "2025-01-07",
        progressValue: (75 / 415) * 100,
      },
    ],
  },
  {
    name: "두 얼굴의 사나이",
    startedAt: "2025-01-05",
    inProgress: false,
    progressValue: (72 / 163) * 100,
    logs: [
      {
        date: "2025-01-05",
        progressValue: (32 / 163) * 100,
      },
      {
        date: "2025-01-06",
        progressValue: (72 / 163) * 100,
      },
    ],
  },
  {
    name: "황순원문학상 수상작품집 2017",
    startedAt: "2025-01-15",
    endAt: "2025-02-13",
    progressValue: (10 / 10) * 100,
  },
  {
    name: "내 삶에 예술을 들일 때, 니체",
    startedAt: "2025-02-16",
    endAt: "2025-02-26",
    inProgress: false,
    progressValue: (90 / 209) * 100,
    logs: [
      {
        date: "2025-02-16",
        progressValue: (66 / 209) * 100,
      },
      {
        date: "2025-02-22",
        progressValue: (84 / 209) * 100,
      },
      {
        date: "2025-02-26",
        progressValue: (90 / 209) * 100,
      },
    ],
  },
  {
    name: "사월의 미, 칠월의 솔",
    startedAt: "2025-02-17",
    endAt: "2025-02-26",
    progressValue: (11 / 11) * 100,
    logs: [
      {
        date: "2025-02-17",
        progressValue: (2 / 11) * 100,
      },
      {
        date: "2025-02-19",
        progressValue: (3 / 11) * 100,
      },
      {
        date: "2025-02-20",
        progressValue: (5 / 11) * 100,
      },
      {
        date: "2025-02-26",
        progressValue: (11 / 11) * 100,
      },
    ],
  },
  {
    name: "목양면 방화 사건 전말기",
    startedAt: "2025-03-01",
    endAt: "2025-03-12",
    progressValue: (169 / 169) * 100,
    logs: [
      {
        date: "2025-03-01",
        progressValue: (20 / 169) * 100,
      },
      {
        date: "2025-03-12",
        progressValue: (169 / 169) * 100,
      },
    ],
  },
  {
    name: "파도가 바다의 일이라면",
    startedAt: "2025-03-13",
    endAt: "2025-03-17",
    progressValue: (287 / 287) * 100,
    logs: [
      {
        date: "2025-03-14",
        progressValue: (34 / 287) * 100,
      },
      {
        date: "2025-03-15",
        progressValue: (54 / 287) * 100,
      },
      {
        date: "2025-03-17",
        progressValue: (287 / 287) * 100,
      },
    ],
  },
  {
    name: "나의 한국 현대사",
    startedAt: "2025-03-18",
    endAt: "2025-05-14",
    progressValue: (418 / 418) * 100,
    logs: [
      {
        date: "2025-03-18",
        progressValue: (53 / 418) * 100,
      },
      {
        date: "2025-03-19",
        progressValue: (119 / 418) * 100,
      },
      {
        date: "2025-04-09",
        progressValue: (187 / 418) * 100,
      },
      {
        date: "2025-04-10",
        progressValue: (207 / 418) * 100,
      },
      {
        date: "2025-04-10",
        progressValue: (245 / 418) * 100,
      },
      {
        date: "2025-04-23",
        progressValue: (250 / 418) * 100,
      },
      {
        date: "2025-04-24",
        progressValue: (276 / 418) * 100,
      },
      {
        date: "2025-05-09",
        progressValue: (324 / 418) * 100,
      },
      {
        date: "2025-05-11",
        progressValue: (364 / 418) * 100,
      },
      {
        date: "2025-05-14",
        progressValue: (418 / 418) * 100,
      },
    ],
  },
  {
    name: "이효석문학상 수상작품집 2023",
    startedAt: "2025-03-23",
    endAt: "2025-03-27",
    inProgress: false,
    progressValue: (2 / 13) * 100,
    logs: [
      {
        date: "2025-03-27",
        progressValue: (2 / 13) * 100,
      },
    ],
  },
  {
    name: "생각에 관한 생각",
    startedAt: "2025-04-07",
    progressValue: (65 / 611) * 100,
    logs: [
      {
        date: "2025-04-07",
        progressValue: (39 / 611) * 100,
      },
      {
        date: "2025-04-08",
        progressValue: (65 / 611) * 100,
      },
    ],
  },
  {
    name: "무진 기행",
    startedAt: "2025-05-10",
    endAt: "2025-05-10",
    progressValue: (34 / 34) * 100,
    logs: [
      {
        date: "2025-05-10",
        progressValue: (34 / 34) * 100,
      },
    ],
  },
  {
    name: "시절일기",
    startedAt: "2025-05-18",
    endAt: "2025-05-25",
    inProgress: false,
    progressValue: (170 / 333) * 100,
    logs: [
      {
        date: "2025-05-18",
        progressValue: (60 / 333) * 100,
      },
      {
        date: "2025-05-20",
        progressValue: (121 / 333) * 100,
      },
      {
        date: "2025-05-21",
        progressValue: (138 / 333) * 100,
      },
      {
        date: "2025-05-25",
        progressValue: (170 / 333) * 100,
      },
    ],
  },
  {
    name: "우리가 빛의 속도로 갈 수 없다면",
    startedAt: "2025-05-20",
    endAt: "2025-05-23",
    progressValue: (335 / 335) * 100,
    logs: [
      {
        date: "2025-05-20",
        progressValue: (5 / 335) * 100,
      },
      {
        date: "2025-05-21",
        progressValue: (143 / 335) * 100,
      },
      {
        date: "2025-05-23",
        progressValue: (335 / 335) * 100,
      },
    ],
  },
  {
    name: "무지와 편견의 세계사",
    startedAt: "2025-05-25",
    endAt: "2025-05-30",
    inProgress: false,
    progressValue: (90 / 506) * 100,
    logs: [
      {
        date: "2025-05-25",
        progressValue: (16 / 506) * 100,
      },
      {
        date: "2025-05-28",
        progressValue: (77 / 506) * 100,
      },
      {
        date: "2025-05-30",
        progressValue: (90 / 506) * 100,
      },
    ],
  },
  {
    name: "나는 유령작가입니다",
    startedAt: "2025-05-26",
    endAt: "2025-05-30",
    inProgress: false,
    progressValue: (2 / 9) * 100,
    logs: [
      {
        date: "2025-05-26",
        progressValue: (1 / 9) * 100,
      },
      {
        date: "2025-05-29",
        progressValue: (2 / 9) * 100,
      },
      {
        date: "2025-05-30",
        progressValue: (3 / 9) * 100,
      },
    ],
  },
  {
    name: "세계사 최대한 쉽게 설명해 드립니다",
    startedAt: "2025-05-30",
    endAt: "2025-06-15",
    progressValue: (343 / 343) * 100,
    logs: [
      {
        date: "2025-05-30",
        progressValue: (30 / 343) * 100,
      },
      {
        date: "2025-05-31",
        progressValue: (80 / 343) * 100,
      },
      {
        date: "2025-06-10",
        progressValue: (125 / 343) * 100,
      },
      {
        date: "2025-06-12",
        progressValue: (178 / 343) * 100,
      },
      {
        date: "2025-06-15",
        progressValue: (343 / 343) * 100,
      },
    ],
  },
  {
    name: "파견자들",
    startedAt: "2025-05-31",
    endAt: "2025-06-08",
    progressValue: (430 / 430) * 100,
    logs: [
      {
        date: "2025-05-31",
        progressValue: (36 / 430) * 100,
      },
      {
        date: "2025-06-03",
        progressValue: (220 / 430) * 100,
      },
      {
        date: "2025-06-08",
        progressValue: (430 / 430) * 100,
      },
    ],
  },
  {
    name: "종의 기원",
    author: "정유정",
    startedAt: "2025-06-06",
    endAt: "2025-06-15",
    inProgress: false,
    progressValue: (210 / 378) * 100,
    logs: [
      {
        date: "2025-06-06",
        progressValue: (80 / 378) * 100,
      },
      {
        date: "2025-06-08",
        progressValue: (130 / 378) * 100,
      },
      {
        date: "2025-06-10",
        progressValue: (210 / 378) * 100,
      },
    ],
  },
  {
    name: "만화로 보는 두 번 봐도 재미있는 스펙터클 영화사",
    startedAt: "2025-06-08",
    endAt: "2025-06-17",
    progressValue: (177 / 177) * 100,
    logs: [
      {
        date: "2025-06-08",
        progressValue: (60 / 177) * 100,
      },
      {
        date: "2025-06-10",
        progressValue: (81 / 177) * 100,
      },
      {
        date: "2025-06-11",
        progressValue: (104 / 177) * 100,
      },
      {
        date: "2025-06-17",
        progressValue: (177 / 177) * 100,
      },
    ],
  },
  {
    name: "실크로드 세계사",
    startedAt: "2025-06-17",
    endAt: "2025-07-01",
    inProgress: false,
    progressValue: (120 / 872) * 100,
    logs: [
      {
        date: "2025-06-17",
        progressValue: (59 / 872) * 100,
      },
      {
        date: "2025-07-01",
        progressValue: (120 / 872) * 100,
      },
    ],
  },
  {
    name: "식탁 위의 세계사",
    startedAt: "2025-06-18",
    progressValue: (137 / 187) * 100,
    logs: [
      {
        date: "2025-06-21",
        progressValue: (4 / 10) * 100,
      },
      {
        date: "2025-07-07",
        progressValue: (137 / 187) * 100,
      },
    ],
  },
  {
    name: "거꾸로 읽는 세계사",
    startedAt: "2025-06-20",
    endAt: "2025-07-03",
    progressValue: (386 / 386) * 100,
    logs: [
      {
        date: "2025-06-27",
        progressValue: (171 / 386) * 100,
      },
      {
        date: "2025-07-03",
        progressValue: (386 / 386) * 100,
      },
    ],
  },
  {
    name: "밤은 노래한다",
    startedAt: "2025-06-25",
    endAt: "2025-06-27",
    inProgress: false,
    progressValue: (1 / 20) * 100,
    logs: [
      {
        date: "2025-06-26",
        progressValue: (1 / 20) * 100,
      },
    ],
  },
  {
    name: "각각의 계절",
    startedAt: "2025-06-29",
    endAt: "2025-07-13",
    inProgress: false,
    progressValue: (100 / 242) * 100,
    logs: [
      {
        date: "2025-06-29",
        progressValue: (2 / 10) * 100,
      },
      {
        date: "2025-07-01",
        progressValue: (66 / 242) * 100,
      },
      {
        date: "2025-07-13",
        progressValue: (100 / 242) * 100,
      },
    ],
  },
  {
    name: "극장에는 항상 상훈이형이 있다",
    startedAt: "2025-06-29",
    endAt: "2025-07-11",
    inProgress: false,
    progressValue: (40 / 273) * 100,
    logs: [
      {
        date: "2025-06-29",
        progressValue: (30 / 273) * 100,
      },
      {
        date: "2025-07-08",
        progressValue: (40 / 273) * 100,
      },
    ],
  },
  {
    name: "현대 사상 입문",
    startedAt: "2025-07-03",
    progressValue: (132 / 244) * 100,
    logs: [
      {
        date: "2025-07-03",
        progressValue: (40 / 244) * 100,
      },
      {
        date: "2025-07-08",
        progressValue: (132 / 244) * 100,
      },
    ],
  },
  {
    name: "머더봇 다이어리: 시스템 통제불능",
    startedAt: "2025-07-09",
    endAt: "2025-07-11",
    progressValue: (100 / 100) * 100,
    logs: [
      {
        date: "2025-07-11",
        progressValue: (100 / 100) * 100,
      },
    ],
  },
  {
    name: "머더봇 다이어리: 인공 상태",
    startedAt: "2025-07-09",
    endAt: "2025-07-13",
    progressValue: (225 / 225) * 100,
    logs: [
      {
        date: "2025-07-13",
        progressValue: (225 / 225) * 100,
      },
    ],
  },
  {
    name: "머더봇 다이어리: 로그 프로토콜",
    startedAt: "2025-07-13",
    endAt: "2025-07-15",
    progressValue: (100 / 100) * 100,
    logs: [
      {
        date: "2025-07-13",
        progressValue: (20 / 100) * 100,
      },
      {
        date: "2025-07-14",
        progressValue: (70 / 100) * 100,
      },
      {
        date: "2025-07-15",
        progressValue: (100 / 100) * 100,
      },
    ],
  },
  {
    name: "머더봇 다이어리: 탈출 전략",
    startedAt: "2025-07-15",
    endAt: "2025-07-16",
    progressValue: (100 / 100) * 100,
    logs: [
      {
        date: "2025-07-15",
        progressValue: (50 / 100) * 100,
      },
      {
        date: "2025-07-16",
        progressValue: (100 / 100) * 100,
      },
    ],
  },
  {
    name: "모르는 사람들",
    startedAt: "2025-07-15",
    progressValue: (12 / 100) * 100,
    logs: [
      {
        date: "2025-07-15",
        progressValue: (6 / 100) * 100,
      },
      {
        date: "2025-07-21",
        progressValue: (12 / 100) * 100,
      },
    ],
  },
  {
    name: "프로젝트 헤일메리",
    startedAt: "2025-07-16",
    endAt: "2025-07-22",
    progressValue: (100 / 100) * 100,
  },
  {
    name: "솔라리스",
    startedAt: "2025-07-22",
    progressValue: (447 / 447) * 100,
    logs: [
      {
        date: "2025-07-22",
        progressValue: (42 / 447) * 100,
      },
      {
        date: "2025-07-27",
        progressValue: (106 / 447) * 100,
      },
      {
        date: "2025-07-29",
        progressValue: (212 / 447) * 100,
      },
      {
        date: "2025-08-07",
        progressValue: (384 / 447) * 100,
      },
    ],
  },
  {
    name: "사피엔스",
    startedAt: "2025-07-22",
    endAt: "2025-08-26",
    progressValue: (593 / 593) * 100,
    logs: [
      {
        date: "2025-07-22",
        progressValue: (41 / 593) * 100,
      },
      {
        date: "2025-07-27",
        progressValue: (186 / 593) * 100,
      },
      {
        date: "2025-07-29",
        progressValue: (218 / 593) * 100,
      },
      {
        date: "2025-08-07",
        progressValue: (234 / 593) * 100,
      },
      {
        date: "2025-08-19",
        progressValue: (509 / 593) * 100,
      },
      {
        date: "2025-08-26",
        progressValue: (593 / 593) * 100,
      },
    ],
  },
  {
    name: "선물",
    author: "루이스 하이드",
    startedAt: "2025-07-29",
    endAt: "2025-07-31",
    inProgress: false,
    progressValue: (64 / 631) * 100,
    logs: [
      {
        date: "2025-07-29",
        progressValue: (64 / 631) * 100,
      },
    ],
  },
  {
    name: "하룻밤에 읽는 세계사",
    startedAt: "2025-08-19",
    endAt: "2025-08-26",
    inProgress: false,
    progressValue: (63 / 391) * 100,
    logs: [
      {
        date: "2025-08-19",
        progressValue: (23 / 391) * 100,
      },
      {
        date: "2025-08-26",
        progressValue: (63 / 391) * 100,
      },
    ],
  },
  {
    name: "지옥보다 더 아래",
    startedAt: "2025-08-26",
    endAt: "2025-09-17",
    progressValue: (230 / 230) * 100,
    logs: [
      {
        date: "2025-08-26",
        progressValue: (61 / 230) * 100,
      },
      {
        date: "2025-09-17",
        progressValue: (230 / 230) * 100,
      },
    ],
  },
  {
    name: "사랑이라니 선영아",
    startedAt: "2025-08-26",
    endAt: "2025-09-09",
    progressValue: (133 / 133) * 100,
    logs: [
      {
        date: "2025-08-26",
        progressValue: (30 / 133) * 100,
      },
      {
        date: "2025-09-09",
        progressValue: (133 / 133) * 100,
      },
    ],
  },
  {
    name: "세계를 움직인 열 가지 프레임",
    startedAt: "2025-08-26",
    endAt: "2025-09-02",
    inProgress: false,
    progressValue: (40 / 376) * 100,
    logs: [
      {
        date: "2025-09-01",
        progressValue: (40 / 376) * 100,
      },
    ],
  },
  {
    name: "시민의 교양",
    startedAt: "2025-09-03",
    progressValue: (97 / 352) * 100,
    logs: [
      {
        date: "2025-09-03",
        progressValue: (30 / 352) * 100,
      },
      {
        date: "2025-09-17",
        progressValue: (64 / 352) * 100,
      },
      {
        date: "2025-09-21",
        progressValue: (97 / 352) * 100,
      },
    ],
  },
  {
    name: "에세이 만드는 법",
    startedAt: "2025-09-21",
    endAt: "2025-10-04",
    inProgress: false,
    progressValue: (119 / 175) * 100,
    logs: [
      {
        date: "2025-09-21",
        progressValue: (44 / 175) * 100,
      },
      {
        date: "2025-09-27",
        progressValue: (108 / 175) * 100,
      },
      {
        date: "2025-10-04",
        progressValue: (119 / 175) * 100,
      },
    ],
  },
  {
    name: "(EBS 다큐프라임) 자본주의 사용설명서",
    startedAt: "2025-09-25",
    endAt: "2025-10-04",
    inProgress: false,
    progressValue: (144 / 343) * 100,
    logs: [
      {
        date: "2025-09-25",
        progressValue: (70 / 343) * 100,
      },
      {
        date: "2025-09-27",
        progressValue: (100 / 343) * 100,
      },
      {
        date: "2025-10-04",
        progressValue: (144 / 343) * 100,
      },
    ],
  },
  {
    name: "30개 도시로 읽는 세계사",
    startedAt: "2025-10-04",
    progressValue: (28 / 349) * 100,
    logs: [
      {
        date: "2025-10-04",
        progressValue: (28 / 349) * 100,
      },
      {
        date: "2025-10-11",
        progressValue: (60 / 349) * 100,
      },
    ],
  },
  {
    name: "채권투자 처음공부",
    startedAt: "2025-10-24",
    endAt: "2025-10-30",
    progressValue: (289 / 289) * 100,
    logs: [
      {
        date: "2025-10-24",
        progressValue: (76 / 289) * 100,
      },
      {
        date: "2025-10-25",
        progressValue: (157 / 289) * 100,
      },
      {
        date: "2025-10-30",
        progressValue: (289 / 289) * 100,
      },
    ],
  },
  {
    name: "지적 대화를 위한 넓고 얕은 지식 - 무한",
    startedAt: "2025-10-24",
    endAt: "2025-11-07",
    inProgress: false,
    progressValue: (100 / 289) * 100,
    logs: [
      {
        date: "2025-10-24",
        progressValue: (30 / 350) * 100,
      },
      {
        date: "2025-10-25",
        progressValue: (81 / 350) * 100,
      },
      {
        date: "2025-11-07",
        progressValue: (100 / 350) * 100,
      },
    ],
  },
  {
    name: "60초 소설가",
    startedAt: "2025-10-30",
    progressValue: (3 / 10) * 100,
    logs: [
      {
        date: "2025-10-30",
        progressValue: (3 / 10) * 100,
      },
    ],
  },
  {
    name: "박 회계사의 완벽한 재무제표 활용법",
    startedAt: "2025-11-02",
    progressValue: (138 / 412) * 100,
    logs: [
      {
        date: "2025-11-02",
        progressValue: (11 / 412) * 100,
      },
      {
        date: "2025-11-08",
        progressValue: (138 / 412) * 100,
      },
    ],
  },
];

/**
 * @param {BookLog} bookLog
 * @returns {BookLog & (Book | {})}
 */
const loadBook = async (bookLog) => {
  try {
    const {
      data: {
        documents: [book],
      },
    } = await axios({
      method: "get",
      url: `https://dapi.kakao.com/v3/search/book`,
      params: {
        query: `${bookLog.name}${bookLog.author ? ` ${bookLog.author}` : ""}`,
        target: bookLog.author ? "" : "title",
      },
      headers: {
        Authorization: `KakaoAK ${env.VITE_APP_KAKAO_API_KEY}`,
      },
    });

    if (!book) {
      return bookLog;
    }

    return {
      ...bookLog,
      ...book,
    };
  } catch (error) {
    console.error(error);
    return {};
  }
};

/**
 * @param {BookLog & (Book | {})} book
 * @returns
 */
const normalizeBookInfo = (book) => {
  if (!book.title) {
    return {
      ...book,
      authors: "",
      thumbnail: "https://placehold.co/120x174",
      url: `https://google.com/search?q=${book?.name}`,
    };
  }

  return {
    ...book,
    authors: book.authors.join(", "),
  };
};

export default {
  async load() {
    const bookInfos = await Promise.all(bookLogs.map(loadBook));
    const normalizedBookInfos = bookInfos.map(normalizeBookInfo);

    return {
      books: normalizedBookInfos,
    };
  },
};
