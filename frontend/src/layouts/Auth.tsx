import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../hooks/useAuth';

export default function AuthLayout() {
	const { user, loading } = useAuth();

	if (loading) {
		return <p>Loading...</p>;
	}

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
}
