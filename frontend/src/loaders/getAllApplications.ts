import { BACKEND_PATH } from '@/config/url';
import type { Application } from '../types/Application';

export async function getAllApplications(): Promise<Application[]> {
	try {
		const response = await fetch(`${BACKEND_PATH}/applications`, {
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
