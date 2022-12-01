import '../../support/commands.js'
const dayjs = require('dayjs')

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

cy.config().screenSizes.forEach((size) => {

  describe('Sun Communities UK Website ' + size[0] + ', ' + size[1], async function () {

    beforeEach(() => {
      cy.viewport(size[0], size[1]) // Change screen size
      cy.visit(cy.config().scuk.baseUrl)
      cy.url().should('contain', cy.config().scuk.baseUrl)
    })

    it('Should have a Header', function () {
      cy.get('header').find('img').should('have.attr', 'src').should('include', 'Sun_Communities_UK_logo.PNG')
    })

    it('Should have SCUK information', function () {
      cy.get('h2').eq(0).should('be.visible').should('exist').should('include.text', 'Sun Communities UK')
      cy.get('[data-testid="intro-card-container"] ').find('img').should('have.attr', 'src').should('include', 'logos-overview-sun-homepage.jpg')
      cy.get('[data-testid="intro-card-container"] div div div p').eq(0).scrollIntoView().should('be.visible').should('exist').should('include.text', 'Sun Communities UK').should('include.text', 'Sun Communities Inc').should('include.text', 'Michigan, USA')
      cy.get('[data-testid="intro-card-container"] div div div p').eq(1).scrollIntoView().should('be.visible').should('exist')
      cy.get('h2').eq(1).should('include.text', 'Our Brands')
    })

    it('Should have a Park Holidays UK section', function () {
      cy.get('[data-testid="brand-block-container"] ').eq(0).find('img').should('have.attr', 'src').should('include', 'park-holidays-sun-homepage.jpg')
      cy.get('[data-testid="brand-logo-text-container-left"]').eq(0).scrollIntoView().should('be.visible').should('exist').should('include.text', 'Park Holidays UK').should('include.text', 'was acquired by Sun Communities in April 2022')
      cy.get('[data-testid="brand-logo-text-container-left"] a').eq(0).scrollIntoView().should('be.visible').should('exist').should('have.attr', 'url').and('include', "https://www.parkholidays.com")
    })

    it('Should have a Park Leisure section', function () {
      cy.get('[data-testid="brand-block-container"] ').eq(1).find('img').should('have.attr', 'src').should('include', 'park-leisure-sun-homepage.jpg')
      cy.get('[data-testid="brand-logo-text-container-right"]').eq(0).scrollIntoView().should('be.visible').should('exist').should('include.text', 'Park Leisure').should('include.text', 'was acquired by Sun Communities in June 2022')
      cy.get('[data-testid="brand-logo-text-container-right"] a').eq(0).should('have.attr', 'url').and('include', "https://www.parkleisure.co.uk")
    })


    it('Should have an Our Responsibilities download section', function () {
      cy.get('h2').eq(2).should('include.text', 'Our Responsibilities')
      cy.get('a').eq(3).should('have.attr', 'href').and('include', "https://eu-assets.contentstack.com/v3/assets/blt56c8850fd125d23e/blt19237c0c38637a27/634fbe26a367ef0ff728754a/es_policy_2021.pdf")
      cy.get('a').eq(3).should('include.text', 'Download our')
      cy.get('a').eq(3).should('include.text', 'Environmental and Social Responsibility Policy')
    })

    it('Should have a Footer', function () {

      cy.get('footer').should('include.text', '© ' + dayjs().year())
      cy.get('footer').should('include.text', 'Sun Communities')

      cy.get('footer a').should('include.text', 'Privacy policy')
      cy.get('footer a').eq(0).should('have.attr', 'href').and('include', "/privacy-policy") 

      cy.get('footer a').should('include.text', 'Cookie policy')
      cy.get('footer a').eq(1).should('have.attr', 'href').and('include', "/cookie-policy")

    })

    it('Should open Privacy Policy Page', function () {
      cy.get('footer a').eq(0).click()
      cy.url().should('contain', '/privacy-policy')
    })

    it('Should open Cookie Policy Page', function () {
      cy.get('footer a').eq(1).click()
      cy.url().should('contain', '/cookie-policy')
    })

    it('Should scan for broken links ' + cy.config().scuk.baseUrl, function () {
      cy.ScanForBrokenLinks();
    })

  })

}) //foreach screenSizes
