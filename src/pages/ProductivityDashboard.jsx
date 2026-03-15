import { useState, useMemo, useEffect } from 'react'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { PHASES } from '../data.js'
import { format, subDays, differenceInDays } from 'date-fns'

const COLORS = { strong:'var(--cyan)', mid:'#f59e0b', weak:'#ef4444', later:'#a855f7' }

function allTopics() {
  return PHASES.flatMap(p => p.weeks_data.flatMap(w => w.days.flatMap(d =>
    d.topics.map(t => ({ ...t, phaseId:p.id, phaseName:p.name, phaseColor:p.color }))
  )))
}

function CustomTooltip({ active, payload, label }) {
  if (!active||!payload?.length) return null
  return (
    <div style={{background:'var(--bg-surface)',border:'1px solid #242740',borderRadius:8,padding:'8px 12px',fontSize:11}}>
      <div style={{color:'var(--t2)',marginBottom:4}}>{label}</div>
      {payload.map((p,i) => <div key={i} style={{color:p.color||'#e8eaf2',fontWeight:700}}>{p.name}: {p.value}</div>)}
    </div>
  )
}

function StatCard({ icon, label, value, sub, color='var(--cyan)', trend }) {
  return (
    <div style={{background:'var(--bg-surface)',border:'1px solid #1a1d2e',borderRadius:14,padding:'18px 16px',position:'relative',overflow:'hidden',transition:'transform .2s',cursor:'default'}}
      onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
      onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
      <div style={{position:'absolute',top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${color},transparent)`}}/>
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:10}}>
        <div style={{fontSize:22}}>{icon}</div>
        {trend!==undefined && (
          <div style={{fontSize:10,fontWeight:700,padding:'2px 7px',borderRadius:99,
            background:trend>=0?'rgba(34,211,238,.12)':'rgba(239,68,68,.1)',
            color:trend>=0?'var(--cyan)':'#ef4444'}}>
            {trend>=0?'↑':'↓'}{Math.abs(trend)}%
          </div>
        )}
      </div>
      <div style={{fontSize:26,fontWeight:900,color:color,letterSpacing:'-.03em',lineHeight:1}}>{value}</div>
      <div style={{fontSize:12,color:'#e8eaf2',fontWeight:600,marginTop:5}}>{label}</div>
      {sub && <div style={{fontSize:10,color:'var(--t3)',marginTop:3}}>{sub}</div>}
    </div>
  )
}

// ── INACTIVITY TRACKER ────────────────────────────────────────────────────────
function InactivityTracker({ prod }) {
  const today = new Date().toISOString().slice(0,10)

  // Build last 30 days activity
  const days = useMemo(() => {
    return Array.from({length:30},(_,i) => {
      const d = subDays(new Date(), 29-i)
      const key = d.toISOString().slice(0,10)
      const data = prod[key]
      const active = data && (data.topics>0 || data.minutes>0)
      return { date:key, label:format(d,'d MMM'), active, topics:data?.topics||0, minutes:data?.minutes||0 }
    })
  }, [prod])

  const streak = useMemo(() => {
    let s = 0
    for (let i=days.length-1; i>=0; i--) {
      if (days[i].date === today && !days[i].active) continue // today doesn't break streak
      if (days[i].active) s++
      else break
    }
    return s
  }, [days])

  // Days inactive in last 30
  const inactiveDays = days.filter(d => d.date !== today && !d.active).length
  const inactivityPct = Math.round((inactiveDays / 29) * 100)

  // Inactivity score: higher = more inactive (bad)
  const inactivityData = useMemo(() => {
    let running = 0
    return days.map((d, i) => {
      if (d.active) running = Math.max(0, running - 20)
      else if (d.date !== today) running = Math.min(100, running + 8)
      return { label: d.label, inactivity: running, active: d.active }
    })
  }, [days])

  const currentInactivity = inactivityData[inactivityData.length-1]?.inactivity || 0
  const inactivityColor = currentInactivity < 20 ? 'var(--cyan)' : currentInactivity < 50 ? '#f59e0b' : '#ef4444'
  const inactivityMsg = currentInactivity < 10 ? '🔥 On fire! Keep going!' 
    : currentInactivity < 25 ? '✅ Good pace — stay consistent'
    : currentInactivity < 50 ? '⚠️ Slowing down — study something today'
    : currentInactivity < 75 ? '😰 You\'ve been inactive — comeback time!'
    : '🚨 High inactivity — your dream needs action!'

  return (
    <div style={{background:'var(--bg-surface)',border:`1px solid ${inactivityColor}33`,borderRadius:16,padding:'20px',marginBottom:16}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16,flexWrap:'wrap',gap:10}}>
        <div>
          <div style={{fontSize:14,fontWeight:800,color:'#e8eaf2',marginBottom:3}}>📉 Inactivity Tracker</div>
          <div style={{fontSize:12,color:inactivityColor,fontWeight:600}}>{inactivityMsg}</div>
        </div>
        <div style={{display:'flex',gap:10}}>
          <div style={{textAlign:'center',padding:'8px 14px',borderRadius:10,background:`${inactivityColor}10`,border:`1px solid ${inactivityColor}33`}}>
            <div style={{fontSize:22,fontWeight:900,color:inactivityColor}}>{currentInactivity}%</div>
            <div style={{fontSize:9,color:'var(--t2)',fontWeight:600}}>INACTIVITY</div>
          </div>
          <div style={{textAlign:'center',padding:'8px 14px',borderRadius:10,background:'rgba(34,211,238,.08)',border:'1px solid rgba(34,211,238,.2)'}}>
            <div style={{fontSize:22,fontWeight:900,color:'var(--cyan)'}}>{streak}</div>
            <div style={{fontSize:9,color:'var(--t2)',fontWeight:600}}>DAY STREAK</div>
          </div>
        </div>
      </div>

      {/* Inactivity area chart — rises when inactive, drops when you study */}
      <div style={{marginBottom:12}}>
        <div style={{fontSize:10,color:'var(--t3)',marginBottom:6}}>Inactivity level — rises when you don't study, drops when you do</div>
        <ResponsiveContainer width="100%" height={100}>
          <AreaChart data={inactivityData}>
            <defs>
              <linearGradient id="inGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={inactivityColor} stopOpacity={0.3}/>
                <stop offset="100%" stopColor={inactivityColor} stopOpacity={0.02}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="label" tick={{fontSize:8,fill:'var(--t3)'}} tickLine={false} axisLine={false} interval={4}/>
            <Tooltip content={<CustomTooltip/>}/>
            <Area type="monotone" dataKey="inactivity" stroke={inactivityColor} strokeWidth={2} fill="url(#inGrad)"/>
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Daily activity heatmap */}
      <div style={{fontSize:10,color:'var(--t3)',marginBottom:6}}>Last 30 days — green = active, red = inactive</div>
      <div style={{display:'flex',gap:3,flexWrap:'wrap'}}>
        {days.map((d,i) => (
          <div key={i} title={`${d.label}: ${d.active?`${d.topics} topics, ${d.minutes}min`:'No activity'}`}
            style={{width:20,height:20,borderRadius:4,fontSize:8,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,
              background: d.date===today ? 'rgba(34,211,238,.2)' : d.active ? 'rgba(34,211,238,.25)' : 'rgba(239,68,68,.12)',
              border: `1px solid ${d.date===today?'#6366f144':d.active?'rgba(34,211,238,.3)':'rgba(239,68,68,.2)'}`,
              color: d.date===today?'var(--cyan)':d.active?'var(--cyan)':'#ef4444',
            }}>
            {d.date===today ? '·' : d.active ? '✓' : ''}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── NOTEBOOK LM GUIDE ──────────────────────────────────────────────────────────
function NotebookLMGuide() {
  const [open, setOpen] = useState(false)
  const prompts = [
    { title:'Summarize a research paper', prompt:'Summarize this paper in 5 bullet points. Then explain: 1) The core idea, 2) Why it matters for AI Engineering, 3) One practical way I can apply this today.' },
    { title:'Quiz me on uploaded content', prompt:'Quiz me on the content I uploaded. Ask 5 questions — mix of MCQ and short answer. After I answer each, tell me if I\'m right and explain the correct answer.' },
    { title:'Connect concepts across sources', prompt:'I have uploaded [paper 1] and [paper 2]. Explain how these two concepts relate. Where do they agree? Where do they differ? How do they work together?' },
    { title:'Study guide generator', prompt:'Create a structured study guide from my uploaded materials. Include: key concepts, important formulas, common use cases, and 5 practice questions.' },
    { title:'Explain like I\'m a beginner', prompt:'I am a beginner learning AI Engineering. Explain this concept from my uploaded document in the simplest terms possible. Use a real-world analogy.' },
    { title:'Interview prep from docs', prompt:'Based on my uploaded materials, generate 10 interview questions an AI company might ask about this topic. Include the ideal answer for each.' },
    { title:'Code implementation guide', prompt:'Based on this paper/doc, write a Python implementation of the key algorithm. Include comments explaining each step and a simple test case.' },
    { title:'Roadmap from papers', prompt:'I want to learn this topic deeply. Based on my uploaded materials, create a 2-week learning roadmap. What should I study day by day?' },
  ]

  return (
    <div style={{background:'var(--bg-surface)',border:'1px solid rgba(6,182,212,.25)',borderRadius:16,overflow:'hidden',marginBottom:16}}>
      <button onClick={()=>setOpen(o=>!o)}
        style={{width:'100%',padding:'18px 20px',background:'linear-gradient(135deg,rgba(6,182,212,.08),rgba(34,211,238,.05))',
          border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'space-between',gap:12}}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <div style={{width:36,height:36,borderRadius:10,background:'linear-gradient(135deg,#06b6d4,#6366f1)',
            display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>📓</div>
          <div style={{textAlign:'left'}}>
            <div style={{fontSize:14,fontWeight:800,color:'#e8eaf2'}}>NotebookLM — Your AI Study Partner</div>
            <div style={{fontSize:11,color:'#06b6d4'}}>Google's free AI tool to study any paper, doc, or video transcript</div>
          </div>
        </div>
        <span style={{color:'var(--t2)',fontSize:18,transition:'transform .2s',transform:open?'rotate(180deg)':'rotate(0)'}}>▾</span>
      </button>

      {open && (
        <div style={{padding:'0 20px 20px',animation:'fadeUp .25s ease'}}>
          {/* What is NotebookLM */}
          <div style={{padding:'16px',borderRadius:12,background:'rgba(6,182,212,.06)',border:'1px solid rgba(6,182,212,.15)',marginBottom:16,marginTop:16}}>
            <div style={{fontSize:12,fontWeight:700,color:'#06b6d4',marginBottom:8}}>📌 What is NotebookLM?</div>
            <div style={{fontSize:12,color:'var(--t2)',lineHeight:1.8}}>
              NotebookLM is a free AI tool by Google that lets you upload any document — research papers, YouTube transcripts, PDFs, notes — and ask questions about it.<br/><br/>
              <strong style={{color:'#e8eaf2'}}>How to access:</strong> Go to <span style={{color:'#06b6d4',fontWeight:700}}>notebooklm.google.com</span> → Sign in with Google → Create a notebook → Upload your documents<br/><br/>
              <strong style={{color:'#e8eaf2'}}>Best use for AI learning:</strong> Upload research papers (Attention Is All You Need, GPT papers, etc.), paste YouTube video transcripts, add your own notes — then use the prompts below to study deeply.
            </div>
          </div>

          {/* How to get YouTube transcripts */}
          <div style={{padding:'14px',borderRadius:12,background:'rgba(239,68,68,.06)',border:'1px solid rgba(239,68,68,.15)',marginBottom:16}}>
            <div style={{fontSize:12,fontWeight:700,color:'#f87171',marginBottom:8}}>▶ How to add YouTube videos to NotebookLM</div>
            <div style={{fontSize:12,color:'var(--t2)',lineHeight:1.8}}>
              1. Open any YouTube video → click <strong style={{color:'#e8eaf2'}}>... (3 dots)</strong> → <strong style={{color:'#e8eaf2'}}>Show transcript</strong><br/>
              2. Copy the entire transcript<br/>
              3. In NotebookLM → <strong style={{color:'#e8eaf2'}}>Add source → Paste text</strong><br/>
              4. Now ask it questions about the video content!<br/><br/>
              <em style={{color:'var(--t3)'}}>Tip: Paste multiple video transcripts + a paper on the same topic → ask NotebookLM to connect them.</em>
            </div>
          </div>

          {/* Prompts grid */}
          <div style={{fontSize:13,fontWeight:700,color:'#e8eaf2',marginBottom:12}}>🎯 8 Best Prompts for AI Engineering Study</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:10}}>
            {prompts.map((p,i)=>(
              <div key={i} style={{background:'#08090f',border:'1px solid #1a1d2e',borderRadius:12,padding:'14px',transition:'border-color .15s'}}
                onMouseEnter={e=>e.currentTarget.style.borderColor='#06b6d4'}
                onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border)'}>
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
                  <div style={{width:20,height:20,borderRadius:5,background:'linear-gradient(135deg,#06b6d4,#6366f1)',
                    display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,fontWeight:900,color:'#fff',flexShrink:0}}>
                    {i+1}
                  </div>
                  <div style={{fontSize:12,fontWeight:700,color:'#06b6d4'}}>{p.title}</div>
                </div>
                <div style={{fontSize:11,color:'var(--t2)',lineHeight:1.65,fontStyle:'italic',background:'rgba(255,255,255,.02)',padding:'8px',borderRadius:7,border:'1px solid #1a1d2e'}}>
                  "{p.prompt}"
                </div>
                <button onClick={()=>navigator.clipboard.writeText(p.prompt)}
                  style={{marginTop:8,width:'100%',padding:'5px',borderRadius:7,border:'1px solid #1a1d2e',background:'transparent',color:'var(--t3)',fontSize:10,fontWeight:700,cursor:'pointer',transition:'all .15s'}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor='#06b6d4';e.currentTarget.style.color='#06b6d4'}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.color='var(--t3)'}}>
                  📋 Copy Prompt
                </button>
              </div>
            ))}
          </div>

          {/* Key papers to upload */}
          <div style={{marginTop:16,padding:'14px',borderRadius:12,background:'rgba(168,85,247,.06)',border:'1px solid rgba(168,85,247,.15)'}}>
            <div style={{fontSize:12,fontWeight:700,color:'#a855f7',marginBottom:8}}>📄 Must-Upload Papers for AI Engineers</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:6}}>
              {[
                ['Attention Is All You Need','arxiv.org/abs/1706.03762','The Transformer paper — foundation of everything'],
                ['GPT-3 Paper','arxiv.org/abs/2005.14165','How large language models work'],
                ['BERT Paper','arxiv.org/abs/1810.04805','Bidirectional language understanding'],
                ['Retrieval-Augmented Generation','arxiv.org/abs/2005.11401','How RAG systems are built'],
                ['LoRA Paper','arxiv.org/abs/2106.09685','Fine-tuning LLMs efficiently'],
                ['LangChain Docs','python.langchain.com','Building AI applications'],
              ].map(([title,url,desc])=>(
                <a key={title} href={`https://${url}`} target="_blank" rel="noreferrer"
                  style={{display:'block',padding:'10px',borderRadius:9,background:'var(--bg-surface)',
                    border:'1px solid rgba(168,85,247,.15)',textDecoration:'none',transition:'border-color .15s'}}
                  onMouseEnter={e=>e.currentTarget.style.borderColor='#a855f7'}
                  onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(168,85,247,.15)'}>
                  <div style={{fontSize:11,fontWeight:700,color:'#a855f7',marginBottom:3}}>{title}</div>
                  <div style={{fontSize:10,color:'var(--t3)'}}>{desc}</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── MAIN DASHBOARD ────────────────────────────────────────────────────────────
export default function ProductivityDashboard({ done, grasp, times, prod, user }) {
  const [range, setRange] = useState(14)
  const all = useMemo(() => allTopics(), [])

  const completed   = all.filter(t => done[t.id]).length
  const total       = all.length
  const pct         = Math.round(completed/total*100)
  const strongCount = all.filter(t => grasp[t.id]==='strong').length
  const weakCount   = all.filter(t => grasp[t.id]==='weak').length

  const totalMs   = Object.values(times||{}).reduce((s,v)=>s+v,0)
  const totalMins = Math.round(totalMs/60000)
  const totalHrs  = (totalMins/60).toFixed(1)

  // Streak
  const streak = useMemo(() => {
    const today = new Date().toISOString().slice(0,10)
    let s = 0
    for (let i=0; i<60; i++) {
      const d = subDays(new Date(), i).toISOString().slice(0,10)
      if (d===today && !(prod[d]?.topics>0)) continue
      if (prod[d]?.topics>0 || prod[d]?.minutes>0) s++
      else break
    }
    return s
  }, [prod])

  // Chart data: last N days
  const chartData = useMemo(() => Array.from({length:range},(_,i) => {
    const d = subDays(new Date(), range-1-i).toISOString().slice(0,10)
    const p = prod[d] || {}
    return { label: format(new Date(d+'T12:00'), 'd MMM'), topics: p.topics||0, minutes: p.minutes||0 }
  }), [prod, range])

  // Grasp pie
  const graspData = [
    { name:'Strong', value:strongCount,                                color:'var(--cyan)' },
    { name:'Mid',    value:all.filter(t=>grasp[t.id]==='mid').length,  color:'#f59e0b' },
    { name:'Weak',   value:weakCount,                                  color:'#ef4444' },
    { name:'Later',  value:all.filter(t=>grasp[t.id]==='later').length,color:'#a855f7' },
  ].filter(d=>d.value>0)

  // Top 6 most time-spent topics
  const topTopics = useMemo(() => all
    .filter(t => times[t.id]>0)
    .sort((a,b) => (times[b.id]||0)-(times[a.id]||0))
    .slice(0,6)
    .map(t => ({ name: t.text.slice(0,32)+'…', mins: Math.round((times[t.id]||0)/60000), color: COLORS[grasp[t.id]]||'var(--cyan)' }))
  , [times, grasp])

  const hasData = completed>0 || Object.keys(prod).length>0

  return (
    <div style={{paddingBottom:40}}>
      {/* Header */}
      <div style={{marginBottom:20,padding:'18px 20px',background:'linear-gradient(135deg,#0d0f1a,#111420)',border:'1px solid #1a1d2e',borderRadius:16,position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:0,left:0,right:0,height:2,background:'linear-gradient(90deg,#6366f1,#a855f7,#06b6d4)'}}/>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:10}}>
          <div>
            <div style={{fontSize:20,fontWeight:900,letterSpacing:'-.03em'}}>📊 Your Progress Dashboard</div>
            <div style={{fontSize:12,color:'var(--t2)',marginTop:3}}>
              {user?.name ? `Welcome back, ${user.name}` : 'Track your AI Engineering journey'}
            </div>
          </div>
          <div style={{display:'flex',gap:5}}>
            {[7,14,30].map(r=>(
              <button key={r} onClick={()=>setRange(r)}
                style={{padding:'5px 12px',borderRadius:8,cursor:'pointer',fontSize:11,fontWeight:700,
                  border:`1px solid ${range===r?'var(--cyan)':'#242740'}`,
                  background:range===r?'rgba(34,211,238,.15)':'transparent',
                  color:range===r?'var(--cyan)':'var(--t3)'}}>
                {r}d
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Inactivity tracker */}
      <InactivityTracker prod={prod}/>

      {/* Stats grid */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))',gap:10,marginBottom:16}}>
        <StatCard icon="🎯" label="Completion"    value={`${pct}%`}    sub={`${completed}/${total} topics`}  color="#6366f1"/>
        <StatCard icon="🔥" label="Day Streak"    value={streak}       sub="consecutive days"                 color="#f59e0b"/>
        <StatCard icon="⏱"  label="Time Studied"  value={`${totalHrs}h`} sub={`${totalMins} minutes total`}  color="#06b6d4"/>
        <StatCard icon="💪" label="Strong Topics" value={strongCount}  sub="fully grasped"                    color="#10b981"/>
        <StatCard icon="😅" label="Weak Topics"   value={weakCount}    sub="need more practice"               color="#ef4444"/>
        <StatCard icon="📅" label="Days Active"   value={Object.keys(prod).length} sub="in total"             color="#a855f7"/>
      </div>

      {!hasData ? (
        <div style={{padding:'48px 24px',textAlign:'center',background:'var(--bg-surface)',border:'1px solid #1a1d2e',borderRadius:16,marginBottom:16}}>
          <div style={{fontSize:48,marginBottom:14}}>📊</div>
          <div style={{fontSize:17,fontWeight:800,marginBottom:8}}>No data yet</div>
          <div style={{color:'var(--t2)',fontSize:13,lineHeight:1.65}}>Start completing topics and the dashboard will fill up.<br/>Your progress, streaks, and study time will appear here.</div>
        </div>
      ) : (
        <>
          {/* Charts row */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:12,marginBottom:12}}>
            {/* Topics per day */}
            <div style={{background:'var(--bg-surface)',border:'1px solid #1a1d2e',borderRadius:14,padding:'16px 14px'}}>
              <div style={{fontSize:12,fontWeight:700,marginBottom:12,color:'#e8eaf2'}}>✅ Topics Completed / Day</div>
              <ResponsiveContainer width="100%" height={130}>
                <AreaChart data={chartData}>
                  <defs><linearGradient id="topicGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6366f1" stopOpacity={0.35}/><stop offset="100%" stopColor="#6366f1" stopOpacity={0.02}/></linearGradient></defs>
                  <XAxis dataKey="label" tick={{fontSize:8,fill:'var(--t3)'}} tickLine={false} axisLine={false} interval={Math.floor(range/5)}/>
                  <Tooltip content={<CustomTooltip/>}/>
                  <Area type="monotone" dataKey="topics" stroke="#6366f1" strokeWidth={2} fill="url(#topicGrad)" name="Topics"/>
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Study time per day */}
            <div style={{background:'var(--bg-surface)',border:'1px solid #1a1d2e',borderRadius:14,padding:'16px 14px'}}>
              <div style={{fontSize:12,fontWeight:700,marginBottom:12,color:'#e8eaf2'}}>⏱ Study Minutes / Day</div>
              <ResponsiveContainer width="100%" height={130}>
                <BarChart data={chartData}>
                  <XAxis dataKey="label" tick={{fontSize:8,fill:'var(--t3)'}} tickLine={false} axisLine={false} interval={Math.floor(range/5)}/>
                  <Tooltip content={<CustomTooltip/>}/>
                  <Bar dataKey="minutes" fill="#06b6d4" radius={[3,3,0,0]} name="Minutes"/>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Grasp distribution */}
            {graspData.length>0 && (
              <div style={{background:'var(--bg-surface)',border:'1px solid #1a1d2e',borderRadius:14,padding:'16px 14px'}}>
                <div style={{fontSize:12,fontWeight:700,marginBottom:8,color:'#e8eaf2'}}>🧠 Grasp Distribution</div>
                <div style={{display:'flex',alignItems:'center',gap:10}}>
                  <ResponsiveContainer width={110} height={110}>
                    <PieChart>
                      <Pie data={graspData} dataKey="value" innerRadius={30} outerRadius={50} paddingAngle={2}>
                        {graspData.map((d,i)=><Cell key={i} fill={d.color}/>)}
                      </Pie>
                      <Tooltip content={<CustomTooltip/>}/>
                    </PieChart>
                  </ResponsiveContainer>
                  <div style={{display:'flex',flexDirection:'column',gap:5}}>
                    {graspData.map(d=>(
                      <div key={d.name} style={{display:'flex',alignItems:'center',gap:6}}>
                        <div style={{width:8,height:8,borderRadius:2,background:d.color,flexShrink:0}}/>
                        <span style={{fontSize:11,color:'var(--t2)'}}>{d.name}</span>
                        <span style={{fontSize:11,fontWeight:700,color:d.color,marginLeft:'auto'}}>{d.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Time per topic */}
            {topTopics.length>0 && (
              <div style={{background:'var(--bg-surface)',border:'1px solid #1a1d2e',borderRadius:14,padding:'16px 14px'}}>
                <div style={{fontSize:12,fontWeight:700,marginBottom:12,color:'#e8eaf2'}}>⏱ Most Time Spent</div>
                <div style={{display:'flex',flexDirection:'column',gap:8}}>
                  {topTopics.map((t,i)=>(
                    <div key={i}>
                      <div style={{display:'flex',justifyContent:'space-between',fontSize:10,marginBottom:4}}>
                        <span style={{color:'var(--t2)',maxWidth:'75%',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{t.name}</span>
                        <span style={{color:t.color,fontWeight:700,flexShrink:0}}>{t.mins}m</span>
                      </div>
                      <div style={{height:4,background:'var(--border)',borderRadius:2,overflow:'hidden'}}>
                        <div style={{height:'100%',width:`${Math.min(100,(t.mins/topTopics[0].mins)*100)}%`,background:t.color,borderRadius:2,transition:'width .6s'}}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* NotebookLM Guide */}
      <NotebookLMGuide/>
    </div>
  )
}
