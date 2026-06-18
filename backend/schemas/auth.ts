import { z } from 'zod';

export const registerSchema = z.object({
	email: z.email(),
	password: z.string().min(8),
});

type Register = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
	email: z.email(),
	password: z.string().min(8),
});

type Login = z.infer<typeof loginSchema>;

export type { Register, Login };
