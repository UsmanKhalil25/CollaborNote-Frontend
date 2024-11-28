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
  isActive: boolean;
  createdAt: Date;
  endedAt?: Date;
}
