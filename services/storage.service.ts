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

export function validateAvatarFile(file: File): string | null {
	if (!ACCEPTED_TYPES.has(file.type)) {
		return 'Поддерживаются только JPG, PNG и WebP форматы';
	}
	if (file.size > MAX_FILE_SIZE) {
		return 'Размер файла не должен превышать 2MB';
	}
	return null;
}

export async function uploadAvatar(
	userId: string,
	file: File
): Promise<string> {
	const supabase = createServiceClient();
	const ext = getFileExtension(file);
	const fileName = `${userId}-${Date.now()}.${ext}`;

	const { error: uploadError } = await supabase.storage
		.from('avatars')
		.upload(fileName, file, {
			cacheControl: '3600',
			upsert: false,
		});

	if (uploadError) {
		throw new StorageError(uploadError.message);
	}

	const {
		data: { publicUrl },
	} = supabase.storage.from('avatars').getPublicUrl(fileName);

	return publicUrl;
}
