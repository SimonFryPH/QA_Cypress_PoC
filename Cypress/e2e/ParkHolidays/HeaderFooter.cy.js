const dayjs = require('dayjs')

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

cy.config().screenSizes.forEach((size) => {

  describe('Header, Footer and menus ' + size[0] + ', ' + size[1], async function () {

    beforeEach(() => {
      cy.viewport(size[0], size[1]) // Change screen size
      cy.visit(cy.config().ph.baseUrl)
      cy.url().should('contain', cy.config().ph.baseUrl)
      if (window.location.href.indexOf("parkholidays.com") > -1) {
        cy.get('#onetrust-accept-btn-handler').click()
        cy.setCookie('OptanonAlertBoxClosed', dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSZZ")) // Create cookie to disable cookie banner
      }
    })

    it('Should access to the side menu bar', function () {

      cy.get('header li:nth-child(3) > button').click() // Menu
      cy.get('header li:nth-child(3) > button').should('include.text', 'Menu')
      //
      cy.get('[data-trigger="onclose"] div').should('include.text', 'Home')
      cy.get('[data-trigger="onclose"] div').should('include.text', 'Our Parks')
      cy.get('[data-trigger="onclose"] div').should('include.text', 'Holidays & Short Breaks')
      cy.get('[data-trigger="onclose"] div').should('include.text', 'Touring & Camping')
      cy.get('[data-trigger="onclose"] div').should('include.text', 'Holiday Home Ownership')

      cy.get('[data-trigger="onclose"] button').first().click() // Menu close

    })

  })

}) //foreach screenSizes
