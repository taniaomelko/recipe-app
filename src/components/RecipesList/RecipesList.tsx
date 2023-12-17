import React, { useEffect, useReducer } from "react";
import { Link } from 'react-router-dom';
import { getData } from "../../data/api";
import { IRecipe } from "../../types/IRecipe";
import './RecipesList.scss';
import { fetchRecipesAction, loadMoreAction } from "../../actions";
import { recipesListReducer } from "../../reducers/recipesList";
import { generateRecipeLink } from "../../utils";
import { Search } from "../Search/Search";

interface RecipesListProps {
  recipes?: IRecipe[];
}
export const RecipesList: React.FC<RecipesListProps> = () => {
  const [ state, dispatch ] = useReducer(recipesListReducer, {
    allRecipes: [],
    visibleRecipes: [],
    searchQuery: '',
  });

  useEffect(() => {
    const fetchRecipes = async () => {
      const data = await getData();
      dispatch(fetchRecipesAction(data));
    };

    fetchRecipes();
  }, []);

  const loadMore = () => {
    dispatch(loadMoreAction());
  };

  return (
    <section className="recipes">
      <div className="container">
        <div className="recipes__search">
          <Search />
        </div>
        <div className="recipes__list">
          {state.visibleRecipes.map(recipe => (
            <Link to={`/recipes/${generateRecipeLink(recipe.title)}`} key={recipe.id} className="recipe-item">
              <h3 className="recipe-title">
                {recipe.title}
              </h3>
              <img src={`./img/${recipe.img}`} alt={recipe.title} className="recipe-img" />
            </Link>
          ))}
        </div>

        <div className="load-more-btn">
          {state.visibleRecipes.length < state.allRecipes.length && (
            <button onClick={loadMore}>Load More</button>
          )}
        </div>
      </div>
    </section>
  );
}
