import React, { useState } from "react";
import CloseIcon from "../../../public/close.svg";

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="relative z-20 bg-white text-black p-4 rounded-md shadow-md">
            <div className="flex justify-end">
              <button
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={onClose}
              >
                <CloseIcon viewBox="0 0 24 24" height={24} />
              </button>
            </div>
            <div className="mt-4">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
