import { useState, useRef, useEffect } from 'react'

const SYSTEM_PROMPT = `You are the Neural Protocol AI Tutor — an expert AI/ML engineering mentor for Indian students learning AI from Python to LLMs.

Curriculum: 10 phases — Python Foundations → Math for AI → NumPy/Pandas → Machine Learning → Deep Learning/PyTorch → LLMs/GenAI → AI Agents → FastAPI/Docker → MLOps → Portfolio/Jobs.

Your style:
- Friendly, like a senior engineer mentoring a junior
- Practical Python code examples
- Reference Hindi resources: CampusX, CodeWithHarry, Krish Naik, Apna College
- Concise answers — under 250 words unless more is needed
- Celebrate progress and keep motivation high
- Reply in the same language the student uses (Hindi or English)

When giving code: use Python, keep it runnable and simple.`

const FREE_LIMIT = 3  // free messages per session

function TypingDots() {
  return (
    <div style={{ display:'flex',gap:4,padding:'10px 14px',
      background:'var(--bg-glass)',borderRadius:'12px 12px 12px 2px',
      width:'fit-content',border:'1px solid var(--border)' }}>
      {[0,1,2].map(i=>(
        <div key={i} style={{ width:6,height:6,borderRadius:'50%',background:'var(--t3)',
          animation:`bounce .7s ease ${i*.15}s infinite alternate` }}/>
      ))}
      <style>{`@keyframes bounce{from{transform:translateY(0)}to{transform:translateY(-4px)}}`}</style>
    </div>
  )
}

function Message({ msg }) {
  const isUser = msg.role==='user'
  return (
    <div style={{ display:'flex',justifyContent:isUser?'flex-end':'flex-start',marginBottom:10 }}>
      {!isUser&&(
        <div style={{ width:28,height:28,borderRadius:'50%',flexShrink:0,
          background:'linear-gradient(135deg,var(--cyan),var(--violet))',
          display:'flex',alignItems:'center',justifyContent:'center',
          fontSize:13,marginRight:8,marginTop:2 }}>⬡</div>
      )}
      <div style={{
        maxWidth:'80%',padding:'10px 14px',
        borderRadius:isUser?'16px 16px 2px 16px':'16px 16px 16px 2px',
        background:isUser?'linear-gradient(135deg,var(--cyan),var(--violet))':'var(--bg-glass)',
        border:isUser?'none':'1px solid var(--border)',
        color:isUser?'#fff':'var(--t1)',
        fontFamily:'var(--font-body)',fontSize:13,lineHeight:1.55,
        whiteSpace:'pre-wrap',wordBreak:'break-word',
      }}>{msg.content}</div>
    </div>
  )
}

