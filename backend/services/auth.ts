import type { Login, Register } from '../schemas/auth.ts';
import { prisma } from '../config/prisma.ts';
import bcrypt from 'bcrypt';
import { generateToken, hashPassword } from '../utils/jwt.ts';

export class AuthService {
	static async signup(body: Register): Promise<string | null> {
		// verify if a user with a given email exists
		const user = await prisma.user.findUnique({
			where: {
				email: body.email,
			},
		});

		// if it exists return
		if (user) return null;

		// if it doesnt, create it and return its generated id
		//! hash your passwords!!
		const hashedPassword = await hashPassword(body.password);

		const newUser = await prisma.user.create({
			data: {
				email: body.email,
				password: hashedPassword,
			},
		});

		return newUser.id;
	}
	static async login(body: Login): Promise<string | Error> {
		try {
			const user = await prisma.user.findUnique({
				where: {
					email: body.email,
				},
			});

			if (!user) throw new Error('user not found');

			const passwordMatch = await bcrypt.compare(body.password, user.password);

			if (!passwordMatch) {
				throw new Error('invalid credentials');
			}

			const token = generateToken({ userId: user.id, email: user.email });

			return token;
		} catch (error) {
			if (error instanceof Error) {
				return new Error(error.message);
			}

			return new Error('something went wrong', {
				cause: error,
			});
		}
	}
}
