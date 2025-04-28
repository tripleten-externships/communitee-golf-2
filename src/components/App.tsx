import React from 'react';
import { LoginForm } from './LoginForm';
import './LoginForm.css';

export const App: React.FC = () => {
	const [isLoggedIn, setIsLoggedIn] = React.useState(false);

	return (
		<div className='w-96 h-96 bg-white p-4'>
			{!isLoggedIn ? (
				<LoginForm onLogin={() => setIsLoggedIn(true)} />
			) : (
				<div className='text-center'>
					<h1 className='text-2xl font-bold'>
						Welcome to the Chat App!
					</h1>
					<p className='mt-4'>You are now logged in.</p>
				</div>
			)}
		</div>
	);
};
