<template>
  <div class="hourly-card-skeleton" aria-hidden="true"></div>
</template>

<script setup lang="ts">
// 純展示用 Skeleton，無任何 props
</script>

<style scoped lang="scss">
@use '@/styles/_variables.scss' as *;

.hourly-card-skeleton {
  width: 100%;
  height: 44px;
  background: $neutral-700;
  border-radius: 10px;
  box-sizing: border-box;
}

@media (max-width: 480px) {
  .hourly-card-skeleton {
    min-height: 64px;
  }
}
</style>
