'use client';

import { signUp, SignUpFormState } from '@/app/actions/auth/sign-up';
import { ChangeEvent, FocusEvent, useActionState, useState } from 'react';
import { useFormValidation } from '@/hooks/useFormValidation';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EyeIcon, EyeOffIcon, Plus, User, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from '@/components/ui/input-group';

const initialState: SignUpFormState = {
	error: '',
};

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
	'image/jpeg',
	'image/jpg',
	'image/png',
	'image/webp',
];

export function SignUpForm() {
	const [state, formAction, isPending] = useActionState(signUp, initialState);
	const [showPassword, setShowPassword] = useState(false);
	const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
	const [avatarError, setAvatarError] = useState<string>('');

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
				const passwordField = form.elements.namedItem(
					'password'
				) as HTMLInputElement;
				if (passwordField && value !== passwordField.value) {
					return 'Пароли не совпадают';
				}
				return null;
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

	const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		setAvatarError('');

		if (!file) return;

		if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
			setAvatarError('Поддерживаются только JPG, PNG и WebP форматы');
			return;
		}

		if (file.size > MAX_FILE_SIZE) {
			setAvatarError('Размер файла не должен превышать 2MB');
			return;
		}

		const reader = new FileReader();
		reader.onloadend = () => {
			setAvatarPreview(reader.result as string);
		};
		reader.readAsDataURL(file);
	};

	const handleRemoveAvatar = () => {
		setAvatarPreview(null);
	};

	return (
		<Card>
			<CardHeader className="grid-rows-[auto]">
				<CardTitle className="text-center font-jost text-2xl font-medium">
					Регистрация
				</CardTitle>
			</CardHeader>
			<CardContent>
				<form
					id="sign-up-form"
					onSubmit={handleSubmit}
					action={formAction}
					onKeyDown={(e) => {
						if (e.key === 'Enter' && !isPending) {
							e.currentTarget.requestSubmit();
						}
					}}
					noValidate
				>
					<FieldGroup className="gap-4">
						<Field
							orientation={'horizontal'}
							className="flex flex-col items-center"
						>
							<Input
								id="avatar"
								type="file"
								name="avatar"
								accept="image/jpeg,image/jpg,image/png,image/webp"
								onChange={handleAvatarChange}
								disabled={isPending}
								className="hidden"
							/>
							<div className="relative">
								<FieldLabel
									htmlFor="avatar"
									className={cn(
										'group relative flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border-2 border-dashed border-muted-foreground/30 bg-muted/30 transition-all hover:border-primary hover:bg-muted/50',
										avatarPreview &&
											'border-solid border-border bg-transparent',
										isPending && 'cursor-not-allowed opacity-50'
									)}
									title="Загрузить аватар"
								>
									{avatarPreview ? (
										<>
											<Image
												src={avatarPreview}
												alt="Аватар"
												fill
												className="rounded-full object-cover"
											/>
											<div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
												<Plus className="h-8 w-8 text-white" />
											</div>
										</>
									) : (
										<>
											<User className="h-9 w-9 text-muted-foreground" />
											<div className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
												<Plus className="h-3 w-3 text-primary-foreground" />
											</div>
										</>
									)}
								</FieldLabel>
								{avatarPreview && (
									<Button
										type="button"
										variant="destructive"
										size="icon-xs"
										onClick={handleRemoveAvatar}
										className="absolute right-0 top-0 size-5 rounded-full"
									>
										<X />
									</Button>
								)}
							</div>
							{avatarError && <FieldError>{avatarError}</FieldError>}
						</Field>

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
								onBlur={onBlur}
								onChange={onChange}
							/>
							<FieldError>{fieldErrors.email}</FieldError>
						</Field>

						<Field className="gap-2">
							<FieldLabel htmlFor="name">
								Имя <span className="text-destructive">*</span>
							</FieldLabel>
							<Input
								id="name"
								type="text"
								name="name"
								placeholder="Пётр"
								required
								disabled={isPending}
								minLength={2}
								maxLength={30}
								aria-errormessage="name-error"
								onBlur={onBlur}
								onChange={onChange}
							/>
							<FieldError>{fieldErrors.name}</FieldError>
						</Field>

						<Field className="gap-2">
							<FieldLabel htmlFor="password">
								Пароль <span className="text-destructive">*</span>
							</FieldLabel>
							<InputGroup>
								<InputGroupInput
									id="password"
									type={showPassword ? 'text' : 'password'}
									name="password"
									placeholder="•••••••••••••"
									required
									disabled={isPending}
									minLength={8}
									maxLength={128}
									pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,128}"
									title="Пароль должен содержать минимум 8 символов, включая цифру, строчную и заглавную букву"
									aria-errormessage="password-error"
									onBlur={onBlur}
									onChange={onChange}
								/>
								<InputGroupAddon align="inline-end">
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
								</InputGroupAddon>
							</InputGroup>
							<FieldError>{fieldErrors.password}</FieldError>
						</Field>

						<Field className="gap-2">
							<FieldLabel htmlFor="confirm-password">
								Подтвердите пароль <span className="text-destructive">*</span>
							</FieldLabel>
							<Input
								id="confirm-password"
								type="password"
								name="confirm-password"
								placeholder="•••••••••••••"
								required
								disabled={isPending}
								aria-errormessage="confirm-password-error"
								onBlur={onBlur}
								onChange={onChange}
							/>
							<FieldError>{fieldErrors['confirm-password']}</FieldError>
						</Field>

						{state.error && (
							<p className="text-sm text-destructive" role="alert">
								{state.error}
							</p>
						)}
					</FieldGroup>
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
				<div className="text-sm text-muted-foreground">
					Уже есть аккаунт?&nbsp;
					<Link
						href="/auth/login"
						className="text-primary-dark underline-offset-4 hover:underline"
					>
						Войти
					</Link>
				</div>
			</CardFooter>
		</Card>
	);
}
