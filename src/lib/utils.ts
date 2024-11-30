import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow } from "date-fns";
import { Participant, ParticipantOut } from "@/types/participant";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertCamelCaseToSnakeCase = (obj: Record<string, any>) => {
  const newObj: Record<string, any> = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const snakeKey = key.replace(
        /[A-Z]/g,
        (match) => `_${match.toLowerCase()}`
      );
      newObj[snakeKey] = obj[key];
    }
  }
  return newObj;
};

const toCamelCase = (str: string) => {
  return str.replace(/_([a-z])/g, (_, group1) => group1.toUpperCase());
};

export const convertSnakeCaseToCamelCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((item) => convertSnakeCaseToCamelCase(item));
  } else if (obj !== null && typeof obj === "object") {
    const result: Record<string, any> = {};
    for (const key in obj) {
      const camelKey = toCamelCase(key);
      result[camelKey] = convertSnakeCaseToCamelCase(obj[key]);
    }
    return result;
  }
  return obj;
};

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
