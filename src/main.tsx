import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { LoginForm } from './components/LoginForm';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<LoginForm onLogin={() => console.log('Logged in')} />
	</React.StrictMode>
);
