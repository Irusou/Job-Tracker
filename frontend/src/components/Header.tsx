import { BACKEND_PATH } from '@/config/url';
import {
	BriefcaseBusiness,
	Kanban,
	LayoutDashboard,
	LogOut,
} from 'lucide-react';
import {
	Box,
	Button,
	Container,
	Flex,
	For,
	HStack,
	Text,
} from '@chakra-ui/react';
import { ColorModeButton } from '@/components/ui/color-mode';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

const tabs = [
	{
		label: 'Dashboard',
		path: '/dashboard',
		icon: LayoutDashboard,
	},
	{
		label: 'Applications',
		path: '/applications',
		icon: BriefcaseBusiness,
	},
	{
		label: 'Board',
		path: '/board',
		icon: Kanban,
	},
];

export default function Header() {
	const { user, logout } = useAuthStore();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			const response = await fetch(`${BACKEND_PATH}/auth/logout`, {
				method: 'POST',
				credentials: 'include',
			});

			if (!response.ok) {
				throw new Error('Failed to logout');
			}

			logout();
			navigate('/login', { replace: true });
		} catch (error) {
			console.error('Failed to logout:', error);
		}
	};

	return (
		<Box
			as="header"
			width="full"
			borderBottomWidth="1px"
			borderColor="border"
			bg="bg"
			position="sticky"
			top="0"
			zIndex="sticky"
		>
			<Container maxW="6xl">
				<Flex
					height="16"
					alignItems="center"
					justifyContent="space-between"
					gap="8"
				>
					{/* Brand */}
					<Text
						fontSize="xl"
						fontWeight="bold"
						letterSpacing="tight"
						whiteSpace="nowrap"
					>
						JobTracker
					</Text>

					{/* Navigation */}
					<HStack gap="1">
						<For each={tabs}>
							{tab => {
								const Icon = tab.icon;

								return (
									<NavLink key={tab.path} to={tab.path}>
										{({ isActive }) => (
											<Flex
												alignItems="center"
												gap="2"
												px="4"
												py="2"
												borderRadius="md"
												fontSize="sm"
												fontWeight={isActive ? 'semibold' : 'medium'}
												color={isActive ? 'colorPalette.fg' : 'fg.muted'}
												bg={isActive ? 'colorPalette.subtle' : 'transparent'}
												transition="all 0.2s"
												_hover={{
													color: 'fg',
													bg: 'bg.muted',
												}}
											>
												<Icon size={17} />
												<Text
													display={{
														base: 'none',
														sm: 'block',
													}}
												>
													{tab.label}
												</Text>
											</Flex>
										)}
									</NavLink>
								);
							}}
						</For>
					</HStack>

					{/* User actions */}
					<Flex alignItems="center" gap="3">
						{user && (
							<Text
								display={{ base: 'none', lg: 'block' }}
								fontSize="sm"
								color="fg.muted"
								maxW="200px"
								overflow="hidden"
								textOverflow="ellipsis"
								whiteSpace="nowrap"
							>
								{user.email}
							</Text>
						)}

						<Flex alignItems="center" gap="2">
							<Button variant="outline" size="sm" onClick={handleLogout}>
								<LogOut size={16} />
								<Text display={{ base: 'none', sm: 'block' }}>Logout</Text>
							</Button>
							<ColorModeButton />
						</Flex>
					</Flex>
				</Flex>
			</Container>
		</Box>
	);
}
