<template>
  <div class="hourly-card" :class="{ active }" role="listitem" :aria-label="`Hour ${time} - ${temp}${unit}`">
    <div class="left">
      <img v-if="icon" :src="icon" :alt="`icon ${time}`" class="icon" />
      <div class="time">{{ time }}</div>
    </div>
    <div class="right">
      <span class="temp">{{ temp }}<span class="unit">{{ unit }}</span></span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  time: string
  icon?: string
  temp: number | string
  unit?: string
  active?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  icon: undefined,
  unit: '°',
  active: false,
})

const { time, icon, temp, unit, active } = props
</script>

<style scoped lang="scss">
@use '../styles/_variables.scss' as *;

.hourly-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: $neutral-700;
  border-radius: 10px;
  padding: 7px 12px;
  gap: 12px;
  color: $neutral-0;
  width: 100%;
  box-sizing: border-box;
  transition:
    background-color 0.15s ease,
    transform 0.12s ease;
  cursor: default;

  .left {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .time {
    color: $neutral-200;
    font-weight: $fw-medium;
    font-size: 14px;
    min-width: 48px;
  }

  .icon {
    width: 30px;
    height: 30px;
    object-fit: contain;
  }

  .temp {
    font-weight: $fw-semibold;
    font-size: 14px;
  }

  .unit {
    margin-left: 6px;
    font-size: 12px;
    color: $neutral-300;
  }

  &:hover {
    background: $neutral-600;
  }

  &.active {
    background: rgba($blue-500, 0.2);
    transform: translateY(-1px);
  }
}
</style>
