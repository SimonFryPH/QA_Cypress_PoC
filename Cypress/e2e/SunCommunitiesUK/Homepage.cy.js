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

      cy.get('h2').eq(0).should('include.text', 'Sun Communities UK')
      cy.get('[data-testid="intro-card-container"] ').find('img').should('have.attr', 'src').should('include', 'logos-overview-sun-homepage.jpg')
      cy.get('[data-testid="intro-card-container"] div div div div').eq(0).should('include.text', 'Sun Communities UK operates a selection of high quality holiday parks in the United Kingdom as park of Sun Communities Inc. which operates over 600 parks from its headquarters in Michigan, USA.')
      cy.get('[data-testid="intro-card-container"] div div div div').eq(0).should('include.text', 'The holiday parks in the UK operate under the Park Holidays UK and Park Leisure brands which are trading names for Sun Communities UK.')
      cy.get('h2').eq(1).should('include.text', 'Our Brands')

    })

    it('Should have a Park Holidays UK section', function () {

      cy.get('[data-testid="brand-block-container"] ').eq(0).find('img').should('have.attr', 'src').should('include', 'park-holidays-sun-homepage.jpg')
      cy.get('[data-testid="brand-logo-text-container-left"]').eq(0).should('include.text', 'Park Holidays UK')
      cy.get('[data-testid="brand-logo-text-container-left"]').eq(0).should('include.text', 'was acquired by Sun Communities in April 2022 and operates a broad range of park styles across England and Scotland. Many of the parks have extensive leisure facilities and offer both caravan holidays and holiday home ownership. For more information visit the')
      cy.get('[data-testid="brand-logo-text-container-left"] a').should('have.attr', 'url').and('include', "https://www.parkholidays.com")

    })

    it('Should have a Park Leisure section', function () {

      cy.get('[data-testid="brand-block-container"] ').eq(1).find('img').should('have.attr', 'src').should('include', 'park-leisure-sun-homepage.jpg')
      cy.get('[data-testid="brand-logo-text-container-right"]').eq(0).should('include.text', 'Park Leisure')
      cy.get('[data-testid="brand-logo-text-container-right"]').eq(0).should('include.text', 'was acquired by Sun Communities in June 2022 and operates a selection of boutique holiday parks across England and Wales. The parks are in select locations, usually smaller parks with the focus on holiday home ownership. For more information visit the')
      cy.get('[data-testid="brand-logo-text-container-right"] a').should('have.attr', 'url').and('include', "https://www.parkleisure.co.uk")

    })


    it('Should have an Our Responsibilities download section', function () {

      cy.get('h2').eq(2).should('include.text', 'Our Responsibilities')
      cy.get('.sc-bBABsx a').should('have.attr', 'href').and('include', "https://eu-assets.contentstack.com/v3/assets/blt56c8850fd125d23e/blt19237c0c38637a27/634fbe26a367ef0ff728754a/es_policy_2021.pdf")
      cy.get('.sc-bBABsx a div').should('include.text', 'Download our')
      cy.get('.sc-bBABsx a div').should('include.text', 'Environmental and Social Responsibility Policy')

    })

    it('Should have a Footer', function () {

      cy.get('footer').should('include.text', '© ' + dayjs().year())
      cy.get('footer').should('include.text', 'Sun Communities')

      cy.get('footer a').should('include.text', 'Privacy policy')
      cy.get('footer a').eq(0).should('have.attr', 'href').and('include', "/test1") 

      cy.get('footer a').should('include.text', 'Cookie policy')
      cy.get('footer a').eq(0).should('have.attr', 'href').and('include', "/test1")

    })


  })

}) //foreach screenSizes
