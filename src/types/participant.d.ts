export enum Permission {
  can_edit = "can_edit",
  can_view = "can_view",
}

export interface Participant {
  user_id: string;
  is_owner: Boolean;
  is_active: Boolean;
  permission: Permission;
}

export interface ParticipantOut extends Participant {
  email: string;
  first_name: string;
  second_name: string;
}
