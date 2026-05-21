import React, { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PatientLayout } from '../../components/layout/PatientLayout';
import { authService } from '../../services/authService';
import {
  type AppointmentPayload,
  type PatientAppointment,
  type PatientDoctor,
  patientAppointmentApi,
} from '../../services/patientAppointmentService';

const statusStyles: Record<string, { label: string; className: string; dot: string }> = {
  PENDING: { label: 'Pending', className: 'text-warning-emphasis', dot: 'bg-warning' },
  CONFIRMED: { label: 'Confirmed', className: 'text-success', dot: 'bg-success' },
  CANCELLED: { label: 'Cancelled', className: 'text-danger', dot: 'bg-danger' },
  REJECTED: { label: 'Rejected', className: 'text-danger', dot: 'bg-danger' },
  COMPLETED: { label: 'Completed', className: 'text-muted', dot: 'bg-secondary' },
};

const formatDateTime = (appointment: PatientAppointment) => {
  const date = new Date(`${appointment.appointmentDate}T${appointment.appointmentTime}`);
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const getTodayDateValue = () => new Date().toISOString().split('T')[0];

const buildHalfHourSlots = () => {
  const slots: string[] = [];

  for (let hour = 8; hour < 17; hour += 1) {
    slots.push(`${String(hour).padStart(2, '0')}:00`);
    slots.push(`${String(hour).padStart(2, '0')}:30`);
  }

  slots.push('17:00');

  return slots;
};

export const PatientAppointmentsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showModal, setShowModal] = useState(searchParams.get('openBooking') === '1');
  const [appointments, setAppointments] = useState<PatientAppointment[]>([]);
  const [doctors, setDoctors] = useState<PatientDoctor[]>([]);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [monthFilter, setMonthFilter] = useState('ALL');
  const [yearFilter, setYearFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const preferredDoctorId = Number(searchParams.get('doctorId') ?? '0');

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const [appointmentData, doctorData] = await Promise.all([
        patientAppointmentApi.getAppointments(),
        patientAppointmentApi.getDoctors(),
      ]);
      setAppointments(appointmentData);
      setDoctors(doctorData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load appointments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  useEffect(() => {
    if (searchParams.get('openBooking') === '1') {
      setShowModal(true);
    }
  }, [searchParams]);

  const years = useMemo(
    () => Array.from(new Set(appointments.map((item) => new Date(item.appointmentDate).getFullYear()))),
    [appointments],
  );

  const filteredAppointments = appointments.filter((appointment) => {
    const date = new Date(appointment.appointmentDate);
    const matchesStatus = statusFilter === 'ALL' || appointment.status === statusFilter;
    const matchesMonth = monthFilter === 'ALL' || date.getMonth() + 1 === Number(monthFilter);
    const matchesYear = yearFilter === 'ALL' || date.getFullYear() === Number(yearFilter);
    return matchesStatus && matchesMonth && matchesYear;
  });

  return (
    <PatientLayout>
      <div className="mx-auto font-manrope" style={{ maxWidth: '1200px' }}>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-5">
          <div>
            <h2 className="fw-bolder mb-1" style={{ color: '#001835' }}>My Appointments</h2>
            <p className="text-muted mb-0">Manage your scheduled visits and clinical history with MedClinic specialists.</p>
          </div>
          <button
            className="btn fw-bold px-4 py-2 d-flex align-items-center gap-2 rounded-3 shadow-sm text-white"
            style={{ backgroundColor: '#001835' }}
            onClick={() => {
              setShowModal(true);
              if (searchParams.get('openBooking') === '1') {
                setSearchParams({}, { replace: true });
              }
            }}
          >
            <i className="bi bi-calendar-plus fs-5"></i> Book New Appointment
          </button>
        </div>

        <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
          <div className="d-flex flex-wrap align-items-end gap-3">
            <div className="d-flex align-items-center gap-2 fw-bold me-2" style={{ color: '#006a6a' }}>
              <i className="bi bi-funnel fs-5"></i>
              <span>Filter by History</span>
            </div>
            <div>
              <label className="form-label small text-muted fw-bold text-uppercase mb-1">Month</label>
              <select className="form-select bg-light border-0 fw-medium" value={monthFilter} onChange={(event) => setMonthFilter(event.target.value)}>
                <option value="ALL">All Months</option>
                {Array.from({ length: 12 }, (_, index) => (
                  <option key={index + 1} value={index + 1}>{new Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(2024, index, 1))}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label small text-muted fw-bold text-uppercase mb-1">Year</label>
              <select className="form-select bg-light border-0 fw-medium" value={yearFilter} onChange={(event) => setYearFilter(event.target.value)}>
                <option value="ALL">All Years</option>
                {years.map((year) => <option key={year} value={year}>{year}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label small text-muted fw-bold text-uppercase mb-1">Status</label>
              <select className="form-select bg-light border-0 fw-medium" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                <option value="ALL">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
            <button className="btn btn-outline-secondary fw-bold rounded-3 bg-white ms-auto" onClick={() => {
              setStatusFilter('ALL');
              setMonthFilter('ALL');
              setYearFilter('ALL');
            }}>Reset</button>
          </div>
        </div>

        {error && <div className="alert alert-danger border-0 shadow-sm">{error}</div>}

        <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr className="text-uppercase small fw-bold text-muted">
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Doctor</th>
                  <th className="py-3 px-4">Specialty</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-end">Actions</th>
                </tr>
              </thead>
              <tbody className="border-top-0">
                {loading && (
                  <tr><td colSpan={5} className="text-center text-muted py-5">Loading appointments...</td></tr>
                )}
                {!loading && filteredAppointments.length === 0 && (
                  <tr><td colSpan={5} className="text-center text-muted py-5">No appointments found.</td></tr>
                )}
                {!loading && filteredAppointments.map((appointment) => {
                  const style = statusStyles[appointment.status] ?? statusStyles.PENDING;
                  return (
                    <tr key={appointment.id}>
                      <td className="px-4 py-4 fw-bold" style={{ color: '#001835' }}>{formatDateTime(appointment)}</td>
                      <td className="px-4 py-4 fw-bold text-dark">{appointment.doctorName}</td>
                      <td className="px-4 py-4"><span className="badge rounded-pill px-3 py-2 fw-bold" style={{ backgroundColor: '#e6f4f4', color: '#006a6a' }}>{appointment.specialtyName}</span></td>
                      <td className="px-4 py-4">
                        <span className={`d-inline-flex align-items-center gap-2 small fw-bold ${style.className}`}>
                          <span className={`${style.dot} rounded-circle`} style={{ width: '8px', height: '8px' }}></span> {style.label}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-end">
                        <Link to={`/patient/appointments/${appointment.id}`} className="btn btn-sm fw-bold px-3 py-2 rounded-3 text-white shadow-sm" style={{ backgroundColor: '#001835' }}>
                          View Details
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {showModal && (
          <BookingModal
            doctors={doctors}
            preferredDoctorId={preferredDoctorId}
            onClose={() => {
              setShowModal(false);
              setSearchParams({}, { replace: true });
            }}
            onSaved={() => {
              setShowModal(false);
              setSearchParams({}, { replace: true });
              void loadData();
            }}
          />
        )}
      </div>
    </PatientLayout>
  );
};

type BookingModalProps = {
  doctors: PatientDoctor[];
  preferredDoctorId?: number;
  onClose: () => void;
  onSaved: () => void;
};

const BookingModal: React.FC<BookingModalProps> = ({ doctors, preferredDoctorId, onClose, onSaved }) => {
  const session = authService.getSession();
  const today = getTodayDateValue();
  const [payload, setPayload] = useState<AppointmentPayload>({
    doctorId: preferredDoctorId ?? doctors[0]?.id ?? 0,
    appointmentDate: today,
    appointmentTime: '',
    reason: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [scheduleLoading, setScheduleLoading] = useState(false);
  const [scheduleError, setScheduleError] = useState('');
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  const selectedDoctor = doctors.find((doctor) => doctor.id === payload.doctorId);
  const bookedSlotSet = useMemo(() => new Set(bookedSlots), [bookedSlots]);

  useEffect(() => {
    if (doctors.length === 0) {
      return;
    }

    setPayload((current) => {
      const preferredDoctorExists = preferredDoctorId ? doctors.some((doctor) => doctor.id === preferredDoctorId) : false;
      const nextDoctorId = preferredDoctorExists ? preferredDoctorId : current.doctorId || doctors[0].id;

      return {
        ...current,
        doctorId: nextDoctorId,
        appointmentDate: current.appointmentDate || today,
      };
    });
  }, [doctors, preferredDoctorId, today]);

  useEffect(() => {
    let cancelled = false;

    const loadAvailability = async () => {
      if (!payload.doctorId || !payload.appointmentDate) {
        setAvailableSlots([]);
        setBookedSlots([]);
        return;
      }

      setScheduleLoading(true);
      setScheduleError('');

      try {
        const appointmentData = await patientAppointmentApi.getAppointments();

        if (cancelled) {
          return;
        }

        const nextSlots = buildHalfHourSlots();

        const nextBookedSlots = appointmentData
          .filter((appointment) => {
            return appointment.doctorId === payload.doctorId && appointment.appointmentDate === payload.appointmentDate;
          })
          .map((appointment) => appointment.appointmentTime.slice(0, 5));

        setAvailableSlots(nextSlots);
        setBookedSlots(nextBookedSlots);

        if (payload.appointmentTime && (!nextSlots.includes(payload.appointmentTime) || nextBookedSlots.includes(payload.appointmentTime))) {
          setPayload((current) => ({ ...current, appointmentTime: '' }));
        }
      } catch (err) {
        if (!cancelled) {
          setAvailableSlots([]);
          setBookedSlots([]);
          setScheduleError(err instanceof Error ? err.message : 'Unable to load doctor availability');
        }
      } finally {
        if (!cancelled) {
          setScheduleLoading(false);
        }
      }
    };

    void loadAvailability();

    return () => {
      cancelled = true;
    };
  }, [payload.doctorId, payload.appointmentDate, payload.appointmentTime, selectedDoctor?.fullName]);

  const handleDoctorChange = (doctorId: number) => {
    setPayload((current) => ({
      ...current,
      doctorId,
      appointmentTime: '',
    }));
  };

  const handleDateChange = (appointmentDate: string) => {
    setPayload((current) => ({
      ...current,
      appointmentDate,
      appointmentTime: '',
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError('');

    if (!availableSlots.includes(payload.appointmentTime)) {
      setSaving(false);
      setError('Please choose an available time slot.');
      return;
    }

    if (bookedSlotSet.has(payload.appointmentTime)) {
      setSaving(false);
      setError('That time slot has already been booked. Please choose another slot.');
      return;
    }

    try {
      await patientAppointmentApi.createAppointment(payload);
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create appointment');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="modal-backdrop fade show" style={{ backdropFilter: 'blur(5px)', backgroundColor: 'rgba(0,24,53,0.5)' }}></div>
      <div className="modal fade show d-block" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <form className="modal-content border-0 shadow-lg rounded-4 overflow-hidden" onSubmit={handleSubmit}>
            <div className="modal-header bg-white py-4 px-4 border-bottom">
              <h4 className="modal-title fw-bolder" style={{ color: '#001835' }}>Book New Appointment</h4>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body p-4">
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="mb-3">
                <label className="form-label fw-bold text-muted small">Patient Name</label>
                <input className="form-control bg-light" value={session?.username ?? 'Current patient'} disabled />
              </div>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-bold text-muted small">Specialty</label>
                  <input className="form-control bg-light" value={selectedDoctor?.specialtyName ?? ''} disabled />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold text-muted small">Preferred Doctor</label>
                  <select
                    className="form-select"
                    required
                    value={payload.doctorId || ''}
                    onChange={(event) => handleDoctorChange(Number(event.target.value))}
                  >
                    <option value="">Select Doctor</option>
                    {doctors.map((doctor) => <option key={doctor.id} value={doctor.id}>{doctor.fullName}</option>)}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold text-muted small">Appointment Date</label>
                  <input className="form-control" type="date" min={today} required value={payload.appointmentDate} onChange={(event) => handleDateChange(event.target.value)} />
                </div>
                <div className="col-12">
                  <label className="form-label fw-bold text-muted small">Preferred Time</label>
                  {scheduleLoading ? (
                    <div className="border rounded-3 p-3 text-muted small">Loading available slots...</div>
                  ) : scheduleError ? (
                    <div className="alert alert-warning mb-0">{scheduleError}</div>
                  ) : availableSlots.length === 0 ? (
                    <div className="border rounded-3 p-3 text-muted small">No available schedule found for this doctor on the selected date.</div>
                  ) : (
                    <div className="d-flex flex-wrap gap-2">
                      {availableSlots.map((slot) => {
                        const isBooked = bookedSlotSet.has(slot);
                        const isSelected = payload.appointmentTime === slot;

                        return (
                          <button
                            key={slot}
                            type="button"
                            className={`btn btn-sm rounded-3 fw-bold px-3 py-2 ${isSelected ? 'text-white' : 'btn-outline-secondary'}`}
                            style={{
                              backgroundColor: isSelected ? '#001835' : undefined,
                              opacity: isBooked ? 0.35 : 1,
                              textDecoration: isBooked ? 'line-through' : 'none',
                            }}
                            disabled={isBooked}
                            onClick={() => setPayload((current) => ({ ...current, appointmentTime: slot }))}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className="col-12">
                  <label className="form-label fw-bold text-muted small">Reason for Visit</label>
                  <textarea className="form-control" rows={3} placeholder="Please describe your symptoms or concerns..." value={payload.reason} onChange={(event) => setPayload((current) => ({ ...current, reason: event.target.value }))}></textarea>
                </div>
              </div>
              <div className="bg-success-subtle border-start border-4 border-success p-3 rounded-end-3 d-flex gap-3 mt-4">
                <i className="bi bi-info-circle text-success"></i>
                <small className="text-success-emphasis fw-medium">Please arrive 15 minutes before your scheduled time for initial vitals screening.</small>
              </div>
            </div>
            <div className="modal-footer bg-light py-3 px-4 border-top-0">
              <button type="button" className="btn btn-link text-muted fw-bold text-decoration-none px-4" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn text-white fw-bold px-4 rounded-3 shadow-sm" style={{ backgroundColor: '#001835' }} disabled={saving || doctors.length === 0 || !payload.doctorId || !payload.appointmentDate || !payload.appointmentTime || !availableSlots.includes(payload.appointmentTime) || bookedSlotSet.has(payload.appointmentTime) || scheduleLoading}>
                {saving ? 'Creating...' : 'Create Appointment'} <i className="bi bi-arrow-right ms-2"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
