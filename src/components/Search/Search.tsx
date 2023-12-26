import React from 'react';
import './Search.scss';
import { searchRecipesAction } from '../../actions';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../reducers";

export const Search: React.FC = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.recipes.searchQuery);

  const handleSearch = () => {
    dispatch(searchRecipesAction(searchQuery));
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search recipes..."
        onChange={(e) => dispatch(searchRecipesAction(e.target.value))}
        className="search-input"
        id="search-input"
        value={searchQuery}
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  );
};
