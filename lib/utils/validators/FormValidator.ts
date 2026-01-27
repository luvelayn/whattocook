import { SignInFormInput, ValidationError } from './types';
import { validateSignInForm } from './validateSignInForm';

export class FormValidator {
	static validateSignIn(data: SignInFormInput): ValidationError[] {
		return validateSignInForm(data);
	}

	static formatErrors(errors: ValidationError[]) {
		const formattedErrors: Record<string, string[]> = {};

		errors.forEach((error) => {
			if (!formattedErrors[error.field]) {
				formattedErrors[error.field] = [];
			}
			formattedErrors[error.field].push(error.message);
		});

		return formattedErrors;
	}
}
