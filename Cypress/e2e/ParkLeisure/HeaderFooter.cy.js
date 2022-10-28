const dayjs = require('dayjs')

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Header, Footer and menus', async function () {

  beforeEach(() => {
    cy.config().screenSizes.forEach((size) => {
      cy.viewport(size[0], size[1]) // Change screen size

      cy.visit(cy.config().pl.baseUrl)
      cy.url().should('contain', cy.config().pl.baseUrl)
      if (window.location.href.indexOf("parkleisureholidays.co.uk") > -1) {
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
    //cy.get('.l-footer__col .e-icon-link').should('include.text', 'enquiries@parkleisure.co.uk')
    cy.get('.l-footer__col .e-icon-link').should('include.text', 'ownershipenquiries@parkleisure.co.uk')
    cy.get('.l-footer__all').should('include.text', 'Park Leisure 2000 Limited, Park Leisure 2000 (Cornwall) Limited and Park Leisure 2000 (Northumberland) Limited who are all registered in England (Reg. No’s 03352005,05262097 & 04268282) and are authorised and regulated by the Financial Conduct Authority (FCA) for consumer credit broking and general insurance & introduction activities under registration numbers 668081, 660778, 660777, 413870, 472809 & 414279')
    cy.get('.l-footer__all').should('include.text', 'The Park Leisure companies are part of Park Holidays UK Limited, who are registered in England (Reg. No. 02434151) are authorised and regulated by the Financial Conduct Authority (FCA) for consumer credit broking and general insurance & introduction activities under registration numbers 669336 & 717823.')

    //ENQUIRE
    cy.get('div.l-footer__left > div:nth-child(2) > h4:nth-child(3)').should('include.text', 'Enquire')
    cy.get('div.l-footer__left > div:nth-child(2) [href="/request-a-brochure"]').should('include.text', 'Request a brochure')
    cy.get('div.l-footer__left > div:nth-child(2) [href="/contact"]').should('include.text', 'Contact us')


  })




})
