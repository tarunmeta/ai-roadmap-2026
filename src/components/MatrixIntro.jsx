import { useEffect, useRef, useState, useCallback } from 'react'
import { playPill } from '../hooks/useSounds.js'

/* ── MATRIX RAIN ────────────────────────────────────────── */
function MatrixRain({ opacity = 1 }) {
  const ref = useRef(null)
  useEffect(() => {
    const cv = ref.current; if (!cv) return
    const ctx = cv.getContext('2d')
    let W, H, raf, cols, drops
    const CHARS = 'アイウエオカキクケコサシスセソタチツテトABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*<>/\\'
    const SZ = 14
    const setup = () => {
      W = cv.width = window.innerWidth; H = cv.height = window.innerHeight
      cols = Math.floor(W / SZ)
      drops = Array.from({ length: cols }, () => Math.random() * -50)
    }
    setup(); window.addEventListener('resize', setup)
    const draw = () => {
      ctx.fillStyle = 'rgba(2,4,9,0.06)'; ctx.fillRect(0, 0, W, H)
      for (let i = 0; i < cols; i++) {
        const ch = CHARS[Math.floor(Math.random() * CHARS.length)]
        const y = drops[i] * SZ
        ctx.font = `${SZ}px 'JetBrains Mono',monospace`
        if (Math.random() > .95) {
          ctx.fillStyle = '#ffffff'; ctx.shadowBlur = 6; ctx.shadowColor = '#22d3ee'
        } else {
          ctx.fillStyle = `rgba(34,211,238,${Math.random() * .45 + .08})`; ctx.shadowBlur = 0
        }
        ctx.fillText(ch, i * SZ, y)
        ctx.shadowBlur = 0
        if (y > H && Math.random() > .978) drops[i] = 0
        drops[i] += .5 + Math.random() * .4
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', setup) }
  }, [])
  return <canvas ref={ref} aria-hidden="true" style={{ position:'fixed',inset:0,zIndex:0,opacity,transition:'opacity 1.2s ease' }}/>
}

/* ── 3D PARTICLE HUMANOID ────────────────────────────────── */
function Humanoid({ burst }) {
  const ref = useRef(null)
  const stateRef = useRef({ burst: false, pts: [], t: 0 })
  useEffect(() => { stateRef.current.burst = burst }, [burst])

  useEffect(() => {
    const cv = ref.current; if (!cv) return
    const ctx = cv.getContext('2d')
    const W = 320, H = 420; cv.width = W; cv.height = H
    const pts = []
    const zone = (cx, cy, rx, ry, n, zR = 35) => {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2, r = Math.pow(Math.random(), .55)
        pts.push({
          ox: cx + Math.cos(a)*rx*r, oy: cy + Math.sin(a)*ry*r,
          x: 0, y: 0, z: (Math.random()-.5)*zR,
          bx: cx, by: cy, s: Math.random()*1.2+.3,
          ph: Math.random()*Math.PI*2, f: Math.random()*.02+.01,
          evx: (Math.random()-.5)*14, evy: (Math.random()-.5)*10 - Math.random()*4,
          vex: 0, vey: 0
        })
      }
    }
    zone(160,60,  28,34, 110,40) // head
    zone(160,108,  8,12,  24,18) // neck
    zone(160,130, 55,14,  60,22) // shoulders
    zone(160,190, 38,52, 180,32) // torso
    zone(100,175,  11,48, 60,18) // L upper arm
    zone(87, 250,   9,33, 45,15) // L forearm
    zone(220,175,  11,48, 60,18) // R upper arm
    zone(233,250,   9,33, 45,15) // R forearm
    zone(140,295,  16,46, 90,25) // L thigh
    zone(132,375,  12,35, 65,18) // L shin
    zone(180,295,  16,46, 90,25) // R thigh
    zone(188,375,  12,35, 65,18) // R shin
    pts.forEach(p => { p.x = p.ox; p.y = p.oy })
    stateRef.current.pts = pts

    let raf
    const render = () => {
      ctx.clearRect(0, 0, W, H)
      const { burst, t } = stateRef.current
      stateRef.current.t += .015

      pts.forEach((p, i) => {
        if (burst) {
          p.vex += p.evx * .06; p.vey += p.evy * .06
          p.x += p.vex; p.y += p.vey
          p.vex *= .95; p.vey *= .95
        } else {
          p.x += (p.bx + (Math.random()-.5)*3 - p.x) * .009
          p.y += (p.by + (Math.random()-.5)*3 - p.y) * .009
          p.y += Math.sin(t*.5 + p.ph) * .05
          p.z += (Math.random()-.5) * .3
          if (Math.abs(p.z) > 30) p.z *= .9
        }

        const fov = 260, proj = fov / (fov + p.z)
        const px = W/2 + (p.x - W/2)*proj, py = H/2 + (p.y - H/2)*proj
        const pr = Math.max(.15, p.s * proj)

        const dist = burst ? Math.hypot(p.x - p.ox, p.y - p.oy) : 0
        const alpha = burst ? Math.max(0, 1 - dist/220) : (.35 + .35*Math.abs(Math.sin(t*p.f*60+p.ph)))
        const bright = !burst && Math.random() > .96

        ctx.save()
        ctx.globalAlpha = Math.min(.8, alpha)
        if (bright) { ctx.shadowBlur = 10; ctx.shadowColor = '#22d3ee' }
        const depth = (p.z + 35) / 70
        const r = Math.floor(34 * depth + 6 * (1-depth))
        const g = Math.floor(211 * depth + 182 * (1-depth))
        const b = Math.floor(238 * depth + 212 * (1-depth))
        ctx.fillStyle = bright ? '#ffffff' : `rgb(${r},${g},${b})`
        ctx.beginPath(); ctx.arc(px, py, pr, 0, Math.PI*2); ctx.fill()
        ctx.restore()
      })
      raf = requestAnimationFrame(render)
    }
    render()
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <canvas ref={ref}
      style={{
        maxWidth: '72vw', maxHeight: '48vh',
        filter: burst
          ? 'drop-shadow(0 0 40px rgba(251,113,133,.8))'
          : 'drop-shadow(0 0 20px rgba(34,211,238,.5))',
        transition: 'filter .4s ease',
        animation: burst ? 'none' : 'float 5s ease-in-out infinite',
      }}
    />
  )
}

/* ── PILL BUTTON ─────────────────────────────────────────── */
function Pill({ color, grad, shadow, label, sub, onClick }) {
  const [hov, setHov] = useState(false)
  return (
    <div style={{ textAlign:'center' }}>
      <button
        onClick={onClick}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        aria-label={label}
        style={{
          width: 80, height: 34, borderRadius: 99,
          background: grad, border: `2px solid ${color}`,
          boxShadow: hov ? `0 0 50px ${shadow}, 0 0 100px ${shadow}55` : `0 0 18px ${shadow}88`,
          transform: hov ? 'scale(1.1) translateY(-2px)' : 'scale(1)',
          transition: 'all .22s cubic-bezier(.16,1,.3,1)',
          display: 'block', margin: '0 auto 10px', cursor: 'pointer',
        }}
      />
      <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:11, fontWeight:700, color, letterSpacing:2, textTransform:'uppercase', textShadow:`0 0 12px ${color}` }}>{label}</div>
      <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:8, color: color+'66', marginTop:4, letterSpacing:1 }}>{sub}</div>
    </div>
  )
}

