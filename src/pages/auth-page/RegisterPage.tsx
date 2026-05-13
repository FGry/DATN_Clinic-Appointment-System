import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { InputField } from '../../components/common/InputField';
import { Button } from '../../components/common/Button';
import { authService, type RegisterPayload } from '../../services/authService';

const initialForm: RegisterPayload = {
  firstName: '',
  lastName: '',
  username: '',
  password: '',
  passwordConfirmation: '',
  phone: '',
  active: true,
  email: '',
  address: '',
  dob: '',
  gender: true,
};

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterPayload>(initialForm);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof RegisterPayload, string>>>({});
  const [globalError, setGlobalError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((current) => ({
      ...current,
      [name]: name === 'gender' ? value === 'true' : value,
    }));
    if (fieldErrors[name as keyof RegisterPayload]) {
      setFieldErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const errors: Partial<Record<keyof RegisterPayload, string>> = {};
    let isValid = true;
    if (!form.email.includes('@')) { errors.email = 'Email không hợp lệ.'; isValid = false; }
    if (form.phone.length < 10) { errors.phone = 'SĐT tối thiểu 10 số.'; isValid = false; }
    if (form.password !== form.passwordConfirmation) { errors.passwordConfirmation = 'Mật khẩu không khớp.'; isValid = false; }
    setFieldErrors(errors);
    return isValid;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setGlobalError('');
    setSuccess('');
    setIsSubmitting(true);
    try {
      await authService.register(form);
      setSuccess('Đăng ký thành công! Đang chuyển hướng...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setGlobalError(err instanceof Error ? err.message : 'Đăng ký thất bại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-fluid p-0 min-vh-100 d-flex font-manrope">
      <div className="row g-0 w-100">
        {/* Cột Hình Ảnh */}
        <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center p-5 position-relative bg-st-primary" style={{ backgroundColor: '#001835' }}>
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDCIo9RtNA5AAvhsrb29-mY0IcoJK8YurmRPTGxknLgy8M1fRkFSfcme98aHvYbfCsNyIZTMHCe-EgeVftE8vQP0iLuFuXF1E7faEAzud-3qBtZcX4P_7u2b91WcKaKuzACkAsbcYf58qAxp_IO9o8EIarXsSfm8RB7JhdAuKlGIxG_btJJCf7KVYDuY5PYi46MgPrmc_wkJ2eGKQyNOyshiwc4DhR8NfQd45n-pZSxvhqsyTeho6IS8jet-sX0gpupYOarkNBuuPO" className="w-100 h-100 object-fit-cover position-absolute top-0 start-0 opacity-50" alt="Register" />
          <div className="position-relative z-1 text-center text-white px-4">
            <h1 className="display-3 fw-bold mb-3">JOIN OUR<br/>CLINICAL NETWORK.</h1>
          </div>
          <div className="position-absolute bottom-0 start-0 w-100 p-5 text-white z-1">
             <p className="opacity-75 mb-0 max-w-500 small">Bắt đầu hành trình chăm sóc sức khỏe chuyên nghiệp cùng đội ngũ bác sĩ hàng đầu tại St. Jude Medical.</p>
          </div>
          <div className="position-absolute top-0 start-0 p-4 z-1">
            <Link to="/" className="text-decoration-none fw-bold d-inline-flex align-items-center gap-2 text-white hover-opacity">
              <i className="bi bi-house-door-fill fs-5"></i> Back to Home
            </Link>
          </div>
        </div>

        {/* Cột Form */}
        <div className="col-lg-6 d-flex align-items-center justify-content-center p-4 p-md-5 min-vh-100" style={{ backgroundColor: '#f2f3fc' }}>
          <main className="w-100" style={{ maxWidth: '600px' }}>
            <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5 bg-white">
              <div className="text-center mb-5">
                 <h2 className="fw-bold mb-0" style={{ color: '#001835' }}>Patient Registration</h2>
                 <p className="text-muted small mt-1 opacity-75">Tạo tài khoản bảo mật của bạn</p>
              </div>
              <form onSubmit={handleRegister}>
                {globalError && <div className="alert alert-danger py-2 small fw-bold">{globalError}</div>}
                {success && <div className="alert alert-success py-2 small fw-bold">{success}</div>}
                <div className="row g-3 text-start">
                  <div className="col-md-6"><InputField id="firstName" name="firstName" label="First Name" type="text" value={form.firstName} onChange={handleChange} required /></div>
                  <div className="col-md-6"><InputField id="lastName" name="lastName" label="Last Name" type="text" value={form.lastName} onChange={handleChange} required /></div>
                  <div className="col-12"><InputField id="username" name="username" label="Username" type="text" value={form.username} onChange={handleChange} required /></div>
                  <div className="col-md-6"><InputField id="dob" name="dob" label="Date of Birth" type="date" value={form.dob} onChange={handleChange} required /></div>
                  <div className="col-md-6"><InputField id="phone" name="phone" label="Phone Number" type="tel" value={form.phone} onChange={handleChange} error={fieldErrors.phone} required /></div>
                  <div className="col-12"><InputField id="email" name="email" label="Email" type="email" icon="envelope" value={form.email} onChange={handleChange} error={fieldErrors.email} required /></div>
                  <div className="col-12"><InputField id="address" name="address" label="Address" type="text" value={form.address} onChange={handleChange} required /></div>
                  <div className="col-12">
                    <label className="form-label fw-bold text-muted small">Gender</label>
                    <select name="gender" className="form-select py-2 bg-light border-0" value={String(form.gender)} onChange={handleChange}>
                      <option value="true">Male</option><option value="false">Female</option>
                    </select>
                  </div>
                  <div className="col-md-6 mt-3"><InputField id="password" name="password" label="Password" type="password" value={form.password} onChange={handleChange} error={fieldErrors.password} required /></div>
                  <div className="col-md-6 mt-3"><InputField id="passwordConfirmation" name="passwordConfirmation" label="Confirm Password" type="password" value={form.passwordConfirmation} onChange={handleChange} error={fieldErrors.passwordConfirmation} required /></div>
                </div>
                <Button type="submit" fullWidth className="mt-4 shadow-sm" disabled={isSubmitting}>
                  Complete Registration
                </Button>
              </form>
              <div className="mt-4 text-center">
                <p className="text-muted small mb-0">Đã có tài khoản? <Link to="/login" style={{ color: '#006a6a' }} className="text-decoration-none fw-bold">Login</Link></p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};