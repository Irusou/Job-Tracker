import { Link, useLoaderData } from 'react-router';
import type { Application } from '../types/Application';

export default function Applications() {
	const applications = useLoaderData<Application[]>();

	if (!applications || !applications.length)
		<p>No applications at this moment</p>;

	return (
		<>
			{applications.map(a => (
				<div key={a.id}>
					<Link to={`${a.id}`} className="flex align-middle gap-2">
						<div>{a.position}</div>
						<div>{a.status}</div>
					</Link>
				</div>
			))}
		</>
	);
}
