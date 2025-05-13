document.addEventListener('DOMContentLoaded', () => {
	function startReminder(ms) {
		chrome.runtime.sendMessage({
			action: 'startTeaReminder',
			interval: ms,
		});
		console.log('⏱️ Sent startReminder for', ms, 'ms');
	}

	function stopReminder() {
		chrome.runtime.sendMessage({ action: 'stopTeaReminder' });
		console.log('🛑 Sent stopReminder');
	}

	document
		.getElementById('btn5s')
		.addEventListener('click', () => startReminder(5000));
	document
		.getElementById('btn10s')
		.addEventListener('click', () => startReminder(10000));
	document
		.getElementById('btn15s')
		.addEventListener('click', () => startReminder(15000));
	document.getElementById('stopBtn').addEventListener('click', stopReminder);
});
