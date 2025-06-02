import React, { useState } from "react";
import { LoginForm } from "./LoginForm";
import { HomePage } from "./HomePage";

export const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [token, setToken] = useState<string | null>(null);

  const handleLogin = (authToken: string) => {
    localStorage.setItem("token", authToken);
    setToken(authToken);
    setIsLoggedIn(true);
  };

  return (
    <div className="w-96 h-[595px] bg-white p-4">
      {!isLoggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        token && <HomePage token={token} />
      )}
    </div>
  );
};
