import { z } from 'zod';
export declare const authSchema: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export type AuthPayload = z.infer<typeof authSchema>;
//# sourceMappingURL=auth.d.ts.map