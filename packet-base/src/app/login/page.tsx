import LoginForm from "@/components/LoginForm/LoginForm";
import PacketBaseLogo from "../../../public/PacketBase_white_logo.png";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="h-full grid grid-cols-2 place-items-center divide-solid divide-x-2 divide-blue-700/50">
      <Image
        src={PacketBaseLogo}
        alt="PacketBase Logo"
        width={400}
        height={200}
        priority
        className="grow m-4 cursor-pointer"
      />
      <LoginForm />
    </div>
  );
}
