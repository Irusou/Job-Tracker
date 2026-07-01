import type { JobsRepository } from '../repository/jobs.ts';
import type {
	JobEntryInput,
	JobEntryUpdateInput,
} from '../schemas/jobEntry.ts';

export class JobsService {
	constructor(private readonly jobsRepository: JobsRepository) {}

	getUserJobs = async (userId: string) => {
		const userJobs = await this.jobsRepository.findAllByUser(userId);
		return userJobs;
	};

	getUserJobById = async (userId: string, jobId: string) => {
		const job = await this.jobsRepository.findAllByUserAndJobId(userId, jobId);
		return job;
	};

	addEntry = async (jobEntry: JobEntryInput) => {
		const jobId = await this.jobsRepository.save(jobEntry);
		return jobId;
	};

	updateEntry = async (jobId: string, jobEntry: JobEntryUpdateInput) => {
		const job = await this.jobsRepository.update(jobId, jobEntry);
		return job;
	};

	deleteById = async (jobId: string) => {
		const deleted = await this.jobsRepository.delete(jobId);
		return deleted;
	};
}
