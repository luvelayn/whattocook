import { LoginForm } from '@/components/auth/login-form';
import { AuthPageHeader } from '@/components/auth/auth-page-header';

export default function LoginPage() {
	return (
		<div className="space-y-8">
			<AuthPageHeader
				title="С возвращением!"
				description="Войдите, чтобы продолжить"
			/>
			<LoginForm />
		</div>
	);
}
