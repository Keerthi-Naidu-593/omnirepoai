import React, { useContext } from "react";
import { UserCircle2, Mail, ShieldCheck, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext.jsx";

export default function Profile() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const user = auth?.user;

  if (!user) {
    return (
      <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-slate-950/80 p-10 shadow-2xl shadow-slate-950/40 backdrop-blur-xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">Not signed in</p>
          <h1 className="mt-6 text-3xl font-bold text-white">Profile unavailable</h1>
          <p className="mt-4 text-slate-400">Please sign in again to see your profile details.</p>
          <button onClick={() => navigate("/login")} className="mt-8 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition hover:-translate-y-0.5">Sign In</button>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-4xl surface-panel p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-3 rounded-3xl border border-slate-800/80 bg-slate-900/90 px-4 py-3 text-slate-200 shadow-sm">
              <UserCircle2 size={20} className="text-sky-400" />
              <span className="text-sm font-medium">Profile</span>
            </div>
            <h1 className="mt-8 text-4xl font-bold text-white">Hello, {user.name}</h1>
            <p className="mt-4 max-w-xl text-slate-400 leading-8">Your profile page contains your account details and quick links for your OmniRepo AI workspace.</p>
          </div>
          <button onClick={() => { auth.logout(); navigate("/"); }} className="inline-flex items-center gap-2 rounded-full bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
            Sign Out
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/30">
            <h2 className="text-lg font-semibold text-white">Account details</h2>
            <div className="mt-6 space-y-4 text-slate-300">
              <div className="flex items-center gap-3 rounded-3xl bg-slate-900/90 p-4">
                <UserCircle2 size={20} className="text-sky-400" />
                <div>
                  <p className="text-sm text-slate-500">Display name</p>
                  <p className="font-medium text-white">{user.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-3xl bg-slate-900/90 p-4">
                <Mail size={20} className="text-sky-400" />
                <div>
                  <p className="text-sm text-slate-500">Email address</p>
                  <p className="font-medium text-white">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-3xl bg-slate-900/90 p-4">
                <ShieldCheck size={20} className="text-sky-400" />
                <div>
                  <p className="text-sm text-slate-500">Storage</p>
                  <p className="font-medium text-white">Local demo storage</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/30">
            <h2 className="text-lg font-semibold text-white">Settings</h2>
            <p className="mt-4 text-slate-400 leading-7">This demo uses browser localStorage to keep your account while you use the app. You can sign out anytime and your existing demo account will still remain on this device.</p>
            <div className="mt-6 space-y-4">
              <div className="rounded-3xl bg-slate-900/90 p-4 border border-white/10">
                <div>
                  <p className="text-sm text-slate-500">Theme</p>
                  <p className="mt-2 font-medium text-white">Dark mode</p>
                </div>
              </div>
              <div className="rounded-3xl bg-slate-900/90 p-4 border border-white/10">
                <p className="text-sm text-slate-500">Security</p>
                <p className="mt-2 font-medium text-white">Email/password demo auth</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
