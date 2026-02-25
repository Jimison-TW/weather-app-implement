<template>
  <section class="daily-forecast" role="list" aria-label="Daily forecast">
    <slot name="title">
      <div class="title">Daily forecast</div>
    </slot>

    <div class="list" role="list">
      <slot>
        <DailyCard v-for="(item, idx) in items" :key="idx" :day="item.day" :icon="item.icon" :high="item.high"
          :low="item.low" />
      </slot>
    </div>
  </section>
</template>

<script setup lang="ts">
import DailyCard from './DailyCard.vue'

interface DayItem {
  day: string
  icon?: string
  high: number | string
  low: number | string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = withDefaults(defineProps<{ items?: DayItem[] }>(), {
  items: () => [],
})
</script>

<style scoped lang="scss">
.daily-forecast {
  display: flex;
  flex-direction: column;
}

.title {
  color: $neutral-0;
  font-weight: $fw-medium;
  margin-bottom: 10px;
}

.list {
  display: flex;
  gap: 12px;
}
</style>
