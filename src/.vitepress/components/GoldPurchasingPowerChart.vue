<template>
  <div class="card max-w-4xl w-full mx-auto bg-white rounded-lg shadow-md">
    <div class="p-6">
      <div class="chart-container" style="height: 400px; width: 100%">
        <!-- Chart container -->
        <div ref="chartRef" style="height: 100%; width: 100%"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, nextTick, watch } from 'vue'
import { useData } from 'vitepress'

declare const echarts: any

const { isDark } = useData()
const chartRef = ref<HTMLElement | null>(null)
const chart = ref<any | null>(null)

const medianIncome = {
  2012: 33600000,
  2013: 36000000,
  2014: 38000000,
  2015: 39220000,
  2016: 40000000,
  2017: 43000000,
  2018: 44560000,
  2019: 45650000,
  2020: 46520000,
  2021: 48940000,
  2022: 50980000,
  2023: 53610000,
}

const goldPrices = {
  2012: 1879336.7,
  2013: 1545491.0,
  2014: 1332782.8,
  2015: 1311776.5,
  2016: 1449117.6,
  2017: 1421773.8,
  2018: 1395056.8,
  2019: 1625477.6,
  2020: 2085669.1,
  2021: 2059236.1,
  2022: 2322615.3,
  2023: 2535512.4,
}

const dollarPrices = {
  2012: 1070.6,
  2013: 1055.4,
  2014: 1099.3,
  2015: 1172.5,
  2016: 1207.7,
  2017: 1070.5,
  2018: 1115.7,
  2019: 1156.4,
  2020: 1086.3,
  2021: 1188.8,
  2022: 1264.5,
  2023: 1288.0
};

const sp500PurchasingPowerData = {
  "2012": 21.64,
  "2013": 19.97,
  "2014": 18.60,
  "2015": 16.88,
  "2016": 16.41,
  "2017": 15.55,
  "2018": 14.83,
  "2019": 13.38,
  "2020": 12.35,
  "2021": 10.04,
  "2022": 9.73,
  "2023": 9.50
}

const chartData = computed(() => {
  return Object.keys(medianIncome).map((year) => ({
    year,
    purchasingPower: +(medianIncome[year] / goldPrices[year]).toFixed(2),
    medianIncome: +(medianIncome[year] / 10000000).toFixed(2),
    // dollarPurchasingPower: +(medianIncome[year] / dollarPrices[year] / 10000).toFixed(2),
    // sp500PurchasingPower: sp500PurchasingPowerData[year]
  }))
})

const getThemeColors = () => {
  return {
    textColor: isDark.value ? '#E5E7EB' : '#1F2937',
    backgroundColor: isDark.value ? '#191919' : '#FFFFFF',
    invertedTextColor: isDark.value ? '#1F2937' : '#E5E7EB'
  }
}

