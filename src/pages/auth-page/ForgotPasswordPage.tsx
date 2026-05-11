import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { InputField } from '../../components/common/InputField';
import { Button } from '../../components/common/Button';
import { authService } from '../../services/authService';

export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    authService
      .forgotPassword(email)
      .then(() => {
        navigate('/verify-otp', { state: { email } });
      })
      .catch((err) => {
        console.error(err);
        setError(err?.message ?? 'Failed to send reset email');
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center p-4" style={{ backgroundColor: '#f2f3fc' }}>
      {/* Nút quay lại trang chủ phía trên card */}
      <div className="w-100 position-absolute top-0 start-0 p-4">
        <Link to="/" className="text-decoration-none fw-bold d-inline-flex align-items-center gap-2" style={{ color: '#001835' }}>
          <i className="bi bi-house-door-fill fs-5"></i>
          Back to Home
        </Link>
      </div>

      <main className="w-100" style={{ maxWidth: '440px' }}>
        <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5 bg-white">
          <div className="text-center mb-4">
            <h2 className="fw-bold mb-2" style={{ color: '#001835' }}>Forgot Password</h2>
            <p className="text-muted small">Enter your email to receive a secure OTP code</p>
          </div>

          <form onSubmit={handleVerify}>
            <div className="mb-4">
              <InputField 
                id="email" 
                label="Email Address" 
                type="email" 
                icon="envelope"
                placeholder="name@company.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>

            {error && <div className="alert alert-danger py-2 small fw-bold">{error}</div>}

            <div className="d-grid gap-3">
              <Button type="submit" className="btn-st-primary py-3 fw-bold d-flex align-items-center justify-content-center gap-2" disabled={isLoading}>
                {isLoading ? 'Sending...' : (
                  <>
                    Send OTP Code <i className="bi bi-arrow-right"></i>
                  </>
                )}
              </Button>
            </div>
          </form>

          <div className="mt-5 pt-4 border-top text-center">
            <Link to="/login" className="text-decoration-none fw-bold small d-inline-flex align-items-center gap-2" style={{ color: '#006a6a' }}>
              <i className="bi bi-arrow-left"></i> Back to Login
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};