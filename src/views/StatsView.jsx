import { useState, useEffect, useRef, useMemo } from 'react'
import { PHASES } from '../data.js'

function allTopics() {
  return PHASES.flatMap(p => p.weeks_data.flatMap(w =>
    w.days.flatMap(d => d.topics.map(t => ({ ...t, phaseId: p.id, phaseName: p.name, phaseColor: p.color })))
  ))
}

// ─── 3D BAR CHART (Three.js-style CSS 3D) ────────────────────
function Bar3D({ label, value, max, color, delay = 0 }) {
  const [grown, setGrown] = useState(false)
  useEffect(() => { const t = setTimeout(() => setGrown(true), delay + 300); return () => clearTimeout(t) }, [delay])
  const h = Math.max(4, (value / Math.max(max, 1)) * 140)
  return (
    <div style={{ display:'flex',flexDirection:'column',alignItems:'center',gap:6,flex:1 }}>
      <div style={{ fontFamily:'var(--font-display)',fontSize:13,fontWeight:700,color,textShadow:`0 0 10px ${color}` }}>{value}</div>
      <div style={{ width:'100%',height:140,display:'flex',alignItems:'flex-end',justifyContent:'center',position:'relative' }}>
        {/* 3D effect layers */}
        <div style={{
          position:'absolute',bottom:0,left:'50%',transform:'translateX(-50%)',
          width:'clamp(20px,5vw,32px)',height:grown ? h : 4,
          background:`linear-gradient(180deg,${color},${color}66)`,
          borderRadius:'4px 4px 0 0',
          boxShadow:`0 0 20px ${color}55, inset 0 0 10px rgba(255,255,255,.1)`,
          transition:`height .8s cubic-bezier(.16,1,.3,1) ${delay}ms`,
        }}/>
        {/* right face 3D */}
        <div style={{
          position:'absolute',bottom:0,left:'calc(50% + 16px)',
          width:8,height:grown ? h : 4,
          background:`linear-gradient(180deg,${color}88,${color}33)`,
          borderRadius:'0 2px 0 0',
          transform:'skewY(-45deg)',transformOrigin:'bottom left',
          transition:`height .8s cubic-bezier(.16,1,.3,1) ${delay}ms`,
        }}/>
        {/* top face 3D */}
        {grown && h > 4 && (
          <div style={{
            position:'absolute',left:'50%',bottom:h,
            width:32,height:8,transform:'translateX(-50%) skewX(-45deg) scaleY(.6)',
            background:`${color}cc`,borderRadius:2,
            boxShadow:`0 0 8px ${color}`,
            transition:'opacity .3s',
          }}/>
        )}
      </div>
      <div style={{ fontFamily:'var(--font-mono)',fontSize:8,color:'var(--t3)',
        textAlign:'center',letterSpacing:.5,maxWidth:60 }}>{label}</div>
    </div>
  )
}

// ─── 3D PIE / DONUT CHART ────────────────────────────────────
function DonutChart({ segments, size = 160 }) {
  const [drawn, setDrawn] = useState(false)
  useEffect(() => { const t = setTimeout(() => setDrawn(true), 400); return () => clearTimeout(t) }, [])
  const R = size / 2 - 16, r = R * .6
  const cx = size / 2, cy = size / 2
  const total = segments.reduce((s, g) => s + g.value, 0)
  let offset = -Math.PI / 2

  const paths = segments.map(seg => {
    const angle = (seg.value / Math.max(total, 1)) * 2 * Math.PI
    const x1 = cx + R * Math.cos(offset), y1 = cy + R * Math.sin(offset)
    offset += angle
    const x2 = cx + R * Math.cos(offset), y2 = cy + R * Math.sin(offset)
    const x3 = cx + r * Math.cos(offset), y3 = cy + r * Math.sin(offset)
    const x4 = cx + r * Math.cos(offset - angle), y4 = cy + r * Math.sin(offset - angle)
    const large = angle > Math.PI ? 1 : 0
    const d = `M ${x1} ${y1} A ${R} ${R} 0 ${large} 1 ${x2} ${y2} L ${x3} ${y3} A ${r} ${r} 0 ${large} 0 ${x4} ${y4} Z`
    return { ...seg, d, mid: offset - angle / 2 }
  })

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        {segments.map(s => (
          <filter key={s.label} id={`glow_${s.label}`}>
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        ))}
      </defs>
      {paths.map((seg, i) => seg.value > 0 && (
        <path key={seg.label} d={seg.d} fill={seg.color} opacity={drawn ? 0.88 : 0}
          filter={`url(#glow_${seg.label})`}
          style={{ transition: `opacity .4s ease ${i * 100}ms`,cursor:'default' }}>
          <title>{seg.label}: {seg.value}</title>
        </path>
      ))}
      {/* Center text */}
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize="20" fontWeight="800"
        fill="#f1f5f9" fontFamily="Space Grotesk, sans-serif">{total}</text>
      <text x={cx} y={cy + 12} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,.4)"
        fontFamily="JetBrains Mono, monospace" letterSpacing="1">TOTAL</text>
    </svg>
  )
}

