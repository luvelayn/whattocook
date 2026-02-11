export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      ingredients_dictionary: {
        Row: {
          created_at: string
          id: string
          name: string
          normalized_name: string
          updated_at: string
          usage_count: number
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          normalized_name: string
          updated_at?: string
          usage_count?: number
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          normalized_name?: string
          updated_at?: string
          usage_count?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          id: string
          name: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      recipe_ingredients: {
        Row: {
          created_at: string
          id: string
          ingredient_id: string
          name: string
          quantity: string
          recipe_id: string
          unit: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          ingredient_id: string
          name: string
          quantity: string
          recipe_id: string
          unit?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          ingredient_id?: string
          name?: string
          quantity?: string
          recipe_id?: string
          unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recipe_ingredients_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients_dictionary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_ingredients_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipe_steps: {
        Row: {
          created_at: string
          description: string
          id: string
          recipe_id: string
          step_number: number
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          recipe_id: string
          step_number: number
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          recipe_id?: string
          step_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "recipe_steps_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipes: {
        Row: {
          cooking_time: string | null
          created_at: string
          cuisines: string[]
          id: string
          meal_types: string[]
          photo_url: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          cooking_time?: string | null
          created_at?: string
          cuisines?: string[]
          id?: string
          meal_types?: string[]
          photo_url?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          cooking_time?: string | null
          created_at?: string
          cuisines?: string[]
          id?: string
          meal_types?: string[]
          photo_url?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      count_user_recipes: {
        Args: {
          p_cooking_time?: string
          p_cuisines?: string[]
          p_meal_types?: string[]
        }
        Returns: number
      }
      create_recipe: {
        Args: {
          p_cooking_time?: string
          p_cuisines?: string[]
          p_ingredients: Json
          p_meal_types?: string[]
          p_photo_url?: string
          p_steps: Json
          p_title: string
        }
        Returns: string
      }
      decrement_ingredient_usage: {
        Args: { p_ingredient_id: string }
        Returns: undefined
      }
      get_random_recipe: {
        Args: {
          p_cooking_time?: string
          p_cuisines?: string[]
          p_meal_types?: string[]
        }
        Returns: {
          cooking_time: string
          created_at: string
          cuisines: string[]
          id: string
          meal_types: string[]
          photo_url: string
          title: string
          updated_at: string
          user_id: string
        }[]
      }
      get_recipe_by_id: {
        Args: { p_recipe_id: string }
        Returns: {
          cooking_time: string
          created_at: string
          cuisines: string[]
          id: string
          ingredients: Json
          meal_types: string[]
          photo_url: string
          steps: Json
          title: string
          updated_at: string
          user_id: string
        }[]
      }
      get_user_recipes: {
        Args: {
          p_cooking_time?: string
          p_cuisines?: string[]
          p_limit?: number
          p_meal_types?: string[]
          p_offset?: number
        }
        Returns: {
          cooking_time: string
          created_at: string
          cuisines: string[]
          id: string
          ingredients: Json
          meal_types: string[]
          photo_url: string
          steps: Json
          title: string
          updated_at: string
          user_id: string
        }[]
      }
      increment_ingredient_usage: {
        Args: { p_ingredient_id: string }
        Returns: undefined
      }
      normalize_ingredient_name: {
        Args: { ingredient_name: string }
        Returns: string
      }
      search_ingredients: {
        Args: { result_limit?: number; search_term: string }
        Returns: {
          id: string
          name: string
          usage_count: number
        }[]
      }
      update_recipe: {
        Args: {
          p_cooking_time?: string
          p_cuisines?: string[]
          p_ingredients?: Json
          p_meal_types?: string[]
          p_photo_url?: string
          p_recipe_id: string
          p_steps?: Json
          p_title?: string
        }
        Returns: boolean
      }
      upsert_ingredient: { Args: { ingredient_name: string }; Returns: string }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
