import { createServiceClient } from '@/lib/supabase/service';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_TYPES = new Set([
	'image/jpeg',
	'image/jpg',
	'image/png',
	'image/webp',
]);

export class StorageError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'StorageError';
	}
}

function getFileExtension(file: File): string {
	return file.name.split('.').pop() ?? 'jpg';
}

export function validateImageFile(file: File): string | null {
	if (!ACCEPTED_TYPES.has(file.type)) {
		return 'Поддерживаются только JPG, PNG и WebP форматы';
	}
	if (file.size > MAX_FILE_SIZE) {
		return 'Размер файла не должен превышать 2MB';
	}
	return null;
}

export const validateAvatarFile = validateImageFile;
export const validateRecipePhoto = validateImageFile;

async function uploadFile(
	bucket: string,
	userId: string,
	file: File
): Promise<string> {
	const supabase = createServiceClient();
	const ext = getFileExtension(file);
	const fileName = `${userId}-${Date.now()}.${ext}`;

	const { error: uploadError } = await supabase.storage
		.from(bucket)
		.upload(fileName, file, {
			cacheControl: '3600',
			upsert: false,
		});

	if (uploadError) {
		throw new StorageError(uploadError.message);
	}

	const {
		data: { publicUrl },
	} = supabase.storage.from(bucket).getPublicUrl(fileName);

	return publicUrl;
}

export async function uploadAvatar(
	userId: string,
	file: File
): Promise<string> {
	return uploadFile('avatars', userId, file);
}

export async function uploadRecipePhoto(
	userId: string,
	file: File
): Promise<string> {
	return uploadFile('recipe-photos', userId, file);
}

export async function deleteFileByUrl(url: string): Promise<void> {
	const supabase = createServiceClient();

	const match = url.match(/\/object\/public\/([^/]+)\/(.+)$/);
	if (!match) throw new StorageError(`Invalid storage URL: ${url}`);

	const [, bucket, fileName] = match;

	const { error } = await supabase.storage.from(bucket).remove([fileName]);
	if (error) throw new StorageError(error.message);
}
