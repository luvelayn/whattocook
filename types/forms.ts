import { ChangeEventHandler, FocusEventHandler } from 'react';

export type FormState = {
	error: string;
};

export type FormStateWithRedirect = FormState & {
	redirect?: string;
};

export type FieldProps = {
	error?: string;
	disabled?: boolean;
	onBlur?: FocusEventHandler<HTMLInputElement>;
	onChange?: ChangeEventHandler<HTMLInputElement>;
};
