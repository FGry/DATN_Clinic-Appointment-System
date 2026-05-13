import { apiRequest } from './api';

// --- Types ---
export interface AdminDoctorResponse {
  id: number;
  fullName: string;
  specialtyName: string;
}


export interface DoctorScheduleResponse {
  id: number;
  doctorId: number;
  doctorName: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface DoctorScheduleRequest {
  doctorId: number;
  date: string;
  startTime: string;
  endTime: string;
}

export interface AppointmentResponse {
  id: number;
  patientName: string;
  doctorName: string;
  specialty: string;
  appointmentDate: string;
  appointmentTime: string;
  reason: string;
  status: 'PENDING' | 'CONFIRMED' | 'REJECTED' | 'CANCELED' | 'COMPLETED';
}

export interface AppointmentRequest {
  patientId: number;
  patientName: string;
  doctorId: number;
  specialty: string;
  appointmentDate: string;
  appointmentTime: string;
  reason: string;
}

export interface AppointmentStatusRequest {
  status: 'CONFIRMED' | 'REJECTED';
}

// --- Service ---

export const receptionistService = {
  // Doctor Schedule API
  createSchedule: (request: DoctorScheduleRequest) => 
    apiRequest<DoctorScheduleResponse>('/api/receptionist/schedules', {
      method: 'POST',
      body: request,
    }),

  updateSchedule: (id: number, request: DoctorScheduleRequest) => 
    apiRequest<DoctorScheduleResponse>(`/api/receptionist/schedules/${id}`, {
      method: 'PUT',
      body: request,
    }),

  getSchedulesByDoctorId: (doctorId: number) => 
    apiRequest<DoctorScheduleResponse[]>(`/api/receptionist/schedules/doctor/${doctorId}`),

  deleteSchedule: (id: number) => 
    apiRequest<void>(`/api/receptionist/schedules/${id}`, {
      method: 'DELETE',
    }),

  // Appointment API
  createAppointment: (request: AppointmentRequest) => 
    apiRequest<AppointmentResponse>('/api/receptionist/appointments', {
      method: 'POST',
      body: request,
    }),

  updateAppointmentStatus: (id: number, status: 'CONFIRMED' | 'REJECTED') => 
    apiRequest<AppointmentResponse>(`/api/receptionist/appointments/${id}/status`, {
      method: 'PUT',
      body: { status },
    }),

  getAppointments: (date?: string) => 
    apiRequest<AppointmentResponse[]>(`/api/receptionist/appointments${date ? `?date=${date}` : ''}`),

  getAllSchedules: () =>
    apiRequest<DoctorScheduleResponse[]>('/api/receptionist/schedules'),

  getDoctors: () =>
    apiRequest<AdminDoctorResponse[]>('/api/receptionist/doctors'),
};
