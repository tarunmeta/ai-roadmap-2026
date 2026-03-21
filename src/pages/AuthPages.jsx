import { useState, useEffect, useRef, useCallback } from 'react'
import { useAuth } from '../hooks/useAuth.js'

function NeuralBg() {
  const ref = useRef(null)
  useEffect(() => {
    const cv = ref.current; if (!cv) return
    const ctx = cv.getContext('2d')
    let W, H, raf
    const setup = () => { W = cv.width = window.innerWidth; H = cv.height = window.innerHeight }
    setup(); window.addEventListener('resize', setup)
    const pts = Array.from({ length: 50 }, () => ({
      x: Math.random() * 1920, y: Math.random() * 1080,
      vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .25, r: Math.random() + .3,
    }))
    const draw = () => {
      ctx.fillStyle = 'rgba(0,0,8,.05)'; ctx.fillRect(0, 0, W, H)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1
        ctx.save(); ctx.globalAlpha = .25; ctx.fillStyle = '#22d3ee'
        ctx.shadowBlur = 6; ctx.shadowColor = '#22d3ee'
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill(); ctx.restore()
      })
      for (let i = 0; i < pts.length; i++)
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y)
          if (d < 100) {
            ctx.save(); ctx.globalAlpha = (1 - d / 100) * .07
            ctx.strokeStyle = '#22d3ee'; ctx.lineWidth = .4
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y)
            ctx.stroke(); ctx.restore()
          }
        }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', setup) }
  }, [])
  return <canvas ref={ref} style={{ position: 'fixed', inset: 0, zIndex: 0 }} />
}

// ── FIELD — defined OUTSIDE component so it never remounts ──────────
function Field({ label, type, value, onChange, placeholder, onEnter }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{
        fontFamily: "var(--font-mono)", fontSize: 8,
        color: 'rgba(34,211,238,.4)', letterSpacing: 2.5,
        textTransform: 'uppercase', marginBottom: 6,
      }}>{label}</div>
      <input
        type={type || 'text'}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={type === 'password' ? 'current-password' : type === 'email' ? 'email' : 'name'}
        onKeyDown={e => e.key === 'Enter' && onEnter?.()}
        style={{
          display: 'block', width: '100%',
          padding: '11px 14px',
          background: 'rgba(34,211,238,.03)',
          border: '1px solid rgba(34,211,238,.18)',
          borderRadius: 6,
          color: '#eef4f0',
          fontFamily: "var(--font-mono)",
          fontSize: 13,
          outline: 'none',
          transition: 'border-color .18s, box-shadow .18s',
          boxSizing: 'border-box',
        }}
        onFocus={e => {
          e.target.style.borderColor = 'rgba(34,211,238,.6)'
          e.target.style.boxShadow = '0 0 0 2px rgba(34,211,238,.1)'
        }}
        onBlur={e => {
          e.target.style.borderColor = 'rgba(34,211,238,.18)'
          e.target.style.boxShadow = 'none'
        }}
      />
    </div>
  )
}

