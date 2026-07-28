import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import Header from '@/components/Header';

export default function AuthLayout() {
	const { user, loading } = useAuth();

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
