import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface PatientLayoutProps {
  children: React.ReactNode;
  onOpenBookingModal?: () => void;
}

export const PatientLayout: React.FC<PatientLayoutProps> = ({ children, onOpenBookingModal }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.includes(path) 
      ? "bg-primary-subtle text-primary fw-bold border-start border-4 border-primary" 
      : "text-secondary hover-bg-light fw-medium";
  };

  return (
    <div className="d-flex bg-light min-vh-100">
      {/* Sidebar Navigation */}
      <aside className="bg-white border-end position-fixed top-0 start-0 vh-100 d-flex flex-column" style={{ width: '260px', zIndex: 1040 }}>
        <div className="p-4 pt-4 mb-4">
          <h4 className="fw-bolder text-primary mb-0 font-manrope">MedClinic Patient</h4>
        </div>
        
        <nav className="nav flex-column flex-grow-1 px-3 gap-2">
          <Link to="/patient" className={`nav-link rounded d-flex align-items-center gap-3 px-3 py-3 ${isActive('/patient/dashboard')}`}>
            <i className="bi bi-grid-1x2-fill fs-5"></i>
            Dashboard
          </Link>
          <Link to="/patient/appointments" className={`nav-link rounded d-flex align-items-center gap-3 px-3 py-3 ${isActive('/patient/appointments')}`}>
            <i className="bi bi-calendar-event fs-5"></i>
            Appointments
          </Link>
        </nav>

        <div className="p-4 mt-auto">
          <button className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2 py-3 fw-bold rounded-3 shadow-sm" onClick={onOpenBookingModal}>
            <i className="bi bi-plus-lg fs-5"></i>
            New Appointment
          </button>
        </div>
      </aside>

      {/* Main Wrapper */}
      <div className="flex-grow-1 d-flex flex-column" style={{ marginLeft: '260px' }}>
        {/* Top App Bar */}
        <header className="bg-white border-bottom position-sticky top-0 d-flex justify-content-between align-items-center px-4 py-3 shadow-sm" style={{ zIndex: 1030 }}>
          <div className="input-group" style={{ maxWidth: '400px' }}>
          </div>

          <div className="d-flex align-items-center gap-4">
            <button className="btn btn-light rounded-circle p-2 d-flex position-relative">
              <i className="bi bi-bell-fill text-secondary fs-5"></i>
              <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-2 border-white rounded-circle mt-1 ms-n1"></span>
            </button>
            <div className="d-flex align-items-center gap-3 border-start ps-4">
              <img src="https://placehold.co/40x40" alt="Patient Profile" className="rounded-circle border border-primary" style={{ width: '40px', height: '40px' }} />
              <button className="btn btn-outline-danger btn-sm d-flex align-items-center gap-2 fw-bold px-3 py-2 rounded-3 ms-2">
                <i className="bi bi-box-arrow-right fs-6"></i>
                Logout
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