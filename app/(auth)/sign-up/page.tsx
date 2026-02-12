import { SignUpForm } from '@/components/sign-up-form';
import { Suspense } from 'react';
import { Spinner } from '@/components/ui/spinner';

export default async function SignUpPage() {
	return (
		<Suspense fallback={<Spinner />}>
			<div className="w-full max-w-sm">
				<SignUpForm />
			</div>
		</Suspense>
	);
}
