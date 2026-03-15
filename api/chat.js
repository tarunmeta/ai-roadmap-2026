export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { message, room, history, system } = req.body
  if (!message) return res.status(400).json({ error: 'No message' })

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) return res.status(500).json({ error: 'Bot not configured' })

  const systemPrompt = system || `You are Neural Bot, AI assistant for Neural Protocol — India's AI Engineer roadmap. 10 phases, 300 topics, Python to LLMs. Be friendly, concise (2-4 sentences). Occasionally use Hindi. Pricing: Phase 1 free, Pro ₹999 lifetime/₹200 month. UPI: tarunsaini89689-1@okaxis. WhatsApp: +91 97811 91041. Sign off as "— Neural Bot 🤖".`

  try {
    // Build conversation history for context
    const parts = []
    if (history && history.length > 0) {
      history.slice(-6).forEach(m => {
        parts.push({ text: `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}` })
      })
    }
    parts.push({ text: `${systemPrompt}\n\n[Room: ${room || 'Chat'}]\nUser: ${message}\nAssistant:` })

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts }],
        generationConfig: { maxOutputTokens: 300, temperature: 0.75 }
      })
    })
    const data = await response.json()
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || null
    res.json({ reply })
  } catch(e) {
    res.status(500).json({ error: 'Bot unavailable' })
  }
}
