import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { InputField } from '../../components/common/InputField';
import { Button } from '../../components/common/Button';
import { authService } from '../../services/authService';

export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

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

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <main className="flex-grow-1 d-flex align-items-center justify-content-center p-4">
        <div className="w-100 position-relative" style={{ maxWidth: '440px' }}>
          
          <div className="position-absolute bg-primary rounded-circle" style={{ top: '-3rem', left: '-3rem', width: '8rem', height: '8rem', filter: 'blur(3rem)', opacity: 0.2, zIndex: 0 }}></div>
          <div className="position-absolute bg-success rounded-circle" style={{ bottom: '-3rem', right: '-3rem', width: '8rem', height: '8rem', filter: 'blur(3rem)', opacity: 0.2, zIndex: 0 }}></div>

          <div className="card border border-light shadow-lg rounded-4 p-4 p-md-5 position-relative z-1" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(12px)' }}>
            <div className="text-center mb-4">
              <div className="bg-primary-subtle d-inline-flex align-items-center justify-content-center rounded-circle mb-3" style={{ width: '64px', height: '64px' }}>
                <i className="bi bi-unlock-fill fs-2 text-primary"></i>
              </div>
              <h2 className="fw-bolder text-dark mb-2 font-manrope">Forgot Password</h2>
              <p className="text-muted">Enter your email to receive an OTP code</p>
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

              {error && <div className="alert alert-danger">{error}</div>}

              <div className="d-grid gap-3">
                <Button type="submit" className="py-3 d-flex align-items-center justify-content-center gap-2" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send OTP Code <i className="bi bi-arrow-right"></i>
                    </>
                  )}
                </Button>
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