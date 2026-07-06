import type { Application } from '../types/Application';

const URL = 'http://localhost:3000/api/v1/applications';

export async function getAllApplications(): Promise<Application[]> {
	try {
		const response = await fetch(`${URL}`, {
			credentials: 'include',
		});

		if (!response.ok) {
			throw 'Failed to get applications';
		}

		const applications = await response.json();

		return applications.data as Application[];
	} catch (error) {
		console.log(error);
		return [];
	}
}
