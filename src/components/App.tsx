import React from 'react';
import { LoginForm } from './LoginForm';
import { ChatMessageHeader } from './ChatMessageHeader';
import { useState } from 'react';
import { User } from '../types';

export const App: React.FC = () => {
	const [isLoggedIn, setIsLoggedIn] = React.useState(false);
	const [user] = useState<User>({ name: '', avatar: '' });

	return (
		<div className='w-96 h-96 bg-white p-4'>
			{!isLoggedIn ? (
				<LoginForm onLogin={() => setIsLoggedIn(true)} />
			) : (
				<ChatMessageHeader user={user} />
			)}
		</div>
	);
};
