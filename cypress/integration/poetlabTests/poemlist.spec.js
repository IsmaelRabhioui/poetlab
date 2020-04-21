describe('Poem list test', function () {
  //you have to be logged out
  it('Poem list page renders normally', function () {
    cy.visit('/');
    cy.get('[data-cy=usernameInput]').type("ismael");
    cy.get('[data-cy=passwordInput]').type("test123");
    cy.get('button').click();
    cy.get('[data-cy=filterInput]').should('be.disabled');
  });

  it('filter works with a filter type', function () {
    cy.get('[data-cy=filterType]').click();
    cy.get('[data-cy=filterTypeTitle]').click();
    cy.get('[data-cy=filterInput]').type('Man and the Sea');
    cy.get('[data-cy=poemCard]').should('have.length', 1);
    //cleane filterInput
    cy.get('[data-cy=filterInput]').clear();
  });

  // cy.select doesn't work with mat-select.
  // If you want to get another element of the page
  // while 'mat-select multiple' is open  
  // you have to refresh the page otherwise cy.get()
  // does not find the element
  it('filter works with a filter theme', function () {
    //theme oceans
    cy.get('[data-cy=filterTheme]').click();
    cy.get('#mat-option-90').click();
    cy.get('[data-cy=poemCard]').should('have.length', 2);
    // unselect oceans
    cy.get('#mat-option-90').click();
  });

  it('filter works with multiple filter theme', function () {
    //theme oceans
    cy.get('#mat-option-90').click();
    //theme myth
    cy.get('#mat-option-85').click();
    cy.get('[data-cy=poemCard]').should('have.length', 4);
    // unselect oceans and myth
    cy.get('#mat-option-90').click();
    cy.get('#mat-option-85').click();
  });

  it('filter works with a filter type and theme', function () {
    cy.visit('/');
    cy.get('[data-cy=filterType]').click();
    cy.get('[data-cy=filterTypeTitle]').click();
    cy.get('[data-cy=filterInput]').type('Man and the Sea');
    cy.get('[data-cy=filterTheme]').click();
    //theme oceans
    cy.get('#mat-option-90').click();
    cy.get('[data-cy=poemCard]').should('have.length', 1);
  });

  it('filter works when none matches', function () {
    cy.visit('/');
    cy.get('[data-cy=filterType]').click();
    cy.get('[data-cy=filterTypeTitle]').click();
    cy.get('[data-cy=filterInput]').type('#');
    cy.get('[data-cy=poemCard]').should('have.length', 0);
  });
});
