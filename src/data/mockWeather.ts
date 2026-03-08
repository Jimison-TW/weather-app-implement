import sunny from '@/assets/images/icon-sunny.webp'
import rain from '@/assets/images/icon-rain.webp'
import cloud from '@/assets/images/icon-overcast.webp'
import storm from '@/assets/images/icon-storm.webp'
import snow from '@/assets/images/icon-snow.webp'
import fog from '@/assets/images/icon-fog.webp'
import overcast from '@/assets/images/icon-overcast.webp'
import drizzle from '@/assets/images/icon-drizzle.webp'

import { UnitType } from '@/const/type'

// Helper utilities to generate randomized mock values
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function pick<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function to12Hour(hour: number) {
  const h = hour % 24
  const period = h < 12 ? 'AM' : 'PM'
  const displayHour = h % 12 === 0 ? 12 : h % 12
  return `${displayHour} ${period}`
}

// array of icons to randomly pick
const icons = [sunny, rain, cloud, storm, snow, fog, overcast, drizzle]

// generate hourly for 24 hours based on unit type
function generateHourly(unitType: UnitType) {
  // base temp in Fahrenheit; convert to Celsius if needed
  const convert = (f: number) =>
    unitType === UnitType.IMPERIAL ? f : Math.round((f - 32) * (5 / 9))

  const hours = [] as Array<{
    time: string
    icon: string | undefined
    temp: number
  }>
  for (let i = 0; i < 24; i++) {
    const fTemp = randInt(50, 85) // fahrenheit range
    hours.push({ time: to12Hour(i), icon: pick(icons), temp: convert(fTemp) })
  }
  return hours
}

// generate daily forecast for next 7 days
function generateDaily(unitType: UnitType) {
  // base high/low in Fahrenheit
  const convert = (f: number) =>
    unitType === UnitType.IMPERIAL ? f : Math.round((f - 32) * (5 / 9))

  const days = [] as Array<{ day: string; icon: string | undefined; high: number; low: number }>
  const today = new Date()
  for (let i = 0; i < 7; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    const weekday = d.toLocaleDateString('en-US', { weekday: 'short' })
    const highF = randInt(60, 85)
    const lowF = highF - randInt(5, 12)
    days.push({ day: weekday, icon: pick(icons), high: convert(highF), low: convert(lowF) })
  }
  return days
}

export function getUnitSymbol(unitType: UnitType = UnitType.IMPERIAL) {
  return unitType === UnitType.IMPERIAL ? '°F' : '°C'
}

function generateStats(unitType: UnitType) {
  const hourly = generateHourly(unitType)
  const now = new Date()
  const idx = now.getHours() % hourly.length
  const currentHour = hourly[idx] ?? { temp: 0 }
  const currentTemp = currentHour.temp

  const humidity = randInt(30, 80)
  const feelsLike = Math.round(currentTemp + randInt(-2, 3))
  // wind: in mph for imperial, convert for metric
  const windMph = randInt(0, 20)
  const wind = unitType === UnitType.IMPERIAL ? windMph : Math.round(windMph * 1.60934)
  const windUnit = unitType === UnitType.IMPERIAL ? 'mph' : 'km/h'
  // precipitation: inches vs mm
  const precipIn = Math.round(Math.random() * 5 * 10) / 10 / 10 // 0.0 - 0.5 rounded to 1 decimal
  // ensure precipitation value is at most two decimal places to avoid long fractions
  const rawPrecip = unitType === UnitType.IMPERIAL ? precipIn : precipIn * 25.4
  const precipitation = Math.round(rawPrecip * 100) / 100
  const precipUnit = unitType === UnitType.IMPERIAL ? 'in' : 'mm'

  return {
    feelsLike,
    humidity,
    wind,
    windUnit,
    precipitation,
    precipUnit,
  }
}

// cache results so switching back to a previously‑requested city/unit
// returns the same mock dataset instead of regenerating random numbers

export interface HourItem {
  time: string
  icon?: string
  temp: number
}

export interface DailyItem {
  day: string
  icon?: string
  high: number
  low: number
}

export interface Stats {
  feelsLike: number
  humidity: number
  wind: number
  windUnit: string
  precipitation: number
  precipUnit: string
}

export interface WeatherData {
  current: {
    city: string
    country: string
    date: Date
    icon: string | undefined
    temp: number
    unit: string
  }
  hourly: HourItem[]
  daily: DailyItem[]
  stats: Stats
}

const cityInfo: Record<string, { country: string }> = {
  Berlin: { country: 'Germany' },
  Taipei: { country: 'Taiwan' },
  Tokyo: { country: 'Japan' },
  // add more cities as needed
}

const cache: Record<string, WeatherData> = {}

export function getMockWeather(
  city: string = 'Berlin',
  unitType: UnitType = UnitType.IMPERIAL,
): WeatherData {
  const key = `${city}-${unitType}`

  // in-memory cache hit
  if (cache[key]) {
    return cache[key]
  }

  const storageKey = `mockWeather:${key}`

  // try localStorage (persisted) hit — only use if same calendar date
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(storageKey) : null
    if (raw) {
      const parsed = JSON.parse(raw) as any
      const storedDate = parsed?.current?.date ? new Date(parsed.current.date) : null
      const today = new Date()
      const sameDay =
        storedDate &&
        storedDate.getFullYear() === today.getFullYear() &&
        storedDate.getMonth() === today.getMonth() &&
        storedDate.getDate() === today.getDate()

      if (sameDay) {
        // convert stored ISO date string back to Date object
        parsed.current.date = storedDate
        cache[key] = parsed as WeatherData
        return cache[key]
      }
    }
  } catch (e) {
    // ignore storage errors and fall back to generation
  }

  // generate new mock data and persist
  const hourly = generateHourly(unitType)
  const daily = generateDaily(unitType)
  const now = new Date()
  const idx = now.getHours() % hourly.length
  const currentHour = hourly[idx] ?? { temp: 0, icon: sunny }
  const current = {
    city,
    country: cityInfo[city]?.country || '',
    date: now,
    icon: currentHour.icon,
    temp: currentHour.temp,
    unit: getUnitSymbol(unitType),
  }

  const stats = generateStats(unitType)
  const result: WeatherData = { current, hourly, daily, stats }
  cache[key] = result

  try {
    if (typeof localStorage !== 'undefined') {
      const toStore = JSON.parse(JSON.stringify(result))
      // ensure date is stored as ISO string
      if (toStore.current) toStore.current.date = result.current.date.toISOString()
      localStorage.setItem(storageKey, JSON.stringify(toStore))
    }
  } catch (e) {
    // ignore storage write errors
  }

  return result
}
