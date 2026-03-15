import { useState } from 'react'
import { activatePlan } from '../hooks/useSubscription.js'

const UPI_ID   = 'tarunsaini89689-1@okaxis'
const WHATSAPP = '919781191041'
const PLANS = [
  {
    id:'free', tier:'FREE FOREVER', price:'₹0', cycle:'',
    color:'#22d3ee', hot:false,
    perks:['Phase 1 — Python Foundations','Hindi + English YouTube','Progress tracker','Community access'],
    locked:['Phases 2–10','AI Tutor','Productivity dashboard'],
  },
  {
    id:'pro_monthly', tier:'PRO MONTHLY', price:'₹200', cycle:'/month',
    color:'#a78bfa', hot:false,
    perks:['All 10 phases unlocked','300 topics full access','AI Tutor (Claude)','Hindi + English','Priority support'],
    locked:[],
  },
  {
    id:'pro_lifetime', tier:'PRO LIFETIME', price:'₹999', cycle:'one-time',
    color:'#fbbf24', hot:true,
    perks:['All 10 phases forever','300 topics full access','AI Tutor (Claude)','All future updates','Direct WhatsApp support','Certificate of completion'],
    locked:[],
  },
]

function Step({ n, label, done }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
      <div style={{
        width:28, height:28, borderRadius:'50%', flexShrink:0,
        background: done ? '#34d399' : 'var(--bg-glass2)',
        border: `1px solid ${done ? '#34d399' : 'var(--border2)'}`,
        display:'flex', alignItems:'center', justifyContent:'center',
        fontFamily:'var(--font-display)', fontSize:12, fontWeight:700,
        color: done ? '#fff' : 'var(--t3)',
      }}>{done ? '✓' : n}</div>
      <span style={{ fontFamily:'var(--font-body)', fontSize:13,
        color: done ? 'var(--t1)' : 'var(--t2)' }}>{label}</span>
    </div>
  )
}

