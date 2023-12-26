import { combineReducers } from "redux";
import { recipesListReducer } from "./recipesList";

export const RootReducer = combineReducers({
  recipes: recipesListReducer,
});

export type RootState = ReturnType<typeof RootReducer>;
