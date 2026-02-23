import { Header } from '@/components/layout/header';

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex h-screen flex-col">
			<Header showNav={false} showAuthButtons={false} />
			<div className="flex flex-1 items-center justify-center p-4 pt-0">
				{children}
			</div>
		</div>
	);
}
