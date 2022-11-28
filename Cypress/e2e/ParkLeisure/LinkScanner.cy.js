import '../../support/commands.js'

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});


describe('Link scanner ', async function () {

  beforeEach(() => {
    cy.visit(cy.config().pl.baseUrl)
    cy.url().should('contain', cy.config().pl.baseUrl)
  })

  it('Should scan for broken links', function () {
    cy.ScanForBrokenLinks();
  })


})

