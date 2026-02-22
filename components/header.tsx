import { Logo } from '@/components/logo';
import { NavMenu } from '@/components/nav-menu';
import { Suspense } from 'react';
import { Spinner } from './ui/spinner';
import { AuthButtons } from '@/components/auth-buttons';

const NAV_LINKS = [
	{ name: 'Главная', href: '/' },
	{ name: 'Рандомайзер', href: '/randomizer' },
	{ name: 'Рецепты', href: '/recipes' },
];

export function Header() {
	return (
		<header className="flex min-h-[74] items-center justify-between px-9 py-4">
			<Logo />
			<NavMenu links={NAV_LINKS} />
			<div className="flex items-center gap-4">
				<Suspense fallback={<Spinner />}>
					<AuthButtons />
				</Suspense>
			</div>
		</header>
	);
}
