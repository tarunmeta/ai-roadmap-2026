import { useState, useEffect, useRef } from 'react'
import { PHASES, CHATGPT_TEMPLATES } from './data.js'
import { useAuth } from './hooks/useAuth.js'
import { useStore } from './hooks/useStore.js'
import { useSubscription } from './hooks/useSubscription.js'
import AuthRouter from './pages/AuthPages.jsx'
import ProductivityDashboard from './pages/ProductivityDashboard.jsx'
import PricingPage from './pages/PricingPage.jsx'
import AIChat from './pages/AIChat.jsx'
import PaywallOverlay from './pages/PaywallOverlay.jsx'
import AdminPanel from './pages/AdminPanel.jsx'

// ── GRASP CONFIG ──────────────────────────────────────────────────────────────
const GRASP = {
  strong: { label:'Strong', emoji:'💪', color:'#10b981', bg:'rgba(16,185,129,.12)' },
  mid:    { label:'Mid',    emoji:'🤔', color:'#f59e0b', bg:'rgba(245,158,11,.12)' },
  weak:   { label:'Weak',   emoji:'😅', color:'#ef4444', bg:'rgba(239,68,68,.12)'  },
  later:  { label:'Later',  emoji:'📌', color:'#a855f7', bg:'rgba(168,85,247,.12)' },
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
    <svg width={size} height={size} style={{transform:'rotate(-90deg)',flexShrink:0}}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth={stroke}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={c} strokeDashoffset={c - c*pct/100} strokeLinecap="round"
        style={{transition:'stroke-dashoffset .7s cubic-bezier(.16,1,.3,1)'}}/>
    </svg>
  )
}

function PhaseTag({ label, color }) {
  return (
    <span style={{fontSize:9,padding:'2px 8px',borderRadius:99,border:`1px solid ${color}44`,
      background:`${color}14`,color,fontWeight:700,letterSpacing:'.5px',flexShrink:0,lineHeight:1.5}}>
      {label}
    </span>
  )
}

function YTBtn({ url, label }) {
  return (
    <a href={url} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()}
      style={{display:'inline-flex',alignItems:'center',gap:4,padding:'3px 9px',borderRadius:99,
        background:'rgba(239,68,68,.1)',border:'1px solid rgba(239,68,68,.2)',color:'#f87171',
        fontSize:10,fontWeight:600,textDecoration:'none',whiteSpace:'nowrap',flexShrink:0,
        transition:'all .15s'}}
      onMouseEnter={e=>e.currentTarget.style.background='rgba(239,68,68,.2)'}
      onMouseLeave={e=>e.currentTarget.style.background='rgba(239,68,68,.1)'}>
      ▶ {label}
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
          <button key={k} className="grasp-pill" data-tip={g.desc || g.label}
            onClick={e=>{e.stopPropagation();set(id, on?null:k)}}
            style={{borderColor:on?g.color:'#242740',background:on?g.bg:'transparent',color:on?g.color:'#454869'}}>
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
    <div onClick={e=>e.stopPropagation()} style={{marginTop:8}}>
      <button onClick={()=>setOpen(o=>!o)} style={{
        fontSize:10,padding:'3px 10px',borderRadius:99,cursor:'pointer',transition:'all .15s',
        border:`1px solid ${has?color+'55':'#242740'}`,background:has?`${color}10`:'transparent',
        color:has?color:'#454869',fontWeight:600}}>
        {open?'▲ Close note':has?`📝 Note saved ▼`:'+ Add note / confusion / link'}
      </button>
      {open && (
        <textarea value={val} onChange={e=>setNote(id,e.target.value)} autoFocus
          placeholder="What confused you? Paste code, link, or summary..."
          style={{display:'block',width:'100%',marginTop:8,padding:'10px 12px',
            background:'#0d0f1a',border:`1.5px solid ${color}44`,borderRadius:10,
            color:'#e8eaf2',fontSize:12,lineHeight:1.65,outline:'none',
            minHeight:72,resize:'vertical',fontFamily:'inherit',transition:'border-color .15s'}}
          onFocus={e=>e.target.style.borderColor=color}
          onBlur={e=>e.target.style.borderColor=`${color}44`}
        />
      )}
    </div>
  )
}

// ── TOPIC ROW with timer ──────────────────────────────────────────────────────
function TopicRow({ t, done, grasp, notes, times, timer, toggleDone, setTopicGrasp, setTopicNote, startTimer, stopTimer, color }) {
  const isDone   = done[t.id]
  const gInfo    = grasp[t.id] ? GRASP[grasp[t.id]] : null
  const hasNote  = notes[t.id]?.trim()
  const timeMs   = times[t.id]||0
  const isActive = timer?.topicId===t.id
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    if (!isActive) return
    const iv = setInterval(() => setElapsed(Date.now()-(timer?.startMs||Date.now())), 1000)
    return () => clearInterval(iv)
  }, [isActive, timer])

  return (
    <div className={`topic-row${isDone?' done':''}`} style={{background:gInfo?`${gInfo.color}04`:'transparent'}}>
      {/* Checkbox */}
      <div onClick={()=>toggleDone(t.id)}
        style={{width:20,height:20,borderRadius:5,marginTop:2,flexShrink:0,cursor:'pointer',
          border:`2px solid ${isDone?color:'#334155'}`,background:isDone?`${color}22`:'transparent',
          display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}}>
        {isDone&&<span style={{color,fontSize:11,fontWeight:800}}>✓</span>}
      </div>

      <div style={{flex:1,minWidth:0}}>
        {/* text */}
        <div onClick={()=>toggleDone(t.id)} style={{fontSize:13,color:isDone?'#454869':'#e8eaf2',lineHeight:1.55,
          textDecoration:isDone?'line-through':'none',marginBottom:8,cursor:'pointer',transition:'color .15s'}}>
          {t.text}
        </div>

        {/* row 2: grasp + tag + YT + timer */}
        <div style={{display:'flex',alignItems:'center',gap:6,flexWrap:'wrap'}}>
          <GraspPills id={t.id} grasp={grasp} set={setTopicGrasp}/>
          <PhaseTag label={t.tag} color={color}/>
          <YTBtn url={t.yt} label={t.ytLabel}/>

          {/* Timer button */}
          <button onClick={e=>{e.stopPropagation();isActive?stopTimer(t.id):startTimer(t.id)}}
            className={`timer-btn timer-idle${isActive?' running':''}`}
            style={{cursor:'pointer',border:'none',transition:'all .15s'}}>
            {isActive ? `⏸ ${fmtMs(elapsed)||'0s'}` : timeMs>0 ? `⏱ ${fmtMs(timeMs)}` : '▶ Start timer'}
          </button>

          {hasNote&&<span style={{fontSize:9,color:'#454869'}}>📝</span>}
        </div>

        {/* note box */}
        <NoteBox id={t.id} notes={notes} setNote={setTopicNote} color={color}/>
      </div>
    </div>
  )
}

