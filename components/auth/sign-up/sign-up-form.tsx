'use client';

import { signUp } from '@/app/actions/auth/sign-up';
import { ChangeEvent, FocusEvent, useActionState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { AvatarField } from '@/components/auth/sign-up/avatar-field';
import { useImageUpload } from '@/hooks/useImageUpload';
import { EmailField } from '@/components/auth/form-fields/email-field';
import { PasswordField } from '@/components/auth/form-fields/password-field';
import { FormError } from '@/components/forms/form-error';
import { NameField } from '@/components/auth/form-fields/name-field';
import { FormCard } from '@/components/forms/form-card';
import { useFormValidation } from '@/hooks/useFormValidation';
import { FormState } from '@/types/forms';

const initialState: FormState = {
	error: '',
};

export function SignUpForm() {
	const [state, formAction, isPending] = useActionState(signUp, initialState);
	const avatar = useImageUpload();
	const {
		fieldErrors,
		validateField,
		clearFieldError,
		handleBlur,
		handleChange,
		handleSubmit,
	} = useFormValidation({
		'confirm-password': {
			validate: (value, form) => {
				const password = (
					form.elements.namedItem('password') as HTMLInputElement
				)?.value;
				return value !== password ? 'Пароли не совпадают' : null;
			},
		},
	});

	const onBlur = (event: FocusEvent<HTMLInputElement>) => {
		const { target } = event;

		if (target.name === 'password' && target.form) {
			const confirmPasswordField = target.form.elements.namedItem(
				'confirm-password'
			) as HTMLInputElement;

			if (confirmPasswordField && confirmPasswordField.value) {
				validateField(confirmPasswordField);
			}
		}

		handleBlur(event);
	};

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { target } = event;

		if (target.name === 'password' && fieldErrors['confirm-password']) {
			clearFieldError('confirm-password');
		}

		handleChange(event);
	};

	return (
		<FormCard
			formId="sign-up-form"
			isPending={isPending}
			onSubmit={handleSubmit}
			action={formAction}
			footer={
				<>
					<Button
						type="submit"
						form="sign-up-form"
						className="w-full"
						disabled={isPending}
						size="lg"
					>
						{isPending ? 'Создание аккаунта...' : 'Зарегистрироваться'}
					</Button>
					<p className="text-center text-sm text-muted-foreground">
						Уже есть аккаунт?{' '}
						<Link
							href="/login"
							className="font-medium text-primary underline-offset-4 hover:underline"
						>
							Войти
						</Link>
					</p>
				</>
			}
		>
			<FieldGroup className="gap-5">
				<AvatarField {...avatar} disabled={isPending} />
				<EmailField
					error={fieldErrors.email}
					disabled={isPending}
					onBlur={handleBlur}
					onChange={handleChange}
				/>
				<NameField
					error={fieldErrors.name}
					disabled={isPending}
					onBlur={handleBlur}
					onChange={handleChange}
				/>
				<PasswordField
					withStrengthRules
					error={fieldErrors.password}
					disabled={isPending}
					onBlur={onBlur}
					onChange={onChange}
				/>
				<PasswordField
					id="confirm-password"
					name="confirm-password"
					label="Подтвердите пароль"
					error={fieldErrors['confirm-password']}
					disabled={isPending}
					onBlur={handleBlur}
					onChange={handleChange}
				/>
				<FormError message={state.error} />
			</FieldGroup>
		</FormCard>
	);
}
