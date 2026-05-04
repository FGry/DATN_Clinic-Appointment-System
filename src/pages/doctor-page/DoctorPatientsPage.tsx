import React from 'react';
import { DoctorLayout } from '../../components/layout/DoctorLayout';

export const DoctorPatientsPage: React.FC = () => {
  return (
    <DoctorLayout>
      <div className="mx-auto" style={{ maxWidth: '1200px' }}>
        <div className="d-flex justify-content-between align-items-end mb-4">
          <h2 className="fw-bold font-manrope mb-0 text-dark">Today's Patients</h2>
          <button className="btn btn-outline-secondary fw-bold px-4 py-2 shadow-sm rounded-3 bg-white text-dark">
            <i className="bi bi-file-earmark-arrow-down me-2"></i>Export List
          </button>
        </div>

        {/* Table Container */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-5">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="px-4 py-3 text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Time</th>
                  <th className="px-4 py-3 text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Patient Name</th>
                  <th className="px-4 py-3 text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Gender</th>
                  <th className="px-4 py-3 text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Age</th>
                  <th className="px-4 py-3 text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Status</th>
                  <th className="px-4 py-3 text-end text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Actions</th>
                </tr>
              </thead>
              <tbody className="border-top-0">
                {/* Row 1 */}
                <tr>
                  <td className="px-4 py-3 fw-medium text-dark">08:30 AM</td>
                  <td className="px-4 py-3">
                    <div className="d-flex align-items-center gap-3">
                      <div className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '32px', height: '32px', fontSize: '12px' }}>SA</div>
                      <span className="fw-bold text-dark">Sarah Adams</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted">Female</td>
                  <td className="px-4 py-3 text-muted">32</td>
                  <td className="px-4 py-3"><span className="badge bg-light text-dark border rounded-pill px-3 py-1 fw-medium">Completed</span></td>
                  <td className="px-4 py-3 text-end"><button className="btn btn-link text-muted p-0"><i className="bi bi-three-dots-vertical"></i></button></td>
                </tr>
                {/* Row 2 */}
                <tr>
                  <td className="px-4 py-3 fw-medium text-dark">09:15 AM</td>
                  <td className="px-4 py-3">
                    <div className="d-flex align-items-center gap-3">
                      <div className="bg-warning-subtle text-warning rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '32px', height: '32px', fontSize: '12px' }}>JM</div>
                      <span className="fw-bold text-dark">James Mitchell</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted">Male</td>
                  <td className="px-4 py-3 text-muted">45</td>
                  <td className="px-4 py-3"><span className="badge bg-success text-white rounded-pill px-3 py-1 fw-medium">In-Progress</span></td>
                  <td className="px-4 py-3 text-end"><button className="btn btn-link text-muted p-0"><i className="bi bi-three-dots-vertical"></i></button></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="card-footer bg-light border-top p-3 d-flex justify-content-between align-items-center">
            <span className="text-muted small">Showing 2 of 12 patients for today</span>
            <div className="d-flex gap-2">
              <button className="btn btn-sm btn-white border rounded-3 p-2 text-muted" disabled><i className="bi bi-chevron-left"></i></button>
              <button className="btn btn-sm btn-white border rounded-3 p-2 text-dark"><i className="bi bi-chevron-right"></i></button>
            </div>
          </div>
        </div>

        {/* Quick Stats Bento Grid */}
        <div className="row g-4 mt-2">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="bg-primary-subtle text-primary p-2 rounded-3"><i className="bi bi-clock-history fs-5"></i></div>
                <span className="text-primary fw-bold text-uppercase" style={{ fontSize: '11px', letterSpacing: '1px' }}>Wait Time</span>
              </div>
              <h2 className="fw-bolder font-manrope mb-1">14 min</h2>
              <small className="text-muted">Average patient wait time</small>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="bg-success-subtle text-success p-2 rounded-3"><i className="bi bi-check-circle fs-5"></i></div>
                <span className="text-success fw-bold text-uppercase" style={{ fontSize: '11px', letterSpacing: '1px' }}>Completed</span>
              </div>
              <h2 className="fw-bolder font-manrope mb-1">4/12</h2>
              <small className="text-muted">Appointments finished today</small>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="bg-info-subtle text-info p-2 rounded-3"><i className="bi bi-person-plus-fill fs-5"></i></div>
                <span className="text-info fw-bold text-uppercase" style={{ fontSize: '11px', letterSpacing: '1px' }}>New Cases</span>
              </div>
              <h2 className="fw-bolder font-manrope mb-1">3</h2>
              <small className="text-muted">First-time consultations</small>
            </div>
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
};