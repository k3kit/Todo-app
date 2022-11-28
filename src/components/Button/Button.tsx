import React, { FC, ReactNode } from 'react';
import './style.scss';
interface ButtonProps {
  children?: ReactNode;
  type: 'submit' | 'button';
  onClick?: () => void;
}
export const Button: FC<ButtonProps> = ({ type, onClick, children }) => {
  return (
    <button className="button" type={type} onClick={onClick}>
      {children}
    </button>
  );
};
