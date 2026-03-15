/* ═══════════════════════════════════════════════════
   NEURAL PROTOCOL — Sound Effects
   Subtle UI audio using Web Audio API (no files needed)
   ═══════════════════════════════════════════════════ */

let ctx = null

function getCtx() {
  if (!ctx) {
    try { ctx = new (window.AudioContext || window.webkitAudioContext)() } catch(e) {}
  }
  return ctx
}

// Soft click — phase card / button press
export function playClick() {
  try {
    const ac = getCtx(); if (!ac) return
    const o = ac.createOscillator()
    const g = ac.createGain()
    o.connect(g); g.connect(ac.destination)
    o.type = 'sine'
    o.frequency.setValueAtTime(800, ac.currentTime)
    o.frequency.exponentialRampToValueAtTime(400, ac.currentTime + 0.08)
    g.gain.setValueAtTime(0.06, ac.currentTime)
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.1)
    o.start(ac.currentTime); o.stop(ac.currentTime + 0.1)
  } catch(e) {}
}

// Hover — subtle high tick
export function playHover() {
  try {
    const ac = getCtx(); if (!ac) return
    const o = ac.createOscillator()
    const g = ac.createGain()
    o.connect(g); g.connect(ac.destination)
    o.type = 'sine'
    o.frequency.setValueAtTime(1200, ac.currentTime)
    o.frequency.exponentialRampToValueAtTime(900, ac.currentTime + 0.04)
    g.gain.setValueAtTime(0.025, ac.currentTime)
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.05)
    o.start(ac.currentTime); o.stop(ac.currentTime + 0.05)
  } catch(e) {}
}

// Success — done marking a topic
export function playSuccess() {
  try {
    const ac = getCtx(); if (!ac) return
    const freqs = [523, 659, 784]
    freqs.forEach((freq, i) => {
      const o = ac.createOscillator()
      const g = ac.createGain()
      o.connect(g); g.connect(ac.destination)
      o.type = 'sine'
      const t = ac.currentTime + i * 0.06
      o.frequency.setValueAtTime(freq, t)
      g.gain.setValueAtTime(0.05, t)
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.15)
      o.start(t); o.stop(t + 0.15)
    })
  } catch(e) {}
}

// Nav switch
export function playNav() {
  try {
    const ac = getCtx(); if (!ac) return
    const o = ac.createOscillator()
    const g = ac.createGain()
    o.connect(g); g.connect(ac.destination)
    o.type = 'triangle'
    o.frequency.setValueAtTime(600, ac.currentTime)
    o.frequency.linearRampToValueAtTime(750, ac.currentTime + 0.06)
    g.gain.setValueAtTime(0.04, ac.currentTime)
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.08)
    o.start(ac.currentTime); o.stop(ac.currentTime + 0.08)
  } catch(e) {}
}

// Unlock — pro phase unlock
export function playUnlock() {
  try {
    const ac = getCtx(); if (!ac) return
    const freqs = [392, 494, 587, 740]
    freqs.forEach((freq, i) => {
      const o = ac.createOscillator()
      const g = ac.createGain()
      o.connect(g); g.connect(ac.destination)
      o.type = 'sine'
      const t = ac.currentTime + i * 0.08
      o.frequency.setValueAtTime(freq, t)
      g.gain.setValueAtTime(0.06, t)
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.2)
      o.start(t); o.stop(t + 0.2)
    })
  } catch(e) {}
}

// Pill select — matrix intro
export function playPill(color) {
  try {
    const ac = getCtx(); if (!ac) return
    const o = ac.createOscillator()
    const g = ac.createGain()
    o.connect(g); g.connect(ac.destination)
    o.type = 'sawtooth'
    if (color === 'red') {
      o.frequency.setValueAtTime(200, ac.currentTime)
      o.frequency.exponentialRampToValueAtTime(80, ac.currentTime + 0.4)
      g.gain.setValueAtTime(0.08, ac.currentTime)
      g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.5)
      o.start(ac.currentTime); o.stop(ac.currentTime + 0.5)
    } else {
      o.frequency.setValueAtTime(400, ac.currentTime)
      o.frequency.exponentialRampToValueAtTime(200, ac.currentTime + 0.3)
      g.gain.setValueAtTime(0.06, ac.currentTime)
      g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.35)
      o.start(ac.currentTime); o.stop(ac.currentTime + 0.35)
    }
  } catch(e) {}
}
