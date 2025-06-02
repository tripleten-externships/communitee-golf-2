import { MessageTabProps } from "../types/types";

export const MessageTab = ({ unreadCount }: MessageTabProps) => {
  return (
    <div>
      <h2 className="m-0 text-center ">Messages ({unreadCount})</h2>
      <div className="mt-2 border-t border-gray-300 w-full" />
    </div>
  );
};
