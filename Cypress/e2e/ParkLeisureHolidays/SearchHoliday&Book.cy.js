const dayjs = require('dayjs')

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

cy.config().screenSizes.forEach((size) => {

    describe('NEW Holiday Search ' + size[0] + ', ' + size[1], async function () {

        beforeEach(() => {
            cy.viewport(size[0], size[1]) // Change screen size
            cy.visit(Cypress.config().plh.baseUrl)
            cy.url().should('contain', Cypress.config().plh.baseUrl)
            if (window.location.href.indexOf("parkleisureholidays.co.uk") > -1) {
                cy.get('#onetrust-button-group #onetrust-accept-btn-handler').click()
                cy.setCookie('OptanonAlertBoxClosed', dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSZZ")) // Create cookie to disable cookie banner
            }
        })

        it('Should be able to search & book EDIT THIS ONE', function () {

            cy.get('body').then(() => {
              let el = Cypress.$('body')
      
              cy.get('#availability-form h2').should('include.text', 'Your Park')
              cy.get('#availability-form h2').should('include.text', 'Leisure Holiday awaits…')

              
              cy.log(">> Complete Legacy site availability search form - checks- need to write tests to complete this searchbar")
              cy.get('[name="holidayType"]').eq(1).select('Holidays')
              cy.get('[name="park"] option').should('exist')
              cy.get('[name="arrival-date"]').should('exist')
              cy.get('[name="depart-date"]').should('exist')
              cy.get('[placeholder="Add guests"]').should('exist')
              cy.get('.b-availability-form__actions [type="submit"]').should('exist')
              

              cy.log(">> Navigate to new site search")
              cy.visit(Cypress.config().plh.baseSearchUrl)
              cy.url().should('eq', Cypress.config().plh.baseSearchUrl)

      
              if (el.outerWidth() < 1016) {
                cy.get('[aria-label="Edit your search"]').should('exist')
                cy.get('[aria-live="polite"]').should('include.text', 'All locations')
                // Update search criteria
                cy.get('[aria-label="Edit your search"]').click() // expand menu first
                cy.wait(1000)
                cy.get('[role="region"] ._c795c3').eq(0).click() // Holiday type
                cy.get('[aria-label="Holidays"]').click() // Holidays
                cy.get('._1taxg680').click() //Next
                cy.get('[aria-label="All locations"]').click() // Location
                cy.get('._1taxg680').click() //Next
      
              } else {
                cy.get('[aria-label="Map with interactive pins related to your search"]').should('exist')
                cy.get('[aria-label="Map with interactive pins related to your search"]').should('be.visible')
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
                // Update search criteria
                cy.get('[role="search"]').eq(0).click() // Click top search bar
                cy.get('div._19mw99b div._wtz1co').eq(0).click() // Expand Product
                cy.get('._3hmsj [aria-label="Holidays"]').click() // Product/Touring and Camping
                cy.get('div._19mw99b div._wtz1co').eq(1).click()  // Expand Location
                cy.get('._3hmsj [aria-label="All locations"]').click() // Location
                cy.wait(2000)
                cy.get('div._19mw99b div._wtz1co').eq(2).click()  // Expand Date
              }
      
      
              //Arival Date
              cy.wait(1000)
              cy.get('._3hmsj select').eq(0).select(3) // Month
              cy.wait(1000)
              cy.get('._3hmsj select').eq(1).select(2) // How long
              cy.wait(1000)
              cy.get('._3hmsj select').eq(2).select(2) // Arrival date
              cy.wait(1000)
      
      
              //Guests
              if (el.outerWidth() < 1016) {
                cy.get('._1taxg680').click() //Next to guests
              } else {
                cy.wait(1000)
                cy.get('div._19mw99b div._wtz1co').eq(3).click()  // Expand Guests
              }
              cy.get('[data-testid="stepper-adults-increase-button"]').click()
              cy.get('[data-testid="stepper-adults-decrease-button"]').click()
              cy.get('[data-testid="stepper-adults-increase-button"]').click()
              cy.get('[data-testid="stepper-children-increase-button"]').click()
              cy.get('[data-testid="stepper-children-decrease-button"]').click()
              cy.get('[data-testid="stepper-children-increase-button"]').click()
              cy.get('[data-testid="stepper-infants-increase-button"]').click()
              cy.get('[data-testid="stepper-infants-decrease-button"]').click()
              cy.get('[data-testid="stepper-infants-increase-button"]').click()
              cy.get('[aria-label="Pet friendly"]').click() // Pet friendly
              cy.get('[aria-label="Pet friendly"]').click() // Pet friendly unclick
      
              // Search
              if (el.outerWidth() < 1016) {
                cy.get('[data-testid="modal-container"] ._3hmsj').click() // Search button
              } else {
                cy.wait(1000)
                cy.get('._1jxweeom ._1s7crnpi').click() // Search button
              }
      
              // Page checks
              cy.log(">> Click first location record")
              cy.get('[itemprop="itemListElement"]').its('length').should('be.gt', 0)
              cy.get('[itemprop="itemListElement"]').first().click() //eg Wood Farm
      
              if (el.outerWidth() < 744) {
                cy.get('[alt="Image 1"]').should('exist')
              } else {
                cy.get('[aria-label="Listing image 1, Show all photos"]').should('exist')
              }
      
              cy.get('h1').should('exist') // Park name
              cy.get('div:nth-child(3) h2').should('include.text', 'Park highlights')
              cy.get('div._1t2btyf > svg').its('length').should('be.gt', 0) // Park highlights count
              cy.get('div:nth-child(2) > div > p').should('exist') // About 
              //
              cy.get('[role="tablist"] button:nth-child(1)').should('include.text', 'Park Amenities')
              //cy.get('[role="tablist"] button:nth-child(2)').should('include.text', "What's On") 
              //cy.get('[role="tablist"] button:nth-child(3)').should('include.text', 'Local Area') 
      
              //
              cy.get('[role="tablist"] button:nth-child(1)').eq(0).click()
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
              cy.get('div._1yxo37v h2').eq(0).should('include.text', 'Park location')
              cy.get('[aria-roledescription="map"]').should('exist')
              cy.get('#availability-results > section > div > h2').should('include.text', 'Accommodation options')
              cy.get('#availability-results ._1espdem').its('length').should('be.gt', 0)
              cy.get('#availability-results ._1espdem [type="submit"]').first().click() //eg Lodge
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

          }) // #root
          })

    })

}) //foreach screenSizes
