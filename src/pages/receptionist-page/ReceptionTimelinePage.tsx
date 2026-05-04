import React from 'react';
import { ReceptionLayout } from '../../components/layout/ReceptionLayout';
import { Link } from 'react-router-dom';

export const ReceptionTimelinePage: React.FC = () => {
  return (
    <ReceptionLayout onOpenBookingModal={() => {}}>
      <div className="container-fluid px-0">
        
        {/* Controls Bar */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
          <div className="d-flex align-items-center gap-3">
            {/* Date Picker */}
            <div className="bg-white border px-3 py-2 rounded d-flex align-items-center gap-2 shadow-sm">
              <i className="bi bi-calendar3 text-secondary"></i>
              <span className="fw-semibold">October 24, 2023</span>
              <i className="bi bi-chevron-down text-muted small ms-2"></i>
            </div>
            
            {/* Specialty Filter */}
            <select className="form-select border shadow-sm py-2" style={{ width: 'auto' }}>
              <option>All Specialties</option>
              <option>General Practice</option>
              <option>Cardiology</option>
              <option>Pediatrics</option>
            </select>
          </div>

          {/* View Toggle */}
          <div className="bg-light p-1 rounded-3 d-flex border">
            <Link to="/reception/schedule/list" className="btn btn-sm btn-light text-secondary border-0 px-3 fw-semibold">
              List View
            </Link>
            <button className="btn btn-sm btn-white text-primary shadow-sm px-3 fw-semibold">
              Timeline
            </button>
          </div>
        </div>

        {/* Timeline Grid Container */}
        <div className="card border-0 shadow-sm overflow-hidden mb-4">
          {/* Grid Header (Doctors) */}
          <div className="row g-0 border-bottom bg-light">
            <div className="col border-end p-3" style={{ maxWidth: '80px' }}></div>
            <div className="col border-end p-3 text-center">
              <p className="fw-bold text-primary mb-0">Dr. Jenkins</p>
              <small className="text-muted text-uppercase" style={{ fontSize: '10px', letterSpacing: '1px' }}>General Practice</small>
            </div>
            <div className="col border-end p-3 text-center">
              <p className="fw-bold text-primary mb-0">Dr. Chen</p>
              <small className="text-muted text-uppercase" style={{ fontSize: '10px', letterSpacing: '1px' }}>Cardiology</small>
            </div>
            <div className="col p-3 text-center">
              <p className="fw-bold text-primary mb-0">Dr. Rodriguez</p>
              <small className="text-muted text-uppercase" style={{ fontSize: '10px', letterSpacing: '1px' }}>Pediatrics</small>
            </div>
          </div>

          {/* Timeline Body */}
          <div className="position-relative overflow-auto" style={{ height: '600px', backgroundImage: 'linear-gradient(to bottom, #e9ecef 1px, transparent 1px)', backgroundSize: '100% 64px' }}>
            <div className="d-flex h-100">
              
              {/* Time Column */}
              <div className="d-flex flex-column border-end bg-light opacity-75" style={{ minWidth: '80px' }}>
                {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map(time => (
                  <div key={time} className="d-flex justify-content-center pt-1" style={{ height: '64px' }}>
                    <small className="text-muted fw-semibold" style={{ fontSize: '11px' }}>{time}</small>
                  </div>
                ))}
              </div>

              {/* Doctor 1 Column */}
              <div className="flex-fill position-relative border-end border-light">
                <div className="position-absolute bg-primary-subtle border-start border-primary border-4 rounded-end p-2 shadow-sm" style={{ top: '32px', left: '4px', right: '4px', height: '48px' }}>
                  <p className="fw-bold text-primary mb-0" style={{ fontSize: '11px', lineHeight: '1.2' }}>Robert Wilson</p>
                  <p className="text-primary mb-0" style={{ fontSize: '10px' }}>08:30 AM - Checkup</p>
                </div>
                <div className="position-absolute bg-success-subtle border-start border-success border-4 rounded-end p-2 shadow-sm" style={{ top: '128px', left: '4px', right: '4px', height: '96px' }}>
                  <p className="fw-bold text-success mb-0" style={{ fontSize: '11px', lineHeight: '1.2' }}>Alice Thompson</p>
                  <p className="text-success mb-0" style={{ fontSize: '10px' }}>10:00 AM - Follow-up</p>
                </div>
              </div>

              {/* Doctor 2 Column */}
              <div className="flex-fill position-relative border-end border-light">
                <div className="position-absolute bg-info-subtle border-start border-info border-4 rounded-end p-2 shadow-sm" style={{ top: '64px', left: '4px', right: '4px', height: '64px' }}>
                  <p className="fw-bold text-info-emphasis mb-0" style={{ fontSize: '11px', lineHeight: '1.2' }}>Mark Davids</p>
                  <p className="text-info-emphasis mb-0" style={{ fontSize: '10px' }}>09:00 AM - ECG</p>
                </div>
                <div className="position-absolute bg-warning-subtle border-start border-warning border-4 rounded-end p-2 shadow-sm" style={{ top: '256px', left: '4px', right: '4px', height: '48px' }}>
                  <p className="fw-bold text-warning-emphasis mb-0" style={{ fontSize: '11px', lineHeight: '1.2' }}>Sarah Blake</p>
                  <p className="text-warning-emphasis mb-0" style={{ fontSize: '10px' }}>12:00 PM - Consultation</p>
                </div>
              </div>

              {/* Doctor 3 Column */}
              <div className="flex-fill position-relative border-light">
                <div className="position-absolute bg-warning-subtle border-start border-warning border-4 rounded-end p-2 shadow-sm" style={{ top: '160px', left: '4px', right: '4px', height: '80px' }}>
                  <p className="fw-bold text-warning-emphasis mb-0" style={{ fontSize: '11px', lineHeight: '1.2' }}>Tommy Miller (Child)</p>
                  <p className="text-warning-emphasis mb-0" style={{ fontSize: '10px' }}>10:30 AM - Vaccination</p>
                </div>
                <div className="position-absolute bg-primary-subtle border-start border-primary border-4 rounded-end p-2 shadow-sm" style={{ top: '384px', left: '4px', right: '4px', height: '64px' }}>
                  <p className="fw-bold text-primary mb-0" style={{ fontSize: '11px', lineHeight: '1.2' }}>Emma Watson</p>
                  <p className="text-primary mb-0" style={{ fontSize: '10px' }}>02:00 PM - Physical</p>
                </div>
              </div>

              {/* Current Time Line */}
              <div className="position-absolute bg-danger z-3" style={{ top: '192px', left: '80px', right: '0', height: '2px', pointerEvents: 'none' }}>
                 <div className="position-absolute bg-danger rounded-circle shadow" style={{ left: '-6px', top: '-4px', width: '10px', height: '10px', boxShadow: '0 0 8px rgba(220,53,69,0.5)' }}></div>
              </div>

            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="row g-4">
          <div className="col-md-3">
            <div className="card border-0 shadow-sm p-3 d-flex flex-row align-items-center gap-3">
              <div className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                <i className="bi bi-people-fill fs-5"></i>
              </div>
              <div>
                <p className="text-muted fw-semibold mb-0 text-uppercase" style={{ fontSize: '10px' }}>Total Appointments</p>
                <h4 className="fw-bold mb-0">24</h4>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm p-3 d-flex flex-row align-items-center gap-3">
              <div className="bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                <i className="bi bi-check-circle-fill fs-5"></i>
              </div>
              <div>
                <p className="text-muted fw-semibold mb-0 text-uppercase" style={{ fontSize: '10px' }}>Completed</p>
                <h4 className="fw-bold mb-0">08</h4>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm p-3 d-flex flex-row align-items-center gap-3">
              <div className="bg-warning-subtle text-warning rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                <i className="bi bi-hourglass-split fs-5"></i>
              </div>
              <div>
                <p className="text-muted fw-semibold mb-0 text-uppercase" style={{ fontSize: '10px' }}>Remaining</p>
                <h4 className="fw-bold mb-0">16</h4>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm p-3 d-flex flex-row align-items-center gap-3">
              <div className="bg-danger-subtle text-danger rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                <i className="bi bi-x-circle-fill fs-5"></i>
              </div>
              <div>
                <p className="text-muted fw-semibold mb-0 text-uppercase" style={{ fontSize: '10px' }}>Cancellations</p>
                <h4 className="fw-bold mb-0">04</h4>
              </div>
            </div>
          </div>
        </div>

      </div>
    </ReceptionLayout>
  );
};