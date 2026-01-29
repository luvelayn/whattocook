import { SignInForm } from '@/components/sign-in-form';
import { Suspense } from 'react';
import { Spinner } from '@/components/ui/spinner';

export default async function SignInPage() {
	return (
		<div className="flex min-h-screen w-full items-center justify-center">
			<Suspense fallback={<Spinner />}>
				<SignInForm />
			</Suspense>
		</div>
	);
}
