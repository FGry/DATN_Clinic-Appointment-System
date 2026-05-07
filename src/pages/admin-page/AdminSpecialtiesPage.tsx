import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { specialtyApi } from '../../services/adminService';
import type { Specialty } from '../../types/models/Specialty';
import { ToastNotification } from '../../components/common/ToastNotification';
import type { ToastType } from '../../components/common/ToastNotification';

export const AdminSpecialtiesPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [toast, setToast] = useState<{ show: boolean, message: string, type: ToastType }>({ show: false, message: '', type: 'success' });
  const showToast = (message: string, type: ToastType) => setToast({ show: true, message, type });

  // New states for pagination and search
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;



  useEffect(() => {
    loadSpecialties();
  }, []);

  const loadSpecialties = async () => {
    setLoading(true);
    try {
      const data = await specialtyApi.getAll();
      setSpecialties(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({ name: '', description: '' });
    setShowModal(true);
  };

  const handleEdit = (specialty: Specialty) => {
    setEditingId(specialty.id || null);
    setFormData({ name: specialty.name, description: specialty.description });
    setShowModal(true);
  };

  const handleDelete = (id: number | undefined) => {
    setDeletingId(id || null);
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    try {
      await specialtyApi.delete(deletingId);
      await loadSpecialties();
      showToast('Specialty deleted successfully!', 'success');
    } catch (error) {
      console.error(error);
      showToast('Failed to delete specialty!', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await specialtyApi.update(editingId, formData);
        showToast('Specialty updated successfully!', 'success');
      } else {
        await specialtyApi.create(formData);
        showToast('Specialty created successfully!', 'success');
      }
      setShowModal(false);
      await loadSpecialties();
    } catch (error: any) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to save specialty!';
      showToast(errorMessage !== 'Something went wrong' ? errorMessage : 'Failed to save specialty! Specialty might already exist.', 'error');
    }
  };

  const getIconClass = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('cardio')) return 'bi bi-heart';
    if (lower.includes('neuro')) return 'bi bi-person-bounding-box';
    if (lower.includes('pediat')) return 'bi bi-emoji-smile';
    if (lower.includes('derma')) return 'bi bi-bandaid';
    if (lower.includes('onco')) return 'bi bi-virus';
    return 'bi bi-activity';
  };

  const getColorClass = (name: string) => {
    const colors = ['text-primary', 'text-success', 'text-danger', 'text-warning', 'text-info'];
    const sum = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    return colors[sum % colors.length];
  };

  const getBgClass = (name: string) => {
    const bgs = ['bg-primary-subtle', 'bg-success-subtle', 'bg-danger-subtle', 'bg-warning-subtle', 'bg-info-subtle'];
    const sum = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    return bgs[sum % bgs.length];
  };

  const filteredSpecialties = specialties.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSpecialties.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSpecialties = filteredSpecialties.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <AdminLayout>
      <div className="mx-auto" style={{ maxWidth: '1400px', minHeight: '85vh' }}>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
          <div>
            <h2 className="fw-bolder font-manrope text-dark mb-1">Manage Specialties</h2>
            <p className="text-muted mb-0">Configure and monitor clinical departments and medical expertise areas.</p>
          </div>
          <button className="btn btn-primary fw-bold px-4 py-2 d-flex align-items-center gap-2 rounded-3 shadow-sm" onClick={handleAddNew}>
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
                <h2 className="fw-bolder mb-0 font-manrope">{specialties.length}</h2>
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
          <div className="card-header bg-white border-bottom p-4 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <h5 className="mb-0 fw-bold font-manrope text-dark">Clinical Specialties List</h5>
            <div className="d-flex align-items-center gap-2">
              <div className="input-group input-group-sm" style={{ width: '250px' }}>
                <span className="input-group-text bg-light border-0">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control bg-light border-0 ps-2 focus-ring-none"
                  placeholder="Search specialty..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="px-4 py-3 fw-bold text-muted" style={{ fontSize: '11px', letterSpacing: '1px' }}>SPECIALTY NAME</th>
                  <th className="px-4 py-3 fw-bold text-muted" style={{ fontSize: '11px', letterSpacing: '1px' }}>DESCRIPTION</th>
                  <th className="px-4 py-3 text-end fw-bold text-muted" style={{ fontSize: '11px', letterSpacing: '1px' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody className="border-top-0">
                {loading && (
                  <tr>
                    <td colSpan={3} className="text-center py-4 text-muted">
                      Loading specialties...
                    </td>
                  </tr>
                )}
                {currentSpecialties.map((specialty) => (
                  <tr key={specialty.id}>
                    <td className="px-4 py-3">
                      <div className="d-flex align-items-center gap-3">
                        <div className={`${getBgClass(specialty.name)} ${getColorClass(specialty.name)} rounded-circle d-flex align-items-center justify-content-center`} style={{ width: '36px', height: '36px' }}>
                          <i className={`${getIconClass(specialty.name)} fs-6`}></i>
                        </div>
                        <span className={`fw-bold ${getColorClass(specialty.name)}`}>{specialty.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-secondary small fw-medium text-truncate d-inline-block" style={{ maxWidth: '300px' }}>{specialty.description}</span>
                    </td>
                    <td className="px-4 py-3 text-end">
                      <button
                        type="button"
                        onClick={() => handleEdit(specialty)}
                        className="btn btn-link text-primary p-0 me-3"
                        title="Edit">
                        <i className="bi bi-pencil-square fs-5"></i>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(specialty.id)}
                        className="btn btn-link text-danger p-0"
                        title="Delete">
                        <i className="bi bi-trash fs-5"></i>
                      </button>
                    </td>
                  </tr>
                ))}
                {!loading && currentSpecialties.length === 0 && (
                  <tr>
                    <td colSpan={3} className="text-center py-4 text-muted">
                      No specialties found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="card-footer bg-white border-top p-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
            <span className="text-muted small">
              Showing {filteredSpecialties.length === 0 ? 0 : indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredSpecialties.length)} of {filteredSpecialties.length} specialties
            </span>
            <div className="d-flex gap-2">
              <button
                className="btn btn-light btn-sm fw-medium border"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  className={`btn btn-sm fw-medium border ${currentPage === page ? 'btn-primary border-primary' : 'btn-light'}`}
                  onClick={() => setCurrentPage(page)}
                  style={{ width: '32px' }}
                >
                  {page}
                </button>
              ))}
              <button
                className="btn btn-light btn-sm fw-medium border"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        <ToastNotification 
          show={toast.show}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />

        {/* --- Add Specialty Modal --- */}
        {showModal && (
          <>
            <div className="modal-backdrop fade show"></div>
            <div className="modal fade show d-block" style={{ display: 'block' }}>
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content rounded-4">
                  <div className="modal-header border-bottom">
                    <h5 className="modal-title fw-bold">
                      {editingId ? 'Edit Specialty' : 'Add New Specialty'}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowModal(false)}>
                    </button>
                  </div>
                  <div className="modal-body p-4">
                    <div className="mb-3">
                      <label className="form-label fw-bold">Name</label>
                      <input
                        type="text"
                        className="form-control rounded-3"
                        placeholder="Enter specialty name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Description</label>
                      <textarea
                        className="form-control rounded-3"
                        placeholder="Enter specialty description"
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      ></textarea>
                    </div>
                  </div>
                  <div className="modal-footer border-top">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="btn btn-secondary rounded-3">
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSave}
                      className="btn btn-primary rounded-3">
                      {editingId ? 'Update' : 'Create'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {/* --- Delete Confirmation Modal --- */}
        {deletingId && (
          <>
            <div className="modal-backdrop fade show"></div>
            <div className="modal fade show d-block" style={{ display: 'block' }}>
              <div className="modal-dialog modal-dialog-centered modal-sm">
                <div className="modal-content rounded-4 border-0 shadow">
                  <div className="modal-body p-4 text-center">
                    <div className="text-danger mb-3">
                      <i className="bi bi-exclamation-circle" style={{ fontSize: '3rem' }}></i>
                    </div>
                    <h5 className="fw-bold mb-2">Confirm Deletion</h5>
                    <p className="text-muted mb-4 small">Are you sure you want to delete this specialty? This action cannot be undone.</p>
                    <div className="d-flex justify-content-center gap-2">
                      <button 
                        type="button" 
                        className="btn btn-light rounded-3 px-4 fw-medium"
                        onClick={() => setDeletingId(null)}>
                        Cancel
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-danger rounded-3 px-4 fw-medium"
                        onClick={confirmDelete}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};