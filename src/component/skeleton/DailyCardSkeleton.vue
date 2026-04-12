<template>
  <div class="daily-card-skeleton" aria-hidden="true"></div>
</template>

<script setup lang="ts">
// 純展示用 Skeleton，無任何 props
</script>

<style scoped lang="scss">
@use '@/styles/_variables.scss' as *;

.daily-card-skeleton {
  width: 72px;
  min-height: 112px;
  background: $neutral-700;
  border-radius: 10px;
  box-shadow: 0 6px 16px rgba(7, 7, 17, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.02);
}

@media (max-width: 480px) {
  .daily-card-skeleton {
    width: 100%;
  }
}
</style>
