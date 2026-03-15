import { useState, useEffect, useRef, Suspense, lazy } from 'react'
import { collection, addDoc, onSnapshot, query, orderBy, limit, serverTimestamp } from 'firebase/firestore'
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

// ── NEURAL BOT — replies using Claude API ────────────────────
const BOT_NAME    = 'Neural Bot'
const BOT_UID     = 'neural-bot-v1'
const BOT_AVATAR  = '⬡'

// Bot prompt handled server-side in /api/chat.js

async function getBotReply(userMessage, roomName) {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage, room: roomName })
    })
    if (!res.ok) {
      // API not configured — return friendly fallback
      return `Great question! 🤖 Our AI bot is being set up. Meanwhile, check the Resources tab for study materials, or ask the community!

— Neural Bot`
    }
    const data = await res.json()
    return data.reply || `Thanks for your message! Keep learning and stay consistent. Bahut achha! 💪

— Neural Bot 🤖`
  } catch(e) {
    return `Hey! I'm here but having trouble connecting right now. Please try again in a moment! 😊

— Neural Bot 🤖`
  }
}

// ── AVATAR ───────────────────────────────────────────────────
function Avatar({ name, size=32, isBot=false }) {
  const cols = ['#a78bfa','#22d3ee','#fbbf24','#34d399','#fb7185','#60a5fa']
  const c = isBot ? '#22d3ee' : cols[(name?.charCodeAt(0)||65) % cols.length]
  return (
    <div style={{
      width:size, height:size, borderRadius:size*.28,
      background: isBot ? 'linear-gradient(135deg,#22d3ee,#a78bfa)' : `linear-gradient(135deg,${c},${c}88)`,
      display:'flex', alignItems:'center', justifyContent:'center',
      fontSize: isBot ? size*.42 : size*.42, fontWeight:700,
      color:'#fff', flexShrink:0,
      boxShadow: isBot ? '0 0 10px rgba(34,211,238,.4)' : `0 2px 8px ${c}44`,
      border: isBot ? '1px solid rgba(34,211,238,.3)' : 'none',
    }}>
      {isBot ? BOT_AVATAR : (name?.[0]?.toUpperCase() || '?')}
    </div>
  )
}

