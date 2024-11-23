import { StudyRoomList } from "@/components/StudyRoomList";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { TypographyH2 } from "@/components/ui/typography-h2";

export default function StudyRoomsPage() {
  return (
    <div className="h-full space-y-4">
      <div className="flex justify-between items-center">
        <TypographyH2 text={"Manage your study rooms"} />
      </div>
      <div className="h-[85%] grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-5">
          <CardHeader>
            <CardTitle>Study Rooms</CardTitle>
            <CardDescription>
              You are currently enrolled in 20 active study rooms.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[90%]">
            <StudyRoomList />
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Invitations</CardTitle>
            <CardDescription>
              View incoming invitations to join new study rooms and collaborate.
            </CardDescription>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </div>
  );
}
