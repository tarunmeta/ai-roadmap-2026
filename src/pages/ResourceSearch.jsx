import { useState, Suspense, lazy } from 'react'
const MiniOrb = lazy(() => import('../components/MiniOrb.jsx'))

// ── CURATED RESOURCES ────────────────────────────────────────
const RESOURCES = {
  courses: [
    { title:"Machine Learning Specialization", author:"Andrew Ng · Coursera", url:"https://www.coursera.org/specializations/machine-learning-introduction", tag:"ML Fundamentals", free:false, level:"Beginner", desc:"The gold standard ML course. 3 courses, covers supervised/unsupervised learning, neural nets." },
    { title:"Deep Learning Specialization", author:"Andrew Ng · deeplearning.ai", url:"https://www.deeplearning.ai/courses/deep-learning-specialization/", tag:"Deep Learning", free:false, level:"Intermediate", desc:"5-course deep learning program. CNNs, RNNs, transformers, optimization." },
    { title:"fast.ai Practical Deep Learning", author:"Jeremy Howard · fast.ai", url:"https://course.fast.ai/", tag:"Deep Learning", free:true, level:"Intermediate", desc:"Top-down, practical approach. Build real models first, understand theory after." },
    { title:"CS229: Machine Learning", author:"Stanford University", url:"https://cs229.stanford.edu/", tag:"ML Fundamentals", free:true, level:"Advanced", desc:"Stanford's rigorous ML course with full lecture notes and problem sets." },
    { title:"MIT 6.S191: Deep Learning", author:"MIT", url:"http://introtodeeplearning.com/", tag:"Deep Learning", free:true, level:"Intermediate", desc:"MIT's intro to deep learning. Covers fundamentals with hands-on labs." },
    { title:"Neural Networks: Zero to Hero", author:"Andrej Karpathy · YouTube", url:"https://karpathy.ai/zero-to-hero.html", tag:"Deep Learning", free:true, level:"Intermediate", desc:"Build GPT from scratch. Best series to truly understand LLMs from first principles." },
    { title:"Full Stack LLM Bootcamp", author:"The Full Stack", url:"https://fullstackdeeplearning.com/llm-bootcamp/", tag:"LLMs", free:true, level:"Intermediate", desc:"Production LLM apps: prompting, LLMOps, UX, deployment." },
    { title:"Hugging Face NLP Course", author:"Hugging Face", url:"https://huggingface.co/learn/nlp-course", tag:"NLP & LLMs", free:true, level:"Intermediate", desc:"Official HuggingFace course. Transformers, fine-tuning, pipelines." },
    { title:"MLOps Specialization", author:"Andrew Ng · Coursera", url:"https://www.coursera.org/specializations/machine-learning-engineering-for-production-mlops", tag:"MLOps", free:false, level:"Advanced", desc:"4-course MLOps program. Data pipelines, model deployment, monitoring." },
    { title:"LLM University", author:"Cohere", url:"https://docs.cohere.com/docs/llmu", tag:"LLMs", free:true, level:"Beginner", desc:"Hands-on LLM course. Embeddings, semantic search, RAG, fine-tuning." },
    { title:"Made With ML", author:"Goku Mohandas", url:"https://madewithml.com/", tag:"MLOps", free:true, level:"Intermediate", desc:"End-to-end ML project from idea to production. Best free MLOps resource." },
    { title:"CS231n: Computer Vision", author:"Stanford", url:"http://cs231n.stanford.edu/", tag:"Computer Vision", free:true, level:"Advanced", desc:"Stanford's CNN course. Image classification, detection, segmentation." },
  ],
  articles: [
    { title:"Attention Is All You Need", author:"Vaswani et al. · Google", url:"https://arxiv.org/abs/1706.03762", tag:"Transformers", free:true, level:"Advanced", desc:"The original transformer paper. Essential reading for understanding LLMs." },
    { title:"The Illustrated Transformer", author:"Jay Alammar", url:"https://jalammar.github.io/illustrated-transformer/", tag:"Transformers", free:true, level:"Intermediate", desc:"Best visual explanation of transformers. Diagrams + intuition." },
    { title:"Building Effective Agents", author:"Anthropic", url:"https://www.anthropic.com/research/building-effective-agents", tag:"AI Agents", free:true, level:"Intermediate", desc:"Anthropic's definitive guide on agent design patterns. Read before building agents." },
    { title:"Prompt Engineering Guide", author:"DAIR.AI", url:"https://www.promptingguide.ai/", tag:"Prompt Engineering", free:true, level:"Beginner", desc:"Comprehensive prompt engineering techniques from basic to advanced." },
    { title:"Andrej Karpathy's Blog", author:"Andrej Karpathy", url:"https://karpathy.github.io/", tag:"Deep Learning", free:true, level:"Intermediate", desc:"Deep insights on neural nets, LLMs, and AI. Essential reading." },
    { title:"Lilian Weng's Blog", author:"Lilian Weng · OpenAI", url:"https://lilianweng.github.io/", tag:"Deep Learning", free:true, level:"Advanced", desc:"Deep technical posts on RL, transformers, diffusion models." },
    { title:"Papers With Code", author:"Meta AI", url:"https://paperswithcode.com/", tag:"Research", free:true, level:"Advanced", desc:"Latest ML papers with code implementations. Track SOTA results." },
    { title:"RAG Survey", author:"Gao et al.", url:"https://arxiv.org/abs/2312.10997", tag:"RAG", free:true, level:"Intermediate", desc:"Comprehensive survey of RAG techniques. Best reference for RAG systems." },
    { title:"LLM Powered Autonomous Agents", author:"Lilian Weng", url:"https://lilianweng.github.io/posts/2023-06-23-agent/", tag:"AI Agents", free:true, level:"Advanced", desc:"Deep dive into LLM agents: planning, memory, tool use." },
    { title:"Distill.pub", author:"Google Brain + others", url:"https://distill.pub/", tag:"Deep Learning", free:true, level:"Advanced", desc:"Interactive, visual ML articles. Highest quality ML explanations online." },
    { title:"ML Interview Prep", author:"Chip Huyen", url:"https://huyenchip.com/ml-interviews-book/", tag:"Career", free:true, level:"All Levels", desc:"Free ML interviews book. Concepts, system design, coding questions." },
    { title:"Towards Data Science", author:"Medium Publication", url:"https://towardsdatascience.com/", tag:"ML Fundamentals", free:false, level:"All Levels", desc:"Thousands of practical ML tutorials and explanations." },
  ],
  tools: [
    { title:"Kaggle", author:"Google", url:"https://www.kaggle.com/", tag:"Practice", free:true, level:"All Levels", desc:"Competitions, datasets, free GPU notebooks. Best place to practice ML." },
    { title:"Google Colab", author:"Google", url:"https://colab.research.google.com/", tag:"Tools", free:true, level:"All Levels", desc:"Free cloud Jupyter notebooks with GPU. Essential for ML experiments." },
    { title:"Weights & Biases", author:"W&B", url:"https://wandb.ai/", tag:"MLOps", free:true, level:"Intermediate", desc:"Experiment tracking, model versioning, dataset management." },
    { title:"Hugging Face Hub", author:"Hugging Face", url:"https://huggingface.co/models", tag:"Models", free:true, level:"All Levels", desc:"100k+ pre-trained models. Download and run locally or via API." },
    { title:"LangChain Docs", author:"LangChain", url:"https://python.langchain.com/", tag:"LLM Apps", free:true, level:"Intermediate", desc:"Framework for LLM applications: chains, agents, RAG pipelines." },
    { title:"Ollama", author:"Ollama", url:"https://ollama.ai/", tag:"Local LLMs", free:true, level:"Intermediate", desc:"Run Llama, Mistral, Gemma locally. One command setup." },
    { title:"LangSmith", author:"LangChain", url:"https://smith.langchain.com/", tag:"LLM Apps", free:true, level:"Intermediate", desc:"Debug, trace, and evaluate LLM chains and agents." },
    { title:"Langfuse", author:"Langfuse", url:"https://langfuse.com/", tag:"MLOps", free:true, level:"Intermediate", desc:"Open-source LLM observability: trace every prompt, cost, latency." },
    { title:"Cursor IDE", author:"Cursor", url:"https://cursor.sh/", tag:"Tools", free:false, level:"All Levels", desc:"AI-first code editor. Best coding assistant for AI engineers." },
    { title:"Pinecone", author:"Pinecone", url:"https://www.pinecone.io/", tag:"Vector DB", free:true, level:"Intermediate", desc:"Managed vector database for semantic search and RAG." },
    { title:"Chroma DB", author:"Chroma", url:"https://www.trychroma.com/", tag:"Vector DB", free:true, level:"Beginner", desc:"Open-source local vector database. Easiest RAG setup." },
    { title:"Instructor", author:"Jason Liu", url:"https://python.useinstructor.com/", tag:"LLM Apps", free:true, level:"Intermediate", desc:"Get structured outputs from any LLM using Pydantic. Production essential." },
  ],
  books: [
    { title:"Hands-On Machine Learning", author:"Aurélien Géron · O'Reilly", url:"https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/", tag:"ML Fundamentals", free:false, level:"Beginner", desc:"Best practical ML book. Covers sklearn, TensorFlow, neural networks end-to-end." },
    { title:"Deep Learning", author:"Goodfellow, Bengio, Courville", url:"https://www.deeplearningbook.org/", tag:"Deep Learning", free:true, level:"Advanced", desc:"The bible of deep learning. Free online. Mathematical foundations." },
    { title:"Natural Language Processing with Transformers", author:"Lewis Tunstall · O'Reilly", url:"https://www.oreilly.com/library/view/natural-language-processing/9781098136789/", tag:"NLP & LLMs", free:false, level:"Intermediate", desc:"Best practical NLP book. Fine-tuning, transformers, HuggingFace." },
    { title:"Designing Machine Learning Systems", author:"Chip Huyen · O'Reilly", url:"https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/", tag:"MLOps", free:false, level:"Advanced", desc:"System design for ML in production. Data, features, deployment, monitoring." },
    { title:"Python Machine Learning", author:"Sebastian Raschka", url:"https://sebastianraschka.com/books.html", tag:"ML Fundamentals", free:false, level:"Intermediate", desc:"Strong fundamentals + practical implementations with PyTorch." },
    { title:"The StatQuest Illustrated Guide", author:"Josh Starmer", url:"https://www.statquest.org/statquest-illustrated-guide-to-machine-learning/", tag:"ML Fundamentals", free:false, level:"Beginner", desc:"From StatQuest creator. Visual, intuitive ML explanations." },
    { title:"Build a Large Language Model", author:"Sebastian Raschka", url:"https://www.manning.com/books/build-a-large-language-model-from-scratch", tag:"LLMs", free:false, level:"Advanced", desc:"Build GPT from scratch step by step. Best LLM internals book." },
    { title:"AI Engineering", author:"Chip Huyen · O'Reilly", url:"https://www.oreilly.com/library/view/ai-engineering/9781098166298/", tag:"LLM Apps", free:false, level:"Intermediate", desc:"Latest book on building AI products. Foundation models, RAG, agents." },
  ],
  hindi: [
    { title:"Python Full Course Hindi", author:"CodeWithHarry · YouTube", url:"https://www.youtube.com/playlist?list=PLu0W_9lII9agICnT8t4iYVSZ3eykIAOME", tag:"Python", free:true, level:"Beginner", desc:"Sabse popular Python course Hindi mein. 50+ videos, complete fundamentals." },
    { title:"Machine Learning Hindi", author:"CampusX · YouTube", url:"https://www.youtube.com/playlist?list=PLKnIA16_Rmvbr7zKYQuBfsVkjoLcJgxHH", tag:"ML Fundamentals", free:true, level:"Intermediate", desc:"100 Days of ML in Hindi. Best Hindi ML series available." },
    { title:"Deep Learning Hindi", author:"CampusX · YouTube", url:"https://www.youtube.com/playlist?list=PLKnIA16_RmvYuZauWaPlRTC54KxSNLtNn", tag:"Deep Learning", free:true, level:"Intermediate", desc:"Neural networks, CNN, RNN, LSTM explained in Hindi with code." },
    { title:"Data Science Hindi", author:"CodeBasics Hindi · YouTube", url:"https://www.youtube.com/c/codebasicshindi", tag:"Data Science", free:true, level:"Beginner", desc:"Pandas, NumPy, visualization, ML projects — sab Hindi mein." },
    { title:"NLP & LLMs Hindi", author:"CampusX · YouTube", url:"https://www.youtube.com/playlist?list=PLKnIA16_RmvZo7fp5kkIth6nRTeQc7j5i", tag:"NLP & LLMs", free:true, level:"Intermediate", desc:"Transformers, BERT, GPT, LLM fine-tuning in Hindi." },
    { title:"AI Engineer Roadmap Hindi", author:"Krish Naik Hindi · YouTube", url:"https://www.youtube.com/@krishnaikhindi", tag:"Career", free:true, level:"Beginner", desc:"Complete AI/ML tutorials in Hindi by Krish Naik. Industry perspective." },
    { title:"FastAPI Hindi Tutorial", author:"CodeWithHarry · YouTube", url:"https://www.youtube.com/watch?v=Wr1JjhTt1Xg", tag:"FastAPI", free:true, level:"Intermediate", desc:"FastAPI se REST API banana — Hindi mein complete tutorial." },
    { title:"Git & GitHub Hindi", author:"CodeWithHarry · YouTube", url:"https://www.youtube.com/playlist?list=PLu0W_9lII9agq5TrH9XLIKQvv0iaF2X3w", tag:"Tools", free:true, level:"Beginner", desc:"Git fundamentals se leke advanced workflows tak — Hindi mein." },
    { title:"SQL Hindi Complete", author:"CodeWithHarry · YouTube", url:"https://www.youtube.com/playlist?list=PLu0W_9lII9aFeCLd3rpS323yl4iGNe9Gg", tag:"Data Science", free:true, level:"Beginner", desc:"SQL basics se advanced queries tak — Hindi mein." },
    { title:"Docker Hindi", author:"Piyush Garg · YouTube", url:"https://www.youtube.com/watch?v=9HFiwbLSoDs", tag:"MLOps", free:true, level:"Intermediate", desc:"Docker fundamentals Hindi mein. Containers, images, compose." },
    { title:"Statistics Hindi", author:"CampusX · YouTube", url:"https://www.youtube.com/playlist?list=PLKnIA16_Rmva-wBDBN3qtKIKGgNt_kPDV", tag:"ML Fundamentals", free:true, level:"Beginner", desc:"Statistics for ML in Hindi. Probability, distributions, hypothesis testing." },
    { title:"LangChain Hindi", author:"Sunny Savita · YouTube", url:"https://www.youtube.com/@sunnysavita10", tag:"LLM Apps", free:true, level:"Intermediate", desc:"LangChain, LLMs, agents in Hindi. Practical projects." },
  ],
}

