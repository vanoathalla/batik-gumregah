"use client";

import { useState, useEffect, useCallback } from "react";

const TOKEN_KEY = "batik_admin_token";

export function useAdmin() {
  const [token, setToken] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const saved = sessionStorage.getItem(TOKEN_KEY);
    setToken(saved);
    setChecking(false);
  }, []);

  const login = async (password: string): Promise<boolean> => {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      sessionStorage.setItem(TOKEN_KEY, password);
      setToken(password);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  const apiFetch = useCallback(
    (url: string, options: RequestInit = {}) => {
      return fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": token ?? "",
          ...(options.headers ?? {}),
        },
      });
    },
    [token]
  );

  return { token, checking, isLoggedIn: !!token, login, logout, apiFetch };
}
