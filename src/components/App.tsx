import React, { useState } from 'react';
import { LoginForm } from './LoginForm';


export const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [unreadCount] = useState(0);

  return (
    <div className="w-96 h-96 bg-white p-4">
      {!isLoggedIn ? (
        <LoginForm onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <MessageTab unreadCount={unreadCount} />
      )}
    </div>
  );
};
