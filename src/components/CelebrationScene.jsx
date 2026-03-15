import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

/* ═══════════════════════════════════════════════════════════
   Neural Protocol — Phase Complete Celebration
   Animated 3D cheerleader avatar + confetti + beat
═══════════════════════════════════════════════════════════ */

// ── ROYALTY-FREE BEAT via Web Audio API ──────────────────────
function createBeat(onStop) {
  try {
    const ac = new (window.AudioContext || window.webkitAudioContext)()
    const master = ac.createGain(); master.gain.value = .35; master.connect(ac.destination)
    const comp = ac.createDynamicsCompressor(); comp.connect(master)

    const bpm = 128, beat = 60 / bpm

    const kick = (t) => {
      const o = ac.createOscillator(), g = ac.createGain()
      o.connect(g); g.connect(comp)
      o.type = 'sine'
      o.frequency.setValueAtTime(160, t)
      o.frequency.exponentialRampToValueAtTime(40, t + .12)
      g.gain.setValueAtTime(.9, t)
      g.gain.exponentialRampToValueAtTime(.001, t + .2)
      o.start(t); o.stop(t + .2)
    }
    const snare = (t) => {
      const buf = ac.createBuffer(1, ac.sampleRate * .15, ac.sampleRate)
      const d = buf.getChannelData(0)
      for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1)
      const src = ac.createBufferSource(), g = ac.createGain()
      const filt = ac.createBiquadFilter()
      filt.type = 'highpass'; filt.frequency.value = 1800
      src.buffer = buf; src.connect(filt); filt.connect(g); g.connect(comp)
      g.gain.setValueAtTime(.6, t); g.gain.exponentialRampToValueAtTime(.001, t + .15)
      src.start(t); src.stop(t + .15)
    }
    const hihat = (t, vol = .3) => {
      const buf = ac.createBuffer(1, ac.sampleRate * .05, ac.sampleRate)
      const d = buf.getChannelData(0)
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
      const src = ac.createBufferSource(), g = ac.createGain()
      const filt = ac.createBiquadFilter()
      filt.type = 'highpass'; filt.frequency.value = 7000
      src.buffer = buf; src.connect(filt); filt.connect(g); g.connect(comp)
      g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.001, t + .05)
      src.start(t); src.stop(t + .05)
    }
    const synth = (t, freq, dur, vol = .15) => {
      const o = ac.createOscillator(), g = ac.createGain()
      const filt = ac.createBiquadFilter()
      filt.type = 'lowpass'; filt.frequency.value = 2000
      o.type = 'sawtooth'
      o.connect(filt); filt.connect(g); g.connect(comp)
      o.frequency.value = freq
      g.gain.setValueAtTime(0, t)
      g.gain.linearRampToValueAtTime(vol, t + .01)
      g.gain.exponentialRampToValueAtTime(.001, t + dur)
      o.start(t); o.stop(t + dur + .05)
    }

    const melody = [523, 587, 659, 784, 659, 784, 880, 1047]

    let bars = 0
    const schedule = () => {
      const now = ac.currentTime
      // 4-bar loop
      for (let b = 0; b < 4; b++) {
        const t = now + b * beat * 4
        // Kick: 1 & 3
        kick(t); kick(t + beat * 2)
        // Snare: 2 & 4
        snare(t + beat); snare(t + beat * 3)
        // Hi-hats: every 8th
        for (let h = 0; h < 8; h++) hihat(t + h * beat * .5, h % 2 === 0 ? .3 : .15)
        // Melody
        const note = melody[b % melody.length]
        synth(t, note, beat * 1.8, .12)
        synth(t + beat * 2, note * 1.5, beat * .8, .08)
      }
      bars++
      if (bars < 8) setTimeout(schedule, beat * 4 * 1000 * 3.8)
      else { setTimeout(() => { try { ac.close() } catch(e) {} onStop?.() }, 500) }
    }
    schedule()
    return () => { try { ac.close() } catch(e) {} }
  } catch(e) { onStop?.(); return () => {} }
}

