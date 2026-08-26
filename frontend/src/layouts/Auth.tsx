import { Navigate, Outlet } from 'react-router';
import Header from '@/components/Header';
import { useAuthStore } from '@/store/authStore';

export default function AuthLayout() {
	const { user, loading } = useAuthStore();

	if (loading) {
		return <p>Loading...</p>;
	}

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	return (
		<>
			<Header />
			<Outlet />
		</>
	);
}
