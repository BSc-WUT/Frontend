"use client";
import { useAuth } from "@/hooks/useAuth";
import VerticalMenu from "../VerticalMenu/VertircalMenu";
import LoginForm from "../LoginForm/LoginForm";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useCookie from "@/hooks/useCookie";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { auth } = useAuth();
  const router = useRouter();
  const { getCookie } = useCookie();

  useEffect(() => {
    const isAuth = getCookie("auth");
    if (!auth && !isAuth) {
      router.push("/login");
    }
  }, [auth]);

  console.log(`Layout component ${auth}`);

  return (
    <div className="flex h-full">
      {auth && <VerticalMenu />}
      <div className="relative overflow-auto flex-1 w-64">{children}</div>
    </div>
  );
};

export default Layout;
