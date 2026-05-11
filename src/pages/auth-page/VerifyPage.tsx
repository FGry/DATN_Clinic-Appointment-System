import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { InputField } from '../../components/common/InputField';
import { Button } from '../../components/common/Button';
import { authService } from '../../services/authService';

export const VerifyOtpPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as any)?.email || 'your email';
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.trim().length < 4) {
      setError('Please enter a valid OTP.');
      return;
    }
    setError('');
    setIsLoading(true);
    authService.verifyOtp({ email, otp: otp.trim() })
      .then(() => navigate('/reset-password', { state: { email } }))
      .catch((err: any) => setError(err?.message || 'Invalid or expired OTP.'))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-4" style={{ backgroundColor: '#f2f3fc' }}>
      <main className="w-100" style={{ maxWidth: '440px' }}>
        <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5 bg-white">
          <div className="text-center mb-4">
            <div className="bg-light d-inline-flex p-3 rounded-circle mb-3">
              <span className="material-symbols-outlined fs-1 text-st-primary" style={{ color: '#001835' }}>verified_user</span>
            </div>
            <h2 className="fw-bold text-st-primary mb-2">Verify Your Email</h2>
            <p className="text-muted small">We've sent a 6-digit code to<br/><strong className="text-dark">{email}</strong></p>
          </div>

          <form onSubmit={handleVerifyOtp}>
            <div className="mb-4">
              <InputField 
                id="otp" 
                label="" 
                type="text" 
                placeholder="0 0 0 0 0 0"
                className="text-center fs-4 tracking-widest fw-bold"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required 
              />
            </div>

            {error && <div className="alert alert-danger py-2 small">{error}</div>}

            <Button type="submit" fullWidth className="btn-st-primary py-3 fw-bold" disabled={isLoading}>
              {isLoading ? 'Verifying...' : 'Verify & Continue'}
            </Button>

            <div className="text-center mt-3">
              <button type="button" className="btn btn-link text-decoration-none small fw-bold" style={{ color: '#006a6a' }}>
                Resend Code
              </button>
            </div>
          </form>
          
          <div className="mt-4 pt-4 border-top text-center">
            <Link to="/login" className="text-muted text-decoration-none small d-inline-flex align-items-center gap-2">
              <i className="bi bi-arrow-left"></i> Back to Login
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};