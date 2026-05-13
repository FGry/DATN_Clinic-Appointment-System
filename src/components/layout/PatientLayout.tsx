import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogoutButton } from '../common/LogoutButton';

interface PatientLayoutProps {
  children: React.ReactNode;
  onOpenBookingModal?: () => void;
}

export const PatientLayout: React.FC<PatientLayoutProps> = ({ children, onOpenBookingModal }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || (location.pathname.startsWith(`${path}/`) && path !== '/patient')
      ? "bg-st-secondary text-white shadow-sm fw-bold" 
      : "text-white-50 hover-sidebar-link fw-medium";
  };

  const isDashboardActive = location.pathname === '/patient' 
      ? "bg-st-secondary text-white shadow-sm fw-bold" 
      : "text-white-50 hover-sidebar-link fw-medium";

  return (
    <div className="d-flex bg-light min-vh-100 font-manrope">
      {/* --- Sidebar --- */}
      <aside className="border-end-0 position-fixed top-0 start-0 vh-100 d-flex flex-column shadow-sm" style={{ width: '280px', zIndex: 1040, backgroundColor: '#001835' }}>
        
        <div className="p-4 pt-5 mb-4 border-bottom text-center" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <div className="d-inline-flex align-items-center gap-3">
             <div className="bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: '45px', height: '45px' }}>
                <span className="fw-bolder fs-4" style={{ color: '#001835' }}>H</span>
             </div>
             <div className="text-start">
                <h5 className="mb-0 fw-bold tracking-tight text-white">HealthSync</h5>
                <small className="fw-bold text-uppercase" style={{ color: '#6fd7d6', fontSize: '10px', letterSpacing: '1px' }}>Patient Portal</small>
             </div>
          </div>
        </div>
        
        <nav className="nav flex-column flex-grow-1 px-3 gap-2">
          <Link to="/patient" className={`nav-link rounded-3 d-flex align-items-center gap-3 px-3 py-3 transition-all ${isDashboardActive}`}>
            <i className="bi bi-grid-1x2-fill fs-5"></i> Dashboard
          </Link>
          <Link to="/patient/appointments" className={`nav-link rounded-3 d-flex align-items-center gap-3 px-3 py-3 transition-all ${isActive('/patient/appointments')}`}>
            <i className="bi bi-calendar2-check-fill fs-5"></i> My Appointments
          </Link>
          <Link to="/patient/records" className={`nav-link rounded-3 d-flex align-items-center gap-3 px-3 py-3 transition-all ${isActive('/patient/records')}`}>
            <i className="bi bi-clipboard2-pulse-fill fs-5"></i> Medical Records
          </Link>

          {/* Booking Button inside Sidebar */}
          {onOpenBookingModal && (
            <div className="mt-4 px-2">
              <button 
                onClick={onOpenBookingModal}
                className="btn btn-st-secondary w-100 fw-semibold py-2 d-flex align-items-center justify-content-center gap-2 rounded-3 shadow-sm transition-all active-scale"
              >
                <i className="bi bi-plus-circle-fill"></i> New Appointment
              </button>
            </div>
          )}
        </nav>

        <div className="p-4 border-top mt-auto" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
           <div className="d-flex align-items-center gap-3 px-2">
              <i className="bi bi-shield-check-fill fs-5" style={{ color: '#6fd7d6' }}></i>
              <div className="lh-1">
                <p className="fw-bold text-uppercase mb-1 text-white-50" style={{ fontSize: '9px', letterSpacing: '0.5px' }}>Privacy Assured</p>
                <p className="small mb-0 text-white opacity-50" style={{ fontSize: '10px' }}>Your data is encrypted</p>
              </div>
           </div>
        </div>
      </aside>

      {/* --- Main Wrapper --- */}
      <div className="flex-grow-1 d-flex flex-column" style={{ marginLeft: '280px' }}>
        <header className="bg-white border-bottom position-sticky top-0 d-flex justify-content-between align-items-center px-4 py-3 shadow-sm" style={{ zIndex: 1030 }}>
          
          <div className="input-group" style={{ maxWidth: '400px' }}>
            <span className="input-group-text bg-light border-0 text-muted rounded-start-pill ps-4"><i className="bi bi-search"></i></span>
            <input type="text" className="form-control bg-light border-0 rounded-end-pill py-2.5 shadow-none focus-ring-teal" placeholder="Search doctors, specialties..." style={{ fontSize: '14px' }} />
          </div>

          <div className="d-flex align-items-center gap-4">
            <button className="btn btn-light rounded-circle p-0 d-flex position-relative align-items-center justify-content-center shadow-sm" style={{ width: '42px', height: '42px' }}>
              <i className="bi bi-bell-fill text-muted fs-5"></i>
              <span className="position-absolute top-0 start-100 translate-middle p-1.5 bg-danger border border-2 border-white rounded-circle mt-2 ms-n2"></span>
            </button>
            <div className="border-start" style={{ height: '30px' }}></div>
            <div className="d-flex align-items-center gap-3 ps-2">
              <img src="https://placehold.co/100x100" alt="Profile" className="rounded-circle border border-2 border-white shadow-sm" style={{ width: '44px', height: '44px', objectFit: 'cover' }} />
              <LogoutButton className="ms-2 transition-all active-scale" />
            </div>
          </div>
        </header>

        <main className="p-4 p-md-5 flex-grow-1 bg-light bg-opacity-50">
          {children}
        </main>
      </div>

      <style>{`
        .bg-st-primary { background-color: #001835 !important; }
        .text-st-primary { color: #001835 !important; }
        .bg-st-secondary { background-color: #006a6a !important; }
        .text-st-secondary { color: #006a6a !important; }
        .hover-sidebar-link:hover { background-color: rgba(255, 255, 255, 0.1); color: #ffffff !important; }
        .focus-ring-teal:focus { box-shadow: 0 0 0 0.25rem rgba(0, 106, 106, 0.1) !important; background-color: #fff !important; border: 1px solid #006a6a !important; }
      `}</style>
    </div>
  );
};