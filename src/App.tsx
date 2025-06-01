import React, { useState } from 'react';
import { LoginForm } from './components/LoginForm';

export const App: React.FC = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	return (
		<div className='w-96 h-auto bg-white p-4'>
			{!isLoggedIn ? (
				<LoginForm onLogin={() => setIsLoggedIn(true)} />
			) : (
				<div className='text-center text-lg font-semibold'>
					Logged in successfully — token saved in localStorage
				</div>
			)}
		</div>
	);
};

export default App;
