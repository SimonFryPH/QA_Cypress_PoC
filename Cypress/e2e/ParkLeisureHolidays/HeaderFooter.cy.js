const dayjs = require('dayjs')

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

cy.config().screenSizes.forEach((size) => {

    describe('Header, Footer and menus ' + size[0] + ', ' + size[1], async function () {

        beforeEach(() => {
            cy.viewport(size[0], size[1]) // Change screen size //[[1920, 1080],[768, 1024],[375, 667]]
            cy.visit(cy.config().plh.baseUrl)
            cy.url().should('contain', cy.config().plh.baseUrl)
            if (window.location.href.indexOf("parkleisureholidays.co.uk") > -1) {
                cy.get('#onetrust-button-group #onetrust-accept-btn-handler').click()
                cy.setCookie('OptanonAlertBoxClosed', dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSZZ")) // Create cookie to disable cookie banner
            }
        })

        it('Should access Header menu items', function () {

            //[[1920, 1080],[768, 1024],[375, 667]]

            cy.get('body').then(() => {
                let el = Cypress.$('body')



                //All Visible
                if (el.outerWidth() > 838) {
                    cy.get('.b-nav-bar__list a').eq(0).should('include.text', 'Request a brochure').should('be.visible')
                    cy.get('.b-nav-bar__list a').eq(1).should('include.text', 'FAQs').should('be.visible')
                    cy.get('.b-nav-bar__list a').eq(2).should('include.text', 'Make a Payment').should('be.visible')
                    cy.get('.b-nav-bar__list a').eq(3).should('include.text', 'Own a holiday home').should('be.visible')
                    cy.get('.b-nav-bar__list a').eq(4).should('include.text', 'Contact').should('be.visible')

                    cy.get('div.l-top-nav__nav > div:nth-child(2) a').eq(0).should('include.text', 'Our Locations').should('be.visible')
                    cy.get('div.l-top-nav__nav > div:nth-child(2) a').eq(1).should('include.text', 'The Park Leisure Experience').should('be.visible')
                    cy.get('div.l-top-nav__nav > div:nth-child(2) a').eq(2).should('include.text', 'Find your perfect break').should('be.visible')
                    cy.get('div.l-top-nav__nav > div:nth-child(2) a').eq(3).should('include.text', 'Offers').should('be.visible')
                    cy.get('div.l-top-nav__nav > div:nth-child(2) a').eq(4).should('include.text', 'Touring & Camping').should('be.visible')
                }
/*

                if (el.outerWidth() > 639 && el.outerWidth() < 838) {
                    cy.get('.b-nav-bar__dropdown-trigger').eq(0).should('be.visible') //More
                    cy.get('.b-nav-bar__dropdown-trigger').eq(1).should('be.visible') //More
                }

                if (el.outerWidth() < 640) {
                    cy.get('.b-nav-bar__dropdown-trigger').eq(0).should('not.be.visible') //More
                    cy.get('.b-nav-bar__dropdown-trigger').eq(1).should('not.be.visible') //More
                }
*/

            }) //#root
        });

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
            cy.get('footer address').should('include.text', 'Park Holidays')
            cy.get('footer address').should('include.text', 'Glovers House')
            cy.get('footer address').should('include.text', 'Bexhill-On-Sea')
            cy.get('footer address').should('include.text', 'East Sussex')
            cy.get('footer address').should('include.text', 'TN39 5ES')
            //cy.get('.l-footer__col .e-icon-link').should('include.text', 'enquiries@parkleisure.co.uk')
            cy.get('.l-footer__col .e-icon-link').should('include.text', 'ownershipenquiries@parkleisure.co.uk')
            cy.get('.l-footer__all').should('include.text', 'Park Leisure 2000 Limited, Park Leisure 2000 (Cornwall) Limited and Park Leisure 2000 (Northumberland) Limited who are all registered in England (Reg. No’s 03352005,05262097 & 04268282) and are authorised and regulated by the Financial Conduct Authority (FCA) for consumer credit broking and general insurance & introduction activities under registration numbers 668081, 660778, 660777, 413870, 472809 & 414279')
            cy.get('.l-footer__all').should('include.text', 'The Park Leisure companies are part of Park Holidays UK Limited, who are registered in England (Reg. No. 02434151) are authorised and regulated by the Financial Conduct Authority (FCA) for consumer credit broking and general insurance & introduction activities under registration numbers 669336 & 717823.')

            //ENQUIRE
            cy.get('div.l-footer__left > div:nth-child(2) > h4:nth-child(3)').should('include.text', 'Enquire')
            cy.get('div.l-footer__left > div:nth-child(2) [href="/request-a-brochure"]').should('include.text', 'Request a brochure')
            cy.get('div.l-footer__left > div:nth-child(2) [href="/contact"]').should('include.text', 'Contact us')

            //POLICY
            cy.get('.l-footer__col [href="/privacy-policy"]').should('include.text', 'Privacy Policy')
            cy.get('.l-footer__col [href="/cookie-policy"]').should('include.text', 'Cookie Policy')

        });

    }); //Describe

}) //foreach screenSizes
