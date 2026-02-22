import { ChangeEventHandler, FocusEventHandler } from 'react';

export type FieldProps = {
	error?: string;
	disabled?: boolean;
	onBlur?: FocusEventHandler<HTMLInputElement>;
	onChange?: ChangeEventHandler<HTMLInputElement>;
};
