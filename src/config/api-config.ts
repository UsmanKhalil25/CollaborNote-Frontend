export const API_BASE_URL = import.meta.env.VITE_API_URL;

export const ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    register: `${API_BASE_URL}/auth/register`,
    refresh: `${API_BASE_URL}/auth/refresh`,
  },
  users: {
    current: `${API_BASE_URL}/users/current`,
    friends: `${API_BASE_URL}/users/friends`,
    search: (searchQuery: string) =>
      `${API_BASE_URL}/users/search?query=${searchQuery}`,
  },
  friendRequests: {
    index: (status: string) =>
      `${API_BASE_URL}/friend-requests?status=${status}`,
    send: (userId: string) => `${API_BASE_URL}/friend-requests/send/${userId}`,
    updateStatus: (requestId: string, newStatus: string) =>
      `${API_BASE_URL}/friend-requests/${requestId}/status?new_status=${newStatus}`,
  },
};
