export type ValidationError = {
	field: string;
	message: string;
};

export interface SignUpFormInput {
	email: string;
	password: string;
	confirmPassword: string;
	name: string;
}

export function validateSignUp(data: SignUpFormInput): ValidationError[] {
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
	} else if (data.email.length > 254) {
		errors.push({
			field: 'email',
			message: 'Email не должен превышать 254 символа',
		});
	}

	if (!data.password) {
		errors.push({
			field: 'password',
			message: 'Пароль обязателен для заполнения',
		});
	} else {
		const passwordValidation = validatePassword(data.password);
		errors.push(...passwordValidation);
	}

	if (!data.confirmPassword) {
		errors.push({
			field: 'confirmPassword',
			message: 'Подтверждение пароля обязательно',
		});
	} else if (data.password !== data.confirmPassword) {
		errors.push({
			field: 'confirmPassword',
			message: 'Пароли не совпадают',
		});
	}

	if (!data.name) {
		errors.push({
			field: 'name',
			message: 'Имя обязательно для заполнения',
		});
	} else if (data.name.length < 2) {
		errors.push({
			field: 'name',
			message: 'Имя должно содержать минимум 2 символа',
		});
	} else if (data.name.length > 30) {
		errors.push({
			field: 'name',
			message: 'Имя не должно превышать 30 символов',
		});
	}

	return errors;
}

function validatePassword(password: string): ValidationError[] {
	const errors: ValidationError[] = [];

	if (password.length < 8) {
		errors.push({
			field: 'password',
			message: 'Пароль должен содержать минимум 8 символов',
		});
	}

	if (password.length > 128) {
		errors.push({
			field: 'password',
			message: 'Пароль не должен превышать 128 символов',
		});
	}

	if (!/[A-Z]/.test(password)) {
		errors.push({
			field: 'password',
			message: 'Пароль должен содержать хотя бы одну заглавную букву',
		});
	}

	if (!/[a-z]/.test(password)) {
		errors.push({
			field: 'password',
			message: 'Пароль должен содержать хотя бы одну строчную букву',
		});
	}

	if (!/\d/.test(password)) {
		errors.push({
			field: 'password',
			message: 'Пароль должен содержать хотя бы одну цифру',
		});
	}

	if (!/[@$!%*?&]/.test(password)) {
		errors.push({
			field: 'password',
			message:
				'Пароль должен содержать хотя бы один специальный символ (@$!%*?&)',
		});
	}

	return errors;
}

function isValidEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

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
