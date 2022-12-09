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

  describe('Touring & Camping search ' + size[0] + ', ' + size[1], async function () {

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


    it('Should be able to search & book (Journey A)', function () {

      cy.get('#root').then(() => {
        let el = Cypress.$('#root')

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

        cy.visit(Cypress.config().ph.baseUrl + 'touring-and-camping/search?') // Temporary until released properly in prod

        if (el.outerWidth() < 1016) {
          cy.get('[aria-label="Edit your search"]').should('exist')
          cy.get('[aria-live="polite"]').should('include.text', 'All locations')
          // Update search criteria
          cy.get('[aria-label="Edit your search"]').click() // expand menu first
          cy.wait(1000)
          cy.get('[role="region"] ._c795c3').eq(0).click() // Holiday type
          cy.get('[aria-label="Touring and camping"]').click() // Touring and camping
          cy.get('._1taxg680').click() //Next
          cy.get('[aria-label="All locations"]').click() // Location
          cy.get('._1taxg680').click() //Next

        } else {
          cy.get('[aria-label="Map with interactive pins related to your search"]').should('exist')
          cy.get('[aria-label="Map with interactive pins related to your search"]').should('be.visible')
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
          // Update search criteria
          cy.get('[role="search"]').eq(0).click() // Click top search bar
          cy.get('div._19mw99b div._wtz1co').eq(0).click() // Expand Product
          cy.get('._3hmsj [aria-label="Touring and camping"]').click() // Product/Touring and Camping
          cy.get('div._19mw99b div._wtz1co').eq(1).click()  // Expand Location
          cy.get('._3hmsj [aria-label="All locations"]').click() // Location
          cy.wait(2000)
          cy.get('div._19mw99b div._wtz1co').eq(2).click()  // Expand Date
        }


        //Arival Date
        cy.wait(1000)
        cy.get('[name="checkin_month_year"]').eq(0).select(3) // Month
        cy.wait(1000)
        cy.get('[name="nights"]').eq(0).select(2) // How long
        cy.wait(1000)
        cy.get('[name="checkin"]').eq(0).select(1) // Arrival date
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
        //cy.get('#bookingExtras .phuk-extra:nth-child(10) a').eq(0).click() // Pets - expanded by default
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
      }) // #root
    })


    it('Should not filter results when changing party size (re: HJBT-88 BUG)', function () {

      cy.log("All touring should allow up to 10 people. The 'locations available' search results should never change if the user only modifies the guest count (>0 and <=10) and searches again.")
      //cy.get('[role="region"] ._c795c3').eq(1).click() // Location
      //cy.get('[role="region"] ._c795c3').eq(2).click() // Date
      //cy.get('[role="region"] ._c795c3').eq(3).click() // Guests

      cy.visit(Cypress.config().ph.baseUrl + 'touring-and-camping/search?')

      cy.get('#root').then(() => {
        let el = Cypress.$('#root')

        if (el.outerWidth() < 1016) {
          cy.get('[aria-label="Edit your search"]').click() // expand menu first
          cy.get('[role="region"] ._c795c3').eq(0).click() // Holiday type
          cy.get('[aria-label="Touring and camping"]').click() // Touring and camping
          cy.get('._1taxg680').click() //Next
          cy.get('[aria-label="All locations"]').click() // Location
          cy.get('._1taxg680').click() //Next
        } else {
          cy.get('[role="search"]').eq(0).click() // Click top search bar
          cy.get('div._19mw99b div._wtz1co').eq(0).click() // Expand Product
          cy.get('._3hmsj [aria-label="Touring and camping"]').click() // Product/Touring and Camping
          cy.get('div._19mw99b div._wtz1co').eq(1).click()  // Expand Location
          cy.get('._3hmsj [aria-label="All locations"]').click() // Location
          cy.wait(2000)
          cy.get('div._19mw99b div._wtz1co').eq(2).click()  // Expand Date
        }

        //Arival Date
        cy.wait(1000)
        cy.get('[name="checkin_month_year"]').eq(0).select(3) // Month
        cy.wait(1000)
        cy.get('[name="nights"]').eq(0).select(2) // How long
        cy.wait(1000)
        cy.get('[name="checkin"]').eq(0).select(1) // Arrival date
        cy.wait(1000)


        //Guests
        if (el.outerWidth() < 1016) {
          cy.get('._1taxg680').click() //Next
          cy.get('[data-testid="stepper-adults-increase-button"]').click() // Guest update to 2
          cy.get('[data-testid="modal-container"] ._3hmsj').click() // Search button
        } else {
          cy.get('div._19mw99b div._wtz1co').eq(3).click() //Expand guests
          cy.wait(1000)
          cy.get('._3hmsj #stepper-adults [aria-label="increase value"]').click() // Guest update to 2
          cy.wait(1000)
          cy.get('._1jxweeom ._1s7crnpi').click() // Search button
        }

        //Filters
        cy.get('#menuItemButton-id').click() // Filter button
        cy.get('input[type="checkbox"][name="Pitch"]').click({ force: true }) // Filter Pitch
        cy.get('[data-testid="more-filters-modal-submit-button"]').click({ force: true }) // Apply filters
        cy.wait(1000)


        // Check number of locations in search results
        cy.get('h1').should('include.text', 'locations available')
        cy.get('h1').invoke('text')
          .then((text) => {
            var locationCountA = text.match(/[0-9]+/g);
            cy.log(locationCountA + "  locations");

            //Now edit number of guests
            if (el.outerWidth() < 1016) {
              cy.get('[aria-label="Edit your search"]').click() // expand menu first
              cy.get('[role="region"] ._c795c3').eq(3).click()
              cy.wait(1000)
              for (var i = 0; i < 8; i++) {
                cy.get('[data-testid="stepper-adults-increase-button"]').click() // Guest update to 10
              }
              cy.get('[data-testid="modal-container"] ._3hmsj').click() // Search button

            } else {
              cy.get('[role="search"]').eq(0).click() // Click top search bar
              cy.wait(1000)
              // cy.get('div._19mw99b div._wtz1co').eq(3).click() //Expand guests (already expanded)
              cy.wait(1000)
              for (var i = 0; i < 8; i++) {
                cy.get('._3hmsj #stepper-adults [aria-label="increase value"]').click() // Guest update to 10
              }
              cy.wait(1000)
              cy.get('._1jxweeom ._1s7crnpi').click() // Search button
            }

            //Search results
            cy.get('h1').should('include.text', 'locations available')
            cy.get('h1').invoke('text')
              .then((text) => {
                var locationCountB = text.match(/[0-9]+/g);
                cy.log(locationCountB + "  locations");
                expect(parseInt(locationCountA)).to.eq(parseInt(locationCountB))
              })
          })
      }) // #root
    })

  })

}) //foreach screenSizes