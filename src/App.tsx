import React from 'react';
import { LoginForm } from './components/LoginForm.tsx';
import { DropdownMenu } from './components/DropdownMenu';
import MessageBox from './components/MessageBox';

import './components/LoginForm.css';

export const App: React.FC = () => {
	return (
		<div className="w-full min-h-screen flex justify-center items-center bg-gray-100 space-x-8 p-10">

			{/* <LoginForm onLogin={() => {}} />
			<DropdownMenu /> */}
			<MessageBox />
		</div>
	);
};

export default App;