// ─── HEATMAP CALENDAR ────────────────────────────────────────
function HeatMap({ done }) {
  const all = allTopics()
  const byPhase = PHASES.map(p => {
    const ts = p.weeks_data.flatMap(w => w.days.flatMap(d => d.topics))
    return { ...p, done: ts.filter(t => done[t.id]).length, total: ts.length }
  })
  return (
    <div style={{ display:'flex',gap:4,flexWrap:'wrap' }}>
      {byPhase.map(p => {
        const pct = p.total ? p.done / p.total : 0
        const opacity = .1 + pct * .85
        return (
          <div key={p.id} title={`${p.name}: ${p.done}/${p.total}`}
            style={{ width:32,height:32,borderRadius:6,
              background:p.color||'#22d3ee',opacity,
              border:`1px solid ${p.color||'#22d3ee'}44`,
              cursor:'default',transition:'opacity .4s ease',
              boxShadow: pct > .5 ? `0 0 8px ${p.color||'#22d3ee'}55` : 'none',
              display:'flex',alignItems:'center',justifyContent:'center',
              fontSize:12,
            }}>{p.emoji}</div>
        )
      })}
    </div>
  )
}

// ─── MAIN STATS VIEW ─────────────────────────────────────────
export default function StatsView({ done, grasp, times }) {
  const all   = allTopics()
  const doneC = all.filter(t => done[t.id]).length
  const strC  = all.filter(t => grasp[t.id] === 'strong').length
  const midC  = all.filter(t => grasp[t.id] === 'mid').length
  const wkC   = all.filter(t => grasp[t.id] === 'weak').length
  const ltC   = all.filter(t => grasp[t.id] === 'later').length
  const pct   = Math.round(doneC / all.length * 100)

  const phaseStats = PHASES.map(p => {
    const ts = p.weeks_data.flatMap(w => w.days.flatMap(d => d.topics))
    return {
      ...p,
      done:   ts.filter(t => done[t.id]).length,
      strong: ts.filter(t => grasp[t.id] === 'strong').length,
      weak:   ts.filter(t => grasp[t.id] === 'weak').length,
      total:  ts.length,
    }
  })

  const maxDone = Math.max(...phaseStats.map(p => p.done), 1)

  const totalMs = Object.values(times || {}).reduce((s, v) => s + (v || 0), 0)
  const hrs = Math.floor(totalMs / 3600000)
  const mins = Math.floor((totalMs % 3600000) / 60000)

  return (
    <div className="fade-up" style={{ maxWidth:1200 }}>

      {/* ── HEADER ─────────────────────────────────────── */}
      <div style={{ marginBottom:20,padding:'24px 28px',
        background:'var(--bg-surface)',backdropFilter:'blur(16px)',
        border:'1px solid var(--border)',borderRadius:20,position:'relative',overflow:'hidden' }}>
        <div style={{ position:'absolute',top:0,left:0,right:0,height:1,
          background:'linear-gradient(90deg,transparent,rgba(34,211,238,.4),rgba(167,139,250,.4),transparent)' }}/>
        <div style={{ display:'flex',alignItems:'center',gap:10,flexWrap:'wrap',justifyContent:'space-between' }}>
          <div>
            <div style={{ fontFamily:'var(--font-mono)',fontSize:10,color:'rgba(34,211,238,.4)',
              letterSpacing:3,textTransform:'uppercase',marginBottom:6 }}>// NEURAL STATS</div>
            <h1 style={{ fontFamily:'var(--font-display)',fontSize:'clamp(20px,3vw,32px)',fontWeight:700,
              background:'linear-gradient(135deg,#f1f5f9,#22d3ee)',
              WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>
              Progress Dashboard
            </h1>
          </div>
          <div style={{ marginLeft:'auto',display:'flex',gap:10,flexWrap:'wrap' }}>
            {[
              { l:'Completed', v:doneC, c:'#22d3ee' },
              { l:'Progress',  v:`${pct}%`, c:'#a78bfa' },
              { l:'Study Time',v:`${hrs}h ${mins}m`, c:'#34d399' },
            ].map(s => (
              <div key={s.l} style={{ textAlign:'center',padding:'8px 16px',
                background:'var(--bg-glass)',borderRadius:12,
                border:'1px solid var(--border)' }}>
                <div style={{ fontFamily:'var(--font-display)',fontSize:18,fontWeight:700,color:s.c }}>{s.v}</div>
                <div style={{ fontFamily:'var(--font-body)',fontSize:10,color:'var(--t3)' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN GRID ──────────────────────────────────── */}
      <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(min(300px,100%),1fr))',gap:12 }}>

        {/* 3D Bar chart — topics per phase */}
        <div style={{ background:'var(--bg-surface)',backdropFilter:'blur(16px)',
          border:'1px solid var(--border)',borderRadius:18,
          padding:'22px 24px',position:'relative',overflow:'hidden',gridColumn:'span 1' }}>
          <div style={{ position:'absolute',top:0,left:0,right:0,height:1,
            background:'linear-gradient(90deg,transparent,rgba(34,211,238,.35),transparent)' }}/>
          <div style={{ fontFamily:'var(--font-display)',fontSize:13,fontWeight:600,
            color:'var(--t1)',marginBottom:20,display:'flex',alignItems:'center',gap:8 }}>
            <div style={{ width:3,height:14,background:'linear-gradient(180deg,#22d3ee,#a78bfa)',borderRadius:2 }}/>
            Topics Completed — 3D Phase Chart
          </div>
          <div style={{ display:'flex',gap:6,alignItems:'flex-end',padding:'0 4px',overflowX:'auto',paddingBottom:4,WebkitOverflowScrolling:'touch' }}>
            {phaseStats.map((p, i) => (
              <Bar3D key={p.id} label={`P${p.id}`} value={p.done}
                max={maxDone} color={p.color||'#22d3ee'} delay={i*60}/>
            ))}
          </div>
        </div>

        {/* Donut chart — grasp distribution */}
        <div className='stats-side' style={{ background:'var(--bg-surface)',backdropFilter:'blur(16px)',
          border:'1px solid var(--border)',borderRadius:18,
          padding:'22px 24px',position:'relative',overflow:'hidden' }}>
          <div style={{ position:'absolute',top:0,left:0,right:0,height:1,
            background:'linear-gradient(90deg,transparent,rgba(167,139,250,.35),transparent)' }}/>
          <div style={{ fontFamily:'var(--font-display)',fontSize:13,fontWeight:600,
            color:'var(--t1)',marginBottom:16,display:'flex',alignItems:'center',gap:8 }}>
            <div style={{ width:3,height:14,background:'linear-gradient(180deg,#a78bfa,#34d399)',borderRadius:2 }}/>
            Grasp Distribution
          </div>
          <div style={{ display:'flex',gap:16,alignItems:'center',flexWrap:'wrap',justifyContent:'center' }}>
            <DonutChart size={160} segments={[
              { label:'Strong', value:strC, color:'#34d399' },
              { label:'Mid',    value:midC, color:'#fbbf24' },
              { label:'Weak',   value:wkC,  color:'#fb7185' },
              { label:'Later',  value:ltC,  color:'#a78bfa' },
              { label:'Untried',value:Math.max(0,doneC-strC-midC-wkC-ltC),color:'rgba(255,255,255,.1)'},
            ]}/>
            <div style={{ display:'flex',flexDirection:'column',gap:8 }}>
              {[
                { l:'⚡ Strong', v:strC, c:'#34d399' },
                { l:'◐ Mid',    v:midC, c:'#fbbf24' },
                { l:'⚠ Weak',  v:wkC,  c:'#fb7185' },
                { l:'⏸ Later', v:ltC,  c:'#a78bfa' },
              ].map(s => (
                <div key={s.l} style={{ display:'flex',alignItems:'center',gap:8 }}>
                  <div style={{ width:10,height:10,borderRadius:3,background:s.c,flexShrink:0,
                    boxShadow:`0 0 4px ${s.c}` }}/>
                  <span style={{ fontFamily:'var(--font-body)',fontSize:12,color:'var(--t2)',flex:1 }}>{s.l}</span>
                  <span style={{ fontFamily:'var(--font-display)',fontSize:13,fontWeight:700,color:s.c }}>{s.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Phase progress heatmap */}
        <div style={{ background:'var(--bg-surface)',backdropFilter:'blur(16px)',
          border:'1px solid var(--border)',borderRadius:18,
          padding:'22px 24px',position:'relative',overflow:'hidden' }}>
          <div style={{ position:'absolute',top:0,left:0,right:0,height:1,
            background:'linear-gradient(90deg,transparent,rgba(52,211,153,.35),transparent)' }}/>
          <div style={{ fontFamily:'var(--font-display)',fontSize:13,fontWeight:600,
            color:'var(--t1)',marginBottom:16,display:'flex',alignItems:'center',gap:8 }}>
            <div style={{ width:3,height:14,background:'linear-gradient(180deg,#34d399,#22d3ee)',borderRadius:2 }}/>
            Phase Heatmap
          </div>
          <HeatMap done={done}/>
          <div style={{ marginTop:16 }}>
            <div style={{ display:'flex',justifyContent:'space-between',
              fontFamily:'var(--font-mono)',fontSize:8,color:'var(--t3)',letterSpacing:.5,marginBottom:6 }}>
              <span>Less</span><span>More</span>
            </div>
            <div style={{ height:6,borderRadius:3,
              background:'linear-gradient(90deg,rgba(34,211,238,.1),rgba(34,211,238,.9))',
              boxShadow:'0 0 8px rgba(34,211,238,.3)' }}/>
          </div>
          {/* Phase legend */}
          <div style={{ marginTop:14,display:'flex',flexDirection:'column',gap:6 }}>
            {phaseStats.filter(p => p.done > 0).slice(0,4).map(p => (
              <div key={p.id} style={{ display:'flex',alignItems:'center',gap:8 }}>
                <div style={{ width:8,height:8,borderRadius:2,background:p.color,flexShrink:0 }}/>
                <span style={{ fontFamily:'var(--font-body)',fontSize:11,color:'var(--t2)',flex:1 }}>
                  {p.name}
                </span>
                <span style={{ fontFamily:'var(--font-display)',fontSize:11,fontWeight:700,color:p.color }}>
                  {Math.round(p.done/p.total*100)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Phase breakdown list */}
        <div style={{ background:'var(--bg-surface)',backdropFilter:'blur(16px)',
          border:'1px solid var(--border)',borderRadius:18,
          padding:'22px 24px',position:'relative',overflow:'hidden',gridColumn:'span 1' }}>
          <div style={{ position:'absolute',top:0,left:0,right:0,height:1,
            background:'linear-gradient(90deg,transparent,rgba(251,191,36,.3),transparent)' }}/>
          <div style={{ fontFamily:'var(--font-display)',fontSize:13,fontWeight:600,
            color:'var(--t1)',marginBottom:16,display:'flex',alignItems:'center',gap:8 }}>
            <div style={{ width:3,height:14,background:'linear-gradient(180deg,#fbbf24,#fb7185)',borderRadius:2 }}/>
            Phase-by-Phase Breakdown
          </div>
          <div style={{ display:'flex',flexDirection:'column',gap:8 }}>
            {phaseStats.map((p,i) => {
              const pct2 = p.total ? Math.round(p.done/p.total*100) : 0
              return (
                <div key={p.id} style={{ display:'flex',alignItems:'center',gap:12,
                  animation:`fadeIn .3s ease ${i*40}ms both` }}>
                  <span style={{ fontSize:16,flexShrink:0 }}>{p.emoji}</span>
                  <div style={{ width:'clamp(60px,20vw,100px)',flexShrink:0,fontFamily:'var(--font-body)',
                    fontSize:12,color:'var(--t2)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis' }}>
                    {p.name}
                  </div>
                  <div style={{ flex:1,height:8,background:'var(--bg-glass2)',borderRadius:99,overflow:'hidden' }}>
                    <div style={{ height:'100%',width:`${pct2}%`,borderRadius:99,
                      background:`linear-gradient(90deg,${p.color||'#22d3ee'},${p.color||'#22d3ee'}88)`,
                      boxShadow:`0 0 6px ${p.color||'#22d3ee'}55`,
                      transition:`width .8s cubic-bezier(.16,1,.3,1) ${i*60}ms` }}/>
                  </div>
                  <div style={{ width:36,textAlign:'right',fontFamily:'var(--font-display)',
                    fontSize:12,fontWeight:700,color:p.color||'#22d3ee',flexShrink:0 }}>
                    {pct2}%
                  </div>
                  <div style={{ width:60,textAlign:'right',fontFamily:'var(--font-mono)',
                    fontSize:9,color:'var(--t3)',flexShrink:0 }}>
                    {p.done}/{p.total}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
