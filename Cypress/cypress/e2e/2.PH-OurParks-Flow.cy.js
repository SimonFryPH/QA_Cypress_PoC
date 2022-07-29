Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
}); // handle youtube issue

describe('Our Holiday Parks flow E2E', function () {

  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl)
    //Click OUR PARKS
    cy.get('#site-blocks .site-block__info--ourparks .button--primary').click()
    cy.get('#ourparks h1').should('include.text', 'Explore a huge range of Holiday Parks')
    cy.get('#filter').should('exist');
    
    var myParks = Cypress.config().phHolidayParks
    for (var i = 0; i < myParks.length; i++) {
      cy.get('#results-panel').should('include.text', myParks[i])
    }
    cy.log("Test to ensure both test data and website are displaying all Parks") 
    cy.get("#ourparks .col-xs-12:not([style='display: none;']) .card").its('length').should('be.eq', myParks.length) 

  })

  it('Should find a park and book a visit', function () {
    cy.get('#park_2 .js-details-button').click() // Chichester
    cy.get('#searchbar button.css-10lxziy').click() // Search Ownership

    // Page checks
    cy.get('.page-header-details__title').should('include.text', 'Chichester Lakeside')
    cy.get('div.page-header-actions__book-visit').should('be.visible') // Book your visit
    cy.get('div.page-header-actions__brochure').should('be.visible') // Get Brochure

    //Book your visit
    cy.get('div.page-header-actions__book-visit a').eq(0).click()
    cy.get('#WEBAAV > h3').should('include.text', 'Arrange a park visit to Chichester Lakeside')

    // Arrange a park visit to Chichester Lakeside
    cy.get('[name="title"]').select("Mr")
    cy.get('[name="firstname"]').type("SimonPHUKTest_Please_ignore");
    cy.get('[name="lastname"]').type("FryPHUKTest_Please_ignore");
    cy.get('[name="email"]').first().type("phtestaccount@email.com");
    cy.get('[name="telephone"]').type("01234567890");
    cy.get('[name="date_6_months"]').select(2) //Visit Date
    cy.get('input[type="checkbox"][name="privacy_policy"]').eq(0).click({ force: true }) // Privacy Policy

    // SUBMIT
    cy.get('#gtm--webaav').eq(0).click() 
    cy.wait(1000)
    cy.get('#WEBAAV > h3').should('include.text', 'Arrange a park visit to Chichester Lakeside')
    cy.get('#WEBAAV > div > h6').should('include.text', 'Arrange a visit request received')
    cy.get('#WEBAAV > div > p').should('include.text', 'Thank you for your request to arrange a visit, we will be in contact shortly.')
})
 


})
