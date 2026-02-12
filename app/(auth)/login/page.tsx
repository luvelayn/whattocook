import { LoginForm } from '@/components/login-form';
import { Suspense } from 'react';
import { Spinner } from '@/components/ui/spinner';

export default async function LoginPage() {
	return (
		<Suspense fallback={<Spinner />}>
			<div className="w-full max-w-sm">
				<LoginForm />
			</div>
		</Suspense>
	);
}
