<template>
  <div class="card max-w-4xl w-full mx-auto bg-white rounded-lg shadow-md">
    <div class="p-6">
      <h2 class="text-xl font-semibold mb-4"></h2>
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
import * as echarts from 'echarts'

const { isDark } = useData()
const chartRef = ref<HTMLElement | null>(null)
const chart = ref<echarts.ECharts | null>(null)

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

const chartData = computed(() => {
  return Object.keys(medianIncome).map((year) => ({
    year,
    purchasingPower: +(medianIncome[year] / goldPrices[year]).toFixed(2),
    medianIncome: +(medianIncome[year] / 10000000).toFixed(2),
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
    },
    legend: {
      data: ['금 구매력', '중위 소득'],
      bottom: 0,
      textStyle: {
        color: textColor,
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '60px',
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
        name: '금 구매력 (Troy Ounce)',
        position: 'left',
        axisLabel: {
          color: textColor,
          formatter: '{value} oz',
        },
        axisLine: {
          lineStyle: {
            color: textColor,
          }
        },
      },
      {
        type: 'value',
        name: '중위 소득 (천만원)',
        position: 'right',
        axisLabel: {
          color: textColor,
          formatter: '{value}',
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
        name: '금 구매력',
        type: 'line',
        data: purchasingPower,
        yAxisIndex: 0,
        itemStyle: {
          color: '#FFD700',
        },
        lineStyle: {
          width: 2,
        },
      },
      {
        name: '중위 소득',
        type: 'line',
        data: medianIncomeValues,
        yAxisIndex: 1,
        itemStyle: {
          color: '#82ca9d',
        },
        lineStyle: {
          width: 2,
        },
      },
    ],
  }
}

const initChart = () => {
  if (!chartRef.value) return

  // Dispose existing chart properly
  if (chart.value) {
    chart.value.dispose()
    chart.value = null
  }

  // Create new chart instance
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