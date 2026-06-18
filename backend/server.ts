import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRouter } from './routes/auth.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1/auth', authRouter);

app.get('/', (_, res) => {
	res.json({ message: 'CareerFlow API running' });
});

app.listen(process.env.PORT || 3000, () => {
	console.log('Server running');
});
