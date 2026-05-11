import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { patientApi } from '../../services/adminService';
import type { Patient, UpdatePatientPayload } from '../../types/models/Patient';
import { ToastNotification } from '../../components/common/ToastNotification';
import type { ToastType } from '../../components/common/ToastNotification';

export const AdminPatientsPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
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
    setFormData({ fullName: '', email: '', phoneNumber: '', address: '' });
    setShowModal(true);
  };

  const handleEdit = (patient: Patient) => {
    setEditingId(patient.id || null);
    setFormData({
      fullName: patient.fullName,
      email: patient.email,
      phoneNumber: patient.phoneNumber,
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
    if (!formData.fullName || !formData.email || !formData.phoneNumber || !formData.address) {
      showToast('Please fill in all fields!', 'error');
      return;
    }
    try {
      if (editingId) {
        const updateData: UpdatePatientPayload = {
          id: editingId,
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
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
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getBgColor = (name: string) => {
    const colors = ['bg-primary', 'bg-success', 'bg-danger', 'bg-warning', 'bg-info'];
    const sum = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    return colors[sum % colors.length];
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
      <div className="mx-auto" style={{ maxWidth: '1400px', minHeight: '85vh' }}>
        {/* Page Header Actions */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
          <div>
            <h2 className="fw-bolder font-manrope text-dark mb-1">Manage Patients</h2>
            <p className="text-muted mb-0">Oversee patient records, contact information, and medical histories.</p>
          </div>
        </div>

        {/* Stats Cards */}
        {/* <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center gap-4 h-100">
              <div className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center shrink-0" style={{ width: '56px', height: '56px' }}>
                <i className="bi bi-people-fill fs-3"></i>
              </div>
              <div>
                <p className="text-muted fw-bold mb-1 text-uppercase" style={{ fontSize: '11px', letterSpacing: '1px' }}>Total Patients</p>
                <h2 className="fw-bolder mb-0 font-manrope">{patients.length}</h2>
              </div>
            </div>
          </div>
        </div> */}

        {/* Patient Table Card */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
          <div className="card-header bg-light border-bottom p-4">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
              <h5 className="mb-0 fw-bold font-manrope">Patient Directory</h5>
              <input
                type="text"
                className="form-control"
                placeholder="Search by name, email, or username..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                style={{ maxWidth: '300px' }}
              />
            </div>
          </div>
          
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="py-3 px-4 text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Patient Name</th>
                  <th className="py-3 px-4 text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Username</th>
                  <th className="py-3 px-4 text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Email Address</th>
                  <th className="py-3 px-4 text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Phone Number</th>
                  <th className="py-3 px-4 text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Address</th>
                  <th className="py-3 px-4 text-end text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Actions</th>
                </tr>
              </thead>
              <tbody className="border-top-0">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-4">
                      <div className="spinner-border text-primary" role="status"></div>
                    </td>
                  </tr>
                ) : currentPatients.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-muted">No patients found</td>
                  </tr>
                ) : (
                  currentPatients.map((patient) => (
                    <tr key={patient.id}>
                      <td className="px-4 py-3">
                        <div className="d-flex align-items-center gap-3">
                          <div className={`${getBgColor(patient.fullName)}-subtle ${getBgColor(patient.fullName)} rounded-circle d-flex align-items-center justify-content-center fw-bold text-white`} style={{ width: '40px', height: '40px' }}>
                            {getInitials(patient.fullName)}
                          </div>
                          <div>
                            <div className="fw-bold text-dark">{patient.fullName}</div>
                            <small className="text-muted">ID: #{patient.id}</small>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted">{patient.username}</td>
                      <td className="px-4 py-3 text-muted">{patient.email}</td>
                      <td className="px-4 py-3 text-muted">{patient.phoneNumber}</td>
                      <td className="px-4 py-3 text-muted">{patient.address}</td>
                      <td className="px-4 py-3 text-end">
                        <button
                          className="btn btn-link text-primary p-0 me-3"
                          onClick={() => handleEdit(patient)}
                          title="Edit"
                        >
                          <i className="bi bi-pencil-square fs-5"></i>
                        </button>
                        <button
                          className="btn btn-link text-danger p-0"
                          onClick={() => handleDelete(patient.username)}
                          title="Delete"
                        >
                          <i className="bi bi-trash fs-5"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="card-footer bg-light d-flex justify-content-center p-3">
              <nav>
                <ul className="pagination mb-0">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPage(page)}>
                        {page}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="modal d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header border-bottom">
                  <h5 className="modal-title fw-bold font-manrope">
                    {editingId ? 'Edit Patient' : 'Add New Patient'}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label fw-bold">Full Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Email *</label>
                    <input
                      type="email"
                      className="form-control"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter email"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Phone Number *</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Address *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Enter address"
                    />
                  </div>
                </div>
                <div className="modal-footer border-top">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSave}
                  >
                    {editingId ? 'Update' : 'Create'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deletingUsername && (
          <div className="modal d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header border-bottom">
                  <h5 className="modal-title fw-bold font-manrope">Delete Patient</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setDeletingUsername(null)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p className="mb-0">
                    Are you sure you want to delete this patient? This action cannot be undone.
                  </p>
                </div>
                <div className="modal-footer border-top">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setDeletingUsername(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={confirmDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Toast Notification */}
        {toast.show && (
          <ToastNotification
            show={toast.show}
            message={toast.message}
            type={toast.type}
            onClose={() => setToast({ ...toast, show: false })}
          />
        )}
      </div>
    </AdminLayout>
  );
};
