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
              { id:"1-1-1", text:"Install Python 3.12+, VS Code, pyenv, virtualenv setup", tag:"Setup", yt:"https://www.youtube.com/watch?v=YYXdXT2l-Gg", ytLabel:"Python Install Guide", hindiYt:"https://www.youtube.com/watch?v=7wnove7K-ZQ", hindiYtLabel:"Python Install Hindi (CodeWithHarry)",
              subtopics:[
                {text:"Install Python 3.12 on Windows/Mac/Linux step by step",yt:"https://www.youtube.com/watch?v=YYXdXT2l-Gg"},
            {text:"Setup VS Code with Python extension and IntelliSense",yt:"https://www.youtube.com/watch?v=W--_EOzdTHk"},
            {text:"pyenv: install and switch between Python versions",yt:"https://www.youtube.com/watch?v=31WU0Dhw4sk"},
            {text:"virtualenv and venv — create isolated environments",yt:"https://www.youtube.com/watch?v=N5vscPTWKOk"},
              ],
              github:[
                {name:"pyenv/pyenv",url:"https://github.com/pyenv/pyenv",desc:"Simple Python version management",stars:"40k+"},
                {name:"TheAlgorithms/Python",url:"https://github.com/TheAlgorithms/Python",desc:"All algorithms in Python",stars:"190k+"},
              ],
              resource:{title:"Official Python 3.12 Downloads & Docs",url:"https://www.python.org/downloads/"}},
              { id:"1-1-2", text:"Variables, int, float, str, bool, list, dict, tuple, set", tag:"Core", yt:"https://www.youtube.com/watch?v=khKv-8q7YmY", ytLabel:"Python Data Types", hindiYt:"https://www.youtube.com/watch?v=aqvDTCpNRek", hindiYtLabel:"Python Variables Hindi (CodeWithHarry)",
              subtopics:[
                {text:"int, float, complex — numeric types explained",yt:"https://www.youtube.com/watch?v=khKv-8q7YmY"},
            {text:"list vs tuple — mutable vs immutable collections",yt:"https://www.youtube.com/watch?v=W8KRzm-HUcc"},
            {text:"dict — key-value pairs, lookup, update",yt:"https://www.youtube.com/watch?v=daefaLgNkw0"},
            {text:"set — unique items, union, intersection, difference",yt:"https://www.youtube.com/watch?v=sBvaPopWOmQ"},
            {text:"bool — truthiness, None, falsy values",yt:"https://www.youtube.com/watch?v=khKv-8q7YmY"},
              ],
              github:[
                {name:"TheAlgorithms/Python",url:"https://github.com/TheAlgorithms/Python",desc:"Every data structure implemented",stars:"190k+"},
                {name:"vinta/awesome-python",url:"https://github.com/vinta/awesome-python",desc:"Curated list of Python frameworks",stars:"230k+"},
              ],
              resource:{title:"Python Built-in Types Official Docs",url:"https://docs.python.org/3/library/stdtypes.html"}},
              { id:"1-1-3", text:"f-strings, string methods, type casting", tag:"Core", yt:"https://www.youtube.com/watch?v=nghuHvKLhJA", ytLabel:"Python Strings", hindiYt:"https://www.youtube.com/watch?v=aqvDTCpNRek", hindiYtLabel:"Python Strings Hindi (CodeWithHarry)",
              subtopics:[
                {text:"f-strings — embed expressions {value:.2f}",yt:"https://www.youtube.com/watch?v=nghuHvKLhJA"},
            {text:"String methods: .split() .join() .strip() .replace()",yt:"https://www.youtube.com/watch?v=k9TUPpGqYTo"},
            {text:"String slicing: s[1:5] s[::-1] s[::2]",yt:"https://www.youtube.com/watch?v=ajrtAuDg3yw"},
            {text:"Type casting: int() float() str() bool()",yt:"https://www.youtube.com/watch?v=khKv-8q7YmY"},
              ],
              github:[
                {name:"vinta/awesome-python",url:"https://github.com/vinta/awesome-python",desc:"Curated Python resources",stars:"230k+"},
              ],
              resource:{title:"Python f-strings PEP 498",url:"https://peps.python.org/pep-0498/"}},
              { id:"1-1-4", text:"if/elif/else, comparison & logical operators", tag:"Core", yt:"https://www.youtube.com/watch?v=DZwmZ8Usvnk", ytLabel:"Python Conditionals", hindiYt:"https://www.youtube.com/watch?v=aqvDTCpNRek", hindiYtLabel:"Python Conditions Hindi (CodeWithHarry)",
              subtopics:[
                {text:"if / elif / else — basic control flow",yt:"https://www.youtube.com/watch?v=DZwmZ8Usvnk"},
            {text:"Comparison operators: == != < > <= >=",yt:"https://www.youtube.com/watch?v=DZwmZ8Usvnk"},
            {text:"Logical operators: and, or, not",yt:"https://www.youtube.com/watch?v=DZwmZ8Usvnk"},
            {text:"Ternary operator: value if condition else other",yt:"https://www.youtube.com/watch?v=MHlwl6GsT8s"},
            {text:"match/case statement (Python 3.10+)",yt:"https://www.youtube.com/watch?v=SBBbKFQ0MHo"},
              ],
              github:[
                {name:"TheAlgorithms/Python",url:"https://github.com/TheAlgorithms/Python",desc:"All algorithms in Python",stars:"190k+"},
              ],
              resource:{title:"Python Control Flow Docs",url:"https://docs.python.org/3/tutorial/controlflow.html"}},
              { id:"1-1-5", text:"for loops, while loops, break/continue/pass, range()", tag:"Core", yt:"https://www.youtube.com/watch?v=6iF8Xb7Z3wQ", ytLabel:"Python Loops", hindiYt:"https://www.youtube.com/watch?v=aqvDTCpNRek", hindiYtLabel:"Python Loops Hindi (CodeWithHarry)",
              subtopics:[
                {text:"for loop — iterate lists, strings, dicts",yt:"https://www.youtube.com/watch?v=6iF8Xb7Z3wQ"},
            {text:"while loop — condition-based repetition",yt:"https://www.youtube.com/watch?v=6iF8Xb7Z3wQ"},
            {text:"break, continue, pass — loop control",yt:"https://www.youtube.com/watch?v=6iF8Xb7Z3wQ"},
            {text:"range() — generate number sequences",yt:"https://www.youtube.com/watch?v=6iF8Xb7Z3wQ"},
            {text:"enumerate() and zip() in loops",yt:"https://www.youtube.com/watch?v=cKlnR-CB3tI"},
              ],
              github:[
                {name:"TheAlgorithms/Python",url:"https://github.com/TheAlgorithms/Python",desc:"Practice loops with real algorithms",stars:"190k+"},
              ],
              resource:{title:"Python for Loops Docs",url:"https://docs.python.org/3/tutorial/controlflow.html#for-statements"}},
            ]
          },
          {
            day: "TUE", label: "Functions & OOP",
            resource: "Corey Schafer – OOP Series",
            resourceUrl: "https://www.youtube.com/playlist?list=PL-osiE80TeTsqhIuOqKhwlXsIBIdSeYtc",
            chatgpt: "I'm learning Python OOP. Create a real-world Bank Account project with classes. Walk me through it step by step, explaining each OOP concept as we implement it.",
            topics: [
              { id:"1-1-6", text:"def, return, default args, *args, **kwargs, lambda", tag:"Functions", yt:"https://www.youtube.com/watch?v=9Os0o3wzS_I", ytLabel:"Python Functions", hindiYt:"https://www.youtube.com/watch?v=u-OmVr_fT4s", hindiYtLabel:"Python Functions Hindi (CodeWithHarry)",
              subtopics:[
                {text:"def, return, default arguments",yt:"https://www.youtube.com/watch?v=9Os0o3wzS_I"},
            {text:"*args and **kwargs — variable arguments",yt:"https://www.youtube.com/watch?v=WcTXxX3vYgY"},
            {text:"lambda functions — anonymous one-liners",yt:"https://www.youtube.com/watch?v=Ob9ryqa2I7k"},
            {text:"First-class functions — pass functions as arguments",yt:"https://www.youtube.com/watch?v=9Os0o3wzS_I"},
            {text:"Closures and nonlocal keyword",yt:"https://www.youtube.com/watch?v=swU3c34d2NQ"},
              ],
              github:[
                {name:"TheAlgorithms/Python",url:"https://github.com/TheAlgorithms/Python",desc:"Functions used in real algorithms",stars:"190k+"},
              ],
              resource:{title:"Python Functions Docs",url:"https://docs.python.org/3/tutorial/controlflow.html#defining-functions"}},
              { id:"1-1-7", text:"map(), filter(), sorted(), zip(), enumerate()", tag:"Functions", yt:"https://www.youtube.com/watch?v=cKlnR-CB3tI", ytLabel:"Python Built-ins", hindiYt:"https://www.youtube.com/watch?v=u-OmVr_fT4s", hindiYtLabel:"Python Built-ins Hindi (CodeWithHarry)",
              subtopics:[
                {text:"map() — transform every element",yt:"https://www.youtube.com/watch?v=cKlnR-CB3tI"},
            {text:"filter() — keep elements matching condition",yt:"https://www.youtube.com/watch?v=cKlnR-CB3tI"},
            {text:"sorted() with key parameter",yt:"https://www.youtube.com/watch?v=cKlnR-CB3tI"},
            {text:"zip() — combine multiple iterables",yt:"https://www.youtube.com/watch?v=cKlnR-CB3tI"},
            {text:"enumerate() — index + value together",yt:"https://www.youtube.com/watch?v=cKlnR-CB3tI"},
              ],
              github:[
                {name:"vinta/awesome-python",url:"https://github.com/vinta/awesome-python",desc:"Curated Python tools",stars:"230k+"},
              ],
              resource:{title:"Python Built-in Functions Docs",url:"https://docs.python.org/3/library/functions.html"}},
              { id:"1-1-8", text:"Classes, __init__, self, instance vs class attributes", tag:"OOP", yt:"https://www.youtube.com/watch?v=ZDa-Z5JzLYM", ytLabel:"Python Classes", hindiYt:"https://www.youtube.com/watch?v=qiSCMNBIP2g", hindiYtLabel:"Python OOP Hindi (CodeWithHarry)",
              subtopics:[
                {text:"class keyword, __init__, self explained",yt:"https://www.youtube.com/watch?v=ZDa-Z5JzLYM"},
            {text:"Instance attributes vs class attributes",yt:"https://www.youtube.com/watch?v=BJ-VvGyQxho"},
            {text:"Instance methods vs class methods vs static methods",yt:"https://www.youtube.com/watch?v=ZDa-Z5JzLYM"},
            {text:"__repr__ and __str__ — string representations",yt:"https://www.youtube.com/watch?v=jCzT9XFZ5bw"},
            {text:"Encapsulation — private attributes with _",yt:"https://www.youtube.com/watch?v=ZDa-Z5JzLYM"},
              ],
              github:[
                {name:"faif/python-patterns",url:"https://github.com/faif/python-patterns",desc:"Design patterns in Python",stars:"40k+"},
              ],
              resource:{title:"Python Classes Official Docs",url:"https://docs.python.org/3/tutorial/classes.html"}},
              { id:"1-1-9", text:"Inheritance, super(), method overriding, MRO", tag:"OOP", yt:"https://www.youtube.com/watch?v=RSl87lqOXDE", ytLabel:"Python Inheritance", hindiYt:"https://www.youtube.com/watch?v=qiSCMNBIP2g", hindiYtLabel:"Python Inheritance Hindi (CodeWithHarry)",
              subtopics:[
                {text:"Inheritance — child class extends parent",yt:"https://www.youtube.com/watch?v=RSl87lqOXDE"},
            {text:"super() — call parent class methods",yt:"https://www.youtube.com/watch?v=RSl87lqOXDE"},
            {text:"Method overriding — redefine parent methods",yt:"https://www.youtube.com/watch?v=RSl87lqOXDE"},
            {text:"MRO — Method Resolution Order, C3 linearization",yt:"https://www.youtube.com/watch?v=EiOglTERPEo"},
            {text:"Multiple inheritance and mixin pattern",yt:"https://www.youtube.com/watch?v=RSl87lqOXDE"},
              ],
              github:[
                {name:"faif/python-patterns",url:"https://github.com/faif/python-patterns",desc:"OOP patterns in Python",stars:"40k+"},
              ],
              resource:{title:"Python Inheritance Docs",url:"https://docs.python.org/3/tutorial/classes.html#inheritance"}},
              { id:"1-1-10", text:"@property, dunder methods __str__ __repr__ __len__", tag:"OOP", yt:"https://www.youtube.com/watch?v=jCzT9XFZ5bw", ytLabel:"Dunder Methods", hindiYt:"https://www.youtube.com/watch?v=qiSCMNBIP2g", hindiYtLabel:"Dunder Methods Hindi (CodeWithHarry)",
              subtopics:[
                {text:"@property decorator — getters and setters",yt:"https://www.youtube.com/watch?v=jCzT9XFZ5bw"},
            {text:"__str__ and __repr__ difference",yt:"https://www.youtube.com/watch?v=jCzT9XFZ5bw"},
            {text:"__len__, __getitem__, __setitem__",yt:"https://www.youtube.com/watch?v=jCzT9XFZ5bw"},
            {text:"__eq__, __lt__, __hash__ — comparison dunders",yt:"https://www.youtube.com/watch?v=jCzT9XFZ5bw"},
            {text:"__enter__ __exit__ — context manager protocol",yt:"https://www.youtube.com/watch?v=-aKFBoZpiqA"},
              ],
              github:[
                {name:"faif/python-patterns",url:"https://github.com/faif/python-patterns",desc:"Advanced Python patterns",stars:"40k+"},
              ],
              resource:{title:"Python Data Model — Dunder Methods",url:"https://docs.python.org/3/reference/datamodel.html"}},
            ]
          },
          {
            day: "WED", label: "Advanced Python",
            resource: "Real Python – Advanced Python",
            resourceUrl: "https://realpython.com/tutorials/advanced/",
            chatgpt: "Show me 5 real production use cases for Python decorators used in frameworks like FastAPI, Flask, and Celery. Explain what's happening under the hood for each.",
            topics: [
              { id:"1-1-11", text:"List/dict/set comprehensions — one-liners that matter", tag:"Advanced", yt:"https://www.youtube.com/watch?v=3dt4OGnU5sM", ytLabel:"Python Comprehensions", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Comprehensions Hindi (CodeWithHarry)",
              subtopics:[
                {text:"List comprehension: [x*2 for x in range(10)]",yt:"https://www.youtube.com/watch?v=3dt4OGnU5sM"},
            {text:"Dict comprehension: {k:v for k,v in items}",yt:"https://www.youtube.com/watch?v=3dt4OGnU5sM"},
            {text:"Set comprehension: {x for x in items if x>0}",yt:"https://www.youtube.com/watch?v=3dt4OGnU5sM"},
            {text:"Conditional comprehensions with if/else",yt:"https://www.youtube.com/watch?v=3dt4OGnU5sM"},
            {text:"Nested comprehensions — flatten 2D lists",yt:"https://www.youtube.com/watch?v=3dt4OGnU5sM"},
              ],
              github:[
                {name:"TheAlgorithms/Python",url:"https://github.com/TheAlgorithms/Python",desc:"Comprehensions used throughout",stars:"190k+"},
              ],
              resource:{title:"Python List Comprehensions Docs",url:"https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions"}},
              { id:"1-1-12", text:"Generators, yield, iterators — memory-efficient data processing", tag:"Advanced", yt:"https://www.youtube.com/watch?v=bD05uGo_sVI", ytLabel:"Python Generators", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Generators Hindi (CampusX)",
              subtopics:[
                {text:"yield keyword — create a generator function",yt:"https://www.youtube.com/watch?v=bD05uGo_sVI"},
            {text:"Generator expressions: (x*2 for x in range(10))",yt:"https://www.youtube.com/watch?v=bD05uGo_sVI"},
            {text:"Iterators — __iter__ and __next__",yt:"https://www.youtube.com/watch?v=bD05uGo_sVI"},
            {text:"Generator pipeline — chaining generators",yt:"https://www.youtube.com/watch?v=bD05uGo_sVI"},
            {text:"itertools module — product, chain, islice",yt:"https://www.youtube.com/watch?v=Qu3dThVy6KQ"},
              ],
              github:[
                {name:"more-itertools/more-itertools",url:"https://github.com/more-itertools/more-itertools",desc:"More routines for iterables",stars:"3k+"},
              ],
              resource:{title:"Python Generators — Real Python",url:"https://realpython.com/introduction-to-python-generators/"}},
              { id:"1-1-13", text:"Decorators — @functools.wraps, custom decorators", tag:"Advanced", yt:"https://www.youtube.com/watch?v=FsAPt_9Bf3U", ytLabel:"Python Decorators", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Decorators Hindi (CampusX)",
              subtopics:[
                {text:"What is a decorator — functions wrapping functions",yt:"https://www.youtube.com/watch?v=FsAPt_9Bf3U"},
            {text:"@functools.wraps — preserve wrapped function metadata",yt:"https://www.youtube.com/watch?v=FsAPt_9Bf3U"},
            {text:"Decorator with arguments — factory pattern",yt:"https://www.youtube.com/watch?v=FsAPt_9Bf3U"},
            {text:"Class-based decorators",yt:"https://www.youtube.com/watch?v=FsAPt_9Bf3U"},
            {text:"Real decorators: @cache, @retry, @timer",yt:"https://www.youtube.com/watch?v=FsAPt_9Bf3U"},
              ],
              github:[
                {name:"faif/python-patterns",url:"https://github.com/faif/python-patterns",desc:"Decorator patterns",stars:"40k+"},
                {name:"pydantic/pydantic",url:"https://github.com/pydantic/pydantic",desc:"Uses decorators extensively",stars:"21k+"},
              ],
              resource:{title:"Python Decorators — Real Python",url:"https://realpython.com/primer-on-python-decorators/"}},
              { id:"1-1-14", text:"Context managers — with statement, __enter__ __exit__", tag:"Advanced", yt:"https://www.youtube.com/watch?v=-aKFBoZpiqA", ytLabel:"Context Managers", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Context Managers Hindi (CampusX)",
              subtopics:[
                {text:"with statement — automatic resource management",yt:"https://www.youtube.com/watch?v=-aKFBoZpiqA"},
            {text:"__enter__ and __exit__ protocol",yt:"https://www.youtube.com/watch?v=-aKFBoZpiqA"},
            {text:"contextlib.contextmanager decorator",yt:"https://www.youtube.com/watch?v=-aKFBoZpiqA"},
            {text:"Use case: file handling, DB connections, locks",yt:"https://www.youtube.com/watch?v=-aKFBoZpiqA"},
              ],
              github:[
                {name:"vinta/awesome-python",url:"https://github.com/vinta/awesome-python",desc:"Context manager examples",stars:"230k+"},
              ],
              resource:{title:"Python contextlib Docs",url:"https://docs.python.org/3/library/contextlib.html"}},
              { id:"1-1-15", text:"Error handling — try/except/finally, custom exceptions", tag:"Errors", yt:"https://www.youtube.com/watch?v=NIWwJbo-9_8", ytLabel:"Python Exceptions", hindiYt:"https://www.youtube.com/watch?v=aqvDTCpNRek", hindiYtLabel:"Error Handling Hindi (CodeWithHarry)",
              subtopics:[
                {text:"try / except / else / finally structure",yt:"https://www.youtube.com/watch?v=NIWwJbo-9_8"},
            {text:"Built-in exceptions: ValueError, TypeError, KeyError",yt:"https://www.youtube.com/watch?v=NIWwJbo-9_8"},
            {text:"Custom exception classes — inherit from Exception",yt:"https://www.youtube.com/watch?v=NIWwJbo-9_8"},
            {text:"raise and re-raise — propagating exceptions",yt:"https://www.youtube.com/watch?v=NIWwJbo-9_8"},
            {text:"Exception chaining with 'from'",yt:"https://www.youtube.com/watch?v=NIWwJbo-9_8"},
              ],
              github:[
                {name:"TheAlgorithms/Python",url:"https://github.com/TheAlgorithms/Python",desc:"Error handling in practice",stars:"190k+"},
              ],
              resource:{title:"Python Exceptions Docs",url:"https://docs.python.org/3/tutorial/errors.html"}},
            ]
          },
          {
            day: "THU", label: "File I/O & Modules",
            resource: "Python Docs – pathlib",
            resourceUrl: "https://docs.python.org/3/library/pathlib.html",
            chatgpt: "Show me how to add professional logging to a Python application. What logging setup do production Python apps use? Include structured JSON logging, log rotation, and log levels.",
            topics: [
              { id:"1-1-16", text:"Read/write files: text, CSV, JSON with pathlib", tag:"Files", yt:"https://www.youtube.com/watch?v=Uh2ebFW8OYM", ytLabel:"Python File I/O", hindiYt:"https://www.youtube.com/watch?v=aqvDTCpNRek", hindiYtLabel:"File IO Hindi (CodeWithHarry)",
              subtopics:[
                {text:"open() — read/write text files",yt:"https://www.youtube.com/watch?v=Uh2ebFW8OYM"},
            {text:"pathlib.Path — modern file paths (not os.path)",yt:"https://www.youtube.com/watch?v=UcKkmwaOY8s"},
            {text:"csv module — read/write CSV files",yt:"https://www.youtube.com/watch?v=q5uM4VKywbA"},
            {text:"json module — parse and write JSON",yt:"https://www.youtube.com/watch?v=9N6a-VLBa2I"},
            {text:"File operations: exists, mkdir, glob, rename",yt:"https://www.youtube.com/watch?v=UcKkmwaOY8s"},
              ],
              github:[
                {name:"python/cpython",url:"https://github.com/python/cpython",desc:"Python source — pathlib implementation",stars:"63k+"},
              ],
              resource:{title:"Python pathlib Official Docs",url:"https://docs.python.org/3/library/pathlib.html"}},
              { id:"1-1-17", text:"import system, packages, __init__.py, relative imports", tag:"Modules", yt:"https://www.youtube.com/watch?v=GxCXiSkm6no", ytLabel:"Python Modules", hindiYt:"https://www.youtube.com/watch?v=aqvDTCpNRek", hindiYtLabel:"Python Modules Hindi (CodeWithHarry)",
              subtopics:[
                {text:"import statement — how Python finds modules",yt:"https://www.youtube.com/watch?v=GxCXiSkm6no"},
            {text:"__init__.py — creating Python packages",yt:"https://www.youtube.com/watch?v=GxCXiSkm6no"},
            {text:"Relative imports: from . import module",yt:"https://www.youtube.com/watch?v=GxCXiSkm6no"},
            {text:"sys.path — Python module search path",yt:"https://www.youtube.com/watch?v=GxCXiSkm6no"},
            {text:"pip install and requirements.txt",yt:"https://www.youtube.com/watch?v=mBcmdcmZXJg"},
              ],
              github:[
                {name:"vinta/awesome-python",url:"https://github.com/vinta/awesome-python",desc:"Best Python packages curated",stars:"230k+"},
              ],
              resource:{title:"Python Modules Docs",url:"https://docs.python.org/3/tutorial/modules.html"}},
              { id:"1-1-18", text:"Python logging module — levels, handlers, formatters", tag:"Logging", yt:"https://www.youtube.com/watch?v=-ARI4Cz-awo", ytLabel:"Python Logging", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Python Logging Hindi (CampusX)",
              subtopics:[
                {text:"logging module — levels DEBUG INFO WARNING ERROR CRITICAL",yt:"https://www.youtube.com/watch?v=-ARI4Cz-awo"},
            {text:"Handlers: StreamHandler, FileHandler, RotatingFileHandler",yt:"https://www.youtube.com/watch?v=-ARI4Cz-awo"},
            {text:"Formatters — structured log output",yt:"https://www.youtube.com/watch?v=-ARI4Cz-awo"},
            {text:"structlog — structured JSON logging for production",yt:"https://www.youtube.com/watch?v=-ARI4Cz-awo"},
            {text:"Logger hierarchy and propagation",yt:"https://www.youtube.com/watch?v=-ARI4Cz-awo"},
              ],
              github:[
                {name:"hynek/structlog",url:"https://github.com/hynek/structlog",desc:"Structured logging for Python",stars:"3k+"},
              ],
              resource:{title:"Python logging Docs",url:"https://docs.python.org/3/library/logging.html"}},
              { id:"1-1-19", text:"dotenv, configparser, environment variables for secrets", tag:"Config", yt:"https://www.youtube.com/watch?v=YdgIWTYQ69A", ytLabel:"Python Config", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Dotenv Hindi (CampusX)",
              subtopics:[
                {text:"python-dotenv — load .env file into os.environ",yt:"https://www.youtube.com/watch?v=YdgIWTYQ69A"},
            {text:"os.environ — read environment variables",yt:"https://www.youtube.com/watch?v=YdgIWTYQ69A"},
            {text:"configparser — .ini config files",yt:"https://www.youtube.com/watch?v=YdgIWTYQ69A"},
            {text:".env file — never commit secrets to Git",yt:"https://www.youtube.com/watch?v=YdgIWTYQ69A"},
            {text:"Pydantic Settings — typed config from env vars",yt:"https://www.youtube.com/watch?v=502XOB0u8OY"},
              ],
              github:[
                {name:"theskumar/python-dotenv",url:"https://github.com/theskumar/python-dotenv",desc:"Read .env files into os.environ",stars:"7k+"},
                {name:"pydantic/pydantic-settings",url:"https://github.com/pydantic/pydantic-settings",desc:"Typed settings from env vars",stars:"2k+"},
              ],
              resource:{title:"python-dotenv Docs",url:"https://saurabh-kumar.com/python-dotenv/"}},
              { id:"1-1-20", text:"argparse & click for CLI applications", tag:"CLI", yt:"https://www.youtube.com/watch?v=cdblJqEUDNo", ytLabel:"Python CLI", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"argparse Hindi (CampusX)",
              subtopics:[
                {text:"argparse — parse command line arguments",yt:"https://www.youtube.com/watch?v=cdblJqEUDNo"},
            {text:"argparse subcommands — git-style CLI",yt:"https://www.youtube.com/watch?v=cdblJqEUDNo"},
            {text:"click — decorator-based CLI framework",yt:"https://www.youtube.com/watch?v=kNke39OZ2k0"},
            {text:"typer — click with type hints (FastAPI for CLIs)",yt:"https://www.youtube.com/watch?v=kNke39OZ2k0"},
            {text:"Rich — beautiful terminal output",yt:"https://www.youtube.com/watch?v=4zbehnz-8QU"},
              ],
              github:[
                {name:"pallets/click",url:"https://github.com/pallets/click",desc:"Python CLI framework",stars:"15k+"},
                {name:"tiangolo/typer",url:"https://github.com/tiangolo/typer",desc:"CLI with type hints",stars:"15k+"},
                {name:"Textualize/rich",url:"https://github.com/Textualize/rich",desc:"Beautiful terminal output",stars:"49k+"},
              ],
              resource:{title:"Click Documentation",url:"https://click.palletsprojects.com/"}},
            ]
          },
          {
            day: "FRI", label: "Type Hints & Testing",
            resource: "pytest docs",
            resourceUrl: "https://docs.pytest.org/",
            chatgpt: "Show me how to write fully typed Python code with comprehensive pytest tests. Use a data validation function as the example. Include fixtures, parametrize, and mocking.",
            topics: [
              { id:"1-1-21", text:"Type hints: List, Dict, Optional, Union, TypeVar, Protocol", tag:"Types", yt:"https://www.youtube.com/watch?v=QORvB-_mbZ0", ytLabel:"Python Type Hints", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Type Hints Hindi (CampusX)",
              subtopics:[
                {text:"Basic type hints: int, str, list, dict, Optional",yt:"https://www.youtube.com/watch?v=QORvB-_mbZ0"},
            {text:"List[int], Dict[str,int], Tuple[int,...] syntax",yt:"https://www.youtube.com/watch?v=QORvB-_mbZ0"},
            {text:"Union types: Union[str,int] and str|int (3.10+)",yt:"https://www.youtube.com/watch?v=QORvB-_mbZ0"},
            {text:"TypeVar and Generic — type-safe containers",yt:"https://www.youtube.com/watch?v=QORvB-_mbZ0"},
            {text:"Protocol — structural subtyping (duck typing)",yt:"https://www.youtube.com/watch?v=xvb5hGLoK0A"},
              ],
              github:[
                {name:"python/mypy",url:"https://github.com/python/mypy",desc:"Static type checker for Python",stars:"18k+"},
              ],
              resource:{title:"Python Type Hints PEP 484",url:"https://peps.python.org/pep-0484/"}},
              { id:"1-1-22", text:"Pydantic v2 — data validation, models, validators", tag:"Pydantic", yt:"https://www.youtube.com/watch?v=502XOB0u8OY", ytLabel:"Pydantic Tutorial", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Pydantic Hindi (CampusX)",
              subtopics:[
                {text:"BaseModel — define data models with type hints",yt:"https://www.youtube.com/watch?v=502XOB0u8OY"},
            {text:"Validators: @field_validator, @model_validator",yt:"https://www.youtube.com/watch?v=502XOB0u8OY"},
            {text:"Nested models — model inside model",yt:"https://www.youtube.com/watch?v=502XOB0u8OY"},
            {text:"JSON serialization: .model_dump() .model_json()",yt:"https://www.youtube.com/watch?v=502XOB0u8OY"},
            {text:"Pydantic Settings for typed config management",yt:"https://www.youtube.com/watch?v=502XOB0u8OY"},
              ],
              github:[
                {name:"pydantic/pydantic",url:"https://github.com/pydantic/pydantic",desc:"Data validation with Python types",stars:"21k+"},
              ],
              resource:{title:"Pydantic v2 Official Docs",url:"https://docs.pydantic.dev/latest/"}},
              { id:"1-1-23", text:"pytest: test functions, fixtures, parametrize, markers", tag:"Testing", yt:"https://www.youtube.com/watch?v=cHYq1MRoyI0", ytLabel:"pytest Tutorial", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"pytest Hindi (CampusX)",
              subtopics:[
                {text:"pytest basics — write and run test functions",yt:"https://www.youtube.com/watch?v=cHYq1MRoyI0"},
            {text:"Fixtures — reusable test setup and teardown",yt:"https://www.youtube.com/watch?v=cHYq1MRoyI0"},
            {text:"@pytest.mark.parametrize — test multiple inputs",yt:"https://www.youtube.com/watch?v=cHYq1MRoyI0"},
            {text:"Mocking with unittest.mock — patch dependencies",yt:"https://www.youtube.com/watch?v=cHYq1MRoyI0"},
            {text:"Coverage report: pytest --cov",yt:"https://www.youtube.com/watch?v=cHYq1MRoyI0"},
              ],
              github:[
                {name:"pytest-dev/pytest",url:"https://github.com/pytest-dev/pytest",desc:"Python testing framework",stars:"12k+"},
                {name:"pytest-dev/pytest-cov",url:"https://github.com/pytest-dev/pytest-cov",desc:"Coverage plugin for pytest",stars:"1.7k+"},
              ],
              resource:{title:"pytest Official Documentation",url:"https://docs.pytest.org/en/stable/"}},
              { id:"1-1-24", text:"async/await, asyncio, coroutines — modern Python I/O", tag:"Async", yt:"https://www.youtube.com/watch?v=t5Bo1Je9EmE", ytLabel:"Python Asyncio", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Asyncio Hindi (CampusX)",
              subtopics:[
                {text:"async def and await — write async functions",yt:"https://www.youtube.com/watch?v=t5Bo1Je9EmE"},
            {text:"asyncio.run() — run async code from sync",yt:"https://www.youtube.com/watch?v=t5Bo1Je9EmE"},
            {text:"Coroutines, tasks, gather — run concurrently",yt:"https://www.youtube.com/watch?v=t5Bo1Je9EmE"},
            {text:"async for and async with",yt:"https://www.youtube.com/watch?v=t5Bo1Je9EmE"},
            {text:"When to use async vs threading vs multiprocessing",yt:"https://www.youtube.com/watch?v=PJ4ek_tIVXM"},
              ],
              github:[
                {name:"python/asyncio",url:"https://github.com/python/cpython/tree/main/Lib/asyncio",desc:"Python asyncio source",stars:"63k+"},
                {name:"aio-libs/aiohttp",url:"https://github.com/aio-libs/aiohttp",desc:"Async HTTP client/server",stars:"15k+"},
              ],
              resource:{title:"Python asyncio Docs",url:"https://docs.python.org/3/library/asyncio.html"}},
              { id:"1-1-25", text:"httpx async client for making API requests", tag:"HTTP", yt:"https://www.youtube.com/watch?v=qAh5dDODJ3k", ytLabel:"Python httpx", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"httpx Hindi (CampusX)",
              subtopics:[
                {text:"httpx basics — sync and async HTTP requests",yt:"https://www.youtube.com/watch?v=qAh5dDODJ3k"},
            {text:"httpx.AsyncClient — async API calls",yt:"https://www.youtube.com/watch?v=qAh5dDODJ3k"},
            {text:"Headers, authentication, timeouts in httpx",yt:"https://www.youtube.com/watch?v=qAh5dDODJ3k"},
            {text:"Streaming responses — async iteration",yt:"https://www.youtube.com/watch?v=qAh5dDODJ3k"},
            {text:"Why httpx over requests for LLM APIs",yt:"https://www.youtube.com/watch?v=qAh5dDODJ3k"},
              ],
              github:[
                {name:"encode/httpx",url:"https://github.com/encode/httpx",desc:"Async-capable HTTP client",stars:"13k+"},
                {name:"psf/requests",url:"https://github.com/psf/requests",desc:"Classic Python HTTP library",stars:"52k+"},
              ],
              resource:{title:"httpx Official Docs",url:"https://www.python-httpx.org/"}},
            ]
          },
          {
            day: "SAT", label: "Git & Dev Environment",
            resource: "Corey Schafer – Git Series",
            resourceUrl: "https://www.youtube.com/playlist?list=PL-osiE80TeTuRUfjRe54Eea17-YfnOOAx",
            chatgpt: "Teach me the Git workflow used by professional engineering teams. Show me: feature branch workflow, how to write good commit messages, PR reviews, and resolving merge conflicts.",
            topics: [
              { id:"1-1-26", text:"git init, add, commit, push, pull, clone, status", tag:"Git", yt:"https://www.youtube.com/watch?v=HVsySz-h9r4", ytLabel:"Git Crash Course", hindiYt:"https://www.youtube.com/watch?v=RGOj5yH7evk", hindiYtLabel:"Git Hindi (CodeWithHarry)",
              subtopics:[
                {text:"git init, add, commit — the 3 core commands",yt:"https://www.youtube.com/watch?v=HVsySz-h9r4"},
            {text:"git push, pull, clone, fetch",yt:"https://www.youtube.com/watch?v=HVsySz-h9r4"},
            {text:"git status, log, diff — inspect changes",yt:"https://www.youtube.com/watch?v=HVsySz-h9r4"},
            {text:"git stash — save work in progress",yt:"https://www.youtube.com/watch?v=HVsySz-h9r4"},
            {text:"GitHub Skills interactive course",yt:"https://www.youtube.com/watch?v=HVsySz-h9r4"},
              ],
              github:[
                {name:"github/skills",url:"https://github.com/skills",desc:"GitHub's official interactive learning",stars:"N/A"},
                {name:"github/gitignore",url:"https://github.com/github/gitignore",desc:"Gitignore templates",stars:"162k+"},
              ],
              resource:{title:"GitHub Skills — Official Interactive Course",url:"https://skills.github.com/"}},
              { id:"1-1-27", text:"Branching, merge, rebase — professional Git workflow", tag:"Git", yt:"https://www.youtube.com/watch?v=FyAAIHHClqI", ytLabel:"Git Branching", hindiYt:"https://www.youtube.com/watch?v=RGOj5yH7evk", hindiYtLabel:"Git Branching Hindi (CodeWithHarry)",
              subtopics:[
                {text:"git branch — create and switch branches",yt:"https://www.youtube.com/watch?v=FyAAIHHClqI"},
            {text:"git merge — combine branches",yt:"https://www.youtube.com/watch?v=FyAAIHHClqI"},
            {text:"git rebase — clean linear history",yt:"https://www.youtube.com/watch?v=f1wnypJnXI0"},
            {text:"Resolve merge conflicts step by step",yt:"https://www.youtube.com/watch?v=xNVM5UxlFSA"},
            {text:"Feature branch workflow — professional Git",yt:"https://www.youtube.com/watch?v=FyAAIHHClqI"},
              ],
              github:[
                {name:"pcottle/learnGitBranching",url:"https://github.com/pcottle/learnGitBranching",desc:"Visual interactive Git branching",stars:"30k+"},
              ],
              resource:{title:"Learn Git Branching — Interactive",url:"https://learngitbranching.js.org/"}},
              { id:"1-1-28", text:".gitignore, GitHub PRs, Issues, Actions basics", tag:"GitHub", yt:"https://www.youtube.com/watch?v=RGOj5yH7evk", ytLabel:"GitHub Tutorial", hindiYt:"https://www.youtube.com/watch?v=RGOj5yH7evk", hindiYtLabel:"GitHub Hindi (CodeWithHarry)",
              subtopics:[
                {text:".gitignore — patterns to exclude files",yt:"https://www.youtube.com/watch?v=RGOj5yH7evk"},
            {text:"GitHub Pull Requests — open, review, merge",yt:"https://www.youtube.com/watch?v=RGOj5yH7evk"},
            {text:"GitHub Issues — track bugs and features",yt:"https://www.youtube.com/watch?v=RGOj5yH7evk"},
            {text:"GitHub Actions — basic CI/CD workflow",yt:"https://www.youtube.com/watch?v=R8_veQiYBjI"},
            {text:"Write a professional README.md",yt:"https://www.youtube.com/watch?v=E6NO0rgFub4"},
              ],
              github:[
                {name:"github/gitignore",url:"https://github.com/github/gitignore",desc:"Gitignore templates for every language",stars:"162k+"},
                {name:"actions/starter-workflows",url:"https://github.com/actions/starter-workflows",desc:"GitHub Actions templates",stars:"9k+"},
              ],
              resource:{title:"GitHub Actions Docs",url:"https://docs.github.com/en/actions"}},
              { id:"1-1-29", text:"poetry for dependency management (modern pip replacement)", tag:"Env", yt:"https://www.youtube.com/watch?v=0f3moPe_bhk", ytLabel:"Python Poetry", hindiYt:"https://www.youtube.com/watch?v=RGOj5yH7evk", hindiYtLabel:"Poetry Hindi (CodeWithHarry)",
              subtopics:[
                {text:"poetry init — start new project with poetry",yt:"https://www.youtube.com/watch?v=0f3moPe_bhk"},
            {text:"pyproject.toml — modern Python packaging",yt:"https://www.youtube.com/watch?v=0f3moPe_bhk"},
            {text:"poetry add, remove, update — manage dependencies",yt:"https://www.youtube.com/watch?v=0f3moPe_bhk"},
            {text:"poetry run and poetry shell",yt:"https://www.youtube.com/watch?v=0f3moPe_bhk"},
            {text:"poetry vs pip vs pipenv comparison",yt:"https://www.youtube.com/watch?v=0f3moPe_bhk"},
              ],
              github:[
                {name:"python-poetry/poetry",url:"https://github.com/python-poetry/poetry",desc:"Python dependency management",stars:"31k+"},
              ],
              resource:{title:"Poetry Official Docs",url:"https://python-poetry.org/docs/"}},
              { id:"1-1-30", text:"Makefile for project automation (run tests, lint, format)", tag:"Tools", yt:"https://www.youtube.com/watch?v=a8mPKBxQ9No", ytLabel:"Makefile Tutorial", hindiYt:"https://www.youtube.com/watch?v=RGOj5yH7evk", hindiYtLabel:"Makefile Hindi (CodeWithHarry)",
              subtopics:[
                {text:"Makefile basics — targets and recipes",yt:"https://www.youtube.com/watch?v=a8mPKBxQ9No"},
            {text:"Common Makefile targets: test, lint, format, run",yt:"https://www.youtube.com/watch?v=a8mPKBxQ9No"},
            {text:"pre-commit hooks — run checks before commit",yt:"https://www.youtube.com/watch?v=psjz6rwzMdk"},
            {text:"Ruff — ultra-fast Python linter (replaces flake8)",yt:"https://www.youtube.com/watch?v=a8mPKBxQ9No"},
            {text:"black — auto-format Python code",yt:"https://www.youtube.com/watch?v=a8mPKBxQ9No"},
              ],
              github:[
                {name:"astral-sh/ruff",url:"https://github.com/astral-sh/ruff",desc:"Extremely fast Python linter",stars:"33k+"},
                {name:"psf/black",url:"https://github.com/psf/black",desc:"The uncompromising Python formatter",stars:"39k+"},
                {name:"pre-commit/pre-commit",url:"https://github.com/pre-commit/pre-commit",desc:"Pre-commit hooks framework",stars:"13k+"},
              ],
              resource:{title:"pre-commit Official Docs",url:"https://pre-commit.com/"}},
            ]
          },
          {
            day: "SUN", label: "Project Day 🏗",
            resource: "GitHub README Guide",
            resourceUrl: "https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes",
            chatgpt: "Review my Python project [paste code]. Score it on: code quality (Pythonic style), error handling completeness, test coverage, documentation, and production readiness. Give specific improvements.",
            topics: [
              { id:"1-1-31", text:"🏗 BUILD: Weather CLI App — API fetch + logging + config + tests", tag:"Project", yt:"https://www.youtube.com/watch?v=SqvVm3QiQVk", ytLabel:"Python Project Tutorial", hindiYt:"https://www.youtube.com/watch?v=aqvDTCpNRek", hindiYtLabel:"Python Project Hindi (CodeWithHarry)",
              subtopics:[
                {text:"Build a Weather CLI: fetch Open-Meteo API",yt:"https://www.youtube.com/watch?v=SqvVm3QiQVk"},
            {text:"Add logging, config, error handling",yt:"https://www.youtube.com/watch?v=SqvVm3QiQVk"},
            {text:"Write pytest tests for all functions",yt:"https://www.youtube.com/watch?v=cHYq1MRoyI0"},
            {text:"Use Click for CLI interface",yt:"https://www.youtube.com/watch?v=kNke39OZ2k0"},
              ],
              github:[
                {name:"TheAlgorithms/Python",url:"https://github.com/TheAlgorithms/Python",desc:"Reference for Python project structure",stars:"190k+"},
              ],
              resource:{title:"Open-Meteo Free Weather API",url:"https://open-meteo.com/"}},
              { id:"1-1-32", text:"Push to GitHub with README, .gitignore, requirements.txt", tag:"GitHub", yt:"https://www.youtube.com/watch?v=RGOj5yH7evk", ytLabel:"GitHub Setup", hindiYt:"https://www.youtube.com/watch?v=RGOj5yH7evk", hindiYtLabel:"GitHub README Hindi (CodeWithHarry)",
              subtopics:[
                {text:"Write a professional README.md for your project",yt:"https://www.youtube.com/watch?v=E6NO0rgFub4"},
            {text:".gitignore for Python projects",yt:"https://www.youtube.com/watch?v=RGOj5yH7evk"},
            {text:"requirements.txt and setup.cfg",yt:"https://www.youtube.com/watch?v=mBcmdcmZXJg"},
            {text:"Push and create GitHub repo with badges",yt:"https://www.youtube.com/watch?v=RGOj5yH7evk"},
              ],
              github:[
                {name:"github/gitignore",url:"https://github.com/github/gitignore",desc:"Gitignore templates",stars:"162k+"},
                {name:"othneildrew/Best-README-Template",url:"https://github.com/othneildrew/Best-README-Template",desc:"README template",stars:"14k+"},
              ],
              resource:{title:"GitHub Docs — About READMEs",url:"https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes"}},
              { id:"1-1-33", text:"Write pytest tests for all functions (aim 80%+ coverage)", tag:"Testing", yt:"https://www.youtube.com/watch?v=cHYq1MRoyI0", ytLabel:"pytest Coverage", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"pytest Coverage Hindi (CampusX)",
              subtopics:[
                {text:"pytest --cov — measure test coverage",yt:"https://www.youtube.com/watch?v=cHYq1MRoyI0"},
            {text:"Write tests for edge cases and error paths",yt:"https://www.youtube.com/watch?v=cHYq1MRoyI0"},
            {text:"Mocking external APIs in tests",yt:"https://www.youtube.com/watch?v=cHYq1MRoyI0"},
            {text:"CI: run tests automatically on GitHub Actions",yt:"https://www.youtube.com/watch?v=R8_veQiYBjI"},
              ],
              github:[
                {name:"pytest-dev/pytest",url:"https://github.com/pytest-dev/pytest",desc:"Python testing framework",stars:"12k+"},
              ],
              resource:{title:"pytest Coverage Docs",url:"https://pytest-cov.readthedocs.io/"}},
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
              { id:"2-3-1", text:"Vectors: addition, scalar multiplication, dot product, magnitude", tag:"LinAlg", yt:"https://www.youtube.com/watch?v=fNk_zzaMoSs", ytLabel:"3B1B: Vectors", hindiYt:"https://www.youtube.com/watch?v=uZeDTwWcnuY", hindiYtLabel:"Linear Algebra Hindi (Gate Smashers)",
              subtopics:[
                {text:"Vectors: direction, magnitude, unit vectors",yt:"https://www.youtube.com/watch?v=fNk_zzaMoSs"},
                {text:"Dot product — similarity between vectors",yt:"https://www.youtube.com/watch?v=LyGKycYT2v0"},
                {text:"Vector operations with NumPy",yt:"https://www.youtube.com/watch?v=QJd3ZlyWODc"},
                {text:"Why vectors are the foundation of ML",yt:"https://www.youtube.com/watch?v=fNk_zzaMoSs"},
              ],
              github:[
                {name:"numpy/numpy",url:"https://github.com/numpy/numpy",desc:"NumPy — array computing",stars:"28k+"},
              ],
              resource:{title:"3Blue1Brown — Essence of Linear Algebra",url:"https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab"}},
              { id:"2-3-2", text:"Matrix multiplication — the engine of neural networks", tag:"LinAlg", yt:"https://www.youtube.com/watch?v=XkY2DOUCWMU", ytLabel:"3B1B: Matrix Mult", hindiYt:"https://www.youtube.com/watch?v=uZeDTwWcnuY", hindiYtLabel:"Linear Algebra Hindi (Gate Smashers)",
              subtopics:[
                {text:"Matrix multiplication — row × column",yt:"https://www.youtube.com/watch?v=XkY2DOUCWMU"},
                {text:"Visualizing matrix transformations",yt:"https://www.youtube.com/watch?v=kYB8IZa5AuE"},
                {text:"Why matmul is the core of neural networks",yt:"https://www.youtube.com/watch?v=XkY2DOUCWMU"},
                {text:"np.matmul and @ operator in code",yt:"https://www.youtube.com/watch?v=QJd3ZlyWODc"},
              ],
              github:[
                {name:"numpy/numpy",url:"https://github.com/numpy/numpy",desc:"NumPy matrix ops",stars:"28k+"},
              ],
              resource:{title:"3Blue1Brown Matrix Multiplication",url:"https://www.youtube.com/watch?v=XkY2DOUCWMU"}},
              { id:"2-3-3", text:"Transpose, inverse, identity matrix, orthogonality", tag:"LinAlg", yt:"https://www.youtube.com/watch?v=uQhTuRlWMxw", ytLabel:"3B1B: Transformations", hindiYt:"https://www.youtube.com/watch?v=uZeDTwWcnuY", hindiYtLabel:"Linear Algebra Hindi (Gate Smashers)",
              subtopics:[
                {text:"Transpose — flip rows and columns",yt:"https://www.youtube.com/watch?v=uQhTuRlWMxw"},
                {text:"Matrix inverse — A × A⁻¹ = I",yt:"https://www.youtube.com/watch?v=uQhTuRlWMxw"},
                {text:"Orthogonality — perpendicular vectors",yt:"https://www.youtube.com/watch?v=uQhTuRlWMxw"},
                {text:"np.linalg.inv, np.transpose in code",yt:"https://www.youtube.com/watch?v=QJd3ZlyWODc"},
              ],
              github:[
                {name:"numpy/numpy",url:"https://github.com/numpy/numpy",desc:"np.linalg module",stars:"28k+"},
              ],
              resource:{title:"MIT OCW Linear Algebra",url:"https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/"}},
              { id:"2-3-4", text:"Eigenvalues & eigenvectors — intuition for PCA", tag:"LinAlg", yt:"https://www.youtube.com/watch?v=PFDu9oVAE-g", ytLabel:"3B1B: Eigenvectors", hindiYt:"https://www.youtube.com/watch?v=uZeDTwWcnuY", hindiYtLabel:"Linear Algebra Hindi (Gate Smashers)",
              subtopics:[
                {text:"Eigenvalues and eigenvectors visualized",yt:"https://www.youtube.com/watch?v=PFDu9oVAE-g"},
                {text:"Why eigenvalues power PCA",yt:"https://www.youtube.com/watch?v=FgakZw6K1QQ"},
                {text:"np.linalg.eig — compute in code",yt:"https://www.youtube.com/watch?v=QJd3ZlyWODc"},
                {text:"Symmetric matrices — always real eigenvalues",yt:"https://www.youtube.com/watch?v=PFDu9oVAE-g"},
              ],
              github:[
                {name:"numpy/numpy",url:"https://github.com/numpy/numpy",desc:"np.linalg.eig",stars:"28k+"},
                {name:"scipy/scipy",url:"https://github.com/scipy/scipy",desc:"Scientific Python",stars:"13k+"},
              ],
              resource:{title:"3Blue1Brown Eigenvalues",url:"https://www.youtube.com/watch?v=PFDu9oVAE-g"}},
              { id:"2-3-5", text:"Implement matrix ops from scratch, verify with NumPy", tag:"Code", yt:"https://www.youtube.com/watch?v=aircAruvnKk", ytLabel:"Neural Network Math", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"Matrix ops from scratch in Python",yt:"https://www.youtube.com/watch?v=QJd3ZlyWODc"},
                {text:"Verify with NumPy — shape debugging",yt:"https://www.youtube.com/watch?v=V0D2mhVt7NE"},
                {text:"Common shape errors and how to fix them",yt:"https://www.youtube.com/watch?v=oG1t3qlzq14"},
              ],
              github:[
                {name:"karpathy/micrograd",url:"https://github.com/karpathy/micrograd",desc:"Tiny autograd engine",stars:"10k+"},
              ],
              resource:{title:"NumPy Linear Algebra Docs",url:"https://numpy.org/doc/stable/reference/routines.linalg.html"}},
            ]
          },
          {
            day: "TUE", label: "Calculus & Gradients",
            resource: "3Blue1Brown – Essence of Calculus",
            resourceUrl: "https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr",
            chatgpt: "Implement gradient descent from scratch in Python to minimize f(x) = x² - 4x + 4. Animate it with matplotlib. Then explain: what happens when learning rate is too high vs too low?",
            topics: [
              { id:"2-3-6", text:"Derivatives, chain rule — the math behind backpropagation", tag:"Calculus", yt:"https://www.youtube.com/watch?v=9vKqVkMQHKk", ytLabel:"3B1B: Derivatives", hindiYt:"https://www.youtube.com/watch?v=H-ybCx8gt-8", hindiYtLabel:"Calculus ML Hindi (Gate Smashers)",
              subtopics:[
                {text:"Derivatives — rate of change, slope",yt:"https://www.youtube.com/watch?v=WUvTyaaNkzM"},
                {text:"Chain rule — how backprop actually works",yt:"https://www.youtube.com/watch?v=YG15m2VwSjA"},
                {text:"Partial derivatives — multivariable calculus",yt:"https://www.youtube.com/watch?v=AXqhWeUEtQU"},
                {text:"Implement backprop with chain rule",yt:"https://www.youtube.com/watch?v=Ilg3gGewQ5U"},
              ],
              github:[
                {name:"karpathy/micrograd",url:"https://github.com/karpathy/micrograd",desc:"Chain rule in practice",stars:"10k+"},
              ],
              resource:{title:"3Blue1Brown Calculus Series",url:"https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr"}},
              { id:"2-3-7", text:"Partial derivatives, gradients — direction of steepest ascent", tag:"Calculus", yt:"https://www.youtube.com/watch?v=tIpKfDc295M", ytLabel:"3B1B: Gradient", hindiYt:"https://www.youtube.com/watch?v=H-ybCx8gt-8", hindiYtLabel:"Calculus ML Hindi (Gate Smashers)",
              subtopics:[
                {text:"Gradient — direction of steepest ascent",yt:"https://www.youtube.com/watch?v=AXqhWeUEtQU"},
                {text:"Jacobian matrix — partial derivatives",yt:"https://www.youtube.com/watch?v=Cr0k4YFLzZk"},
                {text:"Gradient in neural network context",yt:"https://www.youtube.com/watch?v=AXqhWeUEtQU"},
                {text:"Visualize gradient descent in 3D",yt:"https://www.youtube.com/watch?v=IHZwWFHWa-w"},
              ],
              github:[
                {name:"karpathy/micrograd",url:"https://github.com/karpathy/micrograd",desc:"Gradients from scratch",stars:"10k+"},
              ],
              resource:{title:"Gradient Descent Visualizer",url:"https://www.benfrederickson.com/numerical-optimization/"}},
              { id:"2-3-8", text:"Gradient descent — visualize convergence in Python", tag:"Optim", yt:"https://www.youtube.com/watch?v=IHZwWFHWa-w", ytLabel:"Gradient Descent Visual", hindiYt:"https://www.youtube.com/watch?v=IHZwWFHWa-w", hindiYtLabel:"Optimization Hindi (Gate Smashers)",
              subtopics:[
                {text:"Gradient descent — minimize loss",yt:"https://www.youtube.com/watch?v=IHZwWFHWa-w"},
                {text:"Learning rate — too high vs too low",yt:"https://www.youtube.com/watch?v=IHZwWFHWa-w"},
                {text:"Implement gradient descent in Python",yt:"https://www.youtube.com/watch?v=IHZwWFHWa-w"},
                {text:"Matplotlib animation of convergence",yt:"https://www.youtube.com/watch?v=IHZwWFHWa-w"},
              ],
              github:[
                {name:"karpathy/micrograd",url:"https://github.com/karpathy/micrograd",desc:"Pure Python autograd",stars:"10k+"},
              ],
              resource:{title:"Andrew Ng — Gradient Descent",url:"https://www.coursera.org/learn/machine-learning"}},
              { id:"2-3-9", text:"Loss functions: MSE, cross-entropy — why they work", tag:"Loss", yt:"https://www.youtube.com/watch?v=Skc8nqJirJg", ytLabel:"Loss Functions", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"MSE loss — regression tasks",yt:"https://www.youtube.com/watch?v=Pwgpl9mKars"},
                {text:"Cross-entropy loss — classification tasks",yt:"https://www.youtube.com/watch?v=Pwgpl9mKars"},
                {text:"Binary vs categorical cross-entropy",yt:"https://www.youtube.com/watch?v=Pwgpl9mKars"},
                {text:"Why log in cross-entropy — information theory",yt:"https://www.youtube.com/watch?v=ErfnhcEV1O8"},
              ],
              github:[
                {name:"pytorch/pytorch",url:"https://github.com/pytorch/pytorch",desc:"PyTorch loss functions",stars:"85k+"},
              ],
              resource:{title:"PyTorch Loss Functions Docs",url:"https://pytorch.org/docs/stable/nn.html#loss-functions"}},
              { id:"2-3-10", text:"Adam, AdamW, SGD with momentum — optimizer comparison", tag:"Optim", yt:"https://www.youtube.com/watch?v=mdKjMPmcWjY", ytLabel:"Optimizers Explained", hindiYt:"https://www.youtube.com/watch?v=IHZwWFHWa-w", hindiYtLabel:"Optimization Hindi (Gate Smashers)",
              subtopics:[
                {text:"SGD — basic gradient descent",yt:"https://www.youtube.com/watch?v=mdKjMPmcWjY"},
                {text:"Momentum — accelerate SGD",yt:"https://www.youtube.com/watch?v=mdKjMPmcWjY"},
                {text:"Adam optimizer — adaptive learning rates",yt:"https://www.youtube.com/watch?v=mdKjMPmcWjY"},
                {text:"AdamW — Adam with weight decay",yt:"https://www.youtube.com/watch?v=mdKjMPmcWjY"},
                {text:"Compare optimizers in practice",yt:"https://www.youtube.com/watch?v=mdKjMPmcWjY"},
              ],
              github:[
                {name:"pytorch/pytorch",url:"https://github.com/pytorch/pytorch",desc:"PyTorch optimizers",stars:"85k+"},
              ],
              resource:{title:"Adam Optimizer Paper",url:"https://arxiv.org/abs/1412.6980"}},
            ]
          },
          {
            day: "WED", label: "Probability & Statistics",
            resource: "StatQuest – Statistics Fundamentals",
            resourceUrl: "https://www.youtube.com/playlist?list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9",
            chatgpt: "Explain Bayes' theorem with a spam email example showing the full calculation. Then show me exactly how Naive Bayes classifier uses this for text classification with Python code.",
            topics: [
              { id:"2-3-11", text:"Probability basics, conditional probability, Bayes' theorem", tag:"Prob", yt:"https://www.youtube.com/watch?v=9wCnvr7Xw4E", ytLabel:"StatQuest: Probability", hindiYt:"https://www.youtube.com/watch?v=sbbYntt5CJk", hindiYtLabel:"Probability Hindi (Gate Smashers)",
              subtopics:[
                {text:"Probability basics — events, sample space",yt:"https://www.youtube.com/watch?v=uzkc-qNVoOk"},
                {text:"Conditional probability P(A|B)",yt:"https://www.youtube.com/watch?v=_IgyaD7vOOA"},
                {text:"Bayes theorem — posterior from prior",yt:"https://www.youtube.com/watch?v=HZGCoVF3YvM"},
                {text:"Independence and joint probability",yt:"https://www.youtube.com/watch?v=uzkc-qNVoOk"},
              ],
              github:[
                {name:"scipy/scipy",url:"https://github.com/scipy/scipy",desc:"scipy.stats",stars:"13k+"},
              ],
              resource:{title:"Khan Academy Probability",url:"https://www.khanacademy.org/math/statistics-probability"}},
              { id:"2-3-12", text:"Normal, Bernoulli, Poisson distributions — plot with scipy", tag:"Prob", yt:"https://www.youtube.com/watch?v=rzFX5NWojp0", ytLabel:"Probability Distributions", hindiYt:"https://www.youtube.com/watch?v=sbbYntt5CJk", hindiYtLabel:"Probability Hindi (Gate Smashers)",
              subtopics:[
                {text:"Normal (Gaussian) distribution",yt:"https://www.youtube.com/watch?v=rzFX5NWojp0"},
                {text:"Bernoulli and Binomial distributions",yt:"https://www.youtube.com/watch?v=UrOXRvG9oYE"},
                {text:"Poisson distribution — rare events",yt:"https://www.youtube.com/watch?v=cPOChr_kuQs"},
                {text:"Plot distributions with scipy and matplotlib",yt:"https://www.youtube.com/watch?v=SzZ6GpcfoQY"},
              ],
              github:[
                {name:"scipy/scipy",url:"https://github.com/scipy/scipy",desc:"scipy.stats distributions",stars:"13k+"},
              ],
              resource:{title:"scipy.stats Documentation",url:"https://docs.scipy.org/doc/scipy/reference/stats.html"}},
              { id:"2-3-13", text:"Mean, variance, std, covariance, correlation matrix", tag:"Stats", yt:"https://www.youtube.com/watch?v=SzZ6GpcfoQY", ytLabel:"StatQuest: Stats Basics", hindiYt:"https://www.youtube.com/watch?v=Vfo5le26IVY", hindiYtLabel:"Statistics Hindi (Gate Smashers)",
              subtopics:[
                {text:"Mean, median, mode — central tendency",yt:"https://www.youtube.com/watch?v=SzZ6GpcfoQY"},
                {text:"Variance and standard deviation",yt:"https://www.youtube.com/watch?v=SzZ6GpcfoQY"},
                {text:"Covariance — how variables move together",yt:"https://www.youtube.com/watch?v=152tSYtiQbw"},
                {text:"Correlation matrix with pandas",yt:"https://www.youtube.com/watch?v=2SCg8Kuh0tE"},
              ],
              github:[
                {name:"pandas-dev/pandas",url:"https://github.com/pandas-dev/pandas",desc:"pandas .corr() and .cov()",stars:"43k+"},
              ],
              resource:{title:"StatQuest — Statistics Clearly Explained",url:"https://www.youtube.com/@statquest"}},
              { id:"2-3-14", text:"Softmax as probability distribution — temperature scaling", tag:"LLM Math", yt:"https://www.youtube.com/watch?v=8sh29x3K5jk", ytLabel:"Softmax Explained", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"Softmax — convert logits to probabilities",yt:"https://www.youtube.com/watch?v=0VH1Lim8gL8"},
                {text:"Temperature scaling — control randomness",yt:"https://www.youtube.com/watch?v=0VH1Lim8gL8"},
                {text:"Numerical stability — subtract max before softmax",yt:"https://www.youtube.com/watch?v=0VH1Lim8gL8"},
                {text:"Softmax in attention mechanisms",yt:"https://www.youtube.com/watch?v=eMlx5fFNoYc"},
              ],
              github:[
                {name:"pytorch/pytorch",url:"https://github.com/pytorch/pytorch",desc:"F.softmax in PyTorch",stars:"85k+"},
              ],
              resource:{title:"Softmax and Cross Entropy — cs231n",url:"https://cs231n.github.io/linear-classify/"}},
              { id:"2-3-15", text:"Cross-entropy loss — information theory connection", tag:"Loss", yt:"https://www.youtube.com/watch?v=6ArSys5qHAU", ytLabel:"Cross Entropy", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"Entropy — measuring information/uncertainty",yt:"https://www.youtube.com/watch?v=ErfnhcEV1O8"},
                {text:"Cross-entropy — compare distributions",yt:"https://www.youtube.com/watch?v=Pwgpl9mKars"},
                {text:"KL divergence — how different two distributions are",yt:"https://www.youtube.com/watch?v=SxGYPqCgJWM"},
                {text:"Information theory connection to ML",yt:"https://www.youtube.com/watch?v=ErfnhcEV1O8"},
              ],
              github:[
                {name:"pytorch/pytorch",url:"https://github.com/pytorch/pytorch",desc:"nn.CrossEntropyLoss",stars:"85k+"},
              ],
              resource:{title:"Information Theory — Visual Guide",url:"https://www.youtube.com/watch?v=ErfnhcEV1O8"}},
            ]
          },
          {
            day: "THU", label: "Attention Math",
            resource: "Illustrated Transformer – Jay Alammar",
            resourceUrl: "https://jalammar.github.io/illustrated-transformer/",
            chatgpt: "Walk me through self-attention mechanism mathematically using a 4-token sentence. Show every matrix multiply step with actual numbers. Then explain why we scale by √d_k.",
            topics: [
              { id:"2-3-16", text:"Self-attention: Q, K, V matrices — derivation from scratch", tag:"Attention", yt:"https://www.youtube.com/watch?v=iDulhoQ2pro", ytLabel:"Transformer Attention Math", hindiYt:"https://www.youtube.com/watch?v=iDulhoQ2pro", hindiYtLabel:"Attention Mechanism Hindi (CampusX)",
              subtopics:[
                {text:"Query, Key, Value — what Q K V mean",yt:"https://www.youtube.com/watch?v=eMlx5fFNoYc"},
                {text:"Attention score = Q × Kᵀ / √d",yt:"https://www.youtube.com/watch?v=eMlx5fFNoYc"},
                {text:"Softmax over attention scores",yt:"https://www.youtube.com/watch?v=eMlx5fFNoYc"},
                {text:"Output = attention weights × V",yt:"https://www.youtube.com/watch?v=mMa2PmYJlCo"},
              ],
              github:[
                {name:"karpathy/nanoGPT",url:"https://github.com/karpathy/nanoGPT",desc:"Minimal GPT with attention",stars:"38k+"},
              ],
              resource:{title:"The Illustrated Transformer",url:"https://jalammar.github.io/illustrated-transformer/"}},
              { id:"2-3-17", text:"Scaled dot-product attention formula — why the scaling", tag:"Attention", yt:"https://www.youtube.com/watch?v=eMlx5fFNoYc", ytLabel:"Attention is All You Need", hindiYt:"https://www.youtube.com/watch?v=iDulhoQ2pro", hindiYtLabel:"Attention Mechanism Hindi (CampusX)",
              subtopics:[
                {text:"Why scale by √d_k — variance control",yt:"https://www.youtube.com/watch?v=eMlx5fFNoYc"},
                {text:"Scaled dot product attention formula",yt:"https://www.youtube.com/watch?v=eMlx5fFNoYc"},
                {text:"Matrix dimensions through attention",yt:"https://www.youtube.com/watch?v=4Bdc55j80l8"},
                {text:"Implement in NumPy step by step",yt:"https://www.youtube.com/watch?v=eMlx5fFNoYc"},
              ],
              github:[
                {name:"karpathy/nanoGPT",url:"https://github.com/karpathy/nanoGPT",desc:"Attention implementation",stars:"38k+"},
              ],
              resource:{title:"Attention Is All You Need Paper",url:"https://arxiv.org/abs/1706.03762"}},
              { id:"2-3-18", text:"Backpropagation through attention — chain rule application", tag:"Backprop", yt:"https://www.youtube.com/watch?v=VMj-3S1tku0", ytLabel:"Backprop From Scratch", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"Chain rule through attention layer",yt:"https://www.youtube.com/watch?v=Ilg3gGewQ5U"},
                {text:"Gradient flow in transformers",yt:"https://www.youtube.com/watch?v=Ilg3gGewQ5U"},
                {text:"Why residual connections help gradients",yt:"https://www.youtube.com/watch?v=dZVkygnKh1M"},
                {text:"Implement attention backward pass",yt:"https://www.youtube.com/watch?v=kCc8FmEb1nY"},
              ],
              github:[
                {name:"karpathy/micrograd",url:"https://github.com/karpathy/micrograd",desc:"Backprop engine",stars:"10k+"},
              ],
              resource:{title:"karpathy — Let's Build GPT",url:"https://www.youtube.com/watch?v=kCc8FmEb1nY"}},
              { id:"2-3-19", text:"Embeddings: cosine similarity, semantic space geometry", tag:"Embeddings", yt:"https://www.youtube.com/watch?v=viZrOnJclY0", ytLabel:"Word Embeddings", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"Word embeddings — dense vector representations",yt:"https://www.youtube.com/watch?v=viZrOnJclY0"},
                {text:"Cosine similarity — measure word closeness",yt:"https://www.youtube.com/watch?v=e9U0QAFbfLI"},
                {text:"Embedding space geometry — king-man+woman=queen",yt:"https://www.youtube.com/watch?v=viZrOnJclY0"},
                {text:"Visualize embeddings with t-SNE",yt:"https://www.youtube.com/watch?v=NEaUSP4YerM"},
              ],
              github:[
                {name:"UKPLab/sentence-transformers",url:"https://github.com/UKPLab/sentence-transformers",desc:"Sentence embeddings",stars:"15k+"},
                {name:"facebookresearch/faiss",url:"https://github.com/facebookresearch/faiss",desc:"Vector similarity search",stars:"31k+"},
              ],
              resource:{title:"The Illustrated Word2Vec",url:"https://jalammar.github.io/illustrated-word2vec/"}},
              { id:"2-3-20", text:"Implement attention in NumPy — verify shapes at each step", tag:"Code", yt:"https://www.youtube.com/watch?v=kCc8FmEb1nY", ytLabel:"Karpathy: Build GPT", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"Implement Q K V projections in NumPy",yt:"https://www.youtube.com/watch?v=eMlx5fFNoYc"},
                {text:"Verify shapes at each step",yt:"https://www.youtube.com/watch?v=eMlx5fFNoYc"},
                {text:"Multi-head attention — split and concat",yt:"https://www.youtube.com/watch?v=mMa2PmYJlCo"},
                {text:"Compare with PyTorch F.scaled_dot_product_attention",yt:"https://www.youtube.com/watch?v=kCc8FmEb1nY"},
              ],
              github:[
                {name:"karpathy/nanoGPT",url:"https://github.com/karpathy/nanoGPT",desc:"Attention from scratch",stars:"38k+"},
              ],
              resource:{title:"Andrej Karpathy — Let's Build GPT",url:"https://www.youtube.com/watch?v=kCc8FmEb1nY"}},
            ]
          },
          {
            day: "FRI", label: "Math in Code Lab",
            resource: "NumPy Math Documentation",
            resourceUrl: "https://numpy.org/doc/stable/reference/routines.math.html",
            chatgpt: "I built a NumPy implementation of self-attention [paste code]. Check if my matrix dimensions are correct at every step. Show me how to extend it to multi-head attention.",
            topics: [
              { id:"2-3-21", text:"Tensors: 0D→4D, shapes in DL (batch, seq, heads, dim)", tag:"Tensors", yt:"https://www.youtube.com/watch?v=L35fFDpwIM4", ytLabel:"Tensors Explained", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"Scalars 0D, vectors 1D, matrices 2D, tensors 3D+",yt:"https://www.youtube.com/watch?v=L35fFDpwIM4"},
                {text:"Batch dimension in ML: (batch, seq, dim)",yt:"https://www.youtube.com/watch?v=L35fFDpwIM4"},
                {text:"Head dimension in attention: (batch, heads, seq, dim)",yt:"https://www.youtube.com/watch?v=L35fFDpwIM4"},
                {text:"torch.Size and shape inspection",yt:"https://www.youtube.com/watch?v=OIenNRt2bjg"},
              ],
              github:[
                {name:"pytorch/pytorch",url:"https://github.com/pytorch/pytorch",desc:"PyTorch tensors",stars:"85k+"},
              ],
              resource:{title:"PyTorch Tensor Docs",url:"https://pytorch.org/docs/stable/tensors.html"}},
              { id:"2-3-22", text:"Broadcasting: NumPy/PyTorch rules — debug shape errors", tag:"Tensors", yt:"https://www.youtube.com/watch?v=oG1t3qlzq14", ytLabel:"Broadcasting", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"NumPy broadcasting rules — shape compatibility",yt:"https://www.youtube.com/watch?v=oG1t3qlzq14"},
                {text:"Common shape errors: (3,) vs (3,1)",yt:"https://www.youtube.com/watch?v=oG1t3qlzq14"},
                {text:"PyTorch broadcasting — same rules",yt:"https://www.youtube.com/watch?v=oG1t3qlzq14"},
                {text:"Debug shape errors systematically",yt:"https://www.youtube.com/watch?v=V0D2mhVt7NE"},
              ],
              github:[
                {name:"numpy/numpy",url:"https://github.com/numpy/numpy",desc:"NumPy broadcasting",stars:"28k+"},
              ],
              resource:{title:"NumPy Broadcasting Docs",url:"https://numpy.org/doc/stable/user/basics.broadcasting.html"}},
              { id:"2-3-23", text:"einsum notation — used heavily in attention code", tag:"Advanced", yt:"https://www.youtube.com/watch?v=pkVwUVEHmfI", ytLabel:"einsum Tutorial", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Advanced Python Hindi (CampusX)",
              subtopics:[
                {text:"einsum notation — Einstein summation",yt:"https://www.youtube.com/watch?v=pkVwUVEHmfI"},
                {text:"Dot product with einsum: 'ij,j->i'",yt:"https://www.youtube.com/watch?v=pkVwUVEHmfI"},
                {text:"Matrix multiply: 'ij,jk->ik'",yt:"https://www.youtube.com/watch?v=pkVwUVEHmfI"},
                {text:"Attention with einsum: 'bhqd,bhkd->bhqk'",yt:"https://www.youtube.com/watch?v=pkVwUVEHmfI"},
              ],
              github:[
                {name:"numpy/numpy",url:"https://github.com/numpy/numpy",desc:"np.einsum",stars:"28k+"},
              ],
              resource:{title:"einsum tutorial",url:"https://rockt.github.io/2018/04/30/einsum"}},
              { id:"2-3-24", text:"Implement: sigmoid, tanh, ReLU, GELU from scratch", tag:"Code", yt:"https://www.youtube.com/watch?v=aircAruvnKk", ytLabel:"Activation Functions", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"Sigmoid: σ(x) = 1/(1+e^-x)",yt:"https://www.youtube.com/watch?v=aircAruvnKk"},
                {text:"Tanh: similar to sigmoid, range -1 to 1",yt:"https://www.youtube.com/watch?v=aircAruvnKk"},
                {text:"ReLU: max(0,x) — dying ReLU problem",yt:"https://www.youtube.com/watch?v=aircAruvnKk"},
                {text:"GELU — used in transformers",yt:"https://www.youtube.com/watch?v=o_kkLJzIc0A"},
                {text:"Plot all activations with matplotlib",yt:"https://www.youtube.com/watch?v=aircAruvnKk"},
              ],
              github:[
                {name:"pytorch/pytorch",url:"https://github.com/pytorch/pytorch",desc:"torch.nn.functional activations",stars:"85k+"},
              ],
              resource:{title:"Activation Functions Explained",url:"https://ml-cheatsheet.readthedocs.io/en/latest/activation_functions.html"}},
              { id:"2-3-25", text:"Plot token probability distributions with temperature variations", tag:"Code", yt:"https://www.youtube.com/watch?v=AhyznRSDjw8", ytLabel:"LLM Sampling", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"Softmax with different temperatures",yt:"https://www.youtube.com/watch?v=0VH1Lim8gL8"},
                {text:"Temperature=0 (greedy) vs T=1 vs T=2",yt:"https://www.youtube.com/watch?v=0VH1Lim8gL8"},
                {text:"Plot probability distributions with matplotlib",yt:"https://www.youtube.com/watch?v=UO98lJQ3QGI"},
                {text:"Why temperature matters for LLM sampling",yt:"https://www.youtube.com/watch?v=0VH1Lim8gL8"},
              ],
              github:[
                {name:"karpathy/nanoGPT",url:"https://github.com/karpathy/nanoGPT",desc:"Sampling in GPT",stars:"38k+"},
              ],
              resource:{title:"LLM Sampling Strategies",url:"https://huggingface.co/docs/transformers/generation_strategies"}},
            ]
          },
          {
            day: "SAT", label: "Math Project",
            resource: "Karpathy – micrograd",
            resourceUrl: "https://github.com/karpathy/micrograd",
            chatgpt: "Help me build a mini autograd engine like micrograd. I want to understand how PyTorch computes gradients. Walk me through implementing Value class with add, mul, and backward().",
            topics: [
              { id:"2-3-26", text:"🏗 BUILD: Gradient descent visualizer with matplotlib animation", tag:"Project", yt:"https://www.youtube.com/watch?v=IHZwWFHWa-w", ytLabel:"Gradient Descent Viz", hindiYt:"https://www.youtube.com/watch?v=aqvDTCpNRek", hindiYtLabel:"Python Project Hindi (CodeWithHarry)",
              subtopics:[
                {text:"matplotlib FuncAnimation — animate plots",yt:"https://www.youtube.com/watch?v=UO98lJQ3QGI"},
                {text:"Plot loss surface as contour plot",yt:"https://www.youtube.com/watch?v=IHZwWFHWa-w"},
                {text:"Animate gradient descent steps",yt:"https://www.youtube.com/watch?v=IHZwWFHWa-w"},
                {text:"Show learning rate effect on convergence",yt:"https://www.youtube.com/watch?v=IHZwWFHWa-w"},
              ],
              github:[
                {name:"karpathy/micrograd",url:"https://github.com/karpathy/micrograd",desc:"Gradient visualization",stars:"10k+"},
              ],
              resource:{title:"matplotlib Animation Docs",url:"https://matplotlib.org/stable/api/animation_api.html"}},
              { id:"2-3-27", text:"🏗 BUILD: Mini autograd engine (like Karpathy's micrograd)", tag:"Project", yt:"https://www.youtube.com/watch?v=VMj-3S1tku0", ytLabel:"micrograd Tutorial", hindiYt:"https://www.youtube.com/watch?v=aqvDTCpNRek", hindiYtLabel:"Python Project Hindi (CodeWithHarry)",
              subtopics:[
                {text:"Build Value class with .data and .grad",yt:"https://www.youtube.com/watch?v=VMj-3S1tku0"},
                {text:"Implement + * operations with backward",yt:"https://www.youtube.com/watch?v=VMj-3S1tku0"},
                {text:"Topological sort for backward pass",yt:"https://www.youtube.com/watch?v=VMj-3S1tku0"},
                {text:"Train a small neural network with micrograd",yt:"https://www.youtube.com/watch?v=VMj-3S1tku0"},
              ],
              github:[
                {name:"karpathy/micrograd",url:"https://github.com/karpathy/micrograd",desc:"The OG micrograd",stars:"10k+"},
              ],
              resource:{title:"karpathy — Building micrograd",url:"https://www.youtube.com/watch?v=VMj-3S1tku0"}},
              { id:"2-3-28", text:"Visualize attention heatmaps for a 5-token sequence", tag:"Code", yt:"https://www.youtube.com/watch?v=eMlx5fFNoYc", ytLabel:"Attention Visualization", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"Extract attention weights from transformer",yt:"https://www.youtube.com/watch?v=eMlx5fFNoYc"},
                {text:"seaborn heatmap for attention visualization",yt:"https://www.youtube.com/watch?v=6GUZXDef2U0"},
                {text:"Interpret what tokens attend to each other",yt:"https://www.youtube.com/watch?v=eMlx5fFNoYc"},
                {text:"BertViz — attention visualization tool",yt:"https://www.youtube.com/watch?v=eMlx5fFNoYc"},
              ],
              github:[
                {name:"jessevig/bertviz",url:"https://github.com/jessevig/bertviz",desc:"Attention visualization",stars:"5k+"},
              ],
              resource:{title:"BertViz Attention Tool",url:"https://github.com/jessevig/bertviz"}},
            ]
          },
          {
            day: "SUN", label: "Review & Gaps",
            resource: "Khan Academy – Linear Algebra",
            resourceUrl: "https://www.khanacademy.org/math/linear-algebra",
            chatgpt: "Quiz me on linear algebra and calculus concepts used in deep learning. Ask 10 questions. After each answer, tell me if I'm right, explain the full answer, then ask the next question.",
            topics: [
              { id:"2-3-29", text:"Review: matrix ops, gradients, attention math — fill gaps", tag:"Review", yt:"https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab", ytLabel:"3B1B Full Playlist", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"Linear algebra review — vectors, matrices, SVD",yt:"https://www.youtube.com/watch?v=fNk_zzaMoSs"},
                {text:"Calculus review — chain rule, gradients",yt:"https://www.youtube.com/watch?v=WUvTyaaNkzM"},
                {text:"Probability review — Bayes, distributions",yt:"https://www.youtube.com/watch?v=uzkc-qNVoOk"},
                {text:"Attention math from scratch",yt:"https://www.youtube.com/watch?v=eMlx5fFNoYc"},
              ],
              github:[
                {name:"ageron/handson-ml3",url:"https://github.com/ageron/handson-ml3",desc:"Hands-On ML notebooks",stars:"28k+"},
              ],
              resource:{title:"Mathematics for Machine Learning",url:"https://mml-book.github.io/"}},
              { id:"2-3-30", text:"Complete Math-for-AI Jupyter notebook with all formulas", tag:"Review", yt:"https://www.youtube.com/watch?v=kCc8FmEb1nY", ytLabel:"GPT From Scratch", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"Jupyter notebook with all formulas",yt:"https://www.youtube.com/watch?v=HW29067qVWk"},
                {text:"Visualize each math concept",yt:"https://www.youtube.com/watch?v=UO98lJQ3QGI"},
                {text:"Create cheatsheet: common ML formulas",yt:"https://www.youtube.com/watch?v=fNk_zzaMoSs"},
                {text:"Push to GitHub as portfolio piece",yt:"https://www.youtube.com/watch?v=RGOj5yH7evk"},
              ],
              github:[
                {name:"ageron/handson-ml3",url:"https://github.com/ageron/handson-ml3",desc:"Reference implementations",stars:"28k+"},
              ],
              resource:{title:"Mathematics for Machine Learning Book",url:"https://mml-book.github.io/"}},
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
              { id:"3-6-1", text:"ndarray: creation, zeros/ones/arange/linspace/random", tag:"NumPy", yt:"https://www.youtube.com/watch?v=QUT1VHiLmmI", ytLabel:"NumPy Tutorial", hindiYt:"https://www.youtube.com/watch?v=Rbh1rieb3zc", hindiYtLabel:"NumPy Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"ndarray creation: zeros, ones, arange, linspace",yt:"https://www.youtube.com/watch?v=QUT1VHiLmmI"},
                {text:"random arrays: rand, randn, randint",yt:"https://www.youtube.com/watch?v=QUT1VHiLmmI"},
                {text:"Array attributes: shape, dtype, ndim, size",yt:"https://www.youtube.com/watch?v=QUT1VHiLmmI"},
                {text:"Structured arrays and record arrays",yt:"https://www.youtube.com/watch?v=QUT1VHiLmmI"},
              ],
              github:[
                {name:"numpy/numpy",url:"https://github.com/numpy/numpy",desc:"NumPy array computing",stars:"28k+"},
              ],
              resource:{title:"NumPy Quickstart Tutorial",url:"https://numpy.org/doc/stable/user/quickstart.html"}},
              { id:"3-6-2", text:"Indexing, slicing, fancy indexing, boolean masking", tag:"NumPy", yt:"https://www.youtube.com/watch?v=GB9ByFAIAH4", ytLabel:"NumPy Indexing", hindiYt:"https://www.youtube.com/watch?v=Rbh1rieb3zc", hindiYtLabel:"NumPy Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"Basic indexing: a[0], a[1:5], a[::2]",yt:"https://www.youtube.com/watch?v=QUT1VHiLmmI"},
                {text:"Boolean masking: a[a>5]",yt:"https://www.youtube.com/watch?v=V0D2mhVt7NE"},
                {text:"Fancy indexing: a[[1,3,5]]",yt:"https://www.youtube.com/watch?v=V0D2mhVt7NE"},
                {text:"2D indexing: a[row, col]",yt:"https://www.youtube.com/watch?v=QUT1VHiLmmI"},
                {text:"np.where — conditional selection",yt:"https://www.youtube.com/watch?v=QUT1VHiLmmI"},
              ],
              github:[
                {name:"numpy/numpy",url:"https://github.com/numpy/numpy",desc:"NumPy indexing",stars:"28k+"},
              ],
              resource:{title:"NumPy Indexing Docs",url:"https://numpy.org/doc/stable/user/basics.indexing.html"}},
              { id:"3-6-3", text:"Reshaping: reshape, flatten, squeeze, expand_dims, ravel", tag:"NumPy", yt:"https://www.youtube.com/watch?v=lFhE0ZLgCgU", ytLabel:"NumPy Reshape", hindiYt:"https://www.youtube.com/watch?v=Rbh1rieb3zc", hindiYtLabel:"NumPy Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"reshape — change shape without copy",yt:"https://www.youtube.com/watch?v=QUT1VHiLmmI"},
                {text:"flatten and ravel — 1D array",yt:"https://www.youtube.com/watch?v=QUT1VHiLmmI"},
                {text:"squeeze — remove size-1 dimensions",yt:"https://www.youtube.com/watch?v=QUT1VHiLmmI"},
                {text:"expand_dims — add dimension",yt:"https://www.youtube.com/watch?v=QUT1VHiLmmI"},
                {text:"transpose and swapaxes",yt:"https://www.youtube.com/watch?v=V0D2mhVt7NE"},
              ],
              github:[
                {name:"numpy/numpy",url:"https://github.com/numpy/numpy",desc:"Array manipulation",stars:"28k+"},
              ],
              resource:{title:"NumPy Array Manipulation Docs",url:"https://numpy.org/doc/stable/reference/routines.array-manipulation.html"}},
              { id:"3-6-4", text:"Broadcasting rules — vectorized ops instead of loops", tag:"NumPy", yt:"https://www.youtube.com/watch?v=oG1t3qlzq14", ytLabel:"NumPy Broadcasting", hindiYt:"https://www.youtube.com/watch?v=Rbh1rieb3zc", hindiYtLabel:"NumPy Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"Broadcasting rules — shape alignment",yt:"https://www.youtube.com/watch?v=oG1t3qlzq14"},
                {text:"Scalar broadcast: a + 5",yt:"https://www.youtube.com/watch?v=oG1t3qlzq14"},
                {text:"Vector broadcast: (3,) + (3,1)",yt:"https://www.youtube.com/watch?v=oG1t3qlzq14"},
                {text:"Vectorization replaces Python loops",yt:"https://www.youtube.com/watch?v=V0D2mhVt7NE"},
                {text:"Speed comparison: loop vs vectorized",yt:"https://www.youtube.com/watch?v=V0D2mhVt7NE"},
              ],
              github:[
                {name:"numpy/numpy",url:"https://github.com/numpy/numpy",desc:"NumPy broadcasting",stars:"28k+"},
              ],
              resource:{title:"NumPy Broadcasting Docs",url:"https://numpy.org/doc/stable/user/basics.broadcasting.html"}},
              { id:"3-6-5", text:"np.linalg: norm, dot, matmul, svd, eig, solve", tag:"NumPy", yt:"https://www.youtube.com/watch?v=8MT7Z6qFvzQ", ytLabel:"NumPy Linear Algebra", hindiYt:"https://www.youtube.com/watch?v=Rbh1rieb3zc", hindiYtLabel:"NumPy Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"np.linalg.norm — vector and matrix norms",yt:"https://www.youtube.com/watch?v=QJd3ZlyWODc"},
                {text:"np.linalg.dot and np.matmul",yt:"https://www.youtube.com/watch?v=QJd3ZlyWODc"},
                {text:"np.linalg.svd — singular value decomposition",yt:"https://www.youtube.com/watch?v=DG7YTlGnCEo"},
                {text:"np.linalg.solve — solve linear systems",yt:"https://www.youtube.com/watch?v=QJd3ZlyWODc"},
                {text:"np.linalg.eig — eigenvalues",yt:"https://www.youtube.com/watch?v=QJd3ZlyWODc"},
              ],
              github:[
                {name:"numpy/numpy",url:"https://github.com/numpy/numpy",desc:"np.linalg module",stars:"28k+"},
              ],
              resource:{title:"NumPy Linear Algebra Docs",url:"https://numpy.org/doc/stable/reference/routines.linalg.html"}},
            ]
          },
          {
            day: "TUE", label: "Pandas Foundations",
            resource: "Corey Schafer – Pandas Series",
            resourceUrl: "https://www.youtube.com/playlist?list=PL-osiE80TeTsWmV9i9c58mdDCSskIFdDS",
            chatgpt: "Give me the 20 most used Pandas operations for data engineers. Show code for each with a realistic dataset context. Which ones are used most often in ML preprocessing pipelines?",
            topics: [
              { id:"3-6-6", text:"Series and DataFrame: creation, dtypes, attributes, info()", tag:"Pandas", yt:"https://www.youtube.com/watch?v=ZyhVh-qRZPA", ytLabel:"Pandas Tutorial", hindiYt:"https://www.youtube.com/watch?v=F6kmIpWj0wg", hindiYtLabel:"Pandas Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"pandas Series — 1D labeled array",yt:"https://www.youtube.com/watch?v=vmEHCJofslg"},
                {text:"DataFrame — 2D table with labels",yt:"https://www.youtube.com/watch?v=vmEHCJofslg"},
                {text:"dtypes — object, int64, float64, category",yt:"https://www.youtube.com/watch?v=vmEHCJofslg"},
                {text:".info() and .describe() — quick summary",yt:"https://www.youtube.com/watch?v=vmEHCJofslg"},
              ],
              github:[
                {name:"pandas-dev/pandas",url:"https://github.com/pandas-dev/pandas",desc:"pandas data analysis",stars:"43k+"},
              ],
              resource:{title:"10 Minutes to pandas",url:"https://pandas.pydata.org/docs/user_guide/10min.html"}},
              { id:"3-6-7", text:"read_csv/json/excel/sql + write methods, chunking large files", tag:"Pandas", yt:"https://www.youtube.com/watch?v=yz_X3BZ0SxE", ytLabel:"Pandas Read Data", hindiYt:"https://www.youtube.com/watch?v=F6kmIpWj0wg", hindiYtLabel:"Pandas Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"pd.read_csv — read CSV files",yt:"https://www.youtube.com/watch?v=vmEHCJofslg"},
                {text:"read_excel, read_json, read_sql",yt:"https://www.youtube.com/watch?v=vmEHCJofslg"},
                {text:"chunksize — read large files in chunks",yt:"https://www.youtube.com/watch?v=vmEHCJofslg"},
                {text:"df.to_csv, to_parquet — save data",yt:"https://www.youtube.com/watch?v=vmEHCJofslg"},
                {text:"parse_dates — auto-parse timestamps",yt:"https://www.youtube.com/watch?v=UFuo7EHI8zc"},
              ],
              github:[
                {name:"pandas-dev/pandas",url:"https://github.com/pandas-dev/pandas",desc:"pandas IO tools",stars:"43k+"},
              ],
              resource:{title:"pandas IO Tools Docs",url:"https://pandas.pydata.org/docs/user_guide/io.html"}},
              { id:"3-6-8", text:".loc, .iloc, boolean filtering, .query(), .where()", tag:"Pandas", yt:"https://www.youtube.com/watch?v=xvpNA7bC8cs", ytLabel:"Pandas Indexing", hindiYt:"https://www.youtube.com/watch?v=F6kmIpWj0wg", hindiYtLabel:"Pandas Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"df.loc — label-based indexing",yt:"https://www.youtube.com/watch?v=HQ6XO9eT-fc"},
                {text:"df.iloc — position-based indexing",yt:"https://www.youtube.com/watch?v=HQ6XO9eT-fc"},
                {text:"Boolean filtering: df[df.age > 25]",yt:"https://www.youtube.com/watch?v=HQ6XO9eT-fc"},
                {text:"df.query() — SQL-like syntax",yt:"https://www.youtube.com/watch?v=HQ6XO9eT-fc"},
                {text:"df.where — conditional replacement",yt:"https://www.youtube.com/watch?v=HQ6XO9eT-fc"},
              ],
              github:[
                {name:"pandas-dev/pandas",url:"https://github.com/pandas-dev/pandas",desc:"pandas indexing",stars:"43k+"},
              ],
              resource:{title:"pandas Indexing Docs",url:"https://pandas.pydata.org/docs/user_guide/indexing.html"}},
              { id:"3-6-9", text:"Missing values: isnull, dropna, fillna, interpolate strategies", tag:"Pandas", yt:"https://www.youtube.com/watch?v=fCMrO_VzeL8", ytLabel:"Missing Data", hindiYt:"https://www.youtube.com/watch?v=F6kmIpWj0wg", hindiYtLabel:"Pandas Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"isnull and isna — find missing values",yt:"https://www.youtube.com/watch?v=KdmPHEnPJPs"},
                {text:"dropna — remove rows/columns with NaN",yt:"https://www.youtube.com/watch?v=KdmPHEnPJPs"},
                {text:"fillna — fill with mean/median/value",yt:"https://www.youtube.com/watch?v=KdmPHEnPJPs"},
                {text:"interpolate — time series gap filling",yt:"https://www.youtube.com/watch?v=KdmPHEnPJPs"},
                {text:"Strategies: MCAR, MAR, MNAR",yt:"https://www.youtube.com/watch?v=KdmPHEnPJPs"},
              ],
              github:[
                {name:"pandas-dev/pandas",url:"https://github.com/pandas-dev/pandas",desc:"pandas missing data",stars:"43k+"},
                {name:"ResidentMario/missingno",url:"https://github.com/ResidentMario/missingno",desc:"Visualize missing data",stars:"4k+"},
              ],
              resource:{title:"pandas Missing Data Docs",url:"https://pandas.pydata.org/docs/user_guide/missing_data.html"}},
              { id:"3-6-10", text:"groupby + agg + transform, pivot_table, crosstab", tag:"Pandas", yt:"https://www.youtube.com/watch?v=txMdrV1Ut64", ytLabel:"Pandas Groupby", hindiYt:"https://www.youtube.com/watch?v=F6kmIpWj0wg", hindiYtLabel:"Pandas Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"groupby basics — split-apply-combine",yt:"https://www.youtube.com/watch?v=Wb2vp0AuMYs"},
                {text:"agg() with multiple functions",yt:"https://www.youtube.com/watch?v=Wb2vp0AuMYs"},
                {text:"transform() — keep original shape",yt:"https://www.youtube.com/watch?v=Wb2vp0AuMYs"},
                {text:"pivot_table — Excel-style pivots",yt:"https://www.youtube.com/watch?v=ZaRpSYVMhbA"},
                {text:"crosstab — frequency tables",yt:"https://www.youtube.com/watch?v=Wb2vp0AuMYs"},
              ],
              github:[
                {name:"pandas-dev/pandas",url:"https://github.com/pandas-dev/pandas",desc:"pandas groupby",stars:"43k+"},
              ],
              resource:{title:"pandas GroupBy Docs",url:"https://pandas.pydata.org/docs/user_guide/groupby.html"}},
            ]
          },
          {
            day: "WED", label: "Pandas Advanced",
            resource: "Pandas Official Docs",
            resourceUrl: "https://pandas.pydata.org/docs/",
            chatgpt: "Show me how to handle a real-world messy dataset: duplicate rows, wrong dtypes, inconsistent strings, outliers, and multi-source CSV files that need merging. Full pandas pipeline.",
            topics: [
              { id:"3-6-11", text:"merge, join, concat — inner/outer/left/right with examples", tag:"Pandas", yt:"https://www.youtube.com/watch?v=h4hOPGo4UVU", ytLabel:"Pandas Merge", hindiYt:"https://www.youtube.com/watch?v=F6kmIpWj0wg", hindiYtLabel:"Pandas Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"pd.merge — SQL-style joins",yt:"https://www.youtube.com/watch?v=h4hOPGo4UVU"},
                {text:"inner, outer, left, right join types",yt:"https://www.youtube.com/watch?v=h4hOPGo4UVU"},
                {text:"pd.concat — stack DataFrames",yt:"https://www.youtube.com/watch?v=WGOEFok1szA"},
                {text:"merge_asof — approximate matching",yt:"https://www.youtube.com/watch?v=h4hOPGo4UVU"},
                {text:"Avoid merge gotchas — duplicate columns",yt:"https://www.youtube.com/watch?v=h4hOPGo4UVU"},
              ],
              github:[
                {name:"pandas-dev/pandas",url:"https://github.com/pandas-dev/pandas",desc:"pandas merge/join",stars:"43k+"},
              ],
              resource:{title:"pandas Merge Docs",url:"https://pandas.pydata.org/docs/user_guide/merging.html"}},
              { id:"3-6-12", text:"apply, map, applymap — custom transformations at scale", tag:"Pandas", yt:"https://www.youtube.com/watch?v=P_q0tkYqvSk", ytLabel:"Pandas Apply", hindiYt:"https://www.youtube.com/watch?v=F6kmIpWj0wg", hindiYtLabel:"Pandas Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"df.apply — apply function to rows/cols",yt:"https://www.youtube.com/watch?v=vmEHCJofslg"},
                {text:"Series.map — element-wise transform",yt:"https://www.youtube.com/watch?v=vmEHCJofslg"},
                {text:"Lambda functions in apply",yt:"https://www.youtube.com/watch?v=vmEHCJofslg"},
                {text:"applymap — deprecated, use map instead",yt:"https://www.youtube.com/watch?v=vmEHCJofslg"},
                {text:"Performance: apply vs vectorized ops",yt:"https://www.youtube.com/watch?v=V0D2mhVt7NE"},
              ],
              github:[
                {name:"pandas-dev/pandas",url:"https://github.com/pandas-dev/pandas",desc:"pandas apply/map",stars:"43k+"},
              ],
              resource:{title:"pandas Apply Docs",url:"https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.apply.html"}},
              { id:"3-6-13", text:"String accessor .str — cleaning messy text columns", tag:"Pandas", yt:"https://www.youtube.com/watch?v=yz_X3BZ0SxE", ytLabel:"Pandas String Ops", hindiYt:"https://www.youtube.com/watch?v=F6kmIpWj0wg", hindiYtLabel:"Pandas Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"df.str.lower, upper, strip",yt:"https://www.youtube.com/watch?v=KdmPHEnPJPs"},
                {text:"str.split and str.extract — parse strings",yt:"https://www.youtube.com/watch?v=KdmPHEnPJPs"},
                {text:"str.contains — regex in pandas",yt:"https://www.youtube.com/watch?v=KdmPHEnPJPs"},
                {text:"str.replace — fix messy data",yt:"https://www.youtube.com/watch?v=KdmPHEnPJPs"},
                {text:"Vectorized string operations",yt:"https://www.youtube.com/watch?v=KdmPHEnPJPs"},
              ],
              github:[
                {name:"pandas-dev/pandas",url:"https://github.com/pandas-dev/pandas",desc:"pandas string methods",stars:"43k+"},
              ],
              resource:{title:"pandas String Methods Docs",url:"https://pandas.pydata.org/docs/user_guide/text.html"}},
              { id:"3-6-14", text:"Time series: DatetimeIndex, resample, rolling, shift, ewm", tag:"Pandas", yt:"https://www.youtube.com/watch?v=r0s4slGHWzU", ytLabel:"Pandas Time Series", hindiYt:"https://www.youtube.com/watch?v=F6kmIpWj0wg", hindiYtLabel:"Pandas Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"DatetimeIndex — time-indexed data",yt:"https://www.youtube.com/watch?v=UFuo7EHI8zc"},
                {text:"resample — change time frequency",yt:"https://www.youtube.com/watch?v=UFuo7EHI8zc"},
                {text:"rolling — moving window calculations",yt:"https://www.youtube.com/watch?v=UFuo7EHI8zc"},
                {text:"shift — lag features for forecasting",yt:"https://www.youtube.com/watch?v=UFuo7EHI8zc"},
                {text:"ewm — exponentially weighted mean",yt:"https://www.youtube.com/watch?v=UFuo7EHI8zc"},
              ],
              github:[
                {name:"pandas-dev/pandas",url:"https://github.com/pandas-dev/pandas",desc:"pandas time series",stars:"43k+"},
              ],
              resource:{title:"pandas Time Series Docs",url:"https://pandas.pydata.org/docs/user_guide/timeseries.html"}},
              { id:"3-6-15", text:"Memory optimization: category dtype, chunked reading", tag:"Perf", yt:"https://www.youtube.com/watch?v=u4_c2LDi4b8", ytLabel:"Pandas Performance", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"category dtype — reduce memory 10x",yt:"https://www.youtube.com/watch?v=vmEHCJofslg"},
                {text:"Downcast int and float dtypes",yt:"https://www.youtube.com/watch?v=vmEHCJofslg"},
                {text:"chunked reading with chunksize",yt:"https://www.youtube.com/watch?v=vmEHCJofslg"},
                {text:"Parquet vs CSV — columnar storage",yt:"https://www.youtube.com/watch?v=H_J72y7l2QY"},
                {text:"polars — 10x faster than pandas",yt:"https://www.youtube.com/watch?v=IjLHSMBjivM"},
              ],
              github:[
                {name:"pola-rs/polars",url:"https://github.com/pola-rs/polars",desc:"Fast DataFrame in Rust",stars:"31k+"},
              ],
              resource:{title:"pandas Scale Docs",url:"https://pandas.pydata.org/docs/user_guide/scale.html"}},
            ]
          },
          {
            day: "THU", label: "Visualization",
            resource: "Plotly Express Docs",
            resourceUrl: "https://plotly.com/python/plotly-express/",
            chatgpt: "I'm analyzing an e-commerce dataset. What are the 10 most impactful visualizations for a business stakeholder? Give me Plotly code for each and explain the business insight each reveals.",
            topics: [
              { id:"3-6-16", text:"Matplotlib: subplots, axes, figure, styling, annotations", tag:"Viz", yt:"https://www.youtube.com/playlist?list=PLQVvvaa0QuDfefDDs-OHt_-XpCKleTAS_", ytLabel:"Matplotlib Full Course", hindiYt:"https://www.youtube.com/watch?v=F6kmIpWj0wg", hindiYtLabel:"Data Viz Hindi (CampusX)",
              subtopics:[
                {text:"Figure and axes — matplotlib architecture",yt:"https://www.youtube.com/watch?v=UO98lJQ3QGI"},
                {text:"Line, scatter, bar, histogram plots",yt:"https://www.youtube.com/watch?v=UO98lJQ3QGI"},
                {text:"Subplots — multiple panels",yt:"https://www.youtube.com/watch?v=UO98lJQ3QGI"},
                {text:"Styling: colors, labels, titles, legends",yt:"https://www.youtube.com/watch?v=UO98lJQ3QGI"},
                {text:"Annotations and custom tick labels",yt:"https://www.youtube.com/watch?v=UO98lJQ3QGI"},
              ],
              github:[
                {name:"matplotlib/matplotlib",url:"https://github.com/matplotlib/matplotlib",desc:"matplotlib plotting",stars:"20k+"},
              ],
              resource:{title:"matplotlib Official Tutorials",url:"https://matplotlib.org/stable/tutorials/index.html"}},
              { id:"3-6-17", text:"Seaborn: heatmap, pairplot, boxplot, violinplot, jointplot", tag:"Viz", yt:"https://www.youtube.com/watch?v=6GUZXDef2U0", ytLabel:"Seaborn Tutorial", hindiYt:"https://www.youtube.com/watch?v=F6kmIpWj0wg", hindiYtLabel:"Data Viz Hindi (CampusX)",
              subtopics:[
                {text:"seaborn heatmap — correlation matrix",yt:"https://www.youtube.com/watch?v=6GUZXDef2U0"},
                {text:"pairplot — all feature combinations",yt:"https://www.youtube.com/watch?v=6GUZXDef2U0"},
                {text:"boxplot — outlier visualization",yt:"https://www.youtube.com/watch?v=6GUZXDef2U0"},
                {text:"violinplot — distribution shape",yt:"https://www.youtube.com/watch?v=6GUZXDef2U0"},
                {text:"jointplot — bivariate analysis",yt:"https://www.youtube.com/watch?v=6GUZXDef2U0"},
              ],
              github:[
                {name:"mwaskom/seaborn",url:"https://github.com/mwaskom/seaborn",desc:"Statistical visualization",stars:"13k+"},
              ],
              resource:{title:"seaborn Official Docs",url:"https://seaborn.pydata.org/"}},
              { id:"3-6-18", text:"Plotly Express: interactive scatter, line, bar, histogram", tag:"Viz", yt:"https://www.youtube.com/watch?v=GGL6U0k8WYA", ytLabel:"Plotly Tutorial", hindiYt:"https://www.youtube.com/watch?v=F6kmIpWj0wg", hindiYtLabel:"Data Viz Hindi (CampusX)",
              subtopics:[
                {text:"plotly.express — one-line interactive charts",yt:"https://www.youtube.com/watch?v=GGL6U0k8WYA"},
                {text:"Scatter, line, bar, histogram in plotly",yt:"https://www.youtube.com/watch?v=GGL6U0k8WYA"},
                {text:"Hover tooltips and click interactions",yt:"https://www.youtube.com/watch?v=GGL6U0k8WYA"},
                {text:"3D plots and animations",yt:"https://www.youtube.com/watch?v=GGL6U0k8WYA"},
                {text:"px.choropleth — geographic maps",yt:"https://www.youtube.com/watch?v=GGL6U0k8WYA"},
              ],
              github:[
                {name:"plotly/plotly.py",url:"https://github.com/plotly/plotly.py",desc:"Interactive charts",stars:"16k+"},
              ],
              resource:{title:"Plotly Express Docs",url:"https://plotly.com/python/plotly-express/"}},
              { id:"3-6-19", text:"Plotly Dash: build interactive data dashboards", tag:"Viz", yt:"https://www.youtube.com/watch?v=hSPmj7mK6ng", ytLabel:"Plotly Dash", hindiYt:"https://www.youtube.com/watch?v=F6kmIpWj0wg", hindiYtLabel:"Data Viz Hindi (CampusX)",
              subtopics:[
                {text:"Dash app structure: layout + callbacks",yt:"https://www.youtube.com/watch?v=hSPmj7mK6ng"},
                {text:"dcc.Graph, dcc.Dropdown, dcc.Slider",yt:"https://www.youtube.com/watch?v=hSPmj7mK6ng"},
                {text:"Callback — update chart on input change",yt:"https://www.youtube.com/watch?v=hSPmj7mK6ng"},
                {text:"Deploy Dash to Heroku/Render",yt:"https://www.youtube.com/watch?v=hSPmj7mK6ng"},
              ],
              github:[
                {name:"plotly/dash",url:"https://github.com/plotly/dash",desc:"Python data app framework",stars:"22k+"},
              ],
              resource:{title:"Dash Official Docs",url:"https://dash.plotly.com/"}},
              { id:"3-6-20", text:"Correlation heatmaps, feature distribution plots for ML EDA", tag:"Viz", yt:"https://www.youtube.com/watch?v=xi0vhXFPegw", ytLabel:"EDA with Pandas", hindiYt:"https://www.youtube.com/watch?v=F6kmIpWj0wg", hindiYtLabel:"Data Viz Hindi (CampusX)",
              subtopics:[
                {text:"Correlation heatmap for all features",yt:"https://www.youtube.com/watch?v=xi0vhXFPegw"},
                {text:"Distribution plots per feature",yt:"https://www.youtube.com/watch?v=xi0vhXFPegw"},
                {text:"Target variable analysis — class balance",yt:"https://www.youtube.com/watch?v=xi0vhXFPegw"},
                {text:"Feature vs target scatter plots",yt:"https://www.youtube.com/watch?v=xi0vhXFPegw"},
                {text:"pandas-profiling automated EDA",yt:"https://www.youtube.com/watch?v=E9s5BIsFOjE"},
              ],
              github:[
                {name:"ydataai/ydata-profiling",url:"https://github.com/ydataai/ydata-profiling",desc:"Automated EDA reports",stars:"12k+"},
              ],
              resource:{title:"Kaggle Learn — Data Visualization",url:"https://www.kaggle.com/learn/data-visualization"}},
            ]
          },
          {
            day: "FRI", label: "SQL for Data",
            resource: "freeCodeCamp – SQL Full Course",
            resourceUrl: "https://www.youtube.com/watch?v=HXV3zeQKqFY",
            chatgpt: "Give me 15 SQL queries used by data scientists: window functions, CTEs, subqueries, aggregations. For each query, give the business question it answers and explain the logic.",
            topics: [
              { id:"3-6-21", text:"SELECT, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT", tag:"SQL", yt:"https://www.youtube.com/watch?v=HXV3zeQKqFY", ytLabel:"SQL Full Course", hindiYt:"https://www.youtube.com/watch?v=aqvDTCpNRek", hindiYtLabel:"SQL Python Hindi (CodeWithHarry)",
              subtopics:[
                {text:"SELECT, FROM, WHERE — basic queries",yt:"https://www.youtube.com/watch?v=7S_tz1z_5bA"},
                {text:"GROUP BY and HAVING — aggregation",yt:"https://www.youtube.com/watch?v=7S_tz1z_5bA"},
                {text:"ORDER BY and LIMIT",yt:"https://www.youtube.com/watch?v=7S_tz1z_5bA"},
                {text:"COUNT, SUM, AVG, MIN, MAX",yt:"https://www.youtube.com/watch?v=7S_tz1z_5bA"},
                {text:"DISTINCT and subqueries",yt:"https://www.youtube.com/watch?v=7S_tz1z_5bA"},
              ],
              github:[
                {name:"sqlalchemy/sqlalchemy",url:"https://github.com/sqlalchemy/sqlalchemy",desc:"Python SQL toolkit",stars:"9k+"},
              ],
              resource:{title:"SQLBolt Interactive SQL Tutorial",url:"https://sqlbolt.com/"}},
              { id:"3-6-22", text:"JOINs: INNER, LEFT, RIGHT, FULL OUTER, CROSS, SELF", tag:"SQL", yt:"https://www.youtube.com/watch?v=9yeOJ0ZMUYw", ytLabel:"SQL Joins", hindiYt:"https://www.youtube.com/watch?v=aqvDTCpNRek", hindiYtLabel:"SQL Python Hindi (CodeWithHarry)",
              subtopics:[
                {text:"INNER JOIN — matching rows only",yt:"https://www.youtube.com/watch?v=9yeOJ0ZMUYw"},
                {text:"LEFT JOIN — all left rows",yt:"https://www.youtube.com/watch?v=9yeOJ0ZMUYw"},
                {text:"FULL OUTER JOIN — all rows",yt:"https://www.youtube.com/watch?v=9yeOJ0ZMUYw"},
                {text:"SELF JOIN — table joins itself",yt:"https://www.youtube.com/watch?v=9yeOJ0ZMUYw"},
                {text:"SQL join visualization",yt:"https://www.youtube.com/watch?v=9yeOJ0ZMUYw"},
              ],
              github:[
                {name:"sqlalchemy/sqlalchemy",url:"https://github.com/sqlalchemy/sqlalchemy",desc:"SQL in Python",stars:"9k+"},
              ],
              resource:{title:"SQL Joins Visual Guide",url:"https://joins.spathon.com/"}},
              { id:"3-6-23", text:"Window functions: ROW_NUMBER, RANK, LAG, LEAD, SUM OVER", tag:"SQL", yt:"https://www.youtube.com/watch?v=Ww71knvhQ-s", ytLabel:"SQL Window Functions", hindiYt:"https://www.youtube.com/watch?v=aqvDTCpNRek", hindiYtLabel:"SQL Python Hindi (CodeWithHarry)",
              subtopics:[
                {text:"ROW_NUMBER — sequential numbering",yt:"https://www.youtube.com/watch?v=H6OTMoXjNF8"},
                {text:"RANK and DENSE_RANK — handle ties",yt:"https://www.youtube.com/watch?v=H6OTMoXjNF8"},
                {text:"LAG and LEAD — access adjacent rows",yt:"https://www.youtube.com/watch?v=H6OTMoXjNF8"},
                {text:"SUM OVER PARTITION — running totals",yt:"https://www.youtube.com/watch?v=H6OTMoXjNF8"},
              ],
              github:[
                {name:"sqlalchemy/sqlalchemy",url:"https://github.com/sqlalchemy/sqlalchemy",desc:"SQLAlchemy ORM",stars:"9k+"},
              ],
              resource:{title:"SQL Window Functions Tutorial",url:"https://mode.com/sql-tutorial/sql-window-functions/"}},
              { id:"3-6-24", text:"CTEs (WITH clause), subqueries, CASE WHEN", tag:"SQL", yt:"https://www.youtube.com/watch?v=K1WeoKxLZ5o", ytLabel:"SQL CTEs", hindiYt:"https://www.youtube.com/watch?v=aqvDTCpNRek", hindiYtLabel:"SQL Python Hindi (CodeWithHarry)",
              subtopics:[
                {text:"CTE WITH clause — named subqueries",yt:"https://www.youtube.com/watch?v=K1t2PZO8M4I"},
                {text:"Nested subqueries in WHERE and SELECT",yt:"https://www.youtube.com/watch?v=K1t2PZO8M4I"},
                {text:"CASE WHEN — conditional logic",yt:"https://www.youtube.com/watch?v=K1t2PZO8M4I"},
                {text:"Recursive CTEs — hierarchical data",yt:"https://www.youtube.com/watch?v=K1t2PZO8M4I"},
              ],
              github:[
                {name:"sqlalchemy/sqlalchemy",url:"https://github.com/sqlalchemy/sqlalchemy",desc:"Advanced SQL in Python",stars:"9k+"},
              ],
              resource:{title:"Advanced SQL Tutorial",url:"https://mode.com/sql-tutorial/sql-subqueries/"}},
              { id:"3-6-25", text:"SQLite + pandas: read_sql, to_sql — DB in Python scripts", tag:"SQL", yt:"https://www.youtube.com/watch?v=pd-0G0MigUA", ytLabel:"SQLite Python", hindiYt:"https://www.youtube.com/watch?v=aqvDTCpNRek", hindiYtLabel:"SQL Python Hindi (CodeWithHarry)",
              subtopics:[
                {text:"sqlite3 module — SQLite in Python",yt:"https://www.youtube.com/watch?v=byHcYRpMgI4"},
                {text:"pd.read_sql — query into DataFrame",yt:"https://www.youtube.com/watch?v=byHcYRpMgI4"},
                {text:"df.to_sql — write DataFrame to DB",yt:"https://www.youtube.com/watch?v=byHcYRpMgI4"},
                {text:"SQLAlchemy connection string",yt:"https://www.youtube.com/watch?v=aU0yuQAhqBQ"},
              ],
              github:[
                {name:"sqlalchemy/sqlalchemy",url:"https://github.com/sqlalchemy/sqlalchemy",desc:"SQLAlchemy + pandas",stars:"9k+"},
              ],
              resource:{title:"pandas read_sql Docs",url:"https://pandas.pydata.org/docs/reference/api/pandas.read_sql.html"}},
            ]
          },
          {
            day: "SAT", label: "Feature Engineering",
            resource: "Kaggle – Feature Engineering Course",
            resourceUrl: "https://www.kaggle.com/learn/feature-engineering",
            chatgpt: "Teach me feature engineering techniques used in winning Kaggle competitions. Show: one-hot encoding, target encoding, interaction features, polynomial features, and time-based features with pandas code.",
            topics: [
              { id:"3-6-26", text:"Encoding: one-hot, label, ordinal, target, frequency encoding", tag:"FeatEng", yt:"https://www.youtube.com/watch?v=589nCGeWG1w", ytLabel:"Feature Encoding", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"One-hot encoding — pd.get_dummies",yt:"https://www.youtube.com/watch?v=9yl6-HEY7_s"},
                {text:"Label encoding — LabelEncoder",yt:"https://www.youtube.com/watch?v=9yl6-HEY7_s"},
                {text:"Target encoding — mean of target",yt:"https://www.youtube.com/watch?v=UEPBXl6C1qk"},
                {text:"Frequency encoding — count-based",yt:"https://www.youtube.com/watch?v=UEPBXl6C1qk"},
                {text:"Ordinal encoding — ordered categories",yt:"https://www.youtube.com/watch?v=9yl6-HEY7_s"},
              ],
              github:[
                {name:"scikit-learn/scikit-learn",url:"https://github.com/scikit-learn/scikit-learn",desc:"sklearn preprocessing",stars:"60k+"},
              ],
              resource:{title:"sklearn Categorical Encoding Docs",url:"https://scikit-learn.org/stable/modules/preprocessing.html#encoding-categorical-features"}},
              { id:"3-6-27", text:"Scaling: StandardScaler, MinMaxScaler, RobustScaler", tag:"FeatEng", yt:"https://www.youtube.com/watch?v=0HOqOcln3Z4", ytLabel:"Feature Scaling", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"StandardScaler — zero mean unit variance",yt:"https://www.youtube.com/watch?v=UEPBXl6C1qk"},
                {text:"MinMaxScaler — scale to 0-1 range",yt:"https://www.youtube.com/watch?v=UEPBXl6C1qk"},
                {text:"RobustScaler — robust to outliers",yt:"https://www.youtube.com/watch?v=UEPBXl6C1qk"},
                {text:"When to scale: tree models don't need it",yt:"https://www.youtube.com/watch?v=UEPBXl6C1qk"},
                {text:"Apply scaling in sklearn Pipeline",yt:"https://www.youtube.com/watch?v=irHhDMbw3xo"},
              ],
              github:[
                {name:"scikit-learn/scikit-learn",url:"https://github.com/scikit-learn/scikit-learn",desc:"sklearn scalers",stars:"60k+"},
              ],
              resource:{title:"sklearn Scaling Docs",url:"https://scikit-learn.org/stable/modules/preprocessing.html"}},
              { id:"3-6-28", text:"Feature creation: polynomial, interaction, datetime extraction", tag:"FeatEng", yt:"https://www.youtube.com/watch?v=vb1sLKJl6a8", ytLabel:"Feature Engineering", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"Polynomial features — x, x², x³",yt:"https://www.youtube.com/watch?v=OdRd6bKDWRA"},
                {text:"Interaction features — feature1 × feature2",yt:"https://www.youtube.com/watch?v=OdRd6bKDWRA"},
                {text:"Datetime extraction — hour, day, month",yt:"https://www.youtube.com/watch?v=UFuo7EHI8zc"},
                {text:"Log and power transforms — fix skew",yt:"https://www.youtube.com/watch?v=UEPBXl6C1qk"},
                {text:"Binning — pd.cut and pd.qcut",yt:"https://www.youtube.com/watch?v=vmEHCJofslg"},
              ],
              github:[
                {name:"feature-engine/feature_engine",url:"https://github.com/feature-engine/feature_engine",desc:"Feature engineering library",stars:"2k+"},
              ],
              resource:{title:"Feature Engineering for ML",url:"https://www.kaggle.com/learn/feature-engineering"}},
              { id:"3-6-29", text:"Outlier detection and treatment: IQR, z-score, Isolation Forest", tag:"FeatEng", yt:"https://www.youtube.com/watch?v=4Yey3OcFHoU", ytLabel:"Outlier Detection", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"IQR method — Q1-1.5*IQR and Q3+1.5*IQR",yt:"https://www.youtube.com/watch?v=KdmPHEnPJPs"},
                {text:"Z-score method — values beyond 3σ",yt:"https://www.youtube.com/watch?v=KdmPHEnPJPs"},
                {text:"Isolation Forest — algorithmic detection",yt:"https://www.youtube.com/watch?v=5p8B2Ikcw-k"},
                {text:"Capping vs removing outliers",yt:"https://www.youtube.com/watch?v=KdmPHEnPJPs"},
                {text:"Visual detection with boxplots",yt:"https://www.youtube.com/watch?v=6GUZXDef2U0"},
              ],
              github:[
                {name:"yzhao062/pyod",url:"https://github.com/yzhao062/pyod",desc:"Python outlier detection",stars:"8k+"},
              ],
              resource:{title:"sklearn Outlier Detection Docs",url:"https://scikit-learn.org/stable/modules/outlier_detection.html"}},
              { id:"3-6-30", text:"sklearn Pipelines: ColumnTransformer, Pipeline for full prepro", tag:"FeatEng", yt:"https://www.youtube.com/watch?v=irHhDMbw3xo", ytLabel:"sklearn Pipeline", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"ColumnTransformer — different transforms per column",yt:"https://www.youtube.com/watch?v=irHhDMbw3xo"},
                {text:"Pipeline — chain steps together",yt:"https://www.youtube.com/watch?v=irHhDMbw3xo"},
                {text:"FunctionTransformer — custom transform",yt:"https://www.youtube.com/watch?v=irHhDMbw3xo"},
                {text:"Cross-validate the full pipeline",yt:"https://www.youtube.com/watch?v=fwY9Qv96DJY"},
                {text:"Save pipeline with joblib",yt:"https://www.youtube.com/watch?v=2Tw39kZIbhs"},
              ],
              github:[
                {name:"scikit-learn/scikit-learn",url:"https://github.com/scikit-learn/scikit-learn",desc:"sklearn Pipeline",stars:"60k+"},
              ],
              resource:{title:"sklearn Pipeline Docs",url:"https://scikit-learn.org/stable/modules/pipeline.html"}},
            ]
          },
          {
            day: "SUN", label: "EDA Project",
            resource: "Kaggle Datasets",
            resourceUrl: "https://www.kaggle.com/datasets",
            chatgpt: "Review my EDA analysis on [dataset name]: [paste notebook summary]. Are my conclusions valid? What patterns did I miss? What 3 visualizations would make this a standout portfolio project?",
            topics: [
              { id:"3-6-31", text:"🏗 BUILD: Full EDA on Netflix / Airbnb / COVID dataset", tag:"Project", yt:"https://www.youtube.com/watch?v=xi0vhXFPegw", ytLabel:"EDA Project Example", hindiYt:"https://www.youtube.com/watch?v=aqvDTCpNRek", hindiYtLabel:"Python Project Hindi (CodeWithHarry)",
              subtopics:[
                {text:"Choose a public dataset: Netflix/Airbnb/COVID",yt:"https://www.youtube.com/watch?v=xi0vhXFPegw"},
                {text:"Load, inspect, clean with pandas",yt:"https://www.youtube.com/watch?v=vmEHCJofslg"},
                {text:"Run full EDA: shape, types, missing, stats",yt:"https://www.youtube.com/watch?v=xi0vhXFPegw"},
                {text:"Ask business questions first — then answer with data",yt:"https://www.youtube.com/watch?v=xi0vhXFPegw"},
              ],
              github:[
                {name:"ydataai/ydata-profiling",url:"https://github.com/ydataai/ydata-profiling",desc:"Automated EDA",stars:"12k+"},
              ],
              resource:{title:"Kaggle Datasets",url:"https://www.kaggle.com/datasets"}},
              { id:"3-6-32", text:"Create 8 visualizations that tell a data story", tag:"Project", yt:"https://www.youtube.com/watch?v=GGL6U0k8WYA", ytLabel:"Data Storytelling", hindiYt:"https://www.youtube.com/watch?v=aqvDTCpNRek", hindiYtLabel:"Python Project Hindi (CodeWithHarry)",
              subtopics:[
                {text:"8 chart types for data storytelling",yt:"https://www.youtube.com/watch?v=UO98lJQ3QGI"},
                {text:"Choosing the right chart type",yt:"https://www.youtube.com/watch?v=UO98lJQ3QGI"},
                {text:"Make charts presentation-ready",yt:"https://www.youtube.com/watch?v=UO98lJQ3QGI"},
                {text:"Narrative visualization — charts tell a story",yt:"https://www.youtube.com/watch?v=xi0vhXFPegw"},
              ],
              github:[
                {name:"matplotlib/matplotlib",url:"https://github.com/matplotlib/matplotlib",desc:"matplotlib charts",stars:"20k+"},
              ],
              resource:{title:"Data Visualization Best Practices",url:"https://www.data-to-viz.com/"}},
              { id:"3-6-33", text:"Write 5 business insights from the analysis in README", tag:"Project", yt:"https://www.youtube.com/watch?v=u3jyGqxZ7yQ", ytLabel:"Data Analysis Report", hindiYt:"https://www.youtube.com/watch?v=aqvDTCpNRek", hindiYtLabel:"Python Project Hindi (CodeWithHarry)",
              subtopics:[
                {text:"Extract 5 actionable business insights",yt:"https://www.youtube.com/watch?v=xi0vhXFPegw"},
                {text:"Write insights in README.md",yt:"https://www.youtube.com/watch?v=E6NO0rgFub4"},
                {text:"Structure: context → finding → recommendation",yt:"https://www.youtube.com/watch?v=xi0vhXFPegw"},
                {text:"Push to GitHub — portfolio EDA project",yt:"https://www.youtube.com/watch?v=RGOj5yH7evk"},
              ],
              github:[
                {name:"othneildrew/Best-README-Template",url:"https://github.com/othneildrew/Best-README-Template",desc:"README template",stars:"14k+"},
              ],
              resource:{title:"Data Storytelling Guide",url:"https://www.storytellingwithdata.com/"}},
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
              { id:"4-9-1", text:"Supervised vs unsupervised vs self-supervised vs RL", tag:"ML", yt:"https://www.youtube.com/watch?v=aircAruvnKk", ytLabel:"Types of ML", hindiYt:"https://www.youtube.com/watch?v=7uwa9aPbBRU", hindiYtLabel:"Machine Learning Hindi (CampusX)",
              subtopics:[
                {text:"Supervised learning — labeled data",yt:"https://www.youtube.com/watch?v=cfj6yaYE86U"},
                {text:"Unsupervised learning — find patterns",yt:"https://www.youtube.com/watch?v=JnnaDNNb380"},
                {text:"Self-supervised learning — labels from data",yt:"https://www.youtube.com/watch?v=cfj6yaYE86U"},
                {text:"Reinforcement learning — reward signal",yt:"https://www.youtube.com/watch?v=0g4j2k_Ggc4"},
                {text:"When to use each type",yt:"https://www.youtube.com/watch?v=cfj6yaYE86U"},
              ],
              github:[
                {name:"scikit-learn/scikit-learn",url:"https://github.com/scikit-learn/scikit-learn",desc:"sklearn ML algorithms",stars:"60k+"},
              ],
              resource:{title:"sklearn Algorithm Cheat Sheet",url:"https://scikit-learn.org/stable/tutorial/machine_learning_map/index.html"}},
              { id:"4-9-2", text:"Train/val/test split — data leakage prevention strategies", tag:"ML", yt:"https://www.youtube.com/watch?v=fSytzGwwBVw", ytLabel:"Train Test Split", hindiYt:"https://www.youtube.com/watch?v=7uwa9aPbBRU", hindiYtLabel:"Machine Learning Hindi (CampusX)",
              subtopics:[
                {text:"train_test_split — basic split",yt:"https://www.youtube.com/watch?v=fwY9Qv96DJY"},
                {text:"Data leakage — the silent model killer",yt:"https://www.youtube.com/watch?v=fwY9Qv96DJY"},
                {text:"Stratified split — preserve class ratios",yt:"https://www.youtube.com/watch?v=fwY9Qv96DJY"},
                {text:"Time series split — no future leakage",yt:"https://www.youtube.com/watch?v=fwY9Qv96DJY"},
                {text:"Group split — prevent group leakage",yt:"https://www.youtube.com/watch?v=fwY9Qv96DJY"},
              ],
              github:[
                {name:"scikit-learn/scikit-learn",url:"https://github.com/scikit-learn/scikit-learn",desc:"sklearn model_selection",stars:"60k+"},
              ],
              resource:{title:"sklearn Cross-Validation Docs",url:"https://scikit-learn.org/stable/modules/cross_validation.html"}},
              { id:"4-9-3", text:"Bias-variance tradeoff, overfitting, underfitting, regularization", tag:"ML", yt:"https://www.youtube.com/watch?v=EuBBz3bI-aA", ytLabel:"Bias Variance", hindiYt:"https://www.youtube.com/watch?v=7uwa9aPbBRU", hindiYtLabel:"Machine Learning Hindi (CampusX)",
              subtopics:[
                {text:"Bias — model too simple",yt:"https://www.youtube.com/watch?v=EuBBz3bI-aA"},
                {text:"Variance — model too sensitive",yt:"https://www.youtube.com/watch?v=EuBBz3bI-aA"},
                {text:"Tradeoff — reducing one increases other",yt:"https://www.youtube.com/watch?v=EuBBz3bI-aA"},
                {text:"Ridge L2 — penalize large weights",yt:"https://www.youtube.com/watch?v=Q81RR3yKn30"},
                {text:"Lasso L1 — sparse solutions",yt:"https://www.youtube.com/watch?v=Q81RR3yKn30"},
              ],
              github:[
                {name:"scikit-learn/scikit-learn",url:"https://github.com/scikit-learn/scikit-learn",desc:"sklearn regularization",stars:"60k+"},
              ],
              resource:{title:"StatQuest — Bias/Variance",url:"https://www.youtube.com/watch?v=EuBBz3bI-aA"}},
              { id:"4-9-4", text:"Linear & logistic regression — math + sklearn implementation", tag:"Regression", yt:"https://www.youtube.com/watch?v=nk2CQITm_eo", ytLabel:"Linear Regression", hindiYt:"https://www.youtube.com/watch?v=7uwa9aPbBRU", hindiYtLabel:"Regression Hindi (CampusX)",
              subtopics:[
                {text:"Linear regression — fit a line to data",yt:"https://www.youtube.com/watch?v=nk2CQITm_eo"},
                {text:"Logistic regression — binary classification",yt:"https://www.youtube.com/watch?v=yIYKR4sgzI8"},
                {text:"Sigmoid function — output probabilities",yt:"https://www.youtube.com/watch?v=yIYKR4sgzI8"},
                {text:"sklearn implementation in 5 lines",yt:"https://www.youtube.com/watch?v=nk2CQITm_eo"},
                {text:"Interpret coefficients",yt:"https://www.youtube.com/watch?v=nk2CQITm_eo"},
              ],
              github:[
                {name:"scikit-learn/scikit-learn",url:"https://github.com/scikit-learn/scikit-learn",desc:"Linear and logistic regression",stars:"60k+"},
              ],
              resource:{title:"StatQuest — Linear Regression",url:"https://www.youtube.com/watch?v=nk2CQITm_eo"}},
              { id:"4-9-5", text:"Evaluation: accuracy, precision, recall, F1, ROC-AUC, RMSE", tag:"Eval", yt:"https://www.youtube.com/watch?v=85dtiMz9tSo", ytLabel:"ML Metrics", hindiYt:"https://www.youtube.com/watch?v=7uwa9aPbBRU", hindiYtLabel:"Model Eval Hindi (CampusX)",
              subtopics:[
                {text:"Accuracy — correct predictions / total",yt:"https://www.youtube.com/watch?v=j-EB6RqqjGI"},
                {text:"Precision — correct positives / predicted positives",yt:"https://www.youtube.com/watch?v=j-EB6RqqjGI"},
                {text:"Recall — correct positives / actual positives",yt:"https://www.youtube.com/watch?v=j-EB6RqqjGI"},
                {text:"F1 score — harmonic mean of P and R",yt:"https://www.youtube.com/watch?v=j-EB6RqqjGI"},
                {text:"ROC-AUC — model discrimination ability",yt:"https://www.youtube.com/watch?v=OAl6eAyP-yo"},
              ],
              github:[
                {name:"scikit-learn/scikit-learn",url:"https://github.com/scikit-learn/scikit-learn",desc:"sklearn metrics",stars:"60k+"},
              ],
              resource:{title:"StatQuest — ROC and AUC",url:"https://www.youtube.com/watch?v=OAl6eAyP-yo"}},
            ]
          },
          {
            day: "TUE", label: "Tree-Based Models",
            resource: "StatQuest – Decision Trees",
            resourceUrl: "https://www.youtube.com/watch?v=_L39rN6gz7Y",
            chatgpt: "Explain Random Forest vs XGBoost vs LightGBM. Give me a decision framework: when to use each for tabular data? Show me a complete XGBoost training pipeline with early stopping and Optuna tuning.",
            topics: [
              { id:"4-9-6", text:"Decision Trees: Gini impurity, information gain, pruning", tag:"Trees", yt:"https://www.youtube.com/watch?v=_L39rN6gz7Y", ytLabel:"StatQuest: Decision Trees", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"Decision tree structure — nodes and leaves",yt:"https://www.youtube.com/watch?v=_L39rN6gz7Y"},
                {text:"Gini impurity — measure node purity",yt:"https://www.youtube.com/watch?v=_L39rN6gz7Y"},
                {text:"Information gain — choose best split",yt:"https://www.youtube.com/watch?v=_L39rN6gz7Y"},
                {text:"Pruning — prevent overfitting",yt:"https://www.youtube.com/watch?v=_L39rN6gz7Y"},
                {text:"Visualize tree with sklearn",yt:"https://www.youtube.com/watch?v=_L39rN6gz7Y"},
              ],
              github:[
                {name:"scikit-learn/scikit-learn",url:"https://github.com/scikit-learn/scikit-learn",desc:"sklearn DecisionTreeClassifier",stars:"60k+"},
              ],
              resource:{title:"StatQuest — Decision Trees",url:"https://www.youtube.com/watch?v=_L39rN6gz7Y"}},
              { id:"4-9-7", text:"Random Forest: bagging, feature importance, OOB score", tag:"Ensemble", yt:"https://www.youtube.com/watch?v=J4Wdy0Wc_xQ", ytLabel:"StatQuest: Random Forest", hindiYt:"https://www.youtube.com/watch?v=7uwa9aPbBRU", hindiYtLabel:"Ensemble Methods Hindi (CampusX)",
              subtopics:[
                {text:"Random Forest — many trees vote",yt:"https://www.youtube.com/watch?v=J4Wdy0Wc_xQ"},
                {text:"Bagging — bootstrap sampling",yt:"https://www.youtube.com/watch?v=J4Wdy0Wc_xQ"},
                {text:"Feature importance scores",yt:"https://www.youtube.com/watch?v=J4Wdy0Wc_xQ"},
                {text:"OOB score — out-of-bag validation",yt:"https://www.youtube.com/watch?v=J4Wdy0Wc_xQ"},
                {text:"n_estimators and max_features tuning",yt:"https://www.youtube.com/watch?v=J4Wdy0Wc_xQ"},
              ],
              github:[
                {name:"scikit-learn/scikit-learn",url:"https://github.com/scikit-learn/scikit-learn",desc:"RandomForestClassifier",stars:"60k+"},
              ],
              resource:{title:"StatQuest — Random Forest",url:"https://www.youtube.com/watch?v=J4Wdy0Wc_xQ"}},
              { id:"4-9-8", text:"XGBoost: architecture, hyperparameters, early stopping", tag:"Boosting", yt:"https://www.youtube.com/watch?v=OtD8wVaFm6E", ytLabel:"StatQuest: XGBoost", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"XGBoost — gradient boosting explained",yt:"https://www.youtube.com/watch?v=OtD8wVaFm6E"},
                {text:"n_estimators, learning_rate, max_depth",yt:"https://www.youtube.com/watch?v=OtD8wVaFm6E"},
                {text:"Early stopping — prevent overfitting",yt:"https://www.youtube.com/watch?v=OtD8wVaFm6E"},
                {text:"Feature importance with XGBoost",yt:"https://www.youtube.com/watch?v=OtD8wVaFm6E"},
                {text:"XGBoost vs Random Forest",yt:"https://www.youtube.com/watch?v=OtD8wVaFm6E"},
              ],
              github:[
                {name:"dmlc/xgboost",url:"https://github.com/dmlc/xgboost",desc:"XGBoost",stars:"26k+"},
              ],
              resource:{title:"XGBoost Documentation",url:"https://xgboost.readthedocs.io/"}},
              { id:"4-9-9", text:"LightGBM: histogram-based, leaf-wise, speed vs accuracy", tag:"Boosting", yt:"https://www.youtube.com/watch?v=n_ZMQj09S6w", ytLabel:"LightGBM Tutorial", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"LightGBM vs XGBoost — speed comparison",yt:"https://www.youtube.com/watch?v=n_ZMnFpnZkU"},
                {text:"Leaf-wise growth — better accuracy",yt:"https://www.youtube.com/watch?v=n_ZMnFpnZkU"},
                {text:"Histogram-based splits — faster training",yt:"https://www.youtube.com/watch?v=n_ZMnFpnZkU"},
                {text:"Categorical features natively",yt:"https://www.youtube.com/watch?v=n_ZMnFpnZkU"},
                {text:"num_leaves and min_data_in_leaf",yt:"https://www.youtube.com/watch?v=n_ZMnFpnZkU"},
              ],
              github:[
                {name:"microsoft/LightGBM",url:"https://github.com/microsoft/LightGBM",desc:"LightGBM",stars:"17k+"},
              ],
              resource:{title:"LightGBM Documentation",url:"https://lightgbm.readthedocs.io/"}},
              { id:"4-9-10", text:"Optuna for hyperparameter tuning — automated HPO", tag:"HPO", yt:"https://www.youtube.com/watch?v=P6NwZVl8ttc", ytLabel:"Optuna Tutorial", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"Hyperparameter vs model parameter",yt:"https://www.youtube.com/watch?v=P6NwZVl8ttc"},
                {text:"Optuna — define and optimize objective",yt:"https://www.youtube.com/watch?v=P6NwZVl8ttc"},
                {text:"TPE sampler — Bayesian optimization",yt:"https://www.youtube.com/watch?v=P6NwZVl8ttc"},
                {text:"Pruning unpromising trials",yt:"https://www.youtube.com/watch?v=P6NwZVl8ttc"},
                {text:"GridSearchCV vs Optuna comparison",yt:"https://www.youtube.com/watch?v=P6NwZVl8ttc"},
              ],
              github:[
                {name:"optuna/optuna",url:"https://github.com/optuna/optuna",desc:"Hyperparameter optimization",stars:"10k+"},
              ],
              resource:{title:"Optuna Getting Started",url:"https://optuna.readthedocs.io/en/stable/tutorial/index.html"}},
            ]
          },
          {
            day: "WED", label: "Unsupervised Learning",
            resource: "StatQuest – K-Means & PCA",
            resourceUrl: "https://www.youtube.com/watch?v=4b5d3muPQmA",
            chatgpt: "Show me PCA step by step on a 5-feature dataset. Explain what each principal component represents. Then show me how to decide how many components to keep using the explained variance ratio.",
            topics: [
              { id:"4-9-11", text:"K-Means: inertia, elbow method, silhouette score", tag:"Clustering", yt:"https://www.youtube.com/watch?v=4b5d3muPQmA", ytLabel:"StatQuest: K-Means", hindiYt:"https://www.youtube.com/watch?v=7uwa9aPbBRU", hindiYtLabel:"Clustering Hindi (CampusX)",
              subtopics:[
                {text:"K-Means algorithm step by step",yt:"https://www.youtube.com/watch?v=4b5d3muPQmA"},
                {text:"Inertia — sum of squared distances",yt:"https://www.youtube.com/watch?v=4b5d3muPQmA"},
                {text:"Elbow method — choose k",yt:"https://www.youtube.com/watch?v=4b5d3muPQmA"},
                {text:"Silhouette score — cluster quality",yt:"https://www.youtube.com/watch?v=4b5d3muPQmA"},
                {text:"K-Means limitations — circular clusters",yt:"https://www.youtube.com/watch?v=4b5d3muPQmA"},
              ],
              github:[
                {name:"scikit-learn/scikit-learn",url:"https://github.com/scikit-learn/scikit-learn",desc:"sklearn KMeans",stars:"60k+"},
              ],
              resource:{title:"StatQuest — K-Means Clustering",url:"https://www.youtube.com/watch?v=4b5d3muPQmA"}},
              { id:"4-9-12", text:"DBSCAN: density-based clustering, epsilon, min_samples", tag:"Clustering", yt:"https://www.youtube.com/watch?v=RDZUdRSDOok", ytLabel:"DBSCAN Tutorial", hindiYt:"https://www.youtube.com/watch?v=7uwa9aPbBRU", hindiYtLabel:"Clustering Hindi (CampusX)",
              subtopics:[
                {text:"DBSCAN — density-based clustering",yt:"https://www.youtube.com/watch?v=C3r7tGRe2eI"},
                {text:"epsilon — neighborhood radius",yt:"https://www.youtube.com/watch?v=C3r7tGRe2eI"},
                {text:"min_samples — core point threshold",yt:"https://www.youtube.com/watch?v=C3r7tGRe2eI"},
                {text:"Noise points — cluster=-1",yt:"https://www.youtube.com/watch?v=C3r7tGRe2eI"},
                {text:"DBSCAN vs K-Means for irregular shapes",yt:"https://www.youtube.com/watch?v=C3r7tGRe2eI"},
              ],
              github:[
                {name:"scikit-learn/scikit-learn",url:"https://github.com/scikit-learn/scikit-learn",desc:"sklearn DBSCAN",stars:"60k+"},
              ],
              resource:{title:"sklearn DBSCAN Docs",url:"https://scikit-learn.org/stable/modules/clustering.html#dbscan"}},
              { id:"4-9-13", text:"PCA: explained variance, components, scree plot", tag:"DimRed", yt:"https://www.youtube.com/watch?v=FgakZw6K1QQ", ytLabel:"StatQuest: PCA", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"PCA — find directions of max variance",yt:"https://www.youtube.com/watch?v=FgakZw6K1QQ"},
                {text:"Explained variance ratio — choose n_components",yt:"https://www.youtube.com/watch?v=FgakZw6K1QQ"},
                {text:"Scree plot — visualize variance",yt:"https://www.youtube.com/watch?v=FgakZw6K1QQ"},
                {text:"PCA for feature extraction",yt:"https://www.youtube.com/watch?v=FgakZw6K1QQ"},
                {text:"Sklearn PCA in 5 lines",yt:"https://www.youtube.com/watch?v=FgakZw6K1QQ"},
              ],
              github:[
                {name:"scikit-learn/scikit-learn",url:"https://github.com/scikit-learn/scikit-learn",desc:"sklearn PCA",stars:"60k+"},
              ],
              resource:{title:"StatQuest — PCA Clearly Explained",url:"https://www.youtube.com/watch?v=FgakZw6K1QQ"}},
              { id:"4-9-14", text:"t-SNE, UMAP — visualization of high-dim embeddings", tag:"DimRed", yt:"https://www.youtube.com/watch?v=NEaUSP4YerM", ytLabel:"t-SNE Explained", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"t-SNE — nonlinear dimensionality reduction",yt:"https://www.youtube.com/watch?v=NEaUSP4YerM"},
                {text:"Perplexity parameter — local vs global",yt:"https://www.youtube.com/watch?v=NEaUSP4YerM"},
                {text:"UMAP — faster and better than t-SNE",yt:"https://www.youtube.com/watch?v=nq6iPZVUxZU"},
                {text:"Visualize embeddings — clustering patterns",yt:"https://www.youtube.com/watch?v=NEaUSP4YerM"},
                {text:"t-SNE pitfalls — can't trust distances",yt:"https://www.youtube.com/watch?v=NEaUSP4YerM"},
              ],
              github:[
                {name:"lmcinnes/umap",url:"https://github.com/lmcinnes/umap",desc:"UMAP dimensionality reduction",stars:"7k+"},
              ],
              resource:{title:"UMAP Documentation",url:"https://umap-learn.readthedocs.io/"}},
              { id:"4-9-15", text:"Anomaly detection: Isolation Forest, One-Class SVM", tag:"Anomaly", yt:"https://www.youtube.com/watch?v=piF6D6CQxUw", ytLabel:"Anomaly Detection", hindiYt:"https://www.youtube.com/watch?v=7uwa9aPbBRU", hindiYtLabel:"Anomaly Detection Hindi (CampusX)",
              subtopics:[
                {text:"Isolation Forest — randomly isolate outliers",yt:"https://www.youtube.com/watch?v=5p8B2Ikcw-k"},
                {text:"Contamination parameter",yt:"https://www.youtube.com/watch?v=5p8B2Ikcw-k"},
                {text:"One-Class SVM for novelty detection",yt:"https://www.youtube.com/watch?v=5p8B2Ikcw-k"},
                {text:"Anomaly score interpretation",yt:"https://www.youtube.com/watch?v=5p8B2Ikcw-k"},
                {text:"Real-world: fraud and intrusion detection",yt:"https://www.youtube.com/watch?v=5p8B2Ikcw-k"},
              ],
              github:[
                {name:"yzhao062/pyod",url:"https://github.com/yzhao062/pyod",desc:"Python outlier detection",stars:"8k+"},
              ],
              resource:{title:"sklearn Anomaly Detection Docs",url:"https://scikit-learn.org/stable/modules/outlier_detection.html"}},
            ]
          },
          {
            day: "THU", label: "sklearn Pipelines",
            resource: "sklearn Pipeline Docs",
            resourceUrl: "https://scikit-learn.org/stable/modules/pipeline.html",
            chatgpt: "Build a complete sklearn Pipeline for a classification problem: preprocessing (numeric + categorical), model, and cross-validation. Show me how to use ColumnTransformer and GridSearchCV together.",
            topics: [
              { id:"4-9-16", text:"sklearn Pipeline: ColumnTransformer, estimators, fit/predict", tag:"Pipeline", yt:"https://www.youtube.com/watch?v=irHhDMbw3xo", ytLabel:"sklearn Pipeline", hindiYt:"https://www.youtube.com/watch?v=7uwa9aPbBRU", hindiYtLabel:"ML Pipeline Hindi (CampusX)",
              subtopics:[
                {text:"Pipeline — chain preprocessing + model",yt:"https://www.youtube.com/watch?v=irHhDMbw3xo"},
                {text:"ColumnTransformer — mixed feature types",yt:"https://www.youtube.com/watch?v=irHhDMbw3xo"},
                {text:"fit() vs transform() vs fit_transform()",yt:"https://www.youtube.com/watch?v=irHhDMbw3xo"},
                {text:"Pipeline with cross-validation",yt:"https://www.youtube.com/watch?v=irHhDMbw3xo"},
                {text:"Custom estimator — BaseEstimator",yt:"https://www.youtube.com/watch?v=irHhDMbw3xo"},
              ],
              github:[
                {name:"scikit-learn/scikit-learn",url:"https://github.com/scikit-learn/scikit-learn",desc:"sklearn Pipeline",stars:"60k+"},
              ],
              resource:{title:"sklearn Pipeline Docs",url:"https://scikit-learn.org/stable/modules/pipeline.html"}},
              { id:"4-9-17", text:"Cross-validation: k-fold, stratified, StratifiedGroupKFold", tag:"CV", yt:"https://www.youtube.com/watch?v=fSytzGwwBVw", ytLabel:"Cross Validation", hindiYt:"https://www.youtube.com/watch?v=ER2It2mIagI", hindiYtLabel:"Computer Vision Hindi (CampusX)",
              subtopics:[
                {text:"k-fold cross-validation — k=5 or 10",yt:"https://www.youtube.com/watch?v=fSytzGwwBVw"},
                {text:"Stratified k-fold — balanced splits",yt:"https://www.youtube.com/watch?v=fSytzGwwBVw"},
                {text:"StratifiedGroupKFold — groups + stratification",yt:"https://www.youtube.com/watch?v=fSytzGwwBVw"},
                {text:"cross_val_score — one-liner CV",yt:"https://www.youtube.com/watch?v=fSytzGwwBVw"},
                {text:"Nested CV — tune and evaluate",yt:"https://www.youtube.com/watch?v=fSytzGwwBVw"},
              ],
              github:[
                {name:"scikit-learn/scikit-learn",url:"https://github.com/scikit-learn/scikit-learn",desc:"sklearn cross_val_score",stars:"60k+"},
              ],
              resource:{title:"sklearn Cross-Validation Docs",url:"https://scikit-learn.org/stable/modules/cross_validation.html"}},
              { id:"4-9-18", text:"GridSearchCV, RandomizedSearchCV, HalvingGridSearchCV", tag:"HPO", yt:"https://www.youtube.com/watch?v=Gol_qOgRqfA", ytLabel:"Hyperparameter Tuning", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"GridSearchCV — exhaustive search",yt:"https://www.youtube.com/watch?v=Gol_qOgRqfA"},
                {text:"RandomizedSearchCV — random sampling",yt:"https://www.youtube.com/watch?v=Gol_qOgRqfA"},
                {text:"HalvingGridSearchCV — successive halving",yt:"https://www.youtube.com/watch?v=Gol_qOgRqfA"},
                {text:"param_grid — define search space",yt:"https://www.youtube.com/watch?v=Gol_qOgRqfA"},
                {text:"best_params_ and best_score_",yt:"https://www.youtube.com/watch?v=Gol_qOgRqfA"},
              ],
              github:[
                {name:"scikit-learn/scikit-learn",url:"https://github.com/scikit-learn/scikit-learn",desc:"GridSearchCV",stars:"60k+"},
              ],
              resource:{title:"sklearn GridSearchCV Docs",url:"https://scikit-learn.org/stable/modules/grid_search.html"}},
              { id:"4-9-19", text:"Model persistence: joblib, pickle, sklearn Model Card", tag:"MLOps", yt:"https://www.youtube.com/watch?v=2P3W2XFZC4E", ytLabel:"Save ML Models", hindiYt:"https://www.youtube.com/watch?v=9zUHg7xjIqQ", hindiYtLabel:"MLOps Hindi Course (CampusX)",
              subtopics:[
                {text:"joblib.dump and joblib.load",yt:"https://www.youtube.com/watch?v=2Tw39kZIbhs"},
                {text:"pickle — Python object serialization",yt:"https://www.youtube.com/watch?v=2Tw39kZIbhs"},
                {text:"Save full pipeline including preprocessing",yt:"https://www.youtube.com/watch?v=2Tw39kZIbhs"},
                {text:"ONNX export — framework independent",yt:"https://www.youtube.com/watch?v=2Tw39kZIbhs"},
                {text:"Model Card — document your model",yt:"https://www.youtube.com/watch?v=oRleHlPGRKw"},
              ],
              github:[
                {name:"mlflow/mlflow",url:"https://github.com/mlflow/mlflow",desc:"MLflow model registry",stars:"19k+"},
              ],
              resource:{title:"sklearn Model Persistence Docs",url:"https://scikit-learn.org/stable/model_persistence.html"}},
              { id:"4-9-20", text:"SHAP values: explain any model prediction to stakeholders", tag:"XAI", yt:"https://www.youtube.com/watch?v=VB9uV-x0gtg", ytLabel:"SHAP Explainability", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"SHAP — game theory for ML explanations",yt:"https://www.youtube.com/watch?v=VB9uV-x0gtg"},
                {text:"shap.summary_plot — global importance",yt:"https://www.youtube.com/watch?v=VB9uV-x0gtg"},
                {text:"shap.force_plot — single prediction",yt:"https://www.youtube.com/watch?v=VB9uV-x0gtg"},
                {text:"SHAP for any model — model agnostic",yt:"https://www.youtube.com/watch?v=VB9uV-x0gtg"},
                {text:"Explain to stakeholders with SHAP",yt:"https://www.youtube.com/watch?v=VB9uV-x0gtg"},
              ],
              github:[
                {name:"slundberg/shap",url:"https://github.com/slundberg/shap",desc:"SHAP explanations",stars:"22k+"},
              ],
              resource:{title:"SHAP Documentation",url:"https://shap.readthedocs.io/"}},
            ]
          },
          {
            day: "FRI", label: "NLP Fundamentals",
            resource: "HuggingFace NLP Course",
            resourceUrl: "https://huggingface.co/learn/nlp-course",
            chatgpt: "Walk me through classical NLP pipeline for text classification: tokenization, TF-IDF, train/eval. Then explain why transformers replaced this approach and what they do better.",
            topics: [
              { id:"4-9-21", text:"Text preprocessing: tokenization, stopwords, stemming, lemmatization", tag:"NLP", yt:"https://www.youtube.com/watch?v=vyOgWhwUmec", ytLabel:"NLP Preprocessing", hindiYt:"https://www.youtube.com/watch?v=ER2It2mIagI", hindiYtLabel:"NLP Basics Hindi (CampusX)",
              subtopics:[
                {text:"Tokenization — split text into tokens",yt:"https://www.youtube.com/watch?v=FLZvOKSCkxY"},
                {text:"Stopwords removal",yt:"https://www.youtube.com/watch?v=FLZvOKSCkxY"},
                {text:"Stemming vs Lemmatization",yt:"https://www.youtube.com/watch?v=FLZvOKSCkxY"},
                {text:"Punctuation and case normalization",yt:"https://www.youtube.com/watch?v=FLZvOKSCkxY"},
                {text:"NLTK and spaCy for NLP preprocessing",yt:"https://www.youtube.com/watch?v=FLZvOKSCkxY"},
              ],
              github:[
                {name:"explosion/spaCy",url:"https://github.com/explosion/spaCy",desc:"spaCy NLP",stars:"30k+"},
                {name:"nltk/nltk",url:"https://github.com/nltk/nltk",desc:"NLTK",stars:"13k+"},
              ],
              resource:{title:"spaCy 101",url:"https://spacy.io/usage/spacy-101"}},
              { id:"4-9-22", text:"TF-IDF, Bag-of-Words, n-grams for text features", tag:"NLP", yt:"https://www.youtube.com/watch?v=4vT4fuhnroA", ytLabel:"TF-IDF Explained", hindiYt:"https://www.youtube.com/watch?v=ER2It2mIagI", hindiYtLabel:"NLP Basics Hindi (CampusX)",
              subtopics:[
                {text:"Bag of Words — count words",yt:"https://www.youtube.com/watch?v=D2V1okCEsiE"},
                {text:"TF-IDF — weight by importance",yt:"https://www.youtube.com/watch?v=D2V1okCEsiE"},
                {text:"n-grams — bi/trigrams for context",yt:"https://www.youtube.com/watch?v=D2V1okCEsiE"},
                {text:"TfidfVectorizer in sklearn",yt:"https://www.youtube.com/watch?v=D2V1okCEsiE"},
                {text:"Sparse matrix output — memory efficient",yt:"https://www.youtube.com/watch?v=D2V1okCEsiE"},
              ],
              github:[
                {name:"scikit-learn/scikit-learn",url:"https://github.com/scikit-learn/scikit-learn",desc:"TfidfVectorizer",stars:"60k+"},
              ],
              resource:{title:"sklearn TF-IDF Docs",url:"https://scikit-learn.org/stable/modules/feature_extraction.html#tfidf-term-weighting"}},
              { id:"4-9-23", text:"Text classification pipeline: TF-IDF + Logistic Regression", tag:"NLP", yt:"https://www.youtube.com/watch?v=M7SWr5xObkA", ytLabel:"Text Classification", hindiYt:"https://www.youtube.com/watch?v=ER2It2mIagI", hindiYtLabel:"NLP Basics Hindi (CampusX)",
              subtopics:[
                {text:"TF-IDF + Logistic Regression pipeline",yt:"https://www.youtube.com/watch?v=D2V1okCEsiE"},
                {text:"Naive Bayes for text — fast baseline",yt:"https://www.youtube.com/watch?v=O2L2Uv9pdDA"},
                {text:"Evaluate: accuracy, precision, recall on text",yt:"https://www.youtube.com/watch?v=j-EB6RqqjGI"},
                {text:"Multi-class text classification",yt:"https://www.youtube.com/watch?v=D2V1okCEsiE"},
                {text:"Compare: LR vs NB vs SVM for text",yt:"https://www.youtube.com/watch?v=efR1C6CvhmE"},
              ],
              github:[
                {name:"scikit-learn/scikit-learn",url:"https://github.com/scikit-learn/scikit-learn",desc:"Text classification pipeline",stars:"60k+"},
              ],
              resource:{title:"sklearn Text Classification Tutorial",url:"https://scikit-learn.org/stable/tutorial/text_analytics/working_with_text_data.html"}},
              { id:"4-9-24", text:"spaCy NLP pipeline: NER, POS tagging, dependency parsing", tag:"NLP", yt:"https://www.youtube.com/watch?v=WnGPv6HnBok", ytLabel:"spaCy Tutorial", hindiYt:"https://www.youtube.com/watch?v=ER2It2mIagI", hindiYtLabel:"NLP Basics Hindi (CampusX)",
              subtopics:[
                {text:"spaCy pipeline — tokenizer, tagger, parser",yt:"https://www.youtube.com/watch?v=THduWAnG97k"},
                {text:"NER — named entity recognition",yt:"https://www.youtube.com/watch?v=THduWAnG97k"},
                {text:"POS tagging — part of speech",yt:"https://www.youtube.com/watch?v=THduWAnG97k"},
                {text:"Dependency parsing — sentence structure",yt:"https://www.youtube.com/watch?v=THduWAnG97k"},
                {text:"Custom NER training with spaCy",yt:"https://www.youtube.com/watch?v=THduWAnG97k"},
              ],
              github:[
                {name:"explosion/spaCy",url:"https://github.com/explosion/spaCy",desc:"spaCy NLP library",stars:"30k+"},
              ],
              resource:{title:"spaCy Documentation",url:"https://spacy.io/usage"}},
              { id:"4-9-25", text:"Regular expressions for text cleaning (re module)", tag:"NLP", yt:"https://www.youtube.com/watch?v=K8L6KVGG-7o", ytLabel:"Regex in Python", hindiYt:"https://www.youtube.com/watch?v=ER2It2mIagI", hindiYtLabel:"NLP Basics Hindi (CampusX)",
              subtopics:[
                {text:"re.search vs re.match vs re.findall",yt:"https://www.youtube.com/watch?v=K8L6KVGG-7o"},
                {text:"Character classes: [a-z] [0-9] \w \d",yt:"https://www.youtube.com/watch?v=K8L6KVGG-7o"},
                {text:"Quantifiers: * + ? {n,m}",yt:"https://www.youtube.com/watch?v=K8L6KVGG-7o"},
                {text:"Groups and capture: (pattern)",yt:"https://www.youtube.com/watch?v=K8L6KVGG-7o"},
                {text:"Real use: clean messy text data",yt:"https://www.youtube.com/watch?v=K8L6KVGG-7o"},
              ],
              github:[
                {name:"vinta/awesome-python",url:"https://github.com/vinta/awesome-python",desc:"Python regex resources",stars:"230k+"},
              ],
              resource:{title:"Python re Docs",url:"https://docs.python.org/3/library/re.html"}},
            ]
          },
          {
            day: "SAT", label: "ML Project Day",
            resource: "Kaggle Competitions",
            resourceUrl: "https://www.kaggle.com/competitions",
            chatgpt: "Review my customer churn classifier [paste code]. Check: feature engineering, model selection rationale, evaluation metrics, data leakage risks, and how to improve AUC-ROC by 5%.",
            topics: [
              { id:"4-9-26", text:"🏗 BUILD: Customer Churn Predictor — end-to-end pipeline", tag:"Project", yt:"https://www.youtube.com/watch?v=ZoQMp5AAAJE", ytLabel:"ML Project Tutorial", hindiYt:"https://www.youtube.com/watch?v=aqvDTCpNRek", hindiYtLabel:"Python Project Hindi (CodeWithHarry)",
              subtopics:[
                {text:"Load and explore churn dataset",yt:"https://www.youtube.com/watch?v=GwIo3gDZCVQ"},
                {text:"Feature engineering for churn",yt:"https://www.youtube.com/watch?v=GwIo3gDZCVQ"},
                {text:"Train XGBoost with cross-validation",yt:"https://www.youtube.com/watch?v=GwIo3gDZCVQ"},
                {text:"SHAP to explain churn factors",yt:"https://www.youtube.com/watch?v=VB9uV-x0gtg"},
                {text:"Build prediction API with FastAPI",yt:"https://www.youtube.com/watch?v=kCc8FmEb1nY"},
              ],
              github:[
                {name:"ageron/handson-ml3",url:"https://github.com/ageron/handson-ml3",desc:"Hands-on ML projects",stars:"28k+"},
              ],
              resource:{title:"Kaggle Churn Dataset",url:"https://www.kaggle.com/datasets/blastchar/telco-customer-churn"}},
              { id:"4-9-27", text:"🏗 BUILD: Spam Classifier — TF-IDF + Naive Bayes/LR", tag:"Project", yt:"https://www.youtube.com/watch?v=M7SWr5xObkA", ytLabel:"Spam Detection", hindiYt:"https://www.youtube.com/watch?v=aqvDTCpNRek", hindiYtLabel:"Python Project Hindi (CodeWithHarry)",
              subtopics:[
                {text:"Load SpamAssassin or SMS spam dataset",yt:"https://www.youtube.com/watch?v=D2V1okCEsiE"},
                {text:"TF-IDF preprocessing",yt:"https://www.youtube.com/watch?v=D2V1okCEsiE"},
                {text:"Train Naive Bayes and Logistic Regression",yt:"https://www.youtube.com/watch?v=O2L2Uv9pdDA"},
                {text:"Compare models on test set",yt:"https://www.youtube.com/watch?v=j-EB6RqqjGI"},
                {text:"Build Flask/FastAPI prediction endpoint",yt:"https://www.youtube.com/watch?v=qAh5dDODJ3k"},
              ],
              github:[
                {name:"scikit-learn/scikit-learn",url:"https://github.com/scikit-learn/scikit-learn",desc:"sklearn text pipeline",stars:"60k+"},
              ],
              resource:{title:"SMS Spam Dataset on Kaggle",url:"https://www.kaggle.com/datasets/uciml/sms-spam-collection-dataset"}},
              { id:"4-9-28", text:"Enter a Kaggle competition (Titanic or Playground)", tag:"Kaggle", yt:"https://www.youtube.com/watch?v=I3FBJdiExcg", ytLabel:"Kaggle for Beginners", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"Kaggle Titanic — survival prediction",yt:"https://www.youtube.com/watch?v=I3FBJdiExcg"},
                {text:"Feature engineering for Titanic",yt:"https://www.youtube.com/watch?v=I3FBJdiExcg"},
                {text:"Submit predictions to leaderboard",yt:"https://www.youtube.com/watch?v=I3FBJdiExcg"},
                {text:"Iterate and improve score",yt:"https://www.youtube.com/watch?v=I3FBJdiExcg"},
              ],
              github:[
                {name:"ageron/handson-ml3",url:"https://github.com/ageron/handson-ml3",desc:"ML project reference",stars:"28k+"},
              ],
              resource:{title:"Kaggle Titanic Competition",url:"https://www.kaggle.com/competitions/titanic"}},
            ]
          },
          {
            day: "SUN", label: "Review & Polish",
            resource: "sklearn User Guide",
            resourceUrl: "https://scikit-learn.org/stable/user_guide.html",
            chatgpt: "Quiz me on machine learning concepts. Ask 10 questions covering: evaluation metrics, model selection, overfitting, feature engineering, and ensemble methods. Give detailed feedback after each answer.",
            topics: [
              { id:"4-9-29", text:"Review: all ML algorithms, when to use each, pros/cons", tag:"Review", yt:"https://www.youtube.com/watch?v=aircAruvnKk", ytLabel:"ML Algorithm Review", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"Linear models — interpretable, fast",yt:"https://www.youtube.com/watch?v=cfj6yaYE86U"},
                {text:"Tree models — non-linear, handles mixed types",yt:"https://www.youtube.com/watch?v=_L39rN6gz7Y"},
                {text:"Neural networks — complex patterns, needs data",yt:"https://www.youtube.com/watch?v=aircAruvnKk"},
                {text:"Clustering — no labels needed",yt:"https://www.youtube.com/watch?v=JnnaDNNb380"},
                {text:"Algorithm selection flowchart",yt:"https://www.youtube.com/watch?v=cfj6yaYE86U"},
              ],
              github:[
                {name:"scikit-learn/scikit-learn",url:"https://github.com/scikit-learn/scikit-learn",desc:"sklearn algorithm zoo",stars:"60k+"},
              ],
              resource:{title:"sklearn Algorithm Cheat Sheet",url:"https://scikit-learn.org/stable/tutorial/machine_learning_map/index.html"}},
              { id:"4-9-30", text:"Polish Kaggle submission — feature engineering iteration", tag:"Kaggle", yt:"https://www.youtube.com/watch?v=I3FBJdiExcg", ytLabel:"Kaggle Tips", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"Iterate on features after first submission",yt:"https://www.youtube.com/watch?v=GwIo3gDZCVQ"},
                {text:"Ensemble multiple models — stacking",yt:"https://www.youtube.com/watch?v=LsK-xG1cLYA"},
                {text:"Cross-validation to safely improve",yt:"https://www.youtube.com/watch?v=fSytzGwwBVw"},
                {text:"Document approach in notebook",yt:"https://www.youtube.com/watch?v=GwIo3gDZCVQ"},
              ],
              github:[
                {name:"ageron/handson-ml3",url:"https://github.com/ageron/handson-ml3",desc:"ML competition strategies",stars:"28k+"},
              ],
              resource:{title:"Kaggle Competition Guide",url:"https://www.kaggle.com/discussions/getting-started/44088"}},
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
              { id:"5-15-1", text:"Tensors: creation, operations, .to(device), GPU/CPU transfer", tag:"PyTorch", yt:"https://www.youtube.com/watch?v=exaWOE8jvy8", ytLabel:"PyTorch Crash Course", hindiYt:"https://www.youtube.com/watch?v=Y6aFQMUj3xA", hindiYtLabel:"PyTorch Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"torch.tensor — create tensors",yt:"https://www.youtube.com/watch?v=OIenNRt2bjg"},
                {text:"Operations: add, mul, matmul, sum",yt:"https://www.youtube.com/watch?v=OIenNRt2bjg"},
                {text:".to(device) — move to GPU",yt:"https://www.youtube.com/watch?v=7_OPHPKsEP4"},
                {text:"tensor.item() and tensor.numpy()",yt:"https://www.youtube.com/watch?v=OIenNRt2bjg"},
                {text:"Common shapes in deep learning",yt:"https://www.youtube.com/watch?v=L35fFDpwIM4"},
              ],
              github:[
                {name:"pytorch/pytorch",url:"https://github.com/pytorch/pytorch",desc:"PyTorch deep learning",stars:"85k+"},
              ],
              resource:{title:"PyTorch Tensors Tutorial",url:"https://pytorch.org/tutorials/beginner/basics/tensorqs_tutorial.html"}},
              { id:"5-15-2", text:"Autograd: requires_grad, .backward(), .grad, detach()", tag:"PyTorch", yt:"https://www.youtube.com/watch?v=ORMx45xqWkA", ytLabel:"PyTorch Autograd", hindiYt:"https://www.youtube.com/watch?v=Y6aFQMUj3xA", hindiYtLabel:"PyTorch Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"requires_grad=True — enable autograd",yt:"https://www.youtube.com/watch?v=ORMx45xqWkA"},
                {text:"loss.backward() — compute all gradients",yt:"https://www.youtube.com/watch?v=ORMx45xqWkA"},
                {text:"tensor.grad — access gradient",yt:"https://www.youtube.com/watch?v=ORMx45xqWkA"},
                {text:"tensor.detach() — stop gradient flow",yt:"https://www.youtube.com/watch?v=ORMx45xqWkA"},
                {text:"torch.no_grad() — inference mode",yt:"https://www.youtube.com/watch?v=ORMx45xqWkA"},
              ],
              github:[
                {name:"karpathy/micrograd",url:"https://github.com/karpathy/micrograd",desc:"Understand autograd",stars:"10k+"},
              ],
              resource:{title:"PyTorch Autograd Tutorial",url:"https://pytorch.org/tutorials/beginner/basics/autogradqs_tutorial.html"}},
              { id:"5-15-3", text:"nn.Module: __init__, forward, parameters(), state_dict()", tag:"PyTorch", yt:"https://www.youtube.com/watch?v=c36lUUr864M", ytLabel:"PyTorch nn.Module", hindiYt:"https://www.youtube.com/watch?v=Y6aFQMUj3xA", hindiYtLabel:"PyTorch Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"nn.Module — base class for all models",yt:"https://www.youtube.com/watch?v=c36lUUr864M"},
                {text:"__init__ — define layers",yt:"https://www.youtube.com/watch?v=c36lUUr864M"},
                {text:"forward() — define computation",yt:"https://www.youtube.com/watch?v=c36lUUr864M"},
                {text:"model.parameters() — access weights",yt:"https://www.youtube.com/watch?v=c36lUUr864M"},
                {text:"state_dict() — save/load model",yt:"https://www.youtube.com/watch?v=c36lUUr864M"},
              ],
              github:[
                {name:"pytorch/pytorch",url:"https://github.com/pytorch/pytorch",desc:"nn.Module",stars:"85k+"},
              ],
              resource:{title:"PyTorch nn.Module Tutorial",url:"https://pytorch.org/tutorials/beginner/basics/buildmodel_tutorial.html"}},
              { id:"5-15-4", text:"Dataset, DataLoader, custom __getitem__, __len__, collate_fn", tag:"PyTorch", yt:"https://www.youtube.com/watch?v=PXOzkkB5eH0", ytLabel:"PyTorch DataLoader", hindiYt:"https://www.youtube.com/watch?v=Y6aFQMUj3xA", hindiYtLabel:"PyTorch Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"Dataset — __getitem__ and __len__",yt:"https://www.youtube.com/watch?v=ZoZHd0Zm3RY"},
                {text:"DataLoader — batches, shuffle, workers",yt:"https://www.youtube.com/watch?v=ZoZHd0Zm3RY"},
                {text:"Custom Dataset for images, text, tabular",yt:"https://www.youtube.com/watch?v=ZoZHd0Zm3RY"},
                {text:"collate_fn — custom batch assembly",yt:"https://www.youtube.com/watch?v=ZoZHd0Zm3RY"},
                {text:"Prefetch with num_workers",yt:"https://www.youtube.com/watch?v=ZoZHd0Zm3RY"},
              ],
              github:[
                {name:"pytorch/pytorch",url:"https://github.com/pytorch/pytorch",desc:"DataLoader",stars:"85k+"},
              ],
              resource:{title:"PyTorch Data Loading Tutorial",url:"https://pytorch.org/tutorials/beginner/basics/data_tutorial.html"}},
              { id:"5-15-5", text:"Complete training loop: forward → loss → backward → step", tag:"PyTorch", yt:"https://www.youtube.com/watch?v=V_xro1bcAuA", ytLabel:"PyTorch Training Loop", hindiYt:"https://www.youtube.com/watch?v=Y6aFQMUj3xA", hindiYtLabel:"PyTorch Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"Forward pass — input through model",yt:"https://www.youtube.com/watch?v=c36lUUr864M"},
                {text:"Compute loss — criterion(output, target)",yt:"https://www.youtube.com/watch?v=c36lUUr864M"},
                {text:"optimizer.zero_grad() — clear gradients",yt:"https://www.youtube.com/watch?v=c36lUUr864M"},
                {text:"loss.backward() — backpropagate",yt:"https://www.youtube.com/watch?v=c36lUUr864M"},
                {text:"optimizer.step() — update weights",yt:"https://www.youtube.com/watch?v=c36lUUr864M"},
              ],
              github:[
                {name:"pytorch/pytorch",url:"https://github.com/pytorch/pytorch",desc:"Training loop",stars:"85k+"},
              ],
              resource:{title:"PyTorch Training Loop Tutorial",url:"https://pytorch.org/tutorials/beginner/basics/optimization_tutorial.html"}},
            ]
          },
          {
            day: "TUE", label: "Training Best Practices",
            resource: "Andrej Karpathy – Recipe for NNs",
            resourceUrl: "http://karpathy.github.io/2019/04/25/recipe/",
            chatgpt: "Show me the production PyTorch training template used in real research: includes validation loop, early stopping, LR scheduler, gradient clipping, mixed precision, and wandb logging.",
            topics: [
              { id:"5-15-6", text:"BatchNorm, LayerNorm, DropOut — when and why to use each", tag:"Regularize", yt:"https://www.youtube.com/watch?v=dXB-KQYkzNU", ytLabel:"BatchNorm Explained", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"BatchNorm — normalize activations per batch",yt:"https://www.youtube.com/watch?v=nUUqwaxLnWs"},
                {text:"LayerNorm — normalize per sample (used in transformers)",yt:"https://www.youtube.com/watch?v=nUUqwaxLnWs"},
                {text:"Dropout — randomly zero activations",yt:"https://www.youtube.com/watch?v=D8PJAL-MZv8"},
                {text:"model.train() vs model.eval() — critical!",yt:"https://www.youtube.com/watch?v=nUUqwaxLnWs"},
                {text:"InstanceNorm and GroupNorm",yt:"https://www.youtube.com/watch?v=nUUqwaxLnWs"},
              ],
              github:[
                {name:"pytorch/pytorch",url:"https://github.com/pytorch/pytorch",desc:"Normalization layers",stars:"85k+"},
              ],
              resource:{title:"Batch Normalization Paper",url:"https://arxiv.org/abs/1502.03167"}},
              { id:"5-15-7", text:"Activation functions: ReLU, GELU, SiLU — modern choices", tag:"Activations", yt:"https://www.youtube.com/watch?v=-7scQpJT7uo", ytLabel:"Activation Functions", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"ReLU — max(0,x), most common",yt:"https://www.youtube.com/watch?v=aircAruvnKk"},
                {text:"GELU — used in BERT and GPT",yt:"https://www.youtube.com/watch?v=o_kkLJzIc0A"},
                {text:"SiLU/Swish — used in modern models",yt:"https://www.youtube.com/watch?v=o_kkLJzIc0A"},
                {text:"Dying ReLU problem — use LeakyReLU",yt:"https://www.youtube.com/watch?v=aircAruvnKk"},
                {text:"Plot and compare activation functions",yt:"https://www.youtube.com/watch?v=aircAruvnKk"},
              ],
              github:[
                {name:"pytorch/pytorch",url:"https://github.com/pytorch/pytorch",desc:"torch.nn activations",stars:"85k+"},
              ],
              resource:{title:"Activation Functions Comparison",url:"https://ml-cheatsheet.readthedocs.io/en/latest/activation_functions.html"}},
              { id:"5-15-8", text:"LR schedulers: CosineAnnealingLR, OneCycleLR, warmup", tag:"Training", yt:"https://www.youtube.com/watch?v=skwwZQJRGN4", ytLabel:"LR Schedulers", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"CosineAnnealingLR — cosine decay",yt:"https://www.youtube.com/watch?v=QzulmoOg2JE"},
                {text:"OneCycleLR — warmup then decay",yt:"https://www.youtube.com/watch?v=QzulmoOg2JE"},
                {text:"Linear warmup — start slow",yt:"https://www.youtube.com/watch?v=QzulmoOg2JE"},
                {text:"ReduceLROnPlateau — reduce on stall",yt:"https://www.youtube.com/watch?v=QzulmoOg2JE"},
                {text:"Plot LR schedule with matplotlib",yt:"https://www.youtube.com/watch?v=UO98lJQ3QGI"},
              ],
              github:[
                {name:"pytorch/pytorch",url:"https://github.com/pytorch/pytorch",desc:"torch.optim.lr_scheduler",stars:"85k+"},
              ],
              resource:{title:"PyTorch LR Scheduler Docs",url:"https://pytorch.org/docs/stable/optim.html#how-to-adjust-learning-rate"}},
              { id:"5-15-9", text:"Mixed precision training (torch.cuda.amp) — 2x speedup", tag:"Perf", yt:"https://www.youtube.com/watch?v=eFQSyFH9PmY", ytLabel:"Mixed Precision", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"autocast — automatic precision selection",yt:"https://www.youtube.com/watch?v=OqCrNkjN_PM"},
                {text:"GradScaler — scale gradients for FP16",yt:"https://www.youtube.com/watch?v=OqCrNkjN_PM"},
                {text:"FP16 vs BF16 — which to use",yt:"https://www.youtube.com/watch?v=OqCrNkjN_PM"},
                {text:"2x training speedup on modern GPUs",yt:"https://www.youtube.com/watch?v=OqCrNkjN_PM"},
                {text:"Mixed precision with HuggingFace Trainer",yt:"https://www.youtube.com/watch?v=eC6Hd1hFvos"},
              ],
              github:[
                {name:"pytorch/pytorch",url:"https://github.com/pytorch/pytorch",desc:"torch.cuda.amp",stars:"85k+"},
              ],
              resource:{title:"PyTorch AMP Tutorial",url:"https://pytorch.org/tutorials/recipes/recipes/amp_recipe.html"}},
              { id:"5-15-10", text:"Weights & Biases (wandb): experiment tracking, loss curves", tag:"MLOps", yt:"https://www.youtube.com/watch?v=EEqKfWbM8Po", ytLabel:"wandb Tutorial", hindiYt:"https://www.youtube.com/watch?v=9zUHg7xjIqQ", hindiYtLabel:"MLOps Hindi Course (CampusX)",
              subtopics:[
                {text:"wandb.init() — start a run",yt:"https://www.youtube.com/watch?v=krBzBWJ5sD8"},
                {text:"wandb.log() — track metrics",yt:"https://www.youtube.com/watch?v=krBzBWJ5sD8"},
                {text:"wandb.watch() — track gradients",yt:"https://www.youtube.com/watch?v=krBzBWJ5sD8"},
                {text:"Sweeps — hyperparameter search",yt:"https://www.youtube.com/watch?v=krBzBWJ5sD8"},
                {text:"Compare runs — pick best model",yt:"https://www.youtube.com/watch?v=krBzBWJ5sD8"},
              ],
              github:[
                {name:"wandb/wandb",url:"https://github.com/wandb/wandb",desc:"Weights & Biases",stars:"9k+"},
              ],
              resource:{title:"W&B Quickstart",url:"https://docs.wandb.ai/quickstart"}},
            ]
          },
          {
            day: "WED", label: "CNNs",
            resource: "CS231n CNN Notes",
            resourceUrl: "https://cs231n.github.io/",
            chatgpt: "Explain convolutional layers intuitively — what is each filter learning to detect? Build LeNet-5 for MNIST in PyTorch from scratch, explaining every architectural decision.",
            topics: [
              { id:"5-15-11", text:"Conv2d: kernel, stride, padding, output size formula", tag:"CNN", yt:"https://www.youtube.com/watch?v=pDdP0TFzsoQ", ytLabel:"CNNs Explained", hindiYt:"https://www.youtube.com/watch?v=ER2It2mIagI", hindiYtLabel:"CNN Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"Conv2d parameters: in_channels, out_channels, kernel_size",yt:"https://www.youtube.com/watch?v=HGwBXDKFk9I"},
                {text:"Stride and padding — output size formula",yt:"https://www.youtube.com/watch?v=HGwBXDKFk9I"},
                {text:"Feature maps — what each filter detects",yt:"https://www.youtube.com/watch?v=HGwBXDKFk9I"},
                {text:"Conv1d for sequences, Conv3d for video",yt:"https://www.youtube.com/watch?v=HGwBXDKFk9I"},
                {text:"Visualize learned filters",yt:"https://www.youtube.com/watch?v=HGwBXDKFk9I"},
              ],
              github:[
                {name:"pytorch/vision",url:"https://github.com/pytorch/vision",desc:"torchvision CNN models",stars:"17k+"},
              ],
              resource:{title:"CNN Explainer Interactive",url:"https://poloclub.github.io/cnn-explainer/"}},
              { id:"5-15-12", text:"MaxPool, AvgPool, Global Average Pooling, AdaptiveAvgPool", tag:"CNN", yt:"https://www.youtube.com/watch?v=8oOgPUO-TBY", ytLabel:"Pooling Layers", hindiYt:"https://www.youtube.com/watch?v=ER2It2mIagI", hindiYtLabel:"CNN Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"MaxPool2d — take maximum in window",yt:"https://www.youtube.com/watch?v=HGwBXDKFk9I"},
                {text:"AvgPool2d — average in window",yt:"https://www.youtube.com/watch?v=HGwBXDKFk9I"},
                {text:"Global Average Pooling — entire feature map",yt:"https://www.youtube.com/watch?v=dZVkygnKh1M"},
                {text:"AdaptiveAvgPool — output any size",yt:"https://www.youtube.com/watch?v=HGwBXDKFk9I"},
                {text:"Why pooling reduces spatial dimensions",yt:"https://www.youtube.com/watch?v=HGwBXDKFk9I"},
              ],
              github:[
                {name:"pytorch/vision",url:"https://github.com/pytorch/vision",desc:"torchvision",stars:"17k+"},
              ],
              resource:{title:"PyTorch Pooling Docs",url:"https://pytorch.org/docs/stable/nn.html#pooling-layers"}},
              { id:"5-15-13", text:"ResNet skip connections — solving vanishing gradients in CNNs", tag:"CNN", yt:"https://www.youtube.com/watch?v=GWt6Fu05voI", ytLabel:"ResNet Explained", hindiYt:"https://www.youtube.com/watch?v=ER2It2mIagI", hindiYtLabel:"CNN Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"ResNet skip connections — add input to output",yt:"https://www.youtube.com/watch?v=dZVkygnKh1M"},
                {text:"Why residuals fix vanishing gradients",yt:"https://www.youtube.com/watch?v=dZVkygnKh1M"},
                {text:"Identity shortcut vs projection shortcut",yt:"https://www.youtube.com/watch?v=dZVkygnKh1M"},
                {text:"ResNet18 vs ResNet50 vs ResNet152",yt:"https://www.youtube.com/watch?v=dZVkygnKh1M"},
                {text:"Use torchvision.models.resnet18()",yt:"https://www.youtube.com/watch?v=K0lWSB2QoIQ"},
              ],
              github:[
                {name:"pytorch/vision",url:"https://github.com/pytorch/vision",desc:"torchvision ResNet",stars:"17k+"},
              ],
              resource:{title:"Deep Residual Networks Paper",url:"https://arxiv.org/abs/1512.03385"}},
              { id:"5-15-14", text:"Transfer learning: freeze layers, replace head, fine-tune", tag:"Transfer", yt:"https://www.youtube.com/watch?v=LsdxvjLWkIY", ytLabel:"Transfer Learning", hindiYt:"https://www.youtube.com/watch?v=ER2It2mIagI", hindiYtLabel:"Transfer Learning Hindi (CampusX)",
              subtopics:[
                {text:"Freeze all layers except classifier head",yt:"https://www.youtube.com/watch?v=K0lWSB2QoIQ"},
                {text:"Replace final Linear layer — new classes",yt:"https://www.youtube.com/watch?v=K0lWSB2QoIQ"},
                {text:"Fine-tune with small learning rate",yt:"https://www.youtube.com/watch?v=K0lWSB2QoIQ"},
                {text:"Unfreeze layers progressively",yt:"https://www.youtube.com/watch?v=K0lWSB2QoIQ"},
                {text:"Transfer from ImageNet to custom dataset",yt:"https://www.youtube.com/watch?v=K0lWSB2QoIQ"},
              ],
              github:[
                {name:"pytorch/vision",url:"https://github.com/pytorch/vision",desc:"pretrained models",stars:"17k+"},
              ],
              resource:{title:"PyTorch Transfer Learning Tutorial",url:"https://pytorch.org/tutorials/beginner/transfer_learning_tutorial.html"}},
              { id:"5-15-15", text:"torchvision: transforms, datasets, models, data augmentation", tag:"Vision", yt:"https://www.youtube.com/watch?v=l9RVRqYMXco", ytLabel:"torchvision Tutorial", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"torchvision.transforms — augmentation pipeline",yt:"https://www.youtube.com/watch?v=HGwBXDKFk9I"},
                {text:"RandomCrop, RandomHorizontalFlip, ColorJitter",yt:"https://www.youtube.com/watch?v=HGwBXDKFk9I"},
                {text:"Normalize with ImageNet mean/std",yt:"https://www.youtube.com/watch?v=HGwBXDKFk9I"},
                {text:"torchvision.datasets — CIFAR, ImageNet",yt:"https://www.youtube.com/watch?v=ZoZHd0Zm3RY"},
                {text:"torchvision.models — pretrained zoo",yt:"https://www.youtube.com/watch?v=K0lWSB2QoIQ"},
              ],
              github:[
                {name:"pytorch/vision",url:"https://github.com/pytorch/vision",desc:"torchvision transforms",stars:"17k+"},
              ],
              resource:{title:"torchvision Transforms Docs",url:"https://pytorch.org/vision/stable/transforms.html"}},
            ]
          },
          {
            day: "THU", label: "Transformers from Scratch",
            resource: "Karpathy – nanoGPT",
            resourceUrl: "https://github.com/karpathy/nanoGPT",
            chatgpt: "Walk me through implementing a single transformer encoder block from scratch in PyTorch. Explain every line. Why residual connections? What breaks without LayerNorm?",
            topics: [
              { id:"5-15-16", text:"Multi-head self-attention in PyTorch — full implementation", tag:"Transformer", yt:"https://www.youtube.com/watch?v=kCc8FmEb1nY", ytLabel:"Karpathy: Build GPT", hindiYt:"https://www.youtube.com/watch?v=iDulhoQ2pro", hindiYtLabel:"Transformers Hindi (CampusX)",
              subtopics:[
                {text:"Multi-head attention from scratch",yt:"https://www.youtube.com/watch?v=mMa2PmYJlCo"},
                {text:"Split heads — reshape Q K V",yt:"https://www.youtube.com/watch?v=mMa2PmYJlCo"},
                {text:"Parallel attention computation",yt:"https://www.youtube.com/watch?v=mMa2PmYJlCo"},
                {text:"Concatenate and project output",yt:"https://www.youtube.com/watch?v=mMa2PmYJlCo"},
                {text:"nn.MultiheadAttention — PyTorch built-in",yt:"https://www.youtube.com/watch?v=mMa2PmYJlCo"},
              ],
              github:[
                {name:"karpathy/nanoGPT",url:"https://github.com/karpathy/nanoGPT",desc:"Multi-head attention implementation",stars:"38k+"},
              ],
              resource:{title:"Attention Paper — All You Need",url:"https://arxiv.org/abs/1706.03762"}},
              { id:"5-15-17", text:"Positional encoding: sinusoidal and rotary (RoPE)", tag:"Transformer", yt:"https://www.youtube.com/watch?v=dichIcUZfOw", ytLabel:"Positional Encoding", hindiYt:"https://www.youtube.com/watch?v=iDulhoQ2pro", hindiYtLabel:"Transformers Hindi (CampusX)",
              subtopics:[
                {text:"Sinusoidal positional encoding — Vaswani 2017",yt:"https://www.youtube.com/watch?v=GQPOtyITy54"},
                {text:"Learned positional embeddings",yt:"https://www.youtube.com/watch?v=GQPOtyITy54"},
                {text:"RoPE — rotary positional encoding",yt:"https://www.youtube.com/watch?v=GQPOtyITy54"},
                {text:"ALiBi — linear biases for long context",yt:"https://www.youtube.com/watch?v=GQPOtyITy54"},
                {text:"Implement sinusoidal PE in PyTorch",yt:"https://www.youtube.com/watch?v=kCc8FmEb1nY"},
              ],
              github:[
                {name:"karpathy/nanoGPT",url:"https://github.com/karpathy/nanoGPT",desc:"Positional encoding",stars:"38k+"},
              ],
              resource:{title:"Illustrated Positional Encoding",url:"https://kazemnejad.com/blog/transformer_architecture_positional_encoding/"}},
              { id:"5-15-18", text:"Transformer encoder block: MHA + FFN + residuals + LayerNorm", tag:"Transformer", yt:"https://www.youtube.com/watch?v=eMlx5fFNoYc", ytLabel:"Transformer Architecture", hindiYt:"https://www.youtube.com/watch?v=iDulhoQ2pro", hindiYtLabel:"Transformers Hindi (CampusX)",
              subtopics:[
                {text:"Self-attention + residual + LayerNorm",yt:"https://www.youtube.com/watch?v=4Bdc55j80l8"},
                {text:"Feed-forward network: Linear → ReLU/GELU → Linear",yt:"https://www.youtube.com/watch?v=4Bdc55j80l8"},
                {text:"Pre-LayerNorm vs Post-LayerNorm",yt:"https://www.youtube.com/watch?v=4Bdc55j80l8"},
                {text:"Stack N encoder blocks",yt:"https://www.youtube.com/watch?v=4Bdc55j80l8"},
                {text:"Implement full encoder block in PyTorch",yt:"https://www.youtube.com/watch?v=kCc8FmEb1nY"},
              ],
              github:[
                {name:"karpathy/nanoGPT",url:"https://github.com/karpathy/nanoGPT",desc:"Full transformer block",stars:"38k+"},
              ],
              resource:{title:"The Illustrated Transformer",url:"https://jalammar.github.io/illustrated-transformer/"}},
              { id:"5-15-19", text:"Vision Transformer (ViT) — images as token sequences", tag:"ViT", yt:"https://www.youtube.com/watch?v=TrdevFK_am4", ytLabel:"ViT Explained", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"Patch embedding — split image into patches",yt:"https://www.youtube.com/watch?v=TrdevFK_am4"},
                {text:"CLS token — classification token",yt:"https://www.youtube.com/watch?v=TrdevFK_am4"},
                {text:"ViT vs CNN — when ViT wins",yt:"https://www.youtube.com/watch?v=TrdevFK_am4"},
                {text:"Swin Transformer — hierarchical ViT",yt:"https://www.youtube.com/watch?v=TrdevFK_am4"},
                {text:"timm library — 600+ pretrained ViT models",yt:"https://www.youtube.com/watch?v=TrdevFK_am4"},
              ],
              github:[
                {name:"huggingface/transformers",url:"https://github.com/huggingface/transformers",desc:"ViT in HuggingFace",stars:"136k+"},
                {name:"rwightman/pytorch-image-models",url:"https://github.com/rwightman/pytorch-image-models",desc:"timm models",stars:"32k+"},
              ],
              resource:{title:"ViT Paper — An Image is Worth 16x16 Words",url:"https://arxiv.org/abs/2010.11929"}},
              { id:"5-15-20", text:"Flash Attention — memory-efficient attention for long sequences", tag:"Efficiency", yt:"https://www.youtube.com/watch?v=gMOAud7hZg4", ytLabel:"Flash Attention", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"Flash Attention — IO-aware attention",yt:"https://www.youtube.com/watch?v=gMOAud7hZg4"},
                {text:"Reduce HBM reads/writes",yt:"https://www.youtube.com/watch?v=gMOAud7hZg4"},
                {text:"10x memory savings for long sequences",yt:"https://www.youtube.com/watch?v=gMOAud7hZg4"},
                {text:"Flash Attention 2 improvements",yt:"https://www.youtube.com/watch?v=gMOAud7hZg4"},
                {text:"F.scaled_dot_product_attention in PyTorch 2",yt:"https://www.youtube.com/watch?v=kCc8FmEb1nY"},
              ],
              github:[
                {name:"Dao-AILab/flash-attention",url:"https://github.com/Dao-AILab/flash-attention",desc:"Flash Attention",stars:"13k+"},
              ],
              resource:{title:"Flash Attention Paper",url:"https://arxiv.org/abs/2205.14135"}},
            ]
          },
          {
            day: "FRI", label: "HuggingFace Transformers",
            resource: "HuggingFace NLP Course",
            resourceUrl: "https://huggingface.co/learn/nlp-course/chapter1/1",
            chatgpt: "Show me HuggingFace pipeline API for 5 NLP tasks: classification, NER, summarization, translation, QA. For each: when to use pipeline vs custom code, and the performance tradeoffs.",
            topics: [
              { id:"5-15-21", text:"HuggingFace pipeline API — 5 NLP tasks with one function", tag:"HF", yt:"https://www.youtube.com/watch?v=QEaBAZQCtwE", ytLabel:"HuggingFace Pipeline", hindiYt:"https://www.youtube.com/watch?v=lnAtNjBLQKk", hindiYtLabel:"Hugging Face Hindi (Hitesh Choudhary)",
              subtopics:[
                {text:"pipeline('sentiment-analysis') — 1 line inference",yt:"https://www.youtube.com/watch?v=QEaBAZQCtwE"},
                {text:"Text generation pipeline",yt:"https://www.youtube.com/watch?v=QEaBAZQCtwE"},
                {text:"Question answering pipeline",yt:"https://www.youtube.com/watch?v=QEaBAZQCtwE"},
                {text:"Zero-shot classification",yt:"https://www.youtube.com/watch?v=QEaBAZQCtwE"},
                {text:"Translation and summarization pipelines",yt:"https://www.youtube.com/watch?v=QEaBAZQCtwE"},
              ],
              github:[
                {name:"huggingface/transformers",url:"https://github.com/huggingface/transformers",desc:"HuggingFace pipeline",stars:"136k+"},
              ],
              resource:{title:"HuggingFace Pipeline Docs",url:"https://huggingface.co/docs/transformers/main_classes/pipelines"}},
              { id:"5-15-22", text:"AutoTokenizer, AutoModel, AutoModelForSequenceClassification", tag:"HF", yt:"https://www.youtube.com/watch?v=00GKzGyWFEs", ytLabel:"HuggingFace Full Course", hindiYt:"https://www.youtube.com/watch?v=lnAtNjBLQKk", hindiYtLabel:"Hugging Face Hindi (Hitesh Choudhary)",
              subtopics:[
                {text:"AutoTokenizer.from_pretrained() — load tokenizer",yt:"https://www.youtube.com/watch?v=xI0HHN5XKDo"},
                {text:"AutoModel — load any model automatically",yt:"https://www.youtube.com/watch?v=xI0HHN5XKDo"},
                {text:"AutoModelForSequenceClassification",yt:"https://www.youtube.com/watch?v=xI0HHN5XKDo"},
                {text:"Tokenizer inputs: input_ids, attention_mask",yt:"https://www.youtube.com/watch?v=xI0HHN5XKDo"},
                {text:"Move model to GPU: model.to(device)",yt:"https://www.youtube.com/watch?v=7_OPHPKsEP4"},
              ],
              github:[
                {name:"huggingface/transformers",url:"https://github.com/huggingface/transformers",desc:"AutoModel classes",stars:"136k+"},
              ],
              resource:{title:"HuggingFace Auto Classes Docs",url:"https://huggingface.co/docs/transformers/model_doc/auto"}},
              { id:"5-15-23", text:"Trainer API: TrainingArguments, compute_metrics, callbacks", tag:"HF", yt:"https://www.youtube.com/watch?v=u--UVvH-LIQ", ytLabel:"HF Trainer API", hindiYt:"https://www.youtube.com/watch?v=lnAtNjBLQKk", hindiYtLabel:"Hugging Face Hindi (Hitesh Choudhary)",
              subtopics:[
                {text:"TrainingArguments — configure training",yt:"https://www.youtube.com/watch?v=eC6Hd1hFvos"},
                {text:"compute_metrics — custom eval function",yt:"https://www.youtube.com/watch?v=eC6Hd1hFvos"},
                {text:"Trainer.train() — start training",yt:"https://www.youtube.com/watch?v=eC6Hd1hFvos"},
                {text:"Callbacks — log, save, early stop",yt:"https://www.youtube.com/watch?v=eC6Hd1hFvos"},
                {text:"Push to Hub — share fine-tuned model",yt:"https://www.youtube.com/watch?v=eC6Hd1hFvos"},
              ],
              github:[
                {name:"huggingface/transformers",url:"https://github.com/huggingface/transformers",desc:"Trainer API",stars:"136k+"},
              ],
              resource:{title:"HuggingFace Trainer Docs",url:"https://huggingface.co/docs/transformers/main_classes/trainer"}},
              { id:"5-15-24", text:"Datasets library: load_dataset, map, filter, push_to_hub", tag:"HF", yt:"https://www.youtube.com/watch?v=Xq9nD4DZI0I", ytLabel:"HF Datasets", hindiYt:"https://www.youtube.com/watch?v=lnAtNjBLQKk", hindiYtLabel:"Hugging Face Hindi (Hitesh Choudhary)",
              subtopics:[
                {text:"load_dataset('imdb') — 100+ datasets",yt:"https://www.youtube.com/watch?v=_BZearw7f0w"},
                {text:"dataset.map() — preprocess with tokenizer",yt:"https://www.youtube.com/watch?v=_BZearw7f0w"},
                {text:"dataset.filter() — remove bad samples",yt:"https://www.youtube.com/watch?v=_BZearw7f0w"},
                {text:"push_to_hub — share your dataset",yt:"https://www.youtube.com/watch?v=_BZearw7f0w"},
                {text:"dataset.to_pandas() — inspect data",yt:"https://www.youtube.com/watch?v=_BZearw7f0w"},
              ],
              github:[
                {name:"huggingface/datasets",url:"https://github.com/huggingface/datasets",desc:"HuggingFace Datasets",stars:"19k+"},
              ],
              resource:{title:"HuggingFace Datasets Docs",url:"https://huggingface.co/docs/datasets/"}},
              { id:"5-15-25", text:"BERT fine-tuning for text classification — full example", tag:"HF", yt:"https://www.youtube.com/watch?v=x9tIcuYzqeA", ytLabel:"BERT Fine-tuning", hindiYt:"https://www.youtube.com/watch?v=lnAtNjBLQKk", hindiYtLabel:"Hugging Face Hindi (Hitesh Choudhary)",
              subtopics:[
                {text:"Load bert-base-uncased tokenizer",yt:"https://www.youtube.com/watch?v=xI0HHN5XKDo"},
                {text:"Tokenize dataset with max_length=128",yt:"https://www.youtube.com/watch?v=xI0HHN5XKDo"},
                {text:"Fine-tune with TrainingArguments",yt:"https://www.youtube.com/watch?v=eC6Hd1hFvos"},
                {text:"Evaluate on test set — F1 and accuracy",yt:"https://www.youtube.com/watch?v=j-EB6RqqjGI"},
                {text:"Push fine-tuned model to Hub",yt:"https://www.youtube.com/watch?v=eC6Hd1hFvos"},
              ],
              github:[
                {name:"huggingface/transformers",url:"https://github.com/huggingface/transformers",desc:"BERT fine-tuning",stars:"136k+"},
              ],
              resource:{title:"HuggingFace Fine-Tuning Tutorial",url:"https://huggingface.co/docs/transformers/training"}},
            ]
          },
          {
            day: "SAT", label: "DL Project",
            resource: "Kaggle – Deep Learning",
            resourceUrl: "https://www.kaggle.com/learn/deep-learning",
            chatgpt: "Review my PyTorch image classifier [paste code]. Check: data augmentation strategy, model architecture, training loop, overfitting indicators, and deployment readiness.",
            topics: [
              { id:"5-15-26", text:"🏗 BUILD: Image Classifier — EfficientNet fine-tune + wandb", tag:"Project", yt:"https://www.youtube.com/watch?v=LsdxvjLWkIY", ytLabel:"Image Classification", hindiYt:"https://www.youtube.com/watch?v=aqvDTCpNRek", hindiYtLabel:"Python Project Hindi (CodeWithHarry)",
              subtopics:[
                {text:"Load EfficientNet from timm",yt:"https://www.youtube.com/watch?v=K0lWSB2QoIQ"},
                {text:"Custom dataset with ImageFolder",yt:"https://www.youtube.com/watch?v=ZoZHd0Zm3RY"},
                {text:"Fine-tune with W&B logging",yt:"https://www.youtube.com/watch?v=krBzBWJ5sD8"},
                {text:"Data augmentation pipeline",yt:"https://www.youtube.com/watch?v=HGwBXDKFk9I"},
                {text:"Deploy as FastAPI endpoint",yt:"https://www.youtube.com/watch?v=kCc8FmEb1nY"},
              ],
              github:[
                {name:"rwightman/pytorch-image-models",url:"https://github.com/rwightman/pytorch-image-models",desc:"timm models",stars:"32k+"},
              ],
              resource:{title:"timm Documentation",url:"https://timm.fast.ai/"}},
              { id:"5-15-27", text:"🏗 BUILD: Text Sentiment API — fine-tuned BERT + FastAPI", tag:"Project", yt:"https://www.youtube.com/watch?v=x9tIcuYzqeA", ytLabel:"Sentiment Model", hindiYt:"https://www.youtube.com/watch?v=aqvDTCpNRek", hindiYtLabel:"Python Project Hindi (CodeWithHarry)",
              subtopics:[
                {text:"Fine-tune BERT on sentiment dataset",yt:"https://www.youtube.com/watch?v=xI0HHN5XKDo"},
                {text:"Wrap model in FastAPI endpoint",yt:"https://www.youtube.com/watch?v=kCc8FmEb1nY"},
                {text:"POST /predict — text input, label output",yt:"https://www.youtube.com/watch?v=kCc8FmEb1nY"},
                {text:"Containerize with Docker",yt:"https://www.youtube.com/watch?v=Kyx2PkgCVxs"},
                {text:"Deploy to Render or Fly.io",yt:"https://www.youtube.com/watch?v=kCc8FmEb1nY"},
              ],
              github:[
                {name:"tiangolo/fastapi",url:"https://github.com/tiangolo/fastapi",desc:"FastAPI",stars:"80k+"},
              ],
              resource:{title:"FastAPI Official Docs",url:"https://fastapi.tiangolo.com/"}},
              { id:"5-15-28", text:"🏗 BUILD: Implement nanoGPT — train on tiny Shakespeare", tag:"Project", yt:"https://www.youtube.com/watch?v=kCc8FmEb1nY", ytLabel:"Karpathy nanoGPT", hindiYt:"https://www.youtube.com/watch?v=aqvDTCpNRek", hindiYtLabel:"Python Project Hindi (CodeWithHarry)",
              subtopics:[
                {text:"Character-level tokenization",yt:"https://www.youtube.com/watch?v=kCc8FmEb1nY"},
                {text:"Causal language model architecture",yt:"https://www.youtube.com/watch?v=kCc8FmEb1nY"},
                {text:"Train on tiny Shakespeare dataset",yt:"https://www.youtube.com/watch?v=kCc8FmEb1nY"},
                {text:"Sample text with temperature",yt:"https://www.youtube.com/watch?v=kCc8FmEb1nY"},
                {text:"Scale up — what changes at scale",yt:"https://www.youtube.com/watch?v=kCc8FmEb1nY"},
              ],
              github:[
                {name:"karpathy/nanoGPT",url:"https://github.com/karpathy/nanoGPT",desc:"nanoGPT — minimal GPT",stars:"38k+"},
              ],
              resource:{title:"karpathy — Let's Build GPT from Scratch",url:"https://www.youtube.com/watch?v=kCc8FmEb1nY"}},
            ]
          },
          {
            day: "SUN", label: "Review + Optimization",
            resource: "PyTorch Performance Docs",
            resourceUrl: "https://pytorch.org/tutorials/recipes/recipes/tuning_guide.html",
            chatgpt: "Quiz me on deep learning: backpropagation, attention mechanism, transformer architecture, training stability, and hyperparameter tuning. Ask 10 questions with detailed explanations.",
            topics: [
              { id:"5-15-29", text:"Model optimization: ONNX export, TorchScript, quantization", tag:"Optimize", yt:"https://www.youtube.com/watch?v=MuIPAcMBBw0", ytLabel:"Model Optimization", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"torch.onnx.export — export to ONNX",yt:"https://www.youtube.com/watch?v=7_OPHPKsEP4"},
                {text:"TorchScript — serialize for production",yt:"https://www.youtube.com/watch?v=7_OPHPKsEP4"},
                {text:"INT8 quantization — 4x smaller",yt:"https://www.youtube.com/watch?v=OqCrNkjN_PM"},
                {text:"Dynamic quantization for NLP",yt:"https://www.youtube.com/watch?v=OqCrNkjN_PM"},
                {text:"Benchmark: original vs quantized speed",yt:"https://www.youtube.com/watch?v=7_OPHPKsEP4"},
              ],
              github:[
                {name:"pytorch/pytorch",url:"https://github.com/pytorch/pytorch",desc:"PyTorch optimization",stars:"85k+"},
              ],
              resource:{title:"PyTorch Quantization Docs",url:"https://pytorch.org/docs/stable/quantization.html"}},
              { id:"5-15-30", text:"Profile training: torch.profiler, identify bottlenecks", tag:"Perf", yt:"https://www.youtube.com/watch?v=GxCXiSkm6no", ytLabel:"PyTorch Profiler", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)",
              subtopics:[
                {text:"torch.profiler — profile training run",yt:"https://www.youtube.com/watch?v=OqCrNkjN_PM"},
                {text:"TensorBoard profiler plugin",yt:"https://www.youtube.com/watch?v=pSexXMdruFM"},
                {text:"Identify CPU/GPU bottlenecks",yt:"https://www.youtube.com/watch?v=OqCrNkjN_PM"},
                {text:"Memory profiling — find memory leaks",yt:"https://www.youtube.com/watch?v=OqCrNkjN_PM"},
                {text:"nsight systems — NVIDIA profiler",yt:"https://www.youtube.com/watch?v=7_OPHPKsEP4"},
              ],
              github:[
                {name:"pytorch/pytorch",url:"https://github.com/pytorch/pytorch",desc:"torch.profiler",stars:"85k+"},
              ],
              resource:{title:"PyTorch Profiler Tutorial",url:"https://pytorch.org/tutorials/recipes/recipes/profiler_recipe.html"}},
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
              { id:"6-22-1", text:"Tokenization: BPE, WordPiece — use tiktoken to count tokens", tag:"LLM", yt:"https://www.youtube.com/watch?v=kCc8FmEb1nY", ytLabel:"Karpathy: GPT from Scratch", hindiYt:"https://www.youtube.com/watch?v=lnAtNjBLQKk", hindiYtLabel:"LLM Hindi Explained (Hitesh Choudhary)" , subtopics:[{"text": "What are LLMs — transformers simply", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Tokens — how LLMs read text", "yt": "https://www.youtube.com/watch?v=zduSFxRajkE"}, {"text": "Context window — LLM working memory", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "OpenAI vs Anthropic vs Gemini API", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}], github:[{"name": "anthropics/anthropic-sdk-python", "url": "https://github.com/anthropics/anthropic-sdk-python", "desc": "Anthropic SDK", "stars": "2k+"}, {"name": "openai/openai-python", "url": "https://github.com/openai/openai-python", "desc": "OpenAI SDK", "stars": "23k+"}], resource:{"title": "Anthropic API Fundamentals", "url": "https://github.com/anthropics/courses"}, claudeCourse:{"title": "Anthropic API Fundamentals", "url": "https://github.com/anthropics/courses"}},
              { id:"6-22-2", text:"Context windows, KV cache, attention sink in LLMs", tag:"LLM", yt:"https://www.youtube.com/watch?v=AhyznRSDjw8", ytLabel:"LLM Context Window", hindiYt:"https://www.youtube.com/watch?v=lnAtNjBLQKk", hindiYtLabel:"LLM Hindi Explained (Hitesh Choudhary)" , subtopics:[{"text": "System vs user vs assistant messages", "yt": "https://www.youtube.com/watch?v=pR31q4o7RIw"}, {"text": "Specificity — clear prompts get better output", "yt": "https://www.youtube.com/watch?v=pR31q4o7RIw"}, {"text": "Chain-of-thought: think step by step", "yt": "https://www.youtube.com/watch?v=pR31q4o7RIw"}, {"text": "Few-shot prompting — show examples", "yt": "https://www.youtube.com/watch?v=pR31q4o7RIw"}], github:[{"name": "anthropics/courses", "url": "https://github.com/anthropics/courses", "desc": "Prompt Eng Tutorial", "stars": "8k+"}, {"name": "dair-ai/Prompt-Engineering-Guide", "url": "https://github.com/dair-ai/Prompt-Engineering-Guide", "desc": "Prompt guide", "stars": "52k+"}], resource:{"title": "Anthropic Prompt Eng Tutorial", "url": "https://github.com/anthropics/courses"}, claudeCourse:{"title": "Prompt Engineering Interactive Tutorial", "url": "https://github.com/anthropics/courses/tree/main/prompt_engineering_interactive_tutorial"}},
              { id:"6-22-3", text:"Autoregressive generation: greedy, beam, top-k, top-p, temp", tag:"LLM", yt:"https://www.youtube.com/watch?v=8MT7Z6qFvzQ", ytLabel:"LLM Sampling", hindiYt:"https://www.youtube.com/watch?v=lnAtNjBLQKk", hindiYtLabel:"LLM Hindi Explained (Hitesh Choudhary)" , subtopics:[{"text": "Pydantic models as output schemas", "yt": "https://www.youtube.com/watch?v=yj-wSRJwrrc"}, {"text": "OpenAI response_format structured", "yt": "https://www.youtube.com/watch?v=yj-wSRJwrrc"}, {"text": "Instructor library — any LLM structured", "yt": "https://www.youtube.com/watch?v=yj-wSRJwrrc"}, {"text": "Parse and validate JSON from LLMs", "yt": "https://www.youtube.com/watch?v=yj-wSRJwrrc"}], github:[{"name": "jxnl/instructor", "url": "https://github.com/jxnl/instructor", "desc": "Structured outputs", "stars": "9k+"}, {"name": "openai/openai-cookbook", "url": "https://github.com/openai/openai-cookbook", "desc": "OpenAI examples", "stars": "62k+"}], resource:{"title": "Instructor Docs", "url": "https://python.useinstructor.com/"}},
              { id:"6-22-4", text:"LLM landscape 2026: GPT-4o, Claude 3.5, Gemini, Llama-3, Mistral", tag:"LLM", yt:"https://www.youtube.com/watch?v=zjkBMFhNj_g", ytLabel:"LLM Comparison", hindiYt:"https://www.youtube.com/watch?v=lnAtNjBLQKk", hindiYtLabel:"LLM Hindi Explained (Hitesh Choudhary)" , subtopics:[{"text": "Define tools with JSON schema", "yt": "https://www.youtube.com/watch?v=aqdWSYWC_LI"}, {"text": "5-step tool call loop explained", "yt": "https://www.youtube.com/watch?v=aqdWSYWC_LI"}, {"text": "Parse tool_use and run function", "yt": "https://www.youtube.com/watch?v=aqdWSYWC_LI"}, {"text": "Parallel tool calls — multiple at once", "yt": "https://www.youtube.com/watch?v=aqdWSYWC_LI"}], github:[{"name": "anthropics/courses", "url": "https://github.com/anthropics/courses", "desc": "Tool Use Course", "stars": "8k+"}, {"name": "openai/openai-cookbook", "url": "https://github.com/openai/openai-cookbook", "desc": "Function calling examples", "stars": "62k+"}], resource:{"title": "Anthropic Tool Use Docs", "url": "https://docs.anthropic.com/en/docs/build-with-claude/tool-use"}, claudeCourse:{"title": "Tool Use Course", "url": "https://github.com/anthropics/courses/tree/main/tool_use"}},
              { id:"6-22-5", text:"OpenAI & Anthropic API setup, cost estimation, rate limits", tag:"API", yt:"https://www.youtube.com/watch?v=OB99E7Y1cMA", ytLabel:"OpenAI API Quickstart", hindiYt:"https://www.youtube.com/watch?v=0sOvCWFmrtA", hindiYtLabel:"FastAPI Hindi Tutorial (Hitesh Choudhary)" , subtopics:[{"text": "stream=True — enable streaming", "yt": "https://www.youtube.com/watch?v=YiT-qYsOBhA"}, {"text": "Iterate over delta chunks", "yt": "https://www.youtube.com/watch?v=YiT-qYsOBhA"}, {"text": "StreamingResponse in FastAPI", "yt": "https://www.youtube.com/watch?v=YiT-qYsOBhA"}, {"text": "Server-Sent Events — how it works", "yt": "https://www.youtube.com/watch?v=YiT-qYsOBhA"}], github:[{"name": "anthropics/anthropic-sdk-python", "url": "https://github.com/anthropics/anthropic-sdk-python", "desc": "Streaming examples", "stars": "2k+"}], resource:{"title": "Anthropic Streaming Docs", "url": "https://docs.anthropic.com/en/api/messages-streaming"}},
            ]
          },
          {
            day: "TUE", label: "OpenAI API Mastery",
            resource: "OpenAI API Docs",
            resourceUrl: "https://platform.openai.com/docs",
            chatgpt: "Show me OpenAI function calling with a real example: a weather assistant that calls a mock API. Include: tool schema definition, response parsing, calling the function, returning results to the model.",
            topics: [
              { id:"6-22-6", text:"Chat Completions API: system/user/assistant roles, messages", tag:"API", yt:"https://www.youtube.com/watch?v=OB99E7Y1cMA", ytLabel:"OpenAI API Tutorial", hindiYt:"https://www.youtube.com/watch?v=0sOvCWFmrtA", hindiYtLabel:"FastAPI Hindi Tutorial (Hitesh Choudhary)" , subtopics:[{"text": "Messages array — conversation history", "yt": "https://www.youtube.com/watch?v=NiQ_9xwS4v8"}, {"text": "Append user and assistant messages", "yt": "https://www.youtube.com/watch?v=NiQ_9xwS4v8"}, {"text": "Context window limits — truncate strategy", "yt": "https://www.youtube.com/watch?v=NiQ_9xwS4v8"}, {"text": "Multi-turn chatbot implementation", "yt": "https://www.youtube.com/watch?v=NiQ_9xwS4v8"}], github:[{"name": "openai/openai-cookbook", "url": "https://github.com/openai/openai-cookbook", "desc": "Conversation management", "stars": "62k+"}], resource:{"title": "OpenAI Chat Completions Guide", "url": "https://platform.openai.com/docs/guides/conversation-state"}},
              { id:"6-22-7", text:"Function calling / tool use — structured JSON outputs", tag:"API", yt:"https://www.youtube.com/watch?v=0lOSvOoF2to", ytLabel:"OpenAI Function Calling", hindiYt:"https://www.youtube.com/watch?v=0sOvCWFmrtA", hindiYtLabel:"FastAPI Hindi Tutorial (Hitesh Choudhary)" , subtopics:[{"text": "Input vs output tokens — pricing", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Estimate tokens before sending", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Choose cheaper models for simple tasks", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "tiktoken — count tokens in code", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}], github:[{"name": "openai/tiktoken", "url": "https://github.com/openai/tiktoken", "desc": "Token counter", "stars": "12k+"}], resource:{"title": "Anthropic Pricing", "url": "https://www.anthropic.com/pricing"}},
              { id:"6-22-8", text:"Streaming responses with SSE — token-by-token display", tag:"API", yt:"https://www.youtube.com/watch?v=GlF5cQMpVCI", ytLabel:"OpenAI Streaming", hindiYt:"https://www.youtube.com/watch?v=0sOvCWFmrtA", hindiYtLabel:"FastAPI Hindi Tutorial (Hitesh Choudhary)" , subtopics:[{"text": "Rate limits — 429 and backoff", "yt": "https://www.youtube.com/watch?v=NiQ_9xwS4v8"}, {"text": "Exponential backoff with tenacity", "yt": "https://www.youtube.com/watch?v=NiQ_9xwS4v8"}, {"text": "Handle malformed JSON gracefully", "yt": "https://www.youtube.com/watch?v=NiQ_9xwS4v8"}, {"text": "Fallback strategies — retry different model", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}], github:[{"name": "jd/tenacity", "url": "https://github.com/jd/tenacity", "desc": "Python retry library", "stars": "6k+"}], resource:{"title": "Anthropic Error Docs", "url": "https://docs.anthropic.com/en/api/errors"}},
              { id:"6-22-9", text:"Instructor library — structured Pydantic outputs from LLMs", tag:"Structured", yt:"https://www.youtube.com/watch?v=yj-wSRJwrrc", ytLabel:"Instructor Library", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "Prompt injection — #1 LLM security risk", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Direct vs indirect injection attacks", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Input validation strategies", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Principle of least privilege for tools", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}], github:[{"name": "anthropics/courses", "url": "https://github.com/anthropics/courses", "desc": "Security best practices", "stars": "8k+"}], resource:{"title": "OWASP LLM Top 10", "url": "https://genai.owasp.org/llmrisk/llm01-prompt-injection/"}},
              { id:"6-22-10", text:"Anthropic Claude API: messages, vision, tool use, system prompt", tag:"API", yt:"https://www.youtube.com/watch?v=QGHIBnmxWpk", ytLabel:"Claude API Tutorial", hindiYt:"https://www.youtube.com/watch?v=0sOvCWFmrtA", hindiYtLabel:"FastAPI Hindi Tutorial (Hitesh Choudhary)" , subtopics:[{"text": "What are embeddings — vector representations", "yt": "https://www.youtube.com/watch?v=ySus5ZS0b94"}, {"text": "Semantic similarity — cosine distance", "yt": "https://www.youtube.com/watch?v=ySus5ZS0b94"}, {"text": "OpenAI text-embedding-3-small", "yt": "https://www.youtube.com/watch?v=ySus5ZS0b94"}, {"text": "Sentence transformers — free local embeddings", "yt": "https://www.youtube.com/watch?v=ySus5ZS0b94"}], github:[{"name": "UKPLab/sentence-transformers", "url": "https://github.com/UKPLab/sentence-transformers", "desc": "Sentence embeddings", "stars": "15k+"}], resource:{"title": "OpenAI Embeddings Guide", "url": "https://platform.openai.com/docs/guides/embeddings"}},
            ]
          },
          {
            day: "WED", label: "Prompt Engineering Pro",
            resource: "DeepLearning.AI – Prompt Engineering",
            resourceUrl: "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/",
            chatgpt: "I need to extract structured data (name, date, amount, category) from messy invoice text. Show me 3 prompting strategies: few-shot, chain-of-thought, and JSON mode. Compare reliability of each.",
            topics: [
              { id:"6-22-11", text:"Zero-shot, few-shot prompting — when each works best", tag:"Prompting", yt:"https://www.youtube.com/watch?v=dOxUroR57xs", ytLabel:"Prompt Engineering", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "LLM fundamentals", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Anthropic API usage", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Practical implementation", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Best practices", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}], github:[{"name": "anthropics/courses", "url": "https://github.com/anthropics/courses", "desc": "Anthropic courses", "stars": "8k+"}], resource:{"title": "Anthropic Documentation", "url": "https://docs.anthropic.com"}},
              { id:"6-22-12", text:"Chain-of-Thought (CoT) prompting — reasoning step by step", tag:"Prompting", yt:"https://www.youtube.com/watch?v=bSvTVREwSNw", ytLabel:"Chain of Thought", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "LLM fundamentals", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Anthropic API usage", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Practical implementation", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Best practices", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}], github:[{"name": "anthropics/courses", "url": "https://github.com/anthropics/courses", "desc": "Anthropic courses", "stars": "8k+"}], resource:{"title": "Anthropic Documentation", "url": "https://docs.anthropic.com"}},
              { id:"6-22-13", text:"ReAct pattern: Reason + Act loop for agent-like behavior", tag:"Prompting", yt:"https://www.youtube.com/watch?v=Eug2clsLtFs", ytLabel:"ReAct Pattern", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "LLM fundamentals", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Anthropic API usage", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Practical implementation", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Best practices", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}], github:[{"name": "anthropics/courses", "url": "https://github.com/anthropics/courses", "desc": "Anthropic courses", "stars": "8k+"}], resource:{"title": "Anthropic Documentation", "url": "https://docs.anthropic.com"}},
              { id:"6-22-14", text:"System prompt design: persona, constraints, output format", tag:"Prompting", yt:"https://www.youtube.com/watch?v=jC4v5AS4RIM", ytLabel:"System Prompts", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "LLM fundamentals", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Anthropic API usage", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Practical implementation", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Best practices", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}], github:[{"name": "anthropics/courses", "url": "https://github.com/anthropics/courses", "desc": "Anthropic courses", "stars": "8k+"}], resource:{"title": "Anthropic Documentation", "url": "https://docs.anthropic.com"}},
              { id:"6-22-15", text:"Prompt injection attacks — defense strategies", tag:"Security", yt:"https://www.youtube.com/watch?v=Sv5OLj2nVAQ", ytLabel:"Prompt Injection", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "LLM fundamentals", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Anthropic API usage", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Practical implementation", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Best practices", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}], github:[{"name": "anthropics/courses", "url": "https://github.com/anthropics/courses", "desc": "Anthropic courses", "stars": "8k+"}], resource:{"title": "Anthropic Documentation", "url": "https://docs.anthropic.com"}},
            ]
          },
          {
            day: "THU", label: "Embeddings & Vector Search",
            resource: "Sentence Transformers Docs",
            resourceUrl: "https://sbert.net/",
            chatgpt: "Build a semantic search system from scratch: embed 100 docs, store in FAISS, query by meaning. When should I use FAISS locally vs Pinecone managed? Include cost comparison.",
            topics: [
              { id:"6-22-16", text:"OpenAI text-embedding-3 API — embed text for semantic search", tag:"Embeddings", yt:"https://www.youtube.com/watch?v=viZrOnJclY0", ytLabel:"Embeddings Explained", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "LLM fundamentals", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Anthropic API usage", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Practical implementation", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Best practices", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}], github:[{"name": "anthropics/courses", "url": "https://github.com/anthropics/courses", "desc": "Anthropic courses", "stars": "8k+"}], resource:{"title": "Anthropic Documentation", "url": "https://docs.anthropic.com"}},
              { id:"6-22-17", text:"Sentence Transformers: all-MiniLM, BGE-M3, E5-large", tag:"Embeddings", yt:"https://www.youtube.com/watch?v=L39rN6gz7Y", ytLabel:"Sentence Transformers", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "LLM fundamentals", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Anthropic API usage", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Practical implementation", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Best practices", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}], github:[{"name": "anthropics/courses", "url": "https://github.com/anthropics/courses", "desc": "Anthropic courses", "stars": "8k+"}], resource:{"title": "Anthropic Documentation", "url": "https://docs.anthropic.com"}},
              { id:"6-22-18", text:"FAISS: IndexFlatL2, IndexIVFFlat, IndexHNSWFlat — local search", tag:"VectorDB", yt:"https://www.youtube.com/watch?v=sKyvsdEv6rk", ytLabel:"FAISS Tutorial", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "LLM fundamentals", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Anthropic API usage", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Practical implementation", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Best practices", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}], github:[{"name": "anthropics/courses", "url": "https://github.com/anthropics/courses", "desc": "Anthropic courses", "stars": "8k+"}], resource:{"title": "Anthropic Documentation", "url": "https://docs.anthropic.com"}},
              { id:"6-22-19", text:"ChromaDB: persist, collection, query, metadata filtering", tag:"VectorDB", yt:"https://www.youtube.com/watch?v=QdDoFfkVkcw", ytLabel:"ChromaDB Tutorial", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "LLM fundamentals", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Anthropic API usage", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Practical implementation", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Best practices", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}], github:[{"name": "anthropics/courses", "url": "https://github.com/anthropics/courses", "desc": "Anthropic courses", "stars": "8k+"}], resource:{"title": "Anthropic Documentation", "url": "https://docs.anthropic.com"}},
              { id:"6-22-20", text:"Pinecone: namespaces, upsert, query, pod vs serverless", tag:"VectorDB", yt:"https://www.youtube.com/watch?v=dRUIGgNBvVk", ytLabel:"Pinecone Tutorial", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "LLM fundamentals", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Anthropic API usage", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Practical implementation", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Best practices", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}], github:[{"name": "anthropics/courses", "url": "https://github.com/anthropics/courses", "desc": "Anthropic courses", "stars": "8k+"}], resource:{"title": "Anthropic Documentation", "url": "https://docs.anthropic.com"}},
            ]
          },
          {
            day: "FRI", label: "LangChain & LlamaIndex",
            resource: "LangChain Docs",
            resourceUrl: "https://python.langchain.com/docs/",
            chatgpt: "Compare LangChain vs LlamaIndex for a RAG pipeline over 500 PDFs. Show the same pipeline built with both frameworks side by side. Which would you use in production and why?",
            topics: [
              { id:"6-22-21", text:"LangChain LCEL: pipe operator, Runnable, RunnableParallel", tag:"LangChain", yt:"https://www.youtube.com/watch?v=RoR4XJw8wIc", ytLabel:"LangChain LCEL", hindiYt:"https://www.youtube.com/watch?v=lG7Uxts9SXs", hindiYtLabel:"LangChain Hindi (Hitesh Choudhary)" , subtopics:[{"text": "LLM fundamentals", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Anthropic API usage", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Practical implementation", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Best practices", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}], github:[{"name": "anthropics/courses", "url": "https://github.com/anthropics/courses", "desc": "Anthropic courses", "stars": "8k+"}], resource:{"title": "Anthropic Documentation", "url": "https://docs.anthropic.com"}},
              { id:"6-22-22", text:"ChatPromptTemplate, MessagesPlaceholder, SystemMessage", tag:"LangChain", yt:"https://www.youtube.com/watch?v=mrjq3lFz23s", ytLabel:"LangChain Prompts", hindiYt:"https://www.youtube.com/watch?v=lG7Uxts9SXs", hindiYtLabel:"LangChain Hindi (Hitesh Choudhary)" , subtopics:[{"text": "LLM fundamentals", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Anthropic API usage", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Practical implementation", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Best practices", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}], github:[{"name": "anthropics/courses", "url": "https://github.com/anthropics/courses", "desc": "Anthropic courses", "stars": "8k+"}], resource:{"title": "Anthropic Documentation", "url": "https://docs.anthropic.com"}},
              { id:"6-22-23", text:"Memory: ConversationBuffer, ConversationSummary, Redis-backed", tag:"LangChain", yt:"https://www.youtube.com/watch?v=X550Zbz_ROE", ytLabel:"LangChain Memory", hindiYt:"https://www.youtube.com/watch?v=lG7Uxts9SXs", hindiYtLabel:"LangChain Hindi (Hitesh Choudhary)" , subtopics:[{"text": "LLM fundamentals", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Anthropic API usage", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Practical implementation", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Best practices", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}], github:[{"name": "anthropics/courses", "url": "https://github.com/anthropics/courses", "desc": "Anthropic courses", "stars": "8k+"}], resource:{"title": "Anthropic Documentation", "url": "https://docs.anthropic.com"}},
              { id:"6-22-24", text:"LlamaIndex: VectorStoreIndex, query engines, retrievers", tag:"LlamaIndex", yt:"https://www.youtube.com/watch?v=LWZ1lMrEpcc", ytLabel:"LlamaIndex Tutorial", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "LLM fundamentals", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Anthropic API usage", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Practical implementation", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Best practices", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}], github:[{"name": "anthropics/courses", "url": "https://github.com/anthropics/courses", "desc": "Anthropic courses", "stars": "8k+"}], resource:{"title": "Anthropic Documentation", "url": "https://docs.anthropic.com"}},
              { id:"6-22-25", text:"Document loaders: PDF, web, YouTube, Notion, Confluence", tag:"Loaders", yt:"https://www.youtube.com/watch?v=hhGkM-rlc-k", ytLabel:"Document Loaders", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "LLM fundamentals", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Anthropic API usage", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Practical implementation", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Best practices", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}], github:[{"name": "anthropics/courses", "url": "https://github.com/anthropics/courses", "desc": "Anthropic courses", "stars": "8k+"}], resource:{"title": "Anthropic Documentation", "url": "https://docs.anthropic.com"}},
            ]
          },
          {
            day: "SAT", label: "RAG Systems",
            resource: "DeepLearning.AI – RAG Course",
            resourceUrl: "https://www.deeplearning.ai/short-courses/building-evaluating-advanced-rag/",
            chatgpt: "Explain chunking strategies for RAG. Compare: fixed-size, sentence, recursive, semantic chunking. Show me how chunk size and overlap affect retrieval quality with a concrete test.",
            topics: [
              { id:"6-22-26", text:"RAG pipeline: load → chunk → embed → store → retrieve → gen", tag:"RAG", yt:"https://www.youtube.com/watch?v=tcqEUSNCn8I", ytLabel:"RAG from Scratch", hindiYt:"https://www.youtube.com/watch?v=lnAtNjBLQKk", hindiYtLabel:"RAG Pipeline Hindi (Hitesh Choudhary)" , subtopics:[{"text": "LLM fundamentals", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Anthropic API usage", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Practical implementation", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Best practices", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}], github:[{"name": "anthropics/courses", "url": "https://github.com/anthropics/courses", "desc": "Anthropic courses", "stars": "8k+"}], resource:{"title": "Anthropic Documentation", "url": "https://docs.anthropic.com"}},
              { id:"6-22-27", text:"Chunking: RecursiveCharacter, semantic, sentence splitters", tag:"RAG", yt:"https://www.youtube.com/watch?v=8OJC21T2SL4", ytLabel:"RAG Chunking", hindiYt:"https://www.youtube.com/watch?v=lnAtNjBLQKk", hindiYtLabel:"RAG Pipeline Hindi (Hitesh Choudhary)" , subtopics:[{"text": "LLM fundamentals", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Anthropic API usage", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Practical implementation", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Best practices", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}], github:[{"name": "anthropics/courses", "url": "https://github.com/anthropics/courses", "desc": "Anthropic courses", "stars": "8k+"}], resource:{"title": "Anthropic Documentation", "url": "https://docs.anthropic.com"}},
              { id:"6-22-28", text:"Hybrid search: dense + BM25 sparse — beats dense alone", tag:"RAG", yt:"https://www.youtube.com/watch?v=zILF3wzbaco", ytLabel:"Hybrid Search RAG", hindiYt:"https://www.youtube.com/watch?v=lnAtNjBLQKk", hindiYtLabel:"RAG Pipeline Hindi (Hitesh Choudhary)" , subtopics:[{"text": "LLM fundamentals", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Anthropic API usage", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Practical implementation", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Best practices", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}], github:[{"name": "anthropics/courses", "url": "https://github.com/anthropics/courses", "desc": "Anthropic courses", "stars": "8k+"}], resource:{"title": "Anthropic Documentation", "url": "https://docs.anthropic.com"}},
              { id:"6-22-29", text:"Re-ranking: Cohere Rerank, cross-encoder models", tag:"RAG", yt:"https://www.youtube.com/watch?v=o6e0SFJZ60c", ytLabel:"RAG Reranking", hindiYt:"https://www.youtube.com/watch?v=lnAtNjBLQKk", hindiYtLabel:"RAG Pipeline Hindi (Hitesh Choudhary)" , subtopics:[{"text": "LLM fundamentals", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Anthropic API usage", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Practical implementation", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Best practices", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}], github:[{"name": "anthropics/courses", "url": "https://github.com/anthropics/courses", "desc": "Anthropic courses", "stars": "8k+"}], resource:{"title": "Anthropic Documentation", "url": "https://docs.anthropic.com"}},
              { id:"6-22-30", text:"RAG evaluation: RAGAS — faithfulness, relevancy, recall", tag:"RAG Eval", yt:"https://www.youtube.com/watch?v=1FiLNnZ1Yys", ytLabel:"RAGAS Evaluation", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "LLM fundamentals", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Anthropic API usage", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Practical implementation", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Best practices", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}], github:[{"name": "anthropics/courses", "url": "https://github.com/anthropics/courses", "desc": "Anthropic courses", "stars": "8k+"}], resource:{"title": "Anthropic Documentation", "url": "https://docs.anthropic.com"}},
            ]
          },
          {
            day: "SUN", label: "LLM Projects",
            resource: "LangSmith Docs",
            resourceUrl: "https://docs.smith.langchain.com/",
            chatgpt: "Review my RAG pipeline [paste code]. Check: chunking strategy, embedding model choice, retrieval precision, prompt template quality, and how to add LangSmith tracing.",
            topics: [
              { id:"6-22-31", text:"🏗 BUILD: PDF Q&A System with citations (Streamlit UI)", tag:"Project", yt:"https://www.youtube.com/watch?v=dXxQ0LR-3Hg", ytLabel:"PDF Q&A Tutorial", hindiYt:"https://www.youtube.com/watch?v=aqvDTCpNRek", hindiYtLabel:"Python Project Hindi (CodeWithHarry)" , subtopics:[{"text": "LLM fundamentals", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Anthropic API usage", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Practical implementation", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Best practices", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}], github:[{"name": "anthropics/courses", "url": "https://github.com/anthropics/courses", "desc": "Anthropic courses", "stars": "8k+"}], resource:{"title": "Anthropic Documentation", "url": "https://docs.anthropic.com"}},
              { id:"6-22-32", text:"🏗 BUILD: AI Chatbot with persistent memory + streaming", tag:"Project", yt:"https://www.youtube.com/watch?v=pppnwp8WDDI", ytLabel:"LangChain Chatbot", hindiYt:"https://www.youtube.com/watch?v=aqvDTCpNRek", hindiYtLabel:"Python Project Hindi (CodeWithHarry)" , subtopics:[{"text": "LLM fundamentals", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Anthropic API usage", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Practical implementation", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Best practices", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}], github:[{"name": "anthropics/courses", "url": "https://github.com/anthropics/courses", "desc": "Anthropic courses", "stars": "8k+"}], resource:{"title": "Anthropic Documentation", "url": "https://docs.anthropic.com"}},
              { id:"6-22-33", text:"Add LangSmith tracing — debug and evaluate your RAG", tag:"Monitoring", yt:"https://www.youtube.com/watch?v=Hab2CV_0hpQ", ytLabel:"LangSmith Tutorial", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "LLM fundamentals", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Anthropic API usage", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Practical implementation", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Best practices", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}], github:[{"name": "anthropics/courses", "url": "https://github.com/anthropics/courses", "desc": "Anthropic courses", "stars": "8k+"}], resource:{"title": "Anthropic Documentation", "url": "https://docs.anthropic.com"}},
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
              { id:"7-29-1", text:"ReAct pattern: Thought → Action → Observation loop", tag:"Agents", yt:"https://www.youtube.com/watch?v=Eug2clsLtFs", ytLabel:"ReAct Agents", hindiYt:"https://www.youtube.com/watch?v=lG7Uxts9SXs", hindiYtLabel:"AI Agents Hindi (Hitesh Choudhary)" , subtopics:[{"text": "Agent loop: perceive→plan→act→observe", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "Build agent from scratch no framework", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "When to use agents vs workflows vs single call", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "Anthropic — Building Effective Agents guide", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}], github:[{"name": "langchain-ai/langgraph", "url": "https://github.com/langchain-ai/langgraph", "desc": "Agent orchestration", "stars": "10k+"}, {"name": "microsoft/autogen", "url": "https://github.com/microsoft/autogen", "desc": "Multi-agent framework", "stars": "35k+"}], resource:{"title": "Anthropic — Building Effective Agents", "url": "https://www.anthropic.com/research/building-effective-agents"}, claudeCourse:{"title": "Model Context Protocol (MCP)", "url": "https://anthropic.skilljar.com"}},
              { id:"7-29-2", text:"Tool definition: @tool decorator, StructuredTool, BaseTool", tag:"Tools", yt:"https://www.youtube.com/watch?v=Yw5MDpnSIZs", ytLabel:"LangChain Tools", hindiYt:"https://www.youtube.com/watch?v=lG7Uxts9SXs", hindiYtLabel:"LLM Tools Hindi (Hitesh Choudhary)" , subtopics:[{"text": "LangGraph nodes and edges", "yt": "https://www.youtube.com/watch?v=R-o_a6dvzQM"}, {"text": "StateGraph — shared state across nodes", "yt": "https://www.youtube.com/watch?v=R-o_a6dvzQM"}, {"text": "Conditional edges — branching logic", "yt": "https://www.youtube.com/watch?v=R-o_a6dvzQM"}, {"text": "Human-in-the-loop — pause for approval", "yt": "https://www.youtube.com/watch?v=R-o_a6dvzQM"}], github:[{"name": "langchain-ai/langgraph", "url": "https://github.com/langchain-ai/langgraph", "desc": "LangGraph", "stars": "10k+"}], resource:{"title": "LangChain Academy Free Course", "url": "https://academy.langchain.com/courses/intro-to-langgraph"}},
              { id:"7-29-3", text:"LangGraph: StateGraph, nodes, edges, conditional routing", tag:"LangGraph", yt:"https://www.youtube.com/watch?v=R-o_a6dvzQM", ytLabel:"LangGraph Tutorial", hindiYt:"https://www.youtube.com/watch?v=lG7Uxts9SXs", hindiYtLabel:"LangGraph Hindi (Hitesh Choudhary)" , subtopics:[{"text": "Write tool names as self-explanatory verbs", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "Descriptions: when AND how to call", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "Minimal parameters — well-typed", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "Test every tool description rigorously", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}], github:[{"name": "anthropics/courses", "url": "https://github.com/anthropics/courses", "desc": "Tool design patterns", "stars": "8k+"}], resource:{"title": "Anthropic Tool Use Best Practices", "url": "https://docs.anthropic.com/en/docs/build-with-claude/tool-use"}},
              { id:"7-29-4", text:"Agent memory: short-term (history) + long-term (vector store)", tag:"Memory", yt:"https://www.youtube.com/watch?v=X550Zbz_ROE", ytLabel:"Agent Memory", hindiYt:"https://www.youtube.com/watch?v=lG7Uxts9SXs", hindiYtLabel:"Agent Memory Hindi (Hitesh Choudhary)" , subtopics:[{"text": "TypedDict state schema in LangGraph", "yt": "https://www.youtube.com/watch?v=R-o_a6dvzQM"}, {"text": "Reducers — merge parallel state updates", "yt": "https://www.youtube.com/watch?v=R-o_a6dvzQM"}, {"text": "Persisted checkpointing — survive crashes", "yt": "https://www.youtube.com/watch?v=R-o_a6dvzQM"}, {"text": "Memory: in-memory vs Redis vs DB", "yt": "https://www.youtube.com/watch?v=R-o_a6dvzQM"}], github:[{"name": "langchain-ai/langgraph", "url": "https://github.com/langchain-ai/langgraph", "desc": "State management", "stars": "10k+"}], resource:{"title": "LangGraph State Docs", "url": "https://langchain-ai.github.io/langgraph/concepts/low_level/#state"}},
              { id:"7-29-5", text:"Human-in-the-loop: interrupt nodes, approval gates", tag:"HITL", yt:"https://www.youtube.com/watch?v=l1qi7iRPkss", ytLabel:"LangGraph HITL", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "Max iterations — prevent infinite loops", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "Per-tool retry with exponential backoff", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "Catch exceptions without crashing agent", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "When to surface error to user", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}], github:[{"name": "langchain-ai/langgraph", "url": "https://github.com/langchain-ai/langgraph", "desc": "Error handling", "stars": "10k+"}], resource:{"title": "LangGraph Error Handling", "url": "https://langchain-ai.github.io/langgraph/how-tos/autofill-tool-errors/"}},
            ]
          },
          {
            day: "TUE", label: "Agent Tools",
            resource: "Tavily Search API",
            resourceUrl: "https://tavily.com/",
            chatgpt: "Show me how to build 5 production-grade custom tools for a LangChain agent: database query, REST API caller, file processor, Python REPL, and email sender. Include proper error handling.",
            topics: [
              { id:"7-29-6", text:"Web search: Tavily API — best LLM-optimized search tool", tag:"Tools", yt:"https://www.youtube.com/watch?v=uRQH2CFvedY", ytLabel:"Tavily + LangChain", hindiYt:"https://www.youtube.com/watch?v=lG7Uxts9SXs", hindiYtLabel:"LLM Tools Hindi (Hitesh Choudhary)" , subtopics:[{"text": "Agent architecture patterns", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "LangGraph implementation", "yt": "https://www.youtube.com/watch?v=R-o_a6dvzQM"}, {"text": "Tool design best practices", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "Testing and evaluation", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}], github:[{"name": "langchain-ai/langgraph", "url": "https://github.com/langchain-ai/langgraph", "desc": "LangGraph", "stars": "10k+"}], resource:{"title": "Anthropic — Building Effective Agents", "url": "https://www.anthropic.com/research/building-effective-agents"}},
              { id:"7-29-7", text:"Code execution: Python REPL, E2B sandboxed code runner", tag:"Tools", yt:"https://www.youtube.com/watch?v=Z5mZFPvLPkk", ytLabel:"Code Execution Agent", hindiYt:"https://www.youtube.com/watch?v=lG7Uxts9SXs", hindiYtLabel:"LLM Tools Hindi (Hitesh Choudhary)" , subtopics:[{"text": "Agent architecture patterns", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "LangGraph implementation", "yt": "https://www.youtube.com/watch?v=R-o_a6dvzQM"}, {"text": "Tool design best practices", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "Testing and evaluation", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}], github:[{"name": "langchain-ai/langgraph", "url": "https://github.com/langchain-ai/langgraph", "desc": "LangGraph", "stars": "10k+"}], resource:{"title": "Anthropic — Building Effective Agents", "url": "https://www.anthropic.com/research/building-effective-agents"}},
              { id:"7-29-8", text:"SQL agent: nl2sql, query databases with natural language", tag:"Tools", yt:"https://www.youtube.com/watch?v=wFdFLWc-W4k", ytLabel:"SQL Agent", hindiYt:"https://www.youtube.com/watch?v=lG7Uxts9SXs", hindiYtLabel:"LLM Tools Hindi (Hitesh Choudhary)" , subtopics:[{"text": "Agent architecture patterns", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "LangGraph implementation", "yt": "https://www.youtube.com/watch?v=R-o_a6dvzQM"}, {"text": "Tool design best practices", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "Testing and evaluation", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}], github:[{"name": "langchain-ai/langgraph", "url": "https://github.com/langchain-ai/langgraph", "desc": "LangGraph", "stars": "10k+"}], resource:{"title": "Anthropic — Building Effective Agents", "url": "https://www.anthropic.com/research/building-effective-agents"}},
              { id:"7-29-9", text:"Browser/web scraping tools: Playwright, Jina Reader API", tag:"Tools", yt:"https://www.youtube.com/watch?v=o6c5acG1no8", ytLabel:"Browser Agent", hindiYt:"https://www.youtube.com/watch?v=lG7Uxts9SXs", hindiYtLabel:"LLM Tools Hindi (Hitesh Choudhary)" , subtopics:[{"text": "Agent architecture patterns", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "LangGraph implementation", "yt": "https://www.youtube.com/watch?v=R-o_a6dvzQM"}, {"text": "Tool design best practices", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "Testing and evaluation", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}], github:[{"name": "langchain-ai/langgraph", "url": "https://github.com/langchain-ai/langgraph", "desc": "LangGraph", "stars": "10k+"}], resource:{"title": "Anthropic — Building Effective Agents", "url": "https://www.anthropic.com/research/building-effective-agents"}},
              { id:"7-29-10", text:"Custom API tools: wrap any REST API as LLM tool", tag:"Tools", yt:"https://www.youtube.com/watch?v=Yw5MDpnSIZs", ytLabel:"Custom Tools", hindiYt:"https://www.youtube.com/watch?v=lG7Uxts9SXs", hindiYtLabel:"LLM Tools Hindi (Hitesh Choudhary)" , subtopics:[{"text": "Agent architecture patterns", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "LangGraph implementation", "yt": "https://www.youtube.com/watch?v=R-o_a6dvzQM"}, {"text": "Tool design best practices", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "Testing and evaluation", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}], github:[{"name": "langchain-ai/langgraph", "url": "https://github.com/langchain-ai/langgraph", "desc": "LangGraph", "stars": "10k+"}], resource:{"title": "Anthropic — Building Effective Agents", "url": "https://www.anthropic.com/research/building-effective-agents"}},
            ]
          },
          {
            day: "WED", label: "CrewAI Multi-Agent",
            resource: "CrewAI Docs",
            resourceUrl: "https://docs.crewai.com/",
            chatgpt: "Build a CrewAI system for content creation: Research Agent (searches web) + Writer Agent (writes article) + Editor Agent (reviews and improves). Show the full crew and explain inter-agent communication.",
            topics: [
              { id:"7-29-11", text:"CrewAI: Crew, Agent, Task, Process — core concepts", tag:"CrewAI", yt:"https://www.youtube.com/watch?v=sPzc6hMg7So", ytLabel:"CrewAI Tutorial", hindiYt:"https://www.youtube.com/watch?v=lG7Uxts9SXs", hindiYtLabel:"CrewAI Hindi (Hitesh Choudhary)" , subtopics:[{"text": "Agent architecture patterns", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "LangGraph implementation", "yt": "https://www.youtube.com/watch?v=R-o_a6dvzQM"}, {"text": "Tool design best practices", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "Testing and evaluation", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}], github:[{"name": "langchain-ai/langgraph", "url": "https://github.com/langchain-ai/langgraph", "desc": "LangGraph", "stars": "10k+"}], resource:{"title": "Anthropic — Building Effective Agents", "url": "https://www.anthropic.com/research/building-effective-agents"}},
              { id:"7-29-12", text:"Role-based agents: backstory, goal, tools, delegation", tag:"CrewAI", yt:"https://www.youtube.com/watch?v=tnejrr-0a94", ytLabel:"CrewAI Agents", hindiYt:"https://www.youtube.com/watch?v=lG7Uxts9SXs", hindiYtLabel:"CrewAI Hindi (Hitesh Choudhary)" , subtopics:[{"text": "Agent architecture patterns", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "LangGraph implementation", "yt": "https://www.youtube.com/watch?v=R-o_a6dvzQM"}, {"text": "Tool design best practices", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "Testing and evaluation", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}], github:[{"name": "langchain-ai/langgraph", "url": "https://github.com/langchain-ai/langgraph", "desc": "LangGraph", "stars": "10k+"}], resource:{"title": "Anthropic — Building Effective Agents", "url": "https://www.anthropic.com/research/building-effective-agents"}},
              { id:"7-29-13", text:"Sequential vs hierarchical process — choose the right pattern", tag:"CrewAI", yt:"https://www.youtube.com/watch?v=Jl7nc9EK470", ytLabel:"CrewAI Process", hindiYt:"https://www.youtube.com/watch?v=lG7Uxts9SXs", hindiYtLabel:"CrewAI Hindi (Hitesh Choudhary)" , subtopics:[{"text": "Agent architecture patterns", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "LangGraph implementation", "yt": "https://www.youtube.com/watch?v=R-o_a6dvzQM"}, {"text": "Tool design best practices", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "Testing and evaluation", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}], github:[{"name": "langchain-ai/langgraph", "url": "https://github.com/langchain-ai/langgraph", "desc": "LangGraph", "stars": "10k+"}], resource:{"title": "Anthropic — Building Effective Agents", "url": "https://www.anthropic.com/research/building-effective-agents"}},
              { id:"7-29-14", text:"Agent communication: shared memory, task dependencies", tag:"CrewAI", yt:"https://www.youtube.com/watch?v=_K206eFOXo8", ytLabel:"CrewAI Memory", hindiYt:"https://www.youtube.com/watch?v=lG7Uxts9SXs", hindiYtLabel:"CrewAI Hindi (Hitesh Choudhary)" , subtopics:[{"text": "Agent architecture patterns", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "LangGraph implementation", "yt": "https://www.youtube.com/watch?v=R-o_a6dvzQM"}, {"text": "Tool design best practices", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "Testing and evaluation", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}], github:[{"name": "langchain-ai/langgraph", "url": "https://github.com/langchain-ai/langgraph", "desc": "LangGraph", "stars": "10k+"}], resource:{"title": "Anthropic — Building Effective Agents", "url": "https://www.anthropic.com/research/building-effective-agents"}},
              { id:"7-29-15", text:"AutoGen: conversational agents, group chat, code agents", tag:"AutoGen", yt:"https://www.youtube.com/watch?v=vU2S6dVf79M", ytLabel:"AutoGen Tutorial", hindiYt:"https://www.youtube.com/watch?v=lG7Uxts9SXs", hindiYtLabel:"AutoGen Hindi (Hitesh Choudhary)" , subtopics:[{"text": "Agent architecture patterns", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "LangGraph implementation", "yt": "https://www.youtube.com/watch?v=R-o_a6dvzQM"}, {"text": "Tool design best practices", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "Testing and evaluation", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}], github:[{"name": "langchain-ai/langgraph", "url": "https://github.com/langchain-ai/langgraph", "desc": "LangGraph", "stars": "10k+"}], resource:{"title": "Anthropic — Building Effective Agents", "url": "https://www.anthropic.com/research/building-effective-agents"}},
            ]
          },
          {
            day: "THU", label: "Agent Evaluation",
            resource: "LangSmith Agent Tracing",
            resourceUrl: "https://docs.smith.langchain.com/",
            chatgpt: "What are the most common failure modes for LLM agents in production? For each: why it happens, how to detect it with LangSmith, and how to add guardrails. Include infinite loop prevention.",
            topics: [
              { id:"7-29-16", text:"Trajectory evaluation: did agent take correct steps?", tag:"Eval", yt:"https://www.youtube.com/watch?v=Hab2CV_0hpQ", ytLabel:"LangSmith Evals", hindiYt:"https://www.youtube.com/watch?v=7uwa9aPbBRU", hindiYtLabel:"Model Eval Hindi (CampusX)" , subtopics:[{"text": "Agent architecture patterns", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "LangGraph implementation", "yt": "https://www.youtube.com/watch?v=R-o_a6dvzQM"}, {"text": "Tool design best practices", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "Testing and evaluation", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}], github:[{"name": "langchain-ai/langgraph", "url": "https://github.com/langchain-ai/langgraph", "desc": "LangGraph", "stars": "10k+"}], resource:{"title": "Anthropic — Building Effective Agents", "url": "https://www.anthropic.com/research/building-effective-agents"}},
              { id:"7-29-17", text:"Agent failure modes: infinite loops, hallucinated tools", tag:"Reliability", yt:"https://www.youtube.com/watch?v=CpRKITdEPgE", ytLabel:"Agent Reliability", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "Agent architecture patterns", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "LangGraph implementation", "yt": "https://www.youtube.com/watch?v=R-o_a6dvzQM"}, {"text": "Tool design best practices", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "Testing and evaluation", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}], github:[{"name": "langchain-ai/langgraph", "url": "https://github.com/langchain-ai/langgraph", "desc": "LangGraph", "stars": "10k+"}], resource:{"title": "Anthropic — Building Effective Agents", "url": "https://www.anthropic.com/research/building-effective-agents"}},
              { id:"7-29-18", text:"Guardrails: input validation, output filtering, rate limits", tag:"Safety", yt:"https://www.youtube.com/watch?v=Sv5OLj2nVAQ", ytLabel:"LLM Guardrails", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "Agent architecture patterns", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "LangGraph implementation", "yt": "https://www.youtube.com/watch?v=R-o_a6dvzQM"}, {"text": "Tool design best practices", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "Testing and evaluation", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}], github:[{"name": "langchain-ai/langgraph", "url": "https://github.com/langchain-ai/langgraph", "desc": "LangGraph", "stars": "10k+"}], resource:{"title": "Anthropic — Building Effective Agents", "url": "https://www.anthropic.com/research/building-effective-agents"}},
              { id:"7-29-19", text:"LangSmith: trace agent runs, debug step by step", tag:"Debug", yt:"https://www.youtube.com/watch?v=Hab2CV_0hpQ", ytLabel:"LangSmith Debug", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "Agent architecture patterns", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "LangGraph implementation", "yt": "https://www.youtube.com/watch?v=R-o_a6dvzQM"}, {"text": "Tool design best practices", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "Testing and evaluation", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}], github:[{"name": "langchain-ai/langgraph", "url": "https://github.com/langchain-ai/langgraph", "desc": "LangGraph", "stars": "10k+"}], resource:{"title": "Anthropic — Building Effective Agents", "url": "https://www.anthropic.com/research/building-effective-agents"}},
              { id:"7-29-20", text:"Cost control: token budgets, max_iterations, timeouts", tag:"Cost", yt:"https://www.youtube.com/watch?v=OB99E7Y1cMA", ytLabel:"LLM Cost Control", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "Agent architecture patterns", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "LangGraph implementation", "yt": "https://www.youtube.com/watch?v=R-o_a6dvzQM"}, {"text": "Tool design best practices", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "Testing and evaluation", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}], github:[{"name": "langchain-ai/langgraph", "url": "https://github.com/langchain-ai/langgraph", "desc": "LangGraph", "stars": "10k+"}], resource:{"title": "Anthropic — Building Effective Agents", "url": "https://www.anthropic.com/research/building-effective-agents"}},
            ]
          },
          {
            day: "FRI", label: "Fine-Tuning LLMs",
            resource: "HuggingFace PEFT Docs",
            resourceUrl: "https://huggingface.co/docs/peft",
            chatgpt: "When should I fine-tune vs use RAG vs prompt engineering? Give me a decision framework. Then show me minimal QLoRA code for fine-tuning Mistral-7B on a custom Q&A dataset.",
            topics: [
              { id:"7-29-21", text:"Fine-tune vs RAG vs prompting — decision framework", tag:"Strategy", yt:"https://www.youtube.com/watch?v=dQ4gcOIFInw", ytLabel:"Fine-tune vs RAG", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "Agent architecture patterns", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "LangGraph implementation", "yt": "https://www.youtube.com/watch?v=R-o_a6dvzQM"}, {"text": "Tool design best practices", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "Testing and evaluation", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}], github:[{"name": "langchain-ai/langgraph", "url": "https://github.com/langchain-ai/langgraph", "desc": "LangGraph", "stars": "10k+"}], resource:{"title": "Anthropic — Building Effective Agents", "url": "https://www.anthropic.com/research/building-effective-agents"}},
              { id:"7-29-22", text:"LoRA/QLoRA: rank, alpha, target modules, bit quantization", tag:"PEFT", yt:"https://www.youtube.com/watch?v=Us5ZFp16PaU", ytLabel:"QLoRA Tutorial", hindiYt:"https://www.youtube.com/watch?v=lnAtNjBLQKk", hindiYtLabel:"PEFT LoRA Hindi (Hitesh Choudhary)" , subtopics:[{"text": "Agent architecture patterns", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "LangGraph implementation", "yt": "https://www.youtube.com/watch?v=R-o_a6dvzQM"}, {"text": "Tool design best practices", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "Testing and evaluation", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}], github:[{"name": "langchain-ai/langgraph", "url": "https://github.com/langchain-ai/langgraph", "desc": "LangGraph", "stars": "10k+"}], resource:{"title": "Anthropic — Building Effective Agents", "url": "https://www.anthropic.com/research/building-effective-agents"}},
              { id:"7-29-23", text:"SFTTrainer from TRL — supervised fine-tuning pipeline", tag:"PEFT", yt:"https://www.youtube.com/watch?v=eTieetk2dSw", ytLabel:"SFTTrainer", hindiYt:"https://www.youtube.com/watch?v=lnAtNjBLQKk", hindiYtLabel:"PEFT LoRA Hindi (Hitesh Choudhary)" , subtopics:[{"text": "Agent architecture patterns", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "LangGraph implementation", "yt": "https://www.youtube.com/watch?v=R-o_a6dvzQM"}, {"text": "Tool design best practices", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "Testing and evaluation", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}], github:[{"name": "langchain-ai/langgraph", "url": "https://github.com/langchain-ai/langgraph", "desc": "LangGraph", "stars": "10k+"}], resource:{"title": "Anthropic — Building Effective Agents", "url": "https://www.anthropic.com/research/building-effective-agents"}},
              { id:"7-29-24", text:"Dataset preparation for fine-tuning: format, quality, size", tag:"Data", yt:"https://www.youtube.com/watch?v=1PbFBPRCfaM", ytLabel:"FT Dataset Prep", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "Agent architecture patterns", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "LangGraph implementation", "yt": "https://www.youtube.com/watch?v=R-o_a6dvzQM"}, {"text": "Tool design best practices", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "Testing and evaluation", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}], github:[{"name": "langchain-ai/langgraph", "url": "https://github.com/langchain-ai/langgraph", "desc": "LangGraph", "stars": "10k+"}], resource:{"title": "Anthropic — Building Effective Agents", "url": "https://www.anthropic.com/research/building-effective-agents"}},
              { id:"7-29-25", text:"DPO fine-tuning — align model with human preferences", tag:"RLHF", yt:"https://www.youtube.com/watch?v=QLm44TCvxOc", ytLabel:"DPO Tutorial", hindiYt:"https://www.youtube.com/watch?v=lnAtNjBLQKk", hindiYtLabel:"RLHF Hindi (Hitesh Choudhary)" , subtopics:[{"text": "Agent architecture patterns", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "LangGraph implementation", "yt": "https://www.youtube.com/watch?v=R-o_a6dvzQM"}, {"text": "Tool design best practices", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "Testing and evaluation", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}], github:[{"name": "langchain-ai/langgraph", "url": "https://github.com/langchain-ai/langgraph", "desc": "LangGraph", "stars": "10k+"}], resource:{"title": "Anthropic — Building Effective Agents", "url": "https://www.anthropic.com/research/building-effective-agents"}},
            ]
          },
          {
            day: "SAT", label: "Agent Projects",
            resource: "LangGraph Examples",
            resourceUrl: "https://langchain-ai.github.io/langgraph/tutorials/",
            chatgpt: "Review my LangGraph research agent [paste code]. Check: graph design, state management, error handling, and edge cases. How would you make this more reliable for production use?",
            topics: [
              { id:"7-29-26", text:"🏗 BUILD: Research Agent (search + read + summarize + report)", tag:"Project", yt:"https://www.youtube.com/watch?v=R-o_a6dvzQM", ytLabel:"Research Agent", hindiYt:"https://www.youtube.com/watch?v=aqvDTCpNRek", hindiYtLabel:"Python Project Hindi (CodeWithHarry)" , subtopics:[{"text": "Agent architecture patterns", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "LangGraph implementation", "yt": "https://www.youtube.com/watch?v=R-o_a6dvzQM"}, {"text": "Tool design best practices", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "Testing and evaluation", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}], github:[{"name": "langchain-ai/langgraph", "url": "https://github.com/langchain-ai/langgraph", "desc": "LangGraph", "stars": "10k+"}], resource:{"title": "Anthropic — Building Effective Agents", "url": "https://www.anthropic.com/research/building-effective-agents"}},
              { id:"7-29-27", text:"🏗 BUILD: Customer Support Agent (triage + FAQ + escalation)", tag:"Project", yt:"https://www.youtube.com/watch?v=sPzc6hMg7So", ytLabel:"Support Agent", hindiYt:"https://www.youtube.com/watch?v=aqvDTCpNRek", hindiYtLabel:"Python Project Hindi (CodeWithHarry)" , subtopics:[{"text": "Agent architecture patterns", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "LangGraph implementation", "yt": "https://www.youtube.com/watch?v=R-o_a6dvzQM"}, {"text": "Tool design best practices", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "Testing and evaluation", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}], github:[{"name": "langchain-ai/langgraph", "url": "https://github.com/langchain-ai/langgraph", "desc": "LangGraph", "stars": "10k+"}], resource:{"title": "Anthropic — Building Effective Agents", "url": "https://www.anthropic.com/research/building-effective-agents"}},
              { id:"7-29-28", text:"🏗 BUILD: Fine-tuned domain chatbot with QLoRA", tag:"Project", yt:"https://www.youtube.com/watch?v=Us5ZFp16PaU", ytLabel:"Fine-tune Project", hindiYt:"https://www.youtube.com/watch?v=aqvDTCpNRek", hindiYtLabel:"Python Project Hindi (CodeWithHarry)" , subtopics:[{"text": "Agent architecture patterns", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "LangGraph implementation", "yt": "https://www.youtube.com/watch?v=R-o_a6dvzQM"}, {"text": "Tool design best practices", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "Testing and evaluation", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}], github:[{"name": "langchain-ai/langgraph", "url": "https://github.com/langchain-ai/langgraph", "desc": "LangGraph", "stars": "10k+"}], resource:{"title": "Anthropic — Building Effective Agents", "url": "https://www.anthropic.com/research/building-effective-agents"}},
            ]
          },
          {
            day: "SUN", label: "Review & Integration",
            resource: "DeepLearning.AI – LangGraph Course",
            resourceUrl: "https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/",
            chatgpt: "Quiz me on AI agents: ReAct pattern, LangGraph state machines, tool design, multi-agent communication, and evaluation strategies. Ask 10 questions with detailed feedback.",
            topics: [
              { id:"7-29-29", text:"Review all agent patterns — ReAct, Plan-and-Execute, ReWOO", tag:"Review", yt:"https://www.youtube.com/watch?v=Eug2clsLtFs", ytLabel:"Agent Patterns", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "Agent architecture patterns", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "LangGraph implementation", "yt": "https://www.youtube.com/watch?v=R-o_a6dvzQM"}, {"text": "Tool design best practices", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "Testing and evaluation", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}], github:[{"name": "langchain-ai/langgraph", "url": "https://github.com/langchain-ai/langgraph", "desc": "LangGraph", "stars": "10k+"}], resource:{"title": "Anthropic — Building Effective Agents", "url": "https://www.anthropic.com/research/building-effective-agents"}},
              { id:"7-29-30", text:"Integrate agents with FastAPI — streaming agent responses", tag:"Deploy", yt:"https://www.youtube.com/watch?v=0lOSvOoF2to", ytLabel:"Agent API", hindiYt:"https://www.youtube.com/watch?v=pg19Z8LL06w", hindiYtLabel:"Model Deploy Hindi (Hitesh Choudhary)" , subtopics:[{"text": "Agent architecture patterns", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "LangGraph implementation", "yt": "https://www.youtube.com/watch?v=R-o_a6dvzQM"}, {"text": "Tool design best practices", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}, {"text": "Testing and evaluation", "yt": "https://www.youtube.com/watch?v=sal78ACtGTc"}], github:[{"name": "langchain-ai/langgraph", "url": "https://github.com/langchain-ai/langgraph", "desc": "LangGraph", "stars": "10k+"}], resource:{"title": "Anthropic — Building Effective Agents", "url": "https://www.anthropic.com/research/building-effective-agents"}},
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
              { id:"8-33-1", text:"Routes, path/query params, request body, response model", tag:"FastAPI", yt:"https://www.youtube.com/watch?v=0sOvCWFmrtA", ytLabel:"FastAPI Tutorial", hindiYt:"https://www.youtube.com/watch?v=0sOvCWFmrtA", hindiYtLabel:"FastAPI Full Hindi (Hitesh Choudhary)" , subtopics:[{"text": "FastAPI first endpoint — 5 lines", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Path params and query params", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Request body with Pydantic", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Automatic /docs and /redoc", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}], github:[{"name": "tiangolo/fastapi", "url": "https://github.com/tiangolo/fastapi", "desc": "FastAPI", "stars": "78k+"}], resource:{"title": "FastAPI Official Tutorial", "url": "https://fastapi.tiangolo.com/tutorial/"}},
              { id:"8-33-2", text:"Pydantic v2 models: Field, validators, computed fields", tag:"FastAPI", yt:"https://www.youtube.com/watch?v=502XOB0u8OY", ytLabel:"Pydantic v2", hindiYt:"https://www.youtube.com/watch?v=0sOvCWFmrtA", hindiYtLabel:"FastAPI Full Hindi (Hitesh Choudhary)" , subtopics:[{"text": "Dockerfile for Python app", "yt": "https://www.youtube.com/watch?v=9zUHg7xjIqQ"}, {"text": "docker build and docker run", "yt": "https://www.youtube.com/watch?v=9zUHg7xjIqQ"}, {"text": "docker-compose.yml — multi service", "yt": "https://www.youtube.com/watch?v=HG6yIjZo630"}, {"text": "Environment variables in Docker", "yt": "https://www.youtube.com/watch?v=9zUHg7xjIqQ"}], github:[{"name": "docker/compose", "url": "https://github.com/docker/compose", "desc": "Docker Compose", "stars": "34k+"}], resource:{"title": "Docker Official Getting Started", "url": "https://docs.docker.com/get-started/"}},
              { id:"8-33-3", text:"Async endpoints, background tasks, lifespan events (startup)", tag:"FastAPI", yt:"https://www.youtube.com/watch?v=iWS9ogMPOI0", ytLabel:"FastAPI Async", hindiYt:"https://www.youtube.com/watch?v=0sOvCWFmrtA", hindiYtLabel:"FastAPI Full Hindi (Hitesh Choudhary)" , subtopics:[{"text": "JWT tokens — user authentication", "yt": "https://www.youtube.com/watch?v=5GYe_IeLwjw"}, {"text": "OAuth2 with FastAPI security", "yt": "https://www.youtube.com/watch?v=5GYe_IeLwjw"}, {"text": "API key management", "yt": "https://www.youtube.com/watch?v=5GYe_IeLwjw"}, {"text": "Rate limiting per user", "yt": "https://www.youtube.com/watch?v=5GYe_IeLwjw"}], github:[{"name": "tiangolo/fastapi", "url": "https://github.com/tiangolo/fastapi", "desc": "FastAPI security", "stars": "78k+"}], resource:{"title": "FastAPI Security Docs", "url": "https://fastapi.tiangolo.com/tutorial/security/"}},
              { id:"8-33-4", text:"JWT auth: OAuth2, Bearer tokens, dependency injection", tag:"Auth", yt:"https://www.youtube.com/watch?v=0_seNFCtglk", ytLabel:"FastAPI JWT Auth", hindiYt:"https://www.youtube.com/watch?v=0sOvCWFmrtA", hindiYtLabel:"Auth FastAPI Hindi (Hitesh Choudhary)" , subtopics:[{"text": "Background tasks — fire and forget", "yt": "https://www.youtube.com/watch?v=ynNDmp7hBdo"}, {"text": "Celery + Redis — proper task queues", "yt": "https://www.youtube.com/watch?v=ynNDmp7hBdo"}, {"text": "Task status — return job ID", "yt": "https://www.youtube.com/watch?v=ynNDmp7hBdo"}, {"text": "Handle long LLM calls async", "yt": "https://www.youtube.com/watch?v=ynNDmp7hBdo"}], github:[{"name": "celery/celery", "url": "https://github.com/celery/celery", "desc": "Distributed task queue", "stars": "24k+"}], resource:{"title": "FastAPI Background Tasks", "url": "https://fastapi.tiangolo.com/tutorial/background-tasks/"}},
              { id:"8-33-5", text:"SQLAlchemy async + Alembic migrations — production DB setup", tag:"DB", yt:"https://www.youtube.com/watch?v=1Ra8XR-3z_0", ytLabel:"FastAPI + SQLAlchemy", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "Langfuse — trace every LLM call", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Structlog — JSON structured logging", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}, {"text": "Health check endpoints", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Cost per request monitoring", "yt": "https://www.youtube.com/watch?v=zjkBMFhNj_g"}], github:[{"name": "langfuse/langfuse", "url": "https://github.com/langfuse/langfuse", "desc": "LLM observability", "stars": "7k+"}], resource:{"title": "Langfuse Docs", "url": "https://langfuse.com/docs"}},
            ]
          },
          {
            day: "TUE", label: "AI API Patterns",
            resource: "FastAPI Streaming Docs",
            resourceUrl: "https://fastapi.tiangolo.com/advanced/custom-response/",
            chatgpt: "Show me how to stream OpenAI responses through FastAPI to a client using SSE. Handle: disconnections, errors, backpressure. Include a complete working example with frontend JS.",
            topics: [
              { id:"8-33-6", text:"Stream LLM responses with Server-Sent Events (SSE) in FastAPI", tag:"AI API", yt:"https://www.youtube.com/watch?v=GlF5cQMpVCI", ytLabel:"FastAPI Streaming", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "FastAPI endpoint creation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Pydantic validation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Docker containerisation", "yt": "https://www.youtube.com/watch?v=9zUHg7xjIqQ"}, {"text": "Deploy to production", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}], github:[{"name": "tiangolo/fastapi", "url": "https://github.com/tiangolo/fastapi", "desc": "FastAPI", "stars": "78k+"}], resource:{"title": "FastAPI Official Tutorial", "url": "https://fastapi.tiangolo.com/tutorial/"}},
              { id:"8-33-7", text:"Redis + Celery for async LLM task queuing", tag:"Queue", yt:"https://www.youtube.com/watch?v=fBfzE0yk97k", ytLabel:"Celery Redis FastAPI", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "FastAPI endpoint creation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Pydantic validation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Docker containerisation", "yt": "https://www.youtube.com/watch?v=9zUHg7xjIqQ"}, {"text": "Deploy to production", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}], github:[{"name": "tiangolo/fastapi", "url": "https://github.com/tiangolo/fastapi", "desc": "FastAPI", "stars": "78k+"}], resource:{"title": "FastAPI Official Tutorial", "url": "https://fastapi.tiangolo.com/tutorial/"}},
              { id:"8-33-8", text:"Rate limiting (slowapi), CORS, security headers middleware", tag:"Security", yt:"https://www.youtube.com/watch?v=iWS9ogMPOI0", ytLabel:"FastAPI Middleware", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "FastAPI endpoint creation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Pydantic validation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Docker containerisation", "yt": "https://www.youtube.com/watch?v=9zUHg7xjIqQ"}, {"text": "Deploy to production", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}], github:[{"name": "tiangolo/fastapi", "url": "https://github.com/tiangolo/fastapi", "desc": "FastAPI", "stars": "78k+"}], resource:{"title": "FastAPI Official Tutorial", "url": "https://fastapi.tiangolo.com/tutorial/"}},
              { id:"8-33-9", text:"Cache LLM responses in Redis — reduce cost by 60-80%", tag:"Cache", yt:"https://www.youtube.com/watch?v=Ri8zGMJEnnU", ytLabel:"Redis Caching", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "FastAPI endpoint creation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Pydantic validation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Docker containerisation", "yt": "https://www.youtube.com/watch?v=9zUHg7xjIqQ"}, {"text": "Deploy to production", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}], github:[{"name": "tiangolo/fastapi", "url": "https://github.com/tiangolo/fastapi", "desc": "FastAPI", "stars": "78k+"}], resource:{"title": "FastAPI Official Tutorial", "url": "https://fastapi.tiangolo.com/tutorial/"}},
              { id:"8-33-10", text:"Testing FastAPI: pytest + httpx TestClient, mock LLM calls", tag:"Testing", yt:"https://www.youtube.com/watch?v=7HfekFkQmCc", ytLabel:"FastAPI Testing", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Python Testing Hindi (CampusX)" , subtopics:[{"text": "FastAPI endpoint creation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Pydantic validation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Docker containerisation", "yt": "https://www.youtube.com/watch?v=9zUHg7xjIqQ"}, {"text": "Deploy to production", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}], github:[{"name": "tiangolo/fastapi", "url": "https://github.com/tiangolo/fastapi", "desc": "FastAPI", "stars": "78k+"}], resource:{"title": "FastAPI Official Tutorial", "url": "https://fastapi.tiangolo.com/tutorial/"}},
            ]
          },
          {
            day: "WED", label: "Docker Mastery",
            resource: "Docker Official Docs",
            resourceUrl: "https://docs.docker.com/",
            chatgpt: "Write an optimized Dockerfile for a Python FastAPI + ML model. Show: multi-stage build to minimize image size, layer caching best practices, handling large model weights efficiently.",
            topics: [
              { id:"8-33-11", text:"Dockerfile: FROM, RUN, COPY, CMD, ENTRYPOINT, ARG, ENV", tag:"Docker", yt:"https://www.youtube.com/watch?v=3c-iBn73dDE", ytLabel:"Docker Tutorial", hindiYt:"https://www.youtube.com/watch?v=pg19Z8LL06w", hindiYtLabel:"Docker Hindi Tutorial (Hitesh Choudhary)" , subtopics:[{"text": "FastAPI endpoint creation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Pydantic validation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Docker containerisation", "yt": "https://www.youtube.com/watch?v=9zUHg7xjIqQ"}, {"text": "Deploy to production", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}], github:[{"name": "tiangolo/fastapi", "url": "https://github.com/tiangolo/fastapi", "desc": "FastAPI", "stars": "78k+"}], resource:{"title": "FastAPI Official Tutorial", "url": "https://fastapi.tiangolo.com/tutorial/"}},
              { id:"8-33-12", text:"Multi-stage builds — production images under 200MB", tag:"Docker", yt:"https://www.youtube.com/watch?v=KLOSCKn8GrI", ytLabel:"Docker Multi-stage", hindiYt:"https://www.youtube.com/watch?v=pg19Z8LL06w", hindiYtLabel:"Docker Hindi Tutorial (Hitesh Choudhary)" , subtopics:[{"text": "FastAPI endpoint creation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Pydantic validation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Docker containerisation", "yt": "https://www.youtube.com/watch?v=9zUHg7xjIqQ"}, {"text": "Deploy to production", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}], github:[{"name": "tiangolo/fastapi", "url": "https://github.com/tiangolo/fastapi", "desc": "FastAPI", "stars": "78k+"}], resource:{"title": "FastAPI Official Tutorial", "url": "https://fastapi.tiangolo.com/tutorial/"}},
              { id:"8-33-13", text:"docker-compose: services, volumes, networks, env files", tag:"Docker", yt:"https://www.youtube.com/watch?v=HG6yIjqzGVg", ytLabel:"Docker Compose", hindiYt:"https://www.youtube.com/watch?v=pg19Z8LL06w", hindiYtLabel:"Docker Hindi Tutorial (Hitesh Choudhary)" , subtopics:[{"text": "FastAPI endpoint creation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Pydantic validation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Docker containerisation", "yt": "https://www.youtube.com/watch?v=9zUHg7xjIqQ"}, {"text": "Deploy to production", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}], github:[{"name": "tiangolo/fastapi", "url": "https://github.com/tiangolo/fastapi", "desc": "FastAPI", "stars": "78k+"}], resource:{"title": "FastAPI Official Tutorial", "url": "https://fastapi.tiangolo.com/tutorial/"}},
              { id:"8-33-14", text:"Container security: non-root user, read-only filesystem", tag:"Security", yt:"https://www.youtube.com/watch?v=l86Rz8nJ5Cs", ytLabel:"Docker Security", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "FastAPI endpoint creation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Pydantic validation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Docker containerisation", "yt": "https://www.youtube.com/watch?v=9zUHg7xjIqQ"}, {"text": "Deploy to production", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}], github:[{"name": "tiangolo/fastapi", "url": "https://github.com/tiangolo/fastapi", "desc": "FastAPI", "stars": "78k+"}], resource:{"title": "FastAPI Official Tutorial", "url": "https://fastapi.tiangolo.com/tutorial/"}},
              { id:"8-33-15", text:"Push to Docker Hub / AWS ECR — registry workflow", tag:"Registry", yt:"https://www.youtube.com/watch?v=iEFas7V6aRM", ytLabel:"Docker Registry", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "FastAPI endpoint creation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Pydantic validation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Docker containerisation", "yt": "https://www.youtube.com/watch?v=9zUHg7xjIqQ"}, {"text": "Deploy to production", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}], github:[{"name": "tiangolo/fastapi", "url": "https://github.com/tiangolo/fastapi", "desc": "FastAPI", "stars": "78k+"}], resource:{"title": "FastAPI Official Tutorial", "url": "https://fastapi.tiangolo.com/tutorial/"}},
            ]
          },
          {
            day: "THU", label: "Gradio & Streamlit",
            resource: "Gradio Docs",
            resourceUrl: "https://www.gradio.app/docs/",
            chatgpt: "Build a Gradio demo for my RAG application. Include: file upload for PDF, chat interface, source citation display, and deploy to HuggingFace Spaces with a share link.",
            topics: [
              { id:"8-33-16", text:"Streamlit: st.chat_message, st.session_state, file_uploader", tag:"Streamlit", yt:"https://www.youtube.com/watch?v=R2nr1uZ8ffc", ytLabel:"Streamlit Tutorial", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "FastAPI endpoint creation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Pydantic validation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Docker containerisation", "yt": "https://www.youtube.com/watch?v=9zUHg7xjIqQ"}, {"text": "Deploy to production", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}], github:[{"name": "tiangolo/fastapi", "url": "https://github.com/tiangolo/fastapi", "desc": "FastAPI", "stars": "78k+"}], resource:{"title": "FastAPI Official Tutorial", "url": "https://fastapi.tiangolo.com/tutorial/"}},
              { id:"8-33-17", text:"Gradio: Interface, Blocks, chatbot component, streaming", tag:"Gradio", yt:"https://www.youtube.com/watch?v=RiHRsBqwRv0", ytLabel:"Gradio Tutorial", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "FastAPI endpoint creation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Pydantic validation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Docker containerisation", "yt": "https://www.youtube.com/watch?v=9zUHg7xjIqQ"}, {"text": "Deploy to production", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}], github:[{"name": "tiangolo/fastapi", "url": "https://github.com/tiangolo/fastapi", "desc": "FastAPI", "stars": "78k+"}], resource:{"title": "FastAPI Official Tutorial", "url": "https://fastapi.tiangolo.com/tutorial/"}},
              { id:"8-33-18", text:"HuggingFace Spaces: deploy Gradio/Streamlit apps for free", tag:"Deploy", yt:"https://www.youtube.com/watch?v=pxISiqfmoak", ytLabel:"HF Spaces Deploy", hindiYt:"https://www.youtube.com/watch?v=pg19Z8LL06w", hindiYtLabel:"Model Deploy Hindi (Hitesh Choudhary)" , subtopics:[{"text": "FastAPI endpoint creation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Pydantic validation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Docker containerisation", "yt": "https://www.youtube.com/watch?v=9zUHg7xjIqQ"}, {"text": "Deploy to production", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}], github:[{"name": "tiangolo/fastapi", "url": "https://github.com/tiangolo/fastapi", "desc": "FastAPI", "stars": "78k+"}], resource:{"title": "FastAPI Official Tutorial", "url": "https://fastapi.tiangolo.com/tutorial/"}},
              { id:"8-33-19", text:"Vercel AI SDK: Next.js + streaming AI responses", tag:"Frontend", yt:"https://www.youtube.com/watch?v=Lam0cR4KLXY", ytLabel:"Vercel AI SDK", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "FastAPI endpoint creation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Pydantic validation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Docker containerisation", "yt": "https://www.youtube.com/watch?v=9zUHg7xjIqQ"}, {"text": "Deploy to production", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}], github:[{"name": "tiangolo/fastapi", "url": "https://github.com/tiangolo/fastapi", "desc": "FastAPI", "stars": "78k+"}], resource:{"title": "FastAPI Official Tutorial", "url": "https://fastapi.tiangolo.com/tutorial/"}},
              { id:"8-33-20", text:"Build a full-stack AI app: React frontend + FastAPI backend", tag:"Full-Stack", yt:"https://www.youtube.com/watch?v=99ytGLkSjVs", ytLabel:"AI Full Stack", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "FastAPI endpoint creation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Pydantic validation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Docker containerisation", "yt": "https://www.youtube.com/watch?v=9zUHg7xjIqQ"}, {"text": "Deploy to production", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}], github:[{"name": "tiangolo/fastapi", "url": "https://github.com/tiangolo/fastapi", "desc": "FastAPI", "stars": "78k+"}], resource:{"title": "FastAPI Official Tutorial", "url": "https://fastapi.tiangolo.com/tutorial/"}},
            ]
          },
          {
            day: "FRI", label: "Production Patterns",
            resource: "12-Factor App",
            resourceUrl: "https://12factor.net/",
            chatgpt: "Design a production-grade AI API system. Include: request queuing, circuit breakers, retry logic, graceful degradation when LLM is down, and health check endpoints for k8s.",
            topics: [
              { id:"8-33-21", text:"Health checks: /health, /ready endpoints for k8s probes", tag:"Ops", yt:"https://www.youtube.com/watch?v=X48VuDVv0do", ytLabel:"Kubernetes Basics", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "FastAPI endpoint creation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Pydantic validation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Docker containerisation", "yt": "https://www.youtube.com/watch?v=9zUHg7xjIqQ"}, {"text": "Deploy to production", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}], github:[{"name": "tiangolo/fastapi", "url": "https://github.com/tiangolo/fastapi", "desc": "FastAPI", "stars": "78k+"}], resource:{"title": "FastAPI Official Tutorial", "url": "https://fastapi.tiangolo.com/tutorial/"}},
              { id:"8-33-22", text:"Circuit breaker pattern for LLM API calls (tenacity)", tag:"Reliability", yt:"https://www.youtube.com/watch?v=tFZSkv_iuBk", ytLabel:"Circuit Breaker", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "FastAPI endpoint creation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Pydantic validation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Docker containerisation", "yt": "https://www.youtube.com/watch?v=9zUHg7xjIqQ"}, {"text": "Deploy to production", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}], github:[{"name": "tiangolo/fastapi", "url": "https://github.com/tiangolo/fastapi", "desc": "FastAPI", "stars": "78k+"}], resource:{"title": "FastAPI Official Tutorial", "url": "https://fastapi.tiangolo.com/tutorial/"}},
              { id:"8-33-23", text:"Structured logging: loguru, JSON logs, correlation IDs", tag:"Logging", yt:"https://www.youtube.com/watch?v=-ARI4Cz-awo", ytLabel:"Structured Logging", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Python Logging Hindi (CampusX)" , subtopics:[{"text": "FastAPI endpoint creation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Pydantic validation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Docker containerisation", "yt": "https://www.youtube.com/watch?v=9zUHg7xjIqQ"}, {"text": "Deploy to production", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}], github:[{"name": "tiangolo/fastapi", "url": "https://github.com/tiangolo/fastapi", "desc": "FastAPI", "stars": "78k+"}], resource:{"title": "FastAPI Official Tutorial", "url": "https://fastapi.tiangolo.com/tutorial/"}},
              { id:"8-33-24", text:"OpenTelemetry tracing for distributed AI systems", tag:"Observability", yt:"https://www.youtube.com/watch?v=r8UvWSX3TnE", ytLabel:"OpenTelemetry", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "FastAPI endpoint creation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Pydantic validation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Docker containerisation", "yt": "https://www.youtube.com/watch?v=9zUHg7xjIqQ"}, {"text": "Deploy to production", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}], github:[{"name": "tiangolo/fastapi", "url": "https://github.com/tiangolo/fastapi", "desc": "FastAPI", "stars": "78k+"}], resource:{"title": "FastAPI Official Tutorial", "url": "https://fastapi.tiangolo.com/tutorial/"}},
              { id:"8-33-25", text:"API versioning, deprecation strategies, backward compat", tag:"API", yt:"https://www.youtube.com/watch?v=iWS9ogMPOI0", ytLabel:"API Best Practices", hindiYt:"https://www.youtube.com/watch?v=0sOvCWFmrtA", hindiYtLabel:"FastAPI Hindi Tutorial (Hitesh Choudhary)" , subtopics:[{"text": "FastAPI endpoint creation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Pydantic validation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Docker containerisation", "yt": "https://www.youtube.com/watch?v=9zUHg7xjIqQ"}, {"text": "Deploy to production", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}], github:[{"name": "tiangolo/fastapi", "url": "https://github.com/tiangolo/fastapi", "desc": "FastAPI", "stars": "78k+"}], resource:{"title": "FastAPI Official Tutorial", "url": "https://fastapi.tiangolo.com/tutorial/"}},
            ]
          },
          {
            day: "SAT", label: "API Projects",
            resource: "Docker Compose Examples",
            resourceUrl: "https://docs.docker.com/compose/examples/",
            chatgpt: "Review my docker-compose.yml for FastAPI + ChromaDB + Redis [paste config]. Security issues? Networking correct? How would you make this production-ready for AWS deployment?",
            topics: [
              { id:"8-33-26", text:"🏗 BUILD: Containerized RAG API (FastAPI + Chroma + Redis)", tag:"Project", yt:"https://www.youtube.com/watch?v=HG6yIjqzGVg", ytLabel:"Docker Compose App", hindiYt:"https://www.youtube.com/watch?v=aqvDTCpNRek", hindiYtLabel:"Python Project Hindi (CodeWithHarry)" , subtopics:[{"text": "FastAPI endpoint creation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Pydantic validation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Docker containerisation", "yt": "https://www.youtube.com/watch?v=9zUHg7xjIqQ"}, {"text": "Deploy to production", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}], github:[{"name": "tiangolo/fastapi", "url": "https://github.com/tiangolo/fastapi", "desc": "FastAPI", "stars": "78k+"}], resource:{"title": "FastAPI Official Tutorial", "url": "https://fastapi.tiangolo.com/tutorial/"}},
              { id:"8-33-27", text:"🏗 BUILD: AI Agent API with streaming SSE responses", tag:"Project", yt:"https://www.youtube.com/watch?v=GlF5cQMpVCI", ytLabel:"Streaming Agent API", hindiYt:"https://www.youtube.com/watch?v=aqvDTCpNRek", hindiYtLabel:"Python Project Hindi (CodeWithHarry)" , subtopics:[{"text": "FastAPI endpoint creation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Pydantic validation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Docker containerisation", "yt": "https://www.youtube.com/watch?v=9zUHg7xjIqQ"}, {"text": "Deploy to production", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}], github:[{"name": "tiangolo/fastapi", "url": "https://github.com/tiangolo/fastapi", "desc": "FastAPI", "stars": "78k+"}], resource:{"title": "FastAPI Official Tutorial", "url": "https://fastapi.tiangolo.com/tutorial/"}},
              { id:"8-33-28", text:"🏗 BUILD: Full-stack AI app deployed to HuggingFace Spaces", tag:"Project", yt:"https://www.youtube.com/watch?v=pxISiqfmoak", ytLabel:"HF Spaces App", hindiYt:"https://www.youtube.com/watch?v=aqvDTCpNRek", hindiYtLabel:"Python Project Hindi (CodeWithHarry)" , subtopics:[{"text": "FastAPI endpoint creation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Pydantic validation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Docker containerisation", "yt": "https://www.youtube.com/watch?v=9zUHg7xjIqQ"}, {"text": "Deploy to production", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}], github:[{"name": "tiangolo/fastapi", "url": "https://github.com/tiangolo/fastapi", "desc": "FastAPI", "stars": "78k+"}], resource:{"title": "FastAPI Official Tutorial", "url": "https://fastapi.tiangolo.com/tutorial/"}},
            ]
          },
          {
            day: "SUN", label: "Review & Security",
            resource: "OWASP LLM Top 10",
            resourceUrl: "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
            chatgpt: "Quiz me on FastAPI and Docker: async patterns, JWT auth, Docker best practices, container security, and production API design. Ask 10 questions with detailed explanations.",
            topics: [
              { id:"8-33-29", text:"OWASP LLM Top 10 — security risks in AI applications", tag:"Security", yt:"https://www.youtube.com/watch?v=Sv5OLj2nVAQ", ytLabel:"LLM Security", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "FastAPI endpoint creation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Pydantic validation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Docker containerisation", "yt": "https://www.youtube.com/watch?v=9zUHg7xjIqQ"}, {"text": "Deploy to production", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}], github:[{"name": "tiangolo/fastapi", "url": "https://github.com/tiangolo/fastapi", "desc": "FastAPI", "stars": "78k+"}], resource:{"title": "FastAPI Official Tutorial", "url": "https://fastapi.tiangolo.com/tutorial/"}},
              { id:"8-33-30", text:"Review all projects — add missing tests and documentation", tag:"Review", yt:"https://www.youtube.com/watch?v=7HfekFkQmCc", ytLabel:"Testing Best Practices", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "FastAPI endpoint creation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Pydantic validation", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}, {"text": "Docker containerisation", "yt": "https://www.youtube.com/watch?v=9zUHg7xjIqQ"}, {"text": "Deploy to production", "yt": "https://www.youtube.com/watch?v=7t2alSnE2-I"}], github:[{"name": "tiangolo/fastapi", "url": "https://github.com/tiangolo/fastapi", "desc": "FastAPI", "stars": "78k+"}], resource:{"title": "FastAPI Official Tutorial", "url": "https://fastapi.tiangolo.com/tutorial/"}},
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
              { id:"9-36-1", text:"AWS EC2: launch, SSH, Docker deploy, Nginx reverse proxy", tag:"AWS", yt:"https://www.youtube.com/watch?v=qNIniDftAcU", ytLabel:"AWS EC2 Deploy", hindiYt:"https://www.youtube.com/watch?v=pg19Z8LL06w", hindiYtLabel:"AWS Hindi Tutorial (Hitesh Choudhary)" , subtopics:[{"text": "MLOps fundamentals — ML + DevOps", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}, {"text": "ML lifecycle — experiment to prod", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}, {"text": "Made With ML — free course overview", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}, {"text": "MLflow experiment tracking", "yt": "https://www.youtube.com/watch?v=859OxXrt_TI"}], github:[{"name": "GokuMohandas/mlops-course", "url": "https://github.com/GokuMohandas/mlops-course", "desc": "MLOps course", "stars": "11k+"}, {"name": "mlflow/mlflow", "url": "https://github.com/mlflow/mlflow", "desc": "ML lifecycle", "stars": "19k+"}], resource:{"title": "Made With ML — Free Course", "url": "https://madewithml.com/"}},
              { id:"9-36-2", text:"AWS S3: store model weights, datasets, outputs, presigned URLs", tag:"AWS", yt:"https://www.youtube.com/watch?v=BKZP5IOXL5U", ytLabel:"AWS S3 Tutorial", hindiYt:"https://www.youtube.com/watch?v=pg19Z8LL06w", hindiYtLabel:"AWS Hindi Tutorial (Hitesh Choudhary)" , subtopics:[{"text": "GitHub Actions for ML — CI pipeline", "yt": "https://www.youtube.com/watch?v=R8_veQiYBjI"}, {"text": "Auto-run tests on every push", "yt": "https://www.youtube.com/watch?v=R8_veQiYBjI"}, {"text": "Docker build + push in CI", "yt": "https://www.youtube.com/watch?v=R8_veQiYBjI"}, {"text": "CD — deploy when tests pass", "yt": "https://www.youtube.com/watch?v=R8_veQiYBjI"}], github:[{"name": "GokuMohandas/mlops-course", "url": "https://github.com/GokuMohandas/mlops-course", "desc": "CI/CD for ML", "stars": "11k+"}], resource:{"title": "GitHub Actions Docs", "url": "https://docs.github.com/en/actions"}},
              { id:"9-36-3", text:"AWS ECR + ECS Fargate: serverless container deployment", tag:"AWS", yt:"https://www.youtube.com/watch?v=esISkPlnxL0", ytLabel:"AWS ECS Fargate", hindiYt:"https://www.youtube.com/watch?v=pg19Z8LL06w", hindiYtLabel:"AWS Hindi Tutorial (Hitesh Choudhary)" , subtopics:[{"text": "Data drift — input distribution shifts", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}, {"text": "Concept drift — target changes over time", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}, {"text": "Evidently AI — drift detection library", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}, {"text": "Set up monitoring dashboards", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}], github:[{"name": "evidentlyai/evidently", "url": "https://github.com/evidentlyai/evidently", "desc": "ML monitoring", "stars": "5.5k+"}], resource:{"title": "Evidently AI Docs", "url": "https://docs.evidentlyai.com/"}},
              { id:"9-36-4", text:"GCP Vertex AI: model registry, endpoints, batch prediction", tag:"GCP", yt:"https://www.youtube.com/watch?v=cNWVwYMGPzE", ytLabel:"Vertex AI Tutorial", hindiYt:"https://www.youtube.com/watch?v=pg19Z8LL06w", hindiYtLabel:"GCP Hindi Tutorial (Hitesh Choudhary)" , subtopics:[{"text": "MLOps fundamentals", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}, {"text": "MLflow experiment tracking", "yt": "https://www.youtube.com/watch?v=859OxXrt_TI"}, {"text": "CI/CD for ML pipelines", "yt": "https://www.youtube.com/watch?v=R8_veQiYBjI"}, {"text": "Model monitoring", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}], github:[{"name": "GokuMohandas/mlops-course", "url": "https://github.com/GokuMohandas/mlops-course", "desc": "MLOps course", "stars": "11k+"}], resource:{"title": "Made With ML", "url": "https://madewithml.com/"}},
              { id:"9-36-5", text:"Secrets management: AWS Secrets Manager, env variable best practices", tag:"Security", yt:"https://www.youtube.com/watch?v=xwVVMYzh9d4", ytLabel:"AWS Secrets Manager", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "MLOps fundamentals", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}, {"text": "MLflow experiment tracking", "yt": "https://www.youtube.com/watch?v=859OxXrt_TI"}, {"text": "CI/CD for ML pipelines", "yt": "https://www.youtube.com/watch?v=R8_veQiYBjI"}, {"text": "Model monitoring", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}], github:[{"name": "GokuMohandas/mlops-course", "url": "https://github.com/GokuMohandas/mlops-course", "desc": "MLOps course", "stars": "11k+"}], resource:{"title": "Made With ML", "url": "https://madewithml.com/"}},
            ]
          },
          {
            day: "TUE", label: "MLflow & Experiment Tracking",
            resource: "MLflow Docs",
            resourceUrl: "https://mlflow.org/docs/latest/index.html",
            chatgpt: "Set up MLflow for an ML experiment. Show: logging params and metrics, registering the model, transitioning production stage, and loading for inference. Include the full workflow.",
            topics: [
              { id:"9-36-6", text:"MLflow: log_param, log_metric, log_artifact, autolog()", tag:"MLflow", yt:"https://www.youtube.com/watch?v=yx-X3ZNGHlE", ytLabel:"MLflow Tutorial", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "MLOps fundamentals", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}, {"text": "MLflow experiment tracking", "yt": "https://www.youtube.com/watch?v=859OxXrt_TI"}, {"text": "CI/CD for ML pipelines", "yt": "https://www.youtube.com/watch?v=R8_veQiYBjI"}, {"text": "Model monitoring", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}], github:[{"name": "GokuMohandas/mlops-course", "url": "https://github.com/GokuMohandas/mlops-course", "desc": "MLOps course", "stars": "11k+"}], resource:{"title": "Made With ML", "url": "https://madewithml.com/"}},
              { id:"9-36-7", text:"MLflow Model Registry: staging, production, archiving", tag:"MLflow", yt:"https://www.youtube.com/watch?v=859OxXrt_TI", ytLabel:"MLflow Registry", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "MLOps fundamentals", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}, {"text": "MLflow experiment tracking", "yt": "https://www.youtube.com/watch?v=859OxXrt_TI"}, {"text": "CI/CD for ML pipelines", "yt": "https://www.youtube.com/watch?v=R8_veQiYBjI"}, {"text": "Model monitoring", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}], github:[{"name": "GokuMohandas/mlops-course", "url": "https://github.com/GokuMohandas/mlops-course", "desc": "MLOps course", "stars": "11k+"}], resource:{"title": "Made With ML", "url": "https://madewithml.com/"}},
              { id:"9-36-8", text:"Weights & Biases (wandb): sweeps, model artifacts, reports", tag:"wandb", yt:"https://www.youtube.com/watch?v=EEqKfWbM8Po", ytLabel:"wandb Tutorial", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "MLOps fundamentals", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}, {"text": "MLflow experiment tracking", "yt": "https://www.youtube.com/watch?v=859OxXrt_TI"}, {"text": "CI/CD for ML pipelines", "yt": "https://www.youtube.com/watch?v=R8_veQiYBjI"}, {"text": "Model monitoring", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}], github:[{"name": "GokuMohandas/mlops-course", "url": "https://github.com/GokuMohandas/mlops-course", "desc": "MLOps course", "stars": "11k+"}], resource:{"title": "Made With ML", "url": "https://madewithml.com/"}},
              { id:"9-36-9", text:"DVC: version datasets/models, dvc repro pipeline stages", tag:"DVC", yt:"https://www.youtube.com/watch?v=kLKBcPonMYw", ytLabel:"DVC Tutorial", hindiYt:"https://www.youtube.com/watch?v=9zUHg7xjIqQ", hindiYtLabel:"DVC MLOps Hindi (CampusX)" , subtopics:[{"text": "MLOps fundamentals", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}, {"text": "MLflow experiment tracking", "yt": "https://www.youtube.com/watch?v=859OxXrt_TI"}, {"text": "CI/CD for ML pipelines", "yt": "https://www.youtube.com/watch?v=R8_veQiYBjI"}, {"text": "Model monitoring", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}], github:[{"name": "GokuMohandas/mlops-course", "url": "https://github.com/GokuMohandas/mlops-course", "desc": "MLOps course", "stars": "11k+"}], resource:{"title": "Made With ML", "url": "https://madewithml.com/"}},
              { id:"9-36-10", text:"Feature stores: Feast basics — online/offline feature serving", tag:"Features", yt:"https://www.youtube.com/watch?v=Da_9HrJ7qGo", ytLabel:"Feast Feature Store", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "MLOps fundamentals", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}, {"text": "MLflow experiment tracking", "yt": "https://www.youtube.com/watch?v=859OxXrt_TI"}, {"text": "CI/CD for ML pipelines", "yt": "https://www.youtube.com/watch?v=R8_veQiYBjI"}, {"text": "Model monitoring", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}], github:[{"name": "GokuMohandas/mlops-course", "url": "https://github.com/GokuMohandas/mlops-course", "desc": "MLOps course", "stars": "11k+"}], resource:{"title": "Made With ML", "url": "https://madewithml.com/"}},
            ]
          },
          {
            day: "WED", label: "CI/CD for AI",
            resource: "GitHub Actions Docs",
            resourceUrl: "https://docs.github.com/en/actions",
            chatgpt: "Build a GitHub Actions pipeline for an AI app: run tests on PR, build Docker image on merge, push to ECR, deploy to EC2. Show the full YAML with secrets management.",
            topics: [
              { id:"9-36-11", text:"GitHub Actions: workflow, jobs, steps, secrets, matrix builds", tag:"CI/CD", yt:"https://www.youtube.com/watch?v=R8_veQiYBjI", ytLabel:"GitHub Actions", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "MLOps fundamentals", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}, {"text": "MLflow experiment tracking", "yt": "https://www.youtube.com/watch?v=859OxXrt_TI"}, {"text": "CI/CD for ML pipelines", "yt": "https://www.youtube.com/watch?v=R8_veQiYBjI"}, {"text": "Model monitoring", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}], github:[{"name": "GokuMohandas/mlops-course", "url": "https://github.com/GokuMohandas/mlops-course", "desc": "MLOps course", "stars": "11k+"}], resource:{"title": "Made With ML", "url": "https://madewithml.com/"}},
              { id:"9-36-12", text:"Pre-commit hooks: ruff, black, mypy, pytest before every commit", tag:"CI/CD", yt:"https://www.youtube.com/watch?v=psjz6rwzMdk", ytLabel:"Pre-commit Hooks", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "MLOps fundamentals", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}, {"text": "MLflow experiment tracking", "yt": "https://www.youtube.com/watch?v=859OxXrt_TI"}, {"text": "CI/CD for ML pipelines", "yt": "https://www.youtube.com/watch?v=R8_veQiYBjI"}, {"text": "Model monitoring", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}], github:[{"name": "GokuMohandas/mlops-course", "url": "https://github.com/GokuMohandas/mlops-course", "desc": "MLOps course", "stars": "11k+"}], resource:{"title": "Made With ML", "url": "https://madewithml.com/"}},
              { id:"9-36-13", text:"Docker image scanning: Trivy, Snyk for container vulnerabilities", tag:"Security", yt:"https://www.youtube.com/watch?v=l86Rz8nJ5Cs", ytLabel:"Container Security", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "MLOps fundamentals", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}, {"text": "MLflow experiment tracking", "yt": "https://www.youtube.com/watch?v=859OxXrt_TI"}, {"text": "CI/CD for ML pipelines", "yt": "https://www.youtube.com/watch?v=R8_veQiYBjI"}, {"text": "Model monitoring", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}], github:[{"name": "GokuMohandas/mlops-course", "url": "https://github.com/GokuMohandas/mlops-course", "desc": "MLOps course", "stars": "11k+"}], resource:{"title": "Made With ML", "url": "https://madewithml.com/"}},
              { id:"9-36-14", text:"Automated LLM eval in CI: RAGAS scores, regression detection", tag:"Eval", yt:"https://www.youtube.com/watch?v=1FiLNnZ1Yys", ytLabel:"LLM CI Eval", hindiYt:"https://www.youtube.com/watch?v=7uwa9aPbBRU", hindiYtLabel:"Model Eval Hindi (CampusX)" , subtopics:[{"text": "MLOps fundamentals", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}, {"text": "MLflow experiment tracking", "yt": "https://www.youtube.com/watch?v=859OxXrt_TI"}, {"text": "CI/CD for ML pipelines", "yt": "https://www.youtube.com/watch?v=R8_veQiYBjI"}, {"text": "Model monitoring", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}], github:[{"name": "GokuMohandas/mlops-course", "url": "https://github.com/GokuMohandas/mlops-course", "desc": "MLOps course", "stars": "11k+"}], resource:{"title": "Made With ML", "url": "https://madewithml.com/"}},
              { id:"9-36-15", text:"Blue-green deployments for zero-downtime AI model updates", tag:"Deploy", yt:"https://www.youtube.com/watch?v=K2RDFRqRE14", ytLabel:"Blue-Green Deploy", hindiYt:"https://www.youtube.com/watch?v=pg19Z8LL06w", hindiYtLabel:"Model Deploy Hindi (Hitesh Choudhary)" , subtopics:[{"text": "MLOps fundamentals", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}, {"text": "MLflow experiment tracking", "yt": "https://www.youtube.com/watch?v=859OxXrt_TI"}, {"text": "CI/CD for ML pipelines", "yt": "https://www.youtube.com/watch?v=R8_veQiYBjI"}, {"text": "Model monitoring", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}], github:[{"name": "GokuMohandas/mlops-course", "url": "https://github.com/GokuMohandas/mlops-course", "desc": "MLOps course", "stars": "11k+"}], resource:{"title": "Made With ML", "url": "https://madewithml.com/"}},
            ]
          },
          {
            day: "THU", label: "LLM Monitoring",
            resource: "LangSmith Docs",
            resourceUrl: "https://docs.smith.langchain.com/",
            chatgpt: "Design a monitoring system for a production LLM app. What metrics to track? How to detect: quality degradation, prompt injections, cost spikes, unusual patterns, and API failures?",
            topics: [
              { id:"9-36-16", text:"LangSmith: production tracing, A/B prompt testing, evals", tag:"LLMOps", yt:"https://www.youtube.com/watch?v=Hab2CV_0hpQ", ytLabel:"LangSmith Production", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "MLOps fundamentals", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}, {"text": "MLflow experiment tracking", "yt": "https://www.youtube.com/watch?v=859OxXrt_TI"}, {"text": "CI/CD for ML pipelines", "yt": "https://www.youtube.com/watch?v=R8_veQiYBjI"}, {"text": "Model monitoring", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}], github:[{"name": "GokuMohandas/mlops-course", "url": "https://github.com/GokuMohandas/mlops-course", "desc": "MLOps course", "stars": "11k+"}], resource:{"title": "Made With ML", "url": "https://madewithml.com/"}},
              { id:"9-36-17", text:"Prometheus + Grafana: metrics dashboards for AI APIs", tag:"Monitoring", yt:"https://www.youtube.com/watch?v=h4Sl21AKiDg", ytLabel:"Prometheus Grafana", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "MLOps fundamentals", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}, {"text": "MLflow experiment tracking", "yt": "https://www.youtube.com/watch?v=859OxXrt_TI"}, {"text": "CI/CD for ML pipelines", "yt": "https://www.youtube.com/watch?v=R8_veQiYBjI"}, {"text": "Model monitoring", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}], github:[{"name": "GokuMohandas/mlops-course", "url": "https://github.com/GokuMohandas/mlops-course", "desc": "MLOps course", "stars": "11k+"}], resource:{"title": "Made With ML", "url": "https://madewithml.com/"}},
              { id:"9-36-18", text:"Token cost tracking: OpenMeter, per-user billing", tag:"Cost", yt:"https://www.youtube.com/watch?v=OB99E7Y1cMA", ytLabel:"LLM Cost Tracking", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "MLOps fundamentals", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}, {"text": "MLflow experiment tracking", "yt": "https://www.youtube.com/watch?v=859OxXrt_TI"}, {"text": "CI/CD for ML pipelines", "yt": "https://www.youtube.com/watch?v=R8_veQiYBjI"}, {"text": "Model monitoring", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}], github:[{"name": "GokuMohandas/mlops-course", "url": "https://github.com/GokuMohandas/mlops-course", "desc": "MLOps course", "stars": "11k+"}], resource:{"title": "Made With ML", "url": "https://madewithml.com/"}},
              { id:"9-36-19", text:"Data drift detection: Evidently AI for model monitoring", tag:"Monitoring", yt:"https://www.youtube.com/watch?v=L4Pv6ExBQPM", ytLabel:"Evidently Tutorial", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "MLOps fundamentals", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}, {"text": "MLflow experiment tracking", "yt": "https://www.youtube.com/watch?v=859OxXrt_TI"}, {"text": "CI/CD for ML pipelines", "yt": "https://www.youtube.com/watch?v=R8_veQiYBjI"}, {"text": "Model monitoring", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}], github:[{"name": "GokuMohandas/mlops-course", "url": "https://github.com/GokuMohandas/mlops-course", "desc": "MLOps course", "stars": "11k+"}], resource:{"title": "Made With ML", "url": "https://madewithml.com/"}},
              { id:"9-36-20", text:"Alerting: PagerDuty/Slack for production incidents", tag:"Alerts", yt:"https://www.youtube.com/watch?v=h4Sl21AKiDg", ytLabel:"Monitoring Alerts", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "MLOps fundamentals", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}, {"text": "MLflow experiment tracking", "yt": "https://www.youtube.com/watch?v=859OxXrt_TI"}, {"text": "CI/CD for ML pipelines", "yt": "https://www.youtube.com/watch?v=R8_veQiYBjI"}, {"text": "Model monitoring", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}], github:[{"name": "GokuMohandas/mlops-course", "url": "https://github.com/GokuMohandas/mlops-course", "desc": "MLOps course", "stars": "11k+"}], resource:{"title": "Made With ML", "url": "https://madewithml.com/"}},
            ]
          },
          {
            day: "FRI", label: "Serverless & Edge AI",
            resource: "Modal.com Docs",
            resourceUrl: "https://modal.com/docs",
            chatgpt: "Compare serverless deployment for AI: Modal.com vs AWS Lambda vs HuggingFace Spaces vs Replicate. When to use each? Show a Modal.com deployment for a transformer model with GPU.",
            topics: [
              { id:"9-36-21", text:"Modal.com: deploy Python as serverless GPU — cheapest option", tag:"Serverless", yt:"https://www.youtube.com/watch?v=4tl-bVjjzLM", ytLabel:"Modal.com Tutorial", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "MLOps fundamentals", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}, {"text": "MLflow experiment tracking", "yt": "https://www.youtube.com/watch?v=859OxXrt_TI"}, {"text": "CI/CD for ML pipelines", "yt": "https://www.youtube.com/watch?v=R8_veQiYBjI"}, {"text": "Model monitoring", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}], github:[{"name": "GokuMohandas/mlops-course", "url": "https://github.com/GokuMohandas/mlops-course", "desc": "MLOps course", "stars": "11k+"}], resource:{"title": "Made With ML", "url": "https://madewithml.com/"}},
              { id:"9-36-22", text:"vLLM: serve open-source LLMs at production scale (PagedAttention)", tag:"Serving", yt:"https://www.youtube.com/watch?v=80bIUggRJf4", ytLabel:"vLLM Tutorial", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "MLOps fundamentals", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}, {"text": "MLflow experiment tracking", "yt": "https://www.youtube.com/watch?v=859OxXrt_TI"}, {"text": "CI/CD for ML pipelines", "yt": "https://www.youtube.com/watch?v=R8_veQiYBjI"}, {"text": "Model monitoring", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}], github:[{"name": "GokuMohandas/mlops-course", "url": "https://github.com/GokuMohandas/mlops-course", "desc": "MLOps course", "stars": "11k+"}], resource:{"title": "Made With ML", "url": "https://madewithml.com/"}},
              { id:"9-36-23", text:"Replicate: one-line model hosting for open-source models", tag:"Serving", yt:"https://www.youtube.com/watch?v=nByFKCHBnT0", ytLabel:"Replicate Tutorial", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "MLOps fundamentals", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}, {"text": "MLflow experiment tracking", "yt": "https://www.youtube.com/watch?v=859OxXrt_TI"}, {"text": "CI/CD for ML pipelines", "yt": "https://www.youtube.com/watch?v=R8_veQiYBjI"}, {"text": "Model monitoring", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}], github:[{"name": "GokuMohandas/mlops-course", "url": "https://github.com/GokuMohandas/mlops-course", "desc": "MLOps course", "stars": "11k+"}], resource:{"title": "Made With ML", "url": "https://madewithml.com/"}},
              { id:"9-36-24", text:"Kubernetes basics: pods, services, deployments, ingress", tag:"K8s", yt:"https://www.youtube.com/watch?v=X48VuDVv0do", ytLabel:"Kubernetes Full Course", hindiYt:"https://www.youtube.com/watch?v=pg19Z8LL06w", hindiYtLabel:"Kubernetes Hindi (Hitesh Choudhary)" , subtopics:[{"text": "MLOps fundamentals", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}, {"text": "MLflow experiment tracking", "yt": "https://www.youtube.com/watch?v=859OxXrt_TI"}, {"text": "CI/CD for ML pipelines", "yt": "https://www.youtube.com/watch?v=R8_veQiYBjI"}, {"text": "Model monitoring", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}], github:[{"name": "GokuMohandas/mlops-course", "url": "https://github.com/GokuMohandas/mlops-course", "desc": "MLOps course", "stars": "11k+"}], resource:{"title": "Made With ML", "url": "https://madewithml.com/"}},
              { id:"9-36-25", text:"Terraform: infrastructure as code for AI cloud resources", tag:"IaC", yt:"https://www.youtube.com/watch?v=SLB_c_ayRMo", ytLabel:"Terraform Tutorial", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "MLOps fundamentals", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}, {"text": "MLflow experiment tracking", "yt": "https://www.youtube.com/watch?v=859OxXrt_TI"}, {"text": "CI/CD for ML pipelines", "yt": "https://www.youtube.com/watch?v=R8_veQiYBjI"}, {"text": "Model monitoring", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}], github:[{"name": "GokuMohandas/mlops-course", "url": "https://github.com/GokuMohandas/mlops-course", "desc": "MLOps course", "stars": "11k+"}], resource:{"title": "Made With ML", "url": "https://madewithml.com/"}},
            ]
          },
          {
            day: "SAT", label: "Production Projects",
            resource: "Made With ML – MLOps",
            resourceUrl: "https://madewithml.com/",
            chatgpt: "I've deployed an AI API to AWS. Help me run a load test with locust to find bottlenecks. Show the locust test script, how to interpret results, what to scale first (concurrency, memory, caching).",
            topics: [
              { id:"9-36-26", text:"🏗 BUILD: Full CI/CD pipeline — test → build → deploy to AWS", tag:"Project", yt:"https://www.youtube.com/watch?v=R8_veQiYBJI", ytLabel:"CI/CD Pipeline", hindiYt:"https://www.youtube.com/watch?v=aqvDTCpNRek", hindiYtLabel:"Python Project Hindi (CodeWithHarry)" , subtopics:[{"text": "MLOps fundamentals", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}, {"text": "MLflow experiment tracking", "yt": "https://www.youtube.com/watch?v=859OxXrt_TI"}, {"text": "CI/CD for ML pipelines", "yt": "https://www.youtube.com/watch?v=R8_veQiYBjI"}, {"text": "Model monitoring", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}], github:[{"name": "GokuMohandas/mlops-course", "url": "https://github.com/GokuMohandas/mlops-course", "desc": "MLOps course", "stars": "11k+"}], resource:{"title": "Made With ML", "url": "https://madewithml.com/"}},
              { id:"9-36-27", text:"🏗 BUILD: LLM monitoring dashboard with LangSmith + Grafana", tag:"Project", yt:"https://www.youtube.com/watch?v=Hab2CV_0hpQ", ytLabel:"Monitoring Project", hindiYt:"https://www.youtube.com/watch?v=aqvDTCpNRek", hindiYtLabel:"Python Project Hindi (CodeWithHarry)" , subtopics:[{"text": "MLOps fundamentals", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}, {"text": "MLflow experiment tracking", "yt": "https://www.youtube.com/watch?v=859OxXrt_TI"}, {"text": "CI/CD for ML pipelines", "yt": "https://www.youtube.com/watch?v=R8_veQiYBjI"}, {"text": "Model monitoring", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}], github:[{"name": "GokuMohandas/mlops-course", "url": "https://github.com/GokuMohandas/mlops-course", "desc": "MLOps course", "stars": "11k+"}], resource:{"title": "Made With ML", "url": "https://madewithml.com/"}},
              { id:"9-36-28", text:"Load test with locust — find and fix API bottlenecks", tag:"Perf", yt:"https://www.youtube.com/watch?v=zvBkqkfIid8", ytLabel:"Load Testing", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "MLOps fundamentals", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}, {"text": "MLflow experiment tracking", "yt": "https://www.youtube.com/watch?v=859OxXrt_TI"}, {"text": "CI/CD for ML pipelines", "yt": "https://www.youtube.com/watch?v=R8_veQiYBjI"}, {"text": "Model monitoring", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}], github:[{"name": "GokuMohandas/mlops-course", "url": "https://github.com/GokuMohandas/mlops-course", "desc": "MLOps course", "stars": "11k+"}], resource:{"title": "Made With ML", "url": "https://madewithml.com/"}},
            ]
          },
          {
            day: "SUN", label: "Review & Architecture",
            resource: "Full Stack Deep Learning",
            resourceUrl: "https://fullstackdeeplearning.com/",
            chatgpt: "Quiz me on MLOps: CI/CD for ML, model monitoring, cloud deployment, cost optimization, and production incident response. Ask 10 questions with detailed explanations.",
            topics: [
              { id:"9-36-29", text:"ML system design: design a production RAG system (diagrams)", tag:"Design", yt:"https://www.youtube.com/watch?v=yfHHvmaMkcA", ytLabel:"ML System Design", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "MLOps fundamentals", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}, {"text": "MLflow experiment tracking", "yt": "https://www.youtube.com/watch?v=859OxXrt_TI"}, {"text": "CI/CD for ML pipelines", "yt": "https://www.youtube.com/watch?v=R8_veQiYBjI"}, {"text": "Model monitoring", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}], github:[{"name": "GokuMohandas/mlops-course", "url": "https://github.com/GokuMohandas/mlops-course", "desc": "MLOps course", "stars": "11k+"}], resource:{"title": "Made With ML", "url": "https://madewithml.com/"}},
              { id:"9-36-30", text:"Review all deployed projects — add monitoring and alerts", tag:"Review", yt:"https://www.youtube.com/watch?v=L4Pv6ExBQPM", ytLabel:"Production Review", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "MLOps fundamentals", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}, {"text": "MLflow experiment tracking", "yt": "https://www.youtube.com/watch?v=859OxXrt_TI"}, {"text": "CI/CD for ML pipelines", "yt": "https://www.youtube.com/watch?v=R8_veQiYBjI"}, {"text": "Model monitoring", "yt": "https://www.youtube.com/watch?v=6Jfk8ic3KVk"}], github:[{"name": "GokuMohandas/mlops-course", "url": "https://github.com/GokuMohandas/mlops-course", "desc": "MLOps course", "stars": "11k+"}], resource:{"title": "Made With ML", "url": "https://madewithml.com/"}},
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
              { id:"10-39-1", text:"Audit all GitHub repos: clean code, README, live demos", tag:"Portfolio", yt:"https://www.youtube.com/watch?v=n6d4KHSKqGk", ytLabel:"GitHub Portfolio Guide", hindiYt:"https://www.youtube.com/watch?v=4IySRE9nVSk", hindiYtLabel:"AI Portfolio Hindi (Apna College)" , subtopics:[{"text": "GitHub profile README — great first impression", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "Pin 6 best repos — what to show", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "Contribution graph — stay consistent", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "Write great READMEs — demo GIFs", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}], github:[{"name": "abhisheknaiidu/awesome-github-profile-readme", "url": "https://github.com/abhisheknaiidu/awesome-github-profile-readme", "desc": "Best profiles", "stars": "24k+"}, {"name": "matiassingers/awesome-readme", "url": "https://github.com/matiassingers/awesome-readme", "desc": "README examples", "stars": "21k+"}], resource:{"title": "GitHub Profile README Guide", "url": "https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme"}},
              { id:"10-39-2", text:"Deploy 3 best projects with live Hugging Face Spaces demos", tag:"Deploy", yt:"https://www.youtube.com/watch?v=pxISiqfmoak", ytLabel:"HF Spaces Deploy", hindiYt:"https://www.youtube.com/watch?v=pg19Z8LL06w", hindiYtLabel:"Model Deploy Hindi (Hitesh Choudhary)" , subtopics:[{"text": "5 AI projects that actually get you hired", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "RAG chatbot — most in-demand", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "AI agent with real tools", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "Deploy to public URL — Vercel/Render", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}], github:[{"name": "matiassingers/awesome-readme", "url": "https://github.com/matiassingers/awesome-readme", "desc": "Project README examples", "stars": "21k+"}], resource:{"title": "Vercel Deployment Guide", "url": "https://vercel.com/docs"}},
              { id:"10-39-3", text:"Add architecture diagrams to each project (Excalidraw)", tag:"Docs", yt:"https://www.youtube.com/watch?v=nByFKCHBnT0", ytLabel:"Technical Diagrams", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "LinkedIn headline — 'AI Engineer | Built X'", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "LinkedIn about — what you build, not study", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "Post about what you're building", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "Connect with AI engineers at target companies", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}], github:[{"name": "abhisheknaiidu/awesome-github-profile-readme", "url": "https://github.com/abhisheknaiidu/awesome-github-profile-readme", "desc": "Profile examples", "stars": "24k+"}], resource:{"title": "LinkedIn for Developers Guide", "url": "https://www.linkedin.com/help/linkedin/answer/a541981"}},
            ]
          },
          {
            day: "TUE", label: "Resume & LinkedIn",
            resource: "AI Engineer Job Boards",
            resourceUrl: "https://www.levels.fyi/",
            chatgpt: "Review my AI Engineer resume [paste]. For each bullet: does it show impact? Is it quantified? Does it include right ATS keywords? Rewrite any weak bullets. Add missing skills from this job description: [paste JD].",
            topics: [
              { id:"10-39-4", text:"Tailor resume for AI/ML Engineer, LLM Engineer roles", tag:"Jobs", yt:"https://www.youtube.com/watch?v=u75hUSShvnc", ytLabel:"Tech Resume Guide", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "Portfolio project selection", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "GitHub profile optimization", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "LinkedIn optimization for AI roles", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "Technical interview preparation", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}], github:[{"name": "abhisheknaiidu/awesome-github-profile-readme", "url": "https://github.com/abhisheknaiidu/awesome-github-profile-readme", "desc": "Profile examples", "stars": "24k+"}], resource:{"title": "GitHub Profile Guide", "url": "https://docs.github.com/en/account-and-profile"}},
              { id:"10-39-5", text:"LinkedIn: headline, about section, featured projects, skills", tag:"LinkedIn", yt:"https://www.youtube.com/watch?v=4RsEXpZo_cA", ytLabel:"LinkedIn for Engineers", hindiYt:"https://www.youtube.com/watch?v=VNvTMh4wb0w", hindiYtLabel:"LinkedIn AI Hindi (Apna College)" , subtopics:[{"text": "Portfolio project selection", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "GitHub profile optimization", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "LinkedIn optimization for AI roles", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "Technical interview preparation", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}], github:[{"name": "abhisheknaiidu/awesome-github-profile-readme", "url": "https://github.com/abhisheknaiidu/awesome-github-profile-readme", "desc": "Profile examples", "stars": "24k+"}], resource:{"title": "GitHub Profile Guide", "url": "https://docs.github.com/en/account-and-profile"}},
              { id:"10-39-6", text:"Write a cold outreach message to AI engineers at target companies", tag:"Networking", yt:"https://www.youtube.com/watch?v=m87YGiRW5sA", ytLabel:"Tech Networking", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "Portfolio project selection", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "GitHub profile optimization", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "LinkedIn optimization for AI roles", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "Technical interview preparation", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}], github:[{"name": "abhisheknaiidu/awesome-github-profile-readme", "url": "https://github.com/abhisheknaiidu/awesome-github-profile-readme", "desc": "Profile examples", "stars": "24k+"}], resource:{"title": "GitHub Profile Guide", "url": "https://docs.github.com/en/account-and-profile"}},
            ]
          },
          {
            day: "WED", label: "Technical Interview Prep",
            resource: "Grokking ML Interview",
            resourceUrl: "https://www.educative.io/courses/grokking-the-machine-learning-interview",
            chatgpt: "Conduct a mock AI system design interview. Ask me to design a production RAG system for customer support at scale. Ask follow-up questions like a real interviewer. Give detailed feedback.",
            topics: [
              { id:"10-39-7", text:"LLM system design: RAG, chatbot, AI agent — 10 practice Qs", tag:"Interview", yt:"https://www.youtube.com/watch?v=yfHHvmaMkcA", ytLabel:"AI System Design", hindiYt:"https://www.youtube.com/watch?v=4IySRE9nVSk", hindiYtLabel:"AI Interview Hindi (Apna College)" , subtopics:[{"text": "Portfolio project selection", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "GitHub profile optimization", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "LinkedIn optimization for AI roles", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "Technical interview preparation", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}], github:[{"name": "abhisheknaiidu/awesome-github-profile-readme", "url": "https://github.com/abhisheknaiidu/awesome-github-profile-readme", "desc": "Profile examples", "stars": "24k+"}], resource:{"title": "GitHub Profile Guide", "url": "https://docs.github.com/en/account-and-profile"}},
              { id:"10-39-8", text:"ML fundamentals Q&A: top 50 interview questions", tag:"Interview", yt:"https://www.youtube.com/watch?v=1gf5MLpCosY", ytLabel:"ML Interview Prep", hindiYt:"https://www.youtube.com/watch?v=4IySRE9nVSk", hindiYtLabel:"AI Interview Hindi (Apna College)" , subtopics:[{"text": "Portfolio project selection", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "GitHub profile optimization", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "LinkedIn optimization for AI roles", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "Technical interview preparation", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}], github:[{"name": "abhisheknaiidu/awesome-github-profile-readme", "url": "https://github.com/abhisheknaiidu/awesome-github-profile-readme", "desc": "Profile examples", "stars": "24k+"}], resource:{"title": "GitHub Profile Guide", "url": "https://docs.github.com/en/account-and-profile"}},
              { id:"10-39-9", text:"LeetCode: 20 Easy + 20 Medium Python problems (arrays, graphs)", tag:"Coding", yt:"https://www.youtube.com/watch?v=0K_eZGS5NsU", ytLabel:"LeetCode Python", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "Portfolio project selection", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "GitHub profile optimization", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "LinkedIn optimization for AI roles", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "Technical interview preparation", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}], github:[{"name": "abhisheknaiidu/awesome-github-profile-readme", "url": "https://github.com/abhisheknaiidu/awesome-github-profile-readme", "desc": "Profile examples", "stars": "24k+"}], resource:{"title": "GitHub Profile Guide", "url": "https://docs.github.com/en/account-and-profile"}},
            ]
          },
          {
            day: "THU", label: "Open Source Contributions",
            resource: "GitHub Good First Issues",
            resourceUrl: "https://goodfirstissue.dev/",
            chatgpt: "I want to contribute to open source AI. Help me find: beginner-friendly issues in LangChain, LlamaIndex, or HuggingFace. What contribution would be most valuable? How to write a good first PR?",
            topics: [
              { id:"10-39-10", text:"Find and fix a bug in LangChain, LlamaIndex, or HuggingFace", tag:"OpenSource", yt:"https://www.youtube.com/watch?v=yzeVMecydCE", ytLabel:"Open Source Guide", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "Portfolio project selection", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "GitHub profile optimization", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "LinkedIn optimization for AI roles", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "Technical interview preparation", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}], github:[{"name": "abhisheknaiidu/awesome-github-profile-readme", "url": "https://github.com/abhisheknaiidu/awesome-github-profile-readme", "desc": "Profile examples", "stars": "24k+"}], resource:{"title": "GitHub Profile Guide", "url": "https://docs.github.com/en/account-and-profile"}},
              { id:"10-39-11", text:"Write a technical blog post about your best project", tag:"Content", yt:"https://www.youtube.com/watch?v=AuCRqLRa4q0", ytLabel:"Technical Writing", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "Portfolio project selection", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "GitHub profile optimization", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "LinkedIn optimization for AI roles", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "Technical interview preparation", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}], github:[{"name": "abhisheknaiidu/awesome-github-profile-readme", "url": "https://github.com/abhisheknaiidu/awesome-github-profile-readme", "desc": "Profile examples", "stars": "24k+"}], resource:{"title": "GitHub Profile Guide", "url": "https://docs.github.com/en/account-and-profile"}},
              { id:"10-39-12", text:"Post on LinkedIn + Twitter/X with code snippets — build audience", tag:"Marketing", yt:"https://www.youtube.com/watch?v=kKdMqMfGgxQ", ytLabel:"Dev Content Strategy", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "Portfolio project selection", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "GitHub profile optimization", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "LinkedIn optimization for AI roles", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "Technical interview preparation", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}], github:[{"name": "abhisheknaiidu/awesome-github-profile-readme", "url": "https://github.com/abhisheknaiidu/awesome-github-profile-readme", "desc": "Profile examples", "stars": "24k+"}], resource:{"title": "GitHub Profile Guide", "url": "https://docs.github.com/en/account-and-profile"}},
            ]
          },
          {
            day: "FRI", label: "Mock Interviews",
            resource: "interviewing.io",
            resourceUrl: "https://interviewing.io/",
            chatgpt: "Give me 5 behavioral interview questions for AI Engineering roles. For each question, help me craft a STAR-format answer based on my project experience: [describe your projects briefly].",
            topics: [
              { id:"10-39-13", text:"3 mock system design interviews (record and review yourself)", tag:"Interview", yt:"https://www.youtube.com/watch?v=yfHHvmaMkcA", ytLabel:"System Design Practice", hindiYt:"https://www.youtube.com/watch?v=4IySRE9nVSk", hindiYtLabel:"AI Interview Hindi (Apna College)" , subtopics:[{"text": "Portfolio project selection", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "GitHub profile optimization", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "LinkedIn optimization for AI roles", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "Technical interview preparation", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}], github:[{"name": "abhisheknaiidu/awesome-github-profile-readme", "url": "https://github.com/abhisheknaiidu/awesome-github-profile-readme", "desc": "Profile examples", "stars": "24k+"}], resource:{"title": "GitHub Profile Guide", "url": "https://docs.github.com/en/account-and-profile"}},
              { id:"10-39-14", text:"Behavioral: STAR format for 10 key situations", tag:"Interview", yt:"https://www.youtube.com/watch?v=PJKYqLP6MRo", ytLabel:"Behavioral Interview", hindiYt:"https://www.youtube.com/watch?v=4IySRE9nVSk", hindiYtLabel:"AI Interview Hindi (Apna College)" , subtopics:[{"text": "Portfolio project selection", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "GitHub profile optimization", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "LinkedIn optimization for AI roles", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "Technical interview preparation", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}], github:[{"name": "abhisheknaiidu/awesome-github-profile-readme", "url": "https://github.com/abhisheknaiidu/awesome-github-profile-readme", "desc": "Profile examples", "stars": "24k+"}], resource:{"title": "GitHub Profile Guide", "url": "https://docs.github.com/en/account-and-profile"}},
              { id:"10-39-15", text:"Apply to 20 AI Engineer / ML Engineer / LLM Engineer positions", tag:"Jobs", yt:"https://www.youtube.com/watch?v=m87YGiRW5sA", ytLabel:"Job Search Strategy", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "Portfolio project selection", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "GitHub profile optimization", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "LinkedIn optimization for AI roles", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "Technical interview preparation", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}], github:[{"name": "abhisheknaiidu/awesome-github-profile-readme", "url": "https://github.com/abhisheknaiidu/awesome-github-profile-readme", "desc": "Profile examples", "stars": "24k+"}], resource:{"title": "GitHub Profile Guide", "url": "https://docs.github.com/en/account-and-profile"}},
            ]
          },
          {
            day: "SAT", label: "Community & Networking",
            resource: "HuggingFace Discord",
            resourceUrl: "https://discord.gg/huggingface",
            chatgpt: "Write me a LinkedIn announcement post saying I'm available for AI Engineer roles. Mention my top 3 projects and key skills. Make it specific, authentic, and attention-grabbing for recruiters.",
            topics: [
              { id:"10-39-16", text:"Join: HuggingFace Discord, LangChain Discord, r/MachineLearning", tag:"Community", yt:"https://www.youtube.com/watch?v=kKdMqMfGgxQ", ytLabel:"AI Community", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "Portfolio project selection", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "GitHub profile optimization", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "LinkedIn optimization for AI roles", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "Technical interview preparation", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}], github:[{"name": "abhisheknaiidu/awesome-github-profile-readme", "url": "https://github.com/abhisheknaiidu/awesome-github-profile-readme", "desc": "Profile examples", "stars": "24k+"}], resource:{"title": "GitHub Profile Guide", "url": "https://docs.github.com/en/account-and-profile"}},
              { id:"10-39-17", text:"Add project to Awesome-LLM or Papers With Code", tag:"Visibility", yt:"https://www.youtube.com/watch?v=yzeVMecydCE", ytLabel:"Open Source Visibility", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "Portfolio project selection", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "GitHub profile optimization", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "LinkedIn optimization for AI roles", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "Technical interview preparation", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}], github:[{"name": "abhisheknaiidu/awesome-github-profile-readme", "url": "https://github.com/abhisheknaiidu/awesome-github-profile-readme", "desc": "Profile examples", "stars": "24k+"}], resource:{"title": "GitHub Profile Guide", "url": "https://docs.github.com/en/account-and-profile"}},
              { id:"10-39-18", text:"Schedule and attend 5 AI engineer coffee chats via LinkedIn", tag:"Networking", yt:"https://www.youtube.com/watch?v=m87YGiRW5sA", ytLabel:"Engineering Networking", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "Portfolio project selection", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "GitHub profile optimization", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "LinkedIn optimization for AI roles", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "Technical interview preparation", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}], github:[{"name": "abhisheknaiidu/awesome-github-profile-readme", "url": "https://github.com/abhisheknaiidu/awesome-github-profile-readme", "desc": "Profile examples", "stars": "24k+"}], resource:{"title": "GitHub Profile Guide", "url": "https://docs.github.com/en/account-and-profile"}},
            ]
          },
          {
            day: "SUN", label: "🚀 Launch Day",
            resource: "Levels.fyi – AI Engineer Salaries",
            resourceUrl: "https://www.levels.fyi/t/machine-learning-engineer",
            chatgpt: "I'm an AI engineer with these projects: [list them] and skills: [list them]. What's my estimated market value? What companies should I target first (best fit for my skills)? What's my 30-day action plan?",
            topics: [
              { id:"10-39-19", text:"🚀 Submit applications, share publicly, follow up in 5 days", tag:"Launch", yt:"https://www.youtube.com/watch?v=u75hUSShvnc", ytLabel:"Job Application Tips", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "Portfolio project selection", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "GitHub profile optimization", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "LinkedIn optimization for AI roles", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "Technical interview preparation", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}], github:[{"name": "abhisheknaiidu/awesome-github-profile-readme", "url": "https://github.com/abhisheknaiidu/awesome-github-profile-readme", "desc": "Profile examples", "stars": "24k+"}], resource:{"title": "GitHub Profile Guide", "url": "https://docs.github.com/en/account-and-profile"}},
              { id:"10-39-20", text:"Track applications in Notion/spreadsheet — measure, iterate", tag:"Process", yt:"https://www.youtube.com/watch?v=OB99E7Y1cMA", ytLabel:"Job Search Tracking", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "Portfolio project selection", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "GitHub profile optimization", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "LinkedIn optimization for AI roles", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "Technical interview preparation", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}], github:[{"name": "abhisheknaiidu/awesome-github-profile-readme", "url": "https://github.com/abhisheknaiidu/awesome-github-profile-readme", "desc": "Profile examples", "stars": "24k+"}], resource:{"title": "GitHub Profile Guide", "url": "https://docs.github.com/en/account-and-profile"}},
              { id:"10-39-21", text:"Keep shipping — open source, blog posts, new projects", tag:"Mindset", yt:"https://www.youtube.com/watch?v=kCc8FmEb1nY", ytLabel:"Stay Consistent", hindiYt:"https://www.youtube.com/watch?v=Frim5el0buQ", hindiYtLabel:"Hindi Tutorial (CampusX)" , subtopics:[{"text": "Portfolio project selection", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "GitHub profile optimization", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "LinkedIn optimization for AI roles", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}, {"text": "Technical interview preparation", "yt": "https://www.youtube.com/watch?v=KhGWbt1dAKQ"}], github:[{"name": "abhisheknaiidu/awesome-github-profile-readme", "url": "https://github.com/abhisheknaiidu/awesome-github-profile-readme", "desc": "Profile examples", "stars": "24k+"}], resource:{"title": "GitHub Profile Guide", "url": "https://docs.github.com/en/account-and-profile"}},
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
