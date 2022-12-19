import '../../support/functions.js'

const dayjs = require('dayjs')

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

cy.config().screenSizes.forEach((size) => {

    describe('User Journey ' + size[0] + ', ' + size[1], async function () {

        beforeEach(() => {
            cy.viewport(size[0], size[1]) // Change screen size
            cy.visit(Cypress.config().pl.my.url)
            cy.url().should('contain', cy.config().pl.my.url)
        })

        it('Ownership Enquiry - route 1. via Content, Search, Park page', function () {
            //Park Leisure HomePage
            //Content Pages (Ownership)
            //Park Search (Ownership)
            //Park Pages (Ownership)
            //Enquiry Page (Ownership)
        })

        it('Ownership Enquiry - route 2. via Content, Park, Stock page', function () {
            //Park Leisure HomePage
            //Content Pages (Ownership)
            //Park Pages (Ownership)
            //Stock Pages (Ownership)
            //Stock Item (Ownership)
            //Enquiry Page (Ownership)
        })

        it('Ownership Enquiry - route 3. via Landing, Our Location, Park page', function () {
            //Park Leisure HomePage
            //Ownership Landing Page
            //Our Location (Ownership)
            //Park Pages (Holidays)
            //Enquiry Page (Ownership)
        })

        it('Ownership Enquiry - route 4. via Holidays', function () {
            //Park Leisure HomePage
            //Holidays Landing Page
            //Search Holidays - Our Locations

            //Park Pages (Holidays)
            //Ownership Link
            //Park Pages (Ownership)
            //Enquiry Page (Ownership)
        })

        it('Ownership Content Page can be accessed from Ownership Blog News page', function () {
            //Blog/News (Ownership)
            //Content Pages (Ownership)
        })

        it('Ownership Park Page can be accessed from Ownership Blog News page', function () {
            //Blog/News (Ownership)
            //Park Pages (Ownership)
        })

        it('Ownership Park Search Page can be accessed from Ownership Blog News page', function () {
            //Blog/News (Ownership)
            //Park Search (Ownership)
        })

        it('Ownership Park Pages can be accessed from Ownership Location Region Page', function () {
            //Location Region Pages (Ownership)
            //Park Pages (Ownership)
        })

        it('Holiday Checkout - route 1. via Landing, Search, Park page', function () {
            //Park Leisure HomePage
            //Holidays Landing Page
            //Search Holidays - Our Locations
            //Park Pages (Holidays)
            //Checkout (Holidays)
        })

        it('Holiday Checkout - route 2. via Content, Search, Park page', function () {
            //Park Leisure HomePage
            //Content Pages (Ownership)
            //Search Holidays - Our Locations
            //Park Pages (Holidays)
            //Checkout (Holidays)
        })

        it('Holiday Checkout - route 3. via Content, Park page', function () {
            //Park Leisure HomePage
            //Content Pages (Ownership)
            //Park Pages (Holidays)
            //Checkout (Holidays)
        })

        it('Holiday Checkout - route 4. via Ownership page', function () {
            //Park Leisure HomePage
            //Ownership Landing Page
            //Our Location (Ownership)
            //Park Pages (Ownership)
            //Holiday Link
            //Park Pages (Holidays)
            //Ownership Link
            //Park Pages (Ownership)
            //Holiday Link
            //Park Pages (Holidays)
            //Checkout (Holidays)
        })

        it('Holiday Park Pages can be accessed from Holiday Location Region Page', function () {
            //Location Region Pages (Holidays)
            //Park Pages (Holidays)
        })

    }); //Describe

}) //foreach screenSizes