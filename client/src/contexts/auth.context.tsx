"use client";

import { createContext, useCallback, useEffect, useMemo, useState } from "react";

import axios from "@/config/axios";
import type { LoginFormData, RegisterFormData } from "@/types/auth";
import type { GetUserResponse, User } from "@/types/user";
import { asyncHandler } from "@/utils/async-handler";

import styles from "@/styles/pages/auth.module.scss";

interface AuthContext {
  user: User | null;
  login: (formData: LoginFormData) => Promise<boolean>;
  register: (formData: RegisterFormData) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const logout = useCallback(async () => {
    if (!user) {
      return;
    }

    try {
      await asyncHandler(async () => {
        setIsLoading(true);
        await axios.post("/auth/logout", { userId: user._id });
        setUser(null);
      }, true)();
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [user]);

  const fetchUser = useCallback(async () => {
    if (user) {
      return;
    }

    try {
      await asyncHandler(async () => {
        const { data } = await axios.get<GetUserResponse>("/users/user");
        setUser(data.user);
      }, true)();
    } catch {
      await logout();
    }
  }, [user, logout]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = useCallback(
    async (formData: LoginFormData) => {
      if (user) {
        return true;
      }

      try {
        return await asyncHandler(async () => {
          const { data } = await axios.post("/auth/login", formData);
          await fetchUser();
          return data.success as boolean;
        }, true)();
      } catch {
        return false;
      }
    },
    [user, fetchUser],
  );

  const register = useCallback(
    async (formData: RegisterFormData) => {
      if (user) {
        return true;
      }

      try {
        return await asyncHandler(async () => {
          const { data } = await axios.post("/auth/register", formData);
          await fetchUser();
          return data.success as boolean;
        }, true)();
      } catch {
        return false;
      }
    },
    [user, fetchUser],
  );

  const refreshToken = useCallback(async () => {
    if (!user) {
      return;
    }

    try {
      await asyncHandler(async () => {
        await axios.post("/auth/refresh-token");
      }, true)();
    } catch {
      await logout();
    }
  }, [user, logout]);

  useEffect(() => {
    refreshToken();
  }, [refreshToken]);

  useEffect(() => {
    const interval = setInterval(refreshToken, 10 * 60 * 1000); // 10 minutes
    return () => {
      clearInterval(interval);
    };
  }, [refreshToken]);

  const contextValue = useMemo(
    () => ({ user, login, register, logout }),
    [user, login, register, logout],
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {isLoading ? <div className={styles["logout_loader"]} /> : children}
    </AuthContext.Provider>
  );
}
