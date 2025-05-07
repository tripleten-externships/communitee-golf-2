import React from "react";
import { LoginForm } from "./LoginForm";
import { MessageArea } from "./MessageArea";

export const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <div className="w-96 h-96 bg-white p-4">
      {!isLoggedIn ? (
        <LoginForm onLogin={() => setIsLoggedIn(true)} />
      ) : (
        // <div>Chat interface will go here</div>
        <MessageArea></MessageArea>
      )}
    </div>
  );
};
