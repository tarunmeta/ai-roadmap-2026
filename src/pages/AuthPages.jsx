import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth.js'

// ── shared mini components ────────────────────────────────────────────────────
function Logo() {
  return (
    <div style={{textAlign:'center', marginBottom:32}}>
      <div style={{
        width:56, height:56, borderRadius:16, margin:'0 auto 14px',
        background:'linear-gradient(135deg,#6366f1,#a855f7)',
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:26, boxShadow:'0 8px 32px rgba(99,102,241,.4)'
      }}>🤖</div>
      <div style={{fontWeight:800, fontSize:22, letterSpacing:'-.03em', color:'#e8eaf2'}}>AI Roadmap 2026</div>
      <div style={{fontSize:12, color:'#454869', marginTop:3, letterSpacing:'1.5px', textTransform:'uppercase'}}>
        Your path to AI Engineer
      </div>
    </div>
  )
}

function OTPInput({ value, onChange, length = 6 }) {
  const refs = Array.from({length}, () => useRef(null))
  const vals = value.split('').concat(Array(length).fill('')).slice(0, length)

  const handle = (i, e) => {
    const v = e.target.value.replace(/\D/g,'').slice(-1)
    const arr = [...vals]
    arr[i] = v
    onChange(arr.join(''))
    if (v && i < length-1) refs[i+1]?.current?.focus()
  }
  const handleKey = (i, e) => {
    if (e.key==='Backspace' && !vals[i] && i>0) refs[i-1]?.current?.focus()
    if (e.key==='ArrowLeft' && i>0) refs[i-1]?.current?.focus()
    if (e.key==='ArrowRight' && i<length-1) refs[i+1]?.current?.focus()
  }
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text').replace(/\D/g,'').slice(0,length)
    onChange(paste.padEnd(length,'').slice(0,length))
    refs[Math.min(paste.length, length-1)]?.current?.focus()
    e.preventDefault()
  }

  return (
    <div className="otp-row">
      {Array.from({length}, (_,i) => (
        <input key={i} ref={refs[i]} type="text" inputMode="numeric" maxLength={1}
          value={vals[i] || ''} onChange={e=>handle(i,e)} onKeyDown={e=>handleKey(i,e)}
          onPaste={handlePaste}
          className={`otp-box ${vals[i]?'filled':''}`}
        />
      ))}
    </div>
  )
}

function DemoOTPBanner({ otp, label='Your OTP' }) {
  const [copied, setCopied] = useState(false)
  if (!otp) return null
  return (
    <div style={{
      padding:'12px 16px', borderRadius:10, marginTop:14,
      background:'linear-gradient(135deg,rgba(99,102,241,.1),rgba(168,85,247,.08))',
      border:'1px solid rgba(99,102,241,.25)', textAlign:'center'
    }}>
      <div style={{fontSize:11, color:'#818cf8', fontWeight:600, marginBottom:6, textTransform:'uppercase', letterSpacing:'1px'}}>
        📧 Demo Mode — {label}
      </div>
      <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap:12}}>
        <span style={{fontSize:28, fontWeight:800, letterSpacing:'6px', color:'#e8eaf2', fontFamily:'Space Mono, monospace'}}>{otp}</span>
        <button onClick={()=>{navigator.clipboard.writeText(otp);setCopied(true);setTimeout(()=>setCopied(false),2000)}}
          style={{padding:'5px 12px', borderRadius:8, background:copied?'rgba(16,185,129,.15)':'rgba(255,255,255,.07)',
            border:'1px solid rgba(255,255,255,.12)', color:copied?'#10b981':'#8b90b0', fontSize:11, fontWeight:600, cursor:'pointer'}}>
          {copied?'✓ Copied':'Copy'}
        </button>
      </div>
      <div style={{fontSize:10, color:'#454869', marginTop:6}}>
        In production this would be sent via email/SMS. Check browser console for OTP.
      </div>
    </div>
  )
}

