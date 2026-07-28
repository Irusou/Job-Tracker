import { Badge, Box, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { useLoaderData } from 'react-router';
import type { Application as ApplicationType } from '../types/Application';
import EditApplicationDialog from '../components/EditApplicationDialog';
import { statusConfig } from '../constants/applicationStatus';
import { formatDate } from '@/utils/formatDate';
import DeleteApplicationDialog from '@/components/DeleteApplicationDialog';

export default function Application() {
	const application = useLoaderData<ApplicationType>();

	if (!application) {
		return (
			<Box py="16" textAlign="center">
				<Heading size="lg">Application not found</Heading>

				<Text mt="2" color="fg.muted">
					The application you're looking for doesn't exist or may have been
					removed.
				</Text>
			</Box>
		);
	}

	const status = statusConfig[application.status];

	return (
		<Box
			maxW="4xl"
			mx="auto"
			mt="8"
			p={{ base: '5', md: '8' }}
			borderWidth="1px"
			borderColor="border"
			borderRadius="xl"
			bg="bg"
		>
			{/* Header */}
			<Flex
				justifyContent="space-between"
				alignItems={{ base: 'flex-start', sm: 'center' }}
				gap="4"
				mb="8"
				flexDirection={{ base: 'column', sm: 'row' }}
			>
				<Box>
					<Heading size="lg">{application.position}</Heading>

					<Text mt="1" fontSize="md" color="fg.muted">
						{application.company}
					</Text>
				</Box>

				<Flex gap="3">
					<EditApplicationDialog application={application} />

					<DeleteApplicationDialog application={application} />
				</Flex>
			</Flex>

			{/* Application Details */}
			<SimpleGrid columns={{ base: 1, sm: 2 }} gap="6">
				{/* Status */}
				<Box>
					<Text fontSize="sm" color="fg.muted" mb="2">
						Status
					</Text>

					<Badge colorPalette={status.colorPalette} variant="subtle">
						{status.label}
					</Badge>
				</Box>

				{/* Location */}
				<Box>
					<Text fontSize="sm" color="fg.muted" mb="1">
						Location
					</Text>

					<Text fontWeight="medium">{application.location}</Text>
				</Box>

				{/* Working Hours */}
				<Box>
					<Text fontSize="sm" color="fg.muted" mb="1">
						Working Hours
					</Text>

					<Text fontWeight="medium">{application.hours}</Text>
				</Box>

				{/* Salary */}
				<Box>
					<Text fontSize="sm" color="fg.muted" mb="1">
						Salary
					</Text>

					<Text fontWeight="medium">
						€{application.salary.toLocaleString()}
					</Text>
				</Box>

				{/* Applied At */}
				<Box>
					<Text fontSize="sm" color="fg.muted" mb="1">
						Applied At
					</Text>

					<Text fontWeight="medium">{formatDate(application.appliedAt)}</Text>
				</Box>

				{/* Last Reply */}
				<Box>
					<Text fontSize="sm" color="fg.muted" mb="1">
						Last Reply
					</Text>

					<Text fontWeight="medium">
						{application.lastReply
							? formatDate(application.lastReply)
							: 'No reply yet'}
					</Text>
				</Box>

				{/* Application ID */}
				<Box gridColumn={{ base: 'auto', sm: '1 / -1' }}>
					<Text fontSize="sm" color="fg.muted" mb="1">
						Application ID
					</Text>

					<Text
						fontSize="sm"
						fontFamily="mono"
						color="fg.muted"
						wordBreak="break-all"
					>
						{application.id}
					</Text>
				</Box>
			</SimpleGrid>
		</Box>
	);
}
