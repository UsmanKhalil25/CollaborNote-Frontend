import { ParticipantOut, Participant } from "@/types/participant";

// Base Interface for Common Room Properties
interface BaseStudyRoom {
  id: string;
  name: string;
  description: string;
  participants: Participant[] | ParticipantOut[];
  createdAt: string;
}

export interface IStudyRoomListing
  extends Omit<
    BaseStudyRoom,
    "participants" | "content" | "isActive" | "endedAt"
  > {
  participants: ParticipantOut[];
}

export interface IStudyRoomDetail extends BaseStudyRoom {
  content: string;
  isActive: boolean;
  endedAt?: Date;
  participants: ParticipantOut[];
}

export interface StudyRoom extends IStudyRoomDetail {
  participants: Participant[];
}
