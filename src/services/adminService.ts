import { apiRequest } from './api';
import type { Specialty } from '../types/models/Specialty';
import type {
  CreateReceptionistPayload,
  Receptionist,
  UpdateReceptionistPayload,
} from '../types/models/Receptionist';
import type { Patient, CreatePatientPayload, UpdatePatientPayload } from '../types/models/Patient';
import type { AdminDoctor, CreateDoctorPayload, UpdateDoctorPayload } from '../types/models/Doctor';

export const specialtyApi = {
  getAll: () => apiRequest<Specialty[]>('/api/admin/specialties'),

  create: (data: Specialty) =>
    apiRequest<Specialty>('/api/admin/specialties', {
      method: 'POST',
      body: data,
    }),

  update: (id: number, data: Specialty) =>
    apiRequest<Specialty>(`/api/admin/specialties/${id}`, {
      method: 'PUT',
      body: data,
    }),

  delete: (id: number) =>
    apiRequest<void>(`/api/admin/specialties/${id}`, {
      method: 'DELETE',
    }),
};

export const receptionistApi = {
  getAll: () => apiRequest<Receptionist[]>('/api/admin/receptionists'),

  create: (data: CreateReceptionistPayload) =>
    apiRequest<Receptionist>('/api/admin/receptionists', {
      method: 'POST',
      body: data,
    }),

  update: (id: number, data: UpdateReceptionistPayload) =>
    apiRequest<Receptionist>(`/api/admin/receptionists/${id}`, {
      method: 'PUT',
      body: data,
    }),

  deleteByUsername: (username: string) =>
    apiRequest<void>(`/api/admin/receptionists/${username}`, {
      method: 'DELETE',
    }),
};

export const patientApi = {
  getAll: () => apiRequest<Patient[]>('/api/admin/patients'),

  create: (data: CreatePatientPayload) =>
    apiRequest<Patient>('/api/admin/patients', {
      method: 'POST',
      body: data,
    }),

  update: (id: number, data: UpdatePatientPayload) =>
    apiRequest<Patient>(`/api/admin/patients/${id}`, {
      method: 'PUT',
      body: data,
    }),

  deleteByUsername: (username: string) =>
    apiRequest<void>(`/api/admin/patients/${username}`, {
      method: 'DELETE',
    }),
};

export const doctorApi = {
  getAll: () => apiRequest<AdminDoctor[]>('/api/admin/doctors'),

  create: (data: CreateDoctorPayload) =>
    apiRequest<AdminDoctor>('/api/admin/doctors', {
      method: 'POST',
      body: data,
    }),

  update: (id: number, data: UpdateDoctorPayload) =>
    apiRequest<AdminDoctor>(`/api/admin/doctors/${id}`, {
      method: 'PUT',
      body: data,
    }),

  deleteById: (id: number) =>
    apiRequest<void>(`/api/admin/doctors/${id}`, {
      method: 'DELETE',
    }),
};
