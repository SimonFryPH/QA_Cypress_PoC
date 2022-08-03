const moment = require('moment');

function killChat() {
  cy.log("KILL CHAT")
  cy.window().then((win) => {
    if (win.LC_API?.is_loaded()) {
      cy.log("CHAT is loaded")
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
    cy.visit(Cypress.config().baseUrl);
    cy.url().should("eq", Cypress.config().baseUrl);
    //cy.get("#onetrust-accept-btn-handler").click();
    cy.setCookie('OptanonAlertBoxClosed', moment().format("YYYY-MM-DDTHH:mm:ss.SSSZZ")) // Create cookie to disable cookie banner
  });

  it('Should Search Holiday homes', function () {

    cy.get('.site-block__info--ownership .button--ownership').click()
    cy.wait(1000)
    expect(cy.get('.text--primary:nth-of-type(1)').first().contains('Caravan Holiday Homes & Lodges for Sale'))
    cy.get('#standard-hero > div:nth-child(3) a:nth-child(3)').click()  //Search Holiday Homes

    killChat();

    // Page checks on Refine by
    cy.get('.filters__options').should('be.visible') //Media
    cy.get('#filter > div.filters__options > div:nth-child(3)').should('be.visible') // Condition
    cy.get('#filter > div.filters__options > div:nth-child(4)').should('be.visible') // Type
    cy.get('#filter > div.filters__options > div:nth-child(6)').should('be.visible') // Bedrooms
    cy.get('#filter > div.filters__options > div:nth-child(8)').should('be.visible') // Addional Options
    cy.get('#filter > div.filters__options > div:nth-child(9)').should('be.visible') // Manufacturer
    cy.get('#filter > div.filters__options > div:nth-child(9) > a').should('be.visible') // Manufacturer Show all options

    cy.get('#filter > div.filters__options > div.overflowable.overflowed').should('not.exist');
    cy.get('#filter > div.filters__options > div:nth-child(9) > a').click() // Show all options
    cy.get('#filter > div.filters__options > div.overflowable.overflowed').should('exist');
    cy.get('#filter > div.filters__options > div.overflowable.overflowed > a').click() // Hide all options

    cy.get('#filter > div.filters__options > div:nth-child(10)').should('be.visible') // Offers


    // Check correct ownership parks available
    var myParks = Cypress.config().phOwnershipParks
    for (var i = 0; i < myParks.length; i++) {
      cy.get('[name="location"]').should('include.text', myParks[i])
    }
    cy.log("Test to ensure both test data and website are displaying all ownership Parks")
    cy.get('[name="location"] option:not([value="all"]):not([value^="C"])').its('length').should('be.eq', myParks.length)

    //** Complete availability search form
    cy.get('[name="location"]').select("All Parks") //-- Defaulted to "All PArks"
    cy.wait(500)
    cy.get('[name="priceRange"] option').its('length').should('be.gt', 1)
    cy.get('[name="priceRange"]').select(3) // £30k - £50k
    cy.wait(500)
    cy.get('.searchbar .button--ownership').click() //Click Search
    cy.wait(1000)
    killChat();


    // **Click first county record ***
    cy.get('.card--county .button--ownership').its('length').should('be.gt', 0)
    cy.get('.card--county .button--ownership').first().click() //eg VIEW ESSEX PARKS
    cy.wait(1000)
    killChat();


    // **Click first holiday destination record in selected county
    cy.get('.card .yellow-button').its('length').should('be.gt', 0)
    cy.get('.card .yellow-button').first().click() //eg VIEW RESULTS (Steeple Bay)
    cy.wait(1000)
    killChat();


    // **Click MORE DETAILS on first record
    cy.get('.card--ownership .button--ownership').its('length').should('be.gt', 0)
    cy.get('.card--ownership .button--ownership').first().click()
    cy.wait(1000)
    killChat();


    //Page checks
    cy.get('#listing-media').should('be.visible') //Media
    cy.get('#listing-park .button:nth-of-type(2)').should('be.visible') //Reseve button
    cy.get('#listing-park .button:nth-of-type(3)').should('be.visible') //Arrange viewing button
    cy.get('#listing-park > section > div > a').should('be.visible') //Chat with supervisor button

  });


  it('Should take Virtual Tours Of Popular Models', function () {

    cy.get('.site-block__info--ownership .button--ownership').click()
    cy.wait(1000)
    cy.get('#standard-hero > div:nth-child(3) a:nth-child(4)').click() // VIEW MODEL VIRTUAL TOURS
    cy.wait(1000)
    expect(cy.get('#main > section > div > h1').first().contains('Virtual Tours Of Popular Models'))

    //Page checks
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