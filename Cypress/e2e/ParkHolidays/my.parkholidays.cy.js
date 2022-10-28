import '../../support/functions.js'

const dayjs = require('dayjs')

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});


describe('my.parkholidays.com', async function () {

    beforeEach(() => {
        cy.config().screenSizes.forEach((size) => {
            cy.viewport(size[0], size[1]) // Change screen size
            cy.visit(Cypress.config().ph.my.url)
            cy.url().should('contain', cy.config().ph.my.url)
        })
    })


    it('Should display login page', function () {

        cy.get('#root').find('img').should('have.attr', 'src').should('include', 'white_redflag.svg')
        cy.get('#email_label span').should('include.text', 'Email Address')
        cy.get('#password_label span').should('include.text', 'Password')
        cy.get('[href="/forgot-password"]').should('include.text', 'Forgot Password?')
        cy.get('[href="/help"]').should('include.text', 'Need help?')
        cy.get('[type="submit"]').should('include.text', 'Login')
        cy.get('h4').should('include.text', 'New to My')
        cy.get('h4').should('include.text', 'Park Holidays')
        cy.get('[href="/register"]').should('include.text', 'Register')

        cy.get('[href="/help"]').click()
        cy.url().should('contain', 'help')

    })


    it('Should not log in with invalid password', function () {
        cy.get('#email').type(cy.config().ph.my.emailUser)
        cy.get('#password').type('xxxxx')
        cy.get('[type="submit"]').click()
        cy.get('p:nth-child(1)').eq(0).should('include.text', 'Incorrect username or password.')
    })

    it('Should not log in with unregistered email', function () {
        cy.get('#email').type(dayjs().format("YYYYMMDDTHHmmss") + cy.config().testemailsuffix)
        cy.get('#password').type(cy.config().ph.my.password)
        cy.get('[type="submit"]').click()
        cy.get('p:nth-child(1)').eq(0).should('include.text', 'Incorrect username or password.')
    })

    describe('Should log in with valid credentials', async function () {

        beforeEach(() => {
            cy.get('#email').type(cy.config().ph.my.emailUser)
            cy.get('#password').type(cy.config().ph.my.password)
            cy.get('[type="submit"]').click()
            cy.wait(1000)
            cy.get('p:nth-child(1)').eq(0).should('include.text', cy.config().ph.my.customerNumber)
            cy.get('p span').eq(0).should('include.text', Cypress.config().ph.my.park)
            cy.get('p span').eq(1).should('include.text', Cypress.config().ph.my.pitch)
        })


        it('and access the side menu items', function () {

            cy.get('[role="banner"] [title="open menu"]').click()
            cy.get('.fh a').eq(0).should('include.text', 'Home')
            cy.get('.fh svg').eq(0).click() // Hide side menu
            cy.get('[role="banner"] [title="open menu"]').click()

            cy.get('.fh a').eq(1).should('include.text', 'Profile')
            cy.get('.fh a').eq(1).click()
            cy.url().should('contain', '/profile')

            cy.get('[role="banner"] [title="open menu"]').click()
            cy.get('.fh a').eq(2).should('include.text', 'Holiday Home Ownership')
            cy.get('.fh a').eq(2).click() // expand

            cy.get('.fh a').eq(3).should('include.text', Cypress.config().ph.my.park + ', ' + Cypress.config().ph.my.pitch)
            cy.get('.fh a').eq(3).click() // expand

            cy.get('.fh a').eq(4).should('include.text', 'Account Activity')
            cy.get('.fh a').eq(4).click() // Account Activity
            cy.url().should('contain', 'owner/account/' + Cypress.config().ph.my.customerNumber)

            cy.get('[role="banner"] [title="open menu"]').click()
            cy.get('.fh a').eq(5).should('include.text', 'Park Services')
            cy.get('.fh a').eq(5).click() //Park Services
            cy.url().should('contain', 'owner/services/' + Cypress.config().ph.my.customerNumber)

            cy.get('[role="banner"] [title="open menu"]').click()
            cy.get('.fh a').eq(6).should('include.text', 'Logout')
            cy.get('.fh a').eq(6).click() // Logout
            cy.url().should('contain', '/login')
        })


        it('and view Make Payment Page', async function () {

            if (cy.widthLessThan('#root', 768)==true) {
                cy.get('main button').click() // expand menu first
            }

            cy.get('main a').eq(0).click()
            cy.url().should('contain', 'owner/payment/' + Cypress.config().ph.my.customerNumber)
            // Add more tests from this page
            cy.go(-1)
        })

        it('and view Park Services - Book & Pay Page ', function () {

            if (cy.widthLessThan('#root', 768)==true) {
                cy.get('main button').click() // expand menu first
            }

            cy.get('main a').eq(1).click()
            cy.url().should('contain', 'owner/services/' + Cypress.config().ph.my.customerNumber)
            // Add more tests from this page
            cy.go(-1)

        })

        it('and view Account Page', function () {

            if (cy.widthLessThan('#root', 768)==true) {
                cy.get('main button').click() // expand menu first
            }

            cy.get('main a').eq(2).click()
            cy.url().should('contain', 'owner/account/' + Cypress.config().ph.my.customerNumber)
            // Add more tests from this page
            // Account Activity
            // Search
            cy.go(-1)

        })

        it('and view their Account Details', function () {

            if (cy.widthLessThan('#root', 768)==true) {
                cy.get('main button').click() // expand menu first
            }

            cy.get('main [href="/profile"]').should('include.text', 'View and Edit Account Details')
            cy.get('main [href="/profile"]').click()
            cy.url().should('contain', '/profile')
            // Add more tests from this page
            // Marketing Preferences
            // Change Password
            cy.go(-1)

        })

        it('and Manage Loyalty Card ', function () {
            cy.get('main [href="https://touchtopup.net/login"]').should('include.text', 'Manage Loyalty Card')
        })

        it('and log out', function () {
            // Log out
            cy.get('[role="banner"] [title="open menu"]').click()
            cy.get('.fh a').eq(6).click()
            cy.get('[type="submit"]').should('include.text', 'Login')
        })

    })

    it('Should be able to register', function () {

        cy.get('[href="/register"]').click()
        cy.get('h2').should('include.text', 'Create a My')
        cy.get('h2').should('include.text', 'Park Holidays')
        cy.get('h2').should('include.text', 'Account')

        cy.get('#email').type(dayjs().format("YYYYMMDDTHHmmss") + cy.config().testemailsuffix)
        cy.get('#password').type('Password1!')
        cy.get('#confirmPassword').type('Password1!')
        cy.get('input[type="checkbox"][name="terms"]').click({ force: true }) // T&C's

        // Submit
        if (cy.config().submit) {
            cy.get('[type="submit"]').click()
            cy.get('h3').should('include.text', 'Confirm your email address')
            cy.get('main p').eq(0).should('include.text', 'Thank you for registering with us, in order to complete your account setup, we have sent an email with a confirmation link to your email address.')
            cy.get('main p').eq(1).should('include.text', 'In order to complete the sign-up process, please click the confirmation link.')
            cy.get('main p').eq(2).should('include.text', 'If you do not receive a confirmation email, please check your spam folder. Also, please verify that you entered a valid email address in the sign-up process.')
            cy.get('main p').eq(3).should('include.text', 'If you need assistance, please contact us')
            cy.get('[href="mailto:holidaysupport@parkholidays.com"]').should('exist')
        } else {
            cy.log("submit has been disabled in the Config file")
        }

        cy.go(-1)

    })

})
