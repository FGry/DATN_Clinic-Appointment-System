import React, { useState } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';

export const AdminSpecialtiesPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <AdminLayout>
      <div className="mx-auto" style={{ maxWidth: '1400px' }}>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
          <div>
            <h2 className="fw-bolder font-manrope text-dark mb-1">Manage Specialties</h2>
            <p className="text-muted mb-0">Configure and monitor clinical departments and medical expertise areas.</p>
          </div>
          <button className="btn btn-primary fw-bold px-4 py-2 d-flex align-items-center gap-2 rounded-3 shadow-sm" onClick={() => setShowModal(true)}>
            <i className="bi bi-plus-lg fs-5"></i> Add New Specialty
          </button>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-md-6">
            <div className="card border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center gap-4">
              <div className="bg-primary-subtle text-primary rounded-3 d-flex align-items-center justify-content-center" style={{ width: '56px', height: '56px' }}>
                <i className="bi bi-tags fs-3"></i>
              </div>
              <div>
                <p className="text-muted fw-bold mb-1 text-uppercase" style={{ fontSize: '11px', letterSpacing: '1px' }}>Total Specialties</p>
                <h2 className="fw-bolder mb-0 font-manrope">24</h2>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center gap-4">
              <div className="bg-success-subtle text-success rounded-3 d-flex align-items-center justify-content-center" style={{ width: '56px', height: '56px' }}>
                <i className="bi bi-graph-up-arrow fs-3"></i>
              </div>
              <div>
                <p className="text-muted fw-bold mb-1 text-uppercase" style={{ fontSize: '11px', letterSpacing: '1px' }}>Busiest Department</p>
                <h2 className="fw-bolder mb-0 font-manrope">Cardiology</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
          <div className="card-header bg-light border-bottom p-4 d-flex justify-content-between align-items-center">
            <h5 className="mb-0 fw-bold font-manrope">Clinical Departments List</h5>
          </div>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="py-3 px-4 text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Specialty Name</th>
                  <th className="py-3 px-4 text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Clinical Code</th>
                  <th className="py-3 px-4 text-muted text-uppercase fw-bold text-center" style={{ fontSize: '12px' }}>Assigned Doctors</th>
                  <th className="py-3 px-4 text-end text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Actions</th>
                </tr>
              </thead>
              <tbody className="border-top-0">
                <tr>
                  <td className="px-4 py-3">
                    <div className="d-flex align-items-center gap-3">
                      <div className="bg-danger-subtle text-danger rounded d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                        <i className="bi bi-suit-heart-fill fs-5"></i>
                      </div>
                      <span className="fw-bold text-dark">Cardiology</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted">CARD-001</td>
                  <td className="px-4 py-3 text-center">
                    <span className="badge bg-primary-subtle text-primary rounded-circle p-2 fs-6">12</span>
                  </td>
                  <td className="px-4 py-3 text-end">
                    <button className="btn btn-link text-primary p-0 me-3"><i className="bi bi-pencil-square fs-5"></i></button>
                    <button className="btn btn-link text-danger p-0"><i className="bi bi-trash fs-5"></i></button>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">
                    <div className="d-flex align-items-center gap-3">
                      <div className="bg-info-subtle text-info-emphasis rounded d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                        <i className="bi bi-bandaid-fill fs-5"></i>
                      </div>
                      <span className="fw-bold text-dark">Dermatology</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted">DERM-008</td>
                  <td className="px-4 py-3 text-center">
                    <span className="badge bg-primary-subtle text-primary rounded-circle p-2 fs-6">6</span>
                  </td>
                  <td className="px-4 py-3 text-end">
                    <button className="btn btn-link text-primary p-0 me-3"><i className="bi bi-pencil-square fs-5"></i></button>
                    <button className="btn btn-link text-danger p-0"><i className="bi bi-trash fs-5"></i></button>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">
                    <div className="d-flex align-items-center gap-3">
                      <div className="bg-light text-muted rounded d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                        <i className="bi bi-clipboard2-pulse fs-5"></i>
                      </div>
                      <span className="fw-bold text-dark">Oncology</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted">ONCO-014</td>
                  <td className="px-4 py-3 text-center">
                    <span className="badge bg-light text-muted border rounded-circle p-2 fs-6">0</span>
                  </td>
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

      {/* --- Add Specialty Modal --- */}
      {showModal && (
        <>
          <div className="modal-backdrop fade show" style={{ backdropFilter: 'blur(4px)' }}></div>
          <div className="modal fade show d-block" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
                <div className="modal-header bg-white py-4 px-4 border-bottom">
                  <h4 className="modal-title font-manrope fw-bolder text-dark">Add New Specialty</h4>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body p-4">
                  <form className="row g-3">
                    <div className="col-12">
                      <label className="form-label fw-bold text-muted small">Specialty Name</label>
                      <input type="text" className="form-control py-2 bg-light" placeholder="e.g. Dermatology" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold text-muted small">Clinical Code</label>
                      <input type="text" className="form-control py-2 bg-light" placeholder="CL-000" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold text-muted small">Department</label>
                      <select className="form-select py-2 bg-light">
                        <option>Internal Medicine</option>
                        <option>Surgical</option>
                        <option>Diagnostics</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-bold text-muted small">Description</label>
                      <textarea className="form-control bg-light" rows={3} placeholder="Briefly describe the scope of this medical specialty..."></textarea>
                    </div>
                    <div className="col-12 mt-4">
                      <div className="border border-2 border-dashed border-secondary rounded-4 p-4 text-center hover-bg-light cursor-pointer transition-all">
                        <div className="bg-primary-subtle text-primary rounded-circle d-inline-flex p-3 mb-2">
                          <i className="bi bi-cloud-arrow-up fs-4"></i>
                        </div>
                        <p className="fw-bold mb-0">Upload Specialty Icon</p>
                        <small className="text-muted">SVG or PNG (Max 1MB)</small>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer bg-light py-3 px-4 border-top-0">
                  <button type="button" className="btn btn-link text-secondary fw-bold text-decoration-none px-4" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="button" className="btn btn-primary fw-bold px-4 rounded-3">Add Specialty</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};