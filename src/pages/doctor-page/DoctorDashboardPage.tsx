import React from 'react';
import { DoctorLayout } from '../../components/layout/DoctorLayout';

export const DoctorDashboardPage: React.FC = () => {
  return (
    <DoctorLayout>
      <div className="mx-auto font-manrope" style={{ maxWidth: '1400px' }}>
        {/* Welcome Section */}
        <section className="mb-5">
          <h2 className="fw-bolder mb-1" style={{ color: '#001835' }}>Welcome back, Dr. Jenkins!</h2>
          <p className="text-muted fs-6 mb-0">Here is a quick overview of your clinic's status today.</p>
        </section>

        {/* Summary Cards Bento Layout */}
        <section className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white border-start border-4" style={{ borderColor: '#001835' }}>
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                  <i className="bi bi-calendar-check-fill fs-4" style={{ color: '#001835' }}></i>
                </div>
                <span className="badge bg-success-subtle text-success rounded-pill px-3 py-2 fw-bold">+2 from yesterday</span>
              </div>
              <p className="text-muted fw-bold text-uppercase mb-1" style={{ fontSize: '11px', letterSpacing: '1px' }}>Today's Appointments</p>
              <h1 className="fw-bolder mb-0 font-manrope" style={{ color: '#001835' }}>8</h1>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white border-start border-4" style={{ borderColor: '#006a6a' }}>
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                  <i className="bi bi-clipboard2-pulse-fill fs-4" style={{ color: '#006a6a' }}></i>
                </div>
                <span className="badge bg-danger-subtle text-danger rounded-pill px-3 py-2 fw-bold">High priority</span>
              </div>
              <p className="text-muted fw-bold text-uppercase mb-1" style={{ fontSize: '11px', letterSpacing: '1px' }}>Pending Reviews</p>
              <h1 className="fw-bolder mb-0 font-manrope" style={{ color: '#001835' }}>3</h1>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white border-start border-4" style={{ borderColor: '#455f87' }}>
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                  <i className="bi bi-people-fill fs-4" style={{ color: '#455f87' }}></i>
                </div>
                <span className="badge bg-light text-muted border rounded-pill px-3 py-2 fw-bold">Active this month</span>
              </div>
              <p className="text-muted fw-bold text-uppercase mb-1" style={{ fontSize: '11px', letterSpacing: '1px' }}>Total Patients</p>
              <h1 className="fw-bolder mb-0 font-manrope" style={{ color: '#001835' }}>120</h1>
            </div>
          </div>
        </section>

        <div className="row g-4">
          {/* Recent Patient Activity Table */}
          <div className="col-md-8">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100 bg-white">
              <div className="card-header bg-white border-bottom p-4 d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold font-manrope" style={{ color: '#001835' }}>Recent Patient Activity</h5>
                <button className="btn btn-link fw-bold text-decoration-none p-0" style={{ color: '#006a6a' }}>View All</button>
              </div>
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="py-3 px-4 text-muted text-uppercase fw-bold" style={{ fontSize: '11px', letterSpacing: '1px' }}>Name</th>
                      <th className="py-3 px-4 text-muted text-uppercase fw-bold" style={{ fontSize: '11px', letterSpacing: '1px' }}>Time</th>
                      <th className="py-3 px-4 text-muted text-uppercase fw-bold" style={{ fontSize: '11px', letterSpacing: '1px' }}>Status</th>
                      <th className="py-3 px-4 text-end text-muted text-uppercase fw-bold" style={{ fontSize: '11px', letterSpacing: '1px' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody className="border-top-0">
                    <tr>
                      <td className="px-4 py-4">
                        <div className="d-flex align-items-center gap-3">
                          <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white shadow-sm" style={{ width: '40px', height: '40px', backgroundColor: '#001835' }}>SM</div>
                          <span className="fw-bold" style={{ color: '#001835' }}>Sarah Miller</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-muted small fw-medium">09:30 AM</td>
                      <td className="px-4 py-4"><span className="badge rounded-pill px-3 py-2 fw-bold" style={{ backgroundColor: '#e6f4f4', color: '#006a6a' }}>Completed</span></td>
                      <td className="px-4 py-4 text-end"><button className="btn btn-link text-muted p-0"><i className="bi bi-three-dots-vertical"></i></button></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4">
                        <div className="d-flex align-items-center gap-3">
                          <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white shadow-sm" style={{ width: '40px', height: '40px', backgroundColor: '#006a6a' }}>JR</div>
                          <span className="fw-bold" style={{ color: '#001835' }}>James Robinson</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-muted small fw-medium">10:15 AM</td>
                      <td className="px-4 py-4"><span className="badge rounded-pill px-3 py-2 fw-bold" style={{ backgroundColor: '#f0f0f9', color: '#001835' }}>In-Progress</span></td>
                      <td className="px-4 py-4 text-end"><button className="btn btn-link text-muted p-0"><i className="bi bi-three-dots-vertical"></i></button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Upcoming Schedule */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
              <h5 className="mb-4 fw-bold font-manrope" style={{ color: '#001835' }}>Upcoming Schedule</h5>
              <div className="d-flex flex-column gap-3">
                <div className="d-flex align-items-start gap-3 p-3 bg-light rounded-3 border hover-bg-white transition-all cursor-pointer">
                  <div className="text-center bg-white shadow-sm rounded-2 py-2 px-3" style={{ minWidth: '60px' }}>
                    <p className="fw-bold mb-0" style={{ color: '#001835' }}>14:00</p>
                    <small className="text-muted fw-bold" style={{ fontSize: '10px' }}>PM</small>
                  </div>
                  <div className="flex-grow-1">
                    <p className="fw-bold mb-1" style={{ color: '#001835' }}>General Consultation</p>
                    <small className="text-muted d-block"><i className="bi bi-person me-1"></i>Robert Fox</small>
                  </div>
                  <i className="bi bi-chevron-right text-muted mt-2"></i>
                </div>
                <div className="d-flex align-items-start gap-3 p-3 bg-light rounded-3 border hover-bg-white transition-all cursor-pointer">
                  <div className="text-center bg-white shadow-sm rounded-2 py-2 px-3" style={{ minWidth: '60px' }}>
                    <p className="fw-bold mb-0" style={{ color: '#001835' }}>15:30</p>
                    <small className="text-muted fw-bold" style={{ fontSize: '10px' }}>PM</small>
                  </div>
                  <div className="flex-grow-1">
                    <p className="fw-bold mb-1" style={{ color: '#001835' }}>Follow-up: Surgery</p>
                    <small className="text-muted d-block"><i className="bi bi-person me-1"></i>Anna Wilson</small>
                  </div>
                  <i className="bi bi-chevron-right text-muted mt-2"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
};