export interface User {
  email: string;
  first_name: string;
  friend_requests_received: string[];
  friend_requests_sent: string[];
  friends: string[];
  last_name: string;
  avatar?: string;
  isOnline: boolean;
  _id: string;
}

export interface IUserInfo {
  email: string;
  firstName: string;
  lastName: string;
}
