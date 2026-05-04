import React, { useState } from 'react';
import { PatientLayout } from '../../components/layout/PatientLayout';

export const PatientAppointmentsPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <PatientLayout onOpenBookingModal={() => setShowModal(true)}>
      <div className="mx-auto" style={{ maxWidth: '1200px' }}>
        <div className="mb-5">
          <h2 className="fw-bolder font-manrope text-dark mb-2">My Appointments</h2>
          <p className="text-muted">Manage your scheduled visits and clinical history with MedClinic specialists.</p>
        </div>

        {/* Filter Section */}
        <div className="card border-0 shadow-sm rounded-4 p-4 mb-5">
          <div className="d-flex flex-wrap align-items-center gap-4">
            <div className="d-flex align-items-center gap-2 text-muted fw-bold">
              <i className="bi bi-funnel fs-5"></i>
              <span>Filter by History</span>
            </div>
            <div className="d-flex gap-3 flex-grow-1">
              <div>
                <label className="form-label small text-muted mb-1">Day</label>
                <select className="form-select bg-light border-0"><option>All Days</option><option>01 - 10</option></select>
              </div>
              <div>
                <label className="form-label small text-muted mb-1">Month</label>
                <select className="form-select bg-light border-0"><option>September 2024</option><option>August 2024</option></select>
              </div>
              <div>
                <label className="form-label small text-muted mb-1">Year</label>
                <select className="form-select bg-light border-0"><option>2024</option><option>2023</option></select>
              </div>
            </div>
            <button className="btn btn-outline-primary fw-bold px-4 rounded-3 mt-auto">Clear Filters</button>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="py-3 px-4 text-muted font-manrope fw-bold">Date</th>
                  <th className="py-3 px-4 text-muted font-manrope fw-bold">Time</th>
                  <th className="py-3 px-4 text-muted font-manrope fw-bold">Doctor</th>
                  <th className="py-3 px-4 text-muted font-manrope fw-bold">Specialty</th>
                  <th className="py-3 px-4 text-muted font-manrope fw-bold">Status</th>
                  <th className="py-3 px-4 text-end"></th>
                </tr>
              </thead>
              <tbody className="border-top-0">
                <tr className="cursor-pointer">
                  <td className="px-4 py-3">
                    <p className="font-manrope fw-bold text-dark mb-0">Sep 24, 2024</p>
                    <small className="text-muted">In 2 days</small>
                  </td>
                  <td className="px-4 py-3 text-muted">09:30 AM</td>
                  <td className="px-4 py-3">
                    <div className="d-flex align-items-center gap-3">
                      <img src="https://placehold.co/32x32" alt="Doc" className="rounded-circle" />
                      <span className="font-manrope fw-bold text-dark">Dr. Sarah Mitchell</span>
                    </div>
                  </td>
                  <td className="px-4 py-3"><span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">Cardiology</span></td>
                  <td className="px-4 py-3">
                    <span className="text-success fw-bold small d-flex align-items-center gap-2">
                      <span className="bg-success rounded-circle" style={{ width: '8px', height: '8px' }}></span> Confirmed
                    </span>
                  </td>
                  <td className="px-4 py-3 text-end"><i className="bi bi-chevron-right text-muted"></i></td>
                </tr>
                <tr className="cursor-pointer">
                  <td className="px-4 py-3">
                    <p className="font-manrope fw-bold text-dark mb-0">Sep 28, 2024</p>
                    <small className="text-muted">Next week</small>
                  </td>
                  <td className="px-4 py-3 text-muted">02:15 PM</td>
                  <td className="px-4 py-3">
                    <div className="d-flex align-items-center gap-3">
                      <img src="https://placehold.co/32x32" alt="Doc" className="rounded-circle" />
                      <span className="font-manrope fw-bold text-dark">Dr. James Wilson</span>
                    </div>
                  </td>
                  <td className="px-4 py-3"><span className="badge bg-light text-dark border rounded-pill px-3 py-2">Dermatology</span></td>
                  <td className="px-4 py-3">
                    <span className="text-warning fw-bold small d-flex align-items-center gap-2">
                      <span className="bg-warning rounded-circle" style={{ width: '8px', height: '8px' }}></span> Pending
                    </span>
                  </td>
                  <td className="px-4 py-3 text-end"><i className="bi bi-chevron-right text-muted"></i></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* --- Booking Modal --- */}
      {showModal && (
        <>
          <div className="modal-backdrop fade show" style={{ backdropFilter: 'blur(4px)' }}></div>
          <div className="modal fade show d-block" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
                <div className="modal-header bg-white py-4 px-4 border-bottom">
                  <h4 className="modal-title font-manrope fw-bolder text-primary">Book New Appointment</h4>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body p-4 px-md-5">
                  <form className="row g-4">
                    <div className="col-12">
                      <label className="form-label fw-bold text-muted">Patient Name</label>
                      <input type="text" className="form-control bg-light py-2 fw-medium text-dark" value="Alex Nguyen" disabled readOnly />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold text-muted">Specialty</label>
                      <select className="form-select py-2">
                        <option>Select Specialty</option>
                        <option value="cardiology">Cardiology</option>
                        <option value="dermatology">Dermatology</option>
                        <option value="pediatrics">Pediatrics</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold text-muted">Preferred Doctor</label>
                      <select className="form-select py-2">
                        <option>Select Doctor</option>
                        <option>Dr. Sarah Jenkins</option>
                        <option>Dr. Michael Chen</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold text-muted">Appointment Date</label>
                      <div className="input-group">
                        <span className="input-group-text bg-white"><i className="bi bi-calendar3"></i></span>
                        <input type="date" className="form-control py-2 border-start-0" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold text-muted">Preferred Time</label>
                      <div className="input-group">
                        <span className="input-group-text bg-white"><i className="bi bi-clock"></i></span>
                        <select className="form-select py-2 border-start-0">
                          <option>Select Time</option>
                          <option>09:00 AM</option>
                          <option>10:30 AM</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-bold text-muted">Reason for Visit</label>
                      <textarea className="form-control" rows={3} placeholder="Please describe any symptoms or specific concerns..."></textarea>
                    </div>
                    <div className="col-12">
                      <div className="bg-info-subtle border border-info-subtle text-info-emphasis p-3 rounded-3 d-flex gap-3">
                        <i className="bi bi-info-circle-fill"></i>
                        <small>Please arrive 15 minutes before your scheduled time for initial vitals screening.</small>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer bg-light py-3 px-4 border-top-0">
                  <button type="button" className="btn btn-link text-primary fw-bold text-decoration-none px-4" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="button" className="btn btn-primary fw-bold px-4 rounded-3 d-flex align-items-center gap-2">
                    Create Appointment <i className="bi bi-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </PatientLayout>
  );
};