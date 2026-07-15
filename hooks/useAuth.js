import { useCallback, useEffect, useState } from "react";

import {
  getToken,
  isAuthenticated,
  login,
  logout,
} from "../services/authService";

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuthentication = useCallback(async () => {
    const status = await isAuthenticated();

    setAuthenticated(status);
    setLoading(false);
  }, []);

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  async function signIn(username, password) {
    await login(username, password);

    setAuthenticated(true);
  }

  async function signOut() {
    await logout();

    setAuthenticated(false);
  }

  async function token() {
    return getToken();
  }

  return {
    authenticated,
    loading,
    signIn,
    signOut,
    token,
    refresh: checkAuthentication,
  };
}
