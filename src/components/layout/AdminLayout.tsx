import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogoutButton } from '../common/LogoutButton';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return location.pathname.includes(path) 
      ? "bg-st-secondary text-white shadow-sm fw-bold" 
      : "text-white-50 hover-sidebar-link fw-medium";
  };

  return (
    <div className="d-flex bg-light min-vh-100 font-manrope">
      <aside className="border-end-0 position-fixed top-0 start-0 vh-100 d-flex flex-column shadow-sm" style={{ width: '280px', zIndex: 1040, backgroundColor: '#001835' }}>
        
        <div className="p-3 pt-3 mb-4 border-bottom text-center" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <div>
             {/* <div className="bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: '45px', height: '45px' }}>
                <span className="fw-bolder fs-4" style={{ color: '#001835' }}>H</span>
             </div> */}
             <div className="text-start">
                <h5 className="mb-0 fw-bold tracking-tight text-white">HealthSync</h5>
                <small className="fw-bold text-uppercase" style={{ color: '#6fd7d6', fontSize: '10px', letterSpacing: '1px' }}>Administration</small>
             </div>
          </div>
        </div>
        
        <nav className="nav flex-column flex-grow-1 px-3 gap-2">
          {/* <Link to="/admin/dashboard" className={`nav-link rounded-3 d-flex align-items-center gap-3 px-3 py-3 transition-all ${isActive('/admin/dashboard')}`}>
            <i className="bi bi-grid-1x2-fill fs-5"></i> Dashboard
          </Link> */}
          <Link to="/admin/doctors" className={`nav-link rounded-3 d-flex align-items-center gap-3 px-3 py-3 transition-all ${isActive('/admin/doctors')}`}>
            <i className="bi bi-heart-pulse-fill fs-5"></i> Doctors
          </Link>
          <Link to="/admin/patients" className={`nav-link rounded-3 d-flex align-items-center gap-3 px-3 py-3 transition-all ${isActive('/admin/patients')}`}>
            <i className="bi bi-people-fill fs-5"></i> Patients
          </Link>
          <Link to="/admin/receptionists" className={`nav-link rounded-3 d-flex align-items-center gap-3 px-3 py-3 transition-all ${isActive('/admin/receptionists')}`}>
            <i className="bi bi-person-badge-fill fs-5"></i> Receptionists
          </Link>
          <Link to="/admin/specialties" className={`nav-link rounded-3 d-flex align-items-center gap-3 px-3 py-3 transition-all ${isActive('/admin/specialties')}`}>
            <i className="bi bi-tags-fill fs-5"></i> Specialties
          </Link>
        </nav>

        <div className="p-4 border-top mt-auto" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
           <div className="d-flex align-items-center gap-3 px-2">
              <i className="bi bi-shield-check-fill fs-5" style={{ color: '#6fd7d6' }}></i>
              <div className="lh-1">
                <p className="fw-bold text-uppercase mb-1 text-white-50" style={{ fontSize: '9px', letterSpacing: '0.5px' }}>Data Protection</p>
                <p className="small mb-0 text-white opacity-50" style={{ fontSize: '10px' }}>HIPAA Compliant Session</p>
              </div>
           </div>
        </div>
      </aside>

      <div className="flex-grow-1 d-flex flex-column" style={{ marginLeft: '280px' }}>
        <header className="bg-white border-bottom position-sticky top-0 d-flex justify-content-between align-items-center px-4 py-3 shadow-sm" style={{ zIndex: 1030 }}>
          
          <div className="input-group" style={{ maxWidth: '400px' }}>
            {/* <span className="input-group-text bg-light border-0 text-muted rounded-start-pill ps-4"><i className="bi bi-search"></i></span>
            <input type="text" className="form-control bg-light border-0 rounded-end-pill py-2.5 shadow-none focus-ring-teal" placeholder="Search records, staff ID..." style={{ fontSize: '14px' }} /> */}
          </div>

          <div className="d-flex align-items-center gap-4">
            <button className="btn btn-light rounded-circle p-0 d-flex position-relative align-items-center justify-content-center shadow-sm" style={{ width: '42px', height: '42px' }}>
              <i className="bi bi-bell-fill text-muted fs-5"></i>
            </button>
            <div className="border-start" style={{ height: '30px' }}></div>
            <div className="d-flex align-items-center gap-3 ps-2">
              <div className="text-end d-none d-md-block">
                <p className="mb-0 fw-bold lh-1 text-dark" style={{ color: '#001835' }}>System Admin</p>
                <small className="fw-bold" style={{ color: '#006a6a', fontSize: '11px', textTransform: 'uppercase' }}>Superuser</small>
              </div>
              <img src="https://placehold.co/100x100" alt="Profile" className="rounded-circle border border-2 border-white shadow-sm" style={{ width: '44px', height: '44px', objectFit: 'cover' }} />
              
              {/* Thay đổi nút logout sang btn-st-secondary */}
              <button 
                className="btn btn-st-secondary btn-sm d-flex align-items-center justify-content-center gap-2 fw-semibold px-3 py-2 rounded-3 ms-2 transition-all active-scale"
                onClick={() => navigate('/login')}
              >
                <i className="bi bi-box-arrow-right fs-6"></i>
                <span className="d-none d-lg-inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        <main className="p-4 p-md-5 flex-grow-1 bg-light bg-opacity-50">
          {children}
        </main>
      </div>

      <style>{`
        .bg-st-primary { background-color: #001835 !important; }
        .bg-st-secondary { background-color: #006a6a !important; }
        .text-st-primary { color: #001835 !important; }
        .hover-sidebar-link:hover { background-color: rgba(255, 255, 255, 0.1); color: #ffffff !important; }
        .focus-ring-teal:focus { box-shadow: 0 0 0 0.25rem rgba(0, 106, 106, 0.1) !important; background-color: #fff !important; border: 1px solid #006a6a !important; }
      `}</style>
    </div>
  );
};