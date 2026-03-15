import { useState, useEffect } from 'react'
import { doc, getDoc, setDoc, serverTimestamp, collection, getDocs, addDoc, deleteDoc, query, where } from 'firebase/firestore'
import { db } from '../firebase.js'

/* ═══════════════════════════════════════════════════════════
   Neural Protocol — Subscription + Trial Management
   
   Tiers:
   - free:         Phase 1 only, FOREVER free
   - trial:        All phases, 30 days only (demo/promo code)
   - pro_monthly:  All phases, ₹200/month
   - pro_lifetime: All phases, ₹999 one-time
═══════════════════════════════════════════════════════════ */

const TRIAL_DAYS = 30  // Free trial expires after 30 days

export function useSubscription(uid) {
  const [plan,    setPlan]    = useState(null)   // null = loading
  const [expired, setExpired] = useState(false)

  useEffect(() => {
    if (!uid || uid === 'guest') { setPlan({ id: 'free' }); return }

    const ref = doc(db, 'subscriptions', uid)

    getDoc(ref).then(snap => {
      if (!snap.exists()) {
        // Brand new user — create free plan, record join date
        const newPlan = {
          id: 'free',
          joinedAt: new Date().toISOString(),
          createdAt: serverTimestamp(),
        }
        setDoc(ref, newPlan, { merge: true })
        setPlan(newPlan)
        return
      }

      const data = snap.data()
      const planId = data.id || 'free'

      // Check trial expiry
      if (planId === 'trial' && data.trialStarted) {
        const start   = new Date(data.trialStarted)
        const now     = new Date()
        const daysDiff = Math.floor((now - start) / (1000 * 60 * 60 * 24))

        if (daysDiff > TRIAL_DAYS) {
          // Trial expired — downgrade to free
          const expired = { ...data, id: 'free', trialExpired: true, expiredAt: new Date().toISOString() }
          setDoc(ref, expired, { merge: true })
          setPlan(expired)
          setExpired(true)
          return
        }

        // Still active — store days remaining
        setPlan({ ...data, daysLeft: TRIAL_DAYS - daysDiff })
        return
      }

      setPlan(data)
    }).catch(() => {
      // Firestore error — default to free
      setPlan({ id: 'free' })
    })
  }, [uid])

  // ── HELPERS ────────────────────────────────────────────
  const isPro = plan && ['pro_monthly','pro_lifetime','trial'].includes(plan.id)

  const isPhaseUnlocked = (phaseId) => {
    if (!plan) return phaseId === 1
    if (isPro)  return true
    return phaseId === 1  // free = phase 1 only
  }

  // Activate a plan (called after payment or promo)
  const activatePlan = async (planId) => {
    if (!uid) return
    const ref  = doc(db, 'subscriptions', uid)
    const data = {
      id: planId,
      activatedAt: new Date().toISOString(),
      ...(planId === 'trial' ? { trialStarted: new Date().toISOString() } : {}),
    }
    await setDoc(ref, data, { merge: true })
    setPlan(data)
    setExpired(false)
  }

  // Demo activation — activates 30-day trial, saves to Firestore
  const devActivate = async () => {
    const trialData = {
      id: 'trial',
      trialStarted: new Date().toISOString(),
      activatedAt: new Date().toISOString(),
      activatedVia: 'demo_button',
      daysLeft: 30,
    }
    // Always update local state immediately so UI reflects change
    setPlan(trialData)
    setExpired(false)
    // Also save to Firestore if we have a real uid
    if (uid && uid !== 'guest') {
      try {
        await setDoc(doc(db, 'subscriptions', uid), trialData, { merge: true })
      } catch(e) {
        console.error('Trial save failed:', e)
      }
    }
  }

  return { plan, isPro, isPhaseUnlocked, activatePlan, devActivate, trialExpired: expired }
}

/* ═══════════════════════════════════════════════════════════
   Admin utilities — key generation + management
═══════════════════════════════════════════════════════════ */


export const PLANS = {
  free:          { label: 'Free',          price: 0,    phases: 1,  duration: 'forever' },
  trial:         { label: '30-Day Trial',  price: 0,    phases: 10, duration: '30 days' },
  pro_monthly:   { label: 'Pro Monthly',   price: 200,  phases: 10, duration: 'monthly' },
  pro_lifetime:  { label: 'Pro Lifetime',  price: 999,  phases: 10, duration: 'lifetime' },
}

// Generate a random access key
export function generateAccessKey(planId = 'pro_lifetime') {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const seg   = () => Array.from({length:4}, () => chars[Math.floor(Math.random()*chars.length)]).join('')
  const key   = `NP-${seg()}-${seg()}-${seg()}`
  return { key, planId, createdAt: new Date().toISOString(), used: false }
}

// Save a key to Firestore
export async function saveKey(keyData) {
  try {
    await addDoc(collection(db, 'accessKeys'), keyData)
    return true
  } catch(e) { console.error(e); return false }
}

// Get all keys from Firestore
export async function getAllKeys() {
  try {
    const snap = await getDocs(collection(db, 'accessKeys'))
    return snap.docs.map(d => ({ id: d.id, ...d.data() }))
  } catch(e) { return [] }
}

// Delete a key
export async function deleteKey(id) {
  try {
    await deleteDoc(doc(db, 'accessKeys', id))
    return true
  } catch(e) { return false }
}

// Redeem an access key (called when user enters key)
export async function redeemKey(keyStr, uid) {
  try {
    const q    = query(collection(db, 'accessKeys'), where('key','==',keyStr), where('used','==',false))
    const snap = await getDocs(q)
    if (snap.empty) return { success: false, error: 'Invalid or already used key' }

    const keyDoc  = snap.docs[0]
    const keyData = keyDoc.data()

    // Mark key as used
    await setDoc(doc(db, 'accessKeys', keyDoc.id), { used: true, usedBy: uid, usedAt: new Date().toISOString() }, { merge: true })

    // Activate the plan for user
    const planData = {
      id: keyData.planId || 'pro_lifetime',
      activatedAt: new Date().toISOString(),
      activatedViaKey: keyStr,
      ...(keyData.planId === 'trial' ? { trialStarted: new Date().toISOString() } : {}),
    }
    await setDoc(doc(db, 'subscriptions', uid), planData, { merge: true })

    return { success: true, plan: keyData.planId }
  } catch(e) { return { success: false, error: e.message } }
}

/* Standalone activatePlan for use outside the hook */
export async function activatePlan(uid, planId) {
  if (!uid) return false
  try {
    const { doc, setDoc } = await import('firebase/firestore')
    const { db } = await import('../firebase.js')
    const data = {
      id: planId,
      activatedAt: new Date().toISOString(),
      ...(planId === 'trial' ? { trialStarted: new Date().toISOString() } : {}),
    }
    await setDoc(doc(db, 'subscriptions', uid), data, { merge: true })
    return true
  } catch(e) {
    console.error('activatePlan error:', e)
    return false
  }
}
