import type { PrismaClient, User } from '@prisma/client';
import type { AuthPayload } from '../schemas/auth.ts';
export interface AuthRepository {
    findByEmail(email: string): Promise<User | null>;
    save(user: AuthPayload): Promise<User | null>;
}
export declare class TestAuthRepository implements AuthRepository {
    users: User[];
    constructor();
    findByEmail(email: string): Promise<User | null>;
    save(user: AuthPayload): Promise<User | null>;
}
export declare class PostgresAuthRepository implements AuthRepository {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    save(user: AuthPayload): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
}
//# sourceMappingURL=auth.d.ts.map