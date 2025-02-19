<template>
  <div ref="gaugeChart" class="w-full" :style="{ height: chartHeight, width: chartWidth }"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, toRefs, useTemplateRef, watch } from 'vue'

const props = defineProps({
  data: {
    type: Number,
    default: 0,
  },
  chartWidth: {
    type: String,
    default: '100%', // Allow dynamic width
  },
  chartHeight: {
    type: String,
    default: '450px', // Allow dynamic height
  },
})

const { data, chartWidth, chartHeight } = toRefs(props)

type EChartsOption = echarts.EChartsOption
const gaugeChart = useTemplateRef('gaugeChart')
let option: EChartsOption

let myChart: echarts.ECharts | null = null

onMounted(() => {
  myChart = echarts.init(gaugeChart.value)

  option = {
    series: [
      {
        type: 'gauge',
        min: 0,
        max: roundUpToNextMultiple(data?.value as number, 100),
        axisLine: {
          lineStyle: {
            width: 30,
            color: [
              [0.3, '#67e0e3'],
              [0.7, '#37a2da'],
              [1, '#fd666d'],
            ],
          },
        },
        pointer: {
          itemStyle: {
            color: 'auto',
          },
        },
        axisTick: {
          distance: -45,
          splitNumber: 5,
          length: 8,
          lineStyle: {
            color: '#fff',
            width: 2,
          },
        },
        splitLine: {
          distance: -50,
          length: 14,
          lineStyle: {
            color: '#fff',
            width: 4,
          },
        },
        axisLabel: {
          color: 'inherit',
          distance: -20,
          fontSize: 20,
        },
        detail: {
          valueAnimation: true,
          formatter: '{value}MHz',
          color: 'inherit',
        },
        data: [
          {
            value: data?.value,
          },
        ],
      },
    ],
  }

  setInterval(function () {
    myChart?.setOption<echarts.EChartsOption>({
      series: [
        {
          data: [
            {
              value: data?.value,
            },
          ],
        },
      ],
    })
  }, 2000)

  option && myChart?.setOption(option)

  // Handle window resize to adjust the chart size
  window.addEventListener('resize', resizeChart)
})

const roundUpToNextMultiple = (number: number, addValue: number): number => {
  const newValue = number + addValue
  return Math.ceil(newValue / 10) * 10
}

// Resize chart when window size changes
const resizeChart = () => {
  if (myChart) {
    myChart.resize()
  }
}

// Watch for changes in data and trigger resize if necessary
watch([data, chartWidth, chartHeight], () => {
  if (myChart) {
    myChart.resize()
  }
})
</script>
