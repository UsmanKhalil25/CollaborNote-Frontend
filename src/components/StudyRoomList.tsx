import { ScrollableContainer } from "@/components/ScrollableContainer";
import { StudyRoomItem } from "@/components/StudyRoomItem";

import { StudyRoom } from "@/types/study-room";

const STUDY_ROOM_ITEMS: StudyRoom[] = [
  {
    id: "room123",
    name: "Advanced Algorithms Study Group",
    description:
      "A study room for discussing advanced algorithms and problem-solving techniques.",
    ownerEmail: "owner@example.com",
    participants: [
      {
        id: "user1",
        email: "user1@example.com",
        firstName: "John",
        lastName: "Doe",
      },
      {
        id: "user2",
        email: "user2@example.com",
        firstName: "Jane",
        lastName: "Smith",
      },
      {
        id: "user3",
        email: "user3@example.com",
        firstName: "Alice",
        lastName: "Johnson",
      },
      {
        id: "user4",
        email: "user4@example.com",
        firstName: "Bob",
        lastName: "Williams",
      },
      {
        id: "user5",
        email: "user5@example.com",
        firstName: "Charlie",
        lastName: "Brown",
      },
    ],
    createdAt: "2024-09-20T10:00:00Z",
  },
];

export function StudyRoomList() {
  return (
    <ScrollableContainer>
      {STUDY_ROOM_ITEMS.map((item, index) => (
        <StudyRoomItem key={index} item={item} />
      ))}
    </ScrollableContainer>
  );
}
