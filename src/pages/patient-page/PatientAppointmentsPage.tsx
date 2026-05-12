import React, { useState } from 'react';
import { PatientLayout } from '../../components/layout/PatientLayout';

export const PatientAppointmentsPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <PatientLayout onOpenBookingModal={() => setShowModal(true)}>
      <div className="mx-auto font-manrope" style={{ maxWidth: '1200px' }}>
        
        {/* Header Section */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-5">
          <div>
            <h2 className="fw-bolder mb-1" style={{ color: '#001835' }}>My Appointments</h2>
            <p className="text-muted mb-0">Manage your scheduled visits and clinical history with MedClinic specialists.</p>
          </div>
          <button 
            className="btn fw-bold px-4 py-2 d-flex align-items-center gap-2 rounded-3 shadow-sm text-white transition-all active-scale" 
            style={{ backgroundColor: '#001835' }} 
            onClick={() => setShowModal(true)}
          >
            <i className="bi bi-calendar-plus fs-5"></i> Book New Appointment
          </button>
        </div>

        {/* Filter Section */}
        <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
          <div className="d-flex flex-wrap align-items-center gap-4">
            <div className="d-flex align-items-center gap-2 fw-bold" style={{ color: '#006a6a' }}>
              <i className="bi bi-funnel fs-5"></i>
              <span>Filter by History</span>
            </div>
            <div className="d-flex gap-3 flex-grow-1">
              <div>
                <label className="form-label small text-muted fw-bold text-uppercase mb-1" style={{ fontSize: '10px', letterSpacing: '1px' }}>Day</label>
                <select className="form-select bg-light border-0 fw-medium text-dark"><option>All Days</option><option>01 - 10</option></select>
              </div>
              <div>
                <label className="form-label small text-muted fw-bold text-uppercase mb-1" style={{ fontSize: '10px', letterSpacing: '1px' }}>Month</label>
                <select className="form-select bg-light border-0 fw-medium text-dark"><option>October</option><option>November</option></select>
              </div>
              <div>
                <label className="form-label small text-muted fw-bold text-uppercase mb-1" style={{ fontSize: '10px', letterSpacing: '1px' }}>Year</label>
                <select className="form-select bg-light border-0 fw-medium text-dark"><option>2023</option><option>2022</option></select>
              </div>
              <div>
                <label className="form-label small text-muted fw-bold text-uppercase mb-1" style={{ fontSize: '10px', letterSpacing: '1px' }}>Status</label>
                <select className="form-select bg-light border-0 fw-medium text-dark"><option>All Status</option><option>Completed</option><option>Upcoming</option></select>
              </div>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-secondary fw-bold rounded-3 bg-white">Reset</button>
              <button className="btn text-white fw-bold rounded-3 shadow-sm" style={{ backgroundColor: '#006a6a' }}>Apply</button>
            </div>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr className="text-uppercase small fw-bold text-muted" style={{ letterSpacing: '1px' }}>
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Doctor</th>
                  <th className="py-3 px-4">Specialty</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-end">Actions</th>
                </tr>
              </thead>
              <tbody className="border-top-0">
                {/* Upcoming Row */}
                <tr>
                  <td className="px-4 py-4 fw-bold" style={{ color: '#001835' }}>Oct 24, 2023 • 10:00 AM</td>
                  <td className="px-4 py-4 fw-bold text-dark">Dr. Sarah Mitchell</td>
                  <td className="px-4 py-4"><span className="badge rounded-pill px-3 py-2 fw-bold text-uppercase" style={{ backgroundColor: '#e6f4f4', color: '#006a6a', fontSize: '10px' }}>Cardiology</span></td>
                  <td className="px-4 py-4">
                    <span className="d-inline-flex align-items-center gap-2 small fw-bold text-success">
                      <span className="bg-success rounded-circle" style={{ width: '8px', height: '8px' }}></span> Upcoming
                    </span>
                  </td>
                  <td className="px-4 py-4 text-end">
                    <button className="btn btn-sm fw-bold px-3 py-2 rounded-3 text-white shadow-sm" style={{ backgroundColor: '#001835' }}>View Details</button>
                  </td>
                </tr>
                {/* Completed Row */}
                <tr>
                  <td className="px-4 py-4 fw-bold text-muted">Oct 18, 2023 • 14:30 PM</td>
                  <td className="px-4 py-4 fw-bold text-dark">Dr. James Wilson</td>
                  <td className="px-4 py-4"><span className="badge rounded-pill px-3 py-2 fw-bold text-uppercase" style={{ backgroundColor: '#f0f0f9', color: '#001835', fontSize: '10px' }}>Dermatology</span></td>
                  <td className="px-4 py-4">
                    <span className="d-inline-flex align-items-center gap-2 small fw-bold text-muted">
                      <span className="bg-secondary rounded-circle" style={{ width: '8px', height: '8px' }}></span> Completed
                    </span>
                  </td>
                  <td className="px-4 py-4 text-end">
                    <button className="btn btn-sm btn-outline-secondary fw-bold px-3 py-2 rounded-3 bg-white">View History</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* --- Booking Modal --- */}
        {showModal && (
          <>
            <div className="modal-backdrop fade show" style={{ backdropFilter: 'blur(5px)', backgroundColor: 'rgba(0,24,53,0.5)' }}></div>
            <div className="modal fade show d-block" tabIndex={-1}>
              <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
                  <div className="modal-header bg-white py-4 px-4 border-bottom">
                    <div>
                      <h4 className="modal-title font-manrope fw-bolder" style={{ color: '#001835' }}>Book Appointment</h4>
                      <p className="text-muted small mb-0 mt-1">Schedule a new consultation with our specialists.</p>
                    </div>
                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                  </div>
                  <div className="modal-body p-4 p-md-5">
                    <form className="row g-4">
                      <div className="col-md-6">
                        <label className="form-label fw-bold text-muted small mb-2">Select Specialty</label>
                        <select className="form-select py-2.5 bg-light border-0">
                          <option>Cardiology</option>
                          <option>Neurology</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold text-muted small mb-2">Select Doctor</label>
                        <select className="form-select py-2.5 bg-light border-0">
                          <option>Dr. Sarah Mitchell</option>
                          <option>Dr. James Wilson</option>
                        </select>
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-bold text-muted small mb-2">Select Date & Time</label>
                        <div className="d-flex gap-3">
                          <input type="date" className="form-control py-2.5 bg-light border-0" />
                          <select className="form-select py-2.5 bg-light border-0" style={{ maxWidth: '200px' }}>
                            <option>09:00 AM</option>
                            <option>10:30 AM</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-bold text-muted small mb-2">Reason for Visit</label>
                        <textarea className="form-control py-3 bg-light border-0" rows={3} placeholder="Please describe your symptoms..."></textarea>
                      </div>
                      <div className="col-12">
                        <div className="bg-warning-subtle border-start border-4 border-warning p-3 rounded-end-3 d-flex gap-3 mt-2">
                          <i className="bi bi-info-circle-fill text-warning fs-5"></i>
                          <small className="text-dark fw-medium mt-1">Please arrive 15 minutes before your scheduled time for initial vitals screening.</small>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer bg-light py-3 px-4 border-top-0">
                    <button type="button" className="btn btn-link text-muted fw-bold text-decoration-none px-4" onClick={() => setShowModal(false)}>Cancel</button>
                    <button type="button" className="btn text-white fw-bold px-4 py-2.5 rounded-3 shadow-sm d-flex align-items-center gap-2" style={{ backgroundColor: '#006a6a' }}>
                      Confirm Booking <i className="bi bi-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </PatientLayout>
  );
};