import { createBrowserRouter, RouterProvider } from 'react-router';

import Applications from './pages/Applications';
import Login from './pages/Login';
import Signin from './pages/Signin';
import Board from './pages/Board';
import DashBoard from './pages/DashBoard';
import Application from './pages/Application';
import Home from './pages/Home';
import { getApplicationById } from './loaders/getApplicationById';
import { getAllApplications } from './loaders/getAllApplications';
import AuthLayout from './layouts/Auth';
import { requireAuth } from './loaders/requireAuth';
import AuthProvider from './context/AuthProvider';

function App() {
	const router = createBrowserRouter([
		{
			path: '/',
			Component: Home,
		},
		{
			path: '/login',
			Component: Login,
		},
		{
			path: '/signin',
			Component: Signin,
		},
		{
			Component: AuthLayout,
			loader: requireAuth,
			children: [
				{
					path: '/dashboard',
					Component: DashBoard,
				},
				{
					path: '/applications',
					Component: Applications,
					loader: async () => {
						return await getAllApplications();
					},
				},
				{
					path: '/applications/:id',
					loader: async ({ params }) => {
						return await getApplicationById(params.id!);
					},
					Component: Application,
				},
				{
					path: '/board',
					Component: Board,
				},
			],
		},
	]);
	return (
		<div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-100 to-indigo-200 flex items-center justify-center p-4">
			{/* header */}
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
			{/* footer */}
		</div>
	);
}

export default App;
