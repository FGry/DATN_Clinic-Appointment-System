import React, { useEffect, useMemo, useState } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { receptionistApi } from '../../services/adminService';
import type {
  CreateReceptionistPayload,
  Receptionist,
  UpdateReceptionistPayload,
} from '../../types/models/Receptionist';

export const AdminReceptionistsPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [receptionists, setReceptionists] = useState<Receptionist[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<Receptionist | null>(null);

  const [formData, setFormData] = useState<CreateReceptionistPayload>({
    fullName: '',
    username: '',
    password: '',
    phone: '',
    address: '',
    email: '',
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

  useEffect(() => {
    loadReceptionists();
  }, []);

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({
      fullName: '',
      username: '',
      password: '',
      phone: '',
      address: '',
      email: '',
    });
    setShowModal(true);
  };

  const handleEdit = (receptionist: Receptionist) => {
    setEditingId(receptionist.id ?? null);
    setFormData({
      fullName: receptionist.fullName,
      username: receptionist.username,
      password: '',
      phone: receptionist.phone,
      address: receptionist.address,
      email: receptionist.email,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!formData.fullName || !formData.username || !formData.phone || !formData.address || !formData.email) {
      setError('Please fill all required fields.');
      return;
    }

    if (!formData.password) {
      setError(editingId ? 'Password is required when updating receptionist information.' : 'Password is required when creating a receptionist account.');
      return;
    }

    setSaving(true);
    setError('');
    try {
      if (editingId) {
        const updatePayload: UpdateReceptionistPayload = {
          fullName: formData.fullName,
          username: formData.username,
          password: formData.password,
          phone: formData.phone,
          address: formData.address,
          email: formData.email,
        };
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

  // const totalReceptionists = receptionists.length;
  // const emails = useMemo(() => new Set(receptionists.map((item) => item.email.toLowerCase())).size, [receptionists]);

  return (
    <AdminLayout>
      <div className="mx-auto" style={{ maxWidth: '1400px' }}>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
          <div>
            <h2 className="fw-bolder font-manrope text-dark mb-1">Manage Receptionists</h2>
            <p className="text-muted mb-0">Oversee front-desk personnel, shift schedules, and staff credentials.</p>
          </div>
          <button className="btn btn-primary fw-bold px-4 py-2 d-flex align-items-center gap-2 rounded-3 shadow-sm" onClick={handleAddNew}>
            <i className="bi bi-person-plus-fill fs-5"></i> Add New Receptionist
          </button>
        </div>

        {/* <div className="row g-4 mb-4">
          <div className="col-md-6">
            <div className="card border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center gap-4">
              <div className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                <i className="bi bi-person-badge fs-4"></i>
              </div>
              <div>
                <p className="text-muted fw-bold mb-1 text-uppercase" style={{ fontSize: '11px', letterSpacing: '1px' }}>Total Receptionists</p>
                <h2 className="fw-bolder mb-0 font-manrope">{totalReceptionists}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center gap-4">
              <div className="bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                <i className="bi bi-envelope-check fs-4"></i>
              </div>
              <div>
                <p className="text-muted fw-bold mb-1 text-uppercase" style={{ fontSize: '11px', letterSpacing: '1px' }}>Unique Emails</p>
                <h2 className="fw-bolder mb-0 font-manrope">{emails}</h2>
              </div>
            </div>
          </div>
        </div> */}

        {error && <div className="alert alert-danger mb-4">{error}</div>}

        {/* Table Area */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
          <div className="card-header bg-light border-bottom p-4 d-flex justify-content-between align-items-center">
            <h5 className="mb-0 fw-bold font-manrope">Receptionist Directory</h5>
            <div className="d-flex gap-2">
              <button className="btn btn-sm btn-white border text-muted" onClick={loadReceptionists} title="Refresh">
                <i className="bi bi-arrow-clockwise"></i>
              </button>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="py-3 px-4 text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Name</th>
                  <th className="py-3 px-4 text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Username</th>
                  <th className="py-3 px-4 text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Contact</th>
                  <th className="py-3 px-4 text-end text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Actions</th>
                </tr>
              </thead>
              <tbody className="border-top-0">
                {loading && (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-muted">Loading receptionists...</td>
                  </tr>
                )}
                {!loading && receptionists.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-muted">No receptionist accounts found.</td>
                  </tr>
                )}
                {!loading && receptionists.map((item) => (
                  <tr key={item.id ?? item.username}>
                    <td className="px-4 py-3">
                      <div className="d-flex align-items-center gap-3">
                        <div className="rounded-circle bg-light d-flex align-items-center justify-content-center fw-bold text-primary" style={{ width: '40px', height: '40px' }}>
                          {item.fullName?.slice(0, 1).toUpperCase() || 'R'}
                        </div>
                        <div>
                          <div className="fw-bold text-dark">{item.fullName}</div>
                          <small className="text-muted">{item.email}</small>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted">{item.username}</td>
                    <td className="px-4 py-3">
                      <div className="text-dark small">{item.phone}</div>
                      <small className="text-muted">{item.address}</small>
                    </td>
                    <td className="px-4 py-3 text-end">
                      <button className="btn btn-link text-primary p-0 me-3" onClick={() => handleEdit(item)}>
                        <i className="bi bi-pencil-square fs-5"></i>
                      </button>
                      <button className="btn btn-link text-danger p-0" onClick={() => setDeleteTarget(item)}>
                        <i className="bi bi-trash fs-5"></i>
                      </button>
                    </td>
                  </tr>
                ))}
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
                  <h4 className="modal-title font-manrope fw-bolder text-dark">{editingId ? 'Edit Receptionist' : 'Add New Receptionist'}</h4>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body p-4">
                  {error && <div className="alert alert-danger">{error}</div>}
                  <form className="row g-3">
                    <div className="col-12">
                      <label className="form-label fw-bold text-muted small">Username</label>
                      <input
                        type="text"
                        className="form-control py-2"
                        value={formData.username}
                        onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-bold text-muted small">Password</label>
                      <input
                        type="password"
                        className="form-control py-2"
                        value={formData.password}
                        onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                        placeholder={editingId ? 'Enter new password' : 'Enter password'}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-bold text-muted small">Full Name</label>
                      <input
                        type="text"
                        className="form-control py-2"
                        value={formData.fullName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold text-muted small">Email</label>
                      <input
                        type="email"
                        className="form-control py-2"
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold text-muted small">Phone Number</label>
                      <input
                        type="tel"
                        className="form-control py-2"
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-bold text-muted small">Address</label>
                      <input
                        type="text"
                        className="form-control py-2"
                        value={formData.address}
                        onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer bg-light py-3 px-4 border-top-0">
                  <button type="button" className="btn btn-link text-secondary fw-bold text-decoration-none px-4" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="button" className="btn btn-primary fw-bold px-4 rounded-3" onClick={handleSave} disabled={saving}>
                    {saving ? 'Saving...' : editingId ? 'Update Receptionist' : 'Add Receptionist'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {deleteTarget && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show d-block" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered modal-sm">
              <div className="modal-content rounded-4 border-0 shadow">
                <div className="modal-body p-4 text-center">
                  <div className="text-danger mb-3">
                    <i className="bi bi-exclamation-circle" style={{ fontSize: '2.25rem' }}></i>
                  </div>
                  <h5 className="fw-bold mb-2">Delete Receptionist</h5>
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