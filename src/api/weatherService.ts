import type { UnitType } from '@/const/type'
import type { WeatherData2, WeatherData3, GeoResponse } from '@/const/interface'
import axios from 'axios'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'
const BASE_URL2 = 'https://api.openweathermap.org/data/3.0'

export const fetchWeatherByCity = async (city: string, units: UnitType): Promise<WeatherData2> => {
  const url = `${BASE_URL}/weather`
  const response = await axios.get<WeatherData2>(url, {
    params: {
      q: city,
      appid: API_KEY,
      units,
      lang: 'en_US',
    },
  })

  if (!response.data) {
    throw new Error('無法取得天氣資訊')
  }
  return response.data
}

export const fetchWeatherByCoords = async (
  lat: number,
  lon: number,
  units: UnitType,
): Promise<WeatherData3> => {
  const url = `${BASE_URL2}/onecall`
  const response = await axios.get<WeatherData3>(url, {
    params: {
      lat,
      lon,
      appid: API_KEY,
      units,
      exclude: 'minutely',
      lang: 'en_US',
    },
  })

  if (!response.data) {
    throw new Error('無法取得天氣資訊')
  }
  return response.data
}

export const fetchLocationByCity = async (
  city: string,
): Promise<{ lat: number; lon: number; country: string }> => {
  // 透過 Geocoding API 轉換地名為座標
  console.log(`正在查詢 ${city} 的座標...`)
  const geoUrl = `http://api.openweathermap.org/geo/1.0/direct`
  const geoRes = await axios.get<GeoResponse[]>(geoUrl, {
    params: {
      q: city,
      limit: 1,
      appid: API_KEY,
    },
  })

  const first = geoRes.data[0]
  if (!first) {
    throw new Error('找不到該城市，請檢查名稱是否正確。')
  }

  const { name, lat, lon, country } = first
  console.log(`成功找到 ${name}: 緯度 ${lat}, 經度 ${lon}`, `國家 ${country}`)
  return { lat, lon, country }
}