// ── ANTHROPIC CLAUDE ACADEMY ──────────────────────────────────
const CLAUDE_COURSES = [
  { title:'Anthropic API Fundamentals', phase:'Month 2', duration:'2 hrs', cert:true, tag:'API', url:'https://github.com/anthropics/courses', desc:'Official course: SDK setup, messages API, streaming, multimodal. First course to take after signing up.' },
  { title:'Prompt Engineering Interactive Tutorial', phase:'Month 2', duration:'3 hrs', cert:false, tag:'Prompting', url:'https://github.com/anthropics/courses/tree/main/prompt_engineering_interactive_tutorial', desc:'9 chapters with Jupyter notebooks. Hands-on exercises covering every prompting technique.' },
  { title:'Tool Use Course', phase:'Month 2-4', duration:'2 hrs', cert:false, tag:'Tool Use', url:'https://github.com/anthropics/courses/tree/main/tool_use', desc:'Everything about function/tool calling with Claude. Build agents that use real tools.' },
  { title:'Prompt Evaluations', phase:'Month 4', duration:'1.5 hrs', cert:false, tag:'Evals', url:'https://github.com/anthropics/courses', desc:'Write production evals, measure prompt quality, catch regressions between prompt versions.' },
  { title:'Model Context Protocol (MCP)', phase:'Month 4-7', duration:'2 hrs', cert:true, tag:'MCP', url:'https://anthropic.skilljar.com', desc:'Build MCP servers and clients from scratch. Connect Claude to any tool or data source.' },
  { title:'AI Fluency: Framework & Foundations', phase:'Month 1', duration:'1.1 hrs', cert:true, tag:'Foundations', url:'https://anthropic.skilljar.com', desc:'Core AI thinking framework. 14 lectures. Great first course before writing any code.' },
  { title:'Claude Code in Action', phase:'Month 5-6', duration:'2 hrs', cert:true, tag:'Agents', url:'https://anthropic.skilljar.com', desc:'Agentic coding skills. Use Claude as a coding partner. Official certificate.' },
  { title:'Claude 101', phase:'Month 1', duration:'45 min', cert:true, tag:'Intro', url:'https://anthropic.skilljar.com', desc:'Understanding Claude, everyday workflows, how to get the best results. Start here.' },
  { title:'Real World Prompting', phase:'Month 2', duration:'1 hr', cert:false, tag:'Prompting', url:'https://github.com/anthropics/courses/tree/main/real_world_prompting', desc:'Advanced prompting for production use cases. Beyond basics — real examples.' },
  { title:'Working with Legacy Code', phase:'Month 5-6', duration:'1 hr', cert:false, tag:'Agents', url:'https://github.com/anthropics/courses', desc:'Use Claude to understand, refactor, and modernise existing codebases.' },
]

