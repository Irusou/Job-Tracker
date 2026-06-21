import type { Request, Response, NextFunction } from 'express';
import { validateToken } from '../utils/jwt.ts';
import jwt from 'jsonwebtoken';

export const jwtAuthMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	// get the token from the request object
	const authorizationToken = req.headers['authorization'];

	// if no object or no token or invalid token return
	if (!authorizationToken)
		return res.status(401).json({ message: 'Unauthorized access' });

	try {
		const payload = validateToken(authorizationToken);

		if (!payload)
			return res.status(401).json({ message: 'Unauthorized access' });

		// else proceed
		req.user = payload;
		next();
	} catch (error) {
		if (error instanceof jwt.JsonWebTokenError) {
			return res
				.status(401)
				.json({ error: error.name, message: error.message });
		}

		return res.status(500).json({
			message: 'Internal server error',
		});
	}
};
