import type { Request, Response } from 'express';
import { registerSchema, loginSchema } from '../schemas/auth.js';
import { ZodError } from 'zod';
import { AuthService } from '../services/auth.js';

export class AuthController {
	static async signup(req: Request, res: Response) {
		try {
			const body = registerSchema.parse(req.body);
			console.log('signup', body);

			const userId = await AuthService.signup(body);

			if (!userId) {
				return res.status(500).send('failed to sign in user');
			}

			return res
				.status(201)
				.json({ message: 'user signed in!', data: { id: userId } });
		} catch (error) {
			if (error instanceof ZodError) {
				return res.status(400).json({ message: 'invalid request format' });
			}
		}
	}

	static async login(req: Request, res: Response) {
		try {
			const body = loginSchema.parse(req.body);
			await AuthService.signup(body);
			console.log('login', body);
		} catch (error) {
			if (error instanceof ZodError) {
				return res.status(400).json({ message: 'invalid request format' });
			}
		}
	}
}
