<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { GoogleCharts } from 'google-charts';

const { title, tickers, startDate, endDate } = defineProps({
  type: {
    type: String,
    required: false,
    default: 'rateOfChange'
  },
  tickers: {
    type: Array,
    required: true,
    // [{ label: '삼성전자', value: '005930' }, { label: '마이크로소프트', value: 'MSFT' }] 형태
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
  },
  roles: {
    type: Array,
    required: false,
    // [[{ type: 'string', role: 'annotation' }, { date: '2022-10-31T00:00:00Z', value: '75bp' }]]
  }
})

const chartRef = ref(null);
const isLoading = ref(true)

fetchStockPricesAndDrawChart()

async function fetchStockPricesAndDrawChart() {
  const chartData = await Promise.all(tickers.map(async ({ value }) => await getStockPrices(value, startDate, endDate)))

  GoogleCharts.load(() => drawChart(chartData, tickers))

  isLoading.value = false
}

async function getStockPrices(ticker, startDate, endDate) {
  const _startDate = startDate || new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().slice(0, 10)
  const _endDate = endDate || new Date().toISOString().slice(0, 10)
  const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://yahoo-finance-for-blog.herokuapp.com'
  const url = baseUrl + `/historical/${ticker}?period1=${_startDate}&period2=${_endDate}`

  return await axios.get(url)
}

function drawChart(chartData, tickers) {
  const data = new GoogleCharts.api.visualization.DataTable();

  data.addColumn('string', 'Date');

  tickers.forEach(({ label }) => {
    data.addColumn('number', label);
  })

  const rows = [];

  chartData.forEach(({ data: aTickerData }) => {
    const [{ close: firstClose }] = aTickerData;

    aTickerData.forEach(({ close, date }) => {
      const dateString = new Date(date).toISOString().slice(0, 10).replace(/-/g, '').slice(2)
      const closeChangeRate = Number(((close - firstClose) / firstClose * 100).toFixed(2));

      const sameDateRow = rows.find(([_dateString]) => _dateString === dateString);

      if (sameDateRow) {
        sameDateRow.push(closeChangeRate);
      } else {
        rows.push([dateString, closeChangeRate]);
      }
    });
  })

  data.addRows(rows);

  const options = {
    title: title,
    legend: { position: 'bottom' },
    chartArea: { left: 40, right: 0, top: 20 },
  };

  const chart = new GoogleCharts.api.visualization.LineChart(chartRef.value);

  chart.draw(data, options);
}

</script>
<template>
  <div>
    <h4>{{ title || tickers.map(({ label }) => label).join(' | ') }}</h4>
    <div ref="chartRef"></div>
    <img width="100" height="100" v-if="isLoading" :src="$withBase('/spinner-1s-200px.svg')" alt="로딩중" />
  </div>
</template>