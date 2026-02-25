import type { Database } from '@/lib/supabase/database.types';

export type TProfile = Database['public']['Tables']['profiles']['Row'];
export type TIngredient = Omit<
	Database['public']['Tables']['recipe_ingredients']['Row'],
	'id' | 'ingredient_id' | 'recipe_id' | 'created_at'
>;
export type TRecipeStep = Omit<
	Database['public']['Tables']['recipe_steps']['Row'],
	'id' | 'recipe_id' | 'created_at'
>;

export type TRecipeFilters = {
	meal_types?: Database['public']['Enums']['meal_types_enum'][];
	cuisines?: Database['public']['Enums']['cuisines_enum'][];
	cooking_time?: Database['public']['Enums']['cooking_time_enum'];
};

export type TRecipe = Database['public']['Tables']['recipes']['Row'] & {
	ingredients: TIngredient[];
	steps: TRecipeStep[];
};

export type CreateRecipeParams = Omit<
	TRecipe,
	'id' | 'user_id' | 'created_at' | 'updated_at'
>;

export type TIngredientSuggestion =
	Database['public']['Functions']['search_ingredients']['Returns'][number];
