export type Receptionist = {
  id?: number;
  fullName: string;
  username: string;
  phone: string;
  address: string;
  email: string;
  role?: string;
};

export type CreateReceptionistPayload = {
  fullName: string;
  username: string;
  password: string;
  phone: string;
  address: string;
  email: string;
};

export type UpdateReceptionistPayload = {
  fullName: string;
  username: string;
  password: string;
  phone: string;
  address: string;
  email: string;
};
