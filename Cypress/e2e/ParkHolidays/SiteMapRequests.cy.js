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


  it('Should all return a 200, and all images have alt attribute',  () => {
    cy.SiteMapTests(urls);
  });

  //it('Lighthouse POC test', async () => {

    //for (var i = 0; i < urls.length; i++) {

    //cy.request('GET',urls[i])
    //cy.visit(urls[1])
    //cy.lighthouse();
    //.should((response) => {
    // expect(response.status).to.eq(200)
    //expect(response).to.have.property('headers')
    //expect(response).to.have.property('duration')
    //})

    /*
    const customThresholds = {
      performance: 50,
      accessibility: 50,
      seo: 70,
      'first-contentful-paint': 2000,
      'largest-contentful-paint': 3000,
      'cumulative-layout-shift': 0.1,
      'total-blocking-time': 500,
    };
 
    const desktopConfig = {
      formFactor: 'desktop',
      screenEmulation: { disabled: true },
    };
 
    cy.lighthouse(customThresholds, desktopConfig);
    */
    //}
  //});


 // it('Should ImagesContainAltText', () => {
 //   cy.PageImagesShouldContainAltText(urls);
 // });

});