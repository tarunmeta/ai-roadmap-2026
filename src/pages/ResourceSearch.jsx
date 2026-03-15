import { useState, Suspense, lazy } from 'react'
const MiniOrb = lazy(() => import('../components/MiniOrb.jsx'))

// ── REAL CURATED RESOURCES ──────────────────────────────────
const RESOURCES = {
  courses: [
    { title:"Machine Learning Specialization", author:"Andrew Ng · Coursera", url:"https://www.coursera.org/specializations/machine-learning-introduction", tag:"ML Fundamentals", free:true, level:"Beginner", desc:"The best ML course on the internet. Linear regression to neural nets. Start here." },
    { title:"Deep Learning Specialization", author:"Andrew Ng · deeplearning.ai", url:"https://www.deeplearning.ai/courses/deep-learning-specialization/", tag:"Deep Learning", free:true, level:"Intermediate", desc:"5-course series covering CNNs, RNNs, transformers. Industry gold standard." },
    { title:"fast.ai Practical Deep Learning", author:"Jeremy Howard · fast.ai", url:"https://course.fast.ai/", tag:"Deep Learning", free:true, level:"Intermediate", desc:"Top-down approach. Build real models before diving into theory." },
    { title:"CS229: Machine Learning", author:"Stanford University", url:"https://cs229.stanford.edu/", tag:"ML Fundamentals", free:true, level:"Advanced", desc:"Stanford's famous ML course. Full lecture notes and problem sets free." },
    { title:"MIT 6.S191: Deep Learning", author:"MIT", url:"http://introtodeeplearning.com/", tag:"Deep Learning", free:true, level:"Intermediate", desc:"MIT's intro to deep learning. Labs in TensorFlow. Very hands-on." },
    { title:"Generative AI for Beginners", author:"Microsoft · GitHub", url:"https://microsoft.github.io/generative-ai-for-beginners/", tag:"LLMs", free:true, level:"Beginner", desc:"18 lessons on building GenAI apps. Official Microsoft curriculum." },
    { title:"LLM University", author:"Cohere", url:"https://docs.cohere.com/docs/llmu", tag:"LLMs", free:true, level:"Beginner", desc:"8 modules from LLM basics to RAG, fine-tuning, and deployment." },
    { title:"Hugging Face NLP Course", author:"Hugging Face", url:"https://huggingface.co/learn/nlp-course", tag:"NLP & Transformers", free:true, level:"Intermediate", desc:"Build NLP apps with Transformers library. Best practical NLP resource." },
    { title:"Full Stack LLM Bootcamp", author:"The Full Stack", url:"https://fullstackdeeplearning.com/llm-bootcamp/", tag:"LLMs", free:true, level:"Intermediate", desc:"End-to-end LLM engineering: prompt engineering to deployment." },
    { title:"MLOps Specialization", author:"Andrew Ng · Coursera", url:"https://www.coursera.org/specializations/machine-learning-engineering-for-production-mlops", tag:"MLOps", free:true, level:"Advanced", desc:"Deploy production ML systems. Data pipelines, monitoring, CI/CD for ML." },
    { title:"CS231n: Computer Vision", author:"Stanford", url:"http://cs231n.stanford.edu/", tag:"Computer Vision", free:true, level:"Advanced", desc:"The definitive CNN course. Challenging but worth every lecture." },
    { title:"Neural Networks: Zero to Hero", author:"Andrej Karpathy · YouTube", url:"https://karpathy.ai/zero-to-hero.html", tag:"Deep Learning", free:true, level:"Intermediate", desc:"Build GPT from scratch. Karpathy's legendary series. Best coding resource." },
  ],
  articles: [
    { title:"Attention Is All You Need", author:"Vaswani et al. · Google", url:"https://arxiv.org/abs/1706.03762", tag:"Transformers", free:true, level:"Advanced", desc:"The paper that started it all. Original Transformer architecture. Must-read." },
    { title:"How LLMs Work — Visual Guide", author:"Jay Alammar", url:"https://jalammar.github.io/illustrated-transformer/", tag:"LLMs", free:true, level:"Intermediate", desc:"The Illustrated Transformer. Best visual explanation of attention mechanisms." },
    { title:"Andrej Karpathy's Blog", author:"Andrej Karpathy", url:"https://karpathy.github.io/", tag:"Deep Learning", free:true, level:"Intermediate", desc:"'Unreasonable Effectiveness of RNNs', 'Recipe for Training NNs'. Legendary posts." },
    { title:"How to Become an ML Engineer", author:"Towards Data Science", url:"https://towardsdatascience.com/", tag:"Career", free:true, level:"Beginner", desc:"Step-by-step guide to transitioning into ML engineering roles in 2025." },
    { title:"Machine Learning Mastery Blog", author:"Jason Brownlee", url:"https://machinelearningmastery.com/", tag:"ML Fundamentals", free:true, level:"Beginner", desc:"Hundreds of practical tutorials. Best resource for applied ML in Python." },
    { title:"Lilian Weng's Blog", author:"Lilian Weng · OpenAI", url:"https://lilianweng.github.io/", tag:"Deep Learning", free:true, level:"Advanced", desc:"Deep technical posts on RL, transformers, diffusion models. Research-grade." },
    { title:"The Illustrated GPT-2", author:"Jay Alammar", url:"https://jalammar.github.io/illustrated-gpt2/", tag:"LLMs", free:true, level:"Intermediate", desc:"Visual walkthrough of GPT-2 architecture. Understand LLMs from first principles." },
    { title:"Prompt Engineering Guide", author:"DAIR.AI", url:"https://www.promptingguide.ai/", tag:"Prompt Engineering", free:true, level:"Beginner", desc:"Comprehensive guide to prompting techniques: CoT, ReAct, RAG and more." },
    { title:"Papers With Code", author:"Meta AI", url:"https://paperswithcode.com/", tag:"Research", free:true, level:"Advanced", desc:"Latest ML papers + implementation code. Best way to stay current." },
    { title:"Distill.pub", author:"Google Brain + others", url:"https://distill.pub/", tag:"Deep Learning", free:true, level:"Intermediate", desc:"Interactive ML explanations. Beautifully designed research articles." },
    { title:"KDnuggets Blog", author:"KDnuggets", url:"https://www.kdnuggets.com/", tag:"Career", free:true, level:"Beginner", desc:"News, tutorials, job insights for data science and ML practitioners." },
    { title:"Towards Data Science", author:"Medium Publication", url:"https://towardsdatascience.com/", tag:"ML Fundamentals", free:true, level:"Beginner", desc:"Thousands of practical articles by ML engineers and data scientists." },
  ],
  tools: [
    { title:"Kaggle", author:"Google", url:"https://www.kaggle.com/", tag:"Practice", free:true, level:"All Levels", desc:"ML competitions, free notebooks, datasets. Best hands-on practice platform." },
    { title:"Google Colab", author:"Google", url:"https://colab.research.google.com/", tag:"Tools", free:true, level:"All Levels", desc:"Free GPU/TPU Jupyter notebooks. Start coding ML instantly, no setup." },
    { title:"Weights & Biases", author:"W&B", url:"https://wandb.ai/", tag:"MLOps", free:true, level:"Intermediate", desc:"Experiment tracking, model versioning, dataset management. Industry standard." },
    { title:"Hugging Face Hub", author:"Hugging Face", url:"https://huggingface.co/models", tag:"Models", free:true, level:"All Levels", desc:"200k+ pretrained models. Download and run BERT, GPT, LLaMA locally." },
    { title:"LangChain Docs", author:"LangChain", url:"https://python.langchain.com/", tag:"LLM Apps", free:true, level:"Intermediate", desc:"Build LLM-powered apps. Chains, agents, RAG systems. Essential for LLM devs." },
    { title:"Ollama", author:"Ollama", url:"https://ollama.ai/", tag:"Local LLMs", free:true, level:"Intermediate", desc:"Run LLaMA, Mistral, Gemma locally. No API key, no cost, no data leak." },
    { title:"FastAPI Docs", author:"Sebastián Ramírez", url:"https://fastapi.tiangolo.com/", tag:"Deployment", free:true, level:"Intermediate", desc:"Build production ML APIs in Python. Fastest way to deploy models." },
    { title:"MLflow", author:"Databricks", url:"https://mlflow.org/", tag:"MLOps", free:true, level:"Intermediate", desc:"Open-source MLOps. Track experiments, package models, deploy anywhere." },
    { title:"Scikit-learn Docs", author:"scikit-learn team", url:"https://scikit-learn.org/stable/", tag:"ML Fundamentals", free:true, level:"Beginner", desc:"The definitive ML library docs. Best examples + user guide in the field." },
    { title:"PyTorch Tutorials", author:"Facebook AI", url:"https://pytorch.org/tutorials/", tag:"Deep Learning", free:true, level:"Intermediate", desc:"Official PyTorch learning path from tensors to deployment." },
    { title:"OpenAI Cookbook", author:"OpenAI", url:"https://cookbook.openai.com/", tag:"LLM Apps", free:true, level:"Intermediate", desc:"Real examples using OpenAI API. RAG, fine-tuning, embeddings, agents." },
    { title:"ArXiv cs.LG", author:"Cornell University", url:"https://arxiv.org/list/cs.LG/recent", tag:"Research", free:true, level:"Advanced", desc:"Latest ML research papers, free. Follow daily to stay on the cutting edge." },
  ],
  books: [
    { title:"Deep Learning Book", author:"Goodfellow, Bengio, Courville", url:"https://www.deeplearningbook.org/", tag:"Deep Learning", free:true, level:"Advanced", desc:"The bible of deep learning. Theory-heavy but comprehensive. Free online." },
    { title:"Hands-On ML with Scikit-Learn & TF", author:"Aurélien Géron", url:"https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/", tag:"ML Fundamentals", free:false, level:"Intermediate", desc:"Best practical ML book. Cover-to-cover if you're serious about ML engineering." },
    { title:"Mathematics for ML", author:"Deisenroth et al. · Cambridge", url:"https://mml-book.github.io/", tag:"Math", free:true, level:"Intermediate", desc:"Linear algebra, probability, optimization for ML. Free PDF from Cambridge." },
    { title:"Pattern Recognition & ML", author:"Christopher Bishop", url:"https://www.microsoft.com/en-us/research/uploads/prod/2006/01/Bishop-Pattern-Recognition-and-Machine-Learning-2006.pdf", tag:"ML Fundamentals", free:true, level:"Advanced", desc:"The classic ML theory textbook. Free PDF from Microsoft Research." },
    { title:"Build a Large Language Model", author:"Sebastian Raschka", url:"https://www.manning.com/books/build-a-large-language-model-from-scratch", tag:"LLMs", free:false, level:"Advanced", desc:"Build GPT from scratch in PyTorch. Best book for LLM internals in 2025." },
    { title:"Foundations of LLMs", author:"Tong Xie et al.", url:"https://arxiv.org/abs/2501.09223", tag:"LLMs", free:true, level:"Advanced", desc:"Comprehensive 2025 textbook on LLM theory, training, alignment. Free." },
    { title:"Python Data Science Handbook", author:"Jake VanderPlas", url:"https://jakevdp.github.io/PythonDataScienceHandbook/", tag:"Python & Data", free:true, level:"Beginner", desc:"NumPy, Pandas, Matplotlib, Scikit-learn. Free online. Perfect starter book." },
    { title:"Speech & Language Processing", author:"Jurafsky & Martin", url:"https://web.stanford.edu/~jurafsky/slp3/", tag:"NLP & Transformers", free:true, level:"Advanced", desc:"The NLP textbook. 3rd edition covers Transformers, LLMs, RAG. Free draft." },
  ],
  hindi: [
    { title:"Python Tutorial in Hindi", author:"CodeWithHarry · YouTube", url:"https://www.youtube.com/playlist?list=PLu0W_9lII9agwh1XjRt242xIpHhPT2llg", tag:"Python & Data", free:true, level:"Beginner", desc:"Best Python tutorial in Hindi. 100+ videos. Perfect for Indian learners." },
    { title:"Machine Learning in Hindi", author:"CampusX · YouTube", url:"https://www.youtube.com/c/CampusX-official", tag:"ML Fundamentals", free:true, level:"Intermediate", desc:"Nitish Singh's ML/DL series. Most detailed Hindi ML content on YouTube." },
    { title:"Data Science in Hindi", author:"Codebasics Hindi · YouTube", url:"https://www.youtube.com/c/codebasicshindi", tag:"Python & Data", free:true, level:"Beginner", desc:"Pandas, NumPy, ML projects explained clearly in Hindi." },
    { title:"LLMs & GenAI Hindi", author:"Hitesh Choudhary · YouTube", url:"https://www.youtube.com/c/HiteshChoudharydotcom", tag:"LLMs", free:true, level:"Intermediate", desc:"FastAPI, LangChain, GenAI tutorials in Hindi/English." },
    { title:"Deep Learning Hindi", author:"Krish Naik · YouTube", url:"https://www.youtube.com/user/krishnaik06", tag:"Deep Learning", free:true, level:"Intermediate", desc:"Complete ML/DL/NLP playlists. Very popular with Indian AI learners." },
    { title:"Gate Smashers Math for AI", author:"Gate Smashers · YouTube", url:"https://www.youtube.com/c/GateSmashersOfficial", tag:"Math", free:true, level:"Beginner", desc:"Linear algebra, probability, statistics for ML explained in Hindi." },
    { title:"Apna College DSA + ML", author:"Apna College · YouTube", url:"https://www.youtube.com/c/ApnaCollegeOfficial", tag:"Career", free:true, level:"Beginner", desc:"DSA + career advice for Indian CS students aiming at AI roles." },
    { title:"AI Hindi Podcast", author:"Chai aur Code", url:"https://www.youtube.com/@chaiaurcode", tag:"Career", free:true, level:"Beginner", desc:"AI, coding, career discussions in Hindi. Great for motivation + guidance." },
  ],
}

