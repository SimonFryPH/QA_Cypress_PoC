import '../../support/functions.js'

const dayjs = require('dayjs')

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

cy.config().screenSizes.forEach((size) => {

    describe('New Park Leisure Website WIP tests' + size[0] + ', ' + size[1], async function () {

        beforeEach(() => {
            cy.viewport(size[0], size[1]) // Change screen size
            cy.visit(Cypress.config().ph.my.url)
            cy.url().should('contain', cy.config().ph.my.url)
        })

        it('Journey 1', function () {

            //Park Leisure HomePage
            //Ownership Landing Page
            //Our Locations
            //Park Pages (ownership)
            //Enquiry Page (ownership)

        })

        it('Journey 2', function () {

            //Park Leisure HomePage
            //Content Pages (Ownership)
            //Park Pages (Ownership)
            //Stock Pages (Ownership)
            //Enquiry Page (Ownership)

        })

        it('Journey 3', function () {

            //Park Leisure HomePage
            //Content Pages (Ownership)
            //Park Search (Ownership)
            //Park Pages (Ownership)
            //Enquiry Page (Ownership)


        })

        it('Should sommething', function () {



        })

        it('Should sommething', function () {



        })




        describe('Should log in  ' + size[0] + ', ' + size[1], function () {

            beforeEach(() => {
                cy.get('#email').type(cy.config().ph.my.emailUser)
                cy.get('#password').type(cy.config().ph.my.password)
                cy.get('[type="submit"]').click()
                cy.wait(1000)
                cy.get('p:nth-child(1)').eq(0).should('include.text', cy.config().ph.my.customerNumber)
                cy.get('p span').eq(0).should('include.text', Cypress.config().ph.my.park)
                cy.get('p span').eq(1).should('include.text', Cypress.config().ph.my.pitch)
            })


            it('and do something else ', function () {


            })



            it('and do something else', function () {



            })



        })

        it('Should do something', function () {



        })

    })

}) //foreach screenSizes