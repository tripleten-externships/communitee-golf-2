import React from "react";
import { Header } from "./Header";
import { ChatMessageHeader } from "./ChatMessageHeader";
import MessageAreaStream from "./MessageAreaStream";
import MessageBox from "./MessageBox";
import { User, Message } from "../types/type";
import { useEffect, useState } from "react";

interface ChatMessagePageProps {
  user: User;
  streamId: string;
  onBack?: () => void;
}

export const ChatMessagePage: React.FC<ChatMessagePageProps> = ({
  user,
  streamId,
  onBack,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isTyping, setIsTyping] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch(
        `http://localhost:8080/message-stream/${streamId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setMessages(data.messages);
    };
    fetchMessages();
  }, [streamId, token]);

  return (
    <div className="w-[336px] h-[595px] rounded-2xl border border-[#dedede] shadow-lg p-5 flex flex-col justify-between bg-white">
      <Header isLoginPage={false} onBack={onBack} />
      <div className="flex-1 overflow-hidden mt-4 mb-3 flex flex-col">
        <ChatMessageHeader user={user} onBack={onBack} />
        <div className="flex-1 overflow-hidden mt-4">
          <MessageAreaStream
            messages={messages}
            userId={user.id}
            //hard code for showing anime, change it back to "isTyping" for normal
            isTyping={true}
            setIsTyping={setIsTyping}
            clientId={streamId}
            token={token ?? ""}
          />
        </div>
      </div>
      <div className="mt-2">
        <MessageBox
          streamId={streamId}
          token={token ?? ""}
          onMessageSent={(newMessage: Message) =>
            setMessages((prev) => [...prev, newMessage])
          }
        />
      </div>
    </div>
  );
};
