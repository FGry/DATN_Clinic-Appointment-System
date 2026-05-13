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
  // Thay đổi class mặc định thành btn-st-secondary
  let variantClass = 'btn-st-secondary';
  if (variant === 'outline') variantClass = 'btn-outline-secondary text-st-secondary';
  if (variant === 'text') variantClass = 'btn-link text-decoration-none text-st-secondary';

  const widthClass = fullWidth ? 'w-100 py-2' : '';

  return (
    <button 
      className={`btn ${variantClass} ${widthClass} fw-semibold d-flex align-items-center justify-content-center gap-2 ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};