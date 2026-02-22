import { RefObject, useRef, useState } from 'react';

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
	'image/jpeg',
	'image/jpg',
	'image/png',
	'image/webp',
];

export type AvatarUploadState = {
	preview: string | null;
	error: string;
	inputRef: RefObject<HTMLInputElement | null>;
	handleChange: (file: File | undefined) => void;
	handleRemove: () => void;
};

export function useAvatarUpload(): AvatarUploadState {
	const [preview, setPreview] = useState<string | null>(null);
	const [error, setError] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);

	const handleChange = (file: File | undefined) => {
		setError('');

		if (!file) return;

		if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
			setError('Поддерживаются только JPG, PNG и WebP форматы');
			return;
		}

		if (file.size > MAX_FILE_SIZE) {
			setError('Размер файла не должен превышать 2MB');
			return;
		}

		const reader = new FileReader();
		reader.onloadend = () => {
			setPreview(reader.result as string);
		};
		reader.readAsDataURL(file);
	};

	const handleRemove = () => {
		setPreview(null);
		setError('');
		if (inputRef.current) inputRef.current.value = '';
	};

	return { preview, error, inputRef, handleChange, handleRemove };
}
