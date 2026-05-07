import { apiRequest } from './api';
import type { Specialty } from '../types/models/Specialty';
import type {
  CreateReceptionistPayload,
  Receptionist,
  UpdateReceptionistPayload,
} from '../types/models/Receptionist';

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
