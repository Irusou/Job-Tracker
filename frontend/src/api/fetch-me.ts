import { BACKEND_PATH } from '@/config/url';
import type { User } from '@/store/authStore';

export const fetchMe: () => Promise<User | null> = async () => {
	try {
		const res = await fetch(`${BACKEND_PATH}/auth/me`, {
			credentials: 'include',
		});

		if (res.ok) {
			const user = await res.json();
			return user;
		}
	} catch (error) {
		console.error('failed to get user', error);
		return null;
	}
};
