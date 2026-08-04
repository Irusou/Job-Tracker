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
export const updateApplicationSchema = z.object({
    lastReply: z.coerce.date().nullable().optional(),
    status: z.enum(ApplicationStatus).optional(),
});
//# sourceMappingURL=application.js.map