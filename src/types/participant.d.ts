export enum Permission {
  CAN_VIEW = "canView",
  CAN_EDIT = "canEdit",
}

export interface Participant {
  userId: string;
  isOwner: boolean;
  isActive: boolean;
  permission: Permission;
}

export interface ParticipantOut extends Participant {
  email: string;
  firstName: string;
  secondName: string;
}
