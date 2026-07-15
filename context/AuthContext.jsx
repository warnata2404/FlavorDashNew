import { createContext, useContext, useEffect, useState } from "react";

import {
  getToken,
  isAuthenticated,
  login,
  logout,
} from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initializeAuth() {
      try {
        const status = await isAuthenticated();
        setAuthenticated(status);
      } catch {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    initializeAuth();
  }, []);

  async function signIn(username, password) {
    await login(username, password);

    setAuthenticated(true);
  }

  async function signOut() {
    await logout();

    setAuthenticated(false);
  }

  async function refresh() {
    const status = await isAuthenticated();

    setAuthenticated(status);
  }

  async function token() {
    return getToken();
  }

  const value = {
    authenticated,
    loading,
    signIn,
    signOut,
    token,
    refresh,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}
