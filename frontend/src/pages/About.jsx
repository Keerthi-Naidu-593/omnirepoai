import React from "react";
import { Sparkles, Layers, BookOpen, Zap, ArrowRight, CheckCircle2, Code2, Cpu, AlertCircle, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const values = [
  {
    title: "Analyze Code",
    description: "Instantly understand repository structure, dependencies, and architecture.",
    icon: Layers,
  },
  {
    title: "Generate Documentation",
    description: "Create professional README and API docs automatically from your code.",
    icon: BookOpen,
  },
  {
    title: "Chat with Your Code",
    description: "Ask natural language questions and get AI-powered answers about your repository.",
    icon: Sparkles,
  },
  {
    title: "Save Time",
    description: "Reduce hours of manual documentation and code review work.",
    icon: Zap,
  },
];

const useCases = [
  {
    title: "Onboarding New Developers",
    description: "Help team members understand the codebase faster with auto-generated documentation and instant answers to their questions.",
    icon: Layers,
  },
  {
    title: "Code Documentation",
    description: "Generate comprehensive README files and API documentation that keep your repos accessible and maintainable.",
    icon: BookOpen,
  },
  {
    title: "Code Review & Analysis",
    description: "Get instant insights into code changes, potential issues, and architectural implications.",
    icon: CheckCircle2,
  },
];

const techStack = [
  {
    title: "Frontend-First",
    description: "Built with React and modern web technologies for a fast, responsive user experience.",
    icon: Code2,
  },
  {
    title: "AI-Powered",
    description: "Integrated with AI APIs to intelligently analyze code and generate professional documentation.",
    icon: Cpu,
  },
  {
    title: "Zero Backend Setup",
    description: "Local storage handles authentication and data. Deploy anywhere in seconds with zero server complexity.",
    icon: Zap,
  },
];

const roadmap = [
  {
    title: "Secured Authentication",
    description: "JWT-based authentication with database backend for production-ready security and multi-device support.",
    status: "Coming Soon",
  },
  {
    title: "GitHub Integration",
    description: "Direct analysis of repositories from GitHub links with real-time updates and PR insights.",
    status: "Planned",
  },
  {
    title: "ZIP File Support",
    description: "Upload compressed project folders for instant analysis without needing local file access.",
    status: "Planned",
  },
  {
    title: "Team Collaboration",
    description: "Share analysis results, docs, and insights with your team members in real-time.",
    status: "Planned",
  },
];

function ValueCard({ title, description, icon: Icon }) {
  return (
    <div className="group surface-card p-7 rounded-2xl border border-sky-500/10 hover:border-sky-500/30 hover:shadow-lg hover:shadow-sky-500/10 hover:-translate-y-1 transition-all duration-300">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500/20 to-indigo-600/20 text-sky-400 mb-4 group-hover:from-sky-500/30 group-hover:to-indigo-600/30 transition-colors">
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
      <p className="text-sm leading-6 text-slate-400">{description}</p>
    </div>
  );
}

function UseCaseCard({ title, description, icon: Icon }) {
  return (
    <div className="surface-card p-8 rounded-2xl border border-white/5 hover:border-sky-500/20 hover:shadow-lg hover:shadow-sky-500/10 transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400">
          <Icon size={22} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
          <p className="text-slate-400 leading-6 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}

function TechCard({ title, description, icon: Icon }) {
  return (
    <div className="surface-card p-8 rounded-2xl border border-white/5 hover:border-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
          <Icon size={22} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
          <p className="text-slate-400 leading-6 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}

function RoadmapCard({ title, description, status }) {
  const statusColor = status === "Coming Soon" ? "bg-sky-500/20 text-sky-300" : "bg-slate-700/20 text-slate-300";
  return (
    <div className="surface-card p-8 rounded-2xl border border-white/5 hover:border-indigo-500/20 transition-all duration-300">
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="text-lg font-semibold text-white flex-1">{title}</h3>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ${statusColor}`}>
          {status}
        </span>
      </div>
      <p className="text-slate-400 leading-6 text-sm">{description}</p>
    </div>
  );
}

export default function About() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="mx-auto max-w-6xl space-y-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-indigo-500/5 pointer-events-none rounded-3xl" />
          <div className="relative">
            <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
              {/* Left Content */}
              <div className="space-y-8 flex-1">
                {/* Badge */}
                <div className="inline-block">
                  <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-sky-300">
                    <Sparkles size={14} /> About OmniRepo AI
                  </span>
                </div>

                {/* Main Heading */}
                <div>
                  <h1 className="text-5xl sm:text-6xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                    AI that understands <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">your code</span>
                  </h1>
                  <p className="mt-8 text-lg sm:text-xl leading-8 text-slate-300 font-light max-w-2xl">
                    OmniRepo AI analyzes your repositories, auto-generates documentation, and answers questions about your codebase. Everything you need to understand and ship code faster.
                  </p>
                </div>
              </div>

              {/* Right Card */}
              <div className="flex-1 lg:sticky lg:top-32">
                <div className="surface-card rounded-2xl border border-sky-500/20 p-8 sm:p-10 bg-gradient-to-br from-sky-500/5 to-indigo-500/5">
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-sky-300 font-semibold">The Goal</p>
                      <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-white leading-tight">
                        Make code understanding effortless
                      </h2>
                    </div>
                    <p className="text-slate-300 leading-7 pt-2">
                      Whether you're onboarding, reviewing code, or documenting your project, OmniRepo AI speeds up every step of the process.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Current Capabilities Section */}
        <section>
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-sky-300 mb-4">
              <CheckCircle2 size={14} /> Available Now
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mt-4 mb-3">Current Features</h2>
            <p className="max-w-2xl text-lg text-slate-400">Powerful AI-driven tools available for local repository analysis</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-4">
            {values.map((item) => (
              <ValueCard key={item.title} {...item} />
            ))}
          </div>

          {/* Current Limitations Notice */}
          <div className="mt-12 surface-card rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/5 to-orange-500/5 p-8">
            <div className="flex gap-4">
              <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-400 pt-0.5 mt-0.5">
                <AlertCircle size={16} />
              </div>
              <div>
                <h3 className="font-semibold text-amber-200 mb-2">Currently Available For</h3>
                <p className="text-amber-100/80 text-sm leading-6">
                  OmniRepo AI currently analyzes repositories from <strong>local file paths</strong> on your system. GitHub links and ZIP file uploads will be available soon as we expand platform support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section>
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-sky-300 mb-4">
              <Sparkles size={14} /> How to Use OmniRepo
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mt-4 mb-4">Common use cases</h2>
            <p className="max-w-2xl text-lg text-slate-400">OmniRepo adapts to your workflow, whether you're building alone or with a team</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {useCases.map((useCase) => (
              <UseCaseCard key={useCase.title} {...useCase} />
            ))}
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-purple-500/5 pointer-events-none rounded-3xl" />
          <div className="relative">
            <div className="mb-16">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-indigo-300 mb-4">
                <Code2 size={14} /> Under the Hood
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mt-4 mb-4">Built simple, built fast</h2>
              <p className="max-w-2xl text-lg text-slate-400">OmniRepo is engineered for speed and simplicity. Built with React and AI APIs, with local storage for instant setup. No databases, no server complexity—just a fast, responsive tool for developers.</p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {techStack.map((tech) => (
                <TechCard key={tech.title} {...tech} />
              ))}
            </div>

            {/* Security Notice */}
            <div className="mt-12 surface-card rounded-2xl border border-slate-700/50 bg-gradient-to-r from-slate-800/30 to-slate-900/30 p-8">
              <div className="flex gap-4">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-700/50 text-slate-300 pt-0.5 mt-0.5">
                  <AlertCircle size={16} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-200 mb-2">Authentication Status</h3>
                  <p className="text-slate-400 text-sm leading-6 mb-3">
                    Currently using <strong>local storage</strong> for quick development and demo purposes. This is perfect for hackathons and prototyping.
                  </p>
                  <p className="text-slate-400 text-sm">
                    <strong>Future upgrade planned:</strong> JWT-based authentication with a secure database backend for production-ready access control and multi-device support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Roadmap Section */}
        <section>
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-purple-300 mb-4">
              <Rocket size={14} /> Future Enhancements
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mt-4 mb-4">What's coming next</h2>
            <p className="max-w-2xl text-lg text-slate-400">We're constantly improving OmniRepo. Here's what's on our roadmap</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {roadmap.map((item) => (
              <RoadmapCard key={item.title} {...item} />
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="relative overflow-hidden">
          <div className="surface-card rounded-3xl border border-white/5 p-12 sm:p-16 bg-gradient-to-br from-indigo-500/10 via-transparent to-sky-500/10">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <p className="text-sm uppercase tracking-widest text-sky-300 font-semibold mb-4">Why Choose OmniRepo?</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
                  Ship better code, faster.
                </h2>
                <p className="text-slate-300 leading-8 text-lg mb-6">
                  OmniRepo AI handles the tedious parts of code analysis and documentation, so you can focus on what matters—building great software.
                </p>
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:shadow-xl hover:shadow-sky-500/30 hover:-translate-y-0.5"
                >
                  Try OmniRepo AI
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className="space-y-5">
                {[
                  {
                    label: "Save Time",
                    text: "Automate documentation and code analysis that would take hours to do manually.",
                  },
                  {
                    label: "Better Onboarding",
                    text: "Help new team members understand your codebase in minutes, not weeks.",
                  },
                  {
                    label: "Instant Answers",
                    text: "Ask questions about your code and get AI-powered insights immediately.",
                  },
                  {
                    label: "Professional Docs",
                    text: "Generate clean, well-structured documentation that keeps your repos maintainable.",
                  },
                ].map((point) => (
                  <div key={point.label} className="flex gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-sky-500/20 text-sky-400 pt-0.5">
                      <CheckCircle2 size={16} />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{point.label}</p>
                      <p className="text-slate-400 text-sm mt-1">{point.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section>
          <div className="surface-card rounded-3xl border border-sky-500/20 p-12 sm:p-16 text-center bg-gradient-to-r from-sky-500/10 via-slate-900/50 to-indigo-500/10">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Ready to analyze your repositories?</h2>
            <p className="max-w-2xl mx-auto text-lg text-slate-300 mb-10">
              Start using OmniRepo AI to understand, document, and ship your code faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-sky-500/30 transition hover:shadow-2xl hover:shadow-sky-500/40 hover:-translate-y-1"
              >
                Get Started Free
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-xl border border-sky-500/20 bg-sky-500/5 px-8 py-4 text-base font-semibold text-sky-300 transition hover:bg-sky-500/10 hover:border-sky-500/40"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}