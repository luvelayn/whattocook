import { createClient } from '@/lib/supabase/server';

export class AuthError extends Error {
	constructor(
		message: string,
		public readonly code?: string
	) {
		super(message);
		this.name = 'AuthError';
	}
}

type LoginParams = {
	email: string;
	password: string;
};

type RegisterParams = LoginParams & {
	name: string;
};

export async function loginUser({
	email,
	password,
}: LoginParams): Promise<void> {
	const supabase = await createClient();

	const { error } = await supabase.auth.signInWithPassword({ email, password });

	if (error) {
		throw new AuthError(error.message, error.code);
	}
}

export async function registerUser({
	email,
	password,
	name,
}: RegisterParams): Promise<string> {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: { name },
			emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
		},
	});

	if (data.user && !data.user.identities?.length) {
		throw new AuthError(
			'Пользователь с таким email уже зарегистрирован',
			'user_already_exists'
		);
	}

	if (error) {
		throw new AuthError(error.message, error.code);
	}

	if (!data.user) {
		throw new AuthError('Не удалось создать пользователя');
	}

	return data.user.id;
}

export async function logoutUser(): Promise<void> {
	const supabase = await createClient();
	await supabase.auth.signOut();
}
