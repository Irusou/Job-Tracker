import { type PrismaClient } from '@prisma/client';
import type { JobEntryInput } from '../schemas/jobEntry.ts';

export interface JobsRepository {
	findAllByUser(userId: string): any;
	save(jobPost: JobEntryInput): Promise<String | null>;
	update(id: string): Promise<String | null>;
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

	async save(jobPost: JobEntryInput) {
		return null;
	}
	async update(id: string) {
		return null;
	}

	async delete(id: string) {
		return null;
	}
}
