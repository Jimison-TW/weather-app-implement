// proxy that accepts a city name and units, performs a geocoding lookup
// and then returns the current weather data for the resulting coordinates.
// having a single endpoint simplifies the client logic when using
// serverless mode.

// request/response types are intentionally `any`; adapt to your target
// serverless environment if you like.
import axios from 'axios'

const API_KEY = process.env.OPENWEATHER_API_KEY || ''

export default async function handler(req: any, res: any) {
  const city = (req.query.city as string) || ''
  const units = (req.query.units as string) || 'metric'

  if (!city) {
    res.status(400).json({ error: 'city parameter required' })
    return
  }

  try {
    // 1. geocode
    const geoUrl = 'http://api.openweathermap.org/geo/1.0/direct'
    const geoResp = await axios.get<unknown>(geoUrl, {
      params: { q: city, limit: 1, appid: API_KEY },
    })
    const geoData = geoResp.data as any[]
    if (!geoData || geoData.length === 0) {
      res.status(404).json({ error: 'city not found' })
      return
    }
    const { lat, lon } = geoData[0]

    // 2. weather
    const weatherUrl = 'https://api.openweathermap.org/data/3.0/onecall'
    const weatherResp = await axios.get(weatherUrl, {
      params: {
        lat,
        lon,
        units,
        exclude: 'minutely',
        lang: 'en_US',
        appid: API_KEY,
      },
    })

    res.status(weatherResp.status).json(weatherResp.data)
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'proxy error' })
  }
}
