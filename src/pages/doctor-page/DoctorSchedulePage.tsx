import React from 'react';
import { DoctorLayout } from '../../components/layout/DoctorLayout';

export const DoctorSchedulePage: React.FC = () => {
  return (
    <DoctorLayout>
      <div className="mx-auto font-manrope" style={{ maxWidth: '1400px' }}>
        {/* Date & Filters Header */}
        <section className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 bg-white p-4 rounded-4 shadow-sm border-0 mb-4">
          <div>
            <h3 className="fw-bolder font-manrope mb-3" style={{ color: '#001835' }}>Daily Schedule</h3>
            <div className="d-flex align-items-center gap-3">
              <button className="btn btn-light border p-2 d-flex align-items-center rounded-3"><i className="bi bi-chevron-left"></i></button>
              <div className="d-flex align-items-center gap-2 bg-light px-4 py-2 rounded-3">
                <i className="bi bi-calendar-event fs-5" style={{ color: '#006a6a' }}></i>
                <span className="fw-bolder fs-5" style={{ color: '#001835' }}>October 24, 2024</span>
              </div>
              <button className="btn btn-light border p-2 d-flex align-items-center rounded-3"><i className="bi bi-chevron-right"></i></button>
            </div>
          </div>
          <div>
            <select className="form-select bg-light border-0 rounded-3 py-3 fw-bold text-dark shadow-sm cursor-pointer" style={{ width: '220px' }}>
              <option>All Appointment Types</option>
              <option>Consultation</option>
              <option>Follow-up</option>
              <option>Surgery</option>
            </select>
          </div>
        </section>

        {/* Table Section */}
        <section className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4 bg-white">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="px-4 py-3 text-muted text-uppercase fw-bold" style={{ fontSize: '11px', letterSpacing: '1px' }}>Time</th>
                  <th className="px-4 py-3 text-muted text-uppercase fw-bold" style={{ fontSize: '11px', letterSpacing: '1px' }}>Patient Name</th>
                  <th className="px-4 py-3 text-muted text-uppercase fw-bold" style={{ fontSize: '11px', letterSpacing: '1px' }}>Service/Type</th>
                  <th className="px-4 py-3 text-muted text-uppercase fw-bold" style={{ fontSize: '11px', letterSpacing: '1px' }}>Status</th>
                  <th className="px-4 py-3 text-end text-muted text-uppercase fw-bold" style={{ fontSize: '11px', letterSpacing: '1px' }}>Actions</th>
                </tr>
              </thead>
              <tbody className="border-top-0">
                {/* Row 1 */}
                <tr>
                  <td className="px-4 py-4">
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-clock-fill" style={{ color: '#006a6a' }}></i>
                      <span className="fw-bolder" style={{ color: '#001835' }}>09:00 AM</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="d-flex align-items-center gap-3">
                      <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white shadow-sm" style={{ width: '40px', height: '40px', backgroundColor: '#001835' }}>AS</div>
                      <span className="fw-bold text-dark">Alice Schmidt</span>
                    </div>
                  </td>
                  <td className="px-4 py-4"><span className="badge bg-light text-muted border rounded-pill px-3 py-2 fw-bold">Initial Consultation</span></td>
                  <td className="px-4 py-4">
                    <span className="badge rounded-pill px-3 py-2 d-inline-flex align-items-center gap-2 fw-bold" style={{ backgroundColor: '#f0f0f9', color: '#001835' }}>
                      <span className="rounded-circle" style={{ width: '6px', height: '6px', backgroundColor: '#001835' }}></span> Confirmed
                    </span>
                  </td>
                  <td className="px-4 py-4 text-end">
                    <button className="btn btn-link fw-bold text-decoration-none p-0 hover-opacity" style={{ color: '#006a6a' }}>View Details</button>
                  </td>
                </tr>
                {/* Row 2 */}
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <td className="px-4 py-4">
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-clock-fill text-muted"></i>
                      <span className="fw-bold text-muted text-decoration-line-through">08:00 AM</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="d-flex align-items-center gap-3">
                      <img src="https://placehold.co/40x40" alt="Patient" className="rounded-circle border shadow-sm" />
                      <span className="fw-bold text-muted">Sarah Connor</span>
                    </div>
                  </td>
                  <td className="px-4 py-4"><span className="badge bg-white text-muted border rounded-pill px-3 py-2 fw-bold">Check-up</span></td>
                  <td className="px-4 py-4">
                    <span className="badge rounded-pill px-3 py-2 d-inline-flex align-items-center gap-2 fw-bold" style={{ backgroundColor: '#e6f4f4', color: '#006a6a' }}>
                      <i className="bi bi-check-circle-fill"></i> Completed
                    </span>
                  </td>
                  <td className="px-4 py-4 text-end">
                    <button className="btn btn-link text-muted fw-bold text-decoration-none p-0 hover-opacity">Summary</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="row g-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center gap-4 bg-white border-start border-4" style={{ borderColor: '#001835' }}>
              <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '56px', height: '56px' }}>
                <i className="bi bi-people-fill fs-3" style={{ color: '#001835' }}></i>
              </div>
              <div>
                <p className="text-muted fw-bold mb-1 text-uppercase" style={{ fontSize: '11px', letterSpacing: '1px' }}>Remaining</p>
                <h3 className="fw-bolder mb-0 font-manrope" style={{ color: '#001835' }}>7 Patients</h3>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center gap-4 bg-white border-start border-4" style={{ borderColor: '#006a6a' }}>
              <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '56px', height: '56px' }}>
                <i className="bi bi-check-circle-fill fs-3" style={{ color: '#006a6a' }}></i>
              </div>
              <div>
                <p className="text-muted fw-bold mb-1 text-uppercase" style={{ fontSize: '11px', letterSpacing: '1px' }}>Completed</p>
                <h3 className="fw-bolder mb-0 font-manrope" style={{ color: '#001835' }}>4 Done</h3>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center gap-4 bg-white border-start border-4" style={{ borderColor: '#455f87' }}>
              <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '56px', height: '56px' }}>
                <i className="bi bi-stopwatch-fill fs-3" style={{ color: '#455f87' }}></i>
              </div>
              <div>
                <p className="text-muted fw-bold mb-1 text-uppercase" style={{ fontSize: '11px', letterSpacing: '1px' }}>Avg. Time</p>
                <h3 className="fw-bolder mb-0 font-manrope" style={{ color: '#001835' }}>22 mins</h3>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DoctorLayout>
  );
};