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
    progressValue: 20
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
    progressValue: 48 / 400 * 100
  }
]

defineExpose({
  books
})
</script>

# 📚 책

<Suspense>
  <section class="reading">
    <BookAndProgress v-for="({ name, startedAt, endAt, progressValue, inProgress }) in books" :key="name" :name="name" :startedAt="startedAt" :endAt="endAt" :progressValue="progressValue" :inProgress="inProgress" />
  </section>
</Suspense>

<style lang="scss" scoped>
.reading {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  row-gap: 30px;
}
</style>