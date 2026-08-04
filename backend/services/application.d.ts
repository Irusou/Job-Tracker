import type { ApplicationsRepository } from '../repository/application.ts';
import type { ApplicationUpdateInput, CreateApplicationServiceInput } from '../schemas/application.ts';
export declare class ApplicationsService {
    private readonly applicationsRepository;
    constructor(applicationsRepository: ApplicationsRepository);
    getUserApplications: (userId: string) => Promise<import("../repository/application.ts").UserJob[]>;
    getUserApplicationById: (userId: string, applicationId: string) => Promise<import("../repository/application.ts").UserJob | null>;
    addEntry: (application: CreateApplicationServiceInput) => Promise<String | null>;
    updateEntry: (jobId: string, application: ApplicationUpdateInput) => Promise<import("../repository/application.ts").UserJob | null>;
    deleteById: (applicationId: string) => Promise<import("../repository/application.ts").UserJob | null>;
}
//# sourceMappingURL=application.d.ts.map