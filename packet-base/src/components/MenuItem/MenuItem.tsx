// MenuItem.tsx
import React, { SVGProps } from "react";

interface MenuItemProps {
  Icon: React.FC<SVGProps<SVGElement>>;
  text: string;
  className?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ Icon, text, className }) => {
  return (
    <div
      className={`${className} grow flex pl-4 mr-4 pr-10 py-3 items-center space-x-4 rounded cursor-pointer transition-all hover:bg-blue-700/50 hover:text-white`}
    >
      <Icon viewBox="0 0 24 24" height={24} />
      <p className="font-medium">{text}</p>
    </div>
  );
};

export default MenuItem;
