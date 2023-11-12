import React from "react";

interface ToggleCheckButtonProps {
  isChecked: boolean;
  onChange: () => void;
}

const ToggleCheckButton: React.FC<ToggleCheckButtonProps> = ({
  isChecked,
  onChange,
}) => {
  return (
    <input
      type="checkbox"
      checked={isChecked}
      onChange={onChange}
      className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
    />
  );
};

export default ToggleCheckButton;
