import type { Application } from '@/types/Application';

export const statusConfig: Record<
	Application['status'],
	{
		label: string;
		colorPalette: string;
	}
> = {
	APPLIED: {
		label: 'Applied',
		colorPalette: 'blue',
	},
	REJECTED: {
		label: 'Rejected',
		colorPalette: 'red',
	},
	GHOSTED: {
		label: 'Ghosted',
		colorPalette: 'purple',
	},
	WAITFORREPLY: {
		label: 'Waiting for Reply',
		colorPalette: 'yellow',
	},
	NOANSWER: {
		label: 'No Answer',
		colorPalette: 'orange',
	},
	ACCEPTED: {
		label: 'Accepted',
		colorPalette: 'green',
	},
	INTERVIEWING: {
		label: 'Interviewing',
		colorPalette: 'teal',
	},
};
