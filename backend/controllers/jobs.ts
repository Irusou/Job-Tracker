import type { Request, Response } from 'express';
import type { JobsService } from '../services/jobs.ts';

export class JobsController {
	constructor(private readonly jobsService: JobsService) {}

	getAll = async (req: Request, res: Response) => {
		const jobs = await this.jobsService.getUserJobs(req.user.userId);

		return res.json({
			statusCode: 200,
			message: 'Jobs retrieved successfully',
			data: jobs,
		});
	};

	getById = async (req: Request, res: Response) => {};
	create = async (req: Request, res: Response) => {};
	update = async (req: Request, res: Response) => {};
	patch = async (req: Request, res: Response) => {};
	delete = async (req: Request, res: Response) => {};
}
