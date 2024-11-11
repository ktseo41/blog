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
  2012: 65740,
  2013: 68220,
  2014: 67360,
  2015: 71000,
  2016: 73520,
  2017: 74810,
  2018: 75790,
  2019: 81210,
  2020: 79560,
  2021: 79260,
  2022: 77540,
  2023: 80610,
}

const goldPrices = {
  2012: 1669.0,
  2013: 1411.2,
  2014: 1266.4,
  2015: 1160.1,
  2016: 1250.8,
  2017: 1257.2,
  2018: 1268.5,
  2019: 1392.6,
  2020: 1769.6,
  2021: 1798.6,
  2022: 1800.1,
  2023: 1940.5,
}

const chartData = computed(() => {
  return Object.keys(medianIncome).map((year) => ({
    year,
    purchasingPower: +(medianIncome[year] / goldPrices[year]).toFixed(2),
    medianIncome: +(medianIncome[year]).toFixed(2),
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
          formatter: '{value} 달러',
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