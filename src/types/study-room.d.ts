import { ParticipantOut, Participant } from "@/types/participant";

export interface IStudyRoomListingOut {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  participants: ParticipantOut[];
}

export interface StudyRoom {
  id?: string;
  name: string;
  description: string;
  participants: Participant[];
  content: string;
  is_active: boolean;
  created_at: Date;
  ended_at?: Date;
}
