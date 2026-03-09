import { useState, useRef, useEffect } from 'react'

const QUICK_PROMPTS = [
  { icon:'🧠', label:'Explain it', template:(t)=>`Explain "${t}" simply with a real-world analogy and 2 practice exercises.` },
  { icon:'💻', label:'Review code', template:(t)=>`Review my code for "${t}":\n\n[paste your code here]` },
  { icon:'📋', label:'Quiz me',     template:(t)=>`Quiz me on "${t}" with 5 questions. Tell me what I got right/wrong.` },
  { icon:'🔨', label:'Project idea',template:(t)=>`Give me a weekend project to practice "${t}" with step-by-step breakdown.` },
  { icon:'🐛', label:'Debug error', template:(t)=>`I'm learning "${t}" and getting:\n\n[paste error]\n\nCode:\n[paste code]` },
  { icon:'📈', label:'What next',   template:(t)=>`I finished "${t}". Give me a specific 3-day plan for what to learn next as an AI Engineer.` },
]

// ── Render markdown-like text (bold, code blocks, bullets) ────────────────────
function RenderText({ text }) {
  const lines = text.split('\n')
  return (
    <div style={{fontSize:13,lineHeight:1.75,color:'#e8eaf2'}}>
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} style={{height:8}}/>
        // Code block line
        if (line.startsWith('    ') || line.startsWith('\t')) {
          return <div key={i} style={{fontFamily:'Space Mono,monospace',fontSize:11,background:'rgba(255,255,255,.05)',padding:'2px 8px',borderRadius:4,marginBottom:2,color:'#818cf8'}}>{line.trim()}</div>
        }
        // Bullet
        if (line.match(/^[•\-\*] /)) {
          return <div key={i} style={{display:'flex',gap:8,marginBottom:3}}><span style={{color:'#6366f1',flexShrink:0}}>▸</span><span>{renderInline(line.slice(2))}</span></div>
        }
        // Numbered
        if (line.match(/^\d+\. /)) {
          const num = line.match(/^(\d+)\./)[1]
          return <div key={i} style={{display:'flex',gap:8,marginBottom:3}}><span style={{color:'#6366f1',flexShrink:0,fontWeight:700,minWidth:16}}>{num}.</span><span>{renderInline(line.replace(/^\d+\. /,''))}</span></div>
        }
        // Header
        if (line.startsWith('## ')) return <div key={i} style={{fontSize:14,fontWeight:800,color:'#e8eaf2',marginTop:10,marginBottom:4}}>{line.slice(3)}</div>
        if (line.startsWith('# '))  return <div key={i} style={{fontSize:15,fontWeight:900,color:'#818cf8',marginTop:10,marginBottom:4}}>{line.slice(2)}</div>
        return <div key={i} style={{marginBottom:3}}>{renderInline(line)}</div>
      })}
    </div>
  )
}

function renderInline(text) {
  // Bold **text**
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) return <strong key={i} style={{color:'#e8eaf2',fontWeight:700}}>{p.slice(2,-2)}</strong>
    if (p.startsWith('`')  && p.endsWith('`'))  return <code key={i} style={{fontFamily:'Space Mono,monospace',fontSize:11,background:'rgba(99,102,241,.15)',padding:'1px 5px',borderRadius:4,color:'#818cf8'}}>{p.slice(1,-1)}</code>
    return p
  })
}

