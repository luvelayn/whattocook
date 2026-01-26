import { SignInFormInput, ValidationError } from '@/lib/utils/validators/types';

export function validateSignInForm(data: SignInFormInput): ValidationError[] {
	const errors: ValidationError[] = [];

	if (!data.email) {
		errors.push({
			field: 'email',
			message: 'Email обязателен для заполнения',
		});
	} else if (!isValidEmail(data.email)) {
		errors.push({
			field: 'email',
			message: 'Введите корректный email адрес',
		});
	}

	if (!data.password) {
		errors.push({
			field: 'password',
			message: 'Пароль обязателен для заполнения',
		});
	} else if (data.password.length < 8) {
		errors.push({
			field: 'password',
			message: 'Пароль не может быть короче 8 символов',
		});
	}

	return errors;
}

function isValidEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}
