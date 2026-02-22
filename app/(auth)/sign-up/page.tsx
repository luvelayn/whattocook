import { SignUpForm } from '@/components/auth/sign-up/sign-up-form';

export default async function SignUpPage() {
	return (
		<div className="w-full max-w-sm space-y-8">
			<div className="space-y-2 text-center">
				<h1 className="text-3xl font-medium tracking-tight">
					Добро пожаловать
				</h1>
				<p className="text-sm text-muted-foreground">
					Создайте аккаунт, чтобы начать
				</p>
			</div>
			<SignUpForm />
		</div>
	);
}
