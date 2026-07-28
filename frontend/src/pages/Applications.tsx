import { useNavigate, useLoaderData } from 'react-router';
import type { Application } from '../types/Application';
import { Badge, Box, Flex, Heading, Table, Text } from '@chakra-ui/react';
import { statusConfig } from '@/constants/applicationStatus';
import { formatDate } from './../utils/formatDate';
import CreateApplicationDialog from '@/components/CreateApplicationDialog';

export default function Applications() {
	const navigate = useNavigate();
	const applications = useLoaderData<Application[]>();

	if (!applications || applications.length === 0) {
		return (
			<Box maxW="6xl" mx="auto" mt="8" px="4">
				<Flex direction="column" alignItems="center">
					<Box mb="6">
						<Heading size="lg">My Applications</Heading>

						<Text color="fg.muted" mt="1">
							Keep track of your job applications.
						</Text>
					</Box>

					<CreateApplicationDialog />
				</Flex>
			</Box>
		);
	}

	return (
		<Box maxW="6xl" mx="auto" mt="8" px="4">
			<Flex justifyContent="space-between" alignItems="center" mb="6">
				<Box>
					<Heading size="lg">My Applications</Heading>

					<Text color="fg.muted" mt="1">
						Keep track of your job applications.
					</Text>
				</Box>

				<CreateApplicationDialog />
			</Flex>

			<Box
				width="full"
				overflowX="auto"
				borderWidth="1px"
				borderColor="border"
				borderRadius="lg"
				overflow="hidden"
			>
				<Table.Root size="sm" variant="outline">
					<Table.Header>
						<Table.Row>
							<Table.ColumnHeader>Position</Table.ColumnHeader>
							<Table.ColumnHeader>Company</Table.ColumnHeader>
							<Table.ColumnHeader>Status</Table.ColumnHeader>
							<Table.ColumnHeader>Applied</Table.ColumnHeader>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{applications.map(application => {
							const status = statusConfig[application.status];
							return (
								<Table.Row
									key={application.id}
									cursor="pointer"
									_hover={{
										bg: 'bg.muted',
									}}
									transition="background 0.2s"
									onClick={() => navigate(`/applications/${application.id}`)}
								>
									<Table.Cell fontWeight="medium">
										{application.position}
									</Table.Cell>

									<Table.Cell>{application.company}</Table.Cell>

									<Table.Cell>
										<Badge colorPalette={status.colorPalette}>
											{status.label}
										</Badge>
									</Table.Cell>

									<Table.Cell color="fg.muted">
										{formatDate(new Date(application.appliedAt))}
									</Table.Cell>
								</Table.Row>
							);
						})}
					</Table.Body>
				</Table.Root>
			</Box>
		</Box>
	);
}
