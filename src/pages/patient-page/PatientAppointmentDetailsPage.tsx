import React from 'react';
import { PatientLayout } from '../../components/layout/PatientLayout';
import { Link } from 'react-router-dom';

export const PatientAppointmentDetailsPage: React.FC = () => {
  return (
    <PatientLayout>
      <div className="mx-auto" style={{ maxWidth: '900px' }}>
        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-5">
          <div>
            <h2 className="fw-bolder font-manrope text-dark mb-2">Appointment Details</h2>
            <p className="text-muted mb-0">Review your upcoming medical consultation information.</p>
          </div>
          <Link to="/patient/appointments" className="btn btn-link text-primary fw-bold text-decoration-none d-flex align-items-center gap-2 px-0">
            <i className="bi bi-arrow-left"></i> Back to List
          </Link>
        </div>

        {/* Detail Card */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden position-relative">
          {/* Top Status Bar */}
          <div className="card-header bg-white border-bottom p-4 p-md-5 d-flex justify-content-between align-items-center">
            <div>
              <p className="text-muted fw-bold text-uppercase mb-1" style={{ fontSize: '11px', letterSpacing: '1px' }}>Appointment ID</p>
              <h4 className="fw-bolder font-manrope text-dark m-0">#APT-20231024-089</h4>
            </div>
            <div className="bg-light text-secondary rounded-pill px-4 py-2 d-flex align-items-center gap-2 border">
              <span className="bg-secondary rounded-circle" style={{ width: '8px', height: '8px' }}></span>
              <span className="fw-bold small">Completed</span>
            </div>
          </div>

          <div className="card-body p-4 p-md-5">
            <div className="row g-5">
              {/* Practitioner */}
              <div className="col-md-6 d-flex gap-4">
                <div className="bg-light border rounded-4 d-flex align-items-center justify-content-center text-primary flex-shrink-0" style={{ width: '64px', height: '64px' }}>
                  <i className="bi bi-heart-pulse fs-3"></i>
                </div>
                <div>
                  <p className="text-muted small fw-semibold mb-1">Practitioner</p>
                  <h5 className="fw-bold font-manrope text-dark mb-2">Dr. Alexander Bennett</h5>
                  <span className="badge bg-primary-subtle text-primary px-3 py-1">Cardiology</span>
                </div>
              </div>

              {/* Date & Time */}
              <div className="col-md-6 d-flex gap-4">
                <div className="bg-light border rounded-4 d-flex align-items-center justify-content-center text-primary flex-shrink-0" style={{ width: '64px', height: '64px' }}>
                  <i className="bi bi-calendar-event fs-3"></i>
                </div>
                <div>
                  <p className="text-muted small fw-semibold mb-1">Date & Time</p>
                  <h5 className="fw-bold font-manrope text-dark mb-1">09:00 AM</h5>
                  <p className="text-muted mb-0">Thứ 3, 24/10/2023</p>
                </div>
              </div>

              {/* Reason */}
              <div className="col-12">
                <div className="bg-light border rounded-3 p-4">
                  <p className="text-muted small fw-semibold mb-2">Reason for Visit</p>
                  <p className="fw-medium text-dark mb-0">Monthly Regular Check-up</p>
                </div>
              </div>

              {/* Message from clinic */}
              <div className="col-12">
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
          <div className="card-footer bg-light border-top p-4 p-md-5 d-flex flex-wrap gap-3 justify-content-end">
            <button className="btn btn-outline-secondary fw-bold px-4 py-2 rounded-3 d-flex align-items-center gap-2 bg-white">
              <i className="bi bi-download"></i> Download Summary
            </button>
            <button className="btn btn-primary fw-bold px-4 py-2 rounded-3 shadow-sm">
              View Results
            </button>
            {/* Nếu lịch hẹn chưa hoàn thành thì hiện nút: 
              <button className="btn btn-outline-danger fw-bold px-4 py-2 rounded-3 bg-white">Cancel Appointment</button> 
              <button className="btn btn-primary fw-bold px-4 py-2 rounded-3 shadow-sm">Reschedule</button> 
            */}
          </div>
        </div>
      </div>
    </PatientLayout>
  );
};