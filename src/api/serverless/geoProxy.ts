// proxy for the OpenWeather geocoding endpoint
// keeps the API key on the server and simply forwards the request.
// deploy this as a serverless function (e.g. Vercel, Netlify, etc.) and
// call it from the client when `VITE_USE_SERVERLESS` is true.

// request/response types are intentionally `any`; adapt to your target
// serverless environment if you like.
import axios from 'axios'

const API_KEY = process.env.OPENWEATHER_API_KEY || ''

export default async function handler(req: any, res: any) {
  const city = (req.query.city as string) || ''
  const limit = (req.query.limit as string) || '1'

  if (!city) {
    res.status(400).json({ error: 'city parameter required' })
    return
  }

  try {
    const geoUrl = 'http://api.openweathermap.org/geo/1.0/direct'
    const response = await axios.get<unknown>(geoUrl, {
      params: {
        q: city,
        limit,
        appid: API_KEY,
      },
    })
    res.status(response.status).json(response.data)
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'proxy error' })
  }
}
