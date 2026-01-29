'use client';

import { signUp, SignUpFormState } from '@/app/actions/auth/sign-up';
import { useActionState, useState } from 'react';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

const initialState: SignUpFormState = {
	errors: {},
};

export function SignUpForm() {
	const [state, formAction, isPending] = useActionState(signUp, initialState);
	const [showPassword, setShowPassword] = useState(false);

	return (
		<Card className="w-full max-w-sm gap-8">
			<CardHeader className="grid-rows-[auto]">
				<CardTitle className="text-center font-jost text-2xl font-medium">
					Регистрация
				</CardTitle>
			</CardHeader>
			<CardContent>
				<form
					id="sign-up-form"
					action={formAction}
					onKeyDown={(e) => {
						if (e.key === 'Enter' && !isPending) {
							e.currentTarget.requestSubmit();
						}
					}}
				>
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<Label htmlFor="email">Email</Label>
							<div>
								<Input
									id="email"
									type="email"
									name="email"
									placeholder="example@mail.com"
									autoComplete="email"
									required
									disabled={isPending}
									autoFocus
									maxLength={254}
								/>
							</div>
							{state.errors.email && (
								<p className="text-sm text-destructive" role="alert">
									{state.errors.email[0]}
								</p>
							)}
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="name">Имя</Label>
							<div>
								<Input
									id="name"
									type="text"
									name="name"
									placeholder="Пётр"
									required
									disabled={isPending}
									minLength={2}
									maxLength={30}
								/>
							</div>
							{state.errors.name && (
								<p className="text-sm text-destructive" role="alert">
									{state.errors.name[0]}
								</p>
							)}
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="password">Пароль</Label>
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
							{state.errors.password && (
								<p className="text-sm text-destructive" role="alert">
									{state.errors.password[0]}
								</p>
							)}
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="confirm-password">Подтвердите пароль</Label>
							<div>
								<Input
									id="confirm-password"
									type="password"
									name="confirm-password"
									placeholder="••••••••"
									required
									disabled={isPending}
									minLength={8}
									maxLength={128}
								/>
							</div>
							{state.errors.confirmPassword && (
								<p className="text-sm text-destructive" role="alert">
									{state.errors.confirmPassword[0]}
								</p>
							)}
						</div>
						{state.errors.general && (
							<p className="text-sm text-destructive" role="alert">
								{state.errors.general}
							</p>
						)}
					</div>
				</form>
			</CardContent>
			<CardFooter className="flex flex-col gap-3">
				<Button
					type="submit"
					form="sign-up-form"
					className="w-full"
					disabled={isPending}
				>
					{isPending ? 'Регистрация...' : 'Зарегистрироваться'}
				</Button>
				<Link
					href="/auth/sign-in"
					className="text-sm text-primary-dark underline-offset-4 hover:underline"
				>
					Войти
				</Link>
			</CardFooter>
		</Card>
	);
}
