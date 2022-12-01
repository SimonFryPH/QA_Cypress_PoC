import '../../support/commands.js'

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});


describe('Link scanner ', async function () {

  beforeEach(() => {
    //
  })

  it('Should scan for broken links ' + cy.config().ph.baseUrl, function () {
    cy.visit(cy.config().ph.baseUrl)
    cy.url().should('contain', cy.config().ph.baseUrl)
    cy.ScanForBrokenLinks();
  })


})

