import type { AuthPayload } from '../schemas/auth.ts';
import bcrypt from 'bcrypt';
import { generateToken, hashPassword } from '../utils/jwt.ts';
import type { AuthRepository } from '../repository/auth.ts';

export class AuthService {
	_authRepository: AuthRepository;
	constructor(authRepository: AuthRepository) {
		this._authRepository = authRepository;
	}

	async signup(body: AuthPayload): Promise<string> {
		try {
			// verify if a user with a given email exists
			const user = await this._authRepository.findByEmail(body.email);

			if (user) throw new Error('email already in use');

			const hashedPassword = await hashPassword(body.password);

			const newUser = await this._authRepository.save({
				email: body.email,
				password: hashedPassword,
			});

			if (!newUser) throw new Error('Failed to create new user');

			return newUser.id;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(error.message);
			}

			throw new Error('something went wrong', {
				cause: error,
			});
		}
	}
	async login(body: AuthPayload): Promise<string> {
		try {
			const user = await this._authRepository.findByEmail(body.email);

			if (!user) throw new Error('user not found');

			const passwordMatch = await bcrypt.compare(body.password, user.password);

			if (!passwordMatch) {
				throw new Error('invalid credentials');
			}

			const token = generateToken({ userId: user.id, email: user.email });

			return token;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(error.message);
			}

			throw new Error('something went wrong', {
				cause: error,
			});
		}
	}
}
