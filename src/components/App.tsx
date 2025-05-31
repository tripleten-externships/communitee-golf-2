
import React from 'react';
import { LoginForm } from './LoginForm';
import { DropdownMenu } from './DropdownMenu'; // make sure this path is correct

export const App: React.FC = () => {
	const [isLoggedIn, setIsLoggedIn] = React.useState(false);

	return (
		<div className='w-96 h-96 bg-white p-4'>
			{!isLoggedIn ? (
				<LoginForm onLogin={() => setIsLoggedIn(true)} />
			) : (
				<>
					<DropdownMenu />
					<div></div>
				</>

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
