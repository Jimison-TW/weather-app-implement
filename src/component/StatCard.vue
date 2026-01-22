<template>
  <div class="stat-card" role="group" :aria-label="label">
    <div class="label">{{ label }}</div>
    <div class="value">
      {{ value }}<span v-if="unit" class="unit">{{ unit }}</span>
    </div>
    <div v-if="meta" class="meta">{{ meta }}</div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label: string
  value: string | number
  unit?: string
  meta?: string
}

const props = withDefaults(defineProps<Props>(), {
  unit: undefined,
  meta: undefined,
})
</script>

<style scoped lang="scss">
.stat-card {
  width: 140px;
  min-height: 96px;
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
  color: $neutral-300;
  font-size: 13px;
  font-weight: $fw-medium;
}

.value {
  color: $neutral-0;
  font-size: 28px;
  font-weight: $fw-semibold;
  line-height: 1;
  display: flex;
  align-items: baseline;

  .unit {
    font-size: 14px;
    color: $neutral-300;
    margin-left: 6px;
    font-weight: $fw-medium;
  }
}

.meta {
  color: $neutral-300;
  font-size: 12px;
}
</style>
