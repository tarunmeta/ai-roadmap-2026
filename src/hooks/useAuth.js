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

export function useAuth() {
  const [user,    setUser]   = useState(undefined)
  const [loading, setLoading]= useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fu) => {
      if (fu) {
        try {
          const snap = await getDoc(doc(db, 'users', fu.uid))
          const data = snap.exists() ? snap.data() : {}
          setUser({
            uid:    fu.uid,
            email:  fu.email,
            name:   data.name || fu.displayName || fu.email.split('@')[0],
            avatar: (data.name || fu.email)[0].toUpperCase(),
            plan:   data.plan || 'free'
          })
        } catch {
          setUser({
            uid:    fu.uid,
            email:  fu.email,
            name:   fu.displayName || fu.email.split('@')[0],
            avatar: fu.email[0].toUpperCase(),
            plan:   'free'
          })
        }
      } else {
        setUser(null)
      }
      setLoading(false)
    })
    return unsub
  }, [])

  // REGISTER — directly creates account, no OTP
  const register = async (name, email, password) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(cred.user, { displayName: name })
      await setDoc(doc(db, 'users', cred.user.uid), {
        name, email, plan: 'free',
        createdAt: serverTimestamp(),
        uid: cred.user.uid
      })
      return { ok: true }
    } catch (e) {
      if (e.code === 'auth/email-already-in-use') return { ok:false, error:'Email already registered. Please login.' }
      if (e.code === 'auth/weak-password')        return { ok:false, error:'Password must be at least 6 characters.' }
      if (e.code === 'auth/invalid-email')        return { ok:false, error:'Enter a valid email address.' }
      return { ok:false, error: e.message }
    }
  }

  // LOGIN — directly signs in, no OTP
  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      return { ok: true }
    } catch (e) {
      console.log('Login error code:', e.code, e.message)
      if (e.code === 'auth/user-not-found')    return { ok:false, error:'No account found. Please register first.' }
      if (e.code === 'auth/wrong-password')    return { ok:false, error:'Incorrect password. Try again.' }
      if (e.code === 'auth/invalid-credential')return { ok:false, error:'Wrong email or password. Please check and retry.' }
      if (e.code === 'auth/invalid-email')     return { ok:false, error:'Enter a valid email address.' }
      if (e.code === 'auth/too-many-requests') return { ok:false, error:'Too many attempts. Wait a few minutes.' }
      if (e.code === 'auth/network-request-failed') return { ok:false, error:'No internet connection.' }
      return { ok:false, error:`Login failed: ${e.message}` }
    }
  }

  // FORGOT PASSWORD — sends reset email
  const forgotPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email)
      return { ok: true }
    } catch (e) {
      if (e.code === 'auth/user-not-found') return { ok:false, error:'No account found with this email.' }
      if (e.code === 'auth/invalid-email')  return { ok:false, error:'Enter a valid email address.' }
      return { ok:false, error: e.message }
    }
  }

  const logout = async () => {
    await signOut(auth)
    setUser(null)
  }

  return { user, loading, register, login, forgotPassword, logout }
}
