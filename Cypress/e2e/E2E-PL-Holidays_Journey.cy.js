const dayjs = require('dayjs')

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

const sizes = Cypress.config().screenSizes

describe('NEW Holiday Booking flow E2E', async function () {

    beforeEach(() => {
        sizes.forEach((size) => {
          cy.viewport(size[0], size[1]) // Change screen size
    
          cy.visit(Cypress.config().pl.baseUrl)
          cy.url().should('eq', Cypress.config().pl.baseUrl)
          if (window.location.href.indexOf("parkleisureholidays.co.uk") > -1) {
            cy.get('#onetrust-button-group #onetrust-accept-btn-handler').click()
            cy.setCookie('OptanonAlertBoxClosed', dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSZZ")) // Create cookie to disable cookie banner
          }
        })
      })

    it('Should search and book a Holiday', async function () {

        cy.get('#availability-form h2').should('include.text', 'Your Park')
        cy.get('#availability-form h2').should('include.text', 'Leisure Holiday awaits…')

        cy.log(">> Complete Legacy site availability search form")
        /*
        cy.get('[name="holidayType"]').select('Holidays')
        cy.get('[name="park"] option').select('All parks')
        cy.get('[name="arrival-date"] option').select('not set') // just take default
        cy.get('[name="depart-date"] option').select('not set') // just take default
        cy.get('[placeholder="Add guests"] option').select('not set') // just take default
        cy.get('[type="submit"]').click()
        */

        cy.log(">> Navigate to new site search")
        cy.visit(Cypress.config().pl.baseSearchUrl)
        cy.url().should('eq', Cypress.config().pl.baseSearchUrl)
        
        if (window.location.href.indexOf("parkleisureholidays.co.uk") > -1) {
            //cy.get('#onetrust-button-group #onetrust-accept-btn-handler').click()
            cy.setCookie('OptanonAlertBoxClosed', dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSZZ")) // Create cookie to disable cookie banner
        }

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
 
 
        // new search bar in new website
        cy.get('[role="search"] :nth-child(2)').first().click() // Click top search bar

        //Product
        cy.get('div._19mw99b div._wtz1co').eq(0).click() // Expand Product
        cy.get('._3hmsj [aria-label="Touring and camping"]').click() // Product/Touring and Camping
        cy.get('._3hmsj [aria-label="Holidays"]').click() // Product/Holidays

        //Location
        cy.get('div._19mw99b div._wtz1co').eq(1).click()  // Expand Location

        cy.get('._3hmsj [aria-label="Region"]').click() // Select Region
        cy.get('._3hmsj input').eq(0).click() // South West
        cy.get('._3hmsj input').eq(1).click() // Wales
        cy.get('._3hmsj input').eq(2).click() // West Midlands
        cy.get('._3hmsj input').eq(3).click() // Yorkshire & the Humber
        cy.get('._3hmsj [aria-label="Go back"]').click() // Back

        cy.get('._3hmsj [aria-label="County"]').click() // Select County
        cy.get('._3hmsj input').eq(0).click() // Cornwall
        cy.get('._3hmsj input').eq(1).click() // Herefordshire
        cy.get('._3hmsj input').eq(2).click() // Wales
        cy.get('._3hmsj input').eq(3).click() // Yorkshire
        cy.get('._3hmsj [aria-label="Go back"]').click() // Back

        cy.get('._3hmsj [aria-label="Park"]').click() // Select Park
        cy.get('._3hmsj input').eq(0).click() // Brynteg
        cy.get('._3hmsj input').eq(1).click() // Littondale
        cy.get('._3hmsj input').eq(2).click() // Malvern View
        cy.get('._3hmsj input').eq(3).click() // Par Sands
        cy.get('._3hmsj input').eq(4).click() // Pentire
        cy.get('._3hmsj [aria-label="Go back"]').click() // Back
        
        cy.get('._3hmsj [aria-label="All locations"]').click() // Location

        //Arival Date
        cy.get('div._19mw99b div._wtz1co').eq(2).click()  // Expand Arrival date
        cy.wait(1000)
        cy.get('._3hmsj select').eq(0).select(2) // Month
        cy.wait(1000)
        cy.get('._3hmsj select').eq(1).select(1) // How long
        cy.wait(1000)
        cy.get('._3hmsj select').eq(2).select(1) // Arrival date

        //Guests
        cy.get('div._19mw99b div._wtz1co').eq(3).click()  // Expand Guests
        cy.get('._3hmsj #stepper-adults [aria-label="increase value"]').click()
        cy.get('._3hmsj #stepper-adults [aria-label="decrease value"]').click()
        cy.get('._3hmsj #stepper-adults [aria-label="increase value"]').click()
        cy.get('._3hmsj #stepper-children [aria-label="increase value"]').click()
        cy.get('._3hmsj #stepper-children [aria-label="decrease value"]').click()
        cy.get('._3hmsj #stepper-children [aria-label="increase value"]').click()
        cy.get('._3hmsj #stepper-infants [aria-label="increase value"]').click()
        cy.get('._3hmsj #stepper-infants [aria-label="decrease value"]').click()
        cy.get('._3hmsj #stepper-infants [aria-label="increase value"]').click()

        //Pets
        cy.get('._3hmsj [aria-label="Pet friendly"]').click()

        //Search
        cy.get('._1x9emkeo').click()


        //Search results
        cy.log(">> Click first location record")
        cy.get('[itemprop="itemListElement"]').its('length').should('be.gt', 0)
        cy.get('[itemprop="itemListElement"]').first().click() //eg Brynteg
        //
        // Page checks
        cy.get('[aria-label="Listing image 1, Show all photos"]').should('exist')
        cy.get('h1').should('exist') // Park name
        cy.get('div:nth-child(3) h2').should('include.text', 'Park highlights') 
        cy.get('div._4mwgyc > div._mzo65h > div:nth-child(2) div._1t2btyf > svg').its('length').should('be.gt', 0) // Park highlights count
        cy.get('div:nth-child(2) > div > p').should('exist') // About 
        //
        cy.get('#tab--enquire-form-tabs span').should('include.text', 'Park Amenities') 
        cy.get('#tab--enquire-form-tabs--2 span').should('include.text', 'Local Area') 

       

        //cy.get('[role="tablist"] button:nth-child(1)').click()
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