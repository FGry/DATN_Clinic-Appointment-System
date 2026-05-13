import React from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { Link } from 'react-router-dom';

export const AdminDashboardPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="mx-auto" style={{ maxWidth: '1400px' }}>
        {/* Welcome Section */}
        <section className="mb-4">
          <h2 className="fw-bolder font-manrope text-dark mb-1">Admin Dashboard</h2>
          <p className="text-muted">System overview and daily operations summary.</p>
        </section>

        {/* Key Metrics */}
        <div className="row g-4 mb-4">
          <div className="col-md-3">
            <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="bg-primary-subtle text-primary p-3 rounded-3">
                  <i className="bi bi-heart-pulse-fill fs-4"></i>
                </div>
                <span className="badge bg-success-subtle text-success rounded-pill">+2</span>
              </div>
              <h3 className="fw-bolder mb-1 font-manrope">42</h3>
              <p className="text-muted fw-bold text-uppercase mb-0" style={{ fontSize: '11px', letterSpacing: '1px' }}>Total Doctors</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="bg-success-subtle text-success p-3 rounded-3">
                  <i className="bi bi-people-fill fs-4"></i>
                </div>
                <span className="badge bg-success-subtle text-success rounded-pill">+12</span>
              </div>
              <h3 className="fw-bolder mb-1 font-manrope">1,284</h3>
              <p className="text-muted fw-bold text-uppercase mb-0" style={{ fontSize: '11px', letterSpacing: '1px' }}>Total Patients</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="bg-warning-subtle text-warning-emphasis p-3 rounded-3">
                  <i className="bi bi-person-badge-fill fs-4"></i>
                </div>
              </div>
              <h3 className="fw-bolder mb-1 font-manrope">24</h3>
              <p className="text-muted fw-bold text-uppercase mb-0" style={{ fontSize: '11px', letterSpacing: '1px' }}>Receptionists</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-primary text-white position-relative overflow-hidden">
              <div className="position-relative z-1">
                <div className="bg-white bg-opacity-25 text-white p-3 rounded-3 d-inline-block mb-3">
                  <i className="bi bi-calendar-check-fill fs-4"></i>
                </div>
                <h3 className="fw-bolder mb-1 font-manrope text-white">156</h3>
                <p className="text-white opacity-75 fw-bold text-uppercase mb-0" style={{ fontSize: '11px', letterSpacing: '1px' }}>Today's Appts</p>
              </div>
              <i className="bi bi-graph-up-arrow position-absolute text-white opacity-10" style={{ fontSize: '120px', right: '-10px', bottom: '-20px' }}></i>
            </div>
          </div>
        </div>

        {/* Quick Access & Recent Activity */}
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100">
              <div className="card-header bg-white border-bottom p-4 d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold font-manrope">Recent System Activity</h5>
              </div>
              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <tbody className="border-top-0">
                    <tr>
                      <td className="px-4 py-3 w-auto">
                        <div className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                          <i className="bi bi-person-plus-fill"></i>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="fw-bold text-dark mb-0">New Patient Registered</p>
                        <small className="text-muted">Jane Doe created an account.</small>
                      </td>
                      <td className="px-4 py-3 text-end text-muted small">10 mins ago</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 w-auto">
                        <div className="bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                          <i className="bi bi-calendar-check-fill"></i>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="fw-bold text-dark mb-0">Appointment Completed</p>
                        <small className="text-muted">Dr. Sarah Mitchell marked #APT-089 as done.</small>
                      </td>
                      <td className="px-4 py-3 text-end text-muted small">45 mins ago</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 w-auto">
                        <div className="bg-warning-subtle text-warning-emphasis rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                          <i className="bi bi-exclamation-triangle-fill"></i>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="fw-bold text-dark mb-0">System Alert</p>
                        <small className="text-muted">Server backup completed successfully.</small>
                      </td>
                      <td className="px-4 py-3 text-end text-muted small">2 hours ago</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
              <h5 className="fw-bold font-manrope mb-4">Quick Actions</h5>
              <div className="d-flex flex-column gap-3">
                <Link to="/admin/doctors" className="btn btn-outline-primary p-3 rounded-3 text-start fw-bold d-flex align-items-center gap-3">
                  <i className="bi bi-plus-lg fs-5"></i> Add New Doctor
                </Link>
                <Link to="/admin/receptionists" className="btn btn-outline-primary p-3 rounded-3 text-start fw-bold d-flex align-items-center gap-3">
                  <i className="bi bi-plus-lg fs-5"></i> Manage Reception Staff
                </Link>
                <Link to="/admin/specialties" className="btn btn-outline-primary p-3 rounded-3 text-start fw-bold d-flex align-items-center gap-3">
                  <i className="bi bi-plus-lg fs-5"></i> Configure Specialties
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};