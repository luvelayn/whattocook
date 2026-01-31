import { LoginForm } from '@/components/login-form';
import { Suspense } from 'react';
import { Spinner } from '@/components/ui/spinner';

export default async function LoginPage() {
	return (
		<div className="flex min-h-screen w-full items-center justify-center p-4">
			<Suspense fallback={<Spinner />}>
				<div className="w-full max-w-sm">
					<LoginForm />
				</div>
			</Suspense>
		</div>
	);
}
