import { useState, useEffect, useCallback } from 'react'
import { generateAccessKey, getAllKeys, deleteKey, PLANS } from '../hooks/useSubscription.js'

const ADMIN_PASSWORD = 'airoad2026admin' // ← change this!

export default function AdminPanel({ onClose }) {
  const [authed,  setAuthed]  = useState(false)
  const [pw,      setPw]      = useState('')
  const [pwErr,   setPwErr]   = useState('')
  const [keys,    setKeys]    = useState({})
  const [genPlan, setGenPlan] = useState('pro_lifetime')
  const [genLabel,setGenLabel]= useState('')
  const [newKey,  setNewKey]  = useState(null)
  const [copied,  setCopied]  = useState(null)
  const [filter,  setFilter]  = useState('all')
  const [fbLoading,setFbLoading]=useState(false)

  const refresh = useCallback(async () => {
    try {
      setFbLoading(true)
      const k = await getAllKeys()
      setKeys(k)
    } catch(e) { console.error(e) }
    finally { setFbLoading(false) }
  }, [])

  useEffect(() => { if (authed) refresh() }, [authed])

  const login = () => {
    if (pw === ADMIN_PASSWORD) { setAuthed(true); setPwErr('') }
    else setPwErr('Wrong password.')
  }

  const generate = async () => {
    if (fbLoading) return
    setFbLoading(true)
    try {
      const k = await generateAccessKey(genPlan, genLabel.trim())
      setNewKey(k); setGenLabel('')
      await refresh()
    } catch(e) { alert('Firebase error: ' + e.message) }
    finally { setFbLoading(false) }
  }

  const del = async (k) => {
    if (!confirm(`Delete key ${k}?`)) return
    setFbLoading(true)
    try { await deleteKey(k); await refresh() }
    catch(e) { alert('Delete error: ' + e.message) }
    finally { setFbLoading(false) }
  }

  const copy = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopied(id); setTimeout(()=>setCopied(null), 1800)
  }

  const waMsgWithKey = (k, label) => {
    const plan = PLANS[keys[k]?.planId] || PLANS.pro_lifetime
    return encodeURIComponent(
`Hi${label?' '+label:''}! 🎉 Payment confirmed — thank you!

Your AI Roadmap 2026 Access Key:

*${k}*

Steps to activate:
1. Open the app → click "Upgrade" button
2. Scroll down → "I have a key"
3. Enter the key above → click Activate ✅

Plan: ${plan.name} (${plan.priceStr})
Support: wa.me/919781191041

Happy learning! 🚀`)
  }

  const keyList = Object.entries(keys)
    .filter(([,v]) => filter==='all'||(filter==='used'?v.usedBy:!v.usedBy))
    .sort(([,a],[,b]) => {
      const ta = a.createdAt?.toMillis ? a.createdAt.toMillis() : (a.createdAt||0)
      const tb = b.createdAt?.toMillis ? b.createdAt.toMillis() : (b.createdAt||0)
      return tb - ta
    })

  const usedCount  = Object.values(keys).filter(k=>k.usedBy).length
  const totalCount = Object.values(keys).length
  const revenue    = Object.values(keys).filter(k=>k.usedBy).reduce((s,k)=>s+(PLANS[k.planId]?.price||0),0)

  const fmtDate = (v) => {
    if (!v) return '—'
    const ms = v?.toMillis ? v.toMillis() : (typeof v==='number'?v:null)
    if (!ms) return '—'
    return new Date(ms).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'2-digit'})
  }

  // ── Login ──────────────────────────────────────────────────────────────────
  if (!authed) return (
    <div style={{position:'fixed',inset:0,zIndex:1000,background:'rgba(0,0,0,.88)',
      backdropFilter:'blur(12px)',display:'flex',alignItems:'center',justifyContent:'center',padding:20}}>
      <div style={{background:'var(--bg-surface)',border:'1px solid #242740',borderRadius:20,padding:32,maxWidth:380,width:'100%',animation:'popIn .3s cubic-bezier(.16,1,.3,1)'}}>
        <div style={{textAlign:'center',marginBottom:24}}>
          <div style={{fontSize:36,marginBottom:10}}>🔐</div>
          <div style={{fontSize:18,fontWeight:800}}>Admin Panel</div>
          <div style={{fontSize:12,color:'var(--t2)',marginTop:4}}>Powered by Firebase</div>
        </div>
        <input type="password" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==='Enter'&&login()}
          placeholder="Admin password"
          style={{width:'100%',padding:'12px 16px',background:'#08090f',border:`1.5px solid ${pwErr?'#ef4444':'#242740'}`,borderRadius:10,color:'#e8eaf2',fontSize:14,outline:'none',marginBottom:10}}/>
        {pwErr&&<div style={{color:'#f87171',fontSize:12,marginBottom:10}}>{pwErr}</div>}
        <div style={{display:'flex',gap:8}}>
          <button onClick={login} style={{flex:1,padding:'12px',borderRadius:10,border:'none',cursor:'pointer',background:'linear-gradient(135deg,#6366f1,#a855f7)',color:'#fff',fontSize:14,fontWeight:700}}>Enter</button>
          <button onClick={onClose} style={{padding:'12px 16px',borderRadius:10,border:'1px solid #242740',background:'transparent',color:'var(--t2)',fontSize:13,cursor:'pointer'}}>Cancel</button>
        </div>
        <div style={{fontSize:10,color:'var(--t3)',marginTop:10,textAlign:'center'}}>Change in AdminPanel.jsx → ADMIN_PASSWORD</div>
      </div>
    </div>
  )

  // ── Dashboard ──────────────────────────────────────────────────────────────
  return (
    <div style={{position:'fixed',inset:0,zIndex:1000,background:'rgba(0,0,0,.88)',backdropFilter:'blur(12px)',overflowY:'auto',padding:16}}>
      <div style={{maxWidth:900,margin:'0 auto'}}>

        {/* Header */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16,padding:'14px 20px',background:'var(--bg-surface)',border:'1px solid #242740',borderRadius:14}}>
          <div>
            <div style={{fontSize:17,fontWeight:800}}>🔐 Admin Panel</div>
            <div style={{fontSize:11,color:'var(--cyan)',marginTop:2}}>
              {fbLoading ? '⏳ Syncing with Firebase...' : '✅ Connected to Firebase'}
            </div>
          </div>
          <button onClick={onClose} style={{padding:'7px 14px',borderRadius:8,border:'1px solid #242740',background:'transparent',color:'var(--t2)',fontSize:12,cursor:'pointer'}}>✕ Close</button>
        </div>

        {/* Stats */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginBottom:14}}>
          {[['🔑','Total Keys',totalCount,'var(--cyan)'],['✅','Activated',usedCount,'var(--cyan)'],['⏳','Unused',totalCount-usedCount,'#f59e0b'],['💰','Revenue',`₹${revenue.toLocaleString('en-IN')}`, '#25d366']].map(([em,lb,v,c])=>(
            <div key={lb} style={{background:'var(--bg-surface)',border:`1px solid ${c}22`,borderRadius:12,padding:'14px',textAlign:'center'}}>
              <div style={{fontSize:18,marginBottom:4}}>{em}</div>
              <div style={{fontSize:20,fontWeight:800,color:c}}>{v}</div>
              <div style={{fontSize:10,color:'var(--t2)',marginTop:2}}>{lb}</div>
            </div>
          ))}
        </div>

        {/* Generate key */}
        <div style={{background:'var(--bg-surface)',border:'1px solid #242740',borderRadius:14,padding:20,marginBottom:14}}>
          <div style={{fontSize:14,fontWeight:700,marginBottom:14}}>⚡ Generate Access Key — After Payment</div>
          <div style={{display:'flex',gap:8,flexWrap:'wrap',alignItems:'flex-end'}}>
            <div style={{flex:1,minWidth:160}}>
              <div style={{fontSize:11,color:'var(--t2)',marginBottom:5}}>Plan</div>
              <select value={genPlan} onChange={e=>setGenPlan(e.target.value)}
                style={{width:'100%',padding:'10px 12px',background:'#08090f',border:'1.5px solid #242740',borderRadius:9,color:'#e8eaf2',fontSize:13,outline:'none',cursor:'pointer'}}>
                <option value="pro_monthly">Pro Monthly — ₹200</option>
                <option value="pro_lifetime">Lifetime — ₹999</option>
              </select>
            </div>
            <div style={{flex:2,minWidth:200}}>
              <div style={{fontSize:11,color:'var(--t2)',marginBottom:5}}>Buyer name / phone (for your reference)</div>
              <input value={genLabel} onChange={e=>setGenLabel(e.target.value)}
                placeholder="e.g. Rahul +91 98765 43210"
                onKeyDown={e=>e.key==='Enter'&&generate()}
                style={{width:'100%',padding:'10px 12px',background:'#08090f',border:'1.5px solid #242740',borderRadius:9,color:'#e8eaf2',fontSize:13,outline:'none'}}/>
            </div>
            <button onClick={generate} disabled={fbLoading}
              style={{padding:'10px 20px',borderRadius:9,border:'none',cursor:fbLoading?'wait':'pointer',
                background:fbLoading?'var(--border)':'linear-gradient(135deg,#6366f1,#a855f7)',
                color:'#fff',fontSize:13,fontWeight:700,whiteSpace:'nowrap',
                boxShadow:fbLoading?'none':'0 4px 16px rgba(34,211,238,.3)'}}>
              {fbLoading ? '⏳ Saving...' : '+ Generate Key'}
            </button>
          </div>

          {newKey && (
            <div style={{marginTop:14,padding:'16px',borderRadius:12,
              background:'linear-gradient(135deg,rgba(34,211,238,.08),rgba(6,182,212,.04))',
              border:'1px solid rgba(34,211,238,.25)',animation:'fadeUp .3s ease'}}>
              <div style={{fontSize:11,color:'var(--cyan)',fontWeight:700,marginBottom:8}}>
                ✅ Key generated & saved to Firebase — send this to the buyer:
              </div>
              <div style={{display:'flex',alignItems:'center',gap:10,flexWrap:'wrap'}}>
                <span style={{fontSize:22,fontWeight:900,letterSpacing:'4px',color:'#e8eaf2',fontFamily:'Space Mono,monospace',
                  background:'#08090f',padding:'8px 16px',borderRadius:8,border:'1px solid #242740'}}>
                  {newKey}
                </span>
                <button onClick={()=>copy(newKey,'nk')}
                  style={{padding:'8px 14px',borderRadius:8,border:'1px solid #242740',
                    background:copied==='nk'?'rgba(34,211,238,.15)':'transparent',
                    color:copied==='nk'?'var(--cyan)':'var(--t2)',fontSize:12,fontWeight:700,cursor:'pointer'}}>
                  {copied==='nk'?'✓ Copied':'📋 Copy'}
                </button>
                <a href={`https://wa.me/?text=${waMsgWithKey(newKey,genLabel)}`}
                  target="_blank" rel="noreferrer"
                  style={{display:'flex',alignItems:'center',gap:6,padding:'8px 14px',borderRadius:8,
                    background:'linear-gradient(135deg,#25d366,#128c7e)',color:'#fff',
                    fontSize:12,fontWeight:700,textDecoration:'none'}}>
                  💬 Send WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Keys table */}
        <div style={{background:'var(--bg-surface)',border:'1px solid #242740',borderRadius:14,overflow:'hidden',marginBottom:14}}>
          <div style={{padding:'13px 18px',borderBottom:'1px solid #1a1d2e',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:8}}>
            <div style={{fontSize:14,fontWeight:700}}>
              🔑 All Keys — Stored in Firebase ({keyList.length})
            </div>
            <div style={{display:'flex',gap:5}}>
              {['all','unused','used'].map(f=>(
                <button key={f} onClick={()=>setFilter(f)}
                  style={{padding:'4px 12px',borderRadius:99,cursor:'pointer',
                    border:`1px solid ${filter===f?'var(--cyan)':'#242740'}`,
                    background:filter===f?'rgba(34,211,238,.12)':'transparent',
                    color:filter===f?'var(--cyan)':'var(--t2)',fontSize:11,fontWeight:700}}>
                  {f.charAt(0).toUpperCase()+f.slice(1)}
                </button>
              ))}
              <button onClick={refresh} disabled={fbLoading}
                style={{padding:'4px 10px',borderRadius:8,border:'1px solid #242740',background:'transparent',color:'var(--t2)',fontSize:11,cursor:'pointer'}}>
                {fbLoading?'⏳':'↺'}
              </button>
            </div>
          </div>

          {keyList.length===0 ? (
            <div style={{padding:'40px',textAlign:'center',color:'var(--t2)',fontSize:13}}>
              {fbLoading ? '⏳ Loading from Firebase...' : 'No keys yet. Generate one above after receiving payment.'}
            </div>
          ) : (
            <div style={{overflowX:'auto'}}>
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead>
                  <tr style={{borderBottom:'1px solid #1a1d2e'}}>
                    {['Key','Plan','Buyer','Created','Status','Actions'].map(h=>(
                      <th key={h} style={{padding:'10px 14px',textAlign:'left',fontSize:10,fontWeight:700,color:'var(--t3)',textTransform:'uppercase',letterSpacing:'1px',whiteSpace:'nowrap'}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {keyList.map(([k,v])=>{
                    const plan   = PLANS[v.planId]
                    const isUsed = !!v.usedBy
                    return (
                      <tr key={k} style={{borderBottom:'1px solid rgba(26,29,46,.5)',background:isUsed?'rgba(34,211,238,.02)':'transparent'}}>
                        <td style={{padding:'12px 14px'}}>
                          <span style={{fontFamily:'Space Mono,monospace',fontSize:12,fontWeight:700,color:'#e8eaf2',letterSpacing:'2px'}}>{k}</span>
                        </td>
                        <td style={{padding:'12px 14px'}}>
                          <span style={{fontSize:10,padding:'3px 8px',borderRadius:99,
                            background:`${plan?.color||'var(--cyan)'}18`,color:plan?.color||'var(--cyan)',
                            fontWeight:700,border:`1px solid ${plan?.color||'var(--cyan)'}33`}}>
                            {plan?.name||v.planId}
                          </span>
                        </td>
                        <td style={{padding:'12px 14px',fontSize:11,color:'var(--t2)',maxWidth:130}}>
                          <span style={{display:'block',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                            {v.label||'—'}
                          </span>
                        </td>
                        <td style={{padding:'12px 14px',fontSize:11,color:'var(--t2)',whiteSpace:'nowrap'}}>{fmtDate(v.createdAt)}</td>
                        <td style={{padding:'12px 14px'}}>
                          {isUsed
                            ? <span style={{fontSize:10,padding:'3px 8px',borderRadius:99,background:'rgba(34,211,238,.1)',color:'var(--cyan)',fontWeight:700,border:'1px solid rgba(34,211,238,.2)'}}>✓ Used</span>
                            : <span style={{fontSize:10,padding:'3px 8px',borderRadius:99,background:'rgba(245,158,11,.08)',color:'#f59e0b',fontWeight:700,border:'1px solid rgba(245,158,11,.18)'}}>⏳ Unused</span>
                          }
                        </td>
                        <td style={{padding:'12px 14px'}}>
                          <div style={{display:'flex',gap:4}}>
                            <button onClick={()=>copy(k,k)}
                              style={{padding:'4px 9px',borderRadius:7,border:'1px solid #242740',background:copied===k?'rgba(34,211,238,.1)':'transparent',color:copied===k?'var(--cyan)':'var(--t2)',fontSize:10,fontWeight:700,cursor:'pointer'}}>
                              {copied===k?'✓':'📋'}
                            </button>
                            {!isUsed&&(
                              <button onClick={()=>window.open(`https://wa.me/?text=${waMsgWithKey(k,v.label)}`,'_blank')}
                                style={{padding:'4px 9px',borderRadius:7,background:'rgba(37,211,102,.1)',border:'1px solid rgba(37,211,102,.18)',color:'#25d366',fontSize:10,fontWeight:700,cursor:'pointer'}}>
                                💬
                              </button>
                            )}
                            <button onClick={()=>del(k)}
                              style={{padding:'4px 9px',borderRadius:7,border:'1px solid rgba(239,68,68,.18)',background:'rgba(239,68,68,.06)',color:'#ef4444',fontSize:10,fontWeight:700,cursor:'pointer'}}>
                              🗑
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Workflow */}
        <div style={{padding:'14px 18px',borderRadius:12,background:'rgba(34,211,238,.05)',border:'1px solid rgba(34,211,238,.15)'}}>
          <div style={{fontSize:12,fontWeight:700,color:'var(--cyan)',marginBottom:6}}>📋 Your daily workflow:</div>
          <div style={{fontSize:12,color:'var(--t2)',lineHeight:1.9}}>
            1. Buyer messages WhatsApp → you share UPI QR → they pay<br/>
            2. They send payment screenshot<br/>
            3. Open Admin Panel → Generate Key (add their name) → Firebase saves it<br/>
            4. Click 💬 → pre-typed WhatsApp message with key opens → Send<br/>
            5. They enter key in app → Firebase activates their Pro → unlocked on ALL devices ✅
          </div>
        </div>

      </div>
    </div>
  )
}
