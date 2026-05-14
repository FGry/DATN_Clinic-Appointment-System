import { apiRequest } from './api';

export type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'REJECTED' | 'COMPLETED';

export type PatientAppointment = {
  id: number;
  patientId: number;
  doctorId: number;
  patientName: string;
  doctorName: string;
  specialtyName: string;
  appointmentDate: string;
  appointmentTime: string;
  reason?: string;
  status: AppointmentStatus;
};

export type AppointmentPayload = {
  doctorId: number;
  appointmentDate: string;
  appointmentTime: string;
  reason: string;
};

export type PatientDoctor = {
  id: number;
  userId: number;
  fullName: string;
  email: string;
  phone?: string;
  gender: boolean;
  specialtyName: string;
  fee?: number;
  experience?: string;
  avaUrl?: string;
};

export type PatientSpecialty = {
  id?: number;
  name: string;
  description?: string;
};

export const patientAppointmentApi = {
  getAppointments: () => apiRequest<PatientAppointment[]>('/api/patient/appointments'),
  getAppointment: (id: number) => apiRequest<PatientAppointment>(`/api/patient/appointments/${id}`),
  createAppointment: (payload: AppointmentPayload) =>
    apiRequest<PatientAppointment>('/api/patient/appointments', {
      method: 'POST',
      body: payload,
    }),
  rescheduleAppointment: (id: number, payload: AppointmentPayload) =>
    apiRequest<PatientAppointment>(`/api/patient/appointments/${id}/reschedule`, {
      method: 'PUT',
      body: payload,
    }),
  cancelAppointment: (id: number) =>
    apiRequest<PatientAppointment>(`/api/patient/appointments/${id}/cancel`, {
      method: 'PUT',
    }),
  getDoctors: () => apiRequest<PatientDoctor[]>('/api/patient/doctors'),
  getSpecialties: () => apiRequest<PatientSpecialty[]>('/api/patient/specialties'),
};
