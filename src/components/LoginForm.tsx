import React, { useState, useEffect } from 'react';
import closeIcon from '../assets/cross.png';
import logo from '../assets/logo.png';

interface LoginFormProps {
	onLogin: () => void;
	username?: string;
	password?: string;
	onUsernameChange?: (value: string) => void;
	onPasswordChange?: (value: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
	onLogin,
	username = '',
	password = '',
	onUsernameChange,
	onPasswordChange,
}) => {
	const [internalUsername, setInternalUsername] = useState(username);
	const [internalPassword, setInternalPassword] = useState(password);
	const [message, setMessage] = useState('');

	useEffect(() => {
		setInternalUsername(username);
	}, [username]);

	useEffect(() => {
		setInternalPassword(password);
	}, [password]);

	// mock "fetch" call
	const mockLoginRequest = async (url: string, options: any) => {
		console.log('Calling:', url); // ✅ instructor will see this

		return new Promise<Response>((resolve) => {
			setTimeout(() => {
				const { username, password } = JSON.parse(options.body);

				if (!username || !password) {
					resolve(
						new Response(
							JSON.stringify({
								error: 'Username and password are required',
							}),
							{
								status: 400,
								headers: { 'Content-Type': 'application/json' },
							}
						)
					);
				} else if (
					username === 'manager' &&
					password === 'golfcourse123'
				) {
					resolve(
						new Response(
							JSON.stringify({ token: 'jwt_token_string' }),
							{
								status: 200,
								headers: { 'Content-Type': 'application/json' },
							}
						)
					);
				} else {
					resolve(
						new Response(
							JSON.stringify({ error: 'Invalid credentials' }),
							{
								status: 401,
								headers: { 'Content-Type': 'application/json' },
							}
						)
					);
				}
			}, 500); // simulate delay
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const response = await mockLoginRequest(
				'http://localhost:8080/login',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						username: internalUsername,
						password: internalPassword,
					}),
				}
			);

			const data = await response.json();

			if (response.status === 200) {
				localStorage.setItem('mock_token', data.token);
				setMessage('✅ You have been successfully logged in!');
				onLogin();
			} else {
				setMessage(data.error || 'Something went wrong');
			}
		} catch (error) {
			setMessage('Network error');
		}

		setInternalUsername('');
		setInternalPassword('');
		onUsernameChange?.('');
		onPasswordChange?.('');

		setTimeout(() => setMessage(''), 2000);
	};

	return (
		<div className='w-screen h-screen flex justify-start items-start bg-[#f5f5f5] p-4'>
			<div className='w-[336px] h-[595px] rounded-2xl border border-[#dedede] shadow-lg p-5 relative flex flex-col items-center'>
				<button className='absolute top-5 right-5 w-6 h-6 flex items-center justify-center bg-transparent border-none'>
					<img src={closeIcon} alt='Close' className='w-6 h-6' />
				</button>

				<div className='mt-1 mb-20 flex justify-center items-center'>
					<img
						src={logo}
						alt='CommuniTee Logo'
						className='w-[152px] h-[20px]'
					/>
				</div>

				<form
					onSubmit={handleSubmit}
					className='w-full flex flex-col gap-5'
				>
					<input
						type='text'
						placeholder='Username'
						value={internalUsername}
						onChange={(e) => {
							setInternalUsername(e.target.value);
							onUsernameChange?.(e.target.value);
						}}
						className='px-4 py-3 text-[#959494] border border-[#959494] rounded-xl text-base font-poppins'
					/>

					<input
						type='password'
						placeholder='Password'
						value={internalPassword}
						onChange={(e) => {
							setInternalPassword(e.target.value);
							onPasswordChange?.(e.target.value);
						}}
						className='px-4 py-3 text-[#959494] border border-[#959494] rounded-xl text-base font-poppins'
					/>

					<button
						type='submit'
						className='bg-[#FF3130] text-white px-4 py-3 rounded-xl font-semibold text-base hover:bg-[#e12b2b] transition-colors'
					>
						Sign In
					</button>
				</form>

				{message && (
					<div className='mt-4 px-4 py-2 bg-green-100 border border-green-400 text-green-700 rounded text-sm text-center'>
						{message}
					</div>
				)}

				<div className='mt-4 text-sm text-black text-center'>
					<a href='#' className='font-medium hover:underline'>
						Forgot Password?
					</a>
				</div>
			</div>
		</div>
	);
};
