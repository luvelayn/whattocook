import { RefObject, useRef, useState } from 'react';
import { validateAvatarFile } from '@/services/storage.service';

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
		if (!file) return;

		const validationError = validateAvatarFile(file);

		if (validationError) {
			setError(validationError);
		} else {
			setError('');
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
