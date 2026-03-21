import { useState, useEffect } from 'react'
import { collection, onSnapshot, doc, setDoc, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../firebase.js'
import { PHASES } from '../data.js'

function allTopics() {
  return PHASES.flatMap(p => p.weeks_data.flatMap(w => w.days.flatMap(d => d.topics)))
}

const TOTAL = allTopics().length

const MEDALS = ['🥇','🥈','🥉']
const RANKS  = [
  { min:0,   label:'Beginner',    color:'#94a3b8', emoji:'🌱' },
  { min:10,  label:'Explorer',    color:'#34d399', emoji:'🔍' },
  { min:30,  label:'Learner',     color:'#22d3ee', emoji:'📚' },
  { min:60,  label:'Builder',     color:'#60a5fa', emoji:'🔨' },
  { min:100, label:'Engineer',    color:'#a78bfa', emoji:'⚙️' },
  { min:150, label:'Specialist',  color:'#f59e0b', emoji:'🎯' },
  { min:200, label:'Expert',      color:'#fb7185', emoji:'🚀' },
  { min:250, label:'AI Architect',color:'#fbbf24', emoji:'🏆' },
]

function getRank(score) {
  return [...RANKS].reverse().find(r => score >= r.min) || RANKS[0]
}

// Push current user's score to Firestore leaderboard
export async function syncLeaderboard(uid, displayName, done, grasp) {
  if (!uid || uid === 'guest') return
  try {
    const completed = Object.values(done||{}).filter(Boolean).length
    const strong    = Object.entries(grasp||{}).filter(([,v])=>v==='strong').length
    const score     = completed * 10 + strong * 5
    await setDoc(doc(db,'leaderboard',uid), {
      uid, displayName: displayName || 'Anonymous',
      completed, strong, score,
      pct: Math.round(completed / TOTAL * 100),
      updatedAt: new Date().toISOString(),
    }, { merge: true })
  } catch(e) {}
}

export default function Leaderboard({ user, done, grasp }) {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [myRank,  setMyRank]  = useState(null)

  // Sync my score on mount
  useEffect(() => {
    if (user?.uid) {
      const name = user.displayName || user.email?.split('@')[0] || 'You'
      syncLeaderboard(user.uid, name, done, grasp)
    }
  }, [user?.uid, done, grasp])

  // Live listener
  useEffect(() => {
    const q = query(collection(db,'leaderboard'), orderBy('score','desc'), limit(50))
    const unsub = onSnapshot(q, snap => {
      const data = snap.docs.map((d,i) => ({ ...d.data(), rank: i+1 }))
      setEntries(data)
      const me = data.findIndex(e => e.uid === user?.uid)
      setMyRank(me === -1 ? null : me + 1)
      setLoading(false)
    }, () => setLoading(false))
    return unsub
  }, [user?.uid])

  const myEntry = entries.find(e => e.uid === user?.uid)
  const myScore = myEntry?.score || 0
  const myRankData = getRank(myScore)

  return (
    <div className="fade-up" style={{ maxWidth: 680 }}>

      {/* Header */}
      <div style={{ marginBottom: 16, padding: '18px 20px',
        background: 'var(--bg-surface)', border: '1px solid var(--border)',
        borderRadius: 18, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position:'absolute',top:0,left:0,right:0,height:2,
          background:'linear-gradient(90deg,#fbbf24,#fb7185,#a78bfa)' }}/>
        <div style={{ fontFamily:'var(--font-mono)',fontSize:9,color:'var(--cyan)',
          letterSpacing:3,textTransform:'uppercase',marginBottom:6,opacity:.7 }}>
          // LIVE LEADERBOARD
        </div>
        <h1 style={{ fontFamily:'var(--font-display)',fontSize:'clamp(18px,3vw,26px)',
          fontWeight:700,color:'var(--t1)',marginBottom:4 }}>
          🏆 Neural Protocol Rankings
        </h1>
        <p style={{ fontFamily:'var(--font-body)',fontSize:13,color:'var(--t2)' }}>
          Live rankings · Updates as you learn · Top 50 learners
        </p>
      </div>

      {/* My stats card */}
      {user && (
        <div style={{ marginBottom: 14, padding: '14px 18px',
          background: `linear-gradient(135deg,rgba(251,191,36,.08),rgba(167,139,250,.06))`,
          border: '1px solid rgba(251,191,36,.25)', borderRadius: 14,
          display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          <div style={{ fontSize: 32 }}>{myRankData.emoji}</div>
          <div style={{ flex: 1, minWidth: 120 }}>
            <div style={{ fontFamily:'var(--font-display)',fontSize:16,fontWeight:700,color:'var(--t1)' }}>
              {user.displayName || user.email?.split('@')[0] || 'You'}
            </div>
            <div style={{ fontFamily:'var(--font-mono)',fontSize:10,color:myRankData.color,
              letterSpacing:1,marginTop:2 }}>{myRankData.emoji} {myRankData.label}</div>
          </div>
          <div style={{ display:'flex',gap:10 }}>
            {[
              { l:'Rank', v: myRank ? `#${myRank}` : '—', c:'#fbbf24' },
              { l:'Score', v: myScore, c:'var(--cyan)' },
              { l:'Done', v: myEntry?.completed||0, c:'#34d399' },
            ].map(s => (
              <div key={s.l} style={{ textAlign:'center',padding:'8px 12px',
                background:'var(--bg-glass)',borderRadius:10,border:'1px solid var(--border)' }}>
                <div style={{ fontFamily:'var(--font-display)',fontSize:18,fontWeight:700,color:s.c }}>
                  {s.v}
                </div>
                <div style={{ fontFamily:'var(--font-body)',fontSize:10,color:'var(--t3)' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Leaderboard table */}
      <div style={{ background:'var(--bg-surface)',border:'1px solid var(--border)',
        borderRadius:16,overflow:'hidden' }}>

        {/* Table header */}
        <div style={{ display:'grid',gridTemplateColumns:'40px 1fr 70px 70px 70px',
          padding:'10px 16px',borderBottom:'1px solid var(--border)',
          background:'var(--bg-glass)' }}>
          {['#','Learner','Done','Strong','Score'].map(h => (
            <div key={h} style={{ fontFamily:'var(--font-mono)',fontSize:9,
              color:'var(--t3)',letterSpacing:1,textTransform:'uppercase',
              textAlign: h==='#'||h==='Learner' ? 'left' : 'center' }}>{h}</div>
          ))}
        </div>

        {loading && (
          <div style={{ padding:'40px',textAlign:'center' }}>
            <div className="spinner" style={{ margin:'0 auto' }}/>
          </div>
        )}

        {!loading && entries.length === 0 && (
          <div style={{ padding:'40px',textAlign:'center' }}>
            <div style={{ fontSize:32,marginBottom:10 }}>🌱</div>
            <div style={{ fontFamily:'var(--font-body)',fontSize:14,color:'var(--t2)',marginBottom:4 }}>
              No rankings yet
            </div>
            <div style={{ fontFamily:'var(--font-body)',fontSize:12,color:'var(--t3)' }}>
              Be the first! Start completing topics to appear here.
            </div>
          </div>
        )}

        {entries.map((e, i) => {
          const isMe   = e.uid === user?.uid
          const rank   = getRank(e.score)
          const medal  = MEDALS[i]
          return (
            <div key={e.uid} style={{
              display:'grid', gridTemplateColumns:'40px 1fr 70px 70px 70px',
              padding:'11px 16px',
              borderBottom: i < entries.length-1 ? '1px solid var(--border)' : 'none',
              background: isMe ? 'rgba(251,191,36,.06)' : 'transparent',
              transition:'background .15s',
            }}
            onMouseEnter={e2=>!isMe&&(e2.currentTarget.style.background='var(--bg-glass)')}
            onMouseLeave={e2=>!isMe&&(e2.currentTarget.style.background='transparent')}
            >
              {/* Rank */}
              <div style={{ fontFamily:'var(--font-display)',fontSize:14,fontWeight:700,
                color: medal ? 'var(--t1)' : 'var(--t3)',
                display:'flex',alignItems:'center' }}>
                {medal || `${i+1}`}
              </div>

              {/* Name + rank badge */}
              <div style={{ display:'flex',alignItems:'center',gap:8,minWidth:0 }}>
                <div style={{ width:32,height:32,borderRadius:8,flexShrink:0,
                  background:`${rank.color}22`,border:`1px solid ${rank.color}44`,
                  display:'flex',alignItems:'center',justifyContent:'center',fontSize:16 }}>
                  {rank.emoji}
                </div>
                <div style={{ minWidth:0 }}>
                  <div style={{ fontFamily:'var(--font-display)',fontSize:13,fontWeight:600,
                    color: isMe ? '#fbbf24' : 'var(--t1)',
                    whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis' }}>
                    {e.displayName}{isMe ? ' (You)' : ''}
                  </div>
                  <div style={{ fontFamily:'var(--font-mono)',fontSize:8,
                    color:rank.color,letterSpacing:.5,marginTop:1 }}>
                    {rank.label} · {e.pct}%
                  </div>
                </div>
              </div>

              {/* Done */}
              <div style={{ fontFamily:'var(--font-display)',fontSize:14,fontWeight:600,
                color:'#34d399',textAlign:'center',display:'flex',alignItems:'center',justifyContent:'center' }}>
                {e.completed}
              </div>

              {/* Strong */}
              <div style={{ fontFamily:'var(--font-display)',fontSize:14,fontWeight:600,
                color:'#fbbf24',textAlign:'center',display:'flex',alignItems:'center',justifyContent:'center' }}>
                {e.strong}
              </div>

              {/* Score */}
              <div style={{ fontFamily:'var(--font-display)',fontSize:15,fontWeight:700,
                color: isMe ? '#fbbf24' : 'var(--cyan)',
                textAlign:'center',display:'flex',alignItems:'center',justifyContent:'center' }}>
                {e.score}
              </div>
            </div>
          )
        })}
      </div>

      {/* Score formula */}
      <div style={{ marginTop:12,padding:'12px 16px',
        background:'var(--bg-glass)',border:'1px solid var(--border)',
        borderRadius:12,textAlign:'center' }}>
        <div style={{ fontFamily:'var(--font-mono)',fontSize:10,color:'var(--t3)',letterSpacing:.5 }}>
          Score = Topics Done × 10 + Strong Grasp × 5
        </div>
        <div style={{ fontFamily:'var(--font-body)',fontSize:11,color:'var(--t3)',marginTop:3 }}>
          Updates live · Refresh to see latest rankings
        </div>
      </div>
    </div>
  )
}
