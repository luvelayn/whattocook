'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { logoutUser } from '@/services/auth.service';

export async function logout(): Promise<void> {
	await logoutUser();
	revalidatePath('/');
	redirect('/');
}
