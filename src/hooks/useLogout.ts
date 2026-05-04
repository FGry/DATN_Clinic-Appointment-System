import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

export const useLogout = () => {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = async () => {
    if (isLoggingOut) {
      return;
    }

    setIsLoggingOut(true);

    try {
      await authService.logout();
    } catch (err) {
      console.error('Logout failed', err);
    } finally {
      authService.clearSession();
      setIsLoggingOut(false);
      navigate('/login', { replace: true });
    }
  };

  return { logout, isLoggingOut };
};
