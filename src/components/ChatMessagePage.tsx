import React from "react";
import { Header } from "./Header";
import { ChatMessageHeader } from "./ChatMessageHeader";
import MessageAreaStream from "./MessageAreaStream";
import MessageBox from "./MessageBox";
import { User } from "../types";

interface ChatMessagePageProps {
  user: User;
}

export const ChatMessagePage: React.FC<ChatMessagePageProps> = ({ user }) => {
  return (
    <div className="w-[336px] h-[595px] rounded-2xl border border-[#dedede] shadow-lg p-5 flex flex-col justify-between bg-white">
      <Header isLoginPage={false} />
      <div className="flex-1 overflow-hidden mt-4 mb-3 flex flex-col">
        <ChatMessageHeader user={user} />
        <div className="flex-1 overflow-hidden mt-4">
          <MessageAreaStream />
        </div>
      </div>
      <div className="mt-2">
        <MessageBox />
      </div>
    </div>
  );
};
