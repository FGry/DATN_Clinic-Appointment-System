import React, { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PatientLayout } from '../../components/layout/PatientLayout';
import {
  type AppointmentPayload,
  type PatientAppointment,
  type PatientDoctor,
  patientAppointmentApi,
} from '../../services/patientAppointmentService';

const statusLabel: Record<string, string> = {
  PENDING: 'Pending',
  CONFIRMED: 'Confirmed',
  CANCELLED: 'Cancelled',
  REJECTED: 'Rejected',
  COMPLETED: 'Completed',
};

const formatDate = (value: string) => new Intl.DateTimeFormat('en', {
  weekday: 'short',
  month: 'short',
  day: '2-digit',
  year: 'numeric',
}).format(new Date(`${value}T00:00:00`));

const formatTime = (value: string) => new Intl.DateTimeFormat('en', {
  hour: '2-digit',
  minute: '2-digit',
}).format(new Date(`2024-01-01T${value}`));

export const PatientAppointmentDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const appointmentId = Number(id);
  const [appointment, setAppointment] = useState<PatientAppointment | null>(null);
  const [doctors, setDoctors] = useState<PatientDoctor[]>([]);
  const [showReschedule, setShowReschedule] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadData = async () => {
    if (!appointmentId) {
      setError('Appointment ID is missing.');
      setLoading(false);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const [appointmentData, doctorData] = await Promise.all([
        patientAppointmentApi.getAppointment(appointmentId),
        patientAppointmentApi.getDoctors(),
      ]);
      setAppointment(appointmentData);
      setDoctors(doctorData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load appointment');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, [appointmentId]);

  const handleCancel = async () => {
    if (!appointment || !window.confirm('Cancel this appointment?')) {
      return;
    }
    try {
      const updated = await patientAppointmentApi.cancelAppointment(appointment.id);
      setAppointment(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to cancel appointment');
    }
  };

  const canModify = appointment && !['CANCELLED', 'COMPLETED', 'REJECTED'].includes(appointment.status);

  return (
    <PatientLayout>
      <div className="mx-auto font-manrope" style={{ maxWidth: '900px' }}>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-5">
          <div>
            <h2 className="fw-bolder mb-1" style={{ color: '#001835' }}>Appointment Details</h2>
            <p className="text-muted mb-0">Review your upcoming medical consultation information.</p>
          </div>
          <Link to="/patient/appointments" className="btn btn-link fw-bold text-decoration-none d-flex align-items-center gap-2 px-0" style={{ color: '#006a6a' }}>
            <i className="bi bi-arrow-left"></i> Back to List
          </Link>
        </div>

        {error && <div className="alert alert-danger border-0 shadow-sm">{error}</div>}
        {loading && <div className="card border-0 shadow-sm rounded-4 p-5 text-center text-muted">Loading appointment...</div>}

        {!loading && appointment && (
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden position-relative bg-white">
            <div className="card-header bg-white border-bottom p-4 p-md-5 d-flex justify-content-between align-items-center">
              <div>
                <p className="text-muted fw-bold text-uppercase mb-1" style={{ fontSize: '11px' }}>Appointment ID</p>
                <span className="fw-bold" style={{ color: '#001835' }}>#APT-{String(appointment.id).padStart(6, '0')}</span>
              </div>
              <span className="badge rounded-pill px-3 py-2 fw-bold text-success bg-success-subtle d-inline-flex align-items-center gap-2">
                <span className="bg-success rounded-circle" style={{ width: '6px', height: '6px' }}></span> {statusLabel[appointment.status]}
              </span>
            </div>

            <div className="card-body p-4 p-md-5">
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="d-flex gap-3 align-items-start">
                    <div className="bg-light rounded-3 d-flex align-items-center justify-content-center" style={{ width: '54px', height: '54px' }}>
                      <i className="bi bi-briefcase-medical fs-4" style={{ color: '#001835' }}></i>
                    </div>
                    <div>
                      <p className="text-muted small fw-bold mb-0">Practitioner</p>
                      <h5 className="fw-bold mb-1" style={{ color: '#001835' }}>{appointment.doctorName}</h5>
                      <span className="badge rounded-pill" style={{ backgroundColor: '#e6f4f4', color: '#006a6a' }}>{appointment.specialtyName}</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex gap-3 align-items-start">
                    <div className="bg-light rounded-3 d-flex align-items-center justify-content-center" style={{ width: '54px', height: '54px' }}>
                      <i className="bi bi-calendar-event fs-4" style={{ color: '#001835' }}></i>
                    </div>
                    <div>
                      <p className="text-muted small fw-bold mb-0">Date & Time</p>
                      <h5 className="fw-bold mb-1" style={{ color: '#001835' }}>{formatTime(appointment.appointmentTime)}</h5>
                      <p className="mb-0 text-muted">{formatDate(appointment.appointmentDate)}</p>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="bg-light p-4 rounded-3">
                    <p className="text-muted fw-bold small mb-1">Reason for Visit</p>
                    <p className="fw-medium text-dark mb-0">{appointment.reason || 'No reason provided.'}</p>
                  </div>
                </div>
                <div className="col-12">
                  <div className="bg-warning-subtle border-start border-4 border-warning rounded-end-3 p-4 d-flex gap-3">
                    <i className="bi bi-info-circle-fill text-warning fs-5"></i>
                    <div>
                      <h6 className="fw-bold text-dark mb-1">Message from Clinic</h6>
                      <p className="text-dark opacity-75 mb-0" style={{ fontSize: '14px' }}>Please arrive 15 minutes early to complete check-in and initial vitals screening.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-footer bg-light bg-opacity-50 border-top p-4 p-md-5 d-flex flex-wrap gap-3 justify-content-end">
              <button className="btn btn-outline-danger fw-bold px-4 rounded-3 bg-white" disabled={!canModify} onClick={handleCancel}>
                Cancel Appointment
              </button>
              <button className="btn text-white fw-bold px-4 rounded-3 shadow-sm" style={{ backgroundColor: '#001835' }} disabled={!canModify} onClick={() => setShowReschedule(true)}>
                Reschedule
              </button>
            </div>
          </div>
        )}

        {!loading && !appointment && (
          <button className="btn btn-link fw-bold" onClick={() => navigate('/patient/appointments')}>Back to appointments</button>
        )}

        {showReschedule && appointment && (
          <RescheduleModal
            appointment={appointment}
            doctors={doctors}
            onClose={() => setShowReschedule(false)}
            onSaved={(updated) => {
              setAppointment(updated);
              setShowReschedule(false);
            }}
          />
        )}
      </div>
    </PatientLayout>
  );
};

type RescheduleModalProps = {
  appointment: PatientAppointment;
  doctors: PatientDoctor[];
  onClose: () => void;
  onSaved: (appointment: PatientAppointment) => void;
};

const RescheduleModal: React.FC<RescheduleModalProps> = ({ appointment, doctors, onClose, onSaved }) => {
  const [payload, setPayload] = useState<AppointmentPayload>({
    doctorId: appointment.doctorId,
    appointmentDate: appointment.appointmentDate,
    appointmentTime: appointment.appointmentTime.slice(0, 5),
    reason: appointment.reason ?? '',
  });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      const updated = await patientAppointmentApi.rescheduleAppointment(appointment.id, payload);
      onSaved(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to reschedule appointment');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="modal-backdrop fade show" style={{ backgroundColor: 'rgba(0,24,53,0.5)' }}></div>
      <div className="modal fade show d-block" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <form className="modal-content border-0 shadow-lg rounded-4" onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title fw-bold" style={{ color: '#001835' }}>Reschedule Appointment</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label fw-bold text-muted small">Doctor</label>
                  <select className="form-select" value={payload.doctorId} onChange={(event) => setPayload((current) => ({ ...current, doctorId: Number(event.target.value) }))}>
                    {doctors.map((doctor) => <option key={doctor.id} value={doctor.id}>{doctor.fullName} - {doctor.specialtyName}</option>)}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold text-muted small">Date</label>
                  <input className="form-control" type="date" required value={payload.appointmentDate} onChange={(event) => setPayload((current) => ({ ...current, appointmentDate: event.target.value }))} />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold text-muted small">Time</label>
                  <input className="form-control" type="time" required value={payload.appointmentTime} onChange={(event) => setPayload((current) => ({ ...current, appointmentTime: event.target.value }))} />
                </div>
                <div className="col-12">
                  <label className="form-label fw-bold text-muted small">Reason</label>
                  <textarea className="form-control" rows={3} value={payload.reason} onChange={(event) => setPayload((current) => ({ ...current, reason: event.target.value }))}></textarea>
                </div>
              </div>
            </div>
            <div className="modal-footer bg-light border-0">
              <button type="button" className="btn btn-link text-muted fw-bold text-decoration-none" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn text-white fw-bold" style={{ backgroundColor: '#001835' }} disabled={saving}>
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
