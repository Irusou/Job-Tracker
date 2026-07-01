import { z } from 'zod';
import { JobLocation, JobStatus } from '@prisma/client';

export const jobEntrySchema = z.object({
	position: z.string().min(1),
	company: z.string().min(1),
	location: z.enum(JobLocation),
	hours: z.string(),
	salary: z.number().positive(),
	appliedAt: z.coerce.date(),
	lastReply: z.coerce.date().nullable().optional(),
	status: z.enum(JobStatus).default('APPLIED'),
	userId: z.uuid(),
});

export type JobEntryInput = z.infer<typeof jobEntrySchema>;

export const updateJobEntrySchema = jobEntrySchema
	.omit({
		position: true,
		company: true,
		hours: true,
		salary: true,
		appliedAt: true,
		userId: true,
	})
	.partial();

export type JobEntryUpdateInput = {
	lastReply?: Date | null;
	status?: JobStatus;
};
