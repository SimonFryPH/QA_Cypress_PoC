import '../../support/commands.js'

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});


describe('Link scanner ', async function () {

  beforeEach(() => {
    cy.visit(cy.config().ph.baseUrl)
    cy.url().should('contain', cy.config().ph.baseUrl)
  })

  it('Should scan for broken links', function () {
    cy.ScanForBrokenLinks();
  })


})

