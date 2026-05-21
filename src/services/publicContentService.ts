import { apiRequest } from './api';

export type PublicSpecialty = {
  id: number;
  name: string;
  description: string;
};

export type PublicDoctor = {
  id: number;
  specialtyId: number;
  fullName: string;
  specialtyName: string;
  experience: string;
  avaUrl: string;
};

export const publicContentApi = {
  getSpecialties: () => apiRequest<PublicSpecialty[]>('/api/public/specialties'),

  getDoctors: () => apiRequest<PublicDoctor[]>('/api/public/doctors'),

  getDoctorsBySpecialtyId: (specialtyId: number) =>
    apiRequest<PublicDoctor[]>(`/api/public/doctors/specialty/${specialtyId}`),
};
