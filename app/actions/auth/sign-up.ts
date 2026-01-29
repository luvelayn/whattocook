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

	const email = (formData.get('email') as string).trim();
	const password = formData.get('password') as string;
	const name = formData.get('name') as string;

	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				name: name,
			},
			emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
		},
	});

	if (
		data.user &&
		(!data.user.identities || data.user.identities.length === 0)
	) {
		return {
			error: 'Пользователь с таким email уже зарегистрирован',
		};
	}

	if (error) {
		console.error('Supabase signup error:', error);
		return {
			error: `Произошла ошибка во время регистрации. Попробуйте позже.`,
		};
	}

	revalidatePath('/');
	redirect('/auth/confirm');
}
