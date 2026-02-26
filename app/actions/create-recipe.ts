'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { RecipeError, uploadRecipe } from '@/services/recipes.service';
import {
	StorageError,
	uploadRecipePhoto,
	validateRecipePhoto,
} from '@/services/storage.service';
import type { FormState } from '@/types/forms';
import { TCookingTime, TCuisine, TMealType, TUnit } from '@/types/database';

export async function createRecipe(
	_prevState: FormState | null,
	formData: FormData
): Promise<FormState> {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) return { error: 'Необходимо войти в аккаунт' };

	const title = (formData.get('title') as string).trim();
	const cooking_time = formData.get('cooking_time') as TCookingTime;
	const meal_types = formData.getAll('meal_types') as TMealType[];
	const cuisines = formData.getAll('cuisines') as TCuisine[];
	const photoFile = formData.get('photo') as File | null;
	console.log('photoFile:', photoFile?.name, photoFile?.size, photoFile?.type);

	const names = formData.getAll('ingredient_name') as string[];
	const quantities = formData.getAll('ingredient_quantity') as string[];
	const units = formData.getAll('ingredient_unit') as string[];

	const ingredients = names.map((name, i) => {
		return {
			name: name.trim(),
			quantity: parseFloat(quantities[i]) || null,
			unit: (units[i] as TUnit) || null,
		};
	});

	const stepDescriptions = formData.getAll('step_description') as string[];
	const steps = stepDescriptions.map((description, i) => ({
		description: description.trim(),
		step_number: i + 1,
	}));

	let photo_url: string | null = null;

	if (photoFile && photoFile.size > 0) {
		const validationError = validateRecipePhoto(photoFile);
		if (validationError) return { error: validationError };

		try {
			photo_url = await uploadRecipePhoto(user.id, photoFile);
		} catch (error) {
			if (error instanceof StorageError) {
				return { error: 'Не удалось загрузить фото. Попробуйте ещё раз' };
			}
			console.error('Recipe photo upload unexpected error:', error);
			return { error: 'Произошла непредвиденная ошибка при загрузке фото' };
		}
	}

	let recipeId: string;

	try {
		recipeId = await uploadRecipe({
			title,
			cooking_time,
			cuisines,
			meal_types,
			photo_url,
			ingredients,
			steps,
		});
	} catch (error) {
		if (error instanceof RecipeError) {
			return { error: 'Не удалось создать рецепт. Попробуйте ещё раз' };
		}
		console.error('Create recipe unexpected error:', error);
		return { error: 'Произошла непредвиденная ошибка' };
	}

	redirect(`/recipes/${recipeId}`);
}
