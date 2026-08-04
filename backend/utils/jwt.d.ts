import { type AuthUserOutput } from '../types/auth.ts';
export declare const generateToken: (data: any) => string;
export declare const hashPassword: (password: string, rounds?: number) => Promise<string>;
export declare const validateToken: (token: string) => AuthUserOutput;
//# sourceMappingURL=jwt.d.ts.map