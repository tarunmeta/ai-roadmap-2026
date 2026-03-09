import { useState } from 'react'
import { PLANS, redeemKey } from '../hooks/useSubscription.js'

const WHATSAPP_NUMBER = '919781191041'
const UPI_ID = 'tarunsaini89689-1@okaxis'

function whatsappLink(plan, user) {
  const msg = encodeURIComponent(
    `Hi! I want to buy AI Roadmap 2026 - ${plan.name} (${plan.priceStr})\n\nMy registered email: ${user?.email || 'N/A'}\nName: ${user?.name || 'N/A'}\n\nPlease share the UPI QR code 🙏`
  )
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`
}

// Tarun Saini — GPay QR (tarunsaini89689-1@okaxis)
const QR_IMAGE_URL = '/qr-payment.jpeg'

function PlanCard({ plan, onBuy, onRedeem }) {
  const isLifetime = plan.id === 'pro_lifetime'
  const isFree     = plan.id === 'free'

  return (
    <div style={{
      position:'relative',
      background: isLifetime
        ? 'linear-gradient(135deg,rgba(245,158,11,.1),rgba(251,146,60,.05))'
        : '#0d0f1a',
      border:`1.5px solid ${isLifetime?'rgba(245,158,11,.4)':'#1a1d2e'}`,
      borderRadius:18, padding:'28px 24px',
      transform: isLifetime ? 'scale(1.03)' : 'scale(1)',
      boxShadow: isLifetime ? '0 8px 40px rgba(245,158,11,.12)' : 'none',
      transition:'all .2s',
    }}>
      <div style={{position:'absolute',top:0,left:0,right:0,height:3,borderRadius:'18px 18px 0 0',
        background:`linear-gradient(90deg,${plan.color},transparent)`}}/>

      {plan.badge && (
        <div style={{position:'absolute',top:-13,left:'50%',transform:'translateX(-50%)',
          background:`linear-gradient(90deg,${plan.color},#fb923c)`,
          color:'#000',fontSize:10,fontWeight:900,padding:'4px 14px',borderRadius:99,
          letterSpacing:'1px',whiteSpace:'nowrap',boxShadow:`0 4px 16px ${plan.color}44`}}>
          {plan.badge}
        </div>
      )}

      <div style={{fontSize:11,fontWeight:700,color:plan.color,letterSpacing:'2px',
        textTransform:'uppercase',marginBottom:10}}>{plan.name}</div>

      {isFree ? (
        <div style={{fontSize:36,fontWeight:900,color:'#e8eaf2',marginBottom:4}}>Free</div>
      ) : isLifetime ? (
        <div style={{marginBottom:4}}>
          <div style={{display:'flex',alignItems:'baseline',gap:8}}>
            <span style={{fontSize:36,fontWeight:900,color:'#f59e0b'}}>₹999</span>
            <span style={{fontSize:13,color:'#8b90b0',textDecoration:'line-through'}}>₹9,999</span>
          </div>
          <div style={{fontSize:11,color:'#f59e0b',fontWeight:600}}>one-time · 70% launch offer</div>
        </div>
      ) : (
        <div style={{marginBottom:4}}>
          <span style={{fontSize:36,fontWeight:900,color:plan.color}}>₹200</span>
          <span style={{fontSize:13,color:'#8b90b0'}}>/month</span>
        </div>
      )}

      <div style={{fontSize:12,color:'#8b90b0',marginBottom:20}}>{plan.tagline}</div>

      <div style={{display:'flex',flexDirection:'column',gap:9,marginBottom:24}}>
        {plan.features.map((f,i) => (
          <div key={i} style={{display:'flex',gap:9,alignItems:'flex-start'}}>
            <span style={{color:'#10b981',flexShrink:0,marginTop:1}}>✓</span>
            <span style={{fontSize:13,color:'#e8eaf2',lineHeight:1.45}}>{f}</span>
          </div>
        ))}
        {plan.missing?.map((f,i) => (
          <div key={i} style={{display:'flex',gap:9,alignItems:'flex-start',opacity:.35}}>
            <span style={{color:'#454869',flexShrink:0,marginTop:1}}>✗</span>
            <span style={{fontSize:12,color:'#8b90b0',lineHeight:1.45}}>{f}</span>
          </div>
        ))}
      </div>

      {isFree ? (
        <div style={{padding:'12px',textAlign:'center',borderRadius:12,
          background:'rgba(255,255,255,.03)',border:'1px solid #1a1d2e',
          color:'#8b90b0',fontSize:13}}>Always free — no payment needed</div>
      ) : (
        <button onClick={()=>onBuy(plan)}
          style={{width:'100%',padding:'14px',borderRadius:12,border:'none',cursor:'pointer',
            fontSize:14,fontWeight:700,color:'#fff',
            background:isLifetime
              ? 'linear-gradient(135deg,#f59e0b,#fb923c)'
              : 'linear-gradient(135deg,#6366f1,#a855f7)',
            boxShadow:isLifetime?'0 6px 24px rgba(245,158,11,.3)':'0 6px 20px rgba(99,102,241,.3)',
            transition:'all .2s'}}
          onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
          onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
          💬 Buy via WhatsApp
        </button>
      )}
    </div>
  )
}

