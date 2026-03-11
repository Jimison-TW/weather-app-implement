// proxy for the One Call API

// request/response types are intentionally `any`; adapt to your target
// serverless environment if you like.
import axios from 'axios'

const API_KEY = process.env.OPENWEATHER_API_KEY || ''

export default async function handler(req: any, res: any) {
  const lat = req.query.lat as string | undefined
  const lon = req.query.lon as string | undefined
  const units = (req.query.units as string) || 'metric'

  if (!lat || !lon) {
    res.status(400).json({ error: 'lat and lon parameters required' })
    return
  }

  try {
    const url = 'https://api.openweathermap.org/data/3.0/onecall'
    const response = await axios.get<unknown>(url, {
      params: {
        lat,
        lon,
        units,
        exclude: 'minutely',
        lang: 'en_US',
        appid: API_KEY,
      },
    })

    res.status(response.status).json(response.data)
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'proxy error' })
  }
}
