export const API_BASE_URL = import.meta.env.VITE_API_URL;

export const ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    register: `${API_BASE_URL}/auth/register`,
    refresh: `${API_BASE_URL}/auth/refresh`,
  },
  users: {
    current: `${API_BASE_URL}/users/current`,
  },
  posts: {
    getAll: `${API_BASE_URL}/posts`,
    create: `${API_BASE_URL}/posts/create`,
  },
};
