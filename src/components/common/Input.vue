<template>
  <section class="input">
    <p>{{ label }}</p>
    <input @input="onInput" type="text" />
  </section>
</template>

<script lang="ts" setup>
interface InputProps {
  label?: string;
}

defineProps<InputProps>();

const onInput = (ev: any) => {
  emit("input", ev.target.value);
};

const emit = defineEmits<{
  (e: "input", value: string): void;
}>();
</script>

<style lang="scss" scoped>
.input {
  height: 20px;
  align-items: center;
  gap: 10px;
  display: flex;
}
</style>
