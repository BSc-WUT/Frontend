"use client";
import useCookie from "@/hooks/useCookie";
import React, { createContext, useEffect, useState } from "react";

interface AuthContextType {
  auth: boolean | undefined;
  setAuth: undefined | ((auth: boolean | null) => void);
}

export const AuthContext = createContext<AuthContextType>({
  auth: undefined,
  setAuth: undefined,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<boolean | undefined>(false);
  const { getCookie } = useCookie();
  const isAuth = getCookie("auth");

  useEffect(() => {
    if (!auth) {
      console.log(`AuthProvider - isAuth value: ${isAuth}`);
      if (!!isAuth) {
        setAuth(true);
      }
    }
  }, [isAuth]);
  console.log(
    `outside useEffect From AuthProvider (auth was not found in cookies) ${auth}`
  );

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
