import { ValidationError } from '@/lib/utils/validation/types';

export function formatErrors(errors: ValidationError[]) {
	const formattedErrors: Record<string, string[]> = {};

	errors.forEach((error) => {
		if (!formattedErrors[error.field]) {
			formattedErrors[error.field] = [];
		}
		formattedErrors[error.field].push(error.message);
	});

	return formattedErrors;
}
