import { RecipesList } from "../../src/components/RecipesList/RecipesList";
import { getStore } from "../../src/store";

describe("NewsLetterSubscription.cy.js", () => {
  it("Should display a ", () => {
    const store = getStore();
    cy.mount(<RecipesList />);
    // cy.mount(<RecipesList />, { reduxStore: store });
  });
});
