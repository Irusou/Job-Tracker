import { z } from 'zod';
export declare const AuthUser: z.ZodObject<{
    userId: z.ZodString;
    email: z.ZodString;
}, z.core.$strip>;
export type AuthUserOutput = z.infer<typeof AuthUser>;
//# sourceMappingURL=auth.d.ts.map