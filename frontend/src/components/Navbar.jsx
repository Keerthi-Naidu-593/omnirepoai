import React, { useState, useEffect, useContext } from "react";
import { Code2, Menu, X, UserCircle2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthContext.jsx";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useContext(AuthContext);
  const user = auth?.user;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
  ];

  const isActive = (path) => location.pathname === path;
  const displayName = user?.name || (user?.email ? user.email.split("@")[0] : "Guest");

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-slate-900/90 backdrop-blur-xl border-b border-white/10 shadow-2xl" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => navigate("/")} className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-sky-500/30 group-hover:scale-105 transition-all duration-300">
              <Code2 size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">OmniRepo AI</span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button key={link.path} onClick={() => navigate(link.path)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(link.path) ? "text-sky-400 bg-sky-500/10 border border-sky-500/20" : "text-slate-400 hover:text-white hover:bg-white/5"}`}>
                {link.label}
              </button>
            ))}
            {user && (
              <button onClick={() => navigate("/profile")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive("/profile") ? "text-sky-400 bg-sky-500/10 border border-sky-500/20" : "text-slate-400 hover:text-white hover:bg-white/5"}`}>
                Profile
              </button>
            )}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <div className="rounded-full bg-slate-800/90 px-4 py-2 text-sm font-medium text-white border border-white/10 flex items-center gap-2">
                  <UserCircle2 size={16} className="text-sky-400" />
                  <span>{displayName}</span>
                </div>
                <button onClick={() => { auth.logout(); navigate('/'); }} className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white border border-white/10 rounded-lg hover:bg-white/5 transition-all duration-200">Sign Out</button>
              </>
            ) : (
              <>
                <button onClick={() => navigate("/login")} className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white border border-white/10 rounded-lg hover:bg-white/5 transition-all duration-200">Sign In</button>
                <button onClick={() => navigate("/signup")} className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-indigo-600 rounded-lg shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-105 transition-all duration-200">Get Started</button>
              </>
            )}
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-b border-white/10 px-4 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <button key={link.path} onClick={() => { navigate(link.path); setMenuOpen(false); }}
              className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive(link.path) ? "text-sky-400 bg-sky-500/10" : "text-slate-300 hover:text-white hover:bg-white/5"}`}>
              {link.label}
            </button>
          ))}
          {user && (
            <button onClick={() => { navigate("/profile"); setMenuOpen(false); }} className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive("/profile") ? "text-sky-400 bg-sky-500/10" : "text-slate-300 hover:text-white hover:bg-white/5"}`}>
              Profile
            </button>
          )}
          <div className="border-t border-white/10 pt-3 mt-1 flex flex-col gap-2">
            {user ? (
              <>
                <div className="px-4 py-2.5 text-left text-sm text-slate-200 border border-white/10 rounded-lg">{displayName}</div>
                <button onClick={() => { auth.logout(); setMenuOpen(false); navigate('/'); }} className="px-4 py-2.5 text-sm text-slate-300 border border-white/10 rounded-lg hover:bg-white/5 transition-all">Sign Out</button>
              </>
            ) : (
              <>
                <button onClick={() => { navigate("/login"); setMenuOpen(false); }} className="px-4 py-2.5 text-sm text-slate-300 border border-white/10 rounded-lg hover:bg-white/5 transition-all">Sign In</button>
                <button onClick={() => { navigate("/signup"); setMenuOpen(false); }} className="px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-indigo-600 rounded-lg shadow-lg transition-all">Get Started Free</button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
