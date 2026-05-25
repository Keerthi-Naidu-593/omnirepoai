import React, { useState, useContext } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      setMessage("");
      return;
    }
    try {
      setError("");
      auth.login(email.trim(), password);
      setMessage("Signed in successfully. Redirecting...");
      navigate("/app");
    } catch (e) {
      setMessage("");
      setError(e.message || "Sign in failed.");
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-xl surface-panel p-8">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">Welcome back</p>
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Sign in to your account</h1>
          <p className="mt-3 text-slate-400">Use your email and password to access your repository AI workspace.</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-sm font-medium text-slate-300">Email</span>
            <div className="mt-3 flex items-center gap-3 rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 focus-within:border-sky-500/40 focus-within:ring-1 focus-within:ring-sky-500/30">
              <Mail size={18} className="text-sky-400" />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-500"
              />
            </div>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-300">Password</span>
            <div className="mt-3 flex items-center gap-3 rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 focus-within:border-sky-500/40 focus-within:ring-1 focus-within:ring-sky-500/30">
              <Lock size={18} className="text-sky-400" />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-500"
              />
            </div>
          </label>

          {error && <div className="rounded-3xl bg-rose-500/10 border border-rose-500/20 px-4 py-3 text-sm text-rose-200">{error}</div>}
          {message && <div className="rounded-3xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 text-sm text-emerald-200">{message}</div>}

          <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition hover:-translate-y-0.5">
            Sign In
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          Don&apos;t have an account? <Link to="/signup" className="font-semibold text-slate-100 hover:text-white">Create one</Link>.
        </div>
      </section>
    </main>
  );
}
