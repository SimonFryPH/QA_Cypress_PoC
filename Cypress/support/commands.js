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


Cypress.Commands.add("ScanForBrokenLinks", (boolfailOnStatusCode = true, boolfollowRedirect = true) => {

    cy.reload(true)
    // document.querySelectorAll('a[href]').forEach((item) => console.log(item.href))
    cy.get('a[href]').each(link => {
        if (link.prop('href'))
            cy.request({
                url: link.prop('href'), failOnStatusCode: boolfailOnStatusCode, followRedirect: boolfollowRedirect
            })
        cy.log(link.prop('href'))
    })
    return undefined;
})



Cypress.Commands.add('SiteMapRequests', (arrURLs) => {

    for (var i = 0; i < arrURLs.length; i++) {
            cy.request({
                url: arrURLs[i],
                failOnStatusCode: false, 
                followRedirect: false
            }).then(response => {
               cy.log({
                    name: arrURLs[i], message: response.status
                })
            })
    }
})


Cypress.Commands.add('widthLessThan', (css, w) => {
    cy.get(css).then($el => {
        if ($el.outerWidth() < w) {
            cy.log("widthLessThan " + w)
            return true;
        }
    });
})

