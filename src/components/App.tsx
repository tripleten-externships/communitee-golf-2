import React from 'react';

import MessageBox from '../components/MessageBox';

export const App: React.FC = () => {
	return (
		<div className='w-full min-h-screen flex justify-center items-center bg-gray-100 space-x-8 p-10'>
			<MessageBox />
		</div>
	);
};

export default App;
