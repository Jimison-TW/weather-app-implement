<template>
  <div class="weather-page">
    <AppHeader v-model:unitType="unitType" />

    <main class="container">
      <h1 class="title">How’s the sky looking today?</h1>

      <div class="search-row">
        <SearchBar @search="onSearch" />
      </div>

      <section class="layout">
        <div class="left-column">
          <CityBoard :city="city" :country="country" :date="date" :icon="icon" :temp="temp" />

          <div class="stats-row">
            <StatCard label="Feels Like" :value="stats.feelsLike" :unit="unit" />
            <StatCard label="Humidity" :value="stats.humidity" unit="%" />
            <StatCard label="Wind" :value="stats.wind" :unit="stats.windUnit" />
            <StatCard label="Precipitation" :value="stats.precipitation" :unit="stats.precipUnit" />
          </div>

          <DailyForecast>
            <!-- <template #title>
              <h3>Daily forecast</h3>
            </template> -->
            <template #default>
              <div class="daily-list">
                <DailyCard v-for="(d, i) in daily" :key="i" :day="d.day" :icon="d.icon" :high="d.high" :low="d.low" />
              </div>
            </template>
          </DailyForecast>
        </div>

        <div class="right-column">
          <HourlyForecast :items="hourly" />
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import AppHeader from '@/component/AppHeader.vue'
import SearchBar from '@/component/SearchBar.vue'
import CityBoard from '@/component/CityBoard.vue'
import StatCard from '@/component/StatCard.vue'
import DailyForecast from '@/component/DailyForecast.vue'
import DailyCard from '@/component/DailyCard.vue'
import HourlyForecast from '@/component/HourlyForecast.vue'
import { getMockWeather } from '@/data/mockWeather'
import { UnitType } from '@/const/type'

// 可參數化單位 (預設為 Imperial)
const unitType = ref<UnitType>(UnitType.IMPERIAL)
const {
  current,
  hourly: mockHourly,
  daily: mockDaily,
  stats: mockStats,
} = getMockWeather(unitType.value)

const city = ref(current.city)
const country = ref(current.country)
const date = ref(current.date)
const icon = ref(current.icon)
const temp = ref(current.temp)
const unit = ref(current.unit)

const hourly = ref(mockHourly)
const daily = ref(mockDaily)
const stats = ref(mockStats)

const onSearch = (query: string) => {
  // 目前只更新城市文字；可在未來加入 API 呼叫
  city.value = query
}

// 當 unitType 變動時，重新取得並更新 mock 資料
watch(unitType, (next) => {
  const { current, hourly: newHourly, daily: newDaily, stats: newStats } = getMockWeather(next)
  city.value = current.city
  country.value = current.country
  date.value = current.date
  icon.value = current.icon
  temp.value = current.temp
  unit.value = current.unit
  hourly.value = newHourly
  daily.value = newDaily
  stats.value = newStats
})
</script>

<style scoped lang="scss">
@use '../styles/_variables.scss' as *;

.weather-page {
  min-height: 100vh;
  background: $neutral-900;
  color: $neutral-0;
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
}

.search-row {
  display: flex;
  justify-content: center;
}

.layout {
  display: flex;
  gap: 24px;
  align-items: stretch;
}

.left-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
