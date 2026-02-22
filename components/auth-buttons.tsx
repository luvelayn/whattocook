import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { DropdownProfileMenu } from '@/components/dropdown-profile-menu';

export async function AuthButtons() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const { data: profile } = await supabase
		.from('profiles')
		.select('*')
		.eq('id', user?.id || '0')
		.single();

	return (
		<>
			{profile ? (
				<>
					<Button asChild variant="ghost">
						<Link href="/recipes/create">
							<Plus />
							Новый рецепт
						</Link>
					</Button>
					<DropdownProfileMenu profile={profile} profileLink="/profile" />
				</>
			) : (
				<>
					<Button
						variant="outline"
						size="lg"
						className="border-primary"
						asChild
					>
						<Link href="/login">Войти</Link>
					</Button>
					<Button asChild size="lg">
						<Link href="/sign-up">Зарегистрироваться</Link>
					</Button>
				</>
			)}
		</>
	);
}
