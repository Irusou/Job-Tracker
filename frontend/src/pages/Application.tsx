import { useLoaderData } from 'react-router';
import type { Application } from '../types/Application';

export default function Application() {
	let application = useLoaderData<Application>();

	if (!application) <p>Application not found</p>;

	return <div>{JSON.stringify(application)}</div>;
}
