import React from 'react';
import { Link } from 'react-router-dom';
import { InputField } from '../components/common/InputField';
import { Button } from '../components/common/Button';

export const RegisterPage: React.FC = () => {
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
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
          <div className="row g-2">
            <div className="col-12">
              <InputField id="full_name" label="Full Name" type="text" placeholder="John Doe" required />
            </div>
            <div className="col-md-6">
              <InputField id="dob" label="Date of Birth" type="date" required />
            </div>
            <div className="col-md-6">
              <InputField id="phone" label="Phone Number" type="tel" placeholder="+1 (555) 000-0000" required />
            </div>
            <div className="col-12">
              <InputField id="email" label="Email Address" type="email" placeholder="john.doe@example.com" required />
            </div>
            <div className="col-md-6">
              <InputField id="password" label="Password" type="password" placeholder="••••••••" required />
            </div>
            <div className="col-md-6">
              <InputField id="confirm_password" label="Confirm Password" type="password" placeholder="••••••••" required />
            </div>
          </div>

          <Button type="submit" fullWidth className="mt-4">Register</Button>

          <p className="text-center mt-4 mb-0 text-muted border-top pt-3">
            Already have an account? <Link to="/login" className="text-decoration-none fw-bold">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};