/* ── MAIN INTRO ──────────────────────────────────────────── */
export default function MatrixIntro({ onEnter }) {
  const [phase,      setPhase]      = useState('boot')
  const [lines,      setLines]      = useState([])
  const [showPills,  setShowPills]  = useState(false)
  const [burst,      setBurst]      = useState(false)
  const [collapsing, setCollapsing] = useState(false)
  const [rainOp,     setRainOp]     = useState(1)

  // ESC / Space to skip
  useEffect(() => {
    const fn = e => {
      if (e.key === 'Escape' || e.key === ' ') {
        localStorage.setItem('np-intro','1'); onEnter()
      }
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onEnter])

  // Type dialogue
  useEffect(() => {
    if (phase !== 'type') return
    const script = [
      '[SYS] NEURAL PROTOCOL v2026 — BOOT',
      '[SYS] Reality matrix detected...',
      '',
      '>>> You have been living in a simulation.',
      '>>> The question is: how deep does it go?',
      '',
      '>>> Choose your path:',
      '',
    ]
    let i = 0
    const next = () => {
      if (i < script.length) {
        setLines(l => [...l, script[i++]])
        setTimeout(next, i === script.length ? 500 : 320)
      } else setTimeout(() => setShowPills(true), 200)
    }
    setTimeout(next, 300)
  }, [phase])

  useEffect(() => { setTimeout(() => setPhase('type'), 900) }, [])

  const takePill = useCallback((color) => {
    playPill(color)
    if (color === 'blue') {
      setLines([...lines, '', '>>> Returning to bliss...'])
      setRainOp(.05)
      setTimeout(() => { try { window.close() } catch(e) {}; window.location.replace('about:blank') }, 1200)
    } else {
      setBurst(true); setShowPills(false)
      setLines(['>>> RED PILL TAKEN', '>>> Reality collapsing...', '>>> Welcome to the real.'])
      setTimeout(() => { setCollapsing(true); setTimeout(() => { localStorage.setItem('np-intro','1'); onEnter() }, 800) }, 700)
    }
  }, [lines, onEnter])

  return (
    <div style={{
      position:'fixed', inset:0, zIndex:9000,
      background:'#020409',
      display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
      overflow:'hidden',
    }}>
      <MatrixRain opacity={rainOp} />

      {/* Vignette */}
      <div style={{ position:'absolute', inset:0, zIndex:1, pointerEvents:'none',
        background:'radial-gradient(ellipse at center, transparent 20%, rgba(2,4,9,.9) 100%)' }}/>

      {/* Content — CENTERED */}
      <div style={{
        position:'relative', zIndex:2,
        display:'flex', flexDirection:'column', alignItems:'center',
        gap:20, padding:'20px 16px', width:'100%', maxWidth:480,
        textAlign:'center',
        animation: collapsing ? 'collapse .9s ease both' : 'emerge .8s cubic-bezier(.16,1,.3,1) .4s both',
      }}>
        {/* Brand */}
        <div>
          <div style={{
            fontFamily:"'Space Grotesk',sans-serif", fontSize:'clamp(14px,3.5vw,20px)',
            fontWeight:700, letterSpacing:4, textTransform:'uppercase',
            background:'linear-gradient(135deg,#22d3ee,#a78bfa)',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
            backgroundClip:'text', animation:'flicker 8s ease infinite',
          }}>NEURAL PROTOCOL</div>
          <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:8, color:'rgba(34,211,238,.3)', letterSpacing:3, marginTop:5 }}>
            AI ENGINEER OS v2026
          </div>
        </div>

        {/* 3D Humanoid — centered */}
        <div style={{ display:'flex', justifyContent:'center', width:'100%' }}>
          <Humanoid burst={burst} />
        </div>

        {/* Pills — centered */}
        {showPills && (
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:40, animation:'scaleIn .4s ease both' }}>
            <Pill color="#3b82f6" grad="linear-gradient(160deg,#2563eb,#1e3a8a)" shadow="rgba(59,130,246,.7)" label="BLUE PILL" sub="Stay asleep." onClick={() => takePill('blue')}/>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:13, fontWeight:600, color:'rgba(148,163,184,.3)', letterSpacing:3 }}>VS</div>
            <Pill color="#f43f5e" grad="linear-gradient(160deg,#e11d48,#881337)" shadow="rgba(244,63,94,.7)" label="RED PILL" sub="See how deep." onClick={() => takePill('red')}/>
          </div>
        )}

        {/* Terminal */}
        {lines.length > 0 && (
          <div style={{
            background:'rgba(2,4,9,.85)', backdropFilter:'blur(12px)',
            border:'1px solid rgba(34,211,238,.15)', borderRadius:10,
            padding:'14px 20px', width:'100%', textAlign:'left',
          }}>
            {lines.map((l,i) => (
              <div key={i} style={{
                fontFamily:"'JetBrains Mono',monospace", fontSize:11.5, lineHeight:1.9,
                color: !l ? undefined : l.startsWith('[SYS]') ? 'rgba(34,211,238,.45)' : l.startsWith('>>>') ? '#22d3ee' : 'rgba(34,211,238,.75)',
                letterSpacing:.3, animation:`fadeIn .25s ease ${i*.05}s both`,
              }}>{l || '\u00a0'}</div>
            ))}
            {!showPills && !burst && lines.length > 0 && (
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:'#22d3ee', animation:'blink 1s step-start infinite' }}>█</span>
            )}
          </div>
        )}
      </div>

      {/* Skip */}
      <button onClick={() => { localStorage.setItem('np-intro','1'); onEnter() }}
        style={{
          position:'absolute', bottom:24, right:24, zIndex:10,
          background:'transparent', border:'1px solid rgba(34,211,238,.2)',
          borderRadius:6, padding:'5px 14px', color:'rgba(34,211,238,.35)',
          fontFamily:"'JetBrains Mono',monospace", fontSize:9, letterSpacing:2,
          cursor:'pointer', transition:'all .2s',
        }}
        onMouseEnter={e=>{e.currentTarget.style.color='rgba(34,211,238,.8)';e.currentTarget.style.borderColor='rgba(34,211,238,.5)'}}
        onMouseLeave={e=>{e.currentTarget.style.color='rgba(34,211,238,.35)';e.currentTarget.style.borderColor='rgba(34,211,238,.2)'}}>
        SKIP ESC
      </button>

      {/* Corner brackets */}
      {[['tl',{top:16,left:16}],['tr',{top:16,right:16}],['bl',{bottom:16,left:16}],['br',{bottom:16,right:16}]].map(([k,pos]) => (
        <div key={k} style={{
          position:'absolute', zIndex:2, width:22, height:22, ...pos,
          borderTop:    k[0]==='t' ? '1px solid rgba(34,211,238,.3)' : 'none',
          borderBottom: k[0]==='b' ? '1px solid rgba(34,211,238,.3)' : 'none',
          borderLeft:   k[1]==='l' ? '1px solid rgba(34,211,238,.3)' : 'none',
          borderRight:  k[1]==='r' ? '1px solid rgba(34,211,238,.3)' : 'none',
        }}/>
      ))}
    </div>
  )
}
