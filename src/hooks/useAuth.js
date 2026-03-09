// ── FIREBASE AUTH HOOK ────────────────────────────────────────────────────────
import { useState, useEffect } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../firebase.js'

// OTP simulation (Firebase sends real email in production via sendEmailVerification)
const OTP_KEY = 'ai_rm_otp_local'
function makeOTP()             { return String(Math.floor(100000+Math.random()*900000)) }
function saveOTP(email,otp)    { const o=JSON.parse(localStorage.getItem(OTP_KEY)||'{}'); o[email]={code:otp,exp:Date.now()+300000}; localStorage.setItem(OTP_KEY,JSON.stringify(o)) }
function checkOTP(email,code)  { const o=JSON.parse(localStorage.getItem(OTP_KEY)||'{}'); const r=o[email]; if(!r||Date.now()>r.exp) return false; if(r.code!==code) return false; delete o[email]; localStorage.setItem(OTP_KEY,JSON.stringify(o)); return true }

export function useAuth() {
  const [user,    setUser]    = useState(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fu) => {
      if (fu) {
        try {
          const snap = await getDoc(doc(db, 'users', fu.uid))
          const data = snap.exists() ? snap.data() : {}
          setUser({ uid:fu.uid, email:fu.email, name:data.name||fu.displayName||fu.email.split('@')[0], avatar:(data.name||fu.email)[0].toUpperCase(), plan:data.plan||'free' })
        } catch {
          setUser({ uid:fu.uid, email:fu.email, name:fu.displayName||fu.email.split('@')[0], avatar:fu.email[0].toUpperCase(), plan:'free' })
        }
      } else { setUser(null) }
      setLoading(false)
    })
    return unsub
  }, [])

  const register = async (name, email, password) => {
    try {
      const otp = makeOTP(); saveOTP(email, otp)
      localStorage.setItem('ai_rm_pending_reg', JSON.stringify({ name, email, password }))
      return { ok:true, otp }
    } catch(e) { return { ok:false, error:e.message } }
  }

  const verifyRegister = async (email, code) => {
    if (!checkOTP(email, code)) return { ok:false, error:'Invalid or expired OTP.' }
    const p = JSON.parse(localStorage.getItem('ai_rm_pending_reg')||'null')
    if (!p||p.email!==email) return { ok:false, error:'Session expired. Try again.' }
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, p.password)
      await updateProfile(cred.user, { displayName:p.name })
      await setDoc(doc(db,'users',cred.user.uid), { name:p.name, email, plan:'free', createdAt:serverTimestamp(), uid:cred.user.uid })
      localStorage.removeItem('ai_rm_pending_reg')
      return { ok:true }
    } catch(e) {
      if (e.code==='auth/email-already-in-use') return { ok:false, error:'Email already registered. Please login.' }
      return { ok:false, error:e.message }
    }
  }

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      await signOut(auth)
      const otp = makeOTP(); saveOTP(email, otp)
      localStorage.setItem('ai_rm_pending_login', JSON.stringify({ email, password }))
      return { ok:true, otp, requireOTP:true }
    } catch(e) {
      if (e.code==='auth/user-not-found'||e.code==='auth/invalid-credential'||e.code==='auth/invalid-email') return { ok:false, error:'No account found with this email.' }
      if (e.code==='auth/wrong-password') return { ok:false, error:'Incorrect password.' }
      return { ok:false, error:'Login failed. Please try again.' }
    }
  }

  const verifyLogin = async (email, code) => {
    if (!checkOTP(email, code)) return { ok:false, error:'Invalid or expired OTP.' }
    const p = JSON.parse(localStorage.getItem('ai_rm_pending_login')||'null')
    if (!p||p.email!==email) return { ok:false, error:'Session expired. Please login again.' }
    try {
      await signInWithEmailAndPassword(auth, email, p.password)
      localStorage.removeItem('ai_rm_pending_login')
      return { ok:true }
    } catch(e) { return { ok:false, error:e.message } }
  }

  const forgotPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email)
      const otp = makeOTP(); saveOTP(email, otp)
      return { ok:true, otp }
    } catch(e) {
      if (e.code==='auth/user-not-found') return { ok:false, error:'No account found with this email.' }
      return { ok:false, error:e.message }
    }
  }

  const resetPassword = async (email, code) => {
    if (!checkOTP(email, code)) return { ok:false, error:'Invalid or expired OTP.' }
    return { ok:true }
  }

  const logout = async () => { await signOut(auth); setUser(null) }

  return { user, loading, register, verifyRegister, login, verifyLogin, forgotPassword, resetPassword, logout }
}
