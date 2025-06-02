import { useEffect, useRef } from "react";
import {
  formatDetailTime,
  getMessageDateLabel,
} from "../utils/formatMessageTime";

type Message = {
  id: string;
  content: string;
  sentAt: string;
  senderId: string;
};

interface MessageAreaStreamProps {
  messages: Message[];
  userId: string;
  isTyping: boolean;
  setIsTyping: (value: boolean) => void;
  clientId: string;
  token: string;
}

const MessageAreaStream: React.FC<MessageAreaStreamProps> = ({
  messages,
  userId,
  isTyping,
  setIsTyping,
  clientId,
  token,
}) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (
        data.type === "typing" &&
        data.clientId === clientId &&
        data.userId !== userId
      ) {
        setIsTyping(true);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => setIsTyping(false), 3000);
      }
    };

    return () => socket.close();
  }, [clientId, userId, setIsTyping]);

  // Mark as read after messages are loaded
  useEffect(() => {
    if (!clientId || !token) return;
    fetch(`http://localhost:8080/message-stream/${clientId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to mark as read");
      })
      .catch((err) => console.error("Read marking failed:", err));
  }, [clientId, token]);

  return (
    <div className="flex flex-col h-full ">
      <div className="flex-1 overflow-y-auto mb-4 flex flex-col">
        {messages.map((msg, index) => {
          const prev = messages[index - 1];
          const currentDateLabel = getMessageDateLabel(msg.sentAt);
          const prevDateLabel = prev ? getMessageDateLabel(prev.sentAt) : null;

          const showDateDivider = currentDateLabel !== prevDateLabel;

          const getMinuteLabel = (dateStr: string) =>
            new Date(dateStr).toISOString().slice(0, 16);

          const shouldShowTime =
            !prev ||
            getMinuteLabel(prev.sentAt) !== getMinuteLabel(msg.sentAt) ||
            prev.senderId !== msg.senderId;

          return (
            <div key={msg.id} className="flex flex-col items-start">
              {showDateDivider && (
                <div className="text-center text-xs text-gray-500 my-4 w-full">
                  — {currentDateLabel} —
                </div>
              )}
              {shouldShowTime && (
                <span
                  className={`text-[10px] text-gray-500 ${
                    msg.senderId === userId ? "self-start" : "self-end"
                  }`}
                >
                  {formatDetailTime(msg.sentAt)}
                </span>
              )}
              <div
                className={` text-sm mb-1 p-4 rounded inline-block max-w-[260px] break-words ${
                  msg.senderId === userId
                    ? "bg-gray-100 self-start rounded-[16px] rounded-tl-none"
                    : "bg-red-100 self-end rounded-[16px] rounded-tr-none"
                }`}
              >
                <span className="m-0 p-0">{msg.content}</span>
              </div>
            </div>
          );
        })}
        {isTyping && (
          <div className="flex flex-col items-start">
            <div className="bg-gray-200 rounded-[16px] rounded-tl-none pt-[8px] pr-[12px] pb-[12px] pl-[12px] max-w-[60px] flex gap-[4px]">
              <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageAreaStream;
