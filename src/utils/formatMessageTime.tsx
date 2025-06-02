import {
  format,
  isToday,
  isYesterday,
  differenceInMinutes,
  differenceInHours,
} from "date-fns";

export function formatMessageTime(isoString: string): string {
  const date = new Date(isoString);

  if (isToday(date)) {
    const minutes = differenceInMinutes(new Date(), date);
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m`;

    const hours = differenceInHours(new Date(), date);
    return `${hours}h`;
  }

  if (isYesterday(date)) return "Yesterday";

  return format(date, "MMM d");
}

export const formatDetailTime = (sentAt: string, now = new Date()) => {
  const sentTime = new Date(sentAt);
  const diff = (now.getTime() - sentTime.getTime()) / 1000;

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} mins ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;

  return sentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getMessageDateLabel = (dateStr: string): string => {
  const date = new Date(dateStr);
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  return format(date, "MMM d");
};
