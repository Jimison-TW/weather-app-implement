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
  const precipitation = unitType === UnitType.IMPERIAL ? precipIn : Math.round(precipIn * 25.4)
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

export function getMockWeather(unitType: UnitType = UnitType.IMPERIAL) {
  const hourly = generateHourly(unitType)
  const daily = generateDaily(unitType)
  const now = new Date()
  const idx = now.getHours() % hourly.length
  const currentHour = hourly[idx] ?? { temp: 0, icon: sunny }
  const current = {
    city: 'Berlin',
    country: 'Germany',
    date: now,
    icon: currentHour.icon,
    temp: currentHour.temp,
    unit: getUnitSymbol(unitType),
  }

  const stats = generateStats(unitType)

  return { current, hourly, daily, stats }
}
