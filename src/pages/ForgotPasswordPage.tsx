import React from 'react';
import { Link } from 'react-router-dom';
import { InputField } from '../components/common/InputField';
import { Button } from '../components/common/Button';

export const ForgotPasswordPage: React.FC = () => {
  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Gửi email reset password...");
  };

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <main className="flex-grow-1 d-flex align-items-center justify-content-center p-4">
        <div className="w-100 position-relative" style={{ maxWidth: '440px' }}>
          
          {/* Decorative background elements (Hiệu ứng ánh sáng mờ phía sau) */}
          <div 
            className="position-absolute bg-primary rounded-circle" 
            style={{ top: '-3rem', left: '-3rem', width: '8rem', height: '8rem', filter: 'blur(3rem)', opacity: 0.2, zIndex: 0 }}
          ></div>
          <div 
            className="position-absolute bg-success rounded-circle" 
            style={{ bottom: '-3rem', right: '-3rem', width: '8rem', height: '8rem', filter: 'blur(3rem)', opacity: 0.2, zIndex: 0 }}
          ></div>

          {/* Form Card */}
          <div 
            className="card border border-light shadow-lg rounded-4 p-4 p-md-5 position-relative z-1" 
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(12px)' }}
          >
            {/* Icon Header */}
            <div className="text-center mb-4">
              <div className="bg-primary-subtle d-inline-flex align-items-center justify-content-center rounded-circle mb-3" style={{ width: '64px', height: '64px' }}>
                <i className="bi bi-unlock-fill fs-2 text-primary"></i>
              </div>
              <h2 className="fw-bolder text-dark mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>Forgot Password</h2>
              <p className="text-muted">Enter your email to reset your password</p>
            </div>

            {/* Form Section */}
            <form onSubmit={handleVerify}>
              <div className="mb-4">
                <InputField 
                  id="email" 
                  label="Email Address" 
                  type="email" 
                  icon="envelope"
                  placeholder="name@company.com" 
                  required 
                />
              </div>

              <div className="d-grid gap-3">
                <Button type="submit" className="py-3 d-flex align-items-center justify-content-center gap-2">
                  Verify
                  <i className="bi bi-arrow-right"></i>
                </Button>
                
                <div className="text-center mt-2">
                  <button type="button" className="btn btn-link text-muted fw-bold text-decoration-none p-0" style={{ fontSize: '14px' }}>
                    Didn't get a code? <span className="text-primary text-decoration-underline">Resend</span>
                  </button>
                </div>
              </div>
            </form>

            {/* Footer Links */}
            <div className="mt-5 pt-4 border-top text-center">
              <Link to="/login" className="text-primary fw-bold text-decoration-none d-inline-flex align-items-center gap-2">
                <i className="bi bi-arrow-left"></i>
                Back to Login
              </Link>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-4 d-flex justify-content-center gap-4 opacity-50">
            <div className="d-flex align-items-center gap-2 text-muted">
              <i className="bi bi-shield-check"></i>
              <span className="fw-bold text-uppercase" style={{ fontSize: '11px', letterSpacing: '1px' }}>HIPAA Compliant</span>
            </div>
            <div className="d-flex align-items-center gap-2 text-muted">
              <i className="bi bi-lock-fill"></i>
              <span className="fw-bold text-uppercase" style={{ fontSize: '11px', letterSpacing: '1px' }}>256-bit SSL</span>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};