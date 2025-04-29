import React from 'react';
import { LoginForm } from './components/LoginForm.tsx';
import { DropdownMenu } from './components/DropdownMenu';

import './components/LoginForm.css';

export const App: React.FC = () => {
	const [isLoggedIn, setIsLoggedIn] = React.useState(false);

	return (
		<div className='w-full min-h-screen flex justify-center items-center bg-gray-100'>
			{!isLoggedIn ? (
				<LoginForm onLogin={() => setIsLoggedIn(true)} />
			) : (
				<DropdownMenu />
			)}
		</div>
	);
};

export default App;
