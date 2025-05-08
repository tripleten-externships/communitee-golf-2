import express from 'express';
import cors from 'cors';
import notificationRoutes from './routes/notifications';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use('/notifications', notificationRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
