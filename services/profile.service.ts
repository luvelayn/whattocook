import { createClient } from '@/lib/supabase/server';
import { createServiceClient } from '@/lib/supabase/service';
import type { TProfile } from '@/types/database';

export async function getCurrentProfile(): Promise<TProfile | null> {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) return null;

	const { data } = await supabase
		.from('profiles')
		.select('*')
		.eq('id', user.id)
		.single();

	return data;
}

export async function updateProfileAvatar(
	userId: string,
	avatarUrl: string
): Promise<void> {
	const supabase = createServiceClient();

	const { error } = await supabase
		.from('profiles')
		.update({ avatar_url: avatarUrl })
		.eq('id', userId);

	if (error) {
		console.error('Profile avatar update error:', error);
	}
}
