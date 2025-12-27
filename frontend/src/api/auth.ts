import { api } from './client';

export async function register(input: { email: string; password: string }) {
  const res = await api.post('/auth/register', input);
  return res.data as { id: string; email: string };
}

export async function login(input: { email: string; password: string }) {
  const res = await api.post('/auth/login', input);
  return res.data as { token: string };
}

export async function forgotPassword(input: { email: string }) {
  const res = await api.post('/auth/forgot-password', input);
  return res.data as { ok: true };
}

export async function resetPassword(input: { token: string; newPassword: string }) {
  const res = await api.post('/auth/reset-password', input);
  return res.data as { ok: true };
}

export async function me() {
  const res = await api.get('/auth/me');
  return res.data as { userId: string };
}
