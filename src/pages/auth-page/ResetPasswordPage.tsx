import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { InputField } from '../../components/common/InputField';
import { Button } from '../../components/common/Button';
import { authService } from '../../services/authService';

type ResetLocationState = {
  email?: string;
};

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = (location.state as ResetLocationState | null) ?? {};
  const email = locationState.email ?? '';
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!email) {
    navigate('/forgot-password');
  }

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setError('');

    setIsLoading(true);

    authService
      .resetPassword({ email, newPassword: password })
      .then(() => {
        alert('Password updated successfully! Please login again.');
        navigate('/login');
      })
      .catch((err: any) => {
        console.error(err);
        setError((err && err.message) || 'Failed to reset password');
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 p-4 font-body-md" style={{ background: 'radial-gradient(circle at top right, #f2f3fc 0%, #f9f9ff 100%)' }}>
      <main className="w-100" style={{ maxWidth: '440px' }}>
        <div className="bg-white rounded-4 shadow-sm p-4 p-md-5 d-flex flex-column align-items-center border">
          
          {/* Brand Identity */}
          <div className="mb-4">
            <span className="text-primary font-manrope fw-bolder fs-3 tracking-tighter">HealthSync</span>
          </div>

          {/* Title and Subtext */}
          <div className="text-center mb-5">
            <h2 className="font-manrope fw-bold text-dark mb-2">Reset Password</h2>
            <p className="text-muted mb-0">Enter your new password below.</p>
          </div>

          {/* Reset Password Form */}
            <form className="w-100" onSubmit={handleResetPassword}>
            <InputField 
              id="new_password" 
              label="New Password" 
              type="password" 
              placeholder="Min. 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <div className="mt-4">
              <InputField 
                id="confirm_password" 
                label="Confirm New Password" 
                type="password" 
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={error} // Truyền error message xuống InputField
                required
              />
            </div>

            {error && <div className="alert alert-danger mt-3">{error}</div>}

            {/* Submit Button */}
            <div className="mt-4 pt-2">
              <Button type="submit" fullWidth className="py-3 shadow-sm d-flex align-items-center justify-content-center gap-2" disabled={isLoading}>
                {isLoading ? 'Updating...' : 'Update Password'}
              </Button>
            </div>
          </form>

          {/* Back to Login Navigation */}
          <div className="mt-5 text-center">
            <Link to="/login" className="d-inline-flex align-items-center gap-2 text-primary fw-bold text-decoration-none hover-underline">
              <i className="bi bi-arrow-left fs-5"></i> Back to Login
            </Link>
          </div>
        </div>

        {/* Security Assurance Footer */}
        <div className="mt-4 text-center">
          <p className="small text-muted d-flex items-center justify-content-center gap-2">
            <i className="bi bi-lock-fill"></i> Secure clinical-grade encryption
          </p>
        </div>
      </main>
    </div>
  );
};