const dayjs = require('dayjs')
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

cy.config().screenSizes.forEach((size) => {

    describe('myholiday.parkholidays.com ' + size[0] + ', ' + size[1], async function () {

        beforeEach(() => {
            cy.viewport(size[0], size[1]) // Change screen size
            cy.visit(cy.config().ph.myHoliday.url)
            cy.url().should('contain', cy.config().ph.myHoliday.url)
        })


        it('Should display login page', function () {

            cy.url().should('contain', '/login')
            cy.get('#header').find('img').should('have.attr', 'src').should('include', 'ParkHolidaysLogo.jpg')
            cy.get('h1').should('include.text', 'Manage my booking - Log in')
            cy.get('p').eq(0).should('include.text', 'Welcome to Manage My Booking.')
            cy.get('p').eq(1).should('include.text', 'Here you can view your holiday booking details and pay securely online.')
            cy.get('p').eq(2).should('include.text', 'Please enter your booking reference number and the surname used to confirm your booking.')
            cy.get('p').eq(3).should('include.text', 'You must be logged in to view My Holiday.')

            cy.get('.login-panel').should('include.text', 'Login')
            cy.get('.login-panel').should('include.text', 'Booking Ref')
            cy.get('.login-panel input').eq(0).should('have.attr', 'type').should('include', 'text')

            cy.get('.login-panel').should('include.text', 'Surname')
            cy.get('.login-panel input').eq(1).should('have.attr', 'type').should('include', 'text')

            cy.get('[name="btnLogin"]').should('have.attr', 'value').should('include', 'Login')

            cy.get('.login-panel > small').should('include.text', 'Note: If you have any problems with logging in, please contact us by email at ')
            cy.get('.login-panel > small').should('include.text', 'HolidaySupport@ParkHolidays.com')
        })

        it('Should not log in with invalid surname', function () {
            cy.get('[name="booking_ref"]').type(cy.config().ph.myHoliday.bookingRef)
            cy.get('[name="surname"]').type('xxxxx')
            cy.get('[name="btnLogin"]').click()
            cy.url().should('contain', '/login')
        })

        describe('Should log in with valid credentials', async function () {

            beforeEach(() => {
                cy.get('[name="booking_ref"]').type(cy.config().ph.myHoliday.bookingRef)
                cy.get('[name="surname"]').type(cy.config().ph.myHoliday.surname)
                cy.get('[name="btnLogin"]').click()
            })

            it('and see your booking details overview by default', function () {
                cy.get('h1').should('include.text', 'Manage my booking - Overview')
                cy.get('h2').eq(0).should('include.text', "You've only got")
                cy.get('h2').eq(0).should('include.text', "days until your holiday begins!")
                cy.get('h2').eq(1).should('include.text', 'Holiday Details')
                cy.get('h2').eq(2).should('include.text', 'Park Details')
                cy.get('[id="phoneNo"] span').should('include.text', 'Reservations Team')
                cy.get('[id="phoneNo"] span').should('include.text', 'Call 0343 178 7070')
            })

            it('and view the menu items', function () {
                cy.get('.widgetContent h6').should('include.text', 'My Booking Menu')
                cy.get('.widgetContent li a').eq(1).should('include.text', 'Payment')
                cy.get('.widgetContent li a').eq(0).should('include.text', 'My Holiday Area')
                cy.get('.widgetContent li a').eq(2).should('include.text', 'Logout')
            })

            it('and access the Payment page from the menu (no balance to pay)', function () {
                cy.get('.widgetContent li a').eq(1).click()
                cy.url().should('contain', '/extras')
                // Page checks
                cy.get('h1').should('include.text', 'Manage my booking - Make Payment')
                cy.get('h2').should('include.text', 'Holiday Details')
                cy.get('#btn_next_step').should('include.text', 'Make Payment')
                cy.get('.next-step').should('include.text', 'Remaining balance to pay')
                // Make Payment
                cy.get('#btn_next_step').click()
                cy.get('.alert').should('include.text', 'Our records indicate you have no balance to pay. If you believe this to be incorrect - please contact our holiday hotline on 0343 178 7070.')
            })


            it('and access My Holiday Area page from the menu', function () {
                cy.get('.widgetContent li a').eq(0).click()
                cy.get('h1').should('include.text', 'Manage my booking - Overview')
                cy.get('h1').should('include.text', 'Manage my booking - Overview')
                cy.get('h2').eq(0).should('include.text', "You've only got")
                cy.get('h2').eq(0).should('include.text', "days until your holiday begins!")
                cy.get('h2').eq(1).should('include.text', 'Holiday Details')
                cy.get('h2').eq(2).should('include.text', 'Park Details')
                cy.get('[id="phoneNo"] span').should('include.text', 'Reservations Team')
                cy.get('[id="phoneNo"] span').should('include.text', 'Call 0343 178 7070')
            })

            it('and log out', function () {
                // Log out
                cy.get('.widgetContent li a').eq(2).click()
                cy.url().should('contain', '/logout')
                cy.get('h1').should('include.text', 'Manage my booking - Logged Out')
                cy.get('p').should('include.text', 'We look forward to seeing you again soon.')
            })

        })



    })

}) //foreach screenSizes
