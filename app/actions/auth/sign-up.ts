'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { validateSignUp } from '@/lib/utils/validation/validateSignUp';
import { formatErrors } from '@/lib/utils/validation/formatErrors';

export type SignUpFormState = {
	errors: {
		email?: string[];
		password?: string[];
		confirmPassword?: string[];
		name?: string[];
		general?: string;
	};
};

export async function signUp(
	prevState: SignUpFormState | null,
	formData: FormData
): Promise<SignUpFormState> {
	const supabase = await createClient();

	const signUpData = {
		email: (formData.get('email') as string).trim(),
		password: formData.get('password') as string,
		confirmPassword: formData.get('confirmPassword') as string,
		name: formData.get('name') as string,
	};

	const errors = validateSignUp(signUpData);

	if (errors) {
		return {
			errors: formatErrors(errors),
		};
	}

	try {
		const { error } = await supabase.auth.signUp({
			email: signUpData.email,
			password: signUpData.password,
			options: {
				data: {
					name: signUpData.name,
				},
				emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
			},
		});

		if (error) {
			let errorMessage = error.message;

			if (error.code === 'email_exists') {
				errorMessage = 'Пользователь с таким email уже зарегистрирован';
			}

			return {
				errors: { general: errorMessage },
			};
		}

		revalidatePath('/');

		return {
			errors: {},
		};
	} catch (error) {
		console.error('SignUp error: ', error);
		return {
			errors: { general: 'Произошла непредвиденная ошибка' },
		};
	}
}
