import { useState, useMemo } from 'react'
import { PHASES } from '../data.js'
import { fmt } from '../hooks/useStore.js'

const allTopics = () => PHASES.flatMap(p =>
  p.weeks_data.flatMap(w => w.days.flatMap(d =>
    d.topics.map(t => ({ ...t, phaseId:p.id, phaseName:p.name, phaseColor:p.color, phaseEmoji:p.emoji }))
  ))
)

function Ring({ pct, size, stroke, color, children }) {
  const r=(size-stroke)/2, c=2*Math.PI*r
  return (
    <div style={{position:'relative',width:size,height:size,flexShrink:0}}>
      <svg width={size} height={size} style={{transform:'rotate(-90deg)'}}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,.05)" strokeWidth={stroke}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={c} strokeDashoffset={c-c*pct/100} strokeLinecap="round"
          style={{transition:'stroke-dashoffset .8s cubic-bezier(.16,1,.3,1)'}}/>
      </svg>
      {children&&<div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center'}}>{children}</div>}
    </div>
  )
}

function BarChart({ data, valueKey, labelKey, color, height=110, fmt:fmtVal }) {
  const max = Math.max(...data.map(d=>d[valueKey]),1)
  const todayStr = new Date().toISOString().slice(0,10)
  return (
    <div style={{display:'flex',alignItems:'flex-end',gap:3,height,paddingTop:8}}>
      {data.map((d,i)=>{
        const pct  = (d[valueKey]/max)*100
        const isTo = d.date===todayStr
        return (
          <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:3,height:'100%',justifyContent:'flex-end'}}>
            <div
              title={fmtVal?fmtVal(d[valueKey]):d[valueKey]}
              style={{
                width:'100%', borderRadius:'4px 4px 0 0',
                minHeight:3, height:`${Math.max(pct,2)}%`,
                background: isTo
                  ? 'linear-gradient(180deg,var(--cyan),var(--violet))'
                  : pct>0 ? `${color}70` : 'var(--bg3)',
                boxShadow: isTo&&pct>0 ? `0 0 10px rgba(0,229,255,.4)` : 'none',
                transition: 'height .7s cubic-bezier(.16,1,.3,1)',
                cursor: d[valueKey]?'pointer':'default',
              }}
            />
            {data.length<=14&&(
              <span style={{fontSize:7.5,color:isTo?'var(--cyan)':'var(--txt3)',fontWeight:isTo?700:400,whiteSpace:'nowrap'}}>
                {d[labelKey]}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}

function LineChart({ data, valueKey, color, height=80 }) {
  const vals = data.map(d=>d[valueKey])
  const max  = Math.max(...vals,1)
  const pts  = data.map((d,i)=>`${(i/(data.length-1))*100},${100-((d[valueKey]/max)*100)}`).join(' ')
  const area = `0,100 ${pts} 100,100`
  return (
    <div style={{height,position:'relative'}}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{width:'100%',height:'100%'}}>
        <defs>
          <linearGradient id={`lg${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity=".25"/>
            <stop offset="100%" stopColor={color} stopOpacity="0"/>
          </linearGradient>
        </defs>
        <polygon points={area} fill={`url(#lg${color.replace('#','')})`}/>
        <polyline points={pts} fill="none" stroke={color} strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"/>
      </svg>
    </div>
  )
}

// GitHub-style heatmap
function Heatmap({ acts, daily }) {
  const today = new Date()
  const todayStr = today.toISOString().slice(0,10)
  const weeks = []
  const start = new Date(today)
  start.setDate(start.getDate()-111)
  for (let w=0;w<16;w++) {
    const week=[]
    for (let d=0;d<7;d++) {
      const dt=new Date(start); dt.setDate(start.getDate()+w*7+d)
      const ds=dt.toISOString().slice(0,10)
      week.push({date:ds,done:acts[ds]?.done||0,time:daily[ds]||0,future:dt>today})
    }
    weeks.push(week)
  }
  const maxDone=Math.max(...Object.values(acts).map(a=>a.done||0),1)
  const col=(done,future)=>{
    if(future)return'transparent'
    if(!done)return'var(--bg3)'
    const t=done/maxDone
    if(t<.25)return'rgba(0,229,255,.2)'
    if(t<.5) return'rgba(0,229,255,.4)'
    if(t<.8) return'rgba(0,229,255,.65)'
    return'var(--cyan)'
  }
  const dayLbls=['S','M','T','W','T','F','S']
  return (
    <div>
      <div style={{display:'flex',gap:2}}>
        {/* day labels */}
        <div style={{display:'flex',flexDirection:'column',gap:2,marginRight:2}}>
          {dayLbls.map((l,i)=>(
            <div key={i} style={{height:12,width:12,display:'flex',alignItems:'center',justifyContent:'center',
              fontSize:7,color:'var(--txt3)',fontWeight:600}}>{i%2===1?l:''}</div>
          ))}
        </div>
        {/* grid */}
        <div style={{display:'flex',gap:2,overflowX:'auto',flex:1}}>
          {weeks.map((wk,wi)=>(
            <div key={wi} style={{display:'flex',flexDirection:'column',gap:2}}>
              {wk.map((day,di)=>(
                <div key={di}
                  title={day.future?'':`${day.date}: ${day.done} topics, ${fmt(day.time)}`}
                  style={{
                    width:12,height:12,borderRadius:3,flexShrink:0,
                    background:col(day.done,day.future),
                    border:day.date===todayStr?'1.5px solid var(--cyan)':'1px solid transparent',
                    transition:'transform .1s',cursor:day.done?'pointer':'default',
                  }}
                  onMouseEnter={e=>e.currentTarget.style.transform='scale(1.4)'}
                  onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:5,marginTop:8,justifyContent:'flex-end'}}>
        <span style={{fontSize:9,color:'var(--txt3)'}}>Less</span>
        {['var(--bg3)','rgba(0,229,255,.2)','rgba(0,229,255,.4)','rgba(0,229,255,.65)','var(--cyan)'].map((c,i)=>(
          <div key={i} style={{width:11,height:11,borderRadius:3,background:c,border:`1px solid ${c==='var(--bg3)'?'var(--line)':'transparent'}`}}/>
        ))}
        <span style={{fontSize:9,color:'var(--txt3)'}}>More</span>
      </div>
    </div>
  )
}

export default function StatsPage({ store, user }) {
  const { done, grasp, ttime, daily, acts, last7, last30, streak, todayTime, totalTime } = store
  const [range,    setRange]    = useState('7d')
  const [timeTab,  setTimeTab]  = useState('slowest')

  const all   = useMemo(allTopics, [])
  const total = all.length
  const doneN = all.filter(t=>done[t.id]).length
  const pct   = Math.round(doneN/total*100)

  const grp = {
    strong: all.filter(t=>grasp[t.id]==='strong').length,
    mid:    all.filter(t=>grasp[t.id]==='mid').length,
    weak:   all.filter(t=>grasp[t.id]==='weak').length,
    later:  all.filter(t=>grasp[t.id]==='later').length,
  }

  const activeDays = Object.values(acts).filter(a=>a.done>0).length
  const avgPerDay  = activeDays ? (doneN/activeDays).toFixed(1) : 0
  const remaining  = total-doneN
  const daysLeft   = Math.ceil(remaining/(parseFloat(avgPerDay)||1))

  const chartData  = range==='7d' ? last7() : last30()

  const topicsWithTime = all
    .filter(t=>ttime[t.id]>0)
    .map(t=>({...t,time:ttime[t.id]||0}))
    .sort((a,b)=>timeTab==='slowest'?b.time-a.time:a.time-b.time)
    .slice(0,8)

  const phaseStats = PHASES.map(p=>{
    const ts=p.weeks_data.flatMap(w=>w.days.flatMap(d=>d.topics))
    return { ...p,
      total:ts.length,
      done:ts.filter(t=>done[t.id]).length,
      pct:Math.round(ts.filter(t=>done[t.id]).length/ts.length*100),
      strong:ts.filter(t=>grasp[t.id]==='strong').length,
      mid:ts.filter(t=>grasp[t.id]==='mid').length,
      weak:ts.filter(t=>grasp[t.id]==='weak').length,
      later:ts.filter(t=>grasp[t.id]==='later').length,
      time:ts.reduce((a,t)=>a+(ttime[t.id]||0),0),
    }
  })

  // Stat card helper
  const SC = ({v,lbl,sub,color,icon}) => (
    <div style={{background:'var(--bg2)',border:`1px solid ${color}18`,borderRadius:14,
      padding:'16px 18px',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${color},transparent)`}}/>
      <div style={{fontSize:22,marginBottom:6}}>{icon}</div>
      <div style={{fontFamily:'Outfit,sans-serif',fontSize:26,fontWeight:800,color,lineHeight:1}}>{v}</div>
      <div style={{fontSize:12,fontWeight:600,color:'var(--txt)',marginTop:4}}>{lbl}</div>
      {sub&&<div style={{fontSize:10,color:'var(--txt3)',marginTop:2}}>{sub}</div>}
    </div>
  )

  const Pill = ({active,onClick,children}) => (
    <button onClick={onClick}
      style={{padding:'4px 12px',borderRadius:20,cursor:'pointer',fontSize:10,fontWeight:700,
        border:`1px solid ${active?'var(--cyan)':'var(--line2)'}`,
        background:active?'rgba(0,229,255,.08)':'transparent',
        color:active?'var(--cyan)':'var(--txt3)'}}>
      {children}
    </button>
  )

  const Section = ({title,action,children}) => (
    <div style={{background:'var(--bg2)',border:'1px solid var(--line)',borderRadius:16,padding:'18px 20px'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16}}>
        <h3 style={{fontFamily:'Outfit,sans-serif',fontSize:14,fontWeight:700}}>{title}</h3>
        {action}
      </div>
      {children}
    </div>
  )

  return (
    <div className="fade-up" style={{display:'flex',flexDirection:'column',gap:14}}>

      {/* Header */}
      <div style={{padding:'20px 24px',
        background:'linear-gradient(135deg,rgba(0,229,255,.06),rgba(157,123,255,.06))',
        border:'1px solid rgba(0,229,255,.12)',borderRadius:18}}>
        <h2 style={{fontFamily:'Outfit,sans-serif',fontSize:20,fontWeight:800,marginBottom:5}}>⚡ Productivity Stats</h2>
        <p style={{fontSize:13,color:'var(--txt2)'}}>
          Your learning analytics — time per topic · streak · grasp quality · estimated completion
        </p>
      </div>

      {/* Stat cards */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(148px,1fr))',gap:10}}>
        <SC v={`${pct}%`}  lbl="Overall"      sub={`${doneN}/${total} topics`}     color="var(--cyan)"   icon="🎯"/>
        <SC v={`${streak()}d`} lbl="Streak"   sub={streak()>0?'🔥 Keep it up!':'Start today!'} color="var(--pink)" icon="🔥"/>
        <SC v={fmt(totalTime)} lbl="Total Time" sub={`${fmt(todayTime)} today`}    color="var(--violet)" icon="⏱"/>
        <SC v={avgPerDay}   lbl="Topics/Day"  sub={`${activeDays} active days`}     color="var(--amber)"  icon="⚡"/>
        <SC v={daysLeft>365?'∞':`${daysLeft}d`} lbl="Est. Finish" sub="at current pace" color="var(--green)"  icon="🏁"/>
        <SC v={grp.strong}  lbl="Strong"      sub="fully understood"                color="var(--green)"  icon="💪"/>
        <SC v={grp.weak}    lbl="Weak"        sub="need revisiting"                 color="var(--red)"    icon="😅"/>
        <SC v={activeDays}  lbl="Active Days"  sub="days with progress"             color="var(--cyan)"   icon="📅"/>
      </div>

      {/* Heatmap */}
      <Section title="📅 Activity Heatmap (16 weeks)" action={<span style={{fontSize:11,color:'var(--txt3)'}}>Hover for details</span>}>
        <Heatmap acts={acts} daily={daily}/>
      </Section>

      {/* Charts row */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}} className="two-col">
        <Section
          title="Topics Completed / Day"
          action={
            <div style={{display:'flex',gap:4}}>
              <Pill active={range==='7d'} onClick={()=>setRange('7d')}>7d</Pill>
              <Pill active={range==='30d'} onClick={()=>setRange('30d')}>30d</Pill>
            </div>
          }>
          <BarChart data={chartData} valueKey="done" labelKey="label" color="var(--cyan)" height={110}/>
          <p style={{fontSize:10,color:'var(--txt3)',textAlign:'center',marginTop:8}}>
            Peak: {Math.max(...chartData.map(d=>d.done))} topics · Today: {chartData[chartData.length-1]?.done||0}
          </p>
        </Section>

        <Section
          title="Study Time / Day"
          action={<span style={{fontSize:11,color:'var(--violet)'}}>
            Avg: {fmt(Math.round(chartData.reduce((a,d)=>a+d.time,0)/Math.max(chartData.filter(d=>d.time>0).length,1)))}
          </span>}>
          <LineChart data={chartData} valueKey="time" color="var(--violet)" height={110}/>
          <p style={{fontSize:10,color:'var(--txt3)',textAlign:'center',marginTop:8}}>
            {fmt(chartData.reduce((a,d)=>a+d.time,0))} total in {range}
          </p>
        </Section>
      </div>

      {/* Grasp quality + phase progress */}
      <div style={{display:'grid',gridTemplateColumns:'280px 1fr',gap:12}} className="two-col">

        {/* Donut */}
        <Section title="🧠 Grasp Quality">
          <div style={{display:'flex',justifyContent:'center',marginBottom:16}}>
            <Ring pct={doneN?Math.round(grp.strong/doneN*100):0} size={110} stroke={11} color="var(--green)">
              <div style={{textAlign:'center'}}>
                <div style={{fontFamily:'Outfit,sans-serif',fontSize:19,fontWeight:800,color:'var(--green)'}}>
                  {doneN?Math.round(grp.strong/doneN*100):0}%
                </div>
                <div style={{fontSize:9,color:'var(--txt3)'}}>strong</div>
              </div>
            </Ring>
          </div>
          {[['💪 Strong',grp.strong,'var(--green)'],['🤔 Mid',grp.mid,'var(--amber)'],
            ['😅 Weak',grp.weak,'var(--red)'],['📌 Later',grp.later,'var(--violet)']].map(([l,v,c])=>(
            <div key={l} style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
              <span style={{fontSize:11,color:'var(--txt2)',flex:1}}>{l}</span>
              <div style={{flex:2,height:5,background:'var(--bg3)',borderRadius:3,overflow:'hidden'}}>
                <div style={{height:'100%',width:`${(v/(doneN||1))*100}%`,background:c,borderRadius:3,transition:'width .7s'}}/>
              </div>
              <span style={{fontSize:11,color:c,fontWeight:700,width:24,textAlign:'right'}}>{v}</span>
            </div>
          ))}
        </Section>

        {/* Per-phase */}
        <Section title="📈 Phase Progress">
          <div style={{display:'flex',flexDirection:'column',gap:9}}>
            {phaseStats.map(p=>(
              <div key={p.id} style={{display:'flex',alignItems:'center',gap:9}}>
                <span style={{fontSize:13,flexShrink:0}}>{p.emoji}</span>
                <div style={{width:80,fontSize:9.5,color:p.color,fontWeight:700,flexShrink:0,fontFamily:'Outfit,sans-serif'}}>
                  P{p.id} {p.name.split(' ').slice(0,2).join(' ')}
                </div>
                <div style={{flex:1,position:'relative',height:18,background:'var(--bg3)',borderRadius:9,overflow:'hidden'}}>
                  {/* stacked grasp */}
                  <div style={{position:'absolute',inset:0,display:'flex'}}>
                    {p.strong>0&&<div style={{width:`${p.strong/p.total*100}%`,background:'var(--green)',opacity:.7}}/>}
                    {p.mid>0   &&<div style={{width:`${p.mid/p.total*100}%`,   background:'var(--amber)',opacity:.7}}/>}
                    {p.weak>0  &&<div style={{width:`${p.weak/p.total*100}%`,   background:'var(--red)',  opacity:.7}}/>}
                    {p.later>0 &&<div style={{width:`${p.later/p.total*100}%`,  background:'var(--violet)',opacity:.7}}/>}
                  </div>
                  {/* done border */}
                  <div style={{position:'absolute',left:0,top:0,height:'100%',
                    width:`${p.pct}%`,border:'2px solid rgba(255,255,255,.15)',
                    borderRadius:9,pointerEvents:'none',boxSizing:'border-box'}}/>
                  {p.pct>12&&<span style={{position:'absolute',left:8,top:'50%',transform:'translateY(-50%)',
                    fontSize:8,fontWeight:800,color:'var(--bg)'}}>
                    {p.done}/{p.total}
                  </span>}
                </div>
                <span style={{fontSize:9.5,fontWeight:800,color:p.pct===100?'var(--green)':p.color,width:32,textAlign:'right',flexShrink:0}}>{p.pct}%</span>
                <span style={{fontSize:9,color:'var(--txt3)',width:44,textAlign:'right',flexShrink:0,fontFamily:'IBM Plex Mono,monospace'}}>{fmt(p.time)}</span>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* Time per topic */}
      <Section
        title="⏱ Time Per Topic"
        action={
          <div style={{display:'flex',gap:4}}>
            <Pill active={timeTab==='slowest'} onClick={()=>setTimeTab('slowest')}>🐢 Longest</Pill>
            <Pill active={timeTab==='fastest'} onClick={()=>setTimeTab('fastest')}>⚡ Quickest</Pill>
          </div>
        }>
        {topicsWithTime.length===0?(
          <div style={{padding:'30px',textAlign:'center',color:'var(--txt3)',fontSize:13}}>
            ▶ Start timers on topics (Daily view) to see time analytics here
          </div>
        ):(
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {topicsWithTime.map((t,i)=>{
              const maxT = topicsWithTime[0]?.time||1
              return (
                <div key={t.id} style={{display:'flex',alignItems:'center',gap:9}}>
                  <span style={{fontSize:9,color:'var(--txt3)',width:18,fontFamily:'IBM Plex Mono,monospace'}}>#{i+1}</span>
                  <span style={{fontSize:11}}>{t.phaseEmoji}</span>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:11,color:'var(--txt)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',marginBottom:3}}>
                      {t.text}
                    </div>
                    <div style={{height:4,background:'var(--bg3)',borderRadius:2,overflow:'hidden'}}>
                      <div style={{height:'100%',width:`${(t.time/maxT)*100}%`,
                        background:timeTab==='slowest'?'var(--red)':'var(--green)',
                        borderRadius:2,transition:'width .6s'}}/>
                    </div>
                  </div>
                  <span style={{fontSize:11,fontWeight:700,
                    color:timeTab==='slowest'?'var(--red)':'var(--green)',
                    flexShrink:0,fontFamily:'IBM Plex Mono,monospace',minWidth:50,textAlign:'right'}}>
                    {fmt(t.time)}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </Section>

      {/* Smart Insights */}
      <Section title="💡 Smart Insights">
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(230px,1fr))',gap:10}}>
          {[
            streak()>2 && {c:'var(--pink)',  icon:'🔥', t:`${streak()}-day streak!`,        d:"You're on a roll. Don't break the chain — study today."},
            grp.weak>0 && {c:'var(--red)',   icon:'😅', t:`${grp.weak} weak topics`,        d:'Open Tracker → Weak tab. Fix before moving forward.'},
            grp.strong>10&&{c:'var(--green)',icon:'💪', t:`${grp.strong} mastered`,          d:'Strong foundation. Consider building a portfolio project now.'},
            avgPerDay>0&&{c:'var(--cyan)',   icon:'⚡', t:`${avgPerDay} topics/day`,         d:`At this pace, finish in ~${daysLeft} days. ${daysLeft<120?'Incredible!':'Keep pushing!'}`},
            totalTime>3600&&{c:'var(--violet)',icon:'⏱',t:`${fmt(totalTime)} invested`,      d:'Every hour compounds. Your future self thanks you.'},
            !activeDays && {c:'var(--green)',icon:'🌱', t:'Day 1 starts now',               d:'Rate your first topic and start a timer. The journey begins!'},
          ].filter(Boolean).slice(0,4).map((ins,i)=>(
            <div key={i} style={{background:'var(--bg3)',borderRadius:12,padding:'12px 14px',
              border:`1px solid ${ins.c}20`,display:'flex',gap:10,alignItems:'flex-start'}}>
              <span style={{fontSize:20,flexShrink:0}}>{ins.icon}</span>
              <div>
                <div style={{fontSize:12,fontWeight:700,color:ins.c,marginBottom:3}}>{ins.t}</div>
                <div style={{fontSize:11,color:'var(--txt2)',lineHeight:1.55}}>{ins.d}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
