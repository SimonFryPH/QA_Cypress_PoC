const dayjs = require('dayjs')

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

cy.config().screenSizes.forEach((size) => {

  describe('Miscellaneous ' + size[0] + ', ' + size[1], async function () {

    beforeEach(() => {
      cy.viewport(size[0], size[1]) // Change screen size
      cy.visit(cy.config().ph.baseUrl)
      cy.url().should('contain', cy.config().ph.baseUrl)
      if (window.location.href.indexOf("parkholidays.com") > -1) {
        cy.get('#onetrust-accept-btn-handler').click()
        cy.setCookie('OptanonAlertBoxClosed', dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSZZ")) // Create cookie to disable cookie banner
      }
    })


    it('Should view a Park Menu', function () {

      cy.visit(cy.config().ph.baseUrl + '/caravan-holidays/half-board-catered-inclusive')
      
      cy.get('h5').eq(0).should('include.text', 'Park Menu')
      cy.get('#parkGuideSelect option').eq(0).should('include.text', 'Please selectx')
      cy.get('#parkGuideSelect option').its('length').should('be.gt', 25) // shows we have some park menus to select

      cy.get('[name="parkmenuselect"]').select(Math.floor((Math.random() * 25) + 1)) // Pick random park menu
      cy.get('#parkMenuForm > button').click() // Menu
      //cy.url().should('include', '/assets') // new tab menu

    })

  })

}) //foreach screenSizes
