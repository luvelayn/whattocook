'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export type LoginFormState = {
	error: string;
	redirect?: string;
};

export async function login(
	prevState: LoginFormState | null,
	formData: FormData
): Promise<LoginFormState> {
	const supabase = await createClient();

	const redirect = (formData.get('redirect') as string) || '/';
	const loginData = {
		email: (formData.get('email') as string).trim(),
		password: formData.get('password') as string,
	};

	try {
		const { error } = await supabase.auth.signInWithPassword(loginData);

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
			error: '',
			redirect: redirect,
		};
	} catch (error) {
		console.error('Login error: ', error);
		return {
			error: 'Произошла непредвиденная ошибка',
		};
	}
}
