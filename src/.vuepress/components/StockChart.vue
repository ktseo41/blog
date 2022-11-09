<template>
  <div>
    <h4>{{ title || tickers.join('|') }}</h4>
    <div ref="chart"></div>
    <img width="100" height="100" v-if="loading || chartData.length === 0" :src="$withBase('/spinner-1s-200px.svg')" alt="로딩중" />
  </div>
</template>

<script>
import axios from 'axios'
import { GoogleCharts } from 'google-charts';

export default {
  name: "StockChart",
  props: {
    type: {
      type: String,
      required: false,
      default: 'rateOfChange'
    },
    tickers: {
      type: Array,
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

      const stocksPrices = await Promise.all(this.tickers.map(async ticker => await this.getStockPrices(ticker, this.startDate, this.endDate)))

      this.loading = false;

      this.chartData = this.getChartData(stocksPrices)
    })()
  },
  watch: {
    chartData: function(newChartData) {
      if (newChartData.length === 0) {
        return;
      }

      GoogleCharts.load(() => {
        const data = GoogleCharts.api.visualization.arrayToDataTable(this.chartData);
        const chart = new GoogleCharts.api.visualization.LineChart(this.$refs.chart);
        chart.draw(data, this.chartOptions);
      });
    }
  },
  methods: {
    async getStockPrices(ticker, startDate, endDate) {
      const _startDate = startDate || new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().slice(0, 10)
      const _endDate = endDate || new Date().toISOString().slice(0,10)
      const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://yahoo-finance-for-blog.herokuapp.com'
      const url = baseUrl + `/historical/${ticker}?period1=${_startDate}&period2=${_endDate}`

      return await axios.get(url)
    },
    getChartData(stocksPrices){
      const data = [
        ['Date'].concat(this.tickers)
      ]

      stocksPrices.forEach((stockPrices, idx) => {
        const { data: stockPricesData } = stockPrices
        const { close: firstClose } = stockPricesData[0]

        stockPricesData.forEach(({ close, date }) => {
          const _date = new Date(date)
          const dateString = `${_date.getMonth() + 1}/${_date.getDate()}/${_date.getFullYear()}`
          const closeRate = Number(((close - firstClose) / firstClose * 100).toFixed(2))

          if(data.find(row => row[0] === dateString)){
            data.find(row => row[0] === dateString)[idx + 1] = closeRate
          } else {
            data.push([dateString, closeRate])
          }
        })
      })

      return data
    }
  },
  data () {
    return {
      chartData: [],
      chartOptions: {
        legend:  { position: 'bottom' },
        chartArea: {
          left: 40,
          right: 0,
          top: 20
        }
      },
      loading: false,
    }
  }
}
</script>