function AuthShell({ children }) {
  return (
    <div className="auth-bg">
      {/* animated orbs */}
      <div className="auth-orb" style={{width:400,height:400,top:'-10%',left:'-5%',background:'rgba(99,102,241,.12)'}}/>
      <div className="auth-orb" style={{width:300,height:300,bottom:'5%',right:'-5%',background:'rgba(168,85,247,.08)',animationDelay:'-3s'}}/>
      <div className="auth-orb" style={{width:200,height:200,top:'40%',right:'20%',background:'rgba(6,182,212,.06)',animationDelay:'-6s'}}/>
      <div className="auth-card fade-up">{children}</div>
    </div>
  )
}

// ── REGISTER ──────────────────────────────────────────────────────────────────
function RegisterPage({ goLogin }) {
  const { register, verifyRegister } = useAuth()
  const [step, setStep]   = useState('form') // form | otp | done
  const [form, setForm]   = useState({ name:'', email:'', password:'', confirm:'' })
  const [otp,  setOtp]    = useState('')
  const [demoOtp, setDemoOtp] = useState('')
  const [otpVal, setOtpVal] = useState('')
  const [err,  setErr]    = useState('')
  const [loading, setLoading] = useState(false)

  const update = k => e => setForm(p=>({...p,[k]:e.target.value}))

  const submit = () => {
    setErr('')
    if (!form.name.trim())    return setErr('Name is required.')
    if (!form.email.includes('@')) return setErr('Enter a valid email.')
    if (form.password.length < 6)  return setErr('Password must be at least 6 characters.')
    if (form.password !== form.confirm) return setErr('Passwords do not match.')
    setLoading(true)
    setTimeout(() => {
      const res = register(form.name.trim(), form.email.toLowerCase().trim(), form.password)
      setLoading(false)
      if (!res.ok) return setErr(res.error)
      setDemoOtp(res.otp) // show for demo
      setStep('otp')
    }, 600)
  }

  const verify = () => {
    setErr('')
    if (otpVal.length < 6) return setErr('Enter the 6-digit code.')
    setLoading(true)
    setTimeout(() => {
      const res = verifyRegister(form.email.toLowerCase().trim(), otpVal)
      setLoading(false)
      if (!res.ok) return setErr(res.error)
      window.location.reload()
    }, 500)
  }

  return (
    <AuthShell>
      <Logo/>
      <div className="glass" style={{padding:32}}>
        {step==='form' && <>
          <h2 style={{fontSize:20,fontWeight:800,marginBottom:6}}>Create your account</h2>
          <p style={{color:'#8b90b0',fontSize:13,marginBottom:24}}>Join thousands learning AI Engineering</p>

          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            <div className="input-wrap">
              <label className="input-label">Full Name</label>
              <div className="input-icon">
                <span className="icon">👤</span>
                <input className="input" placeholder="Rahul Sharma" value={form.name} onChange={update('name')} onKeyDown={e=>e.key==='Enter'&&submit()}/>
              </div>
            </div>
            <div className="input-wrap">
              <label className="input-label">Email</label>
              <div className="input-icon">
                <span className="icon">✉️</span>
                <input className="input" type="email" placeholder="you@example.com" value={form.email} onChange={update('email')} onKeyDown={e=>e.key==='Enter'&&submit()}/>
              </div>
            </div>
            <div className="input-wrap">
              <label className="input-label">Password</label>
              <div className="input-icon">
                <span className="icon">🔑</span>
                <input className="input" type="password" placeholder="Min 6 characters" value={form.password} onChange={update('password')} onKeyDown={e=>e.key==='Enter'&&submit()}/>
              </div>
            </div>
            <div className="input-wrap">
              <label className="input-label">Confirm Password</label>
              <div className="input-icon">
                <span className="icon">🔒</span>
                <input className="input" type="password" placeholder="Repeat password" value={form.confirm} onChange={update('confirm')} onKeyDown={e=>e.key==='Enter'&&submit()}/>
              </div>
            </div>
          </div>

          {err && <div style={{marginTop:14,padding:'10px 14px',borderRadius:8,background:'rgba(239,68,68,.1)',border:'1px solid rgba(239,68,68,.25)',color:'#f87171',fontSize:12}}>{err}</div>}

          <button className="btn btn-primary btn-full btn-lg" style={{marginTop:22}} onClick={submit} disabled={loading}>
            {loading ? '⏳ Creating account...' : '🚀 Create Account'}
          </button>

          <p style={{textAlign:'center',marginTop:18,fontSize:13,color:'#8b90b0'}}>
            Already have an account?{' '}
            <button onClick={goLogin} style={{background:'none',border:'none',color:'#818cf8',fontWeight:700,cursor:'pointer',fontSize:13}}>Sign in</button>
          </p>
        </>}

        {step==='otp' && <>
          <div style={{textAlign:'center',marginBottom:24}}>
            <div style={{fontSize:40,marginBottom:10}}>📧</div>
            <h2 style={{fontSize:20,fontWeight:800,marginBottom:6}}>Verify your email</h2>
            <p style={{color:'#8b90b0',fontSize:13}}>
              Enter the 6-digit code sent to<br/>
              <strong style={{color:'#e8eaf2'}}>{form.email}</strong>
            </p>
          </div>

          <OTPInput value={otpVal} onChange={setOtpVal} length={6}/>
          <DemoOTPBanner otp={demoOtp} label="Registration OTP"/>

          {err && <div style={{marginTop:14,padding:'10px 14px',borderRadius:8,background:'rgba(239,68,68,.1)',border:'1px solid rgba(239,68,68,.25)',color:'#f87171',fontSize:12,textAlign:'center'}}>{err}</div>}

          <button className="btn btn-primary btn-full btn-lg" style={{marginTop:22}} onClick={verify} disabled={loading||otpVal.length<6}>
            {loading ? '⏳ Verifying...' : '✅ Verify & Continue'}
          </button>
          <button className="btn btn-ghost btn-full btn-sm" style={{marginTop:8}} onClick={()=>{setStep('form');setErr('');setOtpVal('')}}>← Back</button>
        </>}
      </div>
    </AuthShell>
  )
}

