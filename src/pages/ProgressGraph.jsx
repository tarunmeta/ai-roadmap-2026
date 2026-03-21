import { useEffect, useState } from 'react'
import { PHASES } from '../data.js'

function phasePct(phase, done) {
  const ts = phase.weeks_data.flatMap(w => w.days.flatMap(d => d.topics))
  return ts.length ? Math.round(ts.filter(t => done[t.id]).length / ts.length * 100) : 0
}

function AnimRing({ pct, size, stroke, color, label, delay = 0 }) {
  const [cur, setCur] = useState(0)
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (circ * cur / 100)

  useEffect(() => {
    setCur(0)
    const t = setTimeout(() => {
      let s = null
      const go = ts => {
        if (!s) s = ts
        const p = Math.min((ts - s) / 900, 1)
        const ease = 1 - Math.pow(1 - p, 3)
        setCur(Math.round(pct * ease))
        if (p < 1) requestAnimationFrame(go)
      }
      requestAnimationFrame(go)
    }, delay)
    return () => clearTimeout(t)
  }, [pct, delay])

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', display: 'block' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,.05)" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 8px ${color}99)`, transition: 'stroke-dashoffset .04s linear' }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
        <span style={{ fontSize: size * .19, fontWeight: 900, color, fontFamily: "'Syne',sans-serif", lineHeight: 1 }}>{cur}%</span>
        {label && <span style={{ fontSize: size * .09, color: 'var(--t3)', fontWeight: 600, textAlign: 'center', lineHeight: 1.2 }}>{label}</span>}
      </div>
    </div>
  )
}

function AnimBar({ pct, color, label, count, total, delay = 0 }) {
  const [cur, setCur] = useState(0)
  useEffect(() => {
    setCur(0)
    const t = setTimeout(() => {
      let s = null
      const go = ts => {
        if (!s) s = ts
        const p = Math.min((ts - s) / 700, 1)
        setCur(Math.round(pct * (1 - Math.pow(1 - p, 3))))
        if (p < 1) requestAnimationFrame(go)
      }
      requestAnimationFrame(go)
    }, delay)
    return () => clearTimeout(t)
  }, [pct, delay])

  return (
    <div style={{ marginBottom: 11 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, alignItems: 'center' }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--t2)' }}>{label}</span>
        <span style={{ fontSize: 11, fontWeight: 800, color, fontFamily: "'Syne',sans-serif" }}>{count}/{total}</span>
      </div>
      <div style={{ height: 8, background: 'rgba(255,255,255,.04)', borderRadius: 99, overflow: 'hidden', position: 'relative' }}>
        <div style={{
          height: '100%', width: `${cur}%`, borderRadius: 99, transition: 'width .04s linear',
          background: `linear-gradient(90deg,${color},${color}88)`,
          boxShadow: cur > 0 ? `0 0 10px ${color}55` : 'none'
        }} />
      </div>
    </div>
  )
}

