import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PatientLayout } from '../../components/layout/PatientLayout';
import { authService } from '../../services/authService';
import {
  type PatientAppointment,
  type PatientDoctor,
  patientAppointmentApi,
} from '../../services/patientAppointmentService';

const formatAppointmentDate = (appointment: PatientAppointment) =>
  new Intl.DateTimeFormat('en', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(`${appointment.appointmentDate}T${appointment.appointmentTime}`));

const initials = (name: string) => name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();

export const PatientDashboardPage: React.FC = () => {
  const session = authService.getSession();
  const [appointments, setAppointments] = useState<PatientAppointment[]>([]);
  const [doctors, setDoctors] = useState<PatientDoctor[]>([]);
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('ALL');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [appointmentData, doctorData] = await Promise.all([
          patientAppointmentApi.getAppointments(),
          patientAppointmentApi.getDoctors(),
        ]);
        setAppointments(appointmentData);
        setDoctors(doctorData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load dashboard');
      }
    };

    void loadDashboard();
  }, []);

  const upcomingAppointments = appointments
    .filter((appointment) => ['PENDING', 'CONFIRMED'].includes(appointment.status))
    .slice(0, 3);

  const specialties = useMemo(() => Array.from(new Set(doctors.map((doctor) => doctor.specialtyName))), [doctors]);
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.fullName.toLowerCase().includes(search.toLowerCase());
    const matchesSpecialty = specialty === 'ALL' || doctor.specialtyName === specialty;
    return matchesSearch && matchesSpecialty;
  }).slice(0, 3);

  return (
    <PatientLayout>
      <div className="mx-auto font-manrope" style={{ maxWidth: '1400px' }}>
        <section className="mb-5">
          <h2 className="fw-bolder mb-2" style={{ color: '#001835' }}>Welcome back, {session?.username ?? 'Patient'}!</h2>
          <p className="text-muted fs-6">You have {upcomingAppointments.length} active appointment{upcomingAppointments.length === 1 ? '' : 's'} scheduled.</p>
        </section>

        {error && <div className="alert alert-danger border-0 shadow-sm">{error}</div>}

        <section className="mb-5">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
            <h3 className="fw-bolder m-0" style={{ color: '#001835' }}>Find a Doctor</h3>
            <div className="d-flex gap-3">
              <div className="input-group shadow-sm rounded-pill overflow-hidden border bg-white" style={{ width: '250px' }}>
                <span className="input-group-text bg-white border-0"><i className="bi bi-search text-muted"></i></span>
                <input type="text" className="form-control border-0 bg-white shadow-none" placeholder="Doctor name..." value={search} onChange={(event) => setSearch(event.target.value)} />
              </div>
              <select className="form-select shadow-sm rounded-pill border bg-white text-muted fw-medium" style={{ width: '200px' }} value={specialty} onChange={(event) => setSpecialty(event.target.value)}>
                <option value="ALL">All Specialties</option>
                {specialties.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
          </div>

          <div className="row g-4">
            {filteredDoctors.map((doctor) => (
              <div className="col-md-4" key={doctor.id}>
                <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white shadow-sm" style={{ width: '48px', height: '48px', backgroundColor: '#001835' }}>
                      {initials(doctor.fullName)}
                    </div>
                    <div>
                      <h6 className="fw-bold mb-1" style={{ color: '#001835' }}>{doctor.fullName}</h6>
                      <small className="fw-bold" style={{ color: '#006a6a' }}>{doctor.specialtyName}</small>
                    </div>
                  </div>
                  <p className="text-muted small flex-grow-1">{doctor.experience || 'Available for patient consultation.'}</p>
                  <Link to="/patient/appointments" className="btn text-white fw-bold rounded-3" style={{ backgroundColor: '#001835' }}>
                    Book Appointment
                  </Link>
                </div>
              </div>
            ))}
            {filteredDoctors.length === 0 && <div className="col-12 text-muted">No doctors found.</div>}
          </div>
        </section>

        <section>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bolder m-0" style={{ color: '#001835' }}>Recent Appointments</h3>
            <Link to="/patient/appointments" className="btn btn-link text-decoration-none fw-bold p-0" style={{ color: '#006a6a' }}>View All</Link>
          </div>

          <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
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
                {appointments.slice(0, 3).map((appointment) => (
                  <tr key={appointment.id}>
                    <td className="px-4 py-4 fw-bold" style={{ color: '#001835' }}>{formatAppointmentDate(appointment)}</td>
                    <td className="px-4 py-4 fw-bold text-dark">{appointment.doctorName}</td>
                    <td className="px-4 py-4"><span className="badge rounded-pill px-3 py-2 fw-bold" style={{ backgroundColor: '#e6f4f4', color: '#006a6a' }}>{appointment.specialtyName}</span></td>
                    <td className="px-4 py-4 small fw-bold text-muted">{appointment.status}</td>
                    <td className="px-4 py-4 text-end"><Link to={`/patient/appointments/${appointment.id}`} className="btn btn-link text-muted p-0"><i className="bi bi-three-dots-vertical fs-5"></i></Link></td>
                  </tr>
                ))}
                {appointments.length === 0 && <tr><td className="text-center text-muted py-5" colSpan={5}>No appointments yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </PatientLayout>
  );
};
