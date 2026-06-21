import type { PrismaClient, User } from '@prisma/client';
import type { AuthPayload } from '../schemas/auth.ts';

export interface AuthRepository {
	findByEmail(email: string): Promise<User | null>;
	save(user: AuthPayload): Promise<User | null>;
}

export class PostgresAuthRepository implements AuthRepository {
	constructor(private readonly prisma: PrismaClient) {}

	async save(user: AuthPayload): Promise<User | null> {
		return await this.prisma.user.create({
			data: {
				email: user.email,
				password: user.password,
			},
		});
	}

	async findByEmail(email: string): Promise<User | null> {
		return await this.prisma.user.findUniqueOrThrow({
			where: {
				email,
			},
		});
	}
}
