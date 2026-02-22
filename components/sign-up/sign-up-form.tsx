'use client';

import { signUp } from '@/app/actions/auth/sign-up';
import { useActionState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { AvatarField } from '@/components/sign-up/avatar-field';
import { useAvatarUpload } from '@/hooks/useAvatarUpload';
import { EmailField } from '@/components/forms/email-field';
import { PasswordField } from '@/components/forms/password-field';
import { FormError } from '@/components/forms/form-error';
import { NameField } from '@/components/forms/name-field';
import { AuthFormCard } from '@/components/forms/auth-form-card';
import { useFormValidation } from '@/hooks/useFormValidation';
import { FormState } from '@/types/forms';

const initialState: FormState = {
	error: '',
};

export function SignUpForm() {
	const [state, formAction, isPending] = useActionState(signUp, initialState);
	const avatar = useAvatarUpload();
	const { fieldErrors, handleBlur, handleChange, handleSubmit } =
		useFormValidation();

	return (
		<AuthFormCard
			formId="sign-up-form"
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
					onBlur={handleBlur}
					onChange={handleChange}
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
		</AuthFormCard>
	);
}
