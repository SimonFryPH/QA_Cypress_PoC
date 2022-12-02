import '../../support/commands.js'

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});


describe('Link scanner ', async function () {

  beforeEach(() => {
    //
  })

  it('Should scan for broken links' + cy.config().plh.baseUrl, function () {
    cy.visit(cy.config().plh.baseUrl)
    cy.url().should('contain', cy.config().plh.baseUrl)
    cy.ScanForBrokenLinks(false,true);
  })

})

