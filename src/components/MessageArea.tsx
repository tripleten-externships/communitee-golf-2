// import jacob from "../assets/jacob.jpg";

import { MessageStream } from "../type"; // adjust the path
import { messageStreams } from "../mock/messageStream";

import { useState } from "react";

export const MessageArea = () => {
  const [selectedStream, setSelectedStream] = useState<MessageStream | null>(
    null
  );

  if (selectedStream) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{selectedStream.clientName}</h2>

        <div className="mt-4 space-y-2">
          {selectedStream.messages.map((msg) => (
            <div key={msg.id} className="text-sm text-gray-700">
              <span className="font-semibold">
                {msg.senderId === "client"
                  ? selectedStream.clientName
                  : msg.senderId}
                :
              </span>{" "}
              {msg.content}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {messageStreams.map((stream: MessageStream) => (
        <div
          key={stream.id}
          onClick={() => setSelectedStream(stream)} // ✅ This makes it "clickable"
          className="flex items-center p-3 bg-gray-50 rounded-2xl relative cursor-pointer hover:bg-gray-100"
        >
          <div className="relative w-12 h-12 mr-4 shrink-0">
            <img
              src={stream.clientImage}
              alt={stream.clientName}
              className="w-full h-full rounded-full object-cover"
            />
            {stream.unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center font-custom">
                {stream.unreadCount}
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-gray-700 font-custom">
              {stream.clientName}
            </h2>
            <p className="text-sm text-gray-500 truncate w-full font-custom">
              {stream.lastMessage}
            </p>
          </div>

          <p className="text-xs text-gray-400 ml-2 whitespace-nowrap font-custom">
            {/* Insert time format here if needed */}
          </p>
        </div>
      ))}
    </div>
  );
};
