'use server';

import { createClient } from '@/lib/supabase/server';
import { createServiceClient } from '@/lib/supabase/service';
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
	const avatarFile = formData.get('avatar') as File | null;

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

	if (avatarFile && avatarFile.size > 0 && data.user) {
		const supabaseAdmin = createServiceClient();

		const fileExt = avatarFile.name.split('.').pop();
		const fileName = `${data.user.id}-${Date.now()}.${fileExt}`;

		const { error: uploadError } = await supabaseAdmin.storage
			.from('avatars')
			.upload(fileName, avatarFile, {
				cacheControl: '3600',
				upsert: false,
			});

		if (uploadError) {
			console.error('Avatar upload error:', uploadError);
		} else {
			const {
				data: { publicUrl },
			} = supabaseAdmin.storage.from('avatars').getPublicUrl(fileName);

			const { error: updateError } = await supabaseAdmin
				.from('profiles')
				.update({ avatar_url: publicUrl })
				.eq('id', data.user.id);

			if (updateError) {
				console.error('Profile update error:', updateError);
			}
		}
	}

	revalidatePath('/');
	redirect('/confirm-email');
}
