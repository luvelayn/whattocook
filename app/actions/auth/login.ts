'use server';

import { revalidatePath } from 'next/cache';
import { AuthError, loginUser } from '@/services/auth.service';
import { formatAuthError } from '@/lib/errors/auth-errors';
import type { FormStateWithRedirect } from '@/types/forms';

export async function login(
	_prevState: FormStateWithRedirect | null,
	formData: FormData
): Promise<FormStateWithRedirect> {
	const redirect = (formData.get('redirect') as string) || '/';
	const email = (formData.get('email') as string).trim();
	const password = formData.get('password') as string;

	try {
		await loginUser({ email, password });
		revalidatePath('/');
		return { error: '', redirect };
	} catch (error) {
		if (error instanceof AuthError) {
			return { error: formatAuthError(error.code) };
		}
		console.error('Login unexpected error:', error);
		return { error: formatAuthError(null) };
	}
}
