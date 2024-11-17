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
  },
  friendRequests: {
    index: `${API_BASE_URL}/friend-requests`,
  },
};
