<template>
  <div class="error-card">
    <div class="error-icon">⚠️</div>
    <p class="error-title">{{ title }}</p>
    <p class="error-message">{{ message }}</p>
    <button class="retry-btn" @click="$emit('retry')">重試</button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  message: string
}>()

defineEmits<{
  retry: []
}>()
</script>

<style scoped lang="scss">
@use '../styles/_variables.scss' as *;

.error-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 40px 24px;
  border-radius: 12px;
  background: $neutral-800;
  color: $neutral-0;
  text-align: center;
  width: 100%;
}

.error-icon {
  font-size: 40px;
}

.error-title {
  font-family: $font-display;
  font-size: 20px;
  font-weight: $fw-semibold;
  color: $neutral-0;
  margin: 0;
}

.error-message {
  font-family: $font-body;
  font-size: 14px;
  color: $neutral-300;
  margin: 0;
  max-width: 360px;
}

.retry-btn {
  margin-top: 8px;
  padding: 10px 28px;
  border: none;
  border-radius: 8px;
  background: $blue-500;
  color: $neutral-0;
  font-family: $font-body;
  font-size: 14px;
  font-weight: $fw-medium;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: $blue-700;
  }
}
</style>
