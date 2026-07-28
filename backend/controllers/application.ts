import type { Request, Response } from 'express';
import type { ApplicationsService } from '../services/application.ts';
import {
	createApplicationSchema,
	updateApplicationSchema,
	type ApplicationUpdateInput,
} from '../schemas/application.ts';
import z from 'zod';

export class ApplicationsController {
	constructor(private readonly applicationsService: ApplicationsService) {}

	getAll = async (req: Request, res: Response) => {
		const applications = await this.applicationsService.getUserApplications(
			req.user.userId,
		);

		return res.status(200).json({
			statusCode: 200,
			message: 'Applications retrieved successfully',
			data: applications,
		});
	};

	getById = async (req: Request<{ id: string }>, res: Response) => {
		const applicationId = req.params.id;

		if (
			!applicationId ||
			applicationId === undefined ||
			applicationId === null
		) {
			return res
				.status(400)
				.json({ statusCode: 400, message: 'Bad Request', data: null });
		}

		const application = await this.applicationsService.getUserApplicationById(
			req.user.userId,
			applicationId!,
		);

		if (!application) {
			return res.status(404).json({
				statusCode: 404,
				message: 'Application not found',
				data: null,
			});
		}

		return res.status(200).json({
			statusCode: 200,
			message: 'Application retrieved successfully',
			data: application,
		});
	};

	create = async (req: Request, res: Response) => {
		try {
			const entry = z.parse(createApplicationSchema, req.body);
			const userId = req.user.userId;

			const applicationId = await this.applicationsService.addEntry({
				...entry,
				userId,
			});

			return res.status(201).json({
				statusCode: 201,
				message: 'Application created successfully',
				data: applicationId,
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

	update = async (req: Request<{ id: string }>, res: Response) => {
		try {
			const application = await this.applicationsService.getUserApplicationById(
				req.user?.userId,
				req.params.id,
			);

			if (!application) {
				return res.status(404).json({
					statusCode: 404,
					message: 'Application not found',
					data: null,
				});
			}

			const raw = z.parse(updateApplicationSchema, req.body);

			const entry: ApplicationUpdateInput = {
				...(raw.status !== undefined && { status: raw.status }),
				...(raw.lastReply !== undefined && { lastReply: raw.lastReply }),
			};

			const updatedEntry = await this.applicationsService.updateEntry(
				req.params.id,
				entry,
			);

			return res.status(201).json({
				statusCode: 201,
				message: 'Job updated successfully',
				data: updatedEntry,
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

	delete = async (req: Request<{ id: string }>, res: Response) => {
		try {
			const application = await this.applicationsService.getUserApplicationById(
				req.user?.userId,
				req.params.id,
			);

			if (!application) {
				return res.status(404).json({
					statusCode: 404,
					message: 'Application not found',
					data: null,
				});
			}

			const deleted = await this.applicationsService.deleteById(application.id);
			return res.status(200).json({
				statusCode: 200,
				message: 'Application deleted',
				data: deleted,
			});
		} catch (error) {
			console.error(error);

			return res.status(500).json({
				statusCode: 500,
				message: 'Internal server error',
			});
		}
	};
}
