Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
}); 
  
  describe('PHUK Sitemap URL requests', () => {
    let urls = [];
  
    before(() => {
      const parser = new DOMParser();
  
      cy.request(Cypress.config().siteMapUrl).then((response) => {
        const document = parser.parseFromString(response.body, 'application/xml');
        const parsedUrls = document.getElementsByTagName('loc'); // count
        urls = Array.from(parsedUrls).map((item) => item.innerHTML); // All urls in
      });
    });
  
    it('Should get each url from the sitemap and return a 200', async () => {

        for (var i = 0; i < urls.length; i++) {

            cy.request('GET',urls[i])
            .should((response) => {
             expect(response.status).to.eq(200)
             //expect(response).to.have.property('headers')
             //expect(response).to.have.property('duration')
            })
            
        }
        cy.log("*** Finished ***")
    });
  });