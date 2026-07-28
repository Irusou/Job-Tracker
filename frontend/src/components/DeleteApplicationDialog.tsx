import { BACKEND_PATH } from '@/config/url';
import type { Application } from '@/types/Application';
import { Button, CloseButton, Dialog, Portal, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

interface DeleteApplicationDialogProps {
	application: Application;
}

export default function DeleteApplicationDialog({
	application,
}: DeleteApplicationDialogProps) {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const handleDelete = async () => {
		try {
			setIsLoading(true);

			const response = await fetch(
				`${BACKEND_PATH}/applications/${application.id}`,
				{
					method: 'DELETE',
					credentials: 'include',
				},
			);

			if (!response.ok) {
				throw new Error('Failed to delete application');
			}

			navigate('/applications', {
				replace: true,
			});
		} catch (error) {
			console.error('Failed to delete application:', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>
				<Button colorPalette="red" variant="outline">
					Delete Application
				</Button>
			</Dialog.Trigger>

			<Portal>
				<Dialog.Backdrop />

				<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>Delete Application?</Dialog.Title>
						</Dialog.Header>

						<Dialog.Body>
							<Text>
								Are you sure you want to delete your application for{' '}
								<strong>{application.position}</strong> at{' '}
								<strong>{application.company}</strong>?
							</Text>

							<Text mt="3" color="fg.muted" fontSize="sm">
								This action cannot be undone.
							</Text>
						</Dialog.Body>

						<Dialog.Footer>
							<Dialog.ActionTrigger asChild>
								<Button variant="outline">Cancel</Button>
							</Dialog.ActionTrigger>

							<Button
								colorPalette="red"
								onClick={handleDelete}
								loading={isLoading}
							>
								Delete Application
							</Button>
						</Dialog.Footer>

						<Dialog.CloseTrigger asChild>
							<CloseButton size="sm" />
						</Dialog.CloseTrigger>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
}
