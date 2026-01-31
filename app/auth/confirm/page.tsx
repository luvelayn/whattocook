import { ConfirmAccountCard } from '@/components/confirm-account-card';

export default async function ConfirmAccountPage() {
	return (
		<div className="flex min-h-screen w-full items-center justify-center">
			<div className="w-full max-w-sm">
				<ConfirmAccountCard />
			</div>
		</div>
	);
}
