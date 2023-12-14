import Root from './components/Root/Root';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { RecipesList } from './components/RecipesList/RecipesList';
import { Recipe } from './components/Recipe/Recipe';
import './App.css';

const router = 
  createBrowserRouter(createRoutesFromElements(
    <Route path="*" element={ <Root/> }>
      <Route path="recipes" element={ <RecipesList recipes={[]} />} />
      <Route path="recipes/:title" element={<Recipe />} />
    </Route>
  ), {
    basename: process.env.PUBLIC_URL
  }
);

function App() {
  return (
    <RouterProvider router={ router } />
  );
}

export default App;
