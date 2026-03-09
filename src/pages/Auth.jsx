import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login, register, sendOTP, verifyOTP, resetPassword, getSession } from '../hooks/auth.js'

// ── shared layout pieces ──────────────────────────────────────────────────────
function AuthShell({ children }) {
  return (
    <div style={{
      minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center',
      padding:'24px 16px', position:'relative', overflow:'hidden',
      background:'radial-gradient(ellipse 900px 700px at 15% 0%, rgba(0,229,255,.06) 0%, transparent 60%), radial-gradient(ellipse 700px 700px at 85% 100%, rgba(157,123,255,.06) 0%, transparent 60%), #06070f'
    }}>
      {/* bg orbs */}
      {[['-8%','-8%',480,'#00e5ff',.035],[null,'-8%','85%',480,'#9d7bff',.035],['40%',null,'92%',240,'#ff5fa0',.03]].map((o,i)=>
        Array.isArray(o) ? null :
        <div key={i}/>
      )}
      {[
        {top:'-8%',  left:'-8%',  size:480, color:'#00e5ff', op:.035},
        {bottom:'-8%',right:'-8%',size:520, color:'#9d7bff', op:.04},
        {top:'45%',  right:'8%',  size:220, color:'#ff5fa0', op:.03},
      ].map((o,i)=>(
        <div key={i} style={{
          position:'absolute', width:o.size, height:o.size, borderRadius:'50%', pointerEvents:'none',
          background:`radial-gradient(circle, ${o.color} 0%, transparent 70%)`,
          opacity:o.op, top:o.top, bottom:o.bottom, left:o.left, right:o.right,
          animation:`float ${5+i*1.5}s ease-in-out infinite`,
        }}/>
      ))}
      {/* grid lines */}
      <div style={{
        position:'absolute', inset:0, pointerEvents:'none', opacity:.03,
        backgroundImage:'linear-gradient(rgba(0,229,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,.6) 1px, transparent 1px)',
        backgroundSize:'60px 60px',
      }}/>
      <div style={{ width:'100%', maxWidth:420, position:'relative', zIndex:1 }}>
        {children}
      </div>
    </div>
  )
}

function Card({ children }) {
  return (
    <div className="fade-up" style={{
      background:'rgba(14,15,28,.85)', backdropFilter:'blur(24px)',
      border:'1px solid rgba(0,229,255,.12)', borderRadius:24,
      padding:'40px 36px',
      boxShadow:'0 0 80px rgba(0,229,255,.05), 0 40px 100px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.04)'
    }}>
      {children}
    </div>
  )
}

function Logo() {
  return (
    <div style={{display:'flex',alignItems:'center',gap:12,justifyContent:'center',marginBottom:32}}>
      <div style={{
        width:46, height:46, borderRadius:14, fontSize:22,
        display:'flex', alignItems:'center', justifyContent:'center',
        background:'linear-gradient(135deg,rgba(0,229,255,.15),rgba(157,123,255,.15))',
        border:'1px solid rgba(0,229,255,.25)',
        boxShadow:'0 0 20px rgba(0,229,255,.1)'
      }}>🤖</div>
      <div>
        <div style={{fontFamily:'Outfit,sans-serif',fontWeight:800,fontSize:17,color:'#e4e6ff',letterSpacing:'-.3px'}}>AI Roadmap</div>
        <div style={{fontSize:9,color:'#3d4070',letterSpacing:'2.5px',textTransform:'uppercase',marginTop:1}}>2026 · ENGINEER PATH</div>
      </div>
    </div>
  )
}

