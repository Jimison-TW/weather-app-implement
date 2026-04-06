import axios from 'axios'

export class WeatherApiError extends Error {
  constructor(
    public readonly status: number | null,
    message: string,
    public readonly detail?: unknown,
  ) {
    super(message)
    this.name = 'WeatherApiError'
  }
}

export function normalizeApiError(err: unknown, context: string): WeatherApiError {
  if (axios.isAxiosError(err)) {
    const status = err.response?.status ?? null
    let message: string
    if (status === 401) {
      message = 'API Key 無效，請確認 VITE_OPENWEATHER_API_KEY 設定'
    } else if (status === 404) {
      message = `找不到資料 (${context})`
    } else if (status === 429) {
      message = '請求次數超過限制，請稍後再試'
    } else if (status != null) {
      message = `網路請求失敗，狀態碼 ${status}`
    } else {
      message = `網路請求失敗：${err.message}`
    }
    return new WeatherApiError(status, message, err.response?.data)
  }
  if (err instanceof WeatherApiError) return err
  if (err instanceof Error) return new WeatherApiError(null, err.message)
  return new WeatherApiError(null, String(err))
}
