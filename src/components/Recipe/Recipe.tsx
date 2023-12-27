import React, { useState, useEffect } from "react";
import { IRecipe } from "../../types/IRecipe";
import './Recipe.scss';
import { useParams, useNavigate } from "react-router-dom";
import { getData } from "../../data/api";
import { generateRecipeLink } from "../../utils";

export const Recipe: React.FC = () => {
  const { title = '' } = useParams<{ title: string }>();
  const navigate = useNavigate();

  const [allRecipes, setAllRecipes] = useState<IRecipe[]>([]);
  const [currentRecipe, setCurrentRecipe] = useState<IRecipe | undefined>();
  
  useEffect(() => {
    const fetchRecipes = async () => {
      const data = await getData();
      setAllRecipes(data);
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    setCurrentRecipe(allRecipes.find(recipe => generateRecipeLink(recipe.title) === title));
  }, [allRecipes, title]);

  const handlePrevClick = () => {
    navigate(-1);
  };

  return (
    <section className="recipe">
      <div className="container">
        <div className="recipe__prev-btn-wrap">
          <button onClick={handlePrevClick} id="back-button">Back</button>
        </div>

        {currentRecipe ? (
          <div>
            <h2 className="recipe__title">{currentRecipe.title}</h2>
            <img src={`./img/${currentRecipe.img}`} alt={currentRecipe.title} className="recipe__img" />
            <div className="recipe__ingredients">
              <h3 className="recipe__subtitle">Ingredients:</h3>
              <ul>
                {currentRecipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div className="recipe__instructions">
              <h3 className="recipe__subtitle">Instructions:</h3>
              <ol>
                {currentRecipe.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>
          </div>
        )
        : (
          <>
            <h2>Recipe not found</h2>
            <p>No information available for {title}</p>
          </>
        )}
      </div>
    </section>
  );
}
