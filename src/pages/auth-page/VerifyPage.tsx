import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { InputField } from '../../components/common/InputField';
import { Button } from '../../components/common/Button';
import { authService } from '../../services/authService';

type VerifyLocationState = {
  email?: string;
};

export const VerifyOtpPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as VerifyLocationState | null)?.email || 'your email';
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedOtp = otp.trim();

    if (normalizedOtp.length < 4) {
      setError('Vui lòng nhập mã OTP hợp lệ.');
      return;
    }

    setError('');
    setIsLoading(true);

    authService
      .verifyOtp({ email, otp: normalizedOtp })
      .then(() => {
        navigate('/reset-password', { state: { email } });
      })
      .catch((err: any) => {
        console.error(err);
        setError((err && err.message) || 'Mã OTP không đúng hoặc đã hết hạn.');
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <main className="flex-grow-1 d-flex align-items-center justify-content-center p-4">
        <div className="w-100 position-relative" style={{ maxWidth: '440px' }}>
          
          <div className="card border border-light shadow-lg rounded-4 p-4 p-md-5 position-relative z-1" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(12px)' }}>
            <div className="text-center mb-4">
              <div className="bg-primary-subtle d-inline-flex align-items-center justify-content-center rounded-circle mb-3" style={{ width: '64px', height: '64px' }}>
                <i className="bi bi-shield-lock-fill fs-2 text-primary"></i>
              </div>
              <h2 className="fw-bolder text-dark mb-2 font-manrope">Enter OTP</h2>
              <p className="text-muted small">We've sent a verification code to<br/><strong className="text-dark">{email}</strong></p>
            </div>

            <form onSubmit={handleVerifyOtp}>
              <div className="mb-4 text-center">
                <InputField 
                  id="otp" 
                  label="" 
                  type="text" 
                  placeholder="Enter 6-digit code"
                  className="text-center fs-5 tracking-widest"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.trim())}
                  required 
                />
              </div>

              {error && <div className="alert alert-danger">{error}</div>}

              <div className="d-grid gap-3">
                <Button type="submit" className="py-3 d-flex align-items-center justify-content-center gap-2" disabled={isLoading}>
                  {isLoading ? 'Verifying...' : (
                    <>
                      Continue <i className="bi bi-check2-circle"></i>
                    </>
                  )}
                </Button>

                <div className="text-center mt-2">
                  <button type="button" className="btn btn-link text-muted fw-bold text-decoration-none p-0" style={{ fontSize: '14px' }}>
                    Didn't get a code? <span className="text-primary text-decoration-underline">Resend</span>
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-5 pt-4 border-top text-center">
              <Link to="/login" className="text-primary fw-bold text-decoration-none d-inline-flex align-items-center gap-2">
                <i className="bi bi-arrow-left"></i> Back to Login
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};