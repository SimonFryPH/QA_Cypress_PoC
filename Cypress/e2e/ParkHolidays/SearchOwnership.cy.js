const dayjs = require('dayjs');

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

function cookieClose() {
  cy.log(">> Cookie Close")
  if (window.location.href.indexOf("www.parkholidays.com") > -1)
  {
    cy.get('#onetrust-button-group #onetrust-accept-btn-handler').click()
    cy.setCookie('OptanonAlertBoxClosed', dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSZZ")) // Create cookie to disable cookie banner
  }
}

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


describe("Ownership", async function () {
  this.beforeAll(() => {
    killChat();
  });


  beforeEach(() => {
    cy.config().screenSizes.forEach((size) => {
      cy.viewport(size[0], size[1]) // Change screen size

      cy.visit(cy.config().ph.baseUrl);
      cy.url().should("contain", cy.config().ph.baseUrl);
      cookieClose()
    })
  })

  it('Should Search Holiday homes (ownership)', function () {

    //cy.get('.site-block__info--ownership .button--ownership').click()
    cy.get('#site-blocks .button--ownership').click()

    cy.get('h1').should('include.text', 'Caravan Holiday Homes & Lodges for Sale')
    cy.get('[title="Find holiday home"]').click()  //Search Holiday Homes (takes ages)
    //
    cy.log(">> Page checks on Refine by")
    cy.get('#filter').should('be.visible')
    cy.get('#filter > div.filters__options > div:nth-child(3)').should('be.visible') // Condition
    cy.get('#filter > div.filters__options > div:nth-child(4)').should('be.visible') // Type
    cy.get('#filter > div.filters__options > div:nth-child(6)').should('be.visible') // Bedrooms
    cy.get('#filter > div.filters__options > div:nth-child(8)').should('be.visible') // Addional Options
    cy.get('#filter > div.filters__options > div:nth-child(9)').should('be.visible') // Manufacturer
    cy.get('#filter > div.filters__options > div:nth-child(9) > a').should('be.visible') // Manufacturer Show all options

    //FAILING TESTS
    cy.get('#filter > div.filters__options > div.overflowable.overflowed').should('not.exist'); // Hide all options should not exist
    //cy.get('#filter > div.filters__options > div:nth-child(9) > a').click() // Show all options
    //cy.get('#filter > div.filters__options > div.overflowable.overflowed').should('exist');
    //cy.get('#filter > div.filters__options > div.overflowable.overflowed > a').click() // Hide all options
    //cy.get('#filter > div.filters__options > div:nth-child(10)').should('be.visible') // Offers

    //
    cy.log(">> Complete availability search form")
    cy.log("Test to ensure both test data and website are displaying the correct Parks")
    cy.get('[name="location"] option:not([value="all"]):not([value^="C"])').its('length').should('be.eq', Cypress.config().ph.ownershipParks.length)
    cy.get('[name="location"]').select("All Parks") // Defaults to "All Parks"
    cy.get('[name="priceRange"] option').its('length').should('be.gt', 1)
    cy.get('[name="priceRange"]').select(3) // £30k - £50k
    cy.get('.searchbar .button--ownership').click() // Search
    cy.screenshot()
    cy.get('.card--county .button--ownership').its('length').should('be.gt', 0)
    //
    cy.log(">> Click first county record")
    cy.get('.card--county .button--ownership').first().click() //eg Essex
    cy.get('.card .yellow-button').its('length').should('be.gt', 0)
    //
    cy.log(">> Click first holiday destination record in selected county")
    cy.get('.card .yellow-button').first().click() //eg Steeple Bay in Essex
    //
    cy.log(">> Page checks")
    cy.get('div._1r8tv22 a:nth-child(1)').should('be.visible') // Arrange your visit
    cy.get('div._1r8tv22 a:nth-child(2)').should('be.visible') // Holiday Homes for Sale
    cy.get('h1').should('include.text', '- Static Caravans & Lodges for Sale')
    cy.get('._1ngeu0l').its('length').should('be.gt', 0) // Sale items
  });


  it('Should take Virtual Tours Of Popular Models', function () {

    cy.get('.site-block__info--ownership .button--ownership').click()
    cy.get('[title="virtual-tours"]').click() // VIEW MODEL VIRTUAL TOURS
    //
    cy.log(">> Page checks")
    expect(cy.get('#main > section > div > h1').first().contains('Virtual Tours Of Popular Models'))
    cy.get('.container div:nth-child(1) > div > div > .button').should('be.visible') // Static Caravan Models
    cy.get('.container div:nth-child(2) > div > div > .button').should('be.visible') // Villa Collection Models
    cy.get('.container div:nth-child(3) > div > div > .button').should('be.visible') // Luxury Lodges

    cy.get('.container div:nth-child(1) > div > div > .button').first().click() // Static Caravan Models
    cy.get('.u-video-responsive').first().should('be.visible') //Media
    cy.get('h1').should('include.text', 'Static Caravan Models')
    cy.go('back')
    cy.wait(1500)
    cy.get('.container div:nth-child(2) > div > div > .button').first().click() // Villa Collection Models
    cy.get('h1').should('include.text', 'Villa Collection Models')
    cy.get('.u-video-responsive').first().should('be.visible') //Media
    cy.go('back')
    cy.wait(1500)
    cy.get('.container div:nth-child(3) > div > div > .button').first().click() // Luxury Lodges
    cy.get('h1').should('include.text', 'Luxury Lodge Models')
    cy.get('.u-video-responsive').first().should('be.visible') //Media
    cy.go('back')
  });



});