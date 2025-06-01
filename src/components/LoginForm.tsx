
import React, { useState, useEffect } from 'react';
import closeIcon from '../assets/cross.png';

import React from 'react';
import closeIcon from '../assets/close.png';

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
	const [successMessage, setSuccessMessage] = useState('');

	useEffect(() => {
		setInternalUsername(username);
	}, [username]);

	useEffect(() => {
		setInternalPassword(password);
	}, [password]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!internalUsername || !internalPassword) {
			setSuccessMessage(' Username and password are required');
		} else if (
			internalUsername !== 'manager' ||
			internalPassword !== 'golfcourse123'
		) {
			setSuccessMessage('Invalid credentials');
		} else {
			setSuccessMessage('✅ You have been successfully logged in!');
			localStorage.setItem('mock_token', 'jwt_token_string');
			onLogin();
		}

		setInternalUsername('');
		setInternalPassword('');
		onUsernameChange?.('');
		onPasswordChange?.('');

		setTimeout(() => setSuccessMessage(''), 2000);
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

				{successMessage && (
					<div className='mt-4 px-4 py-2 bg-green-100 border border-green-400 text-green-700 rounded text-sm text-center'>
						{successMessage}
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

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className='w-screen h-screen flex justify-start items-start bg-[#f5f5f5] p-4'>
      <div className='w-[336px] h-[595px] rounded-2xl border border-[#dedede] shadow-lg p-5 relative flex flex-col items-center'>
        <button className='absolute top-5 right-5 w-6 h-6 flex items-center justify-center bg-transparent border-none'>
          <img src={closeIcon} alt='Close' className='w-6 h-6' />
        </button>

        <div className='mt-1 mb-20 flex justify-center items-center'>
          <img src={logo} alt='CommuniTee Logo' className='w-[152px] h-[20px]' />
        </div>

        <form onSubmit={handleSubmit} className='w-full flex flex-col gap-5'>
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='px-4 py-3 text-[#959494] border border-[#959494] rounded-xl text-base font-poppins'
          />

          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='px-4 py-3 text-[#959494] border border-[#959494] rounded-xl text-base font-poppins'
          />

          <button
            type='submit'
            className='bg-[#FF3130] text-white px-4 py-3 rounded-xl font-semibold text-base hover:bg-[#e12b2b] transition-colors'
          >
            Sign In
          </button>
        </form>

        <div className='mt-4 text-sm text-black text-center'>
          <a href='#' className='font-medium hover:underline'>
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );

};
