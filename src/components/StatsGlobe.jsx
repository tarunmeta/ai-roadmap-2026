import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/* ── Rotating progress globe for the stats section ── */
export default function StatsGlobe({ pct = 0, size = 200 }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current; if (!el) return

    const scene    = new THREE.Scene()
    const camera   = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(size, size)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)
    camera.position.z = 3.5

    scene.add(new THREE.AmbientLight(0xffffff, .5))
    const pl1 = new THREE.PointLight(0x22d3ee, 3, 10); pl1.position.set(3, 2, 3); scene.add(pl1)
    const pl2 = new THREE.PointLight(0xa78bfa, 2, 8);  pl2.position.set(-3,-2, 2); scene.add(pl2)

    // Base sphere (unfilled)
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x0e1628, roughness: .8, metalness: .1,
      transparent: true, opacity: .7,
    })
    scene.add(new THREE.Mesh(new THREE.SphereGeometry(1.1, 32, 32), baseMat))

    // Wire grid
    const wireMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee, wireframe: true, transparent: true, opacity: .08 })
    scene.add(new THREE.Mesh(new THREE.SphereGeometry(1.12, 16, 16), wireMat))

    // Progress arc (torus slices)
    const fillRings = Math.floor(pct / 10)
    for (let i = 0; i < 10; i++) {
      const filled = i < fillRings || (i === fillRings && (pct % 10) > 3)
      const c    = filled ? new THREE.Color(0x22d3ee) : new THREE.Color(0x1a2535)
      const mat  = new THREE.MeshStandardMaterial({
        color: c, emissive: filled ? c.clone().multiplyScalar(.4) : new THREE.Color(0),
        roughness: .3, metalness: .7, transparent: true, opacity: filled ? .9 : .3,
      })
      const phi = (i / 10) * Math.PI * 2
      const ring = new THREE.Mesh(new THREE.TorusGeometry(1.25 + i * .035, .03, 8, 60), mat)
      ring.rotation.x = phi * .3
      ring.rotation.y = phi * .2
      scene.add(ring)
    }

    // Central pct text as floating sphere
    const pctSphere = new THREE.Mesh(
      new THREE.SphereGeometry(.45, 16, 16),
      new THREE.MeshStandardMaterial({
        color: 0x22d3ee, emissive: 0x0a3d4a, roughness: .1, metalness: .9,
        transparent: true, opacity: .85,
      })
    )
    scene.add(pctSphere)

    // Orbiting particles
    const N = 60
    const pGeo = new THREE.BufferGeometry()
    const pArr = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      const r = 1.6 + Math.random() * .4
      const a = (i / N) * Math.PI * 2
      pArr[i*3]   = r * Math.cos(a)
      pArr[i*3+1] = (Math.random() - .5) * 1.2
      pArr[i*3+2] = r * Math.sin(a)
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pArr, 3))
    scene.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0xa78bfa, size: .03, transparent: true, opacity: .6 })))

    let t = 0, raf
    const animate = () => {
      raf = requestAnimationFrame(animate)
      t += .012
      scene.rotation.y = t * .25
      pctSphere.scale.setScalar(.9 + Math.sin(t * 1.5) * .08)
      pl1.position.x = Math.sin(t * .7) * 3
      pl1.position.y = Math.cos(t * .5) * 2
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf); renderer.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [pct, size])

  return <div ref={ref} aria-hidden="true" role="presentation" style={{ width: size, height: size }}/>
}
