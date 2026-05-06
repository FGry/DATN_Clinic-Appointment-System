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
  
  // State lưu trữ lỗi cho từng trường (field)
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

    // Tự động xóa lỗi của field đó khi người dùng bắt đầu gõ lại
    if (fieldErrors[name as keyof RegisterPayload]) {
      setFieldErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const errors: Partial<Record<keyof RegisterPayload, string>> = {};
    let isValid = true;

    // Ví dụ các logic validation đơn giản (Có thể thay bằng Yup/Zod sau này)
    if (!form.email.includes('@')) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (form.phone.replace(/[^0-9]/g, '').length < 10) {
      errors.phone = 'Phone number must be at least 10 digits';
      isValid = false;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(form.password)) {
      errors.password = 'Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.';
      isValid = false;
    }

    if (form.password !== form.passwordConfirmation) {
      errors.passwordConfirmation = 'Passwords do not match';
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setGlobalError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      await authService.register(form);
      setSuccess('Registration successful. Redirecting to login...');
      setForm(initialForm);
      window.setTimeout(() => navigate('/login'), 1000);
    } catch (err) {
      setGlobalError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light py-5 position-relative">
      <Link to="/" className="position-absolute top-0 start-0 m-4 text-decoration-none fw-bold d-flex align-items-center gap-1">
        <i className="bi bi-arrow-left fs-5"></i> Back to Home
      </Link>

      <div className="card shadow border-0 p-4 p-md-5" style={{ width: '100%', maxWidth: '600px' }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">MedPoint Clinical</h2>
          <p className="text-muted">Secure Patient Registration</p>
        </div>

        <form onSubmit={handleRegister}>
          {/* Global Error (Dùng cho lỗi Server/API) */}
          {globalError && <div className="alert alert-danger py-2">{globalError}</div>}
          {success && <div className="alert alert-success py-2">{success}</div>}

          <div className="row g-2">
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
              <InputField 
                id="phone" 
                name="phone" 
                label="Phone Number" 
                type="tel" 
                placeholder="+1 (555) 000-0000" 
                value={form.phone} 
                onChange={handleChange} 
                error={fieldErrors.phone} 
                required 
              />
            </div>
            <div className="col-12">
              <InputField 
                id="email" 
                name="email" 
                label="Email Address" 
                type="email" 
                placeholder="john.doe@example.com" 
                value={form.email} 
                onChange={handleChange} 
                error={fieldErrors.email}
                required 
              />
            </div>
            <div className="col-12">
              <InputField id="address" name="address" label="Address" type="text" placeholder="123 Main Street" value={form.address} onChange={handleChange} required />
            </div>
            <div className="col-12">
              <label htmlFor="gender" className="form-label fw-semibold">Gender</label>
              <select id="gender" name="gender" className="form-select py-2 mb-3" value={String(form.gender)} onChange={handleChange} required>
                <option value="true">Male</option>
                <option value="false">Female</option>
              </select>
            </div>
            <div className="col-md-6">
              <InputField 
                id="password" 
                name="password" 
                label="Password" 
                type="password" 
                placeholder="Password" 
                value={form.password} 
                onChange={handleChange} 
                error={fieldErrors.password}
                required 
              />
            </div>
            <div className="col-md-6">
              <InputField 
                id="passwordConfirmation" 
                name="passwordConfirmation" 
                label="Confirm Password" 
                type="password" 
                placeholder="Confirm password" 
                value={form.passwordConfirmation} 
                onChange={handleChange} 
                error={fieldErrors.passwordConfirmation}
                required 
              />
            </div>
          </div>

          <Button type="submit" fullWidth className="mt-4" disabled={isSubmitting}>
            {isSubmitting ? 'Registering...' : 'Register'}
          </Button>

          <p className="text-center mt-4 mb-0 text-muted border-top pt-3">
            Already have an account? <Link to="/login" className="text-decoration-none fw-bold">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};