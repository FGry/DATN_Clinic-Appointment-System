import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  onOpenBookingModal: () => void;
}

export const ReceptionLayout: React.FC<LayoutProps> = ({ children, onOpenBookingModal }) => {
  const location = useLocation();

  // Hàm kiểm tra xem route hiện tại có trùng với link không để làm nổi bật
  const isActive = (path: string) => {
    return location.pathname === path ? "bg-primary-subtle text-primary fw-bold" : "text-secondary hover-bg-light";
  };

  return (
    <div className="d-flex bg-light min-vh-100">
      {/* Sidebar */}
      <aside className="bg-white border-end position-fixed top-0 start-0 vh-100 d-flex flex-column" style={{ width: '260px', zIndex: 1040 }}>
        <div className="p-4 d-flex align-items-center gap-3 border-bottom">
          <div className="bg-primary text-white rounded p-2 d-flex align-items-center justify-content-center">
            {/* Bootstrap Icon: heart-pulse */}
            <i className="bi bi-heart-pulse-fill fs-5"></i>
          </div>
          <div>
            <h5 className="mb-0 fw-bold text-primary">Central Clinic</h5>
            <small className="text-muted">Reception Desk</small>
          </div>
        </div>
        
        <nav className="nav flex-column flex-grow-1 p-3 gap-2">
          {/* Dashboard Tab */}
          <Link to="/reception" className={`nav-link rounded d-flex align-items-center gap-3 ${isActive('/reception')}`}>
            <i className="bi bi-grid-1x2-fill fs-5"></i>
            Dashboard
          </Link>
          
          {/* Schedule Tab */}
          <Link to="/reception/schedule/list" className={`nav-link rounded d-flex align-items-center gap-3 ${isActive('/reception/schedule/list') || isActive('/reception/schedule/timeline') ? "bg-primary-subtle text-primary fw-bold" : "text-secondary hover-bg-light"}`}>
            <i className="bi bi-calendar-check-fill fs-5"></i>
            Schedule
          </Link>
          
        </nav>

        <div className="p-4 border-top">
          <button className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2 py-2 fw-semibold shadow-sm" onClick={onOpenBookingModal}>
            <i className="bi bi-plus-circle fs-5"></i>
            New Appointment
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow-1 d-flex flex-column" style={{ marginLeft: '260px', minHeight: '100vh' }}>
        {/* Top Navbar */}
        <header className="bg-white border-bottom position-sticky top-0 d-flex justify-content-between align-items-center px-4 py-3" style={{ zIndex: 1030 }}>
          <div className="input-group" style={{ maxWidth: '400px' }}>
            <span className="input-group-text bg-light border-end-0">
              <i className="bi bi-search text-muted"></i>
            </span>
            <input type="text" className="form-control bg-light border-start-0 focus-ring-none" placeholder="Search patients or doctors..." />
          </div>

          <div className="d-flex align-items-center gap-4">
            <button className="btn btn-light rounded-circle p-2 d-flex position-relative align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
              <i className="bi bi-bell text-secondary fs-5"></i>
              <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-2 border-white rounded-circle mt-1 ms-n1"></span>
            </button>
            <div className="d-flex align-items-center gap-2 border-start ps-3">
              <img src="https://placehold.co/40x40" alt="Avatar" className="rounded-circle border" style={{ width: '38px', height: '38px' }} />
              <button className="btn btn-outline-danger btn-sm d-flex align-items-center gap-2 ms-3 fw-medium">
                <i className="bi bi-box-arrow-right fs-6"></i>
                <span className="d-none d-md-inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 p-md-5 flex-grow-1 bg-light">
          {children}
        </main>
      </div>
    </div>
  );
};