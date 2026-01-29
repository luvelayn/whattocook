'use client';

import { signUp, SignUpFormState } from '@/app/actions/auth/sign-up';
import { ChangeEvent, FormEvent, useActionState, useState } from 'react';
import { useFormValidation } from '@/hooks/useFormValidation';
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
	error: '',
};

export function SignUpForm() {
	const [state, formAction, isPending] = useActionState(signUp, initialState);
	const [showPassword, setShowPassword] = useState(false);
	const { fieldErrors, handleBlur, handleChange, handleSubmit } =
		useFormValidation();

	const [formValues, setFormValues] = useState({
		email: '',
		name: '',
		password: '',
		confirmPassword: '',
	});

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		// Обновляем локальное состояние
		setFormValues((prev) => ({
			...prev,
			[name === 'confirm-password' ? 'confirmPassword' : name]: value,
		}));

		handleChange(e);
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		handleSubmit(event, () => {});
	};

	return (
		<Card className="w-full max-w-sm gap-8 pt-8">
			<CardHeader className="grid-rows-[auto]">
				<CardTitle className="text-center font-jost text-2xl font-medium">
					Регистрация
				</CardTitle>
			</CardHeader>
			<CardContent>
				<form
					id="sign-up-form"
					onSubmit={onSubmit}
					action={formAction}
					onKeyDown={(e) => {
						if (e.key === 'Enter' && !isPending) {
							e.currentTarget.requestSubmit();
						}
					}}
					noValidate
				>
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<Label htmlFor="email">Email</Label>
							<div>
								<Input
									id="email"
									type="email"
									name="email"
									value={formValues.email}
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
									onChange={onChange}
								/>
							</div>
							{fieldErrors.email && (
								<p id="email-error" className="text-sm text-destructive">
									{fieldErrors.email}
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
									value={formValues.name}
									placeholder="Пётр"
									required
									disabled={isPending}
									minLength={2}
									maxLength={30}
									aria-errormessage="name-error"
									onBlur={handleBlur}
									onChange={onChange}
								/>
							</div>
							{fieldErrors.name && (
								<p id="name-error" className="text-sm text-destructive">
									{fieldErrors.name}
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
									value={formValues.password}
									placeholder="••••••••"
									required
									disabled={isPending}
									minLength={8}
									maxLength={128}
									pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}"
									title="Пароль должен быть длиной от 8 до 128 символов, включать как минимум одну цифру, одну букву в нижнем и одну букву в верхнем регистре"
									aria-errormessage="password-error"
									onBlur={handleBlur}
									onChange={onChange}
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

						<div className="flex flex-col gap-2">
							<Label htmlFor="confirm-password">Подтвердите пароль</Label>
							<div>
								<Input
									id="confirm-password"
									type="password"
									name="confirm-password"
									value={formValues.confirmPassword}
									placeholder="••••••••"
									required
									disabled={isPending}
									minLength={8}
									maxLength={128}
									aria-errormessage="confirm-password-error"
									onBlur={handleBlur}
									onChange={onChange}
								/>
							</div>
							{fieldErrors['confirm-password'] && (
								<p
									id="confirm-password-error"
									className="text-sm text-destructive"
								>
									{fieldErrors['confirm-password']}
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
					form="sign-up-form"
					className="w-full"
					disabled={isPending}
				>
					{isPending ? 'Регистрация...' : 'Зарегистрироваться'}
				</Button>
				<Link
					href="/auth/login"
					className="text-sm text-primary-dark underline-offset-4 hover:underline"
				>
					Войти
				</Link>
			</CardFooter>
		</Card>
	);
}
