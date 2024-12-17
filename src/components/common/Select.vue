<template>
  <select @change="handleChange">
    <option
      v-for="(option, index) in options"
      :key="index"
      :value="option.value"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<script lang="ts" setup>
interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  options: SelectOption[];
}

defineProps<SelectProps>();

const handleChange = (event: Event) => {
  const selectElement = event.target as HTMLSelectElement;
  const selectedValue = selectElement.value;

  emit("select", selectedValue); // Emit the selected option
};

const emit = defineEmits<{
  (e: "select", optionValue: string): void;
}>();
</script>

<style lang="scss" scoped></style>
