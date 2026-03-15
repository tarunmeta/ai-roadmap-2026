// ── Progress & Productivity Store ─────────────────────────────────────────────
import { useState, useCallback } from 'react'

const key = id => `ai_rm_${id}`

const ls = {
  get: (k, fb = {}) => { try { return JSON.parse(localStorage.getItem(k) || 'null') ?? fb } catch { return fb } },
  set: (k, v)       => { try { localStorage.setItem(k, JSON.stringify(v)) } catch {} },
}

// ── Time Tracking ─────────────────────────────────────────────────────────────
// Stores: { topicId: totalSeconds }
const TIME_KEY    = 'ai_rm_time'
// Stores: { 'YYYY-MM-DD': totalSeconds }
const DAILY_KEY   = 'ai_rm_daily'
// Stores: { topicId: ISOstring (when timer started) }
const ACTIVE_KEY  = 'ai_rm_active_timers'
// Stores: { 'YYYY-MM-DD': { topicsCompleted, sessionsCount, streakDay } }
const ACTIVITY_KEY = 'ai_rm_activity'

export function useProgressStore(userId) {
  const u = userId || 'guest'

  const [done,     setDone]     = useState(() => ls.get(key(`${u}_done`)))
  const [grasp,    setGrasp]    = useState(() => ls.get(key(`${u}_grasp`)))
  const [notes,    setNotes]    = useState(() => ls.get(key(`${u}_notes`)))
  const [topicTime,setTopicTime]= useState(() => ls.get(key(`${u}_time`)))    // { id: seconds }
  const [dailyTime,setDailyTime]= useState(() => ls.get(key(`${u}_daily`)))   // { date: seconds }
  const [activity, setActivity] = useState(() => ls.get(key(`${u}_activity`)))// { date: { done, sessions } }
  const [timers,   setTimers]   = useState({}) // active in-memory timers { id: startMs }

  const today = () => new Date().toISOString().slice(0, 10)

  // ── Topic toggles ──────────────────────────────────────────────────────────
  const toggleDone = useCallback((id) => {
    setDone(prev => {
      const next = { ...prev, [id]: !prev[id] }
      ls.set(key(`${u}_done`), next)
      // record activity
      if (next[id]) {
        setActivity(a => {
          const d = today()
          const n = { ...a, [d]: { ...(a[d] || {}), done: ((a[d]?.done)||0) + 1 } }
          ls.set(key(`${u}_activity`), n)
          return n
        })
      }
      return next
    })
  }, [u])

  const setTopicGrasp = useCallback((id, level) => {
    setGrasp(prev => { const n = { ...prev, [id]: level }; ls.set(key(`${u}_grasp`), n); return n })
  }, [u])

  const setTopicNote = useCallback((id, text) => {
    setNotes(prev => { const n = { ...prev, [id]: text }; ls.set(key(`${u}_notes`), n); return n })
  }, [u])

  // ── Timer controls ─────────────────────────────────────────────────────────
  const startTimer = useCallback((id) => {
    setTimers(prev => ({ ...prev, [id]: Date.now() }))
  }, [])

  const stopTimer = useCallback((id) => {
    setTimers(prev => {
      if (!prev[id]) return prev
      const elapsed = Math.floor((Date.now() - prev[id]) / 1000)
      // save topic time
      setTopicTime(tt => {
        const n = { ...tt, [id]: (tt[id] || 0) + elapsed }
        ls.set(key(`${u}_time`), n)
        return n
      })
      // save daily time
      setDailyTime(dt => {
        const d = today()
        const n = { ...dt, [d]: (dt[d] || 0) + elapsed }
        ls.set(key(`${u}_daily`), n)
        return n
      })
      // save activity
      setActivity(a => {
        const d = today()
        const n = { ...a, [d]: { ...(a[d]||{}), time: ((a[d]?.time)||0) + elapsed } }
        ls.set(key(`${u}_activity`), n)
        return n
      })
      const next = { ...prev }
      delete next[id]
      return next
    })
  }, [u])

  const isTimerRunning = useCallback((id) => !!timers[id], [timers])

  const getElapsed = useCallback((id) => {
    if (!timers[id]) return 0
    return Math.floor((Date.now() - timers[id]) / 1000)
  }, [timers])

  const resetAll = useCallback(() => {
    if (!confirm('Reset ALL progress, ratings, times & notes?')) return
    ;[`${u}_done`,`${u}_grasp`,`${u}_notes`,`${u}_time`,`${u}_daily`,`${u}_activity`].forEach(k2 => localStorage.removeItem(key(k2)))
    setDone({}); setGrasp({}); setNotes({}); setTopicTime({}); setDailyTime({}); setActivity({})
  }, [u])

  // ── Computed stats ─────────────────────────────────────────────────────────
  const getStreak = useCallback(() => {
    const dates = Object.keys(activity).sort().reverse()
    if (!dates.length) return 0
    let streak = 0
    const now = new Date()
    for (let i = 0; i < 365; i++) {
      const d = new Date(now)
      d.setDate(d.getDate() - i)
      const ds = d.toISOString().slice(0, 10)
      if (activity[ds]?.done > 0) streak++
      else if (i > 0) break
    }
    return streak
  }, [activity])

  const getLast7Days = useCallback(() => {
    const days = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const ds = d.toISOString().slice(0, 10)
      days.push({
        date: ds,
        label: d.toLocaleDateString('en', { weekday: 'short' }),
        done: activity[ds]?.done || 0,
        time: dailyTime[ds] || 0,
      })
    }
    return days
  }, [activity, dailyTime])

  const getLast30Days = useCallback(() => {
    const days = []
    for (let i = 29; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const ds = d.toISOString().slice(0, 10)
      days.push({
        date: ds,
        label: d.toLocaleDateString('en', { month: 'short', day: 'numeric' }),
        done: activity[ds]?.done || 0,
        time: dailyTime[ds] || 0,
      })
    }
    return days
  }, [activity, dailyTime])

  return {
    done, grasp, notes, topicTime, dailyTime, activity, timers,
    toggleDone, setTopicGrasp, setTopicNote,
    startTimer, stopTimer, isTimerRunning, getElapsed,
    resetAll, getStreak, getLast7Days, getLast30Days,
  }
}

export function fmtTime(seconds) {
  if (!seconds) return '0m'
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (h > 0) return `${h}h ${m}m`
  if (m > 0) return `${m}m ${s}s`
  return `${s}s`
}
