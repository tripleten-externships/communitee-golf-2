import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react';

export const DropdownMenu: React.FC = () => {
	const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

	const handleSelect = (course: string) => {
		setSelectedCourse(course);
	};

	return (
		<div className='w-[336px] h-[595px] bg-white rounded-md pt-5 pb-5 px-4 relative inline-block text-left'>
			<Menu as='div' className="relative w-full">
				<div className='text-sm text-gray-600 mt-8 mb-1'>location</div>
				<div>
					<MenuButton className='inline-flex w-full justify-between rounded-[12px] bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 outline outline-1 outline-black '>
						{selectedCourse || 'Gilory Golf Course'}
						<ChevronDownIcon
							aria-hidden='true'
							className='-mr-1 h-5 w-5 text-gray-400'
						/>
					</MenuButton>
				</div>

				<MenuItems className='absolute right-0 z-10 mt-2 w-full origin-top-right rounded-[12px] bg-white shadow-lg ring-1 ring-black/5 focus:outline-none'>
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

			{/* Show form after selection */}
			{selectedCourse && (
				<div className='mt-4 border p-4 rounded-md bg-gray-50 shadow-sm w-full'>
					<h3 className='text-sm font-medium text-gray-800 mb-2'>
						Send a message to {selectedCourse}
					</h3>
					<form>
						<textarea
							className='w-full p-2 border rounded-md text-sm'
							placeholder='Type your message...'
							rows={4}
						></textarea>
						<button
							type='submit'
							className='mt-2 px-4 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700'
						>
							Send
						</button>
					</form>
				</div>
			)}
		</div>
	);
};
