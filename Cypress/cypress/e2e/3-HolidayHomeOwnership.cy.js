describe('Holiday Home Ownership', function () {

  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl)
    //Click Holiday Home Ownership
    cy.get('.site-block__info--ownership .button--ownership').click()
    expect(cy.get('.text--primary').contains('Caravan Holidays & Short Breaks'))
  })

  it('User journey 1', function () {

  })

})
