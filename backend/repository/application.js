import { ApplicationLocation, ApplicationStatus, Prisma, } from '@prisma/client';
import { prisma } from '../config/prisma.ts';
export class PostgresApplicationsRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAllByUser(userId) {
        const userJobs = await this.prisma.application.findMany({
            where: { userId },
        });
        return userJobs;
    }
    async findAllByUserAndApplicationId(userId, applicationId) {
        const application = await this.prisma.application.findFirst({
            where: {
                id: applicationId,
                userId,
            },
        });
        return application;
    }
    async save(application) {
        const entry = await this.prisma.application.create({
            data: {
                ...application,
                lastReply: application.lastReply ?? null,
            },
        });
        return entry.id;
    }
    async update(id, application) {
        const updateData = {};
        if (application.status !== undefined) {
            updateData.status = application.status;
        }
        if (application.lastReply !== undefined) {
            updateData.lastReply = application.lastReply;
        }
        return await prisma.application.update({
            where: {
                id,
            },
            data: updateData,
        });
    }
    async delete(id) {
        const entry = await this.prisma.application.delete({
            where: {
                id,
            },
        });
        return entry;
    }
}
//# sourceMappingURL=application.js.map