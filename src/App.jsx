import { useState, useEffect, useRef, lazy, Suspense, startTransition } from 'react'
import { syncLeaderboard } from './pages/Leaderboard.jsx'
const AIOrb        = lazy(() => import('./components/AIOrb.jsx'))
const LeaderboardPage = lazy(() => import('./pages/Leaderboard.jsx'))
import { PHASES, CHATGPT_TEMPLATES } from './data.js'
import { playClick, playNav, playSuccess, playHover } from './hooks/useSounds.js'
import { useAuth } from './hooks/useAuth.js'
import { useStore } from './hooks/useStore.js'
import { useSubscription } from './hooks/useSubscription.js'
const AuthRouter            = lazy(() => import('./pages/AuthPages.jsx'))
const ProductivityDashboard = lazy(() => import('./pages/ProductivityDashboard.jsx'))
const PricingPage           = lazy(() => import('./pages/PricingPage.jsx'))
const AIChat                = lazy(() => import('./pages/AIChat.jsx'))
const PaywallOverlay        = lazy(() => import('./pages/PaywallOverlay.jsx'))
const AdminPanel            = lazy(() => import('./pages/AdminPanel.jsx'))
const ResourceSearch        = lazy(() => import('./pages/ResourceSearch.jsx'))
const Community             = lazy(() => import('./pages/Community.jsx'))
const HindiSection          = lazy(() => import('./pages/HindiSection.jsx'))
const ProgressGraph         = lazy(() => import('./pages/ProgressGraph.jsx'))
const Background3D = lazy(() => import('./components/Background3D.jsx'))
const MatrixIntro  = lazy(() => import('./components/MatrixIntro.jsx'))
const CelebrationScene = lazy(() => import('./components/CelebrationScene.jsx'))
const MiniOrb      = lazy(() => import('./components/MiniOrb.jsx'))
const MapView   = lazy(() => import('./views/MapView.jsx'))
const StatsView = lazy(() => import('./views/StatsView.jsx'))

// ── GRASP CONFIG ──────────────────────────────────────────────────────────────
// GRASP inline (no separate file needed)
const GRASP = {
  strong: { label:'STRONG', emoji:'⚡', color:'#34d399', bg:'rgba(52,211,153,.1)' },
  mid:    { label:'MID',    emoji:'◐',  color:'#fbbf24', bg:'rgba(251,191,36,.1)' },
  weak:   { label:'WEAK',   emoji:'⚠',  color:'#fb7185', bg:'rgba(251,113,133,.1)' },
  later:  { label:'LATER',  emoji:'⏸',  color:'#a78bfa', bg:'rgba(167,139,250,.1)' },
}

// ── HELPERS ───────────────────────────────────────────────────────────────────
function allTopics() {
  return PHASES.flatMap(p => p.weeks_data.flatMap(w => w.days.flatMap(d =>
    d.topics.map(t => ({ ...t, phaseId:p.id, phaseName:p.name, phaseColor:p.color, phaseEmoji:p.emoji, weekNum:w.week, dayLabel:d.label }))
  )))
}
function phasePct(phase, done) {
  const ts = phase.weeks_data.flatMap(w => w.days.flatMap(d => d.topics))
  return ts.length ? Math.round(ts.filter(t => done[t.id]).length / ts.length * 100) : 0
}
function totalStats(done) {
  const all = allTopics()
  return { total:all.length, completed:all.filter(t=>done[t.id]).length, pct:Math.round(all.filter(t=>done[t.id]).length/all.length*100) }
}
function fmtMs(ms) {
  if (!ms) return null
  const h=Math.floor(ms/3600000), m=Math.floor((ms%3600000)/60000), s=Math.floor((ms%60000)/1000)
  if (h>0) return `${h}h${m}m`
  if (m>0) return `${m}m${s}s`
  return `${s}s`
}

// ── SMALL UI PIECES ───────────────────────────────────────────────────────────
function Ring({ pct, size=48, stroke=4, color }) {
  const r=(size-stroke)/2, c=2*Math.PI*r
  return (
    <svg width={size} height={size} style={{transform:'rotate(-90deg)',flexShrink:0}} aria-hidden="true">
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(34,211,238,.08)" strokeWidth={stroke}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={c} strokeDashoffset={c - c*pct/100} strokeLinecap="round"
        style={{transition:'stroke-dashoffset .7s cubic-bezier(.16,1,.3,1)'}}/>
    </svg>
  )
}

function PhaseTag({ label, color }) {
  return (
    <span className="tag" style={{border:`1px solid ${color}44`,background:`${color}14`,color,flexShrink:0}}>
      {label}
    </span>
  )
}

function YTBtn({ url, label }) {
  if (!url) return null
  return (
    <a href={url} target="_blank" rel="noreferrer noopener"
      onClick={e=>e.stopPropagation()} className="ytbtn"
      aria-label={`Watch ${label} on YouTube`}>
      <span className="yti" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="white"/></svg>
      </span>
      {label}
    </a>
  )
}

function HindiYTBtn({ url, label }) {
  if (!url) return null
  return (
    <a href={url} target="_blank" rel="noreferrer noopener"
      onClick={e=>e.stopPropagation()} className="hindibtn"
      title={label} aria-label={`${label} — Hindi tutorial`}>
      🇮🇳 हिंदी
    </a>
  )
}

function GraspPills({ id, grasp, set }) {
  const cur = grasp[id]
  return (
    <div style={{display:'flex',gap:3,flexWrap:'wrap'}} onClick={e=>e.stopPropagation()}>
      {Object.entries(GRASP).map(([k,g]) => {
        const on = cur===k
        return (
          <button key={k} className="gpill" aria-pressed={on}
            aria-label={`Mark as ${g.label}`}
            onClick={e=>{e.stopPropagation();set(id, on?null:k)}}
            style={{borderColor:on?g.color:'var(--border)',background:on?g.bg:'transparent',color:on?g.color:'var(--t3)'}}>
            {g.emoji} {g.label}
          </button>
        )
      })}
    </div>
  )
}

function NoteBox({ id, notes, setNote, color }) {
  const [open, setOpen] = useState(false)
  const val = notes[id]||''
  const has = val.trim().length>0
  return (
    <div onClick={e=>e.stopPropagation()} style={{marginTop:6}}>
      <button onClick={()=>setOpen(o=>!o)} aria-expanded={open}
        style={{fontSize:10,padding:'2px 9px',borderRadius:7,cursor:'pointer',
          border:`1px solid ${has?color+'44':'var(--border)'}`,
          background:has?`${color}10`:'transparent',
          color:has?color:'var(--t3)',fontWeight:600,transition:'all .15s'}}>
        {open?'▲ close':has?'📝 note saved ▼':'+ note / confusion'}
      </button>
      {open && (
        <textarea value={val} onChange={e=>setNote(id,e.target.value)} autoFocus
          aria-label="Topic note"
          placeholder="What confused you? Paste code, link, or summary…"
          style={{display:'block',width:'100%',marginTop:6,padding:'9px 11px',
            background:'var(--bg-glass)',border:`1px solid ${color}33`,borderRadius:9,
            color:'var(--t1)',fontSize:12,lineHeight:1.65,outline:'none',
            minHeight:70,resize:'vertical',fontFamily:'var(--font-mono)',transition:'border-color .15s'}}
          onFocus={e=>e.target.style.borderColor=color}
          onBlur={e=>e.target.style.borderColor=`${color}44`}
        />
      )}
    </div>
  )
}