const TABS = [
  { id:'courses',  label:'Courses',  icon:'🎓', color:'#22d3ee' },
  { id:'articles', label:'Articles', icon:'📄', color:'#a78bfa' },
  { id:'tools',    label:'Tools',    icon:'🛠', color:'#34d399' },
  { id:'books',    label:'Books',    icon:'📚', color:'#fbbf24' },
  { id:'hindi',    label:'हिंदी',    icon:'🇮🇳', color:'#fb923c' },
]

const LEVELS = ['All Levels','Beginner','Intermediate','Advanced']
const ALL_TAGS = ['All',...new Set(Object.values(RESOURCES).flat().map(r=>r.tag))]

function ResourceCard({ r }) {
  const colMap = {
    'ML Fundamentals':'#22d3ee','Deep Learning':'#a78bfa','LLMs':'#fb7185',
    'NLP & Transformers':'#34d399','Computer Vision':'#60a5fa','MLOps':'#f59e0b',
    'Python & Data':'#4ade80','Career':'#c084fc','Prompt Engineering':'#22d3ee',
    'Research':'#94a3b8','Tools':'#34d399','Practice':'#fbbf24','Models':'#a78bfa',
    'LLM Apps':'#fb7185','Local LLMs':'#60a5fa','Deployment':'#f59e0b','Math':'#c084fc',
    'LLMs ':'#fb7185',
  }
  const c = colMap[r.tag] || '#22d3ee'
  return (
    <a href={r.url} target="_blank" rel="noreferrer noopener"
      style={{
        display:'block', textDecoration:'none',
        background:'var(--bg-glass)', backdropFilter:'blur(12px)',
        border:`1px solid rgba(255,255,255,.07)`,
        borderRadius:14, padding:'16px 18px',
        transition:'all .2s', position:'relative', overflow:'hidden',
      }}
      onMouseEnter={e=>{e.currentTarget.style.borderColor=c+'44';e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow=`0 8px 28px rgba(0,0,0,.4)`}}
      onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,.07)';e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='none'}}
    >
      <div style={{position:'absolute',top:0,left:0,right:0,height:2,background:c,opacity:.6}}/>
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:8,marginBottom:8}}>
        <div style={{fontFamily:'var(--font-display)',fontSize:14,fontWeight:600,color:'var(--t1)',lineHeight:1.4,flex:1}}>
          {r.title}
        </div>
        {r.free
          ? <span style={{flexShrink:0,padding:'2px 8px',borderRadius:99,background:'rgba(52,211,153,.12)',border:'1px solid rgba(52,211,153,.25)',fontFamily:'var(--font-mono)',fontSize:8,color:'#34d399',fontWeight:600,letterSpacing:.5}}>FREE</span>
          : <span style={{flexShrink:0,padding:'2px 8px',borderRadius:99,background:'rgba(251,191,36,.1)',border:'1px solid rgba(251,191,36,.2)',fontFamily:'var(--font-mono)',fontSize:8,color:'#fbbf24',fontWeight:600,letterSpacing:.5}}>PAID</span>
        }
      </div>
      <div style={{fontFamily:'var(--font-body)',fontSize:12,color:'var(--t3)',marginBottom:10,lineHeight:1.5}}>
        {r.desc}
      </div>
      <div style={{display:'flex',alignItems:'center',gap:6,flexWrap:'wrap'}}>
        <span style={{padding:'2px 8px',borderRadius:99,background:`${c}15`,border:`1px solid ${c}35`,fontFamily:'var(--font-mono)',fontSize:8,color:c,fontWeight:500,letterSpacing:.5}}>{r.tag}</span>
        <span style={{padding:'2px 8px',borderRadius:99,background:'var(--bg-glass)',fontFamily:'var(--font-mono)',fontSize:8,color:'var(--t2)',letterSpacing:.3}}>{r.level}</span>
        <span style={{marginLeft:'auto',fontFamily:'var(--font-body)',fontSize:11,color:'var(--t3)'}}>
          {r.author}
        </span>
      </div>
    </a>
  )
}

