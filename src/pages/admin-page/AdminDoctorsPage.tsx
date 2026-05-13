import React, { useState } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { InputField } from '../../components/common/InputField';

export const AdminDoctorsPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <AdminLayout>
      <div className="mx-auto" style={{ maxWidth: '1400px' }}>
        {/* Header Section */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-5">
          <div>
            <h2 className="fw-bold font-manrope mb-1" style={{ color: '#001835' }}>Manage Doctors</h2>
            <p className="text-muted mb-0">Hệ thống quản lý thông tin bác sĩ và lịch trình chuyên khoa.</p>
          </div>
          <button 
            className="btn btn-st-primary fw-bold px-4 py-2 d-flex align-items-center gap-2 rounded-3 shadow-sm transition-all active-scale"
            onClick={() => setShowModal(true)}
            style={{ backgroundColor: '#001835', border: 'none', color: 'white' }}
          >
            <i className="bi bi-person-plus-fill fs-5"></i> 
            Add New Doctor
          </button>
        </div>

        {/* Stats Grid - Bento Style */}
        <div className="row g-4 mb-5">
          <div className="col-md-6">
            <div className="card border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center gap-4 h-100 bg-white border-start border-4" style={{ borderLeftColor: '#001835 !important' }}>
              <div className="bg-light rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '60px', height: '60px' }}>
                <i className="bi bi-heart-pulse-fill fs-3" style={{ color: '#001835' }}></i>
              </div>
              <div>
                <p className="text-muted fw-bold mb-1 text-uppercase small" style={{ letterSpacing: '1px' }}>Total Active Doctors</p>
                <h2 className="fw-bolder mb-0 font-manrope" style={{ color: '#001835' }}>42</h2>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center gap-4 h-100 bg-white border-start border-4" style={{ borderLeftColor: '#006a6a !important' }}>
              <div className="bg-light rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '60px', height: '60px' }}>
                <i className="bi bi-hospital fs-3" style={{ color: '#006a6a' }}></i>
              </div>
              <div>
                <p className="text-muted fw-bold mb-1 text-uppercase small" style={{ letterSpacing: '1px' }}>Department Heads</p>
                <h2 className="fw-bolder mb-0 font-manrope" style={{ color: '#001835' }}>08</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Main Table Container */}
        <div className="card border-0 shadow-lg rounded-4 overflow-hidden bg-white">
          <div className="card-header bg-white border-bottom p-4 d-flex justify-content-between align-items-center">
            <h5 className="mb-0 fw-bold font-manrope" style={{ color: '#001835' }}>Doctor Directory</h5>
            <div className="input-group w-auto">
              <span className="input-group-text bg-light border-0"><i className="bi bi-search text-muted"></i></span>
              <input type="text" className="form-control bg-light border-0" placeholder="Search doctors..." style={{ fontSize: '14px' }} />
            </div>
          </div>
          
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="py-3 px-4 text-muted text-uppercase fw-bold" style={{ fontSize: '11px' }}>Doctor Name</th>
                  <th className="py-3 px-4 text-muted text-uppercase fw-bold" style={{ fontSize: '11px' }}>Specialty</th>
                  <th className="py-3 px-4 text-muted text-uppercase fw-bold" style={{ fontSize: '11px' }}>Credentials / Email</th>
                  <th className="py-3 px-4 text-muted text-uppercase fw-bold text-center" style={{ fontSize: '11px' }}>Status</th>
                  <th className="py-3 px-4 text-end text-muted text-uppercase fw-bold" style={{ fontSize: '11px' }}>Actions</th>
                </tr>
              </thead>
              <tbody className="border-top-0">
                {/* Doctor Row 1 */}
                <tr>
                  <td className="px-4 py-4">
                    <div className="d-flex align-items-center gap-3">
                      <img src="https://placehold.co/48x48" alt="Dr" className="rounded-circle border border-2 border-white shadow-sm" />
                      <div>
                        <div className="fw-bold text-dark font-manrope">Dr. Julian Vance</div>
                        <small className="text-muted">ID: DOC-2024-001</small>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="badge rounded-pill px-3 py-2 fw-bold text-uppercase" style={{ backgroundColor: '#e6f4f4', color: '#006a6a', fontSize: '10px' }}>Cardiology</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-dark small fw-medium">julian.vance@stjude.com</div>
                    <small className="text-muted">+1 (555) 012-3456</small>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="d-inline-flex align-items-center gap-2 small fw-bold text-success">
                      <span className="bg-success rounded-circle" style={{ width: '8px', height: '8px' }}></span> Active
                    </span>
                  </td>
                  <td className="px-4 py-4 text-end">
                    <button className="btn btn-link text-primary p-0 me-3" title="Edit"><i className="bi bi-pencil-square fs-5"></i></button>
                    <button className="btn btn-link text-danger p-0" title="Delete"><i className="bi bi-trash fs-5"></i></button>
                  </td>
                </tr>
                {/* Doctor Row 2 */}
                <tr>
                  <td className="px-4 py-4">
                    <div className="d-flex align-items-center gap-3">
                      <img src="https://placehold.co/48x48" alt="Dr" className="rounded-circle border border-2 border-white shadow-sm" />
                      <div>
                        <div className="fw-bold text-dark font-manrope">Dr. Elena Rodriguez</div>
                        <small className="text-muted">ID: DOC-2024-005</small>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="badge rounded-pill px-3 py-2 fw-bold text-uppercase" style={{ backgroundColor: '#f0f0f9', color: '#001835', fontSize: '10px' }}>Neurology</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-dark small fw-medium">e.rodriguez@stjude.com</div>
                    <small className="text-muted">+1 (555) 098-7654</small>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="d-inline-flex align-items-center gap-2 small fw-bold text-success">
                      <span className="bg-success rounded-circle" style={{ width: '8px', height: '8px' }}></span> Active
                    </span>
                  </td>
                  <td className="px-4 py-4 text-end">
                    <button className="btn btn-link text-primary p-0 me-3" title="Edit"><i className="bi bi-pencil-square fs-5"></i></button>
                    <button className="btn btn-link text-danger p-0" title="Delete"><i className="bi bi-trash fs-5"></i></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="card-footer bg-white border-top p-4 d-flex justify-content-between align-items-center">
            <span className="text-muted small">Showing 2 of 42 specialists</span>
            <div className="d-flex gap-2">
              <button className="btn btn-sm btn-outline-light border text-dark px-3 py-1.5 rounded-3 fw-bold small">Previous</button>
              <button className="btn btn-sm btn-st-primary px-3 py-1.5 rounded-3 fw-bold small" style={{ backgroundColor: '#001835', border: 'none', color: 'white' }}>1</button>
              <button className="btn btn-sm btn-outline-light border text-dark px-3 py-1.5 rounded-3 fw-bold small">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Add Doctor Modal --- */}
      {showModal && (
        <>
          <div className="modal-backdrop fade show" style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(0,24,53,0.4)' }}></div>
          <div className="modal fade show d-block" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
                <div className="modal-header bg-white py-4 px-4 border-bottom">
                  <div>
                    <h4 className="modal-title font-manrope fw-bolder" style={{ color: '#001835' }}>Register New Specialist</h4>
                    <p className="text-muted small mb-0 mt-1">Cấp quyền và tạo hồ sơ chuyên môn cho bác sĩ mới.</p>
                  </div>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body p-4 p-md-5">
                  <form className="row g-4">
                    <div className="col-12">
                      <InputField id="fullName" name="fullName" label="Full Name (with Prefix)" type="text" icon="person" placeholder="e.g. Dr. Jane Smith" required />
                    </div>
                    <div className="col-md-6">
                      <InputField id="specialty" name="specialty" label="Primary Specialty" type="text" icon="heart-pulse" placeholder="e.g. Cardiology" required />
                    </div>
                    <div className="col-md-6">
                      <InputField id="phone" name="phone" label="Professional Contact" type="tel" icon="telephone" placeholder="+1 (555) 000-0000" required />
                    </div>
                    <div className="col-12">
                      <InputField id="email" name="email" label="Institutional Email" type="email" icon="envelope" placeholder="jane.smith@stjude.com" required />
                    </div>
                    
                    <div className="col-12">
                      <label className="form-label fw-bold text-muted small mb-2">Shift Schedule Configuration</label>
                      <div className="bg-light p-4 rounded-4 border">
                         <div className="row g-3">
                            <div className="col-md-6">
                               <label className="small text-muted mb-1 d-block fw-bold">Shift Start</label>
                               <input type="time" className="form-control border-0 shadow-sm py-2" defaultValue="09:00" />
                            </div>
                            <div className="col-md-6">
                               <label className="small text-muted mb-1 d-block fw-bold">Shift End</label>
                               <input type="time" className="form-control border-0 shadow-sm py-2" defaultValue="17:00" />
                            </div>
                         </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer bg-light py-3 px-4 border-top-0">
                  <button type="button" className="btn btn-link text-muted fw-bold text-decoration-none px-4" onClick={() => setShowModal(false)}>Cancel</button>
                  <button 
                    type="button" 
                    className="btn btn-st-primary fw-bold px-5 py-2.5 rounded-3 shadow-sm"
                    style={{ backgroundColor: '#006a6a', border: 'none', color: 'white' }}
                  >
                    Complete Registration
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};