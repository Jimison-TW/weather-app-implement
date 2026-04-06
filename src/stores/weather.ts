import { ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchWeatherByCity } from '@/api/weatherService'
import type { WeatherData2 } from '@/const/interface'
import type { UnitType } from '@/const/type'
import { WeatherApiError } from '@/const/errors'

export const useWeatherStore = defineStore('weather', () => {
  // State
  const weatherData = ref<WeatherData2 | null>(null)
  const isLoading = ref(false)
  const error = ref<WeatherApiError | null>(null)

  // Actions
  async function fetchWeather(city: string, unitType: UnitType) {
    isLoading.value = true
    error.value = null
    weatherData.value = null
    try {
      const data = await fetchWeatherByCity(city, unitType)
      weatherData.value = data
      return true
    } catch (e: unknown) {
      error.value =
        e instanceof WeatherApiError
          ? e
          : new WeatherApiError(null, e instanceof Error ? e.message : '發生未知錯誤')
      return false
    } finally {
      isLoading.value = false
    }
  }

  return { weatherData, isLoading, error, fetchWeather }
})
