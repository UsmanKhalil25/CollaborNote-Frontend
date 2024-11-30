import { IStudyRoomListing } from "@/types/study-room";
import { IUserInfo } from "@/types/user";

export enum InvitationStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED",
}

export interface IInvitationListingOut {
  id: string;
  studyRoomId: string;
  invitedUserId: string;
  inviterUserId: string;
  status: string;
  createdAt: string;
  respondedAt?: string | null;
  inviterUserInfo: IUserInfo;
  studyRoomInfo: IStudyRoomListing;
}

export interface IInvitationSearchItem {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  inviteSent: boolean;
  isParticipant: boolean;
  invitationStatus: InvitationStatus;
}
