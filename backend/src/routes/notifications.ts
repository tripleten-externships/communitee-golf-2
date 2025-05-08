import { Router, RequestHandler } from 'express';
import { Notification } from '../models/notification';
import fs from 'fs';
import path from 'path';

const router = Router();
const dataPath = path.join(__dirname, '../data/notifications.json');

const loadNotifications = (): Notification[] => {
	if (!fs.existsSync(dataPath)) return [];
	const data = fs.readFileSync(dataPath, 'utf-8');
	return JSON.parse(data);
};

const saveNotifications = (notifications: Notification[]) => {
	fs.writeFileSync(dataPath, JSON.stringify(notifications, null, 2));
};

router.get('/', (req, res) => {
	const notifications = loadNotifications();
	res.json(notifications);
});

router.post('/', (req, res) => {
	const notifications = loadNotifications();
	const newNotification: Notification = {
		id:
			notifications.length > 0
				? notifications[notifications.length - 1].id + 1
				: 1,
		sender: req.body.sender,
		timeAgo: req.body.timeAgo,
		message: req.body.message,
		createdAt: new Date().toISOString(),
	};

	notifications.push(newNotification);
	saveNotifications(notifications);

	res.status(201).json(newNotification);
});

router.delete('/:id', ((req, res) => {
	const notifications = loadNotifications();
	const id = parseInt(req.params.id as string);
	const filtered = notifications.filter((n) => n.id !== id);

	if (notifications.length === filtered.length) {
		return res.status(404).json({ message: 'Notification not found' });
	}

	saveNotifications(filtered);
	res.status(204).send();
}) as RequestHandler);

export default router;
