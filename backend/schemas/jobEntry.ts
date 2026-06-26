import { z } from 'zod';
import { JobStatus } from '../prisma/generated/prisma/index.js';

export const jobEntrySchema = z.object({
	position: z.string().min(1),
	company: z.string().min(1),
	hours: z.string(),
	salary: z.number().positive(),
	appliedAt: z.coerce.date(),
	lastReply: z.coerce.date().nullable().optional(),
	status: z.enum(JobStatus),
	userId: z.uuid(),
});

export type JobEntryInput = z.infer<typeof jobEntrySchema>;