const getChartOption = () => {
  const { textColor, invertedTextColor, backgroundColor } = getThemeColors()
  const years = chartData.value.map((item) => item.year)
  const purchasingPower = chartData.value.map((item) => item.purchasingPower)
  const medianIncomeValues = chartData.value.map((item) => item.medianIncome)
  // const dollarPurchasingPower = chartData.value.map((item) => item.dollarPurchasingPower)
  // const sp500PurchasingPower = chartData.value.map((item) => item.sp500PurchasingPower)


  return {
    backgroundColor,
    tooltip: {
      trigger: 'item',
      axisPointer: {
        type: 'cross',
        label: {
          color: invertedTextColor
        }
      },
      formatter: (params, _, f) => {
        if (params.seriesName === '중위 소득') {
          return `${params.seriesName}<br />${params.marker}${params.name}<span style="float: right; margin-left: 20px">${params.value * 1000} 만원`
        }

        if (params.seriesName === '금 구매력') {
          return `${params.seriesName}<br />${params.marker}${params.name}<span style="float: right; margin-left: 20px">${params.value} oz`
        }

        return `${params.seriesName}<br>${params.marker}${params.name}<span style="float: right; margin-left: 20px"><b>${params.value}</b></span>`
      }
    },
    legend: {
      data: ['중위 소득', '금 구매력'],
      bottom: 0,
      textStyle: {
        color: textColor,
      },
    },
    grid: {
      left: '8%',
      right: '8%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: years,
      axisLabel: {
        color: textColor,
      },
      axisLine: {
        lineStyle: {
          color: textColor,
        }
      },
    },
    yAxis: [
      {
        type: 'value',
        name: '중위 소득',
        position: 'left',
        axisLabel: {
          color: textColor,
          formatter: '{value} 천만원',
        },
        axisLine: {
          lineStyle: {
            color: textColor,
          }
        },
      },
      {
        type: 'value',
        name: '금 구매력',
        position: 'right',
        axisLabel: {
          color: textColor,
          formatter: '{value} oz',
        },
        splitLine: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: textColor,
          }
        },
      },
    ],
    series: [
      {
        name: '중위 소득',
        type: 'line',
        data: medianIncomeValues,
        yAxisIndex: 0,
        itemStyle: {
          color: '#82ca9d',
        },
        lineStyle: {
          width: 2,
        },
      },
      {
        name: '금 구매력',
        type: 'line',
        data: purchasingPower,
        yAxisIndex: 1,
        itemStyle: {
          color: '#FFD700',
        },
        lineStyle: {
          width: 2,
        },
      },
      // {
      //   name: '달러 구매력',
      //   type: 'line',
      //   data: dollarPurchasingPower,
      //   yAxisIndex: 1,
      //   itemStyle: {
      //     color: '#5470C6',
      //   },
      //   lineStyle: {
      //     width: 2,
      //   },
      // },
      // {
      //   name: 'S&P 500 구매력',
      //   type: 'line',
      //   data: sp500PurchasingPower,
      //   yAxisIndex: 1,
      //   itemStyle: {
      //     color: '#CC3A42',
      //   },
      //   lineStyle: {
      //     width: 2,
      //   },
      // },
    ],
  }
}

const initChart = async () => {
  if (!chartRef.value) return

  // 이미 로드된 ECharts가 있는지 확인
  if (typeof window.echarts === 'undefined') {
    // ECharts 스크립트 동적 로드
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/echarts/5.5.0/echarts.min.js'
    script.async = true

    await new Promise((resolve, reject) => {
      script.onload = resolve
      script.onerror = reject
      document.head.appendChild(script)
    })
  }

  // 기존 차트 정리
  if (chart.value) {
    chart.value.dispose()
    chart.value = null
  }

  // 새 차트 인스턴스 생성
  chart.value = echarts.init(chartRef.value)
  chart.value.setOption(getChartOption())
}

// Debounced resize handler
let resizeTimeout: NodeJS.Timeout | null = null
const resizeChart = () => {
  if (resizeTimeout) {
    clearTimeout(resizeTimeout)
  }

  resizeTimeout = setTimeout(() => {
    if (chart.value) {
      try {
        chart.value.resize()
      } catch (error) {
        console.error('Resize error:', error)
        // If resize fails, try to reinitialize the chart
        initChart()
      }
    }
  }, 100)
}

// Watch for dark mode changes
watch(isDark, () => {
  nextTick(() => {
    initChart()
  })
})

onMounted(() => {
  nextTick(() => {
    initChart()
    window.addEventListener('resize', resizeChart)
  })
})

onBeforeUnmount(() => {
  // Clear resize timeout if it exists
  if (resizeTimeout) {
    clearTimeout(resizeTimeout)
  }

  // Remove event listener
  window.removeEventListener('resize', resizeChart)

  // Dispose chart
  if (chart.value) {
    try {
      chart.value.dispose()
    } catch (error) {
      console.error('Dispose error:', error)
    }
    chart.value = null
  }
})
</script>

<style scoped>
.card {
  transition: all 0.3s ease;
}

.chart-container {
  position: relative;
}
</style>