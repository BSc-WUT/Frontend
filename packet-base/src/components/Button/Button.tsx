import React from "react";

interface ButtonProps {
  title: string;
  isClicked?: boolean;
  onClick?: React.MouseEventHandler;
  type: "button" | "reset" | "submit" | undefined;
  hoverStyle: "hover_blue" | "hover_white";
}

const Button: React.FC<ButtonProps> = ({
  title,
  isClicked,
  onClick,
  type,
  hoverStyle,
}) => {
  const className: string = isClicked ? "text-blue-700 outline-blue-700" : "";
  const hoverStyles = {
    hover_blue:
      "hover:bg-blue-700/50 hover:text-white hover:outline-blue-700/50 outline outline-blue-700/50",
    hover_white:
      "bg-white text-black hover:bg-white/50 hover:text-white hover:outline-blue-700/50",
  };
  const hoverClassName: string = hoverStyles[hoverStyle];
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} ${hoverClassName} rounded-md cursor-pointer transition-all px-4 py-2 `}
    >
      {title}
    </button>
  );
};

export default Button;
