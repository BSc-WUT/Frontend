"use client";
import useCookie from "@/hooks/useCookie";
import React, { createContext, useEffect, useState } from "react";

interface AuthContextType {
  auth: boolean | undefined;
  setAuth: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

export const AuthContext = createContext<AuthContextType>({
  auth: undefined,
  setAuth: () => {},
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
      if (!!isAuth) {
        setAuth(true);
      }
    }
  }, [isAuth, auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
