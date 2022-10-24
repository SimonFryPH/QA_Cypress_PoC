const dayjs = require('dayjs')

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

const sizes = Cypress.config().screenSizes

describe('Holiday Booking flow E2E', async function () {

  beforeEach(() => {
    sizes.forEach((size) => {
      cy.viewport(size[0], size[1]) // Change screen size

      cy.visit(Cypress.config().pl.baseUrl)
      cy.url().should('eq', Cypress.config().pl.baseUrl)
      if (window.location.href.indexOf("www.parkleisureholidays.co.uk") > -1) {
        cy.get('#onetrust-button-group #onetrust-accept-btn-handler').click()
        cy.setCookie('OptanonAlertBoxClosed', dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSZZ")) // Create cookie to disable cookie banner
      }
    })
  })

  it('Should access Header menu items', function () {

    cy.get('.b-nav-bar__list :nth-child(1) a').should('include.text', 'Request a brochure')
    cy.get('.b-nav-bar__list :nth-child(2) a').should('include.text', 'FAQs')
    cy.get('.b-nav-bar__list :nth-child(3) a').should('include.text', 'Make a Payment')
    cy.get('.b-nav-bar__list :nth-child(4) a').should('include.text', 'Own a holiday home')
    cy.get('.b-nav-bar__list :nth-child(5) a').should('include.text', 'Contact')
    
    cy.get('div.l-top-nav__nav > div:nth-child(2) li:nth-child(1) > a').should('include.text', 'Our Locations')
    cy.get('div.l-top-nav__nav > div:nth-child(2) li:nth-child(2) > a').should('include.text', 'The Park Leisure Experience')
    cy.get('div.l-top-nav__nav > div:nth-child(2) li:nth-child(3) > a').should('include.text', 'Find your perfect break')
    cy.get('div.l-top-nav__nav > div:nth-child(2) li:nth-child(4) > a').should('include.text', 'Offers')
    //cy.get('div.l-top-nav__nav > div:nth-child(2) button').should('include.text', 'More') //not working

  })

  it('Should access Footer menu items', function () {

    //HOLIDAYS
    cy.get('div.l-footer__left > div:nth-child(1) > h4').should('include.text', 'Holidays')
    cy.get('div.l-footer__left > div:nth-child(1) [href="/our-locations"]').should('include.text', 'Our Parks')
    cy.get('div.l-footer__left > div:nth-child(1) [href="/the-park-leisure-experience"]').should('include.text', 'The Park Leisure Experience')
    cy.get('div.l-footer__left > div:nth-child(1) [href="/find-your-perfect-break"]').should('include.text', 'Find Your Perfect Break')
    cy.get('div.l-footer__left > div:nth-child(1) [href="/cancellation-policy"]').should('include.text', 'Cancellation Policy')
    cy.get('div.l-footer__left > div:nth-child(1) [href="/terms-and-conditions"]').should('include.text', 'Holiday Terms & Conditions')

    //PARK LEISURE
    cy.get('div.l-footer__left > div:nth-child(2) > h4').should('include.text', 'Park Leisure')
    cy.get('div.l-footer__left > div:nth-child(2) [href="/own-a-holiday-home"]').should('include.text', 'Ownership')

    //CONTACT US
    cy.get('div.l-footer__left > div:nth-child(3) > h4').should('include.text', 'Contact Us')
    cy.get('footer address').should('include.text', 'Park Leisure 2000 Ltd')
    cy.get('footer address').should('include.text', 'Tudor Court')
    cy.get('footer address').should('include.text', 'York Business Park')
    cy.get('footer address').should('include.text', 'Nether Poppleton')
    cy.get('footer address').should('include.text', 'YO26 6RS')
    cy.get('div.l-footer__left > div:nth-child(3) [href="mailto:enquiries@parkleisure.co.uk"]').should('include.text', 'enquiries@parkleisure.co.uk')

    //ENQUIRE
    cy.get('div.l-footer__left > div:nth-child(2) > h4:nth-child(3)').should('include.text', 'Enquire')
    cy.get('div.l-footer__left > div:nth-child(2) [href="/request-a-brochure"]').should('include.text', 'Request a brochure')
    cy.get('div.l-footer__left > div:nth-child(2) [href="/contact"]').should('include.text', 'Contact us')


  })




})
