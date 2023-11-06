// VerticalMenu.tsx
"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import MenuItem from "./../MenuItem/MenuItem";
import PacketBaseLogo from "../../../public/PacketBase_white_logo.png";
import SettingsIcon from "../../../public/settings.svg";
import WiFiIcon from "../../../public/wifi.svg";
import AIIcon from "../../../public/microchip-ai.svg";

const VerticalMenu: React.FC = () => {
  const pathname = usePathname();
  const activeClassName = (path: string) => {
    return pathname == path
      ? "text-white bg-blue-700/50"
      : "text-white/50 bg-black";
  };
  return (
    <div className="flex-col mx-4 pt-8 space-y-10 h-full bg-black content-center border-r-4 border-blue-700/50">
      <Link href="/">
        <Image
          src={PacketBaseLogo}
          alt="PacketBase Logo"
          width={100}
          height={100}
          priority
          className="grow m-4 cursor-pointer"
        />
      </Link>
      <div className="flex-col items-stretch">
        <Link href="/flows">
          <MenuItem
            Icon={WiFiIcon}
            text="Flows"
            className={activeClassName("/flows")}
          />
        </Link>
        <Link href="/models">
          <MenuItem
            Icon={AIIcon}
            text="Models"
            className={activeClassName("/models")}
          />
        </Link>
        <Link href="/settings">
          <MenuItem
            Icon={SettingsIcon}
            text="Settings"
            className={activeClassName("/settings")}
          />
        </Link>
      </div>
    </div>
  );
};

export default VerticalMenu;
