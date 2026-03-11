import { ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchWeatherByCity } from '@/api/weatherService'
import type { WeatherData } from '@/const/interface'
import type { UnitType } from '@/const/type'

export const useWeatherStore = defineStore('weather', () => {
  // State
  const weatherData = ref<WeatherData | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Actions
  async function fetchWeather(city: string, unitType: UnitType) {
    isLoading.value = true
    error.value = null
    weatherData.value = null
    try {
      const data = await fetchWeatherByCity(city, unitType)
      weatherData.value = data
    } catch (e: any) {
      error.value = e.message
    } finally {
      isLoading.value = false
    }
  }

  return { weatherData, isLoading, error, fetchWeather }
})
