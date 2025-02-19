<template>
    <div ref="barChart" class="w-full h-72 p-4 rounded-lg shadow-lg bg-linear-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900"></div>
</template>

<script setup lang="ts">
    import * as echarts from 'echarts';
    import { computed, onMounted, watch, ref, useTemplateRef } from 'vue';
    import { useThemeStore } from '../stores/theme';

    type EChartsOption = echarts.EChartsOption;
    const theme = useThemeStore();
    const barChart = useTemplateRef('barChart');
    const chart = ref<echarts.ECharts | null>(null);
    const isDark = computed(() => theme.isDark);
    const textColor = computed(() => isDark.value ? '#fff' : '#000');

    const getChartOption = (): EChartsOption => ({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow-sm',
                label: {
                    backgroundColor: isDark.value ? '#1f2937' : '#6366f1'
                }
            },
            backgroundColor: isDark.value ? 'rgba(31, 41, 55, 0.9)' : 'rgba(255, 255, 255, 0.9)',
            borderRadius: 8,
            textStyle: {
                color: textColor.value
            }
        },
        legend: {
            data: ['Weekly Customers Served'],
            textStyle: {
                fontSize: 20,
                fontWeight: 'bold',
                color: textColor.value
            },
            icon: 'roundRect',
            itemGap: 20
        },
        toolbox: {
            feature: {
                saveAsImage: {
                    title: 'Save as Image',
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
            top: '15%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisLabel: {
                color: textColor.value,
                fontSize: 12
            },
            axisTick: {
                alignWithLabel: true
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
                    color: isDark.value ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                }
            }
        },
        series: [{
            name: 'Weekly Customers Served',
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
                color: isDark.value ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
            },
            itemStyle: {
                color: isDark.value ? '#6366f1' : '#4f46e5',
                borderRadius: [6, 6, 0, 0]
            },
            emphasis: {
                itemStyle: {
                    color: isDark.value ? '#818cf8' : '#4338ca'
                }
            },
            barWidth: '60%',
            animation: true
        }]
    });

    onMounted(() => {
        chart.value = echarts.init(barChart.value);
        chart.value.setOption(getChartOption());
    });

    watch(isDark, () => {
        if (chart.value) {
            chart.value.setOption(getChartOption());
        }
    });
</script>