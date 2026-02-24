<template>
  <div class="hourly-card" role="listitem" :aria-label="`Hour ${props.time} - ${props.temp}${props.unit}`">
    <div class="left">
      <img v-if="props.icon" :src="props.icon" :alt="`icon ${props.time}`" class="icon" />
      <div class="time">{{ props.time }}</div>
    </div>
    <div class="right">
      <span class="temp">{{ props.temp + '°' }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  time: string
  icon?: string
  temp: number | string
  unit?: string
}

// keep the props object intact so that values remain reactive
const props = withDefaults(defineProps<Props>(), {
  icon: undefined,
  unit: '°',
})

// access props in template (e.g. props.time) instead of destructuring

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
    font-weight: $fw-medium;
    font-size: 12px;
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