// ── 3D CHEERLEADER (built from Three.js geometry) ───────────
function CheerleaderCanvas({ dancing, onLoad }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const W = el.clientWidth || 320, H = el.clientHeight || 420

    const scene    = new THREE.Scene()
    const camera   = new THREE.PerspectiveCamera(50, W / H, 0.1, 100)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0, 0)
    renderer.shadowMap.enabled = true
    el.appendChild(renderer.domElement)
    camera.position.set(0, 1.2, 5.5)
    camera.lookAt(0, 1, 0)

    // ── LIGHTS ────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffeeff, .8))
    const spot = new THREE.SpotLight(0xffffff, 2, 20, Math.PI / 5, .4)
    spot.position.set(0, 8, 4); spot.castShadow = true; scene.add(spot)
    const fill1 = new THREE.PointLight(0xff88cc, 1.5, 12); fill1.position.set(-3, 2, 2); scene.add(fill1)
    const fill2 = new THREE.PointLight(0x88ccff, 1.2, 10); fill2.position.set(3, 1, 2); scene.add(fill2)
    const rimL  = new THREE.PointLight(0xff44aa, 1, 8); rimL.position.set(-2, 3, -2); scene.add(rimL)

    // ── MATERIALS ─────────────────────────────────────────────
    const skinMat  = new THREE.MeshStandardMaterial({ color: 0xffb899, roughness: .6, metalness: .05 })
    const hairMat  = new THREE.MeshStandardMaterial({ color: 0x1a0a0a, roughness: .8 })
    const topMat   = new THREE.MeshStandardMaterial({ color: 0xff2d78, roughness: .4, metalness: .2,
      emissive: 0x550011, emissiveIntensity: .3 })
    const skirtMat = new THREE.MeshStandardMaterial({ color: 0xff2d78, roughness: .5, metalness: .1,
      emissive: 0x440011, emissiveIntensity: .2 })
    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: .4 })
    const lipMat   = new THREE.MeshStandardMaterial({ color: 0xff1155, roughness: .3, emissive: 0x880022, emissiveIntensity: .5 })
    const eyeMat   = new THREE.MeshStandardMaterial({ color: 0x221100, roughness: .2, emissive: 0x110000 })
    const irisMat  = new THREE.MeshStandardMaterial({ color: 0x442288, roughness: .1, emissive: 0x221144, emissiveIntensity: .8 })
    const pompomR  = new THREE.MeshStandardMaterial({ color: 0xffee00, roughness: .9, emissive: 0x443300, emissiveIntensity: .3 })
    const pompomB  = new THREE.MeshStandardMaterial({ color: 0x44aaff, roughness: .9, emissive: 0x112244, emissiveIntensity: .3 })
    const shoeMat  = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: .5 })
    const socMat   = new THREE.MeshStandardMaterial({ color: 0xfff0f0, roughness: .7 })
    const starMat  = new THREE.MeshStandardMaterial({ color: 0xffdd00, roughness: .2, metalness: .8,
      emissive: 0x886600, emissiveIntensity: .6 })

    // ── CHARACTER ROOT ────────────────────────────────────────
    const root = new THREE.Group(); scene.add(root)

    // HEAD
    const head = new THREE.Group(); root.add(head); head.position.y = 3.1
    const headMesh = new THREE.Mesh(new THREE.SphereGeometry(.44, 20, 20), skinMat)
    headMesh.scale.set(1, 1.08, 1); head.add(headMesh)

    // Face features
    // Eyes
    ;[-.15, .15].forEach((x, i) => {
      const eyeG = new THREE.Group(); eyeG.position.set(x, .07, .38); head.add(eyeG)
      const white = new THREE.Mesh(new THREE.SphereGeometry(.1, 12, 12), whiteMat)
      white.scale.set(1, .7, .6); eyeG.add(white)
      const iris = new THREE.Mesh(new THREE.SphereGeometry(.065, 12, 12), irisMat)
      iris.position.z = .05; eyeG.add(iris)
      const pupil = new THREE.Mesh(new THREE.SphereGeometry(.035, 8, 8), eyeMat)
      pupil.position.z = .1; eyeG.add(pupil)
      // Lashes
      const lash = new THREE.Mesh(new THREE.TorusGeometry(.1, .012, 4, 16, Math.PI),
        new THREE.MeshStandardMaterial({ color: 0x111111 }))
      lash.rotation.z = Math.PI; lash.position.y = .06; lash.position.z = .02; eyeG.add(lash)
    })

    // Nose
    const nose = new THREE.Mesh(new THREE.SphereGeometry(.05, 8, 8), skinMat)
    nose.scale.set(1, .7, 1.2); nose.position.set(0, -.06, .42); head.add(nose)

    // Mouth / smile
    const smile = new THREE.Mesh(new THREE.TorusGeometry(.1, .022, 6, 16, Math.PI),
      lipMat); smile.rotation.z = Math.PI
    smile.scale.set(1, .6, .8); smile.position.set(0, -.18, .4); head.add(smile)

    // Cheeks (blush)
    ;[-.22, .22].forEach(x => {
      const blush = new THREE.Mesh(new THREE.SphereGeometry(.07, 8, 8),
        new THREE.MeshStandardMaterial({ color: 0xff8899, transparent: true, opacity: .5, roughness: 1 }))
      blush.scale.set(1.2, .6, .4); blush.position.set(x, -.06, .38); head.add(blush)
    })

    // HAIR — stylish bob with highlights
    const hairBase = new THREE.Mesh(new THREE.SphereGeometry(.47, 20, 20), hairMat)
    hairBase.scale.set(1, 1.1, 1); hairBase.position.y = .06; head.add(hairBase)
    // Side bangs
    ;[-.38, .38].forEach((x, i) => {
      const bang = new THREE.Mesh(new THREE.CylinderGeometry(.08, .12, .55, 8), hairMat)
      bang.position.set(x, -.12, .2); bang.rotation.z = x > 0 ? .4 : -.4; head.add(bang)
    })
    // Top hair poof
    const poof = new THREE.Mesh(new THREE.SphereGeometry(.3, 12, 12), hairMat)
    poof.scale.set(1.3, .9, 1); poof.position.set(0, .36, -.05); head.add(poof)
    // Hair highlights
    const hlMat = new THREE.MeshStandardMaterial({ color: 0x553311, roughness: .6 })
    ;[-.1, .1].forEach(x => {
      const hl = new THREE.Mesh(new THREE.CylinderGeometry(.02, .02, .6, 4), hlMat)
      hl.position.set(x, .2, -.1); head.add(hl)
    })

    // PONYTAIL
    const ponytail = new THREE.Group(); ponytail.position.set(0, -.1, -.35); head.add(ponytail)
    const ptBase = new THREE.Mesh(new THREE.CylinderGeometry(.12, .06, .5, 8), hairMat)
    ptBase.rotation.x = .4; ponytail.add(ptBase)
    const ptEnd = new THREE.Mesh(new THREE.CylinderGeometry(.06, .01, .4, 8), hairMat)
    ptEnd.position.set(0, -.5, .15); ptEnd.rotation.x = .5; ponytail.add(ptEnd)
    // Ribbon
    const ribbon = new THREE.Mesh(new THREE.TorusGeometry(.1, .04, 6, 12), topMat)
    ribbon.position.y = .08; ponytail.add(ribbon)

    // NECK
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(.11, .13, .28, 10), skinMat)
    neck.position.y = 2.82; root.add(neck)

    // BODY
    const body = new THREE.Group(); root.add(body)

    // Torso — fitted top
    const torso = new THREE.Mesh(new THREE.CylinderGeometry(.3, .26, .75, 12), topMat)
    torso.position.y = 2.32; body.add(torso)
    // Top trim / star
    const starGeo = new THREE.CylinderGeometry(.06, .06, .04, 5)
    const star = new THREE.Mesh(starGeo, starMat); star.position.set(0, 2.62, .3); body.add(star)
    // Collar
    const collar = new THREE.Mesh(new THREE.TorusGeometry(.18, .035, 6, 16), whiteMat)
    collar.position.y = 2.68; collar.rotation.x = Math.PI/2; body.add(collar)
    // Shoulders
    ;[-1, 1].forEach(s => {
      const shoulder = new THREE.Mesh(new THREE.SphereGeometry(.18, 10, 10), topMat)
      shoulder.position.set(s * .38, 2.58, 0); body.add(shoulder)
    })

    // SKIRT — flared
    const skirt = new THREE.Mesh(new THREE.CylinderGeometry(.46, .62, .52, 14, 1, true), skirtMat)
    skirt.position.y = 1.8; body.add(skirt)
    // Skirt bottom trim
    const skirtTrim = new THREE.Mesh(new THREE.TorusGeometry(.56, .04, 6, 24), whiteMat)
    skirtTrim.position.y = 1.55; body.add(skirtTrim)

    // WAIST
    const waist = new THREE.Mesh(new THREE.CylinderGeometry(.26, .28, .22, 12), skinMat)
    waist.position.y = 1.96; body.add(waist)

    // LEGS
    const legGroup = new THREE.Group(); root.add(legGroup)
    ;[-1, 1].forEach(s => {
      const lg = new THREE.Group(); legGroup.add(lg)
      // Thigh
      const thigh = new THREE.Mesh(new THREE.CylinderGeometry(.1, .09, .55, 8), skinMat)
      thigh.position.set(s * .18, 1.28, 0); lg.add(thigh)
      // Knee
      const knee = new THREE.Mesh(new THREE.SphereGeometry(.1, 8, 8), skinMat)
      knee.position.set(s * .18, .98, 0); lg.add(knee)
      // Shin
      const shin = new THREE.Mesh(new THREE.CylinderGeometry(.085, .075, .5, 8), skinMat)
      shin.position.set(s * .18, .72, 0); lg.add(shin)
      // Sock
      const sock = new THREE.Mesh(new THREE.CylinderGeometry(.088, .08, .22, 8), socMat)
      sock.position.set(s * .18, .45, 0); lg.add(sock)
      // Shoe
      const shoe = new THREE.Mesh(new THREE.BoxGeometry(.14, .1, .26), shoeMat)
      shoe.position.set(s * .18, .33, .05); lg.add(shoe)
      // Shoe sole
      const sole = new THREE.Mesh(new THREE.BoxGeometry(.15, .04, .27),
        new THREE.MeshStandardMaterial({ color: 0xdddddd, roughness: .8 }))
      sole.position.set(s * .18, .27, .05); lg.add(sole)
    })

    // ARMS
    const armGroup = new THREE.Group(); root.add(armGroup)
    const armData = [
      { s: -1, label: 'L' },
      { s:  1, label: 'R' },
    ]
    const armParts = []
    armData.forEach(({ s }) => {
      const ag = new THREE.Group(); armGroup.add(ag)
      // Upper arm
      const ua = new THREE.Mesh(new THREE.CylinderGeometry(.085, .078, .48, 8), topMat)
      ua.position.set(s * .48, 2.38, 0); ag.add(ua)
      // Elbow
      const elb = new THREE.Mesh(new THREE.SphereGeometry(.09, 8, 8), skinMat)
      elb.position.set(s * .48, 2.12, 0); ag.add(elb)
      // Forearm group (rotates for dance)
      const fg = new THREE.Group(); fg.position.set(s * .48, 2.12, 0); ag.add(fg)
      const fa = new THREE.Mesh(new THREE.CylinderGeometry(.075, .065, .44, 8), skinMat)
      fa.position.y = -.22; fg.add(fa)
      // Hand
      const hand = new THREE.Mesh(new THREE.SphereGeometry(.085, 8, 8), skinMat)
      hand.position.y = -.48; fg.add(hand)

      // POMPOM
      const pompom = new THREE.Group(); pompom.position.y = -.62; fg.add(pompom)
      const pMat = s < 0 ? pompomR : pompomB
      for (let p = 0; p < 18; p++) {
        const theta = (p / 18) * Math.PI * 2
        const r = .08 + Math.random() * .04
        const h = .18 + Math.random() * .1
        const strip = new THREE.Mesh(new THREE.CylinderGeometry(.012, .008, h, 4), pMat)
        strip.position.set(Math.cos(theta) * r, h / 2, Math.sin(theta) * r)
        strip.rotation.x = (Math.random() - .5) * .8
        strip.rotation.z = (Math.random() - .5) * .6
        pompom.add(strip)
      }
      armParts.push({ fg, s, pompom, ag, ua })
    })

    // ── FLOOR REFLECTION ─────────────────────────────────────
    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(2.5, 32),
      new THREE.MeshStandardMaterial({ color: 0x110022, roughness: .1, metalness: .8, transparent: true, opacity: .5 })
    )
    floor.rotation.x = -Math.PI / 2; floor.position.y = .26; floor.receiveShadow = true
    scene.add(floor)

    // ── PARTICLE CONFETTI ─────────────────────────────────────
    const CONF_N = 120
    const confGeo = new THREE.BufferGeometry()
    const confPos = new Float32Array(CONF_N * 3)
    const confVel = []
    for (let i = 0; i < CONF_N; i++) {
      confPos[i*3]   = (Math.random() - .5) * 5
      confPos[i*3+1] = Math.random() * 5 + 2
      confPos[i*3+2] = (Math.random() - .5) * 3
      confVel.push({ vx: (Math.random() - .5) * .04, vy: -(Math.random() * .03 + .015), vz: (Math.random() - .5) * .02, rot: Math.random() * .1 })
    }
    confGeo.setAttribute('position', new THREE.BufferAttribute(confPos, 3))
    const confMat = new THREE.PointsMaterial({
      color: 0xffdd00, size: .08, transparent: true, opacity: .9, sizeAttenuation: true,
      vertexColors: false,
    })
    const confetti = new THREE.Points(confGeo, confMat)
    scene.add(confetti)

    onLoad?.()

    // ── ANIMATION ─────────────────────────────────────────────
    let t = 0, raf
    const animate = () => {
      raf = requestAnimationFrame(animate)
      t += .04

      if (dancing) {
        // Body bounce
        root.position.y = Math.abs(Math.sin(t * 2)) * .18
        root.rotation.y = Math.sin(t * 1.2) * .12

        // Hip sway
        legGroup.rotation.z = Math.sin(t * 2) * .08

        // Head bop
        head.rotation.z = Math.sin(t * 2) * .08
        head.rotation.x = Math.sin(t * 1.5) * .06

        // Arms wave — cheerleader style
        armParts.forEach(({ fg, s, ag, ua }) => {
          const phase = s > 0 ? 0 : Math.PI
          // Upper arm rotates out and up
          ua.rotation.z = s * (-.8 + Math.sin(t * 2 + phase) * .6)
          ua.rotation.x = Math.sin(t * 1.8 + phase) * .4
          // Forearm pumps
          fg.rotation.x = Math.sin(t * 3 + phase) * .7 - .3
          fg.rotation.z = Math.sin(t * 2 + phase) * .3
        })

        // Legs kick alternate
        ;[-1, 1].forEach((s, i) => {
          const lg = legGroup.children[i]
          if (lg) {
            lg.children.forEach(c => {
              if (c.position && Math.abs(c.position.y - 1.28) < .1) {
                // thigh kick
              }
            })
            lg.rotation.x = Math.sin(t * 2 + i * Math.PI) * .15
          }
        })

        // Skirt flare
        body.children.forEach(c => {
          if (c.geometry && c.geometry.parameters && c.geometry.parameters.radiusBottom > .5) {
            c.rotation.y = t * 2
          }
        })

        // Confetti falls
        const pos = confGeo.attributes.position.array
        for (let i = 0; i < CONF_N; i++) {
          const v = confVel[i]
          pos[i*3]   += v.vx + Math.sin(t + i) * .005
          pos[i*3+1] += v.vy
          pos[i*3+2] += v.vz
          if (pos[i*3+1] < .2) {
            pos[i*3]   = (Math.random() - .5) * 5
            pos[i*3+1] = 4
            pos[i*3+2] = (Math.random() - .5) * 3
          }
        }
        confGeo.attributes.position.needsUpdate = true
        confMat.color.setHSL((t * .5) % 1, 1, .6)

      } else {
        // Idle sway
        root.position.y = Math.sin(t * .8) * .04
        root.rotation.y = Math.sin(t * .4) * .05
        head.rotation.z = Math.sin(t * .6) * .04
        armParts.forEach(({ fg, s }) => {
          fg.rotation.x = Math.sin(t * .8 + (s > 0 ? 0 : Math.PI)) * .15
        })
      }

      // Rim lights pulse
      fill1.position.x = Math.sin(t * .5) * 3
      fill2.position.x = Math.cos(t * .4) * 3
      rimL.intensity = .8 + Math.sin(t * 2) * .4

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      renderer.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [dancing])

  return <div ref={ref} aria-hidden="true" role="presentation" style={{ width: '100%', height: '100%' }}/>
}

