// simple serverless function that returns the OpenWeather API key
// this code is intended to run on the server where the real key is stored
// the front‑end can call `/api/getApiKey` (or whatever path your hosting
// provider uses for functions) and will never have to embed the key in the
// bundle.

// types are left as `any` to avoid forcing an extra dependency – the
// signature will vary depending on your hosting platform (Vercel / Netlify /
// AWS Lambda, etc.).

export default function handler(req: any, res: any) {
  const key = process.env.OPENWEATHER_API_KEY
  if (!key) {
    res.status(500).json({ error: 'OPENWEATHER_API_KEY not defined on server' })
    return
  }

  res.status(200).json({ key })
}
