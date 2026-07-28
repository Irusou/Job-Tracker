import {
	ApplicationLocation,
	ApplicationStatus,
	Prisma,
	type PrismaClient,
} from '@prisma/client';
import type {
	CreateApplicationInput,
	ApplicationUpdateInput,
	CreateApplicationServiceInput,
} from '../schemas/application.ts';
import { prisma } from '../config/prisma.ts';

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
	findAllByUserAndApplicationId(
		userId: string,
		applicationId: string,
	): Promise<UserJob | null>;
	save(jobPost: CreateApplicationInput): Promise<String | null>;
	update(
		id: string,
		application: ApplicationUpdateInput,
	): Promise<UserJob | null>;
	delete(id: string): Promise<UserJob | null>;
}

export class PostgresApplicationsRepository implements ApplicationsRepository {
	constructor(private readonly prisma: PrismaClient) {}

	async findAllByUser(userId: string) {
		const userJobs = await this.prisma.application.findMany({
			where: { userId },
		});

		return userJobs;
	}

	async findAllByUserAndApplicationId(userId: string, applicationId: string) {
		const application = await this.prisma.application.findFirst({
			where: {
				id: applicationId,
				userId,
			},
		});

		return application;
	}

	async save(application: CreateApplicationServiceInput) {
		const entry = await this.prisma.application.create({
			data: {
				...application,
				lastReply: application.lastReply ?? null,
			},
		});

		return entry.id;
	}

	async update(id: string, application: ApplicationUpdateInput) {
		const updateData: Prisma.ApplicationUpdateInput = {};

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

	async delete(id: string) {
		const entry = await this.prisma.application.delete({
			where: {
				id,
			},
		});
		return entry;
	}
}
