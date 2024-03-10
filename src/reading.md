<script setup>
const books = [
  {
    name: '모래알만 한 진실이라도',
    startedAt: new Date('2020-05'),
    endAt: new Date('2022-06'),
    progressValue: 100
  },
  {
    name: '한 권으로 읽는 컴퓨터 구조와 프로그래밍',
    startedAt: new Date('2020-10'),
    progressValue: 18,
    inProgress: false
  },
  {
    name: '일 잘하는 사람은 단순하게 합니다',
    startedAt: new Date('2020-09'),
    progressValue: 29,
    inProgress: false
  },
  {
    name: '불안의 책',
    startedAt: new Date('2020-11'),
    progressValue: 13
  },
  {
    name: '리얼리티 버블',
    startedAt: new Date('2021-01'),
    progressValue: 8,
    inProgress: false
  },
  {
    name: '쌤 코끼리 그려주세요',
    startedAt: new Date('2020-12'),
    progressValue: 100
  },
  {
    name: '편집자는 편집을 하지 않는다 7',
    startedAt: new Date('2020-12'),
    progressValue: 100
  },
  {
    name: '자기 앞의 생',
    startedAt: new Date('2021-01'),
    progressValue: 100,
  },
  {
    name: '함께자라기',
    startedAt: new Date('2020-07'),
    progressValue: 100,
  },
  {
    name: '눈물을 마시는 새',
    startedAt: new Date('2021-12'),
    endAt: new Date('2021-01'),
    progressValue: 388/400 * 100,
  },
  {
    name: '실격당한 자들을 위한 변론',
    startedAt: new Date('2022-01'),
    progressValue: 100,
  },
  {
    name: '산책과 연애',
    startedAt: new Date('2022-01'),
    progressValue: 100,
  },
  {
    name: '신호와 소음',
    startedAt: new Date('2022-02'),
    progressValue: 180/731 * 100,
    inProgress: false
  },
  {
    name: '멀고도 가까운',
    startedAt: new Date('2022-03'),
    endAt: new Date('2022-04'),
    progressValue: 129/370 * 100,
    inProgress: false
  },
  {
    name: '세상을 바꾸는 행동경제학',
    startedAt: new Date('2022-03'),
    progressValue: 11/100 * 100,
    inProgress: false
  },
  {
    name: '쥐',
    startedAt: new Date('2022-03'),
    progressValue: 100,
  },
  {
    name: '아무튼, 메모',
    startedAt: new Date('2022-03'),
    progressValue: 100,
  },
  {
    name: '거의 모든 것의 역사',
    startedAt: new Date('2022-04'),
    progressValue: 58/537 * 100,
    inProgress: false
  },
  {
    name: '책 읽는 삶',
    startedAt: new Date('2022-04'),
    progressValue: 78,
    inProgress: false
  },
  {
    name: '작별인사',
    startedAt: new Date('2022-05'),
    progressValue: 100,
  },
  {
    name: '게으름에 대한 찬양',
    startedAt: new Date('2022-05'),
    progressValue: 12,
    inProgress: false
  },
  {
    name: '쓰고 싶다 쓰고 싶지 않다',
    startedAt: new Date('2022-05'),
    progressValue: 100,
  },
  {
    name: '오직 두사람',
    startedAt: new Date('2022-06'),
    progressValue: 100,
  },
  {
    name: '읽지 않은 책에 대해 말하는 법',
    startedAt: new Date('2022-06'),
    progressValue: 196 / 237 * 100,
    inProgress: false
  },
  {
    name: '깨끗한 존경',
    startedAt: new Date('2022-06'),
    progressValue: (153 / 243) * 100,
  },
  {
    name: 'H마트에서 울다',
    startedAt: new Date('2022-07'),
    progressValue: 100,
  },
  {
    name: '시드 마이어',
    startedAt: new Date('2022-08'),
    progressValue: 13,
    inProgress: false
  },
  {
    name: '가벼운 책임',
    startedAt: new Date('2022-09'),
    progressValue: 152 / 198 * 100,
    inProgress: false
  },
  {
    name: '누구나 자료구조와 알고리즘',
    startedAt: new Date('2022-09'),
    progressValue: 66
  },
  {
    name: '가벼운 마음',
    startedAt: new Date('2022-10'),
    endAt: new Date('2022-10'),
    progressValue: 193 / 193 * 100
  },
  {
    name: '나의 아름다운 할머니',
    startedAt: new Date('2022-10'),
    progressValue: 86 / 220 * 100,
    inProgress: false
  },
  {
    name: '시선으로부터',
    startedAt: new Date('2022-10'),
    progressValue: 13 / 335 * 100,
    inProgress: false
  },
  {
    name: '재수사1',
    startedAt: new Date('2022-11'),
    endAt: new Date('2022-11'),
    progressValue: 100
  },
  {
    name: '재수사2',
    startedAt: new Date('2022-11'),
    endAt: new Date('2022-11'),
    progressValue: 400 / 400 * 100
  },
  {
    name: '당신 인생의 이야기',
    startedAt: new Date('2022-12'),
    progressValue: 424 / 424 * 100
  },
  {
    name: '이토록 평범한 미래',
    startedAt: new Date('2023-01'),
    progressValue: 100 / 100 * 100
  },
  {
    name: '호밀밭의 파수꾼',
    startedAt: new Date('2023-03'),
    progressValue: 100 / 100 * 100
  },
  {
    name: '스토너',
    startedAt: new Date('2023-05'),
    endAt: new Date('2023-08'),
    progressValue: 100 / 100 * 100
  },
  {
    name: '가난의 문법',
    startedAt: new Date('2023-05'),
    progressValue: 53 / 100 * 100,
    inProgress: false
  },
  {
    name: '너무나 많은 여름이',
    startedAt: new Date('2023-06'),
    endAt: new Date('2023-07'),
    progressValue: 100 / 100 * 100,
  },
  {
    name: '리팩터링',
    startedAt: new Date('2023-08'),
    endAt: new Date('2023-10'),
    progressValue: 100 / 100 * 100,
  },
  {
    name: '무의미의 축제',
    startedAt: new Date('2023-10'),
    endAt: new Date('2023-10'),
    progressValue: 100 / 100 * 100,
  },
  {
    name: '아무튼, 계속',
    startedAt: new Date('2023-10'),
    endAt: new Date('2023-10'),
    progressValue: 100 / 100 * 100,
  },
  {
    name: '모순',
    startedAt: new Date('2023-10'),
    endAt: new Date('2023-12'),
    progressValue: 100 / 100 * 100,
  },
  {
    name: '0원으로 사는 삶',
    startedAt: new Date('2023-12'),
    inProgress: false,
    progressValue: 60 / 100 * 100,
  },
  {
    name: '소크라테스 익스프레스',
    startedAt: new Date('2023-12'),
    progressValue: 90 / 100 * 100,
  },
  {
    name: '잘 그리기 금지',
    startedAt: new Date('2023-12'),
    startedAt: new Date('2024-01'),
    progressValue: 100 / 100 * 100,
  },
  {
    name: '개발자 원칙',
    startedAt: new Date('2024-01'),
    progressValue: 100 / 100 * 100,
  },
  {
    name: '소프트 스킬',
    startedAt: new Date('2024-01'),
    progressValue: 35 / 100 * 100,
  },
  {
    name: '일곱 해의 마지막',
    startedAt: new Date('2024-02'),
    progressValue: 50 / 100 * 100,
  },
  {
    name: '세상을 어떻게 이해할 것인가',
    startedAt: new Date('2024-03'),
    progressValue: 10 / 100 * 100,
  }
]

const groupByYear = books.slice()
  .reduce((acc, book) => {
    const year = book.startedAt.getFullYear()
    if (!acc[year]) {
      acc[year] = []
    }
    acc[year].push(book)
    return acc
  }, {})

const dateDescSorted = Object.entries(groupByYear)
  .sort(([year1], [year2]) => year2 - year1)
  .map(([year, books]) => [year, books.sort((a, b) => { 
    const bAt = b.endAt || b.startedAt
    const aAt = a.endAt || a.startedAt

    return bAt - aAt
  })])
</script>

# 📚 책

<Suspense>
  <section class="reading" v-for="([year, books], idx) in dateDescSorted">
    <hr v-if="idx !== 0" />
    <h1>{{ year }}년</h1>
    <BookAndProgress v-for="({ name, startedAt, endAt, progressValue, inProgress }) in books" :key="name" :name="name" :startedAt="startedAt" :endAt="endAt" :progressValue="progressValue" :inProgress="inProgress" />
  </section>
</Suspense>

<style lang="scss" scoped>
h1 {
  margin-bottom: 20px;
}

hr {
  grid-column: 1 / -1;
}

.reading {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  row-gap: 30px;
}
</style>