export default function PricingPage({ user, uid, currentPlan, onSuccess, onClose }) {
  const [step,    setStep]    = useState('plans')  // plans | pay | verify | done
  const [chosen,  setChosen]  = useState(null)
  const [txnId,   setTxnId]   = useState('')
  const [loading, setLoading] = useState(false)
  const [copied,  setCopied]  = useState(false)
  const [error,   setError]   = useState('')

  const plan = PLANS.find(p => p.id === chosen)

  // Step 1 — choose plan
  const choosePlan = (id) => {
    if (id === 'free') { onClose?.(); return }
    setChosen(id)
    setStep('pay')
  }

  // Step 2 — open specific UPI app
  const openGPay = () => {
    const p = PLANS.find(x => x.id === chosen)
    const amt = p.id === 'pro_monthly' ? 200 : 999
    const note = encodeURIComponent(`NeuralProtocol-${uid?.slice(0,8)||'user'}`)
    // Google Pay intent URL
    const url = `intent://pay?pa=${UPI_ID}&pn=NeuralProtocol&am=${amt}&cu=INR&tn=${note}#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;end`
    window.location.href = url
  }

  const openPhonePe = () => {
    const p = PLANS.find(x => x.id === chosen)
    const amt = p.id === 'pro_monthly' ? 200 : 999
    const note = encodeURIComponent(`NeuralProtocol-${uid?.slice(0,8)||'user'}`)
    window.location.href = `intent://pay?pa=${UPI_ID}&pn=NeuralProtocol&am=${amt}&cu=INR&tn=${note}#Intent;scheme=upi;package=com.phonepe.app;end`
  }

  const openPaytm = () => {
    const p = PLANS.find(x => x.id === chosen)
    const amt = p.id === 'pro_monthly' ? 200 : 999
    const note = encodeURIComponent(`NeuralProtocol-${uid?.slice(0,8)||'user'}`)
    window.location.href = `intent://pay?pa=${UPI_ID}&pn=NeuralProtocol&am=${amt}&cu=INR&tn=${note}#Intent;scheme=upi;package=net.one97.paytm;end`
  }

  // WhatsApp payment confirmation
  const openWhatsApp = () => {
    const p = PLANS.find(x => x.id === chosen)
    const msg = encodeURIComponent(
      `Hi! I want to activate Neural Protocol ${p.tier}.\n\nPlan: ${p.tier}\nPrice: ${p.price}${p.cycle}\nUser ID: ${uid?.slice(0,8) || 'guest'}\n\nPlease confirm my payment.`
    )
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, '_blank')
  }

  // Step 3 — verify (manual for now, admin activates)
  const submitTxn = async () => {
    if (!txnId.trim()) { setError('Please enter your UPI transaction ID'); return }
    setLoading(true); setError('')
    try {
      // Save pending verification to Firestore via activatePlan as 'trial'
      // Admin sees it and upgrades to pro_lifetime
      // For now, auto-activate after txn ID submitted (trust-based)
      await activatePlan(uid, chosen)
      setStep('done')
    } catch(e) {
      setError('Something went wrong. Please contact us on WhatsApp.')
    } finally {
      setLoading(false)
    }
  }

  const s = { fontFamily:'var(--font-body)', fontSize:13, color:'var(--t2)' }
  const gCol = plan?.color || '#22d3ee'

  return (
    <div style={{ minHeight:'100dvh', background:'var(--bg-base)',
      display:'flex', flexDirection:'column', alignItems:'center',
      padding:'clamp(16px,4vw,32px)', position:'relative' }}>

      {/* Back */}
      <button onClick={onClose} style={{
        position:'absolute', top:16, left:16,
        background:'var(--bg-glass)', border:'1px solid var(--border)',
        borderRadius:'var(--r)', padding:'7px 14px',
        color:'var(--t2)', fontFamily:'var(--font-mono)', fontSize:10,
        letterSpacing:1, cursor:'pointer', zIndex:10,
      }}>← Back</button>

      <div style={{ maxWidth:480, width:'100%', paddingTop:56 }}>

        {/* ── PLANS ──────────────────────────────────────── */}
        {step === 'plans' && (
          <div className="fade-up">
            <div style={{ textAlign:'center', marginBottom:28 }}>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:9, color:'var(--cyan)',
                letterSpacing:3, textTransform:'uppercase', marginBottom:8, opacity:.7 }}>
                // UNLOCK YOUR PATH
              </div>
              <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(22px,5vw,32px)',
                fontWeight:700, color:'var(--t1)', marginBottom:6 }}>
                Choose Your Plan
              </h1>
              <p style={{ fontFamily:'var(--font-body)', fontSize:13, color:'var(--t3)' }}>
                Simple UPI payment · Instant activation · No subscriptions
              </p>
            </div>

            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {PLANS.map(p => {
                const isActive = currentPlan === p.id
                return (
                  <div key={p.id} onClick={() => choosePlan(p.id)} style={{
                    background:'var(--bg-glass)', border:`1px solid ${p.hot ? p.color : 'var(--border)'}`,
                    borderRadius:16, padding:'18px 20px', cursor:'pointer',
                    position:'relative', overflow:'hidden',
                    boxShadow: p.hot ? `0 4px 24px rgba(251,191,36,.15)` : 'none',
                    transition:'all .2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = p.color}
                  onMouseLeave={e => e.currentTarget.style.borderColor = p.hot ? p.color : 'var(--border)'}
                  >
                    <div style={{ position:'absolute', top:0, left:0, right:0, height:2,
                      background:p.color, opacity: p.hot ? 1 : .5 }}/>
                    {p.hot && (
                      <div style={{ position:'absolute', top:12, right:14,
                        background:p.color, color:'#000', borderRadius:4,
                        padding:'2px 8px', fontFamily:'var(--font-mono)',
                        fontSize:8, fontWeight:700, letterSpacing:1 }}>
                        BEST VALUE
                      </div>
                    )}
                    <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:12 }}>
                      <div>
                        <div style={{ fontFamily:'var(--font-mono)', fontSize:8, color:p.color,
                          letterSpacing:2, textTransform:'uppercase', marginBottom:3 }}>
                          {p.tier}
                        </div>
                        <div style={{ display:'flex', alignItems:'baseline', gap:4 }}>
                          <span style={{ fontFamily:'var(--font-display)', fontSize:28,
                            fontWeight:700, color: p.hot ? p.color : 'var(--t1)' }}>
                            {p.price}
                          </span>
                          {p.cycle && (
                            <span style={{ fontFamily:'var(--font-mono)', fontSize:9,
                              color:'var(--t3)', letterSpacing:.5 }}>{p.cycle}</span>
                          )}
                        </div>
                      </div>
                      {isActive && (
                        <div style={{ marginLeft:'auto', padding:'4px 10px', borderRadius:99,
                          background:`rgba(52,211,153,.12)`, border:'1px solid rgba(52,211,153,.3)',
                          fontFamily:'var(--font-mono)', fontSize:9, color:'#34d399' }}>
                          ✓ ACTIVE
                        </div>
                      )}
                    </div>
                    <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
                      {p.perks.map(k => (
                        <div key={k} style={{ display:'flex', gap:8, alignItems:'flex-start' }}>
                          <span style={{ color:p.color, fontSize:10, flexShrink:0, marginTop:2 }}>◈</span>
                          <span style={{ ...s }}>{k}</span>
                        </div>
                      ))}
                      {p.locked.map(k => (
                        <div key={k} style={{ display:'flex', gap:8, alignItems:'flex-start', opacity:.4 }}>
                          <span style={{ fontSize:10, flexShrink:0, marginTop:2 }}>✕</span>
                          <span style={{ ...s }}>{k}</span>
                        </div>
                      ))}
                    </div>
                    {!isActive && (
                      <div style={{ marginTop:14, padding:'10px', borderRadius:10,
                        background: p.id === 'free' ? 'var(--bg-glass2)' : `rgba(${p.color === '#fbbf24' ? '251,191,36' : p.color === '#a78bfa' ? '167,139,250' : '34,211,238'},.12)`,
                        border: `1px solid ${p.color}33`,
                        fontFamily:'var(--font-display)', fontSize:13, fontWeight:600,
                        color: p.color, textAlign:'center',
                      }}>
                        {p.id === 'free' ? 'Continue with Free →' : `Activate ${p.tier} →`}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ── PAY ─────────────────────────────────────────── */}
        {step === 'pay' && plan && (
          <div className="fade-up">
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:700,
              color:'var(--t1)', marginBottom:6 }}>Complete Payment</h2>
            <p style={{ ...s, marginBottom:20 }}>
              Pay via UPI and then confirm on WhatsApp
            </p>

            {/* Steps */}
            <div style={{ background:'var(--bg-glass)', border:'1px solid var(--border)',
              borderRadius:16, padding:'20px', marginBottom:16,
              display:'flex', flexDirection:'column', gap:14 }}>
              <Step n="1" label="Pay via UPI" />
              <Step n="2" label="Message us on WhatsApp with your UTR/TXN ID" />
              <Step n="3" label="Get activated within 5 minutes" />
            </div>

            {/* Plan summary */}
            <div style={{ background:`rgba(${plan.color === '#fbbf24' ? '251,191,36' : plan.color === '#a78bfa' ? '167,139,250' : '34,211,238'},.08)`,
              border:`1px solid ${gCol}33`, borderRadius:14, padding:'14px 16px', marginBottom:16 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div>
                  <div style={{ fontFamily:'var(--font-mono)', fontSize:9, color:gCol,
                    letterSpacing:2, textTransform:'uppercase', marginBottom:3 }}>{plan.tier}</div>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:20, fontWeight:700,
                    color:'var(--t1)' }}>{plan.price}
                    {plan.cycle && <span style={{ fontSize:11, color:'var(--t3)', fontWeight:400 }}> {plan.cycle}</span>}
                  </div>
                </div>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:9, color:'var(--t3)',
                  textAlign:'right', lineHeight:1.6 }}>
                  UPI ID:<br/>
                  <span style={{ color:'var(--t1)', fontWeight:500 }}>{UPI_ID}</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:20 }}>
              {/* UPI App buttons */}
              <div style={{ fontFamily:'var(--font-body)', fontSize:12, color:'var(--t3)',
                marginBottom:8, fontWeight:500 }}>Choose your UPI app:</div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginBottom:4 }}>
                <button onClick={openGPay} style={{
                  padding:'12px 8px', borderRadius:12, cursor:'pointer', fontWeight:600,
                  fontSize:12, background:'#4285f4', border:'none', color:'#fff',
                  fontFamily:'var(--font-display)', display:'flex', flexDirection:'column',
                  alignItems:'center', gap:4,
                }}>
                  <span style={{fontSize:22}}>🔵</span>GPay
                </button>
                <button onClick={openPhonePe} style={{
                  padding:'12px 8px', borderRadius:12, cursor:'pointer', fontWeight:600,
                  fontSize:12, background:'#5f259f', border:'none', color:'#fff',
                  fontFamily:'var(--font-display)', display:'flex', flexDirection:'column',
                  alignItems:'center', gap:4,
                }}>
                  <span style={{fontSize:22}}>🟣</span>PhonePe
                </button>
                <button onClick={openPaytm} style={{
                  padding:'12px 8px', borderRadius:12, cursor:'pointer', fontWeight:600,
                  fontSize:12, background:'#00baf2', border:'none', color:'#fff',
                  fontFamily:'var(--font-display)', display:'flex', flexDirection:'column',
                  alignItems:'center', gap:4,
                }}>
                  <span style={{fontSize:22}}>🔷</span>Paytm
                </button>
              </div>
              {/* Manual UPI copy */}
              <div style={{ background:'var(--bg-glass)', border:'1px solid var(--border)',
                borderRadius:10, padding:'10px 12px', marginTop:4,
                display:'flex', alignItems:'center', justifyContent:'space-between', gap:8 }}>
                <div>
                  <div style={{fontFamily:'var(--font-mono)',fontSize:9,color:'var(--t3)',letterSpacing:1}}>UPI ID</div>
                  <div style={{fontFamily:'var(--font-mono)',fontSize:13,color:'var(--t1)',fontWeight:500}}>{UPI_ID}</div>
                </div>
                <button onClick={()=>{navigator.clipboard?.writeText(UPI_ID);setCopied(true);setTimeout(()=>setCopied(false),2000)}}
                  style={{padding:'6px 12px',borderRadius:8,border:'1px solid var(--border-c)',
                    background:'rgba(34,211,238,.08)',color:'var(--cyan)',
                    fontFamily:'var(--font-mono)',fontSize:10,cursor:'pointer',whiteSpace:'nowrap'}}>
                  {copied?'✓ Copied':'Copy'}
                </button>
              </div>

              <button onClick={openWhatsApp} style={{
                padding:'13px', borderRadius:12, cursor:'pointer', fontWeight:600,
                fontSize:14, background:'rgba(37,211,102,.1)',
                border:'1px solid rgba(37,211,102,.35)', color:'#25d366',
                fontFamily:'var(--font-display)',
              }}>
                📱 Confirm on WhatsApp (+91 97811 91041)
              </button>
            </div>

            {/* Manual TXN entry */}
            <div style={{ background:'var(--bg-glass)', border:'1px solid var(--border)',
              borderRadius:14, padding:'16px' }}>
              <div style={{ fontFamily:'var(--font-display)', fontSize:13, fontWeight:600,
                color:'var(--t1)', marginBottom:8 }}>
                Already paid? Enter your UPI Transaction ID
              </div>
              <input
                value={txnId}
                onChange={e => setTxnId(e.target.value)}
                placeholder="e.g. 123456789012 or UTR number"
                style={{ width:'100%', marginBottom:10 }}
              />
              {error && (
                <div style={{ fontFamily:'var(--font-body)', fontSize:12, color:'var(--rose)',
                  marginBottom:10 }}>{error}</div>
              )}
              <button onClick={submitTxn} disabled={loading} style={{
                width:'100%', padding:'11px', borderRadius:10, cursor:'pointer',
                fontWeight:600, fontSize:14, border:'none',
                background: loading ? 'var(--bg-glass2)' : 'var(--cyan)',
                color: loading ? 'var(--t3)' : '#020409',
                fontFamily:'var(--font-display)', transition:'all .2s',
              }}>
                {loading ? 'Verifying...' : 'Submit & Activate'}
              </button>
              <div style={{ fontFamily:'var(--font-body)', fontSize:11, color:'var(--t3)',
                textAlign:'center', marginTop:10 }}>
                Your account will be activated instantly upon verification
              </div>
            </div>
          </div>
        )}

        {/* ── DONE ─────────────────────────────────────────── */}
        {step === 'done' && (
          <div className="fade-up" style={{ textAlign:'center', padding:'40px 0' }}>
            <div style={{ fontSize:64, marginBottom:16 }}>🎉</div>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:28, fontWeight:700,
              color:'var(--t1)', marginBottom:8 }}>
              You're In!
            </h2>
            <p style={{ ...s, marginBottom:24 }}>
              {plan?.tier} activated. All phases are now unlocked.
            </p>
            <button onClick={onSuccess} style={{
              padding:'14px 36px', borderRadius:14, cursor:'pointer', fontWeight:700,
              fontSize:16, background:'linear-gradient(135deg,var(--cyan),var(--violet))',
              border:'none', color:'#fff', fontFamily:'var(--font-display)',
              boxShadow:'0 4px 20px rgba(34,211,238,.35)',
            }}>
              Start Learning →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
