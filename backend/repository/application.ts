import {
	ApplicationLocation,
	ApplicationStatus,
	type PrismaClient,
} from '@prisma/client';
import type {
	ApplicationInput,
	ApplicationUpdateInput,
} from '../schemas/application.ts';

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
	save(jobPost: ApplicationInput): Promise<String | null>;
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

	async save(application: ApplicationInput) {
		const entry = await this.prisma.application.create({
			data: {
				...application,
				lastReply: application.lastReply ?? null,
			},
		});

		return entry.id;
	}

	async update(id: string, application: ApplicationUpdateInput) {
		const entry = await this.prisma.application.update({
			where: { id },
			data: application,
		});
		return entry;
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
