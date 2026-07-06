import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { authRouter, applicationsRouter } from './routes/index.ts';

dotenv.config();

const app = express();

app.use(
	cors({
		origin: 'http://localhost:5173',
		credentials: true,
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
	}),
);
app.use(cookieParser());
app.use(express.json());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/applications', applicationsRouter);

app.get('/', (_, res) => {
	res.json({ message: 'CareerFlow API running' });
});

app.listen(process.env.PORT || 3000, () => {
	console.log('Server running');
});
