'use client';

import { login, LoginFormState } from '@/app/actions/auth/login';
import { useActionState, useEffect, useState } from 'react';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useFormValidation } from '@/hooks/useFormValidation';
import { cn } from '@/lib/utils';

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
		<Card className="w-full max-w-sm gap-8 pt-8">
			<CardHeader className="grid-rows-[auto]">
				<CardTitle className="text-center font-jost text-2xl font-medium">
					Вход
				</CardTitle>
			</CardHeader>
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
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<Label htmlFor="email">Email</Label>
							<div>
								<Input
									className={cn({
										'border-destructive': fieldErrors.email,
									})}
									id="email"
									type="email"
									name="email"
									placeholder="example@mail.com"
									autoComplete="email"
									required
									disabled={isPending}
									autoFocus
									maxLength={254}
									pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
									title="Введите корректный email адрес"
									aria-errormessage="email-error"
									onBlur={handleBlur}
									onChange={handleChange}
								/>
							</div>
							{fieldErrors.email && (
								<p id="email-error" className="text-sm text-destructive">
									{fieldErrors.email}
								</p>
							)}
						</div>

						<div className="flex flex-col gap-2">
							<div className="flex items-center justify-between">
								<Label htmlFor="password">Пароль</Label>
								<Link
									href="/auth/reset-password"
									className="text-sm underline-offset-4 hover:underline"
								>
									Забыли пароль?
								</Link>
							</div>
							<div className="relative">
								<Input
									className={cn({
										'border-destructive': fieldErrors.password,
									})}
									id="password"
									type={showPassword ? 'text' : 'password'}
									name="password"
									placeholder="••••••••"
									required
									disabled={isPending}
									minLength={8}
									maxLength={128}
									aria-errormessage="password-error"
									onBlur={handleBlur}
									onChange={handleChange}
								/>
								<Button
									type="button"
									variant="ghost"
									size="sm"
									className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
									onClick={() => setShowPassword(!showPassword)}
									disabled={isPending}
								>
									{showPassword ? <EyeOffIcon /> : <EyeIcon />}
								</Button>
							</div>
							{fieldErrors.password && (
								<p id="password-error" className="text-sm text-destructive">
									{fieldErrors.password}
								</p>
							)}
						</div>
						{state.error && (
							<p className="text-sm text-destructive" role="alert">
								{state.error}
							</p>
						)}
					</div>
				</form>
			</CardContent>
			<CardFooter className="flex flex-col gap-3">
				<Button
					type="submit"
					form="login-form"
					className="w-full"
					disabled={isPending}
				>
					{isPending ? 'Вход...' : 'Войти'}
				</Button>
				<Link
					href="/auth/sign-up"
					className="text-sm text-primary-dark underline-offset-4 hover:underline"
				>
					Зарегистрироваться
				</Link>
			</CardFooter>
		</Card>
	);
}
