import { SignUpForm } from '@/components/sign-up-form';
import { Suspense } from 'react';
import { Spinner } from '@/components/ui/spinner';

export default async function SignUpPage() {
	return (
		<div className="flex min-h-screen w-full items-center justify-center p-4">
			<Suspense fallback={<Spinner />}>
				<div className="max-h-[calc(100vh-2rem)] w-full max-w-sm overflow-y-auto">
					<SignUpForm />
				</div>
			</Suspense>
		</div>
	);
}
