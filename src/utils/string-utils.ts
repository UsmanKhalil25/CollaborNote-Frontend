import { formatDistanceToNow } from "date-fns";

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