// ── HOW IT WORKS steps ────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { n:'1', icon:'💬', title:'Chat on WhatsApp',  desc:'Click "Buy via WhatsApp" — a message is pre-typed for you. Just hit Send.' },
    { n:'2', icon:'📲', title:'Pay via UPI/QR',    desc:'We reply with a QR code. Scan with PhonePe, GPay, Paytm or any UPI app.' },
    { n:'3', icon:'🔑', title:'Get your Access Key', desc:'Within minutes of payment, you get a key like ABCD-EFGH-IJKL on WhatsApp.' },
    { n:'4', icon:'🚀', title:'Enter key & unlock', desc:'Paste the key in the "I have a key" box below. All phases unlock instantly.' },
  ]
  return (
    <div style={{marginBottom:48}}>
      <h3 style={{fontSize:18,fontWeight:800,textAlign:'center',marginBottom:24,letterSpacing:'-.02em'}}>
        How it works — 4 simple steps
      </h3>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:12}}>
        {steps.map(s=>(
          <div key={s.n} style={{background:'#0d0f1a',border:'1px solid #1a1d2e',borderRadius:14,padding:'20px 18px'}}>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
              <div style={{width:28,height:28,borderRadius:8,background:'linear-gradient(135deg,#6366f1,#a855f7)',
                display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:900,color:'#fff',flexShrink:0}}>
                {s.n}
              </div>
              <span style={{fontSize:20}}>{s.icon}</span>
            </div>
            <div style={{fontSize:13,fontWeight:700,color:'#e8eaf2',marginBottom:5}}>{s.title}</div>
            <div style={{fontSize:12,color:'#8b90b0',lineHeight:1.6}}>{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── ACCESS KEY ENTRY ──────────────────────────────────────────────────────────
function KeyEntry({ uid, onSuccess }) {
  const [key,  setKey]  = useState('')
  const [err,  setErr]  = useState('')
  const [ok,   setOk]   = useState(false)
  const [busy, setBusy] = useState(false)

  const fmt = v => {
    // auto-format as XXXX-XXXX-XXXX
    const clean = v.toUpperCase().replace(/[^A-Z0-9]/g,'')
    const parts = [clean.slice(0,4), clean.slice(4,8), clean.slice(8,12)].filter(Boolean)
    return parts.join('-')
  }

  const submit = () => {
    setErr('')
    if (key.replace(/-/g,'').length < 12) return setErr('Enter the full 12-character key.')
    setBusy(true)
    redeemKey(key, uid).then(res => {
      setBusy(false)
      if (!res.ok) return setErr(res.error)
      setOk(true)
      setTimeout(onSuccess, 1800)
    }).catch(e => {
      setBusy(false)
      setErr('Firebase error: ' + e.message)
    })
  }

  return (
    <div style={{background:'#0d0f1a',border:'1px solid #242740',borderRadius:16,padding:'24px',marginTop:32}}>
      <div style={{textAlign:'center',marginBottom:20}}>
        <div style={{fontSize:28,marginBottom:8}}>🔑</div>
        <div style={{fontSize:16,fontWeight:800,marginBottom:4}}>Already paid? Enter your key</div>
        <div style={{fontSize:12,color:'#8b90b0'}}>
          Sent to you on WhatsApp after payment confirmation
        </div>
      </div>

      {ok ? (
        <div style={{textAlign:'center',padding:'16px',borderRadius:12,
          background:'rgba(16,185,129,.1)',border:'1px solid rgba(16,185,129,.25)'}}>
          <div style={{fontSize:24,marginBottom:6}}>🎉</div>
          <div style={{fontSize:15,fontWeight:800,color:'#10b981'}}>Access unlocked!</div>
          <div style={{fontSize:12,color:'#8b90b0',marginTop:4}}>Reloading your dashboard...</div>
        </div>
      ) : (
        <>
          <div style={{display:'flex',gap:8}}>
            <input
              value={key}
              onChange={e=>setKey(fmt(e.target.value))}
              maxLength={14}
              placeholder="ABCD-EFGH-IJKL"
              onKeyDown={e=>e.key==='Enter'&&submit()}
              style={{flex:1,padding:'12px 16px',background:'#08090f',
                border:`1.5px solid ${err?'#ef4444':key.length>0?'#6366f1':'#242740'}`,
                borderRadius:10,color:'#e8eaf2',fontSize:16,fontWeight:700,
                outline:'none',letterSpacing:'3px',textAlign:'center',
                fontFamily:'Space Mono, monospace',transition:'border-color .15s'}}
            />
            <button onClick={submit} disabled={busy||key.replace(/-/g,'').length<12}
              style={{padding:'12px 20px',borderRadius:10,border:'none',cursor:'pointer',
                background:key.replace(/-/g,'').length>=12?'linear-gradient(135deg,#6366f1,#a855f7)':'#1a1d2e',
                color:key.replace(/-/g,'').length>=12?'#fff':'#454869',
                fontSize:13,fontWeight:700,transition:'all .18s',whiteSpace:'nowrap'}}>
              {busy ? '⏳' : '✅ Activate'}
            </button>
          </div>
          {err && (
            <div style={{marginTop:10,padding:'10px 14px',borderRadius:8,fontSize:12,
              background:'rgba(239,68,68,.08)',border:'1px solid rgba(239,68,68,.2)',color:'#f87171'}}>
              ⚠️ {err}
            </div>
          )}
          <div style={{fontSize:11,color:'#454869',marginTop:10,textAlign:'center'}}>
            Key format: XXXX-XXXX-XXXX (sent on WhatsApp after payment)
          </div>
        </>
      )}
    </div>
  )
}

// ── PAYMENT MODAL ─────────────────────────────────────────────────────────────
function PaymentModal({ plan, user, onClose }) {
  const [step, setStep] = useState('info') // info | qr
  const waLink = whatsappLink(plan, user)

  return (
    <div style={{position:'fixed',inset:0,zIndex:500,background:'rgba(0,0,0,.8)',
      backdropFilter:'blur(8px)',display:'flex',alignItems:'center',justifyContent:'center',padding:16}}
      onClick={onClose}>
      <div style={{background:'#0d0f1a',border:'1px solid #242740',borderRadius:20,
        padding:28,maxWidth:420,width:'100%',animation:'popIn .3s cubic-bezier(.16,1,.3,1)'}}
        onClick={e=>e.stopPropagation()}>

        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
          <div>
            <div style={{fontSize:16,fontWeight:800}}>Complete your purchase</div>
            <div style={{fontSize:12,color:'#8b90b0',marginTop:2}}>
              {plan.name} · <span style={{color:plan.color,fontWeight:700}}>{plan.priceStr}</span>
            </div>
          </div>
          <button onClick={onClose} style={{background:'none',border:'1px solid #242740',
            borderRadius:8,color:'#8b90b0',width:32,height:32,cursor:'pointer',fontSize:14}}>✕</button>
        </div>

        {/* Step 1: WhatsApp */}
        <div style={{display:'flex',flexDirection:'column',gap:10,marginBottom:20}}>

          {/* WhatsApp button — primary CTA */}
          <a href={waLink} target="_blank" rel="noreferrer"
            style={{display:'flex',alignItems:'center',justifyContent:'center',gap:10,
              padding:'14px',borderRadius:12,textDecoration:'none',
              background:'linear-gradient(135deg,#25d366,#128c7e)',
              color:'#fff',fontSize:14,fontWeight:700,
              boxShadow:'0 6px 24px rgba(37,211,102,.3)',transition:'all .2s'}}
            onMouseEnter={e=>e.currentTarget.style.transform='translateY(-1px)'}
            onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Message on WhatsApp
          </a>

          {/* Direct call / WhatsApp number display */}
          <div style={{padding:'12px 16px',borderRadius:10,background:'rgba(37,211,102,.06)',
            border:'1px solid rgba(37,211,102,.15)',display:'flex',alignItems:'center',
            justifyContent:'space-between'}}>
            <div>
              <div style={{fontSize:11,color:'#8b90b0',marginBottom:2}}>WhatsApp number</div>
              <div style={{fontSize:16,fontWeight:800,color:'#25d366',letterSpacing:'1px',
                fontFamily:'Space Mono,monospace'}}>+91 97811 91041</div>
            </div>
            <button onClick={()=>navigator.clipboard.writeText('919781191041')}
              style={{padding:'6px 12px',borderRadius:8,background:'rgba(37,211,102,.1)',
                border:'1px solid rgba(37,211,102,.2)',color:'#25d366',fontSize:11,
                fontWeight:700,cursor:'pointer'}}>Copy</button>
          </div>
        </div>

        {/* QR Code section */}
        <div style={{borderTop:'1px solid #1a1d2e',paddingTop:16,marginBottom:16}}>
          <div style={{fontSize:12,fontWeight:700,color:'#8b90b0',textAlign:'center',marginBottom:12}}>
            — OR scan UPI QR to pay directly —
          </div>
          <div style={{textAlign:'center'}}>
              <div style={{display:'inline-block',padding:12,background:'#fff',borderRadius:16,
                boxShadow:'0 8px 32px rgba(0,0,0,.4)',marginBottom:10}}>
                <img src={QR_IMAGE_URL} alt="Tarun Saini — GPay QR"
                  style={{width:200,height:200,display:'block',borderRadius:8,objectFit:'cover'}}/>
              </div>
              <div style={{fontSize:13,fontWeight:700,color:'#e8eaf2',marginBottom:3}}>Tarun Saini</div>
              <div style={{fontSize:11,color:'#8b90b0',marginBottom:6,fontFamily:'Space Mono,monospace'}}>
                {UPI_ID}
              </div>
              <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:8,flexWrap:'wrap'}}>
                {['PhonePe','GPay','Paytm','Any UPI'].map(app=>(
                  <span key={app} style={{fontSize:9,padding:'2px 8px',borderRadius:99,
                    background:'rgba(255,255,255,.06)',border:'1px solid #242740',color:'#8b90b0',fontWeight:600}}>
                    {app}
                  </span>
                ))}
              </div>
            </div>
        </div>

        {/* After payment instructions */}
        <div style={{padding:'12px 14px',borderRadius:10,background:'rgba(99,102,241,.07)',
          border:'1px solid rgba(99,102,241,.18)'}}>
          <div style={{fontSize:11,fontWeight:700,color:'#818cf8',marginBottom:6}}>
            📋 After payment:
          </div>
          <div style={{fontSize:12,color:'#8b90b0',lineHeight:1.7}}>
            1. Send a screenshot of the payment on WhatsApp<br/>
            2. You'll receive your <strong style={{color:'#e8eaf2'}}>Access Key</strong> within <strong style={{color:'#e8eaf2'}}>5–15 minutes</strong><br/>
            3. Enter the key in the box below to unlock instantly
          </div>
        </div>
      </div>
    </div>
  )
}

// ── MAIN PRICING PAGE ─────────────────────────────────────────────────────────
export default function PricingPage({ user, currentPlan, uid, onSuccess, onClose }) {
  const [modal, setModal] = useState(null) // plan object or null

  return (
    <div style={{minHeight:'100vh',background:'#050508',padding:'40px 20px 80px',
      backgroundImage:'radial-gradient(ellipse 60% 40% at 50% 0%,rgba(99,102,241,.1) 0%,transparent 60%)'}}>

      {modal && <PaymentModal plan={modal} user={user} onClose={()=>setModal(null)}/>}

      <div style={{maxWidth:960,margin:'0 auto'}}>
        {onClose && (
          <button onClick={onClose}
            style={{marginBottom:24,background:'none',border:'1px solid #1a1d2e',
              borderRadius:8,color:'#8b90b0',padding:'7px 14px',fontSize:12,
              fontWeight:600,cursor:'pointer',display:'flex',alignItems:'center',gap:6}}>
            ← Back to roadmap
          </button>
        )}

        {/* Hero */}
        <div style={{textAlign:'center',marginBottom:48}} className="fade-up">
          <div style={{display:'inline-flex',alignItems:'center',gap:8,padding:'6px 16px',
            borderRadius:99,marginBottom:16,background:'rgba(37,211,102,.1)',
            border:'1px solid rgba(37,211,102,.2)',fontSize:12,fontWeight:700,color:'#25d366'}}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Pay via WhatsApp · UPI · QR Code
          </div>

          <h1 style={{fontSize:36,fontWeight:900,letterSpacing:'-.04em',marginBottom:12,
            background:'linear-gradient(135deg,#e8eaf2,#818cf8)',
            WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
            Simple. No gateway. No fees.
          </h1>
          <p style={{color:'#8b90b0',fontSize:15,maxWidth:480,margin:'0 auto',lineHeight:1.65}}>
            Pay via UPI / PhonePe / GPay · Get an access key on WhatsApp within minutes · Unlock instantly.
          </p>
        </div>

        <HowItWorks/>

        {/* Plan cards */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:16,marginBottom:40}}
          className="fade-up">
          {Object.values(PLANS).map(plan=>(
            <PlanCard key={plan.id} plan={plan}
              onBuy={p=>setModal(p)}
              onRedeem={()=>{}}/>
          ))}
        </div>

        {/* Key entry */}
        <KeyEntry uid={uid} onSuccess={()=>{ onSuccess?.(); onClose?.() }}/>

        {/* Trust row */}
        <div style={{display:'flex',justifyContent:'center',gap:28,marginTop:32,flexWrap:'wrap'}}>
          {[['⚡','Instant activation'],['📲','UPI / PhonePe / GPay'],['🔁','7-day refund'],['💬','WhatsApp support']].map(([em,lb])=>(
            <div key={lb} style={{display:'flex',alignItems:'center',gap:6,fontSize:12,color:'#8b90b0'}}>
              <span style={{fontSize:16}}>{em}</span>{lb}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
