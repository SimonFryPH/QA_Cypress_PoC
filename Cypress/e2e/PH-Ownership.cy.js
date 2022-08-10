const moment = require('moment');

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

const sizes = Cypress.config().screenSizes

function cookieClose() {
  cy.log(">> Cookie Close")
  cy.get('#onetrust-button-group #onetrust-accept-btn-handler').click()
  cy.setCookie('OptanonAlertBoxClosed', moment().format("YYYY-MM-DDTHH:mm:ss.SSSZZ")) // Create cookie to disable cookie banner
}

function killChat() {
  cy.log(">> KILL CHAT")
  cy.window().then((win) => {
    if (win.LC_API?.is_loaded()) {
      cy.log(">>> CHAT is loaded")
      win.LC_API.hide_chat_window();
      //delete win.LC_API;
      win.LC_API.close_chat();
    }
  });
}

describe("Ownership Flow E2E", function () {
  this.beforeAll(() => {
    killChat();
  });


  beforeEach(() => {
    sizes.forEach((size) => {
      cy.viewport(size[0], size[1]) // Change screen size

      cy.visit(Cypress.config().baseUrl);
      cy.url().should("eq", Cypress.config().baseUrl);
      cookieClose()
    })
  })

  it('Should Search Holiday homes', function () {

    cy.get('.site-block__info--ownership .button--ownership').click()
    cy.wait(1000)
    expect(cy.get('.text--primary:nth-of-type(1)').first().contains('Caravan Holiday Homes & Lodges for Sale'))
    cy.get('[title="Find holiday home"]').click()  //Search Holiday Homes
    cy.wait(5000)
    //
    cy.log(">> Page checks on Refine by")
    cy.get('#filter').should('be.visible') 
    cy.get('#filter > div.filters__options > div:nth-child(3)').should('be.visible') // Condition
    cy.get('#filter > div.filters__options > div:nth-child(4)').should('be.visible') // Type
    cy.get('#filter > div.filters__options > div:nth-child(6)').should('be.visible') // Bedrooms
    cy.get('#filter > div.filters__options > div:nth-child(8)').should('be.visible') // Addional Options
    cy.get('#filter > div.filters__options > div:nth-child(9)').should('be.visible') // Manufacturer
    cy.get('#filter > div.filters__options > div:nth-child(9) > a').should('be.visible') // Manufacturer Show all options

    /*
      //FAILING TESTS
        cy.get('#filter > div.filters__options > div.overflowable.overflowed').should('not.exist'); // Hide all options should not exist
        cy.get('#filter > div.filters__options > div:nth-child(9) > a').click() // Show all options
        cy.get('#filter > div.filters__options > div.overflowable.overflowed').should('exist'); 
        cy.get('#filter > div.filters__options > div.overflowable.overflowed > a').click() // Hide all options
        cy.get('#filter > div.filters__options > div:nth-child(10)').should('be.visible') // Offers
        */

    //
    cy.log(">> Complete availability search form")
    cy.log("Test to ensure both test data and website are displaying the correct Parks")
    cy.get('[name="location"] option:not([value="all"]):not([value^="C"])').its('length').should('be.eq', Cypress.config().phOwnershipParks.length)
    cy.get('[name="location"]').select("All Parks") // Defaults to "All Parks"
    cy.wait(500)
    cy.get('[name="priceRange"] option').its('length').should('be.gt', 1)
    cy.get('[name="priceRange"]').select(3) // £30k - £50k
    cy.wait(500)
    cy.get('.searchbar .button--ownership').click() // Search
    cy.wait(1000)
    //
    cy.log(">>Click first county record")
    cy.get('.card--county .button--ownership').its('length').should('be.gt', 0)
    cy.get('.card--county .button--ownership').first().click() //eg Essex
    cy.wait(1000)
    //
    cy.log(">> Click first holiday destination record in selected county")
    cy.get('.card .yellow-button').its('length').should('be.gt', 0)
    cy.get('.card .yellow-button').first().click() //eg Steeple Bay in Essex
    cy.wait(1000)
    //
    cy.log(">> Click MORE DETAILS on first record")
    cy.get('.card--ownership .button--ownership').its('length').should('be.gt', 0)
    cy.get('.card--ownership .button--ownership').first().click()
    cy.wait(1000)
    //
    cy.log(">> Page checks")
    cy.get('#listing-media').should('be.visible') // Media
    cy.get('#listing-park .button:nth-of-type(2)').should('be.visible') // Reseve button
    cy.get('#listing-park .button:nth-of-type(3)').should('be.visible') // Arrange viewing button
    cy.get('#listing-park > section > div > a').should('be.visible') // Chat with supervisor button

  });


  it('Should take Virtual Tours Of Popular Models', function () {

    cy.get('.site-block__info--ownership .button--ownership').click()
    cy.wait(1000)
    cy.get('[title="virtual-tours"]').click() // VIEW MODEL VIRTUAL TOURS
    cy.wait(1000)
    //
    cy.log(">> Page checks")
    expect(cy.get('#main > section > div > h1').first().contains('Virtual Tours Of Popular Models'))
    cy.get('.container div:nth-child(1) > div > div > .button').should('be.visible') // Static Caravan Models
    cy.get('.container div:nth-child(2) > div > div > .button').should('be.visible') // Villa Collection Models
    cy.get('.container div:nth-child(3) > div > div > .button').should('be.visible') // Luxury Lodges

    cy.get('.container div:nth-child(1) > div > div > .button').first().click() // Static Caravan Models
    cy.get('.u-video-responsive').first().should('be.visible') //Media
    cy.go('back')
    cy.get('.container div:nth-child(2) > div > div > .button').first().click() // Villa Collection Models
    cy.get('.u-video-responsive').first().should('be.visible') //Media
    cy.go('back')
    cy.get('.container div:nth-child(3) > div > div > .button').first().click() // Luxury Lodges
    cy.get('.u-video-responsive').first().should('be.visible') //Media
    cy.go('back')
  });



});