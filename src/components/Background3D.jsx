import { useEffect, useRef } from 'react'

export default function Background3D() {
  const c = useRef(null)
  useEffect(() => {
    const cv = c.current; if (!cv) return
    const ctx = cv.getContext('2d')
    let W, H, raf
    const setup = () => { W = cv.width = window.innerWidth; H = cv.height = window.innerHeight }
    setup(); window.addEventListener('resize', setup)
    const N = Math.min(55, Math.floor(W / 24))
    const pts = Array.from({ length: N }, () => ({
      x: Math.random()*W, y: Math.random()*H, z: Math.random()*500+100,
      vx: (Math.random()-.5)*.25, vy: (Math.random()-.5)*.2,
      r: Math.random()*1.2+.3,
      col: ['#22d3ee','#a78bfa','#34d399'][Math.floor(Math.random()*3)],
      al: Math.random()*.3+.05, t: Math.random()*Math.PI*2
    }))
    const render = () => {
      ctx.clearRect(0, 0, W, H)
      // subtle grid
      ctx.save(); ctx.strokeStyle = 'rgba(34,211,238,.02)'; ctx.lineWidth = .5
      for (let x = 0; x < W; x += 100) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke() }
      for (let y = 0; y < H; y += 100) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke() }
      ctx.restore()
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.t += .01
        if(p.x<-10)p.x=W+10; if(p.x>W+10)p.x=-10
        if(p.y<-10)p.y=H+10; if(p.y>H+10)p.y=-10
        const s = 300/(300+p.z), px = W/2+(p.x-W/2)*s, py = H/2+(p.y-H/2)*s
        const pr = Math.max(.15, p.r*s)
        const al = p.al*(1-p.z/580)*(.3+.5*Math.abs(Math.sin(p.t)))
        if(pr<.1||al<.01) return
        ctx.save(); ctx.globalAlpha=Math.min(al,.35)
        ctx.shadowBlur=pr*5; ctx.shadowColor=p.col
        ctx.fillStyle=p.col; ctx.beginPath()
        ctx.arc(px,py,pr,0,Math.PI*2); ctx.fill(); ctx.restore()
        p._px=px; p._py=py
      })
      for(let i=0;i<pts.length;i++){
        const a=pts[i]; if(!a._px) continue
        for(let j=i+1;j<pts.length;j++){
          const b=pts[j]; if(!b._px) continue
          const d=Math.hypot(a._px-b._px,a._py-b._py)
          if(d<90){
            ctx.save(); ctx.globalAlpha=(1-d/90)*.05
            ctx.strokeStyle='rgba(34,211,238,1)'; ctx.lineWidth=.4
            ctx.beginPath(); ctx.moveTo(a._px,a._py); ctx.lineTo(b._px,b._py); ctx.stroke(); ctx.restore()
          }
        }
      }
      raf = requestAnimationFrame(render)
    }
    render()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', setup) }
  }, [])
  return <canvas ref={c} aria-hidden="true" style={{ position:'fixed',inset:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:0,opacity:.5 }}/>
}
