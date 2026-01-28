'use client';

import { signIn, SignInFormState } from '@/app/actions/auth/sign-in';
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

const initialState: SignInFormState = {
	error: null,
};

export function SignInForm() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const redirectTo = searchParams.get('redirect') || '/';

	const [state, formAction, isPending] = useActionState(signIn, initialState);
	const [showPassword, setShowPassword] = useState(false);

	useEffect(() => {
		if (!state.error && state.redirect) {
			router.push(redirectTo);
		}
	}, [redirectTo, router, state]);

	return (
		<Card className="w-full max-w-sm gap-8">
			<CardHeader className="grid-rows-[auto]">
				<CardTitle className="text-center font-jost text-2xl font-medium">
					Вход
				</CardTitle>
			</CardHeader>
			<CardContent>
				<form
					id="sign-in-form"
					action={formAction}
					onKeyDown={(e) => {
						if (e.key === 'Enter' && !isPending) {
							e.currentTarget.requestSubmit();
						}
					}}
				>
					<Input type="hidden" name="redirect" value={redirectTo} />
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<Label htmlFor="email">Email</Label>
							<div>
								<Input
									id="email"
									type="email"
									name="email"
									placeholder="you@example.com"
									autoComplete="email"
									required
									disabled={isPending}
									autoFocus
									maxLength={254}
								/>
							</div>
						</div>
						<div className="flex flex-col gap-2">
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
							<div className="relative">
								<Input
									id="password"
									type={showPassword ? 'text' : 'password'}
									name="password"
									placeholder="••••••••"
									required
									disabled={isPending}
									minLength={8}
									maxLength={128}
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
