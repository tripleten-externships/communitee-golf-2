
import React from "react";
import closeIcon from "../assets/close.png";
import logo from "../assets/logo.png";

import React from 'react';
import closeIcon from '../assets/close.png';
import logo from '../assets/logo.png';


interface LoginFormProps {
	onLogin: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {

	const [username, setUsername] = React.useState("");
	const [password, setPassword] = React.useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onLogin();
	};

	return (
		<div className="w-screen h-screen flex justify-start items-start bg-[#f5f5f5] p-4">
			<div className="w-[336px] h-[595px] rounded-2xl border border-[#dedede] shadow-lg p-5 relative flex flex-col items-center">
				<button className="absolute top-5 right-5 w-6 h-6 flex items-center justify-center bg-transparent border-none">
					<img src={closeIcon} alt="Close" className="w-6 h-6" />
				</button>

				<div className="mt-1 mb-20 flex justify-center items-center">
					<img src={logo} alt="CommuniTee Logo" className="w-[152px] h-[20px]" />
				</div>

				<form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
					<input
						type="text"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="px-4 py-3 text-[#959494] border border-[#959494] rounded-xl text-base font-poppins"
					/>

					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="px-4 py-3 text-[#959494] border border-[#959494] rounded-xl text-base font-poppins"
					/>

					<button
						type="submit"
						className="bg-[#FF3130] text-white px-4 py-3 rounded-xl font-semibold text-base hover:bg-[#e12b2b] transition-colors"
					>
						Sign In
					</button>
				</form>

				<div className="mt-4 text-sm text-black text-center">
					<a href="#" className="font-medium hover:underline">
						Forgot Password?
					</a>
				</div>
			</div>
		</div>
	);

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
