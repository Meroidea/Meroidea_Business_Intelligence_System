# Meroidea

Role-based dashboard platform with AI features.

## Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js 14 (App Router) + Tailwind CSS + TypeScript |
| Backend | FastAPI (Python 3.11+) |
| Database & Auth | Supabase (Postgres + Auth + RLS) |
| AI | Hugging Face Inference API |
| Hosting | Vercel (frontend), Render (backend), Supabase (db) |

## Roles

- **admin** — full access to all data and admin dashboard
- **staff** — internal team access, staff dashboard
- **customer** — external users, customer dashboard

Role is stored in `public.profiles.role` and enforced via Postgres RLS + FastAPI dependencies.

## Project layout

```
Meroidea/
├── frontend/       # Next.js app — user-facing UI
├── backend/        # FastAPI app — AI + business logic API
└── supabase/       # SQL migrations + RLS policies
```

MEROIDEA/
├── frontend/                 # (Your current Next.js setup)
│   ├── src/                  
│   ├── .env.local.example
│   ├── next.config.mjs
│   ├── package.json
│   ├── tailwind.config.ts
│   └── tsconfig.json
│
├── backend/                  # (New FastAPI setup)
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py           # FastAPI application instance
│   │   ├── api/              # API routing (e.g., /users, /ai-tools)
│   │   ├── core/             # Security, JWT tokens, Supabase config
│   │   └── services/         # AI logic (Gemini API integrations)
│   ├── requirements.txt      # Python dependencies (fastapi, uvicorn, etc.)
│   └── .env                  # Backend-specific secrets
│
├── .env.example              # Global environment examples
├── .gitignore                # Global git ignores (node_modules, venv, etc.)
└── README.md

## Quickstart

### 1. Supabase
Create a project at https://supabase.com, then run the SQL in `supabase/migrations/` and `supabase/policies/` in the SQL editor.

### 2. Backend
```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # fill in SUPABASE_URL, SUPABASE_SERVICE_KEY, HF_API_TOKEN
uvicorn app.main:app --reload
```
API docs at http://localhost:8000/docs

### 3. Frontend
```bash
cd frontend
npm install
cp .env.local.example .env.local   # fill in NEXT_PUBLIC_SUPABASE_URL etc.
npm run dev
```
App at http://localhost:3000

## Deployment

- **Frontend** → push to GitHub, import repo in Vercel, set env vars.
- **Backend** → push to GitHub, new Web Service on Render pointing at `backend/`, start command `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.
- **Supabase** → already hosted; apply migrations via their SQL editor or the Supabase CLI.
# Meroidea_Business_Intelligence_System
