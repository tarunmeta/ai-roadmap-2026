import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

/* ── 3D PULSING ORB BUTTON ─────────────────────────────────── */
function OrbCanvas({ active, size = 56 }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const scene = new THREE.Scene()
    const cam   = new THREE.PerspectiveCamera(50, 1, 0.1, 10)
    const rdr   = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    rdr.setSize(size, size)
    rdr.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    rdr.setClearColor(0, 0)
    el.appendChild(rdr.domElement)
    cam.position.z = 2.8

    scene.add(new THREE.AmbientLight(0xffffff, .5))
    const pl1 = new THREE.PointLight(0x22d3ee, 4, 8); pl1.position.set(2,2,2); scene.add(pl1)
    const pl2 = new THREE.PointLight(0xa78bfa, 3, 6); pl2.position.set(-2,-1,1); scene.add(pl2)

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(.75, 2),
      new THREE.MeshStandardMaterial({
        color: active ? 0xa78bfa : 0x22d3ee,
        emissive: active ? 0x4c1d95 : 0x0e4a5c,
        roughness: .15, metalness: .9,
        transparent: true, opacity: .95,
      })
    )
    scene.add(core)

    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(.78, 2),
      new THREE.MeshBasicMaterial({ color: active ? 0xa78bfa : 0x22d3ee, wireframe: true, transparent: true, opacity: .18 })
    )
    scene.add(wire)

    // Outer glow ring
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(.95, .025, 8, 48),
      new THREE.MeshBasicMaterial({ color: active ? 0xa78bfa : 0x22d3ee, transparent: true, opacity: .5 })
    )
    ring.rotation.x = .5; scene.add(ring)

    let t = 0, raf
    const go = () => {
      raf = requestAnimationFrame(go); t += .022
      core.rotation.y = t * .5; core.rotation.x = Math.sin(t * .3) * .15
      wire.rotation.copy(core.rotation)
      ring.rotation.z += .012
      const pulse = 1 + Math.sin(t * 1.5) * .06
      core.scale.setScalar(pulse)
      pl1.position.x = Math.sin(t) * 2; pl1.position.y = Math.cos(t * .7) * 2
      rdr.render(scene, cam)
    }
    go()
    return () => { cancelAnimationFrame(raf); rdr.dispose(); if (el.contains(rdr.domElement)) el.removeChild(rdr.domElement) }
  }, [active, size])
  return <div ref={ref} style={{ width: size, height: size }} aria-hidden="true"/>
}

/* ── GEMINI CHAT ───────────────────────────────────────────── */
const SYSTEM = `You are Neural AI, the personal AI tutor inside Neural Protocol — India's AI Engineer roadmap app. You help students learn: Python, Math for AI, NumPy/Pandas, Machine Learning, Deep Learning/PyTorch, LLMs, AI Agents, FastAPI/Docker, MLOps, and Portfolio/Jobs.

Be encouraging, concise, and practical. Give code examples when helpful. Use simple language. Occasionally use Hindi like "bilkul sahi!" or "bahut achha!". 

If asked about pricing: Free forever for Phase 1. Pro Lifetime ₹999 or ₹200/month. UPI: tarunsaini89689-1@okaxis. WhatsApp: +91 97811 91041.`

async function askGemini(messages) {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: messages[messages.length - 1]?.content || '',
        room: 'AI Tutor',
        history: messages.slice(0, -1),
        system: SYSTEM,
      })
    })
    const data = await res.json()
    return data.reply || "Sorry, I couldn't respond. Please try again."
  } catch(e) {
    return "Connection error. Please check your internet and try again."
  }
}

