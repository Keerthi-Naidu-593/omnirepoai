# 🤖 OmniRepo AI

> **AI-powered developer toolkit that understands your codebase so you don't have to.**

OmniRepo AI is a full-stack hackathon project that supercharges developer workflows using Google Gemini. It includes a polished landing page, login/signup flow, profile/settings page, and a protected repo workspace with AI-powered docs, chat, PR summarization, and onboarding generation — all in a dark-mode experience.


---

## ✨ Features

| Feature | Description |
|---|---|
| 🔍 **Repo Analysis** | Scan a local repository and get a structured breakdown of its file tree, tech stack, and key stats |
| 💬 **Repo Chat** | Ask natural-language questions about your codebase and get AI-powered answers |
| 🔀 **PR Summarizer** | Paste a Git diff and receive a clear, concise summary of the pull request's changes |
| 📄 **README Generator** | Auto-generate a professional `README.md` tailored to your project |
| 📚 **API Docs Engine** | Scan your source files and produce structured API reference documentation |
| 🎓 **Onboarding Guide** | Generate a Day-1 developer guide covering setup, architecture, and first steps |
| 👤 **Auth & Profile** | Demo login/signup and account profile pages with persistent browser storage |
| 🏠 **Landing Pages** | Home and About pages that introduce the app and guide users to sign in |

---

## 🗂️ Project Structure

```
omnirepoai/
├── backend/                  # Express.js API server
│   └── src/
│       ├── index.js          # App entry point (port 4000)
│       ├── routes.js         # All /api/* route definitions
│       ├── aiClient.js       # Google Gemini API wrapper
│       ├── repoAnalyzer.js   # Repository file-tree scanner
│       ├── repoChat.js       # Context-aware chat handler
│       ├── docGenerator.js   # General documentation generator
│       ├── deploymentAnalyzer.js  # Deployment diff analyzer
│       ├── prSummarizer.js   # Pull-request diff summarizer
│       ├── readmeGenerator.js     # README.md generator
│       ├── apiDocGenerator.js     # API reference doc generator
│       └── onboardingGenerator.js # Onboarding guide generator
│
└── frontend/                 # React + Vite SPA
    └── src/
        ├── App.jsx           # Root layout with routing and global page shell
        ├── pages/
        │   ├── Home.jsx               # Landing page
        │   ├── About.jsx              # Product story page
        │   ├── Login.jsx              # Sign-in page
        │   ├── Signup.jsx             # Registration page
        │   ├── Profile.jsx            # User profile and settings page
        │   ├── AppShell.jsx           # Protected workspace shell
        │   ├── Dashboard.jsx          # Repo Analysis page
        │   ├── RepoChat.jsx           # AI Chat page
        │   ├── PRSummarizer.jsx       # PR Summarizer page
        │   ├── ReadmeGenerator.jsx    # README Generator page
        │   ├── ApiDocs.jsx            # API Docs Engine page
        │   └── OnboardingGenerator.jsx # Onboarding Guide page
        └── components/       # Shared UI components
            ├── Navbar.jsx          # Application navigation bar
```

---

## 🛠️ Tech Stack

### Backend
- **Node.js** + **Express.js** — REST API server
- **Google Gemini API** (`gemini-flash-latest`) — AI completions
- **axios** — HTTP client for Gemini API calls
- **dotenv** — Environment variable management
- **cors** — Cross-origin request support
- **nodemon** — Hot-reload during development

### Frontend
- **React 18** + **Vite 5** — Fast SPA development
- **Tailwind CSS 3** — Utility-first styling
- **Lucide React** — Icon library
- **Glassmorphism UI** — Dark-mode design with animated background blobs
- **Collapsible Sidebar** — Responsive navigation layout

---

## ⚙️ Getting Started

### Prerequisites

- **Node.js** v18 or later
- A **Google Gemini API key** — get one free at [aistudio.google.com](https://aistudio.google.com)

---

### 1. Clone the Repository

```bash
git clone https://github.com/Keerthi-Naidu-593/omnirepoai.git
cd omnirepoai
```

---

### 2. Configure the Backend

```bash
cd backend
```

Create a `.env` file:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

The backend will run at **http://localhost:4000**.

---

### 3. Start the Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run at **http://localhost:5173** (or the next available port).

---

## 🌐 API Reference

All routes are prefixed with `/api`.

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| `POST` | `/api/analyze-repo` | `{ repoPath }` | Analyze a local repository |
| `POST` | `/api/repo-chat` | `{ repoPath, question }` | Chat with your codebase |
| `POST` | `/api/generate-docs` | `{ repoPath }` | Generate general documentation |
| `POST` | `/api/deployment-changes` | `{ repoPath }` | Analyze deployment-related changes |
| `POST` | `/api/summarize-pr` | `{ diffText }` | Summarize a PR diff |
| `POST` | `/api/generate-readme` | `{ repoPath }` | Generate a README.md |
| `POST` | `/api/generate-api-docs` | `{ repoPath }` | Generate API reference docs |
| `POST` | `/api/generate-onboarding` | `{ repoPath }` | Generate an onboarding guide |

---

## 🔒 Security Notes

- Sensitive environment variables are **automatically redacted** before any content is sent to the AI model.
- Your Gemini API key is stored only in the backend `.env` file and is never exposed to the frontend.
- Make sure `.env` is listed in your `.gitignore` before pushing to a public repository.

---

## 📸 UI Overview

The frontend features a **dark-mode, glassmorphism design** with:

- A **collapsible left sidebar** for navigation (expands to 240px, collapses to 70px icon-only mode)
- A **responsive mobile hamburger menu**
- A **live backend status indicator** in the header (polls every 30 seconds)
- Animated gradient background blobs for a premium look and feel

---

## 🚀 Development Scripts

| Directory | Command | Description |
|-----------|---------|-------------|
| `backend/` | `npm run dev` | Start backend with nodemon (hot-reload) |
| `backend/` | `npm start` | Start backend with Node.js |
| `frontend/` | `npm run dev` | Start Vite dev server |
| `frontend/` | `npm run build` | Build production bundle |
| `frontend/` | `npm run preview` | Preview production build locally |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

This project was built for a hackathon. Feel free to use, modify, and distribute it under the [MIT License](LICENSE).

---

<p align="center">Built with ❤️ and powered by <strong>Google Gemini</strong></p>
