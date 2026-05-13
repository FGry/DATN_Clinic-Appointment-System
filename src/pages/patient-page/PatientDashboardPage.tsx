import React from 'react';
import { PatientLayout } from '../../components/layout/PatientLayout';

export const PatientDashboardPage: React.FC = () => {
  return (
    <PatientLayout>
      <div className="mx-auto font-manrope" style={{ maxWidth: '1400px' }}>
        {/* Welcome Header */}
        <section className="mb-5">
          <h2 className="fw-bolder mb-2" style={{ color: '#001835' }}>Welcome back, Alex!</h2>
          <p className="text-muted fs-6">You have 2 appointments scheduled for this week. Stay healthy!</p>
        </section>

        {/* Find a Doctor & Quick Search */}
        <section className="mb-5">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
            <h3 className="fw-bolder m-0" style={{ color: '#001835' }}>Find a Doctor</h3>
            <div className="d-flex gap-3">
              <div className="input-group shadow-sm rounded-pill overflow-hidden border bg-white" style={{ width: '250px' }}>
                <span className="input-group-text bg-white border-0"><i className="bi bi-search text-muted"></i></span>
                <input type="text" className="form-control border-0 bg-white shadow-none" placeholder="Doctor name..." />
              </div>
              <select className="form-select shadow-sm rounded-pill border bg-white text-muted fw-medium" style={{ width: '200px' }}>
                <option>All Specialties</option>
                <option>Cardiology</option>
                <option>Neurology</option>
                <option>Pediatrics</option>
              </select>
            </div>
          </div>

          {/* Quick Actions (Bento Style) */}
          <div className="row g-4">
            <div className="col-md-3">
              <div className="card border-0 shadow-sm rounded-4 p-4 text-center h-100 hover-border-st-secondary transition-all cursor-pointer bg-white">
                <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '56px', height: '56px', backgroundColor: 'rgba(0, 24, 53, 0.1)' }}>
                  <i className="bi bi-calendar-plus fs-3" style={{ color: '#001835' }}></i>
                </div>
                <h6 className="fw-bold mb-1" style={{ color: '#001835' }}>Book Appointment</h6>
                <small className="text-muted">Schedule a new visit</small>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-0 shadow-sm rounded-4 p-4 text-center h-100 hover-border-st-secondary transition-all cursor-pointer bg-white">
                <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '56px', height: '56px', backgroundColor: 'rgba(0, 106, 106, 0.1)' }}>
                  <i className="bi bi-file-earmark-medical fs-3" style={{ color: '#006a6a' }}></i>
                </div>
                <h6 className="fw-bold mb-1" style={{ color: '#001835' }}>View Results</h6>
                <small className="text-muted">Lab & Test reports</small>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-0 shadow-sm rounded-4 p-4 text-center h-100 hover-border-st-secondary transition-all cursor-pointer bg-white">
                <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '56px', height: '56px', backgroundColor: 'rgba(69, 95, 135, 0.1)' }}>
                  <i className="bi bi-credit-card fs-3" style={{ color: '#455f87' }}></i>
                </div>
                <h6 className="fw-bold mb-1" style={{ color: '#001835' }}>Billing & Payments</h6>
                <small className="text-muted">Manage invoices</small>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-0 shadow-sm rounded-4 p-4 text-center h-100 hover-border-st-secondary transition-all cursor-pointer bg-white">
                <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '56px', height: '56px', backgroundColor: '#f0f0f9' }}>
                  <i className="bi bi-capsule fs-3 text-secondary"></i>
                </div>
                <h6 className="fw-bold mb-1" style={{ color: '#001835' }}>Prescriptions</h6>
                <small className="text-muted">Active medications</small>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Appointments Table */}
        <section>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bolder m-0" style={{ color: '#001835' }}>Upcoming Appointments</h3>
            <button className="btn btn-link text-decoration-none fw-bold p-0" style={{ color: '#006a6a' }}>View All</button>
          </div>
          
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
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
                <tr>
                  <td className="px-4 py-4 fw-bold" style={{ color: '#001835' }}>Oct 24, 2023 • 10:00 AM</td>
                  <td className="px-4 py-4">
                    <div className="d-flex align-items-center gap-3">
                      <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white shadow-sm" style={{ width: '36px', height: '36px', backgroundColor: '#001835' }}>SM</div>
                      <span className="fw-bold text-dark">Dr. Sarah Mitchell</span>
                    </div>
                  </td>
                  <td className="px-4 py-4"><span className="badge rounded-pill px-3 py-2 fw-bold text-uppercase" style={{ backgroundColor: '#e6f4f4', color: '#006a6a', fontSize: '10px' }}>Cardiology</span></td>
                  <td className="px-4 py-4">
                    <span className="d-inline-flex align-items-center gap-2 small fw-bold text-success">
                      <span className="bg-success rounded-circle" style={{ width: '8px', height: '8px' }}></span> Upcoming
                    </span>
                  </td>
                  <td className="px-4 py-4 text-end"><button className="btn btn-link text-muted p-0"><i className="bi bi-three-dots-vertical fs-5"></i></button></td>
                </tr>
                <tr>
                  <td className="px-4 py-4 fw-bold text-muted">Oct 18, 2023 • 14:30 PM</td>
                  <td className="px-4 py-4">
                     <div className="d-flex align-items-center gap-3">
                      <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white shadow-sm" style={{ width: '36px', height: '36px', backgroundColor: '#455f87' }}>JW</div>
                      <span className="fw-bold text-dark">Dr. James Wilson</span>
                    </div>
                  </td>
                  <td className="px-4 py-4"><span className="badge rounded-pill px-3 py-2 fw-bold text-uppercase" style={{ backgroundColor: '#f0f0f9', color: '#001835', fontSize: '10px' }}>Dermatology</span></td>
                  <td className="px-4 py-4">
                    <span className="d-inline-flex align-items-center gap-2 small fw-bold text-muted">
                      <span className="bg-secondary rounded-circle" style={{ width: '8px', height: '8px' }}></span> Completed
                    </span>
                  </td>
                  <td className="px-4 py-4 text-end"><button className="btn btn-link text-muted p-0"><i className="bi bi-three-dots-vertical fs-5"></i></button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </PatientLayout>
  );
};