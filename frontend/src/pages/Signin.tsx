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

interface SigninForm {
	email: string;
	password: string;
	confirmPassword: string;
}

export default function Signin() {
	const [formData, setFormData] = useState<SigninForm>({
		email: '',
		password: '',
		confirmPassword: '',
	});

	const [passwordVisible, setPasswordVisible] = useState(false);
	const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	type FormField = keyof typeof formData;

	const handleInputChange = (field: FormField, value: string) => {
		setFormData(prev => ({
			...prev,
			[field]: value,
		}));
	};

	const handleTogglePasswordVisibility = () =>
		setPasswordVisible(prev => !prev);

	const handleToggleConfirmPasswordVisibility = () =>
		setConfirmPasswordVisible(prev => !prev);

	const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (formData.password !== formData.confirmPassword) {
			return;
		}

		try {
			setLoading(true);

			const res = await fetch(`${BACKEND_PATH}/auth/signup`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify({
					email: formData.email,
					password: formData.password,
				}),
			});

			if (!res.ok) {
				throw new Error('Failed to create account');
			}

			navigate('/login', {
				replace: true,
			});
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const isFormValid =
		formData.email.trim() !== '' &&
		/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
		formData.password.trim() !== '' &&
		formData.confirmPassword.trim() !== '' &&
		formData.password === formData.confirmPassword;

	return (
		<AbsoluteCenter>
			<Container background="Background" padding="1rem" borderRadius="2xl">
				<Flex gap="1rem" direction="column">
					<form onSubmit={handleSubmit}>
						<Container>
							<Heading size="2xl">Create your account</Heading>

							<Text fontSize="sm" color="CaptionText">
								Sign up to start tracking your job applications
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
									onChange={e => handleInputChange('email', e.target.value)}
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
										onChange={e =>
											handleInputChange('password', e.target.value)
										}
									/>
								</InputGroup>
							</Field.Root>
						</Container>

						<Container>
							<Field.Root required>
								<Field.Label>
									Confirm Password
									<Field.RequiredIndicator />
								</Field.Label>

								<InputGroup
									endElement={
										<button
											type="button"
											onClick={handleToggleConfirmPasswordVisibility}
										>
											{confirmPasswordVisible ? <EyeClosed /> : <Eye />}
										</button>
									}
								>
									<Input
										type={confirmPasswordVisible ? 'text' : 'password'}
										required
										placeholder="Confirm password"
										value={formData.confirmPassword}
										onChange={e =>
											handleInputChange('confirmPassword', e.target.value)
										}
									/>
								</InputGroup>

								{formData.confirmPassword &&
									formData.password !== formData.confirmPassword && (
										<Field.ErrorText>Passwords do not match</Field.ErrorText>
									)}
							</Field.Root>
						</Container>

						<Center marginTop="3">
							<Button
								variant="solid"
								type="submit"
								disabled={!isFormValid || loading}
							>
								{loading ? 'Creating account...' : 'Create account'}
							</Button>
						</Center>
					</form>
				</Flex>
			</Container>
		</AbsoluteCenter>
	);
}
