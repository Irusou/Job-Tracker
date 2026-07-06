import { z } from 'zod';
import { ApplicationLocation, ApplicationStatus } from '@prisma/client';

export const applicationSchema = z.object({
	position: z.string().min(1),
	company: z.string().min(1),
	location: z.enum(ApplicationLocation),
	hours: z.string(),
	salary: z.number().positive(),
	appliedAt: z.coerce.date(),
	lastReply: z.coerce.date().nullable().optional(),
	status: z.enum(ApplicationStatus).default('APPLIED'),
	userId: z.uuid(),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;

export const updateApplicationSchema = applicationSchema
	.omit({
		position: true,
		company: true,
		hours: true,
		salary: true,
		appliedAt: true,
		userId: true,
	})
	.partial();

export type ApplicationUpdateInput = {
	lastReply?: Date | null;
	status?: ApplicationStatus;
};
