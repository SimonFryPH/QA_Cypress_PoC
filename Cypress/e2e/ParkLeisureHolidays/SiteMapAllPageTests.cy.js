import '../../support/commands.js'
import 'cypress-lighthouse';
//import 'pa11y';

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});


describe(Cypress.config().plh.siteMapUrl + ' Sitemap URL tests ', async function () {
  let urls = [];
  before(() => {
    const parser = new DOMParser();

    cy.request(Cypress.config().plh.siteMapUrl).then((response) => {
      const document = parser.parseFromString(response.body, 'application/xml');
      const parsedUrls = document.getElementsByTagName('loc'); // count
      urls = Array.from(parsedUrls).map((item) => item.innerHTML); // All urls in
    });
  });

  it('Various SiteMap Page tests',  function () {
    cy.SiteMapPageTests(urls,true,true,true);
  });

  
});