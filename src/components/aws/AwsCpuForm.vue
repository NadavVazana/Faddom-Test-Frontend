<template>
  <section class="aws-cpu-form">
    <Select
      label="Time period:"
      @select="onInput(InputType.TIME_PERIOD, $event)"
      :options="selectOptions"
    />
    <Input @input="onInput(InputType.PERIOD, $event)" label="Period:" />
    <Input @input="onInput(InputType.IP_ADDRESS, $event)" label="IP Address:" />

    <button @click="emit('load', formData as FormData)">Load</button>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import Select from "../common/Select.vue";
import Input from "../common/Input.vue";

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

const onInput = (type: InputType, ev: string) => {
  if (type === InputType.PERIOD) {
    formData.value.period = +ev;
  } else {
    formData.value[type] = ev;
  }
};

onMounted(() => {
  window.addEventListener("keydown", (ev) => {
    if (ev.key === "Enter") {
      emit("load", formData.value);
    }
  });
});
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

select {
  width: 100px;
}
button {
  width: 100px;
}
</style>
