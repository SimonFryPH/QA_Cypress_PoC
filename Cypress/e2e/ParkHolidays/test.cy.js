Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Testing stuff ', async function () {

    it('Should test something', function () {

      cy.visit(cy.config().ph.baseUrl)
      expect(true).to.equal(true)

    })

  })


