import { z } from 'zod';
export declare const createApplicationSchema: z.ZodObject<{
    position: z.ZodString;
    company: z.ZodString;
    location: z.ZodEnum<{
        REMOTE: "REMOTE";
        ONSITE: "ONSITE";
        HYBRID: "HYBRID";
    }>;
    hours: z.ZodString;
    salary: z.ZodNumber;
    appliedAt: z.ZodCoercedDate<unknown>;
    lastReply: z.ZodOptional<z.ZodNullable<z.ZodCoercedDate<unknown>>>;
    status: z.ZodDefault<z.ZodEnum<{
        APPLIED: "APPLIED";
        REJECTED: "REJECTED";
        GHOSTED: "GHOSTED";
        WAITFORREPLY: "WAITFORREPLY";
        NOANSWER: "NOANSWER";
        ACCEPTED: "ACCEPTED";
        INTERVIEWING: "INTERVIEWING";
    }>>;
}, z.core.$strip>;
export type CreateApplicationInput = z.infer<typeof createApplicationSchema>;
export declare const updateApplicationSchema: z.ZodObject<{
    lastReply: z.ZodOptional<z.ZodNullable<z.ZodCoercedDate<unknown>>>;
    status: z.ZodOptional<z.ZodEnum<{
        APPLIED: "APPLIED";
        REJECTED: "REJECTED";
        GHOSTED: "GHOSTED";
        WAITFORREPLY: "WAITFORREPLY";
        NOANSWER: "NOANSWER";
        ACCEPTED: "ACCEPTED";
        INTERVIEWING: "INTERVIEWING";
    }>>;
}, z.core.$strip>;
export type ApplicationUpdateInput = z.infer<typeof updateApplicationSchema>;
export type CreateApplicationServiceInput = CreateApplicationInput & {
    userId: string;
};
//# sourceMappingURL=application.d.ts.map