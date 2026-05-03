import React, { useState } from 'react';
import { AdminLayout } from '../components/layout/AdminLayout';

export const AdminReceptionistsPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <AdminLayout>
      <div className="mx-auto" style={{ maxWidth: '1400px' }}>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
          <div>
            <h2 className="fw-bolder font-manrope text-dark mb-1">Manage Receptionists</h2>
            <p className="text-muted mb-0">Oversee front-desk personnel, shift schedules, and staff credentials.</p>
          </div>
          <button className="btn btn-primary fw-bold px-4 py-2 d-flex align-items-center gap-2 rounded-3 shadow-sm" onClick={() => setShowModal(true)}>
            <i className="bi bi-person-plus-fill fs-5"></i> Add New Receptionist
          </button>
        </div>

        {/* Stats Grid */}
        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center gap-4">
              <div className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                <i className="bi bi-person-badge fs-4"></i>
              </div>
              <div>
                <p className="text-muted fw-bold mb-1 text-uppercase" style={{ fontSize: '11px', letterSpacing: '1px' }}>Total Receptionists</p>
                <h2 className="fw-bolder mb-0 font-manrope">24</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center gap-4">
              <div className="bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                <i className="bi bi-calendar-check fs-4"></i>
              </div>
              <div>
                <p className="text-muted fw-bold mb-1 text-uppercase" style={{ fontSize: '11px', letterSpacing: '1px' }}>On Shift Today</p>
                <h2 className="fw-bolder mb-0 font-manrope">8</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center gap-4">
              <div className="bg-warning-subtle text-warning rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                <i className="bi bi-clock-history fs-4"></i>
              </div>
              <div>
                <p className="text-muted fw-bold mb-1 text-uppercase" style={{ fontSize: '11px', letterSpacing: '1px' }}>Pending Approvals</p>
                <h2 className="fw-bolder mb-0 font-manrope">3</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Table Area */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
          <div className="card-header bg-light border-bottom p-4 d-flex justify-content-between align-items-center">
            <h5 className="mb-0 fw-bold font-manrope">Receptionist Directory</h5>
            <div className="d-flex gap-2">
              <button className="btn btn-sm btn-white border text-muted"><i className="bi bi-funnel"></i></button>
              <button className="btn btn-sm btn-white border text-muted"><i className="bi bi-download"></i></button>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="py-3 px-4 text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Name</th>
                  <th className="py-3 px-4 text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Staff ID</th>
                  <th className="py-3 px-4 text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Shift</th>
                  <th className="py-3 px-4 text-end text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Actions</th>
                </tr>
              </thead>
              <tbody className="border-top-0">
                <tr>
                  <td className="px-4 py-3">
                    <div className="d-flex align-items-center gap-3">
                      <img src="https://placehold.co/40x40" alt="Rec" className="rounded-circle bg-light" />
                      <div>
                        <div className="fw-bold text-dark">Elena Howard</div>
                        <small className="text-muted">elena.h@medclinic.com</small>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted">REC-2024-001</td>
                  <td className="px-4 py-3"><span className="badge bg-info-subtle text-info-emphasis rounded-pill px-3 py-1">Morning Shift</span></td>
                  <td className="px-4 py-3 text-end">
                    <button className="btn btn-link text-primary p-0 me-3"><i className="bi bi-pencil-square fs-5"></i></button>
                    <button className="btn btn-link text-danger p-0"><i className="bi bi-trash fs-5"></i></button>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">
                    <div className="d-flex align-items-center gap-3">
                      <img src="https://placehold.co/40x40" alt="Rec" className="rounded-circle bg-light" />
                      <div>
                        <div className="fw-bold text-dark">Marcus Bennett</div>
                        <small className="text-muted">m.bennett@medclinic.com</small>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted">REC-2024-005</td>
                  <td className="px-4 py-3"><span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-1">Afternoon Shift</span></td>
                  <td className="px-4 py-3 text-end">
                    <button className="btn btn-link text-primary p-0 me-3"><i className="bi bi-pencil-square fs-5"></i></button>
                    <button className="btn btn-link text-danger p-0"><i className="bi bi-trash fs-5"></i></button>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">
                    <div className="d-flex align-items-center gap-3">
                      <img src="https://placehold.co/40x40" alt="Rec" className="rounded-circle bg-light" />
                      <div>
                        <div className="fw-bold text-dark">Sarah Lin</div>
                        <small className="text-muted">s.lin@medclinic.com</small>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted">REC-2024-008</td>
                  <td className="px-4 py-3"><span className="badge bg-dark text-white rounded-pill px-3 py-1">Night Shift</span></td>
                  <td className="px-4 py-3 text-end">
                    <button className="btn btn-link text-primary p-0 me-3"><i className="bi bi-pencil-square fs-5"></i></button>
                    <button className="btn btn-link text-danger p-0"><i className="bi bi-trash fs-5"></i></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* --- Add Receptionist Modal --- */}
      {showModal && (
        <>
          <div className="modal-backdrop fade show" style={{ backdropFilter: 'blur(4px)' }}></div>
          <div className="modal fade show d-block" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
                <div className="modal-header bg-white py-4 px-4 border-bottom">
                  <h4 className="modal-title font-manrope fw-bolder text-dark">Add New Receptionist</h4>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body p-4">
                  <form className="row g-3">
                    <div className="col-12">
                      <label className="form-label fw-bold text-muted small">Full Name</label>
                      <input type="text" className="form-control py-2" placeholder="e.g. Sarah Jenkins" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold text-muted small">Staff ID</label>
                      <input type="text" className="form-control py-2" placeholder="REC-2024-001" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold text-muted small">Phone Number</label>
                      <input type="tel" className="form-control py-2" placeholder="+1 (555) 000-0000" />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-bold text-muted small">Email Address</label>
                      <input type="email" className="form-control py-2" placeholder="sarah.j@medclinic.com" />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-bold text-muted small mb-2">Shift Assignment</label>
                      <div className="d-flex gap-2">
                        <div className="flex-fill">
                          <input type="radio" className="btn-check" name="shift" id="shift-morning" defaultChecked />
                          <label className="btn btn-outline-primary w-100 py-3" htmlFor="shift-morning">
                            <i className="bi bi-brightness-high fs-5 d-block mb-1"></i> Morning
                          </label>
                        </div>
                        <div className="flex-fill">
                          <input type="radio" className="btn-check" name="shift" id="shift-afternoon" />
                          <label className="btn btn-outline-primary w-100 py-3" htmlFor="shift-afternoon">
                            <i className="bi bi-sunset fs-5 d-block mb-1"></i> Afternoon
                          </label>
                        </div>
                        <div className="flex-fill">
                          <input type="radio" className="btn-check" name="shift" id="shift-night" />
                          <label className="btn btn-outline-primary w-100 py-3" htmlFor="shift-night">
                            <i className="bi bi-moon-stars fs-5 d-block mb-1"></i> Night
                          </label>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer bg-light py-3 px-4 border-top-0">
                  <button type="button" className="btn btn-link text-secondary fw-bold text-decoration-none px-4" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="button" className="btn btn-primary fw-bold px-4 rounded-3">Add Receptionist</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};