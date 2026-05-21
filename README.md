# ResumeForge

Modern full-stack AI Resume Builder built with **Next.js**, **TypeScript**, **Tailwind CSS**, **MongoDB**, and **JWT authentication**.

![ResumeForge](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green?style=flat-square&logo=mongodb)

## Features

- **Authentication** — Signup, login, logout, JWT cookies, protected dashboard
- **Resume Dashboard** — Create, edit, delete, duplicate, search with thumbnail previews
- **Multi-step Form Builder** — Personal info, summary, experience, education, skills, projects, and more
- **Live Preview** — Split-screen editor with real-time A4 resume preview and zoom controls
- **4 Templates** — ATS Minimal, Modern Developer, Corporate, Creative Gradient
- **Drag & Drop** — Reorder sections with `@dnd-kit`
- **AI Tools** — Summary generation, skill suggestions, experience bullet rewriter (OpenAI or mock fallback)
- **ATS Score Meter** — Completeness, keywords, readability, suggestions
- **Theme Customizer** — Fonts, colors, spacing, sizes
- **PDF Export** — High-quality Puppeteer PDF generation
- **Public Sharing** — `/u/[slug]` shareable resume links
- **Admin Analytics** — User and resume stats (admin role)
- **Dark/Light Mode** — `next-themes`
- **Import/Export JSON** — Backup and restore resumes

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | Next.js App Router, React 19, Tailwind CSS 4, Framer Motion, React Hook Form, Zustand |
| Backend | Next.js API Routes, Mongoose, JWT, bcrypt |
| AI | OpenAI API (optional) |
| PDF | Puppeteer |

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Installation

```bash
npm install
cp .env.example .env.local
```

Edit `.env.local`:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/resumeforge
JWT_SECRET=your-secret-key-here
OPENAI_API_KEY=sk-...          # optional
NEXT_PUBLIC_APP_URL=http://localhost:3000
ADMIN_EMAILS=you@email.com     # grants admin role on signup
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Pages & API routes
│   ├── api/               # auth, resumes, ai, ats, pdf, admin
│   ├── dashboard/         # Protected app
│   ├── u/[slug]/          # Public resume
│   ├── login, signup, pricing
├── components/            # UI, layout, resume widgets
├── templates/             # Resume template components
├── store/                 # Zustand state
├── hooks/                 # useAutoSave, useATS
├── lib/                   # auth, mongodb, openai, pdf, ats
├── models/                # Mongoose schemas
├── types/                 # TypeScript types
└── data/                  # Sample resume data
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/pricing` | Pricing plans |
| `/login`, `/signup` | Authentication |
| `/dashboard` | Resume list |
| `/dashboard/resumes/[id]` | Resume editor |
| `/dashboard/templates` | Template gallery |
| `/dashboard/settings` | User settings |
| `/dashboard/admin` | Admin analytics |
| `/u/[slug]` | Public shared resume |

## API Endpoints

- `POST /api/auth/signup` — Register
- `POST /api/auth/login` — Login
- `POST /api/auth/logout` — Logout
- `GET /api/auth/me` — Current user
- `GET/POST /api/resumes` — List / create
- `GET/PATCH/DELETE /api/resumes/[id]` — CRUD
- `POST /api/resumes/[id]/duplicate` — Duplicate
- `GET /api/resumes/public/[slug]` — Public resume
- `POST /api/ai/rewrite` — AI bullet rewriter
- `POST /api/ai/summary` — AI summary
- `POST /api/ai/skills` — Skill suggestions
- `POST /api/ats/analyze` — ATS score
- `POST /api/pdf/generate` — PDF download
- `GET /api/admin/analytics` — Admin stats

## Sample Data

Click **Sample Data** on the dashboard to create a resume pre-filled with demo content (Rani Sharma — Full Stack Developer).

## Keyboard Shortcuts

- `Ctrl+S` / `Cmd+S` — Save resume in editor

## License

MIT
