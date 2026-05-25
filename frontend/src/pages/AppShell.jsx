import React, { useState, useEffect } from "react";
import {
  LayoutDashboard, MessageSquare, GitPullRequest, Code2,
  BookOpen, Braces, GraduationCap, ChevronLeft, ChevronRight, Menu
} from "lucide-react";
import Dashboard from "./Dashboard.jsx";
import RepoChat from "./RepoChat.jsx";
import PRSummarizer from "./PRSummarizer.jsx";
import ReadmeGenerator from "./ReadmeGenerator.jsx";
import ApiDocs from "./ApiDocs.jsx";
import OnboardingGenerator from "./OnboardingGenerator.jsx";

const navItems = [
  {
    id: "dashboard",
    label: "Repo Analysis",
    icon: LayoutDashboard,
    color: "sky",
    desc: "Analyze & explore repository structure",
  },
  {
    id: "chat",
    label: "Repo Chat",
    icon: MessageSquare,
    color: "indigo",
    desc: "Ask questions about your codebase",
  },
  {
    id: "pr",
    label: "PR Summarizer",
    icon: GitPullRequest,
    color: "teal",
    desc: "Summarize pull request diffs with AI",
  },
  {
    id: "readme",
    label: "README Generator",
    icon: BookOpen,
    color: "amber",
    desc: "Generate a professional README.md",
  },
  {
    id: "apidocs",
    label: "API Docs Engine",
    icon: Braces,
    color: "violet",
    desc: "Auto-generate API reference docs",
  },
  {
    id: "onboarding",
    label: "Onboarding Guide",
    icon: GraduationCap,
    color: "rose",
    desc: "Create a Day 1 developer guide",
  },
];

const colorMap = {
  sky:    { bg: "bg-sky-500/15",    text: "text-sky-400",    border: "border-sky-500/30",    activeBg: "bg-sky-500/20"    },
  indigo: { bg: "bg-indigo-500/15", text: "text-indigo-400", border: "border-indigo-500/30", activeBg: "bg-indigo-500/20" },
  teal:   { bg: "bg-teal-500/15",   text: "text-teal-400",   border: "border-teal-500/30",   activeBg: "bg-teal-500/20"   },
  amber:  { bg: "bg-amber-500/15",  text: "text-amber-400",  border: "border-amber-500/30",  activeBg: "bg-amber-500/20"  },
  violet: { bg: "bg-violet-500/15", text: "text-violet-400", border: "border-violet-500/30", activeBg: "bg-violet-500/20" },
  rose:   { bg: "bg-rose-500/15",   text: "text-rose-400",   border: "border-rose-500/30",   activeBg: "bg-rose-500/20"   },
};

function PageContent({ tab }) {
  switch (tab) {
    case "dashboard":   return <Dashboard />;
    case "chat":        return <RepoChat />;
    case "pr":          return <PRSummarizer />;
    case "readme":      return <ReadmeGenerator />;
    case "apidocs":     return <ApiDocs />;
    case "onboarding":  return <OnboardingGenerator />;
    default:            return <Dashboard />;
  }
}

