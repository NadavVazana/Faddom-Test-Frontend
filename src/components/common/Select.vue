<template>
  <section class="select">
    <p>{{ label }}</p>
    <select @change="handleChange">
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </section>
</template>

<script lang="ts" setup>
interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
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

<style lang="scss" scoped>
.select {
  display: flex;
  height: 20px;
  align-items: center;
  gap: 10px;
}
</style>
