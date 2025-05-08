import React from 'react';
import { Notification } from './Notification';

export const App: React.FC = () => {
	const notifications = [
		{
			sender: 'Jane Doe',
			timeAgo: '10m ago',
			message:
				'Are there any courses that allow us to play without a caddy?',
		},
	];

	return (
		<div className='min-h-screen bg-gray-50 flex flex-col items-center justify-start py-20 space-y-6'>
			<h1 className='text-2xl font-bold'>Notifications</h1>

			{notifications.length === 0 ? (
				<p>No notifications yet.</p>
			) : (
				notifications.map((notification, index) => (
					<Notification
						key={index}
						sender={notification.sender}
						timeAgo={notification.timeAgo}
						message={notification.message}
					/>
				))
			)}
		</div>
	);
};

export default App;
