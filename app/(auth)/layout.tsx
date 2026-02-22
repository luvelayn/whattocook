import { Logo } from '@/components/layout/logo';

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex h-screen flex-col">
			<header className="w-full px-9 py-4">
				<Logo />
			</header>
			<div className="flex flex-1 items-center justify-center p-4 pt-0">
				{children}
			</div>
		</div>
	);
}
