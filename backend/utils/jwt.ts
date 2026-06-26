import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { AuthUser, type AuthUserOutput } from '../types/auth.ts';

export const generateToken = (data: any) => {
	return jwt.sign(data, process.env.JWT_SECRET!, {
		expiresIn: '1h',
	});
};

export const hashPassword = async (password: string, rounds: number = 10) => {
	return await bcrypt.hash(password, rounds);
};

export const validateToken = (token: string): AuthUserOutput => {
	const secret = process.env.JWT_SECRET;

	if (!secret) {
		throw new Error('JWT secret not configured');
	}

	const payload = jwt.verify(token, secret);

	if (typeof payload !== 'object' || payload === null) {
		throw new Error('Invalid token payload');
	}

	const result = AuthUser.safeParse(payload);

	if (!result.success) {
		throw new Error('Invalid token payload structure');
	}

	return result.data;
};