// ── MAIN CELEBRATION OVERLAY ──────────────────────────────────
export default function CelebrationScene({ phaseName, phaseEmoji, onDone }) {
  const [dancing, setDancing]   = useState(false)
  const [loaded,  setLoaded]    = useState(false)
  const [closing, setClosing]   = useState(false)
  const stopBeat = useRef(null)

  useEffect(() => {
    // Start dancing + music after 3D loads
    const t = setTimeout(() => {
      setDancing(true)
      stopBeat.current = createBeat(() => {})
    }, 600)
    return () => clearTimeout(t)
  }, [])

  const close = () => {
    setDancing(false)
    setClosing(true)
    if (stopBeat.current) stopBeat.current()
    setTimeout(onDone, 600)
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9500,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'radial-gradient(ellipse at center, rgba(20,4,40,.97) 0%, rgba(2,4,9,.99) 100%)',
      animation: closing ? 'collapse .6s ease both' : 'fadeIn .4s ease both',
    }}>
      {/* Stars bg */}
      {Array.from({length:30}).map((_,i) => (
        <div key={i} style={{
          position:'absolute',
          left: `${Math.random()*100}%`, top: `${Math.random()*100}%`,
          width: 2, height: 2, borderRadius:'50%',
          background: ['#22d3ee','#a78bfa','#fbbf24','#fb7185','#34d399'][i%5],
          animation: `pulseGlow ${1.5+Math.random()*2}s ease-in-out ${Math.random()*2}s infinite`,
          boxShadow: `0 0 4px currentColor`,
        }}/>
      ))}

      {/* Title */}
      <div style={{
        position: 'relative', zIndex: 2, textAlign: 'center', marginBottom: 8,
        animation: 'emerge .6s var(--ease) .2s both',
      }}>
        <div style={{ fontSize: 'clamp(28px,6vw,48px)', marginBottom: 8,
          animation: 'float 2s ease-in-out infinite' }}>
          {phaseEmoji || '🏆'}
        </div>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: 'clamp(16px,3.5vw,28px)', letterSpacing: -0.5,
          background: 'linear-gradient(135deg,#fbbf24,#fb7185,#a78bfa)',
          WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
          marginBottom: 6,
        }}>Phase Complete! 🎉</h2>
        <p style={{ fontFamily:'var(--font-mono)', fontSize:'clamp(10px,1.5vw,13px)',
          color:'rgba(255,255,255,.5)', letterSpacing: 1 }}>
          {phaseName}
        </p>
      </div>

      {/* 3D Cheerleader */}
      <div style={{
        width: 'min(320px, 80vw)', height: 'min(420px, 55vh)',
        position: 'relative', zIndex: 2,
        animation: 'emerge .8s var(--ease) .1s both',
        filter: dancing ? 'drop-shadow(0 0 30px rgba(255,45,120,.4))' : 'none',
        transition: 'filter .5s',
      }}>
        {!loaded && (
          <div style={{ position:'absolute',inset:0,display:'flex',alignItems:'center',
            justifyContent:'center',flexDirection:'column',gap:12 }}>
            <div className="spinner"/>
            <span style={{fontFamily:'var(--font-mono)',fontSize:10,color:'rgba(255,255,255,.4)',letterSpacing:1}}>
              Loading...
            </span>
          </div>
        )}
        <CheerleaderCanvas dancing={dancing} onLoad={() => setLoaded(true)}/>
      </div>

      {/* Message */}
      {dancing && (
        <div style={{
          position:'relative',zIndex:2,textAlign:'center',marginTop:8,
          animation:'fadeUp .5s ease .3s both',
        }}>
          <p style={{ fontFamily:'var(--font-body)',fontSize:'clamp(12px,2vw,15px)',
            color:'rgba(255,255,255,.6)', maxWidth:300, lineHeight:1.6 }}>
            Amazing work! Keep going — you're building your AI career! 💪
          </p>
        </div>
      )}

      {/* Close */}
      <button onClick={close} style={{
        position: 'relative', zIndex: 2, marginTop: 16,
        padding: 'clamp(9px,2vw,12px) clamp(20px,4vw,32px)',
        borderRadius: 12, cursor: 'pointer', fontWeight: 700,
        fontSize: 'clamp(12px,1.5vw,14px)',
        background: 'linear-gradient(135deg,#22d3ee,#a78bfa)',
        border: 'none', color: '#040818',
        fontFamily: 'var(--font-display)', letterSpacing: .3,
        boxShadow: '0 4px 20px rgba(34,211,238,.4)',
        animation: 'emerge .6s ease .8s both',
        minHeight: 44,
      }}>
        Continue Learning →
      </button>
    </div>
  )
}
