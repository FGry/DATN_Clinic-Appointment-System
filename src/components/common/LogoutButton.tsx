import React from 'react';
import { useLogout } from '../../hooks/useLogout';

interface LogoutButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  labelClassName?: string;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ className = '', labelClassName, ...props }) => {
  const { logout, isLoggingOut } = useLogout();

  return (
    <button
      type="button"
      className={`btn btn-st-secondary btn-sm fw-semibold py-2 px-3 d-flex align-items-center justify-content-center gap-2 rounded-3 ${className}`}
      onClick={logout}
      disabled={isLoggingOut}
      {...props}
    >
      <i className="bi bi-box-arrow-right fs-6"></i>
      <span className={labelClassName}>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
    </button>
  );
};