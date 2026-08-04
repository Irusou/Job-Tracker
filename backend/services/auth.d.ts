import type { AuthPayload } from '../schemas/auth.ts';
import type { AuthRepository } from '../repository/auth.ts';
export declare class AuthService {
    _authRepository: AuthRepository;
    constructor(authRepository: AuthRepository);
    signup(body: AuthPayload): Promise<string>;
    login(body: AuthPayload): Promise<{
        token: string;
        user: {
            id: string;
            email: string;
        };
    }>;
}
//# sourceMappingURL=auth.d.ts.map