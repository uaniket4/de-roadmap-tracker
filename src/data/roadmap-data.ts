// src/data/roadmap-data.ts
// ============================================================
// SOURCE OF TRUTH — DO NOT MODIFY CONTENT
// Exact conversion of de_execution_planner_9month.html
// ============================================================

export interface Task {
  content: string;
  isDSA: boolean;
  isCoding: boolean;
}

export interface Day {
  d: string;
  title: string;
  tasks: string[];
  commit: string | null;
  deliverable: string | null;
  time: string;
  skipOk: boolean;
}

export interface Week {
  w: number;
  title: string;
  sub: string;
  phase: string;
  days: Day[];
}

export interface Phase {
  id: string;
  label: string;
  color: string;
  bg: string;
  weeks: number[];
  period: string;
  project: string;
  hours: number;
}

export const PHASES: Phase[] = [
  {
    id: "p1", label: "Phase 1 — Foundation", color: "#378ADD", bg: "#E6F1FB", weeks: [1,2,3,4,5,6],
    period: "Jun–Jul 2026", project: "DataFlow CLI", hours: 15
  },
  {
    id: "p2", label: "Phase 2 — Docker & Cloud", color: "#1D9E75", bg: "#EAF3DE", weeks: [7,8,9,10],
    period: "Aug 2026", project: "StockFlow API", hours: 18
  },
  {
    id: "p3", label: "Phase 3 — Airflow/Spark/dbt", color: "#7F77DD", bg: "#EEEDFE", weeks: [11,12,13,14,15,16],
    period: "Sep–Oct 2026", project: "RetailPulse", hours: 18
  },
  {
    id: "p4", label: "Phase 4 — Kafka Streaming", color: "#BA7517", bg: "#FAEEDA", weeks: [17,18,19],
    period: "Nov 2026", project: "FraudRadar", hours: 28
  },
  {
    id: "p5", label: "Phase 5 — K8s & Cloud", color: "#0F6E56", bg: "#E1F5EE", weeks: [20,21,22,23],
    period: "Nov–Dec 2026", project: "AirK8s", hours: 28
  },
  {
    id: "p6", label: "Phase 6 — LLM & RAG", color: "#712B13", bg: "#FAECE7", weeks: [24,25,26],
    period: "Dec 2026", project: "DocMind", hours: 28
  },
  {
    id: "p7", label: "Capstone", color: "#D4537E", bg: "#FBEAF0", weeks: [27,28,29,30],
    period: "Jan 2027", project: "DataPlatform OS", hours: 35
  },
  {
    id: "p8", label: "Phase 8 — Interview Prep", color: "#791F1F", bg: "#FCEBEB", weeks: [31,32,33,34,35,36,37,38,39],
    period: "Jan–Feb 2027", project: "Offers", hours: 35
  }
];

