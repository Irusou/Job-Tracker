import { useEffect, useState } from 'react';
import { AuthContext, type User } from './AuthContext';
import { BACKEND_PATH } from '../config/url';

export default function AuthProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function checkAuth() {
			try {
				const res = await fetch(`${BACKEND_PATH}/auth/me`, {
					credentials: 'include',
				});

				if (res.ok) {
					const user = await res.json();
					setUser(user);
				}
			} finally {
				setLoading(false);
			}
		}

		checkAuth();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				loading,
				setUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
