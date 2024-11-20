export interface SearchUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  is_friend: boolean;
  friend_request_sent: boolean;
  avatar?: string;
}
