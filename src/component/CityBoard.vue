<template>
  <section class="weather-hero" role="region" :aria-label="`${city}, ${country} weather`">
    <div class="content">
      <div class="location">
        <div class="city">{{ city }}</div>
        <div class="country">{{ country }}</div>
        <div class="date">{{ formattedDate }}</div>
      </div>
      <div class="spacer"></div>
      <div class="weather">
        <img v-if="icon" :src="icon" alt="weather icon" class="weather-icon" />
        <div class="temp">
          {{ temp }}<span class="unit">{{ unit }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  city: string
  country: string
  date: string | Date
  icon?: string
  temp: number | string
  unit?: string
}

const props = withDefaults(defineProps<Props>(), {
  icon: undefined,
  unit: '°',
})

const formattedDate = computed(() => {
  const d = typeof props.date === 'string' ? new Date(props.date) : props.date
  if (!d || isNaN(d.getTime())) return ''
  return d.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })
})
</script>

<style scoped lang="scss">
.weather-hero {
  width: 100%;
  max-width: 800px;
  border-radius: 20px;
  background-image: url('../assets/images/bg-today-large.svg');
  background-size: cover;
  background-position: center;
  padding: 22px 28px;
  color: $neutral-0;
  box-shadow: 0 8px 30px rgba(7, 7, 17, 0.6);
}

.content {
  display: flex;
  align-items: center;
  gap: 24px;
}

.location {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.city {
  font-family: $font-display;
  font-size: 28px;
  font-weight: $fw-bold;
}

.country {
  font-size: 14px;
  color: rgba($white, 0.85);
}

.date {
  font-size: 13px;
  color: rgba($white, 0.8);
}

.spacer {
  flex: 1;
}

.weather {
  display: flex;
  align-items: center;
  gap: 20px;
}

.weather-icon {
  width: 64px;
  height: 64px;
  object-fit: contain;
}

.temp {
  font-size: 64px;
  font-family: $font-display;
  font-weight: $fw-bold;
  line-height: 1;
}

.unit {
  font-size: 28px;
  margin-left: 6px;
  color: rgba($white, 0.9);
}

@media (max-width: 480px) {
  .weather-hero {
    padding: 16px;
    border-radius: 12px;
  }

  .city {
    font-size: 20px;
  }

  .temp {
    font-size: 44px;
  }

  .weather-icon {
    width: 48px;
    height: 48px;
  }
}
</style>
