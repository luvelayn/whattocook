import { LoginForm } from '@/components/auth/login-form';

export default async function LoginPage() {
	return (
		<div className="w-full max-w-sm space-y-8">
			<div className="space-y-2 text-center">
				<h1 className="text-3xl font-medium tracking-tight">С возвращением!</h1>
				<p className="text-sm text-muted-foreground">
					Войдите, чтобы продолжить
				</p>
			</div>
			<LoginForm />
		</div>
	);
}
