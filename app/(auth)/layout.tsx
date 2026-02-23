import { Header } from '@/components/layout/header';

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex min-h-screen flex-col">
			<Header showNav={false} showAuthButtons={false} />
			<div className="flex flex-1 items-center justify-center p-8 pt-0">
				<div className="w-full max-w-sm">{children}</div>
			</div>
		</div>
	);
}
