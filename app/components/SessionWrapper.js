"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const SessionContext = createContext();

export function SessionWrapper({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const data = await getSession();
      setSession(data);
      setLoading(false);
    };
    fetchSession();
  }, []);

  const login = async (email, password) => {
    const result = await signIn("credentials", { redirect: false, email, password });
    if (!result.error) {
      const newSession = await getSession(); //  Refresh session after login
      setSession(newSession);
    }
    return result;
  };

  const logout = async () => {
    await signOut({ redirect: false });
    setSession(null);
    router.push("/login"); //  Ensure logout redirects properly
  };

  return (
    <SessionContext.Provider value={{ session, login, logout, loading }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSessionContext() {
  return useContext(SessionContext);
}
