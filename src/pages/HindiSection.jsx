import { useState } from 'react'
import { HINDI_RESOURCES, HINDI_CHANNELS } from '../data/hindiResources.js'

const LEVEL_COLOR = { beginner:'#34d399', intermediate:'#f59e0b', advanced:'#ef4444' }
const LEVEL_LABEL = { beginner:'शुरुआती', intermediate:'मध्यम', advanced:'उन्नत' }

// Click → opens YouTube in new tab
function VideoCard({ video }) {
  const thumb = `https://img.youtube.com/vi/${video.vid}/mqdefault.jpg`
  const ytUrl  = `https://www.youtube.com/watch?v=${video.vid}`
  const lc = LEVEL_COLOR[video.level] || 'var(--cyan)'

  return (
    <a href={ytUrl} target="_blank" rel="noreferrer"
      style={{ display:'block', borderRadius:14, overflow:'hidden', textDecoration:'none',
        border:'1px solid #1a1d2e', background:'#0a0b10',
        transition:'all .2s cubic-bezier(.16,1,.3,1)', cursor:'pointer' }}
      onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.borderColor=lc+'55'; e.currentTarget.style.boxShadow=`0 12px 32px rgba(0,0,0,.5)` }}
      onMouseLeave={e=>{ e.currentTarget.style.transform='translateY(0)';   e.currentTarget.style.borderColor='var(--border)';   e.currentTarget.style.boxShadow='none' }}>

      {/* Thumbnail */}
      <div style={{ position:'relative', paddingBottom:'56.25%', background:'#050508', overflow:'hidden' }}>
        <img src={thumb} alt={video.title}
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:.9 }}
          onError={e=>{ e.target.style.display='none' }}/>

        {/* Big YouTube play button overlay */}
        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center',
          background:'rgba(0,0,0,.25)', transition:'background .2s' }}>
          <div style={{ width:54, height:54, borderRadius:'50%', background:'#ff0000',
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:'0 4px 20px rgba(255,0,0,.5)', transition:'transform .2s' }}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="white" style={{ marginLeft:3 }}>
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>

        {/* Badges */}
        <div style={{ position:'absolute', top:8, left:8, padding:'3px 8px', borderRadius:99,
          background:`${lc}dd`, fontSize:9, fontWeight:800, color:'#fff', letterSpacing:'.5px' }}>
          {LEVEL_LABEL[video.level]}
        </div>
        <div style={{ position:'absolute', top:8, right:8, padding:'3px 8px', borderRadius:99,
          background:'rgba(0,0,0,.8)', fontSize:10, fontWeight:700, color:'#fff', backdropFilter:'blur(4px)' }}>
          {video.dur}
        </div>

        {/* YouTube logo bottom-right */}
        <div style={{ position:'absolute', bottom:8, right:8, padding:'2px 6px', borderRadius:4,
          background:'#ff0000', fontSize:9, fontWeight:800, color:'#fff', letterSpacing:.5 }}>
          ▶ YouTube
        </div>
      </div>

      {/* Info */}
      <div style={{ padding:'10px 12px' }}>
        <div style={{ fontSize:12, fontWeight:700, color:'#e8eaf2', lineHeight:1.45, marginBottom:6 }}>{video.title}</div>
        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
          <div style={{ width:6, height:6, borderRadius:'50%', background:lc, flexShrink:0 }}/>
          <span style={{ fontSize:10, color:'var(--cyan)', fontWeight:700 }}>{video.channel}</span>
          <span style={{ fontSize:9, color:'#3d4166', marginLeft:'auto' }}>↗ Open</span>
        </div>
      </div>
    </a>
  )
}

