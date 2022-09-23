const dayjs = require('dayjs')

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

const sizes = Cypress.config().screenSizes

describe('Holiday Booking flow E2E', async function () {

    beforeEach(() => {
        sizes.forEach((size) => {
          cy.viewport(size[0], size[1]) // Change screen size
    
          cy.visit(Cypress.config().baseUrl)
          cy.url().should('eq', Cypress.config().baseUrl)
          if (window.location.href.indexOf("www.parkholidays.com") > -1)
          {
            cy.get('#onetrust-button-group #onetrust-accept-btn-handler').click()
            cy.setCookie('OptanonAlertBoxClosed', dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSZZ")) // Create cookie to disable cookie banner
          }
        })
      })

    it('Should search and book a Holiday', async function () {
        cy.get('.site-block .button--holiday').click()
        cy.get('.text--primary').should('include.text', 'Caravan Holidays & Short Breaks')
        //
        cy.log(">> Complete availability search form")
        cy.log("Test to ensure both test data and website are displaying the correct Parks")
        cy.get('[name="location"] option:not([value="all"]):not([value^="C"])').its('length').should('be.eq', cy.config().phHolidayParks.length)
        //cy.get('[name="location"]').select("All Parks") // Defaults to "All Parks"
        cy.wait(500)
        cy.get('[name="monthOfArrival"] option').its('length').should('be.gt', 1)
        cy.get('[name="monthOfArrival"]').select(6) // Assumes availability in 6 months
        cy.wait(5000)
        cy.get('[name="nights"] option').its('length').should('be.gt', 1)
        cy.get('[name="nights"]').select(1) // 3 nights
        cy.wait(2000)
        cy.get('[name="dateOfArrival"] option').its('length').should('be.gt', 1)
        cy.get('[name="dateOfArrival"]').select(1) // First date in list
        cy.wait(1000)
        cy.get('[name="availability"] .button--holiday').click() // Search
        cy.wait(1000)
        //
        cy.log(">> Click first county record")
        cy.get('.card--county .button--holiday').its('length').should('be.gt', 0)
        cy.get('.card--county .button--holiday').first().click() //eg Essex
        //
        cy.log(">> Click first holiday destination record in selected county")
        cy.get('.card .button--holiday').its('length').should('be.gt', 0)
        cy.get('.card .button--holiday').first().click() //eg Martello Beach (in Essex)
        //
        cy.log(">> Click BOOK NOW on first accommodation record")
        cy.get('.card--holiday .button--holiday').its('length').should('be.gt', 0)
        cy.get('.card--holiday .button--holiday').first().click() //eg Gold Caravan
        //
        cy.log(">> Guest information")
        cy.get('[name="noAdults"]').select('1') // Set Adults to 1
        cy.get('[name="noChildren"]').select('1') // Set Children to 1
        cy.get('.text-right .btn-primary').first().click() // Continue
        //
        cy.log(">> Your details")
        cy.get('[name="title"]').select(cy.config().testUser.title)
        cy.get('[name="firstname"]').type(cy.config().testUser.firstname)
        cy.get('[name="surname"]').type(cy.config().testUser.surname)
        cy.get('[name="phoneno"]').type(cy.config().testUser.phoneno)
        cy.get('[name="email"]').first().type(cy.config().testUser.email)
        cy.get('[name="PostcodeLookup"]').type(cy.config().testUser.postcode)
        cy.get('.js-postcode-lookup').first().click() // Find address
        cy.get('#drpAddresses').select(cy.config().testUser.fulladdress)
        cy.get('input[type="checkbox"][name="termsandconditionsagreed"]').click({ force: true }) // T&C's

        // Submit
        if (cy.config().submitBooking) {
            cy.log("submitBooking has been enabled in the Config file")
            //
            cy.get('.continueToPayment').first().click() // Continue
            cy.get('#errorMsg').should('not.be.visible') // Check for errors
            //
            cy.log(">> Payment page checks")
            cy.get('#payment-container').should('exist')
            cy.get('#payment-container').should('be.visible')
            cy.get('.booking-summary').should('exist')
            cy.get('.booking-summary').should('be.visible')

        } else {
            cy.log("submitBooking has been disabled in the Config file")
        }

    })

})
