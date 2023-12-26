import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { getData } from "../../data/api";
import { IRecipe } from "../../types/IRecipe";
import './RecipesList.scss';
import { fetchRecipesAction, loadMoreAction } from "../../actions";
import { generateRecipeLink } from "../../utils";
import { Search } from "../Search/Search";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../reducers";

interface RecipesListProps {
  recipes?: IRecipe[];
}

export const RecipesList: React.FC<RecipesListProps> = () => {
  const dispatch = useDispatch();  
  const allRecipes = useSelector((state: RootState) => state.recipes.allRecipes);
  const visibleRecipes = useSelector((state: RootState) => state.recipes.visibleRecipes);
  const searchQuery = useSelector((state: RootState) => state.recipes.searchQuery);
  const totalLoaded = useSelector((state: RootState) => state.recipes.totalLoaded);

  const [isLoadMoreVisible, setLoadMoreVisible] = useState(true);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      const data = await getData();
      dispatch(fetchRecipesAction(data));
    };

    fetchRecipes();
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (visibleRecipes.length > 0 && visibleRecipes.length < allRecipes.length) {
      setLoadMoreVisible(true);
      if (visibleRecipes.length !== totalLoaded) {
        setLoadMoreVisible(false);
      }
    } else {
      setLoadMoreVisible(false);
    }
  }, [visibleRecipes, allRecipes, searchQuery, totalLoaded]);


  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  const loadMore = () => {
    dispatch(loadMoreAction());
  };

  return (
    <section className="recipes">
      <div className="container">
        <div className="recipes__search">
          <Search />
        </div>
        <div className="recipes__list" id="recipes-list">
          {visibleRecipes.map(recipe => (
            <Link to={`/recipes/${generateRecipeLink(recipe.title)}`} key={recipe.id} className="recipe-item">
              <h3 className="recipe-title">
                {recipe.title}
              </h3>
              <img src={`./img/${recipe.img}`} alt={recipe.title} className="recipe-img" />
            </Link>
          ))}
        </div>

        {isLoadMoreVisible && (
          <div className="load-more-btn" id="load-more-btn">
            <button onClick={loadMore}>Load More</button>
          </div>
        )}

        {!visibleRecipes.length && allRecipes.length > 0 && (
          <div id="no-recipe-msg">No recipes found</div>
        )}
      </div>
    </section>
  );
}
