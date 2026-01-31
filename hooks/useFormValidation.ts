import { FocusEvent, FormEvent, useCallback, useState } from 'react';

type ValidationRule =
	| 'valueMissing'
	| 'patternMismatch'
	| 'tooShort'
	| 'tooLong';

type ErrorMessageGetter = (element: Partial<HTMLInputElement>) => string;

type FieldErrors = Record<string, string>;

type CustomValidator = (value: string, form: HTMLFormElement) => string | null;

type CustomValidationRules = Record<
	string,
	{
		validate: CustomValidator;
	}
>;

const errorMessages: Record<ValidationRule, ErrorMessageGetter> = {
	valueMissing: () => 'Пожалуйста, заполните это поле',
	patternMismatch: ({ title }) => title || 'Данные не соответствуют формату',
	tooShort: ({ minLength }) => `Минимальное количество символов — ${minLength}`,
	tooLong: ({ maxLength }) => `Максимальное количество символов — ${maxLength}`,
};

export function useFormValidation(customRules: CustomValidationRules = {}) {
	const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

	const validateField = useCallback(
		(element: HTMLInputElement): boolean => {
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

			if (!error && customRules[element.name] && element.form) {
				const customError = customRules[element.name].validate(
					element.value,
					element.form
				);
				if (customError) {
					error = customError;
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
		},
		[customRules]
	);

	const clearFieldError = (fieldName: string) => {
		setFieldErrors((prev) => {
			const newErrors = { ...prev };
			delete newErrors[fieldName];
			return newErrors;
		});
	};

	const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
		validateField(event.target);
	};

	const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
		const { target } = event;

		if (fieldErrors[target.name]) {
			clearFieldError(target.name);
		}
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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
		}
	};

	return {
		fieldErrors,
		validateField,
		clearFieldError,
		handleBlur,
		handleFocus,
		handleSubmit,
	};
}
