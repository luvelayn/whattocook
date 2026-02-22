import type { Database } from '@/lib/supabase/database.types';

export type TProfile = Database['public']['Tables']['profiles']['Row'];
export type TRecipe = Database['public']['Tables']['recipes']['Row'];
export type TRecipeIngredient =
	Database['public']['Tables']['recipe_ingredients']['Row'];
export type TRecipeStep = Database['public']['Tables']['recipe_steps']['Row'];
export type TIngredient =
	Database['public']['Tables']['ingredients_dictionary']['Row'];
