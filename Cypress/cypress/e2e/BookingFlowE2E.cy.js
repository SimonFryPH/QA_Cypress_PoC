describe('Holidays Booking Flow E2E', function () {

    beforeEach(() => {
        cy.visit(Cypress.config().baseUrl)

        //page load test
    })

    it('Should view & Search Holidays', function () {
        cy.get('.site-block__info--holiday .button--holiday').click()
        cy.wait(1000)
        expect(cy.get('.text--primary').contains('Caravan Holidays & Short Breaks'))


        //** Complete availability search form
        cy.get('[name="location"] option').its('length').should('be.gt', 50)
        cy.get('[name="location"]').select("All Parks") //-- Defaulted to "All PArks"
        cy.wait(500)
        cy.get('[name="monthOfArrival"] option').its('length').should('be.gt', 1)
        cy.get('[name="monthOfArrival"]').select(1)
        cy.wait(500)
        cy.get('[name="nights"] option').its('length').should('be.gt', 1)
        cy.get('[name="nights"]').select(1)
        cy.wait(1000)
        cy.get('[name="dateOfArrival"] option').its('length').should('be.gt', 1)
        cy.get('[name="dateOfArrival"]').select(1)
        cy.wait(1000)
        cy.get('[name="availability"] .button--holiday').click() //Click Search
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
        //document.querySelectorAll(".tabscontent .card form").length
        //document.querySelector(".tabscontent div:nth-of-type(3) form")
        cy.wait(1000)


        // **Guest information
        cy.get('[name="noAdults"]').select('1') // Set Adults to 1
        cy.get('.text-right .btn-primary').first().click() // Click continue
        cy.wait(1000)

        // ** Your details
        cy.get('[name="title"]').select("Mr")
        cy.get('[name="firstname"]').type("PHUKTestfirstname");
        cy.get('[name="surname"]').type("PHUKTestlastname");
        cy.get('[name="phoneno"]').type("01234567890");
        cy.get('[name="email"]').first().type("phtestaccount@email.com");
        cy.get('[name="PostcodeLookup"]').type("TN39 5ES");

        
        cy.get('.js-postcode-lookup').first().click() // Click Find Address
        cy.wait(1000)
        cy.get('#drpAddresses').select("Park Holidays UK Ltd, Glovers House Glovers End Bexhill-on-Sea")
        cy.wait(1000)

        cy.get('input[type="checkbox"][name="termsandconditionsagreed"]').click({ force: true }) // Click T&C's

        cy.get('.continueToPayment').first().click() // Click continue
        //cy.get('#errorMsg').should('not.exist'); // Check for errors
        cy.wait(4000)

        expect(cy.get('#payment-container')).to.exist

        

        



        // 
    })


    //it.only('Should view & Search Touring & Pods', function () {
    //cy.get('.site-block__info--holiday .button--touring').click()
    //expect(cy.get('.text--primary:nth-of-type(1)').contains('Touring Caravan Sites & UK Campsites'))

    //cy.get('.css-5dckes').click()



    //search location
    //month of arrival
    //nights
    //date of arrival
    //'SEARCH'
    //})


})
