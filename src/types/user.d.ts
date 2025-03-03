export interface User {
  email: string;
  firstName: string;
  lastName: string;
  friendRequestReceived: string[];
  friendRequestsSent: string[];
  friends: string[];
  avatar?: string;
  isOnline: boolean;
  _id: string;
}

export interface IUserInfo {
  email: string;
  firstName: string;
  lastName: string;
}
