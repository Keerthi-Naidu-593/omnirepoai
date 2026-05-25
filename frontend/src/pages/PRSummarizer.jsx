import React, { useState } from "react";
import { GitPullRequest, Search, Loader2, Sparkles, FileDiff, Zap } from "lucide-react";

const API_BASE = "http://localhost:4000/api";

export default function PRSummarizer() {
  const [diffText, setDiffText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSummarize() {
    if (!diffText.trim()) return;
    setLoading(true);
    setSummary("");
    try {
      const res = await fetch(`${API_BASE}/summarize-pr`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ diffText })
      });
      const data = await res.json();
      setSummary(data.summary);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="glass-panel rounded-2xl p-6 md:p-8 space-y-6 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"></div>
         <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl"></div>

        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="p-2 bg-teal-500/20 rounded-lg">
            <GitPullRequest className="text-teal-400" size={24} />
          </div>
          <div>
             <h2 className="text-xl font-bold tracking-tight text-white">Pull Request Summarizer</h2>
             <p className="text-sm text-slate-400">Paste your git diff or PR changes to generate a human-readable summary.</p>
          </div>
        </div>

        <div className="space-y-4 relative z-10">
           <div className="space-y-2">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
               <FileDiff size={14} /> Git Diff or Code Changes
            </label>
            <div className="relative">
              <textarea
                className="w-full glass-input rounded-xl px-4 py-4 text-sm text-white placeholder-slate-500 h-64 font-mono custom-scrollbar resize-none"
                value={diffText}
                onChange={(e) => setDiffText(e.target.value)}
                placeholder="diff --git a/src/App.jsx b/src/App.jsx..."
                spellCheck="false"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleSummarize}
              className="glass-button bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 rounded-xl px-6 py-2.5 flex items-center gap-2 font-medium group disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || !diffText.trim()}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  <span>Summarizing...</span>
                </>
              ) : (
                <>
                   <Zap size={18} className="group-hover:text-yellow-300 transition-colors" />
                  <span>Summarize PR</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {loading && !summary && (
         <div className="flex flex-col items-center justify-center py-12 text-slate-400 space-y-4 animate-pulse-slow">
            <Sparkles size={40} className="text-teal-400/50" />
            <p className="text-sm">Analyzing code changes and extracting insights...</p>
         </div>
      )}

      {summary && (
        <div className="glass-panel rounded-2xl p-6 md:p-8 animate-fade-in border-l-4 border-l-teal-500">
           <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/5">
             <div className="p-1.5 bg-teal-500/20 rounded-md">
               <Sparkles className="text-teal-400" size={18} />
             </div>
             <h3 className="font-bold text-white text-lg tracking-tight">AI Summary</h3>
           </div>
          
           <div className="bg-slate-950/60 rounded-xl border border-white/5 p-5">
              <div className="prose prose-invert prose-sm max-w-none">
                 <pre className="whitespace-pre-wrap text-sm text-slate-300 font-sans leading-relaxed bg-transparent border-0 p-0 m-0">{summary}</pre>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
