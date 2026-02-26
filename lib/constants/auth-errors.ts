export const AUTH_ERROR_CODES = {
	INVALID_CREDENTIALS: 'invalid_credentials',
	EMAIL_NOT_CONFIRMED: 'email_not_confirmed',
	USER_ALREADY_EXISTS: 'user_already_exists',
	WEAK_PASSWORD: 'weak_password',
	OVER_REQUEST_RATE_LIMIT: 'over_request_rate_limit',
} as const;

export const AUTH_ERROR_MESSAGES: Record<string, string> = {
	[AUTH_ERROR_CODES.INVALID_CREDENTIALS]: 'Неверный email или пароль',
	[AUTH_ERROR_CODES.EMAIL_NOT_CONFIRMED]:
		'Email не подтверждён. Проверьте вашу почту',
	[AUTH_ERROR_CODES.USER_ALREADY_EXISTS]:
		'Пользователь с таким email уже зарегистрирован',
	[AUTH_ERROR_CODES.WEAK_PASSWORD]: 'Пароль слишком простой',
	[AUTH_ERROR_CODES.OVER_REQUEST_RATE_LIMIT]:
		'Слишком много попыток. Попробуйте позже',
} as const;

export const FALLBACK_ERROR = 'Произошла непредвиденная ошибка';
