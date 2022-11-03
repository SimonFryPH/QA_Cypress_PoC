const dayjs = require('dayjs')

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

cy.config().screenSizes.forEach((size) => {

  describe('Sun Communities UK ' + size[0] + ', ' + size[1], async function () {

    beforeEach(() => {
      cy.viewport(size[0], size[1]) // Change screen size
      cy.visit(cy.config().scuk.baseUrl)
      cy.url().should('contain', cy.config().scuk.baseUrl)
    })

    it('Should view Homepage', function () {
      cy.get('h2').eq(0).should('include.text', 'Sun Communities UK')
      cy.get('h2').eq(1).should('include.text', 'Our Brands')
      cy.get('h2').eq(2).should('include.text', 'Our Responsibilities')
      //more
    })

  })

}) //foreach screenSizes