export default function AIChat({ currentTopic, currentPhase, isPro, onUpgrade, user }) {
  const [msgs,    setMsgs]   = useState([
    { role:'assistant', content:`Hi! I'm your Neural Protocol AI Tutor powered by Claude.\n\nAsk me anything about Python, ML, Deep Learning, LLMs, or your current topic. I reply in Hindi or English! 🚀\n\n${!isPro ? `⚡ Free: ${FREE_LIMIT} messages per session. Upgrade for unlimited.` : 'Pro: Unlimited messages.'}` }
  ])
  const [input,   setInput]  = useState('')
  const [loading, setLoading]= useState(false)
  const [error,   setError]  = useState('')
  const [freeUsed,setFreeUsed]=useState(0)
  const bottomRef = useRef(null)
  const inputRef  = useRef(null)

  useEffect(()=>{ bottomRef.current?.scrollIntoView({behavior:'smooth'}) },[msgs,loading])

  const send = async () => {
    const text = input.trim()
    if (!text||loading) return

    // Free tier limit
    if (!isPro && freeUsed >= FREE_LIMIT) {
      onUpgrade?.(); return
    }

    const userMsg = { role:'user', content:text }
    const history = [...msgs, userMsg]
    setMsgs(history)
    setInput('')
    setLoading(true)
    setError('')

    try {
      const context = currentPhase
        ? `\n\n[Student is on: Phase ${currentPhase.id} — ${currentPhase.name}${currentTopic?`, topic: "${currentTopic}"`:''}]`
        : ''

      const res = await fetch('/api/chat', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({
          system: SYSTEM_PROMPT + context,
          messages: history.map(m=>({ role:m.role, content:m.content })),
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(()=>({}))
        // Check for auth error — API key not set
        if (res.status===500) {
          const d = await res.json().catch(()=>({}))
          if (d.error?.includes('not configured')) throw new Error('API_KEY_MISSING')
        }
        throw new Error(err.error?.message||`Error ${res.status}`)
      }

      const data = await res.json()
      const reply = data.content?.[0]?.text || 'Sorry, no response generated.'
      setMsgs(prev=>[...prev,{ role:'assistant', content:reply }])
      if (!isPro) setFreeUsed(n=>n+1)

    } catch(e) {
      if (e.message==='API_KEY_MISSING') {
        setError('API key not configured. Please add your Anthropic API key in the environment variables.')
      } else {
        setError('Connection error. Check your internet and try again.')
      }
      setMsgs(prev=>prev.slice(0,-1))
      setInput(text)
    } finally {
      setLoading(false)
    }
  }

  const hitFreeLimit = !isPro && freeUsed >= FREE_LIMIT

  return (
    <div style={{ height:'100%',display:'flex',flexDirection:'column',
      background:'var(--bg-surface)',borderRadius:'var(--r3)',overflow:'hidden' }}>

      {/* Header */}
      <div style={{ padding:'12px 16px',borderBottom:'1px solid var(--border)',
        display:'flex',alignItems:'center',gap:10,flexShrink:0 }}>
        <div style={{ width:36,height:36,borderRadius:'50%',
          background:'linear-gradient(135deg,var(--cyan),var(--violet))',
          display:'flex',alignItems:'center',justifyContent:'center',fontSize:18 }}>⬡</div>
        <div>
          <div style={{ fontFamily:'var(--font-display)',fontSize:14,fontWeight:700,color:'var(--t1)' }}>
            Neural Protocol AI Tutor
          </div>
          <div style={{ display:'flex',alignItems:'center',gap:5 }}>
            <div style={{ width:6,height:6,borderRadius:'50%',background:'#22c55e' }}/>
            <span style={{ fontFamily:'var(--font-body)',fontSize:11,color:'var(--t3)' }}>
              Powered by Claude · Hindi + English
            </span>
          </div>
        </div>
        {!isPro&&(
          <div style={{ marginLeft:'auto',padding:'3px 10px',borderRadius:99,
            background:'rgba(251,191,36,.1)',border:'1px solid rgba(251,191,36,.25)',
            fontFamily:'var(--font-mono)',fontSize:9,color:'var(--amber)' }}>
            {FREE_LIMIT-freeUsed} free left
          </div>
        )}
      </div>

      {/* Messages */}
      <div style={{ flex:1,overflowY:'auto',padding:'16px',display:'flex',flexDirection:'column' }}>
        {msgs.map((m,i)=><Message key={i} msg={m}/>)}
        {loading&&(
          <div style={{ display:'flex',alignItems:'flex-start',gap:8,marginBottom:10 }}>
            <div style={{ width:28,height:28,borderRadius:'50%',
              background:'linear-gradient(135deg,var(--cyan),var(--violet))',
              display:'flex',alignItems:'center',justifyContent:'center',fontSize:13 }}>⬡</div>
            <TypingDots/>
          </div>
        )}
        {error&&(
          <div style={{ padding:'10px 14px',borderRadius:10,marginBottom:10,
            background:'rgba(251,113,133,.08)',border:'1px solid rgba(251,113,133,.2)',
            fontFamily:'var(--font-body)',fontSize:12,color:'var(--rose)' }}>
            ⚠ {error}
          </div>
        )}
        {hitFreeLimit&&!loading&&(
          <div style={{ padding:'14px',borderRadius:14,textAlign:'center',
            background:'rgba(167,139,250,.08)',border:'1px solid rgba(167,139,250,.25)' }}>
            <div style={{ fontFamily:'var(--font-display)',fontSize:14,fontWeight:700,
              color:'var(--violet)',marginBottom:6 }}>Free limit reached</div>
            <p style={{ fontFamily:'var(--font-body)',fontSize:12,color:'var(--t2)',marginBottom:12 }}>
              Upgrade Pro for unlimited AI Tutor access
            </p>
            <button onClick={onUpgrade} style={{ padding:'9px 24px',borderRadius:10,
              cursor:'pointer',fontWeight:700,fontSize:13,
              background:'linear-gradient(135deg,var(--cyan),var(--violet))',
              border:'none',color:'#fff',fontFamily:'var(--font-display)' }}>
              ⚡ Upgrade — ₹999
            </button>
          </div>
        )}
        <div ref={bottomRef}/>
      </div>

      {/* Quick suggestions */}
      {msgs.length<=1&&(
        <div style={{ padding:'0 16px 8px',display:'flex',gap:6,flexWrap:'wrap' }}>
          {[
            currentTopic?`Explain "${currentTopic.slice(0,30)}"`:'Explain gradient descent simply',
            'Give me a Python code example',
            'What should I learn next?',
            'मुझे Hindi में समझाओ',
          ].map(s=>(
            <button key={s} onClick={()=>{setInput(s);inputRef.current?.focus()}}
              style={{ padding:'5px 10px',borderRadius:99,
                border:'1px solid var(--border)',background:'var(--bg-glass)',
                fontFamily:'var(--font-body)',fontSize:11,color:'var(--t2)',
                cursor:'pointer',transition:'all .15s',whiteSpace:'nowrap' }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--cyan)';e.currentTarget.style.color='var(--cyan)'}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.color='var(--t2)'}}
            >{s}</button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{ padding:'12px 16px',borderTop:'1px solid var(--border)',
        display:'flex',gap:8,flexShrink:0 }}>
        <textarea
          ref={inputRef}
          value={input}
          onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send()}}}
          placeholder={hitFreeLimit?'Upgrade for more messages...':'Ask anything... (Enter to send)'}
          disabled={hitFreeLimit}
          rows={1}
          style={{ flex:1,resize:'none',minHeight:40,maxHeight:120,
            padding:'9px 12px',borderRadius:12,
            border:'1px solid var(--border2)',
            background:hitFreeLimit?'var(--bg-glass2)':'var(--bg-glass)',
            color:'var(--t1)',fontFamily:'var(--font-body)',fontSize:13,
            outline:'none',lineHeight:1.4,opacity:hitFreeLimit?.6:1 }}
          onFocus={e=>e.target.style.borderColor='var(--cyan)'}
          onBlur={e=>e.target.style.borderColor='var(--border2)'}
          onInput={e=>{e.target.style.height='auto';e.target.style.height=Math.min(e.target.scrollHeight,120)+'px'}}
        />
        <button onClick={send} disabled={!input.trim()||loading||hitFreeLimit}
          aria-label="Send message"
          style={{ width:42,height:42,borderRadius:12,flexShrink:0,
            background:input.trim()&&!loading&&!hitFreeLimit
              ?'linear-gradient(135deg,var(--cyan),var(--violet))'
              :'var(--bg-glass2)',
            border:'none',
            cursor:input.trim()&&!loading&&!hitFreeLimit?'pointer':'default',
            fontSize:16,
            color:input.trim()&&!loading&&!hitFreeLimit?'#fff':'var(--t3)',
            display:'flex',alignItems:'center',justifyContent:'center',
            transition:'all .2s' }}>↑</button>
      </div>
    </div>
  )
}
