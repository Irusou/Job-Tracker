import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const generateToken = (data: any) => {
	return jwt.sign(data, process.env.JWT_SECRET!, {
		expiresIn: '1h',
	});
};

export const hashPassword = async (password: string, rounds: number = 10) => {
	return await bcrypt.hash(password, rounds);
};
