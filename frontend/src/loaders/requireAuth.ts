import { redirect } from 'react-router';

export async function requireAuth() {
	const res = await fetch('http://localhost:3000/api/v1/auth/me', {
		credentials: 'include',
	});

	if (!res.ok) {
		throw redirect('/login');
	}

	return res.json();
}
