import sunny from '@/assets/images/icon-sunny.webp'
import rain from '@/assets/images/icon-rain.webp'
import cloud from '@/assets/images/icon-overcast.webp'
import storm from '@/assets/images/icon-storm.webp'
import snow from '@/assets/images/icon-snow.webp'
import fog from '@/assets/images/icon-fog.webp'
import overcast from '@/assets/images/icon-overcast.webp'
import drizzle from '@/assets/images/icon-drizzle.webp'

import { UnitType } from '@/const/type'

export const currentBase = {
  city: 'Berlin',
  country: 'Germany',
  date: new Date('2025-08-05'),
  icon: sunny,
  temp: 68,
}

export const hourlyBase = [
  { time: '12 AM', icon: cloud, temp: 50 },
  { time: '1 AM', icon: cloud, temp: 49 },
  { time: '2 AM', icon: fog, temp: 48 },
  { time: '3 AM', icon: fog, temp: 47 },
  { time: '4 AM', icon: drizzle, temp: 46 },
  { time: '5 AM', icon: drizzle, temp: 46 },
  { time: '6 AM', icon: rain, temp: 48 },
  { time: '7 AM', icon: rain, temp: 51 },
  { time: '8 AM', icon: cloud, temp: 54 },
  { time: '9 AM', icon: cloud, temp: 58 },
  { time: '10 AM', icon: sunny, temp: 62 },
  { time: '11 AM', icon: sunny, temp: 65 },
  { time: '12 PM', icon: sunny, temp: 68 },
  { time: '1 PM', icon: sunny, temp: 70 },
  { time: '2 PM', icon: sunny, temp: 71 },
  { time: '3 PM', icon: cloud, temp: 70 },
  { time: '4 PM', icon: overcast, temp: 69 },
  { time: '5 PM', icon: sunny, temp: 68, active: true },
  { time: '6 PM', icon: cloud, temp: 66 },
  { time: '7 PM', icon: storm, temp: 65 },
  { time: '8 PM', icon: rain, temp: 62 },
  { time: '9 PM', icon: fog, temp: 59 },
  { time: '10 PM', icon: snow, temp: 57 },
  { time: '11 PM', icon: cloud, temp: 55 },
]

export const daily = [
  { day: 'Tue', icon: rain, high: 68, low: 57 },
  { day: 'Wed', icon: drizzle, high: 70, low: 59 },
  { day: 'Thu', icon: sunny, high: 75, low: 57 },
  { day: 'Fri', icon: overcast, high: 77, low: 55 },
  { day: 'Sat', icon: storm, high: 70, low: 59 },
  { day: 'Sun', icon: snow, high: 77, low: 61 },
  { day: 'Mon', icon: fog, high: 75, low: 59 },
]

export function getUnitSymbol(unitType: UnitType = UnitType.IMPERIAL) {
  return unitType === UnitType.IMPERIAL ? '°F' : '°C'
}

export function getMockWeather(unitType: UnitType = UnitType.IMPERIAL) {
  const unit = getUnitSymbol(unitType)
  return {
    current: { ...currentBase, unit },
    hourly: hourlyBase.map((h) => ({ ...h, unit })),
    daily: daily,
  }
}
