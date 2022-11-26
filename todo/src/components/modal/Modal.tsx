import React, { FC, ReactNode } from 'react';
import './style.scss';
interface ModalProps {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

export const Modal: FC<ModalProps> = ({ children, isOpen, toggle }) => {
  return (
    <>
      {isOpen && (
        <div className="modal-overlay" onClick={toggle}>
          <div onClick={(e) => e.stopPropagation()} className="modal-box">
            {children}
          </div>
        </div>
      )}
    </>
  );
};
