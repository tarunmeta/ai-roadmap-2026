import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/* ── Per-phase 3D orb shown on phase cards ── */
export default function PhaseOrb({ color = '#22d3ee', size = 80 }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const W = size, H = size

    const scene    = new THREE.Scene()
    const camera   = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)
    camera.position.z = 2.8

    // Parse color
    const c = new THREE.Color(color)

    // Main orb
    const mat = new THREE.MeshStandardMaterial({
      color: c, emissive: c.clone().multiplyScalar(.3),
      roughness: .2, metalness: .9, transparent: true, opacity: .92,
    })
    const orb = new THREE.Mesh(new THREE.IcosahedronGeometry(.9, 2), mat)
    scene.add(orb)

    // Wire overlay
    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(.92, 2),
      new THREE.MeshBasicMaterial({ color: c, wireframe: true, transparent: true, opacity: .18 })
    )
    scene.add(wire)

    // Ring
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.2, .025, 8, 60),
      new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: .5 })
    )
    ring.rotation.x = .6
    scene.add(ring)

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, .4))
    const pl = new THREE.PointLight(c.getHex(), 4, 8)
    pl.position.set(2, 2, 2); scene.add(pl)

    let t = 0, raf
    const animate = () => {
      raf = requestAnimationFrame(animate)
      t += .018
      orb.rotation.y = t * .6; orb.rotation.x = Math.sin(t * .4) * .15
      wire.rotation.copy(orb.rotation)
      ring.rotation.z += .01
      pl.position.x = Math.sin(t) * 2; pl.position.y = Math.cos(t * .7) * 2
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf); renderer.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [color, size])

  return <div ref={ref} aria-hidden="true" role="presentation" style={{ width: size, height: size, flexShrink: 0 }}/>
}
