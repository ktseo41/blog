<script setup>
import { data } from './loaders/reading.data.js'

const { books = [] } = data || {}

const groupByYear = books.slice()
  .reduce((acc, book) => {
    const year = new Date(book.startedAt).getFullYear()
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
    <BookAndProgress v-for="book in books" :key="name" v-bind="book" />
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
