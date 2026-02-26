import { createClient } from '@/lib/supabase/server';
import {
	CreateRecipeParams,
	TIngredientSuggestion,
	TRecipe,
	TRecipeFilters,
} from '@/types/database';

export class RecipeError extends Error {
	constructor(
		message: string,
		public readonly code?: string
	) {
		super(message);
		this.name = 'RecipeError';
	}
}

export async function uploadRecipe(
	params: CreateRecipeParams
): Promise<string> {
	const supabase = await createClient();

	const { data, error } = await supabase.rpc('create_recipe', {
		p_title: params.title,
		p_cooking_time: params.cooking_time,
		p_cuisines: params.cuisines,
		p_meal_types: params.meal_types,
		p_photo_url: params.photo_url ?? undefined,
		p_ingredients: params.ingredients,
		p_steps: params.steps,
	});

	if (error) {
		throw new RecipeError(error.message, error.code);
	}

	return data as string;
}

export async function getUserRecipes(
	filters: TRecipeFilters & { limit?: number; offset?: number } = {}
): Promise<TRecipe[]> {
	const supabase = await createClient();

	const { data, error } = await supabase.rpc('get_user_recipes', {
		p_cooking_time: filters.cooking_time,
		p_meal_types: filters.meal_types,
		p_cuisines: filters.cuisines,
		p_limit: filters.limit ?? 12,
		p_offset: filters.offset,
	});

	if (error) throw new RecipeError(error.message, error.code);

	return (data as TRecipe[]) ?? [];
}

export async function countUserRecipes(
	filters: TRecipeFilters = {}
): Promise<number> {
	const supabase = await createClient();

	const { data, error } = await supabase.rpc('count_user_recipes', {
		p_cooking_time: filters.cooking_time,
		p_meal_types: filters.meal_types,
		p_cuisines: filters.cuisines,
	});

	if (error) throw new RecipeError(error.message, error.code);

	return data ?? 0;
}

export async function getRecipeById(recipeId: string): Promise<TRecipe | null> {
	const supabase = await createClient();

	const { data, error } = await supabase.rpc('get_recipe_by_id', {
		p_recipe_id: recipeId,
	});

	if (error) throw new RecipeError(error.message, error.code);

	return (data?.[0] as TRecipe) ?? null;
}

export async function getRandomRecipe(
	filters: TRecipeFilters = {}
): Promise<TRecipe | null> {
	const supabase = await createClient();

	const { data, error } = await supabase.rpc('get_random_recipe', {
		p_cooking_time: filters.cooking_time,
		p_meal_types: filters.meal_types,
		p_cuisines: filters.cuisines,
	});

	if (error) throw new RecipeError(error.message, error.code);

	return (data?.[0] as TRecipe) ?? null;
}

export async function searchIngredients(
	searchTerm: string,
	limit = 10
): Promise<TIngredientSuggestion[]> {
	const supabase = await createClient();

	const { data, error } = await supabase.rpc('search_ingredients', {
		search_term: searchTerm,
		result_limit: limit,
	});

	if (error) throw new RecipeError(error.message, error.code);

	return data ?? [];
}
