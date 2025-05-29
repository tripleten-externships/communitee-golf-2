import React from "react";
import { LoginForm } from "./LoginForm";
import { MessageArea } from "./MessageArea";
import { messageStreams } from "../mock/messageStream";

export const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <div className="w-96 h-96 bg-white p-4">
      {!isLoggedIn ? (
        <LoginForm onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <MessageArea
          streams={messageStreams}
          onSelectStream={(stream) => {
            console.log(stream);
          }}
        />
      )}
    </div>
  );
};
