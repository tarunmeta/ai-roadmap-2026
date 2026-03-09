// ── FIREBASE SUBSCRIPTION HOOK ────────────────────────────────────────────────
// Subscriptions stored in Firestore → users/{uid}/subscription
// Access keys stored in Firestore → accessKeys/{key}
// SECURE: users cannot tamper — data lives on Google's servers

import { useState, useEffect, useCallback } from 'react'
import {
  doc, getDoc, setDoc, collection, getDocs,
  deleteDoc, serverTimestamp, query, orderBy
} from 'firebase/firestore'
import { db } from '../firebase.js'

export const PLANS = {
  free: {
    id:'free', name:'Free', price:0, priceStr:'₹0',
    tagline:'Get started — no payment needed',
    color:'#8b90b0',
    unlockedPhases:[1],
    features:['Phase 1: Python Foundations (100% free)','Grasp ratings & notes','Timer per topic','Progress tracking'],
    missing:['Phases 2–10 (9 phases locked)','AI Chat Assistant','Full Productivity Dashboard']
  },
  pro_monthly: {
    id:'pro_monthly', name:'Pro Monthly', price:200, priceStr:'₹200/month',
    tagline:'Less than a chai ☕ per week',
    color:'#6366f1',
    unlockedPhases:[1,2,3,4,5,6,7,8,9,10],
    features:['All 10 Phases unlocked','AI Chat Assistant (Claude-powered)','Full Productivity Dashboard','Priority WhatsApp support'],
    missing:[]
  },
  pro_lifetime: {
    id:'pro_lifetime', name:'Lifetime Access', price:999, priceStr:'₹999',
    tagline:'🔥 Pay once — access forever',
    color:'#f59e0b', badge:'BEST VALUE',
    unlockedPhases:[1,2,3,4,5,6,7,8,9,10],
    features:['Everything in Pro Monthly','Lifetime access — no renewals ever','All future updates free','Personal WhatsApp support'],
    missing:[]
  }
}

// ── ADMIN: Generate key (saves to Firestore) ───────────────────────────────
export async function generateAccessKey(planId, label='') {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const seg   = () => Array.from({length:4},()=>chars[Math.floor(Math.random()*chars.length)]).join('')
  const key   = `${seg()}-${seg()}-${seg()}`
  await setDoc(doc(db,'accessKeys',key), {
    planId, label,
    createdAt:  serverTimestamp(),
    usedBy:     null,
    usedAt:     null,
    expiresAt:  planId==='pro_monthly' ? Date.now()+32*24*60*60*1000 : null,
  })
  return key
}

// ── ADMIN: Get all keys ────────────────────────────────────────────────────
export async function getAllKeys() {
  const snap = await getDocs(collection(db,'accessKeys'))
  const keys = {}
  snap.forEach(d => { keys[d.id] = d.data() })
  return keys
}

// ── ADMIN: Delete key ──────────────────────────────────────────────────────
export async function deleteKey(key) {
  await deleteDoc(doc(db,'accessKeys',key.trim().toUpperCase()))
}

// ── USER: Redeem key ───────────────────────────────────────────────────────
export async function redeemKey(keyStr, uid) {
  const k    = keyStr.trim().toUpperCase()
  const kRef = doc(db,'accessKeys',k)
  const kSnap= await getDoc(kRef)
  if (!kSnap.exists()) return { ok:false, error:'Invalid key. Double-check and try again.' }

  const kData = kSnap.data()
  if (kData.usedBy && kData.usedBy !== uid) return { ok:false, error:'This key has already been used by another account.' }
  if (kData.expiresAt && Date.now() > kData.expiresAt) return { ok:false, error:'This key has expired. Please contact support on WhatsApp.' }

  // Mark key as used
  await setDoc(kRef, { usedBy:uid, usedAt:serverTimestamp() }, { merge:true })

  // Save subscription to user doc
  await setDoc(doc(db,'users',uid), {
    plan:        kData.planId,
    planLabel:   PLANS[kData.planId]?.name || kData.planId,
    activatedAt: serverTimestamp(),
    expiresAt:   kData.expiresAt || null,
    keyUsed:     k,
  }, { merge:true })

  return { ok:true, plan:kData.planId }
}

// ── HOOK ──────────────────────────────────────────────────────────────────
export function useSubscription(uid='guest') {
  const [sub,    setSub]    = useState({ plan:'free' })
  const [loading,setLoading]= useState(true)

  useEffect(() => {
    if (!uid || uid==='guest') { setLoading(false); return }
    getDoc(doc(db,'users',uid)).then(snap => {
      if (snap.exists()) {
        const d = snap.data()
        setSub({ plan:d.plan||'free', activatedAt:d.activatedAt, expiresAt:d.expiresAt, keyUsed:d.keyUsed })
      }
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [uid])

  const isPro = (() => {
    if (sub.plan==='pro_lifetime') return true
    if (sub.plan==='pro_monthly') {
      if (!sub.expiresAt) return true
      const exp = sub.expiresAt?.toMillis ? sub.expiresAt.toMillis() : sub.expiresAt
      return Date.now() < exp
    }
    return false
  })()

  const isPhaseUnlocked = (phaseId) => isPro || PLANS.free.unlockedPhases.includes(phaseId)

  // Dev activate (for testing only — remove in prod)
  const devActivate = async (planId='pro_lifetime') => {
    await setDoc(doc(db,'users',uid), { plan:planId, activatedAt:serverTimestamp(), expiresAt:null, keyUsed:'DEMO' }, { merge:true })
    setSub({ plan:planId })
    window.location.reload()
  }

  return { sub, loading, isPro, isPhaseUnlocked, devActivate, plan:PLANS[sub.plan]||PLANS.free }
}
