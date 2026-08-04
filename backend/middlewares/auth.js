import { validateToken } from '../utils/jwt.ts';
import jwt from 'jsonwebtoken';
export const jwtAuthMiddleware = (req, res, next) => {
    // get the token from the request object
    const token = req.cookies.token;
    // if no object or no token or invalid token return
    if (!token)
        return res.status(401).json({ message: 'Unauthorized' });
    try {
        const payload = validateToken(token);
        if (!payload)
            return res.status(401).json({ message: 'Unauthorized' });
        // else proceed
        req.user = payload;
        next();
    }
    catch (error) {
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
//# sourceMappingURL=auth.js.map