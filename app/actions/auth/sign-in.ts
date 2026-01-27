'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { FormValidator } from '@/lib/utils';

export type SignInFormState = {
	errors: {
		email?: string[];
		password?: string[];
		general?: string;
	};
	redirect?: string;
};

export async function signIn(
	prevState: SignInFormState | null,
	formData: FormData
): Promise<SignInFormState> {
	const supabase = await createClient();

	let email = formData.get('email') as string;
	const password = formData.get('password') as string;
	const redirect = (formData.get('redirect') as string) || '/';

	email = email.trim();

	const errors = FormValidator.validateSignIn({ email, password });

	if (errors.length !== 0) {
		return {
			errors: FormValidator.formatErrors(errors),
		};
	}

	try {
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			return {
				errors: {
					general: error.message.includes('credentials')
						? 'Неверный email или пароль'
						: error.message,
				},
			};
		}

		revalidatePath('/');

		return {
			errors: {},
			redirect: redirect,
		};
	} catch (error) {
		console.error('SignIn error: ', error);
		return {
			errors: {
				general: 'Произошла непредвиденная ошибка',
			},
		};
	}
}
