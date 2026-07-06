import type { PrismaClient, User } from '@prisma/client';
import type { AuthPayload } from '../schemas/auth.ts';

export interface AuthRepository {
	findByEmail(email: string): Promise<User | null>;
	save(user: AuthPayload): Promise<User | null>;
}

export class TestAuthRepository implements AuthRepository {
	users: User[];
	constructor() {
		this.users = [];
	}

	findByEmail(email: string): Promise<User | null> {
		const user = Promise.resolve(
			this.users.find(u => u.email === email) ?? null,
		);
		return user;
	}

	async save(user: AuthPayload): Promise<User | null> {
		const id = `U-${Math.random() * 1000}`;
		this.users.push({ ...user, id, createdAt: new Date() });
		return Promise.resolve(this.users.find(u => u.id === id) ?? null);
	}
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
