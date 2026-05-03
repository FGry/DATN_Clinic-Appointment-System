import React from 'react';
import { DoctorLayout } from '../components/layout/DoctorLayout';

export const DoctorDashboardPage: React.FC = () => {
  return (
    <DoctorLayout>
      {/* Welcome Section */}
      <section className="mb-5">
        <h2 className="fw-bolder text-primary font-manrope">Welcome back, Dr. Jenkins!</h2>
        <p className="text-muted fs-6">Here is a quick overview of your clinic's status today.</p>
      </section>

      {/* Summary Cards Bento Layout */}
      <section className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
            <div className="d-flex justify-content-between align-items-start mb-4">
              <div className="bg-primary-subtle text-primary p-2 rounded-3 d-inline-flex">
                <i className="bi bi-calendar-check-fill fs-5"></i>
              </div>
              <small className="text-secondary fw-medium">+2 from yesterday</small>
            </div>
            <p className="text-muted fw-bold text-uppercase mb-1" style={{ fontSize: '11px', letterSpacing: '1px' }}>Today's Appointments</p>
            <h1 className="fw-bolder mb-0 font-manrope">8</h1>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
            <div className="d-flex justify-content-between align-items-start mb-4">
              <div className="bg-warning-subtle text-warning p-2 rounded-3 d-inline-flex">
                <i className="bi bi-clipboard2-pulse-fill fs-5"></i>
              </div>
              <small className="text-danger fw-medium">High priority</small>
            </div>
            <p className="text-muted fw-bold text-uppercase mb-1" style={{ fontSize: '11px', letterSpacing: '1px' }}>Pending Reviews</p>
            <h1 className="fw-bolder mb-0 font-manrope">3</h1>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
            <div className="d-flex justify-content-between align-items-start mb-4">
              <div className="bg-success-subtle text-success p-2 rounded-3 d-inline-flex">
                <i className="bi bi-people-fill fs-5"></i>
              </div>
              <small className="text-muted fw-medium">Active this month</small>
            </div>
            <p className="text-muted fw-bold text-uppercase mb-1" style={{ fontSize: '11px', letterSpacing: '1px' }}>Total Patients</p>
            <h1 className="fw-bolder mb-0 font-manrope">120</h1>
          </div>
        </div>
      </section>

      <div className="row g-4">
        {/* Recent Patient Activity Table */}
        <div className="col-md-8">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100">
            <div className="card-header bg-white border-bottom p-4 d-flex justify-content-between align-items-center">
              <h5 className="mb-0 fw-bold font-manrope">Recent Patient Activity</h5>
              <button className="btn btn-link text-primary fw-bold text-decoration-none p-0">View All</button>
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="py-3 px-4 text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Name</th>
                    <th className="py-3 px-4 text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Time</th>
                    <th className="py-3 px-4 text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Status</th>
                    <th className="py-3 px-4 text-end text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Action</th>
                  </tr>
                </thead>
                <tbody className="border-top-0">
                  <tr>
                    <td className="px-4 py-3">
                      <div className="d-flex align-items-center gap-3">
                        <div className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '32px', height: '32px', fontSize: '12px' }}>SM</div>
                        <span className="fw-medium">Sarah Miller</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted small">09:30 AM</td>
                    <td className="px-4 py-3"><span className="badge bg-success-subtle text-success rounded-pill px-3 py-2 fw-semibold">Completed</span></td>
                    <td className="px-4 py-3 text-end"><button className="btn btn-link text-muted p-0"><i className="bi bi-three-dots-vertical"></i></button></td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">
                      <div className="d-flex align-items-center gap-3">
                        <div className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '32px', height: '32px', fontSize: '12px' }}>JR</div>
                        <span className="fw-medium">James Robinson</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted small">10:15 AM</td>
                    <td className="px-4 py-3"><span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2 fw-semibold">In-Progress</span></td>
                    <td className="px-4 py-3 text-end"><button className="btn btn-link text-muted p-0"><i className="bi bi-three-dots-vertical"></i></button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Upcoming Schedule */}
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
            <h5 className="mb-4 fw-bold font-manrope">Upcoming Schedule</h5>
            <div className="d-flex flex-column gap-3">
              <div className="d-flex align-items-start gap-3 p-3 bg-light rounded-4 border hover-bg-white transition">
                <div className="text-center" style={{ minWidth: '50px' }}>
                  <p className="fw-bold text-primary mb-0">14:00</p>
                  <small className="text-muted" style={{ fontSize: '10px' }}>PM</small>
                </div>
                <div className="flex-grow-1">
                  <p className="fw-bold mb-0">General Consultation</p>
                  <small className="text-muted">Patient: Robert Fox</small>
                </div>
                <i className="bi bi-chevron-right text-muted"></i>
              </div>
              <div className="d-flex align-items-start gap-3 p-3 bg-light rounded-4 border hover-bg-white transition">
                <div className="text-center" style={{ minWidth: '50px' }}>
                  <p className="fw-bold text-primary mb-0">15:30</p>
                  <small className="text-muted" style={{ fontSize: '10px' }}>PM</small>
                </div>
                <div className="flex-grow-1">
                  <p className="fw-bold mb-0">Follow-up: Surgery</p>
                  <small className="text-muted">Patient: Anna Wilson</small>
                </div>
                <i className="bi bi-chevron-right text-muted"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
};