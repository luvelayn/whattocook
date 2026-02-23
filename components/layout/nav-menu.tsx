'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

type NavLink = {
	name: string;
	href: string;
};

type NavMenuProps = {
	links: NavLink[];
	orientation?: 'horizontal' | 'vertical';
};

export function NavMenu({ links, orientation = 'horizontal' }: NavMenuProps) {
	const pathname = usePathname();

	return (
		<NavigationMenu orientation={orientation}>
			<NavigationMenuList
				className={cn(
					orientation === 'horizontal' && 'gap-8',
					orientation === 'vertical' && 'flex-col items-start'
				)}
			>
				{links.map((link) => {
					const isActive = pathname === link.href;

					return (
						<NavigationMenuItem key={link.name}>
							<Link
								href={link.href}
								className={cn(
									'py-1 text-sm transition-colors hover:text-primary focus:text-primary-light',
									isActive && 'pointer-events-none cursor-default text-primary'
								)}
								aria-current={isActive ? 'page' : undefined}
							>
								{link.name}
							</Link>
						</NavigationMenuItem>
					);
				})}
			</NavigationMenuList>
		</NavigationMenu>
	);
}
