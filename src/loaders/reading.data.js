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
        date: "2024-09-22",
        progressValue: (553 / 553) * 100,
      },
    ],
  },
  {
    name: "유리알 유희 1",
    startedAt: "2024-09",
    progressValue: (189 / 420) * 100,
    inProgress: false,
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
    startedAt: "2024-09",
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
    startedAt: "2024-09",
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
    startedAt: "2024-09",
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
    progressValue: (205 / 374) * 100,
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
    ],
  },
  {
    name: "목소리들",
    startedAt: "2024-10-08",
    progressValue: (118 / 240) * 100,
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
        query: `"${bookLog.name}"`,
        target: "title",
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