// ── 6-MONTH AI ENGINEER ROADMAP ───────────────────────────────
const ROADMAP = [
  {
    month:'Month 1', title:'Coding Foundations', color:'#22d3ee', emoji:'🐍',
    goal:'Solid Python + Git + SQL + first API',
    resources:[
      { title:'Python for Everybody (Coursera)', url:'https://www.coursera.org/specializations/python', free:true, desc:'Best Python start. Dr. Chuck covers everything.' },
      { title:'CS50P: Intro to Python (Harvard)', url:'https://cs50.harvard.edu/python/', free:true, desc:'Rigorous with real problem sets and final project.' },
      { title:'freeCodeCamp Python 4-hour', url:'https://www.youtube.com/watch?v=rfscVS0vtbw', free:true, desc:'All fundamentals in one video.' },
      { title:'GitHub Skills', url:'https://skills.github.com/', free:true, desc:'Learn Git inside GitHub itself — interactive.' },
      { title:'SQLBolt — Learn SQL', url:'https://sqlbolt.com/', free:true, desc:'20 lessons, in-browser SQL exercises.' },
      { title:'FastAPI Official Tutorial', url:'https://fastapi.tiangolo.com/tutorial/', free:true, desc:'One of the best framework docs ever written.' },
    ],
    milestone:'Write Python that reads/writes files, calls APIs, handles errors, uses Git, runs FastAPI'
  },
  {
    month:'Month 2', title:'LLM App Development', color:'#a78bfa', emoji:'🤖',
    goal:'Build real AI-powered apps with OpenAI + Anthropic',
    resources:[
      { title:'Anthropic Prompt Engineering Tutorial', url:'https://github.com/anthropics/courses/tree/main/prompt_engineering_interactive_tutorial', free:true, desc:'9 chapters, best prompting course available.' },
      { title:'Anthropic API Fundamentals', url:'https://github.com/anthropics/courses', free:true, desc:'SDK, streaming, multimodal — official Anthropic.' },
      { title:'OpenAI Cookbook', url:'https://github.com/openai/openai-cookbook', free:true, desc:'Practical examples: tool calling, streaming, RAG.' },
      { title:'Instructor Library Docs', url:'https://python.useinstructor.com/', free:true, desc:'Get JSON from any LLM. Production essential.' },
      { title:'PromptingGuide.ai', url:'https://www.promptingguide.ai/', free:true, desc:'All techniques from basic to advanced.' },
      { title:'OpenAI Prompt Engineering Guide', url:'https://platform.openai.com/docs/guides/prompt-engineering', free:true, desc:'Official guide from OpenAI.' },
    ],
    milestone:'Write prompts that work, get structured JSON, wire tool calling, stream responses'
  },
  {
    month:'Month 3', title:'RAG & Vector Search', color:'#34d399', emoji:'🔍',
    goal:'Build systems that let LLMs answer from your documents',
    resources:[
      { title:'Weaviate — Chunking for RAG', url:'https://weaviate.io/blog/chunking-strategies-for-rag', free:true, desc:'Most practical guide to chunking strategies.' },
      { title:'Chroma Vector DB Docs', url:'https://docs.trychroma.com/', free:true, desc:'Easiest vector DB to start with. No infra.' },
      { title:'LlamaIndex Starter Tutorial', url:'https://docs.llamaindex.ai/en/stable/getting_started/starter_example/', free:true, desc:'Working RAG in under 30 lines.' },
      { title:'Pinecone Learning Center', url:'https://www.pinecone.io/learn/', free:true, desc:'Best provider-agnostic RAG tutorials.' },
      { title:'Cohere Reranking Docs', url:'https://docs.cohere.com/docs/reranking-with-cohere', free:true, desc:'One line to add reranking to your RAG pipeline.' },
      { title:'Ragas — RAG Evaluation', url:'https://docs.ragas.io/', free:true, desc:'Measure faithfulness, relevancy, context precision.' },
    ],
    milestone:'Ingest docs, embed+store, retrieve top chunks, rerank, return cited answers'
  },
  {
    month:'Month 4', title:'Agents, Tools & Evals', color:'#fbbf24', emoji:'🕵️',
    goal:'Build AI that takes sequences of actions and evaluates itself',
    resources:[
      { title:'Anthropic — Building Effective Agents', url:'https://www.anthropic.com/research/building-effective-agents', free:true, desc:'The single best piece on agents in production.' },
      { title:'LangChain Academy — LangGraph', url:'https://academy.langchain.com/courses/intro-to-langgraph', free:true, desc:'Free official LangGraph course. State, memory, HIL.' },
      { title:'Anthropic Tool Use Course', url:'https://github.com/anthropics/courses/tree/main/tool_use', free:true, desc:'Official function/tool calling course.' },
      { title:'DeepEval — LLM Testing', url:'https://deepeval.com/docs/getting-started', free:true, desc:'pytest for LLMs. 50+ built-in metrics.' },
      { title:'Promptfoo — Eval CLI', url:'https://github.com/promptfoo/promptfoo', free:true, desc:'Test prompts across models. CI/CD integration.' },
      { title:'LangSmith — Tracing', url:'https://smith.langchain.com/', free:true, desc:'Trace every agent step. Free tier is generous.' },
    ],
    milestone:'Implement agent loop, write reliable tools, build evals, measure task success'
  },
  {
    month:'Month 5', title:'Production & Deployment', color:'#fb7185', emoji:'🚀',
    goal:'Make it survive real users, real traffic, real failures',
    resources:[
      { title:'FastAPI Deployment Docs', url:'https://fastapi.tiangolo.com/deployment/', free:true, desc:'Official: Uvicorn workers, Gunicorn, Docker.' },
      { title:'Docker Official Getting Started', url:'https://docs.docker.com/get-started/', free:true, desc:'Canonical Docker tutorial. Start here.' },
      { title:'Langfuse — LLM Observability', url:'https://langfuse.com/docs', free:true, desc:'Trace every call: prompt, response, tokens, cost.' },
      { title:'LiteLLM — 100+ Providers', url:'https://github.com/BerriAI/litellm', free:true, desc:'Unified interface + budget + rate limiting.' },
      { title:'GPTCache — Semantic Caching', url:'https://github.com/zilliztech/GPTCache', free:true, desc:'Cache LLM responses. Reduce costs 20-40%.' },
      { title:'OWASP API Security Top 10', url:'https://owasp.org/API-Security/', free:true, desc:'Security risks every API developer must know.' },
    ],
    milestone:'Deploy FastAPI+LLM in Docker, handle background jobs, trace+monitor, cache'
  },
  {
    month:'Month 6', title:'Specialise & Get Hired', color:'#fb923c', emoji:'🏆',
    goal:'Pick one direction, build portfolio, start applying',
    resources:[
      { title:'Vercel AI SDK — Product Path', url:'https://sdk.vercel.ai/docs', free:true, desc:'Fastest way to build AI UIs with streaming.' },
      { title:'HuggingFace Fine-tuning — ML Path', url:'https://huggingface.co/docs/transformers/training', free:true, desc:'Standard fine-tuning library.' },
      { title:'Unsloth — Fast Fine-tuning', url:'https://github.com/unslothai/unsloth', free:true, desc:'2x faster, 80% less memory. LoRA and QLoRA.' },
      { title:'n8n — Automation Path', url:'https://docs.n8n.io/', free:true, desc:'Visual workflow automation + AI. 400+ integrations.' },
      { title:'Google PAIR Guidebook', url:'https://pair.withgoogle.com/guidebook/', free:true, desc:'Best resource on human-AI interaction design.' },
      { title:'Awesome GitHub Profile READMEs', url:'https://github.com/abhisheknaiidu/awesome-github-profile-readme', free:true, desc:'Inspiration for your portfolio GitHub profile.' },
    ],
    milestone:'Ship 2-3 complete projects. Deploy publicly. Start applying to AI engineer roles.'
  },
]

