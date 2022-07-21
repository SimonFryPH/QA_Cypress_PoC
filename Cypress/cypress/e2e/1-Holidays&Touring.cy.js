describe('Holidays & Touring', function () {

  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl)
  })

  it('Should view & Search Holidays', function () {
    cy.get('.site-block__info--holiday .button--holiday').click()
    expect(cy.get('.text--primary').contains('Caravan Holidays & Short Breaks'))
    //search location
    //month of arrival
    //nights
    //date of arrival
    //'SEARCH'
  })

  
  it.only('Should view & Search Touring & Pods', function () {
    cy.get('.site-block__info--holiday .button--touring').click()
    //expect(cy.get('.text--primary:nth-of-type(1)').contains('Touring Caravan Sites & UK Campsites'))

    cy.get('.css-5dckes').click()

    

    //search location
    //month of arrival
    //nights
    //date of arrival
    //'SEARCH'
  })


})