function Bubble({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <div style={{display:'flex',gap:9,alignItems:'flex-start',flexDirection:isUser?'row-reverse':'row',marginBottom:14,animation:'fadeUp .25s cubic-bezier(.16,1,.3,1) both'}}>
      <div style={{width:28,height:28,borderRadius:8,flexShrink:0,fontSize:13,display:'flex',alignItems:'center',justifyContent:'center',
        background:isUser?'linear-gradient(135deg,#6366f1,#a855f7)':'#111420',
        border:isUser?'none':'1px solid #242740'}}>
        {isUser?'👤':'🤖'}
      </div>
      <div style={{maxWidth:'80%',padding:'11px 14px',
        borderRadius:isUser?'14px 4px 14px 14px':'4px 14px 14px 14px',
        background:isUser?'linear-gradient(135deg,rgba(99,102,241,.18),rgba(168,85,247,.12))':'#0d0f1a',
        border:`1px solid ${isUser?'rgba(99,102,241,.25)':'#1a1d2e'}`,
        wordBreak:'break-word'}}>
        {msg.loading
          ? <div style={{display:'flex',gap:5,padding:'4px 0'}}>{[0,1,2].map(i=><div key={i} style={{width:6,height:6,borderRadius:'50%',background:'#6366f1',animation:`pulse 1.2s ease-in-out ${i*0.2}s infinite`}}/>)}</div>
          : <RenderText text={msg.content}/>
        }
      </div>
    </div>
  )
}

