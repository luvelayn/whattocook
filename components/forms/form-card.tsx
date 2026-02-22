import { FormEventHandler } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface AuthFormCardProps {
	children: React.ReactNode;
	footer: React.ReactNode;
	formId: string;
	isPending?: boolean;
	onSubmit: FormEventHandler<HTMLFormElement>;
	action: (formData: FormData) => void;
}

export function FormCard({
	children,
	footer,
	formId,
	isPending,
	onSubmit,
	action,
}: AuthFormCardProps) {
	return (
		<Card className="border-border/40 py-10 shadow-lg">
			<CardContent>
				<form
					id={formId}
					onSubmit={onSubmit}
					action={action}
					onKeyDown={(e) => {
						if (e.key === 'Enter' && !isPending)
							e.currentTarget.requestSubmit();
					}}
					noValidate
				>
					{children}
				</form>
			</CardContent>
			<CardFooter className="flex flex-col gap-4">{footer}</CardFooter>
		</Card>
	);
}