export const WEEK_DATA: Week[] = [
  {w:1,title:"Python foundations I",sub:"Lists, dicts, sets, comprehensions",phase:"p1",
    days:[
      {d:"Mon",title:"Python setup + data structures",tasks:["Install Python 3.12, VS Code, set up venv","Complete Corey Schafer: Lists & tuples episode","Write 3 scripts: list comprehensions, dict manipulation, set ops","DSA: 2 arrays problems on LeetCode (Easy)"],commit:"chore: setup python env + first scripts",deliverable:null,time:"3h",skipOk:false},
      {d:"Tue",title:"Dictionaries + comprehensions deep dive",tasks:["Dict comprehensions, nested dicts, .get()/.setdefault()","Corey Schafer: Dictionaries episode","Build a word frequency counter from a text file","DSA: 2 hashing problems (Two Sum, Contains Duplicate)"],commit:"feat: word freq counter script",deliverable:null,time:"2.5h",skipOk:false},
      {d:"Wed",title:"Functions + error handling",tasks:["Functions: *args, **kwargs, decorators intro","Try/except/finally, custom exceptions","Write a config loader with validation + error messages","DSA: Sliding window — Max sum subarray (Easy/Med)"],commit:"feat: config loader with validation",deliverable:null,time:"2.5h",skipOk:false},
      {d:"Thu",title:"File I/O + OOP basics",tasks:["Read/write CSV, JSON, text files","OOP: classes, __init__, methods, inheritance","Build a Student grade tracker class","DSA: Two pointer — Valid palindrome, 3Sum (Easy+Med)"],commit:"feat: grade tracker OOP class",deliverable:null,time:"2.5h",skipOk:false},
      {d:"Fri",title:"Pandas intro + real data",tasks:["Install pandas, read Kaggle CSV (Superstore)","df.head(), .info(), .describe(), .value_counts()","Clean nulls, rename columns, filter rows","DSA: Stack — Valid parentheses, Min stack"],commit:"feat: pandas exploration notebook",deliverable:null,time:"3h",skipOk:false},
      {d:"Sat",title:"Git + GitHub setup",tasks:["git init, add, commit, push","Create sql-interview-prep repo on GitHub","Create de-learning-journal repo (private notes)","Conventional commits: feat/fix/chore/docs","DSA: Review week problems blind (re-do 2 of 5)"],commit:"chore: init all repos + README stubs",deliverable:"GitHub profile live with 2 repos",time:"2h",skipOk:false},
      {d:"Sun",title:"REST + review",tasks:["DSA: LeetCode weekly contest or 2 new problems","Review week 1 concepts — write notes in Obsidian/Notion","Plan week 2 — check off what slipped"],commit:null,deliverable:null,time:"1.5h",skipOk:true}
    ]},
  {w:2,title:"Python foundations II + SQL starts",sub:"Decorators, pandas, PostgreSQL setup",phase:"p1",
    days:[
      {d:"Mon",title:"Decorators + generators",tasks:["Corey Schafer: Decorators episode (watch + re-code)","Write: timer decorator, logging decorator","Generators: yield, lazy evaluation, memory efficiency","DSA: Binary search — Search in rotated array (Med)"],commit:"feat: decorator toolkit module",deliverable:null,time:"3h",skipOk:false},
      {d:"Tue",title:"PostgreSQL setup + first queries",tasks:["Install PostgreSQL locally, create a database","Import Kaggle Superstore CSV into Postgres via psql","Write 10 basic SELECT + WHERE + ORDER BY queries","DSA: Linked list — Reverse list, Merge two sorted lists"],commit:"sql: initial schema + import script",deliverable:null,time:"3h",skipOk:false},
      {d:"Wed",title:"SQL JOINs deep dive",tasks:["INNER/LEFT/RIGHT/FULL OUTER JOINs — SQLZoo exercises","Write 5 JOIN queries on your Postgres dataset","LeetCode SQL: Combine Two Tables, Employees Earning More","DSA: Linked list — Detect cycle, Find middle"],commit:"sql: join query collection + solutions",deliverable:null,time:"2.5h",skipOk:false},
      {d:"Thu",title:"GROUP BY + aggregations",tasks:["GROUP BY, HAVING, COUNT, SUM, AVG, MAX, MIN","Write 5 aggregation queries (sales by region, avg order)","LeetCode SQL: Rank Scores, Department Top 3","DSA: 2 easy sliding window problems"],commit:"sql: aggregation examples",deliverable:null,time:"2.5h",skipOk:false},
      {d:"Fri",title:"Pandas + SQL together",tasks:["pandas: groupby, merge, pivot_table","Load SQL result into pandas DataFrame via psycopg2","Write a Python script that queries Postgres and plots output","DSA: Stack — Daily temperatures, Next greater element"],commit:"feat: postgres + pandas pipeline script",deliverable:null,time:"3h",skipOk:false},
      {d:"Sat",title:"requests library + APIs",tasks:["requests: GET/POST, headers, JSON parsing","Fetch data from a public API (OpenWeather or ExchangeRate)","Write a script that auto-saves API data to CSV","LeetCode SQL: 3 new problems from SQL 50 list"],commit:"feat: api fetcher script",deliverable:"First API script committed",time:"2.5h",skipOk:false},
      {d:"Sun",title:"Week review + notes",tasks:["DSA: Redo 3 problems from week blind","Write Obsidian notes: JOINs cheatsheet, pandas cheatsheet","LinkedIn: Draft first post (what you learned this week)"],commit:"docs: week 2 notes",deliverable:"LeetCode SQL: 10 problems done total",time:"1.5h",skipOk:true}
    ]},
  {w:3,title:"SQL window functions + Linux",sub:"CTEs, window fns, bash scripting",phase:"p1",
    days:[
      {d:"Mon",title:"Window functions — the most tested SQL concept",tasks:["ROW_NUMBER, RANK, DENSE_RANK","LEAD, LAG, FIRST_VALUE, LAST_VALUE","SUM/AVG OVER (PARTITION BY ... ORDER BY ...)","LeetCode SQL: Department Highest Salary, Nth Highest Salary"],commit:"sql: window functions examples",deliverable:null,time:"3h",skipOk:false},
      {d:"Tue",title:"CTEs + subqueries",tasks:["WITH clause — recursive and non-recursive CTEs","Subqueries in SELECT, WHERE, FROM","Refactor a complex JOIN into a CTE","LeetCode SQL: 3 window function problems"],commit:"sql: CTE and subquery examples",deliverable:null,time:"2.5h",skipOk:false},
      {d:"Wed",title:"Linux basics I — filesystem + shell",tasks:["MIT Missing Semester: Shell Tools episode","ls, cd, find, grep, pipes, redirection","Write a bash script: count lines in all .py files in a dir","DSA: Queue — Implement using stacks, Sliding window max"],commit:"bash: filesystem explorer script",deliverable:null,time:"2.5h",skipOk:false},
      {d:"Thu",title:"Linux II — text processing + cron",tasks:["awk, sed, cut, sort, uniq — real examples","cron: schedule a Python script every 5 minutes","Write a disk usage alert script (warn if >80%)","LeetCode SQL: 2 medium-hard problems"],commit:"bash: cron + monitoring scripts",deliverable:null,time:"2.5h",skipOk:false},
      {d:"Fri",title:"SQL indexes + EXPLAIN",tasks:["What indexes do, B-tree index, composite index","EXPLAIN ANALYZE on your queries — read query plans","Add indexes to your Postgres tables, re-run EXPLAIN","DSA: Binary search — Find peak, Search 2D matrix"],commit:"sql: indexed queries + explain output",deliverable:null,time:"3h",skipOk:false},
      {d:"Sat",title:"DataFlow CLI — project kickoff",tasks:["Set up project structure: src/ tests/ docs/ data/ .github/","Create Click CLI skeleton with --help working","Write first pandas transform function + pytest test","Set up GitHub Actions: run pytest on push"],commit:"feat: dataflow-cli project scaffold + CI",deliverable:"DataFlow CLI repo live with CI badge",time:"3h",skipOk:false},
      {d:"Sun",title:"Review + LinkedIn post",tasks:["DSA: 2 new problems","Publish LinkedIn post: \"5 things I learned about SQL window functions\"","Review week 3 concepts — update notes"],commit:"docs: week 3 review",deliverable:"LeetCode SQL: 20 total done",time:"1.5h",skipOk:true}
    ]},
  {w:4,title:"DataFlow CLI — build sprint",sub:"OOP design, pytest, CLI polish",phase:"p1",
    days:[
      {d:"Mon",title:"DataFlow CLI — ingestion module",tasks:["Build CSVReader class: validate schema, detect delimiter","Handle encoding issues, empty files, bad headers","Write pytest tests for CSVReader (happy path + edge cases)","DSA: Heap — Kth largest element, Top K frequent"],commit:"feat: csv reader with schema validation",deliverable:null,time:"3h",skipOk:false},
      {d:"Tue",title:"DataFlow CLI — transform module",tasks:["Build Transformer class: null handling, type casting, dedup","Configurable via YAML config file","Write 10 pytest tests covering all transform types","DSA: Heap — K closest points, Merge K sorted lists"],commit:"feat: transformer module + yaml config",deliverable:null,time:"3h",skipOk:false},
      {d:"Wed",title:"DataFlow CLI — SQLite loader",tasks:["Build SQLiteLoader: create table from schema, batch insert","Handle upserts, schema migrations","End-to-end test: CSV → transform → SQLite","LeetCode SQL: 3 problems from SQL 50"],commit:"feat: sqlite loader module",deliverable:null,time:"3h",skipOk:false},
      {d:"Thu",title:"DataFlow CLI — HTML report generator",tasks:["Jinja2 template for HTML report (summary stats, preview)","Generate report as part of pipeline run","Add --report flag to CLI","DSA: Trees — Max depth, Invert binary tree"],commit:"feat: html report generation",deliverable:null,time:"2.5h",skipOk:false},
      {d:"Fri",title:"DataFlow CLI — polish + docs",tasks:["Write comprehensive README: badges, architecture diagram, usage","Add sample data (Superstore subset) to data/sample/","mypy type annotations throughout","ruff linting configured in pyproject.toml"],commit:"docs: complete readme + type annotations",deliverable:null,time:"3h",skipOk:false},
      {d:"Sat",title:"DataFlow CLI — final push",tasks:["Achieve 85%+ test coverage (run coverage report)","Fix any failing CI checks","Tag v1.0.0 release","Record 2-min Loom walkthrough (optional)"],commit:"release: v1.0.0 dataflow-cli",deliverable:"DataFlow CLI v1.0 COMPLETE",time:"3h",skipOk:false},
      {d:"Sun",title:"Rest + review",tasks:["DSA: 2 review problems","Write notes on OOP patterns learned","Plan week 5"],commit:null,deliverable:null,time:"1.5h",skipOk:true}
    ]},
  {w:5,title:"SQL advanced + Python pandas II",sub:"Window fns mastery, advanced pandas, LeetCode SQL 50 push",phase:"p1",
    days:[
      {d:"Mon",title:"Advanced SQL: partitions + frames",tasks:["ROWS BETWEEN / RANGE BETWEEN","Running totals, moving averages in SQL","StrataScratch: 3 hard problems (Airbnb, Uber)","DSA: Trees — Level order BFS, Validate BST"],commit:"sql: advanced framing queries",deliverable:null,time:"3h",skipOk:false},
      {d:"Tue",title:"Pandas: groupby + merge mastery",tasks:["groupby with multiple keys, transform vs apply","pd.merge: left, inner, outer joins vs SQL","Multi-index DataFrames, .stack()/.unstack()","LeetCode SQL: 5 problems from SQL 50"],commit:"feat: pandas advanced analysis notebook",deliverable:null,time:"2.5h",skipOk:false},
      {d:"Wed",title:"Git advanced — branching strategy",tasks:["git branch, checkout, merge vs rebase","Squash commits, interactive rebase","Conventional commits in practice: use on all repos","DSA: Graphs — Number of islands, Clone graph"],commit:"chore: refactor commit history with conventional commits",deliverable:null,time:"2h",skipOk:false},
      {d:"Thu",title:"Python: requests + data pipeline",tasks:["Build an API-to-postgres pipeline (fetch → clean → insert)","Error handling: retries with exponential backoff","LeetCode SQL: 5 problems","DSA: Graphs — Course schedule (cycle detection)"],commit:"feat: api-to-postgres pipeline",deliverable:null,time:"3h",skipOk:false},
      {d:"Fri",title:"SQL 50 push day",tasks:["LeetCode SQL: 10 problems in one session","Focus: window functions, aggregations, self-joins","Document tricky solutions in sql-interview-prep repo","DSA: 1 problem review"],commit:"sql: 10 solutions with explanations",deliverable:"LeetCode SQL: 40 total done",time:"3h",skipOk:false},
      {d:"Sat",title:"Phase 1 review + resume bullets",tasks:["Write Phase 1 resume bullets (DataFlow CLI)","Add to resume: Python, pandas, PostgreSQL, pytest, GitHub Actions","Update LinkedIn skills section","Prepare for Phase 2 — read Docker overview"],commit:"docs: resume bullets + linkedin update",deliverable:null,time:"2h",skipOk:false},
      {d:"Sun",title:"Rest day / catch-up",tasks:["If behind on SQL 50 — do 5 more","DSA: 2 review problems","Light reading: Docker intro article"],commit:null,deliverable:null,time:"1h",skipOk:true}
    ]},
  {w:6,title:"SQL 50 complete + Phase 1 close",sub:"Final SQL push, Phase 1 retrospective, Phase 2 prep",phase:"p1",
    days:[
      {d:"Mon",title:"LeetCode SQL 50 — finish line",tasks:["LeetCode SQL: remaining problems to reach 50","Focus on hardest ones: recursive CTEs, complex window fns","Document every solution with explanation comment","DSA: DP — Climbing stairs, House robber (Easy DP)"],commit:"sql: complete sql-50 solutions",deliverable:"LeetCode SQL 50 COMPLETE",time:"3h",skipOk:false},
      {d:"Tue",title:"Phase 1 capstone review",tasks:["Review all Phase 1 deliverables against checklist","DataFlow CLI: test on fresh machine (README must work)","Python: can you write a script without googling? Test yourself","SQL: solve 5 medium problems from memory"],commit:"docs: phase 1 retrospective notes",deliverable:null,time:"2.5h",skipOk:false},
      {d:"Wed",title:"LinkedIn first post + GitHub profile",tasks:["Publish LinkedIn post: DataFlow CLI walkthrough","Pin dataflow-cli repo on GitHub","Write GitHub bio + README profile (uaniket4)","Add GitHub stats card to profile README","DSA: DP — Min cost climbing stairs, Coin change (Med)"],commit:"feat: github profile readme",deliverable:"GitHub profile polished",time:"2.5h",skipOk:false},
      {d:"Thu",title:"Docker conceptual prep",tasks:["Watch TechWorld with Nana: Docker intro (30 min)","Read Docker docs: what is a container vs VM","Install Docker Desktop, run hello-world","DSA: Intervals — Merge intervals, Non-overlapping intervals"],commit:"chore: docker hello-world verified",deliverable:null,time:"2.5h",skipOk:false},
      {d:"Fri",title:"Phase 2 sprint planning",tasks:["Read Phase 2 requirements from roadmap","Set up StockFlow API repo scaffold","Register free tier AWS account (if not done)","Plan 4-week sprint board for Phase 2","DSA: 2 medium problems"],commit:"chore: stockflow-api repo scaffold",deliverable:null,time:"2h",skipOk:false},
      {d:"Sat",title:"Buffer / catch-up day",tasks:["Use this day to finish anything slipped from weeks 1-5","If on track: explore FastAPI docs tutorial (first read-through)","DSA: 2 problems of choice"],commit:null,deliverable:"Phase 1 COMPLETE — DataFlow CLI shipped",time:"2h",skipOk:true},
      {d:"Sun",title:"Rest + plan",tasks:["Write weekly review notes","DSA: 2 easy review problems","Celebrate Phase 1 completion"],commit:null,deliverable:null,time:"1h",skipOk:true}
    ]},
  {w:7,title:"Docker fundamentals",sub:"Images, containers, volumes, networking",phase:"p2",
    days:[
      {d:"Mon",title:"Docker core concepts",tasks:["TechWorld Nana: Docker full course — Part 1 (build + run)","Dockerfile: FROM, RUN, COPY, CMD, EXPOSE","Build a Python app image — run locally","DSA: Two pointers — Container with most water (Med)"],commit:"feat: first dockerfile for python app",deliverable:null,time:"3h",skipOk:false},
      {d:"Tue",title:"Docker volumes + networking",tasks:["Named volumes, bind mounts, tmpfs","Docker networks: bridge, host, none","Run Postgres in a container with a named volume","Connect Python app container to Postgres container","DSA: Binary search — Time-based key-value store"],commit:"feat: postgres in docker with volume",deliverable:null,time:"3h",skipOk:false},
      {d:"Wed",title:"docker-compose",tasks:["docker-compose.yml: services, networks, volumes","Multi-service stack: Python app + Postgres + Redis","docker-compose up/down/logs/exec","DSA: Sliding window — Longest substring without repeat"],commit:"feat: docker-compose multi-service stack",deliverable:null,time:"3h",skipOk:false},
      {d:"Thu",title:"FastAPI intro",tasks:["FastAPI official tutorial: first steps to path parameters","Pydantic models, request body, response models","Build a /health and /data endpoint","Add OpenAPI docs (/docs) — understand what it generates","DSA: Stack — Largest rectangle in histogram (Hard — study)"],commit:"feat: fastapi skeleton with pydantic models",deliverable:null,time:"3h",skipOk:false},
      {d:"Fri",title:"FastAPI in Docker",tasks:["Containerize FastAPI app","Multi-stage Dockerfile: builder + slim runtime","docker-compose: FastAPI + Postgres","Environment variables via .env file","DSA: Heap — Task scheduler (Med)"],commit:"feat: fastapi dockerized with compose",deliverable:null,time:"3h",skipOk:false},
      {d:"Sat",title:"JWT authentication",tasks:["python-jose, passlib — JWT implementation","/register, /login endpoints","Protected endpoints with Depends(get_current_user)","Write integration tests for auth flow","DSA: 2 medium problems"],commit:"feat: jwt auth on fastapi",deliverable:null,time:"3h",skipOk:false},
      {d:"Sun",title:"Review + LinkedIn post",tasks:["Publish LinkedIn post: \"What I learned about Docker this week\"","DSA: 2 review problems","Write Docker cheatsheet in notes"],commit:"docs: docker notes + cheatsheet",deliverable:null,time:"1.5h",skipOk:true}
    ]},
  {w:8,title:"AWS hands-on + Terraform intro",sub:"S3, IAM, RDS, first Terraform",phase:"p2",
    days:[
      {d:"Mon",title:"AWS S3 + IAM",tasks:["Create S3 bucket, upload file via boto3","IAM: create a role, attach policy, no hardcoded keys","S3 lifecycle rules: move to IA after 30 days","Boto3: list objects, presigned URLs","DSA: Graphs — Dijkstra (study, not code)"],commit:"feat: boto3 s3 operations script",deliverable:null,time:"3h",skipOk:false},
      {d:"Tue",title:"AWS RDS + EC2 basics",tasks:["Launch RDS Postgres (free tier), connect via psql","EC2: launch t2.micro, SSH in, install Docker","Security groups: restrict inbound to your IP only","DSA: Trees — Lowest common ancestor, Serialize BST"],commit:"chore: aws rds + ec2 setup notes",deliverable:null,time:"3h",skipOk:false},
      {d:"Wed",title:"Terraform basics",tasks:["HashiCorp tutorial: AWS provider setup","provider, resource, variable, output blocks","Provision S3 bucket + IAM user via Terraform","terraform plan → apply → destroy cycle","DSA: 2 medium problems"],commit:"feat: terraform s3 + iam provisioning",deliverable:null,time:"3h",skipOk:false},
      {d:"Thu",title:"Terraform: RDS + structured modules",tasks:["Terraform module: rds_postgres with variables","terraform.tfvars, remote state on S3","Provision full infra: S3 + RDS + IAM via Terraform only","DSA: DP — Longest common subsequence (Med)"],commit:"feat: terraform full infra module",deliverable:null,time:"3h",skipOk:false},
      {d:"Fri",title:"StockFlow API — ingestion service",tasks:["Fetch stock data from AlphaVantage or CoinGecko (free API key)","Write ingestion service: fetch → validate → upload to S3 raw/","Dockerize ingestion service","DSA: DP — Word break, Decode ways (Med)"],commit:"feat: stockflow ingestion service + s3 upload",deliverable:null,time:"3h",skipOk:false},
      {d:"Sat",title:"StockFlow API — transform + FastAPI layer",tasks:["Transform service: read from S3 raw, clean, insert into RDS","FastAPI: /prices/{ticker}, /summary/{ticker} endpoints","docker-compose: all 3 services","DSA: 2 medium problems"],commit:"feat: stockflow transform service + api endpoints",deliverable:null,time:"3h",skipOk:false},
      {d:"Sun",title:"Review + catch-up",tasks:["DSA: 2 problems","Review AWS costs — destroy idle resources","Update notes: Terraform cheatsheet"],commit:null,deliverable:null,time:"1.5h",skipOk:true}
    ]},
  {w:9,title:"StockFlow — CloudWatch + CI/CD",sub:"Structured logging, GitHub Actions, project polish",phase:"p2",
    days:[
      {d:"Mon",title:"Structured JSON logging",tasks:["Replace print() with Python logging module","Format logs as JSON: timestamp, level, service, request_id","Log to stdout (Docker will capture it)","DSA: Graphs — Rotting oranges, Pacific Atlantic water"],commit:"feat: structured json logging",deliverable:null,time:"2.5h",skipOk:false},
      {d:"Tue",title:"CloudWatch monitoring",tasks:["CloudWatch Logs: ship Docker logs to CloudWatch","Create metric filter: count API errors","Create alarm: alert if >5 errors in 5 min","DSA: Intervals — Insert interval, Minimum meeting rooms"],commit:"feat: cloudwatch logging + alarm",deliverable:null,time:"2.5h",skipOk:false},
      {d:"Wed",title:"GitHub Actions CI/CD",tasks:["Workflow: on push → pytest → docker build → push to ECR","Set up ECR repository (AWS free tier)","Add secrets to GitHub: AWS_ACCESS_KEY_ID etc","Test full pipeline end-to-end","DSA: 2 medium problems"],commit:"ci: github actions push-to-ecr workflow",deliverable:null,time:"3h",skipOk:false},
      {d:"Thu",title:"StockFlow README + docs",tasks:["Architecture diagram in README (draw.io or Mermaid)","GIF/screenshot of API responses","Local setup: docker-compose up must work from fresh clone","Resume bullets drafted for StockFlow","DSA: Trees + review"],commit:"docs: complete stockflow readme with architecture",deliverable:null,time:"3h",skipOk:false},
      {d:"Fri",title:"StockFlow — final integration test",tasks:["Deploy to EC2 via Docker: test full stack live","Confirm Terraform provisions all infra from scratch","Confirm CI/CD pipeline green","Tag v1.0.0","DSA: 2 problems"],commit:"release: stockflow-api v1.0.0",deliverable:"StockFlow API COMPLETE",time:"3h",skipOk:false},
      {d:"Sat",title:"Phase 2 review + LinkedIn",tasks:["LinkedIn post: \"I built a containerized data API\"","Update resume with Phase 2 bullets","Review: Docker, FastAPI, Terraform, S3 concepts","DSA: 2 problems"],commit:"docs: phase 2 bullets + linkedin",deliverable:null,time:"2.5h",skipOk:false},
      {d:"Sun",title:"Rest + Phase 3 prep",tasks:["Read Airflow overview — Marc Lamberti blog","Read dbt Learn intro","DSA: 2 easy review problems"],commit:null,deliverable:null,time:"1h",skipOk:true}
    ]},
  {w:10,title:"Phase 2 buffer + deep dives",sub:"Terraform advanced, Docker multi-stage, Phase 3 warmup",phase:"p2",
    days:[
      {d:"Mon",title:"Terraform advanced — modules + state",tasks:["Terraform modules: reusable VPC module","Remote state: store tfstate in S3 + DynamoDB lock","Terraform workspaces: dev/staging/prod","DSA: 2 medium problems"],commit:"feat: terraform modules + remote state",deliverable:null,time:"3h",skipOk:false},
      {d:"Tue",title:"Docker multi-stage builds + optimization",tasks:["Multi-stage: builder stage + slim runtime","Layer caching strategy for fast builds",".dockerignore — what to exclude","Image size: compare python:3.12 vs python:3.12-slim","DSA: Graphs — Word ladder (BFS, Med)"],commit:"feat: optimized multi-stage dockerfile",deliverable:null,time:"2.5h",skipOk:false},
      {d:"Wed",title:"Airflow first look",tasks:["Install Airflow via docker-compose (official image)","Understand DAG, Task, Operator, Sensor concepts","Run the example DAGs — inspect the UI","DSA: Heap — Find median from data stream (Hard — study)"],commit:"chore: airflow docker setup + notes",deliverable:null,time:"3h",skipOk:false},
      {d:"Thu",title:"dbt first look",tasks:["Install dbt-core + dbt-postgres","Complete Jaffle Shop tutorial (official dbt Learn)","Understand: model, source, test, materialization","DSA: 2 medium problems"],commit:"feat: jaffle shop dbt complete",deliverable:null,time:"3h",skipOk:false},
      {d:"Fri",title:"Phase 2 retrospective + Phase 3 planning",tasks:["Phase 2 checklist: Docker ✓ FastAPI ✓ Terraform ✓ S3 ✓","Identify any gaps — note for Phase 3","Write Phase 3 sprint board (6 weeks, RetailPulse)","StrataScratch: 2 SQL problems"],commit:"docs: phase 3 sprint plan",deliverable:null,time:"2.5h",skipOk:false},
      {d:"Sat",title:"Buffer / catch-up",tasks:["Use this day for anything unfinished in Phase 2","If on track: start reading Joe Reis Fundamentals Ch 1","DSA: 2 problems"],commit:null,deliverable:null,time:"2h",skipOk:true},
      {d:"Sun",title:"Rest",tasks:["Light reading or walk","DSA: 1 easy problem"],commit:null,deliverable:null,time:"0.5h",skipOk:true}
    ]},
  {w:11,title:"Airflow fundamentals",sub:"DAGs, operators, scheduling, XComs",phase:"p3",
    days:[
      {d:"Mon",title:"Airflow: DAG anatomy",tasks:["Write your first custom DAG: 3 tasks in sequence","PythonOperator, BashOperator, EmptyOperator","Task dependencies: >> and << syntax","DSA: Trees — Construct from preorder+inorder (Med)"],commit:"feat: first custom airflow dag",deliverable:null,time:"3h",skipOk:false},
      {d:"Tue",title:"Airflow: scheduling + backfill",tasks:["cron schedule, catchup=True vs False","backfill: run historical DAG runs","start_date gotchas — common mistakes","DSA: Graphs — Alien dictionary (Hard — study only)"],commit:"feat: scheduled dag with backfill example",deliverable:null,time:"3h",skipOk:false},
      {d:"Wed",title:"Airflow: XComs + sensors",tasks:["XCom push/pull between tasks","FileSensor, HttpSensor","ExternalTaskSensor for cross-DAG dependencies","DSA: DP — Longest increasing subsequence (Med)"],commit:"feat: xcom + sensor examples",deliverable:null,time:"3h",skipOk:false},
      {d:"Thu",title:"PySpark setup",tasks:["Install PySpark via docker-compose (bitnami/spark)","Understand SparkContext, SparkSession","RDD vs DataFrame — when to use each","Run a word count job (the hello world of Spark)","DSA: Heap — 2 problems"],commit:"feat: spark docker setup + wordcount job",deliverable:null,time:"3h",skipOk:false},
      {d:"Fri",title:"PySpark DataFrames",tasks:["Read CSV/Parquet into DataFrame","filter, select, withColumn, alias","groupBy + agg operations","Write output as Parquet (snappy compression)","DSA: 2 medium problems"],commit:"feat: pyspark dataframe operations script",deliverable:null,time:"3h",skipOk:false},
      {d:"Sat",title:"RetailPulse — project kickoff",tasks:["Create retailpulse-pipeline repo","Design data model: fact_orders, dim_products, dim_customers, dim_dates","Download/generate synthetic Olist ecommerce dataset","Set up docker-compose: Airflow + Spark + Postgres + Metabase","DSA: StrataScratch: 2 SQL hard"],commit:"chore: retailpulse scaffold + dataset + compose",deliverable:"RetailPulse repo live",time:"3.5h",skipOk:false},
      {d:"Sun",title:"Review + notes",tasks:["DSA: 2 problems","Write Airflow cheatsheet","LinkedIn post: \"Setting up Airflow + Spark locally\""],commit:"docs: airflow + spark cheatsheets",deliverable:null,time:"1.5h",skipOk:true}
    ]},
  {w:12,title:"PySpark + data modeling",sub:"Transformations, partitioning, star schema",phase:"p3",
    days:[
      {d:"Mon",title:"Spark: joins + optimization",tasks:["broadcast joins, sort-merge joins","Repartition vs coalesce","Explain plan: spark.sql(\"...\").explain(true)","DSA: Graphs — Number of connected components"],commit:"feat: spark join + optimization examples",deliverable:null,time:"3h",skipOk:false},
      {d:"Tue",title:"Spark SQL + UDFs",tasks:["spark.sql() with temp views","UDFs vs built-in functions (prefer built-in)","Window functions in PySpark (rank, lag, lead)","DSA: 2 medium problems + 1 SQL hard"],commit:"feat: spark sql queries + udf examples",deliverable:null,time:"3h",skipOk:false},
      {d:"Wed",title:"Data modeling: star schema",tasks:["Fact vs dimension tables — why the separation","Grain of a fact table — critical concept","Design star schema for RetailPulse on paper first","Read Joe Reis Ch 3 (data modeling)","DSA: Trees + graphs review"],commit:"docs: star schema design diagrams",deliverable:null,time:"3h",skipOk:false},
      {d:"Thu",title:"RetailPulse — Spark ingestion job",tasks:["PySpark job: read raw CSV, clean nulls, cast types","Write to Parquet partitioned by year/month","Airflow DAG: trigger Spark job via SparkSubmitOperator","DSA: 2 medium problems"],commit:"feat: retailpulse spark ingestion job",deliverable:null,time:"3.5h",skipOk:false},
      {d:"Fri",title:"dbt: models + materializations",tasks:["dbt model: stg_orders, stg_customers, stg_products","Materialization: view vs table vs incremental","dbt run — verify output in Postgres","DSA: DP — Edit distance (Hard — study)"],commit:"feat: dbt staging models for retailpulse",deliverable:null,time:"3h",skipOk:false},
      {d:"Sat",title:"dbt: intermediate + marts",tasks:["int_orders: join staging models","mart_daily_sales: aggregated fact mart","dbt test: not_null, unique, relationships","dbt docs generate + serve — explore the lineage graph","DSA: 2 problems"],commit:"feat: dbt mart models + tests",deliverable:null,time:"3.5h",skipOk:false},
      {d:"Sun",title:"Review",tasks:["DSA: 2 problems","Write dbt cheatsheet","Review Spark partitioning notes"],commit:"docs: dbt + spark notes",deliverable:null,time:"1h",skipOk:true}
    ]},
  {w:13,title:"SCD Type 2 + data quality",sub:"Slowly changing dimensions, Great Expectations, Airflow alerts",phase:"p3",
    days:[
      {d:"Mon",title:"SCD Type 2 implementation",tasks:["SCD Type 2: track customer address history","dbt snapshots: strategy=timestamp, unique_key","Test: update a customer record, verify history preserved","DSA: 2 medium problems + 1 SQL hard"],commit:"feat: scd type 2 customer snapshot",deliverable:null,time:"3.5h",skipOk:false},
      {d:"Tue",title:"Great Expectations — data quality",tasks:["Install Great Expectations in the project","Define expectation suite: not_null, value range, regex","Run GE validation in an Airflow task","Alert on failure via Airflow email (use Gmail SMTP)","DSA: Heap + intervals review"],commit:"feat: great expectations suite + airflow integration",deliverable:null,time:"3.5h",skipOk:false},
      {d:"Wed",title:"RetailPulse — complete Airflow DAG",tasks:["Full DAG: ingest → validate (GE) → spark transform → dbt → metabase refresh","task_id naming conventions","on_failure_callback for Slack/email alerts","DSA: 2 problems"],commit:"feat: retailpulse end-to-end airflow dag",deliverable:null,time:"3.5h",skipOk:false},
      {d:"Thu",title:"Metabase dashboard",tasks:["Connect Metabase to Postgres warehouse","Build 3 dashboards: daily sales, customer LTV, product performance","DSA: Graphs — 2 medium problems","StrataScratch: 2 SQL hard problems"],commit:"feat: metabase dashboards live",deliverable:null,time:"3h",skipOk:false},
      {d:"Fri",title:"Delta Lake basics",tasks:["What is Delta Lake — ACID on object storage","Convert Parquet output to Delta format","Understand: time travel, schema evolution, Z-ordering","DSA: DP — 2 medium problems"],commit:"feat: delta lake format conversion",deliverable:null,time:"2.5h",skipOk:false},
      {d:"Sat",title:"RetailPulse — README + dbt docs",tasks:["Architecture diagram in README (Mermaid or draw.io)","Deploy dbt docs to GitHub Pages","Screenshot of Metabase dashboard for README","Resume bullets updated","DSA: 2 problems"],commit:"docs: retailpulse complete readme + dbt docs",deliverable:null,time:"3h",skipOk:false},
      {d:"Sun",title:"Review + LinkedIn",tasks:["LinkedIn post: \"Building a batch pipeline with Airflow + Spark + dbt\"","DSA: 2 review problems","Internship ends this month — plan for more study time"],commit:null,deliverable:null,time:"1.5h",skipOk:true}
    ]},
  {w:14,title:"RetailPulse final polish + Phase 3 review",sub:"E2E testing, performance tuning, cost awareness",phase:"p3",
    days:[
      {d:"Mon",title:"Integration testing with testcontainers",tasks:["Install testcontainers-python","Spin up Postgres in a test container, run dbt tests against it","Write integration test: full pipeline run on sample data","DSA: Trees — 2 medium problems"],commit:"test: integration tests with testcontainers",deliverable:null,time:"3.5h",skipOk:false},
      {d:"Tue",title:"Spark performance tuning",tasks:["Identify bottlenecks: Spark UI (localhost:4040)","Adaptive Query Execution (AQE) — enable it","Partition sizing: aim for 100-200MB per partition","DSA: 2 medium + 1 SQL hard"],commit:"perf: spark tuning + aqe enabled",deliverable:null,time:"3h",skipOk:false},
      {d:"Wed",title:"Cost awareness — DuckDB alternative",tasks:["Install DuckDB — run same queries as Postgres/Spark","DuckDB: reads Parquet directly, no server needed","Why DuckDB > Snowflake at small scale (cost argument)","DSA: Graphs review — 2 problems"],commit:"feat: duckdb alternative query benchmark",deliverable:null,time:"2.5h",skipOk:false},
      {d:"Thu",title:"RetailPulse v1.0 — final checks",tasks:["Clone repo on a new terminal, follow README, confirm it works","All dbt tests passing","GE validation passing on sample data","Tag v1.0.0 release with changelog","DSA: 2 problems"],commit:"release: retailpulse-pipeline v1.0.0",deliverable:"RetailPulse COMPLETE",time:"3h",skipOk:false},
      {d:"Fri",title:"Phase 3 concepts review",tasks:["Can you explain Airflow XComs without notes?","Can you explain partitioning in Spark?","Can you explain SCD Type 2 and dbt snapshots?","Write self-quiz answers in notes","DSA: 2 medium problems"],commit:"docs: phase 3 concept review notes",deliverable:null,time:"2.5h",skipOk:false},
      {d:"Sat",title:"LinkedIn + GitHub phase 3 update",tasks:["LinkedIn post: \"RetailPulse — batch pipeline shipped\"","Pin retailpulse-pipeline on GitHub","Update LinkedIn skills: Airflow, PySpark, dbt","DSA: 2 problems"],commit:"docs: linkedin + github profile update",deliverable:null,time:"2h",skipOk:false},
      {d:"Sun",title:"Rest + Phase 4 prep",tasks:["Read Kafka overview — Confluent docs intro","DSA: 2 easy review problems"],commit:null,deliverable:null,time:"1h",skipOk:true}
    ]},
  {w:15,title:"Airflow + Spark deep dive",sub:"Celery executor, Spark optimizations, Parquet best practices",phase:"p3",
    days:[
      {d:"Mon",title:"Airflow Celery executor",tasks:["Switch from LocalExecutor to CeleryExecutor","Redis as message broker, Flower UI","Scale to 3 workers in docker-compose","DSA: DP — 2 medium problems"],commit:"feat: airflow celery executor setup",deliverable:null,time:"3h",skipOk:false},
      {d:"Tue",title:"Airflow best practices",tasks:["Idempotency: why DAGs must be safe to re-run","Avoid top-level code in DAGs (performance)","Variables and Connections in Airflow UI","DSA: Graphs — 2 medium problems + 1 SQL hard"],commit:"docs: airflow best practices implementation",deliverable:null,time:"2.5h",skipOk:false},
      {d:"Wed",title:"Spark: streaming preview",tasks:["Read Structured Streaming programming guide","Write a simple streaming job: read from socket, word count","Understand: trigger modes, output modes, checkpointing","DSA: 2 medium problems"],commit:"feat: spark structured streaming wordcount",deliverable:null,time:"3h",skipOk:false},
      {d:"Thu",title:"dbt: macros + advanced tests",tasks:["Write a custom dbt macro: generate surrogate key","Custom generic test: check date ranges","dbt packages: dbt_utils, audit_helper","DSA: Heap — 2 problems"],commit:"feat: dbt macros + custom tests",deliverable:null,time:"3h",skipOk:false},
      {d:"Fri",title:"Phase 3 buffer / deeper practice",tasks:["Pick weakest area from Phase 3 — spend today on it","StrataScratch: 3 SQL hard problems","DSA: 2 medium problems"],commit:"docs: phase 3 deep practice notes",deliverable:null,time:"3h",skipOk:true},
      {d:"Sat",title:"Phase 4 planning + Kafka setup",tasks:["Create fraudradar-streaming repo","Install Kafka via docker-compose (bitnami/kafka)","Run kafka-console-producer / consumer — verify working","DSA: 2 problems"],commit:"chore: fraudradar repo + kafka docker setup",deliverable:"FraudRadar repo live",time:"3h",skipOk:false},
      {d:"Sun",title:"Rest",tasks:["DSA: 2 easy review problems","Internship ended — full focus mode starts"],commit:null,deliverable:null,time:"1h",skipOk:true}
    ]},
  {w:16,title:"Phase 3 wrap + streaming transition",sub:"DE core mastery check, Kafka fundamentals",phase:"p3",
    days:[
      {d:"Mon",title:"Kafka fundamentals I",tasks:["Topics, partitions, offsets — the mental model","Producers: acks=all, idempotency setting","Python producer: kafka-python library","DSA: 2 medium problems + 1 SQL hard"],commit:"feat: kafka python producer script",deliverable:null,time:"3h",skipOk:false},
      {d:"Tue",title:"Kafka fundamentals II — consumers",tasks:["Consumer groups, partition assignment","auto_offset_reset: earliest vs latest","Consumer lag — how to monitor it","Python consumer: poll loop, commit offsets","DSA: Graphs — Bipartite check, Topological sort"],commit:"feat: kafka python consumer with group",deliverable:null,time:"3h",skipOk:false},
      {d:"Wed",title:"Schema Registry + Avro",tasks:["Why schema evolution matters in streaming","Avro schema definition (.avsc)","Confluent Schema Registry in docker-compose","Serialize/deserialize with avro-python3","DSA: 2 medium problems"],commit:"feat: avro schema + registry setup",deliverable:null,time:"3h",skipOk:false},
      {d:"Thu",title:"Kafka Connect",tasks:["JDBC Source Connector: stream Postgres changes to Kafka","FileSink Connector: write topic to CSV","Connector configs: JSON format","DSA: DP — 2 medium problems"],commit:"feat: kafka connect jdbc source setup",deliverable:null,time:"3h",skipOk:false},
      {d:"Fri",title:"Spark Structured Streaming + Kafka",tasks:["readStream from Kafka topic in PySpark","Parse JSON messages with schema","Stateful aggregation: count txns per card per minute","Write output to Postgres (foreachBatch)","DSA: 2 medium + 1 SQL hard"],commit:"feat: spark streaming consumer from kafka",deliverable:null,time:"3.5h",skipOk:false},
      {d:"Sat",title:"FraudRadar — build sprint I",tasks:["Synthetic transaction producer (Faker library)","Kafka topic: transactions (10 partitions)","Consumer group: fraud-detection-group","Windowed aggregation: 5-txn rule in 60s","DSA: 2 problems"],commit:"feat: fraudradar producer + windowed rules",deliverable:null,time:"4h",skipOk:false},
      {d:"Sun",title:"Review + LinkedIn",tasks:["LinkedIn post: \"Real-time streaming with Kafka\"","DSA: 2 problems","Notes: Kafka mental model cheatsheet"],commit:"docs: kafka cheatsheet",deliverable:null,time:"1.5h",skipOk:true}
    ]},
  {w:17,title:"FraudRadar — fraud rules engine",sub:"Stateful streaming, alerting, Redis",phase:"p4",
    days:[
      {d:"Mon",title:"FraudRadar — geo-velocity rule",tasks:["Track last transaction location per card in Redis","Calculate distance between consecutive txns","Flag if same card used in 2 cities < 30 min apart","DSA: Graphs — 2 medium problems"],commit:"feat: geo-velocity fraud rule with redis",deliverable:null,time:"4h",skipOk:false},
      {d:"Tue",title:"FraudRadar — amount anomaly rule",tasks:["7-day rolling average per card in Redis sorted set","Flag if current txn > 5× average","Write to alerts Kafka topic","DSA: Heap — 2 problems + 1 SQL hard"],commit:"feat: amount anomaly rule",deliverable:null,time:"3.5h",skipOk:false},
      {d:"Wed",title:"FraudRadar — alert webhook",tasks:["FastAPI endpoint: POST /alert receives fraud events","Log alerts to Postgres: alert_id, card_id, rule, timestamp","Idempotency key to avoid duplicate alerts","DSA: DP — 2 medium problems"],commit:"feat: fastapi alert webhook endpoint",deliverable:null,time:"3.5h",skipOk:false},
      {d:"Thu",title:"FraudRadar — monitoring",tasks:["Prometheus metrics: alerts per minute, consumer lag","Grafana dashboard: transaction throughput + fraud rate","Docker Compose: add Prometheus + Grafana","DSA: 2 medium problems"],commit:"feat: prometheus + grafana for fraudradar",deliverable:null,time:"3.5h",skipOk:false},
      {d:"Fri",title:"FraudRadar — exactly-once semantics",tasks:["Idempotent producer: enable.idempotence=true","Transactional consumer pattern","Understand at-least-once vs exactly-once trade-offs","DSA: 2 medium + 1 SQL hard"],commit:"docs: exactly-once implementation notes",deliverable:null,time:"3h",skipOk:false},
      {d:"Sat",title:"FraudRadar — final integration + docs",tasks:["End-to-end test: start producers, watch alerts fire in Grafana","Loom demo: record the pipeline processing live transactions","README: architecture diagram, demo link, setup guide","Tag v1.0.0","DSA: 2 problems"],commit:"release: fraudradar v1.0.0 + loom demo",deliverable:"FraudRadar COMPLETE",time:"4h",skipOk:false},
      {d:"Sun",title:"Review + LinkedIn",tasks:["LinkedIn post: \"FraudRadar — real-time fraud detection pipeline\"","DSA: 2 problems","Notes: streaming patterns cheatsheet"],commit:"docs: linkedin + streaming notes",deliverable:null,time:"1.5h",skipOk:true}
    ]},
  {w:18,title:"Kafka deep + streaming patterns",sub:"ksqlDB, watermarks, late data handling",phase:"p4",
    days:[
      {d:"Mon",title:"ksqlDB basics",tasks:["ksqlDB in docker-compose","CREATE STREAM, CREATE TABLE","SELECT + WHERE + GROUP BY on streams","Persistent queries: push vs pull","DSA: Graphs — 2 medium problems"],commit:"feat: ksqldb stream queries",deliverable:null,time:"3h",skipOk:false},
      {d:"Tue",title:"Watermarks + late data",tasks:["Why late data exists in streaming systems","Watermark definition in Spark Structured Streaming",".withWatermark(\"timestamp\", \"10 minutes\")","What gets dropped vs included","DSA: 2 medium + 1 SQL hard"],commit:"docs: watermark + late data handling notes",deliverable:null,time:"2.5h",skipOk:false},
      {d:"Wed",title:"Event time vs processing time",tasks:["The fundamental streaming challenge — understand deeply","Event-time windowing in PySpark","Session windows vs sliding windows vs tumbling windows","DSA: DP — 2 medium problems"],commit:"feat: time window types comparison",deliverable:null,time:"3h",skipOk:false},
      {d:"Thu",title:"Kafka partitioning strategy",tasks:["How partition key affects ordering","Custom partitioner in Python producer","Impact of partitions on consumer parallelism","DSA: Heap review — 2 problems"],commit:"docs: kafka partitioning strategy notes",deliverable:null,time:"2.5h",skipOk:false},
      {d:"Fri",title:"FraudRadar — improvements + ksqlDB migration",tasks:["Migrate 1 rule from Spark to ksqlDB","Compare: complexity vs maintainability","DSA: 2 medium + 1 SQL hard"],commit:"feat: ksqldb rule migration",deliverable:null,time:"3h",skipOk:false},
      {d:"Sat",title:"Phase 4 review + system design prep",tasks:["Study: design a real-time analytics pipeline for 1M events/min","Write 500-word design doc: components, trade-offs, bottlenecks","DSA: 3 problems review"],commit:"docs: streaming system design doc",deliverable:null,time:"3h",skipOk:false},
      {d:"Sun",title:"Rest",tasks:["DSA: 2 easy problems","Kafka mental model review"],commit:null,deliverable:null,time:"1h",skipOk:true}
    ]},
  {w:19,title:"Phase 4 buffer + K8s prep",sub:"Streaming review, Kubernetes concepts intro",phase:"p4",
    days:[
      {d:"Mon",title:"Streaming mastery check",tasks:["Self-quiz: explain Kafka consumer groups without notes","Self-quiz: explain watermarks to someone unfamiliar","Self-quiz: when to use Kafka vs RabbitMQ?","DSA: 2 medium problems"],commit:"docs: streaming self-quiz answers",deliverable:null,time:"2.5h",skipOk:false},
      {d:"Tue",title:"Kubernetes intro",tasks:["TechWorld Nana: K8s tutorial — Part 1 (overview)","Install minikube or kind locally","Run: kubectl get nodes, kubectl run, kubectl get pods","DSA: 2 medium + 1 SQL hard"],commit:"chore: minikube setup verified",deliverable:null,time:"3h",skipOk:false},
      {d:"Wed",title:"K8s: Pods + Deployments",tasks:["Write a Deployment YAML for the FastAPI app","kubectl apply, delete, describe, logs","Understand: Pod lifecycle, restart policies","DSA: Graphs — 2 medium problems"],commit:"feat: first k8s deployment yaml",deliverable:null,time:"3h",skipOk:false},
      {d:"Thu",title:"K8s: Services + networking",tasks:["ClusterIP, NodePort, LoadBalancer services","kubectl port-forward for local testing","Ingress controller (nginx)","DSA: Trees — 2 medium problems"],commit:"feat: k8s service + ingress configs",deliverable:null,time:"3h",skipOk:false},
      {d:"Fri",title:"Phase 4 complete + Phase 5 planning",tasks:["FraudRadar final checklist","LinkedIn + GitHub update","Phase 5 sprint board: 4 weeks, AirK8s project","DSA: 2 problems"],commit:"docs: phase 4 complete + phase 5 plan",deliverable:"Phase 4 COMPLETE",time:"2.5h",skipOk:false},
      {d:"Sat",title:"K8s: ConfigMaps + Secrets",tasks:["ConfigMap: externalize app config","Secret: base64-encoded sensitive values","Never hardcode: use secretKeyRef in Deployment","DSA: 2 problems"],commit:"feat: configmap + secret examples",deliverable:null,time:"3h",skipOk:false},
      {d:"Sun",title:"Rest",tasks:["DSA: 2 easy review problems"],commit:null,deliverable:null,time:"1h",skipOk:true}
    ]},
  {w:20,title:"Kubernetes deployment + Helm",sub:"PVCs, HPA, Helm charts, AirK8s start",phase:"p5",
    days:[
      {d:"Mon",title:"K8s: PersistentVolumes + StatefulSets",tasks:["PVC for Postgres: retain data across Pod restarts","StatefulSet vs Deployment — when to use each","StorageClass on minikube","DSA: 2 medium problems + 1 SQL hard"],commit:"feat: postgres statefulset with pvc",deliverable:null,time:"3.5h",skipOk:false},
      {d:"Tue",title:"Horizontal Pod Autoscaler",tasks:["HPA: scale Deployment based on CPU","metrics-server install on minikube","kubectl autoscale, kubectl get hpa","Load test with hey or locust","DSA: 2 medium problems"],commit:"feat: hpa config for fastapi deployment",deliverable:null,time:"3h",skipOk:false},
      {d:"Wed",title:"Helm — package manager for K8s",tasks:["What Helm does: templates + values","helm install, upgrade, rollback, uninstall","Use official Airflow Helm chart locally","Understand values.yaml overrides","DSA: Graphs — 2 medium problems"],commit:"feat: airflow deployed via helm on minikube",deliverable:null,time:"3.5h",skipOk:false},
      {d:"Thu",title:"AirK8s — project setup",tasks:["Create airk8s repo","Fork/modify official Airflow Helm chart","Configure: KubernetesExecutor (tasks as Pods)","DSA: DP — 2 problems + 1 SQL hard"],commit:"feat: airk8s repo + airflow k8s executor",deliverable:"AirK8s repo live",time:"3.5h",skipOk:false},
      {d:"Fri",title:"Prometheus + Grafana on K8s",tasks:["kube-prometheus-stack Helm chart","Explore pre-built K8s dashboards in Grafana","Add Airflow DAG metrics to custom dashboard","DSA: 2 problems"],commit:"feat: prometheus + grafana monitoring stack on k8s",deliverable:null,time:"3.5h",skipOk:false},
      {d:"Sat",title:"ArgoCD — GitOps intro",tasks:["Install ArgoCD on minikube","Connect ArgoCD to airk8s GitHub repo","Sync an Application — auto-deploy on git push","DSA: 2 problems"],commit:"feat: argocd gitops setup",deliverable:null,time:"3.5h",skipOk:false},
      {d:"Sun",title:"Review + LinkedIn",tasks:["LinkedIn post: \"Deploying Airflow on Kubernetes with Helm\"","DSA: 2 review problems"],commit:"docs: k8s cheatsheet",deliverable:null,time:"1.5h",skipOk:true}
    ]},
  {w:21,title:"Terraform advanced + AWS EKS",sub:"Modules, EKS cluster, remote state",phase:"p5",
    days:[
      {d:"Mon",title:"Terraform modules — production patterns",tasks:["Write reusable VPC module (public/private subnets)","Write reusable EKS module","Module versioning with git tags","DSA: 2 medium + 1 SQL hard"],commit:"feat: terraform vpc + eks modules",deliverable:null,time:"4h",skipOk:false},
      {d:"Tue",title:"AWS EKS cluster",tasks:["Provision EKS via Terraform (use $200 credits)","Configure kubectl to talk to EKS","Deploy a test app to EKS","ECR: push and pull images","DSA: 2 medium problems"],commit:"feat: eks cluster via terraform",deliverable:null,time:"4h",skipOk:false},
      {d:"Wed",title:"AirK8s on EKS",tasks:["Deploy Airflow to EKS using Helm + values.yaml","Run RetailPulse DAG on EKS — confirm it works","Configure S3 as Airflow logs backend","DSA: Graphs — 2 problems + 1 SQL hard"],commit:"feat: airflow on eks with s3 logs",deliverable:null,time:"4h",skipOk:false},
      {d:"Thu",title:"Cost optimization on AWS",tasks:["Spot instances for Spark workers (70% cost savings)","S3 Intelligent-Tiering vs Standard","Tag all resources: env, project, owner","Calculate monthly cost — build a cost spreadsheet","DSA: 2 medium problems"],commit:"docs: aws cost analysis + spot instance config",deliverable:null,time:"3h",skipOk:false},
      {d:"Fri",title:"VPC security + networking",tasks:["Security groups: least privilege — only open needed ports","Private subnets for databases, public for load balancers","NAT gateway for private subnet internet access","DSA: 2 problems"],commit:"feat: vpc security hardening",deliverable:null,time:"3h",skipOk:false},
      {d:"Sat",title:"AirK8s — Grafana DAG dashboard",tasks:["Build Grafana dashboard: DAG success rate, run duration","Alert: Slack webhook if DAG fails (or email)","HPA: test autoscaling workers under load","DSA: 2 problems"],commit:"feat: airk8s grafana dag health dashboard",deliverable:null,time:"3.5h",skipOk:false},
      {d:"Sun",title:"Rest + review",tasks:["DSA: 2 problems","Review EKS + Terraform notes"],commit:null,deliverable:null,time:"1h",skipOk:true}
    ]},
  {w:22,title:"AirK8s complete + K8s mastery",sub:"GitOps, HPA testing, AirK8s v1.0",phase:"p5",
    days:[
      {d:"Mon",title:"GitOps workflow with ArgoCD",tasks:["ArgoCD on EKS: app-of-apps pattern","Auto-sync on push to main branch","Rollback: argocd app rollback","DSA: 2 medium + 1 SQL hard"],commit:"feat: argocd app-of-apps on eks",deliverable:null,time:"3.5h",skipOk:false},
      {d:"Tue",title:"K8s network policies",tasks:["Deny-all default policy","Allow only Airflow webserver to hit scheduler","Block pod-to-pod traffic by default","DSA: 2 medium problems"],commit:"feat: k8s network policies",deliverable:null,time:"3h",skipOk:false},
      {d:"Wed",title:"AirK8s — final integration",tasks:["End-to-end: git push → ArgoCD auto-deploys → DAG runs → Grafana shows metrics","Record 3-min Loom demo","Confirm everything works from fresh Terraform apply","DSA: 2 problems + 1 SQL hard"],commit:"docs: airk8s loom demo + final readme",deliverable:"AirK8s COMPLETE",time:"4h",skipOk:false},
      {d:"Thu",title:"OpenTelemetry basics",tasks:["OTel: traces, metrics, logs — unified observability","Add OTel SDK to FastAPI app (traces)","View traces in Jaeger (local)","DSA: 2 medium problems"],commit:"feat: opentelemetry traces in fastapi",deliverable:null,time:"3h",skipOk:false},
      {d:"Fri",title:"Phase 5 review + resume update",tasks:["Self-quiz: explain K8s Deployment vs StatefulSet","Self-quiz: explain GitOps vs traditional CI/CD","Update resume: K8s, Helm, Terraform, ArgoCD, Prometheus","DSA: 2 problems"],commit:"docs: phase 5 review notes + resume update",deliverable:null,time:"2.5h",skipOk:false},
      {d:"Sat",title:"Phase 6 prep — LLM setup",tasks:["Install Ollama: ollama.com","Pull Qwen2.5-7B (test 16GB VRAM fits)","Open WebUI: run locally, chat with the model","Confirm GPU acceleration working (nvidia-smi)","DSA: 2 problems"],commit:"chore: ollama + qwen local setup verified",deliverable:"Local LLM running",time:"3h",skipOk:false},
      {d:"Sun",title:"Rest + LinkedIn",tasks:["LinkedIn post: \"AirK8s — Airflow on Kubernetes shipped\"","DSA: 2 easy review problems"],commit:"docs: airk8s linkedin post",deliverable:null,time:"1.5h",skipOk:true}
    ]},
  {w:23,title:"Phase 5 buffer + Phase 6 prep",sub:"K8s reinforcement, RAG architecture study",phase:"p5",
    days:[
      {d:"Mon",title:"K8s buffer — CKAD practice problems",tasks:["KodeKloud: 10 CKAD practice problems","Focus: Deployment, ConfigMap, PVC, HPA scenarios","DSA: 2 medium + 1 SQL hard"],commit:"docs: ckad practice notes",deliverable:null,time:"3h",skipOk:false},
      {d:"Tue",title:"RAG architecture deep study",tasks:["Read: LangChain RAG documentation (full read)","Understand: chunk → embed → store → retrieve → generate pipeline","Embedding models: what they do, how to choose","DSA: 2 medium problems"],commit:"docs: rag architecture study notes",deliverable:null,time:"2.5h",skipOk:false},
      {d:"Wed",title:"Qdrant vector database",tasks:["Run Qdrant in Docker","Create collection, insert vectors, similarity search","HNSW index — what it does","Python client: qdrant-client","DSA: 2 medium + 1 SQL hard"],commit:"feat: qdrant setup + similarity search demo",deliverable:null,time:"3h",skipOk:false},
      {d:"Thu",title:"LangChain fundamentals",tasks:["LangChain: Document loaders, Text splitters","Embeddings: sentence-transformers (free)","VectorStoreRetriever","First RAG chain: PDF → chunk → embed → query","DSA: DP review — 2 problems"],commit:"feat: first langchain rag pipeline",deliverable:null,time:"3.5h",skipOk:false},
      {d:"Fri",title:"Prompt engineering for DE context",tasks:["System prompts, few-shot examples","Structured output with Pydantic + Ollama","ReAct agent pattern: think → act → observe","DSA: 2 medium problems"],commit:"feat: structured output with pydantic + ollama",deliverable:null,time:"3h",skipOk:false},
      {d:"Sat",title:"DocMind — project kickoff",tasks:["Create docmind-rag repo","docker-compose: Ollama + Qdrant + FastAPI","Document ingestion endpoint: POST /ingest (accepts PDF)","DSA: 2 problems"],commit:"chore: docmind repo + docker compose",deliverable:"DocMind repo live",time:"3.5h",skipOk:false},
      {d:"Sun",title:"Rest",tasks:["DSA: 2 easy problems","Notes: vector db vs relational db — when to use each"],commit:null,deliverable:null,time:"1h",skipOk:true}
    ]},
  {w:24,title:"DocMind — RAG build",sub:"Chunking strategies, embedding, retrieval",phase:"p6",
    days:[
      {d:"Mon",title:"DocMind — PDF ingestion + chunking",tasks:["PyMuPDF: extract text from PDFs","Fixed-size chunking: 512 tokens with 64 overlap","Semantic chunking: split on sentence boundaries","Compare chunk quality — write evaluation notes","DSA: 2 medium + 1 SQL hard"],commit:"feat: docmind pdf ingestion + chunking strategies",deliverable:null,time:"4h",skipOk:false},
      {d:"Tue",title:"DocMind — embedding + Qdrant storage",tasks:["Embed chunks with nomic-embed-text (Ollama)","Batch upsert to Qdrant with metadata (source, page, chunk_id)","Similarity search: test retrieval quality manually","DSA: 2 medium problems"],commit:"feat: docmind embedding pipeline to qdrant",deliverable:null,time:"4h",skipOk:false},
      {d:"Wed",title:"DocMind — RAG chain",tasks:["Retriever: top-k=5 similar chunks","Prompt template: context + question → Qwen answer","FastAPI: POST /query returns answer + sources","DSA: 2 medium + 1 SQL hard"],commit:"feat: docmind rag query endpoint",deliverable:null,time:"4h",skipOk:false},
      {d:"Thu",title:"DocMind — RAGAS evaluation",tasks:["Install RAGAS","Generate eval dataset: 20 Q&A pairs from your docs","Run RAGAS: faithfulness, answer_relevance, context_precision","Target: faithfulness > 0.80","DSA: Graphs — 2 problems"],commit:"feat: ragas evaluation pipeline + results",deliverable:null,time:"4h",skipOk:false},
      {d:"Fri",title:"DocMind — improve retrieval",tasks:["Hybrid search: dense + BM25 sparse retrieval","Re-ranking with a cross-encoder","Re-run RAGAS — compare before/after scores","DSA: 2 medium problems"],commit:"feat: hybrid search + reranking",deliverable:null,time:"4h",skipOk:false},
      {d:"Sat",title:"DocMind — FastAPI + Docker final",tasks:["UI: simple HTML frontend (file upload + chat interface)","Dockerize everything: one docker-compose up","README: RAGAS scores table, architecture diagram, demo","DSA: 2 problems"],commit:"release: docmind v1.0.0",deliverable:"DocMind COMPLETE",time:"4h",skipOk:false},
      {d:"Sun",title:"Review + LinkedIn",tasks:["LinkedIn post: \"DocMind — local RAG with RAGAS evaluation\"","DSA: 2 problems","Update resume with Phase 6 bullets"],commit:"docs: docmind linkedin + resume update",deliverable:null,time:"1.5h",skipOk:true}
    ]},
  {w:25,title:"AI agents + LLM DE integration",sub:"ReAct agents, tool use, LLM for data tasks",phase:"p6",
    days:[
      {d:"Mon",title:"AI agents: ReAct pattern",tasks:["LangChain AgentExecutor + tools","Give agent tools: SQL query, file read, web search","Build: agent that answers questions by querying DuckDB","DSA: 2 medium + 1 SQL hard"],commit:"feat: react agent with duckdb tool",deliverable:null,time:"4h",skipOk:false},
      {d:"Tue",title:"LLM for data quality",tasks:["Use LLM to explain Great Expectations failures in plain English","Pipe GE failure JSON → Qwen → human-readable alert message","DSA: 2 medium problems"],commit:"feat: llm-powered data quality explanations",deliverable:null,time:"3.5h",skipOk:false},
      {d:"Wed",title:"Structured output + Pydantic",tasks:["LangChain with_structured_output()","Extract entities from unstructured text → typed Pydantic model","Build: parse transaction descriptions → category tags","DSA: DP — 2 problems + 1 SQL hard"],commit:"feat: structured extraction pipeline",deliverable:null,time:"3.5h",skipOk:false},
      {d:"Thu",title:"LlamaIndex vs LangChain comparison",tasks:["LlamaIndex: build same DocMind pipeline","Compare: verbosity, performance, maintainability","When to use LlamaIndex vs LangChain","DSA: 2 medium problems"],commit:"docs: llamaindex vs langchain comparison",deliverable:null,time:"3h",skipOk:false},
      {d:"Fri",title:"Phase 6 review + capstone planning",tasks:["Phase 6 checklist: RAG ✓ RAGAS eval ✓ agents ✓ Ollama ✓","Read capstone spec from roadmap — full read","Break capstone into week sprints","DSA: 2 problems"],commit:"docs: capstone sprint plan",deliverable:null,time:"3h",skipOk:false},
      {d:"Sat",title:"Capstone repo setup",tasks:["Create dataplatform-os repo (the main capstone repo)","Folder structure: infra/ pipelines/ streaming/ ai/ api/ docs/ tests/","Docker Compose: all services in one file","Protect main branch, set up PR templates","DSA: 2 problems"],commit:"chore: dataplatform-os repo scaffold",deliverable:"Capstone repo live",time:"3.5h",skipOk:false},
      {d:"Sun",title:"Rest",tasks:["DSA: 2 problems","Start applying to companies — even before capstone is done"],commit:null,deliverable:null,time:"1h",skipOk:true}
    ]},
  {w:26,title:"Phase 6 buffer + applications start",sub:"LLM reinforcement, first job applications",phase:"p6",
    days:[
      {d:"Mon",title:"LLM ops basics",tasks:["Prompt versioning: store prompts in YAML files","Response caching: don't re-call LLM for same prompt","Token budgeting: log token usage per request","DSA: 2 medium + 1 SQL hard"],commit:"feat: prompt versioning + response caching",deliverable:null,time:"3.5h",skipOk:false},
      {d:"Tue",title:"First job applications batch",tasks:["Apply to 5 companies from target list","Use referral if available — check LinkedIn connections","Track in spreadsheet: company, date, status, contact","DSA: 2 medium problems"],commit:null,deliverable:"5 applications sent",time:"2.5h",skipOk:false},
      {d:"Wed",title:"Capstone: architecture design session",tasks:["Draw complete architecture: all 7 components","Write ADR-001: Why DuckDB over Redshift","Write ADR-002: Why local LLM over OpenAI API","DSA: 2 medium + 1 SQL hard"],commit:"docs: capstone architecture diagram + ADRs",deliverable:null,time:"3.5h",skipOk:false},
      {d:"Thu",title:"Resume final update + LinkedIn",tasks:["Add all 5 projects to resume","1-page ATS format — test with Jobscan or similar","Update LinkedIn: banner, headline, about section","DSA: 2 problems"],commit:null,deliverable:"Resume v2.0 updated",time:"3h",skipOk:false},
      {d:"Fri",title:"Phase 6 COMPLETE + Phase 7 start",tasks:["Phase 6 checklist done","Start Capstone: pipelines/ directory — Airflow DAGs","DSA: 2 problems"],commit:"feat: capstone pipeline scaffold",deliverable:"Phase 6 COMPLETE",time:"3h",skipOk:false},
      {d:"Sat",title:"Networking sprint",tasks:["Connect with 5 data engineers on LinkedIn (personalized notes)","Comment on posts by DE leads at target companies","Join Data Engineering India LinkedIn group","DSA: 2 problems"],commit:null,deliverable:null,time:"2h",skipOk:false},
      {d:"Sun",title:"Rest",tasks:["DSA: 2 problems"],commit:null,deliverable:null,time:"1h",skipOk:true}
    ]},
  {w:27,title:"Capstone week 1 — batch + streaming",sub:"DataPlatform OS: core pipeline build",phase:"p7",
    days:[
      {d:"Mon",title:"Capstone: Kafka producer (FinTech transactions)",tasks:["Synthetic transaction generator (Faker, realistic FinTech data)","Kafka: transactions topic, 20 partitions","Avro schema for transactions","Schema Registry integration","DSA: 2 medium + 1 SQL hard (interview prep level)"],commit:"feat: capstone transaction producer with avro",deliverable:null,time:"5h",skipOk:false},
      {d:"Tue",title:"Capstone: FastAPI ingestion + REST layer",tasks:["POST /ingest/batch endpoint","POST /ingest/stream webhook","JWT auth + rate limiting","OpenTelemetry traces","DSA: 2 problems"],commit:"feat: capstone fastapi ingestion api",deliverable:null,time:"5h",skipOk:false},
      {d:"Wed",title:"Capstone: Airflow batch pipeline",tasks:["DAG: daily_transaction_processing","Tasks: validate → spark_transform → dbt_run → notify","Celery executor, 3 workers","S3 raw → Parquet → DuckDB","DSA: 2 medium + 1 SQL hard"],commit:"feat: capstone airflow batch dag",deliverable:null,time:"5h",skipOk:false},
      {d:"Thu",title:"Capstone: PySpark transform jobs",tasks:["job_clean_transactions.py","job_aggregate_daily.py","Parquet output: partitioned by year/month/day","Delta Lake format + time travel","DSA: 2 problems"],commit:"feat: capstone spark transform jobs",deliverable:null,time:"5h",skipOk:false},
      {d:"Fri",title:"Capstone: dbt models",tasks:["stg_transactions, stg_customers","fact_transactions, dim_customers (SCD2), dim_merchants","mart_daily_summary, mart_fraud_alerts","dbt tests + docs","DSA: DP + graphs review"],commit:"feat: capstone dbt models + tests",deliverable:null,time:"5h",skipOk:false},
      {d:"Sat",title:"Capstone: Spark Structured Streaming",tasks:["Kafka → Spark Structured Streaming consumer","Fraud rules: 5-txn rule, amount anomaly, geo-velocity","Alert topic → FastAPI webhook → Postgres","DSA: 2 problems"],commit:"feat: capstone streaming fraud detection",deliverable:null,time:"5h",skipOk:false},
      {d:"Sun",title:"Review + applications",tasks:["Apply to 5 more companies","DSA: 2 problems","Capstone progress check — update GitHub"],commit:null,deliverable:"10 total applications sent",time:"2h",skipOk:true}
    ]},
  {w:28,title:"Capstone week 2 — AI layer + infra",sub:"RAG integration, K8s + Terraform, CI/CD",phase:"p7",
    days:[
      {d:"Mon",title:"Capstone: RAG over transaction history",tasks:["Ingest transaction data into Qdrant (summary embeddings)","Natural language query: \"show suspicious activity for card 1234\"","Qwen-14B via Ollama (use full 16GB VRAM)","DSA: 2 medium + 1 SQL hard"],commit:"feat: capstone rag transaction query",deliverable:null,time:"5h",skipOk:false},
      {d:"Tue",title:"Capstone: Terraform infra",tasks:["infra/ directory: vpc/, eks/, rds/, s3/ modules","Single terraform apply provisions everything","Remote state in S3 + DynamoDB lock","Cost analysis: Spot instances save ~70%","DSA: 2 problems"],commit:"feat: capstone terraform full infra",deliverable:null,time:"5h",skipOk:false},
      {d:"Wed",title:"Capstone: Helm + K8s deployment",tasks:["Helm charts for: Airflow, FastAPI, Spark, Qdrant","K8s Secrets for: DB passwords, API keys","HPA on FastAPI (scale on CPU > 70%)","Network policies: isolate services","DSA: 2 medium + 1 SQL hard"],commit:"feat: capstone helm charts + k8s configs",deliverable:null,time:"5h",skipOk:false},
      {d:"Thu",title:"Capstone: ArgoCD GitOps",tasks:["ArgoCD app: watches dataplatform-os/main","Auto-sync: push to main → ArgoCD deploys to EKS","Rollback tested: argocd app rollback works","DSA: 2 problems"],commit:"feat: capstone argocd gitops pipeline",deliverable:null,time:"4h",skipOk:false},
      {d:"Fri",title:"Capstone: GitHub Actions CI/CD",tasks:[".github/workflows/ci.yml: pytest → ruff → mypy → docker build → ECR push → ArgoCD sync","Branch protection: require CI on PRs","DSA: 2 problems"],commit:"ci: capstone full ci/cd pipeline",deliverable:null,time:"4h",skipOk:false},
      {d:"Sat",title:"Capstone: Observability stack",tasks:["Prometheus + Grafana on K8s (kube-prometheus-stack)","15 dashboards: pipeline health, data quality, API perf, fraud rate","OpenTelemetry: traces for API + Airflow tasks","JSON structured logging everywhere","DSA: 2 problems"],commit:"feat: capstone observability 15 dashboards",deliverable:null,time:"5h",skipOk:false},
      {d:"Sun",title:"Applications + review",tasks:["Apply to 5 more companies (15 total)","Pramp: first mock interview session","DSA: 2 problems","Capstone progress: all components running?"],commit:null,deliverable:null,time:"3h",skipOk:true}
    ]},
  {w:29,title:"Capstone week 3 — polish + docs",sub:"Testing, MkDocs, cost analysis, Loom demo",phase:"p7",
    days:[
      {d:"Mon",title:"Capstone: integration testing",tasks:["testcontainers: spin up Kafka + Postgres for tests","End-to-end test: produce 100 txns → verify fraud alerts fired","Great Expectations: suite for all data layers","DSA: 2 medium + 1 SQL hard"],commit:"test: capstone e2e + data quality tests",deliverable:null,time:"5h",skipOk:false},
      {d:"Tue",title:"Capstone: MkDocs documentation site",tasks:["Install MkDocs + mkdocs-material","Docs structure: architecture, getting-started, components, runbooks","Deploy to GitHub Pages","DSA: 2 problems"],commit:"docs: mkdocs site deployed to github pages",deliverable:null,time:"4h",skipOk:false},
      {d:"Wed",title:"Capstone: cost analysis section",tasks:["Calculate: DuckDB vs Redshift ($0 vs ~$250/mo)","Calculate: Ollama vs OpenAI GPT-4 ($0 vs ~$80/mo)","Spot instances: Spark workers ($12/mo vs $40/mo on-demand)","Write cost analysis page in MkDocs","DSA: 2 medium + 1 SQL hard"],commit:"docs: cost analysis + spot instance configs",deliverable:null,time:"4h",skipOk:false},
      {d:"Thu",title:"Capstone: one-click local setup",tasks:["docker-compose.local.yml: entire stack runs locally without AWS","Test: fresh clone → docker-compose up → working in <5 minutes","Seed data script for first run","DSA: 2 problems"],commit:"feat: one-click local setup + seed data",deliverable:null,time:"4h",skipOk:false},
      {d:"Fri",title:"Capstone: Loom demo + README",tasks:["Record 8-10 min Loom: architecture walkthrough + live demo","README: badge strip, architecture diagram, Loom embed, cost table","CHANGELOG.md for v1.0.0","DSA: 2 problems"],commit:"docs: capstone readme + loom demo + changelog",deliverable:null,time:"5h",skipOk:false},
      {d:"Sat",title:"Capstone v1.0.0 release",tasks:["Tag v1.0.0","Pin dataplatform-os on GitHub (top of profile)","Resume: add capstone bullets (5 bullets from roadmap)","DSA: 2 problems"],commit:"release: dataplatform-os v1.0.0",deliverable:"CAPSTONE COMPLETE",time:"4h",skipOk:false},
      {d:"Sun",title:"Celebrate + apply",tasks:["Apply to 5 more companies (20 total)","LinkedIn: capstone announcement post","DSA: 2 problems — start interview-focused practice"],commit:null,deliverable:"20 applications sent",time:"3h",skipOk:true}
    ]},
  {w:30,title:"Capstone week 4 — refinement + interview alignment",sub:"Mock interviews, system design, resume tuning",phase:"p7",
    days:[
      {d:"Mon",title:"System design: design a data pipeline at scale",tasks:["Practice: \"Design Zepto's order analytics pipeline\"","Write 1-page design doc: components, trade-offs, bottlenecks","Record yourself explaining it — watch the recording","DSA: 2 medium + 1 SQL hard (StrataScratch hard)"],commit:"docs: system design practice doc",deliverable:null,time:"4h",skipOk:false},
      {d:"Tue",title:"Pramp mock interview #2",tasks:["Schedule + complete Pramp interview","Note feedback: what to improve","DSA: 2 problems + practice explaining solutions out loud"],commit:"docs: pramp feedback notes",deliverable:null,time:"4h",skipOk:false},
      {d:"Wed",title:"SQL interview prep sprint",tasks:["DataLemur: 10 SQL problems (curated DE interview questions)","StrataScratch: 5 hard problems","Practice: solve + explain solution out loud","DSA: 2 medium problems"],commit:"sql: datalemur + stratascratch solutions",deliverable:"50 total SQL problems solved",time:"4h",skipOk:false},
      {d:"Thu",title:"DE concepts interview Q&A",tasks:["Prepare answers to 7 key DE questions from roadmap","Write concise answers (2 min each when spoken)","Practice: Airflow mid-run failure? Spark RDDs vs DataFrames?","DSA: 2 problems"],commit:"docs: de interview q&a prep doc",deliverable:null,time:"3.5h",skipOk:false},
      {d:"Fri",title:"Apply + networking push",tasks:["Apply to 5 more companies (25 total)","Message 10 LinkedIn contacts for referrals","Follow up on earlier applications","DSA: 2 problems + 1 SQL hard"],commit:null,deliverable:"25 applications sent",time:"3.5h",skipOk:false},
      {d:"Sat",title:"Behavioral interview prep",tasks:["Write 6 STAR stories: challenge, disagreement, deadline, failure, leadership, ambiguity","Record yourself telling each story — aim for 2 min max","Refine: use real examples from KPFS internship + projects","DSA: 2 problems"],commit:"docs: star stories prep doc",deliverable:null,time:"4h",skipOk:false},
      {d:"Sun",title:"Rest + plan final weeks",tasks:["DSA: 2 problems","Review application pipeline — any responses?","Plan weeks 31-39: pure interview + application grind"],commit:null,deliverable:null,time:"1.5h",skipOk:true}
    ]},
  {w:31,title:"Interview prep — SQL + DSA",sub:"DataLemur, StrataScratch, LeetCode hard push",phase:"p8",
    days:[
      {d:"Mon",title:"SQL hard problems sprint",tasks:["DataLemur: 5 hard problems","StrataScratch: 3 Airbnb/Uber SQL problems","Practice explaining each solution out loud","DSA: 2 medium problems"],commit:"sql: week 31 solutions + explanations",deliverable:null,time:"4h",skipOk:false},
      {d:"Tue",title:"DSA: graphs + DP intensive",tasks:["LeetCode: 3 medium graphs problems","LeetCode: 2 medium DP problems","Timer: solve each in <25 minutes","Apply to 5 companies","DSA: total from today: 5"],commit:"docs: dsa practice notes",deliverable:null,time:"4h",skipOk:false},
      {d:"Wed",title:"Mock interview #3 — Pramp",tasks:["Complete Pramp session (live coding)","Analyze performance: where did you get stuck?","Re-do the problem you struggled with","DSA: 2 problems"],commit:"docs: pramp 3 feedback",deliverable:null,time:"4h",skipOk:false},
      {d:"Thu",title:"System design: idempotent payment pipeline",tasks:["Design a payment processing system with exactly-once semantics","Components: Kafka, Spark, Postgres, fraud detection","Write design doc, create architecture diagram","DSA: 2 medium + 1 SQL hard"],commit:"docs: system design payment pipeline",deliverable:null,time:"4h",skipOk:false},
      {d:"Fri",title:"LinkedIn + outreach sprint",tasks:["Apply to 5 more companies","Send 10 personalized referral request messages","Post LinkedIn: \"What I learned about Kafka exactly-once semantics\"","DSA: 2 problems"],commit:null,deliverable:"30 applications sent",time:"3.5h",skipOk:false},
      {d:"Sat",title:"DE concepts deep practice",tasks:["Explain: how would you handle late-arriving data in your capstone?","Explain: why DuckDB over Snowflake for your use case?","Explain: your data lineage strategy","DSA: 3 problems + LeetCode contest"],commit:"docs: de concept explanations refined",deliverable:null,time:"4h",skipOk:false},
      {d:"Sun",title:"Rest + review",tasks:["DSA: 2 review problems","Respond to any recruiter messages","Update application tracker spreadsheet"],commit:null,deliverable:null,time:"1.5h",skipOk:true}
    ]},
  {w:32,title:"Active interview mode",sub:"Screen calls, SQL live rounds, behavioral",phase:"p8",
    days:[
      {d:"Mon",title:"Phone screen prep",tasks:["Prepare 90-sec self-intro: SFIT → projects → skills → why DE","Practice: explain your capstone in 3 minutes","Apply to 5 companies","DSA: 2 medium problems"],commit:"docs: self-intro script",deliverable:null,time:"4h",skipOk:false},
      {d:"Tue",title:"SQL live round simulation",tasks:["Set 30-min timer: solve 3 StrataScratch hard problems","Verbalize your thought process while solving","Record yourself — watch it back","DSA: 2 problems + 1 SQL hard"],commit:"sql: live round simulation results",deliverable:null,time:"4h",skipOk:false},
      {d:"Wed",title:"Pramp mock #4 + apply",tasks:["Pramp: data engineering focused session","Apply to 5 companies","DSA: 2 problems"],commit:"docs: pramp 4 notes",deliverable:null,time:"4h",skipOk:false},
      {d:"Thu",title:"System design: Netflix recommendation pipeline",tasks:["Design: real-time + batch for 200M users","Discuss: Lambda vs Kappa architecture","Explain trade-offs out loud — record it","DSA: 2 medium + 1 SQL hard"],commit:"docs: netflix pipeline system design",deliverable:null,time:"4h",skipOk:false},
      {d:"Fri",title:"Hiring process research",tasks:["Research each company in pipeline: what does their DE interview look like?","Glassdoor, Blind, LinkedIn — find insider information","Tailor prep for specific companies","Apply to 5 companies (35 total)","DSA: 2 problems"],commit:"docs: company research notes",deliverable:"35 applications sent",time:"3.5h",skipOk:false},
      {d:"Sat",title:"Technical communication practice",tasks:["Pick 1 concept (e.g. Kafka partitioning) — explain to imaginary non-technical PM","Record it — aim for clarity, no jargon without explanation","DSA: 3 problems + LeetCode weekly contest"],commit:null,deliverable:null,time:"4h",skipOk:false},
      {d:"Sun",title:"Rest + review",tasks:["DSA: 2 problems","Check in: any offers/rejections? Adjust strategy if needed"],commit:null,deliverable:null,time:"1.5h",skipOk:true}
    ]},
  {w:33,title:"Interview gauntlet — active processes",sub:"Technical rounds, system design, SQL live coding",phase:"p8",
    days:[
      {d:"Mon",title:"DDIA reading sprint",tasks:["\"Designing Data-Intensive Applications\" — Ch 1 (reliability, scalability, maintainability)","Ch 3 (storage engines) — critical for \"how does Postgres index work?\"","Notes: 1 key insight per chapter to use in interviews","DSA: 2 medium + 1 SQL hard"],commit:"docs: ddia ch1 + ch3 notes",deliverable:null,time:"4h",skipOk:false},
      {d:"Tue",title:"Apply + screen calls",tasks:["Apply to 5 more companies (40 total)","Complete any scheduled phone screens","DDIA Ch 5 (replication) — \"explain CAP theorem\"","DSA: 2 problems"],commit:"docs: ddia ch5 notes",deliverable:"40 applications sent",time:"4h",skipOk:false},
      {d:"Wed",title:"DSA: top-K + sliding window intensive",tasks:["LeetCode: 5 top-K / heap problems (DE interview staple)","LeetCode: 3 sliding window problems","Timer: 20 min max per problem","DSA total today: 8"],commit:"docs: heap + sliding window solutions",deliverable:null,time:"4h",skipOk:false},
      {d:"Thu",title:"Mock interview #5 — Pramp",tasks:["Complete Pramp (final scheduled mock)","Focus on communication: think out loud","DDIA Ch 11 (stream processing)","DSA: 2 problems"],commit:"docs: pramp 5 notes + ddia ch11",deliverable:null,time:"4h",skipOk:false},
      {d:"Fri",title:"Apply + networking",tasks:["Apply to 5 companies (45 total)","Follow up on all applications > 2 weeks old","Send thank-you notes after any interviews","DSA: 2 problems + 1 SQL hard"],commit:null,deliverable:"45 applications sent",time:"3.5h",skipOk:false},
      {d:"Sat",title:"Full mock interview day",tasks:["Record a full 45-min mock interview: intro + SQL live + DE concepts + behavioral","Watch it back — identify top 3 improvements","Practice top 3 improvements","DSA: LeetCode contest"],commit:"docs: full mock interview self-assessment",deliverable:null,time:"5h",skipOk:false},
      {d:"Sun",title:"Rest — protect this day",tasks:["DSA: 2 light review problems","Mental reset — no heavy prep today","Review week: what's working in interviews?"],commit:null,deliverable:null,time:"1h",skipOk:true}
    ]},
  {w:34,title:"Final offer push — Feb 2027",sub:"Negotiate, close, repeat until hired",phase:"p8",
    days:[
      {d:"Mon",title:"Final SQL 100 target",tasks:["StrataScratch + DataLemur: remaining problems to hit 100 SQL total","DSA: 2 problems + review past weak spots","Apply to 5 companies (50 total)"],commit:"sql: 100 total sql problems DONE",deliverable:"100 SQL problems solved",time:"4h",skipOk:false},
      {d:"Tue",title:"DSA 250 target review",tasks:["Review LeetCode profile: how many solved?","Target: 250 problems by end of roadmap","Fill gaps: any pattern you've avoided?","DSA: 5 problems today"],commit:"docs: dsa progress review",deliverable:null,time:"4h",skipOk:false},
      {d:"Wed",title:"Offer evaluation framework",tasks:["If offer received: how to evaluate? Salary, growth, tech stack, team size","Negotiation: how to ask for more without burning the offer","Research: 9-10 LPA ≈ what ctc breakdown?","DSA: 2 problems + SQL hard"],commit:"docs: offer evaluation notes",deliverable:null,time:"3h",skipOk:false},
      {d:"Thu",title:"Active interview follow-through",tasks:["Complete any scheduled technical rounds","Send follow-up if radio silence > 1 week","DSA: 2 medium problems","Apply to 5 companies (55 total)"],commit:null,deliverable:"55 applications sent",time:"4h",skipOk:false},
      {d:"Fri",title:"Final capstone demo polish",tasks:["Update capstone demo if needed based on interview feedback","Ensure Loom link is public and working","Pin GitHub repos in the right order","DSA: 2 problems"],commit:"docs: capstone final polish",deliverable:null,time:"3h",skipOk:false},
      {d:"Sat",title:"Contingency plan review",tasks:["If no offer by Jan 31: expand target list — Sigmoid, Fractal, Tiger Analytics (consulting)","If no offer by Feb 15: also apply large corps (TCS iON Data, Infosys Springboard DE roles)","Keep DSA momentum — never let it lapse","DSA: 3 problems"],commit:"docs: contingency strategy notes",deliverable:null,time:"3h",skipOk:false},
      {d:"Sun",title:"Reflection + reset",tasks:["9-month journey review: what changed, what you built, who you became","Write a private note about this journey","DSA: 2 problems","The goal: offer in hand by Feb 28, 2027"],commit:null,deliverable:"TARGET: Offer received Feb 2027",time:"1.5h",skipOk:true}
    ]},
];

