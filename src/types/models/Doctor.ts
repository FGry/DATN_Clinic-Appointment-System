export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  schedule: string;
  imageUrl: string;
}

export type AdminDoctor = {
  id?: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  gender: boolean;
  password?: string;
  specialtyId: number;
  specialtyName?: string;
  fee: number;
  experience: string;
  avaUrl: string;
};

export type CreateDoctorPayload = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  gender: boolean;
  password: string;
  specialtyId: number;
  fee: number;
  experience: string;
  avaUrl: string;
};

export type UpdateDoctorPayload = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  gender: boolean;
  password: string;
  specialtyId: number;
  fee: number;
  experience: string;
  avaUrl: string;
};