export default function AppShell() {
  const [tab, setTab] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [backendStatus, setBackendStatus] = useState("checking");

  useEffect(() => {
    async function checkBackend() {
      try {
        const res = await fetch("http://localhost:4000/api/analyze-repo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ repoPath: "." }),
          signal: AbortSignal.timeout(3000),
        });
        setBackendStatus(res.status < 500 ? "online" : "offline");
      } catch {
        setBackendStatus("offline");
      }
    }
    checkBackend();
    const id = setInterval(checkBackend, 30000);
    return () => clearInterval(id);
  }, []);

  const activeItem = navItems.find((n) => n.id === tab);

  return (
    <div className="min-h-screen flex relative overflow-hidden pt-16">
      <div className="fixed top-16 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob pointer-events-none" />
      <div className="fixed top-[30%] right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob pointer-events-none" style={{ animationDelay: "2s" }} />
      <div className="fixed bottom-0 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob pointer-events-none" style={{ animationDelay: "4s" }} />

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={
          `fixed top-16 left-0 bottom-0 z-40 flex flex-col glass-panel border-r border-white/10 shadow-2xl transition-all duration-300 ease-in-out ${collapsed ? "w-[70px]" : "w-[240px]"} ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`
        }
      >
        <div className={`flex items-center h-16 px-4 border-b border-white/8 shrink-0 ${collapsed ? "justify-center" : "gap-2.5"}`}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-sky-500/25 shrink-0">
            <Code2 size={17} className="text-white" />
          </div>
          {!collapsed && (
            <h1 className="text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-400 whitespace-nowrap overflow-hidden">
              OmniRepo AI
            </h1>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 custom-scrollbar">
          {!collapsed && (
            <p className="px-4 py-1 text-[10px] uppercase tracking-widest text-slate-600 font-semibold mb-1">
              Features
            </p>
          )}
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = tab === item.id;
            const c = colorMap[item.color];

            return (
              <button
                key={item.id}
                onClick={() => { setTab(item.id); setMobileOpen(false); }}
                title={collapsed ? item.label : undefined}
                className={
                  `w-full flex items-center gap-3 px-3 py-2.5 mx-1 my-0.5 rounded-xl transition-all duration-200 group relative ${collapsed ? "justify-center" : ""} ${isActive ? `${c.activeBg} ${c.text} border ${c.border} shadow-sm` : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"}`
                }
                style={{ width: collapsed ? "calc(100% - 8px)" : "calc(100% - 8px)" }}
              >
                <Icon
                  size={18}
                  className={`shrink-0 transition-transform duration-200 ${isActive ? c.text : "text-slate-500 group-hover:text-slate-300"} ${isActive ? "scale-110" : ""}`}
                />
                {!collapsed && (
                  <div className="flex flex-col items-start min-w-0">
                    <span className="text-sm font-medium leading-tight truncate w-full">{item.label}</span>
                    {isActive && (
                      <span className="text-[10px] text-slate-500 truncate w-full leading-tight mt-0.5">{item.desc}</span>
                    )}
                  </div>
                )}
                {collapsed && isActive && (
                  <span className={`absolute right-1 top-1/2 -translate-y-1/2 w-1 h-4 rounded-full ${c.bg}`} />
                )}
              </button>
            );
          })}
        </nav>

        <div className="shrink-0 p-3 border-t border-white/8">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all duration-200 ${collapsed ? "justify-center" : ""}`}
          >
            {collapsed ? <ChevronRight size={16} /> : <><ChevronLeft size={16} /><span className="text-xs font-medium">Collapse</span></>}
          </button>
        </div>
      </aside>

      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${collapsed ? "lg:ml-[70px]" : "lg:ml-[240px]"} pt-16`}>
        <header className="sticky top-0 z-20 glass-panel border-b border-white/8 h-16 flex items-center px-4 md:px-6 gap-4 shrink-0">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Menu size={20} />
          </button>

          {activeItem && (
            <div className="flex items-center gap-2.5">
              <div className={`p-1.5 ${colorMap[activeItem.color].activeBg} rounded-lg`}>
                {React.createElement(activeItem.icon, {
                  size: 16,
                  className: colorMap[activeItem.color].text,
                })}
              </div>
              <div>
                <h2 className="text-sm font-semibold text-white leading-none">{activeItem.label}</h2>
                <p className="text-[11px] text-slate-500 leading-none mt-0.5 hidden sm:block">{activeItem.desc}</p>
              </div>
            </div>
          )}

          <div className="ml-auto flex items-center gap-2">
            {backendStatus === "checking" && (
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-500/10 border border-slate-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse" />
                <span className="text-[11px] text-slate-400 font-medium">Connecting...</span>
              </div>
            )}
            {backendStatus === "online" && (
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[11px] text-green-400 font-medium">AI Ready</span>
              </div>
            )}
            {backendStatus === "offline" && (
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                <span className="text-[11px] text-red-400 font-medium">Backend Offline</span>
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 z-10 animate-fade-in overflow-y-auto">
          <PageContent tab={tab} />
        </main>
      </div>
    </div>
  );
}
