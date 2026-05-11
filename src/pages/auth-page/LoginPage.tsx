import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { InputField } from '../../components/common/InputField';
import { Button } from '../../components/common/Button';
import { authService, type LoginPayload } from '../../services/authService';

const initialForm: LoginPayload = {
  username: '',
  password: '',
};

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginPayload>(initialForm);
  
  // State lưu lỗi cho từng input riêng biệt
  const [fieldErrors, setFieldErrors] = useState<{username?: string; password?: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((current) => ({ ...current, [name]: value }));
    
    // Xóa lỗi của field khi người dùng gõ lại
    if (fieldErrors[name as keyof typeof fieldErrors]) {
      setFieldErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors: {username?: string; password?: string} = {};

    // Validate Username/Email
    if (!form.username) {
      errors.username = "Email or username is required";
      isValid = false;
    } else if (form.username.includes('@') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.username)) {
      errors.username = "Invalid email address format";
      isValid = false;
    }

    // Validate Password
    if (!form.password) {
      errors.password = "Password is required";
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await authService.login(form);
      authService.saveSession(response);
      const session = authService.getSession();
      const role = session?.role;
      if (role === 'ROLE_ADMIN') navigate('/admin');
      else if (role === 'ROLE_DOCTOR') navigate('/doctor');
      else if (role === 'ROLE_RECEPTIONIST') navigate('/reception');
      else navigate('/');
    } catch (err) {
      // Bắt lỗi từ API và hiển thị dưới ô mật khẩu giống file error.html
      setFieldErrors({ password: 'Incorrect password' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-4" style={{ backgroundColor: '#f2f3fc' }}>
      <div className="w-100 position-absolute top-0 start-0 p-4">
        <Link to="/" className="text-decoration-none fw-bold d-inline-flex align-items-center gap-2" style={{ color: '#001835' }}>
          <i className="bi bi-house-door-fill fs-5"></i>
          Back to Home
        </Link>
      </div>
      <main className="w-100" style={{ maxWidth: '440px' }}>
        <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-2" style={{ color: '#001835' }}>St. Jude Medical</h2>
            <p className="text-muted small">Sign in to access your clinical portal</p>
          </div>

          <form onSubmit={handleLogin}>
            <InputField
              id="username"
              name="username"
              label="Email Address"
              type="text"
              icon="envelope"
              placeholder="name@company.com"
              value={form.username}
              onChange={handleChange}
              error={fieldErrors.username}
            />

            <div className="d-flex justify-content-between align-items-center mt-3">
              <label className="form-label fw-bold text-muted small mb-1" htmlFor="password">Password</label>
              <Link to="/forgot-password" style={{ color: '#006a6a' }} className="text-decoration-none small fw-bold">Forgot password?</Link>
            </div>
            <InputField
              id="password"
              name="password"
              label=""
              type="password"
              icon="lock"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              error={fieldErrors.password}
            />

            <Button type="submit" fullWidth className="btn-st-primary mt-4 py-2 fw-bold" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Log in'}
            </Button>
          </form>

          <p className="text-center mt-4 mb-0 text-muted small">
            Don't have an account? <Link to="/register" style={{ color: '#006a6a' }} className="text-decoration-none fw-bold">Register now</Link>
          </p>
        </div>
      </main>
    </div>
  );
};