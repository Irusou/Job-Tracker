import { BACKEND_PATH } from '@/config/url';
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

type ApplicationLocation = 'REMOTE' | 'ONSITE' | 'HYBRID';

type ApplicationStatus =
	| 'APPLIED'
	| 'REJECTED'
	| 'GHOSTED'
	| 'WAITFORREPLY'
	| 'NOANSWER'
	| 'ACCEPTED'
	| 'INTERVIEWING';

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

export default function CreateApplicationDialog() {
	const revalidator = useRevalidator();

	const [position, setPosition] = useState('');
	const [company, setCompany] = useState('');
	const [location, setLocation] = useState<ApplicationLocation>('REMOTE');
	const [hours, setHours] = useState('');
	const [salary, setSalary] = useState('');
	const [appliedAt, setAppliedAt] = useState('');
	const [status, setStatus] = useState<ApplicationStatus>('APPLIED');
	const [lastReply, setLastReply] = useState('');

	const [isLoading, setIsLoading] = useState(false);

	const resetForm = () => {
		setPosition('');
		setCompany('');
		setLocation('REMOTE');
		setHours('');
		setSalary('');
		setAppliedAt('');
		setStatus('APPLIED');
		setLastReply('');
	};

	const handleSubmit = async () => {
		try {
			setIsLoading(true);

			const response = await fetch(`${BACKEND_PATH}/applications`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify({
					position,
					company,
					location,
					hours,
					salary: Number(salary),
					appliedAt: new Date(appliedAt).toISOString(),
					status,
					lastReply: lastReply ? new Date(lastReply).toISOString() : null,
				}),
			});

			if (!response.ok) {
				throw new Error('Failed to create application');
			}

			resetForm();

			revalidator.revalidate();
		} catch (error) {
			console.error('Failed to create application:', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>
				<Button colorPalette="blue">+ Add Application</Button>
			</Dialog.Trigger>

			<Portal>
				<Dialog.Backdrop />

				<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>Add Application</Dialog.Title>
						</Dialog.Header>

						<Dialog.Body>
							<Field.Root mb="4" required>
								<Field.Label>Position</Field.Label>

								<Input
									placeholder="e.g. React Developer"
									value={position}
									onChange={e => setPosition(e.target.value)}
								/>
							</Field.Root>

							<Field.Root mb="4" required>
								<Field.Label>Company</Field.Label>

								<Input
									placeholder="e.g. Acme"
									value={company}
									onChange={e => setCompany(e.target.value)}
								/>
							</Field.Root>

							<Field.Root mb="4" required>
								<Field.Label>Location</Field.Label>

								<NativeSelect.Root>
									<NativeSelect.Field
										value={location}
										onChange={e =>
											setLocation(e.target.value as ApplicationLocation)
										}
									>
										<option value="REMOTE">Remote</option>

										<option value="HYBRID">Hybrid</option>

										<option value="ONSITE">On-site</option>
									</NativeSelect.Field>
								</NativeSelect.Root>
							</Field.Root>

							<Field.Root mb="4">
								<Field.Label>Working Hours</Field.Label>

								<Input
									placeholder="e.g. Full time"
									value={hours}
									onChange={e => setHours(e.target.value)}
								/>
							</Field.Root>

							<Field.Root mb="4">
								<Field.Label>Salary</Field.Label>

								<Input
									type="number"
									placeholder="e.g. 1600"
									value={salary}
									onChange={e => setSalary(e.target.value)}
								/>
							</Field.Root>

							<Field.Root mb="4" required>
								<Field.Label>Applied At</Field.Label>

								<Input
									type="date"
									value={appliedAt}
									onChange={e => setAppliedAt(e.target.value)}
								/>
							</Field.Root>

							<Field.Root mb="4">
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

							<Button
								colorPalette="blue"
								onClick={handleSubmit}
								loading={isLoading}
								disabled={!position || !company || !appliedAt}
							>
								Create Application
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