// Generate weeks 35–39 as in the original
const WEEKS_35_39: Week[] = [];
for (let w = 35; w <= 39; w++) {
  WEEKS_35_39.push({
    w,
    title: "Interview grind + offers",
    sub: "Active interview processes, negotiations, final DSA practice",
    phase: "p8",
    days: [
      {d:"Mon",title:"SQL + DSA daily grind",tasks:["StrataScratch: 3 SQL hard","LeetCode: 2 medium DSA","Apply to 3-5 companies if no offer yet"],commit:"sql: daily solutions",deliverable:null,time:"4h",skipOk:false},
      {d:"Tue",title:"Technical interviews + system design",tasks:["Complete any scheduled interviews","System design practice: 1 new scenario","DSA: 2 medium problems"],commit:null,deliverable:null,time:"4h",skipOk:false},
      {d:"Wed",title:"Networking + applications",tasks:["5 applications if no offer","Follow up on active pipelines","LinkedIn post (if not posted this week)","DSA: 2 problems + 1 SQL"],commit:null,deliverable:null,time:"3.5h",skipOk:false},
      {d:"Thu",title:"DE concepts + communication",tasks:["Practice explaining one concept clearly per day","Behavioral story polish","DSA: 2 medium problems"],commit:"docs: interview prep daily notes",deliverable:null,time:"3.5h",skipOk:false},
      {d:"Fri",title:"Apply + referrals",tasks:["5 applications","Send referral requests","DSA: 2 problems"],commit:null,deliverable:null,time:"3h",skipOk:false},
      {d:"Sat",title:"Full prep or rest depending on interviews",tasks:["If interview this week: full mock practice","If quiet week: rest + light DSA","LeetCode contest Sunday","DSA: 3 problems"],commit:null,deliverable:null,time:"3h",skipOk:true},
      {d:"Sun",title:"Rest + weekly review",tasks:["DSA: contest + 2 review problems","Application tracker update","Mental health check: take the day off if burned out"],commit:null,deliverable:"Goal: OFFER BY FEB 28 2027",time:"2h",skipOk:true}
    ]
  });
}

export const ALL_WEEKS: Week[] = [...WEEK_DATA, ...WEEKS_35_39];

export function getPhaseForWeek(weekNum: number): Phase | undefined {
  return PHASES.find(p => p.weeks.includes(weekNum));
}

export function getWeeksByPhase(phaseId: string): Week[] {
  const phase = PHASES.find(p => p.id === phaseId);
  if (!phase) return [];
  return ALL_WEEKS.filter(w => phase.weeks.includes(w.w));
}

export const TOTAL_DAYS = ALL_WEEKS.reduce((sum, w) => sum + w.days.length, 0);
export const TOTAL_WEEKS = ALL_WEEKS.length;
