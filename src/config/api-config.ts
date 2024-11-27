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

  studyRooms: {
    index: `${API_BASE_URL}/study-rooms`,
    id: (studyRoomId: string) => `${API_BASE_URL}/study-rooms/${studyRoomId}`,
    create: `${API_BASE_URL}/study-rooms`,
    update: (studyRoomId: string) =>
      `${API_BASE_URL}/study-rooms/${studyRoomId}`,
    end: (studyRoomId: string) =>
      `${API_BASE_URL}/study-rooms/${studyRoomId}/end`,
    participants: {
      add: (studyRoomId: string) =>
        `${API_BASE_URL}/study-rooms/${studyRoomId}/participants`,
      remove: (studyRoomId: string, participantId: string) =>
        `${API_BASE_URL}/study-rooms/${studyRoomId}/participants/${participantId}`,
      updatePermission: (studyRoomId: string, participantId: string) =>
        `${API_BASE_URL}/study-rooms/${studyRoomId}/participants/${participantId}`,
    },
  },
  invitations: {
    index: `${API_BASE_URL}/invitations`,
    updateStatus: (invitationId: string, newStatus: string) =>
      `${API_BASE_URL}/invitations/${invitationId}/status?new_status=${newStatus}`,
  },
};
