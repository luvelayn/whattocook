export type ValidationError = {
	field: string;
	message: string;
};

export interface SignUpFormInput {
	email: string;
	password: string;
	confirmPassword: string;
	name: string;
}
