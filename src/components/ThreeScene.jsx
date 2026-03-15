import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/* ══════════════════════════════════════════════════════
   NEURAL PROTOCOL — Three.js 3D Scene
   Floating AI Brain + Neural Nodes + Data Particles
══════════════════════════════════════════════════════ */

export default function ThreeScene({ style }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const W = mount.clientWidth || 600
    const H = mount.clientHeight || 400

    // ── SCENE SETUP ──────────────────────────────────────
    const scene    = new THREE.Scene()
    const camera   = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)
    camera.position.set(0, 0, 5)

    // ── MATERIALS ─────────────────────────────────────────
    const cyanMat = new THREE.MeshStandardMaterial({
      color: 0x22d3ee, emissive: 0x0e6b7a, roughness: .3, metalness: .8,
      transparent: true, opacity: .9,
    })
    const violetMat = new THREE.MeshStandardMaterial({
      color: 0xa78bfa, emissive: 0x4c2a9c, roughness: .3, metalness: .8,
      transparent: true, opacity: .85,
    })
    const greenMat = new THREE.MeshStandardMaterial({
      color: 0x34d399, emissive: 0x0a5c3e, roughness: .4, metalness: .6,
      transparent: true, opacity: .85,
    })
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee, wireframe: true, transparent: true, opacity: .12,
    })

    // ── LIGHTS ────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, .3))
    const light1 = new THREE.PointLight(0x22d3ee, 3, 12)
    light1.position.set(3, 3, 3); scene.add(light1)
    const light2 = new THREE.PointLight(0xa78bfa, 2.5, 10)
    light2.position.set(-3, -2, 2); scene.add(light2)
    const light3 = new THREE.PointLight(0x34d399, 2, 8)
    light3.position.set(0, -3, -2); scene.add(light3)

    // ── CENTRAL BRAIN SPHERE ──────────────────────────────
    const brainGeo  = new THREE.IcosahedronGeometry(1.2, 3)
    const brain     = new THREE.Mesh(brainGeo, cyanMat)
    scene.add(brain)

    // Wireframe overlay on brain
    const brainWire = new THREE.Mesh(new THREE.IcosahedronGeometry(1.22, 3), wireMat)
    scene.add(brainWire)

    // Inner glowing core
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: .25 })
    const core    = new THREE.Mesh(new THREE.SphereGeometry(.6, 16, 16), coreMat)
    scene.add(core)

    // ── ORBITAL RINGS ─────────────────────────────────────
    const rings = []
    const ringDefs = [
      { r: 1.8, tube: .018, col: 0x22d3ee, tilt: [.4, 0, 0] },
      { r: 2.1, tube: .014, col: 0xa78bfa, tilt: [0, .6, .3] },
      { r: 2.5, tube: .012, col: 0x34d399, tilt: [.8, .2, 0] },
    ]
    ringDefs.forEach(({ r, tube, col, tilt }) => {
      const geo  = new THREE.TorusGeometry(r, tube, 16, 120)
      const mat  = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: .6 })
      const ring = new THREE.Mesh(geo, mat)
      ring.rotation.x = tilt[0]; ring.rotation.y = tilt[1]; ring.rotation.z = tilt[2]
      scene.add(ring)
      rings.push(ring)
    })

    // ── SATELLITE NODES ───────────────────────────────────
    const nodes = []
    const nodeDefs = [
      { pos: [2.2, .8, .5],   size: .18, mat: cyanMat,   label: 'ML' },
      { pos: [-2.1, .5, .3],  size: .15, mat: violetMat, label: 'DL' },
      { pos: [1.5, -1.8, .4], size: .16, mat: greenMat,  label: 'LLM' },
      { pos: [-1.8, -1.2, .5],size: .14, mat: cyanMat,   label: 'CV' },
      { pos: [.5, 2.2, .3],   size: .17, mat: violetMat, label: 'NLP' },
      { pos: [-1, 1.9, .6],   size: .13, mat: greenMat,  label: 'RL' },
    ]
    nodeDefs.forEach(({ pos, size, mat }) => {
      const geo  = new THREE.OctahedronGeometry(size, 0)
      const node = new THREE.Mesh(geo, mat)
      node.position.set(...pos)
      node.userData = { basePos: [...pos], phase: Math.random() * Math.PI * 2 }
      scene.add(node)
      nodes.push(node)
    })

    // ── CONNECTION LINES (brain → nodes) ──────────────────
    const lines = []
    nodes.forEach(node => {
      const pts = [new THREE.Vector3(0, 0, 0), node.position.clone()]
      const geo  = new THREE.BufferGeometry().setFromPoints(pts)
      const mat2 = new THREE.LineBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: .15 })
      const line = new THREE.Line(geo, mat2)
      scene.add(line)
      lines.push({ line, node })
    })

    // ── DATA PARTICLE FIELD ───────────────────────────────
    const PCOUNT = 280
    const pGeo   = new THREE.BufferGeometry()
    const pPos   = new Float32Array(PCOUNT * 3)
    const pVel   = []
    for (let i = 0; i < PCOUNT; i++) {
      const r = 2.8 + Math.random() * 2.2
      const phi   = Math.random() * Math.PI * 2
      const theta = Math.acos(2 * Math.random() - 1)
      pPos[i*3]   = r * Math.sin(theta) * Math.cos(phi)
      pPos[i*3+1] = r * Math.sin(theta) * Math.sin(phi)
      pPos[i*3+2] = r * Math.cos(theta)
      pVel.push({
        phi: Math.random() * .005 + .002,
        theta: (Math.random() - .5) * .003,
        r: 2.8 + Math.random() * 2.2,
        p: phi, t: theta,
      })
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    const pMat = new THREE.PointsMaterial({
      color: 0x22d3ee, size: .022, transparent: true, opacity: .55,
      sizeAttenuation: true,
    })
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)

    // ── HEXAGONAL GRID PLANE (floor) ──────────────────────
    const gridHelper = new THREE.GridHelper(12, 20, 0x0e4a5c, 0x0a2535)
    gridHelper.position.y = -3
    gridHelper.material.transparent = true
    gridHelper.material.opacity = .35
    scene.add(gridHelper)

    // ── MOUSE TRACKING ────────────────────────────────────
    let mx = 0, my = 0
    const onMouse = e => {
      const rect = mount.getBoundingClientRect()
      mx = ((e.clientX - rect.left) / rect.width  - .5) * 2
      my = ((e.clientY - rect.top)  / rect.height - .5) * -2
    }
    mount.addEventListener('mousemove', onMouse)

    // ── RESIZE ────────────────────────────────────────────
    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    // ── ANIMATION LOOP ────────────────────────────────────
    let t = 0, raf
    const animate = () => {
      raf = requestAnimationFrame(animate)
      t += .012

      // Brain breathing + rotation
      brain.rotation.y = t * .18 + mx * .3
      brain.rotation.x = Math.sin(t * .3) * .08 + my * .2
      brain.scale.setScalar(1 + Math.sin(t * .8) * .025)
      brainWire.rotation.copy(brain.rotation)
      brainWire.scale.copy(brain.scale)
      core.scale.setScalar(.85 + Math.sin(t * 1.2) * .15)

      // Orbital rings
      rings[0].rotation.z += .008
      rings[1].rotation.x += .005; rings[1].rotation.z -= .004
      rings[2].rotation.y += .006; rings[2].rotation.x += .003

      // Nodes — orbit + bob
      nodes.forEach((node, i) => {
        const { basePos, phase } = node.userData
        const a = t * .25 + phase
        node.position.x = basePos[0] * Math.cos(a * .3) - basePos[2] * Math.sin(a * .3)
        node.position.z = basePos[0] * Math.sin(a * .3) + basePos[2] * Math.cos(a * .3)
        node.position.y = basePos[1] + Math.sin(t + phase) * .12
        node.rotation.x += .02; node.rotation.y += .015

        // Update connection lines
        const pts = [new THREE.Vector3(0, 0, 0), node.position.clone()]
        lines[i].line.geometry.setFromPoints(pts)
        lines[i].line.geometry.computeBoundingSphere()
      })

      // Particles orbit
      const pos = pGeo.attributes.position.array
      pVel.forEach((v, i) => {
        v.p += v.phi; v.t += v.theta
        pos[i*3]   = v.r * Math.sin(v.t) * Math.cos(v.p)
        pos[i*3+1] = v.r * Math.sin(v.t) * Math.sin(v.p)
        pos[i*3+2] = v.r * Math.cos(v.t)
      })
      pGeo.attributes.position.needsUpdate = true

      // Camera follows mouse gently
      camera.position.x += (mx * .6 - camera.position.x) * .04
      camera.position.y += (my * .4 - camera.position.y) * .04
      camera.lookAt(0, 0, 0)

      // Animate lights
      light1.position.x = Math.sin(t * .5) * 3
      light1.position.y = Math.cos(t * .4) * 2
      light2.position.x = Math.cos(t * .3) * -3
      light2.position.y = Math.sin(t * .6) * -2

      renderer.render(scene, camera)
    }
    animate()

    // ── CLEANUP ───────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      mount.removeEventListener('mousemove', onMouse)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} aria-hidden="true" role="presentation" style={{ width: '100%', height: '100%', ...style }}/>
}
