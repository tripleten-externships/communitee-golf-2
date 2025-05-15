import { MessageTabProps } from "../types/types";

export const MessageTab = ({
  unreadCount,
}: // setUnreadCount,
MessageTabProps) => {
  return (
    <div>
      <div className="p-[16px]">
        <h2 className="m-0 p-4 text-center ">Messages ({unreadCount})</h2>
      </div>
    </div>
  );
};
