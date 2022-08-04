Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
}); // handle youtube issue

var phHolidayParks = Cypress.config().phHolidayParks
var phTouringParks = Cypress.config().phTouringParks
var phOwnershipParks = Cypress.config().phOwnershipParks


describe('Our Holiday Parks flow E2E', function () {

  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl)
    cy.get('#site-blocks .site-block__info--ourparks .button--primary').click() //Our Parks
    cy.get('#ourparks h1').should('include.text', 'Explore a huge range of Holiday Parks')
    cy.get('#filter').should('exist')

  })

  
  it('Should find a random ownership park and book a visit', function () {

    cy.get('.filters__options .button--ownership-light').first().click() // Ownership filter

    let p = Math.floor((Math.random() * phOwnershipParks.length) + 1);
    cy.log("Park record number is: " + p)

    //cy.get("#ourparks .col-xs-12:not([style='display: none;']):nth-child(" + p + ") .title p").invoke('text').as('parkName')
    const parkName = cy.get("#ourparks .col-xs-12:not([style='display: none;']):nth-child(" + p + ") .title p").invoke('text');
    //var parkName = cy.get("#ourparks .col-xs-12:not([style='display: none;']):nth-child(" + String(p) + ") .title p").text // get Park Name from results
    cy.log("Selected Park name: " + parkName)

    //#ourparks .col-xs-12:not([style='display: none;']):nth-child(46) .card--park // Whole resuls card
    cy.get("#ourparks .col-xs-12:not([style='display: none;']):nth-child(" + p + ") .button--primary").click() // Details button of selected park
    //cy.get('#park_2 .js-details-button').click() // Details button of selected park
    cy.get('#searchbar button.css-10lxziy').click() // Search Ownership

    // Page checks
    cy.get('.page-header-details__title').should('include.text', this.parkName)
    //cy.get('.page-header-details__title').should('include.text', 'Chichester Lakeside')
    cy.get('div.page-header-actions__book-visit').should('be.visible') // Book your visit
    cy.get('div.page-header-actions__brochure').should('be.visible') // Get Brochure

    //Book your visit
    cy.get('div.page-header-actions__book-visit a').eq(0).click()
    cy.get('#WEBAAV > h3').should('include.text', 'Arrange a park visit to ' + this.parkName)
    //cy.get('#WEBAAV > h3').should('include.text', 'Arrange a park visit to Chichester Lakeside')

    // Arrange a park visit to Chichester Lakeside
    cy.get('[name="title"]').select(cy.config().testUser.title)
    cy.get('[name="firstname"]').type(cy.config().testUser.firstname)
    cy.get('[name="lastname"]').type(cy.config().testUser.surname)
    cy.get('[name="email"]').first().type(cy.config().testUser.email)
    cy.get('[name="telephone"]').type(cy.config().testUser.phoneno)
    cy.get('[name="date_6_months"]').select(2) //Visit Date
    cy.get('input[type="checkbox"][name="privacy_policy"]').eq(0).click({ force: true }) // Privacy Policy

    // Submit
    if (cy.config().submitBooking) {
      cy.log("submitBooking has been enabled in the Config file")

      cy.get('#gtm--webaav').eq(0).click()
      cy.wait(1000)
      cy.get('#WEBAAV > h3').should('include.text', 'Arrange a park visit to Chichester Lakeside')
      cy.get('#WEBAAV > div > h6').should('include.text', 'Arrange a visit request received')
      cy.get('#WEBAAV > div > p').should('include.text', 'Thank you for your request to arrange a visit, we will be in contact shortly.')

    } else {
      cy.log("submitBooking has been disabled in the Config file")
    }

  })

  
  it('Should display correct holiday & short break parks', function () {
    cy.get('.filters__options .button--holiday-light').first().click()
    cy.wait(3000)
    for (var i = 0; i < phHolidayParks.length; i++) {
      cy.get('#results-panel').should('include.text', phHolidayParks[i])
    }
    cy.get("#ourparks .col-xs-12:not([style='display: none;']) .card").its('length').should('be.eq', phHolidayParks.length)
  })

  it('Should display correct touring and camping parks', function () {
    cy.get('.filters__options .button--touring-light').first().click()
    cy.wait(3000)
    for (var i = 0; i < phTouringParks.length; i++) {
      cy.get('#results-panel').should('include.text', phTouringParks[i])
    }
    cy.get("#ourparks .col-xs-12:not([style='display: none;']) .card").its('length').should('be.eq', phTouringParks.length)
  })

  it('Should display correct holiday home ownership parks', function () {
    cy.get('.filters__options .button--ownership-light').first().click()
    cy.wait(3000)
    for (var i = 0; i < phOwnershipParks.length; i++) {
      cy.get('#results-panel').should('include.text', phOwnershipParks[i])
    }
    cy.get("#ourparks .col-xs-12:not([style='display: none;']) .card").its('length').should('be.eq', phOwnershipParks.length) // 44

  })




})
