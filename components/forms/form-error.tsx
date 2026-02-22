export function FormError({ message }: { message: string }) {
	if (!message) return null;
	return (
		<div className="rounded-md border border-destructive/50 bg-destructive/10 p-3">
			<p className="text-sm text-destructive" role="alert">
				{message}
			</p>
		</div>
	);
}
