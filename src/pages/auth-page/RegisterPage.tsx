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
    
    // Tự động xóa lỗi khi người dùng sửa dữ liệu
    if (fieldErrors[name as keyof RegisterPayload]) {
      setFieldErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const errors: Partial<Record<keyof RegisterPayload, string>> = {};
    let isValid = true;

    if (!form.email.includes('@')) {
      errors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    if (form.phone.replace(/[^0-9]/g, '').length < 10) {
      errors.phone = 'Phone number must be at least 10 digits.';
      isValid = false;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(form.password)) {
      errors.password = 'Password must contain at least 8 chars, 1 uppercase, 1 lowercase, 1 number & 1 special char.';
      isValid = false;
    }

    if (form.password !== form.passwordConfirmation) {
      errors.passwordConfirmation = 'Passwords do not match.';
      isValid = false;
    }

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
      setSuccess('Registration successful! Redirecting to login...');
      setForm(initialForm);
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setGlobalError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center py-5" style={{ backgroundColor: '#f2f3fc' }}>
      <div className="w-100 position-absolute top-0 start-0 p-4">
        <Link to="/" className="text-decoration-none fw-bold d-inline-flex align-items-center gap-2" style={{ color: '#001835' }}>
          <i className="bi bi-house-door-fill fs-5"></i>
          Back to Home
        </Link>
      </div>
      <main className="w-100" style={{ maxWidth: '640px' }}>
        <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-2" style={{ color: '#001835' }}>Patient Registration</h2>
            <p className="text-muted small">Create your St. Jude Medical secure account</p>
          </div>

          <form onSubmit={handleRegister}>
            {globalError && <div className="alert alert-danger py-2 small fw-bold">{globalError}</div>}
            {success && <div className="alert alert-success py-2 small fw-bold">{success}</div>}

            <div className="row g-3">
              <div className="col-md-6">
                <InputField id="firstName" name="firstName" label="First Name" type="text" placeholder="John" value={form.firstName} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <InputField id="lastName" name="lastName" label="Last Name" type="text" placeholder="Doe" value={form.lastName} onChange={handleChange} required />
              </div>
              <div className="col-12">
                <InputField id="username" name="username" label="Username" type="text" placeholder="johndoe" value={form.username} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <InputField id="dob" name="dob" label="Date of Birth" type="date" value={form.dob} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <InputField id="phone" name="phone" label="Phone Number" type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={handleChange} error={fieldErrors.phone} required />
              </div>
              <div className="col-12">
                <InputField id="email" name="email" label="Email Address" type="email" placeholder="john.doe@example.com" icon="envelope" value={form.email} onChange={handleChange} error={fieldErrors.email} required />
              </div>
              <div className="col-12">
                <InputField id="address" name="address" label="Home Address" type="text" placeholder="123 Main St" value={form.address} onChange={handleChange} required />
              </div>
              <div className="col-12">
                <label className="form-label fw-bold text-muted small mb-1">Gender</label>
                <select name="gender" className="form-select py-2 bg-light border-0" value={String(form.gender)} onChange={handleChange}>
                  <option value="true">Male</option>
                  <option value="false">Female</option>
                </select>
              </div>
              <div className="col-md-6 mt-3">
                <InputField id="password" name="password" label="Password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange} error={fieldErrors.password} required />
              </div>
              <div className="col-md-6 mt-3">
                <InputField id="passwordConfirmation" name="passwordConfirmation" label="Confirm Password" type="password" placeholder="••••••••" value={form.passwordConfirmation} onChange={handleChange} error={fieldErrors.passwordConfirmation} required />
              </div>
            </div>

            <Button type="submit" fullWidth className="btn-st-primary mt-5 py-3 fw-bold shadow-sm" disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : 'Complete Registration'}
            </Button>
          </form>

          <p className="text-center mt-4 pt-3 border-top text-muted small">
            Already have an account? <Link to="/login" style={{ color: '#006a6a' }} className="text-decoration-none fw-bold">Login here</Link>
          </p>
        </div>
      </main>
    </div>
  );
};