export interface FriendRequest {
  _id: string;
  created_at: string;
  receiver_id: string;
  sender_id: string;
  status: "pending" | "accepted" | "rejected";
  responded_at: string | null;
  sender: {
    _id: string;
    avatar?: string;
    email: string;
    first_name: string;
    last_name: string;
  };
}
