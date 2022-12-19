import '../../support/commands.js'
import 'cypress-lighthouse';
//import 'pa11y';

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});


describe(Cypress.config().ph.siteMapUrl + ' Sitemap URL tests ', async function () {
  let urls = [];

  before(() => {
    const parser = new DOMParser();

    cy.request(Cypress.config().ph.siteMapUrl).then((response) => {
      const document = parser.parseFromString(response.body, 'application/xml');
      const parsedUrls = document.getElementsByTagName('loc'); // count
      urls = Array.from(parsedUrls).map((item) => item.innerHTML); // All urls in
    });
  });


  
  it('Various SiteMap Page tests',  function () {
    cy.SiteMapPageTests(urls,true,false,true);
  });


  xit('Google Lighthouse', () => {

    /*
    //Set up
    npm install -g lighthouse
    npm install -g lighthouse-ci
    npm uninstall -g lighthouse
    // Help https://medium.com/@giezendanenner/running-lighthouse-reports-on-the-command-line-1691a1b06a56
    */

    for (var i = 0; i < urls.length; i++) {
      cy.exec('lighthouse ' + urls[i] + ' --output json --output html --output csv --chrome-flags=”--headless” --quiet --view')
    }

  });





});