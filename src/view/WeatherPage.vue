<template>
  <div class="weather-page">
    <AppHeader v-model:unitType="unitType" />
    <WeatherError
        v-if="weatherError"
        :title="weatherError.status === 401 ? 'API 認證失敗' : weatherError.status === 404 ? '找不到城市' : '無法取得天氣'"
        :message="weatherError.message"
        @retry="onRetry"
      />
    <main v-else class="container">
      <h1 class="title">How’s the sky looking today?</h1>

      <div class="search-row">
        <SearchBar @search="onSearch" />
      </div>

      <section class="layout">
        <div class="left-column">
          <CityBoardSkeleton v-if="isLoading" />
          <CityBoard v-else :city="city" :country="country" :date="date" :icon="icon" :temp="temp" />

          <div class="stats-row">
            <template v-if="isLoading">
              <StatCardSkeleton label="Feels Like" />
              <StatCardSkeleton label="Humidity" />
              <StatCardSkeleton label="Wind" />
              <StatCardSkeleton label="Precipitation" />
            </template>
            <template v-else>
              <StatCard label="Feels Like" :value="stats.feelsLike" :unit="unit" />
              <StatCard label="Humidity" :value="stats.humidity" unit="%" />
              <StatCard label="Wind" :value="stats.wind" :unit="stats.windUnit" />
              <StatCard label="Precipitation" :value="stats.precipitation" :unit="stats.precipUnit" />
            </template>
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
          <HourlyForecast :items="hourly" :days="[dayWeek]" />
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import AppHeader from '@/component/AppHeader.vue'
import SearchBar from '@/component/SearchBar.vue'
import WeatherError from '@/component/WeatherError.vue'
import CityBoard from '@/component/CityBoard.vue'
import CityBoardSkeleton from '@/component/skeleton/CityBoardSkeleton.vue'
import StatCard from '@/component/StatCard.vue'
import StatCardSkeleton from '@/component/skeleton/StatCardSkeleton.vue'
import DailyForecast from '@/component/DailyForecast.vue'
import DailyCard from '@/component/DailyCard.vue'
import HourlyForecast from '@/component/HourlyForecast.vue'
import type { HourItem, DailyItem, Stats } from '@/const/interface'
import { UnitType } from '@/const/type'
import type { WeatherData3 } from '@/const/interface'
import { fetchLocationByCity, fetchWeatherByCoords } from '@/api/weatherService'

import sunny from '@/assets/images/icon-sunny.webp'
import rain from '@/assets/images/icon-rain.webp'
import cloud from '@/assets/images/icon-overcast.webp'
import fewCloud from '@/assets/images/icon-partly-cloudy.webp'
import storm from '@/assets/images/icon-storm.webp'
import snow from '@/assets/images/icon-snow.webp'
import fog from '@/assets/images/icon-fog.webp'
import overcast from '@/assets/images/icon-overcast.webp'
import drizzle from '@/assets/images/icon-drizzle.webp'

const iconMap: Record<string, string> = {
  '01d': sunny,
  '01n': sunny,
  '02d': fewCloud,
  '02n': fewCloud,
  '03d': cloud,
  '03n': cloud,
  '04d': overcast,
  '04n': overcast,
  '09d': drizzle,
  '09n': drizzle,
  '10d': rain,
  '10n': rain,
  '11d': storm,
  '11n': storm,
  '13d': snow,
  '13n': snow,
  '50d': snow,
  '50n': fog,
}

// 可參數化單位與城市 (預設為 Berlin/Imperial)
const unitType = ref<UnitType>(UnitType.IMPERIAL)
const city = ref('Taipei')
const country = ref('')
const date = ref(new Date())
const dayWeek = ref('')
const icon = ref<string | undefined>('')
const temp = ref(0)
const unit = ref('')

// start with empty values; actual contents populated by updateWeather
const hourly = ref<HourItem[]>([])
const daily = ref<DailyItem[]>([])
const stats = ref<Stats>({} as Stats)

const isLoading = ref(false)
const weatherError = ref<{ status: number | null; message: string } | null>(null)

