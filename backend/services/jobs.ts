import type { JobsRepository } from '../repository/jobs.ts';

export class JobsService {
	constructor(private readonly jobsRepository: JobsRepository) {}

	getUserJobs = async (userId: string) => {
		const userJobs = await this.jobsRepository.findAllByUser(userId);
		return userJobs;
	};
}
