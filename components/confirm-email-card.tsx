import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MailCheck } from 'lucide-react';

export function ConfirmEmailCard() {
	return (
		<Card className="border-border/40 py-8 shadow-lg">
			<CardHeader className="flex flex-col items-center gap-3">
				<div className="rounded-full bg-primary/10 p-4">
					<MailCheck className="size-12 text-primary" strokeWidth={1.5} />
				</div>
				<CardTitle className="text-2xl font-medium tracking-tight">
					Подтвердите ваш email
				</CardTitle>
			</CardHeader>

			<CardContent className="space-y-6">
				<div className="space-y-3 text-center text-sm leading-relaxed text-muted-foreground">
					<p>
						На указанную электронную почту было отправлено письмо с
						инструкциями.
					</p>
					<p>Перейдите по ссылке из письма, чтобы завершить регистрацию.</p>
				</div>

				<div className="rounded-lg border border-muted-foreground/20 bg-muted/30 px-4 py-3.5">
					<p className="text-center text-xs text-muted-foreground">
						💡 Не видите письмо? Проверьте папку «Спам»
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
