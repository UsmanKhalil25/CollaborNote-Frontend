import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow } from "date-fns";
import { Participant, ParticipantOut } from "@/types/participant";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeAgo(isoTimestamp: string) {
  const timestamp = new Date(isoTimestamp);
  return formatDistanceToNow(timestamp, { addSuffix: true });
}

export const getUserInitials = (
  firstName?: string,
  lastName?: string
): string => {
  const firstInitial = firstName?.[0]?.toUpperCase() || "";
  const lastInitial = lastName?.[0]?.toUpperCase() || "";
  return `${firstInitial}${lastInitial}`;
};

export const isUserRoomOwner = (
  userId?: string,
  participants?: Array<Participant | ParticipantOut>
): boolean => {
  return (
    !!userId &&
    !!participants &&
    participants?.some(
      (participant) => participant.userId === userId && participant.isOwner
    )
  );
};
