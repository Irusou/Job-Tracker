import type { Application } from '../types/Application';

const URL = 'http://localhost:3000/api/v1/applications';

export const getApplicationById = async (
	applicationId: string,
): Promise<Application | null> => {
	try {
		const response = await fetch(`${URL}/${applicationId}`, {
			credentials: 'include',
		});

		if (!response.ok) {
			throw 'Failed to get application';
		}

		const application = await response.json();

		return {
			...application.data,
			appliedAt: new Date(application.data.appliedAt),
			lastReply: application.data.lastReply
				? new Date(application.data.lastReply)
				: null,
		};
	} catch (error) {
		console.log(error);
		return null;
	}
};