function weatherDataParse(params: WeatherData3) {
  const { current, hourly } = params
  const cityName = city.value // use the searched city name as the canonical name
  const countryName = '' // country is not provided by current weather API, can be left blank or fetched separately if needed
  const dateValue = new Date(current.dt * 1000) // convert Unix timestamp to Date
  const dayWeekValue = dateValue.toLocaleDateString('en-US', { weekday: 'long' })
  const iconCode = iconMap[current.weather?.[0]?.icon || ''] || '' // map API icon code to local asset, fallback to empty string if not found
  const tempValue = Math.round(current.temp)
  const unitValue = unitType.value === UnitType.IMPERIAL ? '°F' : '°C'
  const statsValue: Stats = {
    feelsLike: Math.round(current.feels_like),
    humidity: current.humidity,
    wind: Math.round(current.wind_speed),
    windUnit: unitType.value === UnitType.IMPERIAL ? 'mph' : 'm/s',
    precipitation: Math.round((hourly[0]?.pop ?? 0) * 100) || 0,// convert to percentage
    precipUnit: '%',
  }
  // 只取得24小時的資料，並針對time加上AM PM標記
  const hourlyValue = params.hourly.slice(0, 24).map((h) => {
    const date = new Date(h.dt * 1000)
    let hours = date.getHours()
    const ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    hours = hours ? hours : 12 // the hour '0' should be '12'
    return {
      time: `${hours} ${ampm}`,
      icon: iconMap[h.weather?.[0]?.icon || ''] || '',
      temp: Math.round(h.temp),
    }
  })
  const dailyValue = params.daily.slice(0, 7).map((d) => ({
    day: new Date(d.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }), // get weekday name
    icon: iconMap[d.weather?.[0]?.icon || ''] || '',
    high: Math.round(d.temp.max),
    low: Math.round(d.temp.min),
  }))

  return {
    city: cityName,
    country: countryName,
    date: dateValue,
    dayWeek: dayWeekValue,
    icon: iconCode,
    temp: tempValue,
    unit: unitValue,
    stats: statsValue,
    hourly: hourlyValue,
    daily: dailyValue,
  }
}

// helper to refresh every piece of data
async function updateWeather(c: string, u: UnitType) {
  isLoading.value = true
  weatherError.value = null
  try {
    // 1. 先根據城市名稱取得經緯度
    const location = await fetchLocationByCity(c)
    // 2. 再根據經緯度取得天氣資料
    const data = await fetchWeatherByCoords(location.lat, location.lon, u)
    // 3. 解析天氣資料並更新 state
    const parsed = weatherDataParse(data)

    city.value = c
    unit.value = parsed.unit
    temp.value = parsed.temp
    country.value = location.country || ''
    hourly.value = parsed.hourly
    daily.value = parsed.daily
    stats.value = parsed.stats
    date.value = parsed.date
    dayWeek.value = parsed.dayWeek
    icon.value = parsed.icon
  } catch (err: unknown) {
    console.error('updateWeather failed', err)
    weatherError.value = err instanceof Error
      ? { status: (err as { status?: number }).status ?? null, message: err.message }
      : { status: null, message: String(err) }
  } finally {
    // isLoading.value = false
  }
}

function onRetry() {
  updateWeather(city.value, unitType.value)
}

// initial load
updateWeather(city.value, unitType.value)

const onSearch = (query: string) => {
  city.value = query
}

// 當 unitType 或 city 變動時，重新取得並更新 mock 資料
watch([unitType, city], ([u, c]) => {
  updateWeather(c, u)
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

@media (max-width: 480px) {
  .stats-row {
    /* allow wrapping and two-per-row layout */
    flex-wrap: wrap;
    justify-content: space-between;
  }
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

@media (max-width: 480px) {
  .daily-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
}

@media (max-width: 880px) {
  .layout {
    flex-direction: column;
  }

  .right-column {
    width: 100%;
    margin-bottom: 20px;
  }

  .title {
    font-size: 28px;
  }
}
</style>
