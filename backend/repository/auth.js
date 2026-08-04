export class TestAuthRepository {
    users;
    constructor() {
        this.users = [];
    }
    findByEmail(email) {
        const user = Promise.resolve(this.users.find(u => u.email === email) ?? null);
        return user;
    }
    async save(user) {
        const id = `U-${Math.random() * 1000}`;
        this.users.push({ ...user, id, createdAt: new Date() });
        return Promise.resolve(this.users.find(u => u.id === id) ?? null);
    }
}
export class PostgresAuthRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async save(user) {
        return await this.prisma.user.create({
            data: {
                email: user.email,
                password: user.password,
            },
        });
    }
    async findByEmail(email) {
        return await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
    }
}
//# sourceMappingURL=auth.js.map