import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.includes(path) 
      ? "bg-primary-subtle text-primary fw-bold border-end border-4 border-primary" 
      : "text-secondary hover-bg-light fw-medium";
  };

  return (
    <div className="d-flex bg-light min-vh-100">
      {/* Sidebar Navigation */}
      <aside className="bg-white border-end position-fixed top-0 start-0 vh-100 d-flex flex-column" style={{ width: '260px', zIndex: 1040 }}>
        <div className="p-4 pt-4 mb-3">
          <h4 className="fw-bolder text-primary mb-1 font-manrope">MedClinic Admin</h4>
          <p className="text-muted small mb-0">Management Portal</p>
        </div>
        
        <nav className="nav flex-column flex-grow-1 px-3 gap-1">
          <Link to="/admin" className={`nav-link rounded-start-3 d-flex align-items-center gap-3 px-3 py-3 ${isActive('/admin/dashboard')}`}>
            <i className="bi bi-grid-1x2-fill fs-5"></i>
            Dashboard
          </Link>
          <Link to="/admin/doctors" className={`nav-link rounded-start-3 d-flex align-items-center gap-3 px-3 py-3 ${isActive('/admin/doctors')}`}>
            <i className="bi bi-heart-pulse-fill fs-5"></i>
            Doctors
          </Link>
          <Link to="/admin/patients" className={`nav-link rounded-start-3 d-flex align-items-center gap-3 px-3 py-3 ${isActive('/admin/patients')}`}>
            <i className="bi bi-people-fill fs-5"></i>
            Patients
          </Link>
          <Link to="/admin/receptionists" className={`nav-link rounded-start-3 d-flex align-items-center gap-3 px-3 py-3 ${isActive('/admin/receptionists')}`}>
            <i className="bi bi-person-badge-fill fs-5"></i>
            Receptionists
          </Link>
          <Link to="/admin/specialties" className={`nav-link rounded-start-3 d-flex align-items-center gap-3 px-3 py-3 ${isActive('/admin/specialties')}`}>
            <i className="bi bi-tags-fill fs-5"></i>
            Specialties
          </Link>
        </nav>

        <div className="p-3 border-top mt-auto d-flex flex-column gap-1">
          <Link to="/admin/settings" className="nav-link text-secondary hover-bg-light rounded d-flex align-items-center gap-3 px-3 py-2">
            <i className="bi bi-gear-fill"></i> Settings
          </Link>
          <Link to="/admin/support" className="nav-link text-secondary hover-bg-light rounded d-flex align-items-center gap-3 px-3 py-2">
            <i className="bi bi-question-circle-fill"></i> Support
          </Link>
        </div>
      </aside>

      {/* Main Wrapper */}
      <div className="flex-grow-1 d-flex flex-column" style={{ marginLeft: '260px' }}>
        {/* Top App Bar */}
        <header className="bg-white border-bottom position-sticky top-0 d-flex justify-content-between align-items-center px-4 py-3 shadow-sm" style={{ zIndex: 1030 }}>
          <div className="input-group" style={{ maxWidth: '400px' }}>
            <span className="input-group-text bg-light border-0 text-muted rounded-start-pill ps-4">
              <i className="bi bi-search"></i>
            </span>
            <input type="text" className="form-control bg-light border-0 rounded-end-pill py-2 focus-ring-none" placeholder="Search staff, doctors or records..." />
          </div>

          <div className="d-flex align-items-center gap-4">
            <button className="btn btn-light rounded-circle p-2 d-flex position-relative">
              <i className="bi bi-bell-fill text-secondary fs-5"></i>
              <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-2 border-white rounded-circle mt-1 ms-n1"></span>
            </button>
            <div className="d-flex align-items-center gap-3 border-start ps-4">
              <div className="text-end d-none d-md-block">
                <p className="mb-0 fw-bold lh-1 text-dark">Admin User</p>
                <small className="text-muted" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Super Admin</small>
              </div>
              <img src="https://placehold.co/40x40" alt="Admin Profile" className="rounded-circle border border-2 border-white shadow-sm" style={{ width: '40px', height: '40px' }} />
              <button className="btn btn-outline-danger btn-sm d-flex align-items-center gap-2 fw-bold px-3 py-2 rounded-3 ms-2">
                <i className="bi bi-box-arrow-right fs-6"></i>
                <span className="d-none d-lg-block">Logout</span>
              </button>
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