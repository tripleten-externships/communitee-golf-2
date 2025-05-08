import React from 'react';

type NotificationProps = {
	sender: string;
	timeAgo: string;
	message: string;
};

export const Notification: React.FC<NotificationProps> = ({
	sender,
	timeAgo,
	message,
}) => {
	return (
		<div className='w-[345px] p-[12px] flex items-start gap-[8px] rounded-[16px] border border-black/10 bg-[#F5F8FA]/80 backdrop-blur-[5px] shadow-[0px_4px_8px_rgba(0,0,0,0.1)]'>
			{/* Red icon */}
			<div className='w-[38px] h-[38px] bg-[#FF3131] rounded-[10px] flex items-center justify-center shadow-sm'>
				<img
					src='/icons/Layer1.png'
					alt='icon'
					className='w-[16px] h-[28px] object-contain'
				/>
			</div>

			{/* Content */}
			<div className='flex flex-col flex-1 gap-[6px]'>
				<div className='flex justify-between items-center'>
					<span className='font-semibold text-black text-[14px] leading-[20px]'>
						New message from {sender}
					</span>
					<span className='text-gray-400 text-[12px]'>{timeAgo}</span>
				</div>

				<p className='text-[#232324] text-[14px] leading-tight'>
					{message}
				</p>
			</div>
		</div>
	);
};

export default Notification;