/* ── MAIN AI ORB COMPONENT ─────────────────────────────────── */
export default function AIOrb({ currentPhase, currentTopic }) {
  const [open,     setOpen]    = useState(false)
  const [msgs,     setMsgs]    = useState([
    { role: 'assistant', content: `Namaste! 👋 I'm Neural AI, your personal tutor.\n\nAsk me anything about AI, ML, Python, or the curriculum. I'm here 24/7! — Neural AI 🤖` }
  ])
  const [input,    setInput]   = useState('')
  const [loading,  setLoading] = useState(false)
  const bottomRef  = useRef(null)
  const inputRef   = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, loading])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  const send = async () => {
    const txt = input.trim(); if (!txt || loading) return
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
    ? [`Explain "${currentTopic}" simply`, `Give me a code example for this`, `What should I learn after this?`]
    : [`How do I start Machine Learning?`, `Best Python resources for beginners`, `Difference between ML and DL?`]

  return (
    <>
      {/* ── FLOATING ORB BUTTON ── */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close AI Tutor' : 'Open AI Tutor'}
        style={{
          position: 'fixed', bottom: 'calc(var(--nb, 60px) + 16px)', right: 16,
          zIndex: 300, background: 'none', border: 'none', cursor: 'pointer',
          padding: 0, borderRadius: '50%',
          filter: open
            ? 'drop-shadow(0 0 16px rgba(167,139,250,.7))'
            : 'drop-shadow(0 0 12px rgba(34,211,238,.5))',
          transition: 'filter .3s, transform .3s',
          transform: open ? 'scale(1.1)' : 'scale(1)',
        }}
      >
        <OrbCanvas active={open} size={56}/>
        {/* Notification dot */}
        {!open && (
          <div style={{
            position: 'absolute', top: 2, right: 2,
            width: 12, height: 12, borderRadius: '50%',
            background: '#34d399', border: '2px solid var(--bg-base)',
            animation: 'pulseGlow 2s ease-in-out infinite',
          }}/>
        )}
      </button>

      {/* ── CHAT PANEL ── */}
      {open && (
        <div style={{
          position: 'fixed',
          bottom: 'calc(var(--nb, 60px) + 82px)',
          right: 12,
          zIndex: 299,
          width: 'min(360px, calc(100vw - 24px))',
          height: 'min(520px, calc(100dvh - 180px))',
          background: 'var(--bg-surface)',
          border: '1px solid rgba(167,139,250,.3)',
          borderRadius: 20,
          boxShadow: '0 12px 48px rgba(0,0,0,.4), 0 0 0 1px rgba(167,139,250,.15)',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
          animation: 'scaleIn .25s cubic-bezier(.16,1,.3,1) both',
        }}>

          {/* Header */}
          <div style={{
            padding: '14px 16px', borderBottom: '1px solid var(--border)',
            background: 'linear-gradient(135deg, rgba(167,139,250,.1), rgba(34,211,238,.05))',
            display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0,
          }}>
            <OrbCanvas active={true} size={36}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--t1)' }}>
                Neural AI
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 1 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399',
                  animation: 'pulseGlow 2s infinite' }}/>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#34d399', letterSpacing: .5 }}>
                  Powered by Gemini · Always online
                </span>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close"
              style={{ width: 28, height: 28, borderRadius: 8, border: '1px solid var(--border)',
                background: 'var(--bg-glass)', color: 'var(--t3)', fontSize: 14,
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              ✕
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px 12px 4px',
            display: 'flex', flexDirection: 'column', gap: 10 }}>
            {msgs.map((m, i) => (
              <div key={i} style={{
                display: 'flex', gap: 8,
                flexDirection: m.role === 'user' ? 'row-reverse' : 'row',
                alignItems: 'flex-end',
              }}>
                {m.role === 'assistant' && (
                  <div style={{ width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                    background: 'linear-gradient(135deg,#a78bfa,#22d3ee)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, border: '1px solid rgba(167,139,250,.3)' }}>⬡</div>
                )}
                <div style={{
                  maxWidth: '82%', padding: '9px 12px',
                  borderRadius: m.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                  background: m.role === 'user'
                    ? 'linear-gradient(135deg, var(--cyan2), var(--violet2))'
                    : 'linear-gradient(135deg, rgba(167,139,250,.1), rgba(34,211,238,.06))',
                  border: m.role === 'assistant' ? '1px solid rgba(167,139,250,.2)' : 'none',
                }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.6,
                    color: m.role === 'user' ? '#fff' : 'var(--t1)',
                    whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                    {m.content}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                  background: 'linear-gradient(135deg,#a78bfa,#22d3ee)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>⬡</div>
                <div style={{ padding: '10px 14px', borderRadius: '14px 14px 14px 4px',
                  background: 'rgba(167,139,250,.08)', border: '1px solid rgba(167,139,250,.2)' }}>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {[0,1,2].map(i => (
                      <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#a78bfa',
                        animation: `pulseGlow 1.2s ease-in-out ${i * .2}s infinite` }}/>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef}/>
          </div>

          {/* Quick prompts */}
          {msgs.length <= 2 && !loading && (
            <div style={{ padding: '6px 12px', display: 'flex', gap: 5, flexWrap: 'wrap', flexShrink: 0 }}>
              {quickPrompts.map(q => (
                <button key={q} onClick={() => { setInput(q); setTimeout(send, 50) }}
                  style={{ padding: '5px 10px', borderRadius: 99, border: '1px solid rgba(167,139,250,.25)',
                    background: 'rgba(167,139,250,.08)', color: 'var(--violet)',
                    fontFamily: 'var(--font-body)', fontSize: 11, cursor: 'pointer',
                    transition: 'all .15s', maxWidth: '100%',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ padding: '10px 12px', borderTop: '1px solid var(--border)',
            display: 'flex', gap: 8, alignItems: 'flex-end', flexShrink: 0,
            background: 'var(--bg-surface)' }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder="Ask anything about AI/ML..."
              rows={1}
              style={{ flex: 1, resize: 'none', overflow: 'hidden',
                background: 'var(--bg-glass)', border: '1px solid var(--border2)',
                borderRadius: 12, padding: '9px 12px', fontSize: 13,
                fontFamily: 'var(--font-body)', color: 'var(--t1)', outline: 'none',
                lineHeight: 1.5, maxHeight: 80, transition: 'border-color .15s' }}
              onFocus={e => e.target.style.borderColor = 'var(--violet)'}
              onBlur={e => e.target.style.borderColor = 'var(--border2)'}
              onInput={e => { e.target.style.height = 'auto'; e.target.style.height = Math.min(e.target.scrollHeight, 80) + 'px' }}
            />
            <button onClick={send} disabled={!input.trim() || loading}
              aria-label="Send"
              style={{ width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                background: input.trim() && !loading ? 'linear-gradient(135deg,#a78bfa,#7c3aed)' : 'var(--bg-glass2)',
                border: 'none', color: input.trim() && !loading ? '#fff' : 'var(--t3)',
                fontSize: 16, cursor: input.trim() && !loading ? 'pointer' : 'default',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all .15s' }}>↑</button>
          </div>
        </div>
      )}
    </>
  )
}
