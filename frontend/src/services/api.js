const getToken = () => {
  try { return JSON.parse(localStorage.getItem('user'))?.token; } catch { return null; }
};

async function request(path, options = {}) {
  const token = getToken();
  const response = await fetch(`/api${path}`, {
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok || body.status === 'error') throw new Error(body.message || 'Request failed');
  return body.data;
}

export const getParkingAreas = () => request('/parking-areas');
export const createParkingArea = (data) => request('/parking-areas', { method: 'POST', body: JSON.stringify(data) });
export const updateParkingArea = (id, data) => request(`/parking-areas/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteParkingArea = (id) => request(`/parking-areas/${id}`, { method: 'DELETE' });

export const getUsers = () => request('/admin/users');
export const createUser = (data) => request('/admin/users', { method: 'POST', body: JSON.stringify(data) });
export const updateUser = (id, data) => request(`/admin/users/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteUser = (id) => request(`/admin/users/${id}`, { method: 'DELETE' });

export const getParkingUpdates = () => request('/parking-updates');
export const createParkingUpdate = (data) => request('/parking-updates', { method: 'POST', body: JSON.stringify(data) });
export const updateParkingUpdate = (id, data) => request(`/parking-updates/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteParkingUpdate = (id) => request(`/parking-updates/${id}`, { method: 'DELETE' });
