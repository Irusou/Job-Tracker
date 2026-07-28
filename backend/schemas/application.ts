import { z } from 'zod';
import { ApplicationLocation, ApplicationStatus } from '@prisma/client';

export const createApplicationSchema = z.object({
	position: z.string().min(1),
	company: z.string().min(1),
	location: z.enum(ApplicationLocation),
	hours: z.string(),
	salary: z.number().positive(),
	appliedAt: z.coerce.date(),
	lastReply: z.coerce.date().nullable().optional(),
	status: z.enum(ApplicationStatus).default('APPLIED'),
});

export type CreateApplicationInput = z.infer<typeof createApplicationSchema>;

export const updateApplicationSchema = z.object({
	lastReply: z.coerce.date().nullable().optional(),
	status: z.enum(ApplicationStatus).optional(),
});

export type ApplicationUpdateInput = z.infer<typeof updateApplicationSchema>;

export type CreateApplicationServiceInput = CreateApplicationInput & {
	userId: string;
};
