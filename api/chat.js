export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()

  if (req.method === 'GET') {
    const geminiKey = process.env.GEMINI_API_KEY
    const groqKey   = process.env.GROQ_API_KEY
    return res.json({ 
      hasGemini: !!geminiKey, 
      hasGroq: !!groqKey,
      geminiPreview: geminiKey ? geminiKey.slice(0,8)+'...' : 'NOT SET',
      groqPreview:   groqKey   ? groqKey.slice(0,8)+'...'   : 'NOT SET',
    })
  }

  if (req.method !== 'POST') return res.status(405).end()

  const { message, room, history } = req.body || {}
  if (!message) return res.status(400).json({ error: 'No message' })

  const systemText = `You are Neural Bot, AI tutor for Neural Protocol — India's AI Engineer roadmap. 10 phases: Python → Math → NumPy/Pandas → ML → Deep Learning → LLMs → AI Agents → FastAPI → MLOps → Portfolio. 300 topics total. Answer helpfully in 3-5 sentences. Give code examples when asked. Occasionally use Hindi: "bilkul sahi!", "bahut achha!", "ekdum sahi!". Always end with "— Neural Bot 🤖". Current room: ${room||'General'}.`

  // ── Try Groq first (fastest, most reliable free tier) ────────
  const groqKey = process.env.GROQ_API_KEY
  if (groqKey) {
    try {
      const messages = []
      messages.push({ role: 'system', content: systemText })
      if (history && Array.isArray(history)) {
        history.slice(-4).forEach(m => {
          if (m.role && m.content) {
            messages.push({ role: m.role === 'user' ? 'user' : 'assistant', content: String(m.content) })
          }
        })
      }
      messages.push({ role: 'user', content: message })

      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 9000)
      let response
      try {
        response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${groqKey}` },
          signal: controller.signal,
          body: JSON.stringify({
            model: 'llama-3.1-8b-instant',
            messages,
            max_tokens: 400,
            temperature: 0.7,
          })
        })
      } finally { clearTimeout(timeout) }

      if (response.ok) {
        const data = await response.json()
        const reply = data?.choices?.[0]?.message?.content?.trim()
        if (reply) return res.status(200).json({ reply, model: 'groq/llama-3.1-8b' })
      }
    } catch(e) { /* fall through to Gemini */ }
  }

  // ── Try Gemini as fallback ────────────────────────────────────
  const geminiKey = process.env.GEMINI_API_KEY
  if (!geminiKey && !groqKey) {
    return res.status(200).json({ 
      reply: `Setup needed! Add either:\n• GROQ_API_KEY (get free at console.groq.com)\n• GEMINI_API_KEY (get free at aistudio.google.com)\n\nin Vercel → Settings → Environment Variables → Redeploy.\n\n— Neural Bot 🤖`
    })
  }

  if (geminiKey) {
    const MODELS = ['gemini-2.0-flash', 'gemini-2.0-flash-lite', 'gemini-1.5-flash']
    const contents = []
    if (history && Array.isArray(history)) {
      history.slice(-4).forEach(m => {
        if (m.role && m.content) {
          contents.push({ role: m.role==='user'?'user':'model', parts:[{text:String(m.content)}] })
        }
      })
    }
    contents.push({ role:'user', parts:[{text:message}] })

    for (const model of MODELS) {
      try {
        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), 9000)
        let response
        try {
          response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              signal: controller.signal,
              body: JSON.stringify({
                contents,
                systemInstruction: { parts:[{text:systemText}] },
                generationConfig: { maxOutputTokens:400, temperature:0.7 }
              })
            }
          )
        } finally { clearTimeout(timeout) }

        if (response.status === 429) { await new Promise(r=>setTimeout(r,500)); continue }
        if (!response.ok) continue

        const data = await response.json()
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
        if (reply) return res.status(200).json({ reply, model })
      } catch(e) { continue }
    }
  }

  return res.status(200).json({ 
    reply: `Neural Bot is rate limited right now. Please try again in 1 minute! 🙏\n\n— Neural Bot 🤖`
  })
}
