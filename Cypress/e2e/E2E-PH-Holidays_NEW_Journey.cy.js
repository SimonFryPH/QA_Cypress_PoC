const dayjs = require('dayjs')

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

const sizes = Cypress.config().screenSizes

describe('NEW Holiday Booking flow E2E', async function () {

    beforeEach(() => {
        sizes.forEach((size) => {
          cy.viewport(size[0], size[1]) // Change screen size
    
          cy.visit(Cypress.config().baseUrlDEV)
          cy.url().should('eq', Cypress.config().baseUrlDEV)
          //cy.get('#onetrust-button-group #onetrust-accept-btn-handler').click()
          cy.setCookie('OptanonAlertBoxClosed', dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSZZ")) // Create cookie to disable cookie banner
        })
      })

    it('Should search and book a Holiday', async function () {
        cy.get('.site-block .button--holiday').click()
        cy.get('.text--primary').should('include.text', 'Caravan Holidays & Short Breaks')
        //
        cy.log(">> Complete availability search form")
        cy.log("Test to ensure both test data and website are displaying the correct Parks")
        cy.get('[name="location"] option:not([value="all"]):not([value^="C"])').its('length').should('be.eq', cy.config().phHolidayParks.length)
        cy.get('[name="location"]').select("All Parks") // Defaults to "All Parks"
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

        // New top search bar checks
        cy.get('[role="search"]').should('exist')
        cy.get('[role="search"]').should('be.visible')
        cy.get('[role="search"] button:nth-child(2) > div').should('include.text', 'Holidays') // default
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
        cy.get('[itemprop="itemListElement"]').first().click() //eg Landscove
        //
        // Page checks
        cy.get('[aria-label="Listing image 1, Show all photos"]').should('exist')
        cy.get('h1').should('exist') // Park name
        cy.get('div:nth-child(3) h2').should('include.text', 'Park highlights') 
        cy.get('div._4mwgyc > div._mzo65h > div:nth-child(2) div._1t2btyf > svg').its('length').should('be.gt', 0) // Park highlights count
        cy.get('div:nth-child(2) > div > p').should('exist') // About 
        //
        cy.get('div:nth-child(4) h2').should('include.text', 'Park amenities') 
        cy.get('._mzo65h div:nth-child(4) button').first().should('include.text', 'Park amenities') 
        cy.get('._mzo65h div:nth-child(4) button').invoke('text')
        .then((text)=>{ 
            var amenitiesCount = text.match(/[0-9]+/g);
            cy.log(amenitiesCount + " amenities");
            cy.get('._mzo65h div:nth-child(4) button').first().click() // Open amenities modal
            cy.get('[aria-label="Park amenities"] #-row-title').its('length').should('be.eq', parseInt(amenitiesCount)) // Park amenities count
            cy.get('[aria-label="Park amenities"] [aria-label="Close"]').first().click() // Close amenities modal
        })
        //
        cy.get('div:nth-child(3) > div._1yxo37v h2').should('include.text', 'Park location') 
        cy.get('[aria-roledescription="map"]').should('exist')
        cy.get('#availability-results > section > div > h2').should('include.text', 'Accommodation options') 
        cy.get('#availability-results ._grxg1q').its('length').should('be.gt', 0) 
        cy.get('#availability-results ._grxg1q [type="submit"]').first().click() //eg Lodge
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
        cy.wait(2000)
        cy.get('.js-postcode-lookup').first().click() // Find address
        cy.wait(2000)
        cy.get('#drpAddresses').select(cy.config().testUser.fulladdress)
        cy.wait(2000)
        cy.get('input[type="checkbox"][name="termsandconditionsagreed"]').click({ force: true }) // T&C's

        // Submit
        if (cy.config().submitBooking) {
            cy.log("submitBooking has been enabled in the Config file")
            //
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
            cy.log("submitBooking has been disabled in the Config file")
        }

    })

})
