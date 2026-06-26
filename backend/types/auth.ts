import { z } from 'zod';

export const AuthUser = z.object({
	userId: z.string(),
	email: z.string(),
});

export type AuthUserOutput = z.infer<typeof AuthUser>;
