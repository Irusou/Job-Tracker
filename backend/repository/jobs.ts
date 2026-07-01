import { JobStatus, type PrismaClient } from '@prisma/client';
import type { JobEntryInput } from '../schemas/jobEntry.ts';

export type UserJob = {
	position: string;
	company: string;
	hours: string;
	salary: number;
	appliedAt: Date;
	lastReply: Date | null;
	status: JobStatus;
	userId: string;
	id: string;
};

export interface JobsRepository {
	findAllByUser(userId: string): Promise<UserJob[]>;
	findAllByUserAndJobId(userId: string, jobId: string): Promise<UserJob | null>;
	save(jobPost: JobEntryInput): Promise<String | null>;
	update(
		id: string,
		status?: JobStatus,
		replyDate?: Date,
	): Promise<String | null>;
	delete(id: string): Promise<String | null>;
}

export class PostgresJobsRepository implements JobsRepository {
	constructor(private readonly prisma: PrismaClient) {}

	async findAllByUser(userId: string) {
		const userJobs = await this.prisma.jobEntry.findMany({
			where: { userId },
		});

		return userJobs;
	}

	async findAllByUserAndJobId(userId: string, jobId: string) {
		const job = await this.prisma.jobEntry.findFirst({
			where: {
				id: jobId,
				userId,
			},
		});

		return job;
	}

	async save(jobPost: JobEntryInput) {
		const entry = await this.prisma.jobEntry.create({
			data: {
				...jobPost,
				lastReply: jobPost.lastReply ?? null,
			},
		});

		return entry.id;
	}

	async update(id: string, status?: JobStatus, replyDate?: Date) {
		return null;
	}

	async delete(id: string) {
		return null;
	}
}