const TABS = [
  { id:'courses',  label:'Courses',   icon:'🎓', color:'#22d3ee' },
  { id:'articles', label:'Articles',  icon:'📄', color:'#a78bfa' },
  { id:'tools',    label:'Tools',     icon:'🛠',  color:'#34d399' },
  { id:'books',    label:'Books',     icon:'📚', color:'#fbbf24' },
  { id:'hindi',    label:'हिंदी',     icon:'🇮🇳', color:'#fb923c' },
  { id:'claude',   label:'Claude ⬡',  icon:'⬡',  color:'#a78bfa' },
  { id:'roadmap',  label:'6-Month',   icon:'🗓',  color:'#34d399' },
]

const LEVELS = ['All Levels','Beginner','Intermediate','Advanced']

function ResourceCard({ r }) {
  return (
    <a href={r.url} target="_blank" rel="noopener noreferrer"
      style={{display:'block',textDecoration:'none',background:'var(--bg-glass)',
        border:'1px solid var(--border)',borderRadius:14,padding:'14px 16px',
        transition:'all .2s',position:'relative',overflow:'hidden'}}
      onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(167,139,250,.35)';e.currentTarget.style.transform='translateY(-1px)'}}
      onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.transform='translateY(0)'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:6,gap:8}}>
        <span style={{padding:'2px 8px',borderRadius:99,fontSize:9,fontWeight:600,
          background:'rgba(167,139,250,.12)',color:'var(--violet)',border:'1px solid rgba(167,139,250,.2)',whiteSpace:'nowrap'}}>
          {r.tag}
        </span>
        <div style={{display:'flex',gap:4,flexShrink:0}}>
          {r.free&&<span style={{padding:'2px 8px',borderRadius:99,fontSize:9,fontWeight:600,background:'rgba(52,211,153,.12)',color:'#34d399',border:'1px solid rgba(52,211,153,.2)'}}>FREE</span>}
          {r.level&&r.level!=='All Levels'&&<span style={{padding:'2px 8px',borderRadius:99,fontSize:9,fontWeight:500,background:'var(--bg-glass2)',color:'var(--t3)',border:'1px solid var(--border)'}}>{r.level}</span>}
        </div>
      </div>
      <div style={{fontFamily:'var(--font-display)',fontSize:14,fontWeight:600,color:'var(--t1)',marginBottom:3,lineHeight:1.3}}>{r.title}</div>
      <div style={{fontFamily:'var(--font-mono)',fontSize:10,color:'var(--t3)',marginBottom:6}}>{r.author}</div>
      {r.desc&&<div style={{fontFamily:'var(--font-body)',fontSize:12,color:'var(--t2)',lineHeight:1.5}}>{r.desc}</div>}
    </a>
  )
}

