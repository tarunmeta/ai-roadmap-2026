import { PLANS } from '../hooks/useSubscription.js'

export default function PaywallOverlay({ phase, onUpgrade }) {
  return (
    <div style={{
      position:'relative', borderRadius:16, overflow:'hidden',
      border:'1px solid #1a1d2e', minHeight:320,
    }}>
      {/* blurred preview */}
      <div style={{filter:'blur(6px)',opacity:.35,padding:20,pointerEvents:'none',userSelect:'none'}}>
        <div style={{height:18,background:'#1a1d2e',borderRadius:6,marginBottom:10,width:'70%'}}/>
        <div style={{height:14,background:'#1a1d2e',borderRadius:6,marginBottom:8,width:'90%'}}/>
        <div style={{height:14,background:'#1a1d2e',borderRadius:6,marginBottom:8,width:'60%'}}/>
        <div style={{height:14,background:'#1a1d2e',borderRadius:6,marginBottom:8,width:'80%'}}/>
        <div style={{height:14,background:'#1a1d2e',borderRadius:6,marginBottom:8,width:'50%'}}/>
        <div style={{height:14,background:'#1a1d2e',borderRadius:6,marginBottom:8,width:'75%'}}/>
        <div style={{height:14,background:'#1a1d2e',borderRadius:6,marginBottom:8,width:'65%'}}/>
      </div>

      {/* overlay */}
      <div style={{
        position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',
        background:'linear-gradient(to bottom, rgba(5,5,8,.4) 0%, rgba(5,5,8,.96) 40%)',
        padding:24,
      }}>
        <div style={{textAlign:'center',maxWidth:380}} className="pop-in">
          {/* Lock icon */}
          <div style={{
            width:60,height:60,borderRadius:18,margin:'0 auto 16px',
            background:'linear-gradient(135deg,rgba(99,102,241,.2),rgba(168,85,247,.15))',
            border:'1px solid rgba(99,102,241,.3)',
            display:'flex',alignItems:'center',justifyContent:'center',fontSize:26,
            boxShadow:'0 8px 32px rgba(99,102,241,.2)',
          }}>🔒</div>

          <div style={{fontSize:11,color:phase.color,fontWeight:700,letterSpacing:'1.5px',
            textTransform:'uppercase',marginBottom:8}}>
            Phase {phase.id} — {phase.name}
          </div>

          <h3 style={{fontSize:20,fontWeight:800,letterSpacing:'-.02em',marginBottom:10,
            background:'linear-gradient(135deg,#e8eaf2,#818cf8)',
            WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
            Unlock all 10 Phases
          </h3>

          <p style={{color:'#8b90b0',fontSize:13,lineHeight:1.65,marginBottom:20}}>
            This phase is part of <strong style={{color:'#e8eaf2'}}>AI Roadmap Pro</strong>.
            Get full access to all 9 remaining phases, the AI Chat Tutor, and your productivity dashboard.
          </p>

          {/* Mini pricing */}
          <div style={{display:'flex',gap:10,marginBottom:20,justifyContent:'center'}}>
            <div style={{padding:'10px 16px',borderRadius:10,border:'1px solid #1a1d2e',background:'#0d0f1a',textAlign:'center'}}>
              <div style={{fontSize:15,fontWeight:800,color:'#6366f1'}}>₹200<span style={{fontSize:11,fontWeight:400,color:'#8b90b0'}}>/mo</span></div>
              <div style={{fontSize:10,color:'#454869',marginTop:2}}>Monthly</div>
            </div>
            <div style={{padding:'10px 16px',borderRadius:10,
              border:'1.5px solid rgba(245,158,11,.4)',
              background:'linear-gradient(135deg,rgba(245,158,11,.1),rgba(251,146,60,.06))',
              textAlign:'center',position:'relative'}}>
              <div style={{position:'absolute',top:-10,left:'50%',transform:'translateX(-50%)',
                background:'linear-gradient(90deg,#f59e0b,#fb923c)',color:'#000',
                fontSize:8,fontWeight:900,padding:'2px 8px',borderRadius:99,whiteSpace:'nowrap'}}>
                BEST VALUE
              </div>
              <div style={{fontSize:15,fontWeight:800,color:'#f59e0b'}}>₹2,999</div>
              <div style={{fontSize:10,color:'#454869',marginTop:2}}>Lifetime</div>
            </div>
          </div>

          <button onClick={onUpgrade}
            style={{
              width:'100%', padding:'14px', borderRadius:12, border:'none', cursor:'pointer',
              background:'linear-gradient(135deg,#6366f1,#a855f7)', color:'#fff',
              fontSize:14, fontWeight:700, marginBottom:10,
              boxShadow:'0 8px 32px rgba(99,102,241,.4)',
              transition:'all .2s', letterSpacing:'-.01em',
            }}
            onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
            onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
            🚀 Unlock Pro Access →
          </button>

          <div style={{fontSize:11,color:'#454869'}}>
            ↩ 7-day refund · 🔒 Secured by Razorpay · 📱 UPI accepted
          </div>
        </div>
      </div>
    </div>
  )
}
