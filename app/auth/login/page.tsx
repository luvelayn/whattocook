import { LoginForm } from '@/components/login-form';
import { Suspense } from 'react';
import { Spinner } from '@/components/ui/spinner';

export default async function LoginPage() {
	return (
		<div className="flex min-h-screen w-full items-center justify-center">
			<Suspense fallback={<Spinner />}>
				<LoginForm />
			</Suspense>
		</div>
	);
}
