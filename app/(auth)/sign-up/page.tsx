import { SignUpForm } from '@/components/auth/sign-up/sign-up-form';
import { AuthPageHeader } from '@/components/auth/auth-page-header';

export default function SignUpPage() {
	return (
		<div className="space-y-8">
			<AuthPageHeader
				title="Добро пожаловать"
				description="Создайте аккаунт, чтобы начать"
			/>
			<SignUpForm />
		</div>
	);
}
