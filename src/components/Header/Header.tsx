import React from "react";
import { NavLink } from "react-router-dom";
import './Header.scss';

export const Header:React.FC = () => {
  return (
    <header>
      <div className="container">
        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/recipes">Recipes</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
