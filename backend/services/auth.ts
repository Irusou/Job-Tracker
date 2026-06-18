import type { Login, Register } from '../schemas/auth.ts';
import { prisma } from '../config/prisma.ts';
import bcrypt from 'bcrypt';

export class AuthService {
	static async signup(body: Register): Promise<string | null> {
		// verify if a user with a given email exists
		const user = await prisma.user.findUnique({
			where: {
				email: body.email,
			},
		});

		// if it exists return
		if (user) {
			return null;
		}

		// if it doesnt, create it and return its generated id
		//! hash your passwords!!

		const hashedPassword = await bcrypt.hash(body.password, 10);

		const newUser = await prisma.user.create({
			data: {
				email: body.email,
				password: hashedPassword,
			},
		});

		return newUser.id;
	}
	static async login(body: Login) {}
}
