<template>
    <div ref="lineChart" class="w-full h-72 p-4 rounded-lg shadow-lg bg-linear-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900"></div>
</template>

<script setup lang="ts">
    import * as echarts from 'echarts';
    import { computed, onMounted, watch, ref, useTemplateRef } from 'vue';
    import { useThemeStore } from '../stores/theme';

    const theme = useThemeStore();
    const lineChart = useTemplateRef('lineChart');
    const chart = ref<echarts.ECharts | null>(null);
    const isDark = computed(() => theme.isDark);
    const textColor = computed(() => isDark.value ? '#fff' : '#000');

    const getChartOption = () => ({
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: isDark.value ? '#1f2937' : '#60a5fa'
          }
        },
        backgroundColor: isDark.value ? 'rgba(17, 24, 39, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        borderRadius: 8,
        textStyle: {
          color: textColor.value
        }
      },
      legend: {
        data: ['Yearly Customers Served'],
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          color: textColor.value
        },
        padding: [20, 0]
      },
      toolbox: {
        feature: {
          saveAsImage: {
            iconStyle: {
              borderColor: textColor.value
            }
          }
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        axisLabel: {
          color: textColor.value,
          fontSize: 12
        },
        axisTick: {
          alignWithLabel: true
        },
        axisLine: {
          lineStyle: {
            color: isDark.value ? '#374151' : '#e5e7eb'
          }
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: textColor.value,
          fontSize: 12
        },
        splitLine: {
          lineStyle: {
            color: isDark.value ? '#374151' : '#e5e7eb',
            type: 'dashed'
          }
        }
      },
      series: [{
        name: 'Yearly Customers Served',
        type: 'line',
        stack: 'Total',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        label: {
          show: true,
          position: 'top',
          color: textColor.value,
          fontSize: 12,
          // formatter: '${c}'
        },
        itemStyle: {
          color: isDark.value ? '#60a5fa' : '#3b82f6'
        },
        // areaStyle: {
        //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        //     offset: 0,
        //     color: isDark.value ? 'rgba(96, 165, 250, 0.4)' : 'rgba(59, 130, 246, 0.4)'
        //   }, {
        //     offset: 1,
        //     color: isDark.value ? 'rgba(96, 165, 250, 0.1)' : 'rgba(59, 130, 246, 0.1)'
        //   }])
        // },
        emphasis: {
          focus: 'series',
          scale: 1.1
        },
        data: [820, 932, 901, 934, 1290, 1330, 1320, 720, 1400, 1233, 1001, 1459],
      }]
    });

    onMounted(() => {
      chart.value = echarts.init(lineChart.value);
      chart.value.setOption(getChartOption());
    });

    watch(isDark, () => {
      if (chart.value) {
        chart.value.setOption(getChartOption());
      }
    });
</script>