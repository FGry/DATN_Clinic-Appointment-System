import React from 'react';
import { ReceptionLayout } from '../../components/layout/ReceptionLayout';
import { Link } from 'react-router-dom';

export const ReceptionTimelinePage: React.FC = () => {
  return (
    <ReceptionLayout onOpenBookingModal={() => {}}>
      <div className="mx-auto font-manrope" style={{ maxWidth: '1400px' }}>
        
        {/* Controls Bar */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
          <div className="d-flex flex-wrap align-items-center gap-3">
            {/* Date Picker */}
            <div className="bg-white border px-4 py-2.5 rounded-3 d-flex align-items-center gap-3 shadow-sm cursor-pointer hover-border-st-secondary transition-all">
              <i className="bi bi-calendar3 text-muted"></i>
              <span className="fw-bolder" style={{ color: '#001835' }}>October 24, 2023</span>
              <i className="bi bi-chevron-down text-muted small ms-2"></i>
            </div>
            
            {/* Specialty Filter */}
            <select className="form-select border shadow-sm py-2.5 fw-medium text-dark bg-white" style={{ width: 'auto', minWidth: '200px' }}>
              <option>All Specialties</option>
              <option>General Practice</option>
              <option>Cardiology</option>
              <option>Pediatrics</option>
            </select>
          </div>

          {/* View Toggle */}
          <div className="bg-light p-1 rounded-3 d-flex border shadow-sm">
            <Link to="/reception/schedule/list" className="btn btn-sm btn-light text-muted border-0 px-4 fw-bold hover-bg-white transition-all">
              <i className="bi bi-list-ul me-2"></i> List View
            </Link>
            <button className="btn btn-sm bg-white text-dark shadow-sm px-4 fw-bold" style={{ color: '#001835' }}>
              <i className="bi bi-calendar-range me-2"></i> Timeline
            </button>
          </div>
        </div>

        {/* Stat Cards (Same layout as List Page) */}
        <div className="row g-4 mb-4">
          <div className="col-md-3">
            <div className="card border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center gap-3 bg-white border-start border-4" style={{ borderColor: '#001835' }}>
              <div className="bg-light rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '48px', height: '48px' }}>
                <i className="bi bi-calendar-check-fill fs-4" style={{ color: '#001835' }}></i>
              </div>
              <div>
                <p className="text-muted fw-bold mb-0 text-uppercase" style={{ fontSize: '10px', letterSpacing: '1px' }}>Total Slots</p>
                <h3 className="fw-bolder mb-0" style={{ color: '#001835' }}>24</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center gap-3 bg-white border-start border-4" style={{ borderColor: '#006a6a' }}>
              <div className="bg-light rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '48px', height: '48px' }}>
                <i className="bi bi-check-circle-fill fs-4" style={{ color: '#006a6a' }}></i>
              </div>
              <div>
                <p className="text-muted fw-bold mb-0 text-uppercase" style={{ fontSize: '10px', letterSpacing: '1px' }}>Completed</p>
                <h3 className="fw-bolder mb-0" style={{ color: '#001835' }}>08</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center gap-3 bg-white border-start border-4 border-warning">
              <div className="bg-warning-subtle text-warning rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '48px', height: '48px' }}>
                <i className="bi bi-hourglass-split fs-4"></i>
              </div>
              <div>
                <p className="text-muted fw-bold mb-0 text-uppercase" style={{ fontSize: '10px', letterSpacing: '1px' }}>Remaining</p>
                <h3 className="fw-bolder mb-0" style={{ color: '#001835' }}>16</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center gap-3 bg-white border-start border-4 border-danger">
              <div className="bg-danger-subtle text-danger rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '48px', height: '48px' }}>
                <i className="bi bi-x-circle-fill fs-4"></i>
              </div>
              <div>
                <p className="text-muted fw-bold mb-0 text-uppercase" style={{ fontSize: '10px', letterSpacing: '1px' }}>Canceled</p>
                <h3 className="fw-bolder mb-0" style={{ color: '#001835' }}>0</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Grid */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white mb-5">
          <div className="d-flex overflow-auto">
            {/* Doctors Column */}
            <div className="bg-light border-end" style={{ width: '250px', minWidth: '250px' }}>
              <div className="p-3 border-bottom d-flex align-items-center" style={{ height: '60px' }}>
                <span className="fw-bold text-muted text-uppercase small" style={{ letterSpacing: '1px' }}>Doctors</span>
              </div>
              <div className="p-3 border-bottom d-flex align-items-center" style={{ height: '100px' }}>
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center fw-bolder text-white shadow-sm" style={{ width: '40px', height: '40px', backgroundColor: '#001835' }}>SJ</div>
                  <div>
                    <h6 className="fw-bold mb-0" style={{ color: '#001835' }}>Dr. Sarah Jenkins</h6>
                    <small className="text-muted">General Practice</small>
                  </div>
                </div>
              </div>
              <div className="p-3 border-bottom d-flex align-items-center" style={{ height: '100px' }}>
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center fw-bolder text-white shadow-sm" style={{ width: '40px', height: '40px', backgroundColor: '#006a6a' }}>MC</div>
                  <div>
                    <h6 className="fw-bold mb-0" style={{ color: '#001835' }}>Dr. Michael Chen</h6>
                    <small className="text-muted">Cardiology</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Time Grid */}
            <div className="flex-grow-1 position-relative" style={{ minWidth: '800px' }}>
              {/* Time Headers */}
              <div className="d-flex border-bottom bg-white" style={{ height: '60px' }}>
                {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'].map((time, idx) => (
                  <div key={idx} className="flex-grow-1 border-end p-2 text-center">
                    <span className="text-muted fw-bold small">{time}</span>
                  </div>
                ))}
              </div>

              {/* Grid Lines Overlay */}
              <div className="position-absolute top-0 bottom-0 w-100 d-flex pointer-events-none" style={{ marginTop: '60px' }}>
                {[...Array(8)].map((_, idx) => (
                  <div key={idx} className="flex-grow-1 border-end border-light"></div>
                ))}
              </div>

              {/* Rows */}
              <div className="position-relative border-bottom" style={{ height: '100px' }}>
                {/* Appointment Blocks */}
                <div className="position-absolute top-50 translate-middle-y shadow-sm rounded-3 p-2 text-white cursor-pointer hover-opacity transition-all" 
                     style={{ left: '0%', width: '12.5%', backgroundColor: '#001835', zIndex: 10 }}>
                  <small className="fw-bold d-block text-truncate">Alice Schmidt</small>
                  <small className="opacity-75" style={{ fontSize: '10px' }}>09:00 - 10:00</small>
                </div>
                <div className="position-absolute top-50 translate-middle-y shadow-sm rounded-3 p-2 text-white cursor-pointer hover-opacity transition-all" 
                     style={{ left: '18.75%', width: '12.5%', backgroundColor: '#006a6a', zIndex: 10 }}>
                  <small className="fw-bold d-block text-truncate">Bob Martin</small>
                  <small className="opacity-75" style={{ fontSize: '10px' }}>10:30 - 11:30</small>
                </div>
              </div>

              <div className="position-relative border-bottom" style={{ height: '100px' }}>
                {/* Appointment Blocks */}
                <div className="position-absolute top-50 translate-middle-y shadow-sm rounded-3 p-2 text-dark border cursor-pointer hover-opacity transition-all" 
                     style={{ left: '12.5%', width: '12.5%', backgroundColor: '#f0f0f9', zIndex: 10 }}>
                  <small className="fw-bold d-block text-truncate">Charlie Davis</small>
                  <small className="text-muted" style={{ fontSize: '10px' }}>10:00 - 11:00</small>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </ReceptionLayout>
  );
};