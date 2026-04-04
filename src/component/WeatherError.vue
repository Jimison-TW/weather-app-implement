<template>
  <div class="error-card">
    <img class="error-icon" src="@/assets/images/icon-error.svg" alt="Error Icon" />
    <p class="error-title">Something went wrong</p>
    <p class="error-message">We couldn’t connect to the server (API error). Please try again in a few moments.</p>
    <button class="retry-btn" @click="$emit('retry')">
      <img class="retry-icon" src="@/assets/images/icon-retry.svg" alt="Retry Icon">
      Retry
    </button>
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
  gap: 14px;
  padding: 48px 32px;
  color: $neutral-0;
  text-align: center;
  width: 100%;
  max-width: 520px;
}

.error-icon {
  width: 36px;
  height: 36px;
}

.error-title {
  font-family: $font-display;
  font-size: 36px;
  font-weight: $fw-bold;
  color: $neutral-0;
}

.error-message {
  font-family: $font-body;
  font-size: 13px;
  color: $neutral-200;
  margin: -10px 0 0 0;
  max-width: 380px;
}

.retry-icon {
  width: 12px;
  height: 12px;
  margin-right: 6px;
}

.retry-btn {
  display: flex;
  align-items: center;
  border-radius: 10px;
  background: $neutral-800;
  color: $neutral-0;
  font-family: $font-body;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: $neutral-700;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
}

</style>
