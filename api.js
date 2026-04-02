const API = '/api';

async function request(path, options = {}) {
  const token = localStorage.getItem('cafe_token');
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API}${path}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export const api = {
  register: (data) => request('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  login: (data) => request('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  getProfile: () => request('/auth/profile'),
  getCategories: () => request('/menu/categories'),
  getMenu: (params) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/menu${qs ? `?${qs}` : ''}`);
  },
  getFullMenu: () => request('/menu/full/organized'),
  getMenuItem: (id) => request(`/menu/${id}`),
  createOrder: (data) => request('/orders', { method: 'POST', body: JSON.stringify(data) }),
  getMyOrders: () => request('/orders/my'),
  getOrder: (id) => request(`/orders/${id}`),
  createReservation: (data) => request('/reservations', { method: 'POST', body: JSON.stringify(data) }),
  getMyReservations: () => request('/reservations/my'),
  cancelReservation: (id) => request(`/reservations/${id}/cancel`, { method: 'PUT' }),
  getReviews: () => request('/reviews'),
  createReview: (data) => request('/reviews', { method: 'POST', body: JSON.stringify(data) }),
};