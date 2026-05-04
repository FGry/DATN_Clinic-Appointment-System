import React, { useState } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';

export const AdminDoctorsPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <AdminLayout>
      <div className="mx-auto" style={{ maxWidth: '1400px' }}>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
          <div>
            <h2 className="fw-bolder font-manrope text-dark mb-1">Manage Doctors</h2>
            <p className="text-muted mb-0">Oversee medical staff profiles, department assignments, and contact details.</p>
          </div>
          <button className="btn btn-primary fw-bold px-4 py-2 d-flex align-items-center gap-2 rounded-3 shadow-sm" onClick={() => setShowModal(true)}>
            <i className="bi bi-plus-lg fs-5"></i> Add New Doctor
          </button>
        </div>

        {/* Stats Grid */}
        <div className="row g-4 mb-4">
          <div className="col-md-6">
            <div className="card border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center gap-4">
              <div className="bg-primary-subtle text-primary rounded-3 d-flex align-items-center justify-content-center" style={{ width: '56px', height: '56px' }}>
                <i className="bi bi-heart-pulse fs-3"></i>
              </div>
              <div>
                <p className="text-muted fw-bold mb-1 text-uppercase" style={{ fontSize: '11px', letterSpacing: '1px' }}>Total Doctors</p>
                <h2 className="fw-bolder mb-0 font-manrope">42</h2>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center gap-4">
              <div className="bg-warning-subtle text-warning rounded-3 d-flex align-items-center justify-content-center" style={{ width: '56px', height: '56px' }}>
                <i className="bi bi-person-dash fs-3"></i>
              </div>
              <div>
                <p className="text-muted fw-bold mb-1 text-uppercase" style={{ fontSize: '11px', letterSpacing: '1px' }}>On Leave</p>
                <h2 className="fw-bolder mb-0 font-manrope">05</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Table & Chart Area */}
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100">
              <div className="card-header bg-light border-bottom p-4 d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold font-manrope">Medical Personnel Registry</h5>
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-white border text-muted"><i className="bi bi-funnel"></i></button>
                  <button className="btn btn-sm btn-white border text-muted"><i className="bi bi-download"></i></button>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="py-3 px-4 text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Doctor Name</th>
                      <th className="py-3 px-4 text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Specialty</th>
                      <th className="py-3 px-4 text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Contact Info</th>
                      <th className="py-3 px-4 text-end text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="border-top-0">
                    <tr>
                      <td className="px-4 py-3">
                        <div className="d-flex align-items-center gap-3">
                          <img src="https://placehold.co/40x40" alt="Doctor" className="rounded-circle bg-light" />
                          <div>
                            <div className="fw-bold text-dark">Dr. Julian Vance</div>
                            <small className="text-muted">ID: DOC-2024-001</small>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3"><span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-1 text-uppercase fw-bold">Cardiology</span></td>
                      <td className="px-4 py-3">
                        <div className="text-dark">julian.vance@medclinic.com</div>
                        <small className="text-muted">+1 (555) 012-3456</small>
                      </td>
                      <td className="px-4 py-3 text-end">
                        <button className="btn btn-link text-primary p-0 me-3"><i className="bi bi-pencil-square fs-5"></i></button>
                        <button className="btn btn-link text-danger p-0"><i className="bi bi-trash fs-5"></i></button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">
                        <div className="d-flex align-items-center gap-3">
                          <img src="https://placehold.co/40x40" alt="Doctor" className="rounded-circle bg-light" />
                          <div>
                            <div className="fw-bold text-dark">Dr. Elena Rodriguez</div>
                            <small className="text-muted">ID: DOC-2024-005</small>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3"><span className="badge bg-success-subtle text-success rounded-pill px-3 py-1 text-uppercase fw-bold">Neurology</span></td>
                      <td className="px-4 py-3">
                        <div className="text-dark">e.rodriguez@medclinic.com</div>
                        <small className="text-muted">+1 (555) 098-7654</small>
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

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
              <h5 className="fw-bold font-manrope mb-4">Specialty Breakdown</h5>
              <div className="d-flex flex-column gap-4">
                <div>
                  <div className="d-flex justify-content-between mb-1">
                    <span className="small text-muted fw-semibold">General Practice</span>
                    <span className="small fw-bold">40%</span>
                  </div>
                  <div className="progress" style={{ height: '8px' }}>
                    <div className="progress-bar bg-primary" role="progressbar" style={{ width: '40%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="d-flex justify-content-between mb-1">
                    <span className="small text-muted fw-semibold">Cardiology</span>
                    <span className="small fw-bold">25%</span>
                  </div>
                  <div className="progress" style={{ height: '8px' }}>
                    <div className="progress-bar bg-success" role="progressbar" style={{ width: '25%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="d-flex justify-content-between mb-1">
                    <span className="small text-muted fw-semibold">Pediatrics</span>
                    <span className="small fw-bold">20%</span>
                  </div>
                  <div className="progress" style={{ height: '8px' }}>
                    <div className="progress-bar bg-warning" role="progressbar" style={{ width: '20%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Add Doctor Modal --- */}
      {showModal && (
        <>
          <div className="modal-backdrop fade show" style={{ backdropFilter: 'blur(4px)' }}></div>
          <div className="modal fade show d-block" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
                <div className="modal-header bg-white py-4 px-4 border-bottom">
                  <div>
                    <h4 className="modal-title font-manrope fw-bolder text-dark">Add New Doctor</h4>
                    <small className="text-muted">Create a new professional profile for the clinical registry.</small>
                  </div>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body p-4">
                  <form className="row g-4">
                    <div className="col-12">
                      <label className="form-label fw-bold text-muted small">Full Name</label>
                      <div className="input-group">
                        <span className="input-group-text bg-white"><i className="bi bi-person text-muted"></i></span>
                        <input type="text" className="form-control py-2 border-start-0" placeholder="Dr. Jane Smith" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold text-muted small">Specialty</label>
                      <div className="input-group">
                        <span className="input-group-text bg-white"><i className="bi bi-heart-pulse text-muted"></i></span>
                        <select className="form-select py-2 border-start-0">
                          <option>Select Department</option>
                          <option>Cardiology</option>
                          <option>Neurology</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold text-muted small">Phone Number</label>
                      <div className="input-group">
                        <span className="input-group-text bg-white"><i className="bi bi-telephone text-muted"></i></span>
                        <input type="tel" className="form-control py-2 border-start-0" placeholder="+1 (555) 000-0000" />
                      </div>
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-bold text-muted small">Professional Email</label>
                      <div className="input-group">
                        <span className="input-group-text bg-white"><i className="bi bi-envelope text-muted"></i></span>
                        <input type="email" className="form-control py-2 border-start-0" placeholder="jane.smith@medclinic.com" />
                      </div>
                    </div>
                    {/* Working Days Checkboxes (Simplified for React/Bootstrap) */}
                    <div className="col-12">
                      <label className="form-label fw-bold text-muted small mb-2">Working Days</label>
                      <div className="d-flex flex-wrap gap-2">
                        {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
                          <div key={day} className="flex-fill">
                            <input type="checkbox" className="btn-check" id={`day-${day}`} autoComplete="off" />
                            <label className="btn btn-outline-primary w-100 py-2 fw-bold" style={{ fontSize: '12px' }} htmlFor={`day-${day}`}>{day}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold text-muted small">Shift Start</label>
                      <input type="time" className="form-control py-2" defaultValue="09:00" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold text-muted small">Shift End</label>
                      <input type="time" className="form-control py-2" defaultValue="17:00" />
                    </div>
                  </form>
                </div>
                <div className="modal-footer bg-light py-3 px-4 border-top-0">
                  <button type="button" className="btn btn-link text-secondary fw-bold text-decoration-none px-4" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="button" className="btn btn-primary fw-bold px-4 rounded-3">Add Doctor</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};