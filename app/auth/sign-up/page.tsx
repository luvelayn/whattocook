import { SignUpForm } from '@/components/sign-up-form';
import { Suspense } from 'react';
import { Spinner } from '@/components/ui/spinner';

export default async function SignUpPage() {
	return (
		<div className="flex min-h-screen w-full items-center justify-center">
			<Suspense fallback={<Spinner />}>
				<SignUpForm />
			</Suspense>
		</div>
	);
}
