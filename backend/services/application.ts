import type { ApplicationsRepository } from '../repository/application.ts';
import type {
	CreateApplicationInput,
	ApplicationUpdateInput,
	CreateApplicationServiceInput,
} from '../schemas/application.ts';

export class ApplicationsService {
	constructor(
		private readonly applicationsRepository: ApplicationsRepository,
	) {}

	getUserApplications = async (userId: string) => {
		const userApplications =
			await this.applicationsRepository.findAllByUser(userId);
		return userApplications;
	};

	getUserApplicationById = async (userId: string, applicationId: string) => {
		const application =
			await this.applicationsRepository.findAllByUserAndApplicationId(
				userId,
				applicationId,
			);
		return application;
	};

	addEntry = async (application: CreateApplicationServiceInput) => {
		const applicationId = await this.applicationsRepository.save(application);
		return applicationId;
	};

	updateEntry = async (jobId: string, application: ApplicationUpdateInput) => {
		const updatedApplication = await this.applicationsRepository.update(
			jobId,
			application,
		);
		return updatedApplication;
	};

	deleteById = async (applicationId: string) => {
		const deleted = await this.applicationsRepository.delete(applicationId);
		return deleted;
	};
}
