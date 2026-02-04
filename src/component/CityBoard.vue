<template>
  <section class="weather-hero" role="region" :aria-label="`${city}, ${country} weather`">
    <!-- 物理撐開父層的背景圖（使用 <img>） -->
    <img class="bg-image" :src="bg" alt="weather background" />

    <div class="content">
      <div class="location">
        <div class="city">{{ city + ', ' + country }}</div>
        <div class="date">{{ formattedDate }}</div>
      </div>
      <div class="spacer"></div>
      <div class="weather">
        <img v-if="icon" :src="icon" alt="weather icon" class="weather-icon" />
        <div class="temp">
          {{ temp + '°' }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import bg from '@/assets/images/bg-today-large.svg'

interface Props {
  city: string
  country: string
  date: string | Date
  icon?: string
  temp: number | string
}

const props = withDefaults(defineProps<Props>(), {
  icon: undefined,
})

const formattedDate = computed(() => {
  const d = typeof props.date === 'string' ? new Date(props.date) : props.date
  if (!d || isNaN(d.getTime())) return ''
  // 固定使用英語(美式)格式顯示，例如 "Tuesday, Aug 5, 2025"
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
})
</script>

<style scoped lang="scss">
.weather-hero {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  padding: 0;
  /* 內容 padding 轉移到 .content，因為 content 為絕對定位 */
  color: $neutral-0;
  box-shadow: 0 8px 30px rgba(7, 7, 17, 0.6);
  position: relative;
  /* 預備讓 .content 絕對定位於上方 */
  overflow: visible;
}

/* 背景圖：填滿寬度，保持原始比例以物理撐開父層 */
.bg-image {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
  border-radius: 20px;
}

.content {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 22px 28px;
  /* 內容內距維持先前樣式 */
  z-index: 1;
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
  margin-right: 20px;
}

.weather-icon {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

.temp {
  position: relative;
  font-size: 64px;
  font-family: $font-display;
  font-weight: $fw-semibold-italic;
  font-style: italic;
  line-height: 1;
}

.unit {
  position: absolute;
  font-size: 64px;
  font-weight: $fw-medium;
  color: rgba($white, 0.9);
  transform: translateY(-10%);
}

@media (max-width: 480px) {
  .temp {
    font-size: 44px;
  }

  .unit {
    top: -6px;
    right: -6px;
    font-size: 16px;
  }
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
