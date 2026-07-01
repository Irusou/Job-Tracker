import express from 'express';
import { JobsController } from '../controllers/jobs.ts';
import { prisma } from '../config/prisma.ts';
import { JobsService } from './../services/jobs.ts';
import { PostgresJobsRepository } from '../repository/jobs.ts';
import { jwtAuthMiddleware } from '../middlewares/auth.ts';

const jobsRouter = express.Router();

const jobsRepository = new PostgresJobsRepository(prisma);
const jobsService = new JobsService(jobsRepository);
const jobsController = new JobsController(jobsService);

// GET ALL | with filters e.g. userId, status
jobsRouter.get('/', jwtAuthMiddleware, jobsController.getAll);
// GET ID | | with filters e.g. userId, status
jobsRouter.get('/:id', jwtAuthMiddleware, jobsController.getById);
// POST create
jobsRouter.post('/', jwtAuthMiddleware, jobsController.create);
// PUT UPDATE ALL PROPERTIES
jobsRouter.put('/:id', jwtAuthMiddleware, jobsController.update);
// DELETE
jobsRouter.delete('/:id', jwtAuthMiddleware, jobsController.delete);

export { jobsRouter };
