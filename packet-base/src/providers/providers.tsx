import { cookies } from "next/headers";
import ClientCookiesProvider from "./CookiesProvider/CookiesProvider";
import React from "react";
import AuthProvider from "./AuthProvider/AuthProvider";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ClientCookiesProvider value={cookies().getAll()}>
      <AuthProvider>{children}</AuthProvider>
    </ClientCookiesProvider>
  );
};

export default Providers;
