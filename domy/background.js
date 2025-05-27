let intervalId = null;

console.log('✅ Background script loaded');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	console.log('📩 Received message:', request);

	if (request.action === 'startTeaReminder') {
		if (intervalId) clearInterval(intervalId);

		intervalId = setInterval(() => {
			const senderName = 'Tea Bot';
			const message = 'Time for a sip of tea!';
			const time = new Date().toLocaleTimeString();

			console.log('🔔 Triggering notification at', time);

			chrome.notifications.create({
				type: 'basic',
				iconUrl: 'tea_icon.png',
				title: senderName,
				message: `${message} (${time})`,
				priority: 1,
			});
		}, request.interval);
		sendResponse({ status: 'started' });
	}

	if (request.action === 'stopTeaReminder') {
		clearInterval(intervalId);
		intervalId = null;
		console.log('🛑 Reminder stopped');
		sendResponse({ status: 'stopped' });
	}
});
