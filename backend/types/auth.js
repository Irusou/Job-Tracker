import { z } from 'zod';
export const AuthUser = z.object({
    userId: z.string(),
    email: z.string(),
});
//# sourceMappingURL=auth.js.map