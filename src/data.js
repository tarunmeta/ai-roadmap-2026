// ─── COMPLETE AI ENGINEER ROADMAP 2026 ───────────────────────────────────────
// Every topic has: text, tag, youtube link, difficulty

export const PHASES = [
  {
    id: 1, name: "Python Foundations", emoji: "🐍",
    color: "#38bdf8", glow: "rgba(56,189,248,0.15)",
    weeks: "1–2", duration: "2 weeks", totalWeeks: 2,
    description: "Master industrial-grade Python — the language of AI",
    weeks_data: [
      {
        week: 1, title: "Core Python",
        days: [
          {
            day: "MON", label: "Python Setup & Data Types",
            resource: "Corey Schafer – Python Tutorials",
            resourceUrl: "https://www.youtube.com/playlist?list=PL-osiE80TeTt2d9bfVyTiXJA-UTHn6WwU",
            chatgpt: "Explain Python data types with real-world analogies. Give me 5 practice exercises from beginner to intermediate. Then review my code: [paste your code here]",
            topics: [
              { id:"1-1-1", text:"Install Python 3.12+, VS Code, pyenv, virtualenv setup", tag:"Setup", yt:"https://www.youtube.com/watch?v=YYXdXT2l-Gg", ytLabel:"Python Install Guide" },
              { id:"1-1-2", text:"Variables, int, float, str, bool, list, dict, tuple, set", tag:"Core", yt:"https://www.youtube.com/watch?v=khKv-8q7YmY", ytLabel:"Python Data Types" },
              { id:"1-1-3", text:"f-strings, string methods, type casting", tag:"Core", yt:"https://www.youtube.com/watch?v=nghuHvKLhJA", ytLabel:"Python Strings" },
              { id:"1-1-4", text:"if/elif/else, comparison & logical operators", tag:"Core", yt:"https://www.youtube.com/watch?v=DZwmZ8Usvnk", ytLabel:"Python Conditionals" },
              { id:"1-1-5", text:"for loops, while loops, break/continue/pass, range()", tag:"Core", yt:"https://www.youtube.com/watch?v=6iF8Xb7Z3wQ", ytLabel:"Python Loops" },
            ]
          },
          {
            day: "TUE", label: "Functions & OOP",
            resource: "Corey Schafer – OOP Series",
            resourceUrl: "https://www.youtube.com/playlist?list=PL-osiE80TeTsqhIuOqKhwlXsIBIdSeYtc",
            chatgpt: "I'm learning Python OOP. Create a real-world Bank Account project with classes. Walk me through it step by step, explaining each OOP concept as we implement it.",
            topics: [
              { id:"1-1-6", text:"def, return, default args, *args, **kwargs, lambda", tag:"Functions", yt:"https://www.youtube.com/watch?v=9Os0o3wzS_I", ytLabel:"Python Functions" },
              { id:"1-1-7", text:"map(), filter(), sorted(), zip(), enumerate()", tag:"Functions", yt:"https://www.youtube.com/watch?v=cKlnR-CB3tI", ytLabel:"Python Built-ins" },
              { id:"1-1-8", text:"Classes, __init__, self, instance vs class attributes", tag:"OOP", yt:"https://www.youtube.com/watch?v=ZDa-Z5JzLYM", ytLabel:"Python Classes" },
              { id:"1-1-9", text:"Inheritance, super(), method overriding, MRO", tag:"OOP", yt:"https://www.youtube.com/watch?v=RSl87lqOXDE", ytLabel:"Python Inheritance" },
              { id:"1-1-10", text:"@property, dunder methods __str__ __repr__ __len__", tag:"OOP", yt:"https://www.youtube.com/watch?v=jCzT9XFZ5bw", ytLabel:"Dunder Methods" },
            ]
          },
          {
            day: "WED", label: "Advanced Python",
            resource: "Real Python – Advanced Python",
            resourceUrl: "https://realpython.com/tutorials/advanced/",
            chatgpt: "Show me 5 real production use cases for Python decorators used in frameworks like FastAPI, Flask, and Celery. Explain what's happening under the hood for each.",
            topics: [
              { id:"1-1-11", text:"List/dict/set comprehensions — one-liners that matter", tag:"Advanced", yt:"https://www.youtube.com/watch?v=3dt4OGnU5sM", ytLabel:"Python Comprehensions" },
              { id:"1-1-12", text:"Generators, yield, iterators — memory-efficient data processing", tag:"Advanced", yt:"https://www.youtube.com/watch?v=bD05uGo_sVI", ytLabel:"Python Generators" },
              { id:"1-1-13", text:"Decorators — @functools.wraps, custom decorators", tag:"Advanced", yt:"https://www.youtube.com/watch?v=FsAPt_9Bf3U", ytLabel:"Python Decorators" },
              { id:"1-1-14", text:"Context managers — with statement, __enter__ __exit__", tag:"Advanced", yt:"https://www.youtube.com/watch?v=-aKFBoZpiqA", ytLabel:"Context Managers" },
              { id:"1-1-15", text:"Error handling — try/except/finally, custom exceptions", tag:"Errors", yt:"https://www.youtube.com/watch?v=NIWwJbo-9_8", ytLabel:"Python Exceptions" },
            ]
          },
          {
            day: "THU", label: "File I/O & Modules",
            resource: "Python Docs – pathlib",
            resourceUrl: "https://docs.python.org/3/library/pathlib.html",
            chatgpt: "Show me how to add professional logging to a Python application. What logging setup do production Python apps use? Include structured JSON logging, log rotation, and log levels.",
            topics: [
              { id:"1-1-16", text:"Read/write files: text, CSV, JSON with pathlib", tag:"Files", yt:"https://www.youtube.com/watch?v=Uh2ebFW8OYM", ytLabel:"Python File I/O" },
              { id:"1-1-17", text:"import system, packages, __init__.py, relative imports", tag:"Modules", yt:"https://www.youtube.com/watch?v=GxCXiSkm6no", ytLabel:"Python Modules" },
              { id:"1-1-18", text:"Python logging module — levels, handlers, formatters", tag:"Logging", yt:"https://www.youtube.com/watch?v=-ARI4Cz-awo", ytLabel:"Python Logging" },
              { id:"1-1-19", text:"dotenv, configparser, environment variables for secrets", tag:"Config", yt:"https://www.youtube.com/watch?v=YdgIWTYQ69A", ytLabel:"Python Config" },
              { id:"1-1-20", text:"argparse & click for CLI applications", tag:"CLI", yt:"https://www.youtube.com/watch?v=cdblJqEUDNo", ytLabel:"Python CLI" },
            ]
          },
          {
            day: "FRI", label: "Type Hints & Testing",
            resource: "pytest docs",
            resourceUrl: "https://docs.pytest.org/",
            chatgpt: "Show me how to write fully typed Python code with comprehensive pytest tests. Use a data validation function as the example. Include fixtures, parametrize, and mocking.",
            topics: [
              { id:"1-1-21", text:"Type hints: List, Dict, Optional, Union, TypeVar, Protocol", tag:"Types", yt:"https://www.youtube.com/watch?v=QORvB-_mbZ0", ytLabel:"Python Type Hints" },
              { id:"1-1-22", text:"Pydantic v2 — data validation, models, validators", tag:"Pydantic", yt:"https://www.youtube.com/watch?v=502XOB0u8OY", ytLabel:"Pydantic Tutorial" },
              { id:"1-1-23", text:"pytest: test functions, fixtures, parametrize, markers", tag:"Testing", yt:"https://www.youtube.com/watch?v=cHYq1MRoyI0", ytLabel:"pytest Tutorial" },
              { id:"1-1-24", text:"async/await, asyncio, coroutines — modern Python I/O", tag:"Async", yt:"https://www.youtube.com/watch?v=t5Bo1Je9EmE", ytLabel:"Python Asyncio" },
              { id:"1-1-25", text:"httpx async client for making API requests", tag:"HTTP", yt:"https://www.youtube.com/watch?v=qAh5dDODJ3k", ytLabel:"Python httpx" },
            ]
          },
          {
            day: "SAT", label: "Git & Dev Environment",
            resource: "Corey Schafer – Git Series",
            resourceUrl: "https://www.youtube.com/playlist?list=PL-osiE80TeTuRUfjRe54Eea17-YfnOOAx",
            chatgpt: "Teach me the Git workflow used by professional engineering teams. Show me: feature branch workflow, how to write good commit messages, PR reviews, and resolving merge conflicts.",
            topics: [
              { id:"1-1-26", text:"git init, add, commit, push, pull, clone, status", tag:"Git", yt:"https://www.youtube.com/watch?v=HVsySz-h9r4", ytLabel:"Git Crash Course" },
              { id:"1-1-27", text:"Branching, merge, rebase — professional Git workflow", tag:"Git", yt:"https://www.youtube.com/watch?v=FyAAIHHClqI", ytLabel:"Git Branching" },
              { id:"1-1-28", text:".gitignore, GitHub PRs, Issues, Actions basics", tag:"GitHub", yt:"https://www.youtube.com/watch?v=RGOj5yH7evk", ytLabel:"GitHub Tutorial" },
              { id:"1-1-29", text:"poetry for dependency management (modern pip replacement)", tag:"Env", yt:"https://www.youtube.com/watch?v=0f3moPe_bhk", ytLabel:"Python Poetry" },
              { id:"1-1-30", text:"Makefile for project automation (run tests, lint, format)", tag:"Tools", yt:"https://www.youtube.com/watch?v=a8mPKBxQ9No", ytLabel:"Makefile Tutorial" },
            ]
          },
          {
            day: "SUN", label: "Project Day 🏗",
            resource: "GitHub README Guide",
            resourceUrl: "https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes",
            chatgpt: "Review my Python project [paste code]. Score it on: code quality (Pythonic style), error handling completeness, test coverage, documentation, and production readiness. Give specific improvements.",
            topics: [
              { id:"1-1-31", text:"🏗 BUILD: Weather CLI App — API fetch + logging + config + tests", tag:"Project", yt:"https://www.youtube.com/watch?v=SqvVm3QiQVk", ytLabel:"Python Project Tutorial" },
              { id:"1-1-32", text:"Push to GitHub with README, .gitignore, requirements.txt", tag:"GitHub", yt:"https://www.youtube.com/watch?v=RGOj5yH7evk", ytLabel:"GitHub Setup" },
              { id:"1-1-33", text:"Write pytest tests for all functions (aim 80%+ coverage)", tag:"Testing", yt:"https://www.youtube.com/watch?v=cHYq1MRoyI0", ytLabel:"pytest Coverage" },
            ]
          },
        ]
      },
    ]
  },

  {
    id: 2, name: "Math for AI", emoji: "📐",
    color: "#a78bfa", glow: "rgba(167,139,250,0.15)",
    weeks: "3–5", duration: "3 weeks", totalWeeks: 3,
    description: "Linear algebra, calculus, probability — with ML context",
    weeks_data: [
      {
        week: 3, title: "Linear Algebra & Calculus",
        days: [
          {
            day: "MON", label: "Vectors & Matrices",
            resource: "3Blue1Brown – Essence of Linear Algebra",
            resourceUrl: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab",
            chatgpt: "Explain matrix multiplication with a neural network forward pass example. Use actual numbers (3×3 matrices) and show me both the math and NumPy code. Where exactly do matrices appear in GPT?",
            topics: [
              { id:"2-3-1", text:"Vectors: addition, scalar multiplication, dot product, magnitude", tag:"LinAlg", yt:"https://www.youtube.com/watch?v=fNk_zzaMoSs", ytLabel:"3B1B: Vectors" },
              { id:"2-3-2", text:"Matrix multiplication — the engine of neural networks", tag:"LinAlg", yt:"https://www.youtube.com/watch?v=XkY2DOUCWMU", ytLabel:"3B1B: Matrix Mult" },
              { id:"2-3-3", text:"Transpose, inverse, identity matrix, orthogonality", tag:"LinAlg", yt:"https://www.youtube.com/watch?v=uQhTuRlWMxw", ytLabel:"3B1B: Transformations" },
              { id:"2-3-4", text:"Eigenvalues & eigenvectors — intuition for PCA", tag:"LinAlg", yt:"https://www.youtube.com/watch?v=PFDu9oVAE-g", ytLabel:"3B1B: Eigenvectors" },
              { id:"2-3-5", text:"Implement matrix ops from scratch, verify with NumPy", tag:"Code", yt:"https://www.youtube.com/watch?v=aircAruvnKk", ytLabel:"Neural Network Math" },
            ]
          },
          {
            day: "TUE", label: "Calculus & Gradients",
            resource: "3Blue1Brown – Essence of Calculus",
            resourceUrl: "https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr",
            chatgpt: "Implement gradient descent from scratch in Python to minimize f(x) = x² - 4x + 4. Animate it with matplotlib. Then explain: what happens when learning rate is too high vs too low?",
            topics: [
              { id:"2-3-6", text:"Derivatives, chain rule — the math behind backpropagation", tag:"Calculus", yt:"https://www.youtube.com/watch?v=9vKqVkMQHKk", ytLabel:"3B1B: Derivatives" },
              { id:"2-3-7", text:"Partial derivatives, gradients — direction of steepest ascent", tag:"Calculus", yt:"https://www.youtube.com/watch?v=tIpKfDc295M", ytLabel:"3B1B: Gradient" },
              { id:"2-3-8", text:"Gradient descent — visualize convergence in Python", tag:"Optim", yt:"https://www.youtube.com/watch?v=IHZwWFHWa-w", ytLabel:"Gradient Descent Visual" },
              { id:"2-3-9", text:"Loss functions: MSE, cross-entropy — why they work", tag:"Loss", yt:"https://www.youtube.com/watch?v=Skc8nqJirJg", ytLabel:"Loss Functions" },
              { id:"2-3-10", text:"Adam, AdamW, SGD with momentum — optimizer comparison", tag:"Optim", yt:"https://www.youtube.com/watch?v=mdKjMPmcWjY", ytLabel:"Optimizers Explained" },
            ]
          },
          {
            day: "WED", label: "Probability & Statistics",
            resource: "StatQuest – Statistics Fundamentals",
            resourceUrl: "https://www.youtube.com/playlist?list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9",
            chatgpt: "Explain Bayes' theorem with a spam email example showing the full calculation. Then show me exactly how Naive Bayes classifier uses this for text classification with Python code.",
            topics: [
              { id:"2-3-11", text:"Probability basics, conditional probability, Bayes' theorem", tag:"Prob", yt:"https://www.youtube.com/watch?v=9wCnvr7Xw4E", ytLabel:"StatQuest: Probability" },
              { id:"2-3-12", text:"Normal, Bernoulli, Poisson distributions — plot with scipy", tag:"Prob", yt:"https://www.youtube.com/watch?v=rzFX5NWojp0", ytLabel:"Probability Distributions" },
              { id:"2-3-13", text:"Mean, variance, std, covariance, correlation matrix", tag:"Stats", yt:"https://www.youtube.com/watch?v=SzZ6GpcfoQY", ytLabel:"StatQuest: Stats Basics" },
              { id:"2-3-14", text:"Softmax as probability distribution — temperature scaling", tag:"LLM Math", yt:"https://www.youtube.com/watch?v=8sh29x3K5jk", ytLabel:"Softmax Explained" },
              { id:"2-3-15", text:"Cross-entropy loss — information theory connection", tag:"Loss", yt:"https://www.youtube.com/watch?v=6ArSys5qHAU", ytLabel:"Cross Entropy" },
            ]
          },
          {
            day: "THU", label: "Attention Math",
            resource: "Illustrated Transformer – Jay Alammar",
            resourceUrl: "https://jalammar.github.io/illustrated-transformer/",
            chatgpt: "Walk me through self-attention mechanism mathematically using a 4-token sentence. Show every matrix multiply step with actual numbers. Then explain why we scale by √d_k.",
            topics: [
              { id:"2-3-16", text:"Self-attention: Q, K, V matrices — derivation from scratch", tag:"Attention", yt:"https://www.youtube.com/watch?v=iDulhoQ2pro", ytLabel:"Transformer Attention Math" },
              { id:"2-3-17", text:"Scaled dot-product attention formula — why the scaling", tag:"Attention", yt:"https://www.youtube.com/watch?v=eMlx5fFNoYc", ytLabel:"Attention is All You Need" },
              { id:"2-3-18", text:"Backpropagation through attention — chain rule application", tag:"Backprop", yt:"https://www.youtube.com/watch?v=VMj-3S1tku0", ytLabel:"Backprop From Scratch" },
              { id:"2-3-19", text:"Embeddings: cosine similarity, semantic space geometry", tag:"Embeddings", yt:"https://www.youtube.com/watch?v=viZrOnJclY0", ytLabel:"Word Embeddings" },
              { id:"2-3-20", text:"Implement attention in NumPy — verify shapes at each step", tag:"Code", yt:"https://www.youtube.com/watch?v=kCc8FmEb1nY", ytLabel:"Karpathy: Build GPT" },
            ]
          },
          {
            day: "FRI", label: "Math in Code Lab",
            resource: "NumPy Math Documentation",
            resourceUrl: "https://numpy.org/doc/stable/reference/routines.math.html",
            chatgpt: "I built a NumPy implementation of self-attention [paste code]. Check if my matrix dimensions are correct at every step. Show me how to extend it to multi-head attention.",
            topics: [
              { id:"2-3-21", text:"Tensors: 0D→4D, shapes in DL (batch, seq, heads, dim)", tag:"Tensors", yt:"https://www.youtube.com/watch?v=L35fFDpwIM4", ytLabel:"Tensors Explained" },
              { id:"2-3-22", text:"Broadcasting: NumPy/PyTorch rules — debug shape errors", tag:"Tensors", yt:"https://www.youtube.com/watch?v=oG1t3qlzq14", ytLabel:"Broadcasting" },
              { id:"2-3-23", text:"einsum notation — used heavily in attention code", tag:"Advanced", yt:"https://www.youtube.com/watch?v=pkVwUVEHmfI", ytLabel:"einsum Tutorial" },
              { id:"2-3-24", text:"Implement: sigmoid, tanh, ReLU, GELU from scratch", tag:"Code", yt:"https://www.youtube.com/watch?v=aircAruvnKk", ytLabel:"Activation Functions" },
              { id:"2-3-25", text:"Plot token probability distributions with temperature variations", tag:"Code", yt:"https://www.youtube.com/watch?v=AhyznRSDjw8", ytLabel:"LLM Sampling" },
            ]
          },
          {
            day: "SAT", label: "Math Project",
            resource: "Karpathy – micrograd",
            resourceUrl: "https://github.com/karpathy/micrograd",
            chatgpt: "Help me build a mini autograd engine like micrograd. I want to understand how PyTorch computes gradients. Walk me through implementing Value class with add, mul, and backward().",
            topics: [
              { id:"2-3-26", text:"🏗 BUILD: Gradient descent visualizer with matplotlib animation", tag:"Project", yt:"https://www.youtube.com/watch?v=IHZwWFHWa-w", ytLabel:"Gradient Descent Viz" },
              { id:"2-3-27", text:"🏗 BUILD: Mini autograd engine (like Karpathy's micrograd)", tag:"Project", yt:"https://www.youtube.com/watch?v=VMj-3S1tku0", ytLabel:"micrograd Tutorial" },
              { id:"2-3-28", text:"Visualize attention heatmaps for a 5-token sequence", tag:"Code", yt:"https://www.youtube.com/watch?v=eMlx5fFNoYc", ytLabel:"Attention Visualization" },
            ]
          },
          {
            day: "SUN", label: "Review & Gaps",
            resource: "Khan Academy – Linear Algebra",
            resourceUrl: "https://www.khanacademy.org/math/linear-algebra",
            chatgpt: "Quiz me on linear algebra and calculus concepts used in deep learning. Ask 10 questions. After each answer, tell me if I'm right, explain the full answer, then ask the next question.",
            topics: [
              { id:"2-3-29", text:"Review: matrix ops, gradients, attention math — fill gaps", tag:"Review", yt:"https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab", ytLabel:"3B1B Full Playlist" },
              { id:"2-3-30", text:"Complete Math-for-AI Jupyter notebook with all formulas", tag:"Review", yt:"https://www.youtube.com/watch?v=kCc8FmEb1nY", ytLabel:"GPT From Scratch" },
            ]
          },
        ]
      },
    ]
  },

  {
    id: 3, name: "NumPy, Pandas & Viz", emoji: "📊",
    color: "#34d399", glow: "rgba(52,211,153,0.15)",
    weeks: "6–8", duration: "3 weeks", totalWeeks: 3,
    description: "The data stack every AI engineer uses daily",
    weeks_data: [
      {
        week: 6, title: "NumPy & Pandas",
        days: [
          {
            day: "MON", label: "NumPy Core",
            resource: "NumPy Official Docs",
            resourceUrl: "https://numpy.org/doc/stable/",
            chatgpt: "Show me the 15 most important NumPy operations used in ML pipelines. For each: what it does, the code, and where you'd use it in training a neural network.",
            topics: [
              { id:"3-6-1", text:"ndarray: creation, zeros/ones/arange/linspace/random", tag:"NumPy", yt:"https://www.youtube.com/watch?v=QUT1VHiLmmI", ytLabel:"NumPy Tutorial" },
              { id:"3-6-2", text:"Indexing, slicing, fancy indexing, boolean masking", tag:"NumPy", yt:"https://www.youtube.com/watch?v=GB9ByFAIAH4", ytLabel:"NumPy Indexing" },
              { id:"3-6-3", text:"Reshaping: reshape, flatten, squeeze, expand_dims, ravel", tag:"NumPy", yt:"https://www.youtube.com/watch?v=lFhE0ZLgCgU", ytLabel:"NumPy Reshape" },
              { id:"3-6-4", text:"Broadcasting rules — vectorized ops instead of loops", tag:"NumPy", yt:"https://www.youtube.com/watch?v=oG1t3qlzq14", ytLabel:"NumPy Broadcasting" },
              { id:"3-6-5", text:"np.linalg: norm, dot, matmul, svd, eig, solve", tag:"NumPy", yt:"https://www.youtube.com/watch?v=8MT7Z6qFvzQ", ytLabel:"NumPy Linear Algebra" },
            ]
          },
          {
            day: "TUE", label: "Pandas Foundations",
            resource: "Corey Schafer – Pandas Series",
            resourceUrl: "https://www.youtube.com/playlist?list=PL-osiE80TeTsWmV9i9c58mdDCSskIFdDS",
            chatgpt: "Give me the 20 most used Pandas operations for data engineers. Show code for each with a realistic dataset context. Which ones are used most often in ML preprocessing pipelines?",
            topics: [
              { id:"3-6-6", text:"Series and DataFrame: creation, dtypes, attributes, info()", tag:"Pandas", yt:"https://www.youtube.com/watch?v=ZyhVh-qRZPA", ytLabel:"Pandas Tutorial" },
              { id:"3-6-7", text:"read_csv/json/excel/sql + write methods, chunking large files", tag:"Pandas", yt:"https://www.youtube.com/watch?v=yz_X3BZ0SxE", ytLabel:"Pandas Read Data" },
              { id:"3-6-8", text:".loc, .iloc, boolean filtering, .query(), .where()", tag:"Pandas", yt:"https://www.youtube.com/watch?v=xvpNA7bC8cs", ytLabel:"Pandas Indexing" },
              { id:"3-6-9", text:"Missing values: isnull, dropna, fillna, interpolate strategies", tag:"Pandas", yt:"https://www.youtube.com/watch?v=fCMrO_VzeL8", ytLabel:"Missing Data" },
              { id:"3-6-10", text:"groupby + agg + transform, pivot_table, crosstab", tag:"Pandas", yt:"https://www.youtube.com/watch?v=txMdrV1Ut64", ytLabel:"Pandas Groupby" },
            ]
          },
          {
            day: "WED", label: "Pandas Advanced",
            resource: "Pandas Official Docs",
            resourceUrl: "https://pandas.pydata.org/docs/",
            chatgpt: "Show me how to handle a real-world messy dataset: duplicate rows, wrong dtypes, inconsistent strings, outliers, and multi-source CSV files that need merging. Full pandas pipeline.",
            topics: [
              { id:"3-6-11", text:"merge, join, concat — inner/outer/left/right with examples", tag:"Pandas", yt:"https://www.youtube.com/watch?v=h4hOPGo4UVU", ytLabel:"Pandas Merge" },
              { id:"3-6-12", text:"apply, map, applymap — custom transformations at scale", tag:"Pandas", yt:"https://www.youtube.com/watch?v=P_q0tkYqvSk", ytLabel:"Pandas Apply" },
              { id:"3-6-13", text:"String accessor .str — cleaning messy text columns", tag:"Pandas", yt:"https://www.youtube.com/watch?v=yz_X3BZ0SxE", ytLabel:"Pandas String Ops" },
              { id:"3-6-14", text:"Time series: DatetimeIndex, resample, rolling, shift, ewm", tag:"Pandas", yt:"https://www.youtube.com/watch?v=r0s4slGHWzU", ytLabel:"Pandas Time Series" },
              { id:"3-6-15", text:"Memory optimization: category dtype, chunked reading", tag:"Perf", yt:"https://www.youtube.com/watch?v=u4_c2LDi4b8", ytLabel:"Pandas Performance" },
            ]
          },
          {
            day: "THU", label: "Visualization",
            resource: "Plotly Express Docs",
            resourceUrl: "https://plotly.com/python/plotly-express/",
            chatgpt: "I'm analyzing an e-commerce dataset. What are the 10 most impactful visualizations for a business stakeholder? Give me Plotly code for each and explain the business insight each reveals.",
            topics: [
              { id:"3-6-16", text:"Matplotlib: subplots, axes, figure, styling, annotations", tag:"Viz", yt:"https://www.youtube.com/playlist?list=PLQVvvaa0QuDfefDDs-OHt_-XpCKleTAS_", ytLabel:"Matplotlib Full Course" },
              { id:"3-6-17", text:"Seaborn: heatmap, pairplot, boxplot, violinplot, jointplot", tag:"Viz", yt:"https://www.youtube.com/watch?v=6GUZXDef2U0", ytLabel:"Seaborn Tutorial" },
              { id:"3-6-18", text:"Plotly Express: interactive scatter, line, bar, histogram", tag:"Viz", yt:"https://www.youtube.com/watch?v=GGL6U0k8WYA", ytLabel:"Plotly Tutorial" },
              { id:"3-6-19", text:"Plotly Dash: build interactive data dashboards", tag:"Viz", yt:"https://www.youtube.com/watch?v=hSPmj7mK6ng", ytLabel:"Plotly Dash" },
              { id:"3-6-20", text:"Correlation heatmaps, feature distribution plots for ML EDA", tag:"Viz", yt:"https://www.youtube.com/watch?v=xi0vhXFPegw", ytLabel:"EDA with Pandas" },
            ]
          },
          {
            day: "FRI", label: "SQL for Data",
            resource: "freeCodeCamp – SQL Full Course",
            resourceUrl: "https://www.youtube.com/watch?v=HXV3zeQKqFY",
            chatgpt: "Give me 15 SQL queries used by data scientists: window functions, CTEs, subqueries, aggregations. For each query, give the business question it answers and explain the logic.",
            topics: [
              { id:"3-6-21", text:"SELECT, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT", tag:"SQL", yt:"https://www.youtube.com/watch?v=HXV3zeQKqFY", ytLabel:"SQL Full Course" },
              { id:"3-6-22", text:"JOINs: INNER, LEFT, RIGHT, FULL OUTER, CROSS, SELF", tag:"SQL", yt:"https://www.youtube.com/watch?v=9yeOJ0ZMUYw", ytLabel:"SQL Joins" },
              { id:"3-6-23", text:"Window functions: ROW_NUMBER, RANK, LAG, LEAD, SUM OVER", tag:"SQL", yt:"https://www.youtube.com/watch?v=Ww71knvhQ-s", ytLabel:"SQL Window Functions" },
              { id:"3-6-24", text:"CTEs (WITH clause), subqueries, CASE WHEN", tag:"SQL", yt:"https://www.youtube.com/watch?v=K1WeoKxLZ5o", ytLabel:"SQL CTEs" },
              { id:"3-6-25", text:"SQLite + pandas: read_sql, to_sql — DB in Python scripts", tag:"SQL", yt:"https://www.youtube.com/watch?v=pd-0G0MigUA", ytLabel:"SQLite Python" },
            ]
          },
          {
            day: "SAT", label: "Feature Engineering",
            resource: "Kaggle – Feature Engineering Course",
            resourceUrl: "https://www.kaggle.com/learn/feature-engineering",
            chatgpt: "Teach me feature engineering techniques used in winning Kaggle competitions. Show: one-hot encoding, target encoding, interaction features, polynomial features, and time-based features with pandas code.",
            topics: [
              { id:"3-6-26", text:"Encoding: one-hot, label, ordinal, target, frequency encoding", tag:"FeatEng", yt:"https://www.youtube.com/watch?v=589nCGeWG1w", ytLabel:"Feature Encoding" },
              { id:"3-6-27", text:"Scaling: StandardScaler, MinMaxScaler, RobustScaler", tag:"FeatEng", yt:"https://www.youtube.com/watch?v=0HOqOcln3Z4", ytLabel:"Feature Scaling" },
              { id:"3-6-28", text:"Feature creation: polynomial, interaction, datetime extraction", tag:"FeatEng", yt:"https://www.youtube.com/watch?v=vb1sLKJl6a8", ytLabel:"Feature Engineering" },
              { id:"3-6-29", text:"Outlier detection and treatment: IQR, z-score, Isolation Forest", tag:"FeatEng", yt:"https://www.youtube.com/watch?v=4Yey3OcFHoU", ytLabel:"Outlier Detection" },
              { id:"3-6-30", text:"sklearn Pipelines: ColumnTransformer, Pipeline for full prepro", tag:"FeatEng", yt:"https://www.youtube.com/watch?v=irHhDMbw3xo", ytLabel:"sklearn Pipeline" },
            ]
          },
          {
            day: "SUN", label: "EDA Project",
            resource: "Kaggle Datasets",
            resourceUrl: "https://www.kaggle.com/datasets",
            chatgpt: "Review my EDA analysis on [dataset name]: [paste notebook summary]. Are my conclusions valid? What patterns did I miss? What 3 visualizations would make this a standout portfolio project?",
            topics: [
              { id:"3-6-31", text:"🏗 BUILD: Full EDA on Netflix / Airbnb / COVID dataset", tag:"Project", yt:"https://www.youtube.com/watch?v=xi0vhXFPegw", ytLabel:"EDA Project Example" },
              { id:"3-6-32", text:"Create 8 visualizations that tell a data story", tag:"Project", yt:"https://www.youtube.com/watch?v=GGL6U0k8WYA", ytLabel:"Data Storytelling" },
              { id:"3-6-33", text:"Write 5 business insights from the analysis in README", tag:"Project", yt:"https://www.youtube.com/watch?v=u3jyGqxZ7yQ", ytLabel:"Data Analysis Report" },
            ]
          },
        ]
      },
    ]
  },

  {
    id: 4, name: "Machine Learning", emoji: "🤖",
    color: "#fbbf24", glow: "rgba(251,191,36,0.15)",
    weeks: "9–14", duration: "6 weeks", totalWeeks: 6,
    description: "Classical ML — the foundation every AI engineer needs",
    weeks_data: [
      {
        week: 9, title: "Core ML Algorithms",
        days: [
          {
            day: "MON", label: "ML Fundamentals",
            resource: "Andrew Ng – ML Specialization",
            resourceUrl: "https://www.youtube.com/playlist?list=PLkDaE6sCZn6FNC6YRfRQc_FbeQrF8BwGI",
            chatgpt: "Explain the bias-variance tradeoff with visual intuition. Give me 3 real examples of high-bias and 3 of high-variance models in production. How do you diagnose and fix each?",
            topics: [
              { id:"4-9-1", text:"Supervised vs unsupervised vs self-supervised vs RL", tag:"ML", yt:"https://www.youtube.com/watch?v=aircAruvnKk", ytLabel:"Types of ML" },
              { id:"4-9-2", text:"Train/val/test split — data leakage prevention strategies", tag:"ML", yt:"https://www.youtube.com/watch?v=fSytzGwwBVw", ytLabel:"Train Test Split" },
              { id:"4-9-3", text:"Bias-variance tradeoff, overfitting, underfitting, regularization", tag:"ML", yt:"https://www.youtube.com/watch?v=EuBBz3bI-aA", ytLabel:"Bias Variance" },
              { id:"4-9-4", text:"Linear & logistic regression — math + sklearn implementation", tag:"Regression", yt:"https://www.youtube.com/watch?v=nk2CQITm_eo", ytLabel:"Linear Regression" },
              { id:"4-9-5", text:"Evaluation: accuracy, precision, recall, F1, ROC-AUC, RMSE", tag:"Eval", yt:"https://www.youtube.com/watch?v=85dtiMz9tSo", ytLabel:"ML Metrics" },
            ]
          },
          {
            day: "TUE", label: "Tree-Based Models",
            resource: "StatQuest – Decision Trees",
            resourceUrl: "https://www.youtube.com/watch?v=_L39rN6gz7Y",
            chatgpt: "Explain Random Forest vs XGBoost vs LightGBM. Give me a decision framework: when to use each for tabular data? Show me a complete XGBoost training pipeline with early stopping and Optuna tuning.",
            topics: [
              { id:"4-9-6", text:"Decision Trees: Gini impurity, information gain, pruning", tag:"Trees", yt:"https://www.youtube.com/watch?v=_L39rN6gz7Y", ytLabel:"StatQuest: Decision Trees" },
              { id:"4-9-7", text:"Random Forest: bagging, feature importance, OOB score", tag:"Ensemble", yt:"https://www.youtube.com/watch?v=J4Wdy0Wc_xQ", ytLabel:"StatQuest: Random Forest" },
              { id:"4-9-8", text:"XGBoost: architecture, hyperparameters, early stopping", tag:"Boosting", yt:"https://www.youtube.com/watch?v=OtD8wVaFm6E", ytLabel:"StatQuest: XGBoost" },
              { id:"4-9-9", text:"LightGBM: histogram-based, leaf-wise, speed vs accuracy", tag:"Boosting", yt:"https://www.youtube.com/watch?v=n_ZMQj09S6w", ytLabel:"LightGBM Tutorial" },
              { id:"4-9-10", text:"Optuna for hyperparameter tuning — automated HPO", tag:"HPO", yt:"https://www.youtube.com/watch?v=P6NwZVl8ttc", ytLabel:"Optuna Tutorial" },
            ]
          },
          {
            day: "WED", label: "Unsupervised Learning",
            resource: "StatQuest – K-Means & PCA",
            resourceUrl: "https://www.youtube.com/watch?v=4b5d3muPQmA",
            chatgpt: "Show me PCA step by step on a 5-feature dataset. Explain what each principal component represents. Then show me how to decide how many components to keep using the explained variance ratio.",
            topics: [
              { id:"4-9-11", text:"K-Means: inertia, elbow method, silhouette score", tag:"Clustering", yt:"https://www.youtube.com/watch?v=4b5d3muPQmA", ytLabel:"StatQuest: K-Means" },
              { id:"4-9-12", text:"DBSCAN: density-based clustering, epsilon, min_samples", tag:"Clustering", yt:"https://www.youtube.com/watch?v=RDZUdRSDOok", ytLabel:"DBSCAN Tutorial" },
              { id:"4-9-13", text:"PCA: explained variance, components, scree plot", tag:"DimRed", yt:"https://www.youtube.com/watch?v=FgakZw6K1QQ", ytLabel:"StatQuest: PCA" },
              { id:"4-9-14", text:"t-SNE, UMAP — visualization of high-dim embeddings", tag:"DimRed", yt:"https://www.youtube.com/watch?v=NEaUSP4YerM", ytLabel:"t-SNE Explained" },
              { id:"4-9-15", text:"Anomaly detection: Isolation Forest, One-Class SVM", tag:"Anomaly", yt:"https://www.youtube.com/watch?v=piF6D6CQxUw", ytLabel:"Anomaly Detection" },
            ]
          },
          {
            day: "THU", label: "sklearn Pipelines",
            resource: "sklearn Pipeline Docs",
            resourceUrl: "https://scikit-learn.org/stable/modules/pipeline.html",
            chatgpt: "Build a complete sklearn Pipeline for a classification problem: preprocessing (numeric + categorical), model, and cross-validation. Show me how to use ColumnTransformer and GridSearchCV together.",
            topics: [
              { id:"4-9-16", text:"sklearn Pipeline: ColumnTransformer, estimators, fit/predict", tag:"Pipeline", yt:"https://www.youtube.com/watch?v=irHhDMbw3xo", ytLabel:"sklearn Pipeline" },
              { id:"4-9-17", text:"Cross-validation: k-fold, stratified, StratifiedGroupKFold", tag:"CV", yt:"https://www.youtube.com/watch?v=fSytzGwwBVw", ytLabel:"Cross Validation" },
              { id:"4-9-18", text:"GridSearchCV, RandomizedSearchCV, HalvingGridSearchCV", tag:"HPO", yt:"https://www.youtube.com/watch?v=Gol_qOgRqfA", ytLabel:"Hyperparameter Tuning" },
              { id:"4-9-19", text:"Model persistence: joblib, pickle, sklearn Model Card", tag:"MLOps", yt:"https://www.youtube.com/watch?v=2P3W2XFZC4E", ytLabel:"Save ML Models" },
              { id:"4-9-20", text:"SHAP values: explain any model prediction to stakeholders", tag:"XAI", yt:"https://www.youtube.com/watch?v=VB9uV-x0gtg", ytLabel:"SHAP Explainability" },
            ]
          },
          {
            day: "FRI", label: "NLP Fundamentals",
            resource: "HuggingFace NLP Course",
            resourceUrl: "https://huggingface.co/learn/nlp-course",
            chatgpt: "Walk me through classical NLP pipeline for text classification: tokenization, TF-IDF, train/eval. Then explain why transformers replaced this approach and what they do better.",
            topics: [
              { id:"4-9-21", text:"Text preprocessing: tokenization, stopwords, stemming, lemmatization", tag:"NLP", yt:"https://www.youtube.com/watch?v=vyOgWhwUmec", ytLabel:"NLP Preprocessing" },
              { id:"4-9-22", text:"TF-IDF, Bag-of-Words, n-grams for text features", tag:"NLP", yt:"https://www.youtube.com/watch?v=4vT4fuhnroA", ytLabel:"TF-IDF Explained" },
              { id:"4-9-23", text:"Text classification pipeline: TF-IDF + Logistic Regression", tag:"NLP", yt:"https://www.youtube.com/watch?v=M7SWr5xObkA", ytLabel:"Text Classification" },
              { id:"4-9-24", text:"spaCy NLP pipeline: NER, POS tagging, dependency parsing", tag:"NLP", yt:"https://www.youtube.com/watch?v=WnGPv6HnBok", ytLabel:"spaCy Tutorial" },
              { id:"4-9-25", text:"Regular expressions for text cleaning (re module)", tag:"NLP", yt:"https://www.youtube.com/watch?v=K8L6KVGG-7o", ytLabel:"Regex in Python" },
            ]
          },
          {
            day: "SAT", label: "ML Project Day",
            resource: "Kaggle Competitions",
            resourceUrl: "https://www.kaggle.com/competitions",
            chatgpt: "Review my customer churn classifier [paste code]. Check: feature engineering, model selection rationale, evaluation metrics, data leakage risks, and how to improve AUC-ROC by 5%.",
            topics: [
              { id:"4-9-26", text:"🏗 BUILD: Customer Churn Predictor — end-to-end pipeline", tag:"Project", yt:"https://www.youtube.com/watch?v=ZoQMp5AAAJE", ytLabel:"ML Project Tutorial" },
              { id:"4-9-27", text:"🏗 BUILD: Spam Classifier — TF-IDF + Naive Bayes/LR", tag:"Project", yt:"https://www.youtube.com/watch?v=M7SWr5xObkA", ytLabel:"Spam Detection" },
              { id:"4-9-28", text:"Enter a Kaggle competition (Titanic or Playground)", tag:"Kaggle", yt:"https://www.youtube.com/watch?v=I3FBJdiExcg", ytLabel:"Kaggle for Beginners" },
            ]
          },
          {
            day: "SUN", label: "Review & Polish",
            resource: "sklearn User Guide",
            resourceUrl: "https://scikit-learn.org/stable/user_guide.html",
            chatgpt: "Quiz me on machine learning concepts. Ask 10 questions covering: evaluation metrics, model selection, overfitting, feature engineering, and ensemble methods. Give detailed feedback after each answer.",
            topics: [
              { id:"4-9-29", text:"Review: all ML algorithms, when to use each, pros/cons", tag:"Review", yt:"https://www.youtube.com/watch?v=aircAruvnKk", ytLabel:"ML Algorithm Review" },
              { id:"4-9-30", text:"Polish Kaggle submission — feature engineering iteration", tag:"Kaggle", yt:"https://www.youtube.com/watch?v=I3FBJdiExcg", ytLabel:"Kaggle Tips" },
            ]
          },
        ]
      },
    ]
  },

  {
    id: 5, name: "Deep Learning & PyTorch", emoji: "🧠",
    color: "#f87171", glow: "rgba(248,113,113,0.15)",
    weeks: "15–21", duration: "7 weeks", totalWeeks: 7,
    description: "PyTorch, CNNs, Transformers — build them from scratch",
    weeks_data: [
      {
        week: 15, title: "PyTorch & Neural Networks",
        days: [
          {
            day: "MON", label: "PyTorch Fundamentals",
            resource: "PyTorch Official Tutorials",
            resourceUrl: "https://pytorch.org/tutorials/",
            chatgpt: "Explain PyTorch autograd with a simple computation graph. Trace through .backward() step by step showing exactly what gradients are computed. Then show me how to debug NaN gradients.",
            topics: [
              { id:"5-15-1", text:"Tensors: creation, operations, .to(device), GPU/CPU transfer", tag:"PyTorch", yt:"https://www.youtube.com/watch?v=exaWOE8jvy8", ytLabel:"PyTorch Crash Course" },
              { id:"5-15-2", text:"Autograd: requires_grad, .backward(), .grad, detach()", tag:"PyTorch", yt:"https://www.youtube.com/watch?v=ORMx45xqWkA", ytLabel:"PyTorch Autograd" },
              { id:"5-15-3", text:"nn.Module: __init__, forward, parameters(), state_dict()", tag:"PyTorch", yt:"https://www.youtube.com/watch?v=c36lUUr864M", ytLabel:"PyTorch nn.Module" },
              { id:"5-15-4", text:"Dataset, DataLoader, custom __getitem__, __len__, collate_fn", tag:"PyTorch", yt:"https://www.youtube.com/watch?v=PXOzkkB5eH0", ytLabel:"PyTorch DataLoader" },
              { id:"5-15-5", text:"Complete training loop: forward → loss → backward → step", tag:"PyTorch", yt:"https://www.youtube.com/watch?v=V_xro1bcAuA", ytLabel:"PyTorch Training Loop" },
            ]
          },
          {
            day: "TUE", label: "Training Best Practices",
            resource: "Andrej Karpathy – Recipe for NNs",
            resourceUrl: "http://karpathy.github.io/2019/04/25/recipe/",
            chatgpt: "Show me the production PyTorch training template used in real research: includes validation loop, early stopping, LR scheduler, gradient clipping, mixed precision, and wandb logging.",
            topics: [
              { id:"5-15-6", text:"BatchNorm, LayerNorm, DropOut — when and why to use each", tag:"Regularize", yt:"https://www.youtube.com/watch?v=dXB-KQYkzNU", ytLabel:"BatchNorm Explained" },
              { id:"5-15-7", text:"Activation functions: ReLU, GELU, SiLU — modern choices", tag:"Activations", yt:"https://www.youtube.com/watch?v=-7scQpJT7uo", ytLabel:"Activation Functions" },
              { id:"5-15-8", text:"LR schedulers: CosineAnnealingLR, OneCycleLR, warmup", tag:"Training", yt:"https://www.youtube.com/watch?v=skwwZQJRGN4", ytLabel:"LR Schedulers" },
              { id:"5-15-9", text:"Mixed precision training (torch.cuda.amp) — 2x speedup", tag:"Perf", yt:"https://www.youtube.com/watch?v=eFQSyFH9PmY", ytLabel:"Mixed Precision" },
              { id:"5-15-10", text:"Weights & Biases (wandb): experiment tracking, loss curves", tag:"MLOps", yt:"https://www.youtube.com/watch?v=EEqKfWbM8Po", ytLabel:"wandb Tutorial" },
            ]
          },
          {
            day: "WED", label: "CNNs",
            resource: "CS231n CNN Notes",
            resourceUrl: "https://cs231n.github.io/",
            chatgpt: "Explain convolutional layers intuitively — what is each filter learning to detect? Build LeNet-5 for MNIST in PyTorch from scratch, explaining every architectural decision.",
            topics: [
              { id:"5-15-11", text:"Conv2d: kernel, stride, padding, output size formula", tag:"CNN", yt:"https://www.youtube.com/watch?v=pDdP0TFzsoQ", ytLabel:"CNNs Explained" },
              { id:"5-15-12", text:"MaxPool, AvgPool, Global Average Pooling, AdaptiveAvgPool", tag:"CNN", yt:"https://www.youtube.com/watch?v=8oOgPUO-TBY", ytLabel:"Pooling Layers" },
              { id:"5-15-13", text:"ResNet skip connections — solving vanishing gradients in CNNs", tag:"CNN", yt:"https://www.youtube.com/watch?v=GWt6Fu05voI", ytLabel:"ResNet Explained" },
              { id:"5-15-14", text:"Transfer learning: freeze layers, replace head, fine-tune", tag:"Transfer", yt:"https://www.youtube.com/watch?v=LsdxvjLWkIY", ytLabel:"Transfer Learning" },
              { id:"5-15-15", text:"torchvision: transforms, datasets, models, data augmentation", tag:"Vision", yt:"https://www.youtube.com/watch?v=l9RVRqYMXco", ytLabel:"torchvision Tutorial" },
            ]
          },
          {
            day: "THU", label: "Transformers from Scratch",
            resource: "Karpathy – nanoGPT",
            resourceUrl: "https://github.com/karpathy/nanoGPT",
            chatgpt: "Walk me through implementing a single transformer encoder block from scratch in PyTorch. Explain every line. Why residual connections? What breaks without LayerNorm?",
            topics: [
              { id:"5-15-16", text:"Multi-head self-attention in PyTorch — full implementation", tag:"Transformer", yt:"https://www.youtube.com/watch?v=kCc8FmEb1nY", ytLabel:"Karpathy: Build GPT" },
              { id:"5-15-17", text:"Positional encoding: sinusoidal and rotary (RoPE)", tag:"Transformer", yt:"https://www.youtube.com/watch?v=dichIcUZfOw", ytLabel:"Positional Encoding" },
              { id:"5-15-18", text:"Transformer encoder block: MHA + FFN + residuals + LayerNorm", tag:"Transformer", yt:"https://www.youtube.com/watch?v=eMlx5fFNoYc", ytLabel:"Transformer Architecture" },
              { id:"5-15-19", text:"Vision Transformer (ViT) — images as token sequences", tag:"ViT", yt:"https://www.youtube.com/watch?v=TrdevFK_am4", ytLabel:"ViT Explained" },
              { id:"5-15-20", text:"Flash Attention — memory-efficient attention for long sequences", tag:"Efficiency", yt:"https://www.youtube.com/watch?v=gMOAud7hZg4", ytLabel:"Flash Attention" },
            ]
          },
          {
            day: "FRI", label: "HuggingFace Transformers",
            resource: "HuggingFace NLP Course",
            resourceUrl: "https://huggingface.co/learn/nlp-course/chapter1/1",
            chatgpt: "Show me HuggingFace pipeline API for 5 NLP tasks: classification, NER, summarization, translation, QA. For each: when to use pipeline vs custom code, and the performance tradeoffs.",
            topics: [
              { id:"5-15-21", text:"HuggingFace pipeline API — 5 NLP tasks with one function", tag:"HF", yt:"https://www.youtube.com/watch?v=QEaBAZQCtwE", ytLabel:"HuggingFace Pipeline" },
              { id:"5-15-22", text:"AutoTokenizer, AutoModel, AutoModelForSequenceClassification", tag:"HF", yt:"https://www.youtube.com/watch?v=00GKzGyWFEs", ytLabel:"HuggingFace Full Course" },
              { id:"5-15-23", text:"Trainer API: TrainingArguments, compute_metrics, callbacks", tag:"HF", yt:"https://www.youtube.com/watch?v=u--UVvH-LIQ", ytLabel:"HF Trainer API" },
              { id:"5-15-24", text:"Datasets library: load_dataset, map, filter, push_to_hub", tag:"HF", yt:"https://www.youtube.com/watch?v=Xq9nD4DZI0I", ytLabel:"HF Datasets" },
              { id:"5-15-25", text:"BERT fine-tuning for text classification — full example", tag:"HF", yt:"https://www.youtube.com/watch?v=x9tIcuYzqeA", ytLabel:"BERT Fine-tuning" },
            ]
          },
          {
            day: "SAT", label: "DL Project",
            resource: "Kaggle – Deep Learning",
            resourceUrl: "https://www.kaggle.com/learn/deep-learning",
            chatgpt: "Review my PyTorch image classifier [paste code]. Check: data augmentation strategy, model architecture, training loop, overfitting indicators, and deployment readiness.",
            topics: [
              { id:"5-15-26", text:"🏗 BUILD: Image Classifier — EfficientNet fine-tune + wandb", tag:"Project", yt:"https://www.youtube.com/watch?v=LsdxvjLWkIY", ytLabel:"Image Classification" },
              { id:"5-15-27", text:"🏗 BUILD: Text Sentiment API — fine-tuned BERT + FastAPI", tag:"Project", yt:"https://www.youtube.com/watch?v=x9tIcuYzqeA", ytLabel:"Sentiment Model" },
              { id:"5-15-28", text:"🏗 BUILD: Implement nanoGPT — train on tiny Shakespeare", tag:"Project", yt:"https://www.youtube.com/watch?v=kCc8FmEb1nY", ytLabel:"Karpathy nanoGPT" },
            ]
          },
          {
            day: "SUN", label: "Review + Optimization",
            resource: "PyTorch Performance Docs",
            resourceUrl: "https://pytorch.org/tutorials/recipes/recipes/tuning_guide.html",
            chatgpt: "Quiz me on deep learning: backpropagation, attention mechanism, transformer architecture, training stability, and hyperparameter tuning. Ask 10 questions with detailed explanations.",
            topics: [
              { id:"5-15-29", text:"Model optimization: ONNX export, TorchScript, quantization", tag:"Optimize", yt:"https://www.youtube.com/watch?v=MuIPAcMBBw0", ytLabel:"Model Optimization" },
              { id:"5-15-30", text:"Profile training: torch.profiler, identify bottlenecks", tag:"Perf", yt:"https://www.youtube.com/watch?v=GxCXiSkm6no", ytLabel:"PyTorch Profiler" },
            ]
          },
        ]
      },
    ]
  },

  {
    id: 6, name: "LLMs & Generative AI", emoji: "🤯",
    color: "#fb923c", glow: "rgba(251,146,60,0.15)",
    weeks: "22–28", duration: "7 weeks", totalWeeks: 7,
    description: "The core of modern AI engineering — LLMs, RAG, fine-tuning",
    weeks_data: [
      {
        week: 22, title: "LLM APIs & Prompt Engineering",
        days: [
          {
            day: "MON", label: "How LLMs Work",
            resource: "Karpathy – Let's Build GPT",
            resourceUrl: "https://www.youtube.com/watch?v=kCc8FmEb1nY",
            chatgpt: "Explain tokenization in LLMs with tiktoken. Show how GPT tokenizes 'tokenization' differently than 'token'. Why does token counting matter for API costs? Show the math for estimating costs.",
            topics: [
              { id:"6-22-1", text:"Tokenization: BPE, WordPiece — use tiktoken to count tokens", tag:"LLM", yt:"https://www.youtube.com/watch?v=kCc8FmEb1nY", ytLabel:"Karpathy: GPT from Scratch" },
              { id:"6-22-2", text:"Context windows, KV cache, attention sink in LLMs", tag:"LLM", yt:"https://www.youtube.com/watch?v=AhyznRSDjw8", ytLabel:"LLM Context Window" },
              { id:"6-22-3", text:"Autoregressive generation: greedy, beam, top-k, top-p, temp", tag:"LLM", yt:"https://www.youtube.com/watch?v=8MT7Z6qFvzQ", ytLabel:"LLM Sampling" },
              { id:"6-22-4", text:"LLM landscape 2026: GPT-4o, Claude 3.5, Gemini, Llama-3, Mistral", tag:"LLM", yt:"https://www.youtube.com/watch?v=zjkBMFhNj_g", ytLabel:"LLM Comparison" },
              { id:"6-22-5", text:"OpenAI & Anthropic API setup, cost estimation, rate limits", tag:"API", yt:"https://www.youtube.com/watch?v=OB99E7Y1cMA", ytLabel:"OpenAI API Quickstart" },
            ]
          },
          {
            day: "TUE", label: "OpenAI API Mastery",
            resource: "OpenAI API Docs",
            resourceUrl: "https://platform.openai.com/docs",
            chatgpt: "Show me OpenAI function calling with a real example: a weather assistant that calls a mock API. Include: tool schema definition, response parsing, calling the function, returning results to the model.",
            topics: [
              { id:"6-22-6", text:"Chat Completions API: system/user/assistant roles, messages", tag:"API", yt:"https://www.youtube.com/watch?v=OB99E7Y1cMA", ytLabel:"OpenAI API Tutorial" },
              { id:"6-22-7", text:"Function calling / tool use — structured JSON outputs", tag:"API", yt:"https://www.youtube.com/watch?v=0lOSvOoF2to", ytLabel:"OpenAI Function Calling" },
              { id:"6-22-8", text:"Streaming responses with SSE — token-by-token display", tag:"API", yt:"https://www.youtube.com/watch?v=GlF5cQMpVCI", ytLabel:"OpenAI Streaming" },
              { id:"6-22-9", text:"Instructor library — structured Pydantic outputs from LLMs", tag:"Structured", yt:"https://www.youtube.com/watch?v=yj-wSRJwrrc", ytLabel:"Instructor Library" },
              { id:"6-22-10", text:"Anthropic Claude API: messages, vision, tool use, system prompt", tag:"API", yt:"https://www.youtube.com/watch?v=QGHIBnmxWpk", ytLabel:"Claude API Tutorial" },
            ]
          },
          {
            day: "WED", label: "Prompt Engineering Pro",
            resource: "DeepLearning.AI – Prompt Engineering",
            resourceUrl: "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/",
            chatgpt: "I need to extract structured data (name, date, amount, category) from messy invoice text. Show me 3 prompting strategies: few-shot, chain-of-thought, and JSON mode. Compare reliability of each.",
            topics: [
              { id:"6-22-11", text:"Zero-shot, few-shot prompting — when each works best", tag:"Prompting", yt:"https://www.youtube.com/watch?v=dOxUroR57xs", ytLabel:"Prompt Engineering" },
              { id:"6-22-12", text:"Chain-of-Thought (CoT) prompting — reasoning step by step", tag:"Prompting", yt:"https://www.youtube.com/watch?v=bSvTVREwSNw", ytLabel:"Chain of Thought" },
              { id:"6-22-13", text:"ReAct pattern: Reason + Act loop for agent-like behavior", tag:"Prompting", yt:"https://www.youtube.com/watch?v=Eug2clsLtFs", ytLabel:"ReAct Pattern" },
              { id:"6-22-14", text:"System prompt design: persona, constraints, output format", tag:"Prompting", yt:"https://www.youtube.com/watch?v=jC4v5AS4RIM", ytLabel:"System Prompts" },
              { id:"6-22-15", text:"Prompt injection attacks — defense strategies", tag:"Security", yt:"https://www.youtube.com/watch?v=Sv5OLj2nVAQ", ytLabel:"Prompt Injection" },
            ]
          },
          {
            day: "THU", label: "Embeddings & Vector Search",
            resource: "Sentence Transformers Docs",
            resourceUrl: "https://sbert.net/",
            chatgpt: "Build a semantic search system from scratch: embed 100 docs, store in FAISS, query by meaning. When should I use FAISS locally vs Pinecone managed? Include cost comparison.",
            topics: [
              { id:"6-22-16", text:"OpenAI text-embedding-3 API — embed text for semantic search", tag:"Embeddings", yt:"https://www.youtube.com/watch?v=viZrOnJclY0", ytLabel:"Embeddings Explained" },
              { id:"6-22-17", text:"Sentence Transformers: all-MiniLM, BGE-M3, E5-large", tag:"Embeddings", yt:"https://www.youtube.com/watch?v=L39rN6gz7Y", ytLabel:"Sentence Transformers" },
              { id:"6-22-18", text:"FAISS: IndexFlatL2, IndexIVFFlat, IndexHNSWFlat — local search", tag:"VectorDB", yt:"https://www.youtube.com/watch?v=sKyvsdEv6rk", ytLabel:"FAISS Tutorial" },
              { id:"6-22-19", text:"ChromaDB: persist, collection, query, metadata filtering", tag:"VectorDB", yt:"https://www.youtube.com/watch?v=QdDoFfkVkcw", ytLabel:"ChromaDB Tutorial" },
              { id:"6-22-20", text:"Pinecone: namespaces, upsert, query, pod vs serverless", tag:"VectorDB", yt:"https://www.youtube.com/watch?v=dRUIGgNBvVk", ytLabel:"Pinecone Tutorial" },
            ]
          },
          {
            day: "FRI", label: "LangChain & LlamaIndex",
            resource: "LangChain Docs",
            resourceUrl: "https://python.langchain.com/docs/",
            chatgpt: "Compare LangChain vs LlamaIndex for a RAG pipeline over 500 PDFs. Show the same pipeline built with both frameworks side by side. Which would you use in production and why?",
            topics: [
              { id:"6-22-21", text:"LangChain LCEL: pipe operator, Runnable, RunnableParallel", tag:"LangChain", yt:"https://www.youtube.com/watch?v=RoR4XJw8wIc", ytLabel:"LangChain LCEL" },
              { id:"6-22-22", text:"ChatPromptTemplate, MessagesPlaceholder, SystemMessage", tag:"LangChain", yt:"https://www.youtube.com/watch?v=mrjq3lFz23s", ytLabel:"LangChain Prompts" },
              { id:"6-22-23", text:"Memory: ConversationBuffer, ConversationSummary, Redis-backed", tag:"LangChain", yt:"https://www.youtube.com/watch?v=X550Zbz_ROE", ytLabel:"LangChain Memory" },
              { id:"6-22-24", text:"LlamaIndex: VectorStoreIndex, query engines, retrievers", tag:"LlamaIndex", yt:"https://www.youtube.com/watch?v=LWZ1lMrEpcc", ytLabel:"LlamaIndex Tutorial" },
              { id:"6-22-25", text:"Document loaders: PDF, web, YouTube, Notion, Confluence", tag:"Loaders", yt:"https://www.youtube.com/watch?v=hhGkM-rlc-k", ytLabel:"Document Loaders" },
            ]
          },
          {
            day: "SAT", label: "RAG Systems",
            resource: "DeepLearning.AI – RAG Course",
            resourceUrl: "https://www.deeplearning.ai/short-courses/building-evaluating-advanced-rag/",
            chatgpt: "Explain chunking strategies for RAG. Compare: fixed-size, sentence, recursive, semantic chunking. Show me how chunk size and overlap affect retrieval quality with a concrete test.",
            topics: [
              { id:"6-22-26", text:"RAG pipeline: load → chunk → embed → store → retrieve → gen", tag:"RAG", yt:"https://www.youtube.com/watch?v=tcqEUSNCn8I", ytLabel:"RAG from Scratch" },
              { id:"6-22-27", text:"Chunking: RecursiveCharacter, semantic, sentence splitters", tag:"RAG", yt:"https://www.youtube.com/watch?v=8OJC21T2SL4", ytLabel:"RAG Chunking" },
              { id:"6-22-28", text:"Hybrid search: dense + BM25 sparse — beats dense alone", tag:"RAG", yt:"https://www.youtube.com/watch?v=zILF3wzbaco", ytLabel:"Hybrid Search RAG" },
              { id:"6-22-29", text:"Re-ranking: Cohere Rerank, cross-encoder models", tag:"RAG", yt:"https://www.youtube.com/watch?v=o6e0SFJZ60c", ytLabel:"RAG Reranking" },
              { id:"6-22-30", text:"RAG evaluation: RAGAS — faithfulness, relevancy, recall", tag:"RAG Eval", yt:"https://www.youtube.com/watch?v=1FiLNnZ1Yys", ytLabel:"RAGAS Evaluation" },
            ]
          },
          {
            day: "SUN", label: "LLM Projects",
            resource: "LangSmith Docs",
            resourceUrl: "https://docs.smith.langchain.com/",
            chatgpt: "Review my RAG pipeline [paste code]. Check: chunking strategy, embedding model choice, retrieval precision, prompt template quality, and how to add LangSmith tracing.",
            topics: [
              { id:"6-22-31", text:"🏗 BUILD: PDF Q&A System with citations (Streamlit UI)", tag:"Project", yt:"https://www.youtube.com/watch?v=dXxQ0LR-3Hg", ytLabel:"PDF Q&A Tutorial" },
              { id:"6-22-32", text:"🏗 BUILD: AI Chatbot with persistent memory + streaming", tag:"Project", yt:"https://www.youtube.com/watch?v=pppnwp8WDDI", ytLabel:"LangChain Chatbot" },
              { id:"6-22-33", text:"Add LangSmith tracing — debug and evaluate your RAG", tag:"Monitoring", yt:"https://www.youtube.com/watch?v=Hab2CV_0hpQ", ytLabel:"LangSmith Tutorial" },
            ]
          },
        ]
      },
    ]
  },

  {
    id: 7, name: "AI Agents", emoji: "🕵️",
    color: "#818cf8", glow: "rgba(129,140,248,0.15)",
    weeks: "29–32", duration: "4 weeks", totalWeeks: 4,
    description: "Build autonomous AI systems with tools and memory",
    weeks_data: [
      {
        week: 29, title: "Agents & Multi-Agent Systems",
        days: [
          {
            day: "MON", label: "Agent Fundamentals",
            resource: "LangChain Agents Docs",
            resourceUrl: "https://python.langchain.com/docs/modules/agents/",
            chatgpt: "Explain the ReAct agent loop step by step. Show me a simple agent with 3 tools (calculator, web search, file reader) built from scratch with LangChain. Trace through a full example run.",
            topics: [
              { id:"7-29-1", text:"ReAct pattern: Thought → Action → Observation loop", tag:"Agents", yt:"https://www.youtube.com/watch?v=Eug2clsLtFs", ytLabel:"ReAct Agents" },
              { id:"7-29-2", text:"Tool definition: @tool decorator, StructuredTool, BaseTool", tag:"Tools", yt:"https://www.youtube.com/watch?v=Yw5MDpnSIZs", ytLabel:"LangChain Tools" },
              { id:"7-29-3", text:"LangGraph: StateGraph, nodes, edges, conditional routing", tag:"LangGraph", yt:"https://www.youtube.com/watch?v=R-o_a6dvzQM", ytLabel:"LangGraph Tutorial" },
              { id:"7-29-4", text:"Agent memory: short-term (history) + long-term (vector store)", tag:"Memory", yt:"https://www.youtube.com/watch?v=X550Zbz_ROE", ytLabel:"Agent Memory" },
              { id:"7-29-5", text:"Human-in-the-loop: interrupt nodes, approval gates", tag:"HITL", yt:"https://www.youtube.com/watch?v=l1qi7iRPkss", ytLabel:"LangGraph HITL" },
            ]
          },
          {
            day: "TUE", label: "Agent Tools",
            resource: "Tavily Search API",
            resourceUrl: "https://tavily.com/",
            chatgpt: "Show me how to build 5 production-grade custom tools for a LangChain agent: database query, REST API caller, file processor, Python REPL, and email sender. Include proper error handling.",
            topics: [
              { id:"7-29-6", text:"Web search: Tavily API — best LLM-optimized search tool", tag:"Tools", yt:"https://www.youtube.com/watch?v=uRQH2CFvedY", ytLabel:"Tavily + LangChain" },
              { id:"7-29-7", text:"Code execution: Python REPL, E2B sandboxed code runner", tag:"Tools", yt:"https://www.youtube.com/watch?v=Z5mZFPvLPkk", ytLabel:"Code Execution Agent" },
              { id:"7-29-8", text:"SQL agent: nl2sql, query databases with natural language", tag:"Tools", yt:"https://www.youtube.com/watch?v=wFdFLWc-W4k", ytLabel:"SQL Agent" },
              { id:"7-29-9", text:"Browser/web scraping tools: Playwright, Jina Reader API", tag:"Tools", yt:"https://www.youtube.com/watch?v=o6c5acG1no8", ytLabel:"Browser Agent" },
              { id:"7-29-10", text:"Custom API tools: wrap any REST API as LLM tool", tag:"Tools", yt:"https://www.youtube.com/watch?v=Yw5MDpnSIZs", ytLabel:"Custom Tools" },
            ]
          },
          {
            day: "WED", label: "CrewAI Multi-Agent",
            resource: "CrewAI Docs",
            resourceUrl: "https://docs.crewai.com/",
            chatgpt: "Build a CrewAI system for content creation: Research Agent (searches web) + Writer Agent (writes article) + Editor Agent (reviews and improves). Show the full crew and explain inter-agent communication.",
            topics: [
              { id:"7-29-11", text:"CrewAI: Crew, Agent, Task, Process — core concepts", tag:"CrewAI", yt:"https://www.youtube.com/watch?v=sPzc6hMg7So", ytLabel:"CrewAI Tutorial" },
              { id:"7-29-12", text:"Role-based agents: backstory, goal, tools, delegation", tag:"CrewAI", yt:"https://www.youtube.com/watch?v=tnejrr-0a94", ytLabel:"CrewAI Agents" },
              { id:"7-29-13", text:"Sequential vs hierarchical process — choose the right pattern", tag:"CrewAI", yt:"https://www.youtube.com/watch?v=Jl7nc9EK470", ytLabel:"CrewAI Process" },
              { id:"7-29-14", text:"Agent communication: shared memory, task dependencies", tag:"CrewAI", yt:"https://www.youtube.com/watch?v=_K206eFOXo8", ytLabel:"CrewAI Memory" },
              { id:"7-29-15", text:"AutoGen: conversational agents, group chat, code agents", tag:"AutoGen", yt:"https://www.youtube.com/watch?v=vU2S6dVf79M", ytLabel:"AutoGen Tutorial" },
            ]
          },
          {
            day: "THU", label: "Agent Evaluation",
            resource: "LangSmith Agent Tracing",
            resourceUrl: "https://docs.smith.langchain.com/",
            chatgpt: "What are the most common failure modes for LLM agents in production? For each: why it happens, how to detect it with LangSmith, and how to add guardrails. Include infinite loop prevention.",
            topics: [
              { id:"7-29-16", text:"Trajectory evaluation: did agent take correct steps?", tag:"Eval", yt:"https://www.youtube.com/watch?v=Hab2CV_0hpQ", ytLabel:"LangSmith Evals" },
              { id:"7-29-17", text:"Agent failure modes: infinite loops, hallucinated tools", tag:"Reliability", yt:"https://www.youtube.com/watch?v=CpRKITdEPgE", ytLabel:"Agent Reliability" },
              { id:"7-29-18", text:"Guardrails: input validation, output filtering, rate limits", tag:"Safety", yt:"https://www.youtube.com/watch?v=Sv5OLj2nVAQ", ytLabel:"LLM Guardrails" },
              { id:"7-29-19", text:"LangSmith: trace agent runs, debug step by step", tag:"Debug", yt:"https://www.youtube.com/watch?v=Hab2CV_0hpQ", ytLabel:"LangSmith Debug" },
              { id:"7-29-20", text:"Cost control: token budgets, max_iterations, timeouts", tag:"Cost", yt:"https://www.youtube.com/watch?v=OB99E7Y1cMA", ytLabel:"LLM Cost Control" },
            ]
          },
          {
            day: "FRI", label: "Fine-Tuning LLMs",
            resource: "HuggingFace PEFT Docs",
            resourceUrl: "https://huggingface.co/docs/peft",
            chatgpt: "When should I fine-tune vs use RAG vs prompt engineering? Give me a decision framework. Then show me minimal QLoRA code for fine-tuning Mistral-7B on a custom Q&A dataset.",
            topics: [
              { id:"7-29-21", text:"Fine-tune vs RAG vs prompting — decision framework", tag:"Strategy", yt:"https://www.youtube.com/watch?v=dQ4gcOIFInw", ytLabel:"Fine-tune vs RAG" },
              { id:"7-29-22", text:"LoRA/QLoRA: rank, alpha, target modules, bit quantization", tag:"PEFT", yt:"https://www.youtube.com/watch?v=Us5ZFp16PaU", ytLabel:"QLoRA Tutorial" },
              { id:"7-29-23", text:"SFTTrainer from TRL — supervised fine-tuning pipeline", tag:"PEFT", yt:"https://www.youtube.com/watch?v=eTieetk2dSw", ytLabel:"SFTTrainer" },
              { id:"7-29-24", text:"Dataset preparation for fine-tuning: format, quality, size", tag:"Data", yt:"https://www.youtube.com/watch?v=1PbFBPRCfaM", ytLabel:"FT Dataset Prep" },
              { id:"7-29-25", text:"DPO fine-tuning — align model with human preferences", tag:"RLHF", yt:"https://www.youtube.com/watch?v=QLm44TCvxOc", ytLabel:"DPO Tutorial" },
            ]
          },
          {
            day: "SAT", label: "Agent Projects",
            resource: "LangGraph Examples",
            resourceUrl: "https://langchain-ai.github.io/langgraph/tutorials/",
            chatgpt: "Review my LangGraph research agent [paste code]. Check: graph design, state management, error handling, and edge cases. How would you make this more reliable for production use?",
            topics: [
              { id:"7-29-26", text:"🏗 BUILD: Research Agent (search + read + summarize + report)", tag:"Project", yt:"https://www.youtube.com/watch?v=R-o_a6dvzQM", ytLabel:"Research Agent" },
              { id:"7-29-27", text:"🏗 BUILD: Customer Support Agent (triage + FAQ + escalation)", tag:"Project", yt:"https://www.youtube.com/watch?v=sPzc6hMg7So", ytLabel:"Support Agent" },
              { id:"7-29-28", text:"🏗 BUILD: Fine-tuned domain chatbot with QLoRA", tag:"Project", yt:"https://www.youtube.com/watch?v=Us5ZFp16PaU", ytLabel:"Fine-tune Project" },
            ]
          },
          {
            day: "SUN", label: "Review & Integration",
            resource: "DeepLearning.AI – LangGraph Course",
            resourceUrl: "https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/",
            chatgpt: "Quiz me on AI agents: ReAct pattern, LangGraph state machines, tool design, multi-agent communication, and evaluation strategies. Ask 10 questions with detailed feedback.",
            topics: [
              { id:"7-29-29", text:"Review all agent patterns — ReAct, Plan-and-Execute, ReWOO", tag:"Review", yt:"https://www.youtube.com/watch?v=Eug2clsLtFs", ytLabel:"Agent Patterns" },
              { id:"7-29-30", text:"Integrate agents with FastAPI — streaming agent responses", tag:"Deploy", yt:"https://www.youtube.com/watch?v=0lOSvOoF2to", ytLabel:"Agent API" },
            ]
          },
        ]
      },
    ]
  },

  {
    id: 8, name: "FastAPI & Docker", emoji: "⚡",
    color: "#2dd4bf", glow: "rgba(45,212,191,0.15)",
    weeks: "33–35", duration: "3 weeks", totalWeeks: 3,
    description: "Build and containerize production AI APIs",
    weeks_data: [
      {
        week: 33, title: "FastAPI + Docker",
        days: [
          {
            day: "MON", label: "FastAPI Foundations",
            resource: "FastAPI Official Docs",
            resourceUrl: "https://fastapi.tiangolo.com/",
            chatgpt: "Build a complete FastAPI CRUD API for a Task Manager with: Pydantic models, async DB operations, JWT auth, proper HTTP status codes, and auto-generated OpenAPI docs. Production-ready patterns.",
            topics: [
              { id:"8-33-1", text:"Routes, path/query params, request body, response model", tag:"FastAPI", yt:"https://www.youtube.com/watch?v=0sOvCWFmrtA", ytLabel:"FastAPI Tutorial" },
              { id:"8-33-2", text:"Pydantic v2 models: Field, validators, computed fields", tag:"FastAPI", yt:"https://www.youtube.com/watch?v=502XOB0u8OY", ytLabel:"Pydantic v2" },
              { id:"8-33-3", text:"Async endpoints, background tasks, lifespan events (startup)", tag:"FastAPI", yt:"https://www.youtube.com/watch?v=iWS9ogMPOI0", ytLabel:"FastAPI Async" },
              { id:"8-33-4", text:"JWT auth: OAuth2, Bearer tokens, dependency injection", tag:"Auth", yt:"https://www.youtube.com/watch?v=0_seNFCtglk", ytLabel:"FastAPI JWT Auth" },
              { id:"8-33-5", text:"SQLAlchemy async + Alembic migrations — production DB setup", tag:"DB", yt:"https://www.youtube.com/watch?v=1Ra8XR-3z_0", ytLabel:"FastAPI + SQLAlchemy" },
            ]
          },
          {
            day: "TUE", label: "AI API Patterns",
            resource: "FastAPI Streaming Docs",
            resourceUrl: "https://fastapi.tiangolo.com/advanced/custom-response/",
            chatgpt: "Show me how to stream OpenAI responses through FastAPI to a client using SSE. Handle: disconnections, errors, backpressure. Include a complete working example with frontend JS.",
            topics: [
              { id:"8-33-6", text:"Stream LLM responses with Server-Sent Events (SSE) in FastAPI", tag:"AI API", yt:"https://www.youtube.com/watch?v=GlF5cQMpVCI", ytLabel:"FastAPI Streaming" },
              { id:"8-33-7", text:"Redis + Celery for async LLM task queuing", tag:"Queue", yt:"https://www.youtube.com/watch?v=fBfzE0yk97k", ytLabel:"Celery Redis FastAPI" },
              { id:"8-33-8", text:"Rate limiting (slowapi), CORS, security headers middleware", tag:"Security", yt:"https://www.youtube.com/watch?v=iWS9ogMPOI0", ytLabel:"FastAPI Middleware" },
              { id:"8-33-9", text:"Cache LLM responses in Redis — reduce cost by 60-80%", tag:"Cache", yt:"https://www.youtube.com/watch?v=Ri8zGMJEnnU", ytLabel:"Redis Caching" },
              { id:"8-33-10", text:"Testing FastAPI: pytest + httpx TestClient, mock LLM calls", tag:"Testing", yt:"https://www.youtube.com/watch?v=7HfekFkQmCc", ytLabel:"FastAPI Testing" },
            ]
          },
          {
            day: "WED", label: "Docker Mastery",
            resource: "Docker Official Docs",
            resourceUrl: "https://docs.docker.com/",
            chatgpt: "Write an optimized Dockerfile for a Python FastAPI + ML model. Show: multi-stage build to minimize image size, layer caching best practices, handling large model weights efficiently.",
            topics: [
              { id:"8-33-11", text:"Dockerfile: FROM, RUN, COPY, CMD, ENTRYPOINT, ARG, ENV", tag:"Docker", yt:"https://www.youtube.com/watch?v=3c-iBn73dDE", ytLabel:"Docker Tutorial" },
              { id:"8-33-12", text:"Multi-stage builds — production images under 200MB", tag:"Docker", yt:"https://www.youtube.com/watch?v=KLOSCKn8GrI", ytLabel:"Docker Multi-stage" },
              { id:"8-33-13", text:"docker-compose: services, volumes, networks, env files", tag:"Docker", yt:"https://www.youtube.com/watch?v=HG6yIjqzGVg", ytLabel:"Docker Compose" },
              { id:"8-33-14", text:"Container security: non-root user, read-only filesystem", tag:"Security", yt:"https://www.youtube.com/watch?v=l86Rz8nJ5Cs", ytLabel:"Docker Security" },
              { id:"8-33-15", text:"Push to Docker Hub / AWS ECR — registry workflow", tag:"Registry", yt:"https://www.youtube.com/watch?v=iEFas7V6aRM", ytLabel:"Docker Registry" },
            ]
          },
          {
            day: "THU", label: "Gradio & Streamlit",
            resource: "Gradio Docs",
            resourceUrl: "https://www.gradio.app/docs/",
            chatgpt: "Build a Gradio demo for my RAG application. Include: file upload for PDF, chat interface, source citation display, and deploy to HuggingFace Spaces with a share link.",
            topics: [
              { id:"8-33-16", text:"Streamlit: st.chat_message, st.session_state, file_uploader", tag:"Streamlit", yt:"https://www.youtube.com/watch?v=R2nr1uZ8ffc", ytLabel:"Streamlit Tutorial" },
              { id:"8-33-17", text:"Gradio: Interface, Blocks, chatbot component, streaming", tag:"Gradio", yt:"https://www.youtube.com/watch?v=RiHRsBqwRv0", ytLabel:"Gradio Tutorial" },
              { id:"8-33-18", text:"HuggingFace Spaces: deploy Gradio/Streamlit apps for free", tag:"Deploy", yt:"https://www.youtube.com/watch?v=pxISiqfmoak", ytLabel:"HF Spaces Deploy" },
              { id:"8-33-19", text:"Vercel AI SDK: Next.js + streaming AI responses", tag:"Frontend", yt:"https://www.youtube.com/watch?v=Lam0cR4KLXY", ytLabel:"Vercel AI SDK" },
              { id:"8-33-20", text:"Build a full-stack AI app: React frontend + FastAPI backend", tag:"Full-Stack", yt:"https://www.youtube.com/watch?v=99ytGLkSjVs", ytLabel:"AI Full Stack" },
            ]
          },
          {
            day: "FRI", label: "Production Patterns",
            resource: "12-Factor App",
            resourceUrl: "https://12factor.net/",
            chatgpt: "Design a production-grade AI API system. Include: request queuing, circuit breakers, retry logic, graceful degradation when LLM is down, and health check endpoints for k8s.",
            topics: [
              { id:"8-33-21", text:"Health checks: /health, /ready endpoints for k8s probes", tag:"Ops", yt:"https://www.youtube.com/watch?v=X48VuDVv0do", ytLabel:"Kubernetes Basics" },
              { id:"8-33-22", text:"Circuit breaker pattern for LLM API calls (tenacity)", tag:"Reliability", yt:"https://www.youtube.com/watch?v=tFZSkv_iuBk", ytLabel:"Circuit Breaker" },
              { id:"8-33-23", text:"Structured logging: loguru, JSON logs, correlation IDs", tag:"Logging", yt:"https://www.youtube.com/watch?v=-ARI4Cz-awo", ytLabel:"Structured Logging" },
              { id:"8-33-24", text:"OpenTelemetry tracing for distributed AI systems", tag:"Observability", yt:"https://www.youtube.com/watch?v=r8UvWSX3TnE", ytLabel:"OpenTelemetry" },
              { id:"8-33-25", text:"API versioning, deprecation strategies, backward compat", tag:"API", yt:"https://www.youtube.com/watch?v=iWS9ogMPOI0", ytLabel:"API Best Practices" },
            ]
          },
          {
            day: "SAT", label: "API Projects",
            resource: "Docker Compose Examples",
            resourceUrl: "https://docs.docker.com/compose/examples/",
            chatgpt: "Review my docker-compose.yml for FastAPI + ChromaDB + Redis [paste config]. Security issues? Networking correct? How would you make this production-ready for AWS deployment?",
            topics: [
              { id:"8-33-26", text:"🏗 BUILD: Containerized RAG API (FastAPI + Chroma + Redis)", tag:"Project", yt:"https://www.youtube.com/watch?v=HG6yIjqzGVg", ytLabel:"Docker Compose App" },
              { id:"8-33-27", text:"🏗 BUILD: AI Agent API with streaming SSE responses", tag:"Project", yt:"https://www.youtube.com/watch?v=GlF5cQMpVCI", ytLabel:"Streaming Agent API" },
              { id:"8-33-28", text:"🏗 BUILD: Full-stack AI app deployed to HuggingFace Spaces", tag:"Project", yt:"https://www.youtube.com/watch?v=pxISiqfmoak", ytLabel:"HF Spaces App" },
            ]
          },
          {
            day: "SUN", label: "Review & Security",
            resource: "OWASP LLM Top 10",
            resourceUrl: "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
            chatgpt: "Quiz me on FastAPI and Docker: async patterns, JWT auth, Docker best practices, container security, and production API design. Ask 10 questions with detailed explanations.",
            topics: [
              { id:"8-33-29", text:"OWASP LLM Top 10 — security risks in AI applications", tag:"Security", yt:"https://www.youtube.com/watch?v=Sv5OLj2nVAQ", ytLabel:"LLM Security" },
              { id:"8-33-30", text:"Review all projects — add missing tests and documentation", tag:"Review", yt:"https://www.youtube.com/watch?v=7HfekFkQmCc", ytLabel:"Testing Best Practices" },
            ]
          },
        ]
      },
    ]
  },

  {
    id: 9, name: "MLOps & Deployment", emoji: "🚀",
    color: "#fb7185", glow: "rgba(251,113,133,0.15)",
    weeks: "36–38", duration: "3 weeks", totalWeeks: 3,
    description: "Deploy, monitor, and maintain AI systems in production",
    weeks_data: [
      {
        week: 36, title: "Cloud & MLOps",
        days: [
          {
            day: "MON", label: "Cloud Deployment",
            resource: "AWS EC2 Docs",
            resourceUrl: "https://docs.aws.amazon.com/ec2/",
            chatgpt: "Step-by-step: deploy FastAPI + Docker AI app to AWS EC2. Include: security groups, SSH, Docker install, environment variables, Nginx reverse proxy, SSL with certbot, and auto-start.",
            topics: [
              { id:"9-36-1", text:"AWS EC2: launch, SSH, Docker deploy, Nginx reverse proxy", tag:"AWS", yt:"https://www.youtube.com/watch?v=qNIniDftAcU", ytLabel:"AWS EC2 Deploy" },
              { id:"9-36-2", text:"AWS S3: store model weights, datasets, outputs, presigned URLs", tag:"AWS", yt:"https://www.youtube.com/watch?v=BKZP5IOXL5U", ytLabel:"AWS S3 Tutorial" },
              { id:"9-36-3", text:"AWS ECR + ECS Fargate: serverless container deployment", tag:"AWS", yt:"https://www.youtube.com/watch?v=esISkPlnxL0", ytLabel:"AWS ECS Fargate" },
              { id:"9-36-4", text:"GCP Vertex AI: model registry, endpoints, batch prediction", tag:"GCP", yt:"https://www.youtube.com/watch?v=cNWVwYMGPzE", ytLabel:"Vertex AI Tutorial" },
              { id:"9-36-5", text:"Secrets management: AWS Secrets Manager, env variable best practices", tag:"Security", yt:"https://www.youtube.com/watch?v=xwVVMYzh9d4", ytLabel:"AWS Secrets Manager" },
            ]
          },
          {
            day: "TUE", label: "MLflow & Experiment Tracking",
            resource: "MLflow Docs",
            resourceUrl: "https://mlflow.org/docs/latest/index.html",
            chatgpt: "Set up MLflow for an ML experiment. Show: logging params and metrics, registering the model, transitioning production stage, and loading for inference. Include the full workflow.",
            topics: [
              { id:"9-36-6", text:"MLflow: log_param, log_metric, log_artifact, autolog()", tag:"MLflow", yt:"https://www.youtube.com/watch?v=yx-X3ZNGHlE", ytLabel:"MLflow Tutorial" },
              { id:"9-36-7", text:"MLflow Model Registry: staging, production, archiving", tag:"MLflow", yt:"https://www.youtube.com/watch?v=859OxXrt_TI", ytLabel:"MLflow Registry" },
              { id:"9-36-8", text:"Weights & Biases (wandb): sweeps, model artifacts, reports", tag:"wandb", yt:"https://www.youtube.com/watch?v=EEqKfWbM8Po", ytLabel:"wandb Tutorial" },
              { id:"9-36-9", text:"DVC: version datasets/models, dvc repro pipeline stages", tag:"DVC", yt:"https://www.youtube.com/watch?v=kLKBcPonMYw", ytLabel:"DVC Tutorial" },
              { id:"9-36-10", text:"Feature stores: Feast basics — online/offline feature serving", tag:"Features", yt:"https://www.youtube.com/watch?v=Da_9HrJ7qGo", ytLabel:"Feast Feature Store" },
            ]
          },
          {
            day: "WED", label: "CI/CD for AI",
            resource: "GitHub Actions Docs",
            resourceUrl: "https://docs.github.com/en/actions",
            chatgpt: "Build a GitHub Actions pipeline for an AI app: run tests on PR, build Docker image on merge, push to ECR, deploy to EC2. Show the full YAML with secrets management.",
            topics: [
              { id:"9-36-11", text:"GitHub Actions: workflow, jobs, steps, secrets, matrix builds", tag:"CI/CD", yt:"https://www.youtube.com/watch?v=R8_veQiYBjI", ytLabel:"GitHub Actions" },
              { id:"9-36-12", text:"Pre-commit hooks: ruff, black, mypy, pytest before every commit", tag:"CI/CD", yt:"https://www.youtube.com/watch?v=psjz6rwzMdk", ytLabel:"Pre-commit Hooks" },
              { id:"9-36-13", text:"Docker image scanning: Trivy, Snyk for container vulnerabilities", tag:"Security", yt:"https://www.youtube.com/watch?v=l86Rz8nJ5Cs", ytLabel:"Container Security" },
              { id:"9-36-14", text:"Automated LLM eval in CI: RAGAS scores, regression detection", tag:"Eval", yt:"https://www.youtube.com/watch?v=1FiLNnZ1Yys", ytLabel:"LLM CI Eval" },
              { id:"9-36-15", text:"Blue-green deployments for zero-downtime AI model updates", tag:"Deploy", yt:"https://www.youtube.com/watch?v=K2RDFRqRE14", ytLabel:"Blue-Green Deploy" },
            ]
          },
          {
            day: "THU", label: "LLM Monitoring",
            resource: "LangSmith Docs",
            resourceUrl: "https://docs.smith.langchain.com/",
            chatgpt: "Design a monitoring system for a production LLM app. What metrics to track? How to detect: quality degradation, prompt injections, cost spikes, unusual patterns, and API failures?",
            topics: [
              { id:"9-36-16", text:"LangSmith: production tracing, A/B prompt testing, evals", tag:"LLMOps", yt:"https://www.youtube.com/watch?v=Hab2CV_0hpQ", ytLabel:"LangSmith Production" },
              { id:"9-36-17", text:"Prometheus + Grafana: metrics dashboards for AI APIs", tag:"Monitoring", yt:"https://www.youtube.com/watch?v=h4Sl21AKiDg", ytLabel:"Prometheus Grafana" },
              { id:"9-36-18", text:"Token cost tracking: OpenMeter, per-user billing", tag:"Cost", yt:"https://www.youtube.com/watch?v=OB99E7Y1cMA", ytLabel:"LLM Cost Tracking" },
              { id:"9-36-19", text:"Data drift detection: Evidently AI for model monitoring", tag:"Monitoring", yt:"https://www.youtube.com/watch?v=L4Pv6ExBQPM", ytLabel:"Evidently Tutorial" },
              { id:"9-36-20", text:"Alerting: PagerDuty/Slack for production incidents", tag:"Alerts", yt:"https://www.youtube.com/watch?v=h4Sl21AKiDg", ytLabel:"Monitoring Alerts" },
            ]
          },
          {
            day: "FRI", label: "Serverless & Edge AI",
            resource: "Modal.com Docs",
            resourceUrl: "https://modal.com/docs",
            chatgpt: "Compare serverless deployment for AI: Modal.com vs AWS Lambda vs HuggingFace Spaces vs Replicate. When to use each? Show a Modal.com deployment for a transformer model with GPU.",
            topics: [
              { id:"9-36-21", text:"Modal.com: deploy Python as serverless GPU — cheapest option", tag:"Serverless", yt:"https://www.youtube.com/watch?v=4tl-bVjjzLM", ytLabel:"Modal.com Tutorial" },
              { id:"9-36-22", text:"vLLM: serve open-source LLMs at production scale (PagedAttention)", tag:"Serving", yt:"https://www.youtube.com/watch?v=80bIUggRJf4", ytLabel:"vLLM Tutorial" },
              { id:"9-36-23", text:"Replicate: one-line model hosting for open-source models", tag:"Serving", yt:"https://www.youtube.com/watch?v=nByFKCHBnT0", ytLabel:"Replicate Tutorial" },
              { id:"9-36-24", text:"Kubernetes basics: pods, services, deployments, ingress", tag:"K8s", yt:"https://www.youtube.com/watch?v=X48VuDVv0do", ytLabel:"Kubernetes Full Course" },
              { id:"9-36-25", text:"Terraform: infrastructure as code for AI cloud resources", tag:"IaC", yt:"https://www.youtube.com/watch?v=SLB_c_ayRMo", ytLabel:"Terraform Tutorial" },
            ]
          },
          {
            day: "SAT", label: "Production Projects",
            resource: "Made With ML – MLOps",
            resourceUrl: "https://madewithml.com/",
            chatgpt: "I've deployed an AI API to AWS. Help me run a load test with locust to find bottlenecks. Show the locust test script, how to interpret results, what to scale first (concurrency, memory, caching).",
            topics: [
              { id:"9-36-26", text:"🏗 BUILD: Full CI/CD pipeline — test → build → deploy to AWS", tag:"Project", yt:"https://www.youtube.com/watch?v=R8_veQiYBJI", ytLabel:"CI/CD Pipeline" },
              { id:"9-36-27", text:"🏗 BUILD: LLM monitoring dashboard with LangSmith + Grafana", tag:"Project", yt:"https://www.youtube.com/watch?v=Hab2CV_0hpQ", ytLabel:"Monitoring Project" },
              { id:"9-36-28", text:"Load test with locust — find and fix API bottlenecks", tag:"Perf", yt:"https://www.youtube.com/watch?v=zvBkqkfIid8", ytLabel:"Load Testing" },
            ]
          },
          {
            day: "SUN", label: "Review & Architecture",
            resource: "Full Stack Deep Learning",
            resourceUrl: "https://fullstackdeeplearning.com/",
            chatgpt: "Quiz me on MLOps: CI/CD for ML, model monitoring, cloud deployment, cost optimization, and production incident response. Ask 10 questions with detailed explanations.",
            topics: [
              { id:"9-36-29", text:"ML system design: design a production RAG system (diagrams)", tag:"Design", yt:"https://www.youtube.com/watch?v=yfHHvmaMkcA", ytLabel:"ML System Design" },
              { id:"9-36-30", text:"Review all deployed projects — add monitoring and alerts", tag:"Review", yt:"https://www.youtube.com/watch?v=L4Pv6ExBQPM", ytLabel:"Production Review" },
            ]
          },
        ]
      },
    ]
  },

  {
    id: 10, name: "Portfolio & Jobs", emoji: "🏆",
    color: "#fcd34d", glow: "rgba(252,211,77,0.15)",
    weeks: "39", duration: "1 week", totalWeeks: 1,
    description: "Polish portfolio and land your first AI engineering role",
    weeks_data: [
      {
        week: 39, title: "Job Ready",
        days: [
          {
            day: "MON", label: "Portfolio Audit",
            resource: "GitHub Profile README Guide",
            resourceUrl: "https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme",
            chatgpt: "Review my GitHub profile and top 3 AI projects [paste links]. Give me: strengths, gaps vs AI Engineer job requirements, top 3 improvements for maximum impact, and how I compare to other applicants.",
            topics: [
              { id:"10-39-1", text:"Audit all GitHub repos: clean code, README, live demos", tag:"Portfolio", yt:"https://www.youtube.com/watch?v=n6d4KHSKqGk", ytLabel:"GitHub Portfolio Guide" },
              { id:"10-39-2", text:"Deploy 3 best projects with live Hugging Face Spaces demos", tag:"Deploy", yt:"https://www.youtube.com/watch?v=pxISiqfmoak", ytLabel:"HF Spaces Deploy" },
              { id:"10-39-3", text:"Add architecture diagrams to each project (Excalidraw)", tag:"Docs", yt:"https://www.youtube.com/watch?v=nByFKCHBnT0", ytLabel:"Technical Diagrams" },
            ]
          },
          {
            day: "TUE", label: "Resume & LinkedIn",
            resource: "AI Engineer Job Boards",
            resourceUrl: "https://www.levels.fyi/",
            chatgpt: "Review my AI Engineer resume [paste]. For each bullet: does it show impact? Is it quantified? Does it include right ATS keywords? Rewrite any weak bullets. Add missing skills from this job description: [paste JD].",
            topics: [
              { id:"10-39-4", text:"Tailor resume for AI/ML Engineer, LLM Engineer roles", tag:"Jobs", yt:"https://www.youtube.com/watch?v=u75hUSShvnc", ytLabel:"Tech Resume Guide" },
              { id:"10-39-5", text:"LinkedIn: headline, about section, featured projects, skills", tag:"LinkedIn", yt:"https://www.youtube.com/watch?v=4RsEXpZo_cA", ytLabel:"LinkedIn for Engineers" },
              { id:"10-39-6", text:"Write a cold outreach message to AI engineers at target companies", tag:"Networking", yt:"https://www.youtube.com/watch?v=m87YGiRW5sA", ytLabel:"Tech Networking" },
            ]
          },
          {
            day: "WED", label: "Technical Interview Prep",
            resource: "Grokking ML Interview",
            resourceUrl: "https://www.educative.io/courses/grokking-the-machine-learning-interview",
            chatgpt: "Conduct a mock AI system design interview. Ask me to design a production RAG system for customer support at scale. Ask follow-up questions like a real interviewer. Give detailed feedback.",
            topics: [
              { id:"10-39-7", text:"LLM system design: RAG, chatbot, AI agent — 10 practice Qs", tag:"Interview", yt:"https://www.youtube.com/watch?v=yfHHvmaMkcA", ytLabel:"AI System Design" },
              { id:"10-39-8", text:"ML fundamentals Q&A: top 50 interview questions", tag:"Interview", yt:"https://www.youtube.com/watch?v=1gf5MLpCosY", ytLabel:"ML Interview Prep" },
              { id:"10-39-9", text:"LeetCode: 20 Easy + 20 Medium Python problems (arrays, graphs)", tag:"Coding", yt:"https://www.youtube.com/watch?v=0K_eZGS5NsU", ytLabel:"LeetCode Python" },
            ]
          },
          {
            day: "THU", label: "Open Source Contributions",
            resource: "GitHub Good First Issues",
            resourceUrl: "https://goodfirstissue.dev/",
            chatgpt: "I want to contribute to open source AI. Help me find: beginner-friendly issues in LangChain, LlamaIndex, or HuggingFace. What contribution would be most valuable? How to write a good first PR?",
            topics: [
              { id:"10-39-10", text:"Find and fix a bug in LangChain, LlamaIndex, or HuggingFace", tag:"OpenSource", yt:"https://www.youtube.com/watch?v=yzeVMecydCE", ytLabel:"Open Source Guide" },
              { id:"10-39-11", text:"Write a technical blog post about your best project", tag:"Content", yt:"https://www.youtube.com/watch?v=AuCRqLRa4q0", ytLabel:"Technical Writing" },
              { id:"10-39-12", text:"Post on LinkedIn + Twitter/X with code snippets — build audience", tag:"Marketing", yt:"https://www.youtube.com/watch?v=kKdMqMfGgxQ", ytLabel:"Dev Content Strategy" },
            ]
          },
          {
            day: "FRI", label: "Mock Interviews",
            resource: "interviewing.io",
            resourceUrl: "https://interviewing.io/",
            chatgpt: "Give me 5 behavioral interview questions for AI Engineering roles. For each question, help me craft a STAR-format answer based on my project experience: [describe your projects briefly].",
            topics: [
              { id:"10-39-13", text:"3 mock system design interviews (record and review yourself)", tag:"Interview", yt:"https://www.youtube.com/watch?v=yfHHvmaMkcA", ytLabel:"System Design Practice" },
              { id:"10-39-14", text:"Behavioral: STAR format for 10 key situations", tag:"Interview", yt:"https://www.youtube.com/watch?v=PJKYqLP6MRo", ytLabel:"Behavioral Interview" },
              { id:"10-39-15", text:"Apply to 20 AI Engineer / ML Engineer / LLM Engineer positions", tag:"Jobs", yt:"https://www.youtube.com/watch?v=m87YGiRW5sA", ytLabel:"Job Search Strategy" },
            ]
          },
          {
            day: "SAT", label: "Community & Networking",
            resource: "HuggingFace Discord",
            resourceUrl: "https://discord.gg/huggingface",
            chatgpt: "Write me a LinkedIn announcement post saying I'm available for AI Engineer roles. Mention my top 3 projects and key skills. Make it specific, authentic, and attention-grabbing for recruiters.",
            topics: [
              { id:"10-39-16", text:"Join: HuggingFace Discord, LangChain Discord, r/MachineLearning", tag:"Community", yt:"https://www.youtube.com/watch?v=kKdMqMfGgxQ", ytLabel:"AI Community" },
              { id:"10-39-17", text:"Add project to Awesome-LLM or Papers With Code", tag:"Visibility", yt:"https://www.youtube.com/watch?v=yzeVMecydCE", ytLabel:"Open Source Visibility" },
              { id:"10-39-18", text:"Schedule and attend 5 AI engineer coffee chats via LinkedIn", tag:"Networking", yt:"https://www.youtube.com/watch?v=m87YGiRW5sA", ytLabel:"Engineering Networking" },
            ]
          },
          {
            day: "SUN", label: "🚀 Launch Day",
            resource: "Levels.fyi – AI Engineer Salaries",
            resourceUrl: "https://www.levels.fyi/t/machine-learning-engineer",
            chatgpt: "I'm an AI engineer with these projects: [list them] and skills: [list them]. What's my estimated market value? What companies should I target first (best fit for my skills)? What's my 30-day action plan?",
            topics: [
              { id:"10-39-19", text:"🚀 Submit applications, share publicly, follow up in 5 days", tag:"Launch", yt:"https://www.youtube.com/watch?v=u75hUSShvnc", ytLabel:"Job Application Tips" },
              { id:"10-39-20", text:"Track applications in Notion/spreadsheet — measure, iterate", tag:"Process", yt:"https://www.youtube.com/watch?v=OB99E7Y1cMA", ytLabel:"Job Search Tracking" },
              { id:"10-39-21", text:"Keep shipping — open source, blog posts, new projects", tag:"Mindset", yt:"https://www.youtube.com/watch?v=kCc8FmEb1nY", ytLabel:"Stay Consistent" },
            ]
          },
        ]
      },
    ]
  },
];

