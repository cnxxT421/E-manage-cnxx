export const validateDate = (startDate?: Date, endDate?: Date) => {
	const now = new Date();

	// Check if startDate is provided and in the past
	if (startDate && startDate.getTime() < now.getTime()) {
		return { valid: false, message: "Start date cannot be in the past" };
	}

	// Check if endDate is provided and in the past
	if (endDate && endDate.getTime() < now.getTime()) {
		return { valid: false, message: "End date cannot be in the past" };
	}

	// Ensure startDate is before endDate
	if (startDate && endDate && startDate.getTime() > endDate.getTime()) {
		return { valid: false, message: "Start date must be before end date" };
	}

	// If all checks pass, return valid
	return { valid: true };
};
