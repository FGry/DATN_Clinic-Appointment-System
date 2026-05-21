import React from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../services/authService';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const session = authService.getSession();

  // Nếu chưa đăng nhập, redirect về login
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // Nếu role không khớp, redirect về home
  if (session.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
