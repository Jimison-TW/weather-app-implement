<template>
  <section class="daily-forecast" role="list" aria-label="Daily forecast">
    <slot name="title">
      <h3 class="title">Daily forecast</h3>
    </slot>

    <div class="list" role="list">
      <TheDailyCard v-for="(item, idx) in items" :key="idx" :day="item.day" :icon="item.icon" :high="item.high"
        :low="item.low" />
    </div>
  </section>
</template>

<script setup lang="ts">
import TheDailyCard from './DailyCard.vue'

interface DayItem {
  day: string
  icon?: string
  high: number | string
  low: number | string
}

const props = withDefaults(defineProps<{ items?: DayItem[] }>(), {
  items: () => [],
})
</script>

<style scoped lang="scss">
.daily-forecast {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.title {
  color: $neutral-0;
  font-weight: $fw-semibold;
  margin: 0 0 8px 0;
}

.list {
  display: flex;
  gap: 12px;
}

@media (max-width: 480px) {
  .list {
    overflow-x: auto;
    padding-bottom: 8px;
  }
}
</style>
