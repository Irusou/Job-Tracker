import express from 'express';
import { ApplicationsController } from '../controllers/application.ts';
import { prisma } from '../config/prisma.ts';
import { ApplicationsService } from '../services/application.ts';
import { PostgresApplicationsRepository } from '../repository/application.ts';
import { jwtAuthMiddleware } from '../middlewares/auth.ts';

const applicationsRouter = express.Router();

const applicationsRepository = new PostgresApplicationsRepository(prisma);
const applicationsService = new ApplicationsService(applicationsRepository);
const applicationsController = new ApplicationsController(applicationsService);

// GET ALL | with filters e.g. userId, status
applicationsRouter.get('/', jwtAuthMiddleware, applicationsController.getAll);
// GET ID | | with filters e.g. userId, status
applicationsRouter.get(
	'/:id',
	jwtAuthMiddleware,
	applicationsController.getById,
);
// POST create
applicationsRouter.post('/', jwtAuthMiddleware, applicationsController.create);
// PUT UPDATE ALL PROPERTIES
applicationsRouter.patch(
	'/:id',
	jwtAuthMiddleware,
	applicationsController.update,
);
// DELETE
applicationsRouter.delete(
	'/:id',
	jwtAuthMiddleware,
	applicationsController.delete,
);

export { applicationsRouter };
