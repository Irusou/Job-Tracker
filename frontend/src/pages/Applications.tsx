import { useLoaderData } from 'react-router';
import type { Application } from '../types/Application';
import { Table } from '@chakra-ui/react';

export default function Applications() {
	const applications = useLoaderData<Application[]>();

	if (!applications || !applications.length)
		<p>No applications at this moment</p>;

	return (
		<>
			<Table.Root size="sm">
				<Table.Header>
					<Table.Row>
						<Table.ColumnHeader>Position</Table.ColumnHeader>
						<Table.ColumnHeader>Status</Table.ColumnHeader>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{applications.map(a => (
						<Table.Row key={a.id}>
							<Table.Cell>{a.position}</Table.Cell>
							<Table.Cell>{a.status}</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
			<ul></ul>
		</>
	);
}
