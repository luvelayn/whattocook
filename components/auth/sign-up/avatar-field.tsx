import { Input } from '@/components/ui/input';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Plus, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ImageUploadState } from '@/hooks/useImageUpload';

type AvatarFieldProps = ImageUploadState & {
	disabled?: boolean;
};

export function AvatarField({
	preview,
	error,
	inputRef,
	handleChange,
	handleRemove,
	disabled,
}: AvatarFieldProps) {
	return (
		<Field
			orientation={'horizontal'}
			className="flex flex-col items-center gap-3"
		>
			<Input
				ref={inputRef}
				id="avatar"
				type="file"
				name="avatar"
				accept="image/jpeg,image/jpg,image/png,image/webp"
				onChange={(event) => handleChange(event.target.files?.[0])}
				disabled={disabled}
				className="hidden"
				aria-describedby="avatar-description"
			/>
			<div className="relative">
				<FieldLabel
					htmlFor="avatar"
					className={cn(
						'group relative flex size-24 cursor-pointer items-center justify-center rounded-full border-2 border-dashed border-muted-foreground/25 bg-muted/40 transition-all hover:border-primary/50 hover:bg-muted/60',
						preview && 'border-solid border-border bg-transparent',
						disabled && 'cursor-not-allowed opacity-50'
					)}
					title="Загрузить аватар"
				>
					{preview ? (
						<>
							<Image
								src={preview}
								alt="Предпросмотр аватара"
								fill
								className="rounded-full object-cover"
							/>
							<div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
								<Plus strokeWidth={1.5} className="size-10 text-white" />
							</div>
						</>
					) : (
						<>
							<User className="size-10 text-muted-foreground/60" />
							<div className="absolute bottom-0 right-0 flex size-6 items-center justify-center rounded-full bg-primary shadow-sm">
								<Plus className="size-4 text-primary-foreground" />
							</div>
						</>
					)}
				</FieldLabel>
				{preview && (
					<Button
						aria-label="Удалить аватар"
						type="button"
						variant="destructive"
						size="icon-xs"
						onClick={handleRemove}
						className="absolute right-0 top-0 size-6 rounded-full"
					>
						<X className="size-4" />
					</Button>
				)}
			</div>
			<span id="avatar-description" className="text-xs text-muted-foreground">
				JPG, PNG или WebP до 2MB
			</span>
			<FieldError className="text-center">{error}</FieldError>
		</Field>
	);
}
