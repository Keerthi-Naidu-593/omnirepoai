import React, { useState } from "react";
import { FolderGit2, Search, FileText, Rocket, Loader2, Code, Package } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function Dashboard() {
  const [repoPath, setRepoPath] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [docs, setDocs] = useState("");
  const [deployInfo, setDeployInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeAction, setActiveAction] = useState(null);

  async function handleAction(actionType, apiEndpoint, stateSetter) {
    setLoading(true);
    setActiveAction(actionType);
    if (actionType === 'analyze') { setDocs(""); setDeployInfo(null); }
    try {
      const res = await fetch(`${API_BASE}/${apiEndpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoPath })
      });
      const data = await res.json();
      stateSetter(actionType === 'docs' ? data.docs : data);
    } finally {
      setLoading(false);
      setActiveAction(null);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-5 space-y-6">
        <div className="glass-panel rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-sky-500/20 rounded-lg">
              <FolderGit2 className="text-sky-400" size={24} />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white">Repository Analysis</h2>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Repository Path or GitHub URL</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                className="w-full glass-input rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500"
                value={repoPath}
                onChange={(e) => setRepoPath(e.target.value)}
                placeholder="Enter local path or GitHub URL (e.g., https://github.com/user/repo or /home/user/my-app)"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <button
              onClick={() => handleAction('analyze', 'analyze-repo', setAnalysis)}
              className="glass-button rounded-xl py-2.5 px-3 flex flex-col items-center justify-center gap-1.5 group"
              disabled={loading}
            >
              {loading && activeAction === 'analyze' ? <Loader2 className="animate-spin" size={18} /> : <Code size={18} className="group-hover:scale-110 transition-transform" />}
              <span className="text-xs font-medium">Analyze</span>
            </button>
            <button
              onClick={() => handleAction('docs', 'generate-docs', setDocs)}
              className="glass-button rounded-xl py-2.5 px-3 flex flex-col items-center justify-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 group"
              disabled={loading}
            >
               {loading && activeAction === 'docs' ? <Loader2 className="animate-spin" size={18} /> : <FileText size={18} className="group-hover:scale-110 transition-transform" />}
              <span className="text-xs font-medium">Generate Docs</span>
            </button>
            <button
              onClick={() => handleAction('deploy', 'deployment-changes', setDeployInfo)}
              className="glass-button rounded-xl py-2.5 px-3 flex flex-col items-center justify-center gap-1.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 group"
              disabled={loading}
            >
               {loading && activeAction === 'deploy' ? <Loader2 className="animate-spin" size={18} /> : <Rocket size={18} className="group-hover:scale-110 transition-transform" />}
              <span className="text-xs font-medium">Deployment</span>
            </button>
          </div>
        </div>

        {analysis && (
          <div className="glass-panel rounded-2xl p-6 space-y-4 animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-3xl"></div>
            <h3 className="font-semibold text-white flex items-center gap-2 text-lg">
              <Package className="text-sky-400" size={20} />
              Repo Summary
            </h3>
            <div className="space-y-3 relative z-10">
              <div className="flex flex-col">
                <span className="text-xs text-slate-400 uppercase tracking-wider mb-1">Path</span>
                <span className="text-sm font-medium text-slate-200 bg-slate-950/50 p-2 rounded-lg border border-white/5 break-all">{analysis.repoPath}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="flex flex-col">
                  <span className="text-xs text-slate-400 uppercase tracking-wider mb-1">Files</span>
                  <span className="text-lg font-bold text-white">{analysis.totalFiles}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 uppercase tracking-wider mb-1">Technologies</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {analysis.techs?.map(tech => (
                      <span key={tech} className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {deployInfo && (
          <div className="glass-panel rounded-2xl p-6 space-y-3 animate-fade-in border-l-4 border-l-purple-500">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Rocket className="text-purple-400" size={18} />
              Deployment / Config Overview
            </h3>
            <div className="bg-slate-950/50 p-4 rounded-xl border border-white/5 max-h-64 overflow-y-auto custom-scrollbar">
               <p className="whitespace-pre-wrap text-slate-300 text-sm leading-relaxed">{deployInfo.explanation}</p>
            </div>
          </div>
        )}
      </div>

      <div className="lg:col-span-7 h-full">
        <div className="glass-panel rounded-2xl p-6 h-full flex flex-col min-h-[500px]">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <FileText className="text-emerald-400" size={20} />
            </div>
            <h3 className="font-bold text-white text-lg tracking-tight">Generated Documentation</h3>
          </div>
          
          <div className="flex-1 bg-slate-950/60 rounded-xl border border-white/5 p-4 overflow-y-auto relative custom-scrollbar">
            {docs ? (
              <div className="prose prose-invert prose-sm max-w-none">
                 <pre className="whitespace-pre-wrap text-sm text-slate-300 font-mono leading-relaxed bg-transparent border-0 p-0 m-0">{docs}</pre>
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 space-y-3">
                <FileText size={48} className="opacity-20" />
                <p className="text-sm font-medium">Click "Generate Docs" to see AI-generated README.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
