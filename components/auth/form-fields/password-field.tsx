'use client';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from '@/components/ui/input-group';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';
import { FieldProps } from '@/types/forms';

type PasswordFieldProps = FieldProps & {
	id?: string;
	name?: string;
	label?: string;
	withStrengthRules?: boolean;
	addon?: React.ReactNode;
};

export function PasswordField({
	id = 'password',
	name = 'password',
	label = 'Пароль',
	error,
	disabled,
	withStrengthRules = false,
	addon,
	onBlur,
	onChange,
}: PasswordFieldProps) {
	const [show, setShow] = useState(false);

	return (
		<Field className="gap-2">
			<div className="flex items-center justify-between">
				<FieldLabel htmlFor={id}>
					{label} <span className="text-destructive">*</span>
				</FieldLabel>
				{addon}
			</div>
			<InputGroup>
				<InputGroupInput
					id={id}
					type={show ? 'text' : 'password'}
					name={name}
					placeholder="•••••••••••••"
					autoComplete="new-password"
					required
					disabled={disabled}
					minLength={8}
					maxLength={128}
					{...(withStrengthRules && {
						pattern: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,128}',
						title: 'Минимум 8 символов, цифра, строчная и заглавная буква',
					})}
					onBlur={onBlur}
					onChange={onChange}
				/>
				<InputGroupAddon align="inline-end">
					<InputGroupButton
						aria-label={show ? 'Скрыть пароль' : 'Показать пароль'}
						size="icon-xs"
						onClick={() => setShow(!show)}
						disabled={disabled}
					>
						{show ? <EyeOffIcon /> : <EyeIcon />}
					</InputGroupButton>
				</InputGroupAddon>
			</InputGroup>
			<FieldError>{error}</FieldError>
			{withStrengthRules && (
				<p className="text-xs text-muted-foreground">
					Минимум 8 символов, одна цифра, заглавная и строчная буква
				</p>
			)}
		</Field>
	);
}
