import { MessageStream } from "../type";
import { formatMessageTime } from "../utils/formatMessageTime";
import { useState } from "react";

type MessageAreaProps = {
  streams: MessageStream[];
  onSelectStream: (stream: MessageStream) => void;
};

export const MessageArea = ({ streams, onSelectStream }: MessageAreaProps) => {
  const [selectedStream, setSelectedStream] = useState<MessageStream | null>(
    null
  );

  if (selectedStream) {
    return <div className="p-4"></div>;
  }

  return (
    <div>
      {streams.map((stream: MessageStream) => (
        <div
          key={stream.id}
          onClick={() => {
            setSelectedStream(stream);
            onSelectStream(stream);
          }}
          className="flex items-center p-3 bg-gray-50 rounded-2xl relative mb-3 cursor-pointer transition-opacity duration-300 hover:bg-gray-200"
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
            {formatMessageTime(stream.lastMessageAt)}
          </p>
        </div>
      ))}
    </div>
  );
};
