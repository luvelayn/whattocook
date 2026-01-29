'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export type SignUpFormState = {
	error: string;
};

export async function signUp(
	prevState: SignUpFormState | null,
	formData: FormData
): Promise<SignUpFormState> {
	const supabase = await createClient();

	const signUpData = {
		email: (formData.get('email') as string).trim(),
		password: formData.get('password') as string,
		confirmPassword: formData.get('confirm-password') as string,
		name: formData.get('name') as string,
	};

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
				error: errorMessage,
			};
		}

		revalidatePath('/');
		redirect('/auth/confirm');
	} catch (error) {
		console.error('SignUp error: ', error);
		return {
			error: 'Произошла непредвиденная ошибка',
		};
	}
}
