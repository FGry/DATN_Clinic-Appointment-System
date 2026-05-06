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
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await authService.login(form);
      authService.saveSession(response);
      
      const session = authService.getSession();
      const role = session?.role;

      if (role === 'ROLE_ADMIN') {
        navigate('/admin');
      } else if (role === 'ROLE_DOCTOR') {
        navigate('/doctor');
      } else if (role === 'ROLE_RECEPTIONIST') {
        navigate('/reception');
      } else {
        navigate('/patient');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please check your username and password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light position-relative">
      <Link to="/" className="position-absolute top-0 start-0 m-4 text-decoration-none fw-bold d-flex align-items-center gap-1">
        <i className="bi bi-arrow-left fs-5"></i> Back to Home
      </Link>

      <div className="card shadow border-0 p-4 p-md-5" style={{ width: '100%', maxWidth: '440px' }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">MedPoint Clinical</h2>
        </div>

        <form onSubmit={handleLogin}>
          {error && <div className="alert alert-danger py-2">{error}</div>}

          <InputField
            id="username"
            name="username"
            label="Username"
            type="text"
            placeholder="Enter your username"
            value={form.username}
            onChange={handleChange}
            required
          />

          <div className="d-flex justify-content-between align-items-center">
            <label className="form-label fw-semibold mb-0" htmlFor="password">Password</label>
            <Link to="/forgot-password" className="text-decoration-none small fw-semibold">Forgot password?</Link>
          </div>
          <InputField
            id="password"
            name="password"
            label=""
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <Button type="submit" fullWidth className="mt-3" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Log in'}
          </Button>

          <p className="text-center mt-4 mb-0 text-muted">
            Don't have an account? <Link to="/register" className="text-decoration-none fw-bold">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
