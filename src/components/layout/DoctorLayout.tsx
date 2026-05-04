import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogoutButton } from '../common/LogoutButton';

interface DoctorLayoutProps {
  children: React.ReactNode;
}

export const DoctorLayout: React.FC<DoctorLayoutProps> = ({ children }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.includes(path) 
      ? "bg-primary-subtle text-primary fw-bold border-start border-4 border-primary" 
      : "text-secondary hover-bg-light fw-semibold";
  };

  return (
    <div className="d-flex bg-light min-vh-100">
      {/* Sidebar Navigation */}
      <aside className="bg-white border-end position-fixed top-0 start-0 vh-100 d-flex flex-column" style={{ width: '260px', zIndex: 1040 }}>
        <div className="p-4 pt-4 mb-4">
          <h4 className="fw-bolder text-primary mb-0" style={{ fontFamily: 'Manrope, sans-serif' }}>MedClinic Doctor</h4>
        </div>
        
        <nav className="nav flex-column flex-grow-1 px-3 gap-2">
          <Link to="/doctor" className={`nav-link rounded d-flex align-items-center gap-3 px-3 py-3 ${isActive('/doctor/dashboard')}`}>
            <i className="bi bi-grid-1x2-fill fs-5"></i>
            Dashboard
          </Link>
          <Link to="/doctor/schedule" className={`nav-link rounded d-flex align-items-center gap-3 px-3 py-3 ${isActive('/doctor/schedule')}`}>
            <i className="bi bi-calendar3 fs-5"></i>
            Schedule
          </Link>
          <Link to="/doctor/patients" className={`nav-link rounded d-flex align-items-center gap-3 px-3 py-3 ${isActive('/doctor/patients')}`}>
            <i className="bi bi-people-fill fs-5"></i>
            Patients
          </Link>
        </nav>
      </aside>

      {/* Main Wrapper */}
      <div className="flex-grow-1 d-flex flex-column" style={{ marginLeft: '260px' }}>
        {/* Top App Bar */}
        <header className="bg-white border-bottom position-sticky top-0 d-flex justify-content-between align-items-center px-4 py-3 shadow-sm" style={{ zIndex: 1030 }}>
          <div className="input-group" style={{ maxWidth: '400px' }}>
            <span className="input-group-text bg-light border-0 text-muted rounded-start-pill ps-4">
              <i className="bi bi-search"></i>
            </span>
            <input type="text" className="form-control bg-light border-0 rounded-end-pill py-2 focus-ring-none" placeholder="Search patients or records..." />
          </div>

          <div className="d-flex align-items-center gap-4">
            <button className="btn btn-light rounded-circle p-2 d-flex position-relative">
              <i className="bi bi-bell-fill text-secondary fs-5"></i>
              <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-2 border-white rounded-circle mt-1 ms-n1"></span>
            </button>
            <div className="d-flex align-items-center gap-3 border-start ps-4">
              <img src="https://placehold.co/40x40" alt="Doctor Profile" className="rounded-circle border" style={{ width: '36px', height: '36px' }} />
              <LogoutButton className="py-1" />
            </div>
          </div>
        </header>

        {/* Main Content Canvas */}
        <main className="p-4 p-md-5 flex-grow-1">
          {children}
        </main>
      </div>
    </div>
  );
};
