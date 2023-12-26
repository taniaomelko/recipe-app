import { IRecipe } from "../types/IRecipe";

export const fetchRecipesAction = (recipes: IRecipe[]) => ({
  type: 'FETCH_RECIPES',
  payload: recipes,
});

export const loadMoreAction = () => ({
  type: 'LOAD_MORE',
});

export const searchRecipesAction = (query: string) => ({
  type: 'SEARCH_RECIPES',
  payload: query,
});

export const setRecipesPerLoadAction = (number: number) =>({
  type: 'SET_RECIPES_PER_LOAD',
  payload: number
});
