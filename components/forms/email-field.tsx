import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { FieldProps } from '@/types/forms';

export function EmailField({ error, disabled, onBlur, onChange }: FieldProps) {
	return (
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
				disabled={disabled}
				maxLength={254}
				pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
				title="Введите корректный email адрес"
				onBlur={onBlur}
				onChange={onChange}
			/>
			<FieldError>{error}</FieldError>
		</Field>
	);
}
