import { useState, useRef, useEffect } from 'react'

/* ── PURE CSS 3D ORB — no Three.js, always works ─────────── */
function OrbButton({ open, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? 'Close AI Tutor' : 'Open AI Tutor'}
      style={{
        position: 'relative', width: 56, height: 56,
        borderRadius: '50%', border: 'none', cursor: 'pointer',
        background: open
          ? 'linear-gradient(135deg,#7c3aed,#a78bfa)'
          : 'linear-gradient(135deg,#0e7490,#22d3ee)',
        boxShadow: open
          ? '0 0 0 3px rgba(167,139,250,.3), 0 0 20px rgba(167,139,250,.5), 0 4px 20px rgba(0,0,0,.4)'
          : '0 0 0 3px rgba(34,211,238,.3), 0 0 20px rgba(34,211,238,.4), 0 4px 20px rgba(0,0,0,.4)',
        transition: 'all .3s cubic-bezier(.16,1,.3,1)',
        transform: open ? 'scale(1.1) rotate(180deg)' : 'scale(1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        animation: open ? 'none' : 'orbPulse 3s ease-in-out infinite',
      }}
    >
      {/* Inner glow */}
      <div style={{
        position: 'absolute', inset: 4, borderRadius: '50%',
        background: open
          ? 'radial-gradient(circle at 35% 35%, rgba(255,255,255,.3), transparent 60%)'
          : 'radial-gradient(circle at 35% 35%, rgba(255,255,255,.4), transparent 60%)',
        pointerEvents: 'none',
      }}/>
      {/* Wire ring */}
      <div style={{
        position: 'absolute', inset: -3, borderRadius: '50%',
        border: `1px solid ${open ? 'rgba(167,139,250,.5)' : 'rgba(34,211,238,.5)'}`,
        animation: 'orbSpin 4s linear infinite',
        pointerEvents: 'none',
      }}/>
      {/* Icon */}
      <span style={{
        fontSize: 22, position: 'relative', zIndex: 1,
        filter: 'drop-shadow(0 0 4px rgba(255,255,255,.6))',
        transition: 'transform .3s',
      }}>
        {open ? '✕' : '⬡'}
      </span>
      {/* Online dot */}
      {!open && (
        <div style={{
          position: 'absolute', top: 3, right: 3,
          width: 11, height: 11, borderRadius: '50%',
          background: '#34d399',
          border: '2px solid var(--bg-base)',
          boxShadow: '0 0 6px #34d399',
          animation: 'orbPulse 2s ease-in-out infinite',
        }}/>
      )}
    </button>
  )
}

/* ── GEMINI CHAT ───────────────────────────────────────────── */
async function askGemini(messages) {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: messages[messages.length - 1]?.content || '',
        room: 'AI Tutor',
        history: messages.slice(0, -1),
      })
    })
    if (!res.ok) return "I'm having trouble connecting right now. Please try again! 😊\n\n— Neural AI 🤖"
    const data = await res.json()
    return data.reply || "Koi baat nahi! Keep learning and stay consistent 💪\n\n— Neural AI 🤖"
  } catch(e) {
    return "Connection error. Please check your internet and try again.\n\n— Neural AI 🤖"
  }
}

