import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { FieldProps } from '@/types/forms';

export function NameField({ error, disabled, onBlur, onChange }: FieldProps) {
	return (
		<Field className="gap-2">
			<FieldLabel htmlFor="name">
				Имя <span className="text-destructive">*</span>
			</FieldLabel>
			<Input
				id="name"
				type="text"
				name="name"
				placeholder="Пётр"
				autoComplete="name"
				required
				disabled={disabled}
				minLength={2}
				maxLength={30}
				aria-errormessage="name-error"
				onBlur={onBlur}
				onChange={onChange}
			/>
			<FieldError>{error}</FieldError>
		</Field>
	);
}
