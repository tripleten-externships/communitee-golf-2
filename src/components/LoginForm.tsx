import React from 'react';
import './LoginForm.css'; 
import CrossIcon from '../assets/Cross.jpg';
import LogoIcon from '../assets/logo_new 1.png';

interface LoginFormProps {
	onLogin: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onLogin();
	};

	return (
		<div className='login-page'>
			<div className='login-card'>
				{/* project (x) button */}
				<button className='close-button'>
					<img src={CrossIcon} alt='Close' className='close-icon' />
				</button>

				{/* project CommuniTee Logo */}
				<div className='logo-wrapper'>
					<img
						src={LogoIcon}
						alt='CommuniTee Logo'
						className='logo-image'
					/>
				</div>

				{/* project form Section */}
				<form onSubmit={handleSubmit} className='login-form'>
					<input
						type='text'
						id='username'
						value={username}
						placeholder='Username'
						onChange={(e) => setUsername(e.target.value)}
						className='login-username'
					/>
					<input
						type='password'
						id='password'
						value={password}
						placeholder='Password'
						onChange={(e) => setPassword(e.target.value)}
						className='login-password'
					/>
					<button type='submit' className='login-button'>
						Sign In
					</button>
					<div className='forgot-password'>
						<a href='#'>Forgot Password?</a>
					</div>
				</form>
			</div>
		</div>
	);
};
