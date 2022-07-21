describe('Our Parks', function () {

  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl)
    //Click OUR PARKS
    cy.get('#site-blocks .site-block__info--ourparks .button--primary').click()
    expect(cy.get('#ourparks h1').contains('Explore a huge range of Holiday Parks'))
  })

  it('Chichester Lakeside - DETAILS', function () {
    cy.get('#park_2 .js-details-button').eq(0).click()
    expect(cy.get('.page-header-details__title').contains('Chichester Lakeside'))
  })

  
  it('Chichester Lakeside - View Holidays', function () {
    cy.get('#park_2 .button').eq(1).click()
    expect(cy.get('h1').contains('location available'))
    //expect(cy.get('.page-header-details__title').contains('Chichester Lakeside'))
  })

})
/*
Alberta
#park_4

Ashbourne Heights
#park_40

Birchington Vale
#park_28

Bodmin
#park_47

Bowland Fell


Broadland Sands


Carlton Meres


Chichester Lakeside


Coghurst Hall


Dawlish Sands


Dovercourt

Felixstowe Beach

Golden Sands

Harts

Hedley Wood

Hengar Manor


Landscove

Lossiemouth

Marlie

Martello Beach

New Beach

Pakefield

Pevensey Bay

Polperro

Riviera Bay

Rye Harbour

Sand le Mere

Sandhills

Seaview

Seawick

Silver Sands

Solent Breezes

St Osyth Beach

Steeple Bay

Suffolk Sands

Tarka

Trevella

Turnberry

Waterside

Winchelsea Sands

Wood Farm
*/
