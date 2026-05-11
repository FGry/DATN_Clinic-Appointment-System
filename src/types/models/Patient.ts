export type Patient = {
  id?: number;
  fullName: string;
  username: string;
  email: string;
  phoneNumber: string;
  address: string;
  role?: string;
};

export type CreatePatientPayload = {
  fullName: string;
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
  address: string;
};

export type UpdatePatientPayload = {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
};
