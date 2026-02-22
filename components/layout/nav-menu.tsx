'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

interface NavLink {
	name: string;
	href: string;
}

export function NavMenu({ links }: { links: NavLink[] }) {
	const pathname = usePathname();

	return (
		<NavigationMenu>
			<NavigationMenuList className="gap-6">
				{links.map((link) => {
					const isActive = pathname === link.href;

					return (
						<NavigationMenuItem key={link.name}>
							<NavigationMenuLink asChild>
								<Link
									href={link.href}
									className={cn(
										'transition-colors hover:bg-transparent hover:text-primary',
										{
											'pointer-events-none cursor-default text-primary':
												isActive,
										}
									)}
									aria-current={isActive ? 'page' : undefined}
								>
									{link.name}
								</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
					);
				})}
			</NavigationMenuList>
		</NavigationMenu>
	);
}
