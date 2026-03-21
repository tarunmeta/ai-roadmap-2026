import { useState, useEffect, useRef, Suspense, lazy } from 'react'
import { collection, addDoc, onSnapshot, query, orderBy, limit, serverTimestamp } from 'firebase/firestore'
import Leaderboard from './Leaderboard.jsx'
import { db } from '../firebase.js'

const MiniOrb = lazy(() => import('../components/MiniOrb.jsx'))

const ROOMS = [
  { id:'general',  name:'General',       emoji:'💬', desc:'All topics, all levels' },
  { id:'python',   name:'Python',         emoji:'🐍', desc:'Phase 1-2 help' },
  { id:'ml',       name:'ML & Deep',      emoji:'🤖', desc:'Phase 3-5 help' },
  { id:'llms',     name:'LLMs & Agents',  emoji:'🦙', desc:'Phase 6-7 builders' },
  { id:'jobs',     name:'Jobs & Career',  emoji:'💼', desc:'Resumes, interviews' },
  { id:'hindi',    name:'हिंदी Room',      emoji:'🇮🇳', desc:'Hindi mein baat karo' },
]

const BOT_NAME   = 'Neural Bot'
const BOT_UID    = 'neural-bot-v1'
const BOT_AVATAR = '⬡'

async function getBotReply(userMessage, roomName) {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage, room: roomName })
    })
    if (!res.ok) return `Great question! 🤖 Our AI bot is being set up. Meanwhile, check Resources tab!\n\n— Neural Bot`
    const data = await res.json()
    return data.reply || `Keep learning and stay consistent. Bahut achha! 💪\n\n— Neural Bot 🤖`
  } catch(e) {
    return `Hey! I'm having trouble connecting. Please try again! 😊\n\n— Neural Bot 🤖`
  }
}

function Avatar({ name, size=32, isBot=false }) {
  const cols = ['#a78bfa','#22d3ee','#fbbf24','#34d399','#fb7185','#60a5fa']
  const c = isBot ? '#22d3ee' : cols[(name?.charCodeAt(0)||65) % cols.length]
  return (
    <div style={{
      width:size, height:size, borderRadius:size*.28,
      background: isBot ? 'linear-gradient(135deg,#22d3ee,#a78bfa)' : `linear-gradient(135deg,${c},${c}88)`,
      display:'flex', alignItems:'center', justifyContent:'center',
      fontSize:size*.42, fontWeight:700, color:'#fff', flexShrink:0,
      boxShadow: isBot ? '0 0 10px rgba(34,211,238,.4)' : `0 2px 8px ${c}44`,
      border: isBot ? '1px solid rgba(34,211,238,.3)' : 'none',
    }}>
      {isBot ? BOT_AVATAR : (name?.[0]?.toUpperCase() || '?')}
    </div>
  )
}

