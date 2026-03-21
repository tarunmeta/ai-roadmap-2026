export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) return res.json({ error: 'GEMINI_API_KEY not set' })

  const results = {}
  const models = [
    { api: 'v1',     name: 'gemini-1.5-flash' },
    { api: 'v1beta', name: 'gemini-2.0-flash' },
  ]

  for (const { api, name } of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/${api}/models/${name}:generateContent?key=${apiKey}`
      const r = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: 'Say OK' }] }],
          generationConfig: { maxOutputTokens: 10 }
        })
      })
      const d = await r.json()
      results[name] = r.ok ? '✅ ' + (d?.candidates?.[0]?.content?.parts?.[0]?.text || 'ok') : `❌ ${r.status}`
    } catch(e) {
      results[name] = '❌ ' + e.message
    }
  }

  return res.json({ keyPreview: apiKey.slice(0,8)+'...', results })
}