export default function HindiSection({ phases }) {
  const [selTag,   setSelTag]   = useState('ML')
  const [searchQ,  setSearchQ]  = useState('')
  const [activeTab,setActiveTab]= useState('videos')

  const allTags = Object.keys(HINDI_RESOURCES)
  const videos  = HINDI_RESOURCES[selTag] || []

  const searchResults = searchQ.length > 1
    ? Object.entries(HINDI_RESOURCES).flatMap(([tag, vids]) =>
        vids.filter(v =>
          v.title.toLowerCase().includes(searchQ.toLowerCase()) ||
          v.channel.toLowerCase().includes(searchQ.toLowerCase()) ||
          tag.toLowerCase().includes(searchQ.toLowerCase())
        ).map(v => ({ ...v, tag }))
      )
    : []

  return (
    <div style={{ padding:'0 0 40px' }}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {/* Header */}
      <div style={{ padding:'20px 20px 0', marginBottom:16 }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:14 }}>
          <div style={{ width:44, height:44, borderRadius:13,
            background:'linear-gradient(135deg,#ff0000,#ff6b35)',
            display:'flex', alignItems:'center', justifyContent:'center', fontSize:22,
            boxShadow:'0 6px 20px rgba(255,0,0,.35)' }}>🇮🇳</div>
          <div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:900, letterSpacing:'-.02em' }}>
              हिंदी में सीखें
            </div>
            <div style={{ fontSize:12, color:'var(--t3)' }}>
              Best Hindi videos per topic — click to open on YouTube
            </div>
          </div>
          <div style={{ marginLeft:'auto', padding:'5px 12px', borderRadius:99,
            background:'rgba(255,0,0,.1)', border:'1px solid rgba(255,0,0,.25)',
            fontSize:11, fontWeight:800, color:'#ff4444', flexShrink:0 }}>
            ▶ YouTube
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display:'flex', gap:6 }}>
          {[['🎥','Videos','videos'],['📚','Channels','channels'],['🔍','Search','search']].map(([ic,lb,v])=>(
            <button key={v} onClick={()=>setActiveTab(v)}
              style={{ padding:'7px 14px', borderRadius:9,
                border:`1px solid ${activeTab===v?'rgba(255,68,68,.4)':'var(--border)'}`,
                background:activeTab===v?'rgba(255,68,68,.1)':'transparent',
                color:activeTab===v?'#ff6666':'var(--t3)', fontSize:12, fontWeight:700,
                cursor:'pointer', transition:'all .18s' }}>
              {ic} {lb}
            </button>
          ))}
        </div>
      </div>

      {/* VIDEOS TAB */}
      {activeTab==='videos' && (
        <div style={{ padding:'0 20px' }}>
          {/* Tag selector */}
          <div style={{ display:'flex', gap:6, overflowX:'auto', scrollbarWidth:'none', marginBottom:16, paddingBottom:2 }}>
            {allTags.map(tag=>(
              <button key={tag} onClick={()=>setSelTag(tag)}
                style={{ padding:'6px 14px', borderRadius:99, flexShrink:0, cursor:'pointer',
                  border:`1px solid ${selTag===tag?'rgba(255,68,68,.5)':'var(--border)'}`,
                  background:selTag===tag?'rgba(255,68,68,.1)':'transparent',
                  color:selTag===tag?'#ff6666':'var(--t3)',
                  fontSize:11, fontWeight:700, transition:'all .15s' }}>
                {tag}
              </button>
            ))}
          </div>

          {/* Video grid */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:12 }}>
            {videos.map((v,i)=>(
              <div key={i} style={{ animation:`fadeUp ${.06*i}s ease both` }}>
                <VideoCard video={v}/>
              </div>
            ))}
          </div>

          {videos.length===0 && (
            <div style={{ textAlign:'center', padding:'40px', color:'var(--t3)' }}>
              <div style={{ fontSize:36, marginBottom:10 }}>🎥</div>
              <div>इस topic के videos जल्द आएंगे</div>
            </div>
          )}

          {/* YouTube search link */}
          <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(selTag+' tutorial hindi 2024')}`}
            target="_blank" rel="noreferrer"
            style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, marginTop:16,
              padding:'11px', borderRadius:12, background:'rgba(255,0,0,.06)',
              border:'1px solid rgba(255,0,0,.18)', color:'#ff6666', fontSize:12, fontWeight:700,
              textDecoration:'none', transition:'all .15s' }}
            onMouseEnter={e=>e.currentTarget.style.background='rgba(255,0,0,.12)'}
            onMouseLeave={e=>e.currentTarget.style.background='rgba(255,0,0,.06)'}>
            🔍 "{selTag}" के और Hindi videos YouTube पर देखें ↗
          </a>
        </div>
      )}

      {/* CHANNELS TAB */}
      {activeTab==='channels' && (
        <div style={{ padding:'0 20px' }}>
          <div style={{ fontSize:12, color:'var(--t3)', marginBottom:14, lineHeight:1.6 }}>
            Top Hindi AI/ML channels — subscribe करें और daily सीखें 🚀
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:10 }}>
            {HINDI_CHANNELS.map((ch,i)=>(
              <a key={i} href={ch.url} target="_blank" rel="noreferrer"
                style={{ display:'block', padding:'16px', borderRadius:14,
                  background:'#0a0b10', border:`1px solid ${ch.color}22`, textDecoration:'none',
                  transition:'all .22s', animation:`fadeUp ${.07*i}s ease both` }}
                onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.borderColor=ch.color+'55' }}
                onMouseLeave={e=>{ e.currentTarget.style.transform='translateY(0)';   e.currentTarget.style.borderColor=ch.color+'22' }}>
                <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:10 }}>
                  <div style={{ width:44, height:44, borderRadius:12, background:`${ch.color}15`,
                    border:`1px solid ${ch.color}30`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22 }}>
                    {ch.icon}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:800, color:'#e8eaf2' }}>{ch.name}</div>
                    <div style={{ fontSize:10, color:ch.color, fontWeight:700 }}>{ch.subs} subscribers</div>
                  </div>
                  <div style={{ fontSize:18, color:'#3d4166' }}>↗</div>
                </div>
                <div style={{ fontSize:11, color:'var(--t3)', lineHeight:1.5, marginBottom:10 }}>{ch.specialty}</div>
                <div style={{ padding:'6px 12px', borderRadius:8, background:`${ch.color}10`,
                  border:`1px solid ${ch.color}22`, textAlign:'center', fontSize:11, fontWeight:700, color:ch.color }}>
                  Subscribe करें 🔔
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* SEARCH TAB */}
      {activeTab==='search' && (
        <div style={{ padding:'0 20px' }}>
          <div style={{ position:'relative', marginBottom:16 }}>
            <span style={{ position:'absolute', left:13, top:'50%', transform:'translateY(-50%)', fontSize:15 }}>🔍</span>
            <input value={searchQ} onChange={e=>setSearchQ(e.target.value)}
              placeholder="Hindi video खोजें... (e.g. Python, ML, Deep Learning)"
              style={{ width:'100%', padding:'12px 14px 12px 40px', background:'#0a0b10',
                border:'1.5px solid #1a1d2e', borderRadius:12, color:'#e8eaf2', fontSize:13,
                outline:'none', fontFamily:'inherit', transition:'border-color .15s' }}
              onFocus={e=>e.target.style.borderColor='#ff4444'}
              onBlur={e=>e.target.style.borderColor='var(--border)'}
            />
          </div>

          {searchQ.length>1 && searchResults.length===0 && (
            <div style={{ textAlign:'center', padding:'30px', color:'var(--t3)' }}>
              <div style={{ fontSize:32, marginBottom:8 }}>🔍</div>
              <div style={{ marginBottom:12 }}>कोई result नहीं मिला</div>
              <a href={`https://youtube.com/results?search_query=${encodeURIComponent(searchQ+' hindi tutorial')}`}
                target="_blank" rel="noreferrer"
                style={{ display:'inline-block', padding:'8px 18px', borderRadius:10,
                  background:'rgba(255,68,68,.1)', border:'1px solid rgba(255,68,68,.3)',
                  color:'#ff6666', fontSize:12, fontWeight:700, textDecoration:'none' }}>
                YouTube पर "{searchQ}" खोजें ↗
              </a>
            </div>
          )}

          {searchResults.length>0 && (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:12 }}>
              {searchResults.map((v,i)=>(
                <div key={i} style={{ animation:`fadeUp ${.06*i}s ease both` }}>
                  <VideoCard video={v}/>
                </div>
              ))}
            </div>
          )}

          {searchQ.length<=1 && (
            <div>
              <div style={{ fontSize:11, color:'var(--t3)', fontWeight:700, marginBottom:10, letterSpacing:'1px' }}>BROWSE BY TOPIC</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(110px,1fr))', gap:8 }}>
                {allTags.map(tag=>(
                  <button key={tag} onClick={()=>{ setSelTag(tag); setActiveTab('videos') }}
                    style={{ padding:'12px 8px', borderRadius:12, border:'1px solid #1a1d2e',
                      background:'#0a0b10', color:'var(--t2)', fontSize:11, fontWeight:700,
                      cursor:'pointer', transition:'all .18s', textAlign:'center' }}
                    onMouseEnter={e=>{ e.currentTarget.style.borderColor='rgba(255,68,68,.4)'; e.currentTarget.style.color='#ff6666' }}
                    onMouseLeave={e=>{ e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--t2)' }}>
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