// ── LOGIN ─────────────────────────────────────────────────────────────────────
function LoginPage({ goRegister, goForgot }) {
  const { login, verifyLogin } = useAuth()
  const [step, setStep]    = useState('form')
  const [email, setEmail]  = useState('')
  const [pass,  setPass]   = useState('')
  const [otpVal, setOtpVal]= useState('')
  const [demoOtp,setDemoOtp] = useState('')
  const [err,  setErr]     = useState('')
  const [loading,setLoading]= useState(false)

  const submit = () => {
    setErr('')
    if (!email.includes('@')) return setErr('Enter a valid email.')
    if (!pass)               return setErr('Enter your password.')
    setLoading(true)
    setTimeout(() => {
      const res = login(email.toLowerCase().trim(), pass)
      setLoading(false)
      if (!res.ok) return setErr(res.error)
      setDemoOtp(res.otp)
      setStep('otp')
    }, 600)
  }

  const verify = () => {
    setErr('')
    if (otpVal.length<6) return setErr('Enter the 6-digit code.')
    setLoading(true)
    setTimeout(() => {
      const res = verifyLogin(email.toLowerCase().trim(), otpVal)
      setLoading(false)
      if (!res.ok) return setErr(res.error)
      window.location.reload()
    }, 500)
  }

  return (
    <AuthShell>
      <Logo/>
      <div className="glass" style={{padding:32}}>
        {step==='form' && <>
          <h2 style={{fontSize:20,fontWeight:800,marginBottom:6}}>Welcome back</h2>
          <p style={{color:'#8b90b0',fontSize:13,marginBottom:24}}>Sign in to continue your AI journey</p>

          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            <div className="input-wrap">
              <label className="input-label">Email</label>
              <div className="input-icon">
                <span className="icon">✉️</span>
                <input className="input" type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==='Enter'&&submit()}/>
              </div>
            </div>
            <div className="input-wrap">
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <label className="input-label">Password</label>
                <button onClick={goForgot} style={{background:'none',border:'none',color:'#818cf8',fontSize:12,fontWeight:600,cursor:'pointer'}}>Forgot password?</button>
              </div>
              <div className="input-icon">
                <span className="icon">🔑</span>
                <input className="input" type="password" placeholder="Your password" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==='Enter'&&submit()}/>
              </div>
            </div>
          </div>

          {err && <div style={{marginTop:14,padding:'10px 14px',borderRadius:8,background:'rgba(239,68,68,.1)',border:'1px solid rgba(239,68,68,.25)',color:'#f87171',fontSize:12}}>{err}</div>}

          <button className="btn btn-primary btn-full btn-lg" style={{marginTop:22}} onClick={submit} disabled={loading}>
            {loading ? '⏳ Signing in...' : '🔓 Sign In'}
          </button>
          <p style={{textAlign:'center',marginTop:18,fontSize:13,color:'#8b90b0'}}>
            No account?{' '}
            <button onClick={goRegister} style={{background:'none',border:'none',color:'#818cf8',fontWeight:700,cursor:'pointer',fontSize:13}}>Create one free</button>
          </p>
        </>}

        {step==='otp' && <>
          <div style={{textAlign:'center',marginBottom:24}}>
            <div style={{fontSize:40,marginBottom:10}}>🔐</div>
            <h2 style={{fontSize:20,fontWeight:800,marginBottom:6}}>Two-step verification</h2>
            <p style={{color:'#8b90b0',fontSize:13}}>
              Enter the code sent to<br/>
              <strong style={{color:'#e8eaf2'}}>{email}</strong>
            </p>
          </div>
          <OTPInput value={otpVal} onChange={setOtpVal} length={6}/>
          <DemoOTPBanner otp={demoOtp} label="Login OTP"/>
          {err && <div style={{marginTop:14,padding:'10px 14px',borderRadius:8,background:'rgba(239,68,68,.1)',border:'1px solid rgba(239,68,68,.25)',color:'#f87171',fontSize:12,textAlign:'center'}}>{err}</div>}
          <button className="btn btn-primary btn-full btn-lg" style={{marginTop:22}} onClick={verify} disabled={loading||otpVal.length<6}>
            {loading?'⏳ Verifying...':'✅ Verify & Sign In'}
          </button>
          <button className="btn btn-ghost btn-full btn-sm" style={{marginTop:8}} onClick={()=>{setStep('form');setErr('');setOtpVal('')}}>← Back</button>
        </>}
      </div>
    </AuthShell>
  )
}

