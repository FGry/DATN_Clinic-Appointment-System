import React, { useState } from 'react';
import { ReceptionLayout } from '../components/layout/ReceptionLayout';

export const ReceptionDashboardPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <ReceptionLayout onOpenBookingModal={() => setShowModal(true)}>
      {/* Header & Controls */}
      <div className="d-flex justify-content-between align-items-end mb-4">
        <div>
          <h2 className="fw-bold mb-1">Daily Schedule</h2>
          <p className="text-muted mb-0">Manage and track patient appointments for today.</p>
        </div>
        <div className="bg-white border px-3 py-2 rounded-3 d-flex align-items-center gap-2 shadow-sm">
          <span className="material-symbols-outlined text-primary">event</span>
          <span className="fw-medium">October 24, 2023</span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100 p-3">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <span className="material-symbols-outlined text-primary bg-primary-subtle p-2 rounded">group</span>
              <span className="badge bg-success-subtle text-success">+12%</span>
            </div>
            <h3 className="fw-bold mb-1">42</h3>
            <small className="text-muted fw-semibold uppercase">Total Patients</small>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100 p-3">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <span className="material-symbols-outlined text-success bg-success-subtle p-2 rounded">check_circle</span>
            </div>
            <h3 className="fw-bold mb-1">12</h3>
            <small className="text-muted fw-semibold uppercase">Checked In</small>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100 p-3">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <span className="material-symbols-outlined text-warning bg-warning-subtle p-2 rounded">pending</span>
            </div>
            <h3 className="fw-bold mb-1">8</h3>
            <small className="text-muted fw-semibold uppercase">Pending</small>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100 p-3">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <span className="material-symbols-outlined text-danger bg-danger-subtle p-2 rounded">cancel</span>
            </div>
            <h3 className="fw-bold mb-1">3</h3>
            <small className="text-muted fw-semibold uppercase">Cancellations</small>
          </div>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold">Upcoming Appointments</h5>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="py-3 text-muted">Time</th>
                <th className="py-3 text-muted">Patient</th>
                <th className="py-3 text-muted">Service</th>
                <th className="py-3 text-muted">Doctor</th>
                <th className="py-3 text-muted">Status</th>
                <th className="py-3 text-muted text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}
              <tr>
                <td className="py-3">
                  <span className="fw-bold text-primary d-block fs-5">09:00</span>
                  <small className="text-muted">30 min</small>
                </td>
                <td>
                  <div className="fw-bold">James Wilson</div>
                  <small className="text-muted">PID: #882190</small>
                </td>
                <td><span className="badge bg-light text-dark border">Annual Checkup</span></td>
                <td>Dr. Sarah Jenkins</td>
                <td><span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-2">Confirmed</span></td>
                <td className="text-end">
                  <button className="btn btn-link text-primary fw-bold text-decoration-none p-0 me-3">Check-in</button>
                  <button className="btn btn-link text-muted fw-bold text-decoration-none p-0">Edit</button>
                </td>
              </tr>
              {/* Row 2 */}
              <tr>
                <td className="py-3">
                  <span className="fw-bold text-success d-block fs-5">09:30</span>
                  <small className="text-muted">15 min</small>
                </td>
                <td>
                  <div className="fw-bold">Maria Garcia</div>
                  <small className="text-muted">PID: #771204</small>
                </td>
                <td><span className="badge bg-light text-dark border">Follow-up</span></td>
                <td>Dr. Michael Chen</td>
                <td><span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3 py-2">Completed</span></td>
                <td className="text-end">
                  <button className="btn btn-link text-muted fw-bold text-decoration-none p-0">View</button>
                </td>
              </tr>
              {/* Row 3 */}
              <tr>
                <td className="py-3">
                  <span className="fw-bold text-secondary opacity-50 d-block fs-5">11:00</span>
                  <small className="text-muted opacity-50">30 min</small>
                </td>
                <td className="opacity-50">
                  <div className="fw-bold">Linda Henderson</div>
                  <small className="text-muted">PID: #665431</small>
                </td>
                <td className="opacity-50"><span className="badge bg-light text-dark border">Skin Screening</span></td>
                <td className="opacity-50">Dr. Sarah Jenkins</td>
                <td><span className="badge bg-danger-subtle text-danger border border-danger-subtle rounded-pill px-3 py-2">No-Show</span></td>
                <td className="text-end">
                  <button className="btn btn-link text-muted fw-bold text-decoration-none p-0">Reschedule</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Booking Modal --- */}
      {showModal && (
        <>
          <div className="modal-backdrop fade show" style={{ backdropFilter: 'blur(4px)' }}></div>
          <div className="modal fade show d-block" tabIndex={-1} role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
                <div className="modal-header bg-light border-bottom-0 py-4 px-4">
                  <h4 className="modal-title fw-bold">Book New Appointment</h4>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body p-4">
                  <form className="row g-4">
                    <div className="col-12">
                      <label className="form-label fw-semibold">Patient Name</label>
                      <div className="input-group">
                        <span className="input-group-text bg-white"><span className="material-symbols-outlined text-muted">person</span></span>
                        <input type="text" className="form-control py-2" placeholder="Search or enter patient name" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Specialty</label>
                      <select className="form-select py-2">
                        <option>Select Specialty</option>
                        <option>Cardiology</option>
                        <option>Pediatrics</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Preferred Doctor</label>
                      <select className="form-select py-2">
                        <option>Select Doctor</option>
                        <option>Dr. Sarah Jenkins</option>
                        <option>Dr. Michael Chen</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Date</label>
                      <input type="date" className="form-control py-2" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Time</label>
                      <input type="time" className="form-control py-2" />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-semibold">Reason for Visit</label>
                      <textarea className="form-control" rows={3} placeholder="Briefly describe the reason for appointment..."></textarea>
                    </div>
                  </form>
                </div>
                <div className="modal-footer bg-light border-top-0 py-3 px-4">
                  <button type="button" className="btn btn-light fw-medium px-4" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="button" className="btn btn-primary fw-medium px-4">Create Appointment</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </ReceptionLayout>
  );
};