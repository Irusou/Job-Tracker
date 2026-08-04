import { ApplicationLocation, ApplicationStatus, type PrismaClient } from '@prisma/client';
import type { CreateApplicationInput, ApplicationUpdateInput, CreateApplicationServiceInput } from '../schemas/application.ts';
export type UserJob = {
    position: string;
    company: string;
    location: ApplicationLocation;
    hours: string;
    salary: number;
    appliedAt: Date;
    lastReply: Date | null;
    status: ApplicationStatus;
    userId: string;
    id: string;
};
export interface ApplicationsRepository {
    findAllByUser(userId: string): Promise<UserJob[]>;
    findAllByUserAndApplicationId(userId: string, applicationId: string): Promise<UserJob | null>;
    save(jobPost: CreateApplicationInput): Promise<String | null>;
    update(id: string, application: ApplicationUpdateInput): Promise<UserJob | null>;
    delete(id: string): Promise<UserJob | null>;
}
export declare class PostgresApplicationsRepository implements ApplicationsRepository {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    findAllByUser(userId: string): Promise<{
        userId: string;
        hours: string;
        id: string;
        position: string;
        company: string;
        location: import("@prisma/client").$Enums.ApplicationLocation;
        salary: number;
        appliedAt: Date;
        lastReply: Date | null;
        status: import("@prisma/client").$Enums.ApplicationStatus;
    }[]>;
    findAllByUserAndApplicationId(userId: string, applicationId: string): Promise<{
        userId: string;
        hours: string;
        id: string;
        position: string;
        company: string;
        location: import("@prisma/client").$Enums.ApplicationLocation;
        salary: number;
        appliedAt: Date;
        lastReply: Date | null;
        status: import("@prisma/client").$Enums.ApplicationStatus;
    } | null>;
    save(application: CreateApplicationServiceInput): Promise<string>;
    update(id: string, application: ApplicationUpdateInput): Promise<{
        userId: string;
        hours: string;
        id: string;
        position: string;
        company: string;
        location: import("@prisma/client").$Enums.ApplicationLocation;
        salary: number;
        appliedAt: Date;
        lastReply: Date | null;
        status: import("@prisma/client").$Enums.ApplicationStatus;
    }>;
    delete(id: string): Promise<{
        userId: string;
        hours: string;
        id: string;
        position: string;
        company: string;
        location: import("@prisma/client").$Enums.ApplicationLocation;
        salary: number;
        appliedAt: Date;
        lastReply: Date | null;
        status: import("@prisma/client").$Enums.ApplicationStatus;
    }>;
}
//# sourceMappingURL=application.d.ts.map