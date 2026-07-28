import { useState } from 'react';
import { Eye, EyeClosed } from 'lucide-react';
import { BACKEND_PATH } from '../config/url';
import { useNavigate } from 'react-router';
import {
	AbsoluteCenter,
	Button,
	Center,
	Container,
	Field,
	Flex,
	Heading,
	Input,
	InputGroup,
	Text,
} from '@chakra-ui/react';
import { useAuth } from '@/hooks/useAuth';

interface LoginForm {
	email: string;
	password: string;
}

export default function Login() {
	const [formData, setFormData] = useState<LoginForm>({
		email: '',
		password: '',
	});
	const [passwordVisible, setPasswordVisible] = useState(false);
	const navigate = useNavigate();
	const { login, loading } = useAuth();

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

			if (!res.ok) {
				throw new Error('Invalid credentials');
			}

			const data = await res.json();

			if (data.user) {
				login(data.user);
				navigate('/applications', { replace: true });
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
		<AbsoluteCenter>
			<Container background="Background" padding={'1rem'} borderRadius={'2xl'}>
				<Flex gap={'1rem'} direction="column">
					<form onSubmit={handleSubmit}>
						<Container>
							<Heading size="2xl">Welcome back</Heading>
							<Text fontSize={'sm'} color={'CaptionText'}>
								Sign in to your account
							</Text>
						</Container>
						<Container>
							<Field.Root required>
								<Field.Label>
									Email
									<Field.RequiredIndicator />
								</Field.Label>
								<Input
									value={formData.email}
									type="email"
									placeholder="me@gmail.com"
									onChange={(
										e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
									) => handleInputChange('email', e.target.value)}
								/>
							</Field.Root>
						</Container>
						<Container>
							<Field.Root required>
								<Field.Label>
									Password
									<Field.RequiredIndicator />
								</Field.Label>
								<InputGroup
									endElement={
										<button
											type="button"
											onClick={handleTogglePasswordVisibility}
										>
											{passwordVisible ? <EyeClosed /> : <Eye />}
										</button>
									}
								>
									<Input
										type={passwordVisible ? 'text' : 'password'}
										required
										placeholder="Password"
										value={formData.password}
										onChange={(
											e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
										) => handleInputChange('password', e.target.value)}
									/>
								</InputGroup>
							</Field.Root>
						</Container>
						<Center marginTop={'3'}>
							<Button variant="solid" type="submit" disabled={!isFormValid}>
								{loading ? 'Loading...' : 'Login'}
							</Button>
						</Center>
					</form>
				</Flex>
			</Container>
		</AbsoluteCenter>
	);
}
