'use client';

import { login } from '@/app/actions/auth/login';
import { useActionState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useFormValidation } from '@/hooks/useFormValidation';
import { FieldGroup } from '@/components/ui/field';
import { EmailField } from '@/components/forms/email-field';
import { PasswordField } from '@/components/forms/password-field';
import { FormError } from '@/components/forms/form-error';
import { AuthFormCard } from '@/components/forms/auth-form-card';
import { FormStateWithRedirect } from '@/types/forms';

const initialState: FormStateWithRedirect = {
	error: '',
};

export function LoginForm() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const redirectTo = searchParams.get('redirect') || '/';
	const [state, formAction, isPending] = useActionState(login, initialState);
	const { fieldErrors, handleBlur, handleChange, handleSubmit } =
		useFormValidation();

	useEffect(() => {
		if (!state.error && state.redirect) router.push(redirectTo);
	}, [redirectTo, router, state]);

	return (
		<AuthFormCard
			formId="login-form"
			isPending={isPending}
			onSubmit={handleSubmit}
			action={formAction}
			footer={
				<>
					<Button
						type="submit"
						form="login-form"
						className="w-full"
						disabled={isPending}
						size="lg"
					>
						{isPending ? 'Вход...' : 'Войти'}
					</Button>
					<p className="text-center text-sm text-muted-foreground">
						Нет аккаунта?{' '}
						<Link
							href="/sign-up"
							className="font-medium text-primary underline-offset-4 hover:underline"
						>
							Зарегистрироваться
						</Link>
					</p>
				</>
			}
		>
			<Input type="hidden" name="redirect" value={redirectTo} />
			<FieldGroup className="gap-5">
				<EmailField
					error={fieldErrors.email}
					disabled={isPending}
					onBlur={handleBlur}
					onChange={handleChange}
				/>
				<PasswordField
					error={fieldErrors.password}
					disabled={isPending}
					onBlur={handleBlur}
					onChange={handleChange}
					addon={
						<Link
							href="/reset-password"
							className="text-sm underline-offset-4 hover:underline"
						>
							Забыли пароль?
						</Link>
					}
				/>
				<FormError message={state.error} />
			</FieldGroup>
		</AuthFormCard>
	);
}
