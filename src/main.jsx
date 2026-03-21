import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// ── ERROR BOUNDARY ─────────────────────────────────────────
class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { err: null, info: null } }
  static getDerivedStateFromError(err) { return { err } }
  componentDidCatch(err, info) { console.error('App crash:', err.message, info.componentStack) }
  render() {
    if (!this.state.err) return this.props.children
    const comp = this.state.info?.componentStack?.split('\n')?.find(l => l.trim())?.trim() || ''
    return (
      <div role="alert" aria-live="assertive" style={{
        minHeight:'100dvh',display:'flex',flexDirection:'column',
        alignItems:'center',justifyContent:'center',gap:16,padding:24,
        background:'#020409',color:'#22d3ee',fontFamily:'JetBrains Mono,monospace',
      }}>
        <div style={{fontSize:28}} aria-hidden="true">⬡</div>
        <h1 style={{fontSize:14,letterSpacing:2,textTransform:'uppercase',color:'#fb7185'}}>
          Application Error
        </h1>
        <div style={{
          background:'rgba(251,113,133,.07)',border:'1px solid rgba(251,113,133,.2)',
          borderRadius:8,padding:'12px 18px',maxWidth:480,width:'100%',
        }}>
          <p style={{fontSize:11,color:'#fb7185',marginBottom:6}}>{this.state.err?.message}</p>
          {comp && <p style={{fontSize:9,color:'rgba(251,113,133,.4)',fontFamily:'monospace'}}>{comp}</p>}
        </div>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding:'10px 28px',borderRadius:8,cursor:'pointer',fontWeight:600,
            background:'rgba(34,211,238,.1)',border:'1px solid rgba(34,211,238,.4)',
            color:'#22d3ee',fontFamily:'inherit',fontSize:11,letterSpacing:2,
            textTransform:'uppercase',marginTop:8,
          }}>
          Reload Application
        </button>
      </div>
    )
  }
}

// ── APPLY SAVED THEME BEFORE RENDER (prevent flash) ────────
const savedTheme = localStorage.getItem('np-theme') ||
  (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
document.documentElement.setAttribute('data-theme', savedTheme)

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
)