/* ── MAIN COMPONENT ────────────────────────────────────────── */
export default function AIOrb({ currentPhase, currentTopic }) {
  const [open,    setOpen]   = useState(false)
  const [msgs,    setMsgs]   = useState([{
    role: 'assistant',
    content: `Namaste! 👋 I'm Neural AI, your personal AI tutor.\n\nAsk me anything about Python, ML, LLMs, or any topic in the curriculum. I'm here 24/7!\n\n— Neural AI 🤖`
  }])
  const [input,   setInput]  = useState('')
  const [loading, setLoading]= useState(false)
  const bottomRef = useRef(null)
  const inputRef  = useRef(null)

  useEffect(() => {
    if (msgs.length > 0) {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }), 100)
    }
  }, [msgs, loading])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 350)
  }, [open])

  const send = async () => {
    const txt = input.trim()
    if (!txt || loading) return
    setInput('')
    const newMsgs = [...msgs, { role: 'user', content: txt }]
    setMsgs(newMsgs)
    setLoading(true)
    const reply = await askGemini(newMsgs)
    setMsgs(m => [...m, { role: 'assistant', content: reply }])
    setLoading(false)
  }

  const onKey = e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }

  const quickPrompts = currentTopic
    ? [`Explain "${currentTopic?.slice(0,30)}"`, 'Give me a code example', 'What to learn next?']
    : ['How to start ML?', 'Best Python tips', 'Explain neural networks']

  return (
    <>
      <style>{`
        @keyframes orbPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.06)} }
        @keyframes orbSpin  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes orbIn    { from{opacity:0;transform:scale(.85) translateY(20px)} to{opacity:1;transform:none} }
      `}</style>

      {/* Floating orb button */}
      <div style={{
        position: 'fixed',
        bottom: 'calc(var(--nb, 60px) + 14px)',
        right: 16, zIndex: 300,
      }}>
        <OrbButton open={open} onClick={() => setOpen(o => !o)}/>
      </div>

      {/* Chat panel */}
      {open && (
        <div style={{
          position: 'fixed',
          bottom: 'calc(var(--nb, 60px) + 82px)',
          right: 12, zIndex: 299,
          width: 'min(360px, calc(100vw - 24px))',
          height: 'min(500px, calc(100dvh - 190px))',
          background: 'var(--bg-surface)',
          border: '1px solid rgba(167,139,250,.3)',
          borderRadius: 20,
          boxShadow: '0 16px 56px rgba(0,0,0,.5), 0 0 0 1px rgba(167,139,250,.12)',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
          animation: 'orbIn .3s cubic-bezier(.16,1,.3,1) both',
        }}>

          {/* Header */}
          <div style={{
            padding: '12px 16px', flexShrink: 0,
            borderBottom: '1px solid var(--border)',
            background: 'linear-gradient(135deg,rgba(124,58,237,.12),rgba(34,211,238,.06))',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg,#7c3aed,#22d3ee)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, boxShadow: '0 0 12px rgba(124,58,237,.4)',
            }}>⬡</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--t1)' }}>
                Neural AI
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 1 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399' }}/>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#34d399', letterSpacing: .5 }}>
                  Powered by Gemini · Free
                </span>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close"
              style={{ width: 28, height: 28, borderRadius: 8, border: '1px solid var(--border)',
                background: 'var(--bg-glass)', color: 'var(--t3)', fontSize: 13,
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              ✕
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {msgs.map((m, i) => (
              <div key={i} style={{
                display: 'flex', gap: 8,
                flexDirection: m.role === 'user' ? 'row-reverse' : 'row',
                alignItems: 'flex-end',
              }}>
                {m.role === 'assistant' && (
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                    background: 'linear-gradient(135deg,#7c3aed,#22d3ee)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11,
                  }}>⬡</div>
                )}
                <div style={{
                  maxWidth: '82%', padding: '9px 12px',
                  borderRadius: m.role === 'user' ? '14px 14px 4px 14px' : '4px 14px 14px 14px',
                  background: m.role === 'user'
                    ? 'linear-gradient(135deg,#0e7490,#7c3aed)'
                    : 'var(--bg-glass2)',
                  border: m.role === 'assistant' ? '1px solid var(--border)' : 'none',
                }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.6,
                    color: m.role === 'user' ? '#fff' : 'var(--t1)',
                    whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                    {m.content}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing dots */}
            {loading && (
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'linear-gradient(135deg,#7c3aed,#22d3ee)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>⬡</div>
                <div style={{ padding: '10px 14px', borderRadius: '4px 14px 14px 14px', background: 'var(--bg-glass2)', border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {[0,1,2].map(i => (
                      <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#a78bfa',
                        animation: `orbPulse 1s ease-in-out ${i*.2}s infinite` }}/>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef}/>
          </div>

          {/* Quick prompts — only on first open */}
          {msgs.length <= 1 && (
            <div style={{ padding: '6px 12px 0', display: 'flex', gap: 5, flexWrap: 'wrap', flexShrink: 0 }}>
              {quickPrompts.map(q => (
                <button key={q} onClick={() => { setInput(q); setTimeout(send, 50) }}
                  style={{ padding: '4px 10px', borderRadius: 99,
                    border: '1px solid rgba(124,58,237,.25)',
                    background: 'rgba(124,58,237,.08)', color: 'var(--violet)',
                    fontFamily: 'var(--font-body)', fontSize: 11, cursor: 'pointer',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    maxWidth: 160 }}>
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ padding: '10px 12px', borderTop: '1px solid var(--border)',
            display: 'flex', gap: 8, alignItems: 'flex-end', flexShrink: 0 }}>
            <textarea ref={inputRef} value={input}
              onChange={e => setInput(e.target.value)} onKeyDown={onKey}
              placeholder="Ask anything about AI/ML..."
              rows={1}
              style={{ flex: 1, resize: 'none', overflow: 'hidden',
                background: 'var(--bg-glass)', border: '1px solid var(--border2)',
                borderRadius: 12, padding: '9px 12px', fontSize: 13,
                fontFamily: 'var(--font-body)', color: 'var(--t1)', outline: 'none',
                lineHeight: 1.5, maxHeight: 80 }}
              onFocus={e => e.target.style.borderColor = '#a78bfa'}
              onBlur={e => e.target.style.borderColor = 'var(--border2)'}
              onInput={e => { e.target.style.height = 'auto'; e.target.style.height = Math.min(e.target.scrollHeight, 80) + 'px' }}
            />
            <button onClick={send} disabled={!input.trim() || loading} aria-label="Send"
              style={{ width: 38, height: 38, borderRadius: 10, flexShrink: 0, border: 'none',
                background: input.trim() && !loading ? 'linear-gradient(135deg,#7c3aed,#a78bfa)' : 'var(--bg-glass2)',
                color: input.trim() && !loading ? '#fff' : 'var(--t3)',
                fontSize: 16, cursor: input.trim() && !loading ? 'pointer' : 'default',
                display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .15s' }}>↑</button>
          </div>
        </div>
      )}
    </>
  )
}
