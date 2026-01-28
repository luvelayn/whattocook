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

	let email = formData.get('email') as string;
	const password = formData.get('password') as string;
	const redirect = (formData.get('redirect') as string) || '/';

	email = email.trim();

	try {
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			return {
				error: error.message.includes('credentials')
					? 'Неверный email или пароль'
					: error.message,
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
