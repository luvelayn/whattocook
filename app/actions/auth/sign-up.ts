'use server';

import { redirect } from 'next/navigation';
import { AuthError, registerUser } from '@/services/auth.service';
import { StorageError, uploadAvatar } from '@/services/storage.service';
import { updateProfileAvatar } from '@/services/profile.service';
import { formatAuthError } from '@/lib/errors/auth-errors';
import type { FormState } from '@/types/forms';

export async function signUp(
	_prevState: FormState | null,
	formData: FormData
): Promise<FormState> {
	const email = (formData.get('email') as string).trim();
	const password = formData.get('password') as string;
	const name = formData.get('name') as string;
	const avatarFile = formData.get('avatar') as File | null;

	let userId: string;

	try {
		userId = await registerUser({ email, password, name });
	} catch (error) {
		if (error instanceof AuthError) {
			return { error: formatAuthError(error.code) };
		}
		console.error('Sign up unexpected error:', error);
		return { error: formatAuthError(null) };
	}

	if (avatarFile && avatarFile.size > 0) {
		try {
			const avatarUrl = await uploadAvatar(userId, avatarFile);
			await updateProfileAvatar(userId, avatarUrl);
		} catch (error) {
			if (!(error instanceof StorageError)) {
				console.error('Avatar processing unexpected error:', error);
			}
		}
	}

	redirect('/confirm-email');
}
