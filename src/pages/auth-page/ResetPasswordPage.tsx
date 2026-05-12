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
    if (password !== confirmPassword) { setError("Mật khẩu không khớp."); return; }
    if (password.length < 8) { setError("Mật khẩu tối thiểu 8 ký tự."); return; }
    setIsLoading(true);
    authService.resetPassword({ email, newPassword: password })
      .then(() => { alert("Đổi mật khẩu thành công!"); navigate('/login'); })
      .catch((err) => setError(err?.message || 'Lỗi.'))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="container-fluid p-0 min-vh-100 d-flex font-manrope">
      <div className="row g-0 w-100">
        <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center p-5 position-relative bg-st-primary" style={{ backgroundColor: '#001835' }}>
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDCIo9RtNA5AAvhsrb29-mY0IcoJK8YurmRPTGxknLgy8M1fRkFSfcme98aHvYbfCsNyIZTMHCe-EgeVftE8vQP0iLuFuXF1E7faEAzud-3qBtZcX4P_7u2b91WcKaKuzACkAsbcYf58qAxp_IO9o8EIarXsSfm8RB7JhdAuKlGIxG_btJJCf7KVYDuY5PYi46MgPrmc_wkJ2eGKQyNOyshiwc4DhR8NfQd45n-pZSxvhqsyTeho6IS8jet-sX0gpupYOarkNBuuPO" className="w-100 h-100 object-fit-cover position-absolute top-0 start-0 opacity-50" alt="Reset" />
          <div className="position-relative z-1 text-center text-white px-4">
            <h1 className="display-3 fw-bold mb-3">UPDATE YOUR<br/>SECURITY.</h1>
          </div>
          <div className="position-absolute top-0 start-0 p-4 z-1">
            <Link to="/" className="text-decoration-none fw-bold d-inline-flex align-items-center gap-2 text-white hover-opacity">
              <i className="bi bi-house-door-fill fs-5"></i> Back to Home
            </Link>
          </div>
        </div>

        <div className="col-lg-6 d-flex align-items-center justify-content-center p-4 min-vh-100" style={{ backgroundColor: '#f2f3fc' }}>
          <main className="w-100" style={{ maxWidth: '440px' }}>
            <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5 bg-white">
              <h2 className="fw-bold mb-2 text-center" style={{ color: '#001835' }}>New Password</h2>
              <p className="text-muted small text-center mb-4">Thiết lập mật khẩu bảo mật mới</p>
              <form onSubmit={handleResetPassword}>
                <InputField id="new_password" label="New Password" type="password" icon="lock" placeholder="Min. 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <InputField id="confirm_password" label="Confirm Password" type="password" icon="shield-check" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} error={error} required />
                <Button type="submit" fullWidth className="btn-st-primary mt-4 py-3 fw-bold" disabled={isLoading} style={{ backgroundColor: '#001835', border: 'none' }}>
                  Update Password
                </Button>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};