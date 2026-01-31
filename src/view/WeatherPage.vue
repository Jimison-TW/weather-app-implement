<template>
  <div class="weather-page">
    <AppHeader />

    <main class="container">
      <h1 class="title">How’s the sky looking today?</h1>

      <div class="search-row">
        <SearchBar @search="onSearch" />
      </div>

      <section class="layout">
        <div class="left-column">
          <CityBoard :city="city" :country="country" :date="date" :icon="icon" :temp="temp" unit="°F" />

          <div class="stats-row">
            <StatCard label="Feels Like" :value="64" unit="°" />
            <StatCard label="Humidity" :value="46" unit="%" />
            <StatCard label="Wind" :value="9" unit="mph" />
            <StatCard label="Precipitation" :value="0" unit="in" />
          </div>

          <DailyForecast>
            <template #title>
              <h3 class="forecast-title">Daily forecast</h3>
            </template>
            <template #default>
              <div class="daily-list">
                <DailyCard v-for="(d, i) in daily" :key="i" :day="d.day" :icon="d.icon" :high="d.high" :low="d.low" />
              </div>
            </template>
          </DailyForecast>
        </div>

        <div class="right-column">
          <HourlyForecast :items="hourly" :days="['Tuesday']" />
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '@/component/AppHeader.vue'
import SearchBar from '@/component/SearchBar.vue'
import CityBoard from '@/component/CityBoard.vue'
import StatCard from '@/component/StatCard.vue'
import DailyForecast from '@/component/DailyForecast.vue'
import DailyCard from '@/component/DailyCard.vue'
import HourlyForecast from '@/component/HourlyForecast.vue'
import sunny from '@/assets/images/icon-sunny.webp'
import rain from '@/assets/images/icon-rain.webp'
import cloud from '@/assets/images/icon-overcast.webp'
import storm from '@/assets/images/icon-storm.webp'
import snow from '@/assets/images/icon-snow.webp'
import fog from '@/assets/images/icon-fog.webp'
import overcast from '@/assets/images/icon-overcast.webp'
import drizzle from '@/assets/images/icon-drizzle.webp'

const city = ref('Berlin')
const country = ref('Germany')
const date = ref(new Date())
const icon = ref('@/assets/images/icon-sunny.svg')
const temp = ref(68)

const hourly = ref([
  { time: '3 PM', icon: cloud, temp: 68, unit: '°' },
  { time: '4 PM', icon: overcast, temp: 68, unit: '°' },
  { time: '5 PM', icon: sunny, temp: 68, unit: '°', active: true },
  { time: '6 PM', icon: cloud, temp: 66, unit: '°' },
  { time: '7 PM', icon: snow, temp: 66, unit: '°' },
  { time: '8 PM', icon: fog, temp: 64, unit: '°' },
  { time: '9 PM', icon: snow, temp: 63, unit: '°' },
  { time: '10 PM', icon: cloud, temp: 63, unit: '°' },
])

const daily = ref([
  { day: 'Tue', icon: rain, high: 68, low: 57 },
  { day: 'Wed', icon: drizzle, high: 70, low: 59 },
  { day: 'Thu', icon: sunny, high: 75, low: 57 },
  { day: 'Fri', icon: overcast, high: 77, low: 55 },
  { day: 'Sat', icon: storm, high: 70, low: 59 },
  { day: 'Sun', icon: snow, high: 77, low: 61 },
  { day: 'Mon', icon: fog, high: 75, low: 59 },
])

const onSearch = (query: string) => {
  // 目前只更新城市文字；可在未來加入 API 呼叫
  city.value = query
}
</script>

<style scoped lang="scss">
@use '../styles/_variables.scss' as *;

.weather-page {
  min-height: 100vh;
  background: $neutral-900;
  color: $neutral-0;
  padding: 24px;
}

.container {
  max-width: 950px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.title {
  font-family: $font-display;
  font-size: 36px;
  text-align: center;
  margin: 12px 0;
}

.search-row {
  display: flex;
  justify-content: center;
}

.layout {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.left-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.right-column {
  width: 320px;
}

.stats-row {
  width: 100%;
  display: flex;
  gap: 12px;
  flex-wrap: nowrap;
  justify-content: space-between;
}

.forecast-title {
  font-family: $font-display;
  font-size: 16px;
  text-align: left;
  margin: 12px 0;
}

.daily-list {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

@media (max-width: 880px) {
  .layout {
    flex-direction: column;
  }

  .right-column {
    width: 100%;
  }

  .title {
    font-size: 28px;
  }
}
</style>
