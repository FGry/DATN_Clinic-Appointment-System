import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'text';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  let variantClass = 'btn-primary';
  if (variant === 'outline') variantClass = 'btn-outline-primary';
  if (variant === 'text') variantClass = 'btn-link text-decoration-none text-secondary';

  const widthClass = fullWidth ? 'w-100 py-2' : '';

  return (
    <button 
      className={`btn ${variantClass} ${widthClass} fw-medium ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};