export const CHATGPT_TEMPLATES = [
  { title: "🧠 Deep Explanation", color: "#a78bfa", prompt: "Explain [TOPIC] from first principles. Start with the simplest possible analogy, then build up to the full technical details. Show me exactly where this concept appears in real production AI systems at companies like OpenAI, Google, or Anthropic." },
  { title: "💻 Code Review", color: "#38bdf8", prompt: "Review my [TOPIC] implementation:\n\n[PASTE CODE HERE]\n\nTell me:\n1. Correctness issues\n2. Performance problems\n3. How a senior AI engineer would improve it\n4. Best practices I missed\n5. Score out of 10 with specific feedback" },
  { title: "🏗 Build a Project", color: "#34d399", prompt: "I want to build a portfolio project using [TOPIC]. Give me:\n1. A project idea impressive enough for job applications\n2. Step-by-step implementation plan\n3. Which parts to prioritize\n4. What to add to make it stand out from other candidates" },
  { title: "❓ Quiz Me", color: "#fbbf24", prompt: "Quiz me on [TOPIC]. Ask 5 questions of increasing difficulty. After each answer I give, tell me if I'm right, give the complete answer, and ask the next question. At the end, give me an overall score and areas to improve." },
  { title: "🔍 Debug My Error", color: "#fb923c", prompt: "I'm getting this error:\n[PASTE ERROR]\n\nHere's my code:\n[PASTE CODE]\n\nDebug this:\n1. Root cause\n2. Why this happens\n3. The exact fix with explanation\n4. How to prevent this class of error in the future" },
  { title: "⚖️ Compare Options", color: "#f87171", prompt: "Compare [OPTION A] vs [OPTION B] for [MY USE CASE].\n\n1. Decision framework\n2. When to use each\n3. Performance & cost differences\n4. Real industry examples\n5. Your concrete recommendation for my specific situation" },
  { title: "📋 Interview Prep", color: "#818cf8", prompt: "I'm interviewing for an AI Engineer role. Ask me a [TOPIC] system design question. Ask follow-up questions like a real interviewer would. Then give detailed feedback on my answer, covering what I got right, what I missed, and how to improve." },
  { title: "🎯 Learning Path", color: "#2dd4bf", prompt: "I just learned [TOPIC]. What should I learn next in this area? Give me a learning sequence with: concrete next topics, specific resources (YouTube playlists, docs), and a mini-project to solidify my understanding of [TOPIC] before moving on." },
];
