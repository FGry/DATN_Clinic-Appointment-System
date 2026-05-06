
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';

export class ApiError extends Error {
  status: number;
  details: unknown;

  constructor(message: string, status: number, details: unknown = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  headers?: HeadersInit;
};

export const apiRequest = async <T>(path: string, options: RequestOptions = {}): Promise<T> => {
  const authKey = 'auth';
  const rawSession = localStorage.getItem(authKey);
  let accessToken = '';
  
  if (rawSession) {
    try {
      const session = JSON.parse(rawSession);
      accessToken = session.accessToken;
    } catch (e) {
      console.error('Failed to parse auth session', e);
    }
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (accessToken) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${accessToken}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method ?? 'GET',
    credentials: 'include',
    headers,
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  });

  const contentType = response.headers.get('content-type');
  const data = contentType?.includes('application/json') ? await response.json() : await response.text();

  if (!response.ok) {
    const message =
      typeof data === 'object' && data !== null && 'message' in data
        ? String((data as { message: unknown }).message)
        : `Something went wrong`;

    throw new ApiError(message, response.status, data);
  }

  return data as T;
};

