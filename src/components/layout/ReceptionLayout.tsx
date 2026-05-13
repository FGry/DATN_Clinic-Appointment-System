import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogoutButton } from '../common/LogoutButton';

interface LayoutProps {
  children: React.ReactNode;
  onOpenBookingModal?: () => void;
}

export const ReceptionLayout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path || (location.pathname.startsWith(`${path}/`) && path !== '/reception')
      ? "bg-st-secondary text-white shadow-sm fw-bold"
      : "text-white-50 hover-sidebar-link fw-medium";
  };

  return (
    <div className="bg-light min-vh-100 font-manrope overflow-hidden">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-lg-none"
          style={{ zIndex: 1045, backgroundColor: 'rgba(0,24,53,0.6)', backdropFilter: 'blur(4px)' }}
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`border-end-0 position-fixed top-0 start-0 vh-100 d-flex flex-column shadow-lg transition-all duration-300 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-lg-0'}`}
        style={{
          width: '280px',
          zIndex: 1050,
          backgroundColor: '#001835',
          transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <style>{`
          @media (min-width: 992px) {
            aside { transform: translateX(0) !important; }
          }
        `}</style>

        <div className="p-3 mb-3 border-bottom d-flex align-items-center justify-content-between" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <div>
            <h5 className="mb-0 fw-bold tracking-tight text-white">HealthSync</h5>
            <small className="fw-bold text-uppercase" style={{ color: '#6fd7d6', fontSize: '10px', letterSpacing: '1px' }}>Front Desk</small>
          </div>
          <button className="btn d-lg-none text-white-50 p-0" onClick={() => setIsSidebarOpen(false)}>
            <i className="bi bi-x-lg fs-5"></i>
          </button>
        </div>

        <nav className="nav flex-column flex-grow-1 px-3 gap-2">
          {/* Static Dashboard Label */}
          <div className="d-flex align-items-center gap-3 px-3 py-3 rounded-3 mb-1" style={{ color: '#6fd7d6', backgroundColor: 'rgba(111, 215, 214, 0.05)' }}>
            <i className="bi bi-grid-1x2-fill fs-5"></i>
            <span className="fw-bold">Dashboard</span>
          </div>

          <Link to="/reception/appointment" onClick={() => setIsSidebarOpen(false)} className={`nav-link rounded-3 d-flex align-items-center gap-3 px-3 py-3 transition-all ${isActive('/reception/appointment')}`}>
            <i className="bi bi-calendar-check-fill fs-5"></i> Appointments
          </Link>

          <Link to="/reception/schedule/list" onClick={() => setIsSidebarOpen(false)} className={`nav-link rounded-3 d-flex align-items-center gap-3 px-3 py-3 transition-all ${isActive('/reception/schedule/list')}`}>
            <i className="bi bi-calendar-day-fill fs-5"></i> Daily Schedule
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow-1 d-flex flex-column main-wrapper" style={{ transition: 'margin 0.3s ease' }}>
        <style>{`
          .main-wrapper { margin-left: 0; }
          @media (min-width: 992px) {
            .main-wrapper { margin-left: 280px; }
          }
        `}</style>

        <header className="bg-white border-bottom position-sticky top-0 d-flex justify-content-between align-items-center px-4 py-3 shadow-sm" style={{ zIndex: 1030 }}>
          {/* Mobile Menu Toggle */}
          <button className="btn btn-light d-lg-none rounded-3 p-2" onClick={() => setIsSidebarOpen(true)}>
            <i className="bi bi-list fs-4"></i>
          </button>

          <div className="d-flex align-items-center gap-4 ms-auto">
            <button className="btn btn-light rounded-circle p-0 d-flex position-relative align-items-center justify-content-center shadow-sm" style={{ width: '42px', height: '42px' }}>
              <i className="bi bi-bell-fill text-muted fs-5"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-white p-1">
                <span className="visually-hidden">unread notifications</span>
              </span>
            </button>
            <div className="border-start d-none d-sm-block" style={{ height: '30px' }}></div>
            <div className="d-flex align-items-center gap-3 ps-2">
              <div className="text-end d-none d-md-block">
                <p className="mb-0 fw-bold lh-1 text-dark" style={{ color: '#001835' }}>Receptionist</p>
                <small className="fw-bold" style={{ color: '#006a6a', fontSize: '11px', textTransform: 'uppercase' }}>Front Desk</small>
              </div>
              <img src="https://ui-avatars.com/api/?name=Receptionist&background=001835&color=fff" alt="Profile" className="rounded-circle border border-2 border-white shadow-sm" style={{ width: '44px', height: '44px', objectFit: 'cover' }} />
              <LogoutButton className="ms-2 transition-all active-scale" />
            </div>
          </div>
        </header>

        <main className="p-3 p-md-4 p-lg-5 flex-grow-1 bg-light bg-opacity-50">
          <div className="container-fluid p-0">
            {children}
          </div>
        </main>
      </div>

      <style>{`
        .bg-st-primary { background-color: #001835 !important; }
        .bg-st-secondary { background-color: #006a6a !important; }
        .text-st-primary { color: #001835 !important; }
        .hover-sidebar-link:hover { background-color: rgba(255, 255, 255, 0.1); color: #ffffff !important; }
        .focus-ring-teal:focus { box-shadow: 0 0 0 0.25rem rgba(0, 106, 106, 0.1) !important; background-color: #fff !important; border: 1px solid #006a6a !important; }
        .duration-300 { transition-duration: 300ms; }
      `}</style>
    </div>
  );
};