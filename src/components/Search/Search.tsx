import React, { useReducer, MouseEvent } from 'react';
import './Search.scss';
import { searchRecipes } from '../../actions';
import { recipesListReducer } from '../../reducers/recipesList';

export const Search: React.FC = () => {
  const [state, dispatch] = useReducer(recipesListReducer, {
    allRecipes: [],
    visibleRecipes: [],
    searchQuery: '',
  });

  const handleSearch = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('Searching for:', state.searchQuery);
    dispatch(searchRecipes(state.searchQuery));
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search recipes..."
        value={state.searchQuery}
        onChange={(e) => dispatch(searchRecipes(e.target.value))}
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  );
};