// ── FORGOT PASSWORD ───────────────────────────────────────────────────────────
function ForgotPage({ goLogin }) {
  const { forgotPassword, resetPassword } = useAuth()
  const [step,    setStep]   = useState('email') // email | otp | newpass | done
  const [email,   setEmail]  = useState('')
  const [otpVal,  setOtpVal] = useState('')
  const [demoOtp, setDemoOtp]= useState('')
  const [pass,    setPass]   = useState('')
  const [pass2,   setPass2]  = useState('')
  const [err,     setErr]    = useState('')
  const [loading, setLoading]= useState(false)

  const sendOtp = () => {
    setErr('')
    if (!email.includes('@')) return setErr('Enter a valid email.')
    setLoading(true)
    setTimeout(() => {
      const res = forgotPassword(email.toLowerCase().trim())
      setLoading(false)
      if (!res.ok) return setErr(res.error)
      setDemoOtp(res.otp)
      setStep('otp')
    }, 600)
  }

  const verifyOtp = () => {
    setErr('')
    if (otpVal.length<6) return setErr('Enter the 6-digit code.')
    setStep('newpass')
  }

  const reset = () => {
    setErr('')
    if (pass.length<6)     return setErr('Password must be at least 6 characters.')
    if (pass!==pass2)       return setErr('Passwords do not match.')
    setLoading(true)
    setTimeout(() => {
      const res = resetPassword(email.toLowerCase().trim(), otpVal, pass)
      setLoading(false)
      if (!res.ok) return setErr(res.error)
      setStep('done')
    }, 500)
  }

  return (
    <AuthShell>
      <Logo/>
      <div className="glass" style={{padding:32}}>
        {step==='email' && <>
          <div style={{textAlign:'center',marginBottom:24}}>
            <div style={{fontSize:40,marginBottom:10}}>🔑</div>
            <h2 style={{fontSize:20,fontWeight:800,marginBottom:6}}>Reset password</h2>
            <p style={{color:'#8b90b0',fontSize:13}}>Enter your email to receive a reset code</p>
          </div>
          <div className="input-wrap">
            <label className="input-label">Email</label>
            <div className="input-icon">
              <span className="icon">✉️</span>
              <input className="input" type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendOtp()}/>
            </div>
          </div>
          {err && <div style={{marginTop:12,padding:'10px 14px',borderRadius:8,background:'rgba(239,68,68,.1)',border:'1px solid rgba(239,68,68,.25)',color:'#f87171',fontSize:12}}>{err}</div>}
          <button className="btn btn-primary btn-full btn-lg" style={{marginTop:20}} onClick={sendOtp} disabled={loading}>
            {loading?'⏳ Sending...':'📧 Send Reset Code'}
          </button>
          <button className="btn btn-ghost btn-full btn-sm" style={{marginTop:8}} onClick={goLogin}>← Back to login</button>
        </>}

        {step==='otp' && <>
          <div style={{textAlign:'center',marginBottom:24}}>
            <div style={{fontSize:40,marginBottom:10}}>📧</div>
            <h2 style={{fontSize:20,fontWeight:800,marginBottom:6}}>Enter reset code</h2>
            <p style={{color:'#8b90b0',fontSize:13}}>Code sent to <strong style={{color:'#e8eaf2'}}>{email}</strong></p>
          </div>
          <OTPInput value={otpVal} onChange={setOtpVal} length={6}/>
          <DemoOTPBanner otp={demoOtp} label="Password Reset OTP"/>
          {err && <div style={{marginTop:12,padding:'10px 14px',borderRadius:8,background:'rgba(239,68,68,.1)',border:'1px solid rgba(239,68,68,.25)',color:'#f87171',fontSize:12,textAlign:'center'}}>{err}</div>}
          <button className="btn btn-primary btn-full btn-lg" style={{marginTop:20}} onClick={verifyOtp} disabled={otpVal.length<6}>✅ Verify Code</button>
          <button className="btn btn-ghost btn-full btn-sm" style={{marginTop:8}} onClick={()=>setStep('email')}>← Back</button>
        </>}

        {step==='newpass' && <>
          <div style={{textAlign:'center',marginBottom:24}}>
            <div style={{fontSize:40,marginBottom:10}}>🔒</div>
            <h2 style={{fontSize:20,fontWeight:800,marginBottom:6}}>New password</h2>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            <div className="input-wrap">
              <label className="input-label">New Password</label>
              <div className="input-icon">
                <span className="icon">🔑</span>
                <input className="input" type="password" placeholder="Min 6 characters" value={pass} onChange={e=>setPass(e.target.value)}/>
              </div>
            </div>
            <div className="input-wrap">
              <label className="input-label">Confirm New Password</label>
              <div className="input-icon">
                <span className="icon">🔒</span>
                <input className="input" type="password" placeholder="Repeat" value={pass2} onChange={e=>setPass2(e.target.value)} onKeyDown={e=>e.key==='Enter'&&reset()}/>
              </div>
            </div>
          </div>
          {err && <div style={{marginTop:12,padding:'10px 14px',borderRadius:8,background:'rgba(239,68,68,.1)',border:'1px solid rgba(239,68,68,.25)',color:'#f87171',fontSize:12}}>{err}</div>}
          <button className="btn btn-primary btn-full btn-lg" style={{marginTop:20}} onClick={reset} disabled={loading}>
            {loading?'⏳ Saving...':'💾 Set New Password'}
          </button>
        </>}

        {step==='done' && <>
          <div style={{textAlign:'center',padding:'20px 0'}}>
            <div style={{fontSize:56,marginBottom:14}}>🎉</div>
            <h2 style={{fontSize:20,fontWeight:800,marginBottom:8}}>Password reset!</h2>
            <p style={{color:'#8b90b0',fontSize:13,marginBottom:24}}>Your password has been updated successfully.</p>
            <button className="btn btn-primary btn-full" onClick={goLogin}>Sign in with new password →</button>
          </div>
        </>}
      </div>
    </AuthShell>
  )
}

// ── MAIN AUTH ROUTER ──────────────────────────────────────────────────────────
export default function AuthRouter() {
  const [page, setPage] = useState('login')
  if (page==='login')    return <LoginPage    goRegister={()=>setPage('register')} goForgot={()=>setPage('forgot')}/>
  if (page==='register') return <RegisterPage goLogin={()=>setPage('login')}/>
  if (page==='forgot')   return <ForgotPage   goLogin={()=>setPage('login')}/>
  return null
}
