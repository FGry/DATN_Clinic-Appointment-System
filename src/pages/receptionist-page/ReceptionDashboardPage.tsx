import React, { useState } from 'react';
import { ReceptionLayout } from '../../components/layout/ReceptionLayout';

export const ReceptionDashboardPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <ReceptionLayout onOpenBookingModal={() => setShowModal(true)}>
      <div className="mx-auto font-manrope" style={{ maxWidth: '1400px' }}>
        {/* Header & Controls */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 gap-3">
          <div>
            <h2 className="fw-bolder mb-1" style={{ color: '#001835' }}>Reception Dashboard</h2>
            <p className="text-muted mb-0">Manage and track patient appointments for today.</p>
          </div>
          <div className="bg-white border px-4 py-2 rounded-3 d-flex align-items-center gap-2 shadow-sm">
            <i className="bi bi-calendar-event fs-5" style={{ color: '#001835' }}></i>
            <span className="fw-bold text-dark">October 24, 2023</span>
          </div>
        </div>

        {/* Stat Cards (Bento Style) */}
        <div className="row g-4 mb-4">
          <div className="col-md-3">
            <div className="card border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center gap-3 bg-white border-start border-4" style={{ borderColor: '#001835' }}>
              <div className="bg-light rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '48px', height: '48px' }}>
                <i className="bi bi-people-fill fs-4" style={{ color: '#001835' }}></i>
              </div>
              <div>
                <p className="text-muted fw-bold mb-0 text-uppercase" style={{ fontSize: '10px', letterSpacing: '1px' }}>Total Appointments</p>
                <div className="d-flex align-items-end gap-2">
                  <h3 className="fw-bolder mb-0" style={{ color: '#001835' }}>48</h3>
                  <small className="text-success fw-bold pb-1">+12 Today</small>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center gap-3 bg-white border-start border-4" style={{ borderColor: '#006a6a' }}>
              <div className="bg-light rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '48px', height: '48px' }}>
                <i className="bi bi-check-circle-fill fs-4" style={{ color: '#006a6a' }}></i>
              </div>
              <div>
                <p className="text-muted fw-bold mb-0 text-uppercase" style={{ fontSize: '10px', letterSpacing: '1px' }}>Checked In</p>
                <h3 className="fw-bolder mb-0" style={{ color: '#001835' }}>15</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center gap-3 bg-white border-start border-4 border-warning">
              <div className="bg-warning-subtle text-warning rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '48px', height: '48px' }}>
                <i className="bi bi-hourglass-split fs-4"></i>
              </div>
              <div>
                <p className="text-muted fw-bold mb-0 text-uppercase" style={{ fontSize: '10px', letterSpacing: '1px' }}>Pending</p>
                <h3 className="fw-bolder mb-0" style={{ color: '#001835' }}>30</h3>
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
                <h3 className="fw-bolder mb-0" style={{ color: '#001835' }}>3</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {/* Quick Actions */}
          <div className="col-md-3">
            <div className="d-flex flex-column gap-3">
              <div className="card border-0 shadow-sm rounded-4 p-4 text-center cursor-pointer hover-border-st-secondary transition-all bg-white" onClick={() => setShowModal(true)}>
                <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '56px', height: '56px', backgroundColor: 'rgba(0, 24, 53, 0.1)' }}>
                  <i className="bi bi-person-plus-fill fs-3" style={{ color: '#001835' }}></i>
                </div>
                <h6 className="fw-bold mb-1" style={{ color: '#001835' }}>Register Patient</h6>
                <small className="text-muted">Create new record</small>
              </div>
              <div className="card border-0 shadow-sm rounded-4 p-4 text-center cursor-pointer hover-border-st-secondary transition-all bg-white">
                <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '56px', height: '56px', backgroundColor: 'rgba(0, 106, 106, 0.1)' }}>
                  <i className="bi bi-upc-scan fs-3" style={{ color: '#006a6a' }}></i>
                </div>
                <h6 className="fw-bold mb-1" style={{ color: '#001835' }}>Check-in Patient</h6>
                <small className="text-muted">Scan QR or ID</small>
              </div>
              <div className="card border-0 shadow-sm rounded-4 p-4 text-center cursor-pointer hover-border-st-secondary transition-all bg-white">
                <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 bg-danger-subtle text-danger" style={{ width: '56px', height: '56px' }}>
                  <i className="bi bi-ambulance fs-3"></i>
                </div>
                <h6 className="fw-bold mb-1 text-danger">Emergency</h6>
                <small className="text-muted">Priority admission</small>
              </div>
            </div>
          </div>

          {/* Today's Appointments Table */}
          <div className="col-md-9">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100 bg-white">
              <div className="card-header bg-white border-bottom p-4 d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold font-manrope" style={{ color: '#001835' }}>Live Queue</h5>
                <button className="btn btn-link fw-bold text-decoration-none p-0" style={{ color: '#006a6a' }}>View All</button>
              </div>
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="bg-light">
                    <tr className="text-uppercase small fw-bold text-muted" style={{ letterSpacing: '1px' }}>
                      <th className="py-3 px-4">Time</th>
                      <th className="py-3 px-4">Patient</th>
                      <th className="py-3 px-4">Doctor</th>
                      <th className="py-3 px-4">Type</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody className="border-top-0">
                    <tr>
                      <td className="px-4 py-4 fw-bold" style={{ color: '#001835' }}>09:00 AM</td>
                      <td className="px-4 py-4 fw-bold text-dark">Alice Schmidt</td>
                      <td className="px-4 py-4 text-muted small fw-medium">Dr. Sarah Jenkins</td>
                      <td className="px-4 py-4"><span className="badge rounded-pill px-3 py-2 fw-bold text-uppercase" style={{ backgroundColor: '#e6f4f4', color: '#006a6a', fontSize: '10px' }}>Consultation</span></td>
                      <td className="px-4 py-4"><span className="badge bg-warning-subtle text-warning-emphasis rounded-pill px-3 py-2 fw-bold">Waiting</span></td>
                      <td className="px-4 py-4 text-end"><button className="btn btn-sm text-white fw-bold px-3 rounded-3 shadow-sm" style={{ backgroundColor: '#001835' }}>Check In</button></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 fw-bold" style={{ color: '#001835' }}>09:30 AM</td>
                      <td className="px-4 py-4 fw-bold text-dark">Michael Scott</td>
                      <td className="px-4 py-4 text-muted small fw-medium">Dr. Robert Chen</td>
                      <td className="px-4 py-4"><span className="badge rounded-pill px-3 py-2 fw-bold text-uppercase" style={{ backgroundColor: '#f0f0f9', color: '#001835', fontSize: '10px' }}>Follow-up</span></td>
                      <td className="px-4 py-4"><span className="badge bg-success-subtle text-success rounded-pill px-3 py-2 fw-bold">In Room</span></td>
                      <td className="px-4 py-4 text-end"><button className="btn btn-sm btn-outline-secondary fw-bold px-3 rounded-3">Details</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
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
                      <p className="text-muted small mb-0 mt-1">Schedule a new consultation for a patient.</p>
                    </div>
                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                  </div>
                  <div className="modal-body p-4 p-md-5">
                    <form className="row g-4">
                      <div className="col-md-6">
                        <label className="form-label fw-bold text-muted small mb-2">Patient</label>
                        <select className="form-select py-2.5 bg-light border-0">
                          <option>Select Patient</option>
                          <option>Alice Schmidt</option>
                          <option>Michael Scott</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold text-muted small mb-2">Doctor</label>
                        <select className="form-select py-2.5 bg-light border-0">
                          <option>Select Doctor</option>
                          <option>Dr. Sarah Jenkins</option>
                          <option>Dr. Michael Chen</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold text-muted small mb-2">Date</label>
                        <input type="date" className="form-control py-2.5 bg-light border-0" />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold text-muted small mb-2">Time</label>
                        <input type="time" className="form-control py-2.5 bg-light border-0" />
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-bold text-muted small mb-2">Reason for Visit</label>
                        <textarea className="form-control py-3 bg-light border-0" rows={3} placeholder="Briefly describe the reason for appointment..."></textarea>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer bg-light py-3 px-4 border-top-0">
                    <button type="button" className="btn btn-link text-muted fw-bold text-decoration-none px-4" onClick={() => setShowModal(false)}>Cancel</button>
                    <button type="button" className="btn text-white fw-bold px-4 py-2.5 rounded-3 shadow-sm d-flex align-items-center gap-2" style={{ backgroundColor: '#006a6a' }}>
                      Create Appointment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </ReceptionLayout>
  );
};