import { ScrollableContainer } from "@/components/ScrollableContainer";
import RecentActivityItem from "./RecentActivityItem";

const STUDY_ROOM_ITEMS = [
  {
    id: "1",
    name: "John Doe",
    date: "2024-11-16T12:30:00Z",
    read: false,
    subject: "Meeting Notes",
    text: "Here are the notes from the meeting that discussed the new project launch and upcoming deadlines. We will be moving forward with the plan to have everything ready by the end of next month...",
  },
  {
    id: "2",
    name: "Jane Smith",
    date: "2024-11-15T15:45:00Z",
    read: true,
    subject: "Research Update",
    text: "The latest findings from the research on market trends suggest that we need to pivot slightly in order to stay ahead of the competition. Detailed analysis will follow...",
  },
  {
    id: "3",
    name: "Alice Johnson",
    date: "2024-11-14T08:00:00Z",
    read: false,
    subject: "Code Review",
    text: "Please review the latest code update for the new feature. The changes have been tested, but we would appreciate additional feedback on performance optimizations and edge cases...",
  },
  {
    id: "4",
    name: "Bob Brown",
    date: "2024-11-13T20:15:00Z",
    read: true,
    subject: "Design Feedback",
    text: "Attached are the latest design revisions. Let me know if you have any thoughts or if we need to make further adjustments before presenting it to the client...",
  },
  {
    id: "5",
    name: "Alice Johnson",
    date: "2024-11-14T08:00:00Z",
    read: false,
    subject: "Code Review",
    text: "Please review the latest code update for the new feature. The changes have been tested, but we would appreciate additional feedback on performance optimizations and edge cases...",
  },
  {
    id: "6",
    name: "Bob Brown",
    date: "2024-11-13T20:15:00Z",
    read: true,
    subject: "Design Feedback",
    text: "Attached are the latest design revisions. Let me know if you have any thoughts or if we need to make further adjustments before presenting it to the client...",
  },
];

export function RecentActivityList() {
  return (
    <ScrollableContainer>
      {STUDY_ROOM_ITEMS.map((item, index) => (
        <RecentActivityItem key={index} item={item} />
      ))}
    </ScrollableContainer>
  );
}
