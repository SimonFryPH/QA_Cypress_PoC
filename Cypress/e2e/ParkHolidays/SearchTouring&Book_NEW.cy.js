const dayjs = require('dayjs');

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('Holiday Touring booking', async function () {

    beforeEach(() => {
      cy.config().screenSizes.forEach((size) => {
          cy.viewport(size[0], size[1]) // Change screen size
    
          cy.visit(Cypress.config().ph.baseUrl)
          cy.url().should('contain', Cypress.config().ph.baseUrl)

          if (window.location.href.indexOf("parkholidays.com") > -1)
          {
            cy.get('#onetrust-button-group #onetrust-accept-btn-handler').click()
            cy.setCookie('OptanonAlertBoxClosed', dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSZZ")) // Create cookie to disable cookie banner
          }
          
        })
      })

      it('Should search & book a Touring & Camping holiday', async function () {

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
        cy.get('[name="nights"]').select('3 nights') // 3 nights
        cy.wait(1000)
        cy.get('[name="dateOfArrival"] option').its('length').should('be.gt', 1)
        cy.get('[name="dateOfArrival"]').select(1) // First date in list
        cy.wait(1000)
        cy.get('[name="availability"] .button--touring').click() // Search
        cy.wait(1000)

        // New top search bar checks
        cy.get('[role="search"]').should('exist')
        cy.get('[role="search"]').should('be.visible')
        cy.get('[role="search"] button:nth-child(2) > div').should('include.text', 'Touring and camping') // default
        cy.get('[role="search"] button:nth-child(2) ._krjbj').should('include.text', 'Product')
        cy.get('[role="search"] button:nth-child(4) ._krjbj').should('include.text', 'Location')
        cy.get('[role="search"] button:nth-child(4) > div').should('include.text', 'All locations')
        cy.get('[role="search"] button:nth-child(6) ._krjbj').should('include.text', 'Arrival date') 
        cy.get('[role="search"] button:nth-child(8) ._krjbj').should('include.text', 'Guests') 
        cy.get('[role="search"] button:nth-child(8) > div').should('include.text', '1 guest') // default

        cy.get('[aria-label="Map with interactive pins related to your search"]').should('exist')
        cy.get('[aria-label="Map with interactive pins related to your search"]').should('be.visible')
        //cy.get('[aria-label="Map"] > div:nth-of-type(1)').contains('translate(0px, 0px)') // Display UK - not working
        //cy.contains('[aria-label="Map"] > div:nth-of-type(1)', 'translate(0px, 0px)') // Display UK - not working

        cy.log(">> Click first location record")
        cy.get('[itemprop="itemListElement"]').its('length').should('be.gt', 0)
        cy.get('[itemprop="itemListElement"]').first().click() //eg Wood Farm
        //
        // Page checks
        cy.get('[aria-label="Listing image 1, Show all photos"]').should('exist')
        cy.get('h1').should('exist') // Park name
        cy.get('div:nth-child(3) h2').should('include.text', 'Park highlights') 
        cy.get('div._4mwgyc > div._mzo65h > div:nth-child(2) div._1t2btyf > svg').its('length').should('be.gt', 0) // Park highlights count
        cy.get('div:nth-child(2) > div > p').should('exist') // About 
        //
        cy.get('[role="tablist"] button:nth-child(1)').should('include.text', 'Park Amenities') 
        //cy.get('[role="tablist"] button:nth-child(2)').should('include.text', "What's On") 
        //cy.get('[role="tablist"] button:nth-child(3)').should('include.text', 'Local Area') 

        //
        cy.get('[role="tablist"] button:nth-child(1)').click()
        // enable this of black amenities button exists
        //cy.get('[role="tablist"] button:nth-child(1)').invoke('text')
        //.then((text)=>{ 
        //    var amenitiesCount = text.match(/[0-9]+/g);
        //    cy.log(amenitiesCount + " amenities");
            //cy.get('._mzo65h div:nth-child(4) button').first().click() // Open amenities modal
            //cy.get('[aria-label="Park amenities"] #-row-title').its('length').should('be.eq', parseInt(amenitiesCount)) // Park amenities count
            //cy.get('[aria-label="Park amenities"] [aria-label="Close"]').first().click() // Close amenities modal
        //})
        //
        cy.get('div:nth-child(3) > div._1yxo37v h2').should('include.text', 'Park location') 
        cy.get('[aria-roledescription="map"]').should('exist')
        cy.get('#availability-results > section > div > h2').should('include.text', 'Pitch options') 
        cy.get('#availability-results ._1espdem').its('length').should('be.gt', 0) 
        cy.get('#availability-results ._1espdem [type="submit"]').first().click() //eg Lodge
        //
        cy.log(">> Guest information & Extras")
        cy.get('[name="noAdults"]').select('1') // 1 Adult
        cy.get('[name="noChildren"]').select('1') // 1 Children
        cy.get('#bookingExtras .phuk-extra:nth-child(8) a').first().click() // Extra car
        cy.get('[name="Extras[TEXCAR].Quantity"]').select('1') // Set 1 extra car
        cy.get('#bookingExtras .phuk-extra:nth-child(9) a').first().click() // Awning/Kids tent
        cy.get('[name="Extras[TEXAWN].Quantity"]').select('1') // Set 1 extra kids tent
        cy.get('#bookingExtras .phuk-extra:nth-child(10) a').first().click() // Pets
        cy.get('[name="Extras[TOURDOG].Quantity"]').select('1') // Lets take a dog
        //
        cy.get('.text-right .btn-primary').first().click() // Continue


        cy.log(">> Your details")
        cy.get('[name="title"]').select(cy.config().testUser.title)
        cy.get('[name="firstname"]').type(cy.config().testUser.firstname)
        cy.get('[name="surname"]').type(cy.config().testUser.surname)
        cy.get('[name="phoneno"]').type(cy.config().testUser.phoneno)
        cy.get('[name="email"]').first().type(cy.config().testUser.email)
        cy.get('[name="PostcodeLookup"]').type(cy.config().testUser.postcode)
        cy.wait(2000)
        cy.get('.js-postcode-lookup').first().click() // Find address
        cy.wait(2000)
        cy.get('#drpAddresses').select(cy.config().testUser.fulladdress)
        cy.wait(2000)
        cy.get('input[type="checkbox"][name="termsandconditionsagreed"]').click({ force: true }) // T&C's

        // Submit
        if (cy.config().submit) {
            cy.get('.continueToPayment').first().click() // Continue
            cy.wait(2000)
            cy.get('#errorMsg').should('not.be.visible') // Check for errors
            //
            cy.log(">> Payment page checks")
            cy.get('#payment-container').should('exist')
            cy.get('#payment-container').should('be.visible')
            cy.get('.booking-summary').should('exist')
            cy.get('.booking-summary').should('be.visible')
        } else {
            cy.log("submit has been disabled in the Config file")
        }

    })

})
