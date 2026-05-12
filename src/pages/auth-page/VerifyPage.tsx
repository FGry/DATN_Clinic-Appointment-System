import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { InputField } from '../../components/common/InputField';
import { Button } from '../../components/common/Button';
import { authService } from '../../services/authService';

export const VerifyOtpPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as any)?.email || 'email của bạn';
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) { setError('Mã OTP không hợp lệ.'); return; }
    setIsLoading(true);
    authService.verifyOtp({ email, otp: otp.trim() })
      .then(() => navigate('/reset-password', { state: { email } }))
      .catch((err) => setError(err?.message || 'Mã OTP không đúng.'))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="container-fluid p-0 min-vh-100 d-flex font-manrope">
      <div className="row g-0 w-100">
        <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center p-5 position-relative bg-st-primary" style={{ backgroundColor: '#001835' }}>
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDCIo9RtNA5AAvhsrb29-mY0IcoJK8YurmRPTGxknLgy8M1fRkFSfcme98aHvYbfCsNyIZTMHCe-EgeVftE8vQP0iLuFuXF1E7faEAzud-3qBtZcX4P_7u2b91WcKaKuzACkAsbcYf58qAxp_IO9o8EIarXsSfm8RB7JhdAuKlGIxG_btJJCf7KVYDuY5PYi46MgPrmc_wkJ2eGKQyNOyshiwc4DhR8NfQd45n-pZSxvhqsyTeho6IS8jet-sX0gpupYOarkNBuuPO" className="w-100 h-100 object-fit-cover position-absolute top-0 start-0 opacity-50" alt="Verify" />
          <div className="position-relative z-1 text-center text-white px-4">
            <h1 className="display-3 fw-bold mb-3">VERIFY YOUR<br/>IDENTITY.</h1>
          </div>
          <div className="position-absolute top-0 start-0 p-4 z-1">
            <Link to="/" className="text-decoration-none fw-bold d-inline-flex align-items-center gap-2 text-white hover-opacity">
              <i className="bi bi-house-door-fill fs-5"></i> Back to Home
            </Link>
          </div>
        </div>

        <div className="col-lg-6 d-flex align-items-center justify-content-center p-4 min-vh-100" style={{ backgroundColor: '#f2f3fc' }}>
          <main className="w-100" style={{ maxWidth: '440px' }}>
            <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5 bg-white text-center">
              <div className="bg-light d-inline-flex p-3 rounded-circle mb-3">
                <span className="material-symbols-outlined fs-1" style={{ color: '#001835' }}>verified_user</span>
              </div>
              <h2 className="fw-bold mb-2" style={{ color: '#001835' }}>Verify Email</h2>
              <p className="text-muted small">Chúng tôi đã gửi mã đến <strong>{email}</strong></p>
              <form onSubmit={handleVerifyOtp} className="mt-4">
                <InputField id="otp" label="" type="text" placeholder="000000" className="text-center fs-4 tracking-widest fw-bold" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value)} required />
                {error && <div className="alert alert-danger py-2 small fw-bold mt-2">{error}</div>}
                <Button type="submit" fullWidth className="btn-st-primary mt-3 py-3 fw-bold" disabled={isLoading} style={{ backgroundColor: '#001835', border: 'none' }}>
                  {isLoading ? 'Verifying...' : 'Verify & Continue'}
                </Button>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};