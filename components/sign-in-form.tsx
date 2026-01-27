'use client';

import { signIn, SignInFormState } from '@/app/actions/auth/sign-in';
import { useActionState, useEffect } from 'react';
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

const initialState: SignInFormState = {
	errors: {},
};

export function SignInForm() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const redirectTo = searchParams.get('redirect') || '/';

	const [state, formAction, isPending] = useActionState(signIn, initialState);

	useEffect(() => {
		if (!state.errors && state?.redirect) {
			router.push(redirectTo);
		}
	}, [redirectTo, router, state]);

	return (
		<Card className="w-full max-w-sm">
			<CardHeader>
				<CardTitle className="ml-auto mr-auto">
					<h2>Вход</h2>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<form id="sign-in-form" action={formAction}>
					<div className="flex flex-col gap-4">
						<Input type="hidden" name="redirect" value={redirectTo} />
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								name="email"
								placeholder="you@example.com"
								autoComplete="email"
								required
								disabled={isPending}
							/>
							{state.errors.email && (
								<p className="text-sm text-destructive">
									{state.errors.email[0]}
								</p>
							)}
						</div>
						<div className="grid gap-2">
							<div className="flex items-center justify-between">
								<Label htmlFor="password">Пароль</Label>
								{/* TODO добавить ссылку на страницу восстановления пароля */}
								<Link
									href="/"
									className="text-sm underline-offset-4 hover:underline"
								>
									Забыли пароль?
								</Link>
							</div>
							<Input
								id="password"
								type="password"
								name="password"
								placeholder="••••••••"
								required
								disabled={isPending}
							/>
							{state.errors.password && (
								<p className="text-sm text-destructive">
									{state.errors.password[0]}
								</p>
							)}
						</div>
						<div className="grid gap-2">
							{state.errors.general && (
								<p className="text-sm text-destructive">
									{state.errors.general}
								</p>
							)}
						</div>
					</div>
				</form>
			</CardContent>
			<CardFooter className="flex flex-col gap-3">
				<Button
					type="submit"
					form="sign-in-form"
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