function Field({ label, type='text', value, onChange, placeholder, autoFocus, error }) {
  const [show, setShow] = useState(false)
  const isPass = type === 'password'
  return (
    <div style={{marginBottom:16}}>
      {label && <label style={{display:'block',fontSize:11,fontWeight:600,color:'#7b7fa8',marginBottom:7,letterSpacing:'.8px',textTransform:'uppercase'}}>{label}</label>}
      <div style={{position:'relative'}}>
        <input
          type={isPass?(show?'text':'password'):type}
          value={value}
          onChange={e=>onChange(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="input-field"
          style={{borderColor:error?'rgba(255,82,82,.5)':undefined}}
        />
        {isPass&&(
          <button type="button" onClick={()=>setShow(s=>!s)}
            style={{position:'absolute',right:13,top:'50%',transform:'translateY(-50%)',
              background:'none',border:'none',color:'#3d4070',cursor:'pointer',fontSize:15,lineHeight:1}}>
            {show?'🙈':'👁'}
          </button>
        )}
      </div>
      {error&&<p style={{fontSize:11,color:'var(--red)',marginTop:5}}>{error}</p>}
    </div>
  )
}

function Alert({ type, children }) {
  const styles = {
    error:   { bg:'rgba(255,82,82,.08)',  border:'rgba(255,82,82,.25)',  color:'#ff7070' },
    success: { bg:'rgba(0,229,160,.08)',  border:'rgba(0,229,160,.25)',  color:'#00e5a0' },
    info:    { bg:'rgba(0,229,255,.08)',  border:'rgba(0,229,255,.25)',  color:'#00e5ff' },
  }[type] || styles.info
  return (
    <div style={{background:styles.bg, border:`1px solid ${styles.border}`, borderRadius:10,
      padding:'10px 14px', fontSize:12.5, color:styles.color, marginBottom:16, lineHeight:1.5}}>
      {children}
    </div>
  )
}

function Divider({ text }) {
  return (
    <div style={{display:'flex',alignItems:'center',gap:12,margin:'22px 0'}}>
      <div style={{flex:1,height:1,background:'var(--line)'}}/>
      <span style={{fontSize:11,color:'var(--txt3)',fontWeight:600,letterSpacing:'.5px'}}>{text}</span>
      <div style={{flex:1,height:1,background:'var(--line)'}}/>
    </div>
  )
}

function OTPInput({ value, onChange }) {
  const refs = useRef([])
  const digits = (value+'      ').slice(0,6).split('')

  const handleChange = (i, val) => {
    if (!/^\d?$/.test(val)) return
    const arr = digits.map(d=>d===' '?'':d)
    arr[i] = val
    onChange(arr.join('').replace(/ /g,''))
    if (val && i < 5) refs.current[i+1]?.focus()
  }
  const handleKey = (i, e) => {
    if (e.key==='Backspace' && !digits[i]?.trim() && i>0) refs.current[i-1]?.focus()
  }

  return (
    <div style={{display:'flex',gap:10,justifyContent:'center',margin:'20px 0 28px'}}>
      {[0,1,2,3,4,5].map(i=>{
        const d = digits[i]?.trim()
        return (
          <input key={i} ref={el=>refs.current[i]=el}
            value={d||''}
            onChange={e=>handleChange(i,e.target.value)}
            onKeyDown={e=>handleKey(i,e)}
            maxLength={1} type="text" inputMode="numeric"
            style={{
              width:52, height:62, textAlign:'center', fontSize:26, fontWeight:800,
              fontFamily:'IBM Plex Mono,monospace', letterSpacing:0,
              background:d?'rgba(0,229,255,.07)':'var(--bg2)',
              border:`2px solid ${d?'var(--cyan)':'var(--line2)'}`,
              borderRadius:12, color:'var(--txt)', outline:'none',
              transition:'all .2s', boxShadow:d?'0 0 12px rgba(0,229,255,.2)':'none',
            }}
          />
        )
      })}
    </div>
  )
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
export function LoginPage({ onLogin }) {
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [pass,  setPass]  = useState('')
  const [err,   setErr]   = useState('')
  const [busy,  setBusy]  = useState(false)

  useEffect(() => { if (getSession()) nav('/',{replace:true}) }, [])

  const submit = e => {
    e?.preventDefault()
    if (!email||!pass) { setErr('Please fill in all fields'); return }
    setBusy(true)
    setTimeout(() => {
      const r = login(email.toLowerCase().trim(), pass)
      setBusy(false)
      if (!r.ok) { setErr(r.error); return }
      onLogin(r.user)
      nav('/',{replace:true})
    }, 500)
  }

  return (
    <AuthShell>
      <Card>
        <Logo/>
        <h1 style={{fontFamily:'Outfit,sans-serif',fontWeight:800,fontSize:26,textAlign:'center',marginBottom:6,
          background:'linear-gradient(135deg,#00e5ff,#9d7bff)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>
          Welcome back
        </h1>
        <p style={{textAlign:'center',color:'var(--txt2)',fontSize:13,marginBottom:28,lineHeight:1.6}}>
          Sign in to continue your AI engineering journey
        </p>

        {err && <Alert type="error">⚠ {err}</Alert>}

        <form onSubmit={submit}>
          <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" autoFocus/>
          <Field label="Password" type="password" value={pass} onChange={setPass} placeholder="Your password"/>
          <div style={{textAlign:'right',marginTop:-8,marginBottom:20}}>
            <Link to="/forgot-password" style={{fontSize:12,color:'var(--cyan)',fontWeight:600}}>Forgot password?</Link>
          </div>
          <button type="submit" className="btn-primary" disabled={busy}>
            {busy?'Signing in…':'Sign In →'}
          </button>
        </form>

        <Divider text="NEW HERE?"/>
        <Link to="/register"><button className="btn-ghost">Create free account</button></Link>

        <div style={{marginTop:20,padding:'10px 14px',background:'rgba(0,229,255,.04)',
          border:'1px solid rgba(0,229,255,.08)',borderRadius:10,fontSize:11,color:'var(--txt3)',textAlign:'center'}}>
          💡 Demo: Register first, then sign in — no email required
        </div>
      </Card>
    </AuthShell>
  )
}

// ─── REGISTER ─────────────────────────────────────────────────────────────────
export function RegisterPage() {
  const nav = useNavigate()
  const [step,    setStep]    = useState(1)
  const [name,    setName]    = useState('')
  const [email,   setEmail]   = useState('')
  const [pass,    setPass]    = useState('')
  const [confirm, setConfirm] = useState('')
  const [otp,     setOtp]     = useState('')
  const [demoOTP, setDemoOTP] = useState('')
  const [err,     setErr]     = useState('')
  const [msg,     setMsg]     = useState('')
  const [busy,    setBusy]    = useState(false)
  const [resend,  setResend]  = useState(0)

  useEffect(() => { if (getSession()) nav('/',{replace:true}) }, [])
  useEffect(() => {
    if (resend<=0) return
    const t = setTimeout(()=>setResend(r=>r-1),1000)
    return ()=>clearTimeout(t)
  }, [resend])

  const validate = () => {
    if (!name.trim())        return 'Please enter your name'
    if (!email.includes('@'))return 'Invalid email'
    if (pass.length<6)       return 'Password must be 6+ characters'
    if (pass!==confirm)      return 'Passwords do not match'
    return null
  }

  const step1 = () => {
    const e = validate(); if (e) { setErr(e); return }
    setBusy(true)
    setTimeout(()=>{
      const code = sendOTP(email.toLowerCase().trim())
      setDemoOTP(code); setStep(2); setErr(''); setBusy(false); setResend(60)
    },600)
  }

  const step2 = () => {
    if (otp.length<6) { setErr('Enter the full 6-digit code'); return }
    setBusy(true)
    setTimeout(()=>{
      if (!verifyOTP(email.toLowerCase().trim(), otp)) { setErr('Invalid or expired code'); setBusy(false); return }
      const r = register(name.trim(), email.toLowerCase().trim(), pass)
      setBusy(false)
      if (!r.ok) { setErr(r.error); return }
      nav('/login',{state:{msg:'Account created! Sign in.'},replace:true})
    },600)
  }

  const doResend = () => {
    const code = sendOTP(email.toLowerCase().trim())
    setDemoOTP(code); setResend(60); setMsg('New code sent!'); setTimeout(()=>setMsg(''),2500)
  }

  // Step indicator
  const steps = ['Details','Verify','Done']
  const StepBar = () => (
    <div style={{display:'flex',alignItems:'center',marginBottom:28}}>
      {steps.map((s,i)=>(
        <div key={i} style={{display:'flex',alignItems:'center',flex:i<steps.length-1?1:'initial'}}>
          <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
            <div style={{
              width:30,height:30,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',
              fontWeight:800,fontSize:12,fontFamily:'Outfit,sans-serif',
              background: step>i+1?'var(--cyan)':step===i+1?'linear-gradient(135deg,var(--cyan),var(--violet))':'var(--bg3)',
              color: step>=i+1?'var(--bg)':'var(--txt3)',
              border:`2px solid ${step>=i+1?'transparent':'var(--line2)'}`,
              boxShadow: step===i+1?'0 0 16px rgba(0,229,255,.4)':'none',
              transition:'all .3s',
            }}>
              {step>i+1?'✓':i+1}
            </div>
            <div style={{fontSize:9,marginTop:4,fontWeight:600,color:step===i+1?'var(--cyan)':'var(--txt3)',letterSpacing:'.5px'}}>{s}</div>
          </div>
          {i<steps.length-1&&(
            <div style={{flex:1,height:1,background:step>i+1?'var(--cyan)':'var(--line)',margin:'0 8px',marginBottom:14,transition:'background .3s'}}/>
          )}
        </div>
      ))}
    </div>
  )

  return (
    <AuthShell>
      <Card>
        <Logo/>
        <StepBar/>

        {step===1&&(
          <>
            <h1 style={{fontFamily:'Outfit,sans-serif',fontWeight:800,fontSize:24,textAlign:'center',marginBottom:6,
              background:'linear-gradient(135deg,#00e5ff,#9d7bff)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>
              Create account
            </h1>
            <p style={{textAlign:'center',color:'var(--txt2)',fontSize:13,marginBottom:24}}>Start your AI engineering journey</p>
            {err&&<Alert type="error">⚠ {err}</Alert>}
            <Field label="Full Name" value={name} onChange={setName} placeholder="Ada Lovelace" autoFocus/>
            <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com"/>
            <Field label="Password" type="password" value={pass} onChange={setPass} placeholder="Min. 6 characters"/>
            <Field label="Confirm Password" type="password" value={confirm} onChange={setConfirm} placeholder="Repeat password"/>
            <button className="btn-primary" onClick={step1} disabled={busy}>{busy?'Sending code…':'Send Verification Code →'}</button>
            <Divider text="HAVE AN ACCOUNT?"/>
            <Link to="/login"><button className="btn-ghost">Sign in</button></Link>
          </>
        )}

        {step===2&&(
          <>
            <h1 style={{fontFamily:'Outfit,sans-serif',fontWeight:800,fontSize:24,textAlign:'center',marginBottom:6,
              background:'linear-gradient(135deg,#00e5ff,#9d7bff)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>
              Verify email
            </h1>
            <p style={{textAlign:'center',color:'var(--txt2)',fontSize:13,marginBottom:4,lineHeight:1.6}}>
              6-digit code sent to<br/><span style={{color:'var(--cyan)',fontWeight:700}}>{email}</span>
            </p>

            {demoOTP&&(
              <Alert type="info">
                💡 <strong>Demo code:</strong>
                <span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:20,fontWeight:700,marginLeft:10,letterSpacing:'4px'}}>{demoOTP}</span>
              </Alert>
            )}
            {err&&<Alert type="error">⚠ {err}</Alert>}
            {msg&&<Alert type="success">✓ {msg}</Alert>}

            <OTPInput value={otp} onChange={setOtp}/>

            <button className="btn-primary" onClick={step2} disabled={busy}>{busy?'Verifying…':'Verify & Create Account ✓'}</button>
            <div style={{display:'flex',justifyContent:'space-between',marginTop:14}}>
              <button onClick={()=>{setStep(1);setErr('')}}
                style={{background:'none',border:'none',color:'var(--txt3)',fontSize:12,cursor:'pointer'}}>← Change email</button>
              <button onClick={doResend} disabled={resend>0}
                style={{background:'none',border:'none',fontSize:12,cursor:resend>0?'default':'pointer',
                  color:resend>0?'var(--txt3)':'var(--cyan)'}}>
                {resend>0?`Resend in ${resend}s`:'Resend code'}
              </button>
            </div>
          </>
        )}
      </Card>
    </AuthShell>
  )
}

// ─── FORGOT PASSWORD ──────────────────────────────────────────────────────────
export function ForgotPage() {
  const nav = useNavigate()
  const [step,    setStep]    = useState(1)
  const [email,   setEmail]   = useState('')
  const [otp,     setOtp]     = useState('')
  const [pass,    setPass]    = useState('')
  const [confirm, setConfirm] = useState('')
  const [demoOTP, setDemoOTP] = useState('')
  const [err,     setErr]     = useState('')
  const [busy,    setBusy]    = useState(false)

  const s1 = () => {
    if (!email.includes('@')) { setErr('Enter a valid email'); return }
    setBusy(true)
    setTimeout(()=>{ const c=sendOTP(email.toLowerCase().trim()); setDemoOTP(c); setStep(2); setErr(''); setBusy(false) },500)
  }
  const s2 = () => {
    if (otp.length<6) { setErr('Enter full 6-digit code'); return }
    setBusy(true)
    setTimeout(()=>{
      if (!verifyOTP(email.toLowerCase().trim(),otp)) { setErr('Invalid code'); setBusy(false); return }
      setStep(3); setErr(''); setBusy(false)
    },500)
  }
  const s3 = () => {
    if (pass.length<6) { setErr('Password must be 6+ chars'); return }
    if (pass!==confirm) { setErr('Passwords do not match'); return }
    setBusy(true)
    setTimeout(()=>{ resetPassword(email.toLowerCase().trim(),pass); nav('/login',{state:{msg:'Password reset!'},replace:true}) },400)
  }

  const stepsUI = [
    {num:1,label:'Email'},
    {num:2,label:'Verify'},
    {num:3,label:'Reset'},
  ]

  return (
    <AuthShell>
      <Card>
        <Logo/>

        {/* step dots */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:8,marginBottom:28}}>
          {stepsUI.map((s,i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',gap:8}}>
              <div style={{
                width:28,height:28,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',
                fontSize:11,fontWeight:800,
                background:step>s.num?'var(--cyan)':step===s.num?'linear-gradient(135deg,var(--cyan),var(--violet))':'var(--bg3)',
                color:step>=s.num?'var(--bg)':'var(--txt3)',
                border:`2px solid ${step>=s.num?'transparent':'var(--line2)'}`,
                transition:'all .3s', flexShrink:0,
              }}>{step>s.num?'✓':s.num}</div>
              {i<2&&<div style={{width:32,height:1,background:step>s.num?'var(--cyan)':'var(--line)',transition:'background .3s'}}/>}
            </div>
          ))}
        </div>

        {step===1&&(
          <>
            <h1 style={{fontFamily:'Outfit,sans-serif',fontWeight:800,fontSize:24,textAlign:'center',marginBottom:6,
              background:'linear-gradient(135deg,#00e5ff,#9d7bff)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>
              Reset password
            </h1>
            <p style={{textAlign:'center',color:'var(--txt2)',fontSize:13,marginBottom:24}}>We'll send a verification code</p>
            {err&&<Alert type="error">⚠ {err}</Alert>}
            <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" autoFocus/>
            <button className="btn-primary" onClick={s1} disabled={busy}>{busy?'Sending…':'Send Reset Code →'}</button>
          </>
        )}
        {step===2&&(
          <>
            <h1 style={{fontFamily:'Outfit,sans-serif',fontWeight:800,fontSize:24,textAlign:'center',marginBottom:6,
              background:'linear-gradient(135deg,#00e5ff,#9d7bff)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>
              Enter code
            </h1>
            {demoOTP&&<Alert type="info">💡 Demo code: <strong style={{fontFamily:'IBM Plex Mono,monospace',fontSize:18,letterSpacing:'3px'}}>{demoOTP}</strong></Alert>}
            {err&&<Alert type="error">⚠ {err}</Alert>}
            <OTPInput value={otp} onChange={setOtp}/>
            <button className="btn-primary" onClick={s2} disabled={busy}>{busy?'Verifying…':'Verify →'}</button>
          </>
        )}
        {step===3&&(
          <>
            <h1 style={{fontFamily:'Outfit,sans-serif',fontWeight:800,fontSize:24,textAlign:'center',marginBottom:6,
              background:'linear-gradient(135deg,#00e5ff,#9d7bff)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>
              New password
            </h1>
            {err&&<Alert type="error">⚠ {err}</Alert>}
            <Field label="New Password" type="password" value={pass} onChange={setPass} placeholder="Min 6 chars" autoFocus/>
            <Field label="Confirm" type="password" value={confirm} onChange={setConfirm} placeholder="Repeat"/>
            <button className="btn-primary" onClick={s3} disabled={busy}>{busy?'Saving…':'Reset Password ✓'}</button>
          </>
        )}
        <div style={{textAlign:'center',marginTop:20}}>
          <Link to="/login" style={{fontSize:12,color:'var(--txt3)'}}>← Back to sign in</Link>
        </div>
      </Card>
    </AuthShell>
  )
}
