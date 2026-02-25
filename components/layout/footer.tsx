import { Logo } from '@/components/layout/logo';
import { NavMenu } from '@/components/layout/nav-menu';
import { NAV_LINKS } from '@/lib/constants';
import { Mail } from 'lucide-react';
import { Copyright } from '@/components/layout/copyright';
import { Suspense } from 'react';
import { Spinner } from '@/components/ui/spinner';

export function Footer() {
	return (
		<footer className="bg-card">
			<div className="mx-auto max-w-7xl px-9">
				<div className="flex flex-col gap-10 py-8 md:flex-row md:justify-between">
					<div className="flex flex-col gap-3">
						<Logo />
						<p className="max-w-[220px] text-sm leading-relaxed text-muted-foreground">
							Личная кулинарная книга, которая выбирает за вас
						</p>
					</div>

					<div className="flex flex-col gap-2">
						<p className="text-sm font-medium">Навигация</p>
						<NavMenu links={NAV_LINKS} orientation="vertical" />
					</div>

					<div className="flex flex-col gap-2">
						<p className="text-sm font-medium">Контакты</p>
						<a
							href="mailto:plnanzr@gmail.com"
							className="flex items-center gap-2 py-1 text-sm text-muted-foreground transition-colors hover:text-primary"
						>
							<Mail className="size-4 shrink-0" />
							plnanzr@gmail.com
						</a>
					</div>
				</div>

				<div className="border-t border-border py-5">
					<Suspense fallback={<Spinner />}>
						<Copyright />
					</Suspense>
				</div>
			</div>
		</footer>
	);
}
