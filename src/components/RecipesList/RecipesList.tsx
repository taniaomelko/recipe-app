import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { getData } from "../../data/api";
import { IRecipe } from "../../types/IRecipe";
import './RecipesList.scss';

interface RecipesListProps {
  recipes?: IRecipe[];
}
export const RecipesList: React.FC<RecipesListProps> = () => {
  const [allRecipes, setAllRecipes] = useState<IRecipe[]>([]);
  const [visibleRecipes, setVisibleRecipes] = useState<IRecipe[]>([]);
  
  useEffect(() => {
    const fetchRecipes = async () => {
      const data = await getData();
      setAllRecipes(data);
      setVisibleRecipes(data.slice(0, 2));
    };

    fetchRecipes();
  }, []);

  const loadMore = () => {
    const currentLength = visibleRecipes.length;
    const newVisibleRecipes = allRecipes.slice(currentLength, currentLength + 2);
    setVisibleRecipes((prevVisibleRecipes) => [...prevVisibleRecipes, ...newVisibleRecipes]);
  };

  const generateRecipeLink = (title:string) => {    
    return `${title.toLowerCase().replace(/\s+/g, '-')}`;
  };

  return (
    <section className="recipes">
      <div className="container">
        <div className="recipes__list">
          {visibleRecipes.map(recipe => (
            <Link to={`/recipes/${generateRecipeLink(recipe.title)}`} key={recipe.id} className="recipe-item">
              <h3 className="recipe-title">
                {recipe.title}
              </h3>
              <img src={`../../img/${recipe.img}`} alt={recipe.title} className="recipe-img" />
            </Link>
          ))}
        </div>

        <div className="load-more-btn">
          {visibleRecipes.length < allRecipes.length && (
            <button onClick={loadMore}>Load More</button>
          )}
        </div>
      </div>
    </section>
  );
}
