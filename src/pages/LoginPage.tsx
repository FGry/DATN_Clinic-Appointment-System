import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { InputField } from '../components/common/InputField';
import { Button } from '../components/common/Button';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
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
          <InputField id="email" label="Email" type="email" placeholder="name@example.com" required />
          
          <div className="d-flex justify-content-between align-items-center">
            <label className="form-label fw-semibold mb-0">Password</label>
            <Link to="/forgot-password" className="text-decoration-none small fw-semibold">Forgot password?</Link>
          </div>
          <InputField id="password" label="" type="password" placeholder="••••••••" required />

          <Button type="submit" fullWidth className="mt-3">Log in</Button>

          <p className="text-center mt-4 mb-0 text-muted">
            Don't have an account? <Link to="/register" className="text-decoration-none fw-bold">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};