import { useState } from 'react';
import { Eye, EyeClosed } from 'lucide-react';
import { BACKEND_PATH } from '../config/url';
import { Navigate } from 'react-router';

export default function Login() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [passwordVisible, setPasswordVisible] = useState(false);

	type FormField = keyof typeof formData;

	const handleInputChange = (field: FormField, value: string) => {
		setFormData(prev => ({
			...prev,
			[field]: value,
		}));
	};

	const handleTogglePasswordVisibility = () =>
		setPasswordVisible(prev => !prev);

	const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const res = await fetch(`${BACKEND_PATH}/auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include', // Important!
				body: JSON.stringify({
					email: formData.email,
					password: formData.password,
				}),
			});

			const data = await res.json();

			if (data.user) {
				return <Navigate to="/applications" replace />;
			}
		} catch (error) {
			console.log(error);
		}
	};

	const isFormValid =
		formData.email.trim() !== '' &&
		formData.password.trim() !== '' &&
		/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

	return (
		<form
			onSubmit={handleSubmit}
			className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-slate-200 space-y-6"
		>
			<div className="text-center">
				<h1 className="text-3xl font-bold text-slate-800">Welcome back</h1>
				<p className="mt-2 text-sm text-slate-500">Sign in to your account</p>
			</div>
			<div>
				<input
					className="
					w-full
					rounded-lg
					border
					border-slate-300
					px-4
					py-3
					outline-none
					transition-all
					placeholder:text-slate-400
					focus:border-blue-500
					focus:ring-4
					focus:ring-blue-200
					invalid:border-red-500
					valid:border-green-500
		"
					type="email"
					required
					placeholder="Email"
					value={formData.email}
					onChange={(
						e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
					) => handleInputChange('email', e.target.value)}
				/>
			</div>
			<div className="relative w-full">
				<input
					className="
						w-full
						rounded-lg
						border
						border-slate-300
						px-4
						pr-12
						py-3
						outline-none
						transition
						focus:border-blue-500
						focus:ring-4
						focus:ring-blue-200
						invalid:border-red-500
						
					"
					type={passwordVisible ? 'text' : 'password'}
					required
					placeholder="Password"
					value={formData.password}
					onChange={(
						e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
					) => handleInputChange('password', e.target.value)}
				/>
				<button
					type="button"
					onClick={handleTogglePasswordVisibility}
					className="
						absolute
						right-3
						top-1/2
						-translate-y-1/2
						text-slate-500
						hover:text-slate-800
					"
				>
					{passwordVisible ? <EyeClosed /> : <Eye />}
				</button>
			</div>
			<button
				type="submit"
				disabled={!isFormValid}
				className={`
					w-full rounded-lg py-3 font-semibold transition
					${
						isFormValid
							? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]'
							: 'bg-slate-300 text-slate-500 cursor-not-allowed'
					}
				`}
			>
				Login
			</button>
		</form>
	);
}
