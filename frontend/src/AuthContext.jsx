import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

function buildNameFromEmail(email) {
  if (!email) return "User";
  const local = email.split("@")[0];
  const parts = local.split(/[._-]/).filter(Boolean);
  if (!parts.length) return local;
  return parts.map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("currentUser");
      if (saved) setUser(JSON.parse(saved));
    } catch (e) {
      console.error("Auth load error", e);
    }
  }, []);

  function signup(email, password) {
    const normalizedEmail = email.trim().toLowerCase();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u) => u.email === normalizedEmail)) {
      throw new Error("An account with that email already exists.");
    }
    const newUser = { email: normalizedEmail, password, name: buildNameFromEmail(normalizedEmail) };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  }

  function login(email, password) {
    const normalizedEmail = email.trim().toLowerCase();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find((u) => u.email === normalizedEmail && u.password === password);
    if (!found) throw new Error("Invalid email or password.");
    if (!found.name) {
      found.name = buildNameFromEmail(found.email);
    }
    localStorage.setItem("currentUser", JSON.stringify(found));
    setUser(found);
    return found;
  }

  function logout() {
    localStorage.removeItem("currentUser");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}
