import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { specialtyApi } from '../../services/api';
import type { Specialty } from '../../types/models/Specialty';

export const AdminSpecialtiesPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '' });

  const getRandomColor = (id: number | undefined) => {
    const colors = [
      'text-primary',
      'text-success',
      'text-danger',
      'text-warning',
      'text-info',
      'text-purple'
    ];
    return colors[(id || 0) % colors.length];
  };

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

  const handleDelete = async (id: number | undefined) => {
    if (!id || !window.confirm('Bạn chắc chắn muốn xóa?')) return;
    try {
      await specialtyApi.delete(id);
      await loadSpecialties();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await specialtyApi.update(editingId, formData);
      } else {
        await specialtyApi.create(formData);
      }
      setShowModal(false);
      await loadSpecialties();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AdminLayout>
      <div className="mx-auto" style={{ maxWidth: '1400px' }}>
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
          <div className="card-header bg-light border-bottom p-4 d-flex justify-content-between align-items-center">
            <h5 className="mb-0 fw-bold font-manrope text-dark">Clinical Specialties List</h5>
          </div>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="px-4 py-3 fw-bold text-muted">Specialty Name</th>
                  <th className="px-4 py-3 fw-bold text-muted">Description</th>
                  <th className="px-4 py-3 text-end fw-bold text-muted">Actions</th>
                </tr>
              </thead>
              <tbody className="border-top-0">
                {specialties.map((specialty) => (
                  <tr key={specialty.id}>
                    <td className="px-4 py-3">
                      <span className={`fw-bold ${getRandomColor(specialty.id)}`}>{specialty.name}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-secondary-emphasis">{specialty.description}</span>
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
              </tbody>
            </table>
          </div>
        </div>

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
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Description</label>
                    <textarea 
                      className="form-control rounded-3"
                      placeholder="Enter specialty description"
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
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
    </div>
    </AdminLayout>
  );
};