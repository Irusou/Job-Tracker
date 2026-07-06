export type ApplicationLocation = 'REMOTE' | 'ONSITE' | 'HYBRID';

export type ApplicationStatus =
	| 'APPLIED'
	| 'REJECTED'
	| 'GHOSTED'
	| 'WAITFORREPLY'
	| 'NOANSWER'
	| 'ACCEPTED'
	| 'INTERVIEWING';

export type Application = {
	id: string;
	position: string;
	company: string;
	location: ApplicationLocation;
	hours: string;
	salary: number;
	appliedAt: Date;
	lastReply: Date | null;
	status: ApplicationStatus;
	userId: string;
};
