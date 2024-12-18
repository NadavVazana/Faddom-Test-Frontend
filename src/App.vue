<template>
  <section :class="['app-container', isLoading && 'disabled']">
    <AwsCpuForm @load="onLoadCpuInfo" class="aws-form" />
    <AwsCpuUsageChart
      :period-type="currentPeriodType"
      :cpu-info-items="cpuUsagePoints"
    />
    <Spinner v-if="!cpuUsagePoints.length || isLoading" class="spinner" />

    <div class="error-container">
      <p class="error">{{ errorMsg }}</p>
    </div>
  </section>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getCpuUsage } from "./services/aws-service";
import AwsCpuUsageChart from "./components/aws/AwsCpuUsageChart.vue";
import AwsCpuForm from "./components/aws/AwsCpuForm.vue";
import { getTimeRange } from "./services/utils-service";
import Spinner from "./components/common/Spinner.vue";
import { PeriodType } from "./models/aws-models";

const cpuUsagePoints = ref([]);
const errorMsg = ref("");
const isLoading = ref(false);
const currentPeriodType = ref(PeriodType.LAST_DAY);

onMounted(async () => {
  await initCpuDataPoints();
});

const initCpuDataPoints = async () => {
  try {
    const today = getTimeRange("lastDay");
    cpuUsagePoints.value = await getCpuUsage(
      today.startDate,
      today.endDate,
      3600,
      "172.31.88.161"
    );
  } catch (error) {
    errorMsg.value = "Could not load the data points";
  }
};

const onLoadCpuInfo = async (formData: {
  timePeriod: string;
  period: number;
  ipAddress: string;
}) => {
  try {
    isLoading.value = true;
    errorMsg.value = "";
    const timeRange = getTimeRange(formData.timePeriod);

    currentPeriodType.value = timeRange.periodType;
    cpuUsagePoints.value = await getCpuUsage(
      timeRange.startDate,
      timeRange.endDate,
      formData.period,
      formData.ipAddress
    );
    isLoading.value = false;
  } catch (error: any) {
    isLoading.value = false;
    errorMsg.value = error.response.data;
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100dvh;
  width: 80dvw;
  margin-inline: auto;
}

.aws-form {
  align-self: flex-start;
}

.error {
  color: red;
  font-size: 20px;
  font-weight: bold;
}

.error-container {
  min-height: 100px;
}

.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
