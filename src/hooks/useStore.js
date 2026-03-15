// ── FIREBASE STORE HOOK ───────────────────────────────────────────────────────
// All progress saved to Firestore — works on every device, never lost
// Structure: users/{uid}/progress/{topicId} → { done, grasp, note, timeMs }
//            users/{uid}/productivity/{date} → { topics, minutes }

import { useState, useCallback, useEffect, useRef } from 'react'
import {
  doc, collection, getDocs, setDoc, deleteDoc,
  writeBatch, serverTimestamp, onSnapshot
} from 'firebase/firestore'
import { db } from '../firebase.js'

// ── Local cache helpers (instant UI, sync in background) ─────────────────────
const lk  = (uid,k) => `ai_rm_${uid}_${k}`
const lget = (k,fb={}) => { try { return JSON.parse(localStorage.getItem(k)||'null')??fb } catch { return fb } }
const lset = (k,v)      => { try { localStorage.setItem(k,JSON.stringify(v)) } catch {} }

// ── Debounce: batch writes to Firestore (avoid too many calls) ────────────────
function useDebounce(fn, delay=1500) {
  const t = useRef(null)
  return useCallback((...args) => {
    clearTimeout(t.current)
    t.current = setTimeout(() => fn(...args), delay)
  }, [fn, delay])
}

