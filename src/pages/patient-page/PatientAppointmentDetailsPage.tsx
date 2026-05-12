import React from 'react';
import { PatientLayout } from '../../components/layout/PatientLayout';
import { Link } from 'react-router-dom';

export const PatientAppointmentDetailsPage: React.FC = () => {
  return (
    <PatientLayout>
      <div className="mx-auto font-manrope" style={{ maxWidth: '900px' }}>
        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-5">
          <div>
            <h2 className="fw-bolder mb-1" style={{ color: '#001835' }}>Appointment Details</h2>
            <p className="text-muted mb-0">Review your upcoming medical consultation information.</p>
          </div>
          <Link to="/patient/appointments" className="btn btn-link fw-bold text-decoration-none d-flex align-items-center gap-2 px-0 hover-opacity" style={{ color: '#006a6a' }}>
            <i className="bi bi-arrow-left"></i> Back to List
          </Link>
        </div>

        {/* Detail Card */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden position-relative bg-white">
          {/* Top Status Bar */}
          <div className="card-header bg-white border-bottom p-4 p-md-5 d-flex justify-content-between align-items-center">
            <div>
              <p className="text-muted fw-bold text-uppercase mb-1" style={{ fontSize: '11px', letterSpacing: '1px' }}>Status</p>
              <span className="badge rounded-pill px-3 py-2 fw-bold text-success bg-success-subtle d-inline-flex align-items-center gap-2">
                <span className="bg-success rounded-circle" style={{ width: '6px', height: '6px' }}></span> Upcoming
              </span>
            </div>
            <div className="text-end">
              <p className="text-muted fw-bold text-uppercase mb-1" style={{ fontSize: '11px', letterSpacing: '1px' }}>Reference ID</p>
              <span className="fw-bold" style={{ color: '#001835' }}>#APT-847291</span>
            </div>
          </div>

          <div className="card-body p-4 p-md-5">
            <div className="row g-5">
              {/* Doctor & Dept Info */}
              <div className="col-md-6 border-end-md">
                <p className="text-muted fw-bold text-uppercase mb-3" style={{ fontSize: '11px', letterSpacing: '1px' }}>Medical Professional</p>
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="rounded-circle d-flex align-items-center justify-content-center fw-bolder text-white fs-4 shadow-sm" style={{ width: '64px', height: '64px', backgroundColor: '#001835' }}>
                    SM
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1" style={{ color: '#001835' }}>Dr. Sarah Mitchell</h5>
                    <span className="badge bg-light text-muted border px-2 py-1 fw-medium">Cardiology Department</span>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-muted fw-bold text-uppercase mb-2" style={{ fontSize: '11px', letterSpacing: '1px' }}>Reason for Visit</p>
                  <p className="fw-medium text-dark mb-0 bg-light p-3 rounded-3">Routine heart checkup and blood pressure monitoring.</p>
                </div>
              </div>

              {/* Time & Location */}
              <div className="col-md-6 ps-md-4">
                <p className="text-muted fw-bold text-uppercase mb-3" style={{ fontSize: '11px', letterSpacing: '1px' }}>Schedule Information</p>
                <div className="d-flex flex-column gap-4">
                  <div className="d-flex gap-3 align-items-start">
                    <div className="bg-light rounded-circle d-flex align-items-center justify-content-center mt-1" style={{ width: '40px', height: '40px' }}>
                      <i className="bi bi-calendar-event fs-5" style={{ color: '#006a6a' }}></i>
                    </div>
                    <div>
                      <p className="text-muted small fw-bold mb-0">Date</p>
                      <p className="fw-bold fs-5 mb-0" style={{ color: '#001835' }}>October 24, 2023</p>
                    </div>
                  </div>
                  <div className="d-flex gap-3 align-items-start">
                    <div className="bg-light rounded-circle d-flex align-items-center justify-content-center mt-1" style={{ width: '40px', height: '40px' }}>
                      <i className="bi bi-clock fs-5" style={{ color: '#006a6a' }}></i>
                    </div>
                    <div>
                      <p className="text-muted small fw-bold mb-0">Time</p>
                      <p className="fw-bold fs-5 mb-0" style={{ color: '#001835' }}>10:00 AM - 10:30 AM</p>
                    </div>
                  </div>
                  <div className="d-flex gap-3 align-items-start">
                    <div className="bg-light rounded-circle d-flex align-items-center justify-content-center mt-1" style={{ width: '40px', height: '40px' }}>
                      <i className="bi bi-geo-alt fs-5" style={{ color: '#006a6a' }}></i>
                    </div>
                    <div>
                      <p className="text-muted small fw-bold mb-0">Location</p>
                      <p className="fw-bold mb-0 text-dark">St. Jude Medical Center</p>
                      <small className="text-muted d-block">Building A, Floor 3, Room 302</small>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Important Notice */}
              <div className="col-12 mt-2">
                <div className="bg-warning-subtle border-start border-4 border-warning rounded-end-3 p-4 d-flex gap-3">
                  <i className="bi bi-info-circle-fill text-warning fs-5"></i>
                  <div>
                    <h6 className="fw-bold text-dark mb-1">Message from Clinic</h6>
                    <p className="text-dark opacity-75 mb-0" style={{ fontSize: '14px' }}>Vui lòng đến trước 15 phút để hoàn tất thủ tục check-in và đo các chỉ số sinh tồn cơ bản trước khi vào gặp bác sĩ.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card Footer Actions */}
          <div className="card-footer bg-light bg-opacity-50 border-top p-4 p-md-5 d-flex flex-wrap gap-3 justify-content-end">
            <button className="btn btn-outline-secondary fw-bold px-4 py-2.5 rounded-3 d-flex align-items-center gap-2 bg-white transition-all active-scale">
              <i className="bi bi-download"></i> Download Summary
            </button>
            <button className="btn btn-outline-danger fw-bold px-4 py-2.5 rounded-3 bg-white transition-all active-scale">
              Cancel Appointment
            </button> 
            <button className="btn text-white fw-bold px-4 py-2.5 rounded-3 shadow-sm transition-all active-scale" style={{ backgroundColor: '#001835' }}>
              Reschedule
            </button>
          </div>
        </div>
      </div>
    </PatientLayout>
  );
};