import { apiRequest } from './api';

export type RegisterPayload = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  passwordConfirmation: string;
  phone: string;
  active: boolean;
  email: string;
  address: string;
  dob: string;
  gender: boolean;
};

export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginResponse = {
  message: string;
  statusCode: number;
  status: string;
  timestamp: string;
  data: {
    accessToken: string;
    refreshToken: string;
    username: string;
    userId: number;
    role: string;
  };
};

const AUTH_STORAGE_KEY = 'auth';

type AuthSession = {
  username: string;
  userId: number;
  accessToken: string;
  role: string;
};

export const authService = {
  register: (payload: RegisterPayload) =>
    apiRequest<unknown>('/api/auth/register', {
      method: 'POST',
      body: payload,
    }),
  login: (payload: LoginPayload) =>
    apiRequest<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: payload,
    }),
  logout: () =>
    apiRequest<unknown>('/api/auth/logout', {
      method: 'POST',
    }),
  forgotPassword: (email: string) =>
    apiRequest<unknown>('/api/auth/forgot-password', {
      method: 'POST',
      body: { email },
    }),
  verifyOtp: (payload: { email: string; otp: string }) =>
    apiRequest<unknown>('/api/auth/verify-otp', {
      method: 'POST',
      body: payload,
    }),
  resetPassword: (payload: { email: string; newPassword: string }) =>
    apiRequest<unknown>('/api/auth/reset-password', {
      method: 'POST',
      body: payload,
    }),
  saveSession: (response: LoginResponse) => {
    let role = response.data.role;

    if (!role && response.data.accessToken) {
      try {
        const payload = JSON.parse(atob(response.data.accessToken.split('.')[1]));
        role = payload.role;
      } catch (e) {
        console.error('Failed to decode role from token', e);
      }
    }

    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({
        username: response.data.username,
        userId: response.data.userId,
        accessToken: response.data.accessToken,
        role: role,
      } satisfies AuthSession),
    );
  },
  getSession: (): AuthSession | null => {
    const rawSession = localStorage.getItem(AUTH_STORAGE_KEY);

    if (!rawSession) {
      return null;
    }

    try {
      return JSON.parse(rawSession) as AuthSession;
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }
  },
  clearSession: () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  },
};
