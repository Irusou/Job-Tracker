import { JobStatus, type PrismaClient } from '@prisma/client';
import type {
	JobEntryInput,
	JobEntryUpdateInput,
} from '../schemas/jobEntry.ts';

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
	update(id: string, jobEntry: JobEntryUpdateInput): Promise<UserJob | null>;
	delete(id: string): Promise<UserJob | null>;
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

	async save(jobEntry: JobEntryInput) {
		const entry = await this.prisma.jobEntry.create({
			data: {
				...jobEntry,
				lastReply: jobEntry.lastReply ?? null,
			},
		});

		return entry.id;
	}

	async update(id: string, jobEntry: JobEntryUpdateInput) {
		const entry = await this.prisma.jobEntry.update({
			where: { id },
			data: jobEntry,
		});
		return entry;
	}

	async delete(id: string) {
		const entry = await this.prisma.jobEntry.delete({
			where: {
				id,
			},
		});
		return entry;
	}
}
