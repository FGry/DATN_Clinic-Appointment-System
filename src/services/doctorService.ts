import { apiRequest } from './api';

export type DoctorAppointmentStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'CANCELLED'
  | 'REJECTED'
  | 'COMPLETED';

export interface DoctorAppointmentResponse {
  id: number;
  patientName: string;
  serviceType: string;
  diagnosis: string | null;
  time: string;
  status: DoctorAppointmentStatus;
}

export interface DoctorDashboardStats {
  todaysAppointments: number;
  pendingReviews: number;
  totalPatients: number;
  completedToday: number;
}

export interface DoctorPatientResponse {
  time: string;
  patientName: string;
  gender: string;
  age: number;
  status: DoctorAppointmentStatus;
}

export interface DoctorAppointmentStatusUpdateRequest {
  status: DoctorAppointmentStatus;
  diagnosis?: string;
}

export interface CurrentDoctorResponse {
  doctorId: number;
  userId: number;
  fullName: string;
}

export const doctorService = {
  getCurrentDoctor: () =>
    apiRequest<CurrentDoctorResponse>('/api/doctor/me'),

  getDashboardStats: (doctorId: number) =>
    apiRequest<DoctorDashboardStats>(`/api/doctor/dashboard/${doctorId}`),

  getTodaySchedule: (doctorId: number) =>
    apiRequest<DoctorAppointmentResponse[]>(`/api/doctor/schedule/${doctorId}`),

  getTodayPatients: (doctorId: number) =>
    apiRequest<DoctorPatientResponse[]>(`/api/doctor/patients/${doctorId}`),

  updateAppointmentStatus: (
    doctorId: number,
    appointmentId: number,
    payload: DoctorAppointmentStatusUpdateRequest,
  ) =>
    apiRequest<DoctorAppointmentResponse>(`/api/doctor/appointments/${doctorId}/${appointmentId}/status`, {
      method: 'PUT',
      body: payload,
    }),
};
