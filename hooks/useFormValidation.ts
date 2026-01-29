import {
	ChangeEvent,
	FocusEvent,
	FormEvent,
	useCallback,
	useState,
} from 'react';

type ValidationRule =
	| 'valueMissing'
	| 'patternMismatch'
	| 'tooShort'
	| 'tooLong';

type ErrorMessageGetter = (element: Partial<HTMLInputElement>) => string;

type FieldErrors = Record<string, string>;

const errorMessages: Record<ValidationRule, ErrorMessageGetter> = {
	valueMissing: () => 'Пожалуйста, заполните это поле',
	patternMismatch: ({ title }) => title || 'Данные не соответствуют формату',
	tooShort: ({ minLength }) => `Минимальное количество символов — ${minLength}`,
	tooLong: ({ maxLength }) => `Максимальное количество символов — ${maxLength}`,
};

export function useFormValidation() {
	const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

	const validateField = useCallback((element: HTMLInputElement): boolean => {
		if (!element.required && !element.value.trim()) {
			return true;
		}

		const validity = element.validity;
		let error = '';

		for (const errorType of Object.keys(errorMessages) as ValidationRule[]) {
			if (validity[errorType]) {
				error = errorMessages[errorType](element);
				break;
			}
		}

		if (!error && element.name === 'confirm-password') {
			const form = element.form;
			if (form) {
				const passwordField = form.elements.namedItem(
					'password'
				) as HTMLInputElement;
				if (passwordField && element.value !== passwordField.value) {
					error = 'Пароли не совпадают';
				}
			}
		}

		const isValid = !error;

		setFieldErrors((prev) => {
			const newErrors = { ...prev };

			if (error) {
				newErrors[element.name] = error;
			} else {
				delete newErrors[element.name];
			}

			return newErrors;
		});

		element.setAttribute('aria-invalid', String(!isValid));

		return isValid;
	}, []);

	const clearFieldError = useCallback((fieldName: string) => {
		setFieldErrors((prev) => {
			const newErrors = { ...prev };
			delete newErrors[fieldName];
			return newErrors;
		});
	}, []);

	const handleBlur = useCallback(
		(event: FocusEvent<HTMLInputElement>) => {
			const { target } = event;

			validateField(target);

			if (target.name === 'password' && target.form) {
				const confirmPasswordField = target.form.elements.namedItem(
					'confirm-password'
				) as HTMLInputElement;

				if (confirmPasswordField && confirmPasswordField.value) {
					validateField(confirmPasswordField);
				}
			}
		},
		[validateField]
	);

	const handleChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const { target } = event;

			if (fieldErrors[target.name]) {
				clearFieldError(target.name);
			}

			if (target.name === 'password' && fieldErrors['confirm-password']) {
				clearFieldError('confirm-password');
			}
		},
		[fieldErrors, clearFieldError]
	);

	const handleSubmit = useCallback(
		(event: FormEvent<HTMLFormElement>, onValid: () => void) => {
			const form = event.currentTarget;
			const formElements = Array.from(form.elements) as HTMLInputElement[];
			const elementsToValidate = formElements.filter((element) => element.name);

			let isFormValid = true;
			let firstInvalidField: HTMLInputElement | null = null;

			elementsToValidate.forEach((element) => {
				const isFieldValid = validateField(element);
				if (!isFieldValid) {
					isFormValid = false;
					if (!firstInvalidField) {
						firstInvalidField = element;
					}
				}
			});

			if (!isFormValid) {
				event.preventDefault();
				firstInvalidField!.focus();
			} else {
				onValid();
			}
		},
		[validateField]
	);

	return {
		fieldErrors,
		handleBlur,
		handleChange,
		handleSubmit,
	};
}
