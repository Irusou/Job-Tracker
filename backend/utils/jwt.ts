import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import type { AuthUser } from '../types/auth.ts';

export const generateToken = (data: any) => {
	return jwt.sign(data, process.env.JWT_SECRET!, {
		expiresIn: '1h',
	});
};

export const hashPassword = async (password: string, rounds: number = 10) => {
	return await bcrypt.hash(password, rounds);
};

export const validateToken = (token: string): AuthUser => {
	const payload = jwt.verify(token, process.env.JWT_SECRET!);

	if (
		typeof payload !== 'object' ||
		payload === null ||
		!('userId' in payload) ||
		!('email' in payload)
	) {
		throw new Error('Invalid token payload');
	}

	return payload as AuthUser;
};
