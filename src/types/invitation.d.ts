import { IStudyRoomListingOut } from "@/types/study-room";
import { IUserInfo } from "@/types/user";

export enum InvitationStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED",
}

interface IInvitationListingOut {
  id: string;
  studyRoomId: string;
  invitedUserId: string;
  inviterUserId: string;
  status: string;
  createdAt: string;
  respondedAt?: string | null;
  inviterUserInfo: IUserInfo;
  studyRoomInfo: IStudyRoomListingOut;
}
