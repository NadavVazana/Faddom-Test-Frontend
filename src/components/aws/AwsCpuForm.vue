<template>
  <section class="aws-cpu-form">
    <div class="input">
      <p>Time period:</p>
      <Select
        @select="onInput(InputType.TIME_PERIOD, $event)"
        :options="selectOptions"
      />
    </div>

    <div class="input">
      <p>Period:</p>
      <input @input="onInput(InputType.PERIOD, $event)" type="text" />
    </div>

    <div class="input">
      <p>IP Address:</p>
      <input @input="onInput(InputType.IP_ADDRESS, $event)" type="text" />
      <button @click="emit('load', formData as FormData)">Load</button>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Select from "../common/Select.vue";

const selectOptions = [
  { label: "Last Day", value: "lastDay" },
  { label: "Last Week", value: "lastWeek" },
  { label: "Last Month", value: "lastMonth" },
];

const formData = ref({ timePeriod: "lastDay", period: 0, ipAddress: "" });

interface FormData {
  timePeriod: string;
  period: number;
  ipAddress: string;
}

enum InputType {
  TIME_PERIOD = "timePeriod",
  PERIOD = "period",
  IP_ADDRESS = "ipAddress",
}

const onInput = (type: InputType, ev: any) => {
  let inputValue: string | number;
  switch (type) {
    case InputType.TIME_PERIOD:
      formData.value.timePeriod = ev;
      break;
    case InputType.IP_ADDRESS:
      formData.value.ipAddress = ev.target.value;
      break;
    default:
      formData.value.period = Number(ev.target.value);
  }
};

const emit = defineEmits<{
  (e: "load", formData: FormData): void;
}>();
</script>

<style lang="scss" scoped>
.aws-cpu-form {
  display: flex;
  gap: 10px;
  flex-direction: column;
}

.input {
  height: 20px;
  align-items: center;
  gap: 10px;
  display: flex;
}

select {
  width: 100px;
}
</style>
