'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export type SignInFormState = {
	error: string | null;
	redirect?: string;
};

export async function signIn(
	prevState: SignInFormState | null,
	formData: FormData
): Promise<SignInFormState> {
	const supabase = await createClient();

	const redirect = (formData.get('redirect') as string) || '/';
	const signInData = {
		email: (formData.get('email') as string).trim(),
		password: formData.get('password') as string,
	};

	try {
		const { error } = await supabase.auth.signInWithPassword(signInData);

		if (error) {
			let errorMessage = error.message;

			if (error.code === 'invalid_credentials') {
				errorMessage = 'Неверный email или пароль';
			}

			return {
				error: errorMessage,
			};
		}

		revalidatePath('/');

		return {
			error: null,
			redirect: redirect,
		};
	} catch (error) {
		console.error('SignIn error: ', error);
		return {
			error: 'Произошла непредвиденная ошибка',
		};
	}
}
