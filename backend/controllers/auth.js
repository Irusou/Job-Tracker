import { authSchema } from '../schemas/auth.js';
import { ZodError } from 'zod';
import { AuthService } from '../services/auth.js';
export class AuthController {
    _authService;
    constructor(authService) {
        this._authService = authService;
    }
    signup = async (req, res) => {
        try {
            const body = authSchema.parse(req.body);
            const data = await this._authService.signup(body);
            if (!data)
                return res.status(500).send('failed to create user');
            return res
                .status(201)
                .json({ message: 'user signed in!', data: { id: data } });
        }
        catch (error) {
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
    login = async (req, res) => {
        try {
            const body = authSchema.parse(req.body);
            const { token, user } = await this._authService.login(body);
            if (!token)
                return res.status(500).send('failed to log in user');
            return res
                .cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 1000 * 60 * 60 * 24, // 1 day
            })
                .status(200)
                .json({
                message: 'user logged in!',
                user,
            });
        }
        catch (error) {
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
    logout = async (_req, res) => {
        res.clearCookie('token');
        return res.json({ message: 'Logged out' });
    };
    me = async (req, res) => {
        const { user } = req;
        return res.json(user);
    };
}
//# sourceMappingURL=auth.js.map