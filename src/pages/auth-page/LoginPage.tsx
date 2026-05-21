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
  const [fieldErrors, setFieldErrors] = useState<{ username?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((current) => ({ ...current, [name]: value }));
    
    if (fieldErrors[name as keyof typeof fieldErrors]) {
      setFieldErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors: { username?: string; password?: string } = {};

    if (!form.username) {
      errors.username = "Username or Email is required";
      isValid = false;
    }

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
      else if (role === 'ROLE_PATIENT') navigate('/patient');
      else navigate('/');
      
    } catch (err) {
      setFieldErrors({ password: 'Incorrect username or password' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-fluid p-0 min-vh-100 d-flex font-manrope">
      <div className="row g-0 w-100">
        
        {/* --- Cột Hình Ảnh Bên Trái --- */}
        <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center p-5 position-relative bg-st-primary" style={{ backgroundColor: '#001835' }}>
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDCIo9RtNA5AAvhsrb29-mY0IcoJK8YurmRPTGxknLgy8M1fRkFSfcme98aHvYbfCsNyIZTMHCe-EgeVftE8vQP0iLuFuXF1E7faEAzud-3qBtZcX4P_7u2b91WcKaKuzACkAsbcYf58qAxp_IO9o8EIarXsSfm8RB7JhdAuKlGIxG_btJJCf7KVYDuY5PYi46MgPrmc_wkJ2eGKQyNOyshiwc4DhR8NfQd45n-pZSxvhqsyTeho6IS8jet-sX0gpupYOarkNBuuPO" className="w-100 h-100 object-fit-cover position-absolute top-0 start-0 opacity-50" alt="Forgot Password" 
          />
          <div className="position-relative z-1 text-center text-white px-4">
            <h1 className="display-3 fw-bold mb-3" style={{ lineHeight: '1.2' }}>
              PRECISION CARE<br/>FOR YOUR FAMILY'S FUTURE.
            </h1>
          </div>
          <div className="position-absolute bottom-0 start-0 w-100 p-5 text-start text-white z-1">
             <p className="text-white opacity-75 mb-0 max-w-500 small">
              Dedicated to your health, every step of the way. From diagnosis to recovery, we prioritize your family's well-being with compassionate care and advanced technology.
             </p>
          </div>
          <div className="position-absolute top-0 start-0 p-4 z-1">
            <Link to="/" className="text-decoration-none fw-bold d-inline-flex align-items-center gap-2 text-white hover-opacity">
              <i className="bi bi-house-door-fill fs-5"></i> Back to Home
            </Link>
          </div>
        </div>

        {/* --- Cột Form Bên Phải --- */}
        <div className="col-lg-6 d-flex align-items-center justify-content-center p-4 p-md-5 min-vh-100" style={{ backgroundColor: '#f2f3fc' }}>
          <main className="w-100" style={{ maxWidth: '440px' }}>
            <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5 bg-white">
              
              <div className="text-center mb-5 d-flex flex-column align-items-center">
                 <div className="bg-st-primary rounded-circle d-flex align-items-center justify-content-center mb-3 shadow-sm" style={{ backgroundColor: '#001835', width: '60px', height: '60px' }}>
                    <span className="text-white fw-bolder fs-3 font-manrope">H</span>
                 </div>
                 <h2 className="fw-bold mb-0" style={{ color: '#001835', fontSize: '2rem' }}>HealthSync Portal</h2>
                 <p className="text-muted small mt-1 mb-0 opacity-75">Sign in to access your clinical dashboard</p>
              </div>

              <form onSubmit={handleLogin}>
                <InputField
                  id="username"
                  name="username"
                  label="Username or Email"
                  type="text"
                  icon="envelope"
                  placeholder="name@example.com"
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

                {/* Đã cập nhật nút: Bỏ inline style background, giữ nguyên class margin/padding/shadow */}
                <Button 
                  type="submit" 
                  fullWidth 
                  className="mt-4 shadow-sm" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Logging in...' : 'Sign In to Portal'}
                </Button>

                {/* <div className="mt-4 pt-4 border-top">
                  <p className="text-center text-muted small mb-3">Or continue with</p>
                  <div className="d-flex gap-2">
                    <button type="button" className="btn btn-outline-light border text-dark w-100 d-flex align-items-center justify-content-center gap-2 py-2 rounded-3 hover-bg-light transition-all">
                      <img src="https://www.google.com/favicon.ico" alt="Google" style={{ width: '16px' }} />
                      <span className="small fw-semibold">Google</span>
                    </button>
                    <button type="button" className="btn btn-outline-light border text-dark w-100 d-flex align-items-center justify-content-center gap-2 py-2 rounded-3 hover-bg-light transition-all">
                      <i className="bi bi-apple"></i>
                      <span className="small fw-semibold">Apple ID</span>
                    </button>
                  </div>
                </div> */}
              </form>

              <div className="mt-4 text-center">
                <p className="text-muted small mb-0 opacity-75">
                  Don't have a patient account? <Link to="/register" style={{ color: '#006a6a' }} className="text-decoration-none fw-bold">Register Now</Link>
                </p>
              </div>

              {/* <div className="mt-5 pt-4 flex items-center justify-center gap-2 opacity-40 text-center" style={{ borderTop: '1px dashed #dee2e6' }}>
                 <span className="fw-bold text-uppercase" style={{ fontSize: '10px', letterSpacing: '1px' }}>HIPAA Compliant</span>
                 <span className="mx-2 text-muted">|</span>
                 <span className="fw-bold text-uppercase" style={{ fontSize: '10px', letterSpacing: '1px' }}>Secure clinical encryption</span>
              </div> */}
            </div>
          </main>
        </div>

      </div>
    </div>
  );
};