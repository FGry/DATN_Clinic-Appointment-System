import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { specialtyApi } from '../../services/adminService';
import type { Specialty } from '../../types/models/Specialty';
import { ToastNotification } from '../../components/common/ToastNotification';
import type { ToastType } from '../../components/common/ToastNotification';
import { InputField } from '../../components/common/InputField';

export const AdminSpecialtiesPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [toast, setToast] = useState<{ show: boolean, message: string, type: ToastType }>({ show: false, message: '', type: 'success' });
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const showToast = (message: string, type: ToastType) => setToast({ show: true, message, type });

  useEffect(() => { loadSpecialties(); }, []);

  const loadSpecialties = async () => {
    setLoading(true);
    try {
      const data = await specialtyApi.getAll();
      setSpecialties(data);
    } catch (error) { console.error(error); } 
    finally { setLoading(false); }
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

  const handleDelete = (id: number | undefined) => { setDeletingId(id || null); };

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
    if (lower.includes('cardio')) return 'bi bi-heart-pulse-fill';
    if (lower.includes('neuro')) return 'bi bi-person-bounding-box';
    if (lower.includes('pediat')) return 'bi bi-emoji-smile-fill';
    if (lower.includes('derma')) return 'bi bi-bandaid-fill';
    if (lower.includes('onco')) return 'bi bi-virus';
    return 'bi bi-tags-fill';
  };

  const getColorClass = (name: string) => {
    const colors = ['#001835', '#006a6a', '#455f87', '#0f2d52', '#004f4f'];
    const sum = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    return colors[sum % colors.length];
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
      <div className="mx-auto font-manrope" style={{ maxWidth: '1400px', minHeight: '85vh' }}>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
          <div>
            <h2 className="fw-bolder text-dark mb-1" style={{ color: '#001835' }}>Manage Specialties</h2>
            <p className="text-muted mb-0">Configure and monitor clinical departments and medical expertise areas.</p>
          </div>
          <button className="btn fw-bold px-4 py-2 d-flex align-items-center gap-2 rounded-3 shadow-sm text-white transition-all active-scale" style={{ backgroundColor: '#001835' }} onClick={handleAddNew}>
            <i className="bi bi-plus-lg fs-5"></i> Add New Specialty
          </button>
        </div>

        {/* Bento Stats */}
        <div className="row g-4 mb-4">
          <div className="col-md-6">
            <div className="card border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center gap-4 bg-white border-start border-4" style={{ borderColor: '#001835' }}>
              <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                <i className="bi bi-tags-fill fs-3" style={{ color: '#001835' }}></i>
              </div>
              <div>
                <p className="text-muted fw-bold mb-1 text-uppercase" style={{ fontSize: '11px', letterSpacing: '1px' }}>Active Specialties</p>
                <h2 className="fw-bolder mb-0 font-manrope" style={{ color: '#001835' }}>{specialties.length}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center gap-4 bg-white border-start border-4" style={{ borderColor: '#006a6a' }}>
              <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                <i className="bi bi-graph-up-arrow fs-3" style={{ color: '#006a6a' }}></i>
              </div>
              <div>
                <p className="text-muted fw-bold mb-1 text-uppercase" style={{ fontSize: '11px', letterSpacing: '1px' }}>Busiest Department</p>
                <h2 className="fw-bolder mb-0 font-manrope" style={{ color: '#001835' }}>Cardiology</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
          <div className="card-header bg-white border-bottom p-4 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <h5 className="mb-0 fw-bold font-manrope" style={{ color: '#001835' }}>Clinical Specialties List</h5>
            <div className="input-group" style={{ maxWidth: '300px' }}>
              <span className="input-group-text bg-light border-0"><i className="bi bi-search text-muted"></i></span>
              <input
                type="text"
                className="form-control bg-light border-0 py-2"
                placeholder="Search specialty..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              />
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr className="text-uppercase text-muted fw-bold" style={{ fontSize: '12px' }}>
                  <th className="py-3 px-4" style={{ width: '30%' }}>Specialty Name</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4 text-end">Actions</th>
                </tr>
              </thead>
              <tbody className="border-top-0">
                {loading && <tr><td colSpan={3} className="text-center py-5"><div className="spinner-border text-primary"></div></td></tr>}
                {!loading && currentSpecialties.length === 0 && <tr><td colSpan={3} className="text-center py-5 text-muted">No specialties found.</td></tr>}
                {!loading && currentSpecialties.map((specialty) => (
                  <tr key={specialty.id}>
                    <td className="px-4 py-3">
                      <div className="d-flex align-items-center gap-3">
                        <div className="rounded-circle d-flex align-items-center justify-content-center bg-light shadow-sm" style={{ width: '40px', height: '40px', color: getColorClass(specialty.name) }}>
                          <i className={`${getIconClass(specialty.name)} fs-5`}></i>
                        </div>
                        <span className="fw-bold font-manrope" style={{ color: '#001835', fontSize: '16px' }}>{specialty.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-muted small fw-medium text-truncate d-inline-block" style={{ maxWidth: '500px' }}>{specialty.description}</span>
                    </td>
                    <td className="px-4 py-3 text-end">
                      <button type="button" onClick={() => handleEdit(specialty)} className="btn btn-link text-primary p-0 me-3"><i className="bi bi-pencil-square fs-5"></i></button>
                      <button type="button" onClick={() => handleDelete(specialty.id)} className="btn btn-link text-danger p-0"><i className="bi bi-trash fs-5"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {totalPages > 1 && (
            <div className="card-footer bg-white border-top p-4 d-flex justify-content-between align-items-center">
              <span className="text-muted small">Showing {currentSpecialties.length} of {filteredSpecialties.length} specialties</span>
              <div className="d-flex gap-2">
                <button className="btn btn-sm btn-outline-light border text-dark px-3 rounded-3" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>Prev</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button key={page} className={`btn btn-sm px-3 rounded-3 ${currentPage === page ? 'text-white' : 'btn-outline-light border text-dark'}`} style={{ backgroundColor: currentPage === page ? '#001835' : 'transparent' }} onClick={() => setCurrentPage(page)}>{page}</button>
                ))}
                <button className="btn btn-sm btn-outline-light border text-dark px-3 rounded-3" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Next</button>
              </div>
            </div>
          )}
        </div>

        <ToastNotification show={toast.show} message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, show: false })} />

        {/* --- Add/Edit Modal --- */}
        {showModal && (
          <>
            <div className="modal-backdrop fade show" style={{ backdropFilter: 'blur(5px)', backgroundColor: 'rgba(0,24,53,0.5)' }}></div>
            <div className="modal fade show d-block" tabIndex={-1}>
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content rounded-4 border-0 shadow-lg overflow-hidden">
                  <div className="modal-header bg-white py-4 px-4 border-bottom">
                    <h5 className="modal-title fw-bold font-manrope" style={{ color: '#001835' }}>{editingId ? 'Edit Specialty' : 'Add New Specialty'}</h5>
                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                  </div>
                  <div className="modal-body p-4 p-md-5">
                    <div className="mb-4">
                      <InputField id="name" label="Specialty Name" type="text" icon="tags" placeholder="e.g. Cardiology" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold text-muted small">Description</label>
                      <textarea className="form-control py-3 bg-light border-0 shadow-sm" placeholder="Enter specialty description" rows={4} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>
                    </div>
                  </div>
                  <div className="modal-footer bg-light py-3 px-4 border-top-0">
                    <button type="button" onClick={() => setShowModal(false)} className="btn btn-link text-muted fw-bold text-decoration-none px-4">Cancel</button>
                    <button type="button" onClick={handleSave} className="btn text-white fw-bold px-4 rounded-3 shadow-sm" style={{ backgroundColor: '#006a6a' }}>
                      {editingId ? 'Update Specialty' : 'Create Specialty'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Delete Confirmation Modal */}
        {deletingId && (
          <>
            <div className="modal-backdrop fade show" style={{ backdropFilter: 'blur(5px)', backgroundColor: 'rgba(0,24,53,0.5)' }}></div>
            <div className="modal fade show d-block" tabIndex={-1}>
              <div className="modal-dialog modal-dialog-centered modal-sm">
                <div className="modal-content rounded-4 border-0 shadow">
                  <div className="modal-body p-4 text-center">
                    <div className="text-danger mb-3">
                      <i className="bi bi-exclamation-circle" style={{ fontSize: '3rem' }}></i>
                    </div>
                    <h5 className="fw-bold mb-2 font-manrope" style={{ color: '#001835' }}>Confirm Deletion</h5>
                    <p className="text-muted mb-4 small">Are you sure you want to delete this specialty? This action cannot be undone.</p>
                    <div className="d-flex justify-content-center gap-2">
                      <button type="button" className="btn btn-light rounded-3 px-4 fw-medium" onClick={() => setDeletingId(null)}>Cancel</button>
                      <button type="button" className="btn btn-danger rounded-3 px-4 fw-medium" onClick={confirmDelete}>Delete</button>
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