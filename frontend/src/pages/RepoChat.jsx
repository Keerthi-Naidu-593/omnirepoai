import React, { useState } from "react";
import { MessageSquare, Send, Search, Loader2, Sparkles, Bot } from "lucide-react";

const API_BASE = "http://localhost:4000/api";

export default function RepoChat() {
  const [repoPath, setRepoPath] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAsk() {
    if (!question.trim() || !repoPath.trim()) return;
    setLoading(true);
    setAnswer("");
    try {
      const res = await fetch(`${API_BASE}/repo-chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoPath, question })
      });
      const data = await res.json();
      setAnswer(data.answer);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="glass-panel rounded-2xl p-6 md:p-8 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
        
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="p-2 bg-indigo-500/20 rounded-lg">
            <MessageSquare className="text-indigo-400" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">Chat with Repository</h2>
            <p className="text-sm text-slate-400">Ask questions about the codebase architecture, logic, or dependencies.</p>
          </div>
        </div>

        <div className="space-y-4 relative z-10">
          <div className="space-y-2">
             <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Repository Path</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                className="w-full glass-input rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500"
                value={repoPath}
                onChange={(e) => setRepoPath(e.target.value)}
                placeholder="Absolute path to your repo (e.g. C:\projects\my-app)"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Your Question</label>
            <div className="relative">
              <textarea
                className="w-full glass-input rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 h-28 resize-none"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder='e.g., "How does authentication work in this app?" or "Where are the database models defined?"'
              />
              <button
                onClick={handleAsk}
                className="absolute bottom-3 right-3 glass-button p-2.5 rounded-lg flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading || !question.trim() || !repoPath.trim()}
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {loading && !answer && (
         <div className="flex flex-col items-center justify-center py-12 text-slate-400 space-y-4 animate-pulse-slow">
            <Bot size={40} className="text-indigo-400/50" />
            <p className="text-sm">Analyzing repository and crafting response...</p>
         </div>
      )}

      {answer && (
        <div className="glass-panel rounded-2xl p-6 md:p-8 animate-fade-in border-t-4 border-t-indigo-500 relative">
           <div className="absolute top-4 right-4">
             <Sparkles className="text-indigo-400/30" size={24} />
           </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-1.5 bg-indigo-500/20 rounded-md">
              <Bot className="text-indigo-400" size={18} />
            </div>
            <h3 className="font-bold text-white text-lg tracking-tight">AI Assistant</h3>
          </div>
          <div className="bg-slate-950/60 rounded-xl border border-white/5 p-5 overflow-hidden">
             <pre className="whitespace-pre-wrap text-sm text-slate-300 font-mono leading-relaxed bg-transparent border-0 p-0 m-0 overflow-x-auto custom-scrollbar">{answer}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
