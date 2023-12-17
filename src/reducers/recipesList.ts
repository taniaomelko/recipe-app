import { IRecipe } from "../types/IRecipe";

const initialState = {
  allRecipes: [],
  visibleRecipes: [],
  searchQuery: '',
};

interface RecipesListState {
  allRecipes: IRecipe[];
  visibleRecipes: IRecipe[];
  searchQuery: string,
}

type RecipesListAction =
  | { type: 'FETCH_RECIPES'; payload: IRecipe[] }
  | { type: 'LOAD_MORE' }
  | { type: 'SEARCH_RECIPES'; payload: string };

export const recipesListReducer = (state: RecipesListState = initialState, action: RecipesListAction): RecipesListState => {
  switch (action.type) {
    case 'FETCH_RECIPES':
      return {
        ...state,
        allRecipes: action.payload,
        visibleRecipes: action.payload.slice(0, 2),
      };
    case 'LOAD_MORE':
      const currentLength = state.visibleRecipes.length;
      const newVisibleRecipes = state.allRecipes.slice(currentLength, currentLength + 2);
      return {
        ...state,
        visibleRecipes: [...state.visibleRecipes, ...newVisibleRecipes],
      };
    case 'SEARCH_RECIPES':
      console.log(state);
      const searchQuery = action.payload.toLowerCase();
      const filteredRecipes = state.allRecipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchQuery)
      );
      return {
        ...state,
        searchQuery,
        visibleRecipes: filteredRecipes,
      };
    default:
      return state;
  }
}
