import { useEffect, useState } from "react";

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

  const token = localStorage.getItem("token");
  const clientId = MOCK_CLIENT_ID;
  const userId = MOCK_USER_ID;

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

  const formatTimestamp = (sentAt: string, now = new Date()) => {
    const sentTime = new Date(sentAt);
    const diff = (now.getTime() - sentTime.getTime()) / 1000;

    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} mins ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;

    return sentTime.toLocaleTimeString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col h-full border border-gray-300 p-4 rounded-lg">
      <div className="flex-1 overflow-y-auto mb-4 flex flex-col">
        {messages.map((msg, index) => {
          const prev = messages[index - 1];
          const shouldShowTime =
            !prev ||
            new Date(prev.sentAt).getMinutes() !==
              new Date(msg.sentAt).getMinutes() ||
            prev.senderId !== msg.senderId;

          return (
            <div key={msg.id} className="flex flex-col items-start">
              {shouldShowTime && (
                <span
                  className={`text-[10px] text-gray-500 ${
                    msg.senderId === userId ? "self-end" : "self-start"
                  }`}
                >
                  {formatTimestamp(msg.sentAt)}
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
      </div>
    </div>
  );
};

export default MessageAreaStream;
