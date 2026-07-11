"use client";

import { useState, useEffect, useCallback } from "react";

const TOKEN_KEY = "batik_admin_token";

export function useAdmin() {
  const [token, setToken]     = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // only runs client-side
    const saved = sessionStorage.getItem(TOKEN_KEY);
    setToken(saved);
    setChecking(false);
  }, []);

  const login = async (password: string): Promise<boolean> => {
    try {
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
    } catch {
      // network error
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  const apiFetch = useCallback(
    (url: string, options: RequestInit = {}) => {
      const headers: Record<string, string> = {
        "x-admin-token": token ?? "",
      };
      // Only add Content-Type if not FormData
      if (!(options.body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
      }
      return fetch(url, {
        ...options,
        headers: {
          ...headers,
          ...(options.headers as Record<string, string> ?? {}),
        },
      });
    },
    [token]
  );

  return { token, checking, isLoggedIn: !!token, login, logout, apiFetch };
}