function ChatRoom({ room, user }) {
  const [msgs,      setMsgs]     = useState([])
  const [input,     setInput]    = useState('')
  const [loading,   setLoading]  = useState(true)
  const [botTyping, setBotTyping]= useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    setLoading(true)
    const q = query(
      collection(db, 'community', room.id, 'messages'),
      orderBy('ts','asc'), limit(80)
    )
    const unsub = onSnapshot(q, snap => {
      setMsgs(snap.docs.map(d => ({ id:d.id, ...d.data() })))
      setLoading(false)
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior:'smooth' }), 50)
    })
    return unsub
  }, [room.id])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior:'smooth' })
  }, [msgs])

  async function send() {
    const text = input.trim()
    if (!text) return
    setInput('')
    const name = user?.displayName || user?.email?.split('@')[0] || 'Anonymous'
    const uid  = user?.uid || 'anon'
    await addDoc(collection(db,'community',room.id,'messages'), {
      text, uid, name, ts: serverTimestamp(), isBot: false
    })
    setBotTyping(true)
    try {
      const reply = await getBotReply(text, room.name)
      await addDoc(collection(db,'community',room.id,'messages'), {
        text: reply, uid: BOT_UID, name: BOT_NAME, ts: serverTimestamp(), isBot: true
      })
    } finally {
      setBotTyping(false)
    }
  }

  function onKey(e) {
    if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  const isMine = (m) => m.uid === (user?.uid || 'anon')

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', minHeight:0 }}>
      <div style={{ padding:'12px 16px', borderBottom:'1px solid var(--border)',
        display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0 }}>
        <div>
          <div style={{ fontFamily:'var(--font-display)', fontSize:14, fontWeight:600, color:'var(--t1)' }}>
            {room.emoji} {room.name}
          </div>
          <div style={{ fontFamily:'var(--font-body)', fontSize:11, color:'var(--t3)' }}>{room.desc}</div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
          <div style={{ width:6, height:6, borderRadius:'50%', background:'#22d3ee',
            boxShadow:'0 0 6px #22d3ee', animation:'orbPulse 2s infinite' }}/>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:9, color:'var(--t3)' }}>LIVE</span>
        </div>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'12px 14px',
        display:'flex', flexDirection:'column', gap:10 }}>
        {loading ? (
          <div style={{ display:'flex', justifyContent:'center', padding:'20px' }}>
            <div className="spinner"/>
          </div>
        ) : msgs.length === 0 ? (
          <div style={{ textAlign:'center', padding:'32px 16px' }}>
            <div style={{ fontSize:32, marginBottom:10 }}>💬</div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:14, color:'var(--t1)', marginBottom:6 }}>
              Start the conversation!
            </div>
            <div style={{ fontFamily:'var(--font-body)', fontSize:12, color:'var(--t3)' }}>
              Ask a question — Neural Bot replies instantly
            </div>
          </div>
        ) : msgs.map(m => (
          <div key={m.id} style={{
            display:'flex', gap:8,
            flexDirection: isMine(m) ? 'row-reverse' : 'row',
            alignItems:'flex-end',
          }}>
            <Avatar name={m.name} size={28} isBot={m.isBot}/>
            <div style={{ maxWidth:'75%', minWidth:0 }}>
              {!isMine(m) && (
                <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:3,
                  flexDirection: isMine(m) ? 'row-reverse' : 'row' }}>
                  <span style={{ fontFamily:'var(--font-display)', fontSize:11, fontWeight:600,
                    color: m.isBot ? 'var(--cyan)' : 'var(--t2)' }}>{m.name}</span>
                  {m.isBot && <span style={{ fontSize:9, color:'var(--cyan)',
                    fontFamily:'var(--font-mono)', opacity:.7 }}>AI</span>}
                </div>
              )}
              <div style={{
                padding:'9px 13px', borderRadius: isMine(m) ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                background: isMine(m)
                  ? 'linear-gradient(135deg,rgba(34,211,238,.15),rgba(167,139,250,.1))'
                  : m.isBot ? 'rgba(34,211,238,.06)' : 'var(--bg-glass)',
                border: isMine(m)
                  ? '1px solid rgba(34,211,238,.25)'
                  : m.isBot ? '1px solid rgba(34,211,238,.15)' : '1px solid var(--border)',
              }}>
                <div style={{ fontFamily:'var(--font-body)', fontSize:13, lineHeight:1.55,
                  color:'var(--t1)', whiteSpace:'pre-wrap', wordBreak:'break-word' }}>
                  {m.text}
                </div>
                <div style={{ textAlign:'right', marginTop:3 }}>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:9, color:'var(--t3)' }}>
                    {m.ts?.toDate ? m.ts.toDate().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}) : '...'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
        {botTyping && (
          <div style={{ display:'flex', gap:8, alignItems:'flex-end' }}>
            <Avatar name="Bot" size={28} isBot={true}/>
            <div style={{ padding:'10px 14px', borderRadius:'14px 14px 14px 4px',
              background:'rgba(34,211,238,.06)', border:'1px solid rgba(34,211,238,.15)' }}>
              <div style={{ display:'flex', gap:4, alignItems:'center' }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{
                    width:6, height:6, borderRadius:'50%', background:'var(--cyan)',
                    animation:`orbPulse 1.2s ease-in-out ${i*.2}s infinite`
                  }}/>
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef}/>
      </div>

      <div style={{ padding:'10px 12px', borderTop:'1px solid var(--border)',
        display:'flex', gap:8, alignItems:'flex-end', flexShrink:0 }}>
        <div style={{ flex:1, position:'relative' }}>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKey}
            placeholder={`Message ${room.name}... (Enter to send)`}
            rows={1}
            style={{
              width:'100%', resize:'none', overflow:'hidden',
              background:'var(--bg-glass)', border:'1px solid var(--border2)',
              borderRadius:12, padding:'10px 12px', fontSize:13,
              fontFamily:'var(--font-body)', color:'var(--t1)', outline:'none',
              lineHeight:1.5, maxHeight:100, transition:'border-color .18s',
            }}
            onFocus={e=>e.target.style.borderColor='var(--cyan)'}
            onBlur={e=>e.target.style.borderColor='var(--border2)'}
            onInput={e=>{e.target.style.height='auto';e.target.style.height=Math.min(e.target.scrollHeight,100)+'px'}}
          />
        </div>
        <button onClick={send} disabled={!input.trim()}
          aria-label="Send message"
          style={{
            width:40, height:40, borderRadius:12, flexShrink:0,
            background: input.trim() ? 'var(--cyan)' : 'var(--bg-glass2)',
            border: input.trim() ? 'none' : '1px solid var(--border)',
            color: input.trim() ? '#040818' : 'var(--t3)',
            fontSize:16, cursor: input.trim() ? 'pointer' : 'default',
            display:'flex', alignItems:'center', justifyContent:'center',
            transition:'all .15s',
          }}>↑</button>
      </div>
    </div>
  )
}

