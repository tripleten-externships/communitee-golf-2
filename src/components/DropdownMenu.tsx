import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react';

export const DropdownMenu: React.FC = () => {
	const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
	const [message, setMessage] = useState<string>('');
	const [sentMessage, setSentMessage] = useState<string | null>(null);
	const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

	const handleSelect = (course: string) => {
		setSelectedCourse(course);
		setMessage('');
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!message.trim()) return;

		// Show sent message notification
		setSentMessage('Message sent!');
		setMessage('');

		// Clear any previous timer
		if (timer) {
			clearTimeout(timer);
		}

		const timeout = setTimeout(() => {
			setSentMessage(null);
		}, 2000);

		setTimer(timeout);
	};

	const handleClose = () => {
		setSelectedCourse(null);
		setMessage('');
		setSentMessage(null);
	};

	return (
		<div className='relative inline-block text-left w-full'>
			<Menu as='div'>
				<div>location</div>
				<div>
					<MenuButton className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-8 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
						{selectedCourse || 'Select a Golf Course'}
						<ChevronDownIcon
							aria-hidden='true'
							className='-mr-1 h-5 w-5 text-gray-400'
						/>
					</MenuButton>
				</div>

				<MenuItems className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none'>
					<div className='py-1'>
						{[
							'Golf Course One',
							'Golf Course Two',
							'Golf Course Three',
						].map((course) => (
							<MenuItem key={course}>
								{({ active }) => (
									<button
										onClick={() => handleSelect(course)}
										className={`w-full text-left px-4 py-3 text-sm ${
											active
												? 'bg-gray-100 text-gray-900'
												: 'text-gray-700'
										}`}
									>
										{course}
									</button>
								)}
							</MenuItem>
						))}
					</div>
				</MenuItems>
			</Menu>

			{selectedCourse && (
				<div className='mt-4 border p-4 rounded-md bg-gray-50 shadow-sm w-full relative'>
					<h3 className='text-sm font-medium text-gray-800 mb-2'>
						Send a message to {selectedCourse}
					</h3>

					<form onSubmit={handleSubmit}>
						<textarea
							className='w-full p-2 border rounded-md text-sm'
							placeholder='Type your message...'
							rows={4}
							value={message}
							onChange={(e) => setMessage(e.target.value)}
						></textarea>
						<button
							type='submit'
							className='mt-2 px-4 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700'
						>
							Send
						</button>
					</form>

					<button
						onClick={handleClose}
						className='absolute top-2 right-2 text-xs text-gray-500 hover:text-gray-800'
					>
						✕
					</button>

					{sentMessage && (
						<div className='absolute -bottom-10 left-0 bg-green-100 text-green-700 text-sm p-2 rounded shadow w-full'>
							{sentMessage}
						</div>
					)}
				</div>
			)}
		</div>
	);
};
