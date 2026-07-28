import { BACKEND_PATH } from '@/config/url';
import type { Application } from '@/types/Application';
import {
	Button,
	CloseButton,
	Dialog,
	Field,
	Input,
	NativeSelect,
	Portal,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useRevalidator } from 'react-router';

type ApplicationStatus = Application['status'];

const statuses: {
	value: ApplicationStatus;
	label: string;
}[] = [
	{
		value: 'APPLIED',
		label: 'Applied',
	},
	{
		value: 'REJECTED',
		label: 'Rejected',
	},
	{
		value: 'GHOSTED',
		label: 'Ghosted',
	},
	{
		value: 'WAITFORREPLY',
		label: 'Waiting for Reply',
	},
	{
		value: 'NOANSWER',
		label: 'No Answer',
	},
	{
		value: 'ACCEPTED',
		label: 'Accepted',
	},
	{
		value: 'INTERVIEWING',
		label: 'Interviewing',
	},
];

interface EditApplicationDialogProps {
	application: Application;
}

export default function EditApplicationDialog({
	application,
}: EditApplicationDialogProps) {
	const revalidator = useRevalidator();

	const [status, setStatus] = useState<ApplicationStatus>(application.status);

	const [lastReply, setLastReply] = useState(
		application.lastReply
			? application.lastReply.toISOString().split('T')[0]
			: '',
	);

	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async () => {
		try {
			setIsLoading(true);

			const response = await fetch(
				`${BACKEND_PATH}/applications/${application.id}`,
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
					},
					credentials: 'include',
					body: JSON.stringify({
						status,
						lastReply: lastReply ? new Date(lastReply).toISOString() : null,
					}),
				},
			);

			if (!response.ok) {
				throw new Error('Failed to update application');
			}

			revalidator.revalidate();
		} catch (error) {
			console.error('Failed to update application:', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>
				<Button>Edit Application</Button>
			</Dialog.Trigger>

			<Portal>
				<Dialog.Backdrop />

				<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>Update Application</Dialog.Title>
						</Dialog.Header>

						<Dialog.Body>
							<Field.Root mb="5">
								<Field.Label>Status</Field.Label>

								<NativeSelect.Root>
									<NativeSelect.Field
										value={status}
										onChange={e =>
											setStatus(e.target.value as ApplicationStatus)
										}
									>
										{statuses.map(status => (
											<option key={status.value} value={status.value}>
												{status.label}
											</option>
										))}
									</NativeSelect.Field>
								</NativeSelect.Root>
							</Field.Root>

							<Field.Root>
								<Field.Label>Last Reply</Field.Label>

								<Input
									type="date"
									value={lastReply}
									onChange={e => setLastReply(e.target.value)}
								/>
							</Field.Root>
						</Dialog.Body>

						<Dialog.Footer>
							<Dialog.ActionTrigger asChild>
								<Button variant="outline">Cancel</Button>
							</Dialog.ActionTrigger>

							<Button onClick={handleSubmit} loading={isLoading}>
								Save Changes
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
