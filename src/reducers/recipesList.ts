import { IRecipe } from "../types/IRecipe";

const initialState = {
  allRecipes: [],
  visibleRecipes: [],
  searchQuery: '',
  recipesPerLoad: 2,
  totalLoaded: 2,
  filteredRecipesLength: 0,
};
interface RecipesListState {
  allRecipes: IRecipe[],
  visibleRecipes: IRecipe[],
  searchQuery: string,
  recipesPerLoad: number,
  totalLoaded: number,
  filteredRecipesLength: number,
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
        visibleRecipes: action.payload.slice(0, state.recipesPerLoad),
        totalLoaded: state.recipesPerLoad,
      };
    case 'LOAD_MORE':
      const currentLength = state.visibleRecipes.length;
      let newVisibleRecipes;
      if (state.searchQuery.length > 0) {
        newVisibleRecipes = state.allRecipes
          .filter((recipe) => recipe.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
          .slice(currentLength, currentLength + state.recipesPerLoad);
      } else {
        newVisibleRecipes = state.allRecipes.slice(currentLength, currentLength + state.recipesPerLoad);
      }
      const calcTotal = Math.min(state.totalLoaded + state.recipesPerLoad, state.allRecipes.length);
      return {
        ...state,
        visibleRecipes: [...state.visibleRecipes, ...newVisibleRecipes],
        totalLoaded: calcTotal,
      };
    case 'SEARCH_RECIPES':
      const searchQuery = action.payload.toLowerCase();
      let filteredRecipes = state.allRecipes
        .filter((recipe) => recipe.title.toLowerCase().includes(searchQuery));
      const filteredRecipesLength = filteredRecipes.length;
      if (searchQuery.length > 0) {
        if (filteredRecipes.length > state.totalLoaded) {
          filteredRecipes = filteredRecipes.slice(0, state.totalLoaded);
        }
      } else {
        filteredRecipes = state.allRecipes.slice(0, state.totalLoaded);
      }
      return {
        ...state,
        searchQuery,
        visibleRecipes: filteredRecipes,
        filteredRecipesLength
      };
    default:
      return state;
  }
}
