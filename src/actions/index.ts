import { IRecipe } from "../types/IRecipe";

export const fetchRecipesAction = (recipes: IRecipe[]) => ({
  type: 'FETCH_RECIPES' as const,
  payload: recipes,
});

export const loadMoreAction = () => ({
  type: 'LOAD_MORE' as const,
});

export const searchRecipes = (query: string) => ({
  type: 'SEARCH_RECIPES' as const,
  payload: query,
});
