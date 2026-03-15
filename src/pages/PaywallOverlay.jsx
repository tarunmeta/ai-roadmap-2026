export default function PaywallOverlay({ phase, onUpgrade }) {
  return (
    <div style={{
      display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',
      minHeight:320,padding:40,textAlign:'center',
      background:'var(--bg-surface)',border:'1px solid var(--border)',borderRadius:'var(--r3)',
      position:'relative',overflow:'hidden',
      animation:'fadeUp .4s ease both',
    }}>
      <div style={{position:'absolute',top:0,left:0,right:0,height:2,
        background:`linear-gradient(90deg,transparent,${phase?.color||'var(--cyan)'},transparent)`,
        opacity:.6}}/>
      <div style={{position:'absolute',top:-60,left:'50%',transform:'translateX(-50%)',
        width:200,height:200,borderRadius:'50%',
        background:`radial-gradient(circle,${(phase?.color||'#22d3ee')}15,transparent 70%)`,
        pointerEvents:'none'}}/>

      <div style={{fontSize:40,marginBottom:16,filter:'grayscale(1)',opacity:.4}}>
        {phase?.emoji||'⬡'}
      </div>
      <div style={{fontFamily:'var(--font-display)',fontSize:10,color:'var(--t3)',
        letterSpacing:3,textTransform:'uppercase',marginBottom:8}}>
        // ACCESS DENIED
      </div>
      <h2 style={{fontFamily:'var(--font-display)',fontSize:'clamp(16px,3vw,22px)',fontWeight:800,
        color:'var(--t1)',letterSpacing:1,marginBottom:8}}>
        {phase?.name||'PRO CONTENT'}
      </h2>
      <p style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--t2)',
        maxWidth:340,lineHeight:1.7,marginBottom:24,letterSpacing:.3}}>
        This content requires OPERATIVE or ARCHITECT tier.<br/>
        Upgrade to unlock all 6 phases and 300+ topics.
      </p>
      <button onClick={onUpgrade} className="btn btn-acid"
        style={{padding:'11px 28px',fontSize:10,letterSpacing:2.5}}>
        ⚡ UPGRADE ACCESS
      </button>
      <div style={{marginTop:14,fontFamily:'var(--font-mono)',fontSize:8,color:'var(--t3)',letterSpacing:1}}>
        ₹200/mo or ₹999 lifetime · UPI: tarunsaini89689-1@okaxis
      </div>
    </div>
  )
}
