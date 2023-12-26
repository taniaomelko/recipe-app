describe('Request', () => {
  it('should load all recipes from API', () => {
    cy.request('http://localhost:3000/recipe-app/api/api.json')
      .should((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.length(5)
    });
  })
});

describe('No recipes found test', () => {
  it('should display "No recipes found" message after random searching', () => {
    cy.visit('/recipes');
    cy.get('#search-input').type('qwerty');
    cy.get('#no-recipe-msg').should('exist');
  });
});

describe('Load more button test', () => {
  it('should load more recipes on button click', () => {
    cy.visit('/recipes');
    cy.get('#recipes-list .recipe-item') 
    .its('length')
    .then((cardCount) => {
      cy.get('#load-more-btn').click();
      cy.get('#recipes-list .recipe-item') 
        .its('length').should('be.gt', cardCount);
    });
  });
});

describe('Search for "c" test', () => {
  it('should display 2 recipes', () => {
    cy.visit('/recipes');
    cy.get('#load-more-btn').click();
    cy.get('#load-more-btn').click();
    cy.get('#search-input').type('c');
    cy.get('#recipes-list .recipe-item').its('length').should('eq', 2);    
  });
});

describe('Search for "l" test', () => {
  beforeEach(() => {
    cy.visit('/recipes');
  });
  it('should display 2 recipes', () => {
    cy.get('#search-input').type('l');
    cy.get('#recipes-list .recipe-item').its('length').should('eq', 2);
  });
  it('should display 3 recipes', () => {
    cy.get('#load-more-btn').click().click();
    cy.get('#search-input').type('l');
    cy.get('#recipes-list .recipe-item').its('length').should('eq', 3);
  });
  it('should display 3 recipes', () => {
    cy.get('#search-input').type('l');
    cy.get('#load-more-btn').click();
    cy.get('#recipes-list .recipe-item').its('length').should('eq', 3);
  });
});

describe('Search for "a" test', () => {
  beforeEach(() => {
    cy.visit('/recipes');
  });
  it('should display 2 recipes', () => {
    cy.get('#search-input').type('a');
    cy.get('#recipes-list .recipe-item').its('length').should('eq', 2);
  });
  it('should display 4 recipes', () => {
    cy.get('#search-input').type('a');
    cy.get('#load-more-btn').click();
    cy.get('#recipes-list .recipe-item').its('length').should('eq', 4);
  });
  it('should display 5 recipes', () => {
    cy.get('#load-more-btn').click().click();
    cy.get('#search-input').type('a');
    cy.get('#recipes-list .recipe-item').its('length').should('eq', 5);
  });
});

describe('Search for " " test', () => {
  beforeEach(() => {
    cy.visit('/recipes');
  });
  it('should display 2 recipes', () => {
    cy.get('#search-input').type('qwerty').clear();
    cy.get('#recipes-list .recipe-item').its('length').should('eq', 2);
  });
  it('should display 4 recipes', () => {
    cy.get('#load-more-btn').click();
    cy.get('#search-input').type('qwerty').clear();
    cy.get('#recipes-list .recipe-item').its('length').should('eq', 4);
  });
  it('should display 5 recipes', () => {
    cy.get('#load-more-btn').click().click();
    cy.get('#search-input').type('qwerty').clear();
    cy.get('#recipes-list .recipe-item').its('length').should('eq', 5);
  });
});

describe('Search for "s" test', () => {
  beforeEach(() => {
    cy.visit('/recipes');
  });
  it('should display 2 recipes', () => {
    cy.get('#search-input').type('s');
    cy.get('#recipes-list .recipe-item').its('length').should('eq', 2);
  });
  it('should display 4 recipes', () => {
    cy.get('#load-more-btn').click();
    cy.get('#search-input').type('s');
    cy.get('#recipes-list .recipe-item').its('length').should('eq', 4);
    cy.get('#load-more-btn').should('not.exist');
  });
});