export default function ResourceSearch() {
  const [tab,   setTab]   = useState('courses')
  const [q,     setQ]     = useState('')
  const [level, setLevel] = useState('All Levels')
  const [tag,   setTag]   = useState('All')

  // ── Special tab renders ───────────────────────────────────────
  const renderClaude = () => (
    <div className="fade-up">
      <div style={{marginBottom:16,padding:'14px 18px',background:'var(--bg-glass)',
        border:'1px solid rgba(167,139,250,.25)',borderRadius:14,position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:0,left:0,right:0,height:2,background:'linear-gradient(90deg,#a78bfa,#22d3ee)'}}/>
        <div style={{fontFamily:'var(--font-mono)',fontSize:9,color:'var(--violet)',letterSpacing:2,textTransform:'uppercase',marginBottom:4}}>
          // OFFICIAL ANTHROPIC
        </div>
        <div style={{fontFamily:'var(--font-display)',fontSize:16,fontWeight:700,color:'var(--t1)',marginBottom:2}}>
          Claude Academy — Free Official Courses
        </div>
        <div style={{fontFamily:'var(--font-body)',fontSize:12,color:'var(--t3)'}}>
          All courses are 100% free. Some include official certificates. Start with AI Fluency → Claude 101 → API Fundamentals.
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,280px),1fr))',gap:10}}>
        {CLAUDE_COURSES.map((c,i)=>(
          <a key={i} href={c.url} target="_blank" rel="noopener noreferrer"
            style={{display:'block',textDecoration:'none',background:'var(--bg-glass)',
              border:'1px solid var(--border)',borderRadius:14,padding:'14px',
              position:'relative',overflow:'hidden',transition:'all .2s'}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(167,139,250,.4)';e.currentTarget.style.background='var(--bg-glass2)'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.background='var(--bg-glass)'}}>
            <div style={{position:'absolute',top:0,left:0,right:0,height:2,background:'linear-gradient(90deg,#a78bfa,#22d3ee)'}}/>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8}}>
              <span style={{padding:'2px 8px',borderRadius:99,fontSize:9,fontWeight:600,
                background:'rgba(167,139,250,.12)',color:'var(--violet)',border:'1px solid rgba(167,139,250,.2)'}}>
                {c.tag}
              </span>
              {c.cert&&<span style={{padding:'2px 8px',borderRadius:99,fontSize:9,fontWeight:600,
                background:'rgba(52,211,153,.12)',color:'#34d399',border:'1px solid rgba(52,211,153,.2)'}}>
                🏅 Certificate
              </span>}
            </div>
            <div style={{fontFamily:'var(--font-display)',fontSize:13,fontWeight:700,color:'var(--t1)',marginBottom:3,lineHeight:1.3}}>
              {c.title}
            </div>
            <div style={{fontFamily:'var(--font-mono)',fontSize:9,color:'var(--violet)',marginBottom:6,letterSpacing:.5}}>
              {c.phase} · {c.duration}
            </div>
            <div style={{fontFamily:'var(--font-body)',fontSize:12,color:'var(--t2)',lineHeight:1.5}}>
              {c.desc}
            </div>
          </a>
        ))}
      </div>
    </div>
  )

  const renderRoadmap = () => (
    <div className="fade-up">
      <div style={{marginBottom:16,padding:'14px 18px',background:'var(--bg-glass)',
        border:'1px solid rgba(52,211,153,.25)',borderRadius:14}}>
        <div style={{fontFamily:'var(--font-mono)',fontSize:9,color:'#34d399',letterSpacing:2,textTransform:'uppercase',marginBottom:4}}>
          // 6-MONTH PLAN
        </div>
        <div style={{fontFamily:'var(--font-display)',fontSize:16,fontWeight:700,color:'var(--t1)',marginBottom:2}}>
          AI Engineer in 6 Months — Complete Roadmap
        </div>
        <div style={{fontFamily:'var(--font-body)',fontSize:12,color:'var(--t3)'}}>
          Follow in order. Each month builds on the previous. All resources are free unless marked.
        </div>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:12}}>
        {ROADMAP.map((m,mi)=>(
          <div key={mi} style={{background:'var(--bg-glass)',border:'1px solid var(--border)',borderRadius:14,overflow:'hidden'}}>
            <div style={{padding:'12px 16px',borderBottom:'1px solid var(--border)',
              display:'flex',alignItems:'center',gap:12,
              background:`linear-gradient(135deg,${m.color}10,transparent)`}}>
              <div style={{width:40,height:40,borderRadius:12,
                background:`${m.color}18`,border:`1px solid ${m.color}30`,
                display:'flex',alignItems:'center',justifyContent:'center',
                fontSize:20,flexShrink:0}}>
                {m.emoji}
              </div>
              <div style={{flex:1}}>
                <div style={{fontFamily:'var(--font-display)',fontSize:14,fontWeight:700,color:'var(--t1)'}}>
                  {m.month}: {m.title}
                </div>
                <div style={{fontFamily:'var(--font-body)',fontSize:11,color:'var(--t3)',marginTop:1}}>
                  {m.goal}
                </div>
              </div>
            </div>
            <div style={{padding:'12px 16px'}}>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,250px),1fr))',gap:6,marginBottom:10}}>
                {m.resources.map((r,ri)=>(
                  <a key={ri} href={r.url} target="_blank" rel="noopener noreferrer"
                    style={{display:'flex',alignItems:'flex-start',gap:8,padding:'8px 10px',
                      borderRadius:8,border:'1px solid var(--border)',
                      background:'var(--bg-base)',textDecoration:'none',transition:'all .15s'}}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=m.color;e.currentTarget.style.background=`${m.color}08`}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.background='var(--bg-base)'}}>
                    <span style={{fontSize:14,flexShrink:0,marginTop:1}}>🔗</span>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontFamily:'var(--font-display)',fontSize:12,fontWeight:600,color:'var(--t1)',marginBottom:2}}>
                        {r.title}
                      </div>
                      <div style={{fontFamily:'var(--font-body)',fontSize:10,color:'var(--t3)',lineHeight:1.4}}>
                        {r.desc}
                      </div>
                    </div>
                    {r.free&&<span style={{fontSize:9,color:'#34d399',fontWeight:700,flexShrink:0,marginTop:2}}>FREE</span>}
                  </a>
                ))}
              </div>
              <div style={{padding:'8px 12px',borderRadius:8,background:'var(--bg-glass2)',
                border:'1px solid var(--border)',fontFamily:'var(--font-body)',fontSize:11}}>
                <span style={{color:m.color,fontWeight:600}}>✓ Milestone: </span>
                <span style={{color:'var(--t2)'}}>{m.milestone}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // ── Regular tab render ────────────────────────────────────────
  const allTags = ['All', ...new Set((RESOURCES[tab]||[]).map(r=>r.tag).filter(Boolean))]
  const items = (RESOURCES[tab]||[]).filter(r => {
    if (level !== 'All Levels' && r.level !== level && r.level !== 'All Levels') return false
    if (tag !== 'All' && r.tag !== tag) return false
    if (!q) return true
    const s = q.toLowerCase()
    return r.title?.toLowerCase().includes(s) || r.author?.toLowerCase().includes(s) || r.desc?.toLowerCase().includes(s)
  })

  return (
    <div className="fade-up" style={{maxWidth:1100}}>

      {/* Header */}
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
          <div style={{fontFamily:'var(--font-mono)',fontSize:9,color:'rgba(167,139,250,.6)',
            letterSpacing:3,textTransform:'uppercase',marginBottom:4}}>// RESOURCE LIBRARY</div>
          <h1 style={{fontFamily:'var(--font-display)',fontSize:'clamp(18px,3vw,26px)',fontWeight:700,
            background:'linear-gradient(135deg,var(--t1),#a78bfa)',
            WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>
            Curated AI Resources
          </h1>
          <p style={{fontFamily:'var(--font-body)',fontSize:13,color:'var(--t2)',marginTop:2}}>
            {Object.values(RESOURCES).flat().length}+ hand-picked resources · 6-month roadmap · Claude Academy
          </p>
        </div>
        <div style={{width:'clamp(180px,40%,280px)'}}>
          <input value={q} onChange={e=>setQ(e.target.value)}
            placeholder="Search resources..."
            style={{background:'var(--bg-glass2)',border:'1px solid var(--border2)',
              borderRadius:10,padding:'9px 14px',fontSize:13,color:'var(--t1)',
              outline:'none',width:'100%',fontFamily:'var(--font-body)'}}
            onFocus={e=>{e.target.style.borderColor='rgba(167,139,250,.4)'}}
            onBlur={e=>{e.target.style.borderColor='var(--border2)'}}
          />
        </div>
      </div>

      {/* Tabs */}
      <div style={{display:'flex',gap:6,marginBottom:14,overflowX:'auto',paddingBottom:4,WebkitOverflowScrolling:'touch'}}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>{setTab(t.id);setTag('All')}}
            style={{
              flexShrink:0,padding:'8px 16px',borderRadius:10,border:'1px solid',
              fontFamily:'var(--font-body)',fontSize:13,fontWeight:500,
              cursor:'pointer',transition:'all .18s',display:'flex',alignItems:'center',gap:6,
              background:tab===t.id?`${t.color}15`:'rgba(255,255,255,.04)',
              borderColor:tab===t.id?`${t.color}40`:'var(--border)',
              color:tab===t.id?t.color:'var(--t2)',
              boxShadow:tab===t.id?`0 0 12px ${t.color}20`:'none',
              minHeight:40,
            }}>
            <span>{t.icon}</span>{t.label}
            {RESOURCES[t.id]&&<span style={{fontFamily:'var(--font-mono)',fontSize:9,
              background:'var(--bg-glass2)',padding:'1px 6px',borderRadius:99,color:'var(--t3)'}}>
              {RESOURCES[t.id].length}
            </span>}
          </button>
        ))}
      </div>

      {/* Conditional renders */}
      {tab === 'claude'   && renderClaude()}
      {tab === 'roadmap'  && renderRoadmap()}

      {/* Regular resource tabs */}
      {tab !== 'claude' && tab !== 'roadmap' && (
        <>
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
            {allTags.length > 2 && (
              <>
                <span style={{fontFamily:'var(--font-mono)',fontSize:9,color:'var(--t3)',letterSpacing:1,marginLeft:8}}>TAG:</span>
                <select value={tag} onChange={e=>setTag(e.target.value)}
                  style={{padding:'4px 10px',borderRadius:8,border:'1px solid var(--border2)',
                    background:'var(--bg-glass2)',color:'var(--t2)',fontSize:12,
                    fontFamily:'var(--font-body)',cursor:'pointer',outline:'none'}}>
                  {allTags.map(t=><option key={t} value={t}>{t}</option>)}
                </select>
              </>
            )}
            <span style={{fontFamily:'var(--font-mono)',fontSize:9,color:'var(--t3)',letterSpacing:1,marginLeft:'auto'}}>
              {items.length} results
            </span>
          </div>

          {/* Resource grid */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,320px),1fr))',gap:12}}>
            {items.map((r,i)=><ResourceCard key={i} r={r}/>)}
            {items.length===0&&(
              <div style={{gridColumn:'1/-1',textAlign:'center',padding:'48px 20px',
                fontFamily:'var(--font-body)',color:'var(--t3)',fontSize:14}}>
                No resources match. Try changing filters.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
