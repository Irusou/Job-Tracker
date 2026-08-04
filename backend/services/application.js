export class ApplicationsService {
    applicationsRepository;
    constructor(applicationsRepository) {
        this.applicationsRepository = applicationsRepository;
    }
    getUserApplications = async (userId) => {
        const userApplications = await this.applicationsRepository.findAllByUser(userId);
        return userApplications;
    };
    getUserApplicationById = async (userId, applicationId) => {
        const application = await this.applicationsRepository.findAllByUserAndApplicationId(userId, applicationId);
        return application;
    };
    addEntry = async (application) => {
        const applicationId = await this.applicationsRepository.save(application);
        return applicationId;
    };
    updateEntry = async (jobId, application) => {
        const updatedApplication = await this.applicationsRepository.update(jobId, application);
        return updatedApplication;
    };
    deleteById = async (applicationId) => {
        const deleted = await this.applicationsRepository.delete(applicationId);
        return deleted;
    };
}
//# sourceMappingURL=application.js.map