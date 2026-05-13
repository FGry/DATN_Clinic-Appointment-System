import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { receptionistApi } from '../../services/adminService';
import type { CreateReceptionistPayload, Receptionist, UpdateReceptionistPayload } from '../../types/models/Receptionist';
import { InputField } from '../../components/common/InputField';

export const AdminReceptionistsPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [receptionists, setReceptionists] = useState<Receptionist[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<Receptionist | null>(null);

  const [formData, setFormData] = useState<CreateReceptionistPayload>({
    fullName: '', username: '', password: '', phone: '', address: '', email: '',
  });

  const loadReceptionists = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await receptionistApi.getAll();
      setReceptionists(data);
    } catch (err: any) {
      console.error(err);
      setError((err && err.message) || 'Failed to load receptionists');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadReceptionists(); }, []);

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({ fullName: '', username: '', password: '', phone: '', address: '', email: '' });
    setShowModal(true);
  };

  const handleEdit = (receptionist: Receptionist) => {
    setEditingId(receptionist.id ?? null);
    setFormData({
      fullName: receptionist.fullName, username: receptionist.username, password: '',
      phone: receptionist.phone, address: receptionist.address, email: receptionist.email,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!formData.fullName || !formData.username || !formData.phone || !formData.address || !formData.email) {
      setError('Please fill all required fields.');
      return;
    }
    if (!formData.password && !editingId) {
      setError('Password is required when creating a receptionist account.');
      return;
    }

    setSaving(true);
    setError('');
    try {
      if (editingId) {
        const updatePayload: UpdateReceptionistPayload = { ...formData };
        await receptionistApi.update(editingId, updatePayload);
      } else {
        await receptionistApi.create(formData);
      }
      setShowModal(false);
      await loadReceptionists();
    } catch (err: any) {
      console.error(err);
      setError((err && err.message) || 'Failed to save receptionist');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await receptionistApi.deleteByUsername(deleteTarget.username);
      setDeleteTarget(null);
      await loadReceptionists();
    } catch (err: any) {
      console.error(err);
      setError((err && err.message) || 'Failed to delete receptionist');
      setDeleteTarget(null);
    }
  };

  return (
    <AdminLayout>
      <div className="mx-auto font-manrope" style={{ maxWidth: '1400px', minHeight: '85vh' }}>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
          <div>
            <h2 className="fw-bolder text-dark mb-1" style={{ color: '#001835' }}>Manage Receptionists</h2>
            <p className="text-muted mb-0">Oversee front-desk personnel, shift schedules, and staff credentials.</p>
          </div>
          <button className="btn fw-bold px-4 py-2 d-flex align-items-center gap-2 rounded-3 shadow-sm text-white transition-all active-scale" style={{ backgroundColor: '#001835' }} onClick={handleAddNew}>
            <i className="bi bi-person-badge-fill fs-5"></i> Add New Receptionist
          </button>
        </div>

        {/* Bento Stats */}
        {/* <div className="row g-4 mb-4">
          <div className="col-md-6">
            <div className="card border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center gap-4 bg-white border-start border-4" style={{ borderColor: '#001835' }}>
              <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                <i className="bi bi-person-workspace fs-3" style={{ color: '#001835' }}></i>
              </div>
              <div>
                <p className="text-muted fw-bold mb-1 text-uppercase" style={{ fontSize: '11px', letterSpacing: '1px' }}>Total Receptionists</p>
                <h2 className="fw-bolder mb-0 font-manrope" style={{ color: '#001835' }}>{receptionists.length}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center gap-4 bg-white border-start border-4" style={{ borderColor: '#006a6a' }}>
              <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                <i className="bi bi-envelope-check-fill fs-3" style={{ color: '#006a6a' }}></i>
              </div>
              <div>
                <p className="text-muted fw-bold mb-1 text-uppercase" style={{ fontSize: '11px', letterSpacing: '1px' }}>Unique Emails</p>
                <h2 className="fw-bolder mb-0 font-manrope" style={{ color: '#001835' }}>{new Set(receptionists.map(r => r.email)).size}</h2>
              </div>
            </div>
          </div>
        </div> */}

        {error && !showModal && <div className="alert alert-danger shadow-sm border-0 mb-4">{error}</div>}

        {/* Table Area */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
          <div className="card-header bg-white border-bottom p-4 d-flex justify-content-between align-items-center">
            <h5 className="mb-0 fw-bold font-manrope" style={{ color: '#001835' }}>Receptionist Directory</h5>
            <button className="btn btn-sm btn-outline-light border text-muted px-3" onClick={loadReceptionists} title="Refresh">
              <i className="bi bi-arrow-clockwise me-1"></i> Refresh
            </button>
          </div>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr className="text-uppercase text-muted fw-bold" style={{ fontSize: '12px' }}>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Username</th>
                  <th className="py-3 px-4">Contact Info</th>
                  <th className="py-3 px-4 text-end">Actions</th>
                </tr>
              </thead>
              <tbody className="border-top-0">
                {loading ? (
                  <tr><td colSpan={4} className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></td></tr>
                ) : receptionists.length === 0 ? (
                  <tr><td colSpan={4} className="text-center py-5 text-muted">No receptionist accounts found.</td></tr>
                ) : (
                  receptionists.map((item) => (
                    <tr key={item.id ?? item.username}>
                      <td className="px-4 py-3">
                        <div className="d-flex align-items-center gap-3">
                          <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white shadow-sm" style={{ width: '40px', height: '40px', backgroundColor: '#001835' }}>
                            {item.fullName?.slice(0, 1).toUpperCase() || 'R'}
                          </div>
                          <div>
                            <div className="fw-bold text-dark font-manrope">{item.fullName}</div>
                            <small className="text-muted">{item.email}</small>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3"><code style={{ color: '#006a6a' }}>@{item.username}</code></td>
                      <td className="px-4 py-3">
                        <div className="text-dark small fw-medium">{item.phone}</div>
                        <small className="text-muted text-truncate d-inline-block" style={{ maxWidth: '200px' }}>{item.address}</small>
                      </td>
                      <td className="px-4 py-3 text-end">
                        <button className="btn btn-link text-primary p-0 me-3" onClick={() => handleEdit(item)}><i className="bi bi-pencil-square fs-5"></i></button>
                        <button className="btn btn-link text-danger p-0" onClick={() => setDeleteTarget(item)}><i className="bi bi-trash fs-5"></i></button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* --- Add/Edit Modal --- */}
      {showModal && (
        <>
          <div className="modal-backdrop fade show" style={{ backdropFilter: 'blur(5px)', backgroundColor: 'rgba(0,24,53,0.5)' }}></div>
          <div className="modal fade show d-block" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
                <div className="modal-header bg-white py-4 px-4 border-bottom">
                  <h4 className="modal-title font-manrope fw-bolder" style={{ color: '#001835' }}>{editingId ? 'Edit Receptionist' : 'Add New Receptionist'}</h4>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body p-4 p-md-5">
                  {error && <div className="alert alert-danger small fw-bold">{error}</div>}
                  <form className="row g-3">
                    <div className="col-md-6">
                      <InputField id="username" label="Username" type="text" icon="person-badge" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
                    </div>
                    <div className="col-md-6">
                      <InputField id="password" label="Password" type="password" icon="lock" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder={editingId ? 'Leave blank to keep current' : 'Enter password'} />
                    </div>
                    <div className="col-12">
                      <InputField id="fullName" label="Full Name" type="text" icon="person" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
                    </div>
                    <div className="col-md-6">
                      <InputField id="email" label="Email Address" type="email" icon="envelope" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                    <div className="col-md-6">
                      <InputField id="phone" label="Phone Number" type="tel" icon="telephone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                    </div>
                    <div className="col-12">
                      <InputField id="address" label="Address" type="text" icon="house" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                    </div>
                  </form>
                </div>
                <div className="modal-footer bg-light py-3 px-4 border-top-0">
                  <button type="button" className="btn btn-link text-muted fw-bold text-decoration-none px-4" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="button" className="btn text-white fw-bold px-4 rounded-3 shadow-sm" style={{ backgroundColor: '#006a6a' }} onClick={handleSave} disabled={saving}>
                    {saving ? 'Saving...' : editingId ? 'Update Receptionist' : 'Add Receptionist'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Delete Confirmation */}
      {deleteTarget && (
        <>
          <div className="modal-backdrop fade show" style={{ backdropFilter: 'blur(5px)', backgroundColor: 'rgba(0,24,53,0.5)' }}></div>
          <div className="modal fade show d-block" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered modal-sm">
              <div className="modal-content rounded-4 border-0 shadow">
                <div className="modal-body p-4 text-center">
                  <div className="text-danger mb-3">
                    <i className="bi bi-exclamation-circle" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h5 className="fw-bold mb-2 font-manrope" style={{ color: '#001835' }}>Delete Receptionist</h5>
                  <p className="text-muted mb-4 small">Delete account <strong>{deleteTarget.username}</strong>? This action cannot be undone.</p>
                  <div className="d-flex justify-content-center gap-2">
                    <button className="btn btn-light rounded-3 px-4 fw-medium" onClick={() => setDeleteTarget(null)}>Cancel</button>
                    <button className="btn btn-danger rounded-3 px-4 fw-medium" onClick={confirmDelete}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};