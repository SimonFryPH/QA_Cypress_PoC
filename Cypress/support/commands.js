// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//import 'cypress-audit/commands';


Cypress.Commands.add("ScanForBrokenLinks", () => {
    // document.querySelectorAll('a[href]').forEach((item) => console.log(item.href))
    cy.get('a[href]').each(link => {
        if (link.prop('href'))
            cy.request({
                url: link.prop('href'), failOnStatusCode: true, followRedirect: true
            })
        cy.log(link.prop('href'))
    })
return undefined ;
})


