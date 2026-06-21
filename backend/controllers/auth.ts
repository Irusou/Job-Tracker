import type { Request, Response } from 'express';
import { authSchema } from '../schemas/auth.js';
import { ZodError } from 'zod';
import { AuthService } from '../services/auth.js';

export class AuthController {
	_authService: AuthService;

	constructor(authService: AuthService) {
		this._authService = authService;
	}

	signup = async (req: Request, res: Response) => {
		try {
			const body = authSchema.parse(req.body);

			const data = await this._authService.signup(body);

			if (!data) return res.status(500).send('failed to create user');

			return res
				.status(201)
				.json({ message: 'user signed in!', data: { id: data } });
		} catch (error) {
			if (error instanceof ZodError) {
				return res.status(400).json({ message: 'invalid request format' });
			}
			if (error instanceof Error) {
				return res
					.status(500)
					.json({ message: 'something went wrong', error: error.message });
			}
		}
	};

	login = async (req: Request, res: Response) => {
		try {
			const body = authSchema.parse(req.body);

			const token = await this._authService.login(body);

			if (!token) return res.status(500).send('failed to log in user');

			return res
				.status(201)
				.json({ message: 'user logged in!', data: { token } });
		} catch (error) {
			if (error instanceof ZodError) {
				return res.status(400).json({ message: 'invalid request format' });
			}
			if (error instanceof Error) {
				return res
					.status(500)
					.json({ message: 'something went wrong', error: error.message });
			}
		}
	};
}
