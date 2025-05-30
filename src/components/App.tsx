import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { MessageTab } from './MessageTab';

export const App: React.FC = () => {
	const [isLoggedIn, setIsLoggedIn] = React.useState(false);
	const [unreadCount] = useState(0);

	return (
		<div className='w-96 h-[595px] bg-white p-4'>
			{!isLoggedIn ? (
				<LoginForm onLogin={() => setIsLoggedIn(true)} />
			) : (
				<MessageTab unreadCount={unreadCount} />
			)}
		</div>
	);
};
