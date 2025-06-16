import React from 'react';
import './Button.css';

interface ButtonProps {
  color?: 'primary' | 'secondary';
  variant?: 'raised' | 'outlined';
  href?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const ButtonComponent: React.FC<ButtonProps> = ({
  color = 'primary',
  variant = 'raised',
  href,
  disabled = false,
  onClick,
  children,
  className = ''
}) => {
  const buttonClasses = `mui-btn ${color} ${variant} ${disabled ? 'disabled' : ''} ${className}`;

  if (href) {
    return (
      <a 
        href={href} 
        className={buttonClasses}
      >
        {children}
      </a>
    );
  }

  return (
    <button 
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;