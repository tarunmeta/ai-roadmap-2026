import { useState, useEffect, useRef, useMemo, Suspense, lazy, startTransition } from 'react'
import { PHASES } from '../data.js'
import { playClick, playHover } from '../hooks/useSounds.js'

const ThreeScene = lazy(() => import('../components/ThreeScene.jsx'))

function allTopics() {
  return PHASES.flatMap(p => p.weeks_data.flatMap(w =>
    w.days.flatMap(d => d.topics.map(t => ({ ...t, phaseId: p.id })))))
}
function hexToRgb(h) {
  if (!h || !h.startsWith('#')) return '34,211,238'
  const r=parseInt(h.slice(1,3),16),g=parseInt(h.slice(3,5),16),b=parseInt(h.slice(5,7),16)
  return isNaN(r)?'34,211,238':`${r},${g},${b}`
}

// ── MOBILE PHASE CARD GRID ────────────────────────────────────
function PhaseCard({ p, i, done, isPhaseUnlocked, onPhaseClick, onInfoClick, isActive }) {
  const [hov, setHov] = useState(false)
  const ts    = useMemo(() => p.weeks_data.flatMap(w => w.days.flatMap(d => d.topics)), [p])
  const doneC = ts.filter(t => done[t.id]).length
  const pct   = ts.length ? Math.round(doneC / ts.length * 100) : 0
  const locked = !isPhaseUnlocked(p.id)
  const gCol  = p.color || '#22d3ee'
  const rgb   = hexToRgb(gCol)

  return (
    <div
      onClick={() => { playClick(); onPhaseClick(i) }}
      onMouseEnter={() => { setHov(true); playHover() }}
      onMouseLeave={() => setHov(false)}
      role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onPhaseClick(i)}
      aria-label={`Phase ${p.id}: ${p.name} — ${locked ? 'locked' : pct + '% complete'}`}
      style={{
        background: isActive
          ? `linear-gradient(135deg, rgba(${rgb},.15), var(--bg-glass2))`
          : 'var(--bg-glass)',
        border: `1px solid ${isActive ? gCol + '55' : hov ? gCol + '33' : 'var(--border)'}`,
        borderRadius: 16,
        padding: '14px 16px',
        cursor: 'pointer',
        transition: 'all .2s',
        transform: hov && !locked ? 'translateY(-2px)' : 'none',
        boxShadow: isActive ? `0 8px 28px rgba(${rgb},.18)` : hov ? 'var(--shadow)' : 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top color bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: locked ? 'var(--border)' : gCol,
        opacity: locked ? .3 : .8,
      }}/>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10, flexShrink: 0,
          background: locked ? 'var(--bg-glass2)' : `rgba(${rgb},.15)`,
          border: `1px solid ${locked ? 'var(--border)' : `rgba(${rgb},.3)`}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20,
        }}>{p.emoji}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 9,
            color: locked ? 'var(--t3)' : gCol,
            letterSpacing: 2, textTransform: 'uppercase', marginBottom: 2,
          }}>Phase {p.id}{locked ? ' · PRO' : ''}</div>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700,
            color: 'var(--t1)',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>{p.name}</div>
        </div>
        {locked
          ? <span style={{ fontSize: 16, opacity: .4, flexShrink: 0 }}>🔒</span>
          : <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:4, flexShrink:0 }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700,
                color: pct === 100 ? gCol : 'var(--t2)',
              }}>{pct}%</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--t3)' }}>
                {doneC}/{ts.length}
              </div>
              <button
                onClick={e => onInfoClick(e, i)}
                aria-label="Show phase details"
                style={{
                  padding:'2px 7px', borderRadius:6, border:`1px solid ${gCol}44`,
                  background:`rgba(${hexToRgb(gCol)},.08)`, color:gCol,
                  fontSize:9, fontFamily:'var(--font-mono)', cursor:'pointer',
                  letterSpacing:.5,
                }}>
                {isActive ? '▲ less' : 'ⓘ info'}
              </button>
            </div>
        }
      </div>

      {/* Progress bar */}
      {!locked && (
        <div style={{ height: 4, background: 'var(--bg-glass2)', borderRadius: 99, overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: 99, width: `${pct}%`,
            background: `linear-gradient(90deg, ${gCol}, ${gCol}99)`,
            boxShadow: `0 0 6px ${gCol}66`,
            transition: 'width .8s cubic-bezier(.16,1,.3,1)',
          }}/>
        </div>
      )}

      {locked && (
        <div style={{
          marginTop: 6, padding: '5px 10px', borderRadius: 8,
          border: '1px dashed var(--border)',
          fontFamily: 'var(--font-mono)', fontSize: 8,
          color: 'var(--t3)', textAlign: 'center', letterSpacing: 1,
        }}>UPGRADE TO UNLOCK</div>
      )}
    </div>
  )
}

// ── PHASE DETAIL PANEL ────────────────────────────────────────
function PhaseDetail({ p, done, isPhaseUnlocked, onStart, onUpgrade, onClose }) {
  const ts     = useMemo(() => p.weeks_data.flatMap(w => w.days.flatMap(d => d.topics)), [p])
  const doneC  = ts.filter(t => done[t.id]).length
  const pct    = ts.length ? Math.round(doneC / ts.length * 100) : 0
  const locked = !isPhaseUnlocked(p.id)
  const gCol   = p.color || '#22d3ee'
  const rgb    = hexToRgb(gCol)
  const weekBars = p.weeks_data.map(w => ({
    done: w.days.flatMap(d => d.topics).filter(t => done[t.id]).length,
    total: w.days.flatMap(d => d.topics).length, week: w.week,
  }))

  return (
    <div style={{
      borderRadius: 18, overflow: 'hidden',
      background: `linear-gradient(135deg, rgba(${rgb},.08), var(--bg-surface))`,
      border: `1px solid rgba(${rgb},.3)`,
      padding: '20px',
      position: 'relative',
      animation: 'scaleIn .25s cubic-bezier(.16,1,.3,1) both',
    }}>
      {/* Top strip */}
      <div style={{ position:'absolute',top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,transparent,${gCol},transparent)` }}/>

      {/* Close */}
      <button onClick={onClose} aria-label="Close"
        style={{ position:'absolute',top:14,right:14,width:28,height:28,
          borderRadius:8,border:'1px solid var(--border)',background:'var(--bg-glass)',
          color:'var(--t3)',fontSize:14,display:'flex',alignItems:'center',
          justifyContent:'center',cursor:'pointer' }}>✕</button>

      {/* Header */}
      <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:16,paddingRight:36 }}>
        <span style={{ fontSize:36 }}>{p.emoji}</span>
        <div>
          <div style={{ fontFamily:'var(--font-mono)',fontSize:9,color:gCol,
            letterSpacing:2,textTransform:'uppercase',marginBottom:3 }}>
            Phase {p.id} · {p.duration}
          </div>
          <h2 style={{ fontFamily:'var(--font-display)',fontSize:20,fontWeight:700,color:'var(--t1)' }}>
            {p.name}
          </h2>
          <p style={{ fontFamily:'var(--font-body)',fontSize:13,color:'var(--t2)',marginTop:2 }}>
            {p.description}
          </p>
        </div>
      </div>

      {/* Stats */}
      {!locked && (
        <>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginBottom:14 }}>
            {[{l:'Topics',v:ts.length,c:gCol},{l:'Done',v:doneC,c:'#34d399'},{l:'Progress',v:`${pct}%`,c:gCol}].map(s=>(
              <div key={s.l} style={{ background:'var(--bg-glass)',borderRadius:10,
                border:'1px solid var(--border)',padding:'10px',textAlign:'center' }}>
                <div style={{ fontFamily:'var(--font-display)',fontSize:18,fontWeight:700,color:s.c }}>{s.v}</div>
                <div style={{ fontFamily:'var(--font-body)',fontSize:10,color:'var(--t3)',marginTop:2 }}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div style={{ marginBottom:14 }}>
            <div style={{ display:'flex',justifyContent:'space-between',marginBottom:5 }}>
              <span style={{ fontFamily:'var(--font-mono)',fontSize:10,color:'var(--t3)' }}>Progress</span>
              <span style={{ fontFamily:'var(--font-display)',fontSize:11,fontWeight:700,color:gCol }}>{pct}%</span>
            </div>
            <div style={{ height:6,background:'var(--bg-glass2)',borderRadius:99,overflow:'hidden' }}>
              <div style={{ height:'100%',width:`${pct}%`,borderRadius:99,
                background:`linear-gradient(90deg,${gCol},${gCol}88)`,
                boxShadow:`0 0 10px ${gCol}55`,transition:'width 1s ease' }}/>
            </div>
          </div>

          {/* Week bars */}
          <div style={{ marginBottom:16 }}>
            <div style={{ fontFamily:'var(--font-body)',fontSize:11,color:'var(--t3)',
              marginBottom:8,fontWeight:500,textTransform:'uppercase',letterSpacing:.5 }}>Weeks</div>
            <div style={{ display:'flex',gap:4 }}>
              {weekBars.map(w => {
                const wp = w.total ? Math.round(w.done/w.total*100) : 0
                return (
                  <div key={w.week} style={{ flex:1,textAlign:'center' }}>
                    <div style={{ height:32,background:'var(--bg-glass2)',borderRadius:6,
                      overflow:'hidden',position:'relative',marginBottom:3 }}>
                      <div style={{ position:'absolute',bottom:0,left:0,right:0,
                        height:`${Math.max(8,wp)}%`,
                        background:`linear-gradient(180deg,${gCol},${gCol}66)`,
                        transition:'height .6s ease',borderRadius:4 }}/>
                    </div>
                    <div style={{ fontFamily:'var(--font-mono)',fontSize:7,color:'var(--t3)' }}>W{w.week}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}

      {/* CTA */}
      {locked ? (
        <div style={{ textAlign:'center',padding:'14px',background:'var(--bg-glass)',
          borderRadius:12,border:'1px dashed var(--border)' }}>
          <div style={{ fontFamily:'var(--font-body)',fontSize:13,color:'var(--t2)',marginBottom:12 }}>
            Upgrade to Pro to unlock this phase
          </div>
          <button onClick={onUpgrade} style={{
            padding:'10px 28px',borderRadius:10,cursor:'pointer',fontWeight:600,fontSize:14,
            background:`linear-gradient(135deg,${gCol},#a78bfa)`,
            border:'none',color:'white',fontFamily:'var(--font-display)',
            boxShadow:`0 4px 16px rgba(${rgb},.3)`,
          }}>⚡ Upgrade — ₹999 Lifetime</button>
        </div>
      ) : (
        <button onClick={onStart} style={{
          width:'100%',padding:'12px',borderRadius:12,cursor:'pointer',fontWeight:700,fontSize:15,
          background:`linear-gradient(135deg,rgba(${rgb},.15),rgba(${rgb},.05))`,
          border:`1px solid rgba(${rgb},.4)`,color:gCol,
          fontFamily:'var(--font-display)',transition:'all .2s',
        }}
        onMouseEnter={e=>{e.currentTarget.style.background=gCol;e.currentTarget.style.color='#fff'}}
        onMouseLeave={e=>{e.currentTarget.style.background=`linear-gradient(135deg,rgba(${rgb},.15),rgba(${rgb},.05))`;e.currentTarget.style.color=gCol}}
        >{pct > 0 ? `Continue Phase ${p.id} →` : `Start Phase ${p.id} →`}</button>
      )}
    </div>
  )
}

// ── STATS ROW ─────────────────────────────────────────────────
function StatsRow({ done, grasp }) {
  const all   = allTopics()
  const doneC = all.filter(t => done[t.id]).length
  const strC  = all.filter(t => grasp[t.id] === 'strong').length
  const weakC = all.filter(t => grasp[t.id] === 'weak').length
  const pct   = Math.round(doneC / all.length * 100)
  return (
    <div style={{ display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:10,marginBottom:16 }}>
      {[
        { label:'Completed', val:doneC, sub:`of ${all.length}`, color:'var(--cyan)' },
        { label:'Progress',  val:`${pct}%`, sub:'overall',      color:'var(--violet)' },
        { label:'Mastered',  val:strC,  sub:'topics strong',    color:'var(--green)' },
        { label:'Review',    val:weakC, sub:'topics weak',      color:'var(--rose)' },
      ].map(s => (
        <div key={s.label} style={{
          background:'var(--bg-glass)', border:'1px solid var(--border)',
          borderRadius:14, padding:'14px 16px', position:'relative', overflow:'hidden',
        }}>
          <div style={{ position:'absolute',top:0,left:0,right:0,height:2,
            background:`linear-gradient(90deg,${s.color},transparent)`,opacity:.6 }}/>
          <div style={{ fontFamily:'var(--font-display)',fontSize:26,fontWeight:700,
            color:s.color, lineHeight:1, marginBottom:3 }}>{s.val}</div>
          <div style={{ fontFamily:'var(--font-body)',fontSize:12,color:'var(--t1)',fontWeight:500 }}>{s.label}</div>
          <div style={{ fontFamily:'var(--font-mono)',fontSize:9,color:'var(--t3)',marginTop:1 }}>{s.sub}</div>
        </div>
      ))}
    </div>
  )
}

// ── MAIN MAP VIEW ─────────────────────────────────────────────
export default function MapView({ done, grasp, setActivePhase, setWeek, setDay, setView, isPhaseUnlocked, onUpgrade }) {
  const all       = allTopics()
  const doneC     = all.filter(t => done[t.id]).length
  const pct       = Math.round(doneC / all.length * 100)
  const [selected, setSelected] = useState(null)
  const [filter,   setFilter]   = useState('all')

  const filtered = PHASES.filter(p => {
    if (filter === 'unlocked') return isPhaseUnlocked(p.id)
    if (filter === 'locked')   return !isPhaseUnlocked(p.id)
    return true
  })

  const handlePhaseClick = i => {
    const p = PHASES[i]
    if (!isPhaseUnlocked(p.id)) { onUpgrade(); return }
    // Single tap → go directly to phase, no scrolling
    setActivePhase(i); setWeek(0); setDay(0); startTransition(()=>setView('weekly'))
  }

  // Detail panel only opens on the info button
  const handleInfoClick = (e, i) => {
    e.stopPropagation()
    setSelected(prev => prev === i ? null : i)
  }

  const handleStart = () => {
    const p = PHASES[selected]
    if (!isPhaseUnlocked(p.id)) { onUpgrade(); return }
    setActivePhase(selected); setWeek(0); setDay(0); startTransition(()=>setView('weekly'))
  }

  return (
    <div className="fade-up" style={{ maxWidth:1200 }}>

      {/* ── HERO ──────────────────────────────────────────── */}
      <div style={{
        borderRadius:20, overflow:'hidden',
        background:'var(--bg-surface)',
        border:'1px solid var(--border)',
        marginBottom:16, minHeight:160,
        display:'flex', alignItems:'stretch', position:'relative',
      }}>
        {/* Ambient glow */}
        <div style={{ position:'absolute',top:-40,right:-40,width:200,height:200,borderRadius:'50%',
          background:'radial-gradient(circle,rgba(34,211,238,.12),transparent 70%)',pointerEvents:'none' }}/>

        <div style={{ flex:1, padding:'clamp(20px,4vw,36px)', position:'relative', zIndex:1,
          display:'flex', flexDirection:'column', justifyContent:'center' }}>
          <div style={{ fontFamily:'var(--font-mono)',fontSize:9,color:'var(--cyan)',
            letterSpacing:3,textTransform:'uppercase',marginBottom:10,opacity:.7 }}>
            // AI ENGINEER ROADMAP 2026
          </div>
          <h1 style={{
            fontFamily:'var(--font-display)',fontWeight:700,
            fontSize:'clamp(20px,4vw,36px)',letterSpacing:-.5,
            background:'linear-gradient(135deg,var(--cyan),var(--violet))',
            WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',
            lineHeight:1.2, marginBottom:10,
          }}>
            Python → AGI
          </h1>
          <p style={{ fontFamily:'var(--font-body)',fontSize:13,color:'var(--t2)',
            marginBottom:16,lineHeight:1.6 }}>
            10 phases · {all.length} topics · Hindi + English
          </p>
          {/* Progress */}
          <div style={{ maxWidth:340 }}>
            <div style={{ display:'flex',justifyContent:'space-between',marginBottom:6 }}>
              <span style={{ fontFamily:'var(--font-mono)',fontSize:10,color:'var(--t3)' }}>Overall Progress</span>
              <span style={{ fontFamily:'var(--font-display)',fontSize:11,fontWeight:700,color:'var(--cyan)' }}>{pct}%</span>
            </div>
            <div style={{ height:6,background:'var(--bg-glass2)',borderRadius:99,overflow:'hidden' }}>
              <div style={{ height:'100%',width:`${pct}%`,borderRadius:99,
                background:'linear-gradient(90deg,var(--cyan),var(--violet))',
                boxShadow:'0 0 10px rgba(34,211,238,.4)',
                transition:'width 1.2s cubic-bezier(.16,1,.3,1)' }}/>
            </div>
          </div>
        </div>

        {/* 3D — desktop only */}
        <div className="d-only" style={{ width:320,flexShrink:0,position:'relative',overflow:'hidden' }}>
          <Suspense fallback={<div style={{ width:'100%',height:'100%' }}/>}>
            <ThreeScene style={{ width:'100%',height:'100%',minHeight:220 }}/>
          </Suspense>
        </div>
      </div>

      {/* ── STATS ─────────────────────────────────────────── */}
      <StatsRow done={done} grasp={grasp}/>

      {/* ── FILTER TABS ───────────────────────────────────── */}
      <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',
        marginBottom:12,flexWrap:'wrap',gap:8 }}>
        <div style={{ fontFamily:'var(--font-display)',fontSize:13,fontWeight:600,
          color:'var(--t1)',display:'flex',alignItems:'center',gap:8 }}>
          <div style={{ width:3,height:14,background:'linear-gradient(180deg,var(--cyan),var(--violet))',borderRadius:2 }}/>
          {filtered.length} Phases
        </div>
        <div style={{ display:'flex',gap:3,background:'var(--bg-glass)',
          border:'1px solid var(--border)',borderRadius:10,padding:3 }}>
          {[['all','All'],['unlocked','Free'],['locked','Pro']].map(([v,l]) => (
            <button key={v} onClick={() => setFilter(v)} style={{
              padding:'4px 12px',borderRadius:7,border:'1px solid',
              fontSize:12,fontWeight:500,cursor:'pointer',transition:'all .15s',
              background:filter===v ? 'rgba(34,211,238,.12)' : 'transparent',
              color:filter===v ? 'var(--cyan)' : 'var(--t3)',
              borderColor:filter===v ? 'rgba(34,211,238,.25)' : 'transparent',
              fontFamily:'var(--font-body)',
            }}>{l}</button>
          ))}
        </div>
      </div>

      {/* ── PHASE GRID — mobile first ─────────────────────── */}
      <div style={{
        display:'grid',
        gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,280px),1fr))',
        gap:10, marginBottom:14,
      }}>
        {filtered.map((p, idx) => (
          <PhaseCard
            key={p.id} p={p} i={PHASES.indexOf(p)}
            done={done} isPhaseUnlocked={isPhaseUnlocked}
            onPhaseClick={handlePhaseClick}
            onInfoClick={handleInfoClick}
            isActive={selected === PHASES.indexOf(p)}
          />
        ))}
      </div>

      {/* ── PHASE DETAIL ──────────────────────────────────── */}
      {selected !== null && (
        <div style={{ marginBottom:16 }}>
          <PhaseDetail
            p={PHASES[selected]}
            done={done} isPhaseUnlocked={isPhaseUnlocked}
            onStart={handleStart} onUpgrade={onUpgrade}
            onClose={() => setSelected(null)}
          />
        </div>
      )}

      {/* ── ABOUT BENTO ───────────────────────────────────── */}
      <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,260px),1fr))',gap:10 }}>

        {/* What you'll build */}
        <div style={{ background:'var(--bg-glass)',border:'1px solid var(--border)',
          borderRadius:16,padding:'18px 20px',position:'relative',overflow:'hidden' }}>
          <div style={{ position:'absolute',top:0,left:0,right:0,height:2,
            background:'linear-gradient(90deg,var(--green),transparent)' }}/>
          <div style={{ fontFamily:'var(--font-display)',fontSize:13,fontWeight:600,
            color:'var(--green)',marginBottom:12 }}>🎯 What You'll Build</div>
          {['ML models from scratch','Deep learning with PyTorch',
            'LLM apps with LangChain','AI Agents that browse + code',
            'Production APIs + Docker','MLOps pipelines on cloud'].map(item => (
            <div key={item} style={{ display:'flex',gap:8,marginBottom:7,alignItems:'flex-start' }}>
              <div style={{ width:5,height:5,borderRadius:'50%',background:'var(--green)',
                marginTop:6,flexShrink:0 }}/>
              <span style={{ fontFamily:'var(--font-body)',fontSize:13,color:'var(--t2)',lineHeight:1.5 }}>
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* Why Neural Protocol */}
        <div style={{ background:'var(--bg-glass)',border:'1px solid var(--border)',
          borderRadius:16,padding:'18px 20px',position:'relative',overflow:'hidden' }}>
          <div style={{ position:'absolute',top:0,left:0,right:0,height:2,
            background:'linear-gradient(90deg,var(--violet),transparent)' }}/>
          <div style={{ fontFamily:'var(--font-display)',fontSize:13,fontWeight:600,
            color:'var(--violet)',marginBottom:12 }}>⚡ Why Neural Protocol</div>
          {[['🇮🇳','Hindi + English for every topic'],['🎯','No filler — only what matters'],
            ['📊','GRASP ratings + smart tracker'],['🤖','AI tutor on this curriculum'],
            ['⏱','Per-topic time tracking'],['🔓','Phase 1 free forever']].map(([ic,txt]) => (
            <div key={txt} style={{ display:'flex',gap:8,marginBottom:7,alignItems:'flex-start' }}>
              <span style={{ fontSize:13,flexShrink:0 }}>{ic}</span>
              <span style={{ fontFamily:'var(--font-body)',fontSize:13,color:'var(--t2)',lineHeight:1.5 }}>{txt}</span>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div style={{
          background:'linear-gradient(135deg,rgba(34,211,238,.07),rgba(167,139,250,.07))',
          border:'1px solid rgba(34,211,238,.2)',
          borderRadius:16,padding:'18px 20px',
          position:'relative',overflow:'hidden',display:'flex',flexDirection:'column',
        }}>
          <div style={{ position:'absolute',top:0,left:0,right:0,height:2,
            background:'linear-gradient(90deg,var(--cyan),var(--violet))' }}/>
          <div style={{ fontFamily:'var(--font-display)',fontSize:13,fontWeight:600,marginBottom:10,
            background:'linear-gradient(135deg,var(--cyan),var(--violet))',
            WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>
            🚀 Unlock All 10 Phases
          </div>
          <div style={{ fontFamily:'var(--font-display)',fontSize:32,fontWeight:700,
            color:'var(--t1)',marginBottom:2,lineHeight:1 }}>₹999</div>
          <div style={{ fontFamily:'var(--font-mono)',fontSize:9,color:'var(--t3)',
            marginBottom:14,letterSpacing:.5 }}>LIFETIME · or ₹200/month</div>
          {['All 10 phases','AI Tutor (Claude)','Productivity dashboard','Lifetime updates'].map(f => (
            <div key={f} style={{ display:'flex',gap:8,marginBottom:7,alignItems:'center' }}>
              <span style={{ color:'var(--cyan)',fontSize:10 }}>◈</span>
              <span style={{ fontFamily:'var(--font-body)',fontSize:12,color:'var(--t2)' }}>{f}</span>
            </div>
          ))}
          <button onClick={onUpgrade} style={{
            marginTop:12,padding:'10px',borderRadius:10,cursor:'pointer',fontWeight:700,
            fontSize:14,background:'linear-gradient(135deg,var(--cyan),var(--violet))',
            border:'none',color:'#fff',fontFamily:'var(--font-display)',
            boxShadow:'0 4px 16px rgba(34,211,238,.3)',
          }}>Upgrade Now →</button>
          <div style={{ marginTop:10,fontFamily:'var(--font-mono)',fontSize:9,
            color:'var(--t3)',letterSpacing:.3,lineHeight:1.8 }}>
            💳 UPI: tarunsaini89689-1@okaxis<br/>
            📱 WhatsApp: +91 97811 91041
          </div>
        </div>
      </div>
    </div>
  )
}
