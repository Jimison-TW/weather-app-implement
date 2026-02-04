<template>
  <aside class="hourly-forecast" role="region" aria-label="Hourly forecast">
    <header class="header">
      <div class="title">Hourly forecast</div>
      <slot name="controls">
        <select class="day-select" aria-label="Select day">
          <option v-for="d in days" :key="d" :value="d">{{ d }}</option>
        </select>
      </slot>
    </header>

    <div class="list" role="list">
      <HourlyCard v-for="(h, idx) in items" :key="idx" :time="h.time" :icon="h.icon" :temp="h.temp" :unit="h.unit"
        :active="h.active" />
    </div>
  </aside>
</template>

<script setup lang="ts">
import HourlyCard from './HourlyCard.vue'

interface HourItem {
  time: string
  icon?: string
  temp: number | string
  unit?: string
  active?: boolean
}

const props = withDefaults(defineProps<{ items?: HourItem[]; days?: string[] }>(), {
  items: () => [],
  days: () => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
})
</script>

<style scoped lang="scss">
@use '../styles/_variables.scss' as *;

.hourly-forecast {
  max-width: 280px;
  background: $neutral-800;
  border-radius: 12px;
  padding: 16px;
  color: $neutral-0;
  box-shadow: 0 8px 30px rgba(7, 7, 17, 0.6);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.title {
  font-weight: $fw-semibold;
}

.day-select {
  background: $neutral-700;
  border: none;
  color: $neutral-0;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 13px;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* 顯示 8 張卡片的可滾動區塊：使用固定 max-height（約 8 張卡高度），保持卡片樣式不變 */
  --hourly-card-height: 56px;
  /* 保留變數以便未來微調 */
  max-height: 420px;
  /* 約略可顯示 8 筆，超出以捲軸瀏覽 */
  overflow-y: auto;
  padding-right: 4px;
  -webkit-overflow-scrolling: touch;
}

.list::-webkit-scrollbar {
  width: 8px;
}

.list::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.04);
  border-radius: 8px;
}

@media (max-width: 480px) {
  .hourly-forecast {
    width: 100%;
  }
}
</style>
