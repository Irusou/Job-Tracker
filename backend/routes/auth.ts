import express from 'express';
import { AuthController } from '../controllers/auth.ts';
import { AuthService } from '../services/auth.ts';
import { prisma } from '../config/prisma.ts';
import { PostgresAuthRepository } from './../repository/auth.ts';

const authRouter = express.Router();

const authRepository = new PostgresAuthRepository(prisma);
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

authRouter.post('/signup', authController.signup);

authRouter.post('/login', authController.login);

export { authRouter };
