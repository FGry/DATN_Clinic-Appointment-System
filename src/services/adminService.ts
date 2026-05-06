import { apiRequest } from './api';
import type { Specialty } from '../types/models/Specialty';

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