// ── CHAT ROOM ────────────────────────────────────────────────
function ChatRoom({ room, user }) {
  const [msgs,    setMsgs]   = useState([])
  const [input,   setInput]  = useState('')
  const [loading, setLoading]= useState(true)
  const [botTyping,setBotTyping] = useState(false)
  const bottomRef = useRef(null)
  const inputRef  = useRef(null)

  useEffect(() => {
    const q = query(
      collection(db, 'chatRooms', room.id, 'messages'),
      orderBy('createdAt','asc'), limit(80)
    )
    const unsub = onSnapshot(q, snap => {
      setMsgs(snap.docs.map(d => ({ id:d.id, ...d.data() })))
      setLoading(false)
    }, err => {
      console.error('Chat:', err.code)
      setLoading(false)
    })
    return unsub
  }, [room.id])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior:'smooth' })
  }, [msgs, botTyping])

  const send = async () => {
    const txt = input.trim()
    if (!txt || !user) return
    setInput('')

    // Send user message
    await addDoc(collection(db,'chatRooms',room.id,'messages'), {
      text: txt,
      uid:  user.uid,
      name: user.displayName || user.email?.split('@')[0] || 'User',
      createdAt: serverTimestamp(),
    })

    // Bot always replies — natural delay makes it feel human
    setBotTyping(true)
    await new Promise(r => setTimeout(r, 1000 + Math.random() * 1500))
    const reply = await getBotReply(txt, room.name)
    setBotTyping(false)
    if (reply) {
      await addDoc(collection(db,'chatRooms',room.id,'messages'), {
        text: reply,
        uid:  BOT_UID,
        name: BOT_NAME,
        isBot: true,
        createdAt: serverTimestamp(),
      })
    }
  }

  const onKey = e => { if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); send() } }

  const fmtTime = ts => {
    if (!ts?.toDate) return ''
    const d = ts.toDate()
    return d.toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit', hour12:true })
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', minHeight:0 }}>

      {/* Room header */}
      <div style={{ padding:'12px 16px', borderBottom:'1px solid var(--border)',
        display:'flex', alignItems:'center', gap:10, flexShrink:0,
        background:'var(--bg-surface)' }}>
        <span style={{ fontSize:18 }}>{room.emoji}</span>
        <div>
          <div style={{ fontFamily:'var(--font-display)', fontSize:14, fontWeight:600, color:'var(--t1)' }}>
            {room.name}
          </div>
          <div style={{ fontFamily:'var(--font-body)', fontSize:11, color:'var(--t3)' }}>
            {room.desc}
          </div>
        </div>
        <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:6,
          padding:'4px 10px', borderRadius:99,
          background:'rgba(34,211,238,.08)', border:'1px solid rgba(34,211,238,.2)' }}>
          <div style={{ width:6, height:6, borderRadius:'50%', background:'#22d3ee',
            animation:'pulseGlow 2s ease-in-out infinite' }}/>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:9, color:'#22d3ee', letterSpacing:.5 }}>
            Neural Bot online
          </span>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex:1, overflowY:'auto', padding:'12px 14px',
        display:'flex', flexDirection:'column', gap:10,
        background:'var(--bg-base)', minHeight:0 }}>

        {loading && (
          <div style={{ display:'flex', justifyContent:'center', padding:'20px' }}>
            <div className="spinner"/>
          </div>
        )}

        {!loading && msgs.length === 0 && (
          <div style={{ textAlign:'center', padding:'32px 16px' }}>
            <div style={{ fontSize:32, marginBottom:10 }}>💬</div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:14, color:'var(--t1)', marginBottom:6 }}>
              Be the first to say something!
            </div>
            <div style={{ fontFamily:'var(--font-body)', fontSize:12, color:'var(--t3)' }}>
              Neural Bot will reply to your questions automatically
            </div>
          </div>
        )}

        {msgs.map(m => {
          const isMe  = m.uid === user?.uid
          const isBot = m.isBot || m.uid === BOT_UID
          return (
            <div key={m.id} style={{
              display:'flex', gap:8, flexDirection: isMe ? 'row-reverse' : 'row',
              alignItems:'flex-end',
            }}>
              {!isMe && <Avatar name={m.name} size={28} isBot={isBot}/>}
              <div style={{ maxWidth:'75%', minWidth:0 }}>
                {!isMe && (
                  <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:3,
                    flexDirection: 'row' }}>
                    <span style={{ fontFamily:'var(--font-display)', fontSize:11,
                      fontWeight:600, color: isBot ? '#22d3ee' : 'var(--t2)' }}>
                      {m.name}
                    </span>
                    {isBot && (
                      <span style={{ padding:'1px 6px', borderRadius:99,
                        background:'rgba(34,211,238,.1)', border:'1px solid rgba(34,211,238,.2)',
                        fontFamily:'var(--font-mono)', fontSize:8, color:'#22d3ee', letterSpacing:.5 }}>
                        AI
                      </span>
                    )}
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:9, color:'var(--t3)' }}>
                      {fmtTime(m.createdAt)}
                    </span>
                  </div>
                )}
                <div style={{
                  padding:'9px 13px', borderRadius: isMe ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                  background: isMe
                    ? 'linear-gradient(135deg,var(--cyan2),var(--violet2))'
                    : isBot
                    ? 'linear-gradient(135deg,rgba(34,211,238,.1),rgba(167,139,250,.08))'
                    : 'var(--bg-glass2)',
                  border: isBot ? '1px solid rgba(34,211,238,.2)' : isMe ? 'none' : '1px solid var(--border)',
                  boxShadow: isBot ? '0 2px 12px rgba(34,211,238,.1)' : 'none',
                }}>
                  <div style={{ fontFamily:'var(--font-body)', fontSize:13, lineHeight:1.55,
                    color: isMe ? '#fff' : 'var(--t1)',
                    whiteSpace:'pre-wrap', wordBreak:'break-word' }}>
                    {m.text}
                  </div>
                </div>
                {isMe && (
                  <div style={{ textAlign:'right', marginTop:3 }}>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:9, color:'var(--t3)' }}>
                      {fmtTime(m.createdAt)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )
        })}

        {/* Bot typing indicator */}
        {botTyping && (
          <div style={{ display:'flex', gap:8, alignItems:'flex-end' }}>
            <Avatar name="bot" size={28} isBot/>
            <div style={{ padding:'10px 14px', borderRadius:'14px 14px 14px 4px',
              background:'linear-gradient(135deg,rgba(34,211,238,.08),rgba(167,139,250,.06))',
              border:'1px solid rgba(34,211,238,.15)' }}>
              <div style={{ display:'flex', gap:4, alignItems:'center' }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{
                    width:6, height:6, borderRadius:'50%', background:'#22d3ee',
                    animation:`pulseGlow 1.2s ease-in-out ${i*.2}s infinite`,
                    opacity:.7,
                  }}/>
                ))}
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef}/>
      </div>

      {/* Input */}
      <div style={{ padding:'10px 12px', borderTop:'1px solid var(--border)',
        flexShrink:0, background:'var(--bg-surface)',
        display:'flex', gap:8, alignItems:'flex-end' }}>
        <Avatar name={user?.displayName||user?.email||'U'} size={32}/>
        <div style={{ flex:1, position:'relative' }}>
          <textarea
            ref={inputRef}
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
              lineHeight:1.5, maxHeight:100,
              transition:'border-color .18s',
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

// ── MAIN COMMUNITY ───────────────────────────────────────────
export default function Community({ user, done, totalTopics }) {
  const [room, setRoom] = useState(ROOMS[0])
  const doneC = Object.keys(done||{}).filter(k=>done[k]).length

  return (
    <div className="fade-up" style={{ maxWidth:1100 }}>

      {/* Header */}
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

      {/* Layout */}
      <div style={{ display:'flex', gap:12, height:'clamp(500px,65vh,700px)', minHeight:0 }}>

        {/* Room list */}
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

          {/* Bot info */}
          <div style={{ marginTop:'auto', padding:'10px 12px', borderRadius:10,
            background:'rgba(34,211,238,.05)', border:'1px solid rgba(34,211,238,.15)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:4 }}>
              <span style={{ fontSize:14 }}>⬡</span>
              <span style={{ fontFamily:'var(--font-display)',fontSize:11,fontWeight:600,color:'var(--cyan)' }}>
                Neural Bot
              </span>
            </div>
            <div style={{ fontFamily:'var(--font-body)',fontSize:10,color:'var(--t3)',lineHeight:1.5 }}>
              AI assistant trained on this curriculum. Replies to questions instantly.
            </div>
          </div>
        </div>

        {/* Mobile room tabs */}
        <div className="m-only" style={{ display:'none' }}/>

        {/* Chat area */}
        <div style={{ flex:1, background:'var(--bg-surface)',
          border:'1px solid var(--border)', borderRadius:16,
          overflow:'hidden', display:'flex', flexDirection:'column', minHeight:0 }}>

          {/* Mobile room selector */}
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
    </div>
  )
}
