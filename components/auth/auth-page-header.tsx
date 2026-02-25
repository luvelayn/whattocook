type AuthPageHeaderProps = {
	title: string;
	description: string;
};

export function AuthPageHeader({ title, description }: AuthPageHeaderProps) {
	return (
		<div className="space-y-2 text-center">
			<h1 className="text-3xl font-medium tracking-tight">{title}</h1>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
	);
}
