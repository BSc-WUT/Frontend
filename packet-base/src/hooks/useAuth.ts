import { useContext } from "react";
import useCookie from "./useCookie";
import { AuthContext } from "@/providers/AuthProvider/AuthProvider";

export const useAuth = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const { setCookie, removeCookie } = useCookie();

  const authorize = () => {
    if (setAuth) {
      setAuth(true);
      setCookie("auth", JSON.stringify(true));
    }
  };

  const unAuthorize = () => {
    if (setAuth) {
      setAuth(false);
      removeCookie("auth");
    }
  };

  return { auth, authorize, unAuthorize };
};
