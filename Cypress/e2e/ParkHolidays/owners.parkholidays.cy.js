const dayjs = require('dayjs')

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('owners.parkholidays.com', async function () {

    beforeEach(() => {
        cy.config().screenSizes.forEach((size) => {
            cy.viewport(size[0], size[1]) // Change screen size
            cy.visit(cy.config().ph.owners.url)
            cy.url().should('contain', cy.config().ph.owners.url)
        })
    })

    it('Should display login page', function () {

        cy.get('#root').find('img').should('have.attr', 'src').should('include', 'ownersarea-logo-small-ph.svg')
        cy.get('#email_label span').should('include.text', 'Email Address')
        cy.get('#password_label span').should('include.text', 'Password')
        cy.get('[href="/forgot-password"]').should('include.text', 'Forgot Password?')
        cy.get('[type="submit"]').should('include.text', 'Login')
        cy.get('h2').should('include.text', 'New to the Owners Area?')
        cy.get('[href="/register"]').should('include.text', 'Register')

        cy.get('[href="/forgot-password"]').click()
        cy.url().should('contain', 'forgot-password')
        //
        // Add more tests from this page
    })

    it('Should not log in with invalid password', function () {
        cy.get('#email').type(cy.config().ph.owners.emailUser)
        cy.get('#password').type('xxxxx')
        cy.get('[type="submit"]').eq(1).click()
        cy.get('p').should('include.text', 'Incorrect username or password.')
    })

    it('Should not log in with unregistered email', function () {
        cy.get('#email').type(dayjs().format("YYYYMMDDTHHmmss") + cy.config().testemailsuffix)
        cy.get('#password').type(cy.config().ph.owners.password)
        cy.get('[type="submit"]').eq(1).click()
        cy.get('p').should('include.text', 'Incorrect username or password.')
    })

    describe('Should log in with valid credentials', async function () {

        beforeEach(() => {
            cy.get('#email').type(cy.config().ph.owners.emailUser)
            cy.get('#password').type(cy.config().ph.owners.password)
            cy.get('[type="submit"]').eq(1).click()
            cy.wait(2000)
        })

        it('and access the side menu items', function () {
            cy.wait(2000)
            cy.get('[role="banner"] [title="open menu"]').click()
            cy.get('nav a').eq(0).should('include.text', 'Home')
            cy.get('[type="submit"]').eq(0).click() // Hide side menu

            cy.get('[role="banner"] [title="open menu"]').click()
            cy.get('nav a').eq(1).should('include.text', 'News & Special offers')
            cy.get('nav a').eq(1).click()
            cy.url().should('contain', '/special-offers')

            cy.get('[role="banner"] [title="open menu"]').click()
            cy.get('nav a').eq(2).should('include.text', 'Managers Message')
            cy.get('nav a').eq(2).click()
            cy.url().should('contain', '/managers-message')

            cy.get('[role="banner"] [title="open menu"]').click()
            cy.get('nav a').eq(3).should('include.text', 'Events')
            cy.get('nav a').eq(3).click()
            cy.url().should('contain', '/events')

            cy.get('[role="banner"] [title="open menu"]').click()
            cy.get('nav a').eq(4).should('include.text', 'Information & Resources')
            cy.get('nav a').eq(4).click()
            cy.url().should('contain', '/information-resources')

            cy.get('[role="banner"] [title="open menu"]').click()
            cy.get('nav a').eq(5).should('include.text', 'FAQs')
            cy.get('nav a').eq(5).click()
            cy.url().should('contain', '/frequently-asked-questions')

            cy.get('[role="banner"] [title="open menu"]').click()
            cy.get('nav a').eq(6).should('include.text', 'Customer Care')
            cy.get('nav a').eq(6).click()
            cy.url().should('contain', '/customer-care')

            cy.get('[role="banner"] [title="open menu"]').click()
            cy.get('nav a').eq(7).should('include.text', 'Contact Us')
            cy.get('nav a').eq(7).click()
            cy.url().should('contain', '/contact-us')

            cy.get('[role="banner"] [title="open menu"]').click()
            cy.get('nav a').eq(8).should('include.text', 'My Account')
            //cy.get('nav a').eq(8).click() 

            cy.get('nav a').eq(9).should('include.text', 'Logout')
            cy.get('nav a').eq(9).click()
            cy.url().should('contain', '/login')

        })

        it('and view details on the home page', function () {
            // Add more tests from this page
        })

    })

    it('Should be able to register', function () {

        cy.get('[href="/register"]').click()
        cy.url().should('contain', '/register')

        cy.get('h4').should('include.text', 'Create an Account')
        cy.get('p').should('include.text', 'Please sign up using the email address held on your')
        cy.get('p').should('include.text', 'Park Holidays UK')
        cy.get('p').should('include.text', ' account')

        cy.get('#email').type(dayjs().format("YYYYMMDDTHHmmss") + cy.config().testemailsuffix)
        cy.get('#password').type('Password1!')
        cy.get('#confirmPassword').type('Password1!')
        cy.get('input[type="checkbox"]').click({ force: true }) // T&C's

        // Submit
        if (cy.config().submit) {
            cy.get('[type="submit"]').click()
            cy.get('h3').should('include.text', 'Success')
            cy.get('p').eq(1).should('include.text', 'A verification email has been sent to')
        } else {
            cy.log("submit has been disabled in the Config file")
        }

        cy.go(-1)

    })


})
