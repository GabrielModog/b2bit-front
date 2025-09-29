import { http, HttpResponse } from 'msw';

const API_BASE = 'https://api.homologation.cliqdrive.com.br';

export const mockUser = {
  id: 1,
  name: 'Christine James',
  email: 'christinejames@gmail.com',
  is_active: true,
  avatar: {
    id: 1,
    high: 'https://example.com/avatar-high.jpg',
    medium: 'https://example.com/avatar-medium.jpg',
    low: 'https://example.com/avatar-low.jpg',
  },
  type: 'StoreUser',
  created: '2023-09-20T11:42:54.515946-03:00',
  modified: '2023-09-20T11:42:54.515946-03:00',
  role: 'OWNER',
};

export const handlers = [
  http.post(`${API_BASE}/auth/login/`, async ({ request }) => {
    const body = (await request.json()) as Partial<{ email: string; password: string }> | null;
    const email = body?.email ?? '';
    const password = body?.password ?? '';
    if (email === 'test@example.com' && password === 'password') {
      return HttpResponse.json({
        tokens: { access: 'mock-access-token', refresh: 'mock-refresh-token' },
        user: mockUser,
      });
    }
    return new HttpResponse(
      JSON.stringify({ message: 'Credenciais inválidas' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }),

  http.get(`${API_BASE}/auth/profile/`, () => {
    return HttpResponse.json(mockUser);
  }),

  http.post(`${API_BASE}/auth/logout/`, () => {
    return HttpResponse.json({ success: true });
  }),
];


