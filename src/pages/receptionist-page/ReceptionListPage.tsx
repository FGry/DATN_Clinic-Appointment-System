import React, { useState, useMemo, useEffect, useRef } from 'react';
import { ReceptionLayout } from '../../components/layout/ReceptionLayout';
import { Link } from 'react-router-dom';
import { receptionistService } from '../../services/receptionistService';
import type { DoctorScheduleResponse, AdminDoctorResponse } from '../../services/receptionistService';
import { ToastNotification, type ToastType } from '../../components/common/ToastNotification';

export const ReceptionListPage: React.FC = () => {
  const dateInputRef = useRef<HTMLInputElement>(null);
  const modalDateRef = useRef<HTMLInputElement>(null);
  const [schedules, setSchedules] = useState<DoctorScheduleResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState<AdminDoctorResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [showModal, setShowModal] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<DoctorScheduleResponse | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<'start' | 'end' | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DoctorScheduleResponse | null>(null);

  const [formData, setFormData] = useState({
    doctorId: 0,
    date: new Date().toISOString().split('T')[0],
    startTime: '08:00',
    endTime: '12:00'
  });

  // Toast state
  const [toast, setToast] = useState<{ show: boolean; message: string; type: ToastType }>({
    show: false,
    message: '',
    type: 'success'
  });

  const showToast = (message: string, type: ToastType = 'success') => {
    setToast({ show: true, message, type });
  };

  const timeSlots = useMemo(() => {
    const slots = [];
    for (let h = 8; h <= 17; h++) {
      for (let m = 0; m < 60; m += 15) {
        if (h === 17 && m > 0) break; // Don't go past 17:00
        if (h === 12 && m > 0) continue; // Skip 12:15, 12:30, 12:45
        const hour = h < 10 ? `0${h}` : `${h}`;
        const minute = m < 10 ? `0${m}` : `${m}`;
        slots.push(`${hour}:${minute}`);
      }
    }
    return slots;
  }, []);

  useEffect(() => {
    fetchSchedules();
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const data = await receptionistService.getDoctors();
      setDoctors(data);
    } catch (error) {
      console.error('Failed to fetch doctors:', error);
    }
  };

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      // Assuming getAllSchedules exists or using a default doctor if necessary
      // For now, let's try to fetch all if possible, or handle the error
      const data = await receptionistService.getAllSchedules();
      setSchedules(data);
    } catch (error) {
      console.error('Failed to fetch schedules:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSchedules = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return schedules.filter(item => {
      const matchesSearch = item.doctorName.toLowerCase().includes(term);
      let matchesDate = true;
      if (selectedDate) {
        matchesDate = item.date === selectedDate;
      }
      return matchesSearch && matchesDate;
    });
  }, [schedules, searchTerm, selectedDate]);

  const totalPages = Math.ceil(filteredSchedules.length / itemsPerPage) || 1;
  const currentSchedules = filteredSchedules.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedDate]);

  const handleOpenModal = (schedule?: DoctorScheduleResponse) => {
    if (schedule) {
      setEditingSchedule(schedule);
      setFormData({
        doctorId: schedule.doctorId,
        date: schedule.date,
        startTime: schedule.startTime.substring(0, 5),
        endTime: schedule.endTime.substring(0, 5)
      });
    } else {
      setEditingSchedule(null);
      setFormData({
        doctorId: 0,
        date: new Date().toISOString().split('T')[0],
        startTime: '08:00',
        endTime: '12:00'
      });
    }
    setShowModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'doctorId' ? parseInt(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Manual Validation
    if (formData.doctorId <= 0) return showToast('Please select a doctor', 'error');
    if (!formData.date) return showToast('Please select a date', 'error');
    if (!formData.startTime) return showToast('Please select a start time', 'error');
    if (!formData.endTime) return showToast('Please select an end time', 'error');

    try {
      if (editingSchedule) {
        await receptionistService.updateSchedule(editingSchedule.id, formData);
        showToast('Schedule updated successfully!');
      } else {
        await receptionistService.createSchedule(formData);
        showToast('Schedule created successfully!');
      }
      setShowModal(false);
      fetchSchedules();
    } catch (error: any) {
      console.error('Failed to save schedule:', error);
      showToast(error.message || 'Failed to save schedule', 'error');
    }
  };

  const handleDelete = (schedule: DoctorScheduleResponse) => {
    setDeleteTarget(schedule);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      await receptionistService.deleteSchedule(deleteTarget.id);
      setSchedules(prev => prev.filter(s => s.id !== deleteTarget.id));
      showToast('Schedule deleted successfully!');
      setDeleteTarget(null);
    } catch (error) {
      console.error('Failed to delete schedule:', error);
      showToast('Failed to delete schedule', 'error');
    }
  };

  return (
    <ReceptionLayout onOpenBookingModal={() => handleOpenModal()}>
      <ToastNotification
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast(prev => ({ ...prev, show: false }))}
      />
      <div className="mx-auto font-manrope animate-fade-in" style={{ maxWidth: '1400px' }}>

        {/* Page Header & Actions */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-4">
          <div>
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="badge rounded-pill px-3 py-1 text-uppercase fw-bold" style={{ backgroundColor: 'rgba(0, 106, 106, 0.1)', color: '#006a6a', fontSize: '10px', letterSpacing: '1px' }}>Operations</span>
            </div>
            <h2 className="fw-bolder mb-1" style={{ color: '#001835', fontSize: '2.25rem' }}>Doctor Schedules</h2>
            <p className="text-muted mb-0 opacity-75">Manage and monitor medical staff working hours and shift distribution.</p>
          </div>

          <div className="d-flex align-items-center gap-3">
            <button
              onClick={() => handleOpenModal()}
              className="btn fw-bold px-4 py-2 rounded-3 shadow-sm d-flex align-items-center gap-2 transition-all active-scale"
              style={{ backgroundColor: '#001835', color: 'white', height: '46px' }}
            >
              <i className="bi bi-plus-lg fs-5"></i>
              <span>Create Schedule</span>
            </button>
            <div className="bg-white p-1 rounded-3 d-flex border shadow-sm" style={{ height: '46px' }}>
              <button
                className="btn btn-sm px-4 fw-bold rounded-2 transition-all d-flex align-items-center"
                style={{ backgroundColor: '#001835', color: 'white', fontSize: '14px' }}
              >
                <i className="bi bi-list-ul me-2"></i> List
              </button>
              <Link
                to="/reception/schedule/timeline"
                className="btn btn-sm text-muted border-0 px-4 fw-bold hover-bg-light transition-all rounded-2 d-flex align-items-center"
                style={{ fontSize: '14px' }}
              >
                <i className="bi bi-calendar-range me-2"></i> Timeline
              </Link>
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
          <div className="row g-4 align-items-end">
            <div className="col-lg-8 col-md-7">
              <label className="form-label fw-bold text-muted small mb-2 text-uppercase ps-1" style={{ fontSize: '10px', letterSpacing: '1px' }}>Search Doctor</label>
              <div className="input-group group-custom shadow-sm rounded-3 overflow-hidden">
                <span className="input-group-text bg-light border-0 ps-3"><i className="bi bi-search text-muted"></i></span>
                <input
                  type="text"
                  className="form-control bg-light border-0 py-2.5 shadow-none"
                  placeholder="Filter by doctor name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ fontSize: '15px' }}
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-5">
              <label className="form-label fw-bold text-muted small mb-2 text-uppercase ps-1" style={{ fontSize: '10px', letterSpacing: '1px' }}>Filter by Date</label>
              <div 
                className="input-group group-custom shadow-sm rounded-3 overflow-hidden cursor-pointer"
                onClick={() => dateInputRef.current?.showPicker()}
              >
                <span className="input-group-text bg-light border-0 ps-3"><i className="bi bi-calendar-week text-muted"></i></span>
                <input
                  ref={dateInputRef}
                  type="date"
                  className="form-control bg-light border-0 py-2.5 shadow-none fw-semibold"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  style={{ 
                    fontSize: '15px', 
                    cursor: 'pointer',
                    caretColor: 'transparent'
                  }}
                />
                {selectedDate && (
                  <button 
                    className="btn bg-light border-0 text-muted" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDate('');
                    }}
                  >
                    <i className="bi bi-x-circle-fill"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Table */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead style={{ backgroundColor: '#f8fafd' }}>
                <tr className="text-uppercase small fw-bold text-muted" style={{ letterSpacing: '1px' }}>
                  <th className="py-4 px-4">Doctor Info</th>
                  <th className="py-4 px-4">Scheduled Date</th>
                  <th className="py-4 px-4">Working Hours</th>
                  <th className="py-4 px-4 text-end">Actions</th>
                </tr>
              </thead>
              <tbody className="border-top-0">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="text-center py-5">
                      <div className="spinner-border text-teal" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : currentSchedules.length > 0 ? (
                  currentSchedules.map((item) => (
                    <tr key={item.id} className="transition-all hover-bg-light-blue">
                      <td className="px-4 py-4">
                        <div className="d-flex align-items-center gap-3">
                          <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white shadow-sm"
                            style={{ width: '44px', height: '44px', backgroundColor: '#001835', fontSize: '14px' }}>
                            {item.doctorName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="fw-bold text-dark" style={{ fontSize: '16px' }}>{item.doctorName}</div>
                            <span className="text-muted small fw-medium">ID: #{item.doctorId}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="fw-bold text-dark mb-1" style={{ fontSize: '15px' }}>{new Date(item.date).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                        <span className="badge bg-light text-dark-emphasis border-0 fw-semibold" style={{ fontSize: '11px', padding: '4px 8px', borderRadius: '6px' }}>
                          Specific Date
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="d-flex align-items-center gap-2">
                          <div className="rounded-3 bg-light border p-2 d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
                            <i className="bi bi-clock-fill text-muted"></i>
                          </div>
                          <span className="fw-bold text-dark">{item.startTime.substring(0, 5)} - {item.endTime.substring(0, 5)}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-end">
                        <div className="d-flex justify-content-end gap-3 pe-2">
                          <i 
                            className="bi bi-pencil-square fs-5 text-primary transition-all" 
                            onClick={() => handleOpenModal(item)}
                            title="Edit"
                            style={{ cursor: 'pointer' }}
                          ></i>
                          <i 
                            className="bi bi-trash3 fs-5 text-danger transition-all" 
                            onClick={() => handleDelete(item)}
                            title="Delete"
                            style={{ cursor: 'pointer' }}
                          ></i>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-5 text-muted">
                      No matching schedules found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="card-footer bg-white border-top p-4 d-flex justify-content-between align-items-center">
              <span className="text-muted small">
                Showing {currentSchedules.length} of {filteredSchedules.length} schedules
              </span>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-outline-light border text-dark px-3 py-1.5 rounded-3 fw-bold small"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    className={`btn btn-sm px-3 py-1.5 rounded-3 fw-bold small ${page === currentPage ? 'text-white' : 'btn-outline-light border text-dark'}`}
                    style={{ backgroundColor: page === currentPage ? '#001835' : 'transparent', border: page === currentPage ? 'none' : '1px solid #dee2e6' }}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
                <button
                  className="btn btn-sm btn-outline-light border text-dark px-3 py-1.5 rounded-3 fw-bold small"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* --- Manage Schedule Modal --- */}
        {showModal && (
          <div className="modal-wrapper">
            <div className="modal-backdrop fade show" onClick={() => setShowModal(false)} style={{ backdropFilter: 'blur(12px)', backgroundColor: 'rgba(0,24,53,0.6)' }}></div>
            <div className="modal fade show d-block" tabIndex={-1}>
              <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '520px' }}>
                <div className="modal-content border-0 shadow-2xl rounded-5 animate-slide-up" style={{ overflow: 'visible' }}>
                  <div className="modal-header bg-white py-3 px-4 border-bottom-0">
                    <div className="d-flex align-items-center gap-3">
                      <div className="bg-light rounded-4 p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', backgroundColor: 'rgba(0, 106, 106, 0.05) !important' }}>
                        <i className="bi bi-calendar-plus fs-5" style={{ color: '#006a6a' }}></i>
                      </div>
                      <div>
                        <h6 className="modal-title font-manrope fw-bolder mb-0" style={{ color: '#001835' }}>
                          {editingSchedule ? 'Update Schedule' : 'Create Schedule'}
                        </h6>
                        <p className="text-muted mb-0" style={{ fontSize: '10px' }}>Configure working hours.</p>
                      </div>
                    </div>
                    <button type="button" className="btn-close shadow-none small" style={{ fontSize: '0.75rem' }} onClick={() => setShowModal(false)}></button>
                  </div>
                  <div className="modal-body p-4 px-5 pt-0" style={{ overflow: 'visible' }}>
                    <form onSubmit={handleSubmit} className="row g-3" noValidate>
                      <div className="col-12">
                        <label htmlFor="doctorId" className="form-label fw-bold text-muted mb-1" style={{ fontSize: '11px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Select Doctor</label>
                        <select
                          name="doctorId"
                          id="doctorId"
                          className="form-select bg-light border-0 shadow-none rounded-3 px-3"
                          value={formData.doctorId}
                          onChange={handleInputChange}
                          required
                          style={{ height: '45px', fontSize: '14px' }}
                        >
                          <option value="0">Choose a doctor...</option>
                          {doctors.map(doc => (
                            <option key={doc.id} value={doc.id}>{doc.fullName}</option>
                          ))}
                        </select>
                      </div>

                      <div className="col-12">
                        <label htmlFor="date" className="form-label fw-bold text-muted mb-1" style={{ fontSize: '11px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Scheduled Date</label>
                        <div 
                          className="bg-light rounded-3 px-3 d-flex align-items-center cursor-pointer" 
                          style={{ height: '45px' }}
                          onClick={() => modalDateRef.current?.showPicker()}
                        >
                          <input
                            ref={modalDateRef}
                            type="date"
                            name="date"
                            id="date"
                            className="form-control bg-transparent border-0 shadow-none px-0"
                            value={formData.date}
                            onChange={handleInputChange}
                            required
                            style={{ 
                              fontSize: '14px', 
                              cursor: 'pointer',
                              caretColor: 'transparent'
                            }}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-bold text-muted mb-1" style={{ fontSize: '11px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Start Time</label>
                        <div className="time-picker-container">
                          <div
                            className="form-control bg-light border-0 shadow-none rounded-3 px-3 d-flex align-items-center cursor-pointer"
                            style={{ height: '45px', fontSize: '14px' }}
                            onClick={() => setActiveDropdown(activeDropdown === 'start' ? null : 'start')}
                          >
                            <span className="fw-semibold">{formData.startTime}</span>
                            <i className="bi bi-clock ms-auto text-muted small"></i>
                          </div>
                          {activeDropdown === 'start' && (
                            <div className="time-dropdown shadow-lg border-0 rounded-3">
                              {timeSlots.filter(slot => slot <= '16:00').map(slot => (
                                <div
                                  key={`start-${slot}`}
                                  className={`time-item py-1.5 px-3 transition-all small ${formData.startTime === slot ? 'selected bg-teal text-white' : ''}`}
                                  onClick={() => {
                                    const [startH, startM] = slot.split(':').map(Number);
                                    const minEndMins = startH * 60 + startM + 60;
                                    
                                    setFormData(prev => {
                                      let newEndTime = prev.endTime;
                                      if (newEndTime) {
                                        const [endH, endM] = newEndTime.split(':').map(Number);
                                        if ((endH * 60 + endM) < minEndMins) {
                                          const validSlot = timeSlots.find(s => {
                                            const [sH, sM] = s.split(':').map(Number);
                                            return (sH * 60 + sM) >= minEndMins;
                                          });
                                          newEndTime = validSlot || '';
                                        }
                                      }
                                      return { ...prev, startTime: slot, endTime: newEndTime };
                                    });
                                    setActiveDropdown(null);
                                  }}
                                >
                                  {slot}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-bold text-muted mb-1" style={{ fontSize: '11px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>End Time</label>
                        <div className="time-picker-container">
                          <div
                            className="form-control bg-light border-0 shadow-none rounded-3 px-3 d-flex align-items-center cursor-pointer"
                            style={{ height: '45px', fontSize: '14px' }}
                            onClick={() => setActiveDropdown(activeDropdown === 'end' ? null : 'end')}
                          >
                            <span className="fw-semibold">{formData.endTime}</span>
                            <i className="bi bi-clock ms-auto text-muted small"></i>
                          </div>
                          {activeDropdown === 'end' && (
                            <div className="time-dropdown shadow-lg border-0 rounded-3">
                              {timeSlots.filter(slot => {
                                if (!formData.startTime) return true;
                                const [startH, startM] = formData.startTime.split(':').map(Number);
                                const [slotH, slotM] = slot.split(':').map(Number);
                                return (slotH * 60 + slotM) >= (startH * 60 + startM + 60);
                              }).map(slot => (
                                <div
                                  key={`end-${slot}`}
                                  className={`time-item py-1.5 px-3 transition-all small ${formData.endTime === slot ? 'selected bg-teal text-white' : ''}`}
                                  onClick={() => {
                                    setFormData(prev => ({ ...prev, endTime: slot }));
                                    setActiveDropdown(null);
                                  }}
                                >
                                  {slot}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-12 mt-4">
                        <div className="d-flex gap-2">
                          <button type="button" className="btn btn-light fw-bold px-4 py-2 rounded-3 flex-grow-1 border-0" style={{ fontSize: '13px' }} onClick={() => setShowModal(false)}>Cancel</button>
                          <button type="submit" className="btn text-white fw-bold px-4 py-2 rounded-3 flex-grow-1 shadow-teal transition-all active-scale" style={{ backgroundColor: '#006a6a', fontSize: '13px' }}>
                            {editingSchedule ? 'Update' : 'Save'}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* --- Delete Confirmation Modal --- */}
        {deleteTarget && (
          <div className="modal-wrapper">
            <div className="modal-backdrop fade show" onClick={() => setDeleteTarget(null)} style={{ backdropFilter: 'blur(12px)', backgroundColor: 'rgba(0,24,53,0.6)' }}></div>
            <div className="modal fade show d-block" tabIndex={-1}>
              <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '400px' }}>
                <div className="modal-content border-0 shadow-2xl rounded-5 animate-slide-up">
                  <div className="modal-body p-5 text-center">
                    <div className="bg-danger-subtle rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: '80px', height: '80px' }}>
                      <i className="bi bi-exclamation-triangle-fill text-danger fs-1"></i>
                    </div>
                    <h4 className="fw-bolder mb-2" style={{ color: '#001835' }}>Confirm Delete</h4>
                    <p className="text-muted mb-4 px-3">Are you sure you want to delete the schedule for <span className="fw-bold text-dark">{deleteTarget.doctorName}</span> on <span className="fw-bold text-dark">{deleteTarget.date}</span>?</p>
                    <div className="d-flex gap-3">
                      <button className="btn btn-light fw-bold px-4 py-2.5 rounded-4 flex-grow-1 border-0" onClick={() => setDeleteTarget(null)}>Cancel</button>
                      <button className="btn btn-danger fw-bold px-4 py-2.5 rounded-4 flex-grow-1 shadow-sm transition-all active-scale" onClick={() => confirmDelete()}>Delete Now</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <style>{`
        .animate-fade-in { animation: fadeIn 0.4s ease-out; }
        .animate-slide-up { animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .hover-bg-light-blue:hover { background-color: rgba(0, 106, 106, 0.02) !important; }
        .shadow-teal { box-shadow: 0 10px 25px -5px rgba(0, 106, 106, 0.3); }
        .shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
        .form-control:focus, .form-select:focus { background-color: #fff !important; box-shadow: 0 0 0 4px rgba(0, 106, 106, 0.08) !important; border: 1px solid rgba(0, 106, 106, 0.2) !important; }
        .modal-wrapper { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1050; }
        .text-teal { color: #006a6a !important; }

        /* Fix floating labels and placeholders */
        .form-floating > .form-control::placeholder {
          color: transparent;
        }
        .form-floating > .form-control:focus::placeholder {
          color: transparent;
        }
        .form-floating > label {
          padding-left: 1.5rem !important;
          color: #6c757d;
          opacity: 0.8;
        }
        .form-floating > .form-control:focus ~ label,
        .form-floating > .form-control:not(:placeholder-shown) ~ label,
        .form-floating > .form-select ~ label {
          color: #006a6a;
          opacity: 1;
          transform: scale(0.85) translateY(-0.75rem) translateX(0.15rem);
          background-color: transparent;
          height: auto;
          padding: 0;
          top: 10px;
        }
        textarea.form-control {
          padding-top: 1.625rem !important;
        }
        
        /* Custom Time Picker Styles */
        .time-picker-container { position: relative; }
        .time-dropdown { 
          position: absolute; 
          top: 100%; 
          left: 0; 
          right: 0; 
          background: white; 
          border-radius: 12px; 
          box-shadow: 0 10px 25px rgba(0,0,0,0.1); 
          z-index: 1100; 
          max-height: 200px; 
          overflow-y: auto; 
          margin-top: 5px;
          border: 1px solid #eee;
        }
        .time-item { 
          padding: 10px 20px; 
          cursor: pointer; 
          transition: all 0.2s;
          font-weight: 500;
          color: #444;
        }
        .time-item:hover { background: #f0f7f7; color: #006a6a; }
        .time-item.selected { background: #006a6a; color: white; }
      `}</style>
    </ReceptionLayout>
  );
};