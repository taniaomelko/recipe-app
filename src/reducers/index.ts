import { combineReducers } from "redux";
import { recipesListReducer } from "./recipesList";

export const allReducers = combineReducers({
  recipesListReducer,
});
