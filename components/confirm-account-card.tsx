import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MailCheck } from 'lucide-react';

export function ConfirmAccountCard() {
	return (
		<Card className="w-full max-w-sm pt-8">
			<CardHeader>
				<div className="flex justify-center">
					<MailCheck className="h-14 w-14 text-primary" />
				</div>
				<CardTitle className="text-center font-jost text-2xl font-medium">
					Подтвердите Ваш аккаунт
				</CardTitle>
			</CardHeader>

			<CardContent className="space-y-4">
				<div className="space-y-3 text-sm">
					<p>
						На указанную Вашу электронную почту было отправлено письмо с
						инструкциями.
					</p>
					<p>Для завершения регистрации пройдите по ссылке из письма.</p>
				</div>

				<div className="rounded-lg bg-muted/50 p-3">
					<p className="text-center text-xs text-muted-foreground">
						Проверьте папку «Спам», если не видите письмо
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
