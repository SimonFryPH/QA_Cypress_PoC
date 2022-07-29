describe('Holiday booking flow E2E', function () {

    beforeEach(() => {
        cy.visit(Cypress.config().baseUrl)
        cy.url().should('eq', Cypress.config().baseUrl)
        cy.get('[id="cookieBanner"] .button').click()
    })

    it('Should search & book a holiday', function () {
        cy.get('.site-block__info--holiday .button--holiday').click()
        cy.wait(1000)
        cy.get('.text--primary').should('include.text', 'Caravan Holidays & Short Breaks')

        //** Complete availability search form
        var myParks = Cypress.config().phHolidayParks
        cy.log("Test to ensure both test data and website are displaying all holiday Parks")
        cy.get('[name="location"] option:not([value="all"]):not([value^="C"])').its('length').should('be.eq', myParks.length)
        cy.get('[name="location"]').select("All Parks") // Defaults to "All PArks"
        cy.wait(500)
        cy.get('[name="monthOfArrival"] option').its('length').should('be.gt', 1)
        cy.get('[name="monthOfArrival"]').select(6) // Hopefully some availability in 6 months
        cy.wait(1000)
        cy.get('[name="nights"] option').its('length').should('be.gt', 1)
        cy.get('[name="nights"]').select(1) // 3 nights
        cy.wait(1000)
        cy.get('[name="dateOfArrival"] option').its('length').should('be.gt', 1)
        cy.get('[name="dateOfArrival"]').select(1) // First date in list
        cy.wait(1000)
        cy.get('[name="availability"] .button--holiday').click() // Click Search
        cy.wait(1000)

        // **Click first county record
        cy.get('.card--county .button--holiday').its('length').should('be.gt', 0)
        cy.get('.card--county .button--holiday').first().click() //eg VIEW ESSEX PARKS
        cy.wait(1000)
        
        // **Click first holiday destination record in selected county
        cy.get('.card .button--holiday').its('length').should('be.gt', 0)
        cy.get('.card .button--holiday').first().click() //eg VIEW RESULTS (Martello Beach)
        cy.wait(1000)

        // **Click BOOK NOW on first accomodation record
        cy.get('.card--holiday .button--holiday').its('length').should('be.gt', 0)
        cy.get('.card--holiday .button--holiday').first().click() //eg BOOK NOW (Gold Caravan)
        cy.wait(1000)

        // **Guest information
        cy.get('[name="noAdults"]').select('1') // Set Adults to 1
        cy.get('.text-right .btn-primary').first().click() // Click continue
        cy.wait(1000)

        // ** Your details
        cy.get('[name="title"]').select("Mr")
        cy.get('[name="firstname"]').type("SimonPHUKTest");
        cy.get('[name="surname"]').type("FryPHUKTest");
        cy.get('[name="phoneno"]').type("01234567890");
        cy.get('[name="email"]').first().type("phtestaccount@email.com");
        cy.get('[name="PostcodeLookup"]').type("TN39 5ES");
        cy.get('.js-postcode-lookup').first().click() // Click Find Address
        cy.wait(1000)
        cy.get('#drpAddresses').select("Park Holidays UK Ltd, Glovers House Glovers End Bexhill-on-Sea")
        cy.wait(1000)
        cy.get('input[type="checkbox"][name="termsandconditionsagreed"]').click({ force: true }) // Click T&C's
        cy.get('.continueToPayment').first().click() // Click continue
        cy.get('#errorMsg').should('not.be.visible') // Check for errors
        cy.wait(4000)

        // Payment page
        cy.get('#payment-container').should('exist')
        cy.get('#payment-container').should('be.visible')

    })


    
})
