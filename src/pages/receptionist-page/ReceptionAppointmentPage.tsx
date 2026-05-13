import React, { useState, useEffect, useRef } from 'react';
import { ReceptionLayout } from '../../components/layout/ReceptionLayout';
import { receptionistService } from '../../services/receptionistService';
import { specialtyApi } from '../../services/adminService';
import { ToastNotification, type ToastType } from '../../components/common/ToastNotification';
import type { Specialty } from '../../types/models/Specialty';
import type { AppointmentResponse, AdminDoctorResponse, DoctorScheduleResponse } from '../../services/receptionistService';

export const ReceptionAppointmentPage: React.FC = () => {
  const dateInputRef = useRef<HTMLInputElement>(null);
  const [appointments, setAppointments] = useState<AppointmentResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [actionTarget, setActionTarget] = useState<{ id: number; status: 'CONFIRMED' | 'REJECTED'; patientName: string } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [doctors, setDoctors] = useState<AdminDoctorResponse[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [doctorSchedules, setDoctorSchedules] = useState<DoctorScheduleResponse[]>([]);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    patientId: 0,
    patientName: '',
    doctorId: 0,
    specialty: '',
    appointmentDate: '',
    appointmentTime: '',
    reason: ''
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

  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    fetchAppointments();
    fetchInitialData();
  }, [filterDate]);

  const fetchInitialData = async () => {
    try {
      const [docsData, specsData] = await Promise.all([
        receptionistService.getDoctors(),
        specialtyApi.getAll()
      ]);
      setDoctors(docsData);
      setSpecialties(specsData);
    } catch (error) {
      console.error('Failed to fetch initial data:', error);
    }
  };

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const data = await receptionistService.getAppointments(filterDate);
      setAppointments(data);
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async () => {
    if (!actionTarget) return;
    try {
      await receptionistService.updateAppointmentStatus(actionTarget.id, actionTarget.status);
      showToast(`Appointment ${actionTarget.status.toLowerCase()} successfully!`);
      if (!filterDate) {
        setAppointments(prev => prev.filter(apt => apt.id !== actionTarget.id));
      } else {
        setAppointments(prev => prev.map(apt => apt.id === actionTarget.id ? { ...apt, status: actionTarget.status } : apt));
      }
      setActionTarget(null);
    } catch (error: any) {
      console.error('Failed to update status:', error);
      showToast(error.message || 'Failed to update status', 'error');
    }
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'specialty') {
      // If specialty changes, reset doctor and schedule
      setFormData(prev => ({ 
        ...prev, 
        specialty: value, 
        doctorId: 0, 
        appointmentDate: '', 
        appointmentTime: '' 
      }));
      setDoctorSchedules([]);
      setTimeSlots([]);
    } else if (name === 'doctorId') {
      const doctorId = parseInt(value);
      const selectedDoc = doctors.find(d => d.id === doctorId);
      
      setFormData(prev => ({ 
        ...prev, 
        doctorId, 
        specialty: selectedDoc ? selectedDoc.specialtyName : prev.specialty,
        appointmentDate: '', 
        appointmentTime: '' 
      }));

      if (doctorId > 0) {
        try {
          const schedules = await receptionistService.getSchedulesByDoctorId(doctorId);
          setDoctorSchedules(schedules);
        } catch (error) {
          console.error('Failed to fetch doctor schedules:', error);
          showToast('Failed to load doctor schedule', 'error');
        }
      } else {
        setDoctorSchedules([]);
      }
    } else if (name === 'appointmentDate') {
      setFormData(prev => ({ ...prev, appointmentDate: value, appointmentTime: '' }));
      const schedule = doctorSchedules.find(s => s.date === value);
      if (schedule) {
        const slots = generateTimeSlots(schedule.startTime, schedule.endTime);
        setTimeSlots(slots);
      } else {
        setTimeSlots([]);
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const generateTimeSlots = (start: string, end: string) => {
    const slots = [];
    const [startH, startM] = start.split(':').map(Number);
    const [endH, endM] = end.split(':').map(Number);
    
    let currentH = startH;
    let currentM = startM;
    
    while (currentH < endH || (currentH === endH && currentM < endM)) {
      const time = `${String(currentH).padStart(2, '0')}:${String(currentM).padStart(2, '0')}`;
      slots.push(time);
      currentM += 15;
      if (currentM >= 60) {
        currentH += 1;
        currentM = 0;
      }
    }
    return slots;
  };

  const filteredDoctors = React.useMemo(() => {
    if (!formData.specialty) return doctors;
    return doctors.filter(doc => doc.specialtyName === formData.specialty);
  }, [doctors, formData.specialty]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Manual Validation
    if (!formData.patientName.trim()) return showToast('Please enter patient name', 'error');
    if (!formData.specialty) return showToast('Please select a specialty', 'error');
    if (formData.doctorId <= 0) return showToast('Please select a doctor', 'error');
    if (!formData.appointmentDate) return showToast('Please select an appointment date', 'error');
    if (!formData.appointmentTime) return showToast('Please select an appointment time', 'error');

    try {
      await receptionistService.createAppointment(formData);
      showToast('Appointment created successfully!');
      setShowModal(false);
      fetchAppointments();
      // Reset form
      setFormData({
        patientId: 0,
        patientName: '',
        doctorId: 0,
        specialty: '',
        appointmentDate: '',
        appointmentTime: '',
        reason: ''
      });
    } catch (error: any) {
      console.error('Failed to create appointment:', error);
      const message = error.message || 'Failed to create appointment';
      showToast(message, 'error');
    }
  };

  return (
    <ReceptionLayout onOpenBookingModal={() => setShowModal(true)}>
      <ToastNotification 
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast(prev => ({ ...prev, show: false }))}
      />
      <div className="mx-auto font-manrope animate-fade-in" style={{ maxWidth: '1400px' }}>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5 gap-4">
          <div>
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="badge rounded-pill px-3 py-1 text-uppercase fw-bold" style={{ backgroundColor: 'rgba(0, 106, 106, 0.1)', color: '#006a6a', fontSize: '10px', letterSpacing: '1px' }}>Management</span>
            </div>
            <h2 className="fw-bolder mb-1" style={{ color: '#001835', fontSize: '2.25rem' }}>Appointment Requests</h2>
            <p className="text-muted mb-0 opacity-75">
              {filterDate ? `Viewing all appointments for ${filterDate}` : "Review and manage pending patient appointment bookings."}
            </p>
          </div>

          <div className="d-flex flex-wrap gap-3 align-items-center">
            <div 
              className="d-flex align-items-center bg-white rounded-3 shadow-sm px-3 cursor-pointer" 
              style={{ height: '46px', border: '1px solid #eee' }}
              onClick={() => dateInputRef.current?.showPicker()}
            >
              <i className="bi bi-calendar3 text-muted me-2"></i>
              <span className="text-muted small fw-bold me-2">Date:</span>
              <input 
                ref={dateInputRef}
                type="date" 
                className="border-0 shadow-none small fw-bold" 
                style={{ 
                  outline: 'none', 
                  color: '#001835', 
                  cursor: 'pointer',
                  caretColor: 'transparent',
                  background: 'transparent'
                }}
                value={filterDate}
                onChange={(e) => {
                  setFilterDate(e.target.value);
                  setCurrentPage(1);
                }}
              />
              {filterDate && (
                <button 
                  className="btn btn-link p-0 ms-2 text-danger" 
                  onClick={(e) => {
                    e.stopPropagation();
                    setFilterDate('');
                  }}
                >
                  <i className="bi bi-x-circle-fill"></i>
                </button>
              )}
            </div>

            <button 
              className="btn fw-bold px-4 py-2 rounded-3 shadow-sm d-flex align-items-center gap-2 transition-all active-scale" 
              style={{ backgroundColor: '#001835', color: 'white', height: '46px' }}
              onClick={() => setShowModal(true)}
            >
              <i className="bi bi-plus-lg fs-5"></i>
              <span>New Appointment</span>
            </button>
          </div>
        </div>

        <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead style={{ backgroundColor: '#f8fafd' }}>
                <tr className="text-uppercase small fw-bold text-muted" style={{ letterSpacing: '1px' }}>
                  <th className="py-4 px-4">Patient & Reason</th>
                  <th className="py-4 px-4">Doctor & Specialty</th>
                  <th className="py-4 px-4">Schedule</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4 text-end">Actions</th>
                </tr>
              </thead>
              <tbody className="border-top-0">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-5">
                      <div className="spinner-border text-teal" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : appointments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-5 text-muted">No appointments found.</td>
                  </tr>
                ) : (
                  appointments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((apt) => (
                    <tr key={apt.id} className="transition-all hover-bg-light-blue">
                      <td className="px-4 py-4">
                        <div className="d-flex align-items-center gap-3">
                          <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white shadow-sm" 
                               style={{ width: '40px', height: '40px', backgroundColor: '#001835', fontSize: '14px' }}>
                            {apt.patientName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="fw-bold text-dark" style={{ fontSize: '15px' }}>{apt.patientName}</div>
                            <small className="text-muted d-block text-truncate" style={{ maxWidth: '250px' }}>{apt.reason}</small>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="fw-semibold text-dark mb-1">{apt.doctorName}</div>
                        <span className="badge bg-light text-dark-emphasis border-0 fw-semibold" style={{ fontSize: '11px', padding: '5px 10px', borderRadius: '6px' }}>
                          <i className="bi bi-tag-fill me-1 opacity-50"></i>{apt.specialty}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="d-flex align-items-center gap-2 mb-1">
                          <i className="bi bi-clock-fill text-muted small"></i>
                          <span className="fw-bold text-dark" style={{ fontSize: '14px' }}>{apt.appointmentTime}</span>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <i className="bi bi-calendar-event-fill text-muted small"></i>
                          <small className="text-muted fw-medium">{apt.appointmentDate}</small>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`badge rounded-pill px-3 py-1.5 fw-bold text-uppercase d-flex align-items-center gap-1 shadow-sm`} style={{ 
                          backgroundColor: apt.status === 'CONFIRMED' ? '#e6f4f4' : apt.status === 'REJECTED' ? '#fff0f0' : '#fff8e6', 
                          color: apt.status === 'CONFIRMED' ? '#006a6a' : apt.status === 'REJECTED' ? '#e11d48' : '#d97706',
                          fontSize: '10px',
                          letterSpacing: '0.5px'
                        }}>
                          <span className="bg-current rounded-circle" style={{ width: '6px', height: '6px', backgroundColor: 'currentColor' }}></span>
                          {apt.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-end">
                        {apt.status === 'PENDING' ? (
                          <div className="d-flex justify-content-end gap-2">
                            <button 
                              className="btn btn-sm btn-outline-danger fw-bold px-3 py-2 rounded-3 border-2 transition-all"
                              onClick={() => setActionTarget({ id: apt.id, status: 'REJECTED', patientName: apt.patientName })}
                            >
                              Reject
                            </button>
                            <button 
                              className="btn btn-st-primary text-white border-0 shadow-sm rounded-3 px-3 py-1.5 fw-bold d-flex align-items-center gap-2 transition-all active-scale"
                              style={{ backgroundColor: '#006a6a', fontSize: '12px' }}
                              onClick={() => setActionTarget({ id: apt.id, status: 'CONFIRMED', patientName: apt.patientName })}
                            >
                              <i className="bi bi-check-lg"></i> Accept
                            </button>
                          </div>
                        ) : (
                          <div className="text-muted small fw-bold d-flex align-items-center justify-content-end gap-2">
                            <i className={`bi ${apt.status === 'CONFIRMED' ? 'bi-check-circle-fill text-success' : 'bi-x-circle-fill text-danger'}`}></i>
                            Processed
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {appointments.length > itemsPerPage && (
            <div className="card-footer bg-white border-top p-4 d-flex justify-content-between align-items-center">
              <span className="text-muted small">
                Showing {Math.min(itemsPerPage, appointments.length - (currentPage - 1) * itemsPerPage)} of {appointments.length} appointments
              </span>
              <div className="d-flex gap-2">
                <button 
                  className="btn btn-sm btn-outline-light border text-dark px-3 py-1.5 rounded-3 fw-bold small"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {Array.from({ length: Math.ceil(appointments.length / itemsPerPage) }, (_, i) => i + 1).map(page => (
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
                  onClick={() => setCurrentPage(prev => Math.min(Math.ceil(appointments.length / itemsPerPage), prev + 1))}
                  disabled={currentPage === Math.ceil(appointments.length / itemsPerPage)}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* --- New Appointment Modal --- */}
        {showModal && (
          <div className="modal-wrapper">
            <div className="modal-backdrop fade show" onClick={() => setShowModal(false)} style={{ backdropFilter: 'blur(12px)', backgroundColor: 'rgba(0,24,53,0.6)' }}></div>
            <div className="modal fade show d-block" tabIndex={-1}>
              <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '520px' }}>
                <div className="modal-content border-0 shadow-2xl rounded-5 overflow-hidden animate-slide-up">
                  <div className="modal-header bg-white py-3 px-4 border-bottom-0">
                    <div className="d-flex align-items-center gap-3">
                      <div className="bg-light rounded-4 p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', backgroundColor: 'rgba(0, 106, 106, 0.05) !important' }}>
                        <i className="bi bi-calendar-plus fs-5" style={{ color: '#006a6a' }}></i>
                      </div>
                      <div>
                        <h6 className="modal-title font-manrope fw-bolder mb-0" style={{ color: '#001835' }}>Create Appointment</h6>
                        <p className="text-muted mb-0" style={{ fontSize: '10px' }}>Register a new patient visit.</p>
                      </div>
                    </div>
                    <button type="button" className="btn-close shadow-none small" style={{ fontSize: '0.75rem' }} onClick={() => setShowModal(false)}></button>
                  </div>
                  <div className="modal-body p-4 pt-0">
                    <form onSubmit={handleSubmit} className="row g-3" noValidate>
                      <div className="col-12">
                        <label htmlFor="patientName" className="form-label fw-bold text-muted mb-1" style={{ fontSize: '11px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Patient Full Name</label>
                        <input 
                          type="text" 
                          name="patientName"
                          id="patientName"
                          className="form-control bg-light border-0 shadow-none rounded-3 px-3" 
                          placeholder="Enter patient name..."
                          value={formData.patientName}
                          onChange={handleInputChange}
                          required
                          style={{ height: '45px', fontSize: '14px' }}
                        />
                      </div>
                      
                      <div className="col-md-6">
                        <label htmlFor="specialty" className="form-label fw-bold text-muted mb-1" style={{ fontSize: '11px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Specialty</label>
                        <select 
                          name="specialty"
                          id="specialty"
                          className="form-select bg-light border-0 shadow-none rounded-3 px-3"
                          value={formData.specialty}
                          onChange={handleInputChange}
                          required
                          style={{ height: '45px', fontSize: '14px' }}
                        >
                          <option value="">Select...</option>
                          {specialties.map(spec => (
                            <option key={spec.id} value={spec.name}>{spec.name}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="col-md-6">
                        <label htmlFor="doctorId" className="form-label fw-bold text-muted mb-1" style={{ fontSize: '11px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Assign Doctor</label>
                        <select 
                          name="doctorId"
                          id="doctorId"
                          className="form-select bg-light border-0 shadow-none rounded-3 px-3"
                          value={formData.doctorId}
                          onChange={handleInputChange}
                          required
                          style={{ height: '45px', fontSize: '14px' }}
                        >
                          <option value="0">Select...</option>
                          {filteredDoctors.map(doc => (
                            <option key={doc.id} value={doc.id}>{doc.fullName}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="col-md-6">
                        <label htmlFor="appointmentDate" className="form-label fw-bold text-muted mb-1" style={{ fontSize: '11px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Date</label>
                        <select 
                          name="appointmentDate"
                          id="appointmentDate"
                          className="form-select bg-light border-0 shadow-none rounded-3 px-3" 
                          value={formData.appointmentDate}
                          onChange={handleInputChange}
                          required
                          disabled={!formData.doctorId}
                          style={{ height: '45px', fontSize: '14px' }}
                        >
                          <option value="">Select...</option>
                          {doctorSchedules.map(s => (
                            <option key={s.id} value={s.date}>
                              {new Date(s.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="col-md-6">
                        <label htmlFor="appointmentTime" className="form-label fw-bold text-muted mb-1" style={{ fontSize: '11px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Time</label>
                        <select 
                          name="appointmentTime"
                          id="appointmentTime"
                          className="form-select bg-light border-0 shadow-none rounded-3 px-3" 
                          value={formData.appointmentTime}
                          onChange={handleInputChange}
                          required
                          disabled={!formData.appointmentDate}
                          style={{ height: '45px', fontSize: '14px' }}
                        >
                          <option value="">Select...</option>
                          {timeSlots.map(slot => (
                            <option key={slot} value={slot}>{slot}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="col-12">
                        <label htmlFor="reason" className="form-label fw-bold text-muted mb-1" style={{ fontSize: '11px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Reason</label>
                        <textarea 
                          name="reason"
                          id="reason"
                          className="form-control bg-light border-0 shadow-none rounded-3 px-3 py-2" 
                          placeholder="Brief description..."
                          value={formData.reason}
                          onChange={handleInputChange}
                          style={{ height: '70px', fontSize: '14px' }}
                        ></textarea>
                      </div>
                      
                      <div className="col-12 mt-3">
                        <div className="d-flex gap-2">
                          <button type="button" className="btn btn-light fw-bold px-4 py-2 rounded-3 flex-grow-1 border-0" style={{ fontSize: '13px' }} onClick={() => setShowModal(false)}>Cancel</button>
                          <button type="submit" className="btn text-white fw-bold px-4 py-2 rounded-3 flex-grow-1 shadow-sm transition-all active-scale" style={{ backgroundColor: '#001835', fontSize: '13px' }}>
                            Confirm Booking
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

        {/* --- Action Confirmation Modal --- */}
        {actionTarget && (
          <div className="modal-wrapper">
            <div 
              className="modal-backdrop fade show" 
              onClick={() => setActionTarget(null)} 
              style={{ 
                backdropFilter: 'blur(8px)', 
                backgroundColor: 'rgba(0, 24, 53, 0.4)',
                transition: 'all 0.3s ease'
              }}
            ></div>
            <div className="modal fade show d-block" tabIndex={-1}>
              <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '420px' }}>
                <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden animate-slide-up" style={{ backgroundColor: '#ffffff' }}>
                  <div className={`py-4 px-4 text-center ${actionTarget.status === 'CONFIRMED' ? 'bg-success-subtle' : 'bg-danger-subtle'}`}>
                    <div 
                      className={`rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 shadow-sm ${
                        actionTarget.status === 'CONFIRMED' ? 'bg-success text-white' : 'bg-danger text-white'
                      }`} 
                      style={{ width: '64px', height: '64px' }}
                    >
                      <i className={`bi ${actionTarget.status === 'CONFIRMED' ? 'bi-check-lg' : 'bi-x-lg'} fs-2`}></i>
                    </div>
                    <h5 className="fw-bold mb-1 text-dark" style={{ letterSpacing: '-0.5px' }}>
                      {actionTarget.status === 'CONFIRMED' ? 'Confirm Appointment' : 'Reject Appointment'}
                    </h5>
                    <p className="text-muted mb-0 small uppercase fw-semibold tracking-wider">
                      Patient: {actionTarget.patientName}
                    </p>
                  </div>
                  
                  <div className="modal-body p-4 text-center">
                    <p className="text-secondary mb-4 leading-relaxed">
                      Are you sure you want to <strong>{actionTarget.status === 'CONFIRMED' ? 'confirm' : 'reject'}</strong> this appointment request? 
                      This action will immediately notify the patient.
                    </p>
                    
                    <div className="d-flex gap-3 mt-2">
                      <button 
                        className="btn btn-light fw-bold px-4 py-2.5 rounded-3 flex-grow-1 border-0 transition-all hover-bg-gray-200" 
                        onClick={() => setActionTarget(null)}
                        style={{ backgroundColor: '#f3f4f6', color: '#4b5563' }}
                      >
                        Cancel
                      </button>
                      <button 
                        className={`btn fw-bold px-4 py-2.5 rounded-3 flex-grow-1 shadow-sm transition-all active-scale text-white border-0`} 
                        style={{ 
                          backgroundColor: actionTarget.status === 'CONFIRMED' ? '#006a6a' : '#e11d48',
                          boxShadow: actionTarget.status === 'CONFIRMED' ? '0 4px 12px rgba(0, 106, 106, 0.2)' : '0 4px 12px rgba(225, 29, 72, 0.2)'
                        }}
                        onClick={() => handleAction()}
                      >
                        Yes, {actionTarget.status === 'CONFIRMED' ? 'Confirm' : 'Reject'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <style>{`
          .animate-fade-in { animation: fadeIn 0.4s ease-out; }
          .animate-slide-up { animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
          .hover-bg-light-blue:hover { background-color: rgba(0, 106, 106, 0.02) !important; }
          .shadow-teal { box-shadow: 0 10px 25px -5px rgba(0, 106, 106, 0.3); }
          .shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
          .focus-ring-teal:focus { box-shadow: 0 0 0 0.25rem rgba(0, 106, 106, 0.1) !important; background-color: #fff !important; border: 1px solid #006a6a !important; }
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
          input[type="date"]::selection { background: transparent; }
          input[type="date"]::-moz-selection { background: transparent; }
        `}</style>
      </div>
    </ReceptionLayout>
  );
};
