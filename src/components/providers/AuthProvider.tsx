"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

interface AuthContextValue {
  user: AuthUser | null;
  status: AuthStatus;
  isAuthenticated: boolean;
  refreshSession: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");

  const refreshSession = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      const json = await res.json();
      if (res.ok && json.success && json.data?.user) {
        setUser(json.data.user as AuthUser);
        setStatus("authenticated");
      } else {
        setUser(null);
        setStatus("unauthenticated");
      }
    } catch {
      setUser(null);
      setStatus("unauthenticated");
    }
  }, []);

  useEffect(() => {
    refreshSession();
  }, [refreshSession, pathname]);

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    setStatus("unauthenticated");
    router.push("/login");
    router.refresh();
  }, [router]);

  const value = useMemo(
    () => ({
      user,
      status,
      isAuthenticated: status === "authenticated",
      refreshSession,
      logout,
    }),
    [user, status, refreshSession, logout]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
