import type { Request, Response } from 'express';
import { registerSchema, loginSchema } from '../schemas/auth.js';

export class AuthController {
	static async signup(req: Request, res: Response) {
		const body = registerSchema.parse(req.body);

		console.log('signup', body);
	}

	static async login(req: Request, res: Response) {
		const body = loginSchema.parse(req.body);
		console.log('login', body);
	}
}
