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

export interface HourItem {
  time: string
  icon?: string
  temp: number
  unit?: string
}

// 為 API 回應的資料定義一個基本的 TypeScript interface
export interface WeatherData {
  name: string
  main: {
    temp: number
    feels_like: number
    humidity: number
  }
  weather: {
    main: string
    description: string
    icon: string
  }[]
  wind: {
    speed: number
  }
}

export interface WeatherData2 {
  // 城市名稱
  name: string
  // 主體資訊，包括溫度、體感溫度、濕度等
  main: {
    temp: number // 溫度（攝氏）
    feels_like: number // 體感溫度（攝氏）
    humidity: number // 濕度（百分比）
  }
  // 天氣狀況的陣列，可能包含多個天氣狀況
  weather: {
    main: string // 天氣主要狀況（例如：Clouds）
    description: string // 天氣描述（例如：broken clouds）
    icon: string // 天氣圖示代碼
  }[]
  // 風速資訊
  wind: {
    speed: number // 風速（公尺/秒）
  }
  // 雲量資訊
  clouds: {
    all: number // 雲量（百分比）
  }
  // 能見度資訊
  visibility: number // 能見度（公尺）
  // 時間戳記，表示資料的時間
  dt: number // 時間戳記（Unix時間）
  // 系統資訊，包括國家、日出日落時間等
  sys: {
    country: string // 國家代碼（例如：TW）
    sunrise: number // 日出時間（Unix時間）
    sunset: number // 日落時間（Unix時間）
  }
  // 時區偏移量（秒）
  timezone: number
  // 城市ID
  id: number
  // 回應狀態碼
  cod: number
}

export interface WeatherData3 {
  lat: number
  lon: number
  timezone: string
  timezone_offset: number
  current: {
    dt: number
    sunrise: number
    sunset: number
    temp: number
    feels_like: number
    pressure: number
    humidity: number
    dew_point: number
    uvi: number
    clouds: number
    visibility: number
    wind_speed: number
    wind_deg: number
    wind_gust?: number // 風速陣風，可能不存在
    weather: {
      id: number
      main: string
      description: string
      icon: string
    }[]
    rain: { '1h': number } // 1小時降水量
  }
  hourly: {
    dt: number
    temp: number
    feels_like: number
    pressure: number
    humidity: number
    dew_point: number
    uvi: number
    clouds: number
    visibility: number
    wind_speed: number
    wind_deg: number
    wind_gust?: number // 風速陣風，可能不存在
    weather: {
      id: number
      main: string
      description: string
      icon: string
    }[]
    pop: number // 降水機率
    rain?: { '1h': number } // 1小時降水量，可能不存在
  }[]
  daily: {
    dt: number
    sunrise: number
    sunset: number
    moonrise: number
    moonset: number
    moon_phase: number
    summary: string // 天氣摘要
    temp: {
      day: number
      min: number
      max: number
      night: number
      eve: number
      morn: number
    }
    feels_like: {
      day: number
      night: number
      eve: number
      morn: number
    }
    pressure: number
    humidity: number
    dew_point: number
    wind_speed: number
    wind_deg: number
    wind_gust?: number // 風速陣風，可能不存在
    weather: {
      id: number
      main: string
      description: string
      icon: string
    }[]
    clouds: number // 雲量百分比
    pop: number // 降水機率
    rain?: number // 降水量，可能不存在
    uvi: number // 紫外線指數
  }[]
}

export interface GeoResponse {
  name: string
  lat: number
  lon: number
  country: string
}
