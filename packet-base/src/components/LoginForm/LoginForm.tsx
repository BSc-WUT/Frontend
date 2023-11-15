"use client";

import { FormEvent, useRef } from "react";
import Button from "../Button/Button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = ({}) => {
  const { authorize, auth } = useAuth();
  const router = useRouter();
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent<HTMLButtonElement>) => {
    event?.preventDefault();
    if (
      usernameInputRef.current?.value == process.env.NEXT_PUBLIC_USERNAME &&
      passwordInputRef.current?.value == process.env.NEXT_PUBLIC_PASSWORD
    ) {
      authorize();
      router.push("/");
    }
  };

  const inputClassName =
    "bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-0 focus:border-2 focus:border-blue-700 content-center";

  return (
    <form className="flex flex-col justify-center space-y-4 h-full w-full px-60">
      <div className="flex flex-col space-y-4 h-max ">
        <input
          id="username-input"
          type="text"
          ref={usernameInputRef}
          className={inputClassName}
          placeholder="Username..."
        />
        <input
          id="password-input"
          type="password"
          ref={passwordInputRef}
          className={inputClassName}
          placeholder="Password..."
        />
      </div>
      <Button
        title="Login"
        type="submit"
        hoverStyle="hover_blue"
        onClick={(event: FormEvent<HTMLButtonElement>) => handleSubmit(event)}
      />
    </form>
  );
};

export default LoginForm;
