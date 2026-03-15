import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/* Tiny 3D orb for inline use — very lightweight */
export default function MiniOrb({ color='#22d3ee', size=44 }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const scene = new THREE.Scene()
    const cam   = new THREE.PerspectiveCamera(50, 1, 0.1, 10)
    const rdr   = new THREE.WebGLRenderer({ antialias:true, alpha:true })
    rdr.setSize(size, size)
    rdr.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    rdr.setClearColor(0,0)
    el.appendChild(rdr.domElement)
    cam.position.z = 2.6
    const c = new THREE.Color(color)
    scene.add(new THREE.AmbientLight(0xffffff, .5))
    const pl = new THREE.PointLight(c.getHex(), 5, 8); pl.position.set(2,2,2); scene.add(pl)
    const mesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(.85, 1),
      new THREE.MeshStandardMaterial({ color:c, emissive:c.clone().multiplyScalar(.3), roughness:.2, metalness:.9 })
    )
    scene.add(mesh)
    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(.87, 1),
      new THREE.MeshBasicMaterial({ color:c, wireframe:true, transparent:true, opacity:.15 })
    )
    scene.add(wire)
    let t=0, raf
    const go = () => {
      raf=requestAnimationFrame(go); t+=.02
      mesh.rotation.y=t*.5; mesh.rotation.x=Math.sin(t*.3)*.12
      wire.rotation.copy(mesh.rotation)
      pl.position.x=Math.sin(t)*.2; pl.position.y=Math.cos(t*.7)*.2
      rdr.render(scene, cam)
    }
    go()
    return () => { cancelAnimationFrame(raf); rdr.dispose(); if(el.contains(rdr.domElement))el.removeChild(rdr.domElement) }
  }, [color, size])
  return <div ref={ref} aria-hidden="true" role="presentation" style={{ width:size, height:size, flexShrink:0 }}/>
}
