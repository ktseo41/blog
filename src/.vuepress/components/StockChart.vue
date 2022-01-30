<template>
  <div>
    <h4>{{ title || ticker }}</h4>
    <g-chart
      v-if="!loading && chartData.length !== 0"
      type="LineChart"
      :data="chartData"
      :options="chartOptions"
    />
    <img width="100" height="100" v-else :src="$withBase('/spinner-1s-200px.svg')" alt="로딩중" />
  </div>
</template>

<script>
import { GChart } from 'vue-google-charts'
import axios from 'axios'

export default {
  name: "StockChart",
  components: {
    GChart
  },
  props: {
    type: {
      type: String,
      required: false,
      default: 'rateOfChange'
    },
    ticker: {
      type: String,
      required: true
    },
    startDate: {
      type: String,
      required: false
    },
    endDate: {
      type: String,
      required: false
    },
    title: {
      type: String,
      required: false
    }
  },
  created() {
    (async () => {
      this.loading = true;

      const { data: stockPrices } = await this.getStockPrices()

      this.loading = false;

      this.chartData = this.getChartData(stockPrices)
    })();
  },
  methods: {
    async getStockPrices(){
      const _startDate = this.startDate || new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().slice(0, 10)
      const _endDate = this.endDate || new Date().toISOString().slice(0,10)
      const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://yahoo-finance-for-blog.herokuapp.com'
      const url = baseUrl + `/historical/${this.ticker}?period1=${_startDate}&period2=${_endDate}`

      return await axios.get(url)
    },
    getChartData(stockPrices){
      const data = [
        ['Date', 'rate']
      ]

      const { close: firstClose } = stockPrices[0]

      stockPrices.forEach(stockPrice => {
        const date = new Date(stockPrice.date)
        const dateString = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
        const closeRate = ((stockPrice.close - firstClose) / firstClose * 100).toFixed(2)

        data.push([dateString, Number(closeRate)])
      })

      return data
    }
  },
  data () {
    return {
      chartData: [],
      chartOptions: {
        legend:  { position: 'none' },
      },
      loading: false,
    }
  }
}
</script>

<style scoped>

</style>
