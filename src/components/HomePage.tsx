import React, { useEffect, useState } from "react";
import { Header } from "./Header";
import { DropdownMenu } from "./DropdownMenu";
import { MessageTab } from "./MessageTab";
import { MessageArea } from "./MessageArea";
import { MessageStream } from "../types/type";

interface Location {
  id: string;
  name: string;
}

interface HomePageProps {
  token: string;
  onSelectLocation?: (location: Location) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  token,
  onSelectLocation,
}) => {
  const [locationId, setLocationId] = useState<string | null>(null);
  const [streams, setStreams] = useState<MessageStream[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!locationId || !token) return;
    console.log("Selected locationId:", locationId);

    setLoading(true);
    fetch(`http://localhost:8080/message-stream?locationId=${locationId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setStreams(data);
        console.log("Fetched streams:", data);
      })
      .catch((err) => console.error("Error fetching streams:", err))
      .finally(() => setLoading(false));
  }, [locationId, token]);

  const handleLocationSelect = (location: Location) => {
    setLocationId(location.id);
    onSelectLocation?.(location);
  };

  const handleStreamSelect = (stream: MessageStream) => {
    console.log("Selected stream:", stream);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <Header isLoginPage={false} />
      <div className="mt-4 w-full max-w-md">
        <DropdownMenu token={token} onSelectLocation={handleLocationSelect} />
      </div>
      <div className="mt-6 w-full max-w-md">
        <MessageTab
          unreadCount={streams.reduce((sum, s) => sum + s.unreadCount, 0)}
        />
      </div>
      <div className="mt-4 w-full max-w-md">
        {loading ? (
          <p className="text-center text-sm text-gray-500">
            Loading messages...
          </p>
        ) : (
          <MessageArea streams={streams} onSelectStream={handleStreamSelect} />
        )}
      </div>
    </div>
  );
};
