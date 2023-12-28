import App from "../../src/App";
import { RecipesList } from "../../src/components/RecipesList/RecipesList";
import { Recipe } from "../../src/components/Recipe/Recipe";

describe("NewsLetterSubscription.cy.js", () => {
  it("Should display a ", () => {
    cy.mount(<RecipesList />);
  });

  it("Should display a ", () => {
    cy.mount(<Recipe />);
  });
});
