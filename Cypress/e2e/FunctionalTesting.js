const dayjs = require('dayjs');

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

const sizes = Cypress.config().screenSizes

describe('Functional UI testing', async function () {

    beforeEach(() => {
        sizes.forEach((size) => {
          cy.viewport(size[0], size[1]) // Change screen size
    
          cy.visit(Cypress.config().baseUrl)
          cy.url().should('eq', Cypress.config().baseUrl)
          cy.get('#onetrust-button-group #onetrust-accept-btn-handler').click()
          cy.setCookie('OptanonAlertBoxClosed', dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSZZ")) // Create cookie to disable cookie banner
        })
      })


    it('Should do some function as described in the user story', function () {
     

    })


})
