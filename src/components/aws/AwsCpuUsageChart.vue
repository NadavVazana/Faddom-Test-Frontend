<template>
  <div :class="['line-chart', !cpuInfoItems.length && ' disabled']">
    <canvas ref="lineChartCanvas"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue";
import {
  Chart,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LineController,
  ChartOptions,
} from "chart.js";
import { CpuInfoItem, PeriodType } from "../../models/aws-models";
import { getDayOfWeek } from "../../services/utils-service";

interface AwsCpuUsageChartProps {
  periodType: PeriodType;
  cpuInfoItems: CpuInfoItem[];
}

const props = defineProps<AwsCpuUsageChartProps>();

const dataLabels = ref<string[]>([]);
const lineChartCanvas = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

Chart.register(
  LineElement,
  LineController,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);

const chartOptions = computed<ChartOptions>(() => {
  return {
    responsive: true,
    plugins: {
      legend: {
        onClick: () => {},
        display: true,
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        title: {
          display: true,
          text: "Percentage",
        },
      },
    },
  };
});

const getTimestampAsDate = (timestamp: string) => {
  const date = new Date(timestamp);

  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  switch (props.periodType) {
    case PeriodType.LAST_DAY:
      return `${`${hours}`.padStart(2, "0")}:${`${minutes}`.padStart(2, "0")}`;
    case PeriodType.LAST_MONTH:
      return `${`${date.getDate()}`.padStart(2, "0")}/${`${
        date.getMonth() + 1
      }`.padStart(2, "0")}`;

    default:
      return getDayOfWeek(date.getDay() + 1);
  }
};

const updateChartData = () => {
  if (chartInstance && props.cpuInfoItems.length) {
    dataLabels.value = props.cpuInfoItems.map((point) => {
      return getTimestampAsDate(point.timestamp);
    });
    const newData = props.cpuInfoItems.map((point) => point.cpuUsage);
    chartInstance.data.labels = dataLabels.value;
    chartInstance.data.datasets[0].data = newData;
    chartInstance.update();
  }
};

const initializeChart = () => {
  if (lineChartCanvas.value) {
    chartInstance = new Chart(lineChartCanvas.value, {
      type: "line",
      data: {
        labels: dataLabels.value,
        datasets: [
          {
            label: "CPU Usage",
            data: [],
            borderColor: "red",
            backgroundColor: "white",
            borderWidth: 2,
            tension: 0.4,
          },
        ],
      },
      options: chartOptions.value,
    });
  }
};

onMounted(() => {
  initializeChart();
  updateChartData();
});

watch(
  () => props.cpuInfoItems,
  () => {
    updateChartData();
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
.line-chart {
  width: 100%;
  position: relative;
}
</style>
