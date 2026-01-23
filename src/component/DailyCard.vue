<template>
  <div class="daily-card" role="group" :aria-label="`Forecast for ${day}`">
    <div class="day">{{ day }}</div>
    <img v-if="icon" :src="icon" :alt="`${day} weather`" class="icon" />
    <div class="temps">
      <span class="high">{{ high }}°</span>
      <span class="low">{{ low }}°</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  day: string
  icon?: string
  high: number | string
  low: number | string
}

const props = withDefaults(defineProps<Props>(), {
  icon: undefined,
})
</script>

<style scoped lang="scss">
.daily-card {
  width: 72px;
  min-height: 112px;
  background: $neutral-700;
  border-radius: 10px;
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  box-shadow: 0 6px 16px rgba(7, 7, 17, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.02);
}

.day {
  color: $neutral-200;
  font-size: 12px;
  font-weight: $fw-medium;
}

.icon {
  width: 36px;
  height: 36px;
  object-fit: contain;
}

.temps {
  display: flex;
  gap: 8px;
  align-items: baseline;
}

.high {
  color: $neutral-0;
  font-weight: $fw-semibold;
  font-size: 14px;
}

.low {
  color: $neutral-300;
  font-size: 12px;
}
</style>