// ── HEADER ────────────────────────────────────────────────────────────────────
function Header({ stats, view, setView, user, logout, onReset, isPro, onUpgrade, onAdmin }) {
  const [mob, setMob] = useState(false)
  const [userMenu, setUserMenu] = useState(false)
  const tabs = [['🗺','Map','map'],['📅','Weekly','weekly'],['📋','Daily','daily'],['📊','Stats','stats'],['📌','Tracker','tracker'],['🤖','GPT','chatgpt']]

  return (
    <header style={{position:'sticky',top:0,zIndex:200,
      background:'rgba(5,5,8,.9)',backdropFilter:'blur(20px)',
      borderBottom:'1px solid #1a1d2e'}}>
      <div style={{maxWidth:1400,margin:'0 auto',padding:'0 16px',display:'flex',alignItems:'center',gap:10,height:56}}>

        {/* Logo */}
        <div style={{display:'flex',alignItems:'center',gap:8,flexShrink:0}}>
          <div style={{width:32,height:32,borderRadius:9,background:'linear-gradient(135deg,#6366f1,#a855f7)',
            display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,boxShadow:'0 4px 12px rgba(99,102,241,.3)'}}>
            🤖
          </div>
          <div style={{lineHeight:1.2}} className="desktop-only">
            <div style={{fontWeight:800,fontSize:14,color:'#e8eaf2',letterSpacing:'-.02em',fontFamily:'Syne,sans-serif'}}>AI Roadmap</div>
            <div style={{fontSize:8,color:'#454869',letterSpacing:'2px',textTransform:'uppercase'}}>2026</div>
          </div>
        </div>

        {/* Progress */}
        <div style={{flex:1,display:'flex',alignItems:'center',gap:8,minWidth:0}}>
          <div style={{flex:1,height:5,background:'#1a1d2e',borderRadius:99,overflow:'hidden',minWidth:30}}>
            <div style={{height:'100%',width:`${stats.pct}%`,borderRadius:99,
              background:'linear-gradient(90deg,#6366f1,#a855f7,#06b6d4)',
              transition:'width .8s cubic-bezier(.16,1,.3,1)'}}/>
          </div>
          <span style={{fontSize:13,fontWeight:800,color:'#818cf8',flexShrink:0}}>{stats.pct}%</span>
          <span style={{fontSize:10,color:'#454869',flexShrink:0}}>{stats.completed}/{stats.total}</span>
        </div>

        {/* Pro badge or upgrade CTA */}
        {isPro ? (
          <div style={{display:'flex',alignItems:'center',gap:5,padding:'4px 10px',borderRadius:99,
            background:'linear-gradient(90deg,rgba(245,158,11,.15),rgba(251,146,60,.1))',
            border:'1px solid rgba(245,158,11,.3)',flexShrink:0}} className="desktop-only">
            <span style={{fontSize:10}}>⚡</span>
            <span style={{fontSize:10,fontWeight:700,color:'#f59e0b'}}>PRO</span>
          </div>
        ) : (
          <button onClick={onUpgrade} className="btn btn-primary btn-sm desktop-only"
            style={{flexShrink:0,padding:'6px 14px',fontSize:11,
              background:'linear-gradient(135deg,#6366f1,#a855f7)',
              boxShadow:'0 4px 16px rgba(99,102,241,.3)'}}>
            ⚡ Upgrade
          </button>
        )}

        {/* Nav tabs (desktop) */}
        <nav className="desktop-only" style={{display:'flex',gap:2,background:'#0d0f1a',
          border:'1px solid #1a1d2e',borderRadius:10,padding:3}}>
          {tabs.map(([ic,lb,v])=>(
            <button key={v} onClick={()=>setView(v)}
              style={{padding:'5px 10px',borderRadius:8,border:'none',cursor:'pointer',
                background:view===v?'#1a1d2e':'transparent',
                color:view===v?'#818cf8':'#454869',
                fontWeight:600,fontSize:11,transition:'all .15s',display:'flex',alignItems:'center',gap:3}}>
              <span>{ic}</span><span>{lb}</span>
            </button>
          ))}
        </nav>

        {/* User avatar + menu */}
        <div style={{position:'relative',flexShrink:0}}>
          <button onClick={()=>setUserMenu(o=>!o)}
            style={{width:34,height:34,borderRadius:10,background:'linear-gradient(135deg,#6366f1,#a855f7)',
              border:'none',cursor:'pointer',color:'#fff',fontWeight:800,fontSize:14,
              display:'flex',alignItems:'center',justifyContent:'center'}}>
            {user?.avatar || '?'}
          </button>
          {userMenu && (
            <div style={{position:'absolute',right:0,top:42,background:'#0d0f1a',border:'1px solid #1a1d2e',
              borderRadius:12,padding:8,minWidth:180,boxShadow:'0 8px 32px rgba(0,0,0,.6)',zIndex:300}}>
              <div style={{padding:'8px 12px',borderBottom:'1px solid #1a1d2e',marginBottom:4}}>
                <div style={{fontSize:13,fontWeight:700,color:'#e8eaf2'}}>{user?.name}</div>
                <div style={{fontSize:11,color:'#454869'}}>{user?.email}</div>
                <div style={{fontSize:10,marginTop:4,color:isPro?'#f59e0b':'#8b90b0',fontWeight:600}}>
                  {isPro ? '⚡ Pro Member' : '🆓 Free Plan'}
                </div>
              </div>
              {!isPro && (
                <button onClick={()=>{setUserMenu(false);onUpgrade()}}
                  style={{width:'100%',padding:'8px 12px',background:'linear-gradient(135deg,rgba(99,102,241,.15),rgba(168,85,247,.1))',
                    border:'none',color:'#818cf8',fontSize:12,fontWeight:700,cursor:'pointer',textAlign:'left',
                    borderRadius:7,marginBottom:4,transition:'background .1s'}}>
                  ⚡ Upgrade to Pro →
                </button>
              )}
              <button onClick={()=>{setUserMenu(false);onAdmin()}}
                style={{width:'100%',padding:'8px 12px',background:'transparent',border:'none',
                  color:'#f59e0b',fontSize:12,fontWeight:600,cursor:'pointer',textAlign:'left',borderRadius:7,transition:'background .1s'}}
                onMouseEnter={e=>e.currentTarget.style.background='rgba(245,158,11,.08)'}
                onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                🔐 Admin Panel
              </button>
              <button onClick={onReset} style={{width:'100%',padding:'8px 12px',background:'transparent',border:'none',
                color:'#f59e0b',fontSize:12,fontWeight:600,cursor:'pointer',textAlign:'left',borderRadius:7,transition:'background .1s'}}
                onMouseEnter={e=>e.currentTarget.style.background='rgba(245,158,11,.08)'}
                onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                ↺ Reset Progress
              </button>
              <button onClick={logout} style={{width:'100%',padding:'8px 12px',background:'transparent',border:'none',
                color:'#ef4444',fontSize:12,fontWeight:600,cursor:'pointer',textAlign:'left',borderRadius:7,transition:'background .1s'}}
                onMouseEnter={e=>e.currentTarget.style.background='rgba(239,68,68,.08)'}
                onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                ↩ Sign Out
              </button>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="mobile-only" onClick={()=>setMob(o=>!o)}
          style={{background:'none',border:'1px solid #1a1d2e',borderRadius:8,
            color:'#8b90b0',padding:'6px 9px',fontSize:15,cursor:'pointer'}}>☰</button>
      </div>

      {mob && (
        <div style={{borderTop:'1px solid #1a1d2e',padding:'8px 16px',display:'flex',gap:5,flexWrap:'wrap'}}>
          {tabs.map(([ic,lb,v])=>(
            <button key={v} onClick={()=>{setView(v);setMob(false)}}
              style={{padding:'6px 12px',borderRadius:8,border:`1px solid ${view===v?'#6366f1':'#1a1d2e'}`,
                background:view===v?'rgba(99,102,241,.1)':'transparent',
                color:view===v?'#818cf8':'#8b90b0',fontWeight:600,fontSize:11,cursor:'pointer'}}>
              {ic} {lb}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}

// ── SIDEBAR ───────────────────────────────────────────────────────────────────
function Sidebar({ activePhase, setActivePhase, done, grasp, setView, setWeek, setDay, isPhaseUnlocked, onUpgrade }) {
  return (
    <aside style={{width:210,flexShrink:0}}>
      <div style={{fontSize:8,letterSpacing:'2.5px',textTransform:'uppercase',color:'#454869',marginBottom:10,padding:'0 4px'}}>
        10 Phases
      </div>
      {PHASES.map((p,i) => {
        const pct      = phasePct(p,done)
        const ts       = p.weeks_data.flatMap(w=>w.days.flatMap(d=>d.topics))
        const weak     = ts.filter(t=>grasp[t.id]==='weak').length
        const later    = ts.filter(t=>grasp[t.id]==='later').length
        const isAct    = activePhase===i
        const unlocked = isPhaseUnlocked(p.id)
        return (
          <button key={p.id} onClick={()=>setActivePhase(i)}
            style={{width:'100%',textAlign:'left',marginBottom:3,padding:'10px 11px',
              borderRadius:10,border:`1px solid ${isAct?p.color+'44':unlocked?'#1a1d2e':'#1a1d2e'}`,
              background:isAct?`${p.color}0a`:unlocked?'#0d0f1a':'rgba(99,102,241,.03)',
              cursor:'pointer',transition:'all .18s',display:'block',opacity:unlocked?1:.7}}>
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
              <span style={{fontSize:14}}>{p.emoji}</span>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:10,fontWeight:700,color:isAct?p.color:unlocked?'#8b90b0':'#454869',
                  whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                  P{p.id}: {p.name}
                </div>
                <div style={{fontSize:8,color:'#454869'}}>Wk {p.weeks}</div>
              </div>
              {unlocked
                ? <span style={{fontSize:11,fontWeight:800,color:pct===100?'#10b981':isAct?p.color:'#454869'}}>{pct}%</span>
                : <span style={{fontSize:12}}>🔒</span>
              }
            </div>
            <div style={{height:2,background:'#1a1d2e',borderRadius:1,overflow:'hidden',marginBottom:weak||later?5:0}}>
              <div style={{height:'100%',width:`${unlocked?pct:0}%`,background:p.color,borderRadius:1,transition:'width .6s'}}/>
            </div>
            {unlocked && (weak>0||later>0)&&(
              <div style={{display:'flex',gap:7}}>
                {weak>0 &&<span style={{fontSize:8,color:'#ef4444'}}>😅 {weak} weak</span>}
                {later>0&&<span style={{fontSize:8,color:'#a855f7'}}>📌 {later} later</span>}
              </div>
            )}
            {!unlocked && (
              <div style={{fontSize:9,color:'#6366f1',fontWeight:600}}>⚡ Upgrade to unlock</div>
            )}
          </button>
        )
      })}
    </aside>
  )
}

// ── MAP VIEW ──────────────────────────────────────────────────────────────────
function MapView({ done, grasp, setActivePhase, setWeek, setDay, setView, isPhaseUnlocked, onUpgrade }) {
  return (
    <div className="fade-up">
      <div style={{marginBottom:20,padding:'20px 24px',background:'linear-gradient(135deg,#0d0f1a,#111420)',
        border:'1px solid #1a1d2e',borderRadius:16,position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:0,left:0,right:0,height:2,
          background:'linear-gradient(90deg,#6366f1,#a855f7,#06b6d4)'}}/>
        <h1 style={{fontSize:22,fontWeight:800,letterSpacing:'-.03em',marginBottom:5}}>🗺 AI Engineer Roadmap 2026</h1>
        <p style={{color:'#8b90b0',fontSize:13}}>10 Phases · 9 Months · Phase 1 free forever · Upgrade for full access</p>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:12}}>
        {PHASES.map((p,i) => {
          const pct      = phasePct(p,done)
          const ts       = p.weeks_data.flatMap(w=>w.days.flatMap(d=>d.topics))
          const done2    = ts.filter(t=>done[t.id]).length
          const strong   = ts.filter(t=>grasp[t.id]==='strong').length
          const mid      = ts.filter(t=>grasp[t.id]==='mid').length
          const weak     = ts.filter(t=>grasp[t.id]==='weak').length
          const later    = ts.filter(t=>grasp[t.id]==='later').length
          const unlocked = isPhaseUnlocked(p.id)
          return (
            <div key={p.id} className="glass glass-hover"
              onClick={()=>setActivePhase(i)}
              style={{padding:18,cursor:'pointer',
                borderColor:!unlocked?'rgba(99,102,241,.2)':pct===100?p.color+'33':'',
                position:'relative',overflow:'hidden',
                opacity:unlocked?1:.85}}>
              <div style={{position:'absolute',top:0,left:0,right:0,height:3,
                background:`linear-gradient(90deg,${unlocked?p.color:'#6366f1'},transparent)`}}/>

              {/* Lock badge for paid phases */}
              {!unlocked && (
                <div style={{position:'absolute',top:14,right:14,
                  background:'linear-gradient(135deg,rgba(99,102,241,.2),rgba(168,85,247,.15))',
                  border:'1px solid rgba(99,102,241,.3)',
                  padding:'4px 10px',borderRadius:99,fontSize:10,fontWeight:700,color:'#818cf8',
                  display:'flex',alignItems:'center',gap:5}}>
                  🔒 Pro
                </div>
              )}

              {/* Free badge for phase 1 */}
              {p.id===1 && (
                <div style={{position:'absolute',top:14,right:14,
                  background:'rgba(16,185,129,.12)',border:'1px solid rgba(16,185,129,.25)',
                  padding:'4px 10px',borderRadius:99,fontSize:10,fontWeight:700,color:'#10b981'}}>
                  🆓 Free
                </div>
              )}

              <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:12}}>
                <div style={{display:'flex',alignItems:'center',gap:10}}>
                  <span style={{fontSize:28}}>{p.emoji}</span>
                  <div>
                    <div style={{fontSize:9,color:unlocked?p.color:'#6366f1',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase'}}>Phase {p.id}</div>
                    <div style={{fontWeight:700,fontSize:14,color:'#e8eaf2'}}>{p.name}</div>
                    <div style={{fontSize:10,color:'#8b90b0',marginTop:1}}>{p.description}</div>
                  </div>
                </div>
                {unlocked && (
                  <div style={{textAlign:'right',flexShrink:0,paddingRight:40}}>
                    <div style={{fontSize:22,fontWeight:800,color:pct===100?'#10b981':p.color}}>{pct}%</div>
                    <div style={{fontSize:10,color:'#8b90b0'}}>{done2}/{ts.length}</div>
                  </div>
                )}
              </div>

              {unlocked ? (
                <>
                  <div style={{height:6,background:'#1a1d2e',borderRadius:3,overflow:'hidden',marginBottom:10,display:'flex'}}>
                    {strong>0&&<div style={{height:'100%',width:`${strong/ts.length*100}%`,background:'#10b981'}}/>}
                    {mid>0   &&<div style={{height:'100%',width:`${mid/ts.length*100}%`,   background:'#f59e0b'}}/>}
                    {weak>0  &&<div style={{height:'100%',width:`${weak/ts.length*100}%`,   background:'#ef4444'}}/>}
                    {later>0 &&<div style={{height:'100%',width:`${later/ts.length*100}%`,  background:'#a855f7'}}/>}
                  </div>
                  <div style={{display:'flex',gap:8,flexWrap:'wrap',alignItems:'center'}}>
                    {[['💪',strong,'#10b981'],['🤔',mid,'#f59e0b'],['😅',weak,'#ef4444'],['📌',later,'#a855f7']].map(([em,n,c])=>
                      n>0?<span key={em} style={{fontSize:9,color:c,fontWeight:700}}>{em} {n}</span>:null
                    )}
                    <PhaseTag label={`${ts.length} topics`} color={p.color}/>
                    <PhaseTag label={p.duration} color={p.color}/>
                  </div>
                </>
              ) : (
                <div style={{marginTop:4}}>
                  <div style={{height:6,background:'rgba(99,102,241,.1)',borderRadius:3,marginBottom:10,
                    backgroundImage:'repeating-linear-gradient(45deg,transparent,transparent 4px,rgba(99,102,241,.1) 4px,rgba(99,102,241,.1) 8px)'}}/>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                      <PhaseTag label={`${ts.length} topics`} color='#6366f1'/>
                      <PhaseTag label={p.duration} color='#6366f1'/>
                    </div>
                    <span style={{fontSize:10,color:'#818cf8',fontWeight:700}}>Unlock →</span>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
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
            <span style={{fontSize:32}}>{phase.emoji}</span>
            <div>
              <div style={{fontSize:9,color:phase.color,fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase'}}>
                Phase {phase.id} · {phase.duration}
              </div>
              <h2 style={{fontWeight:800,fontSize:19,color:'#e8eaf2',letterSpacing:'-.02em'}}>{phase.name}</h2>
              <p style={{fontSize:12,color:'#8b90b0',marginTop:1}}>{phase.description}</p>
            </div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <Ring pct={phasePct(phase,done)} size={52} stroke={4} color={phase.color}/>
            <div>
              <div style={{fontSize:21,fontWeight:800,color:phase.color}}>{phasePct(phase,done)}%</div>
              <div style={{fontSize:9,color:'#8b90b0'}}>complete</div>
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
                border:`1px solid ${weekIdx===i?phase.color:'#1a1d2e'}`,
                background:weekIdx===i?`${phase.color}15`:'transparent',
                color:weekIdx===i?phase.color:'#8b90b0',fontSize:11,fontWeight:600}}>
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
            <div key={di} className="glass glass-hover"
              onClick={()=>{setDay(di);setView('daily')}}
              style={{padding:13,cursor:'pointer',borderColor:pct===100?phase.color+'44':''}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                <span style={{fontSize:10,fontWeight:800,color:phase.color,letterSpacing:'1.5px'}}>{day.day}</span>
                <span style={{fontSize:11,fontWeight:700,color:pct===100?'#10b981':'#8b90b0'}}>
                  {pct===100?'✓':''}{dayDone(day)}/{day.topics.length}
                </span>
              </div>
              <div style={{fontSize:11,fontWeight:600,color:'#e8eaf2',marginBottom:8,lineHeight:1.35}}>{day.label}</div>
              <div style={{height:3,background:'#1a1d2e',borderRadius:2,overflow:'hidden',marginBottom:6}}>
                <div style={{height:'100%',width:`${pct}%`,background:`linear-gradient(90deg,${phase.color},${phase.color}88)`,borderRadius:2,transition:'width .5s'}}/>
              </div>
              {(wk2>0||lt>0)&&<div style={{display:'flex',gap:6}}>
                {wk2>0&&<span style={{fontSize:8,color:'#ef4444'}}>😅{wk2}</span>}
                {lt>0 &&<span style={{fontSize:8,color:'#a855f7'}}>📌{lt}</span>}
              </div>}
            </div>
          )
        })}
      </div>

      {/* Full topic list */}
      <div className="glass" style={{overflow:'hidden'}}>
        <div style={{padding:'13px 18px',background:'rgba(17,20,32,.8)',borderBottom:'1px solid #1a1d2e',
          display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <span style={{fontWeight:700,fontSize:13}}>📋 Week {wk.week} — All Topics</span>
          <span style={{fontSize:10,color:'#8b90b0'}}>✓ tick · rate grasp · ▶ timer · + note</span>
        </div>
        {wk.days.map((day,di)=>(
          <div key={di}>
            <div style={{padding:'9px 18px',background:'rgba(8,9,15,.6)',borderBottom:'1px solid #1a1d2e',
              display:'flex',alignItems:'center',gap:10,cursor:'pointer'}}
              onClick={()=>{setDay(di);setView('daily')}}>
              <span style={{fontSize:10,fontWeight:800,color:phase.color,width:30,flexShrink:0}}>{day.day}</span>
              <span style={{fontSize:11,fontWeight:600,color:'#8b90b0',flex:1}}>{day.label}</span>
              <a href={day.resourceUrl} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()}
                style={{fontSize:9,color:'#454869',textDecoration:'none'}}>📚 {day.resource}</a>
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
          className="btn btn-secondary" style={{padding:'9px 14px',fontSize:16,opacity:dayIdx===0?.4:1}}>‹</button>
        <div style={{flex:1,padding:'12px 18px',
          background:`linear-gradient(135deg,${phase.glow},rgba(5,5,8,.6))`,
          border:`1px solid ${phase.color}44`,borderRadius:14,
          display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:8}}>
          <div>
            <div style={{fontSize:9,color:phase.color,fontWeight:700,letterSpacing:'1px',textTransform:'uppercase'}}>
              {phase.emoji} P{phase.id} · Wk{weekData.week} · {day.day}
            </div>
            <div style={{fontWeight:800,fontSize:17,color:'#e8eaf2',marginTop:2,letterSpacing:'-.02em'}}>{day.label}</div>
            <a href={day.resourceUrl} target="_blank" rel="noreferrer"
              style={{fontSize:10,color:'#8b90b0'}}>📚 {day.resource} ↗</a>
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
          className="btn btn-secondary" style={{padding:'9px 14px',fontSize:16,opacity:dayIdx===weekData.days.length-1?.4:1}}>›</button>
      </div>

      {/* Day tabs */}
      <div style={{display:'flex',gap:4,marginBottom:12,overflowX:'auto',paddingBottom:3}}>
        {weekData.days.map((d,i)=>{
          const cnt = d.topics.filter(t=>done[t.id]).length
          const wk  = d.topics.filter(t=>grasp[t.id]==='weak').length
          return (
            <button key={i} onClick={()=>setDayIdx(i)}
              style={{padding:'4px 11px',borderRadius:99,flexShrink:0,cursor:'pointer',
                border:`1px solid ${dayIdx===i?phase.color:'#1a1d2e'}`,
                background:dayIdx===i?`${phase.color}15`:'transparent',
                color:dayIdx===i?phase.color:'#8b90b0',fontSize:10,fontWeight:700}}>
              {d.day} {cnt===d.topics.length?'✓':`${cnt}/${d.topics.length}`}{wk>0?` 😅${wk}`:''}
            </button>
          )
        })}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 340px',gap:14}}>
        {/* Topics panel */}
        <div>
          <div style={{display:'flex',gap:7,marginBottom:8}}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search topics..."
              className="input" style={{flex:1}}/>
          </div>
          <div style={{display:'flex',gap:4,marginBottom:8,flexWrap:'wrap'}}>
            {tags.map(tag=>(
              <button key={tag} onClick={()=>setTagF(tag===tagF?'All':tag)}
                style={{padding:'2px 10px',borderRadius:99,cursor:'pointer',
                  border:`1px solid ${tagF===tag?phase.color:'#1a1d2e'}`,
                  background:tagF===tag?`${phase.color}15`:'transparent',
                  color:tagF===tag?phase.color:'#8b90b0',fontSize:9,fontWeight:700}}>
                {tag}
              </button>
            ))}
          </div>

          {/* grasp legend */}
          <div style={{background:'#0d0f1a',border:'1px solid #1a1d2e',borderRadius:10,
            padding:'8px 14px',marginBottom:10,display:'flex',alignItems:'center',gap:10,flexWrap:'wrap'}}>
            <span style={{fontSize:9,color:'#454869',fontWeight:600,flexShrink:0}}>Rate grasp →</span>
            {Object.entries(GRASP).map(([k,g])=>(
              <span key={k} style={{fontSize:9,color:g.color,fontWeight:600}}>{g.emoji} {g.label}</span>
            ))}
            <span style={{fontSize:9,color:'#454869',marginLeft:'auto'}}>▶ timer tracks time per topic</span>
          </div>

          <div className="glass" style={{overflow:'hidden'}}>
            <div style={{padding:'11px 18px',background:'rgba(17,20,32,.8)',borderBottom:'1px solid #1a1d2e',
              display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <span style={{fontWeight:700,fontSize:13}}>📋 Today's Topics</span>
              <span style={{fontSize:10,color:'#8b90b0'}}>{filtered.length} showing</span>
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
          <div className="glass" style={{overflow:'hidden',position:'sticky',top:68}}>
            <div style={{padding:'12px 16px',background:'rgba(16,185,129,.08)',
              borderBottom:'1px solid rgba(16,185,129,.15)',display:'flex',alignItems:'center',gap:8}}>
              <span style={{fontSize:20}}>🤖</span>
              <div>
                <div style={{fontWeight:700,fontSize:12,color:'#10b981'}}>ChatGPT Prompt — Today</div>
                <div style={{fontSize:9,color:'#064e3b',letterSpacing:'1px',textTransform:'uppercase'}}>GPT-4o recommended</div>
              </div>
            </div>
            <div style={{padding:14}}>
              <div style={{fontSize:11,color:'#8b90b0',lineHeight:1.75,background:'#08090f',
                borderRadius:10,padding:12,marginBottom:10,border:'1px solid #1a1d2e',
                maxHeight:160,overflowY:'auto',whiteSpace:'pre-wrap'}}>
                {day.chatgpt}
              </div>
              <button onClick={()=>{navigator.clipboard.writeText(day.chatgpt).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000)})}}
                className="btn btn-full" style={{background:copied?'rgba(16,185,129,.15)':'transparent',
                  border:'1px solid rgba(16,185,129,.3)',color:'#10b981',fontWeight:700,padding:'9px',fontSize:12}}>
                {copied?'✓ Copied!':'📋 Copy Prompt'}
              </button>
            </div>
            <div style={{padding:'0 14px 14px'}}>
              <div style={{background:'#08090f',borderRadius:10,border:'1px solid #1a1d2e',padding:12}}>
                <div style={{fontSize:9,color:'#a855f7',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',marginBottom:8}}>
                  ⏰ 2–3hr Daily Schedule
                </div>
                {[['0:00–0:10','🔁 Review yesterday'],['0:10–0:50','📺 Watch + notes'],
                  ['0:50–1:50','💻 Code along'],['1:50–2:30','🔨 Build / practice'],
                  ['2:30–3:00','⬆️ Push to GitHub']].map(([tm,lb])=>(
                  <div key={tm} style={{display:'flex',gap:8,marginBottom:4,alignItems:'center'}}>
                    <span style={{fontFamily:'Space Mono,monospace',fontSize:8,color:'#454869',width:68,flexShrink:0}}>{tm}</span>
                    <span style={{fontSize:10,color:'#8b90b0',background:'#0d0f1a',padding:'2px 8px',borderRadius:6,flex:1}}>{lb}</span>
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
        border:`1px solid ${tab===id?'#6366f1':'#1a1d2e'}`,
        background:tab===id?'rgba(99,102,241,.1)':'transparent',
        color:tab===id?'#818cf8':'#8b90b0',fontSize:11,fontWeight:700}}>
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
            {times[t.id]>0&&<span className="timer-btn timer-idle">⏱ {fmtMs(times[t.id])}</span>}
          </div>
          <div style={{fontSize:13,color:'#e8eaf2',lineHeight:1.55,marginBottom:10}}>{t.text}</div>
          <div style={{display:'flex',alignItems:'center',gap:8,flexWrap:'wrap',marginBottom:4}}>
            <button onClick={()=>toggleDone(t.id)}
              style={{padding:'4px 11px',borderRadius:99,cursor:'pointer',fontSize:10,fontWeight:700,
                border:`1px solid ${done[t.id]?t.phaseColor:'#334155'}`,
                background:done[t.id]?`${t.phaseColor}22`:'transparent',
                color:done[t.id]?t.phaseColor:'#8b90b0'}}>
              {done[t.id]?'✓ Done':'Mark Done'}
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
        <p style={{color:'#8b90b0',fontSize:13}}>Rate topics 💪/🤔/😅/📌 → they auto-appear here. ▶ Timer tracks how long each topic takes.</p>
      </div>

      {/* Stats row */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(130px,1fr))',gap:8,marginBottom:16}}>
        {[
          ['Total',    all.length,                        '#6366f1'],
          ['✓ Done',   all.filter(t=>done[t.id]).length,  '#10b981'],
          ['💪 Strong',Object.values(grasp).filter(v=>v==='strong').length,'#10b981'],
          ['🤔 Mid',   Object.values(grasp).filter(v=>v==='mid').length,   '#f59e0b'],
          ['😅 Weak',  weak.length,                       '#ef4444'],
          ['📌 Later', later.length,                      '#a855f7'],
          ['Not Done', notDone.length,                    '#f97316'],
          ['Backlog',  backlog.length,                    '#ef4444'],
        ].map(([lb,v,c])=>(
          <div key={lb} style={{background:'#0d0f1a',border:`1px solid ${c}33`,borderRadius:12,padding:'12px 14px',textAlign:'center'}}>
            <div style={{fontSize:22,fontWeight:800,color:c}}>{v}</div>
            <div style={{fontSize:10,color:'#8b90b0',marginTop:2}}>{lb}</div>
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
              <div style={{flex:1,height:20,background:'#1a1d2e',borderRadius:99,overflow:'hidden',display:'flex'}}>
                {p.strong>0&&<div style={{width:`${p.strong/p.total*100}%`,background:'#10b981',display:'flex',alignItems:'center',justifyContent:'center'}}>
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
              <div style={{width:35,fontSize:10,color:'#8b90b0',flexShrink:0}}>{Math.round(p.done/p.total*100)}%</div>
            </div>
          ))}
        </div>
        <div style={{display:'flex',gap:12,marginTop:12,flexWrap:'wrap'}}>
          {[['#10b981','💪 Strong'],['#f59e0b','🤔 Mid'],['#ef4444','😅 Weak'],['#a855f7','📌 Later']].map(([c,l])=>(
            <div key={l} style={{display:'flex',alignItems:'center',gap:5}}>
              <div style={{width:10,height:10,borderRadius:2,background:c}}/>
              <span style={{fontSize:10,color:'#8b90b0'}}>{l}</span>
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
                border:`1px solid ${phaseF===ph?'#6366f1':'#1a1d2e'}`,
                background:phaseF===ph?'rgba(99,102,241,.1)':'transparent',
                color:phaseF===ph?'#818cf8':'#8b90b0',fontSize:9,fontWeight:700}}>
              {ph}
            </button>
          ))}
        </div>
      )}

      {tab==='backlog'&&(
        <div>
          <div style={{fontSize:11,color:'#8b90b0',marginBottom:10}}>Not done · Weak · Later · Has note — {byPhase(backlog).length} items</div>
          {byPhase(backlog).length===0
            ?<div style={{padding:'40px',textAlign:'center',color:'#8b90b0',fontSize:14}}>🎉 Backlog empty!</div>
            :<div style={{display:'flex',flexDirection:'column',gap:8}}>{byPhase(backlog).map(t=><Card key={t.id} t={t}/>)}</div>}
        </div>
      )}
      {tab==='weak'&&(
        <div>
          <div style={{fontSize:11,color:'#ef4444',marginBottom:10}}>😅 {byPhase(weak).length} topics to revisit</div>
          {byPhase(weak).length===0?<div style={{padding:'40px',textAlign:'center',color:'#8b90b0',fontSize:14}}>No Weak topics! 💪</div>
            :<div style={{display:'flex',flexDirection:'column',gap:8}}>{byPhase(weak).map(t=><Card key={t.id} t={t}/>)}</div>}
        </div>
      )}
      {tab==='later'&&(
        <div>
          <div style={{fontSize:11,color:'#a855f7',marginBottom:10}}>📌 {byPhase(later).length} items pinned for later</div>
          {byPhase(later).length===0?<div style={{padding:'40px',textAlign:'center',color:'#8b90b0',fontSize:14}}>Nothing pinned!</div>
            :<div style={{display:'flex',flexDirection:'column',gap:8}}>{byPhase(later).map(t=><Card key={t.id} t={t}/>)}</div>}
        </div>
      )}
      {tab==='mid'&&(
        <div>
          <div style={{fontSize:11,color:'#f59e0b',marginBottom:10}}>🤔 {byPhase(mid).length} topics to strengthen</div>
          {byPhase(mid).length===0?<div style={{padding:'40px',textAlign:'center',color:'#8b90b0',fontSize:14}}>No Mid topics!</div>
            :<div style={{display:'flex',flexDirection:'column',gap:8}}>{byPhase(mid).map(t=><Card key={t.id} t={t}/>)}</div>}
        </div>
      )}
      {tab==='plan'&&(
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {weak.length>0&&<div style={{padding:'14px 16px',background:'rgba(239,68,68,.06)',border:'1px solid #ef444433',borderRadius:12}}>
            <div style={{fontSize:12,fontWeight:700,color:'#ef4444',marginBottom:5}}>🚨 Priority 1 — Fix {weak.length} Weak Topics</div>
            <div style={{fontSize:11,color:'#8b90b0',lineHeight:1.65}}>Go to the Weak tab. For each one, use ChatGPT: <span style={{color:'#ef4444',fontWeight:600}}>"Explain [topic] from scratch with 3 examples and 2 exercises."</span></div>
          </div>}
          {later.length>0&&<div style={{padding:'14px 16px',background:'rgba(168,85,247,.06)',border:'1px solid #a855f733',borderRadius:12}}>
            <div style={{fontSize:12,fontWeight:700,color:'#a855f7',marginBottom:5}}>📌 Priority 2 — Clear {later.length} Pinned Topics</div>
            <div style={{fontSize:11,color:'#8b90b0',lineHeight:1.65}}>Schedule a dedicated session this weekend to work through your Later list.</div>
          </div>}
          {mid.length>0&&<div style={{padding:'14px 16px',background:'rgba(245,158,11,.06)',border:'1px solid #f59e0b33',borderRadius:12}}>
            <div style={{fontSize:12,fontWeight:700,color:'#f59e0b',marginBottom:5}}>🔧 Priority 3 — Strengthen {mid.length} Mid Topics</div>
            <div style={{fontSize:11,color:'#8b90b0',lineHeight:1.65}}>Build mini projects using these. ChatGPT: <span style={{color:'#f59e0b',fontWeight:600}}>"Give me a small project to practice [topic] today."</span></div>
          </div>}
          {notDone.length>0&&<div style={{padding:'14px 16px',background:'rgba(99,102,241,.06)',border:'1px solid #6366f133',borderRadius:12}}>
            <div style={{fontSize:12,fontWeight:700,color:'#818cf8',marginBottom:5}}>▶ Continue — {notDone.length} topics remaining ({Math.round(all.filter(t=>done[t.id]).length/all.length*100)}% done)</div>
            <div style={{fontSize:11,color:'#8b90b0'}}>Next: <span style={{color:'#818cf8',fontWeight:600}}>{notDone[0]?.text?.slice(0,70)}</span></div>
          </div>}
        </div>
      )}
    </div>
  )
}

// ── CHATGPT VIEW ──────────────────────────────────────────────────────────────
function ChatGPTView() {
  return (
    <div className="fade-up">
      <div className="glass" style={{padding:'16px 20px',marginBottom:16}}>
        <h2 style={{fontSize:18,fontWeight:800,marginBottom:4}}>🤖 Master ChatGPT Prompts</h2>
        <p style={{color:'#8b90b0',fontSize:13}}>8 universal templates — use these for every single topic across the roadmap</p>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(290px,1fr))',gap:10}}>
        {CHATGPT_TEMPLATES.map((t,i)=>{
          const [cp,setCp] = useState(false)
          return (
            <div key={i} className="glass" style={{padding:16,display:'flex',flexDirection:'column',gap:10,position:'relative',overflow:'hidden',borderColor:`${t.color}22`}}>
              <div style={{position:'absolute',top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${t.color},transparent)`}}/>
              <div style={{display:'flex',alignItems:'center',gap:9}}>
                <div style={{width:34,height:34,borderRadius:8,background:`${t.color}18`,border:`1px solid ${t.color}33`,
                  display:'flex',alignItems:'center',justifyContent:'center',fontSize:16}}>
                  {t.title.split(' ')[0]}
                </div>
                <span style={{fontWeight:700,fontSize:13,color:t.color}}>{t.title.split(' ').slice(1).join(' ')}</span>
              </div>
              <div style={{fontSize:11,color:'#8b90b0',lineHeight:1.7,background:'#08090f',padding:11,
                borderRadius:9,border:'1px solid #1a1d2e',flex:1,fontFamily:'Space Mono,monospace',whiteSpace:'pre-wrap',maxHeight:200,overflowY:'auto'}}>
                {t.prompt}
              </div>
              <button onClick={()=>{navigator.clipboard.writeText(t.prompt).then(()=>{setCp(true);setTimeout(()=>setCp(false),1500)})}}
                style={{padding:'8px',borderRadius:9,border:`1px solid ${cp?t.color:t.color+'44'}`,
                  background:cp?`${t.color}18`:'transparent',color:cp?t.color:'#8b90b0',
                  fontWeight:700,fontSize:11,cursor:'pointer',transition:'all .15s'}}>
                {cp?'✓ Copied!':'📋 Copy Template'}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── ROOT APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const { user, logout } = useAuth()
  const store = useStore(user?.uid || 'guest')
  const { done, grasp, notes, times, timer, prod, toggleDone, setTopicGrasp, setTopicNote, startTimer, stopTimer, resetAll } = store
  const { isPro, isPhaseUnlocked, activatePro, devActivate, plan } = useSubscription(user?.uid || 'guest')

  const [view,      setView]     = useState('map')
  const [phase,     setPhase]    = useState(0)
  const [weekIdx,   setWeekIdx]  = useState(0)
  const [dayIdx,    setDayIdx]   = useState(0)
  const [showPricing, setShowPricing] = useState(false)
  const [showAIChat,  setShowAIChat]  = useState(false)
  const [showAdmin,   setShowAdmin]   = useState(false)
  const [activeTopic, setActiveTopic] = useState(null)

  const stats    = totalStats(done)
  const phaseObj = PHASES[phase]
  const weekData = phaseObj?.weeks_data[weekIdx]
  const currentDay = weekData?.days[dayIdx]
  const currentTopic = activeTopic || currentDay?.topics?.[0]?.text

  useEffect(()=>{
    const h = e => {
      if (view==='daily'&&weekData) {
        if (e.key==='ArrowLeft'  && dayIdx>0)                        setDayIdx(d=>d-1)
        if (e.key==='ArrowRight' && dayIdx<weekData.days.length-1)   setDayIdx(d=>d+1)
      }
    }
    window.addEventListener('keydown',h)
    return ()=>window.removeEventListener('keydown',h)
  },[view,dayIdx,weekData])

  // Firebase loading state
  if (user === undefined || store.synced === false && user !== null) {
    return (
      <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',
        background:'#050508',flexDirection:'column',gap:16}}>
        <div style={{width:48,height:48,borderRadius:14,background:'linear-gradient(135deg,#6366f1,#a855f7)',
          display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,
          animation:'glow 2s ease-in-out infinite'}}>🤖</div>
        <div style={{fontSize:14,color:'#454869'}}>Loading your roadmap...</div>
      </div>
    )
  }
  if (!user) return <AuthRouter/>

  // Show pricing page
  if (showPricing) return (
    <PricingPage
      user={user}
      uid={user?.uid || 'guest'}
      currentPlan={plan?.id || 'free'}
      onSuccess={() => setShowPricing(false)}
      onClose={() => setShowPricing(false)}
    />
  )

  const tabs = [['🗺','Map','map'],['📅','Week','weekly'],['📋','Day','daily'],['📊','Stats','stats'],['📌','Track','tracker'],['🤖','GPT','chatgpt']]
  const hasSidebar = !['chatgpt','tracker','stats'].includes(view)

  // Navigate to phase — check paywall
  const goToPhase = (i) => {
    const p = PHASES[i]
    if (!isPhaseUnlocked(p.id)) { setShowPricing(true); return }
    setPhase(i); setWeekIdx(0); setDayIdx(0); setView('weekly')
  }

  return (
    <div>
      {showAdmin && <AdminPanel onClose={()=>setShowAdmin(false)}/>}
      <Header stats={stats} view={view} setView={setView} user={user} logout={logout}
        onReset={resetAll} isPro={isPro} onUpgrade={()=>setShowPricing(true)}
        onAdmin={()=>setShowAdmin(true)}/>

      {/* Mobile bottom nav */}
      <nav className="mobile-only" style={{position:'fixed',bottom:0,left:0,right:0,zIndex:200,
        background:'rgba(5,5,8,.96)',backdropFilter:'blur(16px)',borderTop:'1px solid #1a1d2e',display:'flex'}}>
        {tabs.map(([ic,lb,v])=>(
          <button key={v} onClick={()=>setView(v)}
            style={{flex:1,padding:'9px 0',border:'none',background:'transparent',
              color:view===v?'#818cf8':'#454869',fontWeight:600,fontSize:9,cursor:'pointer',
              display:'flex',flexDirection:'column',alignItems:'center',gap:2}}>
            <span style={{fontSize:17}}>{ic}</span><span>{lb}</span>
          </button>
        ))}
      </nav>

      {/* Floating AI Chat button */}
      {isPro && (
        <button
          onClick={()=>setShowAIChat(o=>!o)}
          style={{
            position:'fixed', bottom:72, right:20, zIndex:199,
            width:52, height:52, borderRadius:16, border:'none', cursor:'pointer',
            background:'linear-gradient(135deg,#6366f1,#a855f7)',
            color:'#fff', fontSize:22,
            boxShadow:'0 8px 32px rgba(99,102,241,.5)',
            display:'flex', alignItems:'center', justifyContent:'center',
            transition:'all .2s cubic-bezier(.16,1,.3,1)',
            transform: showAIChat ? 'scale(.9) rotate(10deg)' : 'scale(1)',
          }}
          title="AI Tutor">
          {showAIChat ? '✕' : '🤖'}
        </button>
      )}

      {/* AI Chat slide-in panel */}
      {showAIChat && isPro && (
        <div style={{
          position:'fixed', bottom:134, right:20, zIndex:198,
          width:380, height:560, background:'#0d0f1a',
          border:'1px solid #242740', borderRadius:18,
          boxShadow:'0 24px 80px rgba(0,0,0,.7)',
          display:'flex', flexDirection:'column', overflow:'hidden',
          animation:'popIn .3s cubic-bezier(.16,1,.3,1)',
        }}>
          <AIChat
            currentTopic={currentTopic}
            currentPhase={phaseObj}
            isPro={isPro}
            onUpgrade={()=>{setShowAIChat(false);setShowPricing(true)}}
          />
        </div>
      )}

      <div style={{maxWidth:1400,margin:'0 auto',padding:'16px 16px 80px',display:'flex',gap:16}}>
        {hasSidebar&&(
          <div className="desktop-only">
            <Sidebar activePhase={phase} setActivePhase={i=>goToPhase(i)}
              done={done} grasp={grasp} setView={setView} setWeek={setWeekIdx} setDay={setDayIdx}
              isPhaseUnlocked={isPhaseUnlocked} onUpgrade={()=>setShowPricing(true)}/>
          </div>
        )}
        <div style={{flex:1,minWidth:0}}>
          {view==='map'&&(
            <MapView done={done} grasp={grasp}
              setActivePhase={i=>goToPhase(i)} setWeek={setWeekIdx} setDay={setDayIdx} setView={setView}
              isPhaseUnlocked={isPhaseUnlocked} onUpgrade={()=>setShowPricing(true)}/>
          )}
          {view==='weekly'&&phaseObj&&(
            isPhaseUnlocked(phaseObj.id) ? (
              <WeeklyView phase={phaseObj} weekIdx={weekIdx} setWeekIdx={setWeekIdx} setDay={setDayIdx}
                setView={setView} done={done} grasp={grasp} notes={notes} times={times} timer={timer}
                toggleDone={toggleDone} setTopicGrasp={setTopicGrasp} setTopicNote={setTopicNote}
                startTimer={startTimer} stopTimer={stopTimer}/>
            ) : <PaywallOverlay phase={phaseObj} onUpgrade={()=>setShowPricing(true)}/>
          )}
          {view==='daily'&&phaseObj&&weekData&&(
            isPhaseUnlocked(phaseObj.id) ? (
              <DailyView phase={phaseObj} weekData={weekData} dayIdx={dayIdx} setDayIdx={setDayIdx}
                done={done} grasp={grasp} notes={notes} times={times} timer={timer}
                toggleDone={toggleDone} setTopicGrasp={setTopicGrasp} setTopicNote={setTopicNote}
                startTimer={startTimer} stopTimer={stopTimer}
                setActiveTopic={setActiveTopic} isPro={isPro} onUpgrade={()=>setShowPricing(true)}/>
            ) : <PaywallOverlay phase={phaseObj} onUpgrade={()=>setShowPricing(true)}/>
          )}
          {view==='stats'&&(
            isPro
              ? <ProductivityDashboard done={done} grasp={grasp} times={times} prod={prod} user={user}/>
              : <PaywallOverlay phase={{id:'stats',name:'Productivity Dashboard',color:'#6366f1'}} onUpgrade={()=>setShowPricing(true)}/>
          )}
          {view==='tracker'&&<TrackerView done={done} grasp={grasp} notes={notes} times={times} toggleDone={toggleDone} setTopicGrasp={setTopicGrasp} setTopicNote={setTopicNote}/>}
          {view==='chatgpt'&&<ChatGPTView/>}

          {/* Dev controls — remove in production */}
          {!isPro && (
            <div style={{marginTop:24,padding:'12px 16px',background:'rgba(245,158,11,.06)',
              border:'1px solid rgba(245,158,11,.2)',borderRadius:10,display:'flex',alignItems:'center',
              justifyContent:'space-between',flexWrap:'wrap',gap:10}}>
              <span style={{fontSize:11,color:'#f59e0b',fontWeight:600}}>
                🧪 Demo Mode — test without real payment
              </span>
              <button onClick={()=>devActivate('pro_lifetime')}
                style={{padding:'6px 14px',borderRadius:8,background:'rgba(245,158,11,.15)',
                  border:'1px solid rgba(245,158,11,.3)',color:'#f59e0b',fontSize:11,
                  fontWeight:700,cursor:'pointer'}}>
                ⚡ Activate Pro (Demo)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
