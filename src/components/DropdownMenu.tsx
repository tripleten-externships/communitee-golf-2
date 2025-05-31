import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react';

export const DropdownMenu: React.FC = () => {
	const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
	const [, setMessage] = useState<string>('');
	const [sentMessage, setSentMessage] = useState<string | null>(null);
	const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

	const handleSelect = (course: string) => {
		setSelectedCourse(course);
		setMessage('');

		setSentMessage('Course selected!');
		if (timer) {
			clearTimeout(timer);
		}
		const timeout = setTimeout(() => {
			setSentMessage(null);
		}, 2000);
		setTimer(timeout);
	};

	return (
		<div className='relative inline-block text-left w-full'>
			<Menu as='div' className='relative'>
				<div className='mb-2 font-semibold'>Location</div>
				<div className='relative inline-block'>
					<MenuButton className='inline-flex justify-center gap-x-1.5 rounded-md bg-white px-8 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
						{selectedCourse || 'Select a Golf Course'}
						<ChevronDownIcon
							aria-hidden='true'
							className='-mr-1 h-5 w-5 text-gray-400'
						/>
					</MenuButton>

					<MenuItems className='absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none'>
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
											className={`block w-full text-left px-4 py-2 text-sm ${
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
				</div>
			</Menu>

			{sentMessage && (
				<p className='mt-2 text-green-600 text-sm'>{sentMessage}</p>
			)}
		</div>
	);
};
