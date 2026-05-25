import React from "react";
import { Code2, Sparkles, ShieldCheck, Zap, ArrowRight, Layers, BookOpen, MessageSquare, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Analyze Code Instantly",
    description: "Inspect repository structure and get deep insights in seconds.",
    icon: Layers,
  },
  {
    title: "Ship Better Docs",
    description: "Auto-generate comprehensive README and API documentation.",
    icon: BookOpen,
  },
  {
    title: "Chat with Your Repo",
    description: "Ask questions about files, branches, and pull requests naturally.",
    icon: MessageSquare,
  },
];

const highlights = [
  {
    title: "Understand Code Faster",
    description: "Quickly explore repositories, understand complex structures, and onboard new team members in minutes.",
    icon: Code2,
  },
  {
    title: "Generate Docs Automatically",
    description: "Create professional README files and API documentation without the manual work.",
    icon: BookOpen,
  },
  {
    title: "Get Instant Answers",
    description: "Ask OmniRepo questions about your codebase and get AI-powered answers immediately.",
    icon: Sparkles,
  },
];

function FeatureCard({ title, description, icon: Icon }) {
  return (
    <div className="group surface-card p-6 hover:shadow-lg hover:shadow-sky-500/10 hover:-translate-y-2 transition-all duration-300">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500/20 to-indigo-600/20 text-sky-400 mb-4 group-hover:from-sky-500/30 group-hover:to-indigo-600/30 transition-colors">
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm leading-6 text-slate-400">{description}</p>
    </div>
  );
}

function HighlightCard({ title, description, icon: Icon }) {
  return (
    <div className="surface-card p-8 hover:shadow-lg hover:shadow-sky-500/10 transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400">
          <Icon size={20} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
          <p className="text-slate-400 leading-7 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-indigo-500/5 pointer-events-none rounded-3xl" />
        <div className="relative mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-block">
                <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-sky-300">
                  <Sparkles size={14} /> AI-Powered Repository Tools
                </span>
              </div>

              {/* Heading */}
              <div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
                  Understand your code, <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">instantly</span>
                </h1>
                <p className="mt-7 max-w-xl text-lg sm:text-xl leading-8 text-slate-300 font-light">
                  OmniRepo AI analyzes your repositories, generates documentation, and answers questions about your codebase. Ship better code with less effort.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center pt-4">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-sky-500/30 transition hover:shadow-2xl hover:shadow-sky-500/40 hover:-translate-y-1 active:translate-y-0"
                >
                  Get Started Today
                  <ArrowRight size={18} />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center rounded-xl border border-sky-500/20 bg-sky-500/5 px-8 py-4 text-sm font-semibold text-sky-300 transition hover:bg-sky-500/10 hover:border-sky-500/40"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Right Features Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
              {/* Extra visual element */}
              <div className="sm:col-span-2 surface-card p-6 bg-gradient-to-br from-indigo-500/10 to-sky-500/10 border border-indigo-500/20">
                <div className="flex items-center gap-3">
                  <Zap size={24} className="text-yellow-400" />
                  <div>
                    <p className="text-sm font-semibold text-white">Lightning Fast</p>
                    <p className="text-xs text-slate-400">Real-time analysis and responses</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="mt-32">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">What OmniRepo Can Do</h2>
            <p className="max-w-2xl mx-auto text-lg text-slate-400">Powerful features that make your development workflow smoother</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {highlights.map((highlight) => (
              <HighlightCard key={highlight.title} {...highlight} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-32 relative">
        <div className="mx-auto max-w-4xl">
          <div className="surface-panel rounded-2xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 via-transparent to-indigo-500/10 pointer-events-none" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to ship better code?</h2>
              <p className="text-lg text-slate-300 mb-8">Start analyzing your repositories with OmniRepo AI today.</p>
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-sky-500/30 transition hover:shadow-2xl hover:shadow-sky-500/40 hover:-translate-y-1"
              >
                Start for Free
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}