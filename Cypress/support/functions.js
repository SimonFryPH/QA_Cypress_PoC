
Cypress.Commands.add('widthLessThan', (css, w) => {
    cy.get(css).then($el => {
        if ($el.outerWidth() < w) {
            cy.log("widthLessThan " + w)
            return true;
        }
    });
})
