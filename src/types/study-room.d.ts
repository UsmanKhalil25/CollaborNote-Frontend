export interface Participant {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface StudyRoom {
  id: string;
  name: string;
  description: string;
  ownerEmail: string;
  participants: Participant[];
  createdAt: string;
}