export default function AuthRouter() {
  const { register, login, forgotPassword } = useAuth()
  const [mode,    setMode]    = useState('login') // login | signup | forgot
  const [email,   setEmail]   = useState('')
  const [pass,    setPass]    = useState('')
  const [name,    setName]    = useState('')
  const [err,     setErr]     = useState('')
  const [msg,     setMsg]     = useState('')
  const [loading, setLoading] = useState(false)

  const switchMode = (m) => { setMode(m); setErr(''); setMsg('') }

  const submit = async () => {
    setErr(''); setMsg('')
    if (!email.trim()) { setErr('Enter your email'); return }
    if (mode !== 'forgot' && !pass) { setErr('Enter your password'); return }
    if (mode === 'signup' && !name.trim()) { setErr('Enter your name'); return }
    setLoading(true)
    try {
      if (mode === 'forgot') {
        const res = await forgotPassword(email.trim())
        if (res?.ok) setMsg('Reset email sent! Check your inbox.')
        else setErr(res?.error || 'Failed to send reset email')
      } else if (mode === 'login') {
        const res = await login(email.trim(), pass)
        if (res && !res.ok) setErr(res.error || 'Login failed')
      } else {
        const res = await register(name.trim(), email.trim(), pass)
        if (res && !res.ok) setErr(res.error || 'Registration failed')
      }
    } catch (e) {
      setErr(e.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const S = { // shared styles
    card: {
      background: 'rgba(3,3,18,.95)',
      backdropFilter: 'blur(24px)',
      border: '1px solid rgba(34,211,238,.2)',
      borderRadius: 12,
      padding: '30px 28px 26px',
      boxShadow: '0 0 80px rgba(0,0,0,.9), 0 0 40px rgba(34,211,238,.04)',
      position: 'relative', overflow: 'hidden',
    },
  }

  return (
    <div style={{
      minHeight: '100dvh', background: '#000008',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
    }}>
      <NeuralBg />
      {/* Scanlines */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.04) 2px,rgba(0,0,0,.04) 4px)' }}/>

      <div style={{ position: 'relative', zIndex: 2, width: 'min(400px,100%)',
        animation: 'fadeUp .5s cubic-bezier(.16,1,.3,1) both' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 900,
            color: '#22d3ee', letterSpacing: 4, textTransform: 'uppercase',
            textShadow: '0 0 30px rgba(34,211,238,.5)', marginBottom: 6 }}>
            NEURAL PROTOCOL
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 8,
            color: 'rgba(34,211,238,.28)', letterSpacing: 2.5, textTransform: 'uppercase' }}>
            {mode === 'forgot' ? '// PASSWORD RESET' : mode === 'login' ? '// AUTHENTICATION PORTAL' : '// CREATE NEW IDENTITY'}
          </div>
        </div>

        <div style={S.card}>
          {/* Top glow */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1,
            background: 'linear-gradient(90deg,transparent,#22d3ee 40%,#a78bfa 60%,transparent)', opacity: .35 }}/>

          {/* Tab toggle — only for login/signup */}
          {mode !== 'forgot' && (
            <div style={{ display: 'flex', gap: 3, background: 'rgba(34,211,238,.04)',
              border: '1px solid rgba(34,211,238,.1)', borderRadius: 6, padding: 3, marginBottom: 22 }}>
              {[['login','CONNECT'],['signup','REGISTER']].map(([m,lb]) => (
                <button key={m} onClick={() => switchMode(m)} style={{
                  flex: 1, padding: '8px', borderRadius: 4, border: 'none',
                  background: mode === m ? '#22d3ee' : 'transparent',
                  color: mode === m ? '#000008' : 'rgba(34,211,238,.35)',
                  fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 700,
                  letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer',
                  transition: 'all .18s',
                }}>{lb}</button>
              ))}
            </div>
          )}

          {mode === 'signup' && (
            <Field label="Your Name" value={name} onChange={setName} placeholder="Full name" onEnter={submit}/>
          )}

          <Field
            label="Email Address"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="you@example.com"
            onEnter={submit}
          />

          {mode !== 'forgot' && (
            <Field
              label="Password"
              type="password"
              value={pass}
              onChange={setPass}
              placeholder="Min 6 characters"
              onEnter={submit}
            />
          )}

          {/* Error / success */}
          {err && (
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: '#fb7185',
              background: 'rgba(251,113,133,.07)', border: '1px solid rgba(251,113,133,.25)',
              borderRadius: 5, padding: '9px 12px', marginBottom: 14, lineHeight: 1.5 }}>
              ⚠ {err}
            </div>
          )}
          {msg && (
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: '#22d3ee',
              background: 'rgba(34,211,238,.06)', border: '1px solid rgba(34,211,238,.25)',
              borderRadius: 5, padding: '9px 12px', marginBottom: 14, lineHeight: 1.5 }}>
              ✓ {msg}
            </div>
          )}

          {/* Submit */}
          <button onClick={submit} disabled={loading} style={{
            width: '100%', padding: '12px', borderRadius: 6, cursor: 'pointer',
            border: '1px solid rgba(34,211,238,.5)',
            background: loading ? 'rgba(34,211,238,.04)' : 'rgba(34,211,238,.1)',
            color: loading ? 'rgba(34,211,238,.35)' : '#22d3ee',
            fontFamily: "var(--font-display)", fontSize: 10, fontWeight: 700,
            letterSpacing: 3, textTransform: 'uppercase',
            transition: 'all .18s', marginBottom: 12,
            textShadow: loading ? 'none' : '0 0 10px rgba(34,211,238,.4)',
            boxShadow: loading ? 'none' : '0 0 14px rgba(34,211,238,.08)',
          }}>
            {loading ? 'PROCESSING...' : mode === 'login' ? '⚡ CONNECT' : mode === 'signup' ? '⚡ INITIALIZE' : '⚡ SEND RESET'}
          </button>

          {/* Footer links */}
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
            {mode === 'login' && (
              <button onClick={() => switchMode('forgot')} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: "var(--font-mono)", fontSize: 9,
                color: 'rgba(34,211,238,.3)', letterSpacing: 1, textDecoration: 'underline',
              }}>Forgot password?</button>
            )}
            {mode === 'forgot' && (
              <button onClick={() => switchMode('login')} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: "var(--font-mono)", fontSize: 9,
                color: 'rgba(34,211,238,.3)', letterSpacing: 1, textDecoration: 'underline',
              }}>← Back to login</button>
            )}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 14,
          fontFamily: "var(--font-mono)", fontSize: 8,
          color: 'rgba(34,211,238,.18)', letterSpacing: 1.5 }}>
          FREE TIER · 300 TOPICS · NO CARD REQUIRED
        </div>
      </div>
    </div>
  )
}
