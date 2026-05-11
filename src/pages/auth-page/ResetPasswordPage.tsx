import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { InputField } from '../../components/common/InputField';
import { Button } from '../../components/common/Button';
import { authService } from '../../services/authService';

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as any)?.email || '';
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) { setError("Passwords do not match."); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setError('');
    setIsLoading(true);
    authService.resetPassword({ email, newPassword: password })
      .then(() => { alert("Success!"); navigate('/login'); })
      .catch((err) => setError(err?.message || 'Failed.'))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-4" style={{ backgroundColor: '#f2f3fc' }}>
      <main className="w-100" style={{ maxWidth: '440px' }}>
        <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5 bg-white">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-st-primary" style={{ color: '#001835' }}>Reset Password</h2>
            <p className="text-muted small">Enter your new secure password</p>
          </div>

          <form onSubmit={handleResetPassword}>
            <InputField 
              id="new_password" 
              label="New Password" 
              type="password" 
              icon="lock"
              placeholder="Minimum 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="mt-3">
              <InputField 
                id="confirm_password" 
                label="Confirm New Password" 
                type="password" 
                icon="shield-check"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={error}
                required
              />
            </div>

            <Button type="submit" fullWidth className="btn-st-primary mt-4 py-3 fw-bold shadow-sm" disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update Password'}
            </Button>
          </form>

          <div className="mt-5 text-center pt-4 border-top">
            <Link to="/login" className="text-st-primary fw-bold text-decoration-none small d-inline-flex align-items-center gap-2">
              <i className="bi bi-arrow-left"></i> Back to Login
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};