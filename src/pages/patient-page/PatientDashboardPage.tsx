import React from 'react';
import { PatientLayout } from '../../components/layout/PatientLayout';

export const PatientDashboardPage: React.FC = () => {
  return (
    <PatientLayout>
      <div className="mx-auto" style={{ maxWidth: '1400px' }}>
        {/* Welcome Header */}
        <section className="mb-5">
          <h2 className="fw-bolder font-manrope text-dark mb-2">Welcome back, Alex!</h2>
          <p className="text-muted fs-6">You have 2 appointments scheduled for this week. Stay healthy!</p>
        </section>

        {/* Find a Doctor & Doctor Cards */}
        <section className="mb-5">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
            <h3 className="fw-bolder font-manrope m-0">Find a Doctor</h3>
            <div className="d-flex gap-3">
              <div className="input-group" style={{ width: '250px' }}>
                <span className="input-group-text bg-white"><i className="bi bi-search text-muted"></i></span>
                <input type="text" className="form-control border-start-0" placeholder="Doctor name..." />
              </div>
              <select className="form-select" style={{ width: '200px' }}>
                <option>All Specialties</option>
                <option>Cardiology</option>
                <option>Dermatology</option>
                <option>Pediatrics</option>
              </select>
            </div>
          </div>

          <div className="row g-4">
            {/* Doctor Card 1 */}
            <div className="col-md-4">
              <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                    <i className="bi bi-person-fill fs-4"></i>
                  </div>
                  <div>
                    <h5 className="fw-bold mb-0 text-dark">Dr. Sarah Smith</h5>
                    <small className="text-primary fw-semibold">Cardiology</small>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-muted small mb-2"><i className="bi bi-calendar3 me-2"></i>Mon, Wed, Fri</p>
                  <p className="text-muted small mb-0"><i className="bi bi-clock me-2"></i>09:00 AM - 04:00 PM</p>
                </div>
                <button className="btn btn-primary w-100 fw-bold rounded-3 mt-auto">Book Appointment</button>
              </div>
            </div>
            
            {/* Doctor Card 2 */}
            <div className="col-md-4">
              <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="bg-warning-subtle text-warning rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                    <i className="bi bi-person-fill fs-4"></i>
                  </div>
                  <div>
                    <h5 className="fw-bold mb-0 text-dark">Dr. James Wilson</h5>
                    <small className="text-warning fw-semibold">Dermatology</small>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-muted small mb-2"><i className="bi bi-calendar3 me-2"></i>Tue, Thu, Sat</p>
                  <p className="text-muted small mb-0"><i className="bi bi-clock me-2"></i>10:00 AM - 05:00 PM</p>
                </div>
                <button className="btn btn-primary w-100 fw-bold rounded-3 mt-auto">Book Appointment</button>
              </div>
            </div>

            {/* Doctor Card 3 */}
            <div className="col-md-4">
              <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                    <i className="bi bi-person-fill fs-4"></i>
                  </div>
                  <div>
                    <h5 className="fw-bold mb-0 text-dark">Dr. Emily Chen</h5>
                    <small className="text-success fw-semibold">Pediatrics</small>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-muted small mb-2"><i className="bi bi-calendar3 me-2"></i>Mon - Fri</p>
                  <p className="text-muted small mb-0"><i className="bi bi-clock me-2"></i>08:30 AM - 03:30 PM</p>
                </div>
                <button className="btn btn-primary w-100 fw-bold rounded-3 mt-auto">Book Appointment</button>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Appointments */}
        <section className="card border-0 shadow-sm rounded-4 overflow-hidden">
          <div className="card-header bg-white border-bottom p-4 d-flex justify-content-between align-items-center">
            <h4 className="fw-bold font-manrope m-0">Recent Appointments</h4>
            <button className="btn btn-link text-primary fw-bold text-decoration-none p-0">View All</button>
          </div>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="py-3 px-4 text-muted fw-bold">Date</th>
                  <th className="py-3 px-4 text-muted fw-bold">Doctor</th>
                  <th className="py-3 px-4 text-muted fw-bold">Specialty</th>
                  <th className="py-3 px-4 text-muted fw-bold">Status</th>
                  <th className="py-3 px-4 text-end"></th>
                </tr>
              </thead>
              <tbody className="border-top-0">
                <tr>
                  <td className="px-4 py-3 text-dark">Oct 24, 2023</td>
                  <td className="px-4 py-3 fw-bold text-dark">Dr. Sarah Smith</td>
                  <td className="px-4 py-3"><span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">Cardiology</span></td>
                  <td className="px-4 py-3">
                    <span className="text-success fw-bold small text-uppercase d-flex align-items-center gap-2">
                      <span className="bg-success rounded-circle" style={{ width: '8px', height: '8px' }}></span> Upcoming
                    </span>
                  </td>
                  <td className="px-4 py-3 text-end"><button className="btn btn-link text-muted"><i className="bi bi-three-dots-vertical"></i></button></td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-dark">Oct 18, 2023</td>
                  <td className="px-4 py-3 fw-bold text-dark">Dr. James Wilson</td>
                  <td className="px-4 py-3"><span className="badge bg-warning-subtle text-warning rounded-pill px-3 py-2">Dermatology</span></td>
                  <td className="px-4 py-3">
                    <span className="text-muted fw-bold small text-uppercase d-flex align-items-center gap-2">
                      <span className="bg-secondary rounded-circle" style={{ width: '8px', height: '8px' }}></span> Completed
                    </span>
                  </td>
                  <td className="px-4 py-3 text-end"><button className="btn btn-link text-muted"><i className="bi bi-three-dots-vertical"></i></button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </PatientLayout>
  );
};