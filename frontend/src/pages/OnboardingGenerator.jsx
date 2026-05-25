import React, { useState } from "react";
import { GraduationCap, Download, Copy, Check, Loader2, Sparkles, FolderGit2, Search } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function OnboardingGenerator() {
  const [repoPath, setRepoPath] = useState("");
  const [guide, setGuide] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleGenerate() {
    if (!repoPath.trim()) return;
    setLoading(true);
    setGuide("");
    try {
      const res = await fetch(`${API_BASE}/generate-onboarding`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoPath }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setGuide(data.guide);
    } catch (e) {
      setGuide(`❌ Error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(guide);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownload() {
    const blob = new Blob([guide], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ONBOARDING.md";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="glass-panel rounded-2xl p-6 md:p-8 space-y-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-3 relative z-10">
          <div className="p-2 bg-rose-500/20 rounded-lg">
            <GraduationCap className="text-rose-400" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">Onboarding Generator</h2>
            <p className="text-sm text-slate-400">
              Create a "Day 1 Developer Guide" — architecture, setup, key files, and conventions.
            </p>
          </div>
        </div>

        {/* What gets generated */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 relative z-10">
          {[
            { label: "Architecture Overview", color: "rose" },
            { label: "Local Dev Setup", color: "orange" },
            { label: "Key Files Map", color: "rose" },
            { label: "Code Conventions", color: "orange" },
          ].map(({ label, color }) => (
            <div key={label} className={`text-[11px] px-2.5 py-2 rounded-lg bg-${color}-500/10 text-${color}-300 border border-${color}-500/20 font-medium text-center leading-tight`}>
              {label}
            </div>
          ))}
        </div>

        <div className="space-y-2 relative z-10">
          <label className="text-xs font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <FolderGit2 size={14} /> Repository Path
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              className="w-full glass-input rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500"
              value={repoPath}
              onChange={(e) => setRepoPath(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              placeholder="e.g. C:\projects\my-app or /home/user/project"
            />
          </div>
        </div>

        <div className="flex justify-end relative z-10">
          <button
            onClick={handleGenerate}
            disabled={loading || !repoPath.trim()}
            className="glass-button bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 rounded-xl px-6 py-2.5 flex items-center gap-2 font-medium group disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {loading ? (
              <><Loader2 className="animate-spin" size={18} /><span>Building Guide...</span></>
            ) : (
              <><GraduationCap size={18} className="group-hover:scale-110 transition-transform" /><span>Generate Onboarding Guide</span></>
            )}
          </button>
        </div>
      </div>

      {loading && !guide && (
        <div className="flex flex-col items-center justify-center py-16 text-slate-400 space-y-4">
          <Sparkles size={44} className="text-rose-400/50 animate-pulse" />
          <p className="text-sm">Analyzing codebase and writing your onboarding guide...</p>
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-rose-500/60 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        </div>
      )}

      {guide && (
        <div className="glass-panel rounded-2xl overflow-hidden animate-fade-in border-t-2 border-t-rose-500/60">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-rose-500/20 rounded-md">
                <Sparkles className="text-rose-400" size={16} />
              </div>
              <h3 className="font-bold text-white tracking-tight">Generated Onboarding Guide</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-all duration-200"
              >
                {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 hover:text-rose-200 border border-rose-500/30 transition-all duration-200"
              >
                <Download size={14} />
                Download .md
              </button>
            </div>
          </div>
          <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
            <pre className="whitespace-pre-wrap text-sm text-slate-300 font-mono leading-relaxed">{guide}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
