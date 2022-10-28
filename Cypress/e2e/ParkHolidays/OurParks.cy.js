const dayjs = require('dayjs');

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Our Holiday Parks', function () {

  beforeEach(() => {
    cy.config().screenSizes.forEach((size) => {
      cy.viewport(size[0], size[1]) // Change screen size
      cy.visit(cy.config().ph.baseUrl)
      cy.url().should("contain", cy.config().ph.baseUrl);

      if (window.location.href.indexOf("parkholidays.com") > -1)
      {
        cy.get('#onetrust-accept-btn-handler').click()
        cy.setCookie('OptanonAlertBoxClosed', dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSZZ")) // Create cookie to disable cookie banner
      }
      
      cy.get('#site-blocks .site-block__info--ourparks .button--primary').click() //Our Parks
      cy.get('#ourparks h1').should('include.text', 'Explore a huge range of Holiday Parks')
      cy.get('#filter').should('exist')
      //cy.wait(1000)
    })
  })

  
  it('Should display correct holiday & short break parks', async function () {
    cy.get(".filters__options .button--holiday-light").first().click()
    cy.wait(3000)
    cy.log(">> CONFIG phHolidayParks.length: " + cy.config().ph.holidayParks.length) //41
    cy.get("#results-panel .col-xs-12:not([style='display: none;']) .card").its('length').should('be.eq', cy.config().ph.holidayParks.length)
    for (var i = 0; i < cy.config().ph.holidayParks.length; i++) {
      cy.get('#results-panel').should('include.text', cy.config().ph.holidayParks[i])
    }
  })

  it('Should display correct touring and camping parks', async function () {
    cy.get(".filters__options .button--touring-light").first().click()
    cy.wait(3000)
    cy.log(">> CONFIG phTouringParks.length: " + cy.config().ph.touringParks.length) //15
    cy.get("#results-panel .col-xs-12:not([style='display: none;']) .card").its('length').should('be.eq', cy.config().ph.touringParks.length)
    for (var i = 0; i < cy.config().ph.touringParks.length; i++) {
      cy.get('#results-panel').should('include.text', cy.config().ph.touringParks[i])
    }
  })

  it('Should display correct holiday home ownership parks', async function () {
    cy.get(".filters__options .button--ownership-light").click()
    cy.wait(5000)
    cy.log(">> CONFIG phOwnershipParks.length: " + cy.config().ph.ownershipParks.length) //44
    cy.get(".col-xs-12:not([style='display: none;']) .card").its('length').should('be.eq', cy.config().ph.ownershipParks.length)
    for (var i = 0; i < cy.config().ph.ownershipParks.length; i++) {
      cy.get('#results-panel').should('include.text', cy.config().ph.ownershipParks[i])
    }
  })


  it('Should find a random ownership park and arrange a visit', function () {

    const i = Math.floor((Math.random() * cy.config().ph.ownershipParks.length) + 1)

    cy.get('.filters [title="Holiday Home Ownership Parks"]').click() // Ownership filter
    cy.wait(3000)
    cy.get(".col-xs-12:not([style='display: none;']):nth-child(" + i + ") .title p").then($parkName => {

      //Save park name
      const parkNameText = $parkName.text()
      cy.log(">> Selected Park name: " + parkNameText)
      cy.get(".col-xs-12:not([style='display: none;']):nth-child(" + i + ") .button--primary").click() // Details button of selected park
      //
      cy.log(">> Page checks")
      cy.get('h2').should('include.text', parkNameText) // Park Name
      cy.get('div._1r8tv22 a:nth-child(1)').should('be.visible') // Arrange your visit
      cy.get('div._1r8tv22 a:nth-child(2)').should('be.visible') // Holiday Homes for Sale
      cy.get('[aria-label="Breadcrumb"]').should('include.text', parkNameText)
      cy.get('[aria-label="Breadcrumb"]').should('include.text', "Holiday Home Ownership")
      cy.get('[aria-label="Breadcrumb"]').should('include.text', "Our Parks")
      //
      cy.log(">> Arrange your visit")
      cy.get('div._1r8tv22 a').first().click()
      cy.get('div._gw65v8 > h3').should('include.text', "Come and see")
      cy.get('div._gw65v8 > h3').should('include.text', parkNameText)
      cy.get('[name="title"]').first().select(cy.config().testUser.title)
      cy.get('[name="firstname"]').first().type(cy.config().testUser.firstname)
      cy.get('[name="lastname"]').first().type(cy.config().testUser.surname)
      cy.get('[name="email"]').first().type(cy.config().testUser.email)
      cy.get('[name="telephone"]').first().type(cy.config().testUser.phoneno)
      cy.get('[name="visitDate"]').first().type(String(dayjs().format("YYYY-MM-DD"))) //Visit Date
      cy.get('input[type="checkbox"][name="offers"]').eq(0).click({ force: true }) // Privacy Policy

      // Submit
      if (cy.config().submit) {
        cy.log("submitBooking has been enabled in the Config file")

        cy.get('div._pmbod8 > form > div._13c9vby > button').first().click() // Submit
        cy.get('div._pmbod8').should('include.text', 'Arrange a visit request received')
        cy.get('div._pmbod8').should('include.text', 'Thank you for your request to arrange a visit, we will be in contact shortly.')

      } else {
        cy.log("submit has been disabled in the Config file")
      }

    })

  })

})
