import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { patientApi } from '../../services/adminService';
import type { Patient, UpdatePatientPayload } from '../../types/models/Patient';
import { ToastNotification } from '../../components/common/ToastNotification';
import type { ToastType } from '../../components/common/ToastNotification';
import { InputField } from '../../components/common/InputField';

export const AdminPatientsPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
  });
  const [deletingUsername, setDeletingUsername] = useState<string | null>(null);
  const [toast, setToast] = useState<{ show: boolean, message: string, type: ToastType }>({ show: false, message: '', type: 'success' });
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const showToast = (message: string, type: ToastType) => setToast({ show: true, message, type });

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    setLoading(true);
    try {
      const data = await patientApi.getAll();
      setPatients(data);
    } catch (error) {
      console.error(error);
      showToast('Failed to load patients!', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({ fullName: '', email: '', phone: '', address: '' });
    setShowModal(true);
  };

  const handleEdit = (patient: Patient) => {
    setEditingId(patient.id || null);
    setFormData({
      fullName: patient.fullName,
      email: patient.email,
      phone: patient.phone,
      address: patient.address,
    });
    setShowModal(true);
  };

  const handleDelete = (username: string) => {
    setDeletingUsername(username);
  };

  const confirmDelete = async () => {
    if (!deletingUsername) return;
    try {
      await patientApi.deleteByUsername(deletingUsername);
      await loadPatients();
      showToast('Patient deleted successfully!', 'success');
    } catch (error) {
      console.error(error);
      showToast('Failed to delete patient!', 'error');
    } finally {
      setDeletingUsername(null);
    }
  };

  const handleSave = async () => {
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address) {
      showToast('Please fill in all fields!', 'error');
      return;
    }
    try {
      if (editingId) {
        const updateData: UpdatePatientPayload = {
          id: editingId,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
        };
        await patientApi.update(editingId, updateData);
        showToast('Patient updated successfully!', 'success');
      }
      setShowModal(false);
      await loadPatients();
    } catch (error: any) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to save patient!';
      showToast(errorMessage !== 'Something went wrong' ? errorMessage : 'Failed to save patient!', 'error');
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const filteredPatients = patients.filter(p =>
    p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <AdminLayout>
      <div className="mx-auto font-manrope" style={{ maxWidth: '1400px', minHeight: '85vh' }}>
        {/* Page Header Actions */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
          <div>
            <h2 className="fw-bolder text-dark mb-1" style={{ color: '#001835' }}>Manage Patients</h2>
            <p className="text-muted mb-0">Oversee patient records, contact information, and medical histories.</p>
          </div>
          {/* <button className="btn fw-bold px-4 py-2 d-flex align-items-center gap-2 rounded-3 shadow-sm text-white transition-all active-scale" style={{ backgroundColor: '#001835' }} onClick={handleAddNew}>
            <i className="bi bi-person-plus-fill fs-5"></i> Add New Patient
          </button> */}
        </div>

        {/* Bento Stats */}
        {/* <div className="row g-4 mb-4">
          <div className="col-md-6">
            <div className="card border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center gap-4 h-100 bg-white border-start border-4" style={{ borderColor: '#001835' }}>
              <div className="bg-light rounded-circle d-flex align-items-center justify-content-center shrink-0" style={{ width: '60px', height: '60px' }}>
                <i className="bi bi-people-fill fs-3" style={{ color: '#001835' }}></i>
              </div>
              <div>
                <p className="text-muted fw-bold mb-1 text-uppercase" style={{ fontSize: '11px', letterSpacing: '1px' }}>Total Patients</p>
                <h2 className="fw-bolder mb-0 font-manrope" style={{ color: '#001835' }}>{patients.length}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center gap-4 h-100 bg-white border-start border-4" style={{ borderColor: '#006a6a' }}>
              <div className="bg-light rounded-circle d-flex align-items-center justify-content-center shrink-0" style={{ width: '60px', height: '60px' }}>
                <i className="bi bi-shield-check-fill fs-3" style={{ color: '#006a6a' }}></i>
              </div>
              <div>
                <p className="text-muted fw-bold mb-1 text-uppercase" style={{ fontSize: '11px', letterSpacing: '1px' }}>Verified Accounts</p>
                <h2 className="fw-bolder mb-0 font-manrope" style={{ color: '#001835' }}>{patients.length}</h2>
              </div>
            </div>
          </div>
        </div> */}

        {/* Patient Table Card */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
          <div className="card-header bg-white border-bottom p-4">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
              <h5 className="mb-0 fw-bold font-manrope" style={{ color: '#001835' }}>Patient Directory</h5>
              <div className="input-group" style={{ maxWidth: '300px' }}>
                <span className="input-group-text bg-light border-0"><i className="bi bi-search text-muted"></i></span>
                <input
                  type="text"
                  className="form-control bg-light border-0 py-2"
                  placeholder="Search by name, email..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                />
              </div>
            </div>
          </div>
          
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr className="text-uppercase text-muted fw-bold" style={{ fontSize: '12px' }}>
                  <th className="py-3 px-4">Patient Name</th>
                  <th className="py-3 px-4">Username</th>
                  <th className="py-3 px-4">Contact Info</th>
                  <th className="py-3 px-4">Address</th>
                  <th className="py-3 px-4 text-end">Actions</th>
                </tr>
              </thead>
              <tbody className="border-top-0">
                {loading ? (
                  <tr><td colSpan={5} className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></td></tr>
                ) : currentPatients.length === 0 ? (
                  <tr><td colSpan={5} className="text-center py-5 text-muted">No patients found.</td></tr>
                ) : (
                  currentPatients.map((patient) => (
                    <tr key={patient.id}>
                      <td className="px-4 py-3">
                        <div className="d-flex align-items-center gap-3">
                          <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white shadow-sm" style={{ width: '40px', height: '40px', backgroundColor: '#001835' }}>
                            {getInitials(patient.fullName)}
                          </div>
                          <div>
                            <div className="fw-bold text-dark font-manrope">{patient.fullName}</div>
                            <small className="text-muted">ID: #{patient.id}</small>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3"><code style={{ color: '#006a6a' }}>@{patient.username}</code></td>
                      <td className="px-4 py-3">
                        <div className="text-dark small fw-medium">{patient.email}</div>
                        <small className="text-muted">{patient.phone}</small>
                      </td>
                      <td className="px-4 py-3 text-muted small">{patient.address}</td>
                      <td className="px-4 py-3 text-end">
                        <button className="btn btn-link text-primary p-0 me-3" onClick={() => handleEdit(patient)} title="Edit"><i className="bi bi-pencil-square fs-5"></i></button>
                        <button className="btn btn-link text-danger p-0" onClick={() => handleDelete(patient.username)} title="Delete"><i className="bi bi-trash fs-5"></i></button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="card-footer bg-white border-top p-4 d-flex justify-content-between align-items-center">
              <span className="text-muted small">Showing {currentPatients.length} of {filteredPatients.length} patients</span>
              <div className="d-flex gap-2">
                <button className="btn btn-sm btn-outline-light border text-dark px-3 rounded-3" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>Prev</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button key={page} className={`btn btn-sm px-3 rounded-3 ${page === currentPage ? 'text-white' : 'btn-outline-light border text-dark'}`} style={{ backgroundColor: page === currentPage ? '#001835' : 'transparent' }} onClick={() => setCurrentPage(page)}>
                    {page}
                  </button>
                ))}
                <button className="btn btn-sm btn-outline-light border text-dark px-3 rounded-3" onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>Next</button>
              </div>
            </div>
          )}
        </div>

        {/* Add/Edit Modal */}
        {showModal && (
          <>
            <div className="modal-backdrop fade show" style={{ backdropFilter: 'blur(5px)', backgroundColor: 'rgba(0,24,53,0.5)' }}></div>
            <div className="modal fade show d-block" tabIndex={-1}>
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
                  <div className="modal-header bg-white py-4 px-4 border-bottom">
                    <h5 className="modal-title fw-bold font-manrope" style={{ color: '#001835' }}>
                      {editingId ? 'Edit Patient' : 'Register New Patient'}
                    </h5>
                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                  </div>
                  <div className="modal-body p-4 p-md-5">
                    <form className="row g-3">
                      <div className="col-12">
                        <InputField id="fullName" label="Full Name" type="text" icon="person" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} placeholder="Enter full name" />
                      </div>
                      <div className="col-12">
                        <InputField id="email" label="Email Address" type="email" icon="envelope" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Enter email address" />
                      </div>
                      <div className="col-12">
                        <InputField id="phone" label="Phone Number" type="tel" icon="telephone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="Enter phone number" />
                      </div>
                      <div className="col-12">
                        <InputField id="address" label="Home Address" type="text" icon="house" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} placeholder="Enter home address" />
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer bg-light py-3 px-4 border-top-0">
                    <button type="button" className="btn btn-link text-muted fw-bold text-decoration-none px-4" onClick={() => setShowModal(false)}>Cancel</button>
                    <button type="button" className="btn fw-bold px-4 rounded-3 text-white shadow-sm" style={{ backgroundColor: '#006a6a' }} onClick={handleSave}>
                      {editingId ? 'Update Patient' : 'Create Patient'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Delete Modal */}
        {deletingUsername && (
          <>
            <div className="modal-backdrop fade show" style={{ backdropFilter: 'blur(5px)', backgroundColor: 'rgba(0,24,53,0.5)' }}></div>
            <div className="modal fade show d-block" tabIndex={-1}>
              <div className="modal-dialog modal-dialog-centered modal-sm">
                <div className="modal-content rounded-4 border-0 shadow">
                  <div className="modal-body p-4 text-center">
                    <div className="text-danger mb-3">
                      <i className="bi bi-exclamation-circle" style={{ fontSize: '3rem' }}></i>
                    </div>
                    <h5 className="fw-bold mb-2 font-manrope" style={{ color: '#001835' }}>Delete Patient</h5>
                    <p className="text-muted mb-4 small">Are you sure you want to delete this patient? This action cannot be undone.</p>
                    <div className="d-flex justify-content-center gap-2">
                      <button type="button" className="btn btn-light rounded-3 px-4 fw-medium" onClick={() => setDeletingUsername(null)}>Cancel</button>
                      <button type="button" className="btn btn-danger rounded-3 px-4 fw-medium" onClick={confirmDelete}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {toast.show && (
          <ToastNotification show={toast.show} message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, show: false })} />
        )}
      </div>
    </AdminLayout>
  );
};