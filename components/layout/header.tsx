import { Logo } from '@/components/layout/logo';
import { NavMenu } from '@/components/layout/nav-menu';
import { Suspense } from 'react';
import { Spinner } from '../ui/spinner';
import { AuthButtons } from '@/components/auth/auth-buttons';
import { NAV_LINKS } from '@/lib/constants';

interface HeaderProps {
	showNav?: boolean;
	showAuthButtons?: boolean;
}

export function Header({
	showNav = true,
	showAuthButtons = true,
}: HeaderProps) {
	return (
		<header>
			<div className="mx-auto flex max-w-7xl justify-between px-9 py-4">
				<Logo />
				{showNav && <NavMenu links={NAV_LINKS} />}
				{showAuthButtons && (
					<div className="flex items-center gap-4">
						<Suspense fallback={<Spinner />}>
							<AuthButtons />
						</Suspense>
					</div>
				)}
			</div>
		</header>
	);
}
