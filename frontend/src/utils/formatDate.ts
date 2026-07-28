export const formatDate = (date: Date | null) => {
	if (!date) {
		return 'No reply yet';
	}

	return new Intl.DateTimeFormat('pt-PT', {
		dateStyle: 'medium',
	}).format(date);
};
