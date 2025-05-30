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