export default function ResourceSearch() {
  const [tab,   setTab]   = useState('courses')
  const [level, setLevel] = useState('All Levels')
  const [tag,   setTag]   = useState('All')
  const [q,     setQ]     = useState('')

  const items = (RESOURCES[tab] || []).filter(r => {
    if (level !== 'All Levels' && r.level !== level && r.level !== 'All Levels') return false
    if (tag !== 'All' && r.tag !== tag) return false
    if (q && !r.title.toLowerCase().includes(q.toLowerCase()) && !r.desc.toLowerCase().includes(q.toLowerCase()) && !r.tag.toLowerCase().includes(q.toLowerCase())) return false
    return true
  })

  return (
    <div className="fade-up" style={{maxWidth:1100}}>

      {/* 3D Header */}
      <div style={{marginBottom:20,padding:'20px 24px',
        background:'var(--bg-surface)',backdropFilter:'blur(16px)',
        border:'1px solid var(--border)',borderRadius:18,
        position:'relative',overflow:'hidden',
        display:'flex',alignItems:'center',gap:16,flexWrap:'wrap'}}>
        <div style={{position:'absolute',top:0,left:0,right:0,height:1,
          background:'linear-gradient(90deg,transparent,rgba(167,139,250,.4),rgba(52,211,153,.4),transparent)'}}/>
        <Suspense fallback={<div style={{width:52,height:52,borderRadius:'50%',background:'rgba(167,139,250,.1)'}}/>}>
          <MiniOrb color="#a78bfa" size={52}/>
        </Suspense>
        <div style={{flex:1,minWidth:160}}>
          <div style={{fontFamily:'var(--font-mono)',fontSize:9,color:'rgba(167,139,250,.4)',
            letterSpacing:3,textTransform:'uppercase',marginBottom:4}}>// RESOURCE LIBRARY</div>
          <h1 style={{fontFamily:'var(--font-display)',fontSize:'clamp(18px,3vw,26px)',fontWeight:700,
            background:'linear-gradient(135deg,#f1f5f9,#a78bfa)',
            WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>
            Curated AI Resources
          </h1>
          <p style={{fontFamily:'var(--font-body)',fontSize:13,color:'var(--t2)',marginTop:2}}>
            {Object.values(RESOURCES).flat().length}+ hand-picked resources for every phase
          </p>
        </div>
        {/* Search */}
        <div style={{width:'clamp(180px,40%,280px)'}}>
          <input value={q} onChange={e=>setQ(e.target.value)}
            placeholder="Search resources..."
            style={{background:'var(--bg-glass2)',border:'1px solid var(--border2)',
              borderRadius:10,padding:'9px 14px',fontSize:13,color:'var(--t1)',
              outline:'none',width:'100%',fontFamily:'var(--font-body)'}}
            onFocus={e=>{e.target.style.borderColor='rgba(167,139,250,.4)';e.target.style.boxShadow='0 0 0 3px rgba(167,139,250,.1)'}}
            onBlur={e=>{e.target.style.borderColor='rgba(255,255,255,.12)';e.target.style.boxShadow='none'}}
          />
        </div>
      </div>

      {/* Category tabs */}
      <div style={{display:'flex',gap:6,marginBottom:14,overflowX:'auto',paddingBottom:4,WebkitOverflowScrolling:'touch'}}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>{setTab(t.id);setTag('All')}}
            style={{
              flexShrink:0,padding:'8px 16px',borderRadius:10,border:'1px solid',
              fontFamily:'var(--font-body)',fontSize:13,fontWeight:500,
              cursor:'pointer',transition:'all .18s',display:'flex',alignItems:'center',gap:6,
              background:tab===t.id?`${t.color}15`:'rgba(255,255,255,.04)',
              borderColor:tab===t.id?`${t.color}40`:'rgba(255,255,255,.08)',
              color:tab===t.id?t.color:'var(--t2)',
              boxShadow:tab===t.id?`0 0 12px ${t.color}20`:'none',
              minHeight:40,
            }}>
            <span>{t.icon}</span>{t.label}
            <span style={{fontFamily:'var(--font-mono)',fontSize:9,
              background:'var(--bg-glass2)',padding:'1px 6px',borderRadius:99}}>
              {RESOURCES[t.id]?.length||0}
            </span>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div style={{display:'flex',gap:8,marginBottom:16,flexWrap:'wrap',alignItems:'center'}}>
        <span style={{fontFamily:'var(--font-mono)',fontSize:9,color:'var(--t3)',letterSpacing:1}}>LEVEL:</span>
        {LEVELS.map(l=>(
          <button key={l} onClick={()=>setLevel(l)}
            style={{padding:'4px 12px',borderRadius:99,border:'1px solid',cursor:'pointer',
              fontFamily:'var(--font-body)',fontSize:12,fontWeight:500,transition:'all .15s',
              background:level===l?'rgba(34,211,238,.12)':'transparent',
              borderColor:level===l?'rgba(34,211,238,.3)':'var(--border2)',
              color:level===l?'var(--cyan)':'var(--t2)',minHeight:32}}>
            {l}
          </button>
        ))}
        <span style={{fontFamily:'var(--font-mono)',fontSize:9,color:'var(--t3)',letterSpacing:1,marginLeft:8}}>
          {items.length} results
        </span>
      </div>

      {/* Resource grid */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,320px),1fr))',gap:12}}>
        {items.map((r,i)=><ResourceCard key={i} r={r}/>)}
        {items.length===0&&(
          <div style={{gridColumn:'1/-1',textAlign:'center',padding:'48px 20px',
            fontFamily:'var(--font-body)',color:'var(--t3)',fontSize:14}}>
            No resources match your filters. Try changing the level or search term.
          </div>
        )}
      </div>
    </div>
  )
}