export default function AIChat({ currentTopic, currentPhase, isPro, onUpgrade }) {
  const [messages, setMessages] = useState([{
    role:'assistant',
    content:`Hi! I'm your AI tutor 🤖\n\nI can help you:\n• Explain topics simply\n• Review your code\n• Quiz you\n• Debug errors\n• Give project ideas\n\nWhat would you like to learn about${currentTopic?` — **${currentTopic}**`:''}?`
  }])
  const [input,    setInput]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const [msgCount, setMsgCount] = useState(0)
  const bottomRef = useRef(null)
  const inputRef  = useRef(null)
  const FREE_LIMIT = 3

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:'smooth' }) }, [messages])

  const send = async (text = input.trim()) => {
    if (!text || loading) return
    if (!isPro && msgCount >= FREE_LIMIT) { onUpgrade(); return }

    setMessages(p => [...p, { role:'user', content:text }, { role:'assistant', content:'', loading:true }])
    setInput('')
    setLoading(true)
    setMsgCount(c => c+1)

    const system = `You are an expert AI Engineering tutor for Indian students learning the AI Engineer Roadmap 2026.
Current phase: ${currentPhase?.name || 'General'}
Current topic: ${currentTopic || 'General'}

Rules:
- Be clear, friendly, practical
- Use simple English (student may not be native speaker)
- For code: always use Python with proper indentation
- Format with markdown: **bold**, \`code\`, numbered lists, bullet points
- Keep responses concise — max 300 words
- Be encouraging`

    try {
      const resp = await fetch('https://api.anthropic.com/v1/messages', {
        method:'POST',
        headers:{'Content-Type':'application/json','anthropic-dangerous-direct-browser-access':'true'},
        body: JSON.stringify({
          model:'claude-sonnet-4-20250514',
          max_tokens:1000,
          system,
          messages:[
            ...messages.filter(m=>!m.loading).map(m=>({role:m.role,content:m.content})),
            {role:'user',content:text}
          ]
        })
      })
      const data = await resp.json()
      const reply = data.content?.[0]?.text || '⚠️ No response. Please try again.'
      setMessages(p => [...p.filter(m=>!m.loading), {role:'assistant',content:reply}])
    } catch(e) {
      setMessages(p => [...p.filter(m=>!m.loading), {role:'assistant',content:'⚠️ Connection error. Check your internet and try again.'}])
    }
    setLoading(false)
    inputRef.current?.focus()
  }

  if (!isPro && msgCount >= FREE_LIMIT) return (
    <div style={{height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:24,textAlign:'center'}}>
      <div style={{fontSize:48,marginBottom:14}}>🤖</div>
      <div style={{fontSize:17,fontWeight:800,marginBottom:8}}>Free messages used up</div>
      <div style={{color:'#8b90b0',fontSize:13,marginBottom:24,lineHeight:1.65,maxWidth:260}}>Upgrade to Pro for unlimited AI tutoring on all topics.</div>
      <button onClick={onUpgrade} style={{padding:'12px 28px',borderRadius:12,background:'linear-gradient(135deg,#6366f1,#a855f7)',border:'none',color:'#fff',fontSize:14,fontWeight:700,cursor:'pointer',boxShadow:'0 6px 24px rgba(99,102,241,.4)'}}>
        ⚡ Upgrade to Pro
      </button>
      <div style={{fontSize:11,color:'#454869',marginTop:10}}>₹999 lifetime · ₹200/month</div>
    </div>
  )

  return (
    <div style={{display:'flex',flexDirection:'column',height:'100%',minHeight:480}}>
      {/* Header */}
      <div style={{padding:'10px 14px',borderBottom:'1px solid #1a1d2e',background:'linear-gradient(135deg,rgba(99,102,241,.07),transparent)',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:9}}>
          <div style={{width:30,height:30,borderRadius:9,background:'linear-gradient(135deg,#6366f1,#a855f7)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,boxShadow:'0 4px 12px rgba(99,102,241,.3)'}}>🤖</div>
          <div>
            <div style={{fontSize:12,fontWeight:700,color:'#e8eaf2'}}>AI Tutor</div>
            <div style={{fontSize:9,color:'#10b981',fontWeight:600}}>● Claude-powered</div>
          </div>
        </div>
        <div style={{fontSize:10,color:'#454869'}}>{isPro?'Unlimited':` ${FREE_LIMIT-msgCount} free left`}</div>
      </div>

      {currentTopic && (
        <div style={{padding:'6px 14px',background:'rgba(99,102,241,.05)',borderBottom:'1px solid rgba(99,102,241,.1)',fontSize:10,color:'#818cf8',flexShrink:0}}>
          📍 <strong>{currentTopic}</strong>
        </div>
      )}

      {/* Messages */}
      <div style={{flex:1,overflowY:'auto',padding:'14px'}}>
        {messages.map((m,i) => <Bubble key={i} msg={m}/>)}
        <div ref={bottomRef}/>
      </div>

      {/* Quick prompts */}
      <div style={{padding:'7px 10px',borderTop:'1px solid #1a1d2e',display:'flex',gap:5,overflowX:'auto',flexShrink:0,scrollbarWidth:'none'}}>
        {QUICK_PROMPTS.map((p,i) => (
          <button key={i} onClick={()=>{setInput(p.template(currentTopic||'this topic'));inputRef.current?.focus()}}
            style={{padding:'5px 10px',borderRadius:99,flexShrink:0,cursor:'pointer',border:'1px solid #242740',background:'transparent',color:'#8b90b0',fontSize:10,fontWeight:600,transition:'all .15s',whiteSpace:'nowrap'}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='#6366f1';e.currentTarget.style.color='#818cf8'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='#242740';e.currentTarget.style.color='#8b90b0'}}>
            {p.icon} {p.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <div style={{padding:'10px 12px',borderTop:'1px solid #1a1d2e',flexShrink:0}}>
        <div style={{display:'flex',gap:8,alignItems:'flex-end'}}>
          <textarea ref={inputRef} value={input} onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send()}}}
            placeholder={`Ask about ${currentTopic||'any topic'}... (Enter to send)`}
            rows={2}
            style={{flex:1,padding:'9px 12px',background:'#08090f',border:`1.5px solid #242740`,borderRadius:10,
              color:'#e8eaf2',fontSize:12,outline:'none',resize:'none',fontFamily:'inherit',lineHeight:1.5,transition:'border-color .15s'}}
            onFocus={e=>e.target.style.borderColor='#6366f1'}
            onBlur={e=>e.target.style.borderColor='#242740'}
          />
          <button onClick={()=>send()} disabled={!input.trim()||loading}
            style={{width:38,height:38,borderRadius:10,border:'none',cursor:'pointer',flexShrink:0,fontSize:16,display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s',
              background:input.trim()&&!loading?'linear-gradient(135deg,#6366f1,#a855f7)':'#1a1d2e',
              color:input.trim()&&!loading?'#fff':'#454869',
              boxShadow:input.trim()&&!loading?'0 4px 14px rgba(99,102,241,.3)':'none'}}>
            {loading?'⏳':'↑'}
          </button>
        </div>
      </div>
    </div>
  )
}
