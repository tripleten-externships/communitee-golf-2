import { useEffect, useState, useRef } from "react";
import {
  formatDetailTime,
  getMessageDateLabel,
} from "../utils/formatMessageTime";

const MOCK_CLIENT_ID = "1";
const MOCK_USER_ID = "user-123";

type Message = {
  id: string;
  content: string;
  sentAt: string;
  senderId: string;
};

const MessageAreaStream = ({
  initialMessages,
}: {
  initialMessages?: Message[];
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const token = localStorage.getItem("token");
  const clientId = MOCK_CLIENT_ID;
  const userId = MOCK_USER_ID;
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fetch messages when the component mounts or clientId changes
  // Show initial messages if clientId is not available
  useEffect(() => {
    const loadMessages = async () => {
      if (!clientId || !token) {
        if (initialMessages) {
          setMessages(initialMessages);
        }
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:8080/message-stream/${clientId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch messages");
        const data = await res.json();
        setMessages(data.messages);
      } catch (err) {
        console.error("Error fetching messages:", err);
        if (initialMessages) {
          setMessages(initialMessages);
        }
      }
    };
    loadMessages();
  }, [clientId, token, initialMessages]);

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

  // Simulate typing indicator

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);
      }, 3000);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

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

        if (timeoutRef.current !== null) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          setIsTyping(false);
        }, 3000);
      }
    };

    return () => socket.close();
  }, [clientId, userId]);

  return (
    <div className="flex flex-col h-full border border-gray-300 p-4 rounded-lg">
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
                    msg.senderId === userId ? "self-end" : "self-start"
                  }`}
                >
                  {formatDetailTime(msg.sentAt)}
                </span>
              )}
              <div
                className={` text-sm mb-1 pt-[8px] pr-[12px] pb-[12px] pl-[12px] rounded inline-block max-w-[260px] break-words ${
                  msg.senderId === userId
                    ? "bg-red-100 self-end rounded-[16px] rounded-tr-none"
                    : "bg-gray-100 self-start rounded-[16px] rounded-tl-none"
                }`}
              >
                <span className="m-0 p-0">{msg.content}</span>
              </div>
            </div>
          );
        })}
        {isTyping && (
          <div className="flex flex-col items-start">
            <div className="bg-gray-200 rounded-[16px] rounded-tl-none px-3 py-2 max-w-[60px] flex gap-[4px]">
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
