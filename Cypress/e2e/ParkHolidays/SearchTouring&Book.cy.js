const dayjs = require('dayjs');

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

function killChat() {
  cy.log(">> KILL CHAT")
  cy.window().then((win) => {
    if (win.LC_API?.is_loaded()) {
      cy.log(">>> CHAT is loaded")
      win.LC_API.hide_chat_window();
      win.LC_API.close_chat();
      delete win.LC_API;
    }
  });
}

cy.config().screenSizes.forEach((size) => {

  describe('Holiday Touring & Camping search ' + size[0] + ', ' + size[1], async function () {

    this.beforeAll(() => {
      killChat();
    });
    
    beforeEach(() => {
      cy.viewport(size[0], size[1]) // Change screen size
      cy.visit(Cypress.config().ph.baseUrl)
      cy.url().should('contain', Cypress.config().ph.baseUrl)
      if (window.location.href.indexOf("parkholidays.com") > -1) {
        cy.get('#onetrust-button-group #onetrust-accept-btn-handler').click()
        cy.setCookie('OptanonAlertBoxClosed', dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSZZ")) // Create cookie to disable cookie banner
      }
    })


    it('Should search & book a Touring holiday', function () {
      cy.get('#site-blocks .button--touring').click()
      cy.get('.text--primary').should('include.text', 'Touring Caravan Sites & UK Campsites')
      //
      cy.log(">> Complete availability search form")
      cy.log("Test to ensure both test data and website are displaying the correct Parks")
      cy.get('[name="location"] option:not([value="all"]):not([value^="C"])').its('length').should('be.eq', cy.config().ph.touringParks.length)
      cy.get('[name="location"]').select("All Parks") // Defaults to "All Parks"
      cy.wait(500)
      cy.get('[name="monthOfArrival"] option').its('length').should('be.gt', 1)
      cy.get('[name="monthOfArrival"]').select(6) // Hopefully some availability in 6 months
      cy.wait(3000)
      cy.get('[name="nights"] option').its('length').should('be.gt', 1)
      cy.get('[name="nights"]').select(1) // 3 nights
      cy.wait(1000)
      cy.get('[name="dateOfArrival"] option').its('length').should('be.gt', 1)
      cy.get('[name="dateOfArrival"]').select(1) // First date in list
      cy.wait(1000)
      cy.get('[name="availability"] .button--touring').click() // Search
      cy.wait(1000)
      //
      cy.log(">> Click first county record")
      cy.get('.card--county .button--touring').its('length').should('be.gt', 0)
      cy.get('.card--county .button--touring').first().click() //eg Devon Parks
      //
      cy.log(">> Click first holiday destination record in selected county")
      cy.get('.card .button--touring').its('length').should('be.gt', 0)
      cy.get('.card .button--touring').first().click() //eg Hedley Wood
      //
      cy.log(">> Click BOOK NOW on first accommodation record")
      cy.get('.card .button--touring').its('length').should('be.gt', 0)
      cy.get('.card .button--touring').first().click() //eg Grass pitch
      //
      cy.log(">> Guest information & Extras")
      cy.get('[name="noAdults"]').select('1') // 1 Adult
      cy.get('[name="noChildren"]').select('1') // 1 Children
      cy.get('#bookingExtras .phuk-extra:nth-child(8) a').first().click() // Extra car
      cy.get('[name="Extras[TEXCAR].Quantity"]').select('1') // Set 1 extra car
      cy.get('#bookingExtras .phuk-extra:nth-child(9) a').first().click() // Awning/Kids tent
      cy.get('[name="Extras[TEXAWN].Quantity"]').select('1') // Set 1 extra kids tent
      //cy.get('#bookingExtras .phuk-extra:nth-child(10) a').eq(0).click() // Pets
      cy.get('[name="Extras[TOURDOG].Quantity"]').select('1') // Lets take a dog
      //
      cy.get('.text-right .btn-primary').first().click({ force: true }) // Continue
      //
      cy.log(">> Your details")
      cy.get('[name="title"]').select(cy.config().testUser.title)
      cy.get('[name="firstname"]').type(cy.config().testUser.firstname)
      cy.get('[name="surname"]').type(cy.config().testUser.surname)
      cy.get('[name="phoneno"]').type(cy.config().testUser.phoneno)
      cy.get('[name="email"]').first().type(cy.config().testUser.email)
      cy.get('[name="PostcodeLookup"]').type(cy.config().testUser.postcode)
      cy.get('.js-postcode-lookup').first().click() // Find address
      cy.wait(1000)
      cy.get('#drpAddresses').select(cy.config().testUser.fulladdress)
      cy.wait(1000)
      cy.get('input[type="checkbox"][name="termsandconditionsagreed"]').click({ force: true }) // Click T&C's

      //
      if (cy.config().submit) {
        cy.get('.continueToPayment').first().click() // Click continue
        cy.get('#errorMsg').should('not.be.visible') // Check for errors
        cy.wait(4000)
        //
        cy.log(">> Payment page checks")
        cy.get('#payment-container').should('exist')
        cy.get('#payment-container').should('be.visible')
        cy.get('.booking-summary').should('exist')
        cy.get('.booking-summary').should('be.visible')
      } else {
        cy.log("submit has been disabled in the Config file")
      }
      cy.log("Finish")
    })
  })

}) //foreach screenSizes