export function useStore(uid = 'guest') {
  const isGuest = uid === 'guest'

  // Local state (instant UI updates)
  const [done,  setDone]  = useState(() => lget(lk(uid,'done')))
  const [grasp, setGrasp] = useState(() => lget(lk(uid,'grasp')))
  const [notes, setNotes] = useState(() => lget(lk(uid,'notes')))
  const [times, setTimes] = useState(() => lget(lk(uid,'times')))
  const [timer, setTimer] = useState(() => lget(lk(uid,'timer')))
  const [prod,  setProd]  = useState(() => lget(lk(uid,'prod')))
  const [synced,setSynced]= useState(false)

  const today = () => new Date().toISOString().slice(0,10)

  // ── LOAD FROM FIRESTORE on mount ─────────────────────────────────────────
  useEffect(() => {
    if (isGuest) { setSynced(true); return }

    async function loadFromFirestore() {
      try {
        // Load all progress docs
        const progSnap = await getDocs(collection(db,'users',uid,'progress'))
        const doneMap={}, graspMap={}, notesMap={}, timesMap={}
        progSnap.forEach(d => {
          const data = d.data()
          if (data.done  !== undefined) doneMap[d.id]  = data.done
          if (data.grasp !== undefined) graspMap[d.id] = data.grasp
          if (data.note  !== undefined) notesMap[d.id] = data.note
          if (data.timeMs!== undefined) timesMap[d.id] = data.timeMs
        })

        // Load productivity
        const prodSnap = await getDocs(collection(db,'users',uid,'productivity'))
        const prodMap = {}
        prodSnap.forEach(d => { prodMap[d.id] = d.data() })

        // Update local state + cache
        setDone(doneMap);   lset(lk(uid,'done'),  doneMap)
        setGrasp(graspMap); lset(lk(uid,'grasp'), graspMap)
        setNotes(notesMap); lset(lk(uid,'notes'), notesMap)
        setTimes(timesMap); lset(lk(uid,'times'), timesMap)
        setProd(prodMap);   lset(lk(uid,'prod'),  prodMap)
        setSynced(true)
      } catch(e) {
        console.error('Firestore load error:', e)
        setSynced(true) // continue with local cache
      }
    }
    loadFromFirestore()
  }, [uid])

  // ── SAVE topic progress to Firestore ─────────────────────────────────────
  const saveTopicToFirestore = useCallback(async (topicId, fields) => {
    if (isGuest) return
    try {
      await setDoc(doc(db,'users',uid,'progress',topicId), { ...fields, updatedAt:serverTimestamp() }, { merge:true })
    } catch(e) { console.error('Save error:', e) }
  }, [uid])

  // ── SAVE productivity day to Firestore ────────────────────────────────────
  const saveProdToFirestore = useCallback(async (date, data) => {
    if (isGuest) return
    try {
      await setDoc(doc(db,'users',uid,'productivity',date), { ...data, updatedAt:serverTimestamp() }, { merge:true })
    } catch(e) { console.error('Prod save error:', e) }
  }, [uid])

  const debouncedSaveTopic = useDebounce(saveTopicToFirestore, 1200)
  const debouncedSaveProd  = useDebounce(saveProdToFirestore,  1200)

  // ── TOGGLE DONE ───────────────────────────────────────────────────────────
  const toggleDone = useCallback((id) => {
    setDone(p => {
      const newVal = !p[id]
      const n = { ...p, [id]: newVal }
      lset(lk(uid,'done'), n)
      debouncedSaveTopic(id, { done: newVal })

      if (newVal) {
        const d = today()
        setProd(pp => {
          const day = pp[d] || { topics:0, minutes:0 }
          const np  = { ...pp, [d]: { ...day, topics: day.topics+1 } }
          lset(lk(uid,'prod'), np)
          debouncedSaveProd(d, np[d])
          return np
        })
      }
      return n
    })
  }, [uid])

  // ── GRASP ─────────────────────────────────────────────────────────────────
  const setTopicGrasp = useCallback((id, lv) => {
    setGrasp(p => {
      const n = { ...p, [id]: lv }
      lset(lk(uid,'grasp'), n)
      debouncedSaveTopic(id, { grasp: lv })
      return n
    })
  }, [uid])

  // ── NOTE ──────────────────────────────────────────────────────────────────
  const setTopicNote = useCallback((id, tx) => {
    setNotes(p => {
      const n = { ...p, [id]: tx }
      lset(lk(uid,'notes'), n)
      debouncedSaveTopic(id, { note: tx })
      return n
    })
  }, [uid])

  // ── TIMER START ───────────────────────────────────────────────────────────
  const startTimer = useCallback((id) => {
    const t = { topicId:id, startMs:Date.now() }
    setTimer(t); lset(lk(uid,'timer'), t)
  }, [uid])

  // ── TIMER STOP ────────────────────────────────────────────────────────────
  const stopTimer = useCallback((id) => {
    setTimer(cur => {
      if (!cur || cur.topicId !== id) return cur
      const elapsed = Date.now() - cur.startMs
      setTimes(pt => {
        const n = { ...pt, [id]: (pt[id]||0) + elapsed }
        lset(lk(uid,'times'), n)
        debouncedSaveTopic(id, { timeMs: n[id] })
        return n
      })
      const mins = Math.round(elapsed/60000)
      if (mins > 0) {
        const d = today()
        setProd(pp => {
          const day = pp[d] || { topics:0, minutes:0 }
          const np  = { ...pp, [d]: { ...day, minutes: day.minutes+mins } }
          lset(lk(uid,'prod'), np)
          debouncedSaveProd(d, np[d])
          return np
        })
      }
      lset(lk(uid,'timer'), null)
      return null
    })
  }, [uid])

  // ── RESET ALL ─────────────────────────────────────────────────────────────
  const resetAll = useCallback(async () => {
    if (!confirm('Reset ALL progress? This cannot be undone.')) return
    // Clear local
    setDone({}); setGrasp({}); setNotes({}); setTimes({}); setTimer(null); setProd({})
    ;['done','grasp','notes','times','timer','prod'].forEach(k => lset(lk(uid,k), {}))

    // Clear Firestore (batch delete all progress docs)
    if (!isGuest) {
      try {
        const batch = writeBatch(db)
        const snap = await getDocs(collection(db,'users',uid,'progress'))
        snap.forEach(d => batch.delete(d.ref))
        const pSnap = await getDocs(collection(db,'users',uid,'productivity'))
        pSnap.forEach(d => batch.delete(d.ref))
        await batch.commit()
      } catch(e) { console.error('Reset error:', e) }
    }
  }, [uid])

  return { done, grasp, notes, times, timer, prod, synced, toggleDone, setTopicGrasp, setTopicNote, startTimer, stopTimer, resetAll }
}
