const dayjs = require('dayjs')

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

cy.config().screenSizes.forEach((size) => {

  describe('Header, Footer and menus ' + size[0] + ', ' + size[1], async function () {

    beforeEach(() => {
      cy.viewport(size[0], size[1]) // Change screen size
      cy.visit(cy.config().ph.baseUrl)
      cy.url().should('contain', cy.config().ph.baseUrl)
      if (window.location.href.indexOf("parkholidays.com") > -1) {
        cy.get('#onetrust-accept-btn-handler').click()
        cy.setCookie('OptanonAlertBoxClosed', dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSZZ")) // Create cookie to disable cookie banner
      }
    })

    it('Should access to the side menu bar', function () {

      cy.get('header li:nth-child(3) > button').click() // Menu
      cy.get('header li:nth-child(3) > button').should('include.text', 'Menu')
      cy.get('[href="/"]').should('include.text', 'Home')
      cy.get('[__type="AccordionItemHeader"]').eq(13).should('include.text', 'Holidays & Short Breaks')
      //
      cy.get('[__type="AccordionItemHeader"]').eq(13).click() // Menu expand
      cy.get('[href="/caravan-holidays"]').should('include.text', 'Overview')
      cy.get('[href="/caravan-holidays/self-catering-accommodation-rent-rental-hire"]').should('include.text', 'Accommodation')
      cy.get('[href="/caravan-holidays/luxury-lodge-holiday-breaks"]').should('include.text', 'Luxury Lodge Holidays')
      cy.get('[href="/caravan-holidays/sandhills-luxury-apartments"]').should('include.text', 'Sandhills Luxury Apartments')
      cy.get('[href="/caravan-holidays/glamping"]').should('include.text', 'Glamping')
      cy.get('[href="/caravan-holidays/november-december-breaks"]').should('include.text', '2022 November & December Holidays')
      cy.get('[href="/caravan-holidays/holiday-extras"]').should('include.text', 'Holiday Extras')
      cy.get('[href="/caravan-holidays/food-drink"]').should('include.text', 'Food and Drink')
      cy.get('[href="/caravan-holidays/entertainment"]').should('include.text', 'Entertainment & Live Shows')
      cy.get('[href="/caravan-holidays/local-attractions"]').should('include.text', 'Attraction Discounts')
      cy.get('[href="/caravan-holidays/special-offers"]').should('include.text', 'Special Offers')
      cy.get('[href="/caravan-holidays/phone-only-offers"]').should('include.text', 'Phone-only Offers')
      cy.get('[href="/caravan-holidays/next-year"]').should('include.text', '2023 Holidays and Short Breaks')
      //cy.get('[href="/about-us/reviews"]').eq(0).should('include.text', 'Park Holidays UK Reviews')
      //cy.get('[href="/caravan-holidays/staying-with-us/frequently-asked-questions"]').should('include.text', 'Frequently Asked Questions')
      cy.get('[href="/caravan-holidays/dog-friendly"]').should('include.text', 'Dog Friendly Holidays')
      cy.get('[__type="AccordionItemHeader"]').eq(13).click() // Menu collapse


      cy.get('[__type="AccordionItemHeader"]').eq(14).should('include.text', 'Touring & Camping')
      //
      cy.get('[__type="AccordionItemHeader"]').eq(14).click() // Menu expand
      cy.get('[href="/touring-and-camping"]').should('include.text', 'Overview')
      cy.get('[href="/touring-and-camping/our-campsites"]').should('include.text', 'About Our Campsites')
      cy.get('[href="/touring-and-camping/pods"]').should('include.text', 'Camping Pods')
      cy.get('[href="/touring-and-camping/touring-extras"]').should('include.text', 'Touring Extras')
      cy.get('[href="/touring-and-camping/food-drink"]').should('include.text', 'Food and Drink')
      cy.get('[href="/touring-and-camping/dog-friendly"]').should('include.text', 'Dog Friendly Touring Holidays')
      cy.get('[href="/touring-and-camping/special-offers"]').should('include.text', 'Touring Special Offers')
      cy.get('[href="/touring-and-camping/last-minute-deals"]').should('include.text', 'Last Minute Deals')
      cy.get('[href="/touring-and-camping/seasonal-tourers"]').should('include.text', 'Seasonal Pitches')
      cy.get('[href="/touring-and-camping/special-offers"]').should('include.text', 'Touring Special Offers')
      cy.get('[href="/touring-and-camping/last-minute-deals"]').should('include.text', 'Last Minute Deals')
      cy.get('[href="/touring-and-camping/seasonal-tourers"]').should('include.text', 'Seasonal Pitches')
      cy.get('[href="/touring-and-camping/staying-with-us/frequently-asked-questions"]').should('include.text', 'FAQs')
      cy.get('[__type="AccordionItemHeader"]').eq(14).click() // Menu collapse


      cy.get('[__type="AccordionItemHeader"]').eq(15).should('include.text', 'Holiday Home Ownership')
      //
      cy.get('[__type="AccordionItemHeader"]').eq(15).click() // Menu expand
      cy.get('[href="/caravan-holiday-homes-for-sale"]').should('include.text', 'Overview')
      cy.get('[href="/caravan-holiday-homes-for-sale/ownership-guide/holiday-home-lifestyle"]').should('include.text', 'Ownership Guide')
      cy.get('[href="/caravan-holiday-homes-for-sale/static-caravans-for-sale"]').should('include.text', 'Static Caravans for Sale')
      cy.get('[href="/caravan-holiday-homes-for-sale/lodges-for-sale"]').should('include.text', 'Luxury Lodges for Sale')
      cy.get('[href="/caravan-holiday-homes-for-sale/virtual-tours"]').should('include.text', 'Virtual Tours')
      cy.get('[href="/caravan-holiday-homes-for-sale/letting-income"]').should('include.text', 'Extra Letting Income')
      cy.get('[href="/caravan-holiday-homes-for-sale/special-offers"]').should('include.text', 'Special Offers')
      cy.get('[href="/caravan-holiday-homes-for-sale/guaranteed-letting"]').should('include.text', 'Guaranteed Letting')
      cy.get('[href="/caravan-holiday-homes-for-sale/showcase"]').should('include.text', 'Holiday Home Gallery')
      cy.get('[href="/caravan-holiday-homes-for-sale/request-brochure"]').should('include.text', 'Request Brochure')
      cy.get('[href="/caravan-holiday-homes-for-sale/frequently-asked-questions"]').should('include.text', 'FAQs')
      cy.get('[__type="AccordionItemHeader"]').eq(15).click() // Menu collapse


      cy.get('[data-trigger="onclose"] button').first().click() // Menu close

    })

  })

}) //foreach screenSizes
