import React, { useEffect, useMemo, useState } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { ToastNotification } from '../../components/common/ToastNotification';
import type { ToastType } from '../../components/common/ToastNotification';
import { doctorApi, specialtyApi } from '../../services/adminService';
import type { AdminDoctor, CreateDoctorPayload, UpdateDoctorPayload } from '../../types/models/Doctor';
import type { Specialty } from '../../types/models/Specialty';

type DoctorFormState = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  gender: boolean;
  password: string;
  specialtyId: number;
  fee: number;
  experience: string;
  avaUrl: string;
};

const emptyForm: DoctorFormState = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  gender: true,
  password: '',
  specialtyId: 0,
  fee: 0,
  experience: '',
  avaUrl: '',
};

export const AdminDoctorsPage: React.FC = () => {
  const [doctors, setDoctors] = useState<AdminDoctor[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<DoctorFormState>(emptyForm);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: ToastType }>({
    show: false,
    message: '',
    type: 'success',
  });

  const itemsPerPage = 6;

  const showToast = (message: string, type: ToastType) => {
    setToast({ show: true, message, type });
  };

  useEffect(() => {
    void Promise.all([loadDoctors(), loadSpecialties()]);
  }, []);

  const loadDoctors = async () => {
    setLoading(true);
    try {
      const data = await doctorApi.getAll();
      setDoctors(data);
    } catch (error) {
      console.error(error);
      showToast('Failed to load doctors!', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadSpecialties = async () => {
    try {
      const data = await specialtyApi.getAll();
      setSpecialties(data);
    } catch (error) {
      console.error(error);
      showToast('Failed to load specialties!', 'error');
    }
  };

  const specialtyMap = useMemo(() => {
    return specialties.reduce<Record<number, string>>((acc, item) => {
      if (item.id) {
        acc[item.id] = item.name;
      }
      return acc;
    }, {});
  }, [specialties]);

  const filteredDoctors = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase();
    if (!keyword) {
      return doctors;
    }

    return doctors.filter((doctor) => {
      const specialtyName = doctor.specialtyName ?? '';
      return (
        doctor.fullName.toLowerCase().includes(keyword) ||
        doctor.email.toLowerCase().includes(keyword) ||
        doctor.phone.toLowerCase().includes(keyword) ||
        specialtyName.toLowerCase().includes(keyword)
      );
    });
  }, [doctors, searchQuery, specialtyMap]);

  const totalPages = Math.max(1, Math.ceil(filteredDoctors.length / itemsPerPage));
  const indexOfLast = currentPage * itemsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfLast - itemsPerPage, indexOfLast);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (doctor: AdminDoctor) => {
    setEditingId(doctor.id ?? null);
    setFormData({
      fullName: doctor.fullName ?? '',
      email: doctor.email ?? '',
      phone: doctor.phone ?? '',
      address: doctor.address ?? '',
      gender: doctor.gender ?? true,
      password: '',
      specialtyId: doctor.specialtyId ?? 0,
      fee: doctor.fee ?? 0,
      experience: doctor.experience ?? '',
      avaUrl: doctor.avaUrl ?? '',
    });
    setShowModal(true);
  };

  const validateForm = () => {
    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim() ||
      !formData.password.trim() ||
      !formData.experience.trim() ||
      !formData.avaUrl.trim() ||
      formData.specialtyId <= 0
    ) {
      showToast('Please fill all required fields!', 'error');
      return false;
    }

    if (formData.fee < 0) {
      showToast('Fee must be greater than or equal to 0!', 'error');
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      if (editingId !== null) {
        const payload: UpdateDoctorPayload = {
          id: editingId,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          gender: formData.gender,
          password: formData.password,
          specialtyId: formData.specialtyId,
          fee: formData.fee,
          experience: formData.experience,
          avaUrl: formData.avaUrl,
        };
        await doctorApi.update(editingId, payload);
        showToast('Doctor updated successfully!', 'success');
      } else {
        const payload: CreateDoctorPayload = {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          gender: formData.gender,
          password: formData.password,
          specialtyId: formData.specialtyId,
          fee: formData.fee,
          experience: formData.experience,
          avaUrl: formData.avaUrl,
        };
        await doctorApi.create(payload);
        showToast('Doctor created successfully!', 'success');
      }

      setShowModal(false);
      await loadDoctors();
    } catch (error: unknown) {
      console.error(error);
      showToast('Failed to save doctor!', 'error');
    }
  };

  const confirmDelete = async () => {
    if (!deletingId) {
      return;
    }

    try {
      await doctorApi.deleteById(deletingId);
      showToast('Doctor deleted successfully!', 'success');
      await loadDoctors();
    } catch (error) {
      console.error(error);
      showToast('Failed to delete doctor!', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <AdminLayout>
      <div className="mx-auto" style={{ maxWidth: '1400px', minHeight: '85vh' }}>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
          <div>
            <h2 className="fw-bolder font-manrope text-dark mb-1">Manage Doctors</h2>
            <p className="text-muted mb-0">Quản lý danh sách bác sĩ, chuyên khoa và thông tin hành nghề.</p>
          </div>
          <button className="btn fw-bold px-4 py-2 d-flex align-items-center gap-2 rounded-3 shadow-sm text-white transition-all active-scale" style={{ backgroundColor: '#001835' }} onClick={openCreateModal}>
            <i className="bi bi-plus-lg fs-5"></i>
            Add New Doctor
          </button>
        </div>

        {/* <div className="row g-4 mb-4">
          <div className="col-md-6">
            <div className="card border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center gap-4 h-100">
              <div className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center shrink-0" style={{ width: '56px', height: '56px' }}>
                <i className="bi bi-person-badge-fill fs-3"></i>
              </div>
              <div>
                <p className="text-muted fw-bold mb-1 text-uppercase" style={{ fontSize: '11px', letterSpacing: '1px' }}>Total Doctors</p>
                <h2 className="fw-bolder mb-0 font-manrope">{doctors.length}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center gap-4 h-100">
              <div className="bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center shrink-0" style={{ width: '56px', height: '56px' }}>
                <i className="bi bi-hospital-fill fs-3"></i>
              </div>
              <div>
                <p className="text-muted fw-bold mb-1 text-uppercase" style={{ fontSize: '11px', letterSpacing: '1px' }}>Total Specialties</p>
                <h2 className="fw-bolder mb-0 font-manrope">{specialties.length}</h2>
              </div>
            </div>
          </div>
        </div> */}

        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
          <div className="card-header bg-light border-bottom p-4">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
              <h5 className="mb-0 fw-bold font-manrope">Doctor Directory</h5>
              <input
                type="text"
                className="form-control"
                placeholder="Search by doctor, email, phone or specialty..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                style={{ maxWidth: '340px' }}
              />
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="py-3 px-4 text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Doctor</th>
                  <th className="py-3 px-4 text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Specialty</th>
                  <th className="py-3 px-4 text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Contact</th>
                  <th className="py-3 px-4 text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Fee</th>
                  <th className="py-3 px-4 text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Experience</th>
                  <th className="py-3 px-4 text-end text-muted text-uppercase fw-bold" style={{ fontSize: '12px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-4">
                      <div className="spinner-border text-primary" role="status"></div>
                    </td>
                  </tr>
                ) : currentDoctors.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-muted">No doctors found</td>
                  </tr>
                ) : (
                  currentDoctors.map((doctor) => (
                    <tr key={doctor.id}>
                      <td className="px-4 py-3">
                        <div className="d-flex align-items-center gap-3">
                          <img
                            src={doctor.avaUrl || 'https://placehold.co/48x48'}
                            alt={doctor.fullName}
                            className="rounded-circle border"
                            style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                          />
                          <div>
                            <div className="fw-bold text-dark">{doctor.fullName}</div>
                            <small className="text-muted">ID: #{doctor.id}</small>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted">{doctor.specialtyName ?? `#${doctor.specialtyId}`}</td>
                      <td className="px-4 py-3 text-muted">
                        <div>{doctor.email}</div>
                        <small>{doctor.phone}</small>
                      </td>
                      <td className="px-4 py-3 text-muted">{doctor.fee.toLocaleString()}</td>
                      <td className="px-4 py-3 text-muted">{doctor.experience}</td>
                      <td className="px-4 py-3 text-end">
                        <button className="btn btn-link text-primary p-0 me-3" onClick={() => openEditModal(doctor)} title="Edit">
                          <i className="bi bi-pencil-square fs-5"></i>
                        </button>
                        <button
                          className="btn btn-link text-danger p-0"
                          onClick={() => setDeletingId(doctor.id ?? null)}
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

          {totalPages > 1 && (
            <div className="card-footer bg-light d-flex justify-content-center p-3">
              <nav>
                <ul className="pagination mb-0">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}>
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
                    <button className="page-link" onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}>
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>

        {showModal && (
          <div className="modal d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header border-bottom">
                  <h5 className="modal-title fw-bold font-manrope">{editingId ? 'Edit Doctor' : 'Add New Doctor'}</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Full Name *</label>
                      <input
                        className="form-control"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Email *</label>
                      <input
                        type="email"
                        className="form-control"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Phone *</label>
                      <input
                        className="form-control"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Address *</label>
                      <input
                        className="form-control"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Gender *</label>
                      <select
                        className="form-select"
                        value={formData.gender ? 'male' : 'female'}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value === 'male' })}
                      >
                        <option value="male">Male (true)</option>
                        <option value="female">Female (false)</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Password *</label>
                      <input
                        type="password"
                        className="form-control"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder={editingId ? 'Nhập password mới để cập nhật' : ''}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Specialty *</label>
                      <select
                        className="form-select"
                        value={formData.specialtyId}
                        onChange={(e) => setFormData({ ...formData, specialtyId: Number(e.target.value) })}
                      >
                        <option value={0}>Select specialty</option>
                        {specialties.map((specialty) => (
                          <option key={specialty.id} value={specialty.id}>
                            {specialty.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Fee *</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.fee}
                        onChange={(e) => setFormData({ ...formData, fee: Number(e.target.value) })}
                        min={0}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Experience *</label>
                      <input
                        className="form-control"
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        placeholder="e.g. 7 years"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Avatar URL *</label>
                      <input
                        className="form-control"
                        value={formData.avaUrl}
                        onChange={(e) => setFormData({ ...formData, avaUrl: e.target.value })}
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-top">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleSave}>
                    {editingId ? 'Update' : 'Create'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {deletingId && (
          <div className="modal d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header border-bottom">
                  <h5 className="modal-title fw-bold font-manrope">Delete Doctor</h5>
                  <button type="button" className="btn-close" onClick={() => setDeletingId(null)}></button>
                </div>
                <div className="modal-body">
                  <p className="mb-0">Are you sure you want to delete this doctor? This action cannot be undone.</p>
                </div>
                <div className="modal-footer border-top">
                  <button type="button" className="btn btn-secondary" onClick={() => setDeletingId(null)}>
                    Cancel
                  </button>
                  <button type="button" className="btn btn-danger" onClick={confirmDelete}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {toast.show && (
          <ToastNotification
            show={toast.show}
            message={toast.message}
            type={toast.type}
            onClose={() => setToast((prev) => ({ ...prev, show: false }))}
          />
        )}
      </div>
    </AdminLayout>
  );
};