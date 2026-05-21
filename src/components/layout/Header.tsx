import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed-top bg-white shadow-sm">
      <nav className="navbar navbar-expand-md py-3 container">
        {/* Brand */}
        <Link to="/" className="navbar-brand fs-4 fw-bold text-st-primary mb-0">
          St. Jude Medical
        </Link>
        
        {/* Navigation Links */}
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav gap-4">
            <li className="nav-item">
              <Link to="/doctors" className="nav-link fs-6 fw-semibold text-secondary hover-text-st-secondary transition-colors">Doctors</Link>
            </li>
            <li className="nav-item">
              <Link to="/department" className="nav-link fs-6 fw-semibold text-secondary hover-text-st-secondary transition-colors">Specialties</Link>
            </li>
          </ul>
        </div>
        
        {/* Auth Buttons */}
        <div className="d-flex align-items-center gap-3">
          <button 
            onClick={() => navigate('/login')}
            className="btn fs-6 fw-semibold text-st-secondary"
          >
            Login
          </button>
          <button 
            onClick={() => navigate('/register')}
            className="btn btn-st-secondary fw-semibold py-2 px-3 d-flex align-items-center justify-content-center gap-2 rounded-3"
          >
            <i className="bi bi-person-plus"></i> Register
          </button>
        </div>
      </nav>
    </header>
  );
};