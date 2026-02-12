'use client';

import { login, LoginFormState } from '@/app/actions/auth/login';
import { useActionState, useEffect, useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useFormValidation } from '@/hooks/useFormValidation';
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from '@/components/ui/input-group';

const initialState: LoginFormState = {
	error: '',
};

export function LoginForm() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const redirectTo = searchParams.get('redirect') || '/';

	const [state, formAction, isPending] = useActionState(login, initialState);
	const [showPassword, setShowPassword] = useState(false);
	const { fieldErrors, handleBlur, handleChange, handleSubmit } =
		useFormValidation();

	useEffect(() => {
		if (!state.error && state.redirect) {
			router.push(redirectTo);
		}
	}, [redirectTo, router, state]);

	return (
		<Card className="border-border/40 py-10 shadow-lg">
			<CardContent>
				<form
					id="login-form"
					onSubmit={handleSubmit}
					action={formAction}
					onKeyDown={(e) => {
						if (e.key === 'Enter' && !isPending) {
							e.currentTarget.requestSubmit();
						}
					}}
					noValidate
				>
					<Input type="hidden" name="redirect" value={redirectTo} />
					<FieldGroup className="gap-5">
						{/* Email */}
						<Field className="gap-2">
							<FieldLabel htmlFor="email">
								Email <span className="text-destructive">*</span>
							</FieldLabel>
							<Input
								id="email"
								type="email"
								name="email"
								placeholder="example@mail.com"
								autoComplete="email"
								required
								disabled={isPending}
								maxLength={254}
								pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
								title="Введите корректный email адрес"
								aria-errormessage="email-error"
								onBlur={handleBlur}
								onChange={handleChange}
							/>
							<FieldError>{fieldErrors.email}</FieldError>
						</Field>

						{/* Пароль */}
						<Field className="gap-2">
							<div className="flex items-center justify-between">
								<FieldLabel htmlFor="password">
									Пароль <span className="text-destructive">*</span>
								</FieldLabel>
								<Link
									href="/reset-password"
									className="text-sm underline-offset-4 hover:underline"
								>
									Забыли пароль?
								</Link>
							</div>
							<InputGroup>
								<InputGroupInput
									id="password"
									type={showPassword ? 'text' : 'password'}
									name="password"
									placeholder="•••••••••••••"
									autoComplete="new-password"
									required
									disabled={isPending}
									minLength={8}
									maxLength={128}
									aria-errormessage="password-error"
									onBlur={handleBlur}
									onChange={handleChange}
								/>
								<InputGroupAddon align="inline-end">
									<InputGroupButton
										aria-label={
											showPassword ? 'Скрыть пароль' : 'Показать пароль'
										}
										size="icon-xs"
										onClick={() => setShowPassword(!showPassword)}
										disabled={isPending}
									>
										{showPassword ? <EyeOffIcon /> : <EyeIcon />}
									</InputGroupButton>
								</InputGroupAddon>
							</InputGroup>
							<FieldError>{fieldErrors.password}</FieldError>
						</Field>

						{/* Общая ошибка */}
						{state.error && (
							<div className="rounded-md border border-destructive/50 bg-destructive/10 p-3">
								<p className="text-sm text-destructive" role="alert">
									{state.error}
								</p>
							</div>
						)}
					</FieldGroup>
				</form>
			</CardContent>
			<CardFooter className="flex flex-col gap-4">
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
						tabIndex={isPending ? -1 : 0}
					>
						Зарегистрироваться
					</Link>
				</p>
			</CardFooter>
		</Card>
	);
}