export default function Community({ user, done, grasp, totalTopics }) {
  const [tab,  setTab]  = useState('chat')
  const [room, setRoom] = useState(ROOMS[0])
  const doneC = Object.keys(done||{}).filter(k=>done[k]).length

  return (
    <div className="fade-up" style={{ maxWidth:1100 }}>

      <div style={{ marginBottom:14, padding:'18px 20px',
        background:'var(--bg-surface)', backdropFilter:'blur(16px)',
        border:'1px solid var(--border)', borderRadius:18,
        position:'relative', overflow:'hidden',
        display:'flex', alignItems:'center', gap:14, flexWrap:'wrap' }}>
        <div style={{ position:'absolute',top:0,left:0,right:0,height:1,
          background:'linear-gradient(90deg,transparent,rgba(34,211,238,.4),rgba(167,139,250,.4),transparent)' }}/>
        <Suspense fallback={<div style={{width:48,height:48,borderRadius:'50%',background:'rgba(34,211,238,.1)'}}/>}>
          <MiniOrb color="#22d3ee" size={48}/>
        </Suspense>
        <div style={{ flex:1, minWidth:160 }}>
          <div style={{ fontFamily:'var(--font-mono)',fontSize:9,color:'var(--cyan)',
            letterSpacing:3,textTransform:'uppercase',marginBottom:3,opacity:.7 }}>
            // NEURAL COMMUNITY
          </div>
          <h1 style={{ fontFamily:'var(--font-display)',fontSize:'clamp(16px,3vw,22px)',
            fontWeight:700,color:'var(--t1)' }}>Community Hub</h1>
          <p style={{ fontFamily:'var(--font-body)',fontSize:12,color:'var(--t2)',marginTop:2 }}>
            Ask questions — Neural Bot replies instantly 24/7
          </p>
        </div>
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          <div style={{ padding:'8px 14px', background:'var(--bg-glass)',
            borderRadius:10, border:'1px solid var(--border)', textAlign:'center' }}>
            <div style={{ fontFamily:'var(--font-display)',fontSize:18,fontWeight:700,color:'var(--cyan)' }}>
              {doneC}
            </div>
            <div style={{ fontFamily:'var(--font-body)',fontSize:10,color:'var(--t3)' }}>done</div>
          </div>
          <div style={{ padding:'8px 14px', background:'var(--bg-glass)',
            borderRadius:10, border:'1px solid var(--border)', textAlign:'center' }}>
            <div style={{ fontFamily:'var(--font-display)',fontSize:18,fontWeight:700,color:'var(--violet)' }}>
              {totalTopics}
            </div>
            <div style={{ fontFamily:'var(--font-body)',fontSize:10,color:'var(--t3)' }}>topics</div>
          </div>
        </div>
      </div>

      <div style={{ display:'flex',gap:6,marginBottom:14,
        background:'var(--bg-glass)',border:'1px solid var(--border)',
        borderRadius:12,padding:4,width:'fit-content' }}>
        {[['chat','💬 Chat'],['leaderboard','🏆 Leaderboard']].map(([v,l]) => (
          <button key={v} onClick={()=>setTab(v)} style={{
            padding:'7px 18px',borderRadius:8,border:'1px solid',cursor:'pointer',
            fontFamily:'var(--font-body)',fontSize:13,fontWeight:500,transition:'all .15s',
            background:tab===v ? 'linear-gradient(135deg,rgba(34,211,238,.12),rgba(167,139,250,.1))' : 'transparent',
            color:tab===v ? 'var(--cyan)' : 'var(--t3)',
            borderColor:tab===v ? 'rgba(34,211,238,.3)' : 'transparent',
          }}>{l}</button>
        ))}
      </div>

      {tab === 'leaderboard' && (
        <Leaderboard user={user} done={done} grasp={grasp}/>
      )}

      {tab === 'chat' && (
        <div style={{ display:'flex', gap:12, height:'clamp(500px,65vh,700px)', minHeight:0 }}>

          <div style={{ width:200, flexShrink:0, display:'flex', flexDirection:'column', gap:4 }}
            className="d-only">
            <div style={{ fontFamily:'var(--font-mono)',fontSize:9,color:'var(--t3)',
              letterSpacing:2,textTransform:'uppercase',marginBottom:6,padding:'0 4px' }}>
              ROOMS
            </div>
            {ROOMS.map(r => (
              <button key={r.id} onClick={() => setRoom(r)} style={{
                width:'100%', padding:'10px 12px', borderRadius:10, border:'1px solid',
                textAlign:'left', cursor:'pointer', transition:'all .15s',
                background: room.id===r.id ? 'rgba(34,211,238,.08)' : 'var(--bg-glass)',
                borderColor: room.id===r.id ? 'rgba(34,211,238,.3)' : 'var(--border)',
              }}>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <span style={{ fontSize:16 }}>{r.emoji}</span>
                  <div>
                    <div style={{ fontFamily:'var(--font-display)',fontSize:12,fontWeight:600,
                      color: room.id===r.id ? 'var(--cyan)' : 'var(--t1)' }}>{r.name}</div>
                    <div style={{ fontFamily:'var(--font-body)',fontSize:10,color:'var(--t3)',
                      marginTop:1 }}>{r.desc}</div>
                  </div>
                </div>
              </button>
            ))}
            <div style={{ marginTop:'auto', padding:'10px 12px', borderRadius:10,
              background:'rgba(34,211,238,.05)', border:'1px solid rgba(34,211,238,.15)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:4 }}>
                <span style={{ fontSize:14 }}>⬡</span>
                <span style={{ fontFamily:'var(--font-display)',fontSize:11,fontWeight:600,color:'var(--cyan)' }}>
                  Neural Bot
                </span>
              </div>
              <div style={{ fontFamily:'var(--font-body)',fontSize:10,color:'var(--t3)',lineHeight:1.5 }}>
                AI assistant trained on this curriculum. Replies instantly.
              </div>
            </div>
          </div>

          <div className="m-only" style={{ display:'none' }}/>

          <div style={{ flex:1, background:'var(--bg-surface)',
            border:'1px solid var(--border)', borderRadius:16,
            overflow:'hidden', display:'flex', flexDirection:'column', minHeight:0 }}>
            <div className="m-only" style={{
              display:'flex', gap:4, padding:'8px 10px',
              borderBottom:'1px solid var(--border)',
              overflowX:'auto', WebkitOverflowScrolling:'touch', flexShrink:0,
            }}>
              {ROOMS.map(r => (
                <button key={r.id} onClick={() => setRoom(r)} style={{
                  flexShrink:0, padding:'5px 10px', borderRadius:99, border:'1px solid',
                  fontSize:11, cursor:'pointer', transition:'all .15s',
                  background: room.id===r.id ? 'rgba(34,211,238,.1)' : 'transparent',
                  borderColor: room.id===r.id ? 'rgba(34,211,238,.3)' : 'var(--border)',
                  color: room.id===r.id ? 'var(--cyan)' : 'var(--t2)',
                  fontFamily:'var(--font-body)', display:'flex', alignItems:'center', gap:4,
                }}>
                  <span style={{fontSize:12}}>{r.emoji}</span>{r.name}
                </button>
              ))}
            </div>
            <ChatRoom key={room.id} room={room} user={user}/>
          </div>

        </div>
      )}

    </div>
  )
}