// ── TOPIC ROW ─────────────────────────────────────────────────────────────────
function TopicRow({ t, done, grasp, notes, times, timer, toggleDone, setTopicGrasp, setTopicNote, startTimer, stopTimer, color }) {
  const isDone   = done[t.id]
  const gInfo    = grasp[t.id] ? GRASP[grasp[t.id]] : null
  const hasNote  = notes[t.id]?.trim()
  const timeMs   = times[t.id]||0
  const isActive = timer?.topicId===t.id
  // Subtopic checkboxes — stored in localStorage
  const subKey = `sub_${t.id}`
  const [subDone, setSubDone] = useState(() => {
    try { return JSON.parse(localStorage.getItem(subKey)||'{}') } catch { return {} }
  })
  const toggleSub = (si) => {
    const next = {...subDone, [si]: !subDone[si]}
    setSubDone(next)
    try { localStorage.setItem(subKey, JSON.stringify(next)) } catch {}
  }
  const [elapsed,  setElapsed]  = useState(0)
  const [expanded, setExpanded] = useState(false)
  const [vidLang,  setVidLang]  = useState('en') // 'en' | 'hi'
  const [noteOpen, setNoteOpen] = useState(false)

  useEffect(() => {
    if (!isActive) return
    const iv = setInterval(() => setElapsed(Date.now()-(timer?.startMs||Date.now())), 1000)
    return () => clearInterval(iv)
  }, [isActive, timer])

  const markDone = () => {
    const wasUndone = !done[t.id]
    toggleDone(t.id)
    if (wasUndone) {
      playSuccess()
      const ph = PHASES.find(p=>p.weeks_data.flatMap(w=>w.days.flatMap(d=>d.topics)).some(tp=>tp.id===t.id))
      if (ph) {
        const phTs   = ph.weeks_data.flatMap(w=>w.days.flatMap(d=>d.topics))
        const nowDone = phTs.filter(tp=>tp.id===t.id?true:done[tp.id]).length
        if (nowDone===phTs.length) setCelebrate({name:ph.name,emoji:ph.emoji})
      }
    }
  }

  const videoUrl   = vidLang==='hi' ? (t.hindiYt||t.yt) : t.yt
  const videoLabel = vidLang==='hi' ? (t.hindiYtLabel||t.ytLabel) : t.ytLabel

  return (
    <div style={{
      borderRadius:12,
      border:`1px solid ${isDone?`${color}30`:'var(--border)'}`,
      background: isDone ? `${color}06` : 'var(--bg-glass)',
      marginBottom:8,
      overflow:'hidden',
      transition:'all .2s',
    }}>

      {/* ── TOP ROW ── */}
      <div style={{display:'flex',alignItems:'flex-start',gap:10,padding:'12px 14px'}}>

        {/* Checkbox */}
        <button onClick={markDone} aria-pressed={!!isDone}
          style={{width:22,height:22,borderRadius:6,marginTop:1,flexShrink:0,cursor:'pointer',
            border:`2px solid ${isDone?color:'var(--border2)'}`,
            background:isDone?color:'transparent',
            display:'flex',alignItems:'center',justifyContent:'center',
            transition:'all .15s'}}>
          {isDone&&<span style={{color:'#fff',fontSize:12,fontWeight:900}}>✓</span>}
        </button>

        {/* Title + tag */}
        <div style={{flex:1,minWidth:0}}>
          <div onClick={()=>setExpanded(e=>!e)} role="button" tabIndex={0}
            onKeyDown={e=>e.key==='Enter'&&setExpanded(x=>!x)}
            style={{fontSize:13,fontWeight:500,lineHeight:1.55,cursor:'pointer',
              color:isDone?'var(--t3)':'var(--t1)',
              textDecoration:isDone?'line-through':'none',
              transition:'color .15s',userSelect:'none'}}>
            {t.text}
          </div>
          <div style={{display:'flex',gap:5,marginTop:5,flexWrap:'wrap',alignItems:'center'}}>
            {/* Tag */}
            <span style={{padding:'1px 7px',borderRadius:99,fontSize:9,fontWeight:600,
              background:`${color}15`,color,letterSpacing:.3,textTransform:'uppercase',
              border:`1px solid ${color}30`}}>
              {t.tag}
            </span>
            {/* Timer display */}
            {timeMs>0 && !isActive && (
              <span style={{fontSize:10,color:'var(--t3)',fontFamily:'var(--font-mono)'}}>
                ⏱ {fmtMs(timeMs)}
              </span>
            )}
            {/* Grasp badge */}
            {gInfo && (
              <span style={{padding:'1px 7px',borderRadius:99,fontSize:9,fontWeight:600,
                background:gInfo.bg,color:gInfo.color,border:`1px solid ${gInfo.color}30`}}>
                {gInfo.emoji} {gInfo.label}
              </span>
            )}
            {/* Note indicator */}
            {hasNote && <span style={{fontSize:10,color:'var(--t3)'}}>📝</span>}
          </div>
        </div>

        {/* Expand toggle */}
        <button onClick={()=>setExpanded(e=>!e)}
          style={{width:26,height:26,borderRadius:7,border:'1px solid var(--border)',
            background:'var(--bg-glass2)',color:'var(--t3)',fontSize:11,
            display:'flex',alignItems:'center',justifyContent:'center',
            cursor:'pointer',flexShrink:0,transition:'all .15s'}}>
          {expanded?'▲':'▼'}
        </button>
      </div>

      {/* ── EXPANDED DETAIL PANEL ── */}
      {expanded && (
        <div style={{borderTop:'1px solid var(--border)',padding:'14px',
          background:'var(--bg-base)',display:'flex',flexDirection:'column',gap:12}}>

          {/* Video section */}
          <div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:8}}>
              <div style={{fontFamily:'var(--font-mono)',fontSize:9,color:'var(--t3)',
                letterSpacing:2,textTransform:'uppercase'}}>▶ Video Tutorial</div>
              {/* EN / HI toggle */}
              <div style={{display:'flex',gap:2,background:'var(--bg-glass2)',
                borderRadius:8,padding:2,border:'1px solid var(--border)'}}>
                {[['en','🇬🇧 EN'],['hi','🇮🇳 HI']].map(([lang,lbl])=>(
                  <button key={lang} onClick={()=>setVidLang(lang)}
                    style={{padding:'3px 10px',borderRadius:6,border:'1px solid',
                      fontSize:10,fontWeight:500,cursor:'pointer',transition:'all .15s',
                      background:vidLang===lang?`${color}18`:'transparent',
                      color:vidLang===lang?color:'var(--t3)',
                      borderColor:vidLang===lang?`${color}35`:'transparent'}}>
                    {lbl}
                  </button>
                ))}
              </div>
            </div>
            {videoUrl ? (
              <a href={videoUrl} target="_blank" rel="noopener noreferrer"
                style={{display:'flex',alignItems:'center',gap:10,padding:'10px 12px',
                  borderRadius:10,background:`${color}10`,
                  border:`1px solid ${color}25`,textDecoration:'none',
                  transition:'all .18s'}}
                onMouseEnter={e=>{e.currentTarget.style.background=`${color}20`}}
                onMouseLeave={e=>{e.currentTarget.style.background=`${color}10`}}>
                <div style={{width:36,height:36,borderRadius:8,background:'#ff0000',
                  display:'flex',alignItems:'center',justifyContent:'center',
                  flexShrink:0,fontSize:14}}>▶</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontFamily:'var(--font-body)',fontSize:13,fontWeight:600,
                    color:'var(--t1)',marginBottom:2}}>
                    {videoLabel||'Watch Tutorial'}
                  </div>
                  <div style={{fontFamily:'var(--font-mono)',fontSize:9,color:'var(--t3)',
                    letterSpacing:.3,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                    {videoUrl}
                  </div>
                </div>
                <span style={{color:'var(--t3)',fontSize:14,flexShrink:0}}>↗</span>
              </a>
            ) : (
              <div style={{padding:'10px 12px',borderRadius:10,background:'var(--bg-glass2)',
                border:'1px solid var(--border)',fontFamily:'var(--font-body)',
                fontSize:12,color:'var(--t3)',textAlign:'center'}}>
                Video coming soon
              </div>
            )}
          </div>

          {/* Subtopics */}
          {t.subtopics && t.subtopics.length > 0 && (
            <div>
              <div style={{fontFamily:'var(--font-mono)',fontSize:9,color:'var(--t3)',
                letterSpacing:2,textTransform:'uppercase',marginBottom:8}}>
                📋 Subtopics ({t.subtopics.length})
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:4}}>
                {t.subtopics.map((sub,si)=>(
                  <div key={si}
                    style={{display:'flex',alignItems:'center',gap:8,padding:'7px 10px',
                      borderRadius:8,border:`1px solid ${subDone[si]?color+'44':'var(--border)'}`,
                      background:subDone[si]?`${color}08`:'var(--bg-glass)',
                      transition:'all .15s'}}>
                    <button onClick={()=>toggleSub(si)}
                      style={{width:18,height:18,borderRadius:5,cursor:'pointer',flexShrink:0,
                        border:`2px solid ${subDone[si]?color:'var(--border2)'}`,
                        background:subDone[si]?color:'transparent',
                        color:'#fff',fontSize:10,fontWeight:900,
                        display:'flex',alignItems:'center',justifyContent:'center',
                        transition:'all .2s'}}>
                      {subDone[si]?'✓':''}
                    </button>
                    <span style={{fontFamily:'var(--font-mono)',fontSize:10,color,
                      fontWeight:600,flexShrink:0,opacity:.7}}>
                      {String(si+1).padStart(2,'0')}
                    </span>
                    <span style={{fontFamily:'var(--font-body)',fontSize:12,
                      color:subDone[si]?'var(--t3)':'var(--t1)',flex:1,lineHeight:1.4,
                      textDecoration:subDone[si]?'line-through':'none'}}>
                      {sub.text}
                    </span>
                    {sub.yt && (
                      <a href={sub.yt} target="_blank" rel="noopener noreferrer"
                        onClick={e=>e.stopPropagation()}
                        style={{fontSize:10,color:'#ff0000',flexShrink:0,textDecoration:'none',
                          padding:'2px 6px',borderRadius:4,border:'1px solid rgba(255,0,0,.2)'}}>
                        ▶ YT
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* GitHub repos */}
          {t.github && t.github.length > 0 && (
            <div>
              <div style={{fontFamily:'var(--font-mono)',fontSize:9,color:'var(--t3)',
                letterSpacing:2,textTransform:'uppercase',marginBottom:8}}>
                🐙 Best GitHub Repos
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:4}}>
                {t.github.map((repo,ri)=>(
                  <a key={ri} href={repo.url} target="_blank" rel="noopener noreferrer"
                    style={{display:'flex',alignItems:'flex-start',gap:8,padding:'8px 10px',
                      borderRadius:8,border:'1px solid var(--border)',
                      background:'var(--bg-glass)',textDecoration:'none',
                      transition:'background .15s'}}
                    onMouseEnter={e=>{e.currentTarget.style.background='var(--bg-glass2)'}}
                    onMouseLeave={e=>{e.currentTarget.style.background='var(--bg-glass)'}}>
                    <span style={{fontSize:14,flexShrink:0}}>📦</span>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontFamily:'var(--font-mono)',fontSize:12,fontWeight:600,
                        color,marginBottom:2}}>{repo.name}</div>
                      <div style={{fontFamily:'var(--font-body)',fontSize:11,
                        color:'var(--t3)',lineHeight:1.4}}>{repo.desc}</div>
                    </div>
                    {repo.stars && (
                      <span style={{fontFamily:'var(--font-mono)',fontSize:10,
                        color:'var(--amber)',flexShrink:0}}>⭐ {repo.stars}</span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Official resource */}
          {t.resource && (
            <div>
              <div style={{fontFamily:'var(--font-mono)',fontSize:9,color:'var(--t3)',
                letterSpacing:2,textTransform:'uppercase',marginBottom:6}}>
                📖 Official Resource
              </div>
              <a href={t.resource.url} target="_blank" rel="noopener noreferrer"
                style={{display:'flex',alignItems:'center',gap:8,padding:'8px 10px',
                  borderRadius:8,border:'1px solid var(--border)',
                  background:'var(--bg-glass)',textDecoration:'none'}}>
                <span style={{fontSize:14}}>🔗</span>
                <span style={{fontFamily:'var(--font-body)',fontSize:12,color:'var(--t1)',flex:1}}>
                  {t.resource.title}
                </span>
                <span style={{color:'var(--t3)',fontSize:12}}>↗</span>
              </a>
            </div>
          )}

          {/* Action bar: Grasp + Timer + Note */}
          <div style={{display:'flex',gap:6,flexWrap:'wrap',alignItems:'center',
            paddingTop:8,borderTop:'1px solid var(--border)'}}>
            <GraspPills id={t.id} grasp={grasp} set={setTopicGrasp}/>
            <div style={{marginLeft:'auto',display:'flex',gap:6}}>
              <button onClick={e=>{e.stopPropagation();isActive?stopTimer(t.id):startTimer(t.id)}}
                className={`tbtn${isActive?' run':''}`}
                style={{minWidth:80}}
                aria-label={isActive?'Stop timer':'Start timer'}>
                {isActive ? `⏸ ${fmtMs(elapsed)||'0s'}` : timeMs>0 ? `⏱ ${fmtMs(timeMs)}` : '▶ Timer'}
              </button>
              <button onClick={()=>setNoteOpen(n=>!n)}
                className="tbtn"
                style={{minWidth:70,background:hasNote?`${color}15`:'transparent',
                  color:hasNote?color:'var(--t3)',
                  borderColor:hasNote?`${color}30`:'var(--border)'}}>
                {hasNote ? '📝 Edit' : '+ Note'}
              </button>
            </div>
          </div>

          {/* Note box */}
          {noteOpen && (
            <NoteBox id={t.id} notes={notes} setNote={setTopicNote} color={color}/>
          )}
        </div>
      )}
    </div>
  )
}

// ── HEX LOGO ──────────────────────────────────────────────────────────────────

// ── HEADER ────────────────────────────────────────────────────────────────────
function HexLogo({ size=34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="hg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee"/>
          <stop offset="100%" stopColor="#a78bfa"/>
        </linearGradient>
      </defs>
      <polygon points="20,2 36,11 36,29 20,38 4,29 4,11"
        stroke="url(#hg)" strokeWidth="1.8" fill="rgba(34,211,238,.06)"
        style={{filter:'drop-shadow(0 0 6px rgba(34,211,238,.5))'}}/>
      <polygon points="20,10 29,15 29,25 20,30 11,25 11,15"
        stroke="rgba(167,139,250,.4)" strokeWidth=".8" fill="none"/>
      <circle cx="20" cy="20" r="4" fill="url(#hg)"
        style={{filter:'drop-shadow(0 0 4px rgba(34,211,238,.8))'}}/>
      {[0,60,120,180,240,300].map((deg,i)=>{
        const r=deg*Math.PI/180
        return <line key={i} x1={20+4*Math.cos(r)} y1={20+4*Math.sin(r)} x2={20+13*Math.cos(r)} y2={20+13*Math.sin(r)} stroke="url(#hg)" strokeWidth=".9" opacity=".65"/>
      })}
    </svg>
  )
}

function Header({ stats, view, setView, user, logout, onReset, isPro, onUpgrade, onAdmin, theme, setTheme }) {
  const [menu, setMenu] = useState(false)
  const NAV = [['◈','Map','map'],['⬡','Learn','weekly'],['◉','Stats','stats'],['⬢','Community','community'],['◫','Resources','resources']]
  const isOn = v => v==='weekly' ? ['weekly','daily','tracker'].includes(view) : view===v

  return (
    <header className="hdr" role="banner">
      <div className="hdr-scan" aria-hidden="true"/>

      {/* Logo */}
      <a className="logo" href="#" aria-label="Neural Protocol" onClick={e=>{e.preventDefault();startTransition(()=>setView('map'))}}>
        <div className="logo-mark"><HexLogo/></div>
        <div>
          <div className="logo-name">NEURAL PROTOCOL</div>
          <div className="logo-sub d-only">AI ENGINEER OS v2026</div>
        </div>
      </a>

      {/* Progress */}
      <div style={{flex:1,display:'flex',alignItems:'center',gap:10,minWidth:40,maxWidth:260}}>
        <div style={{flex:1,height:3,background:'var(--border)',borderRadius:99,overflow:'hidden'}}>
          <div className="pbar" style={{width:`${stats.pct}%`,borderRadius:99}}/>
        </div>
        <span className="d-only" style={{fontFamily:'var(--font-display)',fontSize:11,fontWeight:700,
          background:'linear-gradient(135deg,var(--cyan),var(--violet))',
          WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',
          backgroundClip:'text',flexShrink:0}}>
          {stats.pct}%
        </span>
      </div>

      {/* Desktop Nav */}
      <nav className="dnav d-only" aria-label="Main navigation">
        {NAV.map(([ic,lb,v])=>(
          <button key={v} onClick={()=>{playNav();startTransition(()=>setView(v==='weekly'&&['weekly','daily','tracker'].includes(view)?view:v))}} className={`dtab${isOn(v)?' on':''}`}
            aria-current={isOn(v)?'page':undefined}>
            <span style={{marginRight:5,opacity:.7,fontSize:12}}>{ic}</span>{lb}
          </button>
        ))}
      </nav>

      {/* Right */}
      <div style={{display:'flex',alignItems:'center',gap:8,flexShrink:0}}>
        {/* Theme toggle */}
        <button onClick={()=>setTheme(t=>t==='dark'?'light':'dark')}
          aria-label={`Switch to ${theme==='dark'?'light':'dark'} mode`}
          style={{width:34,height:34,borderRadius:'var(--r)',border:'1px solid var(--border)',
            background:'var(--bg-glass)',color:'var(--t2)',fontSize:15,
            display:'flex',alignItems:'center',justifyContent:'center',transition:'all .18s'}}>
          {theme==='dark'?'☀':'🌙'}
        </button>

        {!isPro&&(
          <button onClick={onUpgrade} className="btn btn-primary d-only"
            style={{padding:'6px 16px',fontSize:12,letterSpacing:.3}}>
            ⚡ Upgrade
          </button>
        )}

        {/* Avatar */}
        <div style={{position:'relative'}}>
          <button onClick={()=>setMenu(o=>!o)} aria-label="Account menu" aria-expanded={menu}
            style={{width:34,height:34,borderRadius:'var(--r)',
              border:`1px solid ${menu?'var(--border-c)':'var(--border2)'}`,
              background:'var(--bg-glass2)',
              color:'var(--t1)',fontFamily:'var(--font-display)',fontSize:13,fontWeight:700,
              display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s',
              boxShadow:menu?'0 0 12px rgba(34,211,238,.2)':'none'}}>
            {(user?.name||user?.email||'U')[0].toUpperCase()}
          </button>
          {menu&&(
            <div style={{position:'absolute',right:0,top:42,
              background:'var(--bg-surface)',backdropFilter:'blur(20px)',
              border:'1px solid var(--border2)',borderRadius:'var(--r3)',
              padding:6,minWidth:210,boxShadow:'var(--shadow-xl)',
              zIndex:300,animation:'scaleIn .2s ease both'}}>
              <div style={{padding:'10px 14px 10px',borderBottom:'1px solid var(--border)',marginBottom:5}}>
                <div style={{fontFamily:'var(--font-display)',fontSize:13,fontWeight:600,color:'var(--t1)'}}>{user?.name||user?.email?.split('@')[0]}</div>
                <div style={{fontFamily:'var(--font-mono)',fontSize:9,color:'var(--t3)',marginTop:2}}>{user?.email}</div>
                <div style={{marginTop:6}}>
                  {isPro
                    ?<span className="badge badge-amber">⚡ PRO MEMBER</span>
                    :<span className="badge badge-cyan">FREE TIER</span>}
                </div>
              </div>
              {!isPro&&<MI onClick={()=>{setMenu(false);onUpgrade()}} c="var(--cyan)">⚡ Upgrade to Pro</MI>}
              <MI onClick={()=>{setMenu(false);onAdmin()}} c="var(--amber)">⬡ Admin Panel</MI>
              <MI onClick={()=>{setMenu(false);onReset()}} c="var(--t2)">↺ Reset Progress</MI>
              <MI onClick={()=>{setMenu(false);logout()}} c="var(--rose)">⏻ Sign Out</MI>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

function MI({onClick,c,children}){
  return(
    <button onClick={onClick} style={{
      width:'100%',padding:'6px 12px',background:'transparent',border:'none',
      color:c,fontFamily:'var(--font-mono)',fontSize:9,fontWeight:600,letterSpacing:1.5,
      cursor:'none',textAlign:'left',borderRadius:'var(--r)',transition:'background .1s',
      textTransform:'uppercase',display:'block',
    }}
    onMouseEnter={e=>e.currentTarget.style.background='rgba(34,211,238,.05)'}
    onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
      {children}
    </button>
  )
}

function MenuItem({ onClick, color, children }) {
  return (
    <button role="menuitem" onClick={onClick} style={{
      width:'100%',padding:'8px 12px',background:'transparent',border:'none',
      color,fontSize:12,fontWeight:600,cursor:'pointer',textAlign:'left',
      borderRadius:8,transition:'background .1s',display:'block'
    }}
    onMouseEnter={e=>e.currentTarget.style.background='var(--surface2)'}
    onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
      {children}
    </button>
  )
}

// ── SIDEBAR ───────────────────────────────────────────────────────────────────
function Sidebar({ activePhase, setActivePhase, done, grasp, setView, setWeek, setDay, isPhaseUnlocked, onUpgrade }) {
  return (
    <aside style={{position:'sticky',top:72,maxHeight:'calc(100vh - 88px)',overflowY:'auto',
      display:'flex',flexDirection:'column',gap:3}} aria-label="Phase selector">
      <div style={{fontFamily:'var(--font-mono)',fontSize:7,color:'var(--t3)',
        letterSpacing:2.5,textTransform:'uppercase',padding:'0 10px 8px',
        borderBottom:'1px solid var(--border)',marginBottom:4}}>
        // PHASES
      </div>
      {PHASES.map((p,i)=>{
        const ts  = p.weeks_data.flatMap(w=>w.days.flatMap(d=>d.topics))
        const pct = ts.length ? Math.round(ts.filter(t=>done[t.id]).length/ts.length*100) : 0
        const locked = !isPhaseUnlocked(p.id)
        return (
          <button key={p.id} onClick={()=>locked?onUpgrade():setActivePhase(i)}
            className={`phase-btn${activePhase===i?' active':''}`}
            aria-current={activePhase===i?'true':undefined}
            aria-label={`Phase ${p.id}: ${p.name} — ${locked?'locked':pct+'% complete'}`}
            title={p.name}>
            <span style={{fontSize:16,flexShrink:0,filter:locked?'grayscale(1)':'none'}}>{p.emoji}</span>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontFamily:'var(--font-mono)',fontSize:8.5,fontWeight:600,
                letterSpacing:.5,color:locked?'var(--t3)':activePhase===i?'var(--cyan)':'var(--t2)',
                whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',
                textTransform:'uppercase'}}>
                P{p.id}: {p.name}
              </div>
              {!locked && (
                <div style={{height:2,background:'var(--border)',borderRadius:0,marginTop:4,overflow:'hidden'}}>
                  <div style={{height:'100%',width:`${pct}%`,background:p.color,
                    boxShadow:`0 0 4px ${p.color}88`,transition:'width .5s ease'}}/>
                </div>
              )}
              {locked && (
                <div style={{fontFamily:'var(--font-mono)',fontSize:7,color:'var(--t3)',marginTop:2,letterSpacing:1}}>
                  ⬡ PRO REQUIRED
                </div>
              )}
            </div>
            {!locked && pct>0 && (
              <span style={{fontFamily:'var(--font-display)',fontSize:8,color:pct===100?'var(--cyan)':'var(--t3)',
                flexShrink:0,letterSpacing:.5}}>{pct}%</span>
            )}
          </button>
        )
      })}
    </aside>
  )
}

// ── WEEKLY VIEW ───────────────────────────────────────────────────────────────
function WeeklyView({ phase, weekIdx, setWeekIdx, setDay, setView, done, grasp, notes, times, timer, toggleDone, setTopicGrasp, setTopicNote, startTimer, stopTimer }) {
  const wk = phase.weeks_data[weekIdx]
  if (!wk) return null
  const dayDone = d => d.topics.filter(t=>done[t.id]).length
  const dayPct  = d => Math.round(dayDone(d)/d.topics.length*100)

  return (
    <div className="fade-up">
      {/* Phase hero */}
      <div style={{marginBottom:14,padding:'18px 22px',
        background:`linear-gradient(135deg,${phase.glow},rgba(5,5,8,.8))`,
        border:`1px solid ${phase.color}33`,borderRadius:16,position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${phase.color},transparent)`}}/>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:12}}>
          <div style={{display:'flex',alignItems:'center',gap:14}}>
            <MiniOrb color={phase.color||'#22d3ee'} size={52}/>           <div>
              <div style={{fontSize:9,color:phase.color,fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase'}}>
                Phase {phase.id} · {phase.duration}
              </div>
              <h2 style={{fontWeight:800,fontSize:19,color:'var(--t1)',letterSpacing:'-.02em'}}>{phase.name}</h2>
              <p style={{fontSize:12,color:'var(--t2)',marginTop:1}}>{phase.description}</p>
            </div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <Ring pct={phasePct(phase,done)} size={52} stroke={4} color={phase.color}/>
            <div>
              <div style={{fontSize:21,fontWeight:800,color:phase.color}}>{phasePct(phase,done)}%</div>
              <div style={{fontSize:9,color:'var(--t2)'}}>complete</div>
            </div>
          </div>
        </div>
      </div>

      {/* Week tabs */}
      {phase.weeks_data.length>1 && (
        <div style={{display:'flex',gap:5,marginBottom:12,flexWrap:'wrap'}}>
          {phase.weeks_data.map((w,i)=>(
            <button key={w.week} onClick={()=>{setWeekIdx(i);setDay(0)}}
              style={{padding:'5px 14px',borderRadius:99,cursor:'pointer',
                border:`1px solid ${weekIdx===i?phase.color:'var(--border)'}`,
                background:weekIdx===i?`${phase.color}15`:'transparent',
                color:weekIdx===i?phase.color:'var(--t2)',fontSize:11,fontWeight:600}}>
              Week {w.week}: {w.title}
            </button>
          ))}
        </div>
      )}

      {/* Day cards */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(168px,1fr))',gap:8,marginBottom:14}}>
        {wk.days.map((day,di)=>{
          const pct = dayPct(day)
          const wk2 = day.topics.filter(t=>grasp[t.id]==='weak').length
          const lt  = day.topics.filter(t=>grasp[t.id]==='later').length
          return (
            <div key={di} className="panel card-hover"
              onClick={()=>{setDay(di);startTransition(()=>setView('daily'))}}
              style={{padding:13,cursor:'pointer',borderColor:pct===100?phase.color+'44':''}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                <span style={{fontSize:10,fontWeight:800,color:phase.color,letterSpacing:'1.5px'}}>{day.day}</span>
                <span style={{fontSize:11,fontWeight:700,color:pct===100?'var(--cyan)':'var(--t2)'}}>
                  {pct===100?'✓':''}{dayDone(day)}/{day.topics.length}
                </span>
              </div>
              <div style={{fontSize:11,fontWeight:600,color:'var(--t1)',marginBottom:8,lineHeight:1.35}}>{day.label}</div>
              <div style={{height:3,background:'var(--bg-glass2)',borderRadius:2,overflow:'hidden',marginBottom:6}}>
                <div style={{height:'100%',width:`${pct}%`,background:`linear-gradient(90deg,${phase.color},${phase.color}88)`,borderRadius:2,transition:'width .5s'}}/>
              </div>
              {(wk2>0||lt>0)&&<div style={{display:'flex',gap:6}}>
                {wk2>0&&<span style={{fontSize:8,color:'var(--rose)'}}>😅{wk2}</span>}
                {lt>0 &&<span style={{fontSize:8,color:'#a855f7'}}>📌{lt}</span>}
              </div>}
            </div>
          )
        })}
      </div>

      {/* Full topic list */}
      <div className="glass" style={{overflow:'hidden'}}>
        <div style={{padding:'13px 18px',background:'var(--bg-glass)',borderBottom:'1px solid var(--border)',
          display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <span style={{fontWeight:700,fontSize:13}}>📋 Week {wk.week} — All Topics</span>
          <span style={{fontSize:10,color:'var(--t2)'}}>✓ tick · rate grasp · ▶ timer · + note</span>
        </div>
        {wk.days.map((day,di)=>(
          <div key={di}>
            <div style={{padding:'9px 18px',background:'var(--bg-glass)',borderBottom:'1px solid var(--border)',
              display:'flex',alignItems:'center',gap:10,cursor:'pointer'}}
              onClick={()=>{setDay(di);startTransition(()=>setView('daily'))}}>
              <span style={{fontSize:10,fontWeight:800,color:phase.color,width:30,flexShrink:0}}>{day.day}</span>
              <span style={{fontSize:11,fontWeight:600,color:'var(--t2)',flex:1}}>{day.label}</span>
              <a href={day.resourceUrl} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()}
                style={{fontSize:9,color:'var(--t3)',textDecoration:'none'}}>📚 {day.resource}</a>
            </div>
            {day.topics.map(t=>(
              <TopicRow key={t.id} t={t} done={done} grasp={grasp} notes={notes} times={times} timer={timer}
                toggleDone={toggleDone} setTopicGrasp={setTopicGrasp} setTopicNote={setTopicNote}
                startTimer={startTimer} stopTimer={stopTimer} color={phase.color}/>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── DAILY VIEW ────────────────────────────────────────────────────────────────
function DailyView({ phase, weekData, dayIdx, setDayIdx, done, grasp, notes, times, timer, toggleDone, setTopicGrasp, setTopicNote, startTimer, stopTimer }) {
  const [search, setSearch] = useState('')
  const [tagF,   setTagF]   = useState('All')
  const [copied, setCopied] = useState(false)
  const day = weekData?.days[dayIdx]
  if (!day) return null

  const doneCnt  = day.topics.filter(t=>done[t.id]).length
  const weakCnt  = day.topics.filter(t=>grasp[t.id]==='weak').length
  const laterCnt = day.topics.filter(t=>grasp[t.id]==='later').length
  const tags     = ['All',...new Set(day.topics.map(t=>t.tag))]
  const filtered = day.topics.filter(t=>
    (tagF==='All'||t.tag===tagF) &&
    (!search||t.text.toLowerCase().includes(search.toLowerCase())||t.tag.toLowerCase().includes(search.toLowerCase()))
  )
  const pct = Math.round(doneCnt/day.topics.length*100)

  return (
    <div className="fade-up">
      {/* Nav */}
      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:12}}>
        <button onClick={()=>dayIdx>0&&setDayIdx(d=>d-1)} disabled={dayIdx===0}
          style={{padding:'8px 16px',fontSize:18,borderRadius:10,border:'1px solid var(--border)',background:'var(--bg-glass)',color:'var(--t2)',cursor:'pointer',opacity:dayIdx===0?.3:1,transition:'all .15s',fontWeight:300}}>‹</button>
        <div style={{flex:1,padding:'12px 18px',
          background:`linear-gradient(135deg,${phase.glow},rgba(5,5,8,.6))`,
          border:`1px solid ${phase.color}44`,borderRadius:14,
          display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:8}}>
          <div>
            <div style={{fontSize:9,color:phase.color,fontWeight:700,letterSpacing:'1px',textTransform:'uppercase'}}>
              {phase.emoji} P{phase.id} · Wk{weekData.week} · {day.day}
            </div>
            <div style={{fontWeight:800,fontSize:17,color:'var(--t1)',marginTop:2,letterSpacing:'-.02em'}}>{day.label}</div>
            <a href={day.resourceUrl} target="_blank" rel="noreferrer"
              style={{fontSize:10,color:'var(--t2)'}}>📚 {day.resource} ↗</a>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <Ring pct={pct} size={44} stroke={4} color={phase.color}/>
            <div>
              <div style={{fontWeight:800,fontSize:18,color:phase.color}}>{doneCnt}/{day.topics.length}</div>
              <div style={{display:'flex',gap:5}}>
                {weakCnt>0  &&<span style={{fontSize:9,color:'#ef4444'}}>😅{weakCnt}</span>}
                {laterCnt>0 &&<span style={{fontSize:9,color:'#a855f7'}}>📌{laterCnt}</span>}
              </div>
            </div>
          </div>
        </div>
        <button onClick={()=>dayIdx<weekData.days.length-1&&setDayIdx(d=>d+1)}
          disabled={dayIdx===weekData.days.length-1}
          style={{padding:'8px 16px',fontSize:18,borderRadius:10,border:'1px solid var(--border)',background:'var(--bg-glass)',color:'var(--t2)',cursor:'pointer',opacity:dayIdx===weekData.days.length-1?.3:1,transition:'all .15s',fontWeight:300}}>›</button>
      </div>

      {/* Day tabs */}
      <div style={{display:'flex',gap:4,marginBottom:12,overflowX:'auto',paddingBottom:3}}>
        {weekData.days.map((d,i)=>{
          const cnt = d.topics.filter(t=>done[t.id]).length
          const wk  = d.topics.filter(t=>grasp[t.id]==='weak').length
          return (
            <button key={i} onClick={()=>setDayIdx(i)}
              style={{padding:'4px 11px',borderRadius:99,flexShrink:0,cursor:'pointer',
                border:`1px solid ${dayIdx===i?phase.color:'var(--border)'}`,
                background:dayIdx===i?`${phase.color}15`:'transparent',
                color:dayIdx===i?phase.color:'var(--t2)',fontSize:10,fontWeight:700}}>
              {d.day} {cnt===d.topics.length?'✓':`${cnt}/${d.topics.length}`}{wk>0?` 😅${wk}`:''}
            </button>
          )
        })}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:14}}>
        {/* Topics panel */}
        <div>
          <div style={{display:'flex',gap:7,marginBottom:8}}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search topics..."
              style={{flex:1,padding:'8px 12px',borderRadius:9,border:'1px solid var(--border)',background:'var(--bg-glass)',color:'var(--t1)',fontSize:12,outline:'none',fontFamily:'var(--font-mono)'}}/>
          </div>
          <div style={{display:'flex',gap:4,marginBottom:8,flexWrap:'wrap'}}>
            {tags.map(tag=>(
              <button key={tag} onClick={()=>setTagF(tag===tagF?'All':tag)}
                style={{padding:'2px 10px',borderRadius:99,cursor:'pointer',
                  border:`1px solid ${tagF===tag?phase.color:'var(--border)'}`,
                  background:tagF===tag?`${phase.color}15`:'transparent',
                  color:tagF===tag?phase.color:'var(--t2)',fontSize:9,fontWeight:700}}>
                {tag}
              </button>
            ))}
          </div>

          {/* grasp legend */}
          <div style={{background:'var(--bg-surface)',border:'1px solid var(--border)',borderRadius:10,
            padding:'8px 14px',marginBottom:10,display:'flex',alignItems:'center',gap:10,flexWrap:'wrap'}}>
            <span style={{fontSize:9,color:'var(--t3)',fontWeight:600,flexShrink:0}}>Rate grasp →</span>
            {Object.entries(GRASP).map(([k,g])=>(
              <span key={k} style={{fontSize:9,color:g.color,fontWeight:600}}>{g.emoji} {g.label}</span>
            ))}
            <span style={{fontSize:9,color:'var(--t3)',marginLeft:'auto'}}>▶ timer tracks time per topic</span>
          </div>

          <div className="glass" style={{overflow:'hidden'}}>
            <div style={{padding:'11px 18px',background:'var(--bg-glass)',borderBottom:'1px solid var(--border)',
              display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <span style={{fontWeight:700,fontSize:13}}>📋 Today's Topics</span>
              <span style={{fontSize:10,color:'var(--t2)'}}>{filtered.length} showing</span>
            </div>
            {filtered.map(t=>(
              <TopicRow key={t.id} t={t} done={done} grasp={grasp} notes={notes} times={times} timer={timer}
                toggleDone={toggleDone} setTopicGrasp={setTopicGrasp} setTopicNote={setTopicNote}
                startTimer={startTimer} stopTimer={stopTimer} color={phase.color}/>
            ))}
          </div>
        </div>

        {/* Sticky right panel */}
        <div>
          <div className="panel daily-side" style={{overflow:'hidden',position:'sticky',top:'calc(var(--hh) + 8px)'}}>
            <div style={{padding:'12px 16px',background:'rgba(52,211,153,.08)',
              borderBottom:'1px solid rgba(52,211,153,.15)',display:'flex',alignItems:'center',gap:8}}>
              <span style={{fontSize:20}}>🤖</span>
              <div>
                <div style={{fontWeight:700,fontSize:12,color:'var(--cyan)'}}>ChatGPT Prompt — Today</div>
                <div style={{fontSize:9,color:'var(--cyan)',letterSpacing:'1px',textTransform:'uppercase'}}>GPT-4o recommended</div>
              </div>
            </div>
            <div style={{padding:14}}>
              <div style={{fontSize:11,color:'var(--t2)',lineHeight:1.75,background:'var(--bg-base)',
                borderRadius:10,padding:12,marginBottom:10,border:'1px solid var(--border)',
                maxHeight:160,overflowY:'auto',whiteSpace:'pre-wrap'}}>
                {day.chatgpt}
              </div>
              <button onClick={()=>{navigator.clipboard.writeText(day.chatgpt).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000)})}}
                style={{width:'100%',borderRadius:'var(--r)',cursor:'pointer',fontFamily:'var(--font-mono)',background:copied?'rgba(34,211,238,.07)':'transparent',border:'1px solid var(--border2)',color:'var(--cyan)',fontWeight:700,padding:'9px',fontSize:11}}>
                {copied?'✓ Copied!':'📋 Copy Prompt'}
              </button>
            </div>
            <div style={{padding:'0 14px 14px'}}>
              <div style={{background:'var(--bg-base)',borderRadius:10,border:'1px solid var(--border)',padding:12}}>
                <div style={{fontSize:9,color:'#a855f7',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',marginBottom:8}}>
                  ⏰ 2–3hr Daily Schedule
                </div>
                {[['0:00–0:10','🔁 Review yesterday'],['0:10–0:50','📺 Watch + notes'],
                  ['0:50–1:50','💻 Code along'],['1:50–2:30','🔨 Build / practice'],
                  ['2:30–3:00','⬆️ Push to GitHub']].map(([tm,lb])=>(
                  <div key={tm} style={{display:'flex',gap:8,marginBottom:4,alignItems:'center'}}>
                    <span style={{fontFamily:'var(--font-mono)',fontSize:8,color:'var(--t3)',width:68,flexShrink:0}}>{tm}</span>
                    <span style={{fontSize:10,color:'var(--t2)',background:'var(--bg-surface)',padding:'2px 8px',borderRadius:6,flex:1}}>{lb}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── TRACKER VIEW ──────────────────────────────────────────────────────────────
function TrackerView({ done, grasp, notes, times, toggleDone, setTopicGrasp, setTopicNote }) {
  const [tab,    setTab]    = useState('backlog')
  const [phaseF, setPhaseF] = useState('All')
  const all = allTopics()

  const weak   = all.filter(t=>grasp[t.id]==='weak')
  const later  = all.filter(t=>grasp[t.id]==='later')
  const mid    = all.filter(t=>grasp[t.id]==='mid')
  const notDone= all.filter(t=>!done[t.id])
  const backlog= all.filter(t=>!done[t.id]||grasp[t.id]==='weak'||grasp[t.id]==='later'||notes[t.id]?.trim())

  const phases  = ['All',...PHASES.map(p=>`P${p.id}: ${p.name}`)]
  const byPhase = arr => phaseF==='All'?arr:arr.filter(t=>`P${t.phaseId}: ${t.phaseName}`===phaseF)

  const chartData = PHASES.map(p=>{
    const ts = p.weeks_data.flatMap(w=>w.days.flatMap(d=>d.topics))
    return { ...p, total:ts.length,
      done:   ts.filter(t=>done[t.id]).length,
      strong: ts.filter(t=>grasp[t.id]==='strong').length,
      mid:    ts.filter(t=>grasp[t.id]==='mid').length,
      weak:   ts.filter(t=>grasp[t.id]==='weak').length,
      later:  ts.filter(t=>grasp[t.id]==='later').length,
    }
  })

  const Pill = ({id,label,count,color}) => (
    <button onClick={()=>setTab(id)}
      style={{padding:'6px 14px',borderRadius:99,cursor:'pointer',display:'flex',alignItems:'center',gap:5,
        border:`1px solid ${tab===id?'var(--cyan)':'var(--border)'}`,
        background:tab===id?'rgba(34,211,238,.06)':'transparent',
        color:tab===id?'var(--cyan)':'var(--t2)',fontSize:11,fontWeight:700}}>
      {label}
      {count>0&&<span style={{fontSize:9,background:`${color}33`,color,borderRadius:99,padding:'1px 6px',fontWeight:800}}>{count}</span>}
    </button>
  )

  const Card = ({t}) => {
    const g = grasp[t.id]
    return (
      <div className="glass" style={{padding:14,borderColor:g&&GRASP[g]?GRASP[g].color+'33':'',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',left:0,top:0,bottom:0,width:3,background:t.phaseColor}}/>
        <div style={{paddingLeft:10}}>
          <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:7,flexWrap:'wrap'}}>
            <span style={{fontSize:9,color:t.phaseColor,fontWeight:700}}>{t.phaseEmoji} P{t.phaseId} · Wk{t.weekNum} · {t.dayLabel}</span>
            <PhaseTag label={t.tag} color={t.phaseColor}/>
            <YTBtn url={t.yt} label={t.ytLabel}/>
            <HindiYTBtn url={t.hindiYt} label={t.hindiYtLabel}/>
            {times[t.id]>0&&<span className="tbtn">⏱ {fmtMs(times[t.id])}</span>}
          </div>
          <div style={{fontSize:13,color:'var(--t1)',lineHeight:1.55,marginBottom:10}}>{t.text}</div>
          <div style={{display:'flex',alignItems:'center',gap:8,flexWrap:'wrap',marginBottom:4}}>
            <button onClick={()=>toggleDone(t.id)}
              aria-label={done[t.id]?'Mark undone':'Mark done'}
              style={{
                width:26,height:26,borderRadius:8,cursor:'pointer',
                border:`2px solid ${done[t.id]?color:'var(--border2)'}`,
                background:done[t.id]?color:'transparent',
                color:done[t.id]?'#fff':'transparent',
                display:'flex',alignItems:'center',justifyContent:'center',
                fontSize:14,fontWeight:900,flexShrink:0,
                transition:'all .2s cubic-bezier(.16,1,.3,1)',
                boxShadow:done[t.id]?`0 0 12px ${color}66`:'none',
              }}>
              {done[t.id]?'✓':''}
            </button>
            <GraspPills id={t.id} grasp={grasp} set={setTopicGrasp}/>
          </div>
          <NoteBox id={t.id} notes={notes} setNote={setTopicNote} color={t.phaseColor}/>
        </div>
      </div>
    )
  }

  return (
    <div className="fade-up">
      <div className="glass" style={{padding:'16px 20px',marginBottom:16}}>
        <h2 style={{fontSize:18,fontWeight:800,marginBottom:4}}>📌 Progress Tracker & Backlog</h2>
        <p style={{color:'var(--t2)',fontSize:13}}>Rate topics 💪/🤔/😅/📌 → they auto-appear here. ▶ Timer tracks how long each topic takes.</p>
      </div>

      {/* Stats row */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(130px,1fr))',gap:8,marginBottom:16}}>
        {[
          ['Total',    all.length,                        "var(--cyan)"],
          ['✓ Done',   all.filter(t=>done[t.id]).length,  'var(--cyan)'],
          ['💪 Strong',Object.values(grasp).filter(v=>v==='strong').length,'var(--cyan)'],
          ['🤔 Mid',   Object.values(grasp).filter(v=>v==='mid').length,   '#f59e0b'],
          ['😅 Weak',  weak.length,                       '#ef4444'],
          ['📌 Later', later.length,                      '#a855f7'],
          ['Not Done', notDone.length,                    '#f97316'],
          ['Backlog',  backlog.length,                    '#ef4444'],
        ].map(([lb,v,c])=>(
          <div key={lb} style={{background:'var(--bg-surface)',border:`1px solid ${c}22`,borderRadius:'var(--r2)',padding:'12px 14px',textAlign:'center'}}>
            <div style={{fontSize:22,fontWeight:800,color:c}}>{v}</div>
            <div style={{fontSize:10,color:'var(--t2)',marginTop:2}}>{lb}</div>
          </div>
        ))}
      </div>

      {/* Grasp chart */}
      <div className="glass" style={{padding:'16px 18px',marginBottom:16}}>
        <div style={{fontWeight:700,fontSize:13,marginBottom:14}}>📈 Grasp Distribution by Phase</div>
        <div style={{display:'flex',flexDirection:'column',gap:9}}>
          {chartData.map(p=>(
            <div key={p.id} style={{display:'flex',alignItems:'center',gap:10}}>
              <div style={{width:62,fontSize:10,color:p.color,fontWeight:700,flexShrink:0,textAlign:'right'}}>
                {p.emoji} P{p.id}
              </div>
              <div style={{flex:1,height:20,background:'var(--bg-glass2)',borderRadius:99,overflow:'hidden',display:'flex'}}>
                {p.strong>0&&<div style={{width:`${p.strong/p.total*100}%`,background:'var(--cyan)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  {p.strong/p.total>.1&&<span style={{fontSize:8,color:'#000',fontWeight:800}}>{p.strong}</span>}
                </div>}
                {p.mid>0&&<div style={{width:`${p.mid/p.total*100}%`,background:'#f59e0b',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  {p.mid/p.total>.1&&<span style={{fontSize:8,color:'#000',fontWeight:800}}>{p.mid}</span>}
                </div>}
                {p.weak>0&&<div style={{width:`${p.weak/p.total*100}%`,background:'#ef4444',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  {p.weak/p.total>.1&&<span style={{fontSize:8,color:'#000',fontWeight:800}}>{p.weak}</span>}
                </div>}
                {p.later>0&&<div style={{width:`${p.later/p.total*100}%`,background:'#a855f7',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  {p.later/p.total>.1&&<span style={{fontSize:8,color:'#000',fontWeight:800}}>{p.later}</span>}
                </div>}
              </div>
              <div style={{width:35,fontSize:10,color:'var(--t2)',flexShrink:0}}>{Math.round(p.done/p.total*100)}%</div>
            </div>
          ))}
        </div>
        <div style={{display:'flex',gap:12,marginTop:12,flexWrap:'wrap'}}>
          {[['var(--cyan)','💪 Strong'],['#f59e0b','🤔 Mid'],['#ef4444','😅 Weak'],['#a855f7','📌 Later']].map(([c,l])=>(
            <div key={l} style={{display:'flex',alignItems:'center',gap:5}}>
              <div style={{width:10,height:10,borderRadius:2,background:c}}/>
              <span style={{fontSize:10,color:'var(--t2)'}}>{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{display:'flex',gap:5,marginBottom:10,flexWrap:'wrap'}}>
        <Pill id="backlog" label="📋 Backlog"    count={backlog.length} color="#f97316"/>
        <Pill id="weak"    label="😅 Weak"       count={weak.length}   color="#ef4444"/>
        <Pill id="later"   label="📌 Later"      count={later.length}  color="#a855f7"/>
        <Pill id="mid"     label="🤔 Mid"        count={mid.length}    color="#f59e0b"/>
        <Pill id="plan"    label="🎯 Study Plan" count={0}             color="#6366f1"/>
      </div>

      {tab!=='plan'&&(
        <div style={{display:'flex',gap:4,marginBottom:10,overflowX:'auto',paddingBottom:3}}>
          {phases.map(ph=>(
            <button key={ph} onClick={()=>setPhaseF(ph)}
              style={{padding:'3px 10px',borderRadius:99,flexShrink:0,cursor:'pointer',
                border:`1px solid ${phaseF===ph?"var(--cyan)":'var(--border)'}`,
                background:phaseF===ph?'rgba(34,211,238,.06)':'transparent',
                color:phaseF===ph?'var(--cyan)':'var(--t2)',fontSize:9,fontWeight:700}}>
              {ph}
            </button>
          ))}
        </div>
      )}

      {tab==='backlog'&&(
        <div>
          <div style={{fontSize:11,color:'var(--t2)',marginBottom:10}}>Not done · Weak · Later · Has note — {byPhase(backlog).length} items</div>
          {byPhase(backlog).length===0
            ?<div style={{padding:'40px',textAlign:'center',color:'var(--t2)',fontSize:14}}>🎉 Backlog empty!</div>
            :<div style={{display:'flex',flexDirection:'column',gap:8}}>{byPhase(backlog).map(t=><Card key={t.id} t={t}/>)}</div>}
        </div>
      )}
      {tab==='weak'&&(
        <div>
          <div style={{fontSize:11,color:'#ef4444',marginBottom:10}}>😅 {byPhase(weak).length} topics to revisit</div>
          {byPhase(weak).length===0?<div style={{padding:'40px',textAlign:'center',color:'var(--t2)',fontSize:14}}>No Weak topics! 💪</div>
            :<div style={{display:'flex',flexDirection:'column',gap:8}}>{byPhase(weak).map(t=><Card key={t.id} t={t}/>)}</div>}
        </div>
      )}
      {tab==='later'&&(
        <div>
          <div style={{fontSize:11,color:'#a855f7',marginBottom:10}}>📌 {byPhase(later).length} items pinned for later</div>
          {byPhase(later).length===0?<div style={{padding:'40px',textAlign:'center',color:'var(--t2)',fontSize:14}}>Nothing pinned!</div>
            :<div style={{display:'flex',flexDirection:'column',gap:8}}>{byPhase(later).map(t=><Card key={t.id} t={t}/>)}</div>}
        </div>
      )}
      {tab==='mid'&&(
        <div>
          <div style={{fontSize:11,color:'#f59e0b',marginBottom:10}}>🤔 {byPhase(mid).length} topics to strengthen</div>
          {byPhase(mid).length===0?<div style={{padding:'40px',textAlign:'center',color:'var(--t2)',fontSize:14}}>No Mid topics!</div>
            :<div style={{display:'flex',flexDirection:'column',gap:8}}>{byPhase(mid).map(t=><Card key={t.id} t={t}/>)}</div>}
        </div>
      )}
      {tab==='plan'&&(
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {weak.length>0&&<div style={{padding:'14px 16px',background:'rgba(239,68,68,.06)',border:'1px solid #ef444433',borderRadius:12}}>
            <div style={{fontSize:12,fontWeight:700,color:'#ef4444',marginBottom:5}}>🚨 Priority 1 — Fix {weak.length} Weak Topics</div>
            <div style={{fontSize:11,color:'var(--t2)',lineHeight:1.65}}>Go to the Weak tab. For each one, use ChatGPT: <span style={{color:'#ef4444',fontWeight:600}}>"Explain [topic] from scratch with 3 examples and 2 exercises."</span></div>
          </div>}
          {later.length>0&&<div style={{padding:'14px 16px',background:'rgba(168,85,247,.06)',border:'1px solid #a855f733',borderRadius:12}}>
            <div style={{fontSize:12,fontWeight:700,color:'#a855f7',marginBottom:5}}>📌 Priority 2 — Clear {later.length} Pinned Topics</div>
            <div style={{fontSize:11,color:'var(--t2)',lineHeight:1.65}}>Schedule a dedicated session this weekend to work through your Later list.</div>
          </div>}
          {mid.length>0&&<div style={{padding:'14px 16px',background:'rgba(245,158,11,.06)',border:'1px solid #f59e0b33',borderRadius:12}}>
            <div style={{fontSize:12,fontWeight:700,color:'#f59e0b',marginBottom:5}}>🔧 Priority 3 — Strengthen {mid.length} Mid Topics</div>
            <div style={{fontSize:11,color:'var(--t2)',lineHeight:1.65}}>Build mini projects using these. ChatGPT: <span style={{color:'#f59e0b',fontWeight:600}}>"Give me a small project to practice [topic] today."</span></div>
          </div>}
          {notDone.length>0&&<div style={{padding:'14px 16px',background:'rgba(99,102,241,.06)',border:'1px solid #6366f133',borderRadius:12}}>
            <div style={{fontSize:12,fontWeight:700,color:'var(--cyan)',marginBottom:5}}>▶ Continue — {notDone.length} topics remaining ({Math.round(all.filter(t=>done[t.id]).length/all.length*100)}% done)</div>
            <div style={{fontSize:11,color:'var(--t2)'}}>Next: <span style={{color:'var(--cyan)',fontWeight:600}}>{notDone[0]?.text?.slice(0,70)}</span></div>
          </div>}
        </div>
      )}
    </div>
  )
}

// ── CHATGPT VIEW ──────────────────────────────────────────────────────────────
function PromptCard({ t }) {
  const [cp, setCp] = useState(false)
  return (
    <div className="glass" style={{padding:16,display:'flex',flexDirection:'column',gap:10,position:'relative',overflow:'hidden',borderColor:`${t.color}22`}}>
      <div style={{position:'absolute',top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${t.color},transparent)`}}/>
      <div style={{display:'flex',alignItems:'center',gap:9}}>
        <div style={{width:34,height:34,borderRadius:8,background:`${t.color}18`,border:`1px solid ${t.color}33`,
          display:'flex',alignItems:'center',justifyContent:'center',fontSize:16}}>
          {t.title.split(' ')[0]}
        </div>
        <span style={{fontFamily:'var(--font-display)',fontSize:11,fontWeight:700,color:t.color,letterSpacing:1}}>{t.title.split(' ').slice(1).join(' ')}</span>
      </div>
      <div style={{fontSize:11,color:'var(--t2)',lineHeight:1.7,background:'var(--bg-base)',padding:11,
        borderRadius:'var(--r)',border:'1px solid var(--border)',flex:1,fontFamily:'var(--font-mono)',whiteSpace:'pre-wrap',maxHeight:160,overflowY:'auto'}}>
        {t.prompt}
      </div>
      <button onClick={()=>{navigator.clipboard.writeText(t.prompt).then(()=>{setCp(true);setTimeout(()=>setCp(false),1500)})}}
        className={cp ? 'btn btn-acid' : 'btn btn-ghost'}
        style={{padding:'7px',fontSize:10,letterSpacing:1.5,justifyContent:'center'}}>
        {cp ? '✓ COPIED' : '⬡ COPY TEMPLATE'}
      </button>
    </div>
  )
}

function ChatGPTView() {
  return (
    <div className="fade-up">
      <div className="glass" style={{padding:'16px 20px',marginBottom:16}}>
        <div className="sec-hd">AI PROMPT TEMPLATES</div>
        <p style={{color:'var(--t2)',fontSize:13,fontFamily:'var(--font-mono)'}}>8 universal templates — copy and use for every topic in the roadmap</p>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(min(280px,100%),1fr))',gap:10}}>
        {CHATGPT_TEMPLATES.map((t,i) => <PromptCard key={i} t={t}/>)}
      </div>
    </div>
  )
}

// ── ROOT APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const { user, logout } = useAuth()
  const { done, grasp, notes, times, timer, prod, toggleDone, setTopicGrasp, setTopicNote, startTimer, stopTimer, resetAll } = useStore(user?.uid||null)
  const { isPro, isPhaseUnlocked, devActivate, plan, trialExpired, activatePlan } = useSubscription(user?.uid||null)

  const [view,       setView]      = useState('map')
  const [phase,      setPhase]     = useState(0)
  const [weekIdx,    setWeekIdx]   = useState(0)
  const [dayIdx,     setDayIdx]    = useState(0)
  const [showPrice,  setShowPrice] = useState(false)
  const [showChat,   setShowChat]  = useState(false)
  const [showAdmin,  setShowAdmin] = useState(false)
  const [introSeen,  setIntroSeen] = useState(()=>localStorage.getItem('np-intro')==='1')
  const [celebrate,  setCelebrate] = useState(null) // {name, emoji}
  const [loadTimeout,setLoadTimeout]=useState(false)
  const [theme,      setTheme]     = useState(()=>localStorage.getItem('np-theme')||'dark')

  // Apply theme
  useEffect(()=>{
    document.documentElement.setAttribute('data-theme',theme)
    localStorage.setItem('np-theme',theme)
  },[theme])

  // Timeout for loading
  useEffect(()=>{
    const t=setTimeout(()=>setLoadTimeout(true),5000)
    return()=>clearTimeout(t)
  },[])

  // Keyboard nav
  useEffect(()=>{
    const h=e=>{
      if(view==='daily'){
        const wd=PHASES[phase]?.weeks_data[weekIdx]
        if(e.key==='ArrowLeft'&&dayIdx>0)setDayIdx(d=>d-1)
        if(e.key==='ArrowRight'&&wd&&dayIdx<wd.days.length-1)setDayIdx(d=>d+1)
      }
    }
    window.addEventListener('keydown',h)
    return()=>window.removeEventListener('keydown',h)
  },[view,dayIdx,weekIdx,phase])

  const stats    = totalStats(done)
  const phaseObj = PHASES[phase]
  const weekData = phaseObj?.weeks_data[weekIdx]
  const currentTopic = weekData?.days[dayIdx]?.topics?.[0]?.text

  if(user===undefined&&!loadTimeout) return (
    <div role="status" aria-label="Loading Neural Protocol" style={{minHeight:'100dvh',display:'flex',alignItems:'center',justifyContent:'center',
      background:'var(--bg-base)',flexDirection:'column',gap:20}}>
      <HexLogo size={52}/>
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <div className="spinner"/>
        <span style={{fontFamily:'var(--font-display)',fontSize:13,color:'var(--t2)',letterSpacing:.5}}>Connecting...</span>
      </div>
      <button onClick={()=>setLoadTimeout(true)} className="btn btn-ghost"
        style={{padding:'6px 16px',fontSize:12,marginTop:8}}>Skip</button>
    </div>
  )
  // Show Matrix intro to brand new visitors (not seen intro yet)
  if(!introSeen) return (
    <Suspense fallback={<div style={{minHeight:'100dvh',background:'#020409'}}/>}><MatrixIntro onEnter={()=>{
      localStorage.setItem('np-intro','1')
      startTransition(()=>setIntroSeen(true))
    }}/></Suspense>
  )

  if(!user) return (
    <Suspense fallback={<div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100dvh',background:'var(--bg-base)'}}><div className="spinner"/></div>}>
      <AuthRouter/>
    </Suspense>
  )
  if(showPrice) return (
    <Suspense fallback={<div style={{minHeight:'100dvh',background:'var(--bg-base)',display:'flex',alignItems:'center',justifyContent:'center'}}><div className='spinner'/></div>}><PricingPage user={user} uid={user?.uid||'guest'} currentPlan={plan?.id||'free'}
      onSuccess={()=>setShowPrice(false)} onClose={()=>setShowPrice(false)}/></Suspense>
  )

  const goToPhase=i=>{
    const p=PHASES[i]
    if(!isPhaseUnlocked(p.id)){setShowPrice(true);return}
    setPhase(i);setWeekIdx(0);setDayIdx(0);startTransition(()=>setView('weekly'))
  }

  const NAV=[['◈','Map','map'],['⬡','Learn','weekly'],['◉','Stats','stats'],['⬢','Chat','community'],['🏆','Rank','leaderboard'],['◫','Res','resources']]
  const learnV=['weekly','daily','tracker']
  const learnViews=['weekly','daily','tracker']
  const isActiveNav=v=>v==='weekly'?learnV.includes(view):view===v

  return (
    <div style={{position:'relative',zIndex:1,minHeight:'100dvh',background:'var(--bg-base)'}}>

      <Suspense fallback={null}>
        {celebrate&&<CelebrationScene phaseName={celebrate.name} phaseEmoji={celebrate.emoji} onDone={()=>setCelebrate(null)}/>}
      </Suspense>

      <Suspense fallback={null}><Background3D/></Suspense>
      <div className="orb-bg" aria-hidden="true">
        <div className="orb orb-1"/><div className="orb orb-2"/>
        <div className="orb orb-3"/><div className="orb orb-4"/>
      </div>

      <Suspense fallback={null}>
        {showAdmin&&<AdminPanel onClose={()=>setShowAdmin(false)}/>}
      </Suspense>

      <Header stats={stats} view={view} setView={setView}
        user={user} logout={logout} onReset={resetAll}
        isPro={isPro} onUpgrade={()=>setShowPrice(true)}
        onAdmin={()=>setShowAdmin(true)}
        theme={theme} setTheme={setTheme}/>

      <nav className="bnav m-only" aria-label="Primary navigation">
        {NAV.map(([ic,lb,v])=>(
          <button key={v} className={`bnav-btn${isActiveNav(v)?' on':''}`}
            onClick={()=>{playNav();startTransition(()=>setView(v))}} aria-label={lb}>
            <span className="ic" aria-hidden="true">{ic}</span>
            <span className="lb">{lb}</span>
          </button>
        ))}
      </nav>

      <div className="wrap">
        {(view==='map'||learnV.includes(view))&&(
          <div className="sidebar d-only">
            <Sidebar activePhase={phase} setActivePhase={goToPhase}
              done={done} grasp={grasp} setView={setView}
              setWeek={setWeekIdx} setDay={setDayIdx}
              isPhaseUnlocked={isPhaseUnlocked} onUpgrade={()=>setShowPrice(true)}/>
          </div>
        )}
        <main className="content" id="main" aria-label="Main content" tabIndex={-1}>

          {view==='map'&&(
            <div className="page-enter">
              <Suspense fallback={<div style={{minHeight:'40vh',display:'flex',alignItems:'center',justifyContent:'center'}}><div className="spinner"/></div>}>
                <MapView done={done} grasp={grasp}
                  setActivePhase={goToPhase} setWeek={setWeekIdx}
                  setDay={setDayIdx} setView={setView}
                  isPhaseUnlocked={isPhaseUnlocked} onUpgrade={()=>setShowPrice(true)}/>
              </Suspense>
            </div>
          )}

          {view==='weekly'&&phaseObj&&(
            isPhaseUnlocked(phaseObj.id)
              ?<WeeklyView phase={phaseObj} weekIdx={weekIdx} setWeekIdx={setWeekIdx}
                  setDay={setDayIdx} setView={setView} done={done} grasp={grasp}
                  notes={notes} times={times} timer={timer} toggleDone={toggleDone}
                  setTopicGrasp={setTopicGrasp} setTopicNote={setTopicNote}
                  startTimer={startTimer} stopTimer={stopTimer}/>
              :<Suspense fallback={null}><PaywallOverlay phase={phaseObj} onUpgrade={()=>setShowPrice(true)}/></Suspense>
          )}
          {view==='daily'&&phaseObj&&weekData&&(
            isPhaseUnlocked(phaseObj.id)
              ?<DailyView phase={phaseObj} weekData={weekData} dayIdx={dayIdx}
                  setDayIdx={setDayIdx} done={done} grasp={grasp} notes={notes}
                  times={times} timer={timer} toggleDone={toggleDone}
                  setTopicGrasp={setTopicGrasp} setTopicNote={setTopicNote}
                  startTimer={startTimer} stopTimer={stopTimer}/>
              :<Suspense fallback={null}><PaywallOverlay phase={phaseObj} onUpgrade={()=>setShowPrice(true)}/></Suspense>
          )}
          {view==='tracker'&&(
            <TrackerView done={done} grasp={grasp} notes={notes} times={times}
              toggleDone={toggleDone} setTopicGrasp={setTopicGrasp} setTopicNote={setTopicNote}/>
          )}

          <Suspense fallback={<div style={{minHeight:'40vh',display:'flex',alignItems:'center',justifyContent:'center'}}><div className="spinner"/></div>}>
            {view==='stats'&&<div className="page-enter"><StatsView done={done} grasp={grasp} times={times}/></div>}
            {view==='community'&&<div className="page-enter"><Community user={user} done={done} grasp={grasp} totalTopics={stats.total}/></div>}
            {view==='leaderboard'&&<div className="page-enter"><Suspense fallback={<div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'40vh'}}><div className="spinner"/></div>}><LeaderboardPage user={user} done={done} grasp={grasp}/></Suspense></div>}
            {view==='resources'&&<div className="page-enter"><ResourceSearch phases={PHASES} done={done}/></div>}
          </Suspense>

          {trialExpired&&(
            <div style={{margin:'0 0 16px',padding:'14px 18px',
              background:'rgba(251,113,133,.08)',border:'1px solid rgba(251,113,133,.3)',
              borderRadius:'var(--r2)',display:'flex',alignItems:'center',
              justifyContent:'space-between',flexWrap:'wrap',gap:10}}>
              <div>
                <span style={{fontFamily:'var(--font-display)',fontSize:13,fontWeight:600,color:'var(--rose)'}}>
                  ⏰ Your 30-day trial has ended
                </span>
                <p style={{fontFamily:'var(--font-body)',fontSize:12,color:'var(--t2)',marginTop:2}}>
                  Upgrade to continue accessing all 10 phases
                </p>
              </div>
              <button onClick={()=>startTransition(()=>setShowPrice(true))} className="btn btn-primary"
                style={{padding:'8px 20px',fontSize:13}}>
                ⚡ Upgrade — ₹999 Lifetime
              </button>
            </div>
          )}
          {plan?.id==='trial'&&plan?.daysLeft<=7&&plan?.daysLeft>0&&(
            <div style={{margin:'0 0 16px',padding:'12px 18px',
              background:'rgba(251,191,36,.07)',border:'1px solid rgba(251,191,36,.25)',
              borderRadius:'var(--r2)',display:'flex',alignItems:'center',
              justifyContent:'space-between',flexWrap:'wrap',gap:10}}>
              <span style={{fontFamily:'var(--font-mono)',fontSize:12,color:'var(--amber)'}}>
                ⚠ Trial ends in {plan.daysLeft} day{plan.daysLeft===1?'':'s'}
              </span>
              <button onClick={()=>startTransition(()=>setShowPrice(true))} className="btn btn-cyan"
                style={{padding:'6px 16px',fontSize:12}}>
                Upgrade now
              </button>
            </div>
          )}
          {!isPro&&(
            <div style={{marginTop:20,padding:'14px 18px',
              background:'rgba(251,191,36,.07)',border:'1px solid rgba(251,191,36,.25)',
              borderRadius:'var(--r2)',display:'flex',
              alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:10}}>
              <div>
                <div style={{fontFamily:'var(--font-display)',fontSize:13,fontWeight:600,color:'var(--amber)'}}>
                  🎯 Try Demo — 30 Days Free
                </div>
                <div style={{fontFamily:'var(--font-body)',fontSize:11,color:'var(--t3)',marginTop:2}}>
                  Unlock all 10 phases for 30 days at no cost
                </div>
              </div>
              <button onClick={devActivate} className="btn"
                style={{padding:'9px 20px',fontSize:13,fontWeight:600,
                  background:'linear-gradient(135deg,var(--amber),#f59e0b)',
                  border:'none',color:'#000',borderRadius:'var(--r2)',cursor:'pointer',
                  boxShadow:'0 4px 16px rgba(251,191,36,.3)',flexShrink:0}}>
                ⚡ Start 30-Day Trial
              </button>
            </div>
          )}

          <footer style={{marginTop:48,padding:'32px 0 16px',borderTop:'1px solid var(--border)'}}>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:32,marginBottom:32}}>
              <div>
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:12}}>
                  <HexLogo size={28}/>
                  <span style={{fontFamily:'var(--font-display)',fontSize:14,fontWeight:700,
                    background:'linear-gradient(135deg,var(--cyan),var(--violet))',
                    WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>
                    Neural Protocol
                  </span>
                </div>
                <p style={{fontFamily:'var(--font-body)',fontSize:13,color:'var(--t3)',lineHeight:1.7,maxWidth:240}}>
                  The most immersive AI/ML learning OS built for Indian engineers.
                </p>
              </div>
              <div>
                <div style={{fontFamily:'var(--font-display)',fontSize:11,fontWeight:600,color:'var(--t2)',
                  letterSpacing:1,textTransform:'uppercase',marginBottom:12}}>Curriculum</div>
                {['Python Foundations','ML & Deep Learning','LLMs & Agents','MLOps & Deployment'].map(l=>(
                  <div key={l} style={{fontFamily:'var(--font-body)',fontSize:13,color:'var(--t3)',marginBottom:6}}>{l}</div>
                ))}
              </div>
              <div>
                <div style={{fontFamily:'var(--font-display)',fontSize:11,fontWeight:600,color:'var(--t2)',
                  letterSpacing:1,textTransform:'uppercase',marginBottom:12}}>Contact</div>
                <div style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--t3)',marginBottom:6}}>📱 +91 97811 91041</div>
                <div style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--t3)',marginBottom:6}}>💳 tarunsaini89689-1@okaxis</div>
                <div style={{marginTop:12,display:'flex',gap:8,flexWrap:'wrap'}}>
                  <span className="badge badge-cyan">Free Forever</span>
                  <span className="badge badge-violet">₹999 Lifetime</span>
                </div>
              </div>
            </div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',
              flexWrap:'wrap',gap:8,paddingTop:16,borderTop:'1px solid var(--border)'}}>
              <span style={{fontFamily:'var(--font-mono)',fontSize:10,color:'var(--t3)'}}>
                © 2026 Neural Protocol. Built for Indian AI engineers.
              </span>
              <div style={{display:'flex',gap:12}}>
                {['Privacy','Terms','Contact'].map(l=>(
                  <span key={l} style={{fontFamily:'var(--font-body)',fontSize:12,color:'var(--t3)',cursor:'pointer'}}>{l}</span>
                ))}
              </div>
            </div>
          </footer>

        </main>
      </div>

      {/* AI Orb — visible to everyone */}
      <Suspense fallback={null}>
        <AIOrb currentPhase={phaseObj} currentTopic={currentTopic}/>
      </Suspense>
    </div>
  )
}
