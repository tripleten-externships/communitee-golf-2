import { useState } from 'react';

export default function MessageBox() {
	const [message, setMessage] = useState('');
	const [sentMessage, setSentMessage] = useState<string | null>(null);
	const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

	const handleSend = () => {
		if (message.trim()) {
			setSentMessage('Message sent!');
			setMessage('');

			if (timer) {
				clearTimeout(timer);
			}
			const timeout = setTimeout(() => {
				setSentMessage(null);
			}, 2000);

			setTimer(timeout);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMessage(e.target.value);

		if (sentMessage) {
			setSentMessage(null);

			if (timer) {
				clearTimeout(timer);
				setTimer(null);
			}
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && message.trim()) {
			handleSend();
		}
	};

	return (
		<div className='space-y-2 relative w-fit'>
			<label
				htmlFor='message'
				className='block text-sm font-medium text-gray-900 mb-2'
			>
				Message
			</label>
			<div className='flex items-center justify-between w-[304px] h-[42px] rounded-full border border-gray-400 px-4 bg-white'>
				<input
					id='message'
					name='message'
					type='text'
					placeholder='Write a message...'
					className='flex-grow outline-none text-gray-900 placeholder-gray-400 text-sm'
					value={message}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
				/>
				<button
					onClick={handleSend}
					disabled={!message.trim()}
					type='button'
					className='ml-3 disabled:opacity-50 disabled:cursor-not-allowed'
				>
					<img src='send.png' alt='Send' className='w-6 h-6' />
				</button>
			</div>

			{sentMessage && (
				<div className='absolute -bottom-10 left-0 w-full bg-green-100 text-green-700 text-sm p-2 rounded shadow'>
					{sentMessage}
				</div>
			)}
		</div>
	);
}
