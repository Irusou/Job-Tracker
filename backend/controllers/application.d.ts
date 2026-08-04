import type { Request, Response } from 'express';
import type { ApplicationsService } from '../services/application.ts';
export declare class ApplicationsController {
    private readonly applicationsService;
    constructor(applicationsService: ApplicationsService);
    getAll: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getById: (req: Request<{
        id: string;
    }>, res: Response) => Promise<Response<any, Record<string, any>>>;
    create: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    update: (req: Request<{
        id: string;
    }>, res: Response) => Promise<Response<any, Record<string, any>>>;
    delete: (req: Request<{
        id: string;
    }>, res: Response) => Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=application.d.ts.map