import '../../support/commands.js'
import 'cypress-lighthouse';
//import 'pa11y';

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});


describe(Cypress.config().pl.siteMapUrl + ' Sitemap URL requests ', async function () {
  let urls = [];
  before(() => {
    const parser = new DOMParser();

    cy.request(Cypress.config().pl.siteMapUrl).then((response) => {
      const document = parser.parseFromString(response.body, 'application/xml');
      const parsedUrls = document.getElementsByTagName('loc'); // count
      urls = Array.from(parsedUrls).map((item) => item.innerHTML); // All urls in
    });
  });

  it('Should all return a 200, and all images have alt attribute',  () => {
    cy.SiteMapTests(urls);
  });

});