import { redirect } from 'react-router';
import { BACKEND_PATH } from '../config/url';

export async function requireAuth() {
	const res = await fetch(`${BACKEND_PATH}/auth/me`, {
		credentials: 'include',
	});

	if (!res.ok) {
		throw redirect('/login');
	}

	return res.json();
}
