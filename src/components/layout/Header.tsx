import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../common/Button';

export const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top py-3">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold text-primary fs-4">MedClinic</Link>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-medium">
            <li className="nav-item"><Link to="/doctors" className="nav-link">Doctors</Link></li>
            <li className="nav-item"><Link to="/department/cardiology" className="nav-link">Specialties</Link></li>
          </ul>
        </div>

        <div className="d-flex gap-2">
          <Button variant="text" onClick={() => navigate('/login')}>Login</Button>
          <Button variant="primary" onClick={() => navigate('/register')}>Register</Button>
        </div>
      </div>
    </nav>
  );
};