export default function ProgressGraph({ done, grasp }) {
  const all = PHASES.flatMap(p => p.weeks_data.flatMap(w => w.days.flatMap(d => d.topics)))
  const total = all.length
  const completed = all.filter(t => done[t.id]).length
  const pct = Math.round(completed / total * 100)

  const graspCounts = {
    strong: Object.values(grasp).filter(g => g === 'strong').length,
    mid:    Object.values(grasp).filter(g => g === 'mid').length,
    weak:   Object.values(grasp).filter(g => g === 'weak').length,
    later:  Object.values(grasp).filter(g => g === 'later').length,
  }

  const phaseData = PHASES.map(p => {
    const ts = p.weeks_data.flatMap(w => w.days.flatMap(d => d.topics))
    const done2 = ts.filter(t => done[t.id]).length
    return { ...p, done: done2, total: ts.length, pct: Math.round(done2 / ts.length * 100) }
  })

  return (
    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {/* Hero — big ring + key stats */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', animation: 'fadeUp .3s ease' }}>
        <div style={{
          background: '#0a0b10', border: '1px solid #1a1d2e', borderRadius: 20,
          padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
          position: 'relative', overflow: 'hidden', minWidth: 150, flex: '0 0 auto'
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#6366f1,#a855f7,#06b6d4)' }} />
          <AnimRing pct={pct} size={118} stroke={10} color="#6366f1" label={`${completed}/${total}`} />
          <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--t3)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Overall</div>
        </div>

        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, minWidth: 180 }}>
          {[
            { ic: '✅', v: completed, lb: 'Done', col: 'var(--cyan)' },
            { ic: '⏳', v: total - completed, lb: 'Left', col: '#f59e0b' },
            { ic: '💪', v: graspCounts.strong, lb: 'Strong', col: 'var(--cyan)' },
            { ic: '😅', v: graspCounts.weak, lb: 'Weak', col: '#ef4444' },
          ].map((s, i) => (
            <div key={i} style={{
              padding: '11px 12px', borderRadius: 14, background: '#0a0b10',
              border: `1px solid ${s.col}18`, position: 'relative', overflow: 'hidden',
              animation: `fadeUp ${.1 + i * .08}s ease both`
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${s.col},transparent)` }} />
              <div style={{ fontSize: 17, marginBottom: 4 }}>{s.ic}</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: s.col, fontFamily: "'Syne',sans-serif" }}>{s.v}</div>
              <div style={{ fontSize: 10, color: 'var(--t2)', fontWeight: 600 }}>{s.lb}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Phase bars */}
      <div style={{ background: '#0a0b10', border: '1px solid #1a1d2e', borderRadius: 16, padding: 16, animation: 'fadeUp .45s ease' }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: '#e8eaf2', marginBottom: 14, letterSpacing: '-.01em' }}>🗺 Phase Progress</div>
        {phaseData.map((p, i) => (
          <AnimBar key={p.id} pct={p.pct} color={p.color}
            label={`${p.emoji} ${p.name}`} count={p.done} total={p.total} delay={i * 55} />
        ))}
      </div>

      {/* Phase mini rings */}
      <div style={{ background: '#0a0b10', border: '1px solid #1a1d2e', borderRadius: 16, padding: 16, animation: 'fadeUp .55s ease' }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: '#e8eaf2', marginBottom: 14 }}>🎯 Phase Rings</div>
        <div style={{ display: 'flex', gap: 14, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 4 }}>
          {phaseData.map((p, i) => (
            <div key={p.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0 }}>
              <AnimRing pct={p.pct} size={62} stroke={5} color={p.color} delay={i * 70} />
              <div style={{ fontSize: 9, color: 'var(--t3)', textAlign: 'center', lineHeight: 1.3 }}>{p.emoji} P{p.id}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Grasp breakdown */}
      <div style={{ background: '#0a0b10', border: '1px solid #1a1d2e', borderRadius: 16, padding: 16, animation: 'fadeUp .65s ease' }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: '#e8eaf2', marginBottom: 12 }}>🧠 Grasp Breakdown</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { lb: '💪 Strong', c: 'var(--cyan)', v: graspCounts.strong },
            { lb: '🤔 Mid',    c: '#f59e0b', v: graspCounts.mid },
            { lb: '😅 Weak',  c: '#ef4444', v: graspCounts.weak },
            { lb: '📌 Later', c: '#a855f7', v: graspCounts.later },
          ].map((g, i) => (
            <div key={i} style={{ flex: 1, padding: '10px 8px', borderRadius: 12, textAlign: 'center', background: `${g.c}08`, border: `1px solid ${g.c}22` }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: g.c, fontFamily: "'Syne',sans-serif" }}>{g.v}</div>
              <div style={{ fontSize: 9, color: 'var(--t3)', marginTop: 3, lineHeight: 1.3 }}>{g.lb}</div>
            </div>
          ))}
        </div>
        {/* Stacked bar */}
        <div style={{ marginTop: 12, height: 6, borderRadius: 99, overflow: 'hidden', display: 'flex' }}>
          {[
            { c: 'var(--cyan)', v: graspCounts.strong },
            { c: '#f59e0b', v: graspCounts.mid },
            { c: '#ef4444', v: graspCounts.weak },
            { c: '#a855f7', v: graspCounts.later },
          ].map((g, i) => {
            const tot = Object.values(graspCounts).reduce((a, b) => a + b, 0) || 1
            return <div key={i} style={{ height: '100%', flex: g.v / tot, background: g.c, transition: 'flex .8s' }} />
          })}
          <div style={{ height: '100%', flex: Math.max(0, (total - completed) / total), background: 'var(--border)' }} />
        </div>
      </div>
    </div>
  )
}
