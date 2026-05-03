import React from 'react';
import { AdminLayout } from '../components/layout/AdminLayout';

export const AdminPatientsPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="mx-auto" style={{ maxWidth: '1400px' }}>
        {/* Page Header Actions */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
          <div>
            <h2 className="fw-bolder font-manrope text-dark mb-1">Manage Patients</h2>
            <p className="text-muted mb-0">Oversee patient records, contact information, and medical histories.</p>
          </div>
          <button className="btn btn-primary fw-bold px-4 py-2 d-flex align-items-center gap-2 rounded-3 shadow-sm active-scale">
            <i className="bi bi-person-plus-fill fs-5"></i> Add New Patient
          </button>
        </div>

        {/* Bento Layout Stats */}
        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center gap-4 h-100">
              <div className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '56px', height: '56px' }}>
                <i className="bi bi-people-fill fs-3"></i>
              </div>
              <div>
                <p className="text-muted fw-bold mb-1 text-uppercase" style={{ fontSize: '11px', letterSpacing: '1px' }}>Total Patients</p>
                <h2 className="fw-bolder mb-0 font-manrope">1,284</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center gap-4 h-100">
              <div className="bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '56px', height: '56px' }}>
                <i className="bi bi-calendar-check-fill fs-3"></i>
              </div>
              <div>
                <p className="text-muted fw-bold mb-1 text-uppercase" style={{ fontSize: '11px', letterSpacing: '1px' }}>Appointments Today</p>
                <h2 className="fw-bolder mb-0 font-manrope">42</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center gap-4 h-100">
              <div className="bg-info-subtle text-info-emphasis rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '56px', height: '56px' }}>
                <i className="bi bi-stars fs-3"></i>
              </div>
              <div>
                <p className="text-muted fw-bold mb-1 text-uppercase" style={{ fontSize: '11px', letterSpacing: '1px' }}>New This Week</p>
                <h2 className="fw-bolder mb-0 font-manrope">+12</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Patient Table Card */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
          <div className="card-header bg-light border-bottom p-4 d-flex justify-content-between align-items-center">
            <h5 className="mb-0 fw-bold font-manrope">Patient Directory</h5>
            <div className="d-flex gap-2">
              <button className="btn btn-sm btn-white border text-muted"><i className="bi bi-funnel"></i></button>
              <button className="btn btn-sm btn-white border text-muted"><i className="bi bi-download"></i></button>
            </div>
          </div>
          
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="py-3 px-4 text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Patient Name</th>
                  <th className="py-3 px-4 text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Email Address</th>
                  <th className="py-3 px-4 text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Phone Number</th>
                  <th className="py-3 px-4 text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Last Visit</th>
                  <th className="py-3 px-4 text-end text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Actions</th>
                </tr>
              </thead>
              <tbody className="border-top-0">
                {/* Patient Row 1 */}
                <tr>
                  <td className="px-4 py-3">
                    <div className="d-flex align-items-center gap-3">
                      <div className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '40px', height: '40px' }}>JD</div>
                      <div>
                        <div className="fw-bold text-dark">Jane Doe</div>
                        <small className="text-muted">ID: #PT-1029</small>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted">jane.doe@example.com</td>
                  <td className="px-4 py-3 text-muted">(555) 012-3456</td>
                  <td className="px-4 py-3 text-muted">Oct 24, 2023</td>
                  <td className="px-4 py-3 text-end">
                    <button className="btn btn-link text-primary p-0 me-3"><i className="bi bi-pencil-square fs-5"></i></button>
                    <button className="btn btn-link text-danger p-0"><i className="bi bi-trash fs-5"></i></button>
                  </td>
                </tr>
                {/* Patient Row 2 */}
                <tr>
                  <td className="px-4 py-3">
                    <div className="d-flex align-items-center gap-3">
                      <div className="bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '40px', height: '40px' }}>MS</div>
                      <div>
                        <div className="fw-bold text-dark">Michael Smith</div>
                        <small className="text-muted">ID: #PT-1104</small>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted">m.smith88@webmail.com</td>
                  <td className="px-4 py-3 text-muted">(555) 987-6543</td>
                  <td className="px-4 py-3 text-muted">Nov 02, 2023</td>
                  <td className="px-4 py-3 text-end">
                    <button className="btn btn-link text-primary p-0 me-3"><i className="bi bi-pencil-square fs-5"></i></button>
                    <button className="btn btn-link text-danger p-0"><i className="bi bi-trash fs-5"></i></button>
                  </td>
                </tr>
                {/* Patient Row 3 */}
                <tr>
                  <td className="px-4 py-3">
                    <div className="d-flex align-items-center gap-3">
                      <div className="bg-warning-subtle text-warning-emphasis rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '40px', height: '40px' }}>AR</div>
                      <div>
                        <div className="fw-bold text-dark">Alice Robinson</div>
                        <small className="text-muted">ID: #PT-0982</small>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted">arobinson@provider.net</td>
                  <td className="px-4 py-3 text-muted">(555) 246-1357</td>
                  <td className="px-4 py-3 text-muted">Oct 30, 2023</td>
                  <td className="px-4 py-3 text-end">
                    <button className="btn btn-link text-primary p-0 me-3"><i className="bi bi-pencil-square fs-5"></i></button>
                    <button className="btn btn-link text-danger p-0"><i className="bi bi-trash fs-5"></i></button>
                  </td>
                </tr>
                {/* Patient Row 4 */}
                <tr>
                  <td className="px-4 py-3">
                    <div className="d-flex align-items-center gap-3">
                      <div className="bg-danger-subtle text-danger rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '40px', height: '40px' }}>RK</div>
                      <div>
                        <div className="fw-bold text-dark">Robert King</div>
                        <small className="text-muted">ID: #PT-1245</small>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted">rking@service.com</td>
                  <td className="px-4 py-3 text-muted">(555) 444-5555</td>
                  <td className="px-4 py-3 text-muted">Nov 14, 2023</td>
                  <td className="px-4 py-3 text-end">
                    <button className="btn btn-link text-primary p-0 me-3"><i className="bi bi-pencil-square fs-5"></i></button>
                    <button className="btn btn-link text-danger p-0"><i className="bi bi-trash fs-5"></i></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="card-footer bg-white border-top p-4 d-flex justify-content-between align-items-center">
            <span className="text-muted small">Showing 4 of 1,284 patients</span>
            <div className="d-flex gap-2">
              <button className="btn btn-sm btn-white border text-muted" disabled>Previous</button>
              <button className="btn btn-sm btn-primary">1</button>
              <button className="btn btn-sm btn-white border">2</button>
              <button className="btn btn-sm btn-white border">3</button>
              <button className="btn btn-sm btn-white border text-primary">Next</button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};