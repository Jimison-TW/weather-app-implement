<template>
  <div class="stat-card-skeleton" role="group" :aria-label="label">
    <div class="label">{{ label }}</div>
    <div class="value">—</div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label: string
}

withDefaults(defineProps<Props>(), {})
</script>

<style scoped lang="scss">
@use '@/styles/_variables.scss' as *;

.stat-card-skeleton {
  width: 140px;
  min-height: 84px;
  background-color: $neutral-700;
  border-radius: 10px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  box-shadow: 0 4px 12px rgba(7, 7, 17, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.02);
}

.label {
  color: $neutral-200;
  font-size: 13px;
  font-weight: $fw-light;
}

.value {
  color: $neutral-200;
  font-size: 14px;
  font-weight: $fw-light;
  line-height: 1;
  margin-top: 12px;
}

@media (max-width: 480px) {
  .stat-card-skeleton {
    width: 100%;
    max-width: none;
    flex: 1 1 calc(50% - 8px);
    min-width: auto;
  }

  .label {
    font-size: 12px;
  }

  .value {
    font-size: 24px;
  }
}
</style>
