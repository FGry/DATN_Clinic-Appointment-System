import React from 'react';
import { DoctorLayout } from '../../components/layout/DoctorLayout';

export const DoctorPatientsPage: React.FC = () => {
  return (
    <DoctorLayout>
      <div className="mx-auto font-manrope" style={{ maxWidth: '1400px' }}>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 gap-3">
          <div>
            <h2 className="fw-bold font-manrope mb-1" style={{ color: '#001835' }}>Today's Patients</h2>
            <p className="text-muted mb-0">Danh sách bệnh nhân đăng ký khám trong ngày.</p>
          </div>
          <button className="btn fw-bold px-4 py-2 shadow-sm rounded-3 transition-all active-scale" style={{ backgroundColor: '#001835', color: '#white', border: 'none' }}>
            <i className="bi bi-file-earmark-arrow-down me-2"></i>Export List
          </button>
        </div>

        {/* Table Container */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-5 bg-white">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="px-4 py-3 text-muted text-uppercase fw-bold" style={{ fontSize: '11px', letterSpacing: '1px' }}>Time</th>
                  <th className="px-4 py-3 text-muted text-uppercase fw-bold" style={{ fontSize: '11px', letterSpacing: '1px' }}>Patient Name</th>
                  <th className="px-4 py-3 text-muted text-uppercase fw-bold" style={{ fontSize: '11px', letterSpacing: '1px' }}>Gender</th>
                  <th className="px-4 py-3 text-muted text-uppercase fw-bold" style={{ fontSize: '11px', letterSpacing: '1px' }}>Age</th>
                  <th className="px-4 py-3 text-muted text-uppercase fw-bold" style={{ fontSize: '11px', letterSpacing: '1px' }}>Status</th>
                  <th className="px-4 py-3 text-end text-muted text-uppercase fw-bold" style={{ fontSize: '11px', letterSpacing: '1px' }}>Actions</th>
                </tr>
              </thead>
              <tbody className="border-top-0">
                {/* Row 1 */}
                <tr>
                  <td className="px-4 py-4 fw-bold" style={{ color: '#001835' }}>08:30 AM</td>
                  <td className="px-4 py-4">
                    <div className="d-flex align-items-center gap-3">
                      <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white shadow-sm" style={{ width: '40px', height: '40px', backgroundColor: '#001835' }}>SA</div>
                      <span className="fw-bold" style={{ color: '#001835' }}>Sarah Adams</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-muted fw-medium">Female</td>
                  <td className="px-4 py-4 text-muted fw-medium">32</td>
                  <td className="px-4 py-4"><span className="badge bg-light text-muted border rounded-pill px-3 py-2 fw-bold">Completed</span></td>
                  <td className="px-4 py-4 text-end"><button className="btn btn-link text-muted p-0"><i className="bi bi-three-dots-vertical fs-5"></i></button></td>
                </tr>
                {/* Row 2 */}
                <tr>
                  <td className="px-4 py-4 fw-bold" style={{ color: '#001835' }}>09:15 AM</td>
                  <td className="px-4 py-4">
                    <div className="d-flex align-items-center gap-3">
                      <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white shadow-sm" style={{ width: '40px', height: '40px', backgroundColor: '#006a6a' }}>JM</div>
                      <span className="fw-bold" style={{ color: '#001835' }}>James Mitchell</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-muted fw-medium">Male</td>
                  <td className="px-4 py-4 text-muted fw-medium">45</td>
                  <td className="px-4 py-4"><span className="badge rounded-pill px-3 py-2 fw-bold" style={{ backgroundColor: '#e6f4f4', color: '#006a6a' }}>In-Progress</span></td>
                  <td className="px-4 py-4 text-end"><button className="btn btn-link text-muted p-0"><i className="bi bi-three-dots-vertical fs-5"></i></button></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="card-footer bg-white border-top p-4 d-flex justify-content-between align-items-center">
            <span className="text-muted small fw-medium">Showing 2 of 12 patients for today</span>
            <div className="d-flex gap-2">
              <button className="btn btn-sm btn-light border rounded-3 px-3 fw-bold text-muted" disabled>Prev</button>
              <button className="btn btn-sm btn-light border rounded-3 px-3 fw-bold text-dark hover-bg-light">Next</button>
            </div>
          </div>
        </div>

        {/* Quick Stats Bento Grid */}
        <div className="row g-4 mt-2">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white border-start border-4" style={{ borderColor: '#001835' }}>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                  <i className="bi bi-clock-history fs-4" style={{ color: '#001835' }}></i>
                </div>
                <span className="fw-bold text-uppercase" style={{ color: '#001835', fontSize: '11px', letterSpacing: '1px' }}>Wait Time</span>
              </div>
              <h2 className="fw-bolder font-manrope mb-1" style={{ color: '#001835' }}>14 min</h2>
              <small className="text-muted fw-medium">Average patient wait time</small>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white border-start border-4" style={{ borderColor: '#006a6a' }}>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                  <i className="bi bi-check-circle-fill fs-4" style={{ color: '#006a6a' }}></i>
                </div>
                <span className="fw-bold text-uppercase" style={{ color: '#006a6a', fontSize: '11px', letterSpacing: '1px' }}>Completed</span>
              </div>
              <h2 className="fw-bolder font-manrope mb-1" style={{ color: '#001835' }}>4/12</h2>
              <small className="text-muted fw-medium">Appointments finished today</small>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white border-start border-4" style={{ borderColor: '#455f87' }}>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                  <i className="bi bi-person-plus-fill fs-4" style={{ color: '#455f87' }}></i>
                </div>
                <span className="fw-bold text-uppercase" style={{ color: '#455f87', fontSize: '11px', letterSpacing: '1px' }}>New Cases</span>
              </div>
              <h2 className="fw-bolder font-manrope mb-1" style={{ color: '#001835' }}>3</h2>
              <small className="text-muted fw-medium">First-time consultations</small>
            </div>
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
};