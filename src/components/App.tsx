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
			)}
		</div>
	);
};
