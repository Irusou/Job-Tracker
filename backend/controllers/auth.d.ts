import type { Request, Response } from 'express';
import { AuthService } from '../services/auth.js';
export declare class AuthController {
    _authService: AuthService;
    constructor(authService: AuthService);
    signup: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    logout: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    me: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=auth.d.ts.map