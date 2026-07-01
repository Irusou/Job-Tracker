import type { Request, Response } from 'express';
import type { JobsService } from '../services/jobs.ts';
import { jobEntrySchema, type JobEntryInput } from '../schemas/jobEntry.ts';
import z from 'zod';

export class JobsController {
	constructor(private readonly jobsService: JobsService) {}

	getAll = async (req: Request, res: Response) => {
		const jobs = await this.jobsService.getUserJobs(req.user.userId);

		return res.status(200).json({
			statusCode: 200,
			message: 'Jobs retrieved successfully',
			data: jobs,
		});
	};

	getById = async (req: Request<{ id: string }>, res: Response) => {
		const jobId = req.params.id;

		if (!jobId || jobId === undefined || jobId === null) {
			return res
				.status(400)
				.json({ statusCode: 400, message: 'Bad Request', data: null });
		}

		const job = await this.jobsService.getUserJobById(req.user.userId, jobId!);

		if (!job) {
			return res.status(404).json({
				statusCode: 404,
				message: 'Job not found',
				data: null,
			});
		}

		return res.status(200).json({
			statusCode: 200,
			message: 'Job retrieved successfully',
			data: job,
		});
	};

	create = async (req: Request, res: Response) => {
		try {
			const entry = z.parse(jobEntrySchema, req.body);

			const jobId = await this.jobsService.addEntry(entry);

			return res.status(201).json({
				statusCode: 201,
				message: 'Job created successfully',
				data: jobId,
			});
		} catch (error) {
			if (error instanceof z.ZodError) {
				return res.status(400).json({
					statusCode: 400,
					message: 'Validation failed',
					errors: z.treeifyError(error),
				});
			}

			console.error(error);

			return res.status(500).json({
				statusCode: 500,
				message: 'Internal server error',
			});
		}
	};

	update = async (req: Request, res: Response) => {};

	patch = async (req: Request, res: Response) => {};

	delete = async (req: Request<{ id: string }>, res: Response) => {};
}
