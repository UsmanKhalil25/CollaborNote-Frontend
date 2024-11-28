import { TypographyH2 } from "@/components/ui/typography-h2";

import { ListCard } from "@/components/ListCard";
import { StudyRoomItem } from "@/components/StudyRoomItem";
import { StudyRoomItemSkeleton } from "@/components/StudyRoomItemSkeleton";
import { InvitationItem } from "@/components/InvitationItem";
import { CreateStudyRoomDialog } from "@/components/CreateStudyRoomDialog";

import { IStudyRoomListingOut } from "@/types/study-room";
import { IInvitationListingOut } from "@/types/invitation";
import { QUERY } from "@/constants";
import { api } from "@/api";
import { ENDPOINTS } from "@/config/api-config";
import { convertToCamelCase } from "@/lib/utils";

export default function StudyRoomsPage() {
  const studyRoomQueryFn = async () => {
    const response = await api.get<
      Response<{ study_rooms: IStudyRoomListingOut[] }>
    >(ENDPOINTS.studyRooms.index);
    const data = response.data.data.study_rooms;
    return convertToCamelCase(data);
  };

  const invitationQueryFn = async () => {
    const response = await api.get<
      Response<{ invitations: IInvitationListingOut[] }>
    >(ENDPOINTS.invitations.index);
    const data = response.data.data.invitations;
    const camelCaseData = convertToCamelCase(data);
    return camelCaseData;
  };

  return (
    <div className="h-full space-y-4">
      <div className="flex justify-between items-center">
        <TypographyH2 text={"Manage your study rooms"} />
        <CreateStudyRoomDialog />
      </div>
      <div className="h-[85%] grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <ListCard<IStudyRoomListingOut>
          className="col-span-4"
          title="Study Rooms"
          description="You are currently enrolled in 20 active study rooms."
          queryKey={[QUERY.STUDY_ROOMS]}
          queryFn={studyRoomQueryFn}
          listItem={(studyRoom: IStudyRoomListingOut) => (
            <StudyRoomItem key={studyRoom.id} studyRoom={studyRoom} />
          )}
          skeleton={<StudyRoomItemSkeleton />}
          emptyMessage="You haven't joined any study rooms so far."
        />
        <ListCard<IInvitationListingOut>
          className="col-span-3"
          title="Invitations"
          description="View incoming invitations to join new study rooms and collaborate."
          queryKey={[QUERY.INVITATIONS]}
          queryFn={invitationQueryFn}
          listItem={(invitation: IInvitationListingOut) => (
            <InvitationItem key={invitation.id} invitation={invitation} />
          )}
          skeleton={<StudyRoomItemSkeleton />}
          emptyMessage="You have no invitations."
        />
      </div>
    </div>
  );
}
