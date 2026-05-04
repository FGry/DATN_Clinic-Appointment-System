import React from 'react';
import { DoctorLayout } from '../../components/layout/DoctorLayout';

export const DoctorSchedulePage: React.FC = () => {
  return (
    <DoctorLayout>
      <div className="mx-auto" style={{ maxWidth: '1200px' }}>
        {/* Date & Filters Header */}
        <section className="d-flex flex-column flex-md-row align-items-md-end justify-content-between gap-3 bg-white p-4 rounded-4 shadow-sm border mb-4">
          <div>
            <h3 className="fw-bold font-manrope mb-3">Daily Schedule</h3>
            <div className="d-flex align-items-center gap-3">
              <button className="btn btn-outline-secondary p-2 d-flex align-items-center rounded-3"><i className="bi bi-chevron-left"></i></button>
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-calendar-event text-primary fs-5"></i>
                <span className="fw-bold fs-5">October 24, 2023</span>
              </div>
              <button className="btn btn-outline-secondary p-2 d-flex align-items-center rounded-3"><i className="bi bi-chevron-right"></i></button>
            </div>
          </div>
          <div>
            <select className="form-select border rounded-3 py-2 fw-semibold text-muted shadow-sm cursor-pointer" style={{ width: '200px' }}>
              <option>All Types</option>
              <option>Consultation</option>
              <option>Follow-up</option>
              <option>Surgery</option>
            </select>
          </div>
        </section>

        {/* Table Section */}
        <section className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="px-4 py-3 text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Time</th>
                  <th className="px-4 py-3 text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Patient Name</th>
                  <th className="px-4 py-3 text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Service/Type</th>
                  <th className="px-4 py-3 text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Status</th>
                  <th className="px-4 py-3 text-end text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Actions</th>
                </tr>
              </thead>
              <tbody className="border-top-0">
                {/* Row 1 */}
                <tr>
                  <td className="px-4 py-4">
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-clock text-primary"></i>
                      <span className="fw-bold">09:00 AM</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="d-flex align-items-center gap-3">
                      <div className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '32px', height: '32px', fontSize: '12px' }}>AS</div>
                      <span className="fw-medium">Alice Schmidt</span>
                    </div>
                  </td>
                  <td className="px-4 py-4"><span className="badge bg-light text-dark border rounded-pill px-3 py-2 fw-semibold">Initial Consultation</span></td>
                  <td className="px-4 py-4">
                    <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-2 d-inline-flex align-items-center gap-2">
                      <span className="bg-primary rounded-circle" style={{ width: '6px', height: '6px' }}></span> Confirmed
                    </span>
                  </td>
                  <td className="px-4 py-4 text-end"><button className="btn btn-link text-primary fw-bold text-decoration-none p-0 hover-underline">View Details</button></td>
                </tr>
                {/* Row 2 */}
                <tr className="bg-success-subtle bg-opacity-10 opacity-75">
                  <td className="px-4 py-4">
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-clock"></i>
                      <span className="fw-bold">08:00 AM</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="d-flex align-items-center gap-3">
                      <img src="https://placehold.co/32x32" alt="Patient" className="rounded-circle" />
                      <span className="fw-medium">Sarah Connor</span>
                    </div>
                  </td>
                  <td className="px-4 py-4"><span className="badge bg-light text-dark border rounded-pill px-3 py-2 fw-semibold">Check-up</span></td>
                  <td className="px-4 py-4">
                    <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3 py-2 d-inline-flex align-items-center gap-2">
                      <i className="bi bi-check-circle-fill"></i> Completed
                    </span>
                  </td>
                  <td className="px-4 py-4 text-end"><button className="btn btn-link text-muted fw-bold text-decoration-none p-0">Summary</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="row g-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center gap-4">
              <div className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                <i className="bi bi-people-fill fs-4"></i>
              </div>
              <div>
                <p className="text-muted fw-bold mb-1 text-uppercase" style={{ fontSize: '11px', letterSpacing: '1px' }}>Remaining</p>
                <h4 className="fw-bold mb-0 font-manrope">7 Patients</h4>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center gap-4">
              <div className="bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                <i className="bi bi-check-circle-fill fs-4"></i>
              </div>
              <div>
                <p className="text-muted fw-bold mb-1 text-uppercase" style={{ fontSize: '11px', letterSpacing: '1px' }}>Completed</p>
                <h4 className="fw-bold mb-0 font-manrope">4 Done</h4>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center gap-4">
              <div className="bg-warning-subtle text-warning rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                <i className="bi bi-stopwatch-fill fs-4"></i>
              </div>
              <div>
                <p className="text-muted fw-bold mb-1 text-uppercase" style={{ fontSize: '11px', letterSpacing: '1px' }}>Avg. Time</p>
                <h4 className="fw-bold mb-0 font-manrope">22 mins</h4>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DoctorLayout>
